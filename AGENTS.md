# Cal.com Development Guide for AI Agents

You are a senior Cal.com engineer working in a Bun/Turbo monorepo. You prioritize type safety, security, and small, reviewable diffs.

## Do

- Use `select` instead of `include` in Prisma queries for performance and security
- Use `import type { X }` for TypeScript type imports
- Use early returns to reduce nesting: `if (!booking) return null;`
- Use `ErrorWithCode` for errors in non-tRPC files (services, repositories, utilities); use `TRPCError` only in tRPC routers
- Use conventional commits: `feat:`, `fix:`, `refactor:`
- Create PRs in draft mode by default
- Run `bun run type-check:ci --force` before concluding CI failures are unrelated to your changes
- Import directly from source files, not barrel files (e.g., `@calcom/ui/components/button` not `@calcom/ui`)
- Add translations to `apps/web/public/static/locales/en/common.json` for all UI strings
- Use `date-fns` or native `Date` instead of Day.js when timezone awareness isn't needed
- Put permission checks in `page.tsx`, never in `layout.tsx`
- Use `ast-grep` for searching if available; otherwise use `rg` (ripgrep), then fall back to `grep`

## Don't

- Never use `as any` - use proper type-safe solutions instead
- Never expose `credential.key` field in API responses or queries
- Never commit secrets or API keys
- Never modify `*.generated.ts` files directly - they're created by app-store-cli
- Never put business logic in repositories - that belongs in Services
- Never use barrel imports from index.ts files
- Never skip running type checks before pushing
- Never create large PRs (>500 lines or >10 files) - split them instead

## Commands

### File-scoped (preferred for speed)

```bash
# Type check - always run on changed files
bun run type-check:ci --force

# Lint single file
bun run eslint --fix path/to/file.tsx

# Format single file
bun run prettier --write path/to/file.tsx

# Unit test specific file
bun run vitest run path/to/file.test.ts

# Unit test specific file + specific test
bun run vitest run path/to/file.test.ts --testNamePattern="specific test name"

# Integration test specific file
bun run test path/to/file.integration-test.ts -- --integrationTestsOnly

# Integration test specific file + specific test
bun run test path/to/file.integration-test.ts --testNamePattern="specific test name" -- --integrationTestsOnly

# E2E test specific file
PLAYWRIGHT_HEADLESS=1 bun run e2e path/to/file.e2e.ts

# E2E test specific file + specific test
PLAYWRIGHT_HEADLESS=1 bun run e2e path/to/file.e2e.ts --grep "specific test name"
```

### Project-wide (use sparingly)

```bash
# Development
bun run dev           # Start dev server
bun run dx            # Dev with database setup

# Build & check
bun run build         # Build all packages
bun run lint:fix      # Lint and fix all
bun run type-check    # Type check all

# Tests (use TZ=UTC for consistency)
TZ=UTC bun run test   # All unit tests
bun run e2e           # All E2E tests

# Database
bun run prisma generate  # Regenerate types after schema changes
bun --filter @calcom/prisma run db-migrate  # Run migrations
```

## Boundaries

### Always do
- Run type check on changed files before committing
- Run relevant tests before pushing
- Use `select` in Prisma queries
- Follow conventional commits for PR titles

### Ask first
- Adding new dependencies
- Schema changes to `packages/prisma/schema.prisma`
- Changes affecting multiple packages
- Deleting files
- Running full build or E2E suites

### Never do
- Commit secrets, API keys, or `.env` files
- Expose `credential.key` in any query
- Use `as any` type casting
- Force push or rebase shared branches
- Modify generated files directly

## Project Structure

```
apps/web/                    # Main Next.js application
packages/prisma/             # Database schema (schema.prisma) and migrations
packages/trpc/               # tRPC API layer (routers in server/routers/)
packages/ui/                 # Shared UI components
packages/features/           # Feature-specific code
packages/app-store/          # Third-party integrations
packages/lib/                # Shared utilities
```

### Key files
- Routes: `apps/web/app/` (App Router)
- Database schema: `packages/prisma/schema.prisma`
- tRPC routers: `packages/trpc/server/routers/`
- Translations: `apps/web/public/static/locales/en/common.json`
- Workflow constants: `packages/features/ee/workflows/lib/constants.ts`

## Tech Stack

- **Framework**: Next.js 13+ (App Router in some areas)
- **Language**: TypeScript (strict)
- **Database**: PostgreSQL with Prisma ORM
- **API**: tRPC for type-safe APIs
- **Auth**: NextAuth.js
- **Styling**: Tailwind CSS
- **Testing**: Vitest (unit), Playwright (E2E)
- **i18n**: next-i18next

## Code Examples

### Good error handling

```typescript
// Good - Descriptive error with context
throw new Error(`Unable to create booking: User ${userId} has no available time slots for ${date}`);

// Bad - Generic error
throw new Error("Booking failed");
```

For which error class to use (`ErrorWithCode` vs `TRPCError`) and concrete examples, see [Error Types in knowledge-base.md](agents/knowledge-base.md#error-types).

### Good Prisma query

```typescript
// Good - Use select for performance and security
const booking = await prisma.booking.findFirst({
  select: {
    id: true,
    title: true,
    user: {
      select: {
        id: true,
        name: true,
        email: true,
      }
    }
  }
});

// Bad - Include fetches all fields including sensitive ones
const booking = await prisma.booking.findFirst({
  include: { user: true }
});
```

### Good imports

```typescript
// Good - Type imports and direct paths
import type { User } from "@prisma/client";
import { Button } from "@calcom/ui/components/button";

// Bad - Regular import for types, barrel imports
import { User } from "@prisma/client";
import { Button } from "@calcom/ui";
```

## PR Checklist

- [ ] Title follows conventional commits: `feat(scope): description`
- [ ] Type check passes: `bun run type-check:ci --force`
- [ ] Lint passes: `bun run lint:fix`
- [ ] Relevant tests pass
- [ ] Diff is small and focused (<500 lines, <10 files)
- [ ] No secrets or API keys committed
- [ ] UI strings added to translation files
- [ ] Created as draft PR

## When Stuck

- Ask a clarifying question before making large speculative changes
- Propose a short plan for complex tasks
- Open a draft PR with notes if unsure about approach
- Fix type errors before test failures - they're often the root cause
- Run `bun run prisma generate` if you see missing enum/type errors

## Extended Documentation

For detailed information, see the `agents/` directory:

- **[agents/README.md](agents/README.md)** - Architecture overview and patterns
- **[agents/commands.md](agents/commands.md)** - Complete command reference
- **[agents/knowledge-base.md](agents/knowledge-base.md)** - Domain knowledge and best practices
- **[agents/coding-standards.md](agents/coding-standards.md)** - Coding standards with examples

## Future Work / TODOs

### Platform Package Cleanup (Optional)

If you don't need the Platform API (external REST API for embedding), remove these:

- [ ] Remove `packages/platform/atoms` - Embeddable React components
- [ ] Remove `packages/platform/examples` - Example apps for atoms
- [ ] Remove `packages/platform/libraries` - Platform API libraries
- [ ] Remove `packages/platform/utils` - Platform utilities (not used elsewhere)
- [ ] Remove `example-apps` directory - External example apps
- [ ] Remove `.github/workflows/atoms-production-build.yml`
- [ ] Remove `.github/workflows/e2e-atoms.yml`
- [ ] Update root `package.json` workspaces to remove platform references
- [ ] Update `.changeset/config.json` to remove `@calcom/platform-libraries` from ignore

**Keep:** `packages/platform/enums`, `packages/platform/types`, `packages/platform/constants` - these are used by the core web app for shared type definitions.
