import { describe, expect, it } from 'vitest';

import { labelOccludedBySphere, type OccluderSphere } from '../src/solar/render/labels';

const camera = { x: 0, y: 0, z: 0 };
const sphere = (center: { x: number; y: number; z: number }, radiusKm: number, id = 'earth'): OccluderSphere => ({ id, center, radiusKm });

describe('Starlink/body label occlusion', () => {
  it('hides a label whose camera segment passes through a body', () => {
    expect(labelOccludedBySphere({ x: 0, y: 0, z: 10 }, camera, [sphere({ x: 0, y: 0, z: 5 }, 2)])).toBe(true);
  });

  it('keeps labels that pass beside or in front of a body', () => {
    expect(labelOccludedBySphere({ x: 0, y: 0, z: 10 }, camera, [sphere({ x: 5, y: 0, z: 5 }, 2)])).toBe(false);
    expect(labelOccludedBySphere({ x: 0, y: 0, z: 3 }, camera, [sphere({ x: 0, y: 0, z: 5 }, 2)])).toBe(false);
  });

  it('ignores bodies behind the camera, the label itself, and zero-length anchors', () => {
    expect(labelOccludedBySphere({ x: 0, y: 0, z: 10 }, camera, [sphere({ x: 0, y: 0, z: -5 }, 2)])).toBe(false);
    expect(labelOccludedBySphere({ x: 0, y: 0, z: 10 }, camera, [sphere({ x: 0, y: 0, z: 5 }, 2)], 'earth')).toBe(false);
    expect(labelOccludedBySphere({ x: 0, y: 0, z: 0 }, camera, [sphere({ x: 0, y: 0, z: 5 }, 2)])).toBe(false);
  });
});
