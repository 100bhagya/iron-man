import { WritingCard } from "@/components/writing/writing-card";
import type { WritingPost } from "@/types/writing";

interface WritingGridProps {
  posts: WritingPost[];
}

export function WritingGrid({ posts }: WritingGridProps) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <li key={post.slug} className="min-h-0">
          <WritingCard post={post} />
        </li>
      ))}
    </ul>
  );
}
