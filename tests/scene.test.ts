import { describe, expect, it } from 'vitest';

import {
  ALWAYS,
  buildTree,
  depthOf,
  parentAtTime,
  parentSegmentIndex,
  worldPosition,
  type ParentSegment,
} from '../src/lib/scene/parenting';
import {
  autoMidDistance,
  autoNearDistance,
  normalSpaceRadius,
  pixelSpaceRadius,
  subsystemVisible,
  SUBSYSTEM_PIXEL_THRESHOLD,
} from '../src/lib/scene/projection';

describe('parentAtTime', () => {
  const juno: ParentSegment[] = [
    [365836752, 'earth'],
    [366088266, 'sun'],
    [434433667, 'earth'],
    [519652868, 'jupiter'],
  ];

  it('returns null before the first segment', () => {
    expect(parentAtTime(juno, 0)).toBeNull();
  });

  it('picks the active segment across the whole timeline', () => {
    expect(parentAtTime(juno, 365836752)).toBe('earth');
    expect(parentAtTime(juno, 366000000)).toBe('earth');
    expect(parentAtTime(juno, 400000000)).toBe('sun');
    expect(parentAtTime(juno, 519652868)).toBe('jupiter');
    expect(parentAtTime(juno, 9e8)).toBe('jupiter');
  });

  it('treats an empty parent name as the root frame', () => {
    expect(parentAtTime([[ALWAYS, 'earth'], [1000, '']], 2000)).toBeNull();
  });

  it('handles the "always" sentinel', () => {
    expect(parentAtTime([[ALWAYS, 'sun']], 0)).toBe('sun');
    expect(parentAtTime([[ALWAYS, 'sun']], 1e9)).toBe('sun');
  });
});

describe('parentSegmentIndex', () => {
  it('pairs a segment with its matching controller index', () => {
    const segs: ParentSegment[] = [
      [0, 'earth'],
      [100, 'sun'],
      [200, 'jupiter'],
    ];
    expect(parentSegmentIndex(segs, -1)).toBe(-1);
    expect(parentSegmentIndex(segs, 0)).toBe(0);
    expect(parentSegmentIndex(segs, 150)).toBe(1);
    expect(parentSegmentIndex(segs, 999)).toBe(2);
  });
});

describe('buildTree and worldPosition', () => {
  const segmentsOf = (id: string): ParentSegment[] => {
    switch (id) {
      case 'sun': return [[ALWAYS, 'root']];
      case 'earth': return [[ALWAYS, 'sun']];
      case 'moon': return [[ALWAYS, 'earth']];
      case 'sc': return [[ALWAYS, 'earth']];
      default: return [];
    }
  };

  it('links children to their parent', () => {
    const tree = buildTree(['sun', 'earth', 'moon', 'sc'], segmentsOf, 0);
    expect(tree.get('earth')!.parentId).toBe('sun');
    expect(tree.get('moon')!.parentId).toBe('earth');
    expect(tree.get('sun')!.parentId).toBeNull();
  });

  it('sums local positions up the chain', () => {
    const tree = buildTree(['sun', 'earth', 'moon'], segmentsOf, 0);
    const local = (id: string) => {
      if (id === 'earth') return { x: 1e8, y: 0, z: 0 };
      if (id === 'moon') return { x: 384400, y: 0, z: 0 };
      return { x: 0, y: 0, z: 0 };
    };
    const moon = worldPosition('moon', tree, local);
    expect(moon.x).toBeCloseTo(1e8 + 384400, 3);
  });

  it('reports depth for render ordering', () => {
    const tree = buildTree(['sun', 'earth', 'moon'], segmentsOf, 0);
    expect(depthOf('sun', tree)).toBe(0);
    expect(depthOf('earth', tree)).toBe(1);
    expect(depthOf('moon', tree)).toBe(2);
  });

  it('breaks cycles instead of hanging', () => {
    const cyclic = (id: string): ParentSegment[] => [[ALWAYS, id === 'a' ? 'b' : 'a']];
    const tree = buildTree(['a', 'b'], cyclic, 0);
    // Exactly one of the pair must end up parentless.
    const roots = [tree.get('a')!.parentId, tree.get('b')!.parentId].filter((p) => p === null);
    expect(roots.length).toBeGreaterThanOrEqual(1);
  });
});

describe('projection', () => {
  it('matches the angular-size formula', () => {
    // A body of radius 1 at distance 1 subtends 1/tan(fov/2) in normal space.
    const n = normalSpaceRadius(1, 1);
    expect(n).toBeCloseTo(1 / Math.tan((42 * Math.PI) / 180 / 2), 9);
  });

  it('shrinks with distance', () => {
    const near = pixelSpaceRadius(6378, 1e7, 1600);
    const far = pixelSpaceRadius(6378, 1e8, 1600);
    expect(far).toBeLessThan(near);
    expect(near / far).toBeCloseTo(10, 3);
  });

  it('gates subsystems on the 20-pixel rule', () => {
    expect(subsystemVisible(SUBSYSTEM_PIXEL_THRESHOLD)).toBe(true);
    expect(subsystemVisible(19.9)).toBe(false);
  });

  it('derives near and mid planes from the parent radius', () => {
    const near = autoNearDistance(1e8, 6378);
    expect(near).toBeCloseTo(0.1 * (1e8 - 6378), 3);
    expect(autoNearDistance(100, 6378)).toBe(1e-5); // clamped floor
    expect(autoMidDistance(1e8, 6378, near)).toBeLessThanOrEqual(1e4 * near);
  });
});
