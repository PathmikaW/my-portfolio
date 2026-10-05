import { education } from '@/data/education';
import { ogCard, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og-card';

export const alt = 'Education of Pathmika Weerarathna';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Rebuilt on each deploy from the page's data file.
export const dynamic = 'force-static';

export default function OpengraphImage() {
  const [current] = education;

  return ogCard({
    path: '/education',
    title: 'Education',
    subtitle: current.degree,
    footer: current.institution,
  });
}
