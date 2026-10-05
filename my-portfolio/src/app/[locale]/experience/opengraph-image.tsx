import { experience } from '@/data/experience';
import { ogCard, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og-card';

export const alt = 'Work experience of Pathmika Weerarathna';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Rebuilt on each deploy from the page's data file.
export const dynamic = 'force-static';

export default function OpengraphImage() {
  const [latest] = experience;
  const first = experience[experience.length - 1];

  return ogCard({
    path: '/experience',
    title: 'Experience',
    subtitle: `${latest.role} · ${latest.company}`,
    highlight: `${experience.length} roles since ${first.period.split(' - ')[0]}`,
    footer: 'Mobile · Web · Pre-sales architecture · Applied AI/ML',
  });
}
