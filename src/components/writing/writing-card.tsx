import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { LinkedInIcon } from "@/components/icons/social-icons";
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
import type { WritingPost } from "@/types/writing";

interface WritingCardProps {
  post: WritingPost;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function WritingCard({ post }: WritingCardProps) {
  return (
    <Card className="flex h-full flex-col transition-colors hover:border-primary/30 hover:shadow-[0_0_32px_-12px_var(--glow)]">
      <CardHeader className="flex-1">
        <div className="mb-2 flex items-center gap-2">
          <time
            dateTime={post.date}
            className="text-xs text-muted-foreground tabular-nums"
          >
            {formatDate(post.date)}
          </time>
          <span className="text-border">·</span>
          <Badge
            variant="outline"
            className={cn(
              "text-xs capitalize",
              post.type === "article"
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-muted-foreground/30 bg-muted text-muted-foreground"
            )}
          >
            {post.type}
          </Badge>
        </div>

        <CardTitle className="text-lg leading-snug">{post.title}</CardTitle>
        <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
      </CardHeader>

      <CardContent>
        <ul className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li key={tag}>
              <Badge variant="secondary" className="font-mono text-xs">
                {tag}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-border/60 bg-transparent">
        <Link
          href={`/writing/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-80"
        >
          {post.mediumUrl ? "Preview" : "Read more"}
          <ArrowRight className="size-4" aria-hidden />
        </Link>

        <div className="flex items-center gap-3">
          {post.mediumUrl && (
            <Link
              href={post.mediumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Medium
            </Link>
          )}

          {post.linkedinUrl && (
            <Link
              href={post.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <LinkedInIcon className="size-3.5" aria-hidden />
              {post.type === "article" ? "LinkedIn article" : "Original post"}
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
