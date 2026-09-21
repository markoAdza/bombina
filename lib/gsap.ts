"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";

// Plugins only make sense in the browser, and registering them repeatedly
// across hot reloads is noise — a module-level flag keeps it to once.
let registered = false;
if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(ScrollTrigger, Observer, useGSAP);
  registered = true;
}

/**
 * Shared motion language. The big horizontal slide and the small hover
 * states pull from the same numbers so the site feels like one object.
 */
export const MOTION = {
  /** Matches --ease-slide in globals.css. */
  slide: "power3.inOut",
  soft: "power2.out",
  enter: 0.9,
  stagger: 0.08,
} as const;

/** The breakpoint at which the pinned horizontal track engages. */
export const TRACK_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, Observer, useGSAP };
