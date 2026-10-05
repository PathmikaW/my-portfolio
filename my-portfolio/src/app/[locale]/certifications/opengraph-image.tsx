import { certifications } from '@/data/certifications';
import { ogCard, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og-card';

export const alt = 'Certifications of Pathmika Weerarathna';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Rebuilt on each deploy from the page's data file.
export const dynamic = 'force-static';

export default function OpengraphImage() {
  const [latest] = certifications;

  return ogCard({
    path: '/certifications',
    title: 'Certifications',
    subtitle: latest.name,
    footer: `${latest.issuer} · Issued ${latest.issuedDate}`,
  });
}
