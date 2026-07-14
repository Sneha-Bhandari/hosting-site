// // src/lib/seed.js
// import { db } from '@/db';
// import { users } from '@/db/schema';
// import { eq } from 'drizzle-orm';
// import bcrypt from 'bcrypt';
// import { v4 as uuid } from 'uuid';

// let seeded = false;

// export async function seedSuperAdmin() {
//   if (seeded) return;
//   seeded = true;

//   try {
//     const adminEmail = process.env.SUPER_ADMIN_EMAIL || 'superadmin@mailhost.local';
//     const adminPassword = process.env.SUPER_ADMIN_PASSWORD;

//     if (!adminPassword) {
//       console.warn('⚠️ SUPER_ADMIN_PASSWORD not set in .env file');
//       console.warn('💡 Add SUPER_ADMIN_PASSWORD=your_password to .env');
//       return;
//     }

//     console.log('🔧 Checking for existing super admin...');

//     const existingSuperAdmin = await db
//       .select()
//       .from(users)
//       .where(eq(users.role, 'superadmin'))
//       .limit(1);

//     if (existingSuperAdmin.length > 0) {
//       console.log(`✅ Super admin already exists: ${existingSuperAdmin[0].email}`);
//       return;
//     }

//     console.log('📝 No super admin found. Creating one...');

//     const formattedEmail = adminEmail.toLowerCase().trim();
//     const saltRounds = 10;
//     const passwordHash = await bcrypt.hash(adminPassword, saltRounds);

//     const newSuperAdmin = {
//       id: uuid(),
//       email: formattedEmail,
//       password: passwordHash,
//       role: 'superadmin' as const,
//       companyId: null,
//       firstName: 'Super',
//       lastName: 'Admin',
//       isActive: true,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };

//     await db.insert(users).values(newSuperAdmin);

//     console.log('✅ Super admin created successfully!');
//     console.log(`📧 Email: ${formattedEmail}`);
//     console.log(`🔑 Password: ${adminPassword}`);
//     console.log('⚠️  IMPORTANT: Change the password after first login!');
//     console.log('📍 Login at: http://localhost:3000');

//   } catch (error) {
//     console.error('❌ Error seeding super admin:', error);
//   }
// }




// src/lib/seed.js
// This file is for Node.js runtime only
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

let seeded = false;

export async function seedSuperAdmin() {
  // Only run once
  if (seeded) return;
  seeded = true;

  try {
    const adminEmail = process.env.SUPER_ADMIN_EMAIL || 'admin@gmail.com';
    const adminPassword = process.env.SUPER_ADMIN_PASSWORD || 'admin';

    console.log('🔧 Checking for existing super admin...');

    const existingSuperAdmin = await db
      .select()
      .from(users)
      .where(eq(users.role, 'superadmin'))
      .limit(1);

    if (existingSuperAdmin.length > 0) {
      console.log(`✅ Super admin already exists: ${existingSuperAdmin[0].email}`);
      return;
    }

    console.log('📝 No super admin found. Creating one...');

    const formattedEmail = adminEmail.toLowerCase().trim();
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(adminPassword, saltRounds);

    const newSuperAdmin = {
      id: uuid(),
      email: formattedEmail,
      password: passwordHash,
      role: 'superadmin' as const,
      companyId: null,
      firstName: 'Super',
      lastName: 'Admin',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(users).values(newSuperAdmin);

    console.log('✅ Super admin created successfully!');
    console.log(`📧 Email: ${formattedEmail}`);
    console.log(`🔑 Password: ${adminPassword}`);
    console.log('⚠️  IMPORTANT: Change the password after first login!');
    console.log('📍 Login at: http://localhost:3000');

  } catch (error) {
    console.error('❌ Error seeding super admin:', error);
  }
}