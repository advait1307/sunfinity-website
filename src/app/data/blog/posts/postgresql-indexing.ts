import type { BlogPost } from '../types'

/**
 * Source: PostgreSQL indexing guide (Data Engineering Blog PDF).
 * To edit: adjust `blocks` below — order matters.
 */
export const postgresqlIndexingPost: BlogPost = {
  slug: 'postgresql-query-performance-indexing',
  title: 'Why your PostgreSQL queries are slow — and how to fix them with the right indexes',
  excerpt:
    'Most PostgreSQL performance problems come down to the planner not finding data fast enough. Measure with EXPLAIN ANALYZE, pick the right index type, and validate usage — without guessing.',
  date: '2026-05-01',
  readTime: '8 min read',
  author: 'Sunfinity Data Engineering',
  publicationLine: 'Sunfinity Technology Solutions | Data Engineering Blog',
  descriptorLine: 'Performance Tuning · PostgreSQL',
  blocks: [
    {
      type: 'paragraph',
      text: "Most PostgreSQL performance problems come down to one thing: the query planner can't find data fast enough. Tables that once returned results in milliseconds start taking seconds — sometimes minutes — as data grows. The fix is usually an index. But picking the wrong index, or adding one in the wrong place, can make things worse. This guide walks you through how to diagnose slow queries systematically and choose the right index type every time.",
    },
    {
      type: 'heading',
      text: 'Why queries slow down as tables grow',
    },
    {
      type: 'paragraph',
      text: 'When you run a query without a matching index, PostgreSQL does a sequential scan — it reads every row in the table from disk, checks each one against your WHERE clause, and returns the matches. On a table with 10,000 rows, this takes milliseconds. On a table with 50 million rows, the same sequential scan can take several seconds and consume significant I/O.',
    },
    {
      type: 'paragraph',
      text: "PostgreSQL's query planner is smart — it estimates the cost of different execution strategies using table statistics and chooses the cheapest plan. But it can only use an index if one exists that matches the query pattern. Without it, sequential scans are the only option.",
    },
    {
      type: 'callout',
      text: 'Rule of thumb: if a table has more than ~10,000 rows and you filter on a column regularly, that column is a candidate for an index.',
    },
    {
      type: 'heading',
      text: 'Step 1: Diagnose with EXPLAIN ANALYZE',
    },
    {
      type: 'paragraph',
      text: 'Before adding any index, run EXPLAIN ANALYZE on the slow query. This shows you exactly what the planner did, how many rows it processed, and how long each step took. Never guess — always measure first.',
    },
    {
      type: 'code',
      content: `EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT *
FROM transactions
WHERE customer_id = 1042
AND created_at > NOW() - INTERVAL '30 days';`,
    },
    {
      type: 'paragraph',
      text: 'The key things to look for in the output:',
    },
    {
      type: 'bulletList',
      items: [
        'Seq Scan — a sequential scan is happening; this is the most common sign of a missing index',
        'Rows Removed by Filter: N — a high number means PostgreSQL read many rows but discarded most of them',
        'Buffers: shared hit=X read=Y — high “read” values mean data is coming from disk, not cache',
        'Actual time — compare this to the estimated time to see if statistics are stale',
      ],
    },
    {
      type: 'paragraph',
      text: 'If you see a large Seq Scan node with many rows removed by filter, you have a missing or unused index. If you see an Index Scan but the query is still slow, check the “Actual Rows” — an index that returns too many rows still requires a lot of heap fetches.',
    },
    {
      type: 'heading',
      text: 'Step 2: Understand the index types available',
    },
    {
      type: 'paragraph',
      text: "PostgreSQL supports several index types. Each is designed for a different kind of query. Choosing the wrong type doesn't cause errors — it just means the index won't be used, or won't be as effective as it could be.",
    },
    {
      type: 'table',
      caption: 'Index types at a glance',
      headers: ['Index type', 'Best for', 'Typical use case'],
      rows: [
        ['B-tree', 'Equality & range queries', "WHERE id = 5, WHERE date > '2024-01-01'"],
        ['GIN', 'Multi-value columns', 'JSONB fields, arrays, full-text search'],
        ['BRIN', 'Large tables with natural order', 'Time-series created_at columns'],
        ['Partial', 'Subset of rows', "WHERE status = 'pending' (high cardinality filter)"],
        ['Hash', 'Equality only (no ranges)', 'Large exact-match joins'],
      ],
    },
    {
      type: 'subheading',
      text: 'B-tree indexes — the default and most common',
    },
    {
      type: 'paragraph',
      text: "B-tree (balanced tree) is the default when you run CREATE INDEX without specifying a type. It works well for equality checks (WHERE id = 5), range queries (WHERE created_at > '2024-01-01'), and sorting (ORDER BY name). It supports all comparison operators (<, <=, =, >=, >) and works on most data types.",
    },
    {
      type: 'code',
      content: `CREATE INDEX idx_transactions_customer
ON transactions (customer_id);`,
    },
    {
      type: 'paragraph',
      text: "When to use: almost always. If you're not sure which index type to use, start with B-tree.",
    },
    {
      type: 'subheading',
      text: 'GIN indexes — for multi-value columns',
    },
    {
      type: 'paragraph',
      text: 'GIN (Generalized Inverted Index) is designed for columns that contain multiple values in a single row — JSONB documents, arrays, and tsvector full-text search columns. A single JSONB document might contain dozens of keys; GIN builds an index entry for each key so lookups work like a lookup table, not a scan.',
    },
    {
      type: 'code',
      content: `CREATE INDEX idx_events_metadata
ON events USING GIN (metadata);
-- Now this query uses the index:
SELECT * FROM events
WHERE metadata @> '{"event_type": "login", "channel": "mobile"}';`,
    },
    {
      type: 'paragraph',
      text: 'When to use: JSONB columns you query with @>, ??, or path operators. Arrays you filter with @> or &&. Full-text search columns using tsvector.',
    },
    {
      type: 'subheading',
      text: 'BRIN indexes — for large tables with physical ordering',
    },
    {
      type: 'paragraph',
      text: "BRIN (Block Range INdex) stores the min and max values for each range of disk blocks. It's extremely small — often 100x smaller than a B-tree on the same column — and very fast to scan. The catch: it only works well when the column values correlate with physical storage order. Time-series tables where rows are inserted in chronological order are the perfect use case.",
    },
    {
      type: 'code',
      content: `CREATE INDEX idx_transactions_created_brin
ON transactions USING BRIN (created_at);
-- Tiny index size, excellent for range scans on large tables:
SELECT * FROM transactions
WHERE created_at BETWEEN '2025-01-01' AND '2025-03-31';`,
    },
    {
      type: 'paragraph',
      text: 'When to use: append-only time-series tables (logs, events, sensor data) with hundreds of millions of rows where you query by date range. Do not use on columns that are written in random order.',
    },
    {
      type: 'subheading',
      text: 'Partial indexes — index only the rows you actually query',
    },
    {
      type: 'paragraph',
      text: "A partial index includes only the rows that match a WHERE condition. If your queries always filter by status = 'pending' and only 5% of rows are pending, a partial index on those rows is 20x smaller than a full index and proportionally faster to scan and update.",
    },
    {
      type: 'code',
      content: `-- Full index: indexes all 50 million rows
CREATE INDEX idx_all ON transactions (created_at, amount);
-- Partial index: indexes only ~2.5 million 'pending' rows
CREATE INDEX idx_pending_only
ON transactions (created_at, amount)
WHERE status = 'pending';`,
    },
    {
      type: 'callout',
      text: "Partial indexes are one of the highest-leverage optimisations in PostgreSQL. They are smaller, faster, and have lower write overhead than full indexes. Use them whenever your queries consistently filter on a column with low cardinality (like status, type, or is_active).",
    },
    {
      type: 'heading',
      text: 'Step 3: Use composite indexes correctly',
    },
    {
      type: 'paragraph',
      text: 'A composite index covers multiple columns. When used correctly, it can satisfy both the WHERE clause and the ORDER BY in a single index scan, eliminating a sort step. But the column order matters — PostgreSQL can use a composite index from left to right, but not from the middle.',
    },
    {
      type: 'code',
      content: `-- Query: filter by customer_id, sort by created_at
SELECT * FROM transactions
WHERE customer_id = 1042
ORDER BY created_at DESC;
-- Correct composite index (equality column first):
CREATE INDEX idx_customer_date
ON transactions (customer_id, created_at DESC);`,
    },
    {
      type: 'paragraph',
      text: 'This index satisfies the WHERE clause using the first column (customer_id) and delivers rows in the right order using the second column (created_at), avoiding a sort. If the index were (created_at, customer_id), it would not be used for this query because PostgreSQL can’t skip the first column.',
    },
    {
      type: 'paragraph',
      text: 'The general rule for composite index column order:',
    },
    {
      type: 'bulletList',
      items: [
        'Equality columns first (WHERE col = value)',
        'Range columns after equality (WHERE col > value)',
        'Columns used in ORDER BY last, with the correct sort direction',
      ],
    },
    {
      type: 'heading',
      text: 'Step 4: Check if your index is actually being used',
    },
    {
      type: 'paragraph',
      text: 'After creating an index, run EXPLAIN ANALYZE again. If the planner still chooses a sequential scan, check these common reasons:',
    },
    {
      type: 'bulletList',
      items: [
        'The table is small — PostgreSQL estimates a seq scan is cheaper than an index scan for small tables (usually < ~1000 rows). This is often correct.',
        'Statistics are stale — run ANALYZE transactions to refresh the planner’s estimates',
        'The column has low cardinality — if a column has only 2-3 distinct values (e.g., a boolean), an index may not help because each value matches a large fraction of rows',
        'The query returns too many rows — if your query matches >10–20% of the table, a seq scan is often faster than an index scan + heap fetch',
        "The index type doesn't match the operator — a B-tree index won't be used for JSONB @> queries; you need GIN",
      ],
    },
    {
      type: 'paragraph',
      text: 'You can also query pg_stat_user_indexes to see which indexes are actually being scanned in production:',
    },
    {
      type: 'code',
      content: `SELECT
relname AS table,
indexrelname AS index,
idx_scan AS scans,
idx_tup_read AS tuples_read
FROM pg_stat_user_indexes
WHERE relname = 'transactions'
ORDER BY idx_scan DESC;`,
    },
    {
      type: 'paragraph',
      text: 'An index with idx_scan = 0 after weeks of production traffic is almost certainly not being used and should be reviewed before removal.',
    },
    {
      type: 'heading',
      text: 'Step 5: Remove unused and duplicate indexes',
    },
    {
      type: 'paragraph',
      text: 'Every index has a write cost. INSERT, UPDATE, and DELETE operations must update every index on the table. A table with 8 indexes takes roughly 8x the write overhead of a table with 1. Unused indexes slow down writes without helping reads.',
    },
    {
      type: 'paragraph',
      text: 'Identify duplicate indexes (indexes that cover the same columns in the same order):',
    },
    {
      type: 'code',
      content: `SELECT
indrelid::regclass AS table,
array_agg(indexrelid::regclass) AS indexes,
array_agg(indkey) AS index_keys
FROM pg_index
GROUP BY indrelid, indkey
HAVING COUNT(*) > 1;`,
    },
    {
      type: 'paragraph',
      text: 'A good rule of thumb: if an index has had zero scans in the past 30 days and the table is actively written to, drop it. Use CREATE INDEX CONCURRENTLY to add new indexes without locking the table, and DROP INDEX CONCURRENTLY to remove them safely.',
    },
    {
      type: 'heading',
      text: 'Putting it all together: a practical workflow',
    },
    {
      type: 'paragraph',
      text: 'When you encounter a slow query in production, follow this sequence:',
    },
    {
      type: 'bulletList',
      items: [
        'Run EXPLAIN (ANALYZE, BUFFERS) and look for Seq Scan nodes with high row counts',
        'Check pg_stat_user_indexes to see what indexes already exist and are being used',
        'Choose the index type based on the query pattern: B-tree for equality/range, GIN for JSONB/arrays, BRIN for time-series, partial for filtered subsets',
        'Create the index with CREATE INDEX CONCURRENTLY to avoid table locks',
        'Run EXPLAIN ANALYZE again and confirm the index is used',
        'Monitor pg_stat_user_indexes weekly and drop indexes with zero scans',
      ],
    },
    {
      type: 'callout',
      text: 'Indexing is not a one-time task. As data grows and query patterns evolve, index effectiveness changes. Build a habit of reviewing slow query logs (pg_stat_statements) and index usage stats monthly. A 30-minute review can prevent a 3 AM incident.',
    },
    {
      type: 'heading',
      text: 'Summary',
    },
    {
      type: 'paragraph',
      text: 'Slow PostgreSQL queries are almost always fixable with the right index. The key is to measure first with EXPLAIN ANALYZE, choose the index type that matches your query pattern, and validate that the index is actually being used. Equally important: remove indexes that are no longer used to keep write performance healthy.',
    },
    {
      type: 'paragraph',
      text: 'Written by the Sunfinity Data Engineering team.',
    },
  ],
}
