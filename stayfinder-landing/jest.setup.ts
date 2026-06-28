import { execSync } from "child_process";

// Use a separate test DB — never touches dev.db
process.env.DATABASE_URL = "file:./test.db";
process.env.AUTH_SECRET = "test-secret";
process.env.GOOGLE_CLIENT_ID = "test-client-id";
process.env.GOOGLE_CLIENT_SECRET = "test-client-secret";

// Sync schema to test.db (non-destructive — just creates tables if they don't exist)
execSync("node_modules/.bin/prisma db push --skip-generate", {
  env: { ...process.env, DATABASE_URL: "file:./test.db" },
  stdio: "pipe",
});
