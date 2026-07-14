import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

const globalForDb = globalThis as unknown as {
  pool?: mysql.Pool;
};

export const pool =
  globalForDb.pool ??
  mysql.createPool({
    uri: process.env.DATABASE_URL,
    connectionLimit: 5,
    waitForConnections: true,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,
    connectTimeout: 60000, // 60 seconds - this is valid
  });

globalForDb.pool = pool;

export const db = drizzle(pool);