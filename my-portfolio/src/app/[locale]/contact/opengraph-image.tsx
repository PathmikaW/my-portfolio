import { contactInfo } from '@/data/contact';
import { ogCard, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og-card';

export const alt = 'Contact Pathmika Weerarathna';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Rebuilt on each deploy from the page's data file.
export const dynamic = 'force-static';

export default function OpengraphImage() {
  return ogCard({
    path: '/contact',
    title: 'Get in touch',
    subtitle: 'Send a message or connect on LinkedIn',
    footer: contactInfo.location,
  });
}
