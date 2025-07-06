const { Pool } = require('pg');

class PostgresDatabaseManager {
  constructor() {
    // Parse DATABASE_URL to get individual components
    let config;
    
    if (process.env.DATABASE_URL) {
      const url = new URL(process.env.DATABASE_URL);
      config = {
        user: url.username,
        password: url.password,
        host: url.hostname,
        port: parseInt(url.port),
        database: url.pathname.slice(1), // Remove leading slash
        ssl: process.env.NODE_ENV === 'production' ? {
          rejectUnauthorized: false,
          ca: process.env.CA_CERT || process.env.CACERT
        } : false
      };
    } else {
      // Fallback to individual environment variables
      config = {
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        database: process.env.PGDATABASE,
        ssl: process.env.NODE_ENV === 'production' ? {
          rejectUnauthorized: false,
          ca: process.env.CA_CERT || process.env.CACERT
        } : false
      };
    }
    
    this.pool = new Pool(config);
  }

  // Initialize database connection
  async connect() {
    try {
      // Debug: Log available cert environment variables
      console.log('🔍 SSL Debug:', {
        CA_CERT_available: !!process.env.CA_CERT,
        CACERT_available: !!process.env.CACERT,
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_URL_present: !!process.env.DATABASE_URL
      });
      
      await this.pool.query('SELECT NOW()');
      console.log('📊 Connected to PostgreSQL database');
    } catch (err) {
      console.error('Database connection error:', err);
      throw err;
    }
  }

  // Close database connection - for PostgreSQL with connection pooling, we don't actually close
  async close() {
    try {
      // Don't close the pool as it's shared across requests
      // await this.pool.end();
      console.log('📊 Database connection closed (pool maintained)');
    } catch (err) {
      console.error('Database close error:', err);
    }
  }

  // Generic query execution
  async query(sql, params = []) {
    try {
      const result = await this.pool.query(sql, params);
      return result.rows;
    } catch (err) {
      console.error('Query error:', err);
      throw err;
    }
  }

  // Generic single row query
  async get(sql, params = []) {
    const rows = await this.query(sql, params);
    return rows[0] || null;
  }

  // Generic insert/update/delete
  async run(sql, params = []) {
    try {
      const result = await this.pool.query(sql, params);
      return { 
        id: result.rows[0]?.id || result.insertId || null,
        changes: result.rowCount 
      };
    } catch (err) {
      console.error('Run error:', err);
      throw err;
    }
  }

  // Competition methods
  async createCompetition(name, description = null, metadata = null) {
    const sql = `
      INSERT INTO competitions (name, description, metadata)
      VALUES ($1, $2, $3)
      RETURNING id
    `;
    const result = await this.pool.query(sql, [name, description, JSON.stringify(metadata)]);
    return result.rows[0].id;
  }

  async getCompetition(id) {
    const sql = 'SELECT * FROM competitions WHERE id = $1';
    const competition = await this.get(sql, [id]);
    if (competition && competition.metadata) {
      competition.metadata = JSON.parse(competition.metadata);
    }
    return competition;
  }

  async getAllCompetitions() {
    const sql = 'SELECT * FROM competitions ORDER BY created_at DESC';
    const competitions = await this.query(sql);
    return competitions.map(comp => {
      if (comp.metadata) {
        comp.metadata = JSON.parse(comp.metadata);
      }
      return comp;
    });
  }

  async updateCompetition(id, updates) {
    const fields = [];
    const values = [];
    let paramIndex = 1;
    
    Object.entries(updates).forEach(([key, value]) => {
      fields.push(`${key} = $${paramIndex}`);
      values.push(key === 'metadata' ? JSON.stringify(value) : value);
      paramIndex++;
    });
    
    if (fields.length === 0) return;
    
    const sql = `UPDATE competitions SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${paramIndex}`;
    values.push(id);
    
    return await this.run(sql, values);
  }

  // Challenge methods
  async createChallenge(challengeData) {
    const sql = `
      INSERT INTO challenges (
        competition_id, name, description, challenge_type, difficulty,
        flag, flag_location, hiding_technique, interaction_required,
        visual_cues, html_content, analysis_data
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING id
    `;
    
    const params = [
      challengeData.competition_id,
      challengeData.name,
      challengeData.description,
      challengeData.challenge_type,
      challengeData.difficulty || 'medium',
      challengeData.flag,
      challengeData.flag_location,
      challengeData.hiding_technique,
      challengeData.interaction_required,
      challengeData.visual_cues,
      challengeData.html_content,
      JSON.stringify(challengeData.analysis_data)
    ];
    
    const result = await this.pool.query(sql, params);
    return result.rows[0].id;
  }

  async getChallenge(id) {
    const sql = 'SELECT * FROM challenges WHERE id = $1';
    const challenge = await this.get(sql, [id]);
    if (challenge && challenge.analysis_data) {
      challenge.analysis_data = JSON.parse(challenge.analysis_data);
    }
    return challenge;
  }

  async getChallengesByCompetition(competitionId) {
    const sql = 'SELECT * FROM challenges WHERE competition_id = $1 ORDER BY created_at';
    const challenges = await this.query(sql, [competitionId]);
    return challenges.map(challenge => {
      if (challenge.analysis_data) {
        challenge.analysis_data = JSON.parse(challenge.analysis_data);
      }
      return challenge;
    });
  }

  // Node methods
  async createNode(nodeData) {
    const sql = `
      INSERT INTO nodes (
        competition_id, challenge_id, position_x, position_y,
        width, height, color, is_start_node, is_end_node
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id
    `;
    
    const params = [
      nodeData.competition_id,
      nodeData.challenge_id,
      nodeData.position_x || 0,
      nodeData.position_y || 0,
      nodeData.width || 200,
      nodeData.height || 100,
      nodeData.color || '#4f46e5',
      nodeData.is_start_node || false,
      nodeData.is_end_node || false
    ];
    
    const result = await this.pool.query(sql, params);
    return result.rows[0].id;
  }

  async getNodesByCompetition(competitionId) {
    const sql = `
      SELECT n.*, c.name as challenge_name, c.challenge_type
      FROM nodes n
      JOIN challenges c ON n.challenge_id = c.id
      WHERE n.competition_id = $1
    `;
    return await this.query(sql, [competitionId]);
  }

  async updateNodePosition(nodeId, x, y) {
    const sql = 'UPDATE nodes SET position_x = $1, position_y = $2 WHERE id = $3';
    return await this.run(sql, [x, y, nodeId]);
  }

  // Edge methods
  async createEdge(edgeData) {
    const sql = `
      INSERT INTO edges (
        competition_id, from_node_id, to_node_id,
        connection_type, clue_text, unlock_condition
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;
    
    const params = [
      edgeData.competition_id,
      edgeData.from_node_id,
      edgeData.to_node_id,
      edgeData.connection_type || 'sequential',
      edgeData.clue_text,
      edgeData.unlock_condition
    ];
    
    const result = await this.pool.query(sql, params);
    return result.rows[0].id;
  }

  async getEdgesByCompetition(competitionId) {
    const sql = 'SELECT * FROM edges WHERE competition_id = $1';
    return await this.query(sql, [competitionId]);
  }

  // Challenge Pages methods
  async createChallengePage(pageData) {
    const sql = `
      INSERT INTO challenge_pages (
        challenge_id, page_name, page_path, html_content, is_main_page
      ) VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;
    
    const params = [
      pageData.challenge_id,
      pageData.page_name,
      pageData.page_path,
      pageData.html_content,
      pageData.is_main_page || false
    ];
    
    const result = await this.pool.query(sql, params);
    return result.rows[0].id;
  }

  async getChallengePages(challengeId) {
    const sql = 'SELECT * FROM challenge_pages WHERE challenge_id = $1 ORDER BY page_name';
    return await this.query(sql, [challengeId]);
  }

  // Placeholder Links methods
  async createPlaceholderLink(linkData) {
    const sql = `
      INSERT INTO placeholder_links (
        challenge_id, page_id, placeholder_id, link_text,
        context, target_challenge_id, target_page_path
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `;
    
    const params = [
      linkData.challenge_id,
      linkData.page_id || null,
      linkData.placeholder_id,
      linkData.link_text,
      linkData.context,
      linkData.target_challenge_id || null,
      linkData.target_page_path || '/'
    ];
    
    const result = await this.pool.query(sql, params);
    return result.rows[0].id;
  }

  async getUnresolvedPlaceholders(challengeId = null) {
    let sql = 'SELECT * FROM placeholder_links WHERE is_resolved = FALSE';
    const params = [];
    
    if (challengeId) {
      sql += ' AND challenge_id = $1';
      params.push(challengeId);
    }
    
    return await this.query(sql, params);
  }

  async resolvePlaceholderLink(linkId, targetChallengeId, targetPagePath = '/') {
    const sql = `
      UPDATE placeholder_links 
      SET target_challenge_id = $1, target_page_path = $2, is_resolved = TRUE
      WHERE id = $3
    `;
    return await this.run(sql, [targetChallengeId, targetPagePath, linkId]);
  }

  // Challenge Context methods
  async createChallengeContext(challengeId, contextType, contextData) {
    const sql = `
      INSERT INTO challenge_context (challenge_id, context_type, context_data)
      VALUES ($1, $2, $3)
      RETURNING id
    `;
    const result = await this.pool.query(sql, [challengeId, contextType, JSON.stringify(contextData)]);
    return result.rows[0].id;
  }

  async getChallengeContext(challengeId) {
    const sql = 'SELECT * FROM challenge_context WHERE challenge_id = $1';
    const contexts = await this.query(sql, [challengeId]);
    return contexts.map(ctx => {
      ctx.context_data = JSON.parse(ctx.context_data);
      return ctx;
    });
  }
}

module.exports = PostgresDatabaseManager;