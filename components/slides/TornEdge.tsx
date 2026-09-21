import Image from "next/image";
import { TEARS, TEARS_BOTTOM } from "@/lib/torn";

/**
 * The clip paths every torn panel references. Rendered once, near the top of
 * <body>, so a single copy serves the whole page.
 *
 * `clipPathUnits="objectBoundingBox"` means the geometry is expressed from
 * 0 to 1 and stretches to whatever box it is applied to — the tear stays
 * sharp at any viewport size and at any zoom level, because it is vector.
 */
export function TornEdgeDefs() {
  return (
    <svg aria-hidden="true" focusable="false" className="pointer-events-none absolute h-0 w-0">
      <defs>
        {TEARS.map((tear) => (
          <g key={tear.id}>
            <clipPath id={tear.id} clipPathUnits="objectBoundingBox">
              <path d={tear.d} />
            </clipPath>
            <clipPath id={`${tear.id}-lip`} clipPathUnits="objectBoundingBox">
              <path d={tear.lip} />
            </clipPath>
          </g>
        ))}
        {TEARS_BOTTOM.map((tear) => (
          <g key={tear.id}>
            <clipPath id={tear.id} clipPathUnits="objectBoundingBox">
              <path d={tear.d} />
            </clipPath>
            <clipPath id={`${tear.id}-lip`} clipPathUnits="objectBoundingBox">
              <path d={tear.lip} />
            </clipPath>
          </g>
        ))}
      </defs>
    </svg>
  );
}

/**
 * Class pairs defined in globals.css. Kept as a literal table so the tear a
 * panel uses can be chosen at runtime without building class names.
 */
const TEAR_CLASS = [
  { photo: "tear-a", lip: "tear-a-lip" },
  { photo: "tear-b", lip: "tear-b-lip" },
  { photo: "tear-c", lip: "tear-c-lip" },
] as const;

type TornPhotoProps = {
  src: string;
  alt: string;
  /** Which of the three tears to use. Each panel gets a different rip. */
  tear: 0 | 1 | 2;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Horizontal focus of the crop, e.g. "50% 30%". */
  objectPosition?: string;
};

/**
 * A photograph with a ripped edge.
 *
 * Two stacked layers do the work: a paper-coloured shape behind, clipped a
 * few pixels proud of the photo, and the photo itself in front. The sliver of
 * pale paper that shows along the tear is the fibrous underside of the sheet,
 * and it is the detail that stops the mask reading as a wavy crop.
 *
 * On wide screens the tear runs down the trailing edge, matching the
 * horizontal slide. Below `lg` the panels stack vertically, so it rotates to
 * the bottom edge instead.
 */
export function TornPhoto({
  src,
  alt,
  tear,
  priority = false,
  sizes = "(min-width: 1024px) 55vw, 100vw",
  className = "",
  objectPosition = "50% 50%",
}: TornPhotoProps) {
  const { photo, lip } = TEAR_CLASS[tear];

  return (
    <div className={`relative isolate ${className}`}>
      {/* Torn underside of the sheet. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-paper-dark ${lip}`}
      />

      {/* The photograph, clipped just inside the lip. */}
      <div className={`absolute inset-0 ${photo}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition }}
        />
        {/* Warms the shadows so photographs of very different exposure still
            sit together on the same paper. */}
        <div className="absolute inset-0 bg-ink/10 mix-blend-multiply" />
        <div className="grain-layer absolute inset-0" />
      </div>
    </div>
  );
}

/**
 * A flat colour field with the same ripped edge — the deep-olive panel that
 * anchors the seasonal chapter. Identical geometry to TornPhoto so a solid
 * block and a photograph tear the same way as they slide past each other.
 */
export function TornBlock({
  tear,
  className = "",
  children,
}: {
  tear: 0 | 1 | 2;
  className?: string;
  children?: React.ReactNode;
}) {
  const { photo, lip } = TEAR_CLASS[tear];

  return (
    <div className={`relative isolate ${className}`}>
      <div aria-hidden="true" className={`absolute inset-0 bg-paper-dark ${lip}`} />
      <div className={`absolute inset-0 bg-olive ${photo}`}>
        <div className="grain-layer absolute inset-0 opacity-25" />
      </div>
      {children}
    </div>
  );
}
