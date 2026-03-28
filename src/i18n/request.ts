import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  const localeParams = await requestLocale;
  const locales = routing.locales as readonly string[];

  // Ensure that a valid locale is used
  const finalLocale = (localeParams && locales.includes(localeParams))
    ? localeParams 
    : routing.defaultLocale;

  return {
    locale: finalLocale,
    messages: (await import(`../messages/${finalLocale}.json`)).default
  };
});
