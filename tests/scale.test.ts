import { describe, expect, it } from 'vitest';

import {
  AU_KM,
  SCENE_EXTENT,
  projectToScene,
  scaleDistance,
  scaleRadius,
  unscaleDistance,
} from '../src/lib/scene/scale';

describe('scaleDistance', () => {
  it('is odd and passes through the origin', () => {
    expect(scaleDistance(0)).toBe(0);
    expect(scaleDistance(-5 * AU_KM)).toBeCloseTo(-scaleDistance(5 * AU_KM), 9);
  });

  it('is strictly monotonic across the whole modelled range', () => {
    let prev = -Infinity;
    for (let au = 0; au <= 60; au += 0.05) {
      const v = scaleDistance(au * AU_KM);
      expect(v).toBeGreaterThan(prev);
      prev = v;
    }
  });

  it('keeps the inner planets visibly separated', () => {
    const mercury = scaleDistance(0.387 * AU_KM);
    const venus = scaleDistance(0.723 * AU_KM);
    const earth = scaleDistance(1.0 * AU_KM);
    const mars = scaleDistance(1.524 * AU_KM);
    // Each inner step should be at least a couple of scene units apart.
    expect(venus - mercury).toBeGreaterThan(4);
    expect(earth - venus).toBeGreaterThan(4);
    expect(mars - earth).toBeGreaterThan(4);
  });

  it('compresses the outer system so Neptune still fits a finite scene', () => {
    const neptune = scaleDistance(30.07 * AU_KM);
    // Neptune is ~78× farther than Mercury in reality; the scale must pull that
    // down substantially while still keeping the ordering and separation.
    expect(neptune / scaleDistance(0.387 * AU_KM)).toBeLessThan(22);
    expect(neptune / scaleDistance(0.387 * AU_KM)).toBeGreaterThan(12);
    // ...and the whole system stays within the modelled extent.
    expect(neptune).toBeLessThan(SCENE_EXTENT);
  });

  it('has no slope discontinuity at the segment joins', () => {
    const eps = 1e-4 * AU_KM;
    for (const joinAu of [2, 40]) {
      const at = joinAu * AU_KM;
      const left = (scaleDistance(at) - scaleDistance(at - eps)) / eps;
      const right = (scaleDistance(at + eps) - scaleDistance(at)) / eps;
      // Allow a small tolerance for the finite difference.
      expect(Math.abs(left - right) / Math.max(1e-6, Math.abs(left))).toBeLessThan(0.02);
    }
  });
});

describe('unscaleDistance', () => {
  it('round-trips scaleDistance across the range', () => {
    for (const au of [0.1, 0.39, 1, 1.52, 5.2, 9.58, 19.2, 30.07, 45, 60]) {
      const km = au * AU_KM;
      expect(unscaleDistance(scaleDistance(km))).toBeCloseTo(km, 3);
    }
  });
});

describe('scaleRadius', () => {
  it('grows with real radius and never collapses to zero', () => {
    expect(scaleRadius(1)).toBeGreaterThan(0.1);
    expect(scaleRadius(1737)).toBeLessThan(scaleRadius(6378));
    expect(scaleRadius(6378)).toBeLessThan(scaleRadius(695500));
  });

  it('keeps the Sun scene size consistent with the planet spacing', () => {
    // The Sun must not swallow Mercury's orbit (0.387 AU).
    expect(scaleRadius(695500)).toBeLessThan(scaleDistance(0.387 * AU_KM) * 0.6);
  });
});

describe('projectToScene', () => {
  it('preserves direction exactly and compresses only magnitude', () => {
    const p = { x: 3e7, y: -4e7, z: 1.2e8 };
    const out = projectToScene(p);
    const inDir = { x: p.x, y: p.y, z: p.z };
    const inLen = Math.hypot(inDir.x, inDir.y, inDir.z);
    const outLen = Math.hypot(out.x, out.y, out.z);
    for (const axis of ['x', 'y', 'z'] as const) {
      expect(out[axis] / outLen).toBeCloseTo(inDir[axis] / inLen, 9);
    }
    expect(outLen).toBeCloseTo(scaleDistance(inLen), 6);
  });

  it('maps the origin to the origin', () => {
    expect(projectToScene({ x: 0, y: 0, z: 0 })).toEqual({ x: 0, y: 0, z: 0 });
  });
});
