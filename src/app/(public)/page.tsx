import Hero from '@/features/hero/components/Hero';
import About from '@/features/about/components/About';
import ProjectGrid from '@/features/projects/components/ProjectGrid';
import Experience from '@/features/experience/components/Experience';
import Contact from '@/features/contact/components/Contact';

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      <Hero />
      <About />
      <ProjectGrid />
      <Experience />
      <Contact />
    </div>
  );
}
