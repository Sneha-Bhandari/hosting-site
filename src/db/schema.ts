import {
  mysqlTable,
  varchar,
  timestamp,
  boolean,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

// COMPANIES
export const companies = mysqlTable("companies", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  contactNumber: varchar("contact_number", { length: 50 }).notNull(),
  financialContact: varchar("financial_contact", { length: 50 }),
  address1: varchar("address1", { length: 255 }),
  address2: varchar("address2", { length: 255 }),
  city: varchar("city", { length: 100 }),
  country: varchar("country", { length: 100 }),
  state: varchar("state", { length: 100 }),
  zipCode: varchar("zip_code", { length: 20 }),
  website: varchar("website", { length: 255 }),
  regionalIncharge: varchar("regional_incharge", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// USERS
export const users = mysqlTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: mysqlEnum("role", ['superadmin', 'admin']).default('admin'),
  companyId: varchar("company_id", { length: 36 }).references(() => companies.id, { onDelete: 'set null' }),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// FILES
export const files = mysqlTable("files", {
  id: varchar("id", { length: 36 }).primaryKey(),
  companyId: varchar("company_id", { length: 36 }).references(() => companies.id),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  fileUrl: varchar("file_url", { length: 500 }).notNull(),
  fileType: varchar("file_type", { length: 100 }),
  mimeType: varchar("mime_type", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// REFERRED PEOPLE
export const referredPeople = mysqlTable("referred_people", {
  id: varchar("id", { length: 36 }).primaryKey(),
  companyId: varchar("company_id", { length: 36 }).notNull().references(() => companies.id),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  contact: varchar("contact", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// STUDENTS
export const students = mysqlTable("students", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  surname: varchar("surname", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  course: varchar("course", { length: 255 }),
  nationality: varchar("nationality", { length: 100 }),
  academicYear: varchar("academic_year", { length: 20 }),
  phone: varchar("phone", { length: 50 }),
  mobile: varchar("mobile", { length: 50 }),
  country: varchar("country", { length: 100 }),
  countryOfResidence: varchar("country_of_residence", { length: 100 }),
  fullAddress: varchar("full_address", { length: 500 }),
  dateOfBirth: varchar("date_of_birth", { length: 20 }),
  gender: varchar("gender", { length: 50 }),
  maritalStatus: varchar("marital_status", { length: 50 }),
  passportNumber: varchar("passport_number", { length: 50 }),
  issuePlace: varchar("issue_place", { length: 100 }),
  issueCountry: varchar("issue_country", { length: 100 }),
  issueDate: varchar("issue_date", { length: 20 }),
  expiryDate: varchar("expiry_date", { length: 20 }),
  contactName: varchar("contact_name", { length: 100 }),
  contactAddress: varchar("contact_address", { length: 500 }),
  contactPhone: varchar("contact_phone", { length: 50 }),
  contactEmail: varchar("contact_email", { length: 255 }),
  relationship: varchar("relationship", { length: 100 }),
  agencyName: varchar("agency_name", { length: 255 }),
  agencyEmail: varchar("agency_email", { length: 255 }),
  acceptPrivacy: boolean("accept_privacy").default(false),
  passportFileId: varchar("passport_file_id", { length: 36 }).references(() => files.id, { onDelete: 'set null' }),
  educationalFileId: varchar("educational_file_id", { length: 36 }).references(() => files.id, { onDelete: 'set null' }),
  otherFileId: varchar("other_file_id", { length: 36 }).references(() => files.id, { onDelete: 'set null' }),
  createdBy: varchar("created_by", { length: 36 }).references(() => users.id, { onDelete: 'set null' }),
  companyId: varchar("company_id", { length: 36 }).references(() => companies.id, { onDelete: 'set null' }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const companyAccessGrants = mysqlTable("company_access_grants", {
  id: varchar("id", { length: 36 }).primaryKey(),
  companyId: varchar("company_id", { length: 36 }).notNull().references(() => companies.id, { onDelete: 'cascade' }),
  type: mysqlEnum("type", ['country', 'university', 'study_area']).notNull(),
  value: varchar("value", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});