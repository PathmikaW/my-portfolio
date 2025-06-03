'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
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
  const [isImageOpen, setIsImageOpen] = useState(false);

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

  const pulseVariants = {
    pulse: {
      boxShadow: ['0 0 0px rgba(34, 211, 238, 0)', '0 0 20px rgba(34, 211, 238, 0.5)', '0 0 0px rgba(34, 211, 238, 0)'],
      scale: [1, 1.02, 1],
    },
  };

  const cardVariants = {
    hover: {
      boxShadow: '0 0 30px rgba(34, 211, 238, 0.3)',
      transition: { duration: 0.3 },
    },
  };

  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: `${(i % 5) * 25 + 10}%`,
    top: `${Math.floor(i / 5) * 25 + 10}%`,
  }));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center relative overflow-hidden">
      <motion.div
        className="max-w-3xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable={true} glareMaxOpacity={0.3} glareColor="#ffffff">
          <motion.div
            variants={cardVariants}
            whileHover="hover"
          >
            <Card className="bg-gray-200/70 dark:bg-gray-800/70 backdrop-blur-lg border border-cyan-400/30 dark:border-cyan-400/30 shadow-2xl shadow-cyan-500/30 dark:shadow-cyan-500/30">
              <CardHeader>
                <Sheet open={isImageOpen} onOpenChange={setIsImageOpen}>
                  <SheetTrigger asChild>
                    <motion.div
                      variants={itemVariants}
                      className="flex justify-center mb-6 cursor-pointer"
                      animate={{
                        ...pulseVariants.pulse,
                        transition: {
                          duration: 2,
                          repeat: Infinity,
                          repeatType: 'loop',
                          ease: 'easeInOut',
                        },
                      }}
                    >
                      <Image
                        src={IMAGES.profile}
                        alt="Profile picture of Pathmika Weerarathna"
                        width={150}
                        height={150}
                        className="rounded-full border-4 border-cyan-400/50 dark:border-cyan-400/50 shadow-lg"
                        priority
                      />
                    </motion.div>
                  </SheetTrigger>
                  <SheetContent
                    side="bottom"
                    className="flex items-center justify-center bg-transparent backdrop-blur-sm"
                  >
                    <Image
                      src={IMAGES.profile}
                      alt="Profile picture of Pathmika Weerarathna"
                      width={400}
                      height={400}
                      className="rounded-full border-8 border-cyan-400/50 dark:border-cyan-400/50 shadow-xl"
                    />
                  </SheetContent>
                </Sheet>
                <motion.div variants={itemVariants}>
                  <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500">
                    {isLoading ? t('loading') : profile ? `Hi, I'm ${profile.name}` : t('title')}
                  </CardTitle>
                </motion.div>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.p
                  variants={itemVariants}
                  className="text-base sm:text-lg md:text-xl text-gray-800 dark:text-gray-200 leading-relaxed"
                >
                  {isLoading ? '' : profile ? profile.summary : t('subtitle')}
                </motion.p>
                <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
                  <Link href={`/${locale}/about` as LinkProps['href']}>
                    <motion.div
                      whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(34, 211, 238, 0.5)' }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white dark:text-white transition-all duration-300 text-sm sm:text-base">
                        {t('aboutButton')}
                      </Button>
                    </motion.div>
                  </Link>
                  <Link href={`/${locale}/projects` as LinkProps['href']}>
                    <motion.div
                      whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(34, 211, 238, 0.5)' }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white dark:text-white transition-all duration-300 text-sm sm:text-base">
                        {t('projectsButton')}
                      </Button>
                    </motion.div>
                  </Link>
                  <Link href={`/${locale}/contact` as LinkProps['href']}>
                    <motion.div
                      whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(34, 211, 238, 0.5)' }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button
                        variant="outline"
                        className="border-cyan-500 text-cyan-600 hover:bg-cyan-500/20 dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-500/20 transition-all duration-300 text-sm sm:text-base"
                      >
                        {t('contactButton')}
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </Tilt>
      </motion.div>

      {/* Animated Background Particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-magenta-500 rounded-full"
              style={{
                left: particle.left,
                top: particle.top,
              }}
              initial="hidden"
              animate="float"
              variants={{
                float: {
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                  transition: {
                    duration: 2 + (particle.id % 3),
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                  },
                },
              }}
            />
          ))}
        </AnimatePresence>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-300/10 to-magenta-300/10 dark:from-cyan-500/10 dark:to-magenta-500/10"
          animate={{ x: [0, 50, 0], transition: { duration: 30, repeat: Infinity } }}
        />
      </div>
    </div>
  );
}
