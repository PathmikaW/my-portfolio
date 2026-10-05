import type { Metadata } from 'next';

export const SITE_URL = 'https://pathmikaw.vercel.app';
export const SITE_NAME = 'Pathmika Weerarathna';

interface PageMetadataInput {
  locale: string;
  /** Route path after the locale, e.g. '/blog'; '' for the home page */
  path: string;
  /** Browser tab title, e.g. 'Blog | Pathmika Weerarathna' */
  title: string;
  /** Headline on link previews (WhatsApp, LinkedIn, X); defaults to `title` */
  ogTitle?: string;
  description: string;
}

/*
 * Metadata for a page's <title>, canonical URL and link previews.
 * The preview image comes from the segment's opengraph-image.tsx (see lib/og-card.tsx).
 */
export function pageMetadata({ locale, path, title, ogTitle, description }: PageMetadataInput): Metadata {
  const url = `${SITE_URL}/${locale}${path}`;
  const shareTitle = ogTitle ?? title;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE_NAME,
      title: shareTitle,
      description,
      locale: locale === 'si' ? 'si_LK' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description,
    },
  };
}
