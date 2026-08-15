'use client';

import Image from 'next/image';
import { ScrollSection, ScrollItem } from '@/components/effects/text-reveal';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import type { Certification } from '@/data/certifications';

interface Props {
  certifications: Certification[];
  locale: string;
}

export default function CertificationsClient({ certifications }: Props) {
  return (
    <ScrollSection>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {certifications.map((cert) => (
          <ScrollItem key={cert.credentialId}>
            <div className="h-full rounded-xl border border-accent-blue/20 bg-white/90 dark:bg-black/70 backdrop-blur-lg p-5 shadow-md shadow-accent-blue/5">
              <div className="overflow-hidden rounded-lg border border-accent-blue/10">
                <Image
                  src={cert.image}
                  alt={`${cert.name} certificate`}
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                />
              </div>
              <h3 className="font-display text-lg font-semibold text-accent-blue mt-4">{cert.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {cert.issuer} · Issued {cert.issuedDate}
              </p>
              <div className="mt-3">
                <Badge variant="outline">ID: {cert.credentialId}</Badge>
              </div>
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-accent-blue hover:underline font-medium text-sm"
              >
                <ExternalLink className="size-4" />
                Verify Credential
              </a>
            </div>
          </ScrollItem>
        ))}
      </div>
    </ScrollSection>
  );
}
