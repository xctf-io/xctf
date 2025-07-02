# Cyber Forensics Platform

A node-based cyber forensics challenge platform with intelligent linking capabilities. This platform allows teachers to generate full cyber forensics challenges from natural language and visualize them in an interactive graph layout.

## Features

- **Node-Based Graph Interface**: Visualize challenges as connected nodes in an interactive graph
- **Intelligent Challenge Linking**: AI-powered context management for creating coherent challenge flows
- **Multi-Page Website Generation**: Generate complex websites with multiple pages within single challenges
- **Placeholder Link Management**: Automatically resolve links between challenges as they're created
- **Local SQLite Database**: Store all challenges, relationships, and metadata locally
- **OpenAI Integration**: Use GPT-4o and DALL-E 3 for content and image generation

## Architecture Overview

The platform consists of several key components:

### Database Layer
- **SQLite Database**: Local storage for all challenge and competition data
- **Comprehensive Schema**: Supports challenges, nodes, edges, pages, and linking metadata
- **Database Manager**: Clean abstraction layer for all database operations

### Challenge Generation
- **Multi-Page Support**: Generate websites with multiple interconnected pages
- **Context Management**: Pass relevant context between linked challenges
- **Placeholder Links**: Automatically create and resolve links between challenges
- **Image Integration**: DALL-E 3 generated images embedded in challenges

### Graph Visualization
- **ReactFlow Integration**: Interactive node-based graph interface
- **Real-time Updates**: Graph updates automatically as challenges are added
- **Visual Feedback**: Different node styles for start/end challenges and challenge types

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd cyber-forensics-platform
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local and add your OpenAI API key
   ```

3. **Initialize the database:**
   ```bash
   npm run db:init
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage Guide

### Creating Your First Competition

1. **Start the Application**: Open the platform in your browser
2. **Create Competition**: Click "New Competition" to create your first competition
3. **Add First Challenge**: Click "Add Challenge" to generate your first challenge

### Generating Challenges

The platform supports several challenge generation modes:

#### Standalone Challenge
- Enter a challenge description
- The AI will analyze and create an appropriate challenge type
- Supports single-page or multi-page websites

#### Linked Challenge
- Select "Link to Previous Challenge" when creating a new challenge
- Choose which previous challenge to link from
- The AI will create narrative connections and contextual clues

### Challenge Types Supported

The platform supports multiple challenge types:
- **web_visual_hidden**: Visual hiding techniques (white text, transparent elements)
- **web_multipage**: Hidden navigation and subpages
- **web_interactive**: Flag revealed through user interactions
- **web_social_media**: Social platform simulations
- **web_puzzle_game**: Game-based challenges
- **web_fake_error**: Error pages with hidden recovery options
- **web_search_filter**: Content discovery through filtering
- **web_mobile_responsive**: Device-specific content

### Workflow Example

1. **Create Competition**: "Spring 2024 CTF"
2. **First Challenge**: "Sally and John are talking on a social media site, John sends a link in the last message"
3. **Linked Challenge**: "A corporate website with a hidden admin panel" (linked from the social media challenge)
4. **Final Challenge**: "A fake error page with debug information" (linked from the corporate site)

## Database Schema

### Core Tables

- **competitions**: Top-level competition containers
- **challenges**: Individual challenge data and metadata
- **challenge_pages**: Multi-page challenge support
- **nodes**: Graph visualization data
- **edges**: Challenge relationships and connections
- **placeholder_links**: Link resolution management
- **challenge_context**: Context data for linked generation

### Key Relationships

```
competitions (1) -> (*) challenges
challenges (1) -> (*) challenge_pages
challenges (1) -> (1) nodes
nodes (*) -> (*) edges
challenges (1) -> (*) placeholder_links
challenges (1) -> (*) challenge_context
```

## API Endpoints

### Competition Management
- `GET /api/competitions` - List all competitions
- `POST /api/competitions` - Create new competition
- `GET /api/competitions/[id]/challenges` - Get competition challenges
- `GET /api/competitions/[id]/nodes` - Get competition graph nodes
- `GET /api/competitions/[id]/edges` - Get competition graph edges

### Challenge Generation
- `POST /api/challenges/generate` - Generate new challenge with linking support

### Graph Management
- `PUT /api/nodes/[id]/position` - Update node position

## Database Operations

### Initialize Database
```bash
npm run db:init
```

### Database Location
The SQLite database is stored at `./database.sqlite` in the project root.

### Backup Database
```bash
cp database.sqlite database.backup.sqlite
```

### Database Schema Updates
1. Modify `database_schema.sql`
2. Run `npm run db:init` to recreate with new schema
3. Existing data will be lost - implement migration if needed

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

# Initialize database
npm run db:init
```

## Configuration

### Environment Variables

```bash
# Required
OPENAI_API_KEY=your_openai_api_key_here

# Optional
DATABASE_PATH=./database.sqlite
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Challenge Generation Settings

The platform uses specific prompts and parameters for consistent challenge generation:
- **Model**: GPT-4o for text generation
- **Image Model**: DALL-E 3 for image generation
- **Temperature**: 0.3 for analysis, 0.8 for content generation
- **Max Tokens**: 1500 for analysis, 4000 for HTML generation

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Ensure database is initialized: `npm run db:init`
   - Check file permissions on `database.sqlite`

2. **OpenAI API Errors**  
   - Verify API key in `.env.local`
   - Check API key has sufficient credits
   - Ensure API key has access to GPT-4o and DALL-E 3

3. **Graph Not Loading**
   - Check browser console for errors
   - Verify API endpoints are responding
   - Refresh the page to reload graph data

### Development Tips

- Use browser developer tools to inspect API calls
- Check console logs for detailed error information  
- Database operations are logged with emoji indicators
- Graph state updates are logged in the console

## Future Enhancements

Potential areas for expansion:
- Challenge preview and testing interface
- Bulk challenge generation
- Challenge templates and presets
- Export/import competition functionality
- Challenge difficulty analysis
- Performance analytics
- Multi-user collaboration

## Technical Notes

### Dependencies
- **Next.js 15**: React framework with App Router
- **ReactFlow**: Graph visualization
- **SQLite3**: Local database
- **OpenAI**: AI content generation
- **Tailwind CSS**: Styling framework

### File Structure
```
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components
│   └── lib/                 # Utility libraries
├── scripts/                 # Database scripts
├── database_schema.sql      # Database schema
└── README.md               # This file
```