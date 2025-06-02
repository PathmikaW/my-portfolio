'use client';

import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 py-16 text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed">{t('subtitle')}</p>
        </div>
      </main>
    </div>
  );
}
