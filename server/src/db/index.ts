import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { Kysely, PostgresDialect } from 'kysely';
import type { DB } from './types';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Drizzle instance for migrations and schema operations
export const db = drizzle(pool, { schema });

// Kysely instance for type-safe queries
export const kyselyDb = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool,
  }),
});


