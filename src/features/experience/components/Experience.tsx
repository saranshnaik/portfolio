import { db } from '@/lib/db';
import { experiences } from '@/lib/db/schema';
import { asc } from 'drizzle-orm';
import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import ExperienceCard from './ExperienceCard';

export default async function Experience() {
  const expData = await db.select().from(experiences).orderBy(asc(experiences.displayIndex));

  return (
    <section id="experience" className="py-20">
      <Container>
        <SectionHeading title="Experience" />
        
        {expData.length === 0 ? (
          <p className="text-text-muted text-lg">No experiences added yet.</p>
        ) : (
          <div className="relative max-w-3xl">
            {/* Timeline line */}
            <div className="absolute left-1.5 top-2 bottom-2 w-px bg-border"></div>
            
            <div className="flex flex-col gap-10">
              {expData.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
