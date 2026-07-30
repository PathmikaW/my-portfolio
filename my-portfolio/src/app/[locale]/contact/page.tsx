import { contactInfo } from '@/data/contact';
import ContactClient from './_components/ContactClient';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;

  return <ContactClient contactInfo={contactInfo} locale={locale} />;
}
