# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a node-based cyber forensics challenge platform that generates complete CTF challenges from natural language descriptions. It uses OpenAI's GPT-4o and DALL-E 3 to create realistic websites with hidden flags, then displays them in an interactive graph where challenges can be linked together narratively.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Database operations
npm run db:init       # Initialize/reset database
npm run db:migrate    # Run migrations (placeholder)
npm run db:seed       # Seed data (placeholder)
```

The application runs on http://localhost:3000 by default.

## Architecture

### Database Layer (`src/lib/database.js`)
The platform uses a singleton `DatabaseManager` class that provides Promise-based wrappers around sqlite3. Key patterns:
- Always call `await db.connect()` before operations and `await db.close()` after
- The database auto-creates relationships between competitions, challenges, nodes, and edges
- Schema is defined in `database_schema.sql` and applied via `scripts/init-db.js`
- Each challenge automatically gets a corresponding node for graph visualization

### Challenge Generation Pipeline (`src/app/api/challenges/generate/route.ts`)
Three-step AI-powered generation process:
1. **Analysis Phase**: GPT-4o analyzes the user description and returns structured JSON with business context, multi-page structure, and realistic website specifications
2. **Image Generation**: DALL-E 3 creates professional business images based on analysis (if enabled)
3. **HTML Generation**: GPT-4o creates complete single-page applications with JavaScript navigation, realistic business content, and proper flag hiding

### Enhanced Challenge Generation Features
- **Realistic Business Websites**: Creates complete professional websites (restaurants, consulting firms, portfolios, etc.)
- **Single-Page Applications**: All content in one HTML file with JavaScript navigation to avoid iframe routing conflicts  
- **Multi-Page Navigation**: JavaScript-powered navigation between sections (Home, About, Services, Contact)
- **Professional Content**: Realistic business descriptions, contact information, service offerings
- **Context-Aware Linking**: Intelligent narrative connections between challenges
- **Enhanced Prompting**: Detailed business context and technical requirements for realistic output

### Graph Architecture (`src/components/CompetitionGraph.tsx`)
Uses ReactFlow for node-based visualization:
- Custom `ChallengeNode` component displays challenge metadata
- Real-time position updates saved to database via `PUT /api/nodes/[id]/position`
- Nodes are automatically created when challenges are generated
- Edges represent narrative links between challenges
- Interactive challenge viewing with full-screen modal

### Challenge Viewer (`src/components/ChallengeViewer.tsx`)
Professional challenge viewing interface:
- **Preview Tab**: Full iframe preview with proper sandboxing
- **Source Code Tab**: Syntax-highlighted HTML source
- **Challenge Info Tab**: Flag location, hiding technique, solving instructions
- **Actions**: Download source, open in new tab, copy flag
- **Loading States**: Proper loading and error handling

### Challenge Types and Context Management
The platform supports 10+ challenge types (web_visual_hidden, web_multipage, web_interactive, etc.) with specialized prompts for each. Context management allows challenges to reference previous challenges for coherent storytelling.

## Key Workflows

### Creating Linked Challenges
When generating a challenge with `linkToPrevious: true`, the system:
1. Retrieves context from the previous challenge (flag, type, name)
2. Builds narrative connections in the AI prompt
3. Creates placeholder links that can be resolved later
4. Automatically creates edges in the graph

### Multi-Page Challenge Support
Challenges can have multiple pages stored in the `challenge_pages` table:
- Each page has its own HTML content and path (/, /about, /contact, etc.)
- Pages can contain flags, clues, or navigation elements
- The main challenge page is stored in both `challenges.html_content` and `challenge_pages`

### Database Relationships
```
competitions (1:many) challenges
challenges (1:1) nodes (for graph positioning)
challenges (1:many) challenge_pages (for multi-page sites)
challenges (1:many) placeholder_links (for future connections)
nodes (many:many) edges (for graph connections)
```

## Environment Setup

Requires `OPENAI_API_KEY` in `.env.local`. The platform uses:
- GPT-4o for all text generation (analysis and HTML creation)
- DALL-E 3 for image generation (when enabled)
- SQLite database stored at `./database.sqlite` (development)
- PostgreSQL database via `DATABASE_URL` (production)

## DigitalOcean Deployment

The platform is configured for DigitalOcean App Platform deployment:

### Database Configuration
- **Development**: Uses SQLite (`database.sqlite`)
- **Production**: Uses PostgreSQL managed database
- Database selection is automatic based on `NODE_ENV` and `DATABASE_URL` environment variables

### Required Environment Variables
- `OPENAI_API_KEY`: OpenAI API key for challenge generation
- `DATABASE_URL`: PostgreSQL connection string (auto-configured by DigitalOcean)
- `NODE_ENV`: Set to `production` for production deployment

### Deployment Configuration
- App configuration: `.do/app.yaml`
- PostgreSQL schema: `database_schema_postgres.sql`
- Database initialization: `npm run db:init:postgres`

### DigitalOcean Setup Steps
1. Create new App Platform app from this repository
2. Configure environment variables in App Platform dashboard
3. App Platform will automatically provision PostgreSQL database
4. Database tables will be created automatically on first deployment

## API Route Patterns

### Next.js 15 Compatibility
All dynamic routes use `await params` pattern:
```typescript
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // ...
}
```

### Database Connection Pattern
```typescript
const db = getDatabase();
await db.connect();
try {
  // database operations
} finally {
  await db.close();
}
```

## Component Architecture

### Modal Components
- `ChallengeGenerator`: Full-screen modal for creating new challenges
- `ChallengeViewer`: Tabbed interface (Preview/Source/Info) for viewing challenges

### Graph Components
- `CompetitionGraph`: Main graph container with ReactFlow
- `ChallengeNode`: Custom node component showing challenge metadata
- `CompetitionSelector`: Dropdown for switching between competitions

### State Management
Uses React state with manual refresh patterns. Graph data is loaded on component mount and refreshed after challenge creation. No global state management library is used.

## Challenge Generation Prompts

The system uses two-phase prompting:
1. **Analysis Prompt**: Structured prompt that returns JSON with challenge type, hiding technique, image requirements, and multi-page structure
2. **HTML Generation Prompt**: Type-specific prompts that create complete websites with embedded flags

Challenge types have specialized instructions for hiding techniques (e.g., white text, hover effects, form interactions, hidden navigation).

## Troubleshooting

### Database Issues
- If database errors occur, run `npm run db:init` to recreate
- Database connections are logged with 📊 emoji indicators
- SQLITE_MISUSE errors are caught and handled gracefully

### OpenAI Integration
- All API calls use extensive logging with emoji indicators (🎯, 🔍, 🎨, 🌐)
- Requests include detailed prompts for reproducibility
- Fallback analysis is provided if JSON parsing fails