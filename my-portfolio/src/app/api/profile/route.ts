import { NextResponse } from 'next/server';

export async function GET() {
  const profile = {
    name: "Pathmika Weerarathna",
    title: "Senior Software Engineer",
    summary:
  "Senior Software Engineer with 3.5+ years of experience in mobile and web development specializing in React Native, Next.js, and AI/ML solutions. Skilled in Agile leadership, frontend architecture, and building seamless cross-platform experiences. Second Class Upper graduate in Information Systems from the University of Colombo. Known for adaptability, creativity, and a passion for innovation.",
    skills: [
      "React Native",
      "React.js",
      "TypeScript",
      "Next.js",
      "Flutter",
      "Python",
      "PHP",
      "Linux",
      "Git",
      "Docker",
      "Web",
      "Android",
      "iOS",
      "HMS",
    ],
    languages: [
      { language: "English", level: "Professional" },
      { language: "Sinhala", level: "Native" },
    ],
  };

  return NextResponse.json(profile);
}
