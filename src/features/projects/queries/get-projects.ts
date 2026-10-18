import { db } from '@/lib/db';
import { projects } from '@/lib/db/schema';
import { asc, eq } from 'drizzle-orm';

export async function getProjects() {
  return db.select().from(projects).orderBy(asc(projects.displayIndex));
}

export async function getFeaturedProjects() {
  return db.select().from(projects).where(eq(projects.featured, true)).orderBy(asc(projects.displayIndex));
}
