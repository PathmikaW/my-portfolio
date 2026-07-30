'use client';

import { ScrollSection, ScrollItem } from '@/components/effects/text-reveal';
import { BentoGrid, BentoGridItem } from '@/components/effects/bento-grid';

interface Extracurricular {
  name: string;
  role: string;
}

interface Props {
  activities: Extracurricular[];
  locale: string;
}

export default function ExtracurricularClient({ activities }: Props) {
  return (
    <ScrollSection>
      <BentoGrid className="sm:grid-cols-2 lg:grid-cols-3">
        {activities.map((act, index) => (
          <ScrollItem key={index}>
            <BentoGridItem>
              <h3 className="font-display font-semibold text-accent-blue">{act.name}</h3>
              <p className="text-sm text-muted-foreground mt-2">{act.role}</p>
            </BentoGridItem>
          </ScrollItem>
        ))}
      </BentoGrid>
    </ScrollSection>
  );
}
