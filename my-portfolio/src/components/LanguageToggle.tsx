'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';

const LanguageToggle = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const otherLocale = currentLocale === 'en' ? 'si' : 'en';

  const switchLanguage = () => {
    const segments = pathname.split('/');
    segments[1] = otherLocale; // Replace locale
    router.replace(segments.join('/'));
  };

  return (
    <Button variant="outline" size="sm" onClick={switchLanguage}>
      {otherLocale.toUpperCase()}
    </Button>
  );
};

export default LanguageToggle;
