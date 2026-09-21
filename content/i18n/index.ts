import { sl, type Dictionary } from "./sl";
import { en } from "./en";

export const locales = ["sl", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "sl";

const dictionaries: Record<Locale, Dictionary> = { sl, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** The opposite locale, for the header toggle. */
export function otherLocale(locale: Locale): Locale {
  return locale === "sl" ? "en" : "sl";
}

export type { Dictionary };
