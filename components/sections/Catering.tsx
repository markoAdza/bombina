import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import { site } from "@/content/site";
import type { Dictionary } from "@/content/i18n";

export function Catering({ dict }: { dict: Dictionary }) {
  return (
    <section id="catering" className="scroll-mt-24 bg-olive text-paper">
      <Reveal className="mx-auto grid max-w-[76rem] items-center gap-12 px-7 py-24 sm:px-10 lg:grid-cols-[1fr_0.8fr] lg:gap-20 lg:py-32">
        <div data-reveal className="max-w-[34rem]">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-straw">
            {dict.cateringKicker}
          </p>
          <h2 className="mt-5 text-[2.25rem] leading-[1.05] sm:text-[3rem]">
            {dict.cateringTitle}
          </h2>
          <p className="mt-6 text-[0.9375rem] leading-relaxed text-paper/75">
            {dict.cateringBody}
          </p>
          <CtaButton
            href={`mailto:${site.email}?subject=${encodeURIComponent("Catering")}`}
            variant="light"
            className="mt-9"
          >
            {dict.cateringCta}
          </CtaButton>
        </div>

        <div data-reveal className="relative aspect-3/4 w-full max-w-[26rem] lg:justify-self-end">
          <Image
            src="/images/catering.webp"
            alt=""
            fill
            sizes="(min-width: 1024px) 26rem, 90vw"
            className="object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}
