/**
 * Blog content model — add a new post by creating a file in /posts and importing it in index.ts.
 *
 * Each post is an ordered list of `blocks`. Supported block types:
 * - paragraph, heading, subheading
 * - bulletList
 * - code (SQL / shell / config — shown in a monospace block)
 * - table (headers + rows)
 * - callout (highlighted aside, e.g. regulatory note)
 */

export type BlogBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'bulletList'; items: string[] }
  | { type: 'code'; content: string }
  | { type: 'table'; headers: string[]; rows: string[][]; caption?: string }
  | { type: 'callout'; text: string }

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  author: string
  /** Top line like the PDF masthead */
  publicationLine: string
  /** Topic tags and read time, e.g. "Performance Tuning · PostgreSQL · 8 min read" */
  descriptorLine: string
  blocks: BlogBlock[]
}
