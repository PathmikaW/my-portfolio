import { NextResponse } from 'next/server';

export async function GET() {
  const achievements = [
    {
      title: "Emerging Employee of the Year - Omobio",
      year: "2023",
      description:
        "Exceptional job performance and contributions to projects.",
    },
    {
      title: "Director's List Awardee",
      year: "2017/2018",
      description: "Achieved GPA 3.7+ in 1st year.",
    },
  ];

  return NextResponse.json(achievements);
}
