import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar } from "lucide-react";

import { LinkedInIcon } from "@/components/icons/social-icons";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getWritingPost, getWritingPosts } from "@/lib/writing";
import { cn } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getWritingPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getWritingPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      authors: [siteConfig.author],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Minimal markdown → HTML: headings, bold, bullets. */
function renderContent(raw: string) {
  const lines = raw.split("\n");
  const elements: React.ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = (key: string) => {
    if (listBuffer.length === 0) return;
    elements.push(
      <ul key={key} className="my-4 ml-6 list-disc space-y-1.5 text-muted-foreground">
        {listBuffer.map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: inlineMarkdown(item.replace(/^-\s*/, "")) }} />
        ))}
      </ul>
    );
    listBuffer = [];
  };

  lines.forEach((line, i) => {
    const key = String(i);

    if (line.startsWith("## ")) {
      flushList(key + "-list");
      elements.push(
        <h2 key={key} className="mt-8 mb-3 text-xl font-semibold tracking-tight">
          {line.replace(/^## /, "")}
        </h2>
      );
    } else if (line.startsWith("# ")) {
      flushList(key + "-list");
      elements.push(
        <h1 key={key} className="mt-8 mb-3 text-2xl font-semibold tracking-tight">
          {line.replace(/^# /, "")}
        </h1>
      );
    } else if (line.startsWith("- ")) {
      listBuffer.push(line);
    } else if (line.trim() === "") {
      flushList(key + "-list");
    } else {
      flushList(key + "-list");
      elements.push(
        <p
          key={key}
          className="my-4 leading-7 text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: inlineMarkdown(line) }}
        />
      );
    }
  });

  flushList("final");
  return elements;
}

function inlineMarkdown(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code class=\"rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-primary\">$1</code>");
}

export default async function WritingPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getWritingPost(slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      {/* Back link */}
      <Link
        href="/writing"
        className="mb-10 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        All writing
      </Link>

      {/* Header */}
      <header className="mb-10 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
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
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-mono text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {post.title}
        </h1>

        <p className="text-lg text-muted-foreground">{post.excerpt}</p>

        <div className="flex flex-wrap items-center gap-4 pt-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-4" aria-hidden />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>

          {post.mediumUrl && (
            <Link
              href={post.mediumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Read on Medium
            </Link>
          )}

          {post.linkedinUrl && (
            <Link
              href={post.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <LinkedInIcon className="size-4" aria-hidden />
              {post.type === "article" ? "Read LinkedIn article" : "View original post"}
            </Link>
          )}
        </div>
      </header>

      <hr className="border-border/60" />

      {/* Content */}
      <article className="mt-8">
        {renderContent(post.content)}
      </article>

      {post.mediumUrl && (
        <div className="mt-10 rounded-xl border border-primary/25 bg-primary/5 p-6 sm:p-8">
          <p className="text-sm font-medium text-foreground">
            Continue on Medium
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            The full article includes architecture diagrams, visuals, and a
            deeper walkthrough. This page shows only the opening paragraph.
          </p>
          <Link
            href={post.mediumUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants(), "mt-5 gap-2")}
          >
            Read the full article on Medium
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      )}

      {/* Footer CTA */}
      <div className="mt-16 rounded-xl border border-border/60 bg-card/50 p-6 text-sm text-muted-foreground">
        <p>
          Written by{" "}
          <Link
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-80"
          >
            {siteConfig.author}
          </Link>
          . Found this useful? Connect on LinkedIn or{" "}
          <Link
            href={`mailto:${siteConfig.links.email.replace("mailto:", "")}`}
            className="font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-80"
          >
            drop me an email
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
