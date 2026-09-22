/**
 * Slovenian is the source dictionary: every other locale is type-checked
 * against these keys, so a missing translation is a build error rather than
 * a blank space on the page.
 */
export const sl = {
  /* ---- chrome ---------------------------------------------------- */
  skipToContent: "Preskoči na vsebino",
  localeSwitch: "English",
  localeSwitchLabel: "Preklopi jezik",
  menuOpen: "Meni",
  menuClose: "Zapri",

  navHome: "Domov",
  navStory: "O nas",
  navSporhet: "Šporhet",
  navMenu: "Jedilnik",
  navReviews: "Mnenja",
  navCatering: "Catering",
  navContact: "Kontakt",

  ctaReserve: "Rezerviraj mizo",
  ctaCall: "Pokliči",
  ctaEmail: "Piši nam",
  ctaMenu: "Poglej jedilnik",

  /* ---- hero ------------------------------------------------------- */
  heroKicker: "Trbovlje · Zasavje",
  heroLead: "Majhna restavracija s preprosto, a kakovostno kuhinjo.",
  heroSub: "Dobra hrana, dobra pijača in dva človeka, ki jima je mar.",
  heroScroll: "",

  /* ---- about ------------------------------------------------------ */
  aboutKicker: "Kaj in kdo je Bistro Bombina",
  aboutTitle: "Urh in Barbara",
  aboutBody1:
    "Bistro Bombina je prostor, kjer se združujeta dobra hrana in dobra pijača — predvsem pa sva to Urh in Barbara, ki se po svojih najboljših močeh trudiva, da bi se pri nas gostje dobro počutili, dobro najedli in kaj dobrega popili.",
  aboutBody2:
    "Bistro pomeni majhno restavracijo s preprosto, a kakovostno kuhinjo. Brez pompa, s sezonskimi sestavinami in s tem, kar nam tisti teden pride pod roke.",
  aboutNameTitle: "Zakaj Bombina?",
  aboutNameBody:
    "Bombina je znanstveno ime za nižinskega urha — žabico, ki si deli ime z Urhom. Ko je kuhal v Angliji, so sodelavci povezavo našli kar prek Googla in mu je vzdevek ostal do danes.",
  wallQuote: "Kr naprej, pa neč se sezuvat!",
  wallQuoteNote: "Napisano na steni ob vhodu",

  /* ---- zasavski šporhet ------------------------------------------- */
  sporhetKicker: "Sezonsko",
  sporhetTitle: "Zasavski šporhet",
  sporhetBody:
    "Za nekaj tednov se vračamo k domačemu šporhetu: trije hodi zasavske kuhinje, kakršno so kuhale babice, postavljeni na krožnik po naše.",
  sporhetNote: "Kosilo je mogoče naročiti samo v celoti.",
  sporhetCourse: "Hod",

  /* ---- menu ------------------------------------------------------- */
  menuKicker: "Jedilnik",
  menuTitle: "Kaj se kuha",
  menuIntro:
    "Tedenska ponudba se menja vsak teden. Večerna in sobotna karta ostajata stalnici.",

  menuWeekly: "Tedenska ponudba",
  menuWeeklyWhen: "Od torka do petka, opoldne",
  menuEvening: "Večerna ponudba",
  menuEveningWhen: "Četrtek in petek, zvečer",
  menuBrunch: "Brunch",
  menuBrunchWhen: "Sobota, 9.00 – 14.00",

  sectionHot: "Tople jedi",
  sectionCold: "Hladno",
  sectionWarm: "Toplo",
  sectionMains: "Glavne tople",
  sectionSweet: "Sladko",
  sectionBrunch: "Za začetek dneva",

  allergensLabel: "Alergeni",
  allergensNote:
    "Za informacije o alergenih in prilagoditve jedi nam povejte ob naročilu.",

  alLactose: "laktoza",
  alGluten: "gluten",
  alEggs: "jajca",
  alFish: "riba",
  alNuts: "oreščki",
  alSulphites: "sulfit",
  alMolluscs: "školjke",
  alCrustaceans: "lupinarji",

  /* ---- reviews ---------------------------------------------------- */
  reviewsKicker: "Mnenja",
  reviewsTitle: "So tista, ki štejejo",
  reviewsPrev: "Prejšnje mnenje",
  reviewsNext: "Naslednje mnenje",

  /* ---- catering --------------------------------------------------- */
  cateringKicker: "Pogostitve",
  cateringTitle: "Catering",
  cateringBody:
    "V ponudbi imamo tudi pogostitve na terenu. Ponudbo prilagodimo vsakemu naročniku posebej — od zajtrka za ekipo do večerje za obletnico.",
  cateringCta: "Povprašaj za ponudbo",

  /* ---- contact ---------------------------------------------------- */
  contactKicker: "Kontakt",
  contactTitle: "Pridi mimo",
  contactAddress: "Naslov",
  contactPhone: "Telefon",
  contactEmail: "E-pošta",
  contactHours: "Odprto",
  contactDirections: "Odpri v zemljevidu",
  contactMapLabel: "Zemljevid lokacije Bistra Bombina",
  contactReserveNote:
    "Za mizo nas najlaže pokličeš. Za večje družbe se oglasi kak dan prej.",

  hoursLunch: "Torek – petek, kosilo",
  hoursEvening: "Četrtek in petek, večerja",
  hoursBrunch: "Sobota, brunch",

  /* ---- notice ----------------------------------------------------- */
  noticeTitle: "Obvestilo",
  noticeBody: "Trenutno smo zaprti. Kmalu spet odpiramo vrata.",
  noticeDismiss: "Zapri obvestilo",

  /* ---- footer ----------------------------------------------------- */
  footerTagline: "Dobra hrana in dobra pijača v Trbovljah.",
  footerRights: "Vse pravice pridržane.",
  footerFollow: "Sledi nam",
} as const;

/**
 * Key parity, not value parity: another locale must supply every key, but
 * its strings are of course its own. Written as a mapped type because
 * `typeof sl` would pin each value to its exact Slovenian literal.
 */
export type Dictionary = { [K in keyof typeof sl]: string };
