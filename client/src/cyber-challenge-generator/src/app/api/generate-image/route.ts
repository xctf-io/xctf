import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import sharp from 'sharp';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ImageRequest {
  description: string;
  flag: string;
  imageType: 'recipe' | 'corporate' | 'portfolio' | 'product' | 'generic';
}

const IMAGE_PROMPTS = {
  recipe: "A professional, appetizing food photography shot showing",
  corporate: "A professional business or corporate stock photo showing",
  portfolio: "A high-quality artistic photograph showing",
  product: "A clean, professional product photography shot showing",  
  generic: "A high-quality, professional photograph showing"
};

export async function POST(request: NextRequest) {
  const requestId = Math.random().toString(36).substring(2, 15);
  const startTime = Date.now();
  
  console.group(`🖼️ [${requestId}] Image Generation Request`);
  console.log('⏰ Request Time:', new Date().toISOString());
  
  try {
    const requestBody = await request.json();
    const { description, flag, imageType = 'generic' }: ImageRequest = requestBody;
    
    console.log('📤 Request Headers:', Object.fromEntries(request.headers.entries()));
    console.log('📤 Request Body:', requestBody);
    console.log('📋 Parsed Parameters:', { description, flag, imageType });
    
    if (!description || !flag) {
      console.error('❌ Validation Error: Description and flag are required');
      console.groupEnd();
      return NextResponse.json({ error: 'Description and flag are required' }, { status: 400 });
    }

    // Generate image with DALL-E 3
    const imagePrompt = `${IMAGE_PROMPTS[imageType]} ${description}. Professional photography, high quality, realistic, detailed`;
    
    console.log('🎨 DALL-E 3 Request:', {
      model: 'dall-e-3',
      prompt: imagePrompt,
      size: '1024x1024',
      quality: 'standard'
    });
    
    const dalleStartTime = Date.now();
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: imagePrompt,
      size: "1024x1024",
      quality: "standard",
      n: 1,
    });
    
    const dalleEndTime = Date.now();
    console.log('📥 DALL-E 3 Response:', {
      duration: `${dalleEndTime - dalleStartTime}ms`,
      url: imageResponse.data?.[0]?.url ? 'Generated successfully' : 'No URL received',
      revisedPrompt: imageResponse.data?.[0]?.revised_prompt
    });

    const imageUrl = imageResponse.data?.[0]?.url;
    if (!imageUrl) {
      console.error('❌ No image URL received from DALL-E 3');
      console.groupEnd();
      return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
    }

    // Download the generated image
    console.log('📜 Downloading image from DALL-E 3...');
    const downloadStartTime = Date.now();
    const imageBuffer = await fetch(imageUrl).then(res => res.arrayBuffer());
    const downloadEndTime = Date.now();
    
    console.log('📥 Image Download:', {
      duration: `${downloadEndTime - downloadStartTime}ms`,
      size: `${imageBuffer.byteLength} bytes`
    });
    
    // Add metadata using Sharp
    console.log('🔧 Processing image with Sharp...');
    const processStartTime = Date.now();
    const processedImage = await sharp(Buffer.from(imageBuffer))
      .jpeg({ 
        quality: 90,
        mozjpeg: true
      })
      .withMetadata({
        exif: {
          IFD0: {
            Copyright: `CTF Flag: ${flag}`,
            Artist: 'Challenge Generator',
            ImageDescription: `Hidden flag: ${flag}`,
            Software: 'Cyber Challenge Generator',
            UserComment: flag
          }
        }
      })
      .toBuffer();
      
    const processEndTime = Date.now();
    console.log('📥 Image Processing:', {
      duration: `${processEndTime - processStartTime}ms`,
      originalSize: `${imageBuffer.byteLength} bytes`,
      processedSize: `${processedImage.length} bytes`
    });

    // Convert to base64 for embedding in HTML
    const base64Image = processedImage.toString('base64');
    const dataUrl = `data:image/jpeg;base64,${base64Image}`;
    
    const endTime = Date.now();
    const totalDuration = endTime - startTime;
    
    const responseData = {
      imageUrl: dataUrl,
      originalUrl: imageUrl,
      flag,
      metadata: {
        copyright: `CTF Flag: ${flag}`,
        artist: 'Challenge Generator',
        description: `Hidden flag: ${flag}`,
        userComment: flag
      }
    };
    
    console.log('✅ Image generation completed successfully');
    console.log('📊 Final Response Summary:', {
      totalDuration: `${totalDuration}ms`,
      base64Length: base64Image.length,
      flag,
      imageType
    });
    console.groupEnd();

    return NextResponse.json(responseData);

  } catch (error) {
    const endTime = Date.now();
    const totalDuration = endTime - startTime;
    
    console.group(`❌ [${requestId}] Image Generation Error`);
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