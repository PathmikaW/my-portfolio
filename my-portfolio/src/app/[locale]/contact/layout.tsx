import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Pathmika Weerarathna',
  description: 'Get in touch with Pathmika Weerarathna. Contact details and message form.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
