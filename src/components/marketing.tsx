import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { ShareButton } from "@/components/share-button";
import { getBlogPostContent } from "@/content";
import type { LocaleDictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { getLocaleUi } from "@/lib/locale-ui";
import { blogPosts, companyInfo, exportMarkets, galleryImages, products } from "@/lib/site-data";

type SectionTitleProps = {
  title: string;
  text: string;
};

function SectionTitle({ title, text }: SectionTitleProps) {
  return (
    <div className="mb-8 max-w-3xl">
      <h2 className="font-display text-4xl font-semibold text-[var(--foreground)] sm:text-5xl">{title}</h2>
      <p className="mt-3 text-base leading-8 text-[var(--muted)]">{text}</p>
    </div>
  );
}

export function HeroSection({ locale, dictionary }: { locale: Locale; dictionary: LocaleDictionary }) {
  const copy = getLocaleUi(locale);

  return (
    <section className="section-anchor mx-auto mt-8 w-full max-w-7xl px-4 lg:px-8">
      <div className="hero-grid overflow-hidden rounded-[2rem] text-white shadow-[var(--shadow)]">
        <video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster="/photo/1/berlian-stone-workshop-qom-01.jpg">
          <source src={companyInfo.video} type="video/mp4" />
        </video>
        <div className="grid gap-10 px-6 py-10 lg:grid-cols-[1.2fr,0.8fr] lg:px-10 lg:py-16">
          <div>
            <div className="chip inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/85">
              {dictionary.hero.eyebrow}
            </div>
            <h1 className="font-display mt-6 max-w-4xl text-5xl leading-tight font-semibold sm:text-6xl">
              {dictionary.hero.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/82">{dictionary.hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${locale}/products`} className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--primary)] transition hover:bg-stone-100">
                {dictionary.hero.primaryCta}
              </Link>
              <Link href={`/${locale}/gallery`} className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                {dictionary.hero.secondaryCta}
              </Link>
              <Link href={`/${locale}/contact#order-form`} className="rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
                {copy.contactCta}
              </Link>
            </div>
          </div>
          <div className="glass-panel rounded-[1.8rem] p-6 text-[var(--foreground)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">{copy.contactCta}</p>
            <div className="mt-4 grid gap-3">
              <a href={companyInfo.whatsappPrimary} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl bg-white/90 px-5 py-4 text-sm font-semibold text-[var(--foreground)] transition hover:bg-white">
                <span>{copy.whatsappLabel}</span>
                <span className="text-xs text-[var(--primary)]">{companyInfo.internationalPhone}</span>
              </a>
              <a href={companyInfo.telegramPrimary} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl bg-white/90 px-5 py-4 text-sm font-semibold text-[var(--foreground)] transition hover:bg-white">
                <span>{copy.telegramLabel}</span>
                <span className="text-xs text-[var(--primary)]">{companyInfo.telegramHandle}</span>
              </a>
              <a href={`tel:${companyInfo.phones[0]}`} className="flex items-center justify-between rounded-2xl bg-white/90 px-5 py-4 text-sm font-semibold text-[var(--foreground)] transition hover:bg-white">
                <span>{copy.localContactLabel}</span>
                <span className="text-xs text-[var(--primary)]">{companyInfo.phones[0]}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductGrid({ locale, dictionary, limit }: { locale: Locale; dictionary: LocaleDictionary; limit?: number }) {
  const visible = typeof limit === "number" ? products.slice(0, limit) : products;
  const copy = getLocaleUi(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  return (
    <section className="section-anchor mx-auto mt-20 w-full max-w-7xl px-4 lg:px-8">
      <SectionTitle title={dictionary.sections.featuredProductsTitle} text={dictionary.sections.featuredProductsText} />
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        {visible.map((product) => {
          const content = dictionary.productContent[product.key];
          const isPrimary = product.key === "wood-travertine";

          return (
            <article key={product.key} className={`surface-card overflow-hidden rounded-[1.75rem]${isPrimary ? " ring-2 ring-[var(--primary)]" : ""}`}>
              <div className="relative h-60 overflow-hidden">
                <Image src={product.image} alt={content.name} fill className="stone-image object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                {isPrimary && (
                  <span className="absolute top-3 start-3 rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-bold text-white shadow">
                    ★ {content.tags[0]}
                  </span>
                )}
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">{product.stoneFamily}</p>
                <h3 className="mt-3 text-2xl font-semibold text-[var(--foreground)]">{content.name}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{content.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {content.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-[rgba(127,79,36,0.08)] px-3 py-1 text-xs font-semibold text-[var(--primary)]">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">{product.application}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={`https://wa.me/989376953800?text=${encodeURIComponent(`${copy.inquireLabel}: ${content.name}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    data-testid="inquire-cta"
                    className="rounded-full bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[var(--secondary)]"
                  >
                    {copy.inquireLabel}
                  </a>
                  <ShareButton
                    url={`${siteUrl}/${locale}/products#${product.key}`}
                    title={content.name}
                    label={copy.shareLabel}
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {limit ? (
        <div className="mt-8">
          <Link href={`/${locale}/products`} className="rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--primary)] transition hover:border-[var(--primary)]">
            {dictionary.labels.viewDetails}
          </Link>
        </div>
      ) : null}
    </section>
  );
}

export function GalleryGrid({ locale, dictionary, limit }: { locale: Locale; dictionary: LocaleDictionary; limit?: number }) {
  const visible = typeof limit === "number" ? galleryImages.slice(0, limit) : galleryImages;
  const copy = getLocaleUi(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  return (
    <section className="section-anchor mx-auto mt-20 w-full max-w-7xl px-4 lg:px-8">
      <SectionTitle title={dictionary.sections.galleryTitle} text={dictionary.sections.galleryText} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {visible.map((image) => (
          <div key={image} className="surface-card overflow-hidden rounded-[1.5rem]">
            <div className="relative h-64 overflow-hidden">
              <Image src={image} alt={dictionary.sections.galleryTitle} fill className="stone-image object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
            </div>
            <div className="flex justify-end p-2">
              <ShareButton
                url={`${siteUrl}/${locale}/gallery`}
                title={dictionary.sections.galleryTitle}
                label={copy.shareLabel}
              />
            </div>
          </div>
        ))}
      </div>
      {limit ? (
        <div className="mt-8">
          <Link href={`/${locale}/gallery`} className="rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--primary)] transition hover:border-[var(--primary)]">
            {dictionary.labels.viewGallery}
          </Link>
        </div>
      ) : null}
    </section>
  );
}

export function PremiumAssurancePanel({ locale }: { locale: Locale }) {
  const copy = getLocaleUi(locale);

  return (
    <section className="section-anchor mx-auto mt-20 w-full max-w-7xl px-4 lg:px-8">
      <div className="surface-card rounded-[1.75rem] p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">{copy.addressesTitle}</p>
        <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">{copy.factoryAddressLabel}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground)]">{companyInfo.addressPrimary}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">{copy.warehouseAddressLabel}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground)]">{companyInfo.addressWarehouse}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">{copy.internationalContactLabel}</p>
            <a href={companyInfo.whatsappPrimary} target="_blank" rel="noreferrer" className="mt-2 block text-sm font-semibold text-[var(--primary)] hover:underline">{companyInfo.internationalPhone}</a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">{copy.localContactLabel}</p>
            <a href={`tel:${companyInfo.phones[0]}`} className="mt-2 block text-sm font-semibold text-[var(--primary)] hover:underline">{companyInfo.phones.join(" · ")}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BlogGrid({ locale, dictionary, limit }: { locale: Locale; dictionary: LocaleDictionary; limit?: number }) {
  const visible = typeof limit === "number" ? blogPosts.slice(0, limit) : blogPosts;
  const copy = getLocaleUi(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  return (
    <section className="section-anchor mx-auto mt-20 w-full max-w-7xl px-4 lg:px-8">
      <SectionTitle title={dictionary.sections.blogTitle} text={dictionary.sections.blogText} />
      <div className="grid gap-6 lg:grid-cols-3">
        {visible.map((post) => {
          const content = getBlogPostContent(locale, post.slug);

          return (
            <article key={post.slug} className="surface-card overflow-hidden rounded-[1.75rem]">
              <div className="relative h-56 overflow-hidden">
                <Image src={post.image} alt={content.title} fill className="stone-image object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
              </div>
              <div className="p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  {dictionary.labels.publishedOn} · {post.publishedAt} · {post.readingMinutes} {dictionary.labels.minutesRead}
                </div>
                <h3 className="mt-3 text-2xl font-semibold text-[var(--foreground)]">{content.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{content.excerpt}</p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link href={`/${locale}/blog/${post.slug}`} className="inline-flex rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--secondary)]">
                    {dictionary.labels.readMore}
                  </Link>
                  <ShareButton
                    url={`${siteUrl}/${locale}/blog/${post.slug}`}
                    title={content.title}
                    label={copy.shareLabel}
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function AboutPanel({ dictionary }: { dictionary: LocaleDictionary }) {
  return (
    <section className="section-anchor mx-auto mt-20 w-full max-w-7xl px-4 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1fr,1fr]">
        <div className="surface-card rounded-[1.75rem] p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">{dictionary.labels.craftsmanship}</p>
          <h2 className="font-display mt-3 text-4xl font-semibold text-[var(--foreground)]">{dictionary.about.storyTitle}</h2>
          <p className="mt-4 text-base leading-8 text-[var(--muted)]">{dictionary.about.storyBody}</p>
        </div>
        <div className="surface-card rounded-[1.75rem] p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">{dictionary.labels.marketAccess}</p>
          <h2 className="font-display mt-3 text-4xl font-semibold text-[var(--foreground)]">{dictionary.about.capabilityTitle}</h2>
          <ul className="mt-4 space-y-3 text-base leading-8 text-[var(--muted)]">
            {dictionary.about.capabilityPoints.map((point) => (
              <li key={point} className="rounded-2xl bg-[rgba(127,79,36,0.05)] px-4 py-3">{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function MarketsPanel({ dictionary }: { dictionary: LocaleDictionary }) {
  return (
    <section className="section-anchor mx-auto mt-20 w-full max-w-7xl px-4 lg:px-8">
      <div className="surface-card rounded-[1.75rem] p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">{dictionary.sections.exportTitle}</p>
        <h2 className="font-display mt-3 text-4xl font-semibold text-[var(--foreground)]">{dictionary.about.marketTitle}</h2>
        <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--muted)]">{dictionary.about.marketBody}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {exportMarkets.map((market) => (
            <span key={market} className="rounded-full bg-[rgba(38,70,83,0.08)] px-4 py-2 text-sm font-semibold text-[var(--secondary)]">
              {market}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactPanel({ locale, dictionary }: { locale: Locale; dictionary: LocaleDictionary }) {
  const copy = getLocaleUi(locale);

  return (
    <section className="section-anchor mx-auto mt-20 w-full max-w-7xl px-4 lg:px-8">
      <SectionTitle title={dictionary.sections.contactTitle} text={dictionary.sections.contactText} />
      <div className="grid gap-6 lg:grid-cols-[0.8fr,1.2fr]">
        <div className="surface-card flex flex-col gap-5 rounded-[1.75rem] p-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">{dictionary.labels.guaranteed}</p>
            <h3 className="mt-2 text-2xl font-semibold text-[var(--foreground)]">{dictionary.meta.siteName}</h3>
            <p className="mt-1 text-sm text-[var(--muted)]">{companyInfo.city}, {companyInfo.country}</p>
          </div>
          <div className="grid gap-3">
            <a className="flex items-center justify-between rounded-2xl bg-[var(--primary)] px-5 py-4 text-sm font-semibold text-white transition hover:opacity-90" href={companyInfo.whatsappPrimary} target="_blank" rel="noreferrer">
              <span>{copy.whatsappLabel}</span>
              <span className="text-xs opacity-75">{companyInfo.internationalPhone}</span>
            </a>
            <a className="flex items-center justify-between rounded-2xl bg-[var(--secondary)] px-5 py-4 text-sm font-semibold text-white transition hover:opacity-90" href={companyInfo.telegramPrimary} target="_blank" rel="noreferrer">
              <span>{copy.telegramLabel}</span>
              <span className="text-xs opacity-75">{companyInfo.telegramHandle}</span>
            </a>
            <a className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-white px-5 py-4 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--primary)]" href={`tel:${companyInfo.phones[0]}`}>
              <span>{copy.localContactLabel}</span>
              <span className="text-xs text-[var(--muted)]">{companyInfo.phones[0]}</span>
            </a>
            <a className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-white px-5 py-4 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--primary)]" href={companyInfo.balePhone1} target="_blank" rel="noreferrer">
              <span>{copy.baleLabel}</span>
              <span className="text-xs text-[var(--muted)]">09132301099</span>
            </a>
            <a className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-white px-5 py-4 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--primary)]" href={companyInfo.eitaaPhone1} target="_blank" rel="noreferrer">
              <span>{copy.eitaaLabel}</span>
              <span className="text-xs text-[var(--muted)]">09132301099</span>
            </a>
            <a className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-white px-5 py-4 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--primary)]" href={`mailto:${companyInfo.email}`}>
              <span>{dictionary.labels.email}</span>
              <span className="text-xs text-[var(--muted)]">{companyInfo.email}</span>
            </a>
          </div>
        </div>
        <div className="surface-card rounded-[1.75rem] p-7">
          <ContactForm locale={locale} />
        </div>
      </div>
    </section>
  );
}

export function ExportOfferBanner({ locale, dictionary }: { locale: Locale; dictionary: LocaleDictionary }) {
  const copy = getLocaleUi(locale);

  return (
    <section className="section-anchor mx-auto mt-20 w-full max-w-7xl px-4 lg:px-8">
      <div className="overflow-hidden rounded-[1.75rem] bg-[var(--primary)] px-7 py-10 text-white lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr,auto] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/70">{dictionary.sections.exportTitle}</p>
            <h2 className="font-display mt-3 text-3xl font-semibold sm:text-4xl">{dictionary.productContent["wood-travertine"].name}</h2>
            <p className="mt-3 max-w-2xl text-base leading-8 text-white/85">{copy.barterNote}</p>
          </div>
          <div className="flex flex-col gap-3 lg:min-w-[220px]">
            <a href={companyInfo.whatsappPrimary} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[var(--primary)] transition hover:bg-stone-100">
              {copy.whatsappLabel}
            </a>
            <a href={companyInfo.balePhone1} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
              {copy.baleLabel} · 09132301099
            </a>
            <a href={companyInfo.eitaaPhone1} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
              {copy.eitaaLabel} · 09132301099
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqSection({ dictionary }: { dictionary: LocaleDictionary }) {
  return (
    <section className="section-anchor mx-auto mt-20 w-full max-w-7xl px-4 lg:px-8">
      <h2 className="font-display mb-8 text-4xl font-semibold text-[var(--foreground)] sm:text-5xl">{dictionary.faq.title}</h2>
      <div className="divide-y divide-[var(--border)] overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-strong,white)]">
        {dictionary.faq.items.map((item, i) => (
          <details key={i} className="group">
            <summary className="flex list-none cursor-pointer items-center justify-between px-7 py-5 text-base font-semibold text-[var(--foreground)] transition-colors hover:text-[var(--primary)] [&::-webkit-details-marker]:hidden">
              {item.q}
              <span className="ms-4 shrink-0 text-xl text-[var(--primary)] transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="px-7 pb-6 text-sm leading-8 text-[var(--muted)]">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}