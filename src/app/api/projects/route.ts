import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projects } from '@/lib/db/schema';
import { asc } from 'drizzle-orm';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const allProjects = await db.select().from(projects).orderBy(asc(projects.displayIndex));
    return NextResponse.json(allProjects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, slug, tagline, description, techStack, liveUrl, githubUrl, imageUrl, displayIndex, featured } = body;

    if (!title || !slug || !tagline || !description || !techStack || displayIndex === undefined || featured === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newProject = await db.insert(projects).values({
      title,
      slug,
      tagline,
      description,
      techStack,
      liveUrl,
      githubUrl,
      imageUrl,
      displayIndex,
      featured,
    }).returning();

    return NextResponse.json(newProject[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
