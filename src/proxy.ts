import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { detectLocaleFromHeaders, isLocale } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const firstSegment = pathname.split("/")[1];

  if (isLocale(firstSegment)) {
    return NextResponse.next();
  }

  const locale = detectLocaleFromHeaders(request.headers);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};