"use client";

import { useState } from "react";
import { site } from "@/content/site";
import type { Dictionary } from "@/content/i18n";

/**
 * Replaces the ad-hoc "OBVESTILO" posts the old site pinned to its homepage.
 * Publish one by flipping `notice.active` in content/site.ts and editing the
 * `notice*` keys in both dictionaries.
 */
export function NoticeBar({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState(true);

  if (!site.notice.active || !open) return null;

  return (
    <div className="relative z-50 bg-ink px-7 py-3 text-paper sm:px-10">
      <div className="mx-auto flex max-w-[76rem] items-center gap-4">
        <p className="flex-1 text-[0.8125rem] leading-relaxed">
          <span className="mr-2 font-medium uppercase tracking-[0.16em] text-straw">
            {dict.noticeTitle}
          </span>
          {dict.noticeBody}
        </p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={dict.noticeDismiss}
          className="shrink-0 text-paper/60 transition-colors hover:text-paper"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
