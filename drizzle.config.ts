import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';

// Load environment variables from .dev.vars
dotenv.config({ path: '.dev.vars' });

// Function to extract database_id from wrangler.jsonc (which supports comments)
function getDatabaseId() {
  try {
    const wranglerPath = path.resolve('wrangler.jsonc');
    const wranglerContent = fs.readFileSync(wranglerPath, 'utf-8');
    // Simple regex to find database_id in JSONC
    // Matches: "database_id": "..." handling whitespace
    const match = wranglerContent.match(/"database_id"\s*:\s*"([^"]+)"/);
    if (match && match[1]) {
      return match[1];
    }
  } catch (e) {
    console.warn('Could not read wrangler.jsonc:', e);
  }
  return process.env.CLOUDFLARE_D1_DATABASE_ID;
}

// Drizzle Kit Configuration
// Documentation: https://orm.drizzle.team/kit-docs/config-reference
export default defineConfig({
  // Database schema files
  schema: './src/server/modules/*/db/schema.ts',

  // Output directory for migrations
  out: './drizzle',

  // Database driver
  dialect: 'sqlite',

  // D1 Database configuration
  driver: 'd1-http',

  // Database credentials (for remote migrations)
  // Get these from Cloudflare dashboard or `wrangler d1 info`
  dbCredentials: {
    // For local development, Drizzle uses .wrangler/state/v3/d1/
    // For remote migrations, use these (populated from .dev.vars or system env):
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    databaseId: getDatabaseId()!,
    token: process.env.CF_D1_TOKEN!,
  },

  // Verbose output
  verbose: true,

  // Strict mode (recommended)
  strict: true,
});
