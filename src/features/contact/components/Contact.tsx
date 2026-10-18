import { db } from '@/lib/db';
import { profile, socialLinks } from '@/lib/db/schema';
import { asc } from 'drizzle-orm';
import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import Icons from '@/components/Icons';

export default async function Contact() {
  const profileData = await db.select().from(profile).limit(1).then(rows => rows[0]);
  const links = await db.select().from(socialLinks).orderBy(asc(socialLinks.displayIndex));

  if (!profileData) return null;

  return (
    <section id="contact" className="py-20">
      <Container>
        <SectionHeading title="Get in Touch" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
          <div>
            <p className="text-text-muted text-lg mb-8 leading-relaxed">
              I&apos;m currently open to new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
            </p>
            
            <div className="flex flex-col gap-4">
              {profileData.email && (
                <a href={`mailto:${profileData.email}`} className="text-text hover:text-accent transition-colors font-medium text-lg flex items-center gap-2">
                  <Icons.email className="w-5 h-5" />
                  {profileData.email}
                </a>
              )}
              {profileData.phone && (
                <p className="text-text-muted font-medium text-lg flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  {profileData.phone}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex flex-col gap-6 items-start">
            {profileData.resumeUrl && (
              <a 
                href={profileData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-surface hover:bg-surface-hover text-text border border-border font-medium rounded-lg transition-colors flex items-center gap-2 w-full justify-center sm:w-auto sm:justify-start"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download Resume
              </a>
            )}
            
            <div className="flex gap-4 flex-wrap w-full">
              {links.map((link) => {
                const Icon = Icons[link.icon?.toLowerCase()] || Icons[link.platform?.toLowerCase()] || Icons.github;
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[120px] sm:flex-none px-4 py-3 bg-surface hover:bg-surface-hover border border-border rounded-lg flex items-center justify-center gap-2 text-text-muted hover:text-accent transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium text-sm">{link.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
