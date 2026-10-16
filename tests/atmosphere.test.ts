import { describe, expect, it } from 'vitest';

import {
  ATMOSPHERES,
  NUM_ITERATIONS,
  SCALE_HEIGHT_MULTIPLIER,
  buildAtmosphereGeometry,
} from '../src/lib/scene/atmosphere';

describe('atmosphere parameters (read live from the reference app)', () => {
  it('covers exactly the eight bodies NASA gives an atmosphere', () => {
    // Verified by probing the running app: sun plus the seven planets with air.
    expect(Object.keys(ATMOSPHERES).sort()).toEqual(
      ['earth', 'jupiter', 'mars', 'neptune', 'saturn', 'sun', 'uranus', 'venus'],
    );
  });

  it('gives Mercury no atmosphere', () => {
    expect(ATMOSPHERES.mercury).toBeUndefined();
  });

  it('makes only the Sun emissive', () => {
    expect(ATMOSPHERES.sun.emissivity).toBe(1);
    for (const id of ['venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']) {
      expect(ATMOSPHERES[id].emissivity).toBe(0);
    }
  });

  it('carries Earth´s over-unity blue, which is what brightens its limb', () => {
    expect(ATMOSPHERES.earth.color[2]).toBeGreaterThan(1);
    expect(ATMOSPHERES.earth.sunBrightness).toBe(2);
    expect(ATMOSPHERES.earth.scaleHeight).toBe(8);
    expect(ATMOSPHERES.earth.density).toBe(0.0015);
  });

  it('is the only body with a sunset enabled besides Uranus and Mars', () => {
    expect(ATMOSPHERES.earth.sunsetIntensity).toBe(1.2);
    expect(ATMOSPHERES.mars.sunsetIntensity).toBe(1);
    expect(ATMOSPHERES.uranus.sunsetIntensity).toBe(1);
    // The gas giants and Venus are flat.
    expect(ATMOSPHERES.jupiter.sunsetIntensity).toBe(0);
    expect(ATMOSPHERES.saturn.sunsetIntensity).toBe(0);
    expect(ATMOSPHERES.venus.sunsetIntensity).toBe(0);
    expect(ATMOSPHERES.neptune.sunsetIntensity).toBe(0);
  });

  it('gives Mars a distinctly blue sunset and Earth an orange one', () => {
    // Mars scatters red light away, so its sunsets are blue.
    const [r, , b] = ATMOSPHERES.mars.sunsetColor;
    expect(b).toBeGreaterThan(r);
    const earth = ATMOSPHERES.earth.sunsetColor;
    expect(earth).toEqual([1, 0.5, 0]);
  });

  it('uses NASA´s two giant/ice-giant values', () => {
    for (const id of ['jupiter', 'saturn', 'uranus', 'neptune']) {
      expect(ATMOSPHERES[id].density).toBe(0.00005);
      expect(ATMOSPHERES[id].scaleHeight).toBe(200);
    }
  });
});

describe('atmosphere geometry', () => {
  it('is NASA´s 64 x 129 lat/lon grid', () => {
    const geometry = buildAtmosphereGeometry();
    const position = geometry.getAttribute('position');
    expect(position.count).toBe(64 * 129);
    // Two triangles per quad over a 63 x 128 cell grid.
    expect(geometry.getIndex()!.count).toBe(63 * 128 * 6);
  });

  it('is a unit sphere, so radius scaling happens in the shader', () => {
    const geometry = buildAtmosphereGeometry();
    const position = geometry.getAttribute('position');
    // Step over vertices, not floats: attribute index i is vertex i.
    for (let i = 0; i < position.count; i += 97) {
      const len = Math.hypot(position.getX(i), position.getY(i), position.getZ(i));
      expect(len).toBeCloseTo(1, 5);
    }
  });

  it('uses NASA´s shell expansion and sample count', () => {
    expect(SCALE_HEIGHT_MULTIPLIER).toBe(20);
    expect(NUM_ITERATIONS).toBe(5);
  });
});
