import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPostContent, getDictionary } from "@/content";
import { blogPosts } from "@/lib/site-data";
import { buildBlogPostMetadata } from "@/lib/metadata";
import { isLocale, locales, type Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) => blogPosts.map((post) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale) || !blogPosts.some((post) => post.slug === slug)) {
    return {};
  }

  return buildBlogPostMetadata(locale, slug as (typeof blogPosts)[number]["slug"]);
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const blogPost = blogPosts.find((post) => post.slug === slug);

  if (!blogPost) {
    notFound();
  }

  const dictionary = getDictionary(locale as Locale);
  const post = getBlogPostContent(locale as Locale, blogPost.slug);

  return (
    <article className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
      <div className="surface-card overflow-hidden rounded-[2rem]">
        <div className="relative h-80 overflow-hidden sm:h-[26rem]">
          <Image src={blogPost.image} alt={post.title} fill className="object-cover" sizes="100vw" />
        </div>
        <div className="p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary)]">
            {dictionary.labels.publishedOn} · {blogPost.publishedAt} · {blogPost.readingMinutes} {dictionary.labels.minutesRead}
          </p>
          <h1 className="font-display mt-4 text-5xl font-semibold text-[var(--foreground)]">{post.title}</h1>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">{post.excerpt}</p>
          <div className="mt-8 space-y-6 text-base leading-8 text-[var(--foreground)]">
            {post.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}