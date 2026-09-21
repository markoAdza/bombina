import Image from "next/image";
import { Panel } from "@/components/slides/Panel";
import { ParallaxLayer } from "@/components/slides/ParallaxLayer";
import { TornBlock } from "@/components/slides/TornEdge";
import { sporhet } from "@/content/menu";
import type { Dictionary, Locale } from "@/content/i18n";

/**
 * Chapter three — the seasonal set lunch.
 *
 * A flat olive field takes the place of the photograph here, so the tear is
 * read against colour rather than an image. It is the strongest contrast on
 * the page and makes the final hand-off out of the track unmistakable.
 */
export function Sporhet({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <Panel id="sporhet" label={dict.sporhetTitle} className="bg-paper">
      <ParallaxLayer
        depth={0.8}
        className="relative h-[46svh] w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-[54%]"
      >
        <TornBlock tear={2} className="h-full w-full" />
      </ParallaxLayer>

      {/* Title, set on the olive. Mid-depth so it separates from the field
          behind it without racing the content on the paper. */}
      <ParallaxLayer
        depth={0.15}
        className="absolute top-[7svh] left-7 z-10 sm:left-10 lg:top-[16%] lg:left-[7%] lg:w-[22rem]"
      >
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-straw">
          {dict.sporhetKicker}
        </p>
        <h2 className="mt-4 max-w-[12ch] text-[2rem] leading-[1.05] text-paper sm:text-[2.6rem] lg:text-[3rem]">
          {dict.sporhetTitle}
        </h2>
        <p className="mt-4 text-[0.8125rem] uppercase tracking-[0.16em] text-paper/60">
          {sporhet.period}
        </p>
      </ParallaxLayer>

      {/* The plate, straddling the tear. */}
      <ParallaxLayer
        depth={-0.3}
        className="absolute top-[22svh] right-6 z-20 w-[8.5rem] sm:right-12 sm:w-[11rem] lg:top-[26%] lg:right-auto lg:left-[38%] lg:w-[17rem]"
      >
        <Image
          src="/images/sporhet-plate.webp"
          alt=""
          width={600}
          height={800}
          sizes="(min-width: 1024px) 272px, 176px"
          className="h-auto w-full shadow-[0_30px_60px_-30px_rgba(22,19,15,0.7)]"
        />
      </ParallaxLayer>

      {/* The menu itself, on paper. */}
      <ParallaxLayer
        depth={-0.7}
        className="relative z-10 px-7 pt-20 pb-16 sm:px-10 lg:absolute lg:inset-y-0 lg:right-0 lg:flex lg:w-[38%] lg:items-center lg:px-0 lg:pr-16 lg:pt-0 lg:pb-0 xl:pr-24"
      >
        <div className="max-w-[26rem]">
          <p className="text-[0.9375rem] leading-relaxed text-ink-soft">{dict.sporhetBody}</p>

          <ol className="mt-8 border-t border-ink/12">
            {sporhet.courses.map((course, index) => (
              <li
                key={course.sl}
                className="flex items-baseline gap-4 border-b border-ink/12 py-4"
              >
                <span className="font-display text-[0.8125rem] text-terracotta tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[1.125rem] text-ink">{course[locale]}</span>
              </li>
            ))}
          </ol>

          <p className="mt-7 font-display text-[2rem] text-ink">{sporhet.price}</p>
          <p className="mt-2 text-[0.8125rem] text-ink-faint italic">{dict.sporhetNote}</p>
        </div>
      </ParallaxLayer>
    </Panel>
  );
}
