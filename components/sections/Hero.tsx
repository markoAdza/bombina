import Image from "next/image";
import { Panel } from "@/components/slides/Panel";
import { ParallaxLayer } from "@/components/slides/ParallaxLayer";
import { TornPhoto } from "@/components/slides/TornEdge";
import { CtaButton } from "@/components/ui/CtaButton";
import { site } from "@/content/site";
import type { Dictionary } from "@/content/i18n";

/**
 * Chapter one.
 *
 * The photograph fills the left of the viewport and tears away at its
 * trailing edge; the wordmark and the invitation sit on the paper beyond it.
 * As the track advances, the tear sweeps right to left across the screen and
 * hands over to the next chapter — the move the whole design is built around.
 */
export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <Panel id="domov" label={dict.navHome} className="bg-paper">
      {/* Distant layer: the photograph lags behind the track. */}
      <ParallaxLayer
        depth={0.8}
        className="relative h-[54svh] w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-[52%]"
      >
        <TornPhoto
          src="/images/hero-plate.webp"
          alt=""
          tear={0}
          priority
          sizes="(min-width: 1024px) 52vw, 100vw"
          objectPosition="50% 45%"
          className="h-full w-full"
        />
      </ParallaxLayer>

      {/* Near layer: the invitation leads the slide. */}
      <ParallaxLayer
        depth={-0.55}
        className="relative z-10 px-7 pt-12 pb-16 sm:px-10 lg:absolute lg:inset-y-0 lg:right-0 lg:flex lg:w-[42%] lg:items-center lg:px-0 lg:pr-16 lg:pb-0 xl:pr-24"
      >
        <div className="max-w-[30rem]">
          <p className="kicker">{dict.heroKicker}</p>

          <h1 className="mt-6">
            <span className="sr-only">{site.name}</span>
            <Image
              src="/images/wordmark.png"
              alt=""
              width={709}
              height={329}
              priority
              className="w-[15rem] max-w-full sm:w-[17rem] lg:w-[19rem]"
            />
          </h1>

          <p className="mt-8 font-display text-[1.375rem] leading-[1.35] text-ink sm:text-[1.5rem]">
            {dict.heroLead}
          </p>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{dict.heroSub}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <CtaButton href={`tel:${site.phone.href}`}>{dict.ctaReserve}</CtaButton>
            <CtaButton href="#jedilnik" variant="outline">
              {dict.ctaMenu}
            </CtaButton>
          </div>
        </div>
      </ParallaxLayer>

      {/* Foreground accent: travels fastest, so it reads as closest. */}
      <ParallaxLayer
        depth={-1}
        className="pointer-events-none absolute bottom-10 left-7 z-10 hidden lg:bottom-24 lg:left-[6%] lg:block"
      >
        <p className="vertical-text rotate-180 text-[0.6875rem] uppercase tracking-[0.3em] text-paper/70">
          {dict.heroScroll}
        </p>
      </ParallaxLayer>
    </Panel>
  );
}
