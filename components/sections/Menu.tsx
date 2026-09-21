"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";
import { menus } from "@/content/menu";
import { MenuItem } from "./MenuItem";
import type { Dictionary, Locale } from "@/content/i18n";

/**
 * The menus.
 *
 * Switching tabs slides the card in from the right with the same easing the
 * chapter track uses, so the small interaction is recognisably part of the
 * same design rather than a generic fade.
 */
export function Menu({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const tablistRef = useRef<HTMLDivElement>(null);
  const menu = menus[active];

  /**
   * The tabs pattern expects the arrow keys to move between tabs while Tab
   * itself leaves the tablist. Focus follows selection, which is the right
   * choice here because switching is instant and has no cost.
   */
  const onTablistKeyDown = (event: React.KeyboardEvent) => {
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();

    const next = (active + delta + menus.length) % menus.length;
    setActive(next);
    tablistRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  useGSAP(
    () => {
      if (!panelRef.current) return;
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, x: 34 },
        { opacity: 1, x: 0, duration: 0.55, ease: MOTION.soft },
      );
    },
    { dependencies: [active], scope: panelRef },
  );

  return (
    <section id="jedilnik" className="scroll-mt-24 bg-paper px-7 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto max-w-[68rem]">
        <header className="max-w-[34rem]">
          <p className="kicker">{dict.menuKicker}</p>
          <h2 className="mt-5 text-[2.25rem] leading-[1.05] sm:text-[3rem]">{dict.menuTitle}</h2>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-soft">{dict.menuIntro}</p>
        </header>

        {/* Tabs, with roving tabindex — see onTablistKeyDown. */}
        <div
          ref={tablistRef}
          role="tablist"
          aria-label={dict.menuKicker}
          onKeyDown={onTablistKeyDown}
          className="mt-12 flex flex-wrap gap-2"
        >
          {menus.map((item, index) => {
            const selected = index === active;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={selected}
                aria-controls={`panel-${item.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                className={`rounded-full px-5 py-3 text-left transition-colors duration-300 ease-[var(--ease-soft)] ${
                  selected
                    ? "bg-ink text-paper"
                    : "border border-ink/15 text-ink hover:border-ink/45"
                }`}
              >
                <span className="block text-[0.8125rem] font-medium uppercase tracking-[0.12em]">
                  {dict[item.labelKey as keyof Dictionary]}
                </span>
                <span
                  className={`mt-0.5 block text-[0.75rem] ${
                    selected ? "text-paper/60" : "text-ink-faint"
                  }`}
                >
                  {dict[item.whenKey as keyof Dictionary]}
                </span>
              </button>
            );
          })}
        </div>

        <div
          ref={panelRef}
          role="tabpanel"
          id={`panel-${menu.id}`}
          aria-labelledby={`tab-${menu.id}`}
          className="mt-12"
        >
          {menu.period && (
            <p className="mb-8 text-[0.8125rem] uppercase tracking-[0.18em] text-terracotta">
              {menu.period}
            </p>
          )}

          {/* The weekly card has a single section; two columns would leave
              half the page empty, so the grid only splits when there is
              genuinely something to put in the second column. */}
          <div
            className={`grid gap-x-16 gap-y-12 ${
              menu.sections.length > 1 ? "md:grid-cols-2" : "max-w-[40rem]"
            }`}
          >
            {menu.sections.map((section) => (
              <div key={section.key} className="break-inside-avoid">
                <h3 className="border-b border-ink pb-3 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-ink">
                  {dict[section.key as keyof Dictionary]}
                </h3>
                <ul className="divide-y divide-ink/10">
                  {section.dishes.map((dish) => (
                    <MenuItem key={dish.sl} dish={dish} dict={dict} locale={locale} />
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-12 max-w-[34rem] text-[0.8125rem] leading-relaxed text-ink-faint italic">
            {dict.allergensNote}
          </p>
        </div>
      </div>
    </section>
  );
}
