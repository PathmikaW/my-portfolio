'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

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

interface Props {
  projects: Project[];
  locale: string;
}

export default function ProjectsClient({ projects }: Props) {
  const t = useTranslations('projects');
  const tPageTitle = useTranslations('pageTitle');

  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);

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

  const isLoading = !projects.length;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 md:px-8 lg:px-12 space-y-12">
      <h1 className="text-4xl font-bold tracking-tight mb-8 text-center">
        {tPageTitle('projects')}
      </h1>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      ) : (
        Object.entries(groupedProjects).map(([section, projects]) => (
          <motion.div
            key={section}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold mb-4 border-b border-gray-300 pb-2">
              {section}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-cyan-600 dark:text-cyan-400">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-base text-muted-foreground">
                      <p>{project.description}</p>

                      <div>
                        <strong>{t('techStack')}:</strong>{' '}
                        {project.techStack?.length
                          ? project.techStack.join(', ')
                          : 'N/A'}
                      </div>

                      <div className="flex flex-wrap gap-4 mt-2">
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-600 hover:underline font-medium"
                          >
                            {t('visitProject')}
                          </a>
                        )}

                        <button
                          onClick={() => toggleExpand(project.id)}
                          className="text-cyan-600 hover:underline font-medium focus:outline-none"
                        >
                          {expandedProjectId === project.id
                            ? t('hideDetails')
                            : t('viewMore')}
                        </button>
                      </div>

                      {/* Expanded content */}
                      {expandedProjectId === project.id && (
                        <div className="mt-4 border-t border-gray-200 pt-4 space-y-4">
                          {project.moreDetailsHtml ? (
                            <div
                              className="prose prose-blue max-w-none"
                              dangerouslySetInnerHTML={{
                                __html: project.moreDetailsHtml,
                              }}
                            />
                          ) : (
                            <p className="text-gray-500">
                              {t('noDetails')}
                            </p>
                          )}

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

                          {project.video && (
                            <div className="mt-3">
                              <video controls src={project.video} className="w-full rounded shadow">
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}
