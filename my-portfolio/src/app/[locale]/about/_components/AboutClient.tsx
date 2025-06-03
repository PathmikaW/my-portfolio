'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';

interface Profile {
  name: string;
  title: string;
  summary: string;
  skills: string[];
  languages: { language: string; level: string }[];
}

interface Props {
  profile: Profile;
}

export default function AboutClient({ profile }: Props) {
  const tAbout = useTranslations('about'); // ✅ Safe in client
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Optional loading state if needed
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    );
  }

  return (
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
            {tAbout('skills')}
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
            {tAbout('languages')}
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
  );
}
