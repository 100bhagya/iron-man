import projectsData from "@/data/projects.json";

import type { Project } from "@/types/project";

const projects = projectsData as Project[];

export function getProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
