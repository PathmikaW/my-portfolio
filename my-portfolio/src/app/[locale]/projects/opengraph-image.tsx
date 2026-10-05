import { personalProjects, industryProjects } from '@/data/projects';
import { ogCard, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og-card';

export const alt = 'Projects by Pathmika Weerarathna';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Rebuilt on each deploy from the page's data file.
export const dynamic = 'force-static';

export default function OpengraphImage() {
  return ogCard({
    path: '/projects',
    title: 'Projects',
    subtitle: 'Mobile · Web · Data platforms · Applied AI/ML',
    highlight: `Featured: ${personalProjects[0].title}`,
    footer: `${personalProjects.length} personal projects · ${industryProjects.length} industry projects`,
  });
}
