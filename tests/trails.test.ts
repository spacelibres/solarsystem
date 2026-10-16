import { describe, expect, it } from 'vitest';
import * as THREE from 'three';

import { buildTrailGeometry, buildTrailMaterial } from '../src/lib/scene/trail-geometry';
import {
  PLANET_TRAIL_COLORS,
  TRAIL_DEFAULTS,
  TRAIL_LENGTHS,
  trailColorFor,
  trailLengthFor,
} from '../src/lib/scene/trails';
import { orbitColor } from '../src/lib/scene/orbit-colors';

describe('trail colours', () => {
  it('defaults to white at half opacity', () => {
    expect(TRAIL_DEFAULTS.color).toEqual([1, 1, 1, 0.5]);
    expect(trailColorFor('sc_voyager_1')).toEqual([1, 1, 1, 0.5]);
    expect(trailColorFor('101955_bennu')).toEqual([1, 1, 1, 0.5]);
  });

  it('tints the eight planets, verbatim from their trail.color', () => {
    expect(PLANET_TRAIL_COLORS.earth).toEqual([0, 0.6, 0.8, 0.7]);
    expect(PLANET_TRAIL_COLORS.mercury).toEqual([0.6, 0.6, 0.6, 0.7]);
    expect(PLANET_TRAIL_COLORS.saturn).toEqual([0.72, 0.65, 0.52, 0.7]);
    // Every planet trail is drawn at 0.7, unlike the ballistic 0.5 default.
    for (const c of Object.values(PLANET_TRAIL_COLORS)) {
      expect(c[3]).toBe(0.7);
    }
  });

  it('keeps trails and orbit lines as two separate colour tables', () => {
    // These genuinely differ in NASA's data; conflating them is the easy bug.
    // Mercury's trail is grey but its orbit line is purple.
    const mercuryTrail = trailColorFor('mercury');
    const mercuryOrbit = orbitColor('mercury').rgb;
    expect(mercuryTrail.slice(0, 3)).toEqual([0.6, 0.6, 0.6]);
    expect(mercuryOrbit[0]).not.toBeCloseTo(0.6, 2);

    // Uranus is the clearest case: pale cyan trail against a violet orbit line.
    const uranusTrail = trailColorFor('uranus');
    const uranusOrbit = orbitColor('uranus').rgb;
    expect(uranusTrail.slice(0, 3)).toEqual([0.67, 0.92, 1]);
    expect(uranusOrbit[2]).toBeGreaterThan(uranusOrbit[1]);

    // Earth's two colours happen to agree, which is a good sanity anchor.
    expect(trailColorFor('earth').slice(0, 3)).toEqual(orbitColor('earth').rgb);
  });

  it('gives the Galilean moons and Triton their planet´s tint', () => {
    expect(trailColorFor('ganymede')).toEqual([0.95, 0.71, 0.64, 0.7]);
    expect(trailColorFor('triton')).toEqual([0.48, 0.69, 1, 0.7]);
  });
});

describe('trail lengths', () => {
  it('uses the declared length when the entity table has one', () => {
    expect(trailLengthFor('sc_voyager_1')).toBe(946_080_000);
    expect(trailLengthFor('sc_new_horizons')).toBe(94_608_000);
    expect(TRAIL_LENGTHS.sc_voyager_1).toBe(946_080_000);
  });

  it('falls back to one orbital period, clamped', () => {
    // A 1-year orbit gives a 1-year trail.
    const year = 365.25 * 86400;
    expect(trailLengthFor('some_moon', year)).toBeCloseTo(year, 0);
    // Absurdly short and long periods are clamped to the sane range.
    expect(trailLengthFor('fast', 1)).toBeGreaterThanOrEqual(1e6);
    expect(trailLengthFor('slow', 1e12)).toBeLessThanOrEqual(9.46e8);
  });

  it('never returns a non-positive length', () => {
    expect(trailLengthFor('unknown')).toBeGreaterThan(0);
  });
});

describe('trail geometry', () => {
  const line = (n: number) =>
    Array.from({ length: n }, (_, i) => ({
      position: new THREE.Vector3(i * 1000, 0, 0),
      time: i,
    }));

  it('makes two vertices per sample, one per side', () => {
    const geometry = buildTrailGeometry(line(5));
    expect(geometry.getAttribute('position').count).toBe(10);
    const sides = geometry.getAttribute('side');
    expect(sides.getX(0)).toBe(1);
    expect(sides.getX(1)).toBe(-1);
    const alpha = geometry.getAttribute('alpha');
    // Alpha ramps 0 at the tail to 1 at the head, so a trail fades with age.
    expect(alpha.getX(0)).toBe(0);
    expect(alpha.getX(9)).toBe(1);
  });

  it('emits two triangles per segment', () => {
    const geometry = buildTrailGeometry(line(4));
    expect(geometry.getIndex()!.count).toBe(3 * 6);
  });

  it('survives a degenerate input', () => {
    const geometry = buildTrailGeometry([{ position: new THREE.Vector3(), time: 0 }]);
    expect(geometry.getAttribute('position').count).toBe(0);
    expect(() => buildTrailGeometry([])).not.toThrow();
  });

  it('normalises the per-vertex direction', () => {
    const geometry = buildTrailGeometry(line(3));
    const dir = geometry.getAttribute('direction');
    for (let i = 0; i < dir.count; i++) {
      expect(Math.hypot(dir.getX(i), dir.getY(i))).toBeCloseTo(1, 5);
    }
  });
});

describe('trail material', () => {
  it('carries NASA´s uniform names', () => {
    const material = buildTrailMaterial([1, 1, 1, 0.5]);
    for (const name of ['color', 'widthMin', 'widthMax', 'alphaMultiplier', 'viewportSize']) {
      expect(material.uniforms[name]).toBeDefined();
    }
    // NASA's ribbon is 2 px wide at the head and tapers to nothing.
    expect(material.uniforms.widthMax.value).toBe(2);
    expect(material.uniforms.widthMin.value).toBe(0);
    expect(material.transparent).toBe(true);
  });
});
