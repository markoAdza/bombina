"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { goToChapter } from "@/lib/chapter-track";
import { LocaleSwitch } from "./LocaleSwitch";
import { site } from "@/content/site";
import type { Dictionary, Locale } from "@/content/i18n";

/**
 * Links into the chapter track carry a `chapter` index. Clicking one asks the
 * track to scroll there; if the track is not mounted — on a phone, or under
 * reduced motion — `goToChapter` reports false and the browser follows the
 * ordinary anchor instead. Every destination therefore works with or without
 * the animation.
 */
const NAV = [
  { href: "#domov", key: "navHome", chapter: 0 },
  { href: "#o-nas", key: "navStory", chapter: 1 },
  { href: "#sporhet", key: "navSporhet", chapter: 2 },
  { href: "#jedilnik", key: "navMenu" },
  { href: "#mnenja", key: "navReviews" },
  { href: "#catering", key: "navCatering" },
  { href: "#kontakt", key: "navContact" },
] as const;

export function Header({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Never leave the overlay open behind a closed hamburger on resize.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNav = (event: React.MouseEvent<HTMLAnchorElement>, chapter?: number) => {
    setOpen(false);
    if (chapter === undefined) return;
    if (goToChapter(chapter)) event.preventDefault();
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-[var(--ease-soft)] ${
        scrolled ? "bg-paper/92 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      {/*
        The hero photograph runs under the header, and its tones change as the
        track slides. A soft paper wash keeps the ink navigation readable over
        any frame of it without resorting to a solid bar.
      */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-paper via-paper/70 to-transparent transition-opacity duration-500 ${
          scrolled ? "opacity-0" : "opacity-100"
        }`}
      />

      <div className="relative mx-auto flex max-w-[110rem] items-center justify-between gap-6 px-7 py-5 sm:px-10">
        <a
          href="#domov"
          onClick={(event) => handleNav(event, 0)}
          className="shrink-0"
          aria-label={site.name}
        >
          <Image
            src="/images/wordmark.png"
            alt=""
            width={709}
            height={329}
            priority
            className="w-[5.5rem]"
          />
        </a>

        <nav aria-label={dict.navMenu} className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => handleNav(event, "chapter" in item ? item.chapter : undefined)}
              className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-ink transition-opacity duration-300 hover:opacity-55"
            >
              {dict[item.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <LocaleSwitch locale={locale} />

          <a
            href={`tel:${site.phone.href}`}
            className="hidden rounded-full bg-terracotta px-5 py-2.5 text-[0.75rem] font-medium uppercase tracking-[0.14em] text-paper transition-colors duration-300 hover:bg-clay sm:inline-block"
          >
            {dict.ctaReserve}
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? dict.menuClose : dict.menuOpen}
            className="grid size-9 place-items-center lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 block h-px w-5 bg-ink transition-transform duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-5 bg-ink transition-transform duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 top-0 z-40 bg-paper px-7 pt-24 transition-opacity duration-400 ease-[var(--ease-soft)] lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav aria-label={dict.navMenu} className="flex flex-col gap-1">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => handleNav(event, "chapter" in item ? item.chapter : undefined)}
              tabIndex={open ? 0 : -1}
              className="border-b border-ink/10 py-4 font-display text-[1.75rem] text-ink"
            >
              {dict[item.key]}
            </a>
          ))}
        </nav>

        <a
          href={`tel:${site.phone.href}`}
          tabIndex={open ? 0 : -1}
          className="mt-10 inline-block font-display text-[1.5rem] text-terracotta"
        >
          {site.phone.display}
        </a>
      </div>
    </header>
  );
}
