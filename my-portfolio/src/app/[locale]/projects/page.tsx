'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface Project {
  id: number;
  section: string;
  title: string;
  description: string;
  techStack?: string[];
  url?: string;
  images?: string[];
  video?: string;
  moreDetailsHtml?: string;
}

export default function ProjectsPage() {
  const t = useTranslations();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);

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

  // Group projects by section
  const groupedProjects = projects.reduce(
    (acc, project) => {
      if (!acc[project.section]) {
        acc[project.section] = [];
      }
      acc[project.section].push(project);
      return acc;
    },
    {} as Record<string, Project[]>
  );

  const toggleExpand = (projectId: number) => {
    setExpandedProjectId((prevId) => (prevId === projectId ? null : projectId));
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">{t('pageTitle.projects')}</h1>

      {loading ? (
        <p className="text-center">{t('projects.loading')}</p>
      ) : (
        Object.entries(groupedProjects).map(([section, projects]) => (
          <div key={section} className="mb-12">
            <h2 className="text-3xl font-bold mb-6 border-b border-gray-300 pb-2">{section}</h2>

            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="border border-gray-300 rounded p-6 hover:shadow-lg transition"
                >
                  <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                  <p className="mb-3 text-gray-600">{project.description}</p>
                  <div className="mb-3">
                    <strong>{t('projects.techStack')}:</strong>{' '}
                    {project.techStack?.length ? project.techStack.join(', ') : 'N/A'}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-4 mt-4">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium"
                      >
                        {t('projects.visitProject')}
                      </a>
                    )}

                    <button
                      onClick={() => toggleExpand(project.id)}
                      className="text-blue-600 hover:underline font-medium focus:outline-none"
                    >
                      {expandedProjectId === project.id
                        ? t('projects.hideDetails')
                        : t('projects.viewMore')}
                    </button>
                  </div>

                  {/* Expanded content */}
                  {expandedProjectId === project.id && (
                    <div className="mt-4 border-t border-gray-200 pt-4 space-y-4">
                      {/* More details HTML */}
                      {project.moreDetailsHtml ? (
                        <div
                          className="prose prose-blue max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: project.moreDetailsHtml,
                          }}
                        />
                      ) : (
                        <p className="text-gray-500">{t('projects.noDetails')}</p>
                      )}

                      {/* Safe image rendering */}
                      {project.images && project.images.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          {project.images.map((imgUrl, index) => (
                            <img
                              key={index}
                              src={imgUrl}
                              alt={`Project ${project.id} image ${index + 1}`}
                              className="rounded shadow w-full object-cover"
                            />
                          ))}
                        </div>
                      )}

                      {/* Video rendering */}
                      {project.video && (
                        <div className="mt-3">
                          <video controls src={project.video} className="w-full rounded shadow">
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
