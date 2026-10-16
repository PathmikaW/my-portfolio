import { ogCard } from '@/lib/og-card';
import { previewCard, previewSeriesIds, resolveSeries } from '@/lib/blog-preview';

// One 1200x630 preview image per blog series, rebuilt on each deploy.
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return previewSeriesIds().map((series) => ({ series }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ series: string }> }) {
  const { series } = await params;
  return ogCard(previewCard(resolveSeries(series)));
}
