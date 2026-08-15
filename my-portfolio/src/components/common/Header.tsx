'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import ThemeToggle from '@/components/common/ThemeToggle';
import LanguageToggle from '@/components/common/LanguageToggle';
import { motion, type Variants } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { type LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Header() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('nav');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navItems: { href: LinkProps['href']; label: string }[] = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/experience`, label: t('experience') },
    { href: `/${locale}/education`, label: t('education') },
    { href: `/${locale}/certifications`, label: t('certifications') },
    { href: `/${locale}/projects`, label: t('projects') },
    { href: `/${locale}/achievements`, label: t('achievements') },
    { href: `/${locale}/extracurricular`, label: t('extracurricular') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  const prefetchAll = useCallback(() => {
    navItems.forEach((item) => router.prefetch(item.href as string));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale, router]);

  useEffect(() => {
    prefetchAll();
  }, [prefetchAll]);

  const navVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const sidebarVariants: Variants = {
    hidden: { x: '-100%' },
    visible: { x: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  const isActive = (href: string) => pathname === href;

  return (
    <motion.header
      className="sticky top-0 z-50 bg-white/90 dark:bg-black/80 backdrop-blur-xl border-b border-accent-blue/20 flex justify-between items-center py-3.5 px-4 sm:px-6"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <Link href={`/${locale}`}>
        <motion.h1
          variants={itemVariants}
          className="font-display text-xl sm:text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple dark:drop-shadow-[0_0_10px_rgba(0,255,65,0.25)]"
        >
          Pathmika
        </motion.h1>
      </Link>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-wrap gap-1">
              {navItems.map((item) => (
                <NavigationMenuItem key={String(item.href)}>
                  <NavigationMenuLink asChild>
                    <motion.div variants={itemVariants}>
                      <Link href={item.href}>
                        <Button
                          variant="ghost"
                          className={cn(
                            'relative text-gray-800 hover:text-black hover:bg-accent-blue/10 dark:text-gray-200 dark:hover:text-white transition-all duration-300 text-sm',
                            isActive(String(item.href)) && 'text-accent-blue font-semibold'
                          )}
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

        {/* Mobile / Tablet Hamburger Menu */}
        <div className="lg:hidden">
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
              className="w-64 bg-gray-100 dark:bg-gray-900 border-r border-accent-blue/20 p-4"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={sidebarVariants}
                className="flex flex-col gap-4"
              >
                <h2 className="font-display text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">
                  Pathmika
                </h2>
                {navItems.map((item) => (
                  <motion.div key={String(item.href)} variants={itemVariants}>
                    <Link href={item.href} onClick={() => setIsOpen(false)}>
                      <Button
                        variant="ghost"
                        className={cn(
                          'w-full text-left text-gray-800 hover:text-black hover:bg-accent-blue/10 dark:text-gray-200 dark:hover:text-white transition-all duration-300',
                          isActive(String(item.href)) && 'text-accent-blue font-semibold'
                        )}
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
