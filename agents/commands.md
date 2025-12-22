# Build, Test & Development Commands

## Development Commands

- `bun run dev` - Start development server for web app
- `bun run dev:all` - Start web, website, and console apps
- `bun run dev:api` - Start web app with API proxy and API
- `bun run dev:console` - Start web app with console
- `bun run dx` - Start development with database setup

## Build Commands

- `bun run build` - Build all packages and apps
- `bun run build:ai` - Build AI package specifically
- `bun run clean` - Remove build artifacts (node_modules, .next, .turbo, dist)

## Lint & Type Check

- `bun run lint` - Run ESLint on codebase
- `bun run lint:fix` - Run ESLint and fix issues
- `bun run lint:report` - Generate lint report
- `bun run type-check` - Run TypeScript type checking
- `bun run format` - Format code with Prettier

## Testing Commands

### Unit Tests

- `bun run test` - Run unit tests (vitest)
- `bun run test <filename>` - Run tests for specific file
- `bun run test <filename> -t "<testName>"` - Run specific test by name for specific file
- `bun run tdd` - Run tests in watch mode
- `bun run test:ui` - Run tests with UI interface

### Integration Tests

- `bun run test -- --integrationTestsOnly` - Run integration tests (vitest)
- `bun run test <filename> -- --integrationTestsOnly` - Run integration tests for specific file
- `bun run test <filename> -t "<testName>" -- --integrationTestsOnly` - Run specific integration test by name for specific file


### End-to-End Tests

- `bun run e2e` - Run end-to-end tests (Playwright)
- `bun run e2e <filename>` - Run E2E tests for specific file
- `bun run e2e <filename> --grep "<testName>"` - Run specific E2E test by name
- `bun run e2e:app-store` - Run app store E2E tests
- `bun run e2e:embed` - Run embed E2E tests
- `bun run test-e2e` - Run database seed + E2E tests

## Database Commands

- `bun run prisma` - Run Prisma CLI commands
- `bun run db-seed` - Seed database with test data
- `bun run db-deploy` - Deploy database migrations
- `bun run db-studio` - Open Prisma Studio
- `psql "postgresql://postgres:@localhost:5432/calendso"` - Connect to local PostgreSQL database

## App Store Commands

- `bun run create-app` - Create new app store integration
- `bun run edit-app` - Edit existing app
- `bun run delete-app` - Delete app
- `bun run app-store:build` - Build app store
- `bun run app-store:watch` - Watch app store for changes

## Useful Development Patterns

### Running Single Tests

```bash
# Unit test specific file
bun run vitest run packages/lib/some-file.test.ts

# Integration test specific file
bun run test routing-form-response-denormalized.integration-test.ts -- --integrationTestsOnly

# E2E test specific file
bun run e2e tests/booking-flow.e2e.ts

# Run specific test by name
bun run e2e tests/booking-flow.e2e.ts --grep "should create booking"
```

### Environment Setup

- Copy `.env.example` to `.env` and configure
- Copy `.env.appStore.example` to `.env.appStore` for app store development
- Run `bun run dx` for initial development setup with database
