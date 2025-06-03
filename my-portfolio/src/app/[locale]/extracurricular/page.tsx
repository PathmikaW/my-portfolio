import { getExtracurricular } from '@/lib/api';
import ExtracurricularClient from './_components/ExtracurricularClient';

interface Extracurricular {
  name: string;
  role: string;
}

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function ExtracurricularPage({ params }: Props) {
  const { locale } = await params;

  const activities: Extracurricular[] = await getExtracurricular();

  return <ExtracurricularClient activities={activities} locale={locale} />;
}
