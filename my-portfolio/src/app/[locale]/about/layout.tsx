import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me | Pathmika Weerarathna',
  description: 'Learn more about Pathmika Weerarathna - skills, background, and professional profile.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
