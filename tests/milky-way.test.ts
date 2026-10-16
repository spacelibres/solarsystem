import { describe, expect, it } from 'vitest';

import {
  GALAXY_SPIN_AXIS_KM,
  GALAXY_SPIN_RATE,
  MILKY_WAY_MIN_Z_DISTANCE_KM,
  MILKY_WAY_RADIUS_KM,
  MILKY_WAY_SPRITE_KM,
  MILKY_WAY_SYSTEM_RADIUS_KM,
  SUN_SYSTEM_RADIUS_KM,
  galacticOrientation,
  galaxySpinAngle,
  milkyWayVisible,
  projectSunOntoBackdrop,
  sunGalacticOffset,
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

describe('the galaxy spin', () => {
  it('uses the north galactic pole as its axis', () => {
    // NASA's literal is the NGP row of the IAU galactic matrix.
    expect(Math.hypot(GALAXY_SPIN_AXIS_KM.x, GALAXY_SPIN_AXIS_KM.y, GALAXY_SPIN_AXIS_KM.z)).toBeCloseTo(1, 9);
    expect(GALAXY_SPIN_AXIS_KM.x).toBeCloseTo(-0.8676661356982597, 12);
    expect(GALAXY_SPIN_AXIS_KM.z).toBeCloseTo(0.45598379452940485, 12);
  });

  it('turns at the same rate as the Sun orbits the centre', () => {
    // NASA reuses the Sun's mean motion for the galaxy's spin.
    expect(GALAXY_SPIN_RATE).toBe(-2_192_686e-23);
    expect(galaxySpinAngle(0)).toBeCloseTo(0, 12);
    expect(galaxySpinAngle(1e16)).toBeCloseTo(-0.2192686, 7);
  });
});

describe('the Sun offset in the galaxy', () => {
  it('lies on the sprite -X axis, pointing away from the centre', () => {
    const offset = sunGalacticOffset();
    // Length is the galactocentric distance. At 2.46e17 km the float64 ulp is
    // ~32 km, so compare relatively rather than absolutely.
    expect(offset.length() / 246237071e9).toBeCloseTo(1, 15);
    // ...and it is anti-parallel to the sprite's +X (galactic centre) axis.
    const centre = rotate(galacticOrientation(), AXIS.x);
    const dot = (offset.x * centre[0] + offset.y * centre[1] + offset.z * centre[2]) / offset.length();
    expect(dot).toBeCloseTo(-1, 9);
  });
});

describe('the Sun on the backdrop', () => {
  it('maps to the sprite UV, not the centre', () => {
    // A 2D scene.background is a screen-aligned fullscreen quad, so the sprite
    // centre lands at the viewport centre and the Sun sits at its fixed UV.
    const p = projectSunOntoBackdrop(1000, 600);
    expect(p.u).toBeCloseTo(0.2948, 4);
    expect(p.v).toBe(0.5);
    expect(p.x).toBeCloseTo(294.8, 0);
    expect(p.y).toBeCloseTo(300, 0);
    // The Sun is left of the galactic centre, which is the whole point.
    expect(p.x).toBeLessThan(500);
  });

  it('scales with the viewport', () => {
    const wide = projectSunOntoBackdrop(1600, 900);
    const narrow = projectSunOntoBackdrop(800, 450);
    expect(wide.x).toBeCloseTo(2 * narrow.x, 6);
    expect(wide.y).toBeCloseTo(2 * narrow.y, 6);
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
