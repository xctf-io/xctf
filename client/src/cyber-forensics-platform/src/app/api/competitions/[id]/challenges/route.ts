import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const competitionId = parseInt(id);
    
    if (isNaN(competitionId)) {
      return NextResponse.json(
        { error: 'Invalid competition ID' },
        { status: 400 }
      );
    }
    
    const db = getDatabase();
    await db.connect();
    
    const challenges = await db.getChallengesByCompetition(competitionId);
    
    await db.close();
    return NextResponse.json(challenges);
  } catch (error) {
    console.error('Error fetching challenges:', error);
    return NextResponse.json(
      { error: 'Failed to fetch challenges' },
      { status: 500 }
    );
  }
}