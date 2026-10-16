import { blogSeries } from '@/data/blog';
import BlogClient from './_components/BlogClient';

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ series?: string }>;
}

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { series } = await searchParams;

  return <BlogClient series={blogSeries} locale={locale} initialSeries={series} />;
}
