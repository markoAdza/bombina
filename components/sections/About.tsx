import Image from "next/image";
import { Panel } from "@/components/slides/Panel";
import { ParallaxLayer } from "@/components/slides/ParallaxLayer";
import { TornPhoto } from "@/components/slides/TornEdge";
import type { Dictionary } from "@/content/i18n";

/**
 * Chapter two — who is behind the bistro.
 *
 * The hand-painted invitation by the door is the best thing they own, so it
 * gets the photograph; the portrait of Urh and Barbara sits over the tear as
 * a near layer, which gives the panel real depth as it travels.
 */
export function About({ dict }: { dict: Dictionary }) {
  return (
    <Panel id="o-nas" label={dict.navStory} className="bg-paper">
      <ParallaxLayer
        depth={0.8}
        className="relative h-[48svh] w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-[46%]"
      >
        <TornPhoto
          src="/images/about-wall.webp"
          alt={dict.wallQuote}
          tear={1}
          sizes="(min-width: 1024px) 46vw, 100vw"
          objectPosition="50% 46%"
          className="h-full w-full"
        />
      </ParallaxLayer>

      {/* The painted quote, set over the photograph it was taken from. */}
      <ParallaxLayer
        depth={-0.2}
        className="absolute inset-x-7 top-[30svh] z-10 lg:inset-x-auto lg:top-auto lg:bottom-[14%] lg:left-[6%] lg:w-[24rem]"
      >
        <figure className="max-w-[22rem] bg-straw px-6 py-5 shadow-[0_18px_40px_-24px_rgba(22,19,15,0.55)]">
          <blockquote className="font-display text-[1.25rem] leading-snug text-ink">
            {dict.wallQuote}
          </blockquote>
          <figcaption className="mt-2 text-[0.6875rem] uppercase tracking-[0.16em] text-ink/55">
            {dict.wallQuoteNote}
          </figcaption>
        </figure>
      </ParallaxLayer>

      <ParallaxLayer
        depth={-0.6}
        className="relative z-20 px-7 pt-20 pb-16 sm:px-10 lg:absolute lg:inset-y-0 lg:right-0 lg:flex lg:w-[44%] lg:items-center lg:px-0 lg:pr-16 lg:pt-0 lg:pb-0 xl:pr-24"
      >
        <div className="max-w-[32rem]">
          <p className="kicker">{dict.aboutKicker}</p>
          <h2 className="mt-5 text-[2rem] leading-[1.1] sm:text-[2.5rem]">{dict.aboutTitle}</h2>

          <div className="mt-6 space-y-4 text-[0.9375rem] leading-relaxed text-ink-soft">
            <p>{dict.aboutBody1}</p>
            <p>{dict.aboutBody2}</p>
          </div>

          <div className="mt-8 flex items-start gap-5 border-t border-ink/12 pt-7">
            <Image
              src="/images/owners.webp"
              alt=""
              width={1279}
              height={959}
              sizes="160px"
              className="hidden w-[10rem] shrink-0 object-cover sm:block"
            />
            <div>
              <h3 className="font-display text-[1.0625rem] text-ink">{dict.aboutNameTitle}</h3>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">
                {dict.aboutNameBody}
              </p>
            </div>
          </div>
        </div>
      </ParallaxLayer>
    </Panel>
  );
}
