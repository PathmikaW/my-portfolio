'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface Profile {
  name: string;
  title: string;
  summary: string;
}

export default function HomePage() {
  const t = useTranslations('home');
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch('/api/profile');
      const data = await res.json();
      setProfile(data);
    };
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 py-16 text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {profile ? `Hi, I'm ${profile.name}` : t('title')}
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-4">
            {profile ? profile.summary : t('subtitle')}
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Link href="/about" passHref>
              <span className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
                About Me
              </span>
            </Link>
            <Link href="/projects" passHref>
              <span className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
                View Projects
              </span>
            </Link>
            <Link href="/contact" passHref>
              <span className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
                Contact
              </span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
