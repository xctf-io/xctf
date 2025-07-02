-- Cyber Forensics Platform Database Schema
-- This schema supports node-based challenge management with intelligent linking

-- Competitions table - top level container for challenge sets
CREATE TABLE competitions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    metadata JSON -- For storing additional configuration
);

-- Challenges table - stores individual challenge data
CREATE TABLE challenges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    competition_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL, -- Original user prompt
    challenge_type TEXT NOT NULL, -- web_visual_hidden, web_interactive, etc.
    difficulty TEXT DEFAULT 'medium', -- easy, medium, hard
    flag TEXT NOT NULL,
    flag_location TEXT,
    hiding_technique TEXT,
    interaction_required TEXT,
    visual_cues TEXT,
    html_content TEXT NOT NULL, -- Main challenge HTML
    analysis_data JSON, -- AI analysis results
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (competition_id) REFERENCES competitions(id) ON DELETE CASCADE
);

-- Challenge pages table - for multi-page challenges
CREATE TABLE challenge_pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    challenge_id INTEGER NOT NULL,
    page_name TEXT NOT NULL, -- e.g., 'home', 'about', 'contact'
    page_path TEXT NOT NULL, -- e.g., '/about', '/contact'
    html_content TEXT NOT NULL,
    is_main_page BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE,
    UNIQUE(challenge_id, page_path)
);

-- Nodes table - graph representation of challenges
CREATE TABLE nodes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    competition_id INTEGER NOT NULL,
    challenge_id INTEGER NOT NULL,
    position_x REAL NOT NULL DEFAULT 0,
    position_y REAL NOT NULL DEFAULT 0,
    width REAL DEFAULT 200,
    height REAL DEFAULT 100,
    color TEXT DEFAULT '#4f46e5', -- Node color
    is_start_node BOOLEAN DEFAULT FALSE,
    is_end_node BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (competition_id) REFERENCES competitions(id) ON DELETE CASCADE,
    FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE,
    UNIQUE(competition_id, challenge_id)
);

-- Edges table - connections between challenges
CREATE TABLE edges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    competition_id INTEGER NOT NULL,
    from_node_id INTEGER NOT NULL,
    to_node_id INTEGER NOT NULL,
    connection_type TEXT DEFAULT 'sequential', -- sequential, conditional, optional
    clue_text TEXT, -- The clue that leads from source to target
    unlock_condition TEXT, -- Condition that must be met to unlock this edge
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (competition_id) REFERENCES competitions(id) ON DELETE CASCADE,
    FOREIGN KEY (from_node_id) REFERENCES nodes(id) ON DELETE CASCADE,
    FOREIGN KEY (to_node_id) REFERENCES nodes(id) ON DELETE CASCADE,
    UNIQUE(from_node_id, to_node_id)
);

-- Placeholder links table - manages links that need to be resolved
CREATE TABLE placeholder_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    challenge_id INTEGER NOT NULL,
    page_id INTEGER, -- NULL if main challenge page
    placeholder_id TEXT NOT NULL, -- e.g., "NEXT_CHALLENGE_LINK_1"
    link_text TEXT, -- The text that should be clickable
    context TEXT, -- Where in the HTML this link appears
    target_challenge_id INTEGER, -- NULL until resolved
    target_page_path TEXT DEFAULT '/', -- Which page of target challenge
    is_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE,
    FOREIGN KEY (page_id) REFERENCES challenge_pages(id) ON DELETE CASCADE,
    FOREIGN KEY (target_challenge_id) REFERENCES challenges(id) ON DELETE SET NULL
);

-- Generated images table - track AI-generated images
CREATE TABLE generated_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    challenge_id INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    image_description TEXT,
    alt_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE
);

-- Challenge context table - stores context for linked challenge generation
CREATE TABLE challenge_context (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    challenge_id INTEGER NOT NULL,
    context_type TEXT NOT NULL, -- 'previous_challenge', 'competition_theme', 'user_context'
    context_data JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX idx_challenges_competition ON challenges(competition_id);
CREATE INDEX idx_challenge_pages_challenge ON challenge_pages(challenge_id);
CREATE INDEX idx_nodes_competition ON nodes(competition_id);
CREATE INDEX idx_edges_competition ON edges(competition_id);
CREATE INDEX idx_edges_from_node ON edges(from_node_id);
CREATE INDEX idx_edges_to_node ON edges(to_node_id);
CREATE INDEX idx_placeholder_links_challenge ON placeholder_links(challenge_id);
CREATE INDEX idx_placeholder_links_unresolved ON placeholder_links(is_resolved) WHERE is_resolved = FALSE;
CREATE INDEX idx_generated_images_challenge ON generated_images(challenge_id);
CREATE INDEX idx_challenge_context_challenge ON challenge_context(challenge_id);

-- Triggers to update updated_at timestamps
CREATE TRIGGER update_competitions_timestamp 
    AFTER UPDATE ON competitions
    BEGIN
        UPDATE competitions SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER update_challenges_timestamp 
    AFTER UPDATE ON challenges
    BEGIN
        UPDATE challenges SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;