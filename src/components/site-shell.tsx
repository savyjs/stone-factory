import Link from "next/link";
import type { ReactNode } from "react";
import type { LocaleDictionary } from "@/content/types";
import { getLocaleUi } from "@/lib/locale-ui";
import { localeDetails, locales, type Locale } from "@/lib/i18n";
import { companyInfo, exportMarkets } from "@/lib/site-data";

type SiteShellProps = {
  locale: Locale;
  dictionary: LocaleDictionary;
  children: ReactNode;
};

const pageLinks = ["home", "about", "products", "gallery", "blog", "contact"] as const;

const localeFlags: Record<Locale, string> = {
  fa: "🇮🇷", ar: "🇮🇶", az: "🇦🇿", tr: "🇹🇷",
  hy: "🇦🇲", ur: "🇵🇰", tk: "🇹🇲", en: "🌐",
};

function hrefFor(locale: Locale, page: (typeof pageLinks)[number]): string {
  if (page === "home") {
    return `/${locale}`;
  }

  return `/${locale}/${page}`;
}

export function SiteShell({ locale, dictionary, children }: SiteShellProps) {
  const copy = getLocaleUi(locale);

  return (
    <div className="stone-shell fade-in">
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[rgba(247,241,231,0.92)] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
          <Link href={`/${locale}`} className="font-display shrink-0 text-2xl font-semibold text-[var(--primary)]">
            {dictionary.meta.siteName}
          </Link>
          <nav className="hidden items-center gap-1 text-sm font-medium text-[var(--foreground)] lg:flex">
            {pageLinks.map((page) => (
              <Link key={page} href={hrefFor(locale, page)} className="rounded-full px-3 py-2 transition hover:bg-white/70 hover:text-[var(--primary)]">
                {dictionary.navigation[page]}
              </Link>
            ))}
          </nav>
          <div className="relative flex shrink-0 items-center">
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-[var(--border)] bg-white/70 px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--primary)] hover:text-[var(--primary)] [&::-webkit-details-marker]:hidden">
                <span className="text-base leading-none">{localeFlags[locale]}</span>
                <span>{localeDetails[locale].nativeLabel}</span>
                <svg className="h-3.5 w-3.5 shrink-0 text-[var(--muted)] transition-transform group-open:rotate-180" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6l4 4 4-4" />
                </svg>
              </summary>
              <div className="absolute end-0 top-[calc(100%+8px)] z-50 w-[288px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[rgba(247,241,231,0.98)] shadow-2xl backdrop-blur-xl">
                <div className="grid grid-cols-2 gap-1 p-2">
                  {locales.map((entry) => {
                    const detail = localeDetails[entry];
                    const active = entry === locale;

                    return (
                      <Link
                        key={entry}
                        href={`/${entry}`}
                        className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition ${
                          active
                            ? "bg-[var(--primary)] text-white"
                            : "text-[var(--foreground)] hover:bg-white hover:text-[var(--primary)]"
                        }`}
                      >
                        <span className="shrink-0 text-base leading-none">{localeFlags[entry]}</span>
                        <div className="min-w-0">
                          <div className="font-semibold leading-tight">{detail.nativeLabel}</div>
                          <div className={`mt-0.5 text-xs ${active ? "text-white/70" : "text-[var(--muted)]"}`}>{detail.label}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </details>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-20 border-t border-[var(--border)] bg-[rgba(37,29,23,0.95)] text-stone-100">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1.2fr,0.8fr,1fr] lg:px-8">
          <div>
            <h2 className="font-display text-3xl">{dictionary.meta.siteName}</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-stone-300">{dictionary.about.lead}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-400">{dictionary.labels.markets}</h3>
            <ul className="mt-4 space-y-2 text-sm text-stone-200">
              {exportMarkets.map((market) => (
                <li key={market}>{market}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-400">{dictionary.navigation.contact}</h3>
            <ul className="mt-4 space-y-3 text-sm text-stone-200">
              <li>{dictionary.labels.manager}: {companyInfo.manager}</li>
              <li>{copy.localContactLabel}: {companyInfo.phones.join(" · ")}</li>
              <li>{copy.internationalContactLabel}: {companyInfo.internationalPhone}</li>
              <li>{dictionary.labels.email}: {companyInfo.email}</li>
              <li>{copy.telegramLabel}: {companyInfo.telegramHandle}</li>
              <li>{copy.factoryAddressLabel}: {companyInfo.addressPrimary}</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}