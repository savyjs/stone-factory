export const locales = ["fa", "ar", "az", "tr", "hy", "ur", "tk", "en"] as const;

export type Locale = (typeof locales)[number];
export type Direction = "ltr" | "rtl";

const rtlLocales = new Set<Locale>(["fa", "ar", "ur"]);

export const localeDetails: Record<Locale, { label: string; nativeLabel: string; country: string }> = {
  fa: { label: "Persian", nativeLabel: "فارسی", country: "Iran" },
  ar: { label: "Arabic", nativeLabel: "العربية", country: "Iraq" },
  az: { label: "Azerbaijani", nativeLabel: "Azərbaycanca", country: "Azerbaijan" },
  tr: { label: "Turkish", nativeLabel: "Türkçe", country: "Turkey" },
  hy: { label: "Armenian", nativeLabel: "Հայերեն", country: "Armenia" },
  ur: { label: "Urdu", nativeLabel: "اردو", country: "Pakistan" },
  tk: { label: "Turkmen", nativeLabel: "Türkmençe", country: "Turkmenistan" },
  en: { label: "English", nativeLabel: "English", country: "Global" },
};

const languageTags: Record<Locale, string> = {
  fa: "fa-IR",
  ar: "ar-IQ",
  az: "az-AZ",
  tr: "tr-TR",
  hy: "hy-AM",
  ur: "ur-PK",
  tk: "tk-TM",
  en: "en",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDirection(locale: Locale): Direction {
  return rtlLocales.has(locale) ? "rtl" : "ltr";
}

export function getScriptClass(locale: Locale): string {
  if (rtlLocales.has(locale)) {
    return "script-arabic";
  }

  if (locale === "hy") {
    return "script-armenian";
  }

  return "";
}

export function getLanguageTag(locale: Locale): string {
  return languageTags[locale];
}

export function detectLocaleFromHeaders(headers: Headers): Locale {
  const country =
    headers.get("x-vercel-ip-country") ??
    headers.get("cf-ipcountry") ??
    headers.get("x-country-code") ??
    headers.get("cloudfront-viewer-country") ??
    "";

  const normalizedCountry = country.trim().toUpperCase();

  if (normalizedCountry === "IR") return "fa";
  if (normalizedCountry === "IQ") return "ar";
  if (normalizedCountry === "AZ") return "az";
  if (normalizedCountry === "TR") return "tr";
  if (normalizedCountry === "AM") return "hy";
  if (normalizedCountry === "PK") return "ur";
  if (normalizedCountry === "TM") return "tk";

  const acceptLanguage = headers.get("accept-language")?.toLowerCase() ?? "";

  if (acceptLanguage.includes("fa")) return "fa";
  if (acceptLanguage.includes("ar")) return "ar";
  if (acceptLanguage.includes("az")) return "az";
  if (acceptLanguage.includes("tr")) return "tr";
  if (acceptLanguage.includes("hy")) return "hy";
  if (acceptLanguage.includes("ur")) return "ur";
  if (acceptLanguage.includes("tk")) return "tk";

  return "en";
}