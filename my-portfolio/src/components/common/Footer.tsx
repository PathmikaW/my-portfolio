'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { contactInfo } from '@/data/contact';

export function Footer() {
  const t = useTranslations('footer');

  const links = [
    { href: 'https://github.com/PathmikaW', icon: Github, label: 'GitHub' },
    { href: contactInfo.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { href: `mailto:${contactInfo.email}`, icon: Mail, label: 'Email' },
  ];

  return (
    <motion.footer
      className="relative border-t border-accent-blue/20 bg-white/90 dark:bg-black/80 backdrop-blur-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-blue/60 to-transparent" />
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-5 text-sm text-gray-600 dark:text-gray-300">
        <span>
          © {new Date().getFullYear()} {t('copyright')}
        </span>
        <div className="flex items-center gap-4">
          {links.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-gray-500 hover:text-accent-blue dark:text-gray-400 dark:hover:text-accent-blue transition-colors duration-200"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
}
