import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/content/i18n";
import { site } from "@/content/site";

import { TornEdgeDefs } from "@/components/slides/TornEdge";
import { HorizontalChapters } from "@/components/slides/HorizontalChapters";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { NoticeBar } from "@/components/ui/NoticeBar";

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Sporhet } from "@/components/sections/Sporhet";
import { Menu } from "@/components/sections/Menu";
import { Gallery } from "@/components/sections/Gallery";
import { Reviews } from "@/components/sections/Reviews";
import { Catering } from "@/components/sections/Catering";
import { Contact } from "@/components/sections/Contact";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      {/* Clip-path definitions for every torn panel, declared once. */}
      <TornEdgeDefs />

      <NoticeBar dict={dict} />
      <Header dict={dict} locale={locale} />

      <main>
        {/*
          The three story panels. On wide screens this pins and travels
          sideways; below `lg`, or under reduced motion, the same markup is
          simply three stacked sections.
        */}
        <HorizontalChapters labels={[dict.navHome, dict.navStory, dict.sporhetTitle]}>
          <Hero dict={dict} />
          <About dict={dict} />
          <Sporhet dict={dict} locale={locale} />
        </HorizontalChapters>

        {/* From here down the page scrolls normally. */}
        <Menu dict={dict} locale={locale} />
        <Gallery />
        <Reviews dict={dict} locale={locale} />
        <Catering dict={dict} />
        <Contact dict={dict} />
      </main>

      <Footer dict={dict} locale={locale} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema(locale)) }}
      />
    </>
  );
}

/** Structured data, so search engines show the address and phone directly. */
function restaurantSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    url: `${site.url}/${locale}`,
    telephone: site.phone.href,
    email: site.email,
    servesCuisine: locale === "sl" ? "Sodobna evropska" : "Modern European",
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.address.lat,
      longitude: site.address.lon,
    },
    sameAs: [site.social.facebook, site.social.instagram],
  };
}
