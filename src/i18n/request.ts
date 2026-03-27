import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  const localeParams = await requestLocale;

  // Ensure that a valid locale is used
  const finalLocale = (localeParams && routing.locales.includes(localeParams as any)) 
    ? localeParams 
    : routing.defaultLocale;

  return {
    locale: finalLocale,
    messages: (await import(`../messages/${finalLocale}.json`)).default
  };
});
