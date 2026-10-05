import { blogSeries } from '@/data/blog';
import { ogCard, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og-card';

export const alt = 'Garden Diary by Pathmika Weerarathna';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Rebuilt on each deploy, so counts and the latest post stay current.
export const dynamic = 'force-static';

export default function OpengraphImage() {
  const series = blogSeries.find((s) => s.id === 'garden-diary')!;
  const latest = [...series.posts].sort((a, b) => b.entry - a.entry || (b.part ?? 0) - (a.part ?? 0))[0];
  const entries = new Set(series.posts.map((p) => p.entry)).size;

  return ogCard({
    path: '/blog',
    title: series.name,
    subtitle: 'From 5 years in tech to my first home farm in Sri Lanka',
    highlight: `Latest: #${latest.entry} - ${latest.title}`,
    footer: `${entries} entries · ${series.posts.length} posts · Pathmika Weerarathna`,
  });
}
