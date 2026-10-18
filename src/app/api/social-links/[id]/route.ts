import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { socialLinks } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { isAuthenticated } from '@/lib/auth';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const socialLink = await db.select().from(socialLinks).where(eq(socialLinks.id, parseInt(id))).limit(1);
    
    if (socialLink.length === 0) {
      return NextResponse.json({ error: 'Social link not found' }, { status: 404 });
    }
    
    return NextResponse.json(socialLink[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch social link' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    
    const updatedSocialLink = await db.update(socialLinks)
      .set(body)
      .where(eq(socialLinks.id, parseInt(id)))
      .returning();
      
    if (updatedSocialLink.length === 0) {
      return NextResponse.json({ error: 'Social link not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedSocialLink[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update social link' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    
    const deletedSocialLink = await db.delete(socialLinks)
      .where(eq(socialLinks.id, parseInt(id)))
      .returning();
      
    if (deletedSocialLink.length === 0) {
      return NextResponse.json({ error: 'Social link not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete social link' }, { status: 500 });
  }
}
