import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return pageMetadata({
    locale,
    path: '/certifications',
    title: 'Certifications | Pathmika Weerarathna',
    ogTitle: 'Certifications - Pathmika Weerarathna',
    description:
      'Professional certifications held by Pathmika Weerarathna, including Microsoft Certified: Azure Fundamentals (AZ-900), with links to verify each credential.',
  });
}

export default function CertificationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
