import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "@/db/schema";
import env from "@/env";

const {
  DATABASE_HOST: host,
  DATABASE_USER: user,
  DATABASE_NAME: database,
  DATABASE_PASSWORD: password,
  DATABASE_PORT: port,
} = env;

const connectionString = `postgresql://${user}:${encodeURIComponent(password)}@${host}:${port}/${database}`;

// It's not necessary to pass in the auth token here, but it could be added with:
// { url: env.DATABASE_URL, authToken: env.DATABASE_AUTH_TOKEN }
const client = postgres(connectionString, { prepare: false });

export const db = drizzle({ client, schema });
