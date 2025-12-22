"use client";

/**
 * This file re-exports the trpc instance and related utilities.
 * It's used as a Turbopack resolve alias target to ensure all imports
 * of @calcom/trpc/react resolve to the same module instance.
 */

// Core trpc instance - all app code should use this same instance
export { trpc } from "./trpc";

// These are used by the provider
export { queryClient } from "./query-client";
export { trpcClient } from "./trpc-client";

// Re-export constants (using direct path to avoid circular alias)
export const ENDPOINTS = ["viewer", "publicViewer", "edge"] as const;

// Re-export types
export type { RouterInputs, RouterOutputs } from "@calcom/trpc/react/trpc";
