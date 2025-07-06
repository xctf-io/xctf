const { Pool } = require('pg');
const fs = require('fs').promises;
const path = require('path');

async function initializeDatabase() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL environment variable is not set');
    throw new Error('DATABASE_URL is required for PostgreSQL initialization');
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  try {
    console.log('🚀 Initializing PostgreSQL database...');
    
    // Test connection first
    await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful');
    
    // Read and execute the schema file
    const schemaPath = path.join(__dirname, '../database_schema_postgres.sql');
    const schema = await fs.readFile(schemaPath, 'utf8');
    
    console.log('📄 Executing database schema...');
    await pool.query(schema);
    
    console.log('✅ PostgreSQL database schema applied successfully');
    
    // Create a default competition if none exists
    const existingCompetitions = await pool.query('SELECT COUNT(*) as count FROM competitions');
    if (existingCompetitions.rows[0].count === '0') {
      await pool.query(`
        INSERT INTO competitions (name, description, metadata) 
        VALUES ($1, $2, $3)
      `, [
        'Default Competition',
        'Default competition for cyber forensics challenges',
        JSON.stringify({ theme: 'default', difficulty: 'mixed' })
      ]);
      console.log('✅ Default competition created');
    } else {
      console.log('ℹ️  Database already contains competitions, skipping default creation');
    }
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error; // Re-throw to let caller handle
  } finally {
    await pool.end();
  }
}

// Run if called directly
if (require.main === module) {
  initializeDatabase();
}

module.exports = { initializeDatabase };