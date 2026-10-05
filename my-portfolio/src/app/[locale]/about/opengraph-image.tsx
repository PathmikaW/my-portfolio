import { profile } from '@/data/profile';
import { ogCard, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og-card';

export const alt = 'About Pathmika Weerarathna';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Rebuilt on each deploy from the page's data file.
export const dynamic = 'force-static';

export default function OpengraphImage() {
  return ogCard({
    path: '/about',
    title: 'About Me',
    subtitle: profile.title,
    footer: profile.skills.slice(0, 5).join(' · '),
  });
}
