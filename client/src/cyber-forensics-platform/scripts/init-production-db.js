#!/usr/bin/env node

// Manual database initialization script for production
// This can be run manually if the build hook fails

const { Pool } = require('pg');
const fs = require('fs').promises;
const path = require('path');

async function initProductionDatabase() {
  console.log('🚀 Manual PostgreSQL database initialization...');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL environment variable is required');
    process.exit(1);
  }

  // Parse DATABASE_URL
  const url = new URL(process.env.DATABASE_URL);
  const config = {
    user: url.username,
    password: url.password,
    host: url.hostname,
    port: parseInt(url.port),
    database: url.pathname.slice(1),
    ssl: {
      rejectUnauthorized: false
    },
    connectionTimeoutMillis: 15000,
    idleTimeoutMillis: 30000,
    max: 5
  };
  
  console.log('📊 Connecting to PostgreSQL:', {
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user
  });
  
  const pool = new Pool(config);

  try {
    // Test connection
    const connectionTest = await pool.query('SELECT NOW() as current_time, version() as pg_version');
    console.log('✅ Database connection successful');
    console.log('🔍 Database info:', {
      current_time: connectionTest.rows[0].current_time,
      version: connectionTest.rows[0].pg_version.split(' ')[0]
    });
    
    // Check if tables already exist
    try {
      await pool.query('SELECT 1 FROM competitions LIMIT 1');
      console.log('✅ Database schema already exists');
      return;
    } catch (error) {
      if (error.code !== '42P01') {
        throw error;
      }
      console.log('🔧 Database schema missing, creating tables...');
    }
    
    // Read and execute schema
    const schemaPath = path.join(__dirname, '../database_schema_postgres.sql');
    console.log('📄 Reading schema from:', schemaPath);
    const schema = await fs.readFile(schemaPath, 'utf8');
    
    console.log('🚀 Executing database schema...');
    await pool.query(schema);
    console.log('✅ Database schema created successfully');
    
    // Create default competition
    const existingCompetitions = await pool.query('SELECT COUNT(*) as count FROM competitions');
    if (parseInt(existingCompetitions.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO competitions (name, description, metadata) 
        VALUES ($1, $2, $3)
      `, [
        'Default Competition',
        'Default competition for cyber forensics challenges',
        JSON.stringify({ theme: 'default', difficulty: 'mixed' })
      ]);
      console.log('✅ Default competition created');
    }
    
    console.log('🎉 Database initialization completed successfully');
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    console.error('❌ Error details:', {
      code: error.code,
      message: error.message,
      detail: error.detail
    });
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run if called directly
if (require.main === module) {
  initProductionDatabase();
}

module.exports = { initProductionDatabase };