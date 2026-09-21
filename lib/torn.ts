/**
 * Torn-paper edge geometry.
 *
 * The reference animation's photo panels are not masked with a smooth wave —
 * they look ripped. Three things produce that read, and all three are layered
 * into the generator below:
 *
 *   1. a slow undulation, as the tear wanders across the sheet;
 *   2. medium notches, where the fibres gave way in chunks;
 *   3. fine high-frequency jitter, the fibres themselves.
 *
 * The path is generated once at module load from a fixed seed, so the server
 * and the client always produce byte-identical markup. Never swap this for
 * Math.random() — it would hydrate differently and React would blow up.
 */

/** Mulberry32 — small, fast, and deterministic across engines. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Amount of horizontal travel in the tear, in objectBoundingBox units. */
const AMPLITUDE = 0.022;
/** How many samples along the edge. 96 is past the point of visible faceting. */
const STEPS = 96;

/**
 * Offsets, in bounding-box units, of the tear from its nominal position at
 * position `t` (0 → 1) along the edge.
 */
function tearProfile(seed: number): number[] {
  const rand = mulberry32(seed);

  // Pre-roll a jitter table so the fine detail is stable but not periodic.
  const jitter = Array.from({ length: STEPS + 1 }, () => rand() - 0.5);

  // Random phases keep the three sine layers from lining up into a pattern.
  const p1 = rand() * Math.PI * 2;
  const p2 = rand() * Math.PI * 2;
  const p3 = rand() * Math.PI * 2;

  const out: number[] = [];
  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS;

    const wander = Math.sin(t * Math.PI * 2 * 1.3 + p1) * 0.45;
    const notches = Math.sin(t * Math.PI * 2 * 4.7 + p2) * 0.28;
    const fibres = Math.sin(t * Math.PI * 2 * 11.3 + p3) * 0.12;
    const grit = jitter[i] * 0.5;

    out.push((wander + notches + fibres + grit) * AMPLITUDE);
  }
  return out;
}

/**
 * A clip path running down the RIGHT edge of the box: the panel keeps
 * everything to the left of the tear.
 *
 * @param inset how far in from the right edge the tear sits (bbox units)
 */
export function tornRightPath(seed: number, inset = 0): string {
  const profile = tearProfile(seed);
  const pts = profile.map((offset, i) => {
    const t = i / STEPS;
    // Pull the tear flat at the very top and bottom so it meets the panel
    // corners cleanly instead of leaving a sliver.
    const ease = Math.min(1, Math.min(t, 1 - t) * 14);
    const x = 1 - inset + offset * ease;
    return `${x.toFixed(5)} ${t.toFixed(5)}`;
  });
  return `M0 0 L${pts.join(" L")} L0 1 Z`;
}

/** The same tear, rotated to run along the BOTTOM edge (mobile stacking). */
export function tornBottomPath(seed: number, inset = 0): string {
  const profile = tearProfile(seed);
  const pts = profile.map((offset, i) => {
    const t = i / STEPS;
    const ease = Math.min(1, Math.min(t, 1 - t) * 14);
    const y = 1 - inset + offset * ease;
    return `${t.toFixed(5)} ${y.toFixed(5)}`;
  });
  return `M0 0 L1 0 L1 1 L${[...pts].reverse().join(" L")} L0 0 Z`;
}

/* --------------------------------------------------------------------------
   The shapes actually used by the site.

   Each panel gets its own seed so no two tears are identical — repeating the
   same rip three times down the page is the tell that gives away a mask.

   Every edge comes as a pair: the photo path, and a `-lip` path sitting a
   hair further out. The lip is filled with paper colour and rendered behind
   the photo, so a pale fibrous rim shows along the tear. That rim is what
   makes it read as torn paper rather than a wavy crop.
   -------------------------------------------------------------------------- */

const LIP = 0.007;

export const TEARS = [
  { id: "torn-a", seed: 20260921, d: tornRightPath(20260921, LIP), lip: tornRightPath(20260921, 0) },
  { id: "torn-b", seed: 71341, d: tornRightPath(71341, LIP), lip: tornRightPath(71341, 0) },
  { id: "torn-c", seed: 550231, d: tornRightPath(550231, LIP), lip: tornRightPath(550231, 0) },
] as const;

export const TEARS_BOTTOM = [
  { id: "torn-a-b", seed: 20260921, d: tornBottomPath(20260921, LIP), lip: tornBottomPath(20260921, 0) },
  { id: "torn-b-b", seed: 71341, d: tornBottomPath(71341, LIP), lip: tornBottomPath(71341, 0) },
  { id: "torn-c-b", seed: 550231, d: tornBottomPath(550231, LIP), lip: tornBottomPath(550231, 0) },
] as const;

export type TearId = (typeof TEARS)[number]["id"];
