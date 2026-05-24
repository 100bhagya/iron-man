import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/hero-background.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Readability overlays */}
        <div className="absolute inset-0 bg-background/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_75%_40%,var(--glow-soft),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pt-28">
        <div className="max-w-3xl space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/50 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
            <Sparkles className="size-3.5" aria-hidden />
            Engineering playground · Portfolio
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-primary text-glow">Designing</span> the Future.
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {siteConfig.introduction} Explore shipped work, experiments in
            progress, and the tools I use to ship reliable software.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="#projects" className={cn(buttonVariants(), "gap-2")}>
              View projects
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="#writing"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "border-border/80 bg-background/40 backdrop-blur-sm"
              )}
            >
              Read writing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
