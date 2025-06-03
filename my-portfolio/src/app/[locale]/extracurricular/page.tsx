'use client';

import { useEffect, useState } from 'react';

interface Extracurricular {
  name: string;
  role: string;
}

export default function ExtracurricularPage() {
  const [activities, setActivities] = useState<Extracurricular[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const res = await fetch('/api/extracurricular');
      const data = await res.json();
      setActivities(data);
    };
    fetchActivities();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6">Extracurricular</h1>
      {activities.map((act, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-xl font-semibold">{act.name}</h2>
          <p className="text-gray-600">{act.role}</p>
        </div>
      ))}
    </div>
  );
}
