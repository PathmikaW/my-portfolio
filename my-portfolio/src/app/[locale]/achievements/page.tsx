'use client';

import { useEffect, useState } from 'react';

interface Achievement {
  title: string;
  year: string;
  description: string;
}

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      const res = await fetch('/api/achievements');
      const data = await res.json();
      setAchievements(data);
    };
    fetchAchievements();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6">Achievements</h1>
      {achievements.map((ach, index) => (
        <div key={index} className="mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold">{ach.title}</h2>
          <p className="italic mb-2">{ach.year}</p>
          <p>{ach.description}</p>
        </div>
      ))}
    </div>
  );
}
