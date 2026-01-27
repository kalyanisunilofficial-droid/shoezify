import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['en', 'de', 'it', 'ml'],
  defaultLocale: 'en'
});