

import { notFound } from "next/navigation";
import { supportedLocales, Locale } from "@/i18n";
import "../globals.css";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import {  getSiteSettings } from "@/lib/queries";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";



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

 


  const settings = await getSiteSettings(locale);
  console.log("Layout settings:", settings)
  if (!supportedLocales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
        />
      </head>
      <body className="antialiased">
        <Navbar navText={settings?.navbar}></Navbar>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <Footer footerText={settings?.footer}></Footer>
      </body>
    </html>
  );
}