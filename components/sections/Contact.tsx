import { Reveal } from "@/components/ui/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import { site } from "@/content/site";
import type { Dictionary } from "@/content/i18n";

const { lat, lon } = site.address;

/** A tight box around the bistro for the embedded map. */
const BBOX = [lon - 0.004, lat - 0.002, lon + 0.004, lat + 0.002]
  .map((n) => n.toFixed(4))
  .join("%2C");

const MAP_SRC = `https://www.openstreetmap.org/export/embed.html?bbox=${BBOX}&layer=mapnik&marker=${lat}%2C${lon}`;

const DIRECTIONS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.name}, ${site.address.street}, ${site.address.postalCode} ${site.address.city}`,
)}`;

export function Contact({ dict }: { dict: Dictionary }) {
  return (
    <section id="kontakt" className="scroll-mt-24 bg-paper px-7 py-24 sm:px-10 lg:py-32">
      <Reveal className="mx-auto max-w-[76rem]">
        <header data-reveal className="max-w-[34rem]">
          <p className="kicker">{dict.contactKicker}</p>
          <h2 className="mt-5 text-[2.25rem] leading-[1.05] sm:text-[3rem]">
            {dict.contactTitle}
          </h2>
        </header>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div data-reveal className="space-y-9">
            <Field label={dict.contactAddress}>
              <address className="font-display text-[1.25rem] not-italic leading-snug text-ink">
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
              </address>
              <a
                href={DIRECTIONS}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-[0.8125rem] text-terracotta underline underline-offset-4 hover:text-clay"
              >
                {dict.contactDirections}
              </a>
            </Field>

            <Field label={dict.contactHours}>
              <dl className="space-y-1.5">
                {site.hours.map((slot) => (
                  <div key={slot.key} className="flex items-baseline gap-3">
                    <dt className="text-[0.875rem] text-ink-soft">
                      {dict[slot.key as keyof Dictionary]}
                    </dt>
                    <span aria-hidden="true" className="leader" />
                    <dd className="text-[0.875rem] text-ink tabular-nums">{slot.value}</dd>
                  </div>
                ))}
              </dl>
            </Field>

            <Field label={dict.contactPhone}>
              <a
                href={`tel:${site.phone.href}`}
                className="font-display text-[1.5rem] text-ink transition-colors hover:text-terracotta"
              >
                {site.phone.display}
              </a>
              <p className="mt-3 max-w-[24rem] text-[0.8125rem] leading-relaxed text-ink-faint">
                {dict.contactReserveNote}
              </p>
            </Field>

            <Field label={dict.contactEmail}>
              <a
                href={`mailto:${site.email}`}
                className="text-[0.9375rem] text-ink underline underline-offset-4 transition-colors hover:text-terracotta"
              >
                {site.email}
              </a>
            </Field>

            <div className="flex flex-wrap gap-3 pt-2">
              <CtaButton href={`tel:${site.phone.href}`}>{dict.ctaCall}</CtaButton>
              <CtaButton href={`mailto:${site.email}`} variant="outline">
                {dict.ctaEmail}
              </CtaButton>
            </div>
          </div>

          <div data-reveal className="relative min-h-[22rem] bg-paper-deep lg:min-h-[32rem]">
            <iframe
              src={MAP_SRC}
              title={dict.contactMapLabel}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 grayscale-[0.35]"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2.5 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-ink-faint">
        {label}
      </h3>
      {children}
    </div>
  );
}
