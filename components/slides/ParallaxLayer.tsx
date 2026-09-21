"use client";

import type { ReactNode } from "react";
import { useParallaxLayer } from "./HorizontalChapters";

type Props = {
  /**
   * Travel rate relative to the track. Positive lags (distant), negative
   * leads (close). See useParallaxLayer for the values measured off the
   * reference animation.
   */
  depth: number;
  children: ReactNode;
  className?: string;
};

/**
 * Gives its subtree its own speed through the horizontal slide.
 *
 * Note: GSAP writes to this element's `transform`, so never put a Tailwind
 * translate/rotate/scale class on a ParallaxLayer — it would be overwritten
 * once the track is built. Position it with insets, or transform an inner
 * element instead.
 */
export function ParallaxLayer({ depth, children, className = "" }: Props) {
  const ref = useParallaxLayer<HTMLDivElement>(depth);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
