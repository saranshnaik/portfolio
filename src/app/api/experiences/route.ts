import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { experiences } from '@/lib/db/schema';
import { asc } from 'drizzle-orm';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const allExperiences = await db.select().from(experiences).orderBy(asc(experiences.displayIndex));
    return NextResponse.json(allExperiences);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { role, company, companyUrl, duration, description, techStack, displayIndex } = body;

    if (!role || !company || !duration || !description || !techStack || displayIndex === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newExperience = await db.insert(experiences).values({
      role,
      company,
      companyUrl,
      duration,
      description,
      techStack,
      displayIndex,
    }).returning();

    return NextResponse.json(newExperience[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
  }
}
