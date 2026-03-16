import { defineConfig } from "drizzle-kit";
import { env } from "./src/config/env.js";
export default defineConfig({
  out: "./database/drizzle",
  schema: "./src/infrastructure/database/schema/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    host: env.DATABASE_HOST,
    port: parseInt(env.DATABASE_PORT),
    database: env.DATABASE_NAME,
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    ssl: false,
  },
});
