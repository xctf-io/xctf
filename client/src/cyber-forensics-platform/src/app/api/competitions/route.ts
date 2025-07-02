import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function GET() {
  try {
    const db = getDatabase();
    await db.connect();
    
    const competitions = await db.getAllCompetitions();
    
    await db.close();
    return NextResponse.json(competitions);
  } catch (error) {
    console.error('Error fetching competitions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch competitions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, description } = await request.json();
    
    if (!name) {
      return NextResponse.json(
        { error: 'Competition name is required' },
        { status: 400 }
      );
    }
    
    const db = getDatabase();
    await db.connect();
    
    const competitionId = await db.createCompetition(name, description);
    const competition = await db.getCompetition(competitionId);
    
    await db.close();
    return NextResponse.json(competition, { status: 201 });
  } catch (error) {
    console.error('Error creating competition:', error);
    return NextResponse.json(
      { error: 'Failed to create competition' },
      { status: 500 }
    );
  }
}