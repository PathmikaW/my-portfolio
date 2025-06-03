'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface Extracurricular {
  name: string;
  role: string;
}

export default function ExtracurricularPage() {
  const t = useTranslations();
  const [activities, setActivities] = useState<Extracurricular[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      const res = await fetch('/api/extracurricular');
      const data = await res.json();
      setActivities(data);
      setIsLoading(false);
    };
    fetchActivities();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6">{t('pageTitle.extracurricular')}</h1>

      {isLoading ? (
        <p>{t('extracurricular.loading')}</p>
      ) : (
        activities.map((act, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-xl font-semibold">{act.name}</h2>
            <p className="text-gray-600">{act.role}</p>
          </div>
        ))
      )}
    </div>
  );
}
