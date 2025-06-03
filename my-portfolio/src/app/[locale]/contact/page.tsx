import { getContactInfo } from '@/lib/api';
import ContactClient from './_components/ContactClient';

interface ContactInfo {
  phone: string;
  email: string;
  location: string;
  linkedin: string;
  facebook: string;
}

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;

  const contactInfo: ContactInfo = await getContactInfo();

  return <ContactClient contactInfo={contactInfo} locale={locale} />;
}
