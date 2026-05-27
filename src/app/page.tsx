import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AssistantChatWidget } from "@/components/assistant/assistant-chat-widget";
import { HeroSection } from "@/components/portfolio/hero-section";
import { ProjectGrid } from "@/components/portfolio/project-grid";
import { WritingGrid } from "@/components/writing/writing-grid";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { getProjects } from "@/lib/projects";
import { getLatestWritingPosts } from "@/lib/writing";

export default function HomePage() {
  const projects = getProjects();
  const latestPosts = getLatestWritingPosts(3);

  return (
    <>
      <HeroSection />

      <section
        id="projects"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-20 sm:px-6 lg:px-8"
      >
        <div className="mb-10 space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Featured work
          </h2>
        </div>

        <ProjectGrid projects={projects} />
      </section>

      <Separator className="mx-auto max-w-6xl opacity-40" />

      <section
        id="writing"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mb-10 flex items-end justify-between gap-4">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Writing
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              Thoughts on software, product, and building things. Cross-posted from LinkedIn and Medium.
            </p>
          </div>
          <Link
            href="/writing"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "shrink-0 gap-2 border-border/80"
            )}
          >
            All posts
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <WritingGrid posts={latestPosts} />
      </section>

      <AssistantChatWidget />
    </>
  );
}
