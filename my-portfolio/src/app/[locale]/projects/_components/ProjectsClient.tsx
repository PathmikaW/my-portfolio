'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CardContainer, CardBody, CardItem } from '@/components/effects/3d-card';
import { ScrollSection, ScrollItem } from '@/components/effects/text-reveal';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronDown, Info } from 'lucide-react';
import type { PersonalProject, IndustryProject } from '@/data/projects';

interface Props {
  personalProjects: PersonalProject[];
  industryProjects: IndustryProject[];
  locale: string;
}

const CATEGORY_ORDER = ['Mobile', 'Web', 'Data Platforms & AI/ML', 'Automation', 'Pre-Sales & Architecture'];

export default function ProjectsClient({ personalProjects, industryProjects }: Props) {
  const t = useTranslations('projects');
  const tPageTitle = useTranslations('pageTitle');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: industryProjects.filter((p) => p.category === category),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 md:px-8 lg:px-12 space-y-10">
      <h1 className="font-display text-4xl font-bold tracking-tight text-center text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">
        {tPageTitle('projects')}
      </h1>

      <Tabs defaultValue="personal" className="items-center">
        <TabsList>
          <TabsTrigger value="personal">{t('personalProjectsTab')}</TabsTrigger>
          <TabsTrigger value="industry">{t('industryExperienceTab')}</TabsTrigger>
        </TabsList>

        {/* Personal Projects */}
        <TabsContent value="personal" className="w-full">
          <ScrollSection className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {personalProjects.map((project) => (
              <ScrollItem key={project.id}>
                <CardContainer>
                  <CardBody className="w-full">
                    <div className="h-full rounded-xl border border-accent-blue/30 bg-white/90 dark:bg-black/70 backdrop-blur-lg p-6 shadow-lg shadow-accent-blue/10">
                      <CardItem translateZ={30}>
                        <h2 className="font-display text-xl font-semibold text-accent-blue">
                          {project.title}
                        </h2>
                      </CardItem>
                      <CardItem translateZ={20} className="mt-3 text-sm text-muted-foreground">
                        {project.description}
                      </CardItem>
                      <CardItem translateZ={15} className="mt-4 flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <Badge key={tech} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </CardItem>
                      <CardItem translateZ={25} className="mt-5 flex flex-wrap gap-4">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-accent-blue hover:underline font-medium text-sm"
                        >
                          <Github className="size-4" />
                          {t('viewOnGithub')}
                        </a>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-accent-blue hover:underline font-medium text-sm"
                          >
                            <ExternalLink className="size-4" />
                            {t('liveDemo')}
                          </a>
                        )}
                      </CardItem>
                    </div>
                  </CardBody>
                </CardContainer>
              </ScrollItem>
            ))}
          </ScrollSection>
        </TabsContent>

        {/* Industry Experience */}
        <TabsContent value="industry" className="w-full">
          <div className="mt-6 space-y-10">
            {grouped.map(({ category, items }) => (
              <ScrollSection key={category} className="space-y-4">
                <ScrollItem>
                  <p className="font-mono text-xs text-accent-green mb-1">
                    {`// ${category.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`}
                  </p>
                  <h2 className="font-display text-2xl font-bold border-b border-accent-blue/20 pb-2">{category}</h2>
                </ScrollItem>
                <div className="space-y-4">
                  {items.map((project) => {
                    const isExpanded = expandedId === project.id;
                    return (
                      <ScrollItem key={project.id}>
                        <div className="rounded-xl border border-accent-blue/20 bg-white/90 dark:bg-black/70 backdrop-blur-lg p-5 shadow-md shadow-accent-blue/5">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <h3 className="font-display text-lg font-semibold text-accent-blue">
                                {project.name}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">{project.context}</p>
                            </div>
                            {project.link && (
                              <a
                                href={project.link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-accent-blue hover:underline font-medium text-sm shrink-0"
                              >
                                <ExternalLink className="size-4" />
                                {project.link.label}
                              </a>
                            )}
                          </div>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                              <Badge key={tech} variant="outline">
                                {tech}
                              </Badge>
                            ))}
                          </div>

                          {project.scopeNote && (
                            <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground italic">
                              <Info className="size-3.5 shrink-0 mt-0.5" />
                              <span>{project.scopeNote}</span>
                            </div>
                          )}

                          <button
                            onClick={() => setExpandedId(isExpanded ? null : project.id)}
                            className="mt-4 inline-flex items-center gap-1.5 text-accent-blue hover:underline font-medium text-sm"
                          >
                            {isExpanded ? t('hideHighlights') : t('viewHighlights')}
                            <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                              <ChevronDown className="size-4" />
                            </motion.span>
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-3 space-y-2 overflow-hidden list-disc pl-5 text-sm text-muted-foreground"
                              >
                                {project.highlights.map((highlight, i) => (
                                  <li key={i}>{highlight}</li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      </ScrollItem>
                    );
                  })}
                </div>
              </ScrollSection>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
