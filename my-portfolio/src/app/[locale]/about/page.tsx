// src/app/[locale]/about/page.tsx

import { getProfile } from '@/lib/api';
import { getTranslations } from 'next-intl/server';
import AboutClient from './_components/AboutClient';

interface Props {
  params: { locale: string };
}

export default async function AboutPage({ params }: Props) {
  const t = await getTranslations({ locale: params.locale, namespace: 'pageTitle' });
  const profile = await getProfile();

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 md:px-8 lg:px-12 space-y-8">
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        {t('about')}
      </h1>
      <AboutClient profile={profile} />
    </div>
  );
}
