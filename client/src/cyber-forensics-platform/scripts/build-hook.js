#!/usr/bin/env node

// Build hook for DigitalOcean App Platform
// This script runs during the build process to initialize the database

const { initializeDatabase } = require('./init-db-postgres');

async function buildHook() {
  console.log('🔧 Running build hook...');
  
  // Only initialize database if DATABASE_URL is present (production)
  if (process.env.DATABASE_URL) {
    console.log('🗄️  Initializing production database...');
    await initializeDatabase();
  } else {
    console.log('⚠️  DATABASE_URL not found, skipping database initialization');
  }
  
  console.log('✅ Build hook completed');
}

// Run the build hook
buildHook().catch(error => {
  console.error('❌ Build hook failed:', error);
  process.exit(1);
});