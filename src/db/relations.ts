// src/db/relations.ts

import { relations } from "drizzle-orm";

// Add table relations here as your schema grows.
//
// Example:
//
// import { users, companies } from "./schema";
//
// export const companiesRelations = relations(companies, ({ one }) => ({
//   owner: one(users, {
//     fields: [companies.ownerId],
//     references: [users.id],
//   }),
// }));