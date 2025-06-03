'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export default function ExperiencePage() {
  const t = useTranslations();
  const [experience, setExperience] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      const res = await fetch('/api/experience');
      const data = await res.json();
      setExperience(data);
      setIsLoading(false);
    };
    fetchExperience();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6">{t('pageTitle.experience')}</h1>

      {isLoading ? (
        <p>{t('experience.loading')}</p>
      ) : (
        experience.map((exp, index) => (
          <div key={index} className="mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold">{exp.role}</h2>
            <p className="text-gray-600">{exp.company}</p>
            <p className="italic mb-2">{exp.period}</p>
            <p>{exp.description}</p>
          </div>
        ))
      )}
    </div>
  );
}
