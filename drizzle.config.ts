import { defineConfig } from 'drizzle-kit';
import env from '@/env';
import fs from 'fs';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
    ssl: {
      ca: fs.readFileSync(env.DATABASE_CA).toString(),
      rejectUnauthorized: true,
    }
  },
  schemaFilter: ['public'],
  verbose: true,
  strict: true,
});