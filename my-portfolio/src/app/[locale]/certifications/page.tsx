import { certifications } from '@/data/certifications';
import { getTranslations } from 'next-intl/server';
import CertificationsClient from './_components/CertificationsClient';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function CertificationsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pageTitle' });

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 md:px-8 lg:px-12 space-y-8">
      <h1 className="font-display text-4xl font-bold tracking-tight mb-4">{t('certifications')}</h1>
      <CertificationsClient certifications={certifications} locale={locale} />
    </div>
  );
}
