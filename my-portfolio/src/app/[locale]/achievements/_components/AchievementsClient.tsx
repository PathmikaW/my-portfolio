'use client';

import { ScrollSection, ScrollItem } from '@/components/effects/text-reveal';
import { Timeline, TimelineItem } from '@/components/effects/timeline';

interface Achievement {
  title: string;
  year: string;
  description: string;
}

interface Props {
  achievements: Achievement[];
  locale: string;
}

export default function AchievementsClient({ achievements }: Props) {
  return (
    <ScrollSection>
      <Timeline>
        {achievements.map((ach, index) => (
          <ScrollItem key={index}>
            <TimelineItem>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-semibold text-accent-green">{ach.title}</h3>
                <span className="text-xs font-medium text-muted-foreground italic">{ach.year}</span>
              </div>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">{ach.description}</p>
            </TimelineItem>
          </ScrollItem>
        ))}
      </Timeline>
    </ScrollSection>
  );
}
