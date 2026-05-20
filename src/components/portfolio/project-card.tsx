import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Project, ProjectStatus } from "@/types/project";

const statusLabels: Record<ProjectStatus, string> = {
  shipped: "Shipped",
  "in-progress": "In Progress",
  experiment: "Experiment",
};

const statusStyles: Record<ProjectStatus, string> = {
  shipped: "border-primary/40 bg-primary/10 text-primary",
  "in-progress": "border-amber-500/30 bg-amber-500/10 text-amber-400",
  experiment: "border-muted-foreground/30 bg-muted text-muted-foreground",
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card
      className={cn(
        "h-full transition-colors hover:border-primary/30 hover:shadow-[0_0_32px_-12px_var(--glow)]",
        project.featured && "ring-1 ring-primary/20"
      )}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg">{project.title}</CardTitle>
          <Badge
            variant="outline"
            className={cn("shrink-0 text-xs", statusStyles[project.status])}
          >
            {statusLabels[project.status]}
          </Badge>
        </div>
        <CardDescription className="line-clamp-3">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ul className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Badge variant="secondary" className="font-mono text-xs">
                {tag}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="border-t border-border/60 bg-transparent">
        <Link
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-80"
        >
          View project
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </CardFooter>
    </Card>
  );
}
