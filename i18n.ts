export const supportedLocales = ["en", "it", "ml"] as const;
export const defaultLocale = "en";

export type Locale = (typeof supportedLocales)[number];
