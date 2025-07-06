#!/usr/bin/env node

// Build hook for DigitalOcean App Platform
// This script runs during the build process to initialize the database

const { initializeDatabase } = require('./init-db-postgres');

async function buildHook() {
  console.log('🔧 Running build hook...');
  
  // Only initialize database if DATABASE_URL is present (production)
  if (process.env.DATABASE_URL) {
    console.log('🗄️  Initializing production database...');
    try {
      await initializeDatabase();
      console.log('✅ Database initialization successful');
    } catch (error) {
      console.error('❌ Database initialization failed:', error);
      // Don't exit - let the build continue, database might already be initialized
      console.log('⚠️  Continuing with build despite database error');
    }
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