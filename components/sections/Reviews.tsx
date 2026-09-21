"use client";

import { useCallback, useRef, useState } from "react";
import { gsap, useGSAP, Observer, MOTION } from "@/lib/gsap";
import { reviews } from "@/content/reviews";
import type { Dictionary, Locale } from "@/content/i18n";

/**
 * Guest reviews, as a slider.
 *
 * Deliberately the same gesture as the chapter track — cards travel sideways
 * with the same easing — so the motif carries through the vertical half of
 * the page at a smaller scale. Drag, swipe, the arrow keys and the buttons
 * all drive the same index.
 */
export function Reviews({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [index, setIndex] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const last = reviews.length - 1;

  const go = useCallback(
    (next: number) => setIndex(Math.max(0, Math.min(last, next))),
    [last],
  );

  // Move the track whenever the index changes.
  useGSAP(
    () => {
      if (!trackRef.current) return;
      gsap.to(trackRef.current, {
        xPercent: -100 * index,
        duration: 0.85,
        ease: MOTION.slide,
      });
    },
    { dependencies: [index] },
  );

  // Pointer and touch dragging. `lockAxis` keeps vertical page scrolling
  // working normally — only a clearly horizontal drag is captured.
  useGSAP(() => {
    if (!viewportRef.current) return;
    const observer = Observer.create({
      target: viewportRef.current,
      type: "touch,pointer",
      lockAxis: true,
      dragMinimum: 18,
      tolerance: 46,
      onLeft: () => setIndex((current) => Math.min(last, current + 1)),
      onRight: () => setIndex((current) => Math.max(0, current - 1)),
    });
    return () => observer.kill();
  }, []);

  return (
    <section id="mnenja" className="scroll-mt-24 overflow-hidden bg-paper-deep px-7 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto max-w-[68rem]">
        <header className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="kicker">{dict.reviewsKicker}</p>
            <h2 className="mt-5 text-[2.25rem] leading-[1.05] sm:text-[3rem]">
              {dict.reviewsTitle}
            </h2>
          </div>

          <div className="flex gap-2">
            <SliderButton
              label={dict.reviewsPrev}
              disabled={index === 0}
              onClick={() => go(index - 1)}
              direction="prev"
            />
            <SliderButton
              label={dict.reviewsNext}
              disabled={index === last}
              onClick={() => go(index + 1)}
              direction="next"
            />
          </div>
        </header>

        <div
          ref={viewportRef}
          role="group"
          aria-roledescription="carousel"
          aria-label={dict.reviewsKicker}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") go(index + 1);
            if (event.key === "ArrowLeft") go(index - 1);
          }}
          className="mt-12 cursor-grab touch-pan-y overflow-hidden active:cursor-grabbing"
        >
          <div ref={trackRef} className="flex">
            {reviews.map((review, position) => (
              <figure
                key={review.author}
                aria-hidden={position !== index}
                className="w-full shrink-0 pr-0 md:pr-24"
              >
                <blockquote className="font-display text-[1.1875rem] leading-[1.6] text-ink sm:text-[1.4375rem] sm:leading-[1.55]">
                  <span aria-hidden="true" className="mr-1 text-terracotta">
                    &ldquo;
                  </span>
                  {review[locale]}
                  <span aria-hidden="true" className="text-terracotta">
                    &rdquo;
                  </span>
                </blockquote>
                <figcaption className="mt-7 text-[0.8125rem] uppercase tracking-[0.16em] text-ink-soft">
                  {review.author}
                  {review.origin && <span className="text-ink-faint"> · {review.origin}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <ol className="mt-10 flex gap-2">
          {reviews.map((review, position) => (
            <li key={review.author}>
              <button
                type="button"
                onClick={() => go(position)}
                aria-label={review.author}
                aria-current={position === index ? "true" : undefined}
                className="grid size-6 place-items-center"
              >
                <span
                  className={`block h-px w-6 transition-colors duration-400 ${
                    position === index ? "bg-terracotta" : "bg-ink/25"
                  }`}
                />
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function SliderButton({
  label,
  onClick,
  disabled,
  direction,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  direction: "prev" | "next";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid size-11 place-items-center rounded-full border border-ink/20 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-30"
    >
      <svg width="15" height="12" viewBox="0 0 15 12" fill="none" aria-hidden="true">
        <path
          d={direction === "next" ? "M1 6h12m0 0L8.5 1.5M13 6l-4.5 4.5" : "M14 6H2m0 0L6.5 1.5M2 6l4.5 4.5"}
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
