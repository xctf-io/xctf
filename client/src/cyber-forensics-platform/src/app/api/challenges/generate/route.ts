import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getDatabase } from '@/lib/database';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface GenerateChallengeRequest {
  competition_id: number;
  description: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  includeImages?: boolean;
  context?: any;
  isFirstChallenge?: boolean;
  linkToPrevious?: number;
}

export async function POST(request: NextRequest) {
  const requestId = Math.random().toString(36).substring(2, 15);
  const startTime = Date.now();
  
  console.group(`🎯 [${requestId}] Enhanced Challenge Generation with Linking`);
  console.log('⏰ Request Time:', new Date().toISOString());
  
  try {
    const requestBody: GenerateChallengeRequest = await request.json();
    const { 
      competition_id,
      description, 
      difficulty = 'medium', 
      includeImages = true,
      context,
      isFirstChallenge = false,
      linkToPrevious
    } = requestBody;
    
    console.log('📤 Request Body:', requestBody);
    
    if (!description || !competition_id) {
      console.error('❌ Validation Error: Description and competition ID are required');
      console.groupEnd();
      return NextResponse.json({ error: 'Description and competition ID are required' }, { status: 400 });
    }

    const db = getDatabase();
    await db.connect();

    // Build context for intelligent linking
    let contextPrompt = '';
    let previousChallengeData = null;
    
    if (linkToPrevious && context?.previous_challenge) {
      previousChallengeData = context.previous_challenge;
      contextPrompt = `
LINKING CONTEXT:
This challenge should connect from the previous challenge:
- Previous Challenge: "${previousChallengeData.name}"
- Previous Type: ${previousChallengeData.type}
- Previous Flag: ${previousChallengeData.flag}

LINKING REQUIREMENTS:
- Create a narrative connection between challenges
- Include clues in the new challenge that reference the previous one
- Generate a transition clue that will link FROM the previous challenge TO this new one
- Make the story flow naturally and logically

The user should find something in the previous challenge that leads them to this new challenge.
`;
    } else if (isFirstChallenge) {
      contextPrompt = `
STARTING CHALLENGE:
This is the FIRST challenge in the competition - make it:
- Welcoming and engaging for participants
- Clear in its instructions and objectives  
- An appropriate entry point that sets the tone
- Include some introductory context about the forensics scenario
`;
    }

    // Step 1: Enhanced analysis with context
    console.log('🔍 Step 1: Starting enhanced challenge analysis...');
    const analysisPrompt = `Analyze this cyber forensics challenge description and create a realistic multi-page website:

CHALLENGE DESCRIPTION: "${description}"

${contextPrompt}

ANALYSIS REQUIREMENTS:
Create a comprehensive realistic website structure. Return JSON with:

{
  "challengeType": "web_multipage | web_interactive | web_social_media | web_puzzle_game | web_fake_error | web_search_filter | corporate | portfolio | ecommerce | blog",
  "websiteTheme": "realistic website type (e.g., 'corporate consulting firm', 'photography portfolio', 'restaurant')",
  "businessName": "realistic business/website name",
  "flagLocation": "specific location where the flag should be hidden",
  "requiredImages": ["professional business photo", "product/service image", "team photo"],
  "hidingTechnique": "specific technique for hiding flag",
  "interactionRequired": "what user must do to find flag",
  "visualCues": "subtle hints to guide users",
  "multiPageStructure": {
    "needsMultiplePages": true,
    "pages": [
      {
        "name": "home",
        "path": "/",
        "content": "main landing page with company overview, hero section, featured content",
        "containsFlag": false,
        "containsClues": true,
        "purpose": "introduction and navigation hub"
      },
      {
        "name": "about", 
        "path": "/about",
        "content": "company history, mission, team information, detailed background",
        "containsFlag": false,
        "containsClues": true,
        "purpose": "build credibility and provide context clues"
      },
      {
        "name": "services" | "products" | "portfolio" | "menu",
        "path": "/services",
        "content": "detailed offerings, descriptions, pricing if applicable",
        "containsFlag": true,
        "containsClues": false,
        "purpose": "main content area where flag is hidden"
      },
      {
        "name": "contact",
        "path": "/contact", 
        "content": "contact form, address, phone, email, location map",
        "containsFlag": false,
        "containsClues": false,
        "purpose": "realistic business contact information"
      }
    ]
  },
  "navigationStructure": {
    "mainNavItems": ["Home", "About", "Services", "Contact"],
    "hiddenNavItems": ["Admin", "Staff Portal", "Debug"],
    "navigationStyle": "horizontal header menu with dropdown options"
  },
  "contentStrategy": {
    "businessDescription": "2-3 sentence description of what this business does",
    "targetAudience": "who the business serves",
    "keyMessages": ["unique value prop 1", "key benefit 2", "competitive advantage 3"]
  }
}`;

    const analysisResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a cyber forensics expert specializing in creating linked challenge narratives. Analyze requirements and return structured JSON responses."
        },
        {
          role: "user", 
          content: analysisPrompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.3,
    });

    let analysis;
    try {
      const analysisContent = analysisResponse.choices[0]?.message?.content || '';
      console.log('📄 Raw Analysis Response:', analysisContent);
      analysis = JSON.parse(analysisContent);
      console.log('✅ Parsed Analysis:', analysis);
    } catch (error) {
      console.warn('⚠️ JSON parsing failed, using fallback analysis:', error instanceof Error ? error.message : String(error));
      // Enhanced fallback with realistic business structure
      analysis = {
        challengeType: 'web_multipage',
        websiteTheme: 'consulting company website',
        businessName: 'Professional Solutions Inc',
        flagLocation: 'services page hidden content',
        requiredImages: ['professional office', 'team meeting', 'service offerings'],
        hidingTechnique: 'white text on white background',
        interactionRequired: 'highlight text to reveal hidden content',
        visualCues: 'subtle hints about selecting text',
        multiPageStructure: {
          needsMultiplePages: true,
          pages: [
            { name: 'home', path: '/', content: 'main landing page with company overview', containsFlag: false, containsClues: true, purpose: 'introduction' },
            { name: 'about', path: '/about', content: 'company history and team information', containsFlag: false, containsClues: true, purpose: 'credibility' },
            { name: 'services', path: '/services', content: 'service offerings and descriptions', containsFlag: true, containsClues: false, purpose: 'flag location' },
            { name: 'contact', path: '/contact', content: 'contact form and business information', containsFlag: false, containsClues: false, purpose: 'business contact' }
          ]
        },
        navigationStructure: {
          mainNavItems: ['Home', 'About', 'Services', 'Contact'],
          hiddenNavItems: ['Admin Portal'],
          navigationStyle: 'horizontal header menu'
        },
        contentStrategy: {
          businessDescription: 'A professional consulting firm providing business solutions',
          targetAudience: 'corporate clients and small businesses',
          keyMessages: ['Expert consulting', 'Proven results', 'Trusted partner']
        }
      };
    }

    // Step 2: Generate images if needed
    console.log('🎨 Step 2: Starting image generation...');
    let generatedImages = [];
    if (includeImages && analysis.requiredImages && analysis.requiredImages.length > 0) {
      for (const [index, imageDesc] of analysis.requiredImages.slice(0, 3).entries()) {
        try {
          const imagePrompt = `Professional, high-quality photograph: ${imageDesc}. Realistic, detailed, suitable for a ${analysis.challengeType} website.`;
          
          const imageResponse = await openai.images.generate({
            model: "dall-e-3",
            prompt: imagePrompt,
            size: "1024x1024",
            quality: "standard",
            n: 1,
          });
          
          if (imageResponse.data?.[0]?.url) {
            generatedImages.push({
              url: imageResponse.data[0].url,
              description: imageDesc,
              alt: imageDesc
            });
          }
        } catch (error) {
          console.error(`❌ Error generating image ${index + 1}:`, error instanceof Error ? error.message : String(error));
        }
      }
    }

    // Step 3: Generate realistic single-page application with multi-page navigation
    console.log('🌐 Step 3: Starting realistic website generation...');
    const flag = `CTF{${analysis.challengeType}_${Date.now().toString(36)}}`;
    console.log('🏳️ Generated Flag:', flag);

    // Create comprehensive single-page application with JavaScript navigation
    const htmlPrompt = `Create a complete, realistic single-page application for: "${description}"

BUSINESS CONTEXT:
- Business Name: ${analysis.businessName || 'Professional Services'}
- Website Theme: ${analysis.websiteTheme}
- Business Description: ${analysis.contentStrategy?.businessDescription || 'A professional business'}
- Target Audience: ${analysis.contentStrategy?.targetAudience || 'General consumers'}

PAGES TO IMPLEMENT:
${analysis.multiPageStructure?.pages?.map((page: any) => `
- ${page.name.toUpperCase()} (${page.path}): ${page.content}
  ${page.containsFlag ? `*** CONTAINS FLAG: ${flag} ***` : ''}
  ${page.containsClues ? '*** CONTAINS CLUES ***' : ''}
  Purpose: ${page.purpose}
`).join('') || `
- HOME (/): Main landing page with business overview
- ABOUT (/about): Company information and background  
- SERVICES (/services): Service offerings *** CONTAINS FLAG: ${flag} ***
- CONTACT (/contact): Contact information and form
`}

NAVIGATION STRUCTURE:
- Main Navigation: ${analysis.navigationStructure?.mainNavItems?.join(', ') || 'Home, About, Services, Contact'}
- Hidden Items: ${analysis.navigationStructure?.hiddenNavItems?.join(', ') || 'Admin Portal (hidden)'}

FLAG HIDING REQUIREMENTS:
- Hide flag "${flag}" using: ${analysis.hidingTechnique}
- Location: ${analysis.flagLocation}
- User must: ${analysis.interactionRequired}
- Visual cues: ${analysis.visualCues}

TECHNICAL REQUIREMENTS:
1. CREATE A SINGLE-PAGE APPLICATION (SPA) - All content in ONE HTML file
2. Use JavaScript to show/hide different page sections based on navigation
3. Include realistic business content - company info, services, contact details
4. Add professional CSS styling with modern design
5. Hide the flag using the specified technique
6. Include realistic placeholder content (addresses, phone numbers, etc.)
7. Add proper meta tags and titles

CRITICAL NAVIGATION REQUIREMENTS:
- ALL navigation links MUST use href="#" or href="javascript:void(0)" 
- NO absolute URLs, NO relative URLs, NO external links
- Use JavaScript click handlers with preventDefault() to handle navigation
- Show/hide page sections using display:none/block or CSS classes
- NEVER use window.location, history.pushState, or any routing

NAVIGATION CODE EXAMPLE:
Use href="#" and onclick handlers with return false:
- Navigation: <a href="#" onclick="showPage('home'); return false;">Home</a>
- JavaScript: function showPage(pageId) { /* show/hide logic */ }
- All links must use href="#" and onclick="return false;"

CRITICAL: This must be a complete, professional business website that functions entirely within the iframe. No external navigation or routing.

${generatedImages.length > 0 ? `
IMAGES TO INCLUDE:
${generatedImages.map((img, i) => `- ${img.url} (${img.description})`).join('\n')}
` : ''}

${contextPrompt}

EXAMPLE STRUCTURE PATTERN:
- DOCTYPE html with head section containing title and CSS
- CSS: .page { display: none; } .page.active { display: block; }
- Header with navigation using href="#" and onclick handlers
- Multiple div sections with IDs like "home-page", "about-page", etc.
- JavaScript showPage function that removes 'active' class from all pages and adds it to selected page
- All navigation must use onclick="showPage('pagename'); return false;"

STRUCTURE REQUIREMENTS:
- Professional header with business name and navigation
- Home section: Hero/welcome content, company overview
- About section: Company background, team, mission
- Services/Products section: Detailed offerings (HIDE FLAG HERE)
- Contact section: Contact form, address, phone, email
- All sections in single HTML file with CSS show/hide navigation

Return ONLY the complete HTML code with embedded CSS and JavaScript. Make it a realistic, professional website.`;

    const htmlResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert web developer creating realistic business websites for cyber forensics challenges. 

CRITICAL: You MUST create single-page applications that work entirely within an iframe. This means:
- ALL links must use href="#" or href="javascript:void(0)"
- NO external URLs, NO relative paths, NO routing
- Use only JavaScript show/hide functions for navigation
- NEVER use window.location, history.pushState, or any navigation APIs
- All navigation must be onclick handlers with return false;

Create complete, professional websites with realistic business content.`
        },
        {
          role: "user",
          content: htmlPrompt
        }
      ],
      max_tokens: 6000,
      temperature: 0.7,
    });

    let generatedHTML = htmlResponse.choices[0]?.message?.content || '';
    
    // Clean up HTML
    generatedHTML = generatedHTML
      .replace(/^```html\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();

    // Post-process HTML to fix any remaining external navigation issues
    generatedHTML = generatedHTML
      // Fix any absolute URLs that point to localhost
      .replace(/href=["']https?:\/\/localhost:\d+[^"']*["']/gi, 'href="#"')
      // Fix any relative URLs that could cause navigation
      .replace(/href=["'][./][^"']*["']/gi, 'href="#"')
      // Fix any hrefs that don't have onclick handlers
      .replace(/<a\s+href=["']#["'](?![^>]*onclick)/gi, '<a href="#" onclick="return false;"')
      // Ensure all forms don't submit externally
      .replace(/<form[^>]*>/gi, '<form onsubmit="return false;">');
    
    console.log('🧹 Post-processed HTML to prevent external navigation');

    // Create pages array for compatibility
    const pages = [
      {
        name: 'main',
        path: '/',
        html: generatedHTML,
        containsFlag: true,
        containsClues: true
      }
    ];

    // Step 4: Save to database
    console.log('💾 Step 4: Saving challenge to database...');
    
    // Create challenge record
    const challengeId = await db.createChallenge({
      competition_id,
      name: `Challenge: ${description.substring(0, 50)}${description.length > 50 ? '...' : ''}`,
      description,
      challenge_type: analysis.challengeType,
      difficulty,
      flag,
      flag_location: analysis.flagLocation,
      hiding_technique: analysis.hidingTechnique,
      interaction_required: analysis.interactionRequired,
      visual_cues: analysis.visualCues,
      html_content: pages.find(p => p.containsFlag)?.html || pages[0].html,
      analysis_data: analysis
    });

    // Store page information (even for single-page apps, we track the structure)
    if (analysis.multiPageStructure?.pages) {
      for (const pageInfo of analysis.multiPageStructure.pages) {
        await db.createChallengePage({
          challenge_id: challengeId,
          page_name: pageInfo.name,
          page_path: pageInfo.path,
          html_content: pageInfo.name === 'home' ? generatedHTML : '<!-- SPA section content -->',
          is_main_page: pageInfo.path === '/'
        });
      }
    }

    // Create node for graph visualization
    const nodeId = await db.createNode({
      competition_id,
      challenge_id: challengeId,
      position_x: Math.random() * 500,
      position_y: Math.random() * 300,
      is_start_node: isFirstChallenge
    });

    // Create placeholder links
    if (analysis.linkingStrategy?.placeholderLinks) {
      for (const placeholder of analysis.linkingStrategy.placeholderLinks) {
        await db.createPlaceholderLink({
          challenge_id: challengeId,
          placeholder_id: placeholder,
          link_text: 'Continue to next challenge',
          context: 'Generated as part of challenge flow'
        });
      }
    }

    // Save context data
    if (context) {
      await db.createChallengeContext(challengeId, 'linking_context', context);
    }

    // Create edge if linking to previous challenge
    if (linkToPrevious && previousChallengeData) {
      // Find the previous challenge's node
      const previousNodes = await db.query(
        'SELECT * FROM nodes WHERE challenge_id = (SELECT id FROM challenges WHERE id = ?)',
        [previousChallengeData.id]
      );
      
      if (previousNodes.length > 0) {
        await db.createEdge({
          competition_id,
          from_node_id: previousNodes[0].id,
          to_node_id: nodeId,
          connection_type: 'sequential',
          clue_text: analysis.linkingStrategy?.clueText || 'Continue to next challenge'
        });
      }
    }

    await db.close();

    const responseData = {
      challengeId,
      nodeId,
      flag,
      challengeType: analysis.challengeType,
      pages: pages.map(p => ({ name: p.name, path: p.path, containsFlag: p.containsFlag })),
      analysis,
      generatedImages,
      linkingStrategy: analysis.linkingStrategy
    };

    console.log('✅ Challenge generation completed successfully');
    console.groupEnd();

    return NextResponse.json(responseData);

  } catch (error) {
    console.group(`❌ [${requestId}] Challenge Generation Error`);
    console.error('Error:', error);
    console.groupEnd();
    
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error),
      requestId 
    }, { status: 500 });
  }
}