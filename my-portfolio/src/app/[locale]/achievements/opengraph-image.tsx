import { achievements } from '@/data/achievements';
import { ogCard, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og-card';

export const alt = 'Achievements of Pathmika Weerarathna';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Rebuilt on each deploy from the page's data file.
export const dynamic = 'force-static';

export default function OpengraphImage() {
  const [top] = achievements;

  return ogCard({
    path: '/achievements',
    title: 'Achievements',
    subtitle: `${top.title} (${top.year})`,
    footer: `${achievements.length} awards and recognitions`,
  });
}
