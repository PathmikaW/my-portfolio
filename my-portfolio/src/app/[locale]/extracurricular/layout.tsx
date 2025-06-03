import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Extracurricular | Pathmika Weerarathna',
  description: 'Discover extracurricular activities and volunteer work by Pathmika Weerarathna.',
};

export default function ExtracurricularLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
