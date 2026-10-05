import { extracurricular } from '@/data/extracurricular';
import { ogCard, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og-card';

export const alt = 'Extracurricular activities of Pathmika Weerarathna';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Rebuilt on each deploy from the page's data file.
export const dynamic = 'force-static';

export default function OpengraphImage() {
  return ogCard({
    path: '/extracurricular',
    title: 'Extracurricular',
    subtitle: 'Clubs, volunteering and sports',
    footer: extracurricular
      .slice(0, 3)
      .map((a) => a.name)
      .join(' · '),
  });
}
