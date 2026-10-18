import type { Experience } from '@/lib/db/schema';
import Badge from '@/components/Badge';

export default function ExperienceCard({ experience }: { experience: Experience }) {
  let techStack: string[] = [];
  try {
    if (experience.techStack) {
      techStack = typeof experience.techStack === 'string' ? JSON.parse(experience.techStack as string) : experience.techStack;
    }
  } catch (e) {
    // ignore
  }

  return (
    <div className="relative pl-8 sm:pl-10 group">
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 w-3 h-3 bg-surface border-2 border-accent rounded-full group-hover:bg-accent transition-colors"></div>
      
      <div className="bg-surface border border-border rounded-xl p-6 hover:border-border/80 transition-colors">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
          <div>
            <h3 className="text-xl font-bold text-text group-hover:text-accent transition-colors">
              {experience.role}
            </h3>
            <div className="text-lg text-text-muted mt-1">
              {experience.companyUrl ? (
                <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">
                  {experience.company} ↗
                </a>
              ) : (
                experience.company
              )}
            </div>
          </div>
          <span className="text-sm font-medium text-text-muted bg-bg-alt px-3 py-1 rounded-full whitespace-nowrap">
            {experience.duration}
          </span>
        </div>

        <p className="text-text-muted text-sm mb-6 whitespace-pre-line">
          {experience.description}
        </p>

        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <Badge key={tech} label={tech} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
