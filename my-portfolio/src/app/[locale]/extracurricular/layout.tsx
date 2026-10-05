import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return pageMetadata({
    locale,
    path: '/extracurricular',
    title: 'Extracurricular | Pathmika Weerarathna',
    ogTitle: 'Extracurricular - Pathmika Weerarathna',
    description:
      'Clubs, volunteering and sports, from the ACM Student Chapter at UCSC to the LEO Club and AIESEC Teach Lanka.',
  });
}

export default function ExtracurricularLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
