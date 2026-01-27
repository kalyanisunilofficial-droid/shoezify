import { NextRequest, NextResponse } from "next/server";
import { supportedLocales, defaultLocale } from "./i18n";

function getPreferredLocale(request: NextRequest) {
  const acceptLang = request.headers.get("accept-language");

  if (!acceptLang) return defaultLocale;

  const langs = acceptLang.split(",").map(l => l.split(";")[0]);

  return (
    langs.find(lang =>
      supportedLocales.includes(lang.split("-")[0] as any)
    )?.split("-")[0] ?? defaultLocale
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore internal paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return;
  }

  // Check if path already has locale
  const hasLocale = supportedLocales.some(
    locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocale) return;

  const locale = getPreferredLocale(request);

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
