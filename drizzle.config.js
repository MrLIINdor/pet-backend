import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/main.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
