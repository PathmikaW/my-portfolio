import { achievements } from '@/data/achievements';
import { getTranslations } from 'next-intl/server';
import AchievementsClient from './_components/AchievementsClient';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function AchievementsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pageTitle' });

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 md:px-8 lg:px-12 space-y-8">
      <h1 className="font-display text-4xl font-bold tracking-tight mb-4">{t('achievements')}</h1>
      <AchievementsClient achievements={achievements} locale={locale} />
    </div>
  );
}
