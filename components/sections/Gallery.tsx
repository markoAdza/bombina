import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

/** The plates, without commentary. */
const PLATES = [
  { src: "/images/dish-01.webp", span: "md:col-span-2 md:row-span-2" },
  { src: "/images/dish-03.webp", span: "" },
  { src: "/images/dish-02.webp", span: "" },
  { src: "/images/dish-04.webp", span: "" },
  { src: "/images/dish-05.webp", span: "" },
];

export function Gallery() {
  return (
    <Reveal className="bg-paper px-7 pb-24 sm:px-10 lg:pb-32">
      <div className="mx-auto grid max-w-[68rem] auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] md:grid-cols-4 md:auto-rows-[10rem]">
        {PLATES.map((plate, index) => (
          <div
            key={plate.src}
            data-reveal
            className={`relative overflow-hidden ${plate.span}`}
          >
            <Image
              src={plate.src}
              alt=""
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-[900ms] ease-[var(--ease-soft)] hover:scale-[1.04]"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
    </Reveal>
  );
}
