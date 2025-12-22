export type { RouterInputs, RouterOutputs } from "./trpc";

// App Router trpc (createTRPCReact) - used by shared packages and App Router
export { trpc } from "./appRouter";

// Pages Router trpc (createTRPCNext) - for legacy pages if needed
export { trpc as pagesRouterTrpc, transformer } from "./trpc";

export { ENDPOINTS } from "./shared";
