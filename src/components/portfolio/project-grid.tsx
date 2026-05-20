import { ProjectCard } from "@/components/portfolio/project-card";
import type { Project } from "@/types/project";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {projects.map((project) => (
        <li key={project.id} className="min-h-0">
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
