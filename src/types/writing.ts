export type WritingType = "post" | "article";

export interface WritingPost {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date string (YYYY-MM-DD) for stable sorting/formatting. */
  date: string;
  tags: string[];
  /** "post" = LinkedIn post, "article" = LinkedIn long-form article. */
  type: WritingType;
  /** Optional canonical link to the original LinkedIn post or article. */
  linkedinUrl?: string;
  /** Optional link to the full article on Medium (or elsewhere). */
  mediumUrl?: string;
  /**
   * Lightweight markdown content (headings + paragraphs).
   * Replace with MDX later if preferred.
   */
  content: string;
}

