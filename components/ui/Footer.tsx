import Image from "next/image";
import { site } from "@/content/site";
import type { Dictionary, Locale } from "@/content/i18n";
import { LocaleSwitch } from "./LocaleSwitch";

const LINKS = [
  { href: "#jedilnik", key: "navMenu" },
  { href: "#mnenja", key: "navReviews" },
  { href: "#catering", key: "navCatering" },
  { href: "#kontakt", key: "navContact" },
] as const;

export function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <footer className="bg-ink px-7 pt-20 pb-10 text-paper sm:px-10">
      <div className="mx-auto max-w-[76rem]">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Image
              src="/images/wordmark-light.png"
              alt={site.name}
              width={709}
              height={329}
              className="w-[8.5rem]"
            />
            <p className="mt-6 max-w-[22rem] text-[0.875rem] leading-relaxed text-paper/60">
              {dict.footerTagline}
            </p>
          </div>

          <nav aria-label={dict.navMenu} className="flex flex-col gap-3">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[0.8125rem] uppercase tracking-[0.14em] text-paper/70 transition-colors hover:text-paper"
              >
                {dict[link.key]}
              </a>
            ))}
          </nav>

          <div className="space-y-4 text-[0.875rem] text-paper/70">
            <address className="not-italic leading-relaxed">
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
            </address>
            <p>
              <a href={`tel:${site.phone.href}`} className="transition-colors hover:text-paper">
                {site.phone.display}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-paper">
                {site.email}
              </a>
            </p>

            <div className="flex gap-4 pt-1">
              <span className="sr-only">{dict.footerFollow}</span>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-[0.8125rem] uppercase tracking-[0.14em] text-paper/70 transition-colors hover:text-paper"
              >
                Instagram
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="text-[0.8125rem] uppercase tracking-[0.14em] text-paper/70 transition-colors hover:text-paper"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-paper/12 pt-6 text-[0.75rem] text-paper/45">
          <p>
            © {new Date().getFullYear()} {site.name}. {dict.footerRights}
          </p>
          <LocaleSwitch locale={locale} className="text-paper/60 hover:text-paper" />
        </div>
      </div>
    </footer>
  );
}
