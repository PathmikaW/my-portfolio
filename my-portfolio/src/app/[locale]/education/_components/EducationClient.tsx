'use client';

import { ScrollSection, ScrollItem } from '@/components/effects/text-reveal';
import { Timeline, TimelineItem } from '@/components/effects/timeline';

interface Education {
  degree: string;
  institution: string;
  period?: string;
  gpa?: string;
  year?: string;
}

interface Props {
  education: Education[];
  locale: string;
}

export default function EducationClient({ education }: Props) {
  return (
    <ScrollSection>
      <Timeline>
        {education.map((edu, index) => (
          <ScrollItem key={index}>
            <TimelineItem>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-semibold text-accent-purple">{edu.degree}</h3>
                {(edu.period || edu.year) && (
                  <span className="text-xs font-medium text-muted-foreground italic">{edu.period ?? edu.year}</span>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{edu.institution}</p>
              {edu.gpa && <p className="mt-2 text-sm text-muted-foreground">GPA: {edu.gpa}</p>}
            </TimelineItem>
          </ScrollItem>
        ))}
      </Timeline>
    </ScrollSection>
  );
}
