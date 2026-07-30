'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { ScrollSection, ScrollItem } from '@/components/effects/text-reveal';
import { BentoGrid, BentoGridItem } from '@/components/effects/bento-grid';
import { Code2, Languages as LanguagesIcon } from 'lucide-react';

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
  const tAbout = useTranslations('about');

  return (
    <ScrollSection className="space-y-10">
      <ScrollItem>
        <div className="rounded-xl border border-accent-blue/20 bg-white/90 dark:bg-black/70 backdrop-blur-lg p-6 sm:p-8 shadow-md shadow-accent-blue/5">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">
            {profile.name}
          </h2>
          <p className="mt-1 text-lg text-muted-foreground">{profile.title}</p>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            {profile.summary}
          </p>
        </div>
      </ScrollItem>

      <ScrollItem>
        <p className="font-mono text-xs text-accent-green mb-1">{'// skills'}</p>
        <div className="flex items-center gap-2 mb-4">
          <Code2 className="size-5 text-accent-blue" />
          <h3 className="font-display text-xl font-semibold">{tAbout('skills')}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <Badge key={skill} variant="outline" className="text-sm py-1 px-3">
              {skill}
            </Badge>
          ))}
        </div>
      </ScrollItem>

      <ScrollItem>
        <p className="font-mono text-xs text-accent-green mb-1">{'// languages'}</p>
        <div className="flex items-center gap-2 mb-4">
          <LanguagesIcon className="size-5 text-accent-purple" />
          <h3 className="font-display text-xl font-semibold">{tAbout('languages')}</h3>
        </div>
        <BentoGrid className="sm:grid-cols-2 lg:grid-cols-2">
          {profile.languages.map((lang) => (
            <BentoGridItem key={lang.language}>
              <p className="font-display font-semibold">{lang.language}</p>
              <p className="text-sm text-muted-foreground mt-1">{lang.level}</p>
            </BentoGridItem>
          ))}
        </BentoGrid>
      </ScrollItem>
    </ScrollSection>
  );
}
