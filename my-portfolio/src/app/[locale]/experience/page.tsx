'use client';

import { useEffect, useState } from 'react';

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export default function ExperiencePage() {
  const [experience, setExperience] = useState<Experience[]>([]);

  useEffect(() => {
    const fetchExperience = async () => {
      const res = await fetch('/api/experience');
      const data = await res.json();
      setExperience(data);
    };
    fetchExperience();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6">Experience</h1>
      {experience.map((exp, index) => (
        <div key={index} className="mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold">{exp.role}</h2>
          <p className="text-gray-600">{exp.company}</p>
          <p className="italic mb-2">{exp.period}</p>
          <p>{exp.description}</p>
        </div>
      ))}
    </div>
  );
}
