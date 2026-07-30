'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ShimmerButton } from '@/components/effects/shimmer-button';
import { CardContainer, CardBody, CardItem } from '@/components/effects/3d-card';
import { BentoGrid, BentoGridItem } from '@/components/effects/bento-grid';
import { ScrollSection, ScrollItem } from '@/components/effects/text-reveal';
import { Badge } from '@/components/ui/badge';
import { IMAGES } from '@/lib/images';
import { personalProjects } from '@/data/projects';
import Link from 'next/link';
import Image from 'next/image';
import { GraduationCap, Briefcase, FolderGit2, Sparkles, ArrowUpRight, Github, ExternalLink } from 'lucide-react';

interface Profile {
  name: string;
  title: string;
  summary: string;
  skills: string[];
}

interface Props {
  profile: Profile;
  locale: string;
}

export default function HomeClient({ profile, locale }: Props) {
  const t = useTranslations('home');
  const [isImageOpen, setIsImageOpen] = useState(false);

  return (
    <div className="px-4 sm:px-6 py-16 sm:py-20 space-y-20">
      {/* Hero */}
      <section className="flex flex-col items-center text-center max-w-4xl mx-auto">
        <CardContainer className="w-full">
          <CardBody className="w-full rounded-2xl bg-white/70 dark:bg-black/50 backdrop-blur-md p-8 sm:p-10 border border-accent-blue/10">
            <CardItem translateZ={10} className="mb-4 flex justify-center">
              <p className="font-mono text-sm text-accent-green">
                <span className="text-muted-foreground">$</span> whoami
                <span className="animate-cursor-blink text-accent-blue">▍</span>
              </p>
            </CardItem>
            <CardItem translateZ={60} className="flex justify-center mb-6">
              <Sheet open={isImageOpen} onOpenChange={setIsImageOpen}>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    aria-label="View profile picture"
                    className="rounded-full ring-4 ring-accent-blue/40 shadow-xl shadow-accent-blue/20 cursor-pointer"
                  >
                    <Image
                      src={IMAGES.profile}
                      alt={`Profile picture of ${profile.name}`}
                      width={150}
                      height={150}
                      className="rounded-full"
                      priority
                    />
                  </button>
                </SheetTrigger>
                <SheetContent side="bottom" className="flex items-center justify-center bg-transparent backdrop-blur-sm">
                  <Image
                    src={IMAGES.profile}
                    alt={`Profile picture of ${profile.name}`}
                    width={400}
                    height={400}
                    className="rounded-full border-8 border-accent-blue/50 shadow-xl"
                  />
                </SheetContent>
              </Sheet>
            </CardItem>

            <CardItem translateZ={40}>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple dark:drop-shadow-[0_0_16px_rgba(0,255,65,0.3)]">
                {t('title')}
              </h1>
            </CardItem>

            <CardItem translateZ={30}>
              <p className="mt-3 text-lg sm:text-xl font-medium text-gray-700 dark:text-gray-300">{profile.title}</p>
            </CardItem>

            <CardItem translateZ={20}>
              <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {profile.summary}
              </p>
            </CardItem>

            <CardItem translateZ={30} className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href={`/${locale}/about`}>
                <ShimmerButton>{t('aboutButton')}</ShimmerButton>
              </Link>
              <Link href={`/${locale}/projects`}>
                <ShimmerButton>{t('projectsButton')}</ShimmerButton>
              </Link>
              <Link href={`/${locale}/contact`}>
                <ShimmerButton variant="outline">{t('contactButton')}</ShimmerButton>
              </Link>
            </CardItem>
          </CardBody>
        </CardContainer>
      </section>

      {/* Quick facts bento grid */}
      <ScrollSection className="max-w-5xl mx-auto">
        <BentoGrid>
          <ScrollItem>
            <BentoGridItem>
              <Briefcase className="size-6 text-accent-blue mb-3" />
              <p className="font-display text-2xl font-bold">~5 Years</p>
              <p className="text-sm text-muted-foreground mt-1">Production engineering experience</p>
            </BentoGridItem>
          </ScrollItem>
          <ScrollItem>
            <BentoGridItem>
              <GraduationCap className="size-6 text-accent-purple mb-3" />
              <p className="font-display text-2xl font-bold">MSc in AI</p>
              <p className="text-sm text-muted-foreground mt-1">University of Moratuwa (Reading)</p>
            </BentoGridItem>
          </ScrollItem>
          <ScrollItem>
            <BentoGridItem>
              <FolderGit2 className="size-6 text-accent-green mb-3" />
              <p className="font-display text-2xl font-bold">25+</p>
              <p className="text-sm text-muted-foreground mt-1">Client &amp; product engagements</p>
            </BentoGridItem>
          </ScrollItem>
          <ScrollItem>
            <BentoGridItem>
              <Sparkles className="size-6 text-accent-blue mb-3" />
              <p className="font-display text-2xl font-bold">2023</p>
              <p className="text-sm text-muted-foreground mt-1">Emerging Employee of the Year</p>
            </BentoGridItem>
          </ScrollItem>
          <ScrollItem className="sm:col-span-2 lg:col-span-4">
            <BentoGridItem colSpan={2} className="sm:col-span-2 lg:col-span-4">
              <p className="font-mono text-xs text-accent-green mb-3">{'// core_stack'}</p>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </BentoGridItem>
          </ScrollItem>
        </BentoGrid>
      </ScrollSection>

      {/* Featured projects teaser */}
      <ScrollSection className="max-w-5xl mx-auto space-y-6">
        <ScrollItem className="flex items-center justify-between">
          <div>
            <p className="font-mono text-xs text-accent-green mb-1">{'// featured_projects'}</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">Featured Projects</h2>
          </div>
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-1 text-sm font-medium text-accent-blue hover:underline"
          >
            View all <ArrowUpRight className="size-4" />
          </Link>
        </ScrollItem>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {personalProjects.slice(0, 3).map((project) => (
            <ScrollItem key={project.id}>
              <div className="group h-full rounded-xl border border-accent-blue/20 bg-white/90 dark:bg-black/70 backdrop-blur-lg p-5 shadow-md shadow-accent-blue/5 transition-all duration-300 hover:shadow-accent-blue/20 hover:-translate-y-1">
                <h3 className="font-display font-semibold text-accent-blue">{project.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{project.description}</p>
                <div className="mt-4 flex gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:underline"
                  >
                    <Github className="size-3.5" /> Code
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:underline"
                    >
                      <ExternalLink className="size-3.5" /> Live
                    </a>
                  )}
                </div>
              </div>
            </ScrollItem>
          ))}
        </div>
      </ScrollSection>
    </div>
  );
}
