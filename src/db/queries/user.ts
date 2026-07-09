import { db } from "../index";
// import { users } from "../schema";
// import { eq } from "drizzle-orm";

// Get all users
export async function getAllUsers() {
  // return await db.select().from(users);

  throw new Error("Not implemented");
}

// Get user by ID
export async function getUserById(id: number) {
  // return await db
  //   .select()
  //   .from(users)
  //   .where(eq(users.id, id));

  throw new Error("Not implemented");
}

// Create a user
export async function createUser(data: unknown) {
  // return await db.insert(users).values(data);

  throw new Error("Not implemented");
}

// Update a user
export async function updateUser(id: number, data: unknown) {
  // return await db
  //   .update(users)
  //   .set(data)
  //   .where(eq(users.id, id));

  throw new Error("Not implemented");
}

// Delete a user
export async function deleteUser(id: number) {
  // return await db
  //   .delete(users)
  //   .where(eq(users.id, id));

  throw new Error("Not implemented");
}