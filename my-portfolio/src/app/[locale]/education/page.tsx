'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface Education {
  degree: string;
  institution: string;
  period?: string;
  gpa?: string;
  year?: string;
}

export default function EducationPage() {
  const t = useTranslations();
  const [education, setEducation] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      const res = await fetch('/api/education');
      const data = await res.json();
      setEducation(data);
      setIsLoading(false);
    };
    fetchEducation();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6">{t('pageTitle.education')}</h1>

      {isLoading ? (
        <p>{t('education.loading')}</p>
      ) : education.length > 0 ? (
        education.map((edu, index) => (
          <div key={index} className="mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold">{edu.degree}</h2>
            <p className="text-gray-600">{edu.institution}</p>
            {edu.period && <p className="italic mb-2">{edu.period}</p>}
            {edu.gpa && <p>GPA: {edu.gpa}</p>}
            {edu.year && <p>Year: {edu.year}</p>}
          </div>
        ))
      ) : (
        <p className="text-center text-red-600">{t('education.error')}</p>
      )}
    </div>
  );
}
