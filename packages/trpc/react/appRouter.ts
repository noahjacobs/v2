"use client";

import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "../server/routers/_app";

/**
 * App Router compatible tRPC client using createTRPCReact.
 * This is the single instance used by both the app and shared packages.
 */
export const trpc = createTRPCReact<AppRouter>({});
