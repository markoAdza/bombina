import Link from "next/link";
import { otherLocale, type Locale } from "@/content/i18n";
import { sl } from "@/content/i18n/sl";
import { en } from "@/content/i18n/en";

/**
 * Each locale is its own static route, so switching language is a plain
 * link — no client state, and the URL is shareable and indexable.
 */
export function LocaleSwitch({ locale, className = "" }: { locale: Locale; className?: string }) {
  const target = otherLocale(locale);
  const dict = locale === "sl" ? sl : en;

  return (
    <Link
      href={`/${target}`}
      hrefLang={target}
      aria-label={dict.localeSwitchLabel}
      className={`text-[0.6875rem] font-medium uppercase tracking-[0.16em] transition-opacity duration-300 hover:opacity-60 ${className}`}
    >
      {dict.localeSwitch}
    </Link>
  );
}
