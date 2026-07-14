import { seedSuperAdmin } from "../../scripts/seed-superadmin";

export async function initializeApp() {
  console.log('🚀 Initializing application...');
  await seedSuperAdmin();
  console.log('✅ Application initialized successfully!');
}