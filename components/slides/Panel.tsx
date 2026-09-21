import type { ReactNode } from "react";

type Props = {
  id: string;
  /** Announced to screen readers as the section name. */
  label: string;
  children: ReactNode;
  className?: string;
};

/**
 * One chapter of the horizontal track.
 *
 * Wide screens: exactly one viewport tall. It takes a full viewport of width
 * too, but only when the track is actually going to animate — under reduced
 * motion the panels stack vertically instead, at the container's width.
 *
 * Narrow screens: a normal stacked section that grows with its content, so
 * nothing is ever clipped on a phone.
 */
export function Panel({ id, label, children, className = "" }: Props) {
  return (
    <section
      id={id}
      aria-label={label}
      className={`relative w-full shrink-0 overflow-hidden lg:h-svh motion-safe:lg:w-screen ${className}`}
    >
      {children}
    </section>
  );
}
