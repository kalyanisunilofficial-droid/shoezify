

import { notFound } from "next/navigation";
import { supportedLocales, Locale } from "@/i18n";
import "../globals.css";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import {  getSiteSettings } from "@/lib/queries";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { getMessages, getTranslations } from "next-intl/server";
import navbar from "../components/layout/navbar";



export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

 const messages = await getMessages();

  const h =  await getTranslations({ locale, namespace: 'nav' });


  const settings = await getSiteSettings(locale);
  console.log("Layout settings:", settings)

const navFallback = {
    home: h('home'),
    about: h('about'),
    login: h('login'),
    team: h('team'),
    contact: h('contact')
  };

  if (!supportedLocales.includes(locale as Locale)) {
    notFound();
  }
console.log("Current Locale:", locale, "Translation:", messages);
console.log("Navbar login text:", h);


  return (
    <html lang={locale}>
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
        />
      </head>
      <body className="antialiased">
      <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar navText={settings?.navbar} fallbackText={navFallback}></Navbar>
        {children}
        <Footer footerText={settings?.footer}></Footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}