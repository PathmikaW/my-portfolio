'use client';

import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { type LinkProps } from 'next/link';

const LanguageToggle = () => {
  const pathname = usePathname();
  const currentLocale = useLocale();
  const otherLocale = currentLocale === 'en' ? 'si' : 'en';
  const newPathname = pathname.replace(`/${currentLocale}`, `/${otherLocale}`);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={{ pathname: newPathname } as LinkProps['href']}>
        <Button
          variant="outline"
          size="sm"
          className="font-medium px-3 py-1.5 border-blue-500 text-blue-400 hover:bg-blue-500/20 transition-all duration-300"
        >
          {otherLocale.toUpperCase()}
        </Button>
      </Link>
    </motion.div>
  );
};

export default LanguageToggle;
