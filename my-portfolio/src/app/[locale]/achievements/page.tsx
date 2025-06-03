'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface Achievement {
  title: string;
  year: string;
  description: string;
}

export default function AchievementsPage() {
  const t = useTranslations();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await fetch('/api/achievements');
        const data = await res.json();
        setAchievements(data);
      } catch (error) {
        console.error('Error fetching achievements:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6">{t('pageTitle.achievements')}</h1>

      {isLoading ? (
        <p>{t('achievements.loading')}</p>
      ) : achievements.length > 0 ? (
        achievements.map((ach, index) => (
          <div key={index} className="mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold">{ach.title}</h2>
            <p className="italic mb-2">{ach.year}</p>
            <p>{ach.description}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-red-600">{t('achievements.error')}</p>
      )}
    </div>
  );
}
