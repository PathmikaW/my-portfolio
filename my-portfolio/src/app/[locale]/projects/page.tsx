'use client';

import React, { useEffect, useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  url: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen flex flex-col max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">My Projects</h1>

      {loading ? (
        <p className="text-center">Loading projects...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-gray-300 rounded p-6 hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
              <p className="mb-4 text-gray-600">{project.description}</p>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Visit Project →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
