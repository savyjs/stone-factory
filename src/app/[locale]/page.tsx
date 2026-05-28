import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import {
  AboutPanel,
  BlogGrid,
  ContactPanel,
  ExportOfferBanner,
  FaqSection,
  GalleryGrid,
  HeroSection,
  PremiumAssurancePanel,
  ProductGrid,
} from "@/components/marketing";
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

  return buildPageMetadata(locale, "home");
}

export default async function LocaleHomePage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale as Locale);

  return (
    <div className="pb-20">
      <HeroSection locale={locale} dictionary={dictionary} />
      <ProductGrid locale={locale} dictionary={dictionary} limit={4} />
      <ExportOfferBanner locale={locale} dictionary={dictionary} />
      <AboutPanel dictionary={dictionary} />
      <GalleryGrid locale={locale} dictionary={dictionary} limit={8} />
      <PremiumAssurancePanel locale={locale} />
      <BlogGrid locale={locale} dictionary={dictionary} limit={3} />
      <FaqSection dictionary={dictionary} />
      <ContactPanel locale={locale} dictionary={dictionary} />
    </div>
  );
}