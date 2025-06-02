import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './config';

export async function getMessages({ locale }: { locale: string }) {
  const resolvedLocale = locales.includes(locale) ? locale : defaultLocale;
  return (await import(`../messages/${resolvedLocale}.json`)).default;
}

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locale ?? defaultLocale;

  return {
    locale: resolvedLocale,
    messages: await getMessages({ locale: resolvedLocale }),
  };
});
