/**
 * Single source of truth for everything the owners are likely to change.
 * Nothing here is locale-specific — translated strings live in content/i18n/.
 */

export const site = {
  name: "Bistro Bombina",
  /** Used for <title>, Open Graph and the JSON-LD Restaurant schema. */
  url: "https://bistrobombina.com",

  phone: {
    /** Human-readable, as printed on their signage. */
    display: "031 492 912",
    /** E.164 for tel: links — required for the dialer to work abroad. */
    href: "+38631492912",
  },

  email: "bombinabistro@gmail.com",

  address: {
    street: "Ulica 1. junija 8",
    postalCode: "1420",
    city: "Trbovlje",
    country: "SI",
    /** From OpenStreetMap, which already has the bistro mapped by name. */
    lat: 46.1492462,
    lon: 15.0428174,
  },

  social: {
    facebook: "https://facebook.com/bistrobombina",
    instagram: "https://instagram.com/bombinabistro/",
  },

  /**
   * CONFIRM WITH THE OWNERS. The current site never states opening hours
   * outright; these are inferred from the old navigation labels
   * ("Večerna ponudba - četrtek, petek", "Zajtrki sobota 9.00-12.00").
   * `key` maps into the i18n dictionary, `value` is printed as-is.
   */
  hours: [
    { key: "hoursLunch", value: "11.00 – 15.00" },
    { key: "hoursEvening", value: "18.00 – 22.00" },
    { key: "hoursBrunch", value: "9.00 – 14.00" },
  ],

  /**
   * Replaces the ad-hoc "OBVESTILO" posts on the old site.
   * Flip `active` to true and edit the dictionary keys `noticeTitle` /
   * `noticeBody` to publish a banner across both locales.
   */
  notice: {
    active: false,
  },
} as const;

export type Site = typeof site;
