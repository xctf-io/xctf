import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const nodeId = parseInt(id);
    const { x, y } = await request.json();
    
    if (isNaN(nodeId)) {
      return NextResponse.json(
        { error: 'Invalid node ID' },
        { status: 400 }
      );
    }
    
    if (typeof x !== 'number' || typeof y !== 'number') {
      return NextResponse.json(
        { error: 'Invalid position coordinates' },
        { status: 400 }
      );
    }
    
    const db = getDatabase();
    await db.connect();
    
    await db.updateNodePosition(nodeId, x, y);
    
    await db.close();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating node position:', error);
    return NextResponse.json(
      { error: 'Failed to update node position' },
      { status: 500 }
    );
  }
}