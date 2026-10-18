import { db } from '@/lib/db';
import { profile } from '@/lib/db/schema';
import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';

export default async function About() {
  const profileData = await db.select().from(profile).limit(1).then(rows => rows[0]);

  if (!profileData || !profileData.bio) return null;

  return (
    <section id="about" className="py-20">
      <Container>
        <SectionHeading title="About" />
        <div className="max-w-3xl prose prose-invert">
          {profileData.bio.split('\n').map((paragraph, idx) => (
            <p key={idx} className="text-text-muted text-lg leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
