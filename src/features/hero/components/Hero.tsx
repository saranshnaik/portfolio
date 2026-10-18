import { db } from '@/lib/db';
import { profile, socialLinks } from '@/lib/db/schema';
import { asc } from 'drizzle-orm';
import Container from '@/components/Container';
import Icons from '@/components/Icons';
import Link from 'next/link';

export default async function Hero() {
  const profileData = await db.select().from(profile).limit(1).then(rows => rows[0]);
  const links = await db.select().from(socialLinks).orderBy(asc(socialLinks.displayIndex));

  if (!profileData) return null;

  return (
    <section className="min-h-screen flex items-center pt-16">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold text-text mb-6 tracking-tight">
            Hi, I&apos;m {profileData.name.split(' ')[0]}.
          </h1>
          <h2 className="text-2xl md:text-3xl text-text-muted mb-8 font-medium">
            {profileData.title}
          </h2>
          <p className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl leading-relaxed">
            {profileData.tagline}
          </p>

          <div className="flex flex-wrap gap-4 items-center mb-12">
            <Link 
              href="#projects"
              className="px-6 py-3 bg-accent hover:bg-accent-hover text-bg font-medium rounded-lg transition-colors"
            >
              View Projects
            </Link>
            <Link 
              href="#contact"
              className="px-6 py-3 bg-surface hover:bg-surface-hover text-text border border-border font-medium rounded-lg transition-colors"
            >
              Get in Touch
            </Link>
          </div>

          <div className="flex gap-6">
            {links.map((link) => {
              const Icon = Icons[link.icon?.toLowerCase()] || Icons[link.platform?.toLowerCase()] || Icons.github;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-accent transition-colors"
                  aria-label={link.label}
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
