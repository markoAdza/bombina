/**
 * Guest reviews, transcribed from the "MNENJA" section of bistrobombina.com.
 *
 * George Deriso wrote in English; his text is kept verbatim in both locales
 * rather than translated into Slovenian and back.
 */

export type Review = {
  author: string;
  /** Where the guest is from, when it adds context. */
  origin?: string;
  sl: string;
  en: string;
};

export const reviews: Review[] = [
  {
    author: "Metka Lukančič Nemec",
    sl: "Obiskali smo nov bistro v Trbovljah in doživeli izjemno kulinarično izkušnjo. Hrana je bila vrhunska, pripravljena z najvišjim nivojem natančnosti in strasti. Vsaka jed je odražala vrhunske sestavine in premišljeno pripravo. Še posebej nas je navdušilo, da je takšna odličnost prišla v Trbovlje, saj prinaša nekaj novega in drugačnega v naš kraj. Brez dvoma se bomo še večkrat vrnili, saj je bistro postal naš novi najljubši kraj za uživanje v odlični hrani.",
    en: "We visited the new bistro in Trbovlje and had an exceptional culinary experience. The food was outstanding, prepared with the greatest precision and passion. Every dish reflected first-rate ingredients and careful thought. What delighted us most is that excellence of this kind has arrived in Trbovlje — it brings something new and different to our town. We will be back many times over; this has become our favourite place to eat well.",
  },
  {
    author: "George Deriso",
    origin: "USA",
    sl: "In 2024, I have dined in some of the best restaurants in many well-known foodie cities in the world — Tiranë, Corfu, Ljubljana, Glasgow, Edinburgh, Paris, Vienna, Trieste, London, Oxford, Osaka and Sydney. One of my best and most memorable dining experiences, however, was in Trbovlje, where I was fortunate to have lunch at Bombina Bistro. There I had one of the finest gnocchi dishes I've ever had — handmade and lightly dressed in a creamy sauce that featured delicious locally-sourced wild mushrooms. Bombina Bistro is a restaurant to watch, as I've no doubt they will someday be awarded a Michelin star.",
    en: "In 2024, I have dined in some of the best restaurants in many well-known foodie cities in the world — Tiranë, Corfu, Ljubljana, Glasgow, Edinburgh, Paris, Vienna, Trieste, London, Oxford, Osaka and Sydney. One of my best and most memorable dining experiences, however, was in Trbovlje, where I was fortunate to have lunch at Bombina Bistro. There I had one of the finest gnocchi dishes I've ever had — handmade and lightly dressed in a creamy sauce that featured delicious locally-sourced wild mushrooms. Bombina Bistro is a restaurant to watch, as I've no doubt they will someday be awarded a Michelin star.",
  },
  {
    author: "Dijana Stojančič",
    sl: "Prijetno okolje, fajn glasba, dobra hrana. Glavnih jedi nismo uspeli slikat, ker smo res napadli hrano. Cene primerne glede na kakovost hrane. Res super, da je v Zasavju takšen bistro. Sigurno se še vidmo!",
    en: "Lovely space, good music, good food. We never managed to photograph the mains because we fell on them far too quickly. Prices are fair for the quality. It is genuinely wonderful that Zasavje has a bistro like this. We will certainly be back!",
  },
  {
    author: "Darjan Gantar",
    sl: "Odlična hrana in ambient. Edina restavracija z vrhunsko gurmansko kuhinjo v mestu Trbovlje.",
    en: "Excellent food and atmosphere. The only restaurant with truly fine cooking in Trbovlje.",
  },
];
