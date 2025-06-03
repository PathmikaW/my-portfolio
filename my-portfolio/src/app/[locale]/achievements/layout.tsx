import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Achievements | Pathmika Weerarathna',
  description: 'Discover the achievements and recognitions of Pathmika Weerarathna.',
};

export default function AchievementsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
