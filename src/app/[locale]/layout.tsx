import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getDictionary } from "@/content";
import { SiteShell } from "@/components/site-shell";
import { buildPageMetadata } from "@/lib/metadata";
import { getDirection, getScriptClass, isLocale, locales } from "@/lib/i18n";

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  return buildPageMetadata(locale, "home");
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);

  return (
    <div dir={getDirection(locale)} className={getScriptClass(locale)}>
      <SiteShell locale={locale} dictionary={dictionary}>
        {children}
      </SiteShell>
    </div>
  );
}