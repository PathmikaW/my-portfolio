import { blogSeries, type BlogSeries } from '@/data/blog';

/*
 * Link-preview text and image card for each blog series (one per tab).
 * Used by blog/page.tsx (metadata) and api/og/blog/[series] (the image).
 */

const DEFAULT_SERIES = 'garden-diary';

const PREVIEW_TEXT: Record<string, { ogTitle: string; subtitle: string; description: string }> = {
  'garden-diary': {
    ogTitle: 'Garden Diary - From 5 Years in Tech to My First Home Farm',
    subtitle: 'From 5 years in tech to my first home farm in Sri Lanka',
    description:
      'A software engineer growing a home farm from scratch in Sri Lanka and writing about it in public, from the first seed to the first harvest.',
  },
  'dev-journal': {
    ogTitle: 'Dev Journal - Pathmika Weerarathna',
    subtitle: 'Notes on what I build and learn as a software engineer',
    description:
      'Software engineering articles by Pathmika Weerarathna: deep dives into architecture, performance, and lessons from the things I build.',
  },
};

const byNewest = (a: BlogSeries['posts'][number], b: BlogSeries['posts'][number]) =>
  b.entry - a.entry || (b.part ?? 0) - (a.part ?? 0);

/** The series a `?series=` value points to, falling back to the default tab */
export function resolveSeries(id?: string): BlogSeries {
  const ongoing = blogSeries.filter((s) => s.status === 'ongoing' && s.posts.length > 0);
  return (
    ongoing.find((s) => s.id === id && PREVIEW_TEXT[s.id]) ??
    ongoing.find((s) => s.id === DEFAULT_SERIES)!
  );
}

export function isDefaultSeries(series: BlogSeries) {
  return series.id === DEFAULT_SERIES;
}

export function previewText(series: BlogSeries) {
  return PREVIEW_TEXT[series.id];
}

export function previewCard(series: BlogSeries) {
  const latest = [...series.posts].sort(byNewest)[0];
  const numbered = series.numbered !== false;
  const entries = new Set(series.posts.map((p) => p.entry)).size;
  const count = numbered
    ? `${entries} entries · ${series.posts.length} posts`
    : `${series.posts.length} ${series.posts.length === 1 ? 'article' : 'articles'}`;

  return {
    path: '/blog',
    title: series.name,
    subtitle: previewText(series).subtitle,
    highlight: numbered ? `Latest: #${latest.entry} - ${latest.title}` : `Latest: ${latest.title}`,
    footer: `${count} · Pathmika Weerarathna`,
  };
}

/** Image URL; the post count busts platform caches when a post is added */
export function previewImageUrl(series: BlogSeries) {
  return `/api/og/blog/${series.id}?v=${series.posts.length}`;
}

/** Series that have a preview, for static generation of the images */
export function previewSeriesIds() {
  return blogSeries.filter((s) => PREVIEW_TEXT[s.id] && s.posts.length > 0).map((s) => s.id);
}
