'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <motion.footer
      className="flex items-center justify-center p-4 sm:p-6 border-t border-blue-500/20 bg-gray-900/80 backdrop-blur-md text-sm text-gray-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      © {new Date().getFullYear()} {t('copyright')}
    </motion.footer>
  );
}
