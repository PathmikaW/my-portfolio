import { getEducation } from '@/lib/api';
import EducationClient from './_components/EducationClient';

interface Education {
  degree: string;
  institution: string;
  period?: string;
  gpa?: string;
  year?: string;
}

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function EducationPage({ params }: Props) {
  const { locale } = await params;

  const education: Education[] = await getEducation();

  return <EducationClient education={education} locale={locale} />;
}
