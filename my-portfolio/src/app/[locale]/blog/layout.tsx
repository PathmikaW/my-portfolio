import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return pageMetadata({
    locale,
    path: '/blog',
    title: 'Blog | Pathmika Weerarathna',
    ogTitle: 'Garden Diary - From 5 Years in Tech to My First Home Farm',
    description:
      'A software engineer on a career break, growing a home farm from scratch in Sri Lanka and writing about it in public, from the first seed to the first harvest.',
  });
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
