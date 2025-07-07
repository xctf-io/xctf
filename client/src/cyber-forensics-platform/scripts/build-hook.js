#!/usr/bin/env node

// Build hook for DigitalOcean App Platform
// This script runs during the build process to initialize the database

const { initializeDatabase } = require('./init-db-postgres');

async function buildHook() {
  console.log('🔧 Running build hook...');
  
  // Only initialize database if DATABASE_URL is present (production)
  if (process.env.DATABASE_URL) {
    console.log('🗄️  Initializing production database...');
    console.log('🔍 DATABASE_URL present:', !!process.env.DATABASE_URL);
    console.log('🔍 NODE_ENV:', process.env.NODE_ENV);
    
    try {
      await initializeDatabase();
      console.log('✅ Database initialization successful');
    } catch (error) {
      console.error('❌ Database initialization failed:', error);
      console.error('❌ Full error details:', {
        message: error.message,
        code: error.code,
        detail: error.detail,
        stack: error.stack
      });
      // Exit with error to prevent deployment with broken database
      console.error('🚨 Stopping build due to database initialization failure');
      process.exit(1);
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