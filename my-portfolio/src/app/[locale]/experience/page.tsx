import { getExperience } from '@/lib/api';
import ExperienceClient from './_components/ExperienceClient';

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function ExperiencePage({ params }: Props) {
  const { locale } = await params;

  const experience: Experience[] = await getExperience();

  return <ExperienceClient experience={experience} locale={locale} />;
}
