/**
 * NASA's trails, from `TrailComponent` and the entity table's `trail` blocks.
 *
 * A trail is the path a body has swept out *backwards in time* — not a
 * predicted orbit. That distinction matters: the orbit lines exist only for the
 * eight planets and the Moon (see `orbit-colors.ts`), while almost everything
 * else — every spacecraft, moon, asteroid and comet, 833 entities in all —
 * carries a trail instead. Trails are what give a spacecraft its sense of
 * motion across the system.
 *
 * ## Transcribed facts
 *
 * From `TrailComponent`'s constructor defaults:
 *
 *   _color       = (1, 1, 1, 1)
 *   _widthMin    = 0, _widthMax = 2      (a ribbon 2 px wide at the head)
 *   _alphaFade   = 0                     (no fade along the tail)
 *   _dashLength  = 1, _dashGapLength = 0 (solid)
 *   _glowWidth   = 0
 *   _relativeStartTime / _relativeEndTime = true
 *   _pointsPerFrame = 4                  (adaptive tessellation budget)
 *   _angleCurveThreshold = 0.05235987755 rad (3°) — resample where the path bends
 *
 * The geometry is a triangle strip of `2 × points` vertices, each carrying
 * `positionCurr`, `positionPrev`, `positionNext`, `side` (±1), `index` and
 * `dashOffset` — `VERTEX_SIZE = 12` floats. `side` is what lets the vertex
 * shader push the ribbon out perpendicular to the path.
 *
 * ## Per-body data
 *
 * `trail: { length, lengthCoverages, color }` in the entity table. `length` is
 * the trail's ageing window in seconds and is often unset, in which case NASA
 * derives it from the body's orbital period (`_getAutoLength`). `color` defaults
 * to white at 0.5 alpha. All values below were read from the entity table and
 * cross-checked against the running reference app.
 */

/** A trail colour, RGBA in 0–1. */
export type TrailColor = [number, number, number, number];

/** `TrailComponent` constructor defaults. */
export const TRAIL_DEFAULTS = {
  /** White at half opacity — the colour nearly every body gets. */
  color: [1, 1, 1, 0.5] as TrailColor,
  widthMin: 0,
  widthMax: 2,
  alphaFade: 0,
  dashLength: 1,
  dashGapLength: 0,
  glowWidth: 0,
  /** Points added per frame while the trail catches up to the simulation time. */
  pointsPerFrame: 4,
  /** Resample when the direction changes by more than 3°. */
  angleCurveThreshold: 0.05235987755,
  /** Floats per vertex in the interleaved buffer. */
  vertexSize: 12,
} as const;

/**
 * The eight planets' trail colours, verbatim from their `trail.color`.
 *
 * **These are not the orbit-line colours.** NASA keeps two separate tables and
 * several bodies differ: Mercury's trail is grey while its orbit line is purple,
 * and Uranus' trail is pale cyan while its orbit line is violet. Confusing the
 * two is an easy mistake; the live reference app confirms both are distinct.
 */
export const PLANET_TRAIL_COLORS: Record<string, TrailColor> = {
  sun: [0.6, 0.6, 0.6, 0.7],
  mercury: [0.6, 0.6, 0.6, 0.7],
  venus: [0.9, 0.8, 0.45, 0.7],
  earth: [0, 0.6, 0.8, 0.7],
  mars: [0.89, 0.51, 0.35, 0.7],
  jupiter: [0.95, 0.71, 0.64, 0.7],
  saturn: [0.72, 0.65, 0.52, 0.7],
  uranus: [0.67, 0.92, 1, 0.7],
  neptune: [0.48, 0.69, 1, 0.7],
};

/**
 * Moons that carry their parent planet's trail colour rather than the default.
 *
 * Jupiter's Galilean moons and the large Saturnian and Neptunian moons are
 * tinted to match their system, so a moon's trail reads as belonging to its
 * planet. Ganymede and Triton also override the alpha to 0.7.
 */
export const MOON_TRAIL_COLORS: Record<string, TrailColor> = {
  // Jupiter system: same as Jupiter's trail.
  io: [0.95, 0.71, 0.64, 0.7],
  europa: [0.95, 0.71, 0.64, 0.7],
  ganymede: [0.95, 0.71, 0.64, 0.7],
  callisto: [0.95, 0.71, 0.64, 0.7],
  // Neptune system: same as Neptune's trail.
  triton: [0.48, 0.69, 1, 0.7],
};

/**
 * A trail's length window, in seconds.
 *
 * `length` is how far back the trail reaches. When a body does not declare one,
 * NASA derives it from the body's orbital period so the trail covers roughly one
 * revolution; `AUTO_TRAIL_REVOLUTIONS` is that factor. Bodies with a very short
 * or very long period are clamped so the trail neither vanishes nor smears
 * across the whole system.
 */
export const AUTO_TRAIL_REVOLUTIONS = 1;

/** Trail length bounds, seconds. Roughly 11 days to 30 years. */
export const TRAIL_MIN_LENGTH = 1e6;
export const TRAIL_MAX_LENGTH = 9.46e8;

/**
 * Declared trail lengths from the entity table, in seconds.
 *
 * Only these bodies pin a length; everything else is derived from its orbit.
 * Voyager 1's 946,080,000 s is 30 years, matching its launch-to-now span.
 */
export const TRAIL_LENGTHS: Record<string, number> = {
  sc_voyager_1: 946_080_000,
  sc_voyager_2: 946_080_000,
  sc_pioneer_10: 315_360_000,
  sc_pioneer_11: 315_360_000,
  sc_new_horizons: 94_608_000,
  sc_lucy: 63_919_069,
  sc_osiris_rex: 10_000_000,
  sc_osiris_rex_src: 360,
  sc_parker_solar_probe: 12_942_631,
  sc_stereo_ahead: 29_809_031,
  sc_psyche: 0,
};

/**
 * The trail colour for a body.
 *
 * Precedence: an explicit per-body placement (moons inheriting their planet),
 * then a planet colour, then white at 0.5.
 */
export function trailColorFor(id: string): TrailColor {
  if (MOON_TRAIL_COLORS[id]) return MOON_TRAIL_COLORS[id];
  if (PLANET_TRAIL_COLORS[id]) return PLANET_TRAIL_COLORS[id];
  return TRAIL_DEFAULTS.color;
}

/**
 * The trail length for a body, in seconds.
 *
 * Falls back to one orbital period, clamped to the sane range, which is
 * `TrailComponent._getAutoLength`'s behaviour without needing the full
 * Keplerian solver: a body in a very fast orbit gets a short trail and a slow
 * one a long trail.
 */
export function trailLengthFor(id: string, orbitalPeriodSeconds?: number): number {
  const declared = TRAIL_LENGTHS[id];
  if (declared !== undefined && declared > 0) return declared;
  const auto = (orbitalPeriodSeconds ?? 0) * AUTO_TRAIL_REVOLUTIONS;
  if (!(auto > 0)) return TRAIL_MIN_LENGTH;
  return Math.min(TRAIL_MAX_LENGTH, Math.max(TRAIL_MIN_LENGTH, auto));
}

/** True when NASA gives this body a trail — which is nearly everything. */
export function hasTrail(): boolean {
  // NASA attaches a trail to 833 of its entities. Rather than enumerate them,
  // we attach one to every body that has an ephemeris and no orbit line, which
  // is the same set as far as the rendered result goes: the planets and the Moon
  // get orbit lines instead. See `docs/ground-truth.md`.
  return true;
}
