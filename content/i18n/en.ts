import type { Dictionary } from "./sl";

/**
 * Typed against the Slovenian dictionary — omitting or misspelling a key
 * fails `npm run typecheck`.
 */
export const en: Dictionary = {
  /* ---- chrome ---------------------------------------------------- */
  skipToContent: "Skip to content",
  localeSwitch: "Slovensko",
  localeSwitchLabel: "Switch language",
  menuOpen: "Menu",
  menuClose: "Close",

  navHome: "Home",
  navStory: "About",
  navSporhet: "Šporhet",
  navMenu: "Menu",
  navReviews: "Reviews",
  navCatering: "Catering",
  navContact: "Contact",

  ctaReserve: "Book a table",
  ctaCall: "Call us",
  ctaEmail: "Email us",
  ctaMenu: "See the menu",

  /* ---- hero ------------------------------------------------------- */
  heroKicker: "Trbovlje · Slovenia",
  heroLead: "A small restaurant serving simple, carefully made food.",
  heroSub: "Good food, good drink, and two people who care about both.",
  heroScroll: "",

  /* ---- about ------------------------------------------------------ */
  aboutKicker: "What and who Bistro Bombina is",
  aboutTitle: "Urh and Barbara",
  aboutBody1:
    "Bistro Bombina is a place where good food meets good drink — but mostly it is the two of us, Urh and Barbara, doing our best to make sure our guests feel at home, eat well and drink something good.",
  aboutBody2:
    "A bistro means a small restaurant with simple but properly made cooking. No fuss, seasonal ingredients, and whatever happens to reach us that week.",
  aboutNameTitle: "Why Bombina?",
  aboutNameBody:
    "Bombina is the scientific name of the fire-bellied toad — in Slovenian, urh, which happens to be Urh's name. While he was cooking in England his colleagues found the connection on Google, and the nickname has stuck ever since.",
  wallQuote: "Kr naprej, pa neč se sezuvat!",
  wallQuoteNote: "Painted on the wall by the door — “Come on in, no need to take your shoes off.”",

  /* ---- zasavski šporhet ------------------------------------------- */
  sporhetKicker: "Seasonal",
  sporhetTitle: "Zasavski šporhet",
  sporhetBody:
    "For a few weeks we go back to the old wood stove: three courses of Zasavje home cooking, the kind grandmothers made, plated our way.",
  sporhetNote: "This lunch can only be ordered as the full set.",
  sporhetCourse: "Course",

  /* ---- menu ------------------------------------------------------- */
  menuKicker: "Menu",
  menuTitle: "What's cooking",
  menuIntro:
    "The weekly offer changes every week. The evening and Saturday cards stay put.",

  menuWeekly: "Weekly offer",
  menuWeeklyWhen: "Tuesday to Friday, at noon",
  menuEvening: "Evening menu",
  menuEveningWhen: "Thursday and Friday evenings",
  menuBrunch: "Brunch",
  menuBrunchWhen: "Saturday, 9.00 – 14.00",

  sectionHot: "Hot dishes",
  sectionCold: "Cold",
  sectionWarm: "Warm",
  sectionMains: "Hot mains",
  sectionSweet: "Sweet",
  sectionBrunch: "To start the day",

  allergensLabel: "Allergens",
  allergensNote:
    "Tell us when you order if you need allergen information or an adjustment to a dish.",

  alLactose: "lactose",
  alGluten: "gluten",
  alEggs: "eggs",
  alFish: "fish",
  alNuts: "nuts",
  alSulphites: "sulphites",
  alMolluscs: "molluscs",
  alCrustaceans: "crustaceans",

  /* ---- reviews ---------------------------------------------------- */
  reviewsKicker: "Reviews",
  reviewsTitle: "The ones that count",
  reviewsPrev: "Previous review",
  reviewsNext: "Next review",

  /* ---- catering --------------------------------------------------- */
  cateringKicker: "Events",
  cateringTitle: "Catering",
  cateringBody:
    "We also cater off site. Every offer is put together for the particular client — from breakfast for a team to dinner for an anniversary.",
  cateringCta: "Ask for a quote",

  /* ---- contact ---------------------------------------------------- */
  contactKicker: "Contact",
  contactTitle: "Come by",
  contactAddress: "Address",
  contactPhone: "Phone",
  contactEmail: "Email",
  contactHours: "Open",
  contactDirections: "Open in maps",
  contactMapLabel: "Map showing the location of Bistro Bombina",
  contactReserveNote:
    "Calling is the easiest way to get a table. For larger groups, give us a day's notice.",

  hoursLunch: "Tuesday – Friday, lunch",
  hoursEvening: "Thursday and Friday, dinner",
  hoursBrunch: "Saturday, brunch",

  /* ---- notice ----------------------------------------------------- */
  noticeTitle: "Notice",
  noticeBody: "We are closed at the moment. We will be opening our doors again shortly.",
  noticeDismiss: "Dismiss notice",

  /* ---- footer ----------------------------------------------------- */
  footerTagline: "Good food and good drink in Trbovlje.",
  footerRights: "All rights reserved.",
  footerFollow: "Follow us",
};
