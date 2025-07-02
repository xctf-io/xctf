#!/usr/bin/env node

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'database.sqlite');
const SCHEMA_PATH = path.join(__dirname, '..', 'database_schema.sql');

async function initializeDatabase() {
  console.log('🗄️  Initializing Cyber Forensics Platform Database...');
  
  try {
    // Remove existing database if it exists
    if (fs.existsSync(DB_PATH)) {
      console.log('📝 Removing existing database...');
      fs.unlinkSync(DB_PATH);
    }
    
    // Read schema file
    console.log('📖 Reading database schema...');
    const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
    
    // Create new database
    console.log('🏗️  Creating new database...');
    const db = new sqlite3.Database(DB_PATH);
    
    // Execute schema
    console.log('📋 Executing schema...');
    await new Promise((resolve, reject) => {
      db.exec(schema, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    
    // Verify tables created
    console.log('✅ Verifying table creation...');
    const tables = await new Promise((resolve, reject) => {
      db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    
    console.log('📊 Created tables:');
    tables.forEach(table => {
      console.log(`   - ${table.name}`);
    });
    
    // Close database
    db.close();
    
    console.log('🎉 Database initialized successfully!');
    console.log(`📍 Database location: ${DB_PATH}`);
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  initializeDatabase();
}

module.exports = initializeDatabase;