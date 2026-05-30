import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { siteConfig } from "@/config/site";

const HF_SPACE_URL = "https://saubhagyag-deep-research.hf.space";

export const metadata: Metadata = {
  title: "Deep Research",
  description: `Agent-driven deep research tool by ${siteConfig.author}.`,
};

export default function DeepResearchPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mb-10 space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Deep Research
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          An agent-driven research assistant built with Gradio and hosted on
          Hugging Face Spaces. Ask a question and let the agent gather sources,
          synthesize findings, and return a structured report.
        </p>
        <Link
          href={HF_SPACE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-primary transition-opacity hover:opacity-80"
        >
          Open in Hugging Face
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-border/60 bg-card/50 shadow-[0_0_40px_-12px_var(--glow-soft)]">
        <iframe
          src={HF_SPACE_URL}
          title="Deep Research Tool"
          className="h-[min(80vh,900px)] w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          loading="lazy"
        />
      </div>
    </div>
  );
}
