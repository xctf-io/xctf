import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ChallengeRequest {
  description: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  challengeType?: string;
}

const CHALLENGE_TEMPLATES = {
  web_source: {
    systemPrompt: "You are an expert cyber forensics challenge creator specializing in web source code challenges. Create realistic websites with flags hidden in source code.",
    userPrompt: (description: string) => `Create a complete, professional HTML webpage for: "${description}"

SPECIFIC REQUIREMENTS:
- Generate a fully functional, modern HTML page with inline CSS and JavaScript
- Include realistic, engaging content that matches the theme perfectly
- Use modern web design patterns with professional styling
- Hide a flag in the format CTF{realistic_flag_here} in source code such as:
  * HTML comments (<!-- hidden flag -->)
  * JavaScript comments (// hidden flag)
  * CSS comments (/* hidden flag */)
  * Commented-out HTML elements
  * Variable names or function names
  * Base64 encoded strings in JavaScript
- Include multiple realistic images and rich content
- Add interactive elements (forms, buttons, menus)
- Make the website look completely professional and legitimate

Return only the complete HTML code, no explanations.`
  },
  corporate: {
    systemPrompt: "You are an expert cyber forensics challenge creator specializing in corporate website challenges. Create realistic business websites with hidden flags.",
    userPrompt: (description: string) => `Create a complete, professional corporate website for: "${description}"

SPECIFIC REQUIREMENTS:
- Generate a modern, professional corporate website
- Include typical corporate sections: header, navigation, hero section, services, about, contact, footer
- Use professional color schemes and typography
- Add realistic business content, team members, services, testimonials
- Hide a flag in the format CTF{corporate_flag_here} in:
  * Employee email addresses or contact info
  * Hidden form fields
  * Meta tags or structured data
  * JavaScript configuration objects
  * CSS class names representing departments
- Include professional imagery and proper layout
- Add contact forms and interactive elements
- Make it look like a real corporate website

Return only the complete HTML code, no explanations.`
  },
  web_visual_hidden: {
    systemPrompt: "You are an expert cyber forensics challenge creator specializing in visual hiding techniques. Create realistic websites with flags hidden using CSS visual tricks.",
    userPrompt: (description: string) => `Create a complete, professional HTML webpage for: "${description}"

SPECIFIC REQUIREMENTS:
- Generate a fully functional, modern HTML page with inline CSS and JavaScript
- Include realistic, engaging content that matches the theme perfectly
- Use modern web design patterns with professional styling
- Hide a flag in the format CTF{visual_hidden_flag} using advanced visual hiding techniques such as:
  * White text on white background (color: #ffffff; background: #ffffff)
  * Nearly transparent elements (opacity: 0.01 to 0.05)
  * Off-screen positioning (position: absolute; left: -9999px; top: -9999px)
  * Zero-width/height elements (width: 0; height: 0; overflow: hidden)
  * Text with same color as background using CSS variables
  * Elements hidden behind other elements (z-index: -1)
  * Text inside pseudo-elements (::before, ::after) with special positioning
  * CSS transforms that move elements out of view
  * Hover effects that reveal hidden content on mouse interaction
  * Text selection reveals through highlighting
- Include multiple realistic images and rich content
- Add interactive elements and professional layout
- Make the flag discoverable through user interaction (highlighting, hovering)
- Ensure the website looks completely legitimate

Return only the complete HTML code, no explanations.`
  },
  web_multipage: {
    systemPrompt: "You are an expert cyber forensics challenge creator specializing in multi-page navigation puzzles. Create websites with hidden subpages and navigation challenges.",
    userPrompt: (description: string) => `Create a complete, professional HTML webpage for: "${description}"

SPECIFIC REQUIREMENTS:
- Generate a fully functional, modern HTML page with inline CSS and JavaScript
- Include realistic, engaging content that matches the theme perfectly
- Use modern web design with professional styling
- Hide a flag in the format CTF{hidden_page_flag} on a hidden subpage by:
  * Creating hidden navigation links (display: none or very small/transparent)
  * Using JavaScript to show navigation after specific actions (clicks, form fills)
  * Including breadcrumb trails or hints to hidden sections
  * Creating modal overlays or hidden div sections that act as "pages"
  * Using CSS to hide/show different content sections
- Include multiple realistic images and navigation elements
- Add interactive elements that reveal hidden navigation
- Make the hidden page/section feel like a natural part of the site
- Ensure the website looks completely professional

Return only the complete HTML code, no explanations.`
  },
  web_steganography: {
    systemPrompt: "You are an expert cyber forensics challenge creator specializing in advanced steganography techniques. Create websites with flags hidden in creative visual ways.",
    userPrompt: (description: string) => `Create a complete, professional HTML webpage for: "${description}"

SPECIFIC REQUIREMENTS:
- Generate a fully functional, modern HTML page with inline CSS and JavaScript
- Include realistic, engaging content that matches the theme perfectly
- Use modern web design with professional styling
- Hide a flag in the format CTF{steganography_flag} using advanced techniques such as:
  * CSS overlays on images that reveal text when hovered
  * Base64 encoded images with hidden text embedded in comments
  * ASCII art hidden in HTML comments or source code
  * CSS background images with subtle text overlays
  * JavaScript that decodes hidden messages from image data
  * Hidden text in image alt attributes or data attributes
- Include multiple realistic images with potential hidden content
- Add subtle visual cues that hint at hidden information
- Make the discovery process challenging but fair
- Ensure the website looks completely professional

Return only the complete HTML code, no explanations.`
  },
  web_interactive: {
    systemPrompt: "You are an expert cyber forensics challenge creator specializing in interactive flag discovery. Create websites where flags are revealed through user interactions.",
    userPrompt: (description: string) => `Create a complete, professional HTML webpage for: "${description}"

SPECIFIC REQUIREMENTS:
- Generate a fully functional, modern HTML page with inline CSS and JavaScript
- Include realistic, engaging content that matches the theme perfectly
- Use modern web design with professional styling
- Hide a flag in the format CTF{interactive_flag} that is revealed through sophisticated user interactions such as:
  * Clicking specific buttons or links in exact sequence with timing
  * Submitting forms with specific values or patterns
  * Hovering over elements in particular order with timing requirements
  * Scrolling to specific positions to trigger JavaScript events
  * Typing specific keywords or codes in input fields
  * Double-clicking, right-clicking, or long-press interactions
  * Drag-and-drop interactions to reveal hidden content
  * Multi-step processes with progress tracking
  * Mouse position tracking for hover-based reveals
  * Keyboard combination inputs (Ctrl+key, etc.)
- Include multiple interactive elements (forms, buttons, input fields, sliders, etc.)
- Add advanced JavaScript event handlers:
  * Custom event listeners for complex interaction patterns
  * Local storage for tracking multi-step progress
  * Timer-based interactions and delays
  * Mouse position and movement tracking
  * Scroll position calculations
  * Form validation with specific trigger conditions
  * CSS class toggling based on interaction states
- Make the interactions feel natural and integrated with the website's purpose
- Provide progressive feedback and subtle animations
- Include hint system that guides users through the interaction process
- Ensure the website looks completely professional and realistic

Return only the complete HTML code, no explanations.`
  },
  default: {
    systemPrompt: "You are an expert cyber forensics challenge creator. Create realistic, professional websites with hidden flags for forensics challenges.",
    userPrompt: (description: string) => `Create a complete, professional HTML webpage for: "${description}"

REQUIREMENTS:
- Generate a fully functional, modern HTML page with inline CSS and JavaScript
- Include realistic, detailed content that matches the theme
- Use modern web design with professional styling
- Hide a flag in the format CTF{themed_flag_here} appropriately based on the description
- Include multiple images using placeholder services
- Add rich content with multiple sections
- Make the website look completely professional and realistic
- Ensure proper HTML structure, SEO tags, and responsive design

Return only the complete HTML code, no explanations.`
  }
};

function detectChallengeType(description: string): keyof typeof CHALLENGE_TEMPLATES {
  const desc = description.toLowerCase();
  
  // Check for new visual hiding techniques
  if (desc.includes('white text') || desc.includes('highlight') || desc.includes('transparent') || 
      desc.includes('hidden text') || desc.includes('invisible') || desc.includes('hover') ||
      desc.includes('visual hiding') || desc.includes('off-screen')) {
    return 'web_visual_hidden';
  }
  
  // Check for multi-page/navigation challenges
  if (desc.includes('subpage') || desc.includes('hidden page') || desc.includes('navigation') ||
      desc.includes('multipage') || desc.includes('multi-page') || desc.includes('hidden link') ||
      desc.includes('breadcrumb') || desc.includes('modal')) {
    return 'web_multipage';
  }
  
  // Check for steganography techniques
  if (desc.includes('steganography') || desc.includes('image hiding') || desc.includes('overlay') ||
      desc.includes('ascii art') || desc.includes('base64') || desc.includes('encoded') ||
      desc.includes('visual cue') || desc.includes('subtle')) {
    return 'web_steganography';
  }
  
  // Check for interactive challenges
  if (desc.includes('click') || desc.includes('interact') || desc.includes('button') ||
      desc.includes('form') || desc.includes('sequence') || desc.includes('scroll') ||
      desc.includes('type') || desc.includes('input') || desc.includes('submit')) {
    return 'web_interactive';
  }
  
  // Original detection logic (metadata removed)
  if (desc.includes('source') || desc.includes('comment') || desc.includes('html comment')) {
    return 'web_source';
  }
  if (desc.includes('corporate') || desc.includes('business') || desc.includes('company') || desc.includes('login')) {
    return 'corporate';
  }
  
  return 'default';
}

export async function POST(request: NextRequest) {
  const requestId = Math.random().toString(36).substring(2, 15);
  const startTime = Date.now();
  
  console.group(`🏹 [${requestId}] Basic Challenge Generation Request`);
  console.log('⏰ Request Time:', new Date().toISOString());
  
  try {
    const requestBody = await request.json();
    const { description, difficulty = 'medium', challengeType }: ChallengeRequest = requestBody;
    
    console.log('📤 Request Headers:', Object.fromEntries(request.headers.entries()));
    console.log('📤 Request Body:', requestBody);
    console.log('📋 Parsed Parameters:', { description: description?.substring(0, 100) + '...', difficulty, challengeType });
    
    if (!description) {
      console.error('❌ Validation Error: Description is required');
      console.groupEnd();
      return NextResponse.json({ error: 'Description is required' }, { status: 400 });
    }

    // Detect challenge type or use provided type
    const detectedType = challengeType || detectChallengeType(description);
    const template = CHALLENGE_TEMPLATES[detectedType as keyof typeof CHALLENGE_TEMPLATES] || CHALLENGE_TEMPLATES.default;
    
    console.log('🔍 Challenge Analysis:', {
      providedType: challengeType,
      detectedType,
      templateUsed: detectedType
    });
    
    const prompt = template.userPrompt(description);
    console.log('📤 OpenAI Request:', {
      model: 'gpt-4o',
      maxTokens: 4000,
      temperature: 0.8,
      systemPromptLength: template.systemPrompt.length,
      userPromptLength: prompt.length
    });
    
    const apiStartTime = Date.now();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: template.systemPrompt
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 4000,
      temperature: 0.8,
    });
    
    const apiEndTime = Date.now();
    console.log('📥 OpenAI Response:', {
      duration: `${apiEndTime - apiStartTime}ms`,
      usage: completion.usage,
      model: completion.model,
      finishReason: completion.choices[0]?.finish_reason
    });

    let generatedHTML = completion.choices[0]?.message?.content;
    
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
      challengeType: detectedType,
      difficulty
    };
    
    console.log('✅ Challenge generation completed successfully');
    console.log('📊 Final Response Summary:', {
      totalDuration: `${totalDuration}ms`,
      htmlLength: generatedHTML.length,
      challengeType: detectedType,
      difficulty,
      responseSize: JSON.stringify(responseData).length
    });
    console.groupEnd();

    return NextResponse.json(responseData);
    
  } catch (error) {
    const endTime = Date.now();
    const totalDuration = endTime - startTime;
    
    console.group(`❌ [${requestId}] Basic Challenge Generation Error`);
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