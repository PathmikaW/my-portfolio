import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return pageMetadata({
    locale,
    path: '/projects',
    title: 'Projects | Pathmika Weerarathna',
    ogTitle: 'Projects - Pathmika Weerarathna',
    description:
      'Personal and industry projects: real-time mobile apps, Next.js web platforms, data platforms and applied AI/ML, with case studies and GitHub links.',
  });
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
