import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const challengeId = parseInt(id);
    
    if (isNaN(challengeId)) {
      return NextResponse.json(
        { error: 'Invalid challenge ID' },
        { status: 400 }
      );
    }
    
    const db = getDatabase();
    await db.connect();
    
    const challenge = await db.getChallenge(challengeId);
    
    if (!challenge) {
      await db.close();
      return NextResponse.json(
        { error: 'Challenge not found' },
        { status: 404 }
      );
    }
    
    await db.close();
    return NextResponse.json(challenge);
  } catch (error) {
    console.error('Error fetching challenge:', error);
    return NextResponse.json(
      { error: 'Failed to fetch challenge' },
      { status: 500 }
    );
  }
}