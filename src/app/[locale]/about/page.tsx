import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { AboutPanel, ContactPanel, PremiumAssurancePanel } from "@/components/marketing";
import { buildPageMetadata } from "@/lib/metadata";
import { isLocale, type Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  return buildPageMetadata(locale, "about", "/about");
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale as Locale);

  return (
    <div className="pb-20 pt-10">
      <section className="mx-auto w-full max-w-7xl px-4 lg:px-8">
        <div className="surface-card rounded-[1.9rem] p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">{dictionary.labels.craftsmanship}</p>
          <h1 className="font-display mt-4 text-5xl font-semibold text-[var(--foreground)]">{dictionary.navigation.about}</h1>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-[var(--muted)]">{dictionary.about.lead}</p>
        </div>
      </section>
      <AboutPanel dictionary={dictionary} />
      <PremiumAssurancePanel locale={locale} />
      <ContactPanel locale={locale} dictionary={dictionary} />
    </div>
  );
}