import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return pageMetadata({
    locale,
    path: '/achievements',
    title: 'Achievements | Pathmika Weerarathna',
    ogTitle: 'Achievements - Pathmika Weerarathna',
    description:
      "Awards and recognitions, including Emerging Employee of the Year (2023) at Omobio and the University of Colombo Director's List.",
  });
}

export default function AchievementsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
