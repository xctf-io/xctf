# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a cyber forensics challenge generator that creates realistic websites with hidden CTF flags for educational purposes. It uses AI to generate complete HTML challenges with embedded flags in various locations (metadata, source code, images, etc.).

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
```

The application runs on http://localhost:3000 by default.

## Architecture

### Core API Endpoints

The application has a two-tier API architecture:

1. **`/api/generate-challenge`** - Basic challenge generation using GPT-4o with specialized prompt templates
2. **`/api/generate-enhanced-challenge`** - Advanced two-step generation: analysis → challenge creation with DALL-E 3 images
3. **`/api/generate-image`** - DALL-E 3 image generation with EXIF metadata embedding (using Sharp library)

### Challenge Generation Pipeline

The enhanced generation follows this flow:
1. **Analysis Phase**: GPT-4o analyzes the user description and returns structured JSON with challenge type, flag location strategy, and image requirements
2. **Image Generation**: DALL-E 3 creates realistic images based on the analysis
3. **HTML Generation**: GPT-4o creates complete websites using specialized templates and integrates generated images
4. **Cleanup**: Removes markdown artifacts from AI responses before serving

### Challenge Types & Templates

The system automatically detects and uses specialized prompt templates:
- **web_metadata**: Flags in meta tags, HTML comments, data attributes
- **web_source**: Flags in source code comments, variable names
- **corporate**: Business websites with professional content
- **default**: Flexible template for other scenarios

### Frontend Architecture

Single-page React application (`src/app/page.tsx`) with:
- Split-pane interface (input/preview)
- Dark/light mode toggle
- Source code viewer with syntax highlighting
- Challenge download functionality
- Real-time flag/challenge type display

### Key Dependencies

- **OpenAI**: GPT-4o for content generation, DALL-E 3 for images
- **Sharp**: Image processing and EXIF metadata embedding
- **Next.js 15**: App router with API routes
- **Tailwind CSS 4**: Styling with gradient backgrounds and glass-morphism effects

## Environment Setup

Requires `OPENAI_API_KEY` in `.env.local`. The application always uses GPT-4o (not GPT-3.5) for content generation and optionally includes DALL-E 3 image generation.

## HTML Processing

AI responses are automatically cleaned to remove markdown code blocks (`\`\`\`html` and `\`\`\``) before rendering in the iframe preview. This prevents display artifacts in the generated challenges.