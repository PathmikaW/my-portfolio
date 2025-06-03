'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

interface Education {
  degree: string;
  institution: string;
  period?: string;
  gpa?: string;
  year?: string;
}

interface Props {
  education: Education[];
  locale: string;
}

export default function EducationClient({ education }: Props) {
  const t = useTranslations('education');
  const tPageTitle = useTranslations('pageTitle');

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const isLoading = !education.length;

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 md:px-8 lg:px-12 space-y-8">
      <h1 className="text-4xl font-bold tracking-tight mb-6">
        {tPageTitle('education')}
      </h1>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      ) : education.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {education.map((edu, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-cyan-600 dark:text-cyan-400">
                    {edu.degree}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-base text-muted-foreground">
                  <p className="text-gray-600">{edu.institution}</p>
                  {edu.period && <p className="italic">{edu.period}</p>}
                  {edu.gpa && <p>GPA: {edu.gpa}</p>}
                  {edu.year && <p>Year: {edu.year}</p>}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-red-500 text-lg">
          {t('error')}
        </p>
      )}
    </div>
  );
}
