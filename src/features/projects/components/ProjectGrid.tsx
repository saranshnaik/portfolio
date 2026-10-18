import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import ProjectCard from './ProjectCard';
import { getProjects } from '../queries/get-projects';

export default async function ProjectGrid() {
  const projects = await getProjects();

  return (
    <section id="projects" className="py-20">
      <Container>
        <SectionHeading title="Projects" />
        
        {projects.length === 0 ? (
          <p className="text-text-muted text-lg">No projects yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
