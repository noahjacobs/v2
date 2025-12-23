import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "./schema.prisma",
  migrations: {
    path: "./migrations",
    seed: "bun run seed-basic",
  },
  datasource: {
    // Use direct connection for CLI/migrations (not pooled)
    url: env("DATABASE_DIRECT_URL") || env("DATABASE_URL"),
  },
});
