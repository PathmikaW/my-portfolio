export interface Education {
  degree: string;
  institution: string;
  period?: string;
  gpa?: string;
  year?: string;
}

export const education: Education[] = [
  {
    degree: 'MSc in Artificial Intelligence (Reading)',
    institution: 'University of Moratuwa',
    period: 'Jul 2025 – Present (Expected 2027)',
  },
  {
    degree: 'B.Sc. in Information Systems',
    institution: 'University of Colombo School of Computing',
    period: '2019 – 2022',
    gpa: '3.44 (Second Class Upper)',
  },
  {
    degree: 'GCE Advanced Level - Physical Sciences',
    institution: 'Taxila Central College, Horana',
    period: '2009 – 2017',
  },
  {
    degree: 'G.I.T Examination - Distinction',
    institution: 'Department of Examination',
    year: '2016',
  },
  {
    degree: 'Diploma in English (Certificate Level) - Distinction',
    institution: 'Seagis Campus, Nugegoda',
    year: '2018',
  },
];
