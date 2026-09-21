import type { Allergen, Dish } from "@/content/menu";
import type { Dictionary, Locale } from "@/content/i18n";

/** Maps an allergen to its dictionary key, so labels translate with the page. */
const ALLERGEN_KEY: Record<Allergen, keyof Dictionary> = {
  lactose: "alLactose",
  gluten: "alGluten",
  eggs: "alEggs",
  fish: "alFish",
  nuts: "alNuts",
  sulphites: "alSulphites",
  molluscs: "alMolluscs",
  crustaceans: "alCrustaceans",
};

/**
 * One line of the menu, set the way it would be on a printed card: the dish
 * on the left, a dotted leader absorbing the slack, the price in a hard
 * right column so every price lines up regardless of name length.
 */
export function MenuItem({
  dish,
  dict,
  locale,
}: {
  dish: Dish;
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <li className="py-4">
      <div className="flex items-baseline gap-2">
        <h4 className="font-display text-[1.0625rem] leading-snug text-ink sm:text-[1.125rem]">
          {dish[locale]}
        </h4>
        <span aria-hidden="true" className="leader" />
        <span className="font-display text-[1.0625rem] text-ink tabular-nums whitespace-nowrap">
          {dish.price}
        </span>
      </div>

      {dish.allergens.length > 0 && (
        <p className="mt-1.5 text-[0.75rem] text-ink-faint">
          <span className="sr-only">{dict.allergensLabel}: </span>
          {dish.allergens.map((allergen) => dict[ALLERGEN_KEY[allergen]]).join(" · ")}
        </p>
      )}
    </li>
  );
}
