'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IMAGES } from '@/lib/images';
import { type LinkProps } from 'next/link';

interface Profile {
  name: string;
  title: string;
  summary: string;
}

export default function HomePage() {
  const t = useTranslations('home');
  const locale = useLocale();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch('/api/profile');
      const data = await res.json();
      setProfile(data);
      setIsLoading(false);
    };
    fetchProfile();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center relative overflow-hidden">
      <motion.div
        className="max-w-3xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-md border-none shadow-xl shadow-blue-500/20 dark:shadow-blue-500/20">
          <CardHeader>
            <motion.div
              variants={itemVariants}
              className="flex justify-center mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={IMAGES.profile}
                alt="Profile picture of Pathmika Weerarathna"
                width={150}
                height={150}
                className="rounded-full border-4 border-blue-500/50 shadow-lg"
                priority
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500">
                {isLoading ? t('loading') : profile ? `Hi, I'm ${profile.name}` : t('title')}
              </CardTitle>
            </motion.div>
          </CardHeader>
          <CardContent className="space-y-6">
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
            >
              {isLoading ? '' : profile ? profile.summary : t('subtitle')}
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
              <Link href={`/${locale}/about` as LinkProps['href']}>
                <motion.div whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }} transition={{ duration: 0.3 }}>
                  <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 text-sm sm:text-base">
                    {t('aboutButton')}
                  </Button>
                </motion.div>
              </Link>
              <Link href={`/${locale}/projects` as LinkProps['href']}>
                <motion.div whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }} transition={{ duration: 0.3 }}>
                  <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 text-sm sm:text-base">
                    {t('projectsButton')}
                  </Button>
                </motion.div>
              </Link>
              <Link href={`/${locale}/contact` as LinkProps['href']}>
                <motion.div whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }} transition={{ duration: 0.3 }}>
                  <Button
                    variant="outline"
                    className="border-blue-500 text-blue-600 hover:bg-blue-200/20 dark:text-blue-400 dark:hover:bg-blue-500/20 transition-all duration-300 text-sm sm:text-base"
                  >
                    {t('contactButton')}
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-purple-300/10 dark:from-blue-500/10 dark:to-purple-500/10"
          animate={{ x: [0, 100, 0], transition: { duration: 20, repeat: Infinity } }}
        />
      </div>
    </div>
  );
}
