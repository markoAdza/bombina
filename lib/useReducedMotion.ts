"use client";

import { useEffect, useState } from "react";

/**
 * Reports the visitor's motion preference.
 *
 * Starts as `false` so the server-rendered markup matches the common case,
 * then corrects on mount. Components that build GSAP timelines should check
 * this *and* rely on gsap.matchMedia, which re-evaluates if the OS setting
 * changes mid-session.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
