import type { Metadata } from "next";

import { WritingGrid } from "@/components/writing/writing-grid";
import { siteConfig } from "@/config/site";
import { getWritingPosts } from "@/lib/writing";

export const metadata: Metadata = {
  title: "Writing",
  description: `Thoughts, case studies, and technical posts by ${siteConfig.author}.`,
};

export default function WritingPage() {
  const posts = getWritingPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mb-12 space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Writing
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Thoughts on software, product, and the craft of building things. Cross-posted from LinkedIn and expanded here.
        </p>
      </div>

      <WritingGrid posts={posts} />
    </div>
  );
}
