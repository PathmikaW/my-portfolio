import { NextResponse } from 'next/server';

export async function GET() {
  const extracurricular = [
    {
      name: "ACM Student Chapter (UCSC)",
      role: "Active member (Operations & Content teams)",
    },
    {
      name: "UOC LEO Club",
      role: "Volunteer in community projects",
    },
    {
      name: "AIESEC - Teach Lanka 10.0",
      role: "Participant",
    },
    {
      name: "University Elle Team",
      role: "Player, Championship Winner",
    },
    {
      name: "Tennis, Cricket, Chess, Astronomy Club, Science Society",
      role: "Member/Player",
    },
  ];

  return NextResponse.json(extracurricular);
}
