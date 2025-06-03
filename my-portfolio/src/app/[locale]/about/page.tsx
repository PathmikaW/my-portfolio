'use client';

import { useEffect, useState } from 'react';

interface Profile {
  name: string;
  title: string;
  summary: string;
  skills: string[];
  languages: { language: string; level: string }[];
}

export default function AboutPage() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch('/api/profile');
      const data = await res.json();
      setProfile(data);
    };
    fetchProfile();
  }, []);

  if (!profile) return <p className="text-center">Loading profile...</p>;

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6">About Me</h1>
      <p className="text-xl mb-6">{profile.summary}</p>

      <h2 className="text-2xl font-bold mb-2">Skills</h2>
      <ul className="list-disc pl-5 mb-6">
        {profile.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mb-2">Languages</h2>
      <ul className="list-disc pl-5">
        {profile.languages.map((lang, index) => (
          <li key={index}>
            {lang.language} - {lang.level}
          </li>
        ))}
      </ul>
    </div>
  );
}
