import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface EnhancedChallengeRequest {
  description: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  includeImages?: boolean;
}

export async function POST(request: NextRequest) {
  const requestId = Math.random().toString(36).substring(2, 15);
  const startTime = Date.now();
  
  console.group(`🎯 [${requestId}] Enhanced Challenge Generation Request`);
  console.log('⏰ Request Time:', new Date().toISOString());
  
  try {
    const requestBody = await request.json();
    const { description, difficulty = 'medium', includeImages = true }: EnhancedChallengeRequest = requestBody;
    
    console.log('📤 Request Headers:', Object.fromEntries(request.headers.entries()));
    console.log('📤 Request Body:', requestBody);
    console.log('📋 Parsed Parameters:', { description: description?.substring(0, 100) + '...', difficulty, includeImages });
    
    if (!description) {
      console.error('❌ Validation Error: Description is required');
      console.groupEnd();
      return NextResponse.json({ error: 'Description is required' }, { status: 400 });
    }

    // Step 1: Analyze the challenge requirements
    console.log('🔍 Step 1: Starting challenge analysis...');
    const analysisPrompt = `Analyze this cyber forensics challenge description and provide a structured plan:
"${description}"

AVAILABLE CHALLENGE TYPES:

**web_visual_hidden**: Visual hiding techniques that don't require source viewing
- White text on white background (discoverable by highlighting)
- Transparent/nearly invisible elements (opacity: 0.01)
- Off-screen positioning (position: absolute; left: -9999px)
- Hover effects that reveal hidden content
- Text with same color as background
- Use when: description mentions "white text", "highlight", "transparent", "invisible", "hover"

**web_multipage**: Hidden navigation and subpages within single HTML file
- Hidden navigation links (display: none or very small/transparent)
- JavaScript-triggered navigation after specific actions
- Modal overlays or hidden div sections acting as "pages"
- CSS section switching based on user interaction
- Breadcrumb trails or hints to hidden sections
- Use when: description mentions "subpage", "hidden page", "navigation", "hidden link", "modal"

**web_steganography**: Advanced visual hiding beyond basic techniques
- CSS overlays on images revealing text on hover
- Base64 encoded images with hidden text in comments
- ASCII art hidden in source or overlays
- CSS background images with subtle text overlays
- JavaScript decoding hidden messages from image data
- Use when: description mentions "steganography", "image hiding", "overlay", "ascii art", "encoded"

**web_interactive**: Flag revealed through user interactions
- Clicking buttons/links in specific sequences
- Form submissions with specific values
- Hovering over elements in particular order
- Scroll-triggered JavaScript events
- Typing specific keywords in input fields
- Multi-step interactive processes
- Use when: description mentions "click", "interact", "button", "form", "sequence", "scroll", "submit"

**web_source**: Traditional source code hiding (still available when needed)
- HTML comments, JavaScript variables, CSS comments
- Requires viewing page source to discover
- Use when: description explicitly mentions "source", "comment", "view source"

**web_social_media**: Social platform simulation challenges
- Hidden content in fake social media feeds
- Flags in "private" messages or profile bios
- Interactive like/follow mechanics to reveal content
- User authentication flows with hidden flags
- Use when: description mentions "social", "facebook", "twitter", "instagram", "profile", "social media", "feed", "post"

**web_puzzle_game**: Game-based interactive challenges
- Simple browser games with flags as rewards
- Memory games, tic-tac-toe, word puzzles, or mini-games
- Flag revealed upon completion or achieving specific score
- Game mechanics integrated naturally into website theme
- Use when: description mentions "game", "puzzle", "play", "score", "win", "challenge", "quiz"

**web_fake_error**: Error page with discoverable content
- Fake 404/500 error pages with hidden recovery options
- Click "Report Bug" buttons or error codes for reveals
- Console logs with "debug" information containing flags
- Hidden admin/debug panels accessible from error states
- Use when: description mentions "error", "404", "broken", "bug", "debug", "crash", "maintenance"

**web_search_filter**: Content discovery through filtering/search
- Search boxes that reveal content with specific terms
- Filter dropdowns hiding flags in filtered results
- Pagination with flags on specific page numbers
- Advanced search features revealing hidden content
- Use when: description mentions "search", "filter", "results", "find", "lookup", "query", "database"

**web_mobile_responsive**: Device-specific content revelation
- Content only visible on mobile/desktop viewport sizes
- CSS media queries hiding flags at specific screen dimensions
- Touch gestures or mobile-specific interactions
- Rotate device instructions for content reveal
- Use when: description mentions "mobile", "responsive", "device", "screen", "tablet", "phone", "viewport"

**corporate**: Professional business websites
- Use for: corporate, business, company, login pages

**portfolio/ecommerce/blog**: Thematic website types
- Use based on website theme described

ANALYSIS GUIDELINES:
- Prioritize challenge types that work without viewing source code
- Match keywords in description to appropriate challenge type
- Consider user experience: visual/interactive discovery > source viewing
- Choose techniques that fit naturally within the website theme

Return a JSON response with:
{
  "challengeType": "web_source | web_visual_hidden | web_multipage | web_steganography | web_interactive | web_social_media | web_puzzle_game | web_fake_error | web_search_filter | web_mobile_responsive | corporate | portfolio | ecommerce | blog",
  "flagLocation": "specific location where the flag should be hidden",
  "websiteTheme": "detailed theme description matching the challenge context", 
  "requiredImages": ["description of image 1", "description of image 2", ...],
  "complexity": "simple | moderate | complex",
  "hidingTechnique": "specific CSS/JavaScript/HTML technique for hiding (e.g., 'white text on white background', 'hover reveal', 'form submission trigger', 'hidden navigation link')",
  "interactionRequired": "specific user action needed to reveal flag (e.g., 'highlight text', 'hover over image', 'click sequence', 'form submission', 'view source')",
  "visualCues": "hints or clues that should be provided to guide users to the flag",
  "difficultyJustification": "why this complexity level was chosen"
}`;

    console.log('📤 OpenAI Analysis Request:', {
      model: 'gpt-4o',
      maxTokens: 1000,
      temperature: 0.3,
      promptLength: analysisPrompt.length
    });
    
    const analysisStartTime = Date.now();
    const analysisResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a cyber forensics expert. Analyze challenge requirements and return structured JSON responses."
        },
        {
          role: "user", 
          content: analysisPrompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.3,
    });
    
    const analysisEndTime = Date.now();
    console.log('📥 OpenAI Analysis Response:', {
      duration: `${analysisEndTime - analysisStartTime}ms`,
      usage: analysisResponse.usage,
      model: analysisResponse.model,
      finishReason: analysisResponse.choices[0]?.finish_reason
    });

    let analysis;
    try {
      const analysisContent = analysisResponse.choices[0]?.message?.content || '';
      console.log('📄 Raw Analysis Response:', analysisContent);
      analysis = JSON.parse(analysisContent);
      console.log('✅ Parsed Analysis:', analysis);
    } catch (error) {
      console.warn('⚠️ JSON parsing failed, using fallback analysis:', error instanceof Error ? error.message : String(error));
      // Fallback if JSON parsing fails
      analysis = {
        challengeType: 'web_visual_hidden',
        flagLocation: 'hidden text element',
        websiteTheme: description,
        requiredImages: ['theme-related image'],
        complexity: 'moderate',
        hidingTechnique: 'white text on white background',
        interactionRequired: 'highlight text to reveal hidden content',
        visualCues: 'subtle hints about selecting or highlighting text',
        difficultyJustification: 'visual hiding requires user interaction but no technical knowledge'
      };
      console.log('🔄 Fallback Analysis:', analysis);
    }

    // Step 2: Generate images if needed
    console.log('🎨 Step 2: Starting image generation...');
    const generatedImages = [];
    if (includeImages && analysis.requiredImages && analysis.requiredImages.length > 0) {
      console.log(`📸 Generating ${Math.min(analysis.requiredImages.length, 3)} images`);
      
      for (const [index, imageDesc] of analysis.requiredImages.slice(0, 3).entries()) {
        try {
          const imagePrompt = `Professional, high-quality photograph: ${imageDesc}. Realistic, detailed, suitable for a ${analysis.challengeType} website.`;
          console.log(`🖼️ Image ${index + 1} Request:`, {
            model: 'dall-e-3',
            prompt: imagePrompt,
            size: '1024x1024'
          });
          
          const imageStartTime = Date.now();
          const imageResponse = await openai.images.generate({
            model: "dall-e-3",
            prompt: imagePrompt,
            size: "1024x1024",
            quality: "standard",
            n: 1,
          });
          
          const imageEndTime = Date.now();
          console.log(`📥 Image ${index + 1} Response:`, {
            duration: `${imageEndTime - imageStartTime}ms`,
            url: imageResponse.data?.[0]?.url ? 'Generated successfully' : 'No URL received',
            revisedPrompt: imageResponse.data?.[0]?.revised_prompt
          });
          
          if (imageResponse.data?.[0]?.url) {
            generatedImages.push({
              url: imageResponse.data[0].url,
              description: imageDesc,
              alt: imageDesc
            });
          }
        } catch (error) {
          console.error(`❌ Error generating image ${index + 1}:`, {
            error: error instanceof Error ? error.message : String(error),
            type: error instanceof Error ? error.name : 'Unknown',
            imageDesc
          });
          // Continue with other images if one fails
        }
      }
      
      console.log(`✅ Generated ${generatedImages.length} images successfully`);
    } else {
      console.log('⏭️ Skipping image generation (includeImages: false or no required images)');
    }

    // Step 3: Generate the HTML challenge with integrated images
    console.log('🌐 Step 3: Starting HTML generation...');
    const flag = `CTF{${analysis.challengeType}_${Date.now().toString(36)}}`;
    console.log('🏳️ Generated Flag:', flag);
    
    const htmlPrompt = `Create a complete, professional HTML webpage for: "${description}"

ANALYSIS RESULTS:
- Challenge Type: ${analysis.challengeType}
- Flag Location: ${analysis.flagLocation}
- Theme: ${analysis.websiteTheme}
- Complexity: ${analysis.complexity}
- Hiding Technique: ${analysis.hidingTechnique || 'standard'}
- Interaction Required: ${analysis.interactionRequired || 'none'}
- Visual Cues: ${analysis.visualCues || 'none specified'}
- Difficulty Justification: ${analysis.difficultyJustification || 'standard difficulty'}

SPECIFIC REQUIREMENTS:
- Generate a fully functional, modern HTML page with inline CSS and JavaScript
- Include realistic, engaging content that matches the theme perfectly
- Use modern web design patterns (flexbox, grid, responsive design)
- Add professional styling with proper typography, colors, and layout
- Hide the flag "${flag}" using the technique: ${analysis.hidingTechnique || analysis.flagLocation}
${generatedImages.length > 0 ? `- Use these generated images in the website:
${generatedImages.map((img, i) => `  * Image ${i+1}: ${img.url} (Alt: ${img.alt})`).join('\n')}` : '- Include placeholder images from picsum.photos or similar services'}

CHALLENGE TYPE SPECIFIC INSTRUCTIONS:
${analysis.challengeType === 'web_visual_hidden' ? `
- Use advanced visual hiding techniques:
  * White text on white background (color: #ffffff; background: #ffffff)
  * Nearly transparent elements (opacity: 0.01 to 0.05)
  * Off-screen positioning (position: absolute; left: -9999px; top: -9999px)
  * Zero-width/height elements (width: 0; height: 0; overflow: hidden)
  * Text with same color as background using CSS variables
  * Elements hidden behind other elements (z-index: -1)
  * Text inside pseudo-elements (::before, ::after) with special positioning
- Flag should be discoverable by:
  * Highlighting text with mouse selection
  * Using browser developer tools to inspect elements
  * Hovering over specific areas to reveal content
  * Changing CSS in browser dev tools
  * Using accessibility tools or screen readers
- Include multiple hiding techniques for increased challenge difficulty
- Add subtle visual cues like cursor changes, slight shadows, or hint text
- Incorporate visual cues: ${analysis.visualCues || 'subtle hints about hidden content'}
` : ''}${analysis.challengeType === 'web_multipage' ? `
- Create navigation elements that hint at hidden subpages
- Include hidden links (display: none, or very small/transparent)
- Use JavaScript to reveal navigation after certain actions
- Flag should be on a separate "page" accessed through hidden navigation
- Incorporate visual cues: ${analysis.visualCues || 'navigation hints and breadcrumbs'}
` : ''}${analysis.challengeType === 'web_steganography' ? `
- Focus on advanced image-based hiding beyond basic EXIF data
- Use CSS to overlay hidden content on images
- Include subtle visual cues in images that lead to the flag
- Incorporate visual cues: ${analysis.visualCues || 'subtle image overlays and hover effects'}
` : ''}${analysis.challengeType === 'web_interactive' ? `
- Flag should only be revealed through sophisticated user interactions:
  * Click sequences: specific buttons/elements in exact order
  * Form interactions: submit forms with specific values or patterns
  * Hover sequences: mouse over elements in particular order with timing
  * Scroll-triggered events: scroll to specific positions to unlock content
  * Keyboard interactions: type specific words/codes in input fields
  * Multi-step processes: complete a series of actions to reveal flag
  * Double-click, right-click, or long-press interactions
  * Drag-and-drop interactions to reveal hidden content
- Use advanced JavaScript techniques:
  * Event listeners for custom interaction patterns
  * Local storage to track progress through multi-step challenges
  * Timer-based reveals after specific actions
  * Mouse position tracking for hover-based reveals
  * Scroll position calculations for scroll-triggered content
  * Form validation that reveals flags on specific inputs
  * CSS class toggling based on interaction state
- Provide progressive feedback to guide users through the interaction
- Make interactions feel natural and integrated with the website's purpose
- Include subtle animations and transitions for better user experience
- Incorporate visual cues: ${analysis.visualCues || 'interactive element hints and feedback'}
` : ''}${analysis.challengeType === 'web_social_media' ? `
- Create authentic social media platform interface:
  * User profiles with posts, comments, likes, and shares
  * Private messaging interface with hidden flag in conversation
  * User authentication flow (login/signup) with flag in success message
  * Social feed with flag hidden in specific post or comment
  * Profile bio sections containing encoded flags
  * Story/status updates revealing flags after interaction
- Include social media interactions:
  * Like/follow specific users to unlock content
  * Comment with specific phrases to reveal responses
  * Share posts to reveal hidden information
  * Direct messaging features with flag delivery
- Make platform feel authentic with realistic user content
- Incorporate visual cues: ${analysis.visualCues || 'social interaction hints and UI feedback'}
` : ''}${analysis.challengeType === 'web_puzzle_game' ? `
- Integrate game mechanics naturally into website purpose:
  * Memory games: remember sequence to reveal flag
  * Word puzzles: crosswords, anagrams, or word search with flag
  * Tic-tac-toe or connect-four games with flag as win reward
  * Quiz games with flag revealed on perfect score
  * Simple arcade-style games with flag at completion
  * Pattern matching or sequence games
- Game implementation requirements:
  * Use JavaScript for game logic and interaction
  * Track game state and progress in localStorage
  * Progressive difficulty or multiple levels
  * Clear win conditions that reveal the flag
  * Engaging gameplay that fits the website theme
- Provide game instructions and feedback
- Incorporate visual cues: ${analysis.visualCues || 'game progress indicators and win conditions'}
` : ''}${analysis.challengeType === 'web_fake_error' ? `
- Create realistic error page scenarios:
  * Fake 404 "Page Not Found" with hidden recovery options
  * 500 "Internal Server Error" with debug information
  * Maintenance page with admin access hints
  * Database connection error with backup system links
  * Application crash with diagnostic tools
- Hidden recovery mechanisms:
  * "Report Bug" buttons that reveal admin panels
  * Error codes that serve as passwords or hints
  * Console logging with debug flags (console.log messages)
  * Hidden developer/admin links in error footers
  * Diagnostic tools that reveal system information
- Make errors feel authentic with proper styling and messaging
- Incorporate visual cues: ${analysis.visualCues || 'error recovery hints and debug options'}
` : ''}${analysis.challengeType === 'web_search_filter' ? `
- Implement comprehensive search and filtering:
  * Search boxes that reveal results only for specific terms
  * Advanced search with flag hidden in specific query results
  * Filter dropdowns that hide/show flag-containing content
  * Pagination with flag on specific page numbers (page 2, 5, etc.)
  * Sort functionality revealing different content arrangements
  * Tag/category filtering with flag in specific categories
- Search functionality requirements:
  * JavaScript-powered search with real-time filtering
  * Multiple search criteria and combination filters
  * Search suggestions that hint at flag-revealing terms
  * Empty state messages that contain clues
  * Search history or saved searches with hidden content
- Include realistic database-like content to search through
- Incorporate visual cues: ${analysis.visualCues || 'search hints and filter suggestions'}
` : ''}${analysis.challengeType === 'web_mobile_responsive' ? `
- Implement device-specific content revelation:
  * CSS media queries hiding content at specific breakpoints
  * Mobile-only navigation menus with flag-containing links
  * Desktop-only sidebars or panels with hidden information
  * Touch gesture requirements (swipe, pinch, long-press)
  * Device orientation detection (portrait/landscape reveals)
  * Screen size-specific styling that reveals/hides elements
- Responsive design features:
  * Breakpoints at common device sizes (320px, 768px, 1024px)
  * Touch-friendly interfaces with mobile-specific interactions
  * Device detection JavaScript for conditional content
  * Instructions prompting users to change viewport size
  * Different layouts revealing different content sections
- Provide clear instructions about device requirements
- Incorporate visual cues: ${analysis.visualCues || 'responsive design hints and device instructions'}
` : ''}

VISUAL CUES TO INCLUDE:
- ${analysis.visualCues || 'Provide subtle hints that guide users to discover the hidden flag'}
- Make cues discoverable but not obvious
- Ensure cues fit naturally within the website's design and content
- Add proper SEO meta tags and structured data
- Make the content rich and detailed (multiple sections, navigation, footer)
- Ensure the website looks completely legitimate and professional
- Add interactive elements like forms, buttons, or navigation menus
- Include realistic contact information, addresses, phone numbers, etc.

IMPORTANT: The website should be indistinguishable from a real professional website of this type. Make it comprehensive with multiple pages worth of content in a single-page layout.

Return only the complete HTML code, no explanations.`;

    console.log('📤 OpenAI HTML Request:', {
      model: 'gpt-4o',
      maxTokens: 4000,
      temperature: 0.8,
      promptLength: htmlPrompt.length,
      imagesIncluded: generatedImages.length
    });
    
    const htmlStartTime = Date.now();
    const htmlResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert web developer and cyber forensics challenge creator. Create professional, realistic websites with hidden flags for forensics challenges. Focus on ${analysis.challengeType} challenges.`
        },
        {
          role: "user",
          content: htmlPrompt
        }
      ],
      max_tokens: 4000,
      temperature: 0.8,
    });
    
    const htmlEndTime = Date.now();
    console.log('📥 OpenAI HTML Response:', {
      duration: `${htmlEndTime - htmlStartTime}ms`,
      usage: htmlResponse.usage,
      model: htmlResponse.model,
      finishReason: htmlResponse.choices[0]?.finish_reason
    });

    let generatedHTML = htmlResponse.choices[0]?.message?.content;
    
    if (!generatedHTML) {
      console.error('❌ No HTML content received from OpenAI');
      console.groupEnd();
      return NextResponse.json({ error: 'Failed to generate challenge' }, { status: 500 });
    }

    console.log('📄 Raw HTML Response Length:', generatedHTML.length);
    console.log('📄 Raw HTML Preview:', generatedHTML.substring(0, 200) + '...');
    
    // Clean up the HTML response - remove markdown code blocks if present
    const originalHTML = generatedHTML;
    generatedHTML = generatedHTML
      .replace(/^```html\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();
      
    if (originalHTML !== generatedHTML) {
      console.log('🧹 HTML cleanup performed - removed markdown code blocks');
    }
    
    const endTime = Date.now();
    const totalDuration = endTime - startTime;
    
    const responseData = {
      html: generatedHTML,
      challengeType: analysis.challengeType,
      flag,
      flagLocation: analysis.flagLocation,
      hidingTechnique: analysis.hidingTechnique,
      interactionRequired: analysis.interactionRequired,
      visualCues: analysis.visualCues,
      difficultyJustification: analysis.difficultyJustification,
      difficulty,
      generatedImages,
      analysis,
      gptRequestData: {
        analysisRequest: {
          prompt: analysisPrompt,
          model: "gpt-4o",
          temperature: 0.3,
          maxTokens: 1000
        },
        htmlRequest: {
          prompt: htmlPrompt,
          model: "gpt-4o", 
          temperature: 0.8,
          maxTokens: 4000
        },
        imageRequests: generatedImages.map((img, i) => ({
          prompt: `Professional, high-quality photograph: ${analysis.requiredImages[i]}. Realistic, detailed, suitable for a ${analysis.challengeType} website.`,
          model: "dall-e-3",
          size: "1024x1024"
        }))
      }
    };
    
    console.log('✅ Challenge generation completed successfully');
    console.log('📊 Final Response Summary:', {
      totalDuration: `${totalDuration}ms`,
      htmlLength: generatedHTML.length,
      challengeType: analysis.challengeType,
      flag,
      imagesGenerated: generatedImages.length,
      responseSize: JSON.stringify(responseData).length
    });
    console.groupEnd();

    return NextResponse.json(responseData);

  } catch (error) {
    const endTime = Date.now();
    const totalDuration = endTime - startTime;
    
    console.group(`❌ [${requestId}] Enhanced Challenge Generation Error`);
    console.error('Error Type:', error instanceof Error ? error.name : 'Unknown');
    console.error('Error Message:', error instanceof Error ? error.message : String(error));
    console.error('Error Stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.error('Duration before error:', `${totalDuration}ms`);
    console.error('Full Error Object:', error);
    console.groupEnd();
    
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error),
      requestId 
    }, { status: 500 });
  }
}