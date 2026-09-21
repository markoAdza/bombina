"use client";

import { useSyncExternalStore } from "react";
import { getActiveChapter, goToChapter, subscribeChapter } from "@/lib/chapter-track";

/**
 * The bar along the bottom of the chapter track: one dot per panel, the
 * current panel's name, and a rule that fills as the track advances.
 *
 * It is positioned against the pinned element, not the window, so it appears
 * and disappears with the track for free — see the note at its call site.
 * Hidden below `lg`, where the panels stack and ordinary scrolling applies.
 */
export function SlideProgress({ labels }: { labels: string[] }) {
  const active = useSyncExternalStore(subscribeChapter, getActiveChapter, () => 0);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 hidden lg:block motion-reduce:lg:hidden">
      {/*
        Anchored right. All three chapters put paper on that side, so the
        counter and dots always have something quiet to sit on — a full-width
        bar would run straight across the photographs.
      */}
      <div className="mx-auto flex max-w-[110rem] items-center justify-end gap-5 px-10 pb-7">
        <div className="h-px w-24 bg-ink/12">
          <div data-progress-bar className="h-px origin-left scale-x-0 bg-ink/45" />
        </div>

        <ol className="order-last flex items-center gap-2 pointer-events-auto">
          {labels.map((label, index) => (
            <li key={label}>
              <button
                type="button"
                onClick={() => goToChapter(index)}
                aria-label={label}
                aria-current={index === active ? "true" : undefined}
                className="group grid size-7 place-items-center"
              >
                <span
                  className={`block size-[7px] rounded-full transition-all duration-500 ease-[var(--ease-soft)] ${
                    index === active
                      ? "scale-125 bg-terracotta"
                      : "bg-ink/25 group-hover:bg-ink/50"
                  }`}
                />
              </button>
            </li>
          ))}
        </ol>

        <p className="font-display text-sm text-ink-soft tabular-nums">
          <span className="text-ink-faint">
            {String(active + 1).padStart(2, "0")} / {String(labels.length).padStart(2, "0")}
          </span>
          <span className="mx-3 text-ink-faint">·</span>
          {labels[active]}
        </p>

      </div>
    </div>
  );
}
