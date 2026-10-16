import { describe, expect, it } from 'vitest';

import {
  MILKY_WAY_MIN_Z_DISTANCE_KM,
  MILKY_WAY_RADIUS_KM,
  MILKY_WAY_SPRITE_KM,
  MILKY_WAY_SYSTEM_RADIUS_KM,
  SUN_SYSTEM_RADIUS_KM,
  galacticOrientation,
  milkyWayVisible,
} from '../src/lib/scene/milky-way';

const AXIS = {
  x: [1, 0, 0] as [number, number, number],
  y: [0, 1, 0] as [number, number, number],
  z: [0, 0, 1] as [number, number, number],
} as const;

/** Rotate a vector by the galactic quaternion. */
function rotate(q: { x: number; y: number; z: number; w: number }, v: [number, number, number]) {
  const [x, y, z] = v;
  const tx = 2 * (q.y * z - q.z * y);
  const ty = 2 * (q.z * x - q.x * z);
  const tz = 2 * (q.x * y - q.y * x);
  return [
    x + q.w * tx + (q.y * tz - q.z * ty),
    y + q.w * ty + (q.z * tx - q.x * tz),
    z + q.w * tz + (q.x * ty - q.y * tx),
  ] as [number, number, number];
}

describe('galactic orientation', () => {
  const q = galacticOrientation();

  it('is a unit quaternion', () => {
    expect(Math.hypot(q.x, q.y, q.z, q.w)).toBeCloseTo(1, 9);
  });

  it('points the sprite X axis at the galactic centre', () => {
    // NASA's second reference vector, from lon 266.40499625, lat -28.93617241667.
    const lon = (266.40499625 * Math.PI) / 180;
    const lat = (-28.93617241667 * Math.PI) / 180;
    const gc = [Math.cos(lon) * Math.cos(lat), Math.sin(lon) * Math.cos(lat), Math.sin(lat)];

    const x = rotate(q, AXIS.x);
    expect(x[0]).toBeCloseTo(gc[0], 6);
    expect(x[1]).toBeCloseTo(gc[1], 6);
    expect(x[2]).toBeCloseTo(gc[2], 6);
  });

  it('points the sprite Z axis at the north galactic pole', () => {
    // NASA's first reference vector, from lon 192.85948120833, lat 27.12825119444.
    const lon = (192.85948120833 * Math.PI) / 180;
    const lat = (27.12825119444 * Math.PI) / 180;
    const ngp = [Math.cos(lon) * Math.cos(lat), Math.sin(lon) * Math.cos(lat), Math.sin(lat)];

    const z = rotate(q, AXIS.z);
    expect(z[0]).toBeCloseTo(ngp[0], 6);
    expect(z[1]).toBeCloseTo(ngp[1], 6);
    expect(z[2]).toBeCloseTo(ngp[2], 6);
  });

  it('keeps the basis right-handed', () => {
    const x = rotate(q, AXIS.x);
    const y = rotate(q, AXIS.y);
    const z = rotate(q, AXIS.z);
    // x cross y should equal z.
    const cx = y[1] * z[2] - y[2] * z[1];
    const cy = y[2] * z[0] - y[0] * z[2];
    const cz = y[0] * z[1] - y[1] * z[0];
    expect(Math.hypot(cx - x[0], cy - x[1], cz - x[2])).toBeLessThan(1e-6);
  });
});

describe('milky way dimensions', () => {
  it('uses NASA´s sprite size and radii', () => {
    expect(MILKY_WAY_SPRITE_KM).toBe(1.2e18);
    expect(MILKY_WAY_RADIUS_KM).toBe(1e18);
    expect(MILKY_WAY_SYSTEM_RADIUS_KM).toBe(13e18);
    expect(SUN_SYSTEM_RADIUS_KM).toBeCloseTo(2.991957e13, 0);
  });

  it('reveals the sprite only beyond the z-distance threshold', () => {
    expect(milkyWayVisible(MILKY_WAY_MIN_Z_DISTANCE_KM)).toBe(true);
    // Use a relative step: subtracting 1 from 1.2e16 is lost to float precision.
    expect(milkyWayVisible(MILKY_WAY_MIN_Z_DISTANCE_KM * 0.99)).toBe(false);
    // The sprite is far larger than the Sun's system, as NASA intends.
    expect(MILKY_WAY_SPRITE_KM).toBeGreaterThan(SUN_SYSTEM_RADIUS_KM * 1000);
  });
});
