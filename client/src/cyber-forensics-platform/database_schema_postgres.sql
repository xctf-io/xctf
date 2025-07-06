-- PostgreSQL schema for cyber forensics platform
-- Run this SQL to create the database structure

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Competitions table
CREATE TABLE IF NOT EXISTS competitions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Challenges table
CREATE TABLE IF NOT EXISTS challenges (
    id SERIAL PRIMARY KEY,
    competition_id INTEGER REFERENCES competitions(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    challenge_type VARCHAR(50) NOT NULL,
    difficulty VARCHAR(20) DEFAULT 'medium',
    flag VARCHAR(255) NOT NULL,
    flag_location VARCHAR(255),
    hiding_technique VARCHAR(255),
    interaction_required BOOLEAN DEFAULT FALSE,
    visual_cues TEXT,
    html_content TEXT,
    analysis_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Nodes table (for graph visualization)
CREATE TABLE IF NOT EXISTS nodes (
    id SERIAL PRIMARY KEY,
    competition_id INTEGER REFERENCES competitions(id) ON DELETE CASCADE,
    challenge_id INTEGER REFERENCES challenges(id) ON DELETE CASCADE,
    position_x REAL DEFAULT 0,
    position_y REAL DEFAULT 0,
    width INTEGER DEFAULT 200,
    height INTEGER DEFAULT 100,
    color VARCHAR(7) DEFAULT '#4f46e5',
    is_start_node BOOLEAN DEFAULT FALSE,
    is_end_node BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Edges table (for graph connections)
CREATE TABLE IF NOT EXISTS edges (
    id SERIAL PRIMARY KEY,
    competition_id INTEGER REFERENCES competitions(id) ON DELETE CASCADE,
    from_node_id INTEGER REFERENCES nodes(id) ON DELETE CASCADE,
    to_node_id INTEGER REFERENCES nodes(id) ON DELETE CASCADE,
    connection_type VARCHAR(50) DEFAULT 'sequential',
    clue_text TEXT,
    unlock_condition TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Challenge pages table (for multi-page challenges)
CREATE TABLE IF NOT EXISTS challenge_pages (
    id SERIAL PRIMARY KEY,
    challenge_id INTEGER REFERENCES challenges(id) ON DELETE CASCADE,
    page_name VARCHAR(255) NOT NULL,
    page_path VARCHAR(255) NOT NULL,
    html_content TEXT,
    is_main_page BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Placeholder links table (for future connections)
CREATE TABLE IF NOT EXISTS placeholder_links (
    id SERIAL PRIMARY KEY,
    challenge_id INTEGER REFERENCES challenges(id) ON DELETE CASCADE,
    page_id INTEGER REFERENCES challenge_pages(id) ON DELETE CASCADE,
    placeholder_id VARCHAR(255) NOT NULL,
    link_text VARCHAR(255),
    context TEXT,
    target_challenge_id INTEGER REFERENCES challenges(id),
    target_page_path VARCHAR(255) DEFAULT '/',
    is_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Challenge context table (for linking challenges)
CREATE TABLE IF NOT EXISTS challenge_context (
    id SERIAL PRIMARY KEY,
    challenge_id INTEGER REFERENCES challenges(id) ON DELETE CASCADE,
    context_type VARCHAR(50) NOT NULL,
    context_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_challenges_competition_id ON challenges(competition_id);
CREATE INDEX IF NOT EXISTS idx_nodes_competition_id ON nodes(competition_id);
CREATE INDEX IF NOT EXISTS idx_nodes_challenge_id ON nodes(challenge_id);
CREATE INDEX IF NOT EXISTS idx_edges_competition_id ON edges(competition_id);
CREATE INDEX IF NOT EXISTS idx_edges_from_node_id ON edges(from_node_id);
CREATE INDEX IF NOT EXISTS idx_edges_to_node_id ON edges(to_node_id);
CREATE INDEX IF NOT EXISTS idx_challenge_pages_challenge_id ON challenge_pages(challenge_id);
CREATE INDEX IF NOT EXISTS idx_placeholder_links_challenge_id ON placeholder_links(challenge_id);
CREATE INDEX IF NOT EXISTS idx_placeholder_links_is_resolved ON placeholder_links(is_resolved);
CREATE INDEX IF NOT EXISTS idx_challenge_context_challenge_id ON challenge_context(challenge_id);

-- Create a trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply the trigger to all tables with updated_at column
CREATE TRIGGER update_competitions_updated_at BEFORE UPDATE ON competitions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_challenges_updated_at BEFORE UPDATE ON challenges FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_nodes_updated_at BEFORE UPDATE ON nodes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_edges_updated_at BEFORE UPDATE ON edges FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_challenge_pages_updated_at BEFORE UPDATE ON challenge_pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_placeholder_links_updated_at BEFORE UPDATE ON placeholder_links FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_challenge_context_updated_at BEFORE UPDATE ON challenge_context FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();