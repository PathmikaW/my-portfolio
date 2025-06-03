'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

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
    <div className="max-w-5xl mx-auto py-12 px-4 md:px-8 lg:px-12 space-y-8">
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        {t('pageTitle.about')}
      </h1>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      ) : profile ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>{profile.name} - {profile.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {profile.summary}
              </p>

              <div>
                <h2 className="text-xl font-semibold mb-2">
                  {t('about.skills')}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">
                  {t('about.languages')}
                </h2>
                <ul className="space-y-1 pl-4 list-disc text-base text-muted-foreground">
                  {profile.languages.map((lang, index) => (
                    <li key={index}>
                      <span className="font-medium">{lang.language}</span> — {lang.level}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <p className="text-center text-red-500 text-lg">
          {t('about.error')}
        </p>
      )}
    </div>
  );
}
