import { NextResponse } from 'next/server';

export async function GET() {
  const experience = [
    {
      company: "Omobio (Pvt) Ltd.",
      role: "Senior Software Engineer",
      period: "Jan 2024 - Present",
      description:
        "Leading Agile teams to deliver mobile and web solutions using React Native, React.js, and Next.js. Contributing to AI/ML initiatives.",
    },
    {
      company: "Omobio (Pvt) Ltd.",
      role: "Software Engineer",
      period: "Apr 2022 - Jan 2024",
      description:
        "Delivered end-to-end apps using React Native and React.js. Handled presales, product demos. Awarded Emerging Employee of the Year 2023.",
    },
    {
      company: "Omobio (Pvt) Ltd.",
      role: "Software Engineer (Intern) - Full Stack",
      period: "Oct 2021 - Apr 2022",
      description:
        "Full Stack internship — React, backend, mobile development.",
    },
  ];

  return NextResponse.json(experience);
}
