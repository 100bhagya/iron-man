import { HeroSection } from "@/components/portfolio/hero-section";
import { ProjectGrid } from "@/components/portfolio/project-grid";
import { Separator } from "@/components/ui/separator";
import { getProjects } from "@/lib/projects";

export default function HomePage() {
  const projects = getProjects();

  return (
    <>
      <HeroSection />

      <section
        id="projects"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-20 sm:px-6 lg:px-8"
      >
        <div className="mb-10 space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Selected work
          </h2>
        </div>
        
        <ProjectGrid projects={projects} />
      </section>

      <Separator className="mx-auto max-w-6xl opacity-40" />

      <section
        id="writing"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="rounded-xl border border-border/60 bg-card/50 p-8 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight">Writing</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-primary">
              Coming soon
            </code>
            ...
          </p>
        </div>
      </section>
    </>
  );
}
