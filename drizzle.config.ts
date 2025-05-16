import { defineConfig } from 'drizzle-kit';
import env from '@/env';

const {
  DATABASE_HOST: host,
  DATABASE_USER: user,
  DATABASE_NAME: database,
  DATABASE_PASSWORD: password,
  DATABASE_PORT: port,
} = env;

const connectionString = `postgresql://${user}:${encodeURIComponent(password)}@${host}:${port}/${database}?sslmode=require`;

console.log('Connection String:', connectionString);

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
    // host: env.DATABASE_HOST,
    // user: env.DATABASE_USER,
    // password: env.DATABASE_PASSWORD,
    // database: env.DATABASE_NAME,
    // ssl: { rejectUnauthorized: false }, // This disables certificate verification
  },
  schemaFilter: ['public'],
  verbose: true,
  strict: true,
});