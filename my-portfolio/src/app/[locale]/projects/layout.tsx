import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Pathmika Weerarathna',
  description: 'Explore the projects and portfolio of Pathmika Weerarathna.',
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
