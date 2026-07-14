import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as bcrypt from "bcrypt";

export async function seedSuperAdmin() {
  try {
    // Check if users table exists first
    try {
      const tables = await db.execute('SHOW TABLES');
      const tableNames = tables.map(row => Object.values(row)[0]);
      
      if (!tableNames.includes('users')) {
        console.log('⚠️ Users table not found. Skipping super admin seed.');
        return;
      }
    } catch (error) {
      console.log('⚠️ Could not check tables. Skipping seed.');
      return;
    }

    const existingSuperAdmin = await db
      .select()
      .from(users)
      .where(eq(users.role, 'superadmin'))
      .limit(1);

    if (existingSuperAdmin.length > 0) {
      console.log('✅ Super admin already exists.');
      return;
    }

    const adminEmail = process.env.SUPER_ADMIN_EMAIL || 'admin@gmail.com';
    const adminPassword = process.env.SUPER_ADMIN_PASSWORD || 'admin123';

    const passwordHash = await bcrypt.hash(adminPassword, 10);

    await db.insert(users).values({
      id: crypto.randomUUID(),
      email: adminEmail.toLowerCase().trim(),
      password: passwordHash,
      role: 'superadmin',
      firstName: 'Super',
      lastName: 'Admin',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log('✅ Super admin created successfully!');
    console.log(`📧 Email: ${adminEmail}`);

  } catch (error) {
    console.error('❌ Error seeding super admin:', error);
  }
}