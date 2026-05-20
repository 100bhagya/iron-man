/**
 * Content layer placeholder for MDX articles in /content.
 * Wire up next-mdx-remote or @next/mdx when writing routes are added.
 */

export interface ContentMeta {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
}
