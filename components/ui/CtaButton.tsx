import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "light";
  className?: string;
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.8125rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300 ease-[var(--ease-soft)]";

const VARIANTS = {
  solid: "bg-terracotta text-paper hover:bg-clay",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  light: "border border-paper/35 text-paper hover:bg-paper hover:text-olive",
} as const;

/** Every call to action on the site is a link — there is no backend to post to. */
export function CtaButton({ href, children, variant = "solid", className = "" }: Props) {
  return (
    <a href={href} className={`${BASE} ${VARIANTS[variant]} ${className}`}>
      {children}
    </a>
  );
}
