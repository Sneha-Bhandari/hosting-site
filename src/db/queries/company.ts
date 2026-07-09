import { db } from "../index";
// import { companies } from "../schema";
// import { eq } from "drizzle-orm";

// Get all companies
export async function getAllCompanies() {
  // return await db.select().from(companies);

  throw new Error("Not implemented");
}

// Get company by ID
export async function getCompanyById(id: number) {
  // return await db
  //   .select()
  //   .from(companies)
  //   .where(eq(companies.id, id));

  throw new Error("Not implemented");
}

// Create a company
export async function createCompany(data: unknown) {
  // return await db.insert(companies).values(data);

  throw new Error("Not implemented");
}

// Update a company
export async function updateCompany(id: number, data: unknown) {
  // return await db
  //   .update(companies)
  //   .set(data)
  //   .where(eq(companies.id, id));

  throw new Error("Not implemented");
}

// Delete a company
export async function deleteCompany(id: number) {
  // return await db
  //   .delete(companies)
  //   .where(eq(companies.id, id));

  throw new Error("Not implemented");
}