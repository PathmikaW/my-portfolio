import { personalProjects, industryProjects } from '@/data/projects';
import ProjectsClient from './_components/ProjectsClient';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;

  return (
    <ProjectsClient
      personalProjects={personalProjects}
      industryProjects={industryProjects}
      locale={locale}
    />
  );
}
