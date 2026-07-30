import { experience } from '@/data/experience';
import { getTranslations } from 'next-intl/server';
import ExperienceClient from './_components/ExperienceClient';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function ExperiencePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pageTitle' });

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 md:px-8 lg:px-12 space-y-8">
      <h1 className="font-display text-4xl font-bold tracking-tight mb-4">{t('experience')}</h1>
      <ExperienceClient experience={experience} locale={locale} />
    </div>
  );
}
