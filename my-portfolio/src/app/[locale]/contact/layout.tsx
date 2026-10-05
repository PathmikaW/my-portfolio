import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return pageMetadata({
    locale,
    path: '/contact',
    title: 'Contact | Pathmika Weerarathna',
    ogTitle: 'Get in touch with Pathmika Weerarathna',
    description:
      'Send a message, or connect by email, phone or LinkedIn. Based in Gonapola, Sri Lanka.',
  });
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
