import Image from 'next/image';
import type { Project } from '@/lib/db/schema';
import Badge from '@/components/Badge';

export default function ProjectCard({ project }: { project: Project }) {
  let techStack: string[] = [];
  try {
    if (project.techStack) {
      techStack = typeof project.techStack === 'string' ? JSON.parse(project.techStack as string) : project.techStack;
    }
  } catch (e) {
    // ignore
  }

  return (
    <div className="flex flex-col bg-surface border border-border rounded-xl overflow-hidden hover:border-border/80 transition-colors group">
      {project.imageUrl && (
        <div className="relative w-full h-48 sm:h-56 bg-bg-alt border-b border-border">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4 gap-4">
          <div>
            <h3 className="text-xl font-bold text-text group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            {project.tagline && (
              <p className="text-sm text-text-muted mt-1">{project.tagline}</p>
            )}
          </div>
          {project.featured && (
            <span className="shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
              Featured
            </span>
          )}
        </div>
        
        <p className="text-text-muted text-sm mb-6 flex-grow line-clamp-3">
          {project.description}
        </p>

        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {techStack.map((tech) => (
              <Badge key={tech} label={tech} />
            ))}
          </div>
        )}

        <div className="flex gap-4 mt-auto pt-4 border-t border-border">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-text hover:text-accent transition-colors inline-flex items-center gap-1"
            >
              Live Demo ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-text hover:text-accent transition-colors inline-flex items-center gap-1"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
