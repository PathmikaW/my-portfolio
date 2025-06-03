// src/app/[locale]/page.tsx

import { getProfile } from '@/lib/api';
import HomeClient from './_components/HomeClient';

interface Props {
  params: { locale: string };
}

export default async function HomePage({ params }: Props) {
  const profile = await getProfile();

  return (
    <HomeClient profile={profile} locale={params.locale} />
  );
}
