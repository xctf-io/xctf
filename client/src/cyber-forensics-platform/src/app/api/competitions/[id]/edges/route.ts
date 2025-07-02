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
    
    const edges = await db.getEdgesByCompetition(competitionId);
    
    await db.close();
    return NextResponse.json(edges);
  } catch (error) {
    console.error('Error fetching edges:', error);
    return NextResponse.json(
      { error: 'Failed to fetch edges' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const competitionId = parseInt(id);
    const edgeData = await request.json();
    
    if (isNaN(competitionId)) {
      return NextResponse.json(
        { error: 'Invalid competition ID' },
        { status: 400 }
      );
    }
    
    const db = getDatabase();
    await db.connect();
    
    const edgeId = await db.createEdge({
      competition_id: competitionId,
      ...edgeData
    });
    
    // Return the created edge
    const edge = await db.query('SELECT * FROM edges WHERE id = ?', [edgeId]);
    
    await db.close();
    return NextResponse.json(edge[0], { status: 201 });
  } catch (error) {
    console.error('Error creating edge:', error);
    return NextResponse.json(
      { error: 'Failed to create edge' },
      { status: 500 }
    );
  }
}