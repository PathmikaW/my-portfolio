'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ScrollSection, ScrollItem } from '@/components/effects/text-reveal';
import { ArrowUpRight, BookOpen, CalendarDays, Code2, GraduationCap, Hourglass, PenLine, Sprout } from 'lucide-react';
import { MEDIUM_PROFILE_URL, type BlogPost, type BlogSeries, type BlogSeriesGoal } from '@/data/blog';

interface Props {
  series: BlogSeries[];
  locale: string;
}

interface Entry {
  number: number;
  posts: BlogPost[];
}

// Newest first: higher entry, then higher part
const byNewest = (a: BlogPost, b: BlogPost) => b.entry - a.entry || (b.part ?? 0) - (a.part ?? 0);

function groupByEntry(posts: BlogPost[]): Entry[] {
  const map = new Map<number, BlogPost[]>();
  [...posts].sort(byNewest).forEach((post) => {
    map.set(post.entry, [...(map.get(post.entry) ?? []), post]);
  });
  // Parts read best in order within an entry
  return [...map.entries()].map(([number, items]) => ({ number, posts: items.reverse() }));
}

function formatDate(date: string, locale: string) {
  // Parse as UTC so server and client render the same day
  return new Date(`${date}T00:00:00Z`).toLocaleDateString(locale === 'si' ? 'si-LK' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

const GOAL_ICONS: Record<BlogSeriesGoal['icon'], typeof Code2> = {
  code: Code2,
  study: GraduationCap,
  farm: Sprout,
};

function Highlights({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn('space-y-1.5 text-sm text-muted-foreground', className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent-blue/60" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const linkClass = 'inline-flex items-center gap-1.5 text-accent-blue hover:underline font-medium text-sm';

export default function BlogClient({ series, locale }: Props) {
  const t = useTranslations('blog');
  const tPageTitle = useTranslations('pageTitle');

  const ongoing = series.filter((s) => s.status === 'ongoing' && s.posts.length > 0);
  const comingSoon = series.filter((s) => s.status === 'coming-soon');

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 md:px-8 lg:px-12 space-y-14">
      <header className="text-center space-y-3">
        <h1 className="font-display text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">
          {tPageTitle('blog')}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">{t('subtitle')}</p>
        <a href={MEDIUM_PROFILE_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <BookOpen className="size-4" />
          {t('followOnMedium')}
        </a>
      </header>

      {ongoing.map((s) => {
        const sorted = [...s.posts].sort(byNewest);
        const latest = sorted[0];
        const entries = groupByEntry(s.posts);
        const dated = sorted.filter((p) => p.date).map((p) => p.date!);

        return (
          <section key={s.id} className="space-y-8">
            {/* Series intro */}
            <ScrollSection>
              <ScrollItem>
                <div className="rounded-xl border border-accent-blue/30 bg-white/90 dark:bg-black/70 backdrop-blur-lg p-6 shadow-lg shadow-accent-blue/10">
                  <p className="font-mono text-xs text-accent-green mb-2">{`// series: ${s.id}`}</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-display text-2xl font-bold">
                      <span aria-hidden className="mr-2">
                        {s.emoji}
                      </span>
                      {s.name}
                    </h2>
                    <Badge variant="outline" className="border-accent-blue/40 text-accent-blue">
                      <span className="size-1.5 rounded-full bg-accent-blue animate-pulse" />
                      {t('ongoing')}
                    </Badge>
                  </div>
                  <p className="mt-3 text-lg font-medium leading-snug">{s.tagline}</p>
                  <p className="mt-4 text-sm text-muted-foreground">{s.description}</p>
                  {s.goals && (
                    <ul className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {s.goals.map((goal) => {
                        const Icon = GOAL_ICONS[goal.icon];
                        return (
                          <li
                            key={goal.title}
                            className="flex items-start gap-3 rounded-lg border border-accent-blue/15 bg-accent-blue/5 p-3"
                          >
                            <Icon className="size-5 shrink-0 text-accent-blue mt-0.5" />
                            <div>
                              <p className="text-sm font-semibold">{goal.title}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{goal.text}</p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {s.closing && <p className="mt-4 text-sm text-muted-foreground">{s.closing}</p>}
                  <div className="mt-5 pt-4 border-t border-accent-blue/15 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground">
                    <span>{t('entriesCount', { count: entries.length })}</span>
                    <span>{t('postsCount', { count: s.posts.length })}</span>
                    {dated.length > 0 && <span>{t('lastUpdated', { date: formatDate(dated[0], locale) })}</span>}
                  </div>
                </div>
              </ScrollItem>
            </ScrollSection>

            {/* Latest + up next */}
            <ScrollSection className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ScrollItem className="md:col-span-2">
                <a
                  href={latest.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full overflow-hidden rounded-xl border border-accent-blue/30 bg-white/90 dark:bg-black/70 backdrop-blur-lg shadow-lg shadow-accent-blue/10 transition-all duration-300 hover:border-accent-blue/60 hover:shadow-accent-blue/25"
                >
                  {latest.cover && (
                    <div className="relative aspect-[2/1] overflow-hidden">
                      <Image
                        src={latest.cover}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 640px, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <p className="font-mono text-xs text-accent-green">
                      {t('latest')} · {s.name} #{latest.entry}
                      {latest.part && ` (${latest.part}/${latest.totalParts})`}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold text-accent-blue group-hover:underline">
                      {latest.title}
                    </h3>
                    <Highlights items={latest.highlights} className="mt-3" />
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      {latest.date && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                          <CalendarDays className="size-3.5" />
                          {formatDate(latest.date, locale)}
                        </span>
                      )}
                      <span className={linkClass}>
                        {t('readOnMedium')}
                        <ArrowUpRight className="size-4" />
                      </span>
                    </div>
                  </div>
                </a>
              </ScrollItem>

              <ScrollItem>
                <div className="flex h-full flex-col justify-between gap-4 rounded-xl border border-dashed border-accent-blue/40 bg-white/60 dark:bg-black/50 backdrop-blur-lg p-6">
                  <div>
                    <p className="font-mono text-xs text-accent-green">
                      {t('upNext')} · #{latest.entry + 1}
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-accent-blue">
                      <PenLine className="size-5" />
                      <h3 className="font-display text-lg font-semibold">{t('inProgress')}</h3>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{s.upNext ?? t('upNextDefault')}</p>
                  </div>
                  <a href={MEDIUM_PROFILE_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {t('followForUpdates')}
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </ScrollItem>
            </ScrollSection>

            {/* Archive, newest entry first */}
            <div className="space-y-4">
              <h3 className="font-display text-xl font-bold border-b border-accent-blue/20 pb-2">{t('allEntries')}</h3>
              <ol className="relative border-l border-accent-blue/25 ml-2 space-y-8">
                {entries.map((entry) => (
                  <li key={entry.number} className="pl-6">
                    <span className="absolute -left-[5px] mt-1.5 size-2.5 rounded-full bg-accent-blue ring-4 ring-background" />
                    <ScrollSection className="space-y-3">
                      <ScrollItem>
                        <h4 className="font-mono text-sm font-semibold text-accent-blue">
                          {s.name} #{entry.number}
                          {entry.posts[0].date && (
                            <span className="ml-3 font-normal text-muted-foreground">
                              {formatDate(entry.posts[0].date, locale)}
                            </span>
                          )}
                        </h4>
                      </ScrollItem>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {entry.posts.map((post) => (
                          <ScrollItem key={post.url}>
                            <a
                              href={post.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex h-full flex-col rounded-xl border border-accent-blue/20 bg-white/90 dark:bg-black/70 backdrop-blur-lg p-5 shadow-md shadow-accent-blue/5 transition-all duration-300 hover:border-accent-blue/50 hover:shadow-accent-blue/20"
                            >
                              {post.part && (
                                <p className="font-mono text-xs text-muted-foreground">
                                  {t('partOf', { part: post.part, total: post.totalParts ?? post.part })}
                                </p>
                              )}
                              <h5 className="mt-1 font-display font-semibold text-accent-blue group-hover:underline">
                                {post.title}
                              </h5>
                              <Highlights items={post.highlights} className="mt-3 flex-1" />
                              <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                                <div className="flex flex-wrap gap-1.5">
                                  {post.tags.map((tag) => (
                                    <Badge key={tag} variant="outline">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                                <ArrowUpRight
                                  aria-label={t('readOnMedium')}
                                  className="size-4 text-accent-blue transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                              </div>
                            </a>
                          </ScrollItem>
                        ))}
                      </div>
                    </ScrollSection>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        );
      })}

      {comingSoon.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-display text-xl font-bold border-b border-accent-blue/20 pb-2">{t('comingSoonHeading')}</h2>
          <ScrollSection className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {comingSoon.map((s) => (
              <ScrollItem key={s.id}>
                <div className="h-full rounded-xl border border-dashed border-accent-blue/30 bg-white/60 dark:bg-black/50 backdrop-blur-lg p-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-lg font-semibold">
                      <span aria-hidden className="mr-2">
                        {s.emoji}
                      </span>
                      {s.name}
                    </h3>
                    <Badge variant="outline" className="text-accent-green border-accent-green/40">
                      <Hourglass />
                      {t('comingSoon')}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm font-medium">{s.tagline}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
                </div>
              </ScrollItem>
            ))}
          </ScrollSection>
        </section>
      )}
    </div>
  );
}
