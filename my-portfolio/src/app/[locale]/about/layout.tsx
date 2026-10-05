import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return pageMetadata({
    locale,
    path: '/about',
    title: 'About Me | Pathmika Weerarathna',
    ogTitle: 'About Pathmika Weerarathna - Full-Stack Engineer',
    description:
      'Full-stack engineer with five years of experience in React Native, Next.js and backend APIs, plus hands-on AI/ML work. Reading an MSc in Artificial Intelligence at the University of Moratuwa.',
  });
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
