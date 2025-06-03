'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import ThemeToggle from '@/components/common/ThemeToggle';
import LanguageToggle from '@/components/common/LanguageToggle';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { type LinkProps } from 'next/link';

export function Header() {
  const locale = useLocale();
  const t = useTranslations('nav');
  const [isOpen, setIsOpen] = useState(false);

  const navItems: { href: LinkProps['href']; label: string }[] = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/experience`, label: t('experience') },
    { href: `/${locale}/education`, label: t('education') },
    { href: `/${locale}/projects`, label: t('projects') },
    { href: `/${locale}/achievements`, label: t('achievements') },
    { href: `/${locale}/extracurricular`, label: t('extracurricular') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const sidebarVariants = {
    hidden: { x: '-100%' },
    visible: { x: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  return (
    <motion.header
      className="sticky top-0 z-50 bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-cyan-400/20 dark:border-cyan-400/20 flex justify-between items-center py-4 px-4 sm:px-6"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <Link href={`/${locale}`}>
        <motion.h1
          variants={itemVariants}
          className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500"
        >
          Pathmika
        </motion.h1>
      </Link>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Desktop Navigation */}
        <div className="hidden sm:block">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-wrap gap-2 sm:gap-3">
              {navItems.map((item) => (
                <NavigationMenuItem key={String(item.href)}>
                  <NavigationMenuLink asChild>
                    <motion.div variants={itemVariants}>
                      <Link href={item.href}>
                        <Button
                          variant="ghost"
                          className="text-gray-800 hover:text-black hover:bg-cyan-200/30 dark:text-gray-200 dark:hover:text-white dark:hover:bg-cyan-500/30 transition-all duration-300 text-sm sm:text-base"
                        >
                          {item.label}
                        </Button>
                      </Link>
                    </motion.div>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="sm:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-800 hover:text-black dark:text-gray-200 dark:hover:text-white">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              title={t('menuTitle')}
              description={t('menuDescription')}
              className="w-64 bg-gray-100 dark:bg-gray-900 border-r border-cyan-400/20 p-4"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={sidebarVariants}
                className="flex flex-col gap-4"
              >
                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500">
                  Pathmika
                </h2>
                {navItems.map((item) => (
                  <motion.div key={String(item.href)} variants={itemVariants}>
                    <Link href={item.href} onClick={() => setIsOpen(false)}>
                      <Button
                        variant="ghost"
                        className="w-full text-left text-gray-800 hover:text-black hover:bg-cyan-200/30 dark:text-gray-200 dark:hover:text-white dark:hover:bg-cyan-500/30 transition-all duration-300"
                      >
                        {item.label}
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>

        <motion.div variants={itemVariants}>
          <LanguageToggle />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ThemeToggle />
        </motion.div>
      </div>
    </motion.header>
  );
}
