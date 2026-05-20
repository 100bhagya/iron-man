export type ProjectStatus = "shipped" | "in-progress" | "experiment";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  featured: boolean;
  status: ProjectStatus;
}
