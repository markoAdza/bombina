/**
 * The menus, transcribed verbatim from bistrobombina.com.
 *
 * To update the weekly offer the owners only need to edit `weekly` below:
 * change `period`, then the three dishes. Everything else on the page —
 * tabs, headings, allergen pills — derives from this file automatically.
 */

/** Allergen keys; the printable label comes from content/i18n. */
export type Allergen =
  | "lactose"
  | "gluten"
  | "eggs"
  | "fish"
  | "nuts"
  | "sulphites"
  | "molluscs"
  | "crustaceans";

export type Dish = {
  /** Slovenian name, exactly as written on the original menu. */
  sl: string;
  /** English rendering for the EN locale. */
  en: string;
  /** Printed as-is, so "6 € / 9 €" stays a valid price. */
  price: string;
  allergens: Allergen[];
};

export type MenuSection = {
  /** Dictionary key for the section heading, e.g. "sectionCold". */
  key: string;
  dishes: Dish[];
};

export type Menu = {
  id: string;
  /** Dictionary key for the tab label. */
  labelKey: string;
  /** Dictionary key for the line under the tab, e.g. "Četrtek, petek". */
  whenKey: string;
  /** Free text shown as a date range; null when the menu is permanent. */
  period: string | null;
  sections: MenuSection[];
};

/* ------------------------------------------------------------------ */

export const weekly: Menu = {
  id: "weekly",
  labelKey: "menuWeekly",
  whenKey: "menuWeeklyWhen",
  period: "15. 9. – 18. 9. 2026",
  sections: [
    {
      key: "sectionHot",
      dishes: [
        {
          sl: "Stročji fižol, krompir, ocvirki, kisla smetana",
          en: "Green beans, potato, pork cracklings, sour cream",
          price: "8,5 €",
          allergens: ["lactose"],
        },
        {
          sl: "Pasta al tonno – testenine, paradižnik, bazilika, kapre",
          en: "Pasta al tonno – tuna, tomato, basil, capers",
          price: "9,5 €",
          allergens: ["gluten", "fish", "lactose"],
        },
        {
          sl: "Mesne kroglice, bučke, grški jogurt, zeliščna solata",
          en: "Meatballs, courgette, Greek yoghurt, herb salad",
          price: "9,5 €",
          allergens: ["lactose", "gluten", "sulphites"],
        },
      ],
    },
  ],
};

export const evening: Menu = {
  id: "evening",
  labelKey: "menuEvening",
  whenKey: "menuEveningWhen",
  period: null,
  sections: [
    {
      key: "sectionCold",
      dishes: [
        { sl: "Goveji tatar", en: "Beef tartare", price: "12 €", allergens: ["fish"] },
        {
          sl: "Burrata, zeleni gazpacho, lešniki",
          en: "Burrata, green gazpacho, hazelnuts",
          price: "13 €",
          allergens: ["lactose", "nuts"],
        },
        {
          sl: "Nicoise solata – tuna, solata, krompir, stročji fižol, paradižnik, olive",
          en: "Niçoise salad – tuna, leaves, potato, green beans, tomato, olives",
          price: "6 € / 9 €",
          allergens: ["lactose", "eggs", "fish"],
        },
        {
          sl: "Zelenjavna mineštra",
          en: "Vegetable minestrone",
          price: "4,5 €",
          allergens: ["lactose", "sulphites"],
        },
      ],
    },
    {
      key: "sectionWarm",
      dishes: [
        {
          sl: "Ocvrt camembert, brusnice",
          en: "Fried camembert, cranberries",
          price: "12 €",
          allergens: ["lactose", "gluten", "eggs"],
        },
      ],
    },
    {
      key: "sectionMains",
      dishes: [
        {
          sl: "Testenine, bučke, stracciatella",
          en: "Pasta, courgette, stracciatella",
          price: "12 €",
          allergens: ["lactose", "gluten", "nuts"],
        },
        {
          sl: "File bele ribe, stročnice, paradižnik, pesto",
          en: "White fish fillet, pulses, tomato, pesto",
          price: "16 €",
          allergens: ["lactose", "sulphites", "fish", "molluscs", "crustaceans"],
        },
        {
          sl: "Karađorđev, tatarska omaka, krompir",
          en: "Karađorđe's schnitzel, tartare sauce, potatoes",
          price: "16 €",
          allergens: ["lactose", "gluten", "eggs"],
        },
        {
          sl: "»Steak frites«, goveji hrbet, pommes frites",
          en: "“Steak frites”, beef striploin, pommes frites",
          price: "19 €",
          allergens: ["lactose", "gluten", "eggs"],
        },
        {
          sl: "Telečja jetrca, karamelizirana čebula, sotirane gobe",
          en: "Veal liver, caramelised onion, sautéed mushrooms",
          price: "14 €",
          allergens: ["lactose", "sulphites"],
        },
      ],
    },
    {
      key: "sectionSweet",
      dishes: [
        {
          sl: "Tiramisu",
          en: "Tiramisu",
          price: "4,5 €",
          allergens: ["lactose", "gluten", "eggs"],
        },
        {
          sl: "Jabolčni tarte tatin, vanilijev sladoled",
          en: "Apple tarte tatin, vanilla ice cream",
          price: "6,5 €",
          allergens: ["lactose", "eggs", "nuts"],
        },
      ],
    },
  ],
};

export const brunch: Menu = {
  id: "brunch",
  labelKey: "menuBrunch",
  whenKey: "menuBrunchWhen",
  period: null,
  sections: [
    {
      key: "sectionBrunch",
      dishes: [
        { sl: "Masleni rogljič", en: "Butter croissant", price: "2,5 €", allergens: ["gluten", "lactose"] },
        {
          sl: "Domača granola, jogurt",
          en: "House granola, yoghurt",
          price: "7 €",
          allergens: ["lactose", "nuts", "gluten"],
        },
        {
          sl: "French toast, jagodičevje, vaniljeva krema",
          en: "French toast, berries, vanilla cream",
          price: "9 €",
          allergens: ["gluten", "eggs", "lactose"],
        },
        {
          sl: "Carski praženec, rozine, jabolčna čežana",
          en: "Kaiserschmarrn, raisins, apple compote",
          price: "9 €",
          allergens: ["gluten", "eggs", "lactose"],
        },
        {
          sl: "Poširana jajca, holandska omaka, brioš, slanina ali losos",
          en: "Poached eggs, hollandaise, brioche, bacon or salmon",
          price: "9,5 €",
          allergens: ["eggs", "gluten", "lactose", "fish"],
        },
        {
          sl: "Frtalja z gobami, solata",
          en: "Mushroom frittata, salad",
          price: "9,5 €",
          allergens: ["eggs", "lactose"],
        },
        { sl: "Steak, jajce", en: "Steak, egg", price: "17 €", allergens: ["eggs"] },
        {
          sl: "Štručka, slanina, jajce",
          en: "Bread roll, bacon, egg",
          price: "9 €",
          allergens: ["gluten", "eggs"],
        },
        {
          sl: "Poletna mineštra",
          en: "Summer minestrone",
          price: "4,5 €",
          allergens: ["lactose", "sulphites"],
        },
      ],
    },
  ],
};

/**
 * The seasonal set lunch. It is a single fixed menu rather than à la carte,
 * so it gets its own panel rather than a tab.
 */
export const sporhet = {
  period: "12. 9. – 27. 9. 2026",
  price: "18 €",
  courses: [
    { sl: "Prežganka", en: "Prežganka — toasted-flour soup" },
    { sl: "Krumpantoč", en: "Krumpantoč — Zasavje potato bake" },
    { sl: "Bela kava, ajdovi žganci", en: "White coffee, buckwheat žganci" },
  ],
} as const;

/** Tab order on the menu section. */
export const menus: Menu[] = [weekly, evening, brunch];
