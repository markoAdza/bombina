"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import { gsap, useGSAP, TRACK_QUERY } from "@/lib/gsap";
import { registerTrack, setActiveChapter } from "@/lib/chapter-track";
import { SlideProgress } from "./SlideProgress";

/* ------------------------------------------------------------------
   Layer registration

   A panel's layers register themselves with the track on mount. Child
   layout effects run before the parent's, so by the time the timeline is
   built every layer on the page has already reported in.
   ------------------------------------------------------------------ */

type LayerEntry = { el: HTMLElement; depth: number };
type RegisterFn = (entry: LayerEntry) => () => void;

const LayerContext = createContext<RegisterFn | null>(null);

/**
 * Attach to an element to give it its own travel rate through the slide.
 *
 * `depth` is a multiplier on the track's own movement:
 *   +1.0  far background — lags well behind, feels distant
 *    0    locked to the track
 *   -1.0  foreground — leads the slide, feels close to the viewer
 *
 * Rates measured off the reference animation: background photography sits
 * around +0.8, mid-ground props +0.3, content cards -0.6, accent blocks -1.0.
 */
export function useParallaxLayer<T extends HTMLElement>(depth: number) {
  const register = useContext(LayerContext);
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    if (!register || !ref.current) return;
    return register({ el: ref.current, depth });
  }, [register, depth]);

  return ref;
}

/* ------------------------------------------------------------------
   The track
   ------------------------------------------------------------------ */

/** How far, as a share of the viewport, a depth of 1.0 shifts a layer. */
const DEPTH_TRAVEL = 16;

type Props = {
  children: ReactNode;
  /** Short labels for the progress dots, in panel order. */
  labels: string[];
};

export function HorizontalChapters({ children, labels }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const layers = useRef<Set<LayerEntry>>(new Set());

  const count = labels.length;

  const register = useCallback<RegisterFn>((entry) => {
    layers.current.add(entry);
    return () => {
      layers.current.delete(entry);
    };
  }, []);

  useGSAP(
    () => {
      // matchMedia is what keeps this honest: below 1024px, or when the
      // visitor has asked for reduced motion, the timeline is never built
      // and GSAP fully reverts the DOM it touched.
      const mm = gsap.matchMedia();

      mm.add(TRACK_QUERY, () => {
        const track = trackRef.current;
        const viewport = viewportRef.current;
        if (!track || !viewport) return;

        const travel = () => -(count - 1) * window.innerWidth;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: viewport,
            start: "top top",
            // One viewport height of scrolling buys one panel of travel.
            end: () => `+=${(count - 1) * window.innerHeight}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            // A little scrub lag is what gives the slide its weight; this
            // is the single number that most changes how the effect feels.
            scrub: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: 1 / (count - 1),
              duration: { min: 0.15, max: 0.4 },
              // Long enough that the snap waits for the visitor to stop
              // scrolling instead of grabbing mid-flick.
              delay: 0.3,
              ease: "power2.inOut",
              // Snap to the nearest panel, never to where the flick was
              // heading. Without this a fast scroll skips chapters entirely.
              inertia: false,
            },
            onUpdate: (self) => {
              setActiveChapter(Math.round(self.progress * (count - 1)));
            },
          },
        });

        // The track itself. Everything else is measured against this.
        tl.to(track, { x: travel, ease: "none" }, 0);

        // Depth. Each layer rides the same timeline but covers a different
        // distance, so the panels separate as they move instead of sliding
        // past as one flat sheet.
        //
        // Crucially, a layer's offset is measured from the moment its own
        // panel is centred, not from the start of the track. Without that,
        // panels two and three would sit permanently displaced by whatever
        // parallax had accumulated by the time they arrived — the layout
        // would only ever be correct for the first chapter.
        const panels = Array.from(track.children) as HTMLElement[];

        layers.current.forEach(({ el, depth }) => {
          if (depth === 0) return;

          const panel = el.closest("section");
          const index = panel ? Math.max(0, panels.indexOf(panel as HTMLElement)) : 0;
          const settle = index / (count - 1);

          tl.fromTo(
            el,
            { xPercent: -depth * DEPTH_TRAVEL * settle },
            { xPercent: depth * DEPTH_TRAVEL * (1 - settle), ease: "none" },
            0,
          );
        });

        // Drive the progress rule in the footer bar off the same timeline.
        const bar = rootRef.current?.querySelector<HTMLElement>("[data-progress-bar]");
        if (bar) tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);

        const scrollTrigger = tl.scrollTrigger;

        registerTrack({
          count,
          goTo: (index) => {
            if (!scrollTrigger) return;
            const clamped = Math.max(0, Math.min(count - 1, index));
            const span = scrollTrigger.end - scrollTrigger.start;
            window.scrollTo({
              top: scrollTrigger.start + (span * clamped) / (count - 1),
              behavior: "smooth",
            });
          },
        });

        return () => {
          registerTrack(null);
          setActiveChapter(0);
        };
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [count] },
  );

  return (
    <LayerContext.Provider value={register}>
      <div ref={rootRef} className="relative">
        {/* The element that gets pinned. GSAP inserts the scroll spacer
            around it, so no manual tall wrapper is needed. */}
        {/*
          The row layout is gated on `motion-safe` as well as `lg`, matching
          TRACK_QUERY exactly. Gating it on width alone would lay the chapters
          out side by side for a reduced-motion visitor while the timeline that
          moves them was never built — chapters two and three would sit clipped
          off-screen with no way to reach them.
        */}
        <div
          ref={viewportRef}
          className="relative motion-safe:lg:h-svh motion-safe:lg:overflow-hidden"
        >
          {/* Vertical stack on small screens, a single long row on wide
              ones. `w-max` lets the row grow to count × 100vw. */}
          <div
            ref={trackRef}
            className="flex w-full flex-col motion-safe:lg:h-svh motion-safe:lg:w-max motion-safe:lg:flex-row"
          >
            {children}
          </div>

          {/*
            Anchored to the pinned element rather than the window. While the
            track is pinned this sits at the bottom of the screen; the moment
            the track lets go it scrolls away with the last panel. No state,
            no scroll listener, nothing to keep in sync.
          */}
          <SlideProgress labels={labels} />
        </div>
      </div>
    </LayerContext.Provider>
  );
}
