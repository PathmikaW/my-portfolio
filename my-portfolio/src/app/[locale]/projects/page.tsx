import { getProjects } from '@/lib/api';
import ProjectsClient from './_components/ProjectsClient';

interface Project {
  id: number;
  section: string;
  title: string;
  description: string;
  techStack?: string[];
  url?: string;
  images?: string[];
  video?: string;
  moreDetailsHtml?: string;
}

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;

  const projects: Project[] = await getProjects();

  return <ProjectsClient projects={projects} locale={locale} />;
}
