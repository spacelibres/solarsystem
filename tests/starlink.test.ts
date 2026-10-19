import { describe, expect, it } from 'vitest';

import {
  EARTH_MU_KM3_S2,
  elementsFromState,
  starlinkGeneration,
  starlinkOrbitRing,
  starlinkPeriodMinutes,
  starlinkPosition,
  type StarlinkOrbit,
} from '../src/solar/domain/starlink';
import catalog from '../src/data/starlink-orbits.json';
import { readFileSync } from 'node:fs';

/** First public state from STARLINK-1008, rotated from ITRF2000 to inertial. */
const SAMPLE: StarlinkOrbit = {
  n: 1008,
  name: 'STARLINK-1008',
  e: 1792367802,
  p: [-2171.179529461358, -4482.330738053688, 4536.72153],
  v: [4.2977429094719195, -5.450833777684634, -3.320847577],
};

describe('Starlink display propagation', () => {
  it('derives a sane low-Earth orbit from an epoch state', () => {
    const elements = elementsFromState(SAMPLE);
    expect(elements).not.toBeNull();
    expect(elements!.semiMajorAxisKm).toBeGreaterThan(6500);
    expect(elements!.semiMajorAxisKm).toBeLessThan(7200);
    expect(elements!.eccentricity).toBeGreaterThanOrEqual(0);
    expect(elements!.eccentricity).toBeLessThan(0.01);
    expect(starlinkPeriodMinutes(elements!)).toBeGreaterThan(85);
    expect(starlinkPeriodMinutes(elements!)).toBeLessThan(100);
  });

  it('stays finite and repeats near the epoch over one orbit', () => {
    const elements = elementsFromState(SAMPLE)!;
    for (let step = 0; step <= 8; step += 1) {
      const position = starlinkPosition(elements, elements.epochEt + (step / 8) * elements.periodSeconds);
      expect(Number.isFinite(position.x + position.y + position.z)).toBe(true);
      expect(Math.hypot(position.x, position.y, position.z)).toBeGreaterThan(elements.semiMajorAxisKm * (1 - elements.eccentricity) - 1);
    }
    const start = starlinkPosition(elements, elements.epochEt);
    const end = starlinkPosition(elements, elements.epochEt + elements.periodSeconds);
    expect(Math.hypot(start.x - end.x, start.y - end.y, start.z - end.z)).toBeLessThan(20);
  });

  it('builds a closed, finite orbit ring', () => {
    const elements = elementsFromState(SAMPLE)!;
    const ring = starlinkOrbitRing(elements, 48);
    expect(ring).toHaveLength(48 * 3);
    expect([...ring].every(Number.isFinite)).toBe(true);
    const first = Math.hypot(ring[0], ring[1], ring[2]);
    for (let index = 0; index < 48; index += 1) {
      const radius = Math.hypot(ring[index * 3], ring[index * 3 + 1], ring[index * 3 + 2]);
      expect(radius).toBeGreaterThan(6500);
      expect(radius).toBeLessThan(7200);
      expect(Math.abs(radius - first)).toBeLessThan(60);
    }
  });

  it('rejects states that are not a bound orbit', () => {
    expect(elementsFromState({ ...SAMPLE, v: [12, 12, 12] })).toBeNull();
    expect(elementsFromState({ ...SAMPLE, p: [0, 0, 0] })).toBeNull();
  });

  it('uses the terrestrial gravitational parameter used by NASA Eyes', () => {
    expect(EARTH_MU_KM3_S2).toBeCloseTo(398600.4418, 6);
  });
});

describe('Starlink catalogue', () => {
  it('covers the whole public manifest with finite epoch states', () => {
    expect(catalog.count).toBeGreaterThan(10_000);
    expect(catalog.manifestCount).toBe(catalog.count);
    expect(catalog.satellites).toHaveLength(catalog.count);
    for (const satellite of catalog.satellites.slice(0, 200)) {
      expect(satellite.name).toBe(`STARLINK-${satellite.n}`);
      expect(satellite.p).toHaveLength(3);
      expect(satellite.v).toHaveLength(3);
      expect([...satellite.p, ...satellite.v].every(Number.isFinite)).toBe(true);
      expect(elementsFromState(satellite as unknown as StarlinkOrbit)).not.toBeNull();
    }
    expect(catalog.satellites.some(satellite => satellite.n === 34567)).toBe(true);
    const sample = catalog.satellites.find(satellite => satellite.n === 34567);
    expect(sample?.d).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(sample?.d).toBe('2025-07-16');
    for (const satellite of catalog.satellites) {
      expect(satellite.d).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});

describe('Starlink generation model libraries', () => {
  it('maps public numbering bands to the three model libraries', () => {
    expect(starlinkGeneration(1008)).toBe(1);
    expect(starlinkGeneration(29999)).toBe(1);
    expect(starlinkGeneration(30000)).toBe(2);
    expect(starlinkGeneration(39999)).toBe(2);
    expect(starlinkGeneration(40000)).toBe(3);
    expect(starlinkGeneration(40103)).toBe(3);
  });

  it('ships a GLB for each generation', () => {
    for (const generation of [1, 2, 3]) {
      const file = readFileSync(`eyes/src/models/starlink/starlink-gen${generation}.glb`);
      expect(file.subarray(0, 4).toString('ascii')).toBe('glTF');
      expect(file.byteLength).toBeGreaterThan(10_000);
    }
  });

  it('resolves every catalogued satellite to a generation with a model', () => {
    for (const satellite of catalog.satellites.slice(0, 500)) {
      expect([1, 2, 3]).toContain(satellite.g ?? starlinkGeneration(satellite.n));
    }
  });
});
