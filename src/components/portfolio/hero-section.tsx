import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
      <div className="max-w-3xl space-y-6">
        <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="size-3.5" aria-hidden />
          Engineering playground · Portfolio
        </p>

        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          Building systems with{" "}
          <span className="text-primary text-glow">precision</span> and craft.
        </h1>

        <p className="text-lg text-muted-foreground sm:text-xl">
          {siteConfig.introduction} Explore shipped work, experiments in progress,
          and the tools I use to ship reliable software.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="#projects"
            className={cn(buttonVariants(), "gap-2")}
          >
            View projects
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href="#writing"
            className={buttonVariants({ variant: "outline" })}
          >
            Read writing
          </Link>
        </div>
      </div>
    </section>
  );
}
