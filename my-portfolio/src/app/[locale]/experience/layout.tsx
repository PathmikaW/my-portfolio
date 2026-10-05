import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return pageMetadata({
    locale,
    path: '/experience',
    title: 'Experience | Pathmika Weerarathna',
    ogTitle: 'Experience - Pathmika Weerarathna',
    description:
      'From intern to Associate Tech Lead at Omobio (2021-2026): telecom mobile and web apps, pre-sales architecture, team leadership, and AI/ML fraud-detection R&D.',
  });
}

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
