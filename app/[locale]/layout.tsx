import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales, type Locale } from "@/content/i18n";
import { site } from "@/content/site";
import "../globals.css";

/**
 * This is the application's root layout: every route lives under a locale
 * segment, which is what lets <html lang> be correct for each language.
 * `/` is redirected to `/sl` by the rewrite in next.config.ts.
 */

const display = Fraunces({
  subsets: ["latin", "latin-ext"],
  axes: ["SOFT", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f6f1e7",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const DESCRIPTION = {
  sl: "Bistro Bombina v Trbovljah — majhna restavracija s preprosto, a kakovostno kuhinjo. Tedenska ponudba, večerna karta in sobotni brunch.",
  en: "Bistro Bombina in Trbovlje, Slovenia — a small restaurant serving simple, carefully made food. Weekly offer, evening menu and Saturday brunch.",
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} · ${site.address.city}`,
      template: `%s · ${site.name}`,
    },
    description: DESCRIPTION[locale],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        sl: "/sl",
        en: "/en",
        "x-default": "/sl",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "sl" ? "sl_SI" : "en_GB",
      siteName: site.name,
      title: `${site.name} · ${site.address.city}`,
      description: DESCRIPTION[locale],
      images: [{ url: "/images/table-wide.webp", width: 1600, height: 900 }],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale as Locale);

  return (
    <html lang={locale} className={`${display.variable} ${sans.variable}`}>
      <body className="grain">
        <a
          href="#domov"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          {dict.skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
