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
    
    const nodes = await db.getNodesByCompetition(competitionId);
    
    await db.close();
    return NextResponse.json(nodes);
  } catch (error) {
    console.error('Error fetching nodes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch nodes' },
      { status: 500 }
    );
  }
}