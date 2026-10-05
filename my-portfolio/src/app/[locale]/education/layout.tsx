import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return pageMetadata({
    locale,
    path: '/education',
    title: 'Education | Pathmika Weerarathna',
    ogTitle: 'Education - Pathmika Weerarathna',
    description:
      'MSc in Artificial Intelligence (reading) at the University of Moratuwa, and a B.Sc. in Information Systems from the University of Colombo School of Computing.',
  });
}

export default function EducationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
