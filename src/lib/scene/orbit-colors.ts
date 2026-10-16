/**
 * Orbit line colours and geometry.
 *
 * Transcribed from `TrailManager` in NASA's bundle, which is the authoritative
 * source for which bodies get an orbit line and what colour it is:
 *
 *   this._opacity = { primary: 0.75, secondary: 0.35, hover: 1 }
 *   this._orbitLinesOpts = { lineWidth: {default: 1.2, hover: 2}, glowWidth: 0 }
 *   this._orbitLineEntityNames = planets + "moon"
 *   this._colors = {
 *     default: white @ secondary,
 *     mercury: (151,104,172) @ primary,  venus: (176,121,25),
 *     earth:   (0,0.6,0.8),              mars:  (154,78,25),
 *     jupiter: (218,139,114),            saturn:(213,193,135),
 *     uranus:  (104,0.8,218),            neptune:(112,140,227),
 *   }
 *
 * Only the eight planets and the Moon have orbit lines; moons and spacecraft do
 * not, which is why NASA's system stays readable as bodies are added.
 */

/** Bodies that carry an orbit line, matching `_orbitLineEntityNames`. */
const ORBIT_LINE_IDS = new Set([
  'mercury',
  'venus',
  'earth',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
  'moon',
]);

/** Line opacity roles from `TrailManager._opacity`. */
export const OPACITY = { primary: 0.75, secondary: 0.35, hover: 1 } as const;

/** Orbit line colour per body, as `[r, g, b]` in 0–1, from `_colors`. */
const ORBIT_COLORS: Record<string, [number, number, number]> = {
  mercury: [151 / 255, 104 / 255, 172 / 255],
  venus: [176 / 255, 121 / 255, 25 / 255],
  earth: [0, 0.6, 0.8],
  mars: [154 / 255, 78 / 255, 25 / 255],
  jupiter: [218 / 255, 139 / 255, 114 / 255],
  saturn: [213 / 255, 193 / 255, 135 / 255],
  uranus: [104 / 255, 0.8, 218 / 255],
  neptune: [112 / 255, 140 / 255, 227 / 255],
};

/** Default line colour when a body has no entry: white at `secondary`. */
export const DEFAULT_ORBIT_COLOR: [number, number, number] = [1, 1, 1];

/** True when NASA gives this body an orbit line. */
export function hasOrbitLine(id: string): boolean {
  return ORBIT_LINE_IDS.has(id);
}

/**
 * Orbit line colour for a body. The alpha is applied separately so the same
 * helper serves the default and hover opacities.
 */
export function orbitColor(id: string): { rgb: [number, number, number]; alpha: number } {
  const rgb = ORBIT_COLORS[id] ?? DEFAULT_ORBIT_COLOR;
  const alpha = ORBIT_COLORS[id] ? OPACITY.primary : OPACITY.secondary;
  return { rgb, alpha };
}

/** NASA samples orbit lines at 720 segments. */
export const ORBIT_SEGMENTS = 720;

/** Line width in CSS pixels, from `_orbitLinesOpts.lineWidth`. */
export const ORBIT_LINE_WIDTH = 1.2;
