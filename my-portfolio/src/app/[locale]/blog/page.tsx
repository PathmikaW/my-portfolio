import { blogSeries } from '@/data/blog';
import { pageMetadata } from '@/lib/seo';
import { isDefaultSeries, previewImageUrl, previewText, resolveSeries } from '@/lib/blog-preview';
import BlogClient from './_components/BlogClient';

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ series?: string }>;
}

// Each tab (?series=...) gets its own link preview, so shared Dev Journal links
// don't show the Garden Diary card.
export async function generateMetadata({ params, searchParams }: Props) {
  const { locale } = await params;
  const series = resolveSeries((await searchParams).series);
  const { ogTitle, description } = previewText(series);

  return pageMetadata({
    locale,
    path: isDefaultSeries(series) ? '/blog' : `/blog?series=${series.id}`,
    title: 'Blog | Pathmika Weerarathna',
    ogTitle,
    description,
    image: { url: previewImageUrl(series), alt: `${series.name} by Pathmika Weerarathna` },
  });
}

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { series } = await searchParams;

  return <BlogClient series={blogSeries} locale={locale} initialSeries={series} />;
}
