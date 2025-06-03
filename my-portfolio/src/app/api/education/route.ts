import { NextResponse } from 'next/server';

export async function GET() {
  const education = [
    {
      degree: "B.Sc. in Information Systems",
      institution: "University of Colombo School of Computing",
      period: "2019 - 2022",
      gpa: "3.44 (Second Class Upper)",
    },
    {
      degree: "GCE Advanced Level - Physical Sciences",
      institution: "Taxila Central College, Horana",
      period: "2009 - 2017",
    },
    {
      degree: "G.I.T Examination - Distinction",
      institution: "Department of Examination",
      year: "2016",
    },
    {
      degree: "Diploma in English (Certificate Level) - Distinction",
      institution: "Seagis Campus, Nugegoda",
      year: "2018",
    },
  ];

  return NextResponse.json(education);
}
