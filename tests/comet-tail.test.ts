import { describe, expect, it } from 'vitest';

import {
  COMET_TAIL_FADE_DISTANCE_KM,
  COMET_TAIL_MIN_CAMERA_DISTANCE_KM,
  buildCometTailGeometry,
  buildCometTailMaterial,
  cometTailsFor,
  seedCometTail,
} from '../src/lib/scene/comet-tail';

describe('comet tails (Entity.register building three per comet)', () => {
  it('builds exactly three, as NASA does', () => {
    expect(cometTailsFor()).toHaveLength(3);
  });

  it('makes the first an untinted dust tail', () => {
    const [dust] = cometTailsFor();
    expect(dust.color).toEqual([1, 1, 1, 1]);
    expect(dust.starAccelerationMultiplier).toBe(1);
    expect(dust.numberOfParticles).toBe(200);
    expect(dust.timeLength).toBe(600_000);
  });

  it('makes the second a blue ion tail pushed ten times harder', () => {
    const [, ion] = cometTailsFor();
    expect(ion.color).toEqual([0.214, 0.235, 0.371, 0.5]);
    // The 10x is what separates the ion tail from the dust tail.
    expect(ion.starAccelerationMultiplier).toBe(10);
    expect(ion.numberOfParticles).toBe(200);
  });

  it('makes the third a single-particle coma', () => {
    const [, , coma] = cometTailsFor();
    expect(coma.numberOfParticles).toBe(1);
    expect(coma.starAccelerationMultiplier).toBe(0);
    // Alpha 10 is over-unity on purpose; the fragment shader halves it.
    expect(coma.color).toEqual([1, 1, 1, 10]);
  });

  it('halves the ion tail´s length relative to the dust tail', () => {
    // `ion.setTimeLength(0.5 * dust.getTimeLength())`, verbatim.
    const [dust, ion] = cometTailsFor();
    expect(ion.timeLength).toBe(0.5 * dust.timeLength);
    expect(cometTailsFor(300_000)[1].timeLength).toBe(150_000);
  });

  it('carries a declared timeLength through to the dust tail', () => {
    expect(cometTailsFor(123_456)[0].timeLength).toBe(123_456);
    expect(cometTailsFor(123_456)[1].timeLength).toBe(61_728);
  });
});

describe('comet tail geometry', () => {
  it('is an instanced unit quad', () => {
    const geometry = buildCometTailGeometry(200);
    const position = geometry.getAttribute('position');
    expect(position.count).toBe(4);
    expect(geometry.getIndex()!.count).toBe(6);
    expect(geometry.instanceCount).toBe(200);

    for (const name of ['originTime', 'originPosition', 'accelerationMultiplier']) {
      const attr = geometry.getAttribute(name);
      expect(attr).toBeDefined();
      expect(attr.count).toBe(200);
    }
    // originTime and accelerationMultiplier are per-instance scalars; the
    // position is per-instance vec3.
    expect(geometry.getAttribute('originTime').itemSize).toBe(1);
    expect(geometry.getAttribute('originPosition').itemSize).toBe(3);
  });

  it('honours the particle count', () => {
    expect(buildCometTailGeometry(1).instanceCount).toBe(1);
    expect(buildCometTailGeometry(1).getAttribute('originTime').count).toBe(1);
  });
});

describe('seeding the tail history', () => {
  it('spreads particles evenly back from now', () => {
    const geometry = buildCometTailGeometry(4);
    seedCometTail(geometry, 4, 1000, 400);
    const originTime = geometry.getAttribute('originTime');
    // particle i of n is born at now - (i / n) * timeLength
    expect(originTime.getX(0)).toBeCloseTo(1000, 6);
    expect(originTime.getX(1)).toBeCloseTo(900, 6);
    expect(originTime.getX(2)).toBeCloseTo(800, 6);
    expect(originTime.getX(3)).toBeCloseTo(700, 6);
  });

  it('randomises the per-particle acceleration, as NASA does', () => {
    const geometry = buildCometTailGeometry(64);
    seedCometTail(geometry, 64, 0, 600_000);
    const accel = geometry.getAttribute('accelerationMultiplier');
    let nonZero = 0;
    for (let i = 0; i < 64; i++) {
      const v = accel.getX(i);
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
      if (v > 0) nonZero += 1;
    }
    // Astronomically unlikely for all 64 to land on exactly 0.
    expect(nonZero).toBeGreaterThan(50);
  });
});

describe('comet tail material', () => {
  it('carries NASA´s uniform names and settings', () => {
    const [dust] = cometTailsFor();
    const material = buildCometTailMaterial(dust);
    for (const name of [
      'time', 'timeLength', 'positionInCamera', 'starAbsoluteMagnitude',
      'starAccelerationMultiplier', 'positionOfEntity', 'color',
    ]) {
      expect(material.uniforms[name]).toBeDefined();
    }
    expect(material.transparent).toBe(true);
    expect(material.depthWrite).toBe(false);
    expect(material.side).toBe(2); // THREE.DoubleSide
  });

  it('uses NASA´s near-field cull distances', () => {
    // Hidden below 40,000 km, faded in over the next 400,000.
    expect(COMET_TAIL_MIN_CAMERA_DISTANCE_KM).toBe(4e4);
    expect(COMET_TAIL_FADE_DISTANCE_KM).toBe(4e5);
  });
});
