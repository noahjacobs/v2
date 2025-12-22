"use client";

import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@calcom/trpc/server/routers/_app";

// Create the single trpc instance used by the entire app
export const trpc = createTRPCReact<AppRouter>({});
