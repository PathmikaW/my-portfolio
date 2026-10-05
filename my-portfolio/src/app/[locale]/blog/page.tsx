import { blogSeries } from '@/data/blog';
import BlogClient from './_components/BlogClient';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;

  return <BlogClient series={blogSeries} locale={locale} />;
}
