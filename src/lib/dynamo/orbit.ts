/**
 * Convert `orb`-type dynamo points into Cartesian positions, using the same
 * two-body (Keplerian) model NASA Eyes applies.
 *
 * A single `orb` point fully describes an osculating ellipse: semi-major axis,
 * eccentricity, mean angular motion, mean anomaly at its epoch, plus a
 * quaternion that rotates the orbital plane into the reference frame. To get a
 * position at arbitrary time `t` we advance the mean anomaly, solve Kepler's
 * equation for the eccentric anomaly, place the body in the orbital plane, then
 * rotate by the stored quaternion.
 *
 * NASA interpolates linearly between neighbouring osculating elements for the
 * position/velocity it hands to the renderer; for orbit-*line* rendering the
 * instantaneous element set is what matters, so this module exposes the raw
 * per-point osculating position and leaves interpolation to the caller.
 */

import { rotateByQuat, vec3, type Quat, type Vec3 } from './math';
import type { DynPoint, OrbPoint } from './parse';

const TWO_PI = Math.PI * 2;

/**
 * Solve Kepler's equation `M = E - e·sin(E)` for `E` via Newton–Raphson.
 * Converges in a handful of iterations for all planetary eccentricities.
 */
export function solveEccentricAnomaly(meanAnomaly: number, eccentricity: number): number {
  // Normalise to [-π, π] to keep the initial guess well-conditioned.
  let m = meanAnomaly % TWO_PI;
  if (m > Math.PI) m -= TWO_PI;
  if (m < -Math.PI) m += TWO_PI;

  let e = m;
  for (let i = 0; i < 64; i++) {
    const f = e - eccentricity * Math.sin(e) - m;
    const fp = 1 - eccentricity * Math.cos(e);
    const step = f / fp;
    e -= step;
    if (Math.abs(step) < 1e-12) break;
  }
  return e;
}

/**
 * Position of the orbiting body described by `point`, evaluated at `time`
 * (seconds since J2000). Returns kilometres in the reference frame.
 */
export function orbPositionAt(point: OrbPoint, time: number): Vec3 {
  const meanAnomaly = point.meanAnomalyAtEpoch + point.meanAngularMotion * (time - point.time);
  const E = solveEccentricAnomaly(meanAnomaly, point.eccentricity);
  const cosE = Math.cos(E);
  const sinE = Math.sin(E);

  // Perifocal-plane coordinates (periapsis along +x).
  const x = point.semiMajorAxis * (cosE - point.eccentricity);
  const y = point.semiMajorAxis * Math.sqrt(1 - point.eccentricity * point.eccentricity) * sinE;

  return rotateByQuat(vec3(x, y, 0), point.orientation);
}

/**
 * Pick the point whose epoch is nearest `time`. `orb` files sample the orbit at
 * a coarse cadence (e.g. 429 points over 200 years for Earth), and each sample's
 * osculating elements are computed at that sample's own epoch, so choosing the
 * nearest epoch minimises propagation error.
 *
 * `points` must be time-sorted, which dynamo files always are.
 */
export function nearestPoint<T extends DynPoint>(points: T[], time: number): T | null {
  if (points.length === 0) return null;

  let lo = 0;
  let hi = points.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (points[mid].time <= time) lo = mid;
    else hi = mid;
  }
  return Math.abs(points[lo].time - time) <= Math.abs(points[hi].time - time)
    ? points[lo]
    : points[hi];
}

/** Convenience: position at `time` using the nearest-epoch osculating elements. */
export function sampleOrbPosition(points: OrbPoint[], time: number): Vec3 | null {
  const p = nearestPoint(points, time);
  return p ? orbPositionAt(p, time) : null;
}

export type { Quat, Vec3 };
