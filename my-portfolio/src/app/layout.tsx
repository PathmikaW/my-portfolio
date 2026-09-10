import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://pathmikaw.vercel.app'),
  title: 'My Portfolio | Pathmika Weerarathna',
  description: 'Pathmika Weerarathna',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
