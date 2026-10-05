import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Pathmika Weerarathna',
  description:
    'Garden Diary and other writing by Pathmika Weerarathna: a software engineer documenting a career break, home farming, and learning in public.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
