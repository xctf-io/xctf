const { Pool } = require('pg');
const fs = require('fs').promises;
const path = require('path');

async function initializeDatabase() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  try {
    console.log('🚀 Initializing PostgreSQL database...');
    
    // Read and execute the schema file
    const schemaPath = path.join(__dirname, '../database_schema_postgres.sql');
    const schema = await fs.readFile(schemaPath, 'utf8');
    
    await pool.query(schema);
    
    console.log('✅ PostgreSQL database initialized successfully');
    
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
    }
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run if called directly
if (require.main === module) {
  initializeDatabase();
}

module.exports = { initializeDatabase };