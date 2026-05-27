import writingData from "@/data/writing.json";

import type { WritingPost } from "@/types/writing";

const posts = writingData as WritingPost[];

export function getWritingPosts(): WritingPost[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getWritingPost(slug: string): WritingPost | undefined {
  return getWritingPosts().find((post) => post.slug === slug);
}

export function getLatestWritingPosts(limit = 3): WritingPost[] {
  return getWritingPosts().slice(0, Math.max(0, limit));
}

