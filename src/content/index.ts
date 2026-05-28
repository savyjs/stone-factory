import { ar } from "./locales/ar";
import { az } from "./locales/az";
import { en } from "./locales/en";
import { fa } from "./locales/fa";
import { hy } from "./locales/hy";
import { tk } from "./locales/tk";
import { tr } from "./locales/tr";
import { ur } from "./locales/ur";
import type { Locale } from "@/lib/i18n";
import type { LocaleDictionary } from "./types";

const dictionaries: Record<Locale, LocaleDictionary> = {
  fa,
  ar,
  az,
  tr,
  hy,
  ur,
  tk,
  en,
};

export function getDictionary(locale: Locale): LocaleDictionary {
  return dictionaries[locale];
}

export function getBlogPostContent(
  locale: Locale,
  slug: keyof LocaleDictionary["blog"]["posts"],
): NonNullable<LocaleDictionary["blog"]["posts"][keyof LocaleDictionary["blog"]["posts"]]> {
  return (dictionaries[locale].blog.posts[slug] ?? en.blog.posts[slug]) as NonNullable<
    LocaleDictionary["blog"]["posts"][keyof LocaleDictionary["blog"]["posts"]]
  >;
}