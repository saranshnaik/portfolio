import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { socialLinks } from '@/lib/db/schema';
import { asc } from 'drizzle-orm';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const allSocialLinks = await db.select().from(socialLinks).orderBy(asc(socialLinks.displayIndex));
    return NextResponse.json(allSocialLinks);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch social links' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { platform, label, url, icon, displayIndex } = body;

    if (!platform || !label || !url || !icon || displayIndex === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newSocialLink = await db.insert(socialLinks).values({
      platform,
      label,
      url,
      icon,
      displayIndex,
    }).returning();

    return NextResponse.json(newSocialLink[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create social link' }, { status: 500 });
  }
}
