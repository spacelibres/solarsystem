/**
 * The Sun's galactic orbit.
 *
 * Transcribed from the `sun` entity's first controller in NASA's bundle:
 *
 *   { type: "orbitalElements",
 *     epoch: 0,
 *     eccentricity: 0,
 *     semiMajorAxis: 246237071e9,          // km
 *     meanAngularMotion: -2192686e-23,     // rad/s
 *     meanAnomalyAtEpoch: Math.PI,
 *     orientation: Quaternion(-.48894750765094835, -.4832106839985283,
 *                             .19625375824756275, .6992297419646486) }
 *
 * The semi-major axis works out to **26,027 light years**, which matches the
 * accepted distance from the Sun to the galactic centre. The angular motion
 * corresponds to ~9.1 billion years per revolution rather than the ~230
 * million of a real galactic year, so it is a presentation value, not a
 * physical one — we reproduce it unchanged because the goal is a faithful
 * replica.
 *
 * This places the Sun inside the galaxy, which is how NASA expresses "where is
 * the solar system" — the Sun is a child of `milky_way` and its orbit around
 * the galactic centre is what positions it.
 */

import * as THREE from 'three';

/** Heliocentric distance to the galactic centre, km (NASA's value). */
export const SUN_GALACTIC_RADIUS_KM = 246_237_071e9;

/** Mean angular motion about the galactic centre, rad/s (NASA's value). */
export const SUN_GALACTIC_ANGULAR_MOTION = -2_192_686e-23;

/** Mean anomaly at epoch, rad (NASA starts the Sun at its farthest point). */
export const SUN_GALACTIC_MEAN_ANOMALY_AT_EPOCH = Math.PI;

/**
 * Orbital orientation, from NASA's literal.
 *
 * NASA writes `new Quaternion(w, x, y, z)`, so the four numbers in the bundle
 * are W-first: (-0.48894750765094835, -0.4832106839985283, 0.19625375824756275,
 * 0.6992297419646486). Three.js takes (x, y, z, w), so they are reordered here.
 */
export const SUN_GALACTIC_ORIENTATION = new THREE.Quaternion(
  -0.4832106839985283,
  0.19625375824756275,
  0.6992297419646486,
  -0.48894750765094835,
);

/** One revolution about the galactic centre, in seconds (derived). */
export const GALACTIC_REVOLUTION_SECONDS =
  (2 * Math.PI) / Math.abs(SUN_GALACTIC_ANGULAR_MOTION);

/**
 * Position of the Sun relative to the galactic centre, at `time` seconds from
 * J2000. Mirrors NASA's `orbitalElements` controller: a circular orbit in the
 * plane fixed by the orientation quaternion.
 */
export function sunGalacticPosition(time: number): THREE.Vector3 {
  // e = 0, so the eccentric anomaly equals the mean anomaly exactly.
  const meanAnomaly =
    SUN_GALACTIC_MEAN_ANOMALY_AT_EPOCH + SUN_GALACTIC_ANGULAR_MOTION * time;
  const x = SUN_GALACTIC_RADIUS_KM * Math.cos(meanAnomaly);
  const y = SUN_GALACTIC_RADIUS_KM * Math.sin(meanAnomaly);
  const v = new THREE.Vector3(x, y, 0);
  return v.applyQuaternion(SUN_GALACTIC_ORIENTATION);
}
