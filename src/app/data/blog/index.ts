/**
 * Blog registry — order here defines listing order on /blogs.
 *
 * To add a post:
 * 1. Create `posts/your-slug.ts` exporting a `BlogPost` (see `types.ts` + existing posts).
 * 2. Import it below and append to `blogPosts`.
 */

export type { BlogPost, BlogBlock } from './types'
export { postgresqlIndexingPost } from './posts/postgresql-indexing'
export { postgresqlSecurityPost } from './posts/postgresql-security'

import { postgresqlIndexingPost } from './posts/postgresql-indexing'
import { postgresqlSecurityPost } from './posts/postgresql-security'

export const blogPosts = [postgresqlIndexingPost, postgresqlSecurityPost]

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug)
}
