import {
  mysqlTable,
  int,
  varchar,
  timestamp,
} from "drizzle-orm/mysql-core";

//  * Replace this with your actual database tables later.
export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});