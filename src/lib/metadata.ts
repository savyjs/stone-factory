import type { Metadata } from "next";
import { getBlogPostContent, getDictionary } from "@/content";
import { getLanguageTag, locales, type Locale } from "./i18n";

const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function buildPageMetadata(locale: Locale, page: "home" | "about" | "products" | "gallery" | "blog" | "contact", pathname = ""): Metadata {
  const dictionary = getDictionary(locale);
  const pageMeta = dictionary.meta.pages[page];

  return {
    metadataBase: new URL(siteOrigin),
    title: pageMeta.title,
    description: pageMeta.description,
    keywords: dictionary.meta.keywords,
    alternates: {
      canonical: `/${locale}${pathname}`,
      languages: Object.fromEntries(
        locales.map((entry) => [getLanguageTag(entry), `/${entry}${pathname}`]),
      ),
    },
    openGraph: {
      title: pageMeta.title,
      description: pageMeta.description,
      locale: getLanguageTag(locale),
      siteName: dictionary.meta.siteName,
      type: "website",
      url: `/${locale}${pathname}`,
    },
    twitter: {
      card: "summary_large_image",
      title: pageMeta.title,
      description: pageMeta.description,
    },
  };
}

export function buildBlogPostMetadata(locale: Locale, slug: keyof ReturnType<typeof getDictionary>["blog"]["posts"]): Metadata {
  const dictionary = getDictionary(locale);
  const post = getBlogPostContent(locale, slug);

  return {
    ...buildPageMetadata(locale, "blog", `/blog/${slug}`),
    title: post.seoTitle,
    description: post.seoDescription,
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      locale: getLanguageTag(locale),
      siteName: dictionary.meta.siteName,
      type: "article",
      url: `/${locale}/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
    },
  };
}