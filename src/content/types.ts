import type { Direction, Locale } from "@/lib/i18n";
import type { BlogSlug, ProductKey } from "@/lib/site-data";

export type PageKey = "home" | "about" | "products" | "gallery" | "blog" | "contact";

export type LocaleDictionary = {
  locale: Locale;
  label: string;
  nativeLabel: string;
  marketLabel: string;
  direction: Direction;
  meta: {
    siteName: string;
    keywords: string[];
    pages: Record<PageKey, { title: string; description: string }>;
  };
  navigation: Record<PageKey, string>;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    stats: Array<{ value: string; label: string }>;
  };
  sections: {
    featuredProductsTitle: string;
    featuredProductsText: string;
    galleryTitle: string;
    galleryText: string;
    videoTitle: string;
    videoText: string;
    blogTitle: string;
    blogText: string;
    contactTitle: string;
    contactText: string;
    exportTitle: string;
    exportText: string;
  };
  labels: {
    craftsmanship: string;
    guaranteed: string;
    marketAccess: string;
    viewDetails: string;
    readMore: string;
    publishedOn: string;
    minutesRead: string;
    phone: string;
    email: string;
    manager: string;
    city: string;
    markets: string;
    watchVideo: string;
    viewGallery: string;
    allLanguages: string;
  };
  about: {
    lead: string;
    storyTitle: string;
    storyBody: string;
    capabilityTitle: string;
    capabilityPoints: string[];
    marketTitle: string;
    marketBody: string;
  };
  productContent: Record<
    ProductKey,
    {
      name: string;
      summary: string;
      tags: string[];
    }
  >;
  blog: {
    introTitle: string;
    introText: string;
    posts: Partial<Record<
      BlogSlug,
      {
        title: string;
        excerpt: string;
        seoTitle: string;
        seoDescription: string;
        body: string[];
      }
    >>;
  };
  faq: {
    title: string;
    items: Array<{ q: string; a: string }>;
  };
};

export type LocaleSeed = LocaleDictionary;