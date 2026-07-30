import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google';
import { locales } from '@/i18n/config';
import { getMessages } from '@/i18n/request';
import { AppContextProvider } from '@/context/AppContext';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import Background from '@/components/common/Background'; // Import the new client component
import '../globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });
const spaceGrotesk = Space_Grotesk({ variable: '--font-display', subsets: ['latin'], weight: ['500', '600', '700'] });

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!locales.includes(locale)) notFound();

  return {
    title: 'Home | Pathmika Weerarathna',
    description: 'Welcome to the portfolio of Pathmika Weerarathna. Explore projects, skills, and contact information.',
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) notFound();

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} flex flex-col min-h-screen relative`}
      >
        <Background /> {/* Render the client-side background component */}
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppContextProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </AppContextProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
