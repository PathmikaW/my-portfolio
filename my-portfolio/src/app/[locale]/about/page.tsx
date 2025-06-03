'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface Profile {
  name: string;
  title: string;
  summary: string;
  skills: string[];
  languages: { language: string; level: string }[];
}

export default function AboutPage() {
  const t = useTranslations();
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

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6">{t('pageTitle.about')}</h1>

      {isLoading ? (
        <p>{t('about.loading')}</p>
      ) : profile ? (
        <>
          <p className="text-xl mb-6">{profile.summary}</p>

          <h2 className="text-2xl font-bold mb-2">{t('about.skills')}</h2>
          <ul className="list-disc pl-5 mb-6">
            {profile.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold mb-2">{t('about.languages')}</h2>
          <ul className="list-disc pl-5">
            {profile.languages.map((lang, index) => (
              <li key={index}>
                {lang.language} - {lang.level}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-center text-red-600">{t('about.error')}</p>
      )}
    </div>
  );
}
