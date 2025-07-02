const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class DatabaseManager {
  constructor() {
    this.dbPath = path.join(process.cwd(), 'database.sqlite');
    this.db = null;
  }

  // Initialize database connection
  connect() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(this.dbPath, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('📊 Connected to SQLite database');
          resolve();
        }
      });
    });
  }

  // Close database connection
  close() {
    return new Promise((resolve, reject) => {
      if (this.db) {
        try {
          this.db.close((err) => {
            if (err && err.code !== 'SQLITE_MISUSE') {
              reject(err);
            } else {
              console.log('📊 Database connection closed');
              this.db = null;
              resolve();
            }
          });
        } catch (err) {
          // Already closed
          this.db = null;
          resolve();
        }
      } else {
        resolve();
      }
    });
  }

  // Generic query execution
  query(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Generic single row query
  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  // Generic insert/update/delete
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, changes: this.changes });
        }
      });
    });
  }

  // Competition methods
  async createCompetition(name, description = null, metadata = null) {
    const sql = `
      INSERT INTO competitions (name, description, metadata)
      VALUES (?, ?, ?)
    `;
    const result = await this.run(sql, [name, description, JSON.stringify(metadata)]);
    return result.id;
  }

  async getCompetition(id) {
    const sql = 'SELECT * FROM competitions WHERE id = ?';
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
    
    Object.entries(updates).forEach(([key, value]) => {
      fields.push(`${key} = ?`);
      values.push(key === 'metadata' ? JSON.stringify(value) : value);
    });
    
    if (fields.length === 0) return;
    
    const sql = `UPDATE competitions SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
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
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
    
    const result = await this.run(sql, params);
    return result.id;
  }

  async getChallenge(id) {
    const sql = 'SELECT * FROM challenges WHERE id = ?';
    const challenge = await this.get(sql, [id]);
    if (challenge && challenge.analysis_data) {
      challenge.analysis_data = JSON.parse(challenge.analysis_data);
    }
    return challenge;
  }

  async getChallengesByCompetition(competitionId) {
    const sql = 'SELECT * FROM challenges WHERE competition_id = ? ORDER BY created_at';
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
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
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
    
    const result = await this.run(sql, params);
    return result.id;
  }

  async getNodesByCompetition(competitionId) {
    const sql = `
      SELECT n.*, c.name as challenge_name, c.challenge_type
      FROM nodes n
      JOIN challenges c ON n.challenge_id = c.id
      WHERE n.competition_id = ?
    `;
    return await this.query(sql, [competitionId]);
  }

  async updateNodePosition(nodeId, x, y) {
    const sql = 'UPDATE nodes SET position_x = ?, position_y = ? WHERE id = ?';
    return await this.run(sql, [x, y, nodeId]);
  }

  // Edge methods
  async createEdge(edgeData) {
    const sql = `
      INSERT INTO edges (
        competition_id, from_node_id, to_node_id,
        connection_type, clue_text, unlock_condition
      ) VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    const params = [
      edgeData.competition_id,
      edgeData.from_node_id,
      edgeData.to_node_id,
      edgeData.connection_type || 'sequential',
      edgeData.clue_text,
      edgeData.unlock_condition
    ];
    
    const result = await this.run(sql, params);
    return result.id;
  }

  async getEdgesByCompetition(competitionId) {
    const sql = 'SELECT * FROM edges WHERE competition_id = ?';
    return await this.query(sql, [competitionId]);
  }

  // Challenge Pages methods
  async createChallengePage(pageData) {
    const sql = `
      INSERT INTO challenge_pages (
        challenge_id, page_name, page_path, html_content, is_main_page
      ) VALUES (?, ?, ?, ?, ?)
    `;
    
    const params = [
      pageData.challenge_id,
      pageData.page_name,
      pageData.page_path,
      pageData.html_content,
      pageData.is_main_page || false
    ];
    
    const result = await this.run(sql, params);
    return result.id;
  }

  async getChallengePages(challengeId) {
    const sql = 'SELECT * FROM challenge_pages WHERE challenge_id = ? ORDER BY page_name';
    return await this.query(sql, [challengeId]);
  }

  // Placeholder Links methods
  async createPlaceholderLink(linkData) {
    const sql = `
      INSERT INTO placeholder_links (
        challenge_id, page_id, placeholder_id, link_text,
        context, target_challenge_id, target_page_path
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
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
    
    const result = await this.run(sql, params);
    return result.id;
  }

  async getUnresolvedPlaceholders(challengeId = null) {
    let sql = 'SELECT * FROM placeholder_links WHERE is_resolved = FALSE';
    const params = [];
    
    if (challengeId) {
      sql += ' AND challenge_id = ?';
      params.push(challengeId);
    }
    
    return await this.query(sql, params);
  }

  async resolvePlaceholderLink(linkId, targetChallengeId, targetPagePath = '/') {
    const sql = `
      UPDATE placeholder_links 
      SET target_challenge_id = ?, target_page_path = ?, is_resolved = TRUE
      WHERE id = ?
    `;
    return await this.run(sql, [targetChallengeId, targetPagePath, linkId]);
  }

  // Challenge Context methods
  async createChallengeContext(challengeId, contextType, contextData) {
    const sql = `
      INSERT INTO challenge_context (challenge_id, context_type, context_data)
      VALUES (?, ?, ?)
    `;
    const result = await this.run(sql, [challengeId, contextType, JSON.stringify(contextData)]);
    return result.id;
  }

  async getChallengeContext(challengeId) {
    const sql = 'SELECT * FROM challenge_context WHERE challenge_id = ?';
    const contexts = await this.query(sql, [challengeId]);
    return contexts.map(ctx => {
      ctx.context_data = JSON.parse(ctx.context_data);
      return ctx;
    });
  }
}

// Singleton instance
let dbManager = null;

function getDatabase() {
  if (!dbManager) {
    dbManager = new DatabaseManager();
  }
  return dbManager;
}

module.exports = {
  DatabaseManager,
  getDatabase
};