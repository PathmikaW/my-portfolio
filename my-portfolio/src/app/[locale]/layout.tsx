import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';
import { getMessages } from '@/i18n/request';
import { AppContextProvider } from '@/context/AppContext';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import '../globals.css';

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
      <body className="flex flex-col min-h-screen bg-gradient-to-b from-gray-100 to-blue-200 dark:from-gray-900 dark:to-black">
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
