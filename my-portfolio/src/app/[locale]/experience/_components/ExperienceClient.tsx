'use client';

import { ScrollSection, ScrollItem } from '@/components/effects/text-reveal';
import { Timeline, TimelineItem } from '@/components/effects/timeline';

interface Experience {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

interface Props {
  experience: Experience[];
  locale: string;
}

export default function ExperienceClient({ experience }: Props) {
  return (
    <ScrollSection>
      <Timeline>
        {experience.map((exp, index) => (
          <ScrollItem key={index}>
            <TimelineItem>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-semibold text-accent-blue">{exp.role}</h3>
                <span className="text-xs font-medium text-muted-foreground italic">{exp.period}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{exp.company}</p>
              <ul className="mt-3 space-y-2 list-disc pl-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {exp.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>
            </TimelineItem>
          </ScrollItem>
        ))}
      </Timeline>
    </ScrollSection>
  );
}
