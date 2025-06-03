import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experience | Pathmika Weerarathna',
  description: 'Explore the professional work experience of Pathmika Weerarathna.',
};

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
