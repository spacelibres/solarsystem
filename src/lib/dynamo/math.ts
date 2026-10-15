/**
 * Vector / quaternion math used by the dynamo parser.
 *
 * Kept dependency-free so the parser can run in a Web Worker, in tests under
 * Node, or in the browser bundle without pulling in Three.js.
 */

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/** Quaternion ordered (x, y, z, w) — the order NASA Eyes writes to .dyn files. */
export interface Quat {
  x: number;
  y: number;
  z: number;
  w: number;
}

export const vec3 = (x: number, y: number, z: number): Vec3 => ({ x, y, z });

/** Active rotation of a vector by a unit quaternion (x, y, z, w). */
export function rotateByQuat(v: Vec3, q: Quat): Vec3 {
  const { x, y, z, w } = q;
  // t = 2 * (q_vec × v)
  const tx = 2 * (y * v.z - z * v.y);
  const ty = 2 * (z * v.x - x * v.z);
  const tz = 2 * (x * v.y - y * v.x);
  // v' = v + w * t + q_vec × t
  return {
    x: v.x + w * tx + (y * tz - z * ty),
    y: v.y + w * ty + (z * tx - x * tz),
    z: v.z + w * tz + (x * ty - y * tx),
  };
}

export function quatLength(q: Quat): number {
  return Math.hypot(q.x, q.y, q.z, q.w);
}

export function vec3Length(v: Vec3): number {
  return Math.hypot(v.x, v.y, v.z);
}
