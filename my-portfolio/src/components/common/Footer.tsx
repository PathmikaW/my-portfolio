'use client';

import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="flex items-center justify-center p-6 border-t text-sm">
      &copy; {new Date().getFullYear()} {t('copyright')}
    </footer>
  );
}
