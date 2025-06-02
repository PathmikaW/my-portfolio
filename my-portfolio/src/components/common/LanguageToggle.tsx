'use client';

import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const LanguageToggle = () => {
  const pathname = usePathname();
  const currentLocale = useLocale();
  const otherLocale = currentLocale === 'en' ? 'si' : 'en';

  const newPathname = pathname.replace(`/${currentLocale}`, `/${otherLocale}`);

  return (
    <Link href={{ pathname: newPathname }}>
      <Button variant="secondary" size="sm" className="font-medium px-3 py-1.5">
        {otherLocale.toUpperCase()}
      </Button>
    </Link>
  );
};

export default LanguageToggle;
