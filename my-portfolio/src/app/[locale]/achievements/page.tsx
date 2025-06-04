import { getAchievements } from '@/lib/api';
import AchievementsClient from './_components/AchievementsClient';

interface Achievement {
  title: string;
  year: string;
  description: string;
}

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function AchievementsPage({ params }: Props) {
  const { locale } = await params;
  const achievements: Achievement[] = await getAchievements();

  return (
    <AchievementsClient achievements={achievements} locale={locale} />
  );
}
