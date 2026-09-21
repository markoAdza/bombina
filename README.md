# Bistro Bombina

Website for [Bistro Bombina](https://www.bistrobombina.com/), Ulica 1. junija 8, Trbovlje.

Slovenian and English, built with Next.js and deployed on Vercel.

---

## Running it

```bash
npm install
npm run dev
```

Then open <http://localhost:3000> — it redirects to `/sl`. English is at `/en`.

| command | what it does |
| --- | --- |
| `npm run dev` | development server with hot reload |
| `npm run build` | production build; both locales are prerendered to static HTML |
| `npm start` | serve the production build locally |
| `npm run typecheck` | TypeScript, no emit |

---

## Editing the content

Everything the owners are likely to change lives in `content/`. No component
edits are needed for any of it.

### The weekly menu

`content/menu.ts` → the `weekly` export. Change `period` and the three dishes:

```ts
export const weekly: Menu = {
  period: "15. 9. – 18. 9. 2026",
  sections: [{ key: "sectionHot", dishes: [
    { sl: "Stročji fižol, krompir, ocvirki, kisla smetana",
      en: "Green beans, potato, pork cracklings, sour cream",
      price: "8,5 €",
      allergens: ["lactose"] },
    …
```

`price` is printed exactly as written, so `"6 € / 9 €"` is fine. Allergen keys
are listed at the top of the same file; their printed labels come from the
dictionaries so they translate automatically.

The evening card, the brunch card and `sporhet` (the seasonal set lunch) are in
the same file and work identically.

### Contact details, opening hours, the notice banner

`content/site.ts`.

> **The opening hours in that file need confirming.** The old site never stated
> them outright, so they were inferred from its navigation labels
> (“Večerna ponudba – četrtek, petek”, “Zajtrki sobota 9.00–12.00”). The line is
> marked `CONFIRM`.

To publish a closure notice across the top of both locales, set
`notice.active: true` and edit `noticeTitle` / `noticeBody` in both dictionaries.

### Reviews

`content/reviews.ts`. Each entry needs a Slovenian and an English version.
George Deriso's review was written in English and is kept in English in both.

### Translations

`content/i18n/sl.ts` is the source of truth. `en.ts` is type-checked against it,
so if you add a Slovenian key and forget the English one, `npm run typecheck`
fails rather than the page rendering a blank.

### Photographs

`public/images/` holds what the site serves. They are generated from the
originals by:

```bash
python scripts/build-images.py
```

Sources are `bistro_images/` (supplied) and `.src-images/` (full-resolution
originals pulled from the old Webador CDN). To swap a photo, replace the source
file and re-run the script — it crops to the aspect ratio each slot needs and
never upscales.

---

## Deploying

```bash
git init
git add .
git commit -m "Bistro Bombina website"
git remote add origin git@github.com:<you>/<repo>.git
git push -u origin main
```

Then import the repository at [vercel.com/new](https://vercel.com/new). Vercel
detects Next.js on its own. **There are no environment variables to set** —
reservations are `tel:` and `mailto:` links, and the map is an OpenStreetMap
embed, so nothing needs an API key.

---

## How it is put together

```
app/
  [locale]/layout.tsx   root layout — fonts, <html lang>, metadata, hreflang
  [locale]/page.tsx     assembles every section; Restaurant JSON-LD
  globals.css           Tailwind v4 @theme tokens and base styles
components/
  slides/               the horizontal chapter track and the torn edge
  sections/             Hero, About, Sporhet, Menu, Gallery, Reviews, …
  ui/                   Header, Footer, NoticeBar, LocaleSwitch, CtaButton
content/                menus, reviews, contact details, translations
lib/                    GSAP setup, the tear geometry, the track controller
scripts/build-images.py the image pipeline
```

Stack: Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · GSAP 3
(ScrollTrigger + Observer). No CMS, no UI kit, no backend.

### The sliding animation

The top of the page is a **pinned horizontal track**: three full-viewport
chapters that travel sideways as you scroll, then release into ordinary
vertical scrolling for the menu and everything below it.

Three things make it work, all in `components/slides/`:

**1. The pin** (`HorizontalChapters.tsx`). One ScrollTrigger pins the viewport
and scrubs the track sideways. One viewport-height of scrolling buys one panel
of travel. `scrub: 1` gives the movement its weight — that single number is the
biggest lever on how the whole thing feels.

**2. Depth.** Each `<ParallaxLayer depth={n}>` rides the same timeline but
covers a different distance, so panels separate as they move rather than
sliding past as one flat sheet. Positive values lag (distant), negative lead
(close): background photography ≈ `+0.8`, content cards ≈ `-0.6`, accent blocks
≈ `-1.0`.

A layer's offset is measured from the moment *its own* panel is centred, not
from the start of the track. Without that, chapters two and three would sit
permanently displaced by whatever parallax had built up by the time they
arrived, and the layout would only ever be correct for the first one.

**3. The tear** (`TornEdge.tsx`, `lib/torn.ts`). Photo panels rip along their
trailing edge. The path is an SVG `clipPath` in `objectBoundingBox` units, so it
stays sharp at any size or zoom, generated from three layered frequencies — a
slow wander, medium notches, fine fibre jitter. Behind each photo sits a second
copy of the same shape a few pixels further out, filled in paper; that pale rim
along the tear is what makes it read as torn paper rather than a wavy crop.

The geometry is generated once from a fixed seed so the server and the browser
produce identical markup. **Never replace that seed with `Math.random()`** — the
two would disagree and hydration would fail.

### Responsive and accessible behaviour

- **Below 1024px** the track never pins and the wheel is never captured. The
  same markup renders as three stacked sections and the tear rotates to the
  bottom edge. Menu tabs stack.
- **`prefers-reduced-motion: reduce`** — the timeline is never built at all
  (both conditions live in one `gsap.matchMedia` query), so the page is a plain
  vertical document. Reveal animations are skipped too.
- Chapter dots are real buttons with `aria-current`; menu tabs implement the
  full tabs pattern including arrow keys; the review slider responds to drag,
  swipe, arrow keys and its buttons.
- Navigation links into the track scroll it when it is mounted and fall back to
  ordinary anchors when it is not, so every destination works either way.
