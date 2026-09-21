"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, ScrollTrigger, MOTION } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  className?: string;
  /** Distance in pixels each child rises through. */
  y?: number;
  stagger?: number;
};

/**
 * Fades its `[data-reveal]` descendants up as they enter the viewport.
 *
 * Used for the vertical half of the page, so the sections below the chapter
 * track arrive with the same unhurried easing as the slide itself rather than
 * simply appearing.
 *
 * The initial `gsap.set` runs inside a layout effect, before the browser
 * paints, so there is no flash of positioned-then-hidden content. If the
 * visitor prefers reduced motion nothing is set at all and the markup renders
 * exactly as the server sent it.
 */
export function Reveal({ children, className = "", y = 26, stagger = MOTION.stagger }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]", ref.current);
        if (!targets.length) return;

        gsap.set(targets, { opacity: 0, y });

        ScrollTrigger.batch(targets, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: MOTION.enter,
              ease: MOTION.soft,
              stagger,
            }),
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
