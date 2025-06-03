import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Portfolio | Pathmika Weerarathna',
  description: 'Pathmika Weerarathna',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
