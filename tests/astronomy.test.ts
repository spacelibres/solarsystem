import { describe, expect, it } from 'vitest';

import {
  CONSTELLATION_COUNT,
  CONTEXTUAL_LAYERS,
  FRAMES,
  GALACTIC_REFERENCE,
  KILOPARSEC_KM,
  LAYER_CATEGORIES,
  LAYERS,
  LIGHT_YEAR_KM,
  PARSEC_KM,
  SUN_POSITION,
  SUN_SPRITE_POSITION,
  equatorialToGalactic,
  galacticAxes,
} from '../src/lib/nasa/astronomy';
import { galacticOrientation } from '../src/lib/scene/milky-way';
import { SUN_GALACTIC_RADIUS_KM } from '../src/lib/scene/galactic-orbit';

/** Rotate a vector by a quaternion (w-first storage agnostic helper). */
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

describe('galactic reference frame', () => {
  it('uses the IAU 1958 pole and centre directions', () => {
    // Adopted at the 1958 IAU General Assembly; these are the canonical values.
    expect(GALACTIC_REFERENCE.pole.lonDeg).toBeCloseTo(192.85948120833, 9);
    expect(GALACTIC_REFERENCE.pole.latDeg).toBeCloseTo(27.12825119444, 9);
    expect(GALACTIC_REFERENCE.centre.lonDeg).toBeCloseTo(266.40499625, 9);
    expect(GALACTIC_REFERENCE.centre.latDeg).toBeCloseTo(-28.93617241667, 9);
  });

  it('builds an orthonormal right-handed axis set', () => {
    const { x, y, z } = galacticAxes();
    const dot = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    expect(dot(x, x)).toBeCloseTo(1, 9);
    expect(dot(y, y)).toBeCloseTo(1, 9);
    expect(dot(z, z)).toBeCloseTo(1, 9);
    expect(dot(x, y)).toBeCloseTo(0, 9);
    expect(dot(x, z)).toBeCloseTo(0, 9);
    expect(dot(y, z)).toBeCloseTo(0, 9);
    // Right-handed: x cross y = z.
    const cx = [x[1] * y[2] - x[2] * y[1], x[2] * y[0] - x[0] * y[2], x[0] * y[1] - x[1] * y[0]];
    expect(cx[0]).toBeCloseTo(z[0], 9);
    expect(cx[1]).toBeCloseTo(z[1], 9);
    expect(cx[2]).toBeCloseTo(z[2], 9);
  });

  it('agrees with the sprite orientation NASA builds', () => {
    // The sprite X axis points at the galactic centre, Z at the NGP; the axes we
    // derive for the coordinate conversion must be the same vectors.
    const q = galacticOrientation();
    const { x, z } = galacticAxes();
    const spriteX = rotate(q, [1, 0, 0]);
    const spriteZ = rotate(q, [0, 0, 1]);
    expect(spriteX[0]).toBeCloseTo(x[0], 6);
    expect(spriteX[1]).toBeCloseTo(x[1], 6);
    expect(spriteX[2]).toBeCloseTo(x[2], 6);
    expect(spriteZ[0]).toBeCloseTo(z[0], 6);
    expect(spriteZ[1]).toBeCloseTo(z[1], 6);
    expect(spriteZ[2]).toBeCloseTo(z[2], 6);
  });

  it('puts the galactic centre at l = 0, b = 0', () => {
    const { x } = galacticAxes();
    const { lDeg, bDeg } = equatorialToGalactic(x);
    expect(lDeg).toBeCloseTo(0, 6);
    expect(bDeg).toBeCloseTo(0, 6);
  });

  it('puts the north galactic pole at b = +90', () => {
    const { z } = galacticAxes();
    const { bDeg } = equatorialToGalactic(z);
    expect(bDeg).toBeCloseTo(90, 6);
  });

  it('puts the l = 90 direction at l = 90, b = 0', () => {
    const { y } = galacticAxes();
    const { lDeg, bDeg } = equatorialToGalactic(y);
    expect(lDeg).toBeCloseTo(90, 6);
    expect(bDeg).toBeCloseTo(0, 6);
  });
});

describe('the Sun in the Galaxy', () => {
  it('sits 7.98 kpc = 26,027 ly from the galactic centre', () => {
    expect(SUN_POSITION.galactocentricKm).toBe(SUN_GALACTIC_RADIUS_KM);
    expect(SUN_POSITION.galactocentricKpc).toBeCloseTo(7.98, 2);
    expect(SUN_POSITION.galactocentricParsec).toBeCloseTo(7980, 0);
    expect(SUN_POSITION.galactocentricLightYears).toBeCloseTo(26027.28, 1);
  });

  it('lies on the galactic centre line, in the plane', () => {
    // l = 0 and b = 0: the Sun is along the Sun→centre direction, in the plane.
    // This is what makes it land on the sprite's horizontal centreline.
    expect(SUN_POSITION.galacticLongitudeDeg).toBe(0);
    expect(SUN_POSITION.galacticLatitudeDeg).toBe(0);
  });

  it('is far from the centre — nowhere near it', () => {
    // Guard the bug this whole framework exists to fix: the solar system is not
    // at the galactic centre.
    expect(SUN_POSITION.galactocentricKpc).toBeGreaterThan(7);
    expect(SUN_POSITION.galactocentricLightYears).toBeGreaterThan(25000);
  });
});

describe('the Sun on the Milky Way sprite', () => {
  it('lands 210 px left of the galactic centre on a 1024 texture', () => {
    // 246237071e9 / 1.2e18 = 0.20519756 → 0.20519756 * 1024 = 210.12 px.
    expect(SUN_SPRITE_POSITION.fraction).toBeCloseTo(0.2051976, 6);
    expect(SUN_SPRITE_POSITION.pixelX).toBeCloseTo(301.88, 1);
    expect(SUN_SPRITE_POSITION.pixelY).toBe(512);
  });

  it('keeps u below the centre because the sprite X axis points at the centre', () => {
    expect(SUN_SPRITE_POSITION.u).toBeLessThan(0.5);
    expect(SUN_SPRITE_POSITION.u).toBeCloseTo(0.2948, 4);
    expect(SUN_SPRITE_POSITION.v).toBe(0.5);
  });

  it('derives a consistent km-per-texel scale', () => {
    expect(SUN_SPRITE_POSITION.kmPerTexel).toBeCloseTo(1.171875e15, 0);
    // Half-width is exactly 512 texels of the 1.2e18 km sprite.
    expect(SUN_SPRITE_POSITION.kmPerTexel * 512).toBeCloseTo(6e17, 0);
  });
});

describe('unit constants', () => {
  it('matches the IAU parsec and the light year NASA uses', () => {
    expect(PARSEC_KM).toBeCloseTo(3.0856775814913673e13, 0);
    expect(KILOPARSEC_KM).toBeCloseTo(3.0856775814913673e16, 0);
    expect(LIGHT_YEAR_KM).toBeCloseTo(9.4607304725808e12, 0);
    expect(CONSTELLATION_COUNT).toBe(88);
  });
});

describe('layer taxonomy', () => {
  it('matches NASA´s 18 addLayer calls', () => {
    expect(LAYERS).toHaveLength(18);
    const ids = LAYERS.map((l) => l.id);
    for (const expected of [
      'ui', 'trails', 'orbits', 'labels', 'icons',
      'planets', 'asteroids', 'comets', 'dwarfPlanets', 'spacecraft',
      'majorMoons', 'minorMoons', 'orbiters', 'satelliteGroup', 'landers',
      'starfield', 'heliosphere', 'constellations',
    ]) {
      expect(ids).toContain(expected);
    }
  });

  it('turns planets, major moons and spacecraft on by default', () => {
    const on = LAYERS.filter((l) => l.defaultVisible).map((l) => l.id);
    expect(on).toContain('planets');
    expect(on).toContain('majorMoons');
    expect(on).toContain('spacecraft');
    // NASA leaves asteroids, comets, dwarf planets and constellations off.
    expect(on).not.toContain('asteroids');
    expect(on).not.toContain('constellations');
  });

  it('ties sublayers to their parent layer', () => {
    const spacecraft = LAYERS.find((l) => l.id === 'spacecraft')!;
    expect(spacecraft.sublayers).toEqual(['orbiters', 'landers', 'satelliteGroup']);
    for (const sub of spacecraft.sublayers ?? []) {
      expect(LAYERS.find((l) => l.id === sub)?.group).toBe('spacecraft');
    }
  });

  it('groups the moon layers', () => {
    expect(LAYERS.find((l) => l.id === 'majorMoons')?.group).toBe('moons');
    expect(LAYERS.find((l) => l.id === 'minorMoons')?.group).toBe('moons');
  });

  it('records the satellite-group categories NASA lists', () => {
    expect(LAYERS.find((l) => l.id === 'satelliteGroup')?.categories).toEqual([
      'CYGNSS', 'TROPICS', 'STARLING', 'PREFIRE',
    ]);
  });

  it('maps layer ids to content categories', () => {
    expect(LAYER_CATEGORIES.planets).toBe('Planet');
    expect(LAYER_CATEGORIES.dwarfPlanets).toBe('Dwarf Planet');
    expect(LAYER_CATEGORIES.constellations).toBe('Constellations');
  });

  it('knows which layers are contextual to the focused body', () => {
    expect(CONTEXTUAL_LAYERS).toContain('majorMoons');
    expect(CONTEXTUAL_LAYERS).toContain('heliosphere');
    expect(CONTEXTUAL_LAYERS).not.toContain('planets');
  });

  it('names the three frames the scene uses', () => {
    expect(Object.values(FRAMES)).toHaveLength(3);
  });
});
