'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/common/ThemeToggle';
import LanguageToggle from '@/components/common/LanguageToggle';

export function Header() {
  const locale = useLocale();

  return (
    <header className="sticky top-0 z-50 bg-background border-b flex justify-between items-center py-4 px-6">
      <h1 className="text-lg font-bold">Pathmika</h1>

      <div className="flex items-center gap-4">
        <Link href={`/${locale}/projects`}>
          <Button variant="ghost">Projects</Button>
        </Link>
        <Link href={`/${locale}/contact`}>
          <Button variant="ghost">Contact</Button>
        </Link>

        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}
