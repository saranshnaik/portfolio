import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { profile } from '@/lib/db/schema';
import { isAuthenticated } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const profileData = await db.select().from(profile).limit(1);
    
    if (profileData.length === 0) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }
    
    return NextResponse.json(profileData[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    const existingProfile = await db.select().from(profile).limit(1);
    
    let updatedProfile;
    
    if (existingProfile.length === 0) {
      updatedProfile = await db.insert(profile).values(body).returning();
    } else {
      updatedProfile = await db.update(profile)
        .set(body)
        .where(eq(profile.id, existingProfile[0].id))
        .returning();
    }
    
    return NextResponse.json(updatedProfile[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
