import { seedSuperAdmin } from "../../scripts/seed-superadmin";
import { db } from "@/db";

export async function initializeApp() {
  // Skip seeding during build process
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    console.log('⏭️ Skipping initialization during build...');
    return;
  }

  try {
    console.log('🚀 Initializing application...');
    
    // Check if tables exist before seeding
    try {
      const tables = await db.execute('SHOW TABLES');
      const tableNames = tables.map(row => Object.values(row)[0]);
      
      if (!tableNames.includes('users')) {
        console.log('⚠️ Users table not found. Skipping seed...');
        return;
      }
      
      console.log('🔧 Checking for existing super admin...');
      await seedSuperAdmin();
      console.log('✅ Application initialized successfully!');
      
    } catch (tableError) {
      console.error('❌ Error checking tables:', tableError.message);
    }
    
  } catch (error) {
    console.error('❌ Error initializing application:', error);
  }
}