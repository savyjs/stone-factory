import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { blogPosts } from "@/lib/site-data";

const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const staticRoutes = ["", "/about", "/products", "/gallery", "/blog", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const pageEntries = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${siteOrigin}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
  );

  const blogEntries = locales.flatMap((locale) =>
    blogPosts.map((post) => ({
      url: `${siteOrigin}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  return [...pageEntries, ...blogEntries];
}