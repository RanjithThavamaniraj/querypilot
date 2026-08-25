import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

type AppDatabase = PostgresJsDatabase<typeof schema>;

const globalForDb = globalThis as unknown as {
  postgresClient?: ReturnType<typeof postgres>;
  drizzleDb?: AppDatabase;
};

function createClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Configure the QueryPilot application database for runtime."
    );
  }

  return postgres(connectionString, {
    max: 10,
    prepare: false,
    connection: {
      application_name: "querypilot-app",
    },
  });
}

/**
 * Lazy application DB accessor.
 * Lazy accessor — DATABASE_URL is read on first runtime use, not at import time.
 */
export function getDb(): AppDatabase {
  if (globalForDb.drizzleDb) {
    return globalForDb.drizzleDb;
  }

  const client = globalForDb.postgresClient ?? createClient();
  if (process.env.NODE_ENV !== "production") {
    globalForDb.postgresClient = client;
  }

  const db = drizzle(client, { schema });
  globalForDb.drizzleDb = db;
  return db;
}

export function isAppDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}
