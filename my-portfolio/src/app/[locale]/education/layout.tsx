import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Education | Pathmika Weerarathna',
  description: 'Explore the education and academic background of Pathmika Weerarathna.',
};

export default function EducationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
