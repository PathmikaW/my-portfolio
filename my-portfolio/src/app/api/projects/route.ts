// src/app/api/projects/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  // Example static projects — you can replace this with DB fetch later
  const projects = [
    {
      id: 1,
      title: 'Portfolio Website',
      description: 'A personal portfolio built with Next.js and Tailwind CSS.',
      url: 'https://your-portfolio.com',
    },
    {
      id: 2,
      title: 'E-commerce Store',
      description: 'An online store using React, Stripe, and Node.js.',
      url: 'https://your-store.com',
    },
    {
      id: 3,
      title: 'Blog Platform',
      description: 'A blog with Markdown support and dynamic routing.',
      url: 'https://your-blog.com',
    },
  ];

  return NextResponse.json(projects);
}
