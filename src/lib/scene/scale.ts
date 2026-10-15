/**
 * Radial scale model.
 *
 * A solar system cannot be shown literally: Neptune is ~78× farther from the
 * Sun than Mercury, and the Sun's radius is ~1/215 of an AU, so a linear scene
 * is either all-empty or all-overlapping. NASA Eyes solves this by keeping the
 * *direction* of every body exact while compressing its *distance* onto a
 * non-linear radial function, and by giving each body an exaggerated display
 * radius so it stays visible.
 *
 * This module implements that idea with a piecewise log-ish mapping that:
 *   - is monotonic and invertible, so zoom and picking stay coherent;
 *   - compresses the outer system much more than the inner one;
 *   - keeps each orbit's shape recognisable (angles are never touched).
 *
 * All distances here are kilometres; the output is scene units.
 */

/** Reference: 1 astronomical unit in km. */
export const AU_KM = 149_597_870.7;

const INNER_MAX_AU = 2;
const MIDDLE_MAX_AU = 40;

const INNER_RATE = 26; // scene units per AU in the near-linear region
const INNER_MAX = INNER_RATE * INNER_MAX_AU;

// Middle segment: logarithmic growth, slope matched to INNER_RATE at the join.
const MIDDLE_K = INNER_RATE * INNER_MAX_AU;
const MIDDLE_MAX = INNER_MAX + MIDDLE_K * Math.log(MIDDLE_MAX_AU / INNER_MAX_AU);

// Outer segment: gentle linear tail, slope matched at the join.
const OUTER_RATE = MIDDLE_K / MIDDLE_MAX_AU;
const OUTER_ORIGIN_AU = MIDDLE_MAX_AU;

/** Map a heliocentric distance in km to scene units (odd function, sign kept). */
export function scaleDistance(km: number): number {
  const au = Math.abs(km) / AU_KM;
  const sign = km < 0 ? -1 : 1;

  if (au <= INNER_MAX_AU) return sign * INNER_RATE * au;
  if (au <= MIDDLE_MAX_AU) {
    return sign * (INNER_MAX + MIDDLE_K * Math.log(au / INNER_MAX_AU));
  }
  return sign * (MIDDLE_MAX + OUTER_RATE * (au - OUTER_ORIGIN_AU));
}

/** Inverse of {@link scaleDistance}: scene units back to km. */
export function unscaleDistance(units: number): number {
  const sign = units < 0 ? -1 : 1;
  const u = Math.abs(units);

  if (u <= INNER_MAX) return sign * (u / INNER_RATE) * AU_KM;
  if (u <= MIDDLE_MAX) {
    return sign * INNER_MAX_AU * Math.exp((u - INNER_MAX) / MIDDLE_K) * AU_KM;
  }
  return sign * (OUTER_ORIGIN_AU + (u - MIDDLE_MAX) / OUTER_RATE) * AU_KM;
}

/**
 * Scene-space radius for a body's own size.
 *
 * Bodies are exaggerated relative to their distance so a moon is visible while
 * the planet it orbits still fits the frame. Growth is logarithmic in the real
 * radius and bounded so nothing swallows its neighbours.
 */
export function scaleRadius(radiusKm: number): number {
  const r = Math.max(1, radiusKm);
  // Sun (695,500 km) lands near 4.0 units; Jupiter near 2.1; Earth near 1.2;
  // Moon near 0.75. Bodies are deliberately enlarged relative to pure
  // proportion so every one stays visible — the same trade-off NASA Eyes makes.
  return 0.45 + 1.28 * Math.log10(1 + r / 700);
}

/** Total scene extent of the modelled system, used to frame the camera. */
export const SCENE_EXTENT = scaleDistance(50 * AU_KM);

/** Scene radius that comfortably contains the eight planets (Neptune ≈ 30 AU). */
export const PLANET_EXTENT = scaleDistance(31 * AU_KM);

/**
 * Place a body given a heliocentric position in km. Direction is preserved
 * exactly; only the magnitude is compressed by the radial scale.
 */
export function projectToScene(p: { x: number; y: number; z: number }): {
  x: number;
  y: number;
  z: number;
} {
  const r = Math.hypot(p.x, p.y, p.z);
  if (r === 0) return { x: 0, y: 0, z: 0 };
  const s = scaleDistance(r) / r;
  return { x: p.x * s, y: p.y * s, z: p.z * s };
}
