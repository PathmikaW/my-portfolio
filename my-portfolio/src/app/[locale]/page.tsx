import { profile } from '@/data/profile';
import HomeClient from './_components/HomeClient';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  return (
    <HomeClient profile={profile} locale={locale} />
  );
}
