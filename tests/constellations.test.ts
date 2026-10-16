import { describe, expect, it } from 'vitest';

import { parseConstellations, buildConstellations } from '../src/lib/scene/constellations';
import { CONSTELLATION, CONSTELLATION_LABEL } from '../src/lib/theme/nasa-tokens';
import {
  NASA_HORIZONTAL_FOV_RADIANS,
  SUBSYSTEM_PIXEL_THRESHOLD,
  subsystemVisible,
  subsystemVisibleWithinParent,
  verticalFovForHorizontal,
} from '../src/lib/scene/projection';

/** Build one constellation record in NASA's layout. */
function constellationRecord(
  name: string,
  rgba: [number, number, number, number],
  stars: [number, number, number][],
  segments: [number, number][],
): number[] {
  const bytes: number[] = [name.length];
  for (const ch of name) bytes.push(ch.charCodeAt(0));
  bytes.push(...rgba, stars.length);
  for (const s of stars) {
    const buf = new ArrayBuffer(12);
    const view = new DataView(buf);
    view.setFloat32(0, s[0], true);
    view.setFloat32(4, s[1], true);
    view.setFloat32(8, s[2], true);
    bytes.push(...new Uint8Array(buf));
  }
  bytes.push(segments.length);
  for (const [a, b] of segments) bytes.push(a, b);
  return bytes;
}

function toArrayBuffer(bytes: number[]): ArrayBuffer {
  return new Uint8Array(bytes).buffer;
}

describe('constellation parsing', () => {
  it('reads name, colour, stars and segments', () => {
    const bytes = constellationRecord('Orion', [50, 50, 170, 180], [
      [1e15, 2e15, 3e15],
      [4e15, 5e15, 6e15],
      [7e15, 8e15, 9e15],
    ], [[0, 1], [1, 2]]);

    const list = parseConstellations(toArrayBuffer(bytes));
    expect(list).toHaveLength(1);
    expect(list[0].name).toBe('Orion');
    expect(list[0].color).toEqual([50, 50, 170, 180]);
    expect(list[0].stars).toHaveLength(3);
    expect(list[0].segments).toEqual([[0, 1], [1, 2]]);
  });

  it('decodes several records back to back', () => {
    const bytes = [
      ...constellationRecord('Aquila', [50, 50, 170, 180], [[1, 2, 3]], []),
      ...constellationRecord('Andromeda', [50, 50, 170, 180], [[4, 5, 6]], [[0, 0]]),
    ];
    const list = parseConstellations(toArrayBuffer(bytes));
    expect(list.map((c) => c.name)).toEqual(['Aquila', 'Andromeda']);
  });

  it('applies the axis swap before the ecliptic rotation', () => {
    // A star on the stored +X axis must not come back on +X: the reader swaps
    // (x, y, z) -> (z, -x, y) first, so a raw (1, 0, 0) leaves the x axis.
    const bytes = constellationRecord('T', [1, 2, 3, 4], [[1, 0, 0]], []);
    const [star] = parseConstellations(toArrayBuffer(bytes))[0].stars;
    expect(star.length()).toBeCloseTo(1, 4);
    expect(Math.abs(star.x)).toBeLessThan(1);
    expect(Math.abs(star.y)).toBeGreaterThan(0);
  });

  it('handles an empty buffer', () => {
    expect(parseConstellations(new ArrayBuffer(0))).toEqual([]);
  });
});

describe('constellation rendering', () => {
  it('normalises onto the sky shell so lines register with the stars', () => {
    const bytes = constellationRecord('T', [1, 2, 3, 4], [
      [1e15, 0, 0],
      [0, 2e15, 0],
    ], [[0, 1]]);
    const list = parseConstellations(toArrayBuffer(bytes));
    const lines = buildConstellations(list, 1e12);
    const pos = lines.geometry.getAttribute('position');
    // One segment = 2 vertices.
    expect(pos.count).toBe(2);
    for (let i = 0; i < 2; i++) {
      const len = Math.hypot(pos.getX(i), pos.getY(i), pos.getZ(i));
      expect(len).toBeCloseTo(1e12, -8);
    }
  });

  it('drops segments whose indices are out of range', () => {
    const bytes = constellationRecord('T', [1, 2, 3, 4], [[1, 0, 0]], [[0, 9]]);
    const lines = buildConstellations(parseConstellations(toArrayBuffer(bytes)), 1e12);
    expect(lines.geometry.getAttribute('position').count).toBe(0);
  });

  it('draws at NASA´s colour, alpha and render order', () => {
    const bytes = constellationRecord('T', [1, 2, 3, 4], [[1, 0, 0], [0, 1, 0]], [[0, 1]]);
    const lines = buildConstellations(parseConstellations(toArrayBuffer(bytes)), 1e12);
    const material = lines.material as unknown as { opacity: number };
    // SceneManager sets the lines to (.35, .7, 1, .5), overriding the file.
    expect(material.opacity).toBe(0.5);
    expect(lines.renderOrder).toBeLessThan(0);
    expect(lines.frustumCulled).toBe(false);
  });
});

describe('constellation tokens', () => {
  it('matches SceneManager.toggleConstellations', () => {
    expect(CONSTELLATION.lineColor).toEqual([0.35, 0.7, 1, 0.5]);
    expect(CONSTELLATION.labelColor).toEqual([0.35, 0.7, 1, 1]);
    expect(CONSTELLATION.highlightLineWidth).toBe(2.5);
    expect(CONSTELLATION.labelPrefix).toBe('constellation_label_');
    // The body colour keeps the same hue.
    expect(CONSTELLATION_LABEL.color).toBe('#59b2ff');
  });
});

describe('camera field of view (CameraComponent._fieldOfView)', () => {
  it('is 60 degrees, applied horizontally', () => {
    expect(NASA_HORIZONTAL_FOV_RADIANS).toBeCloseTo(1.0471975512, 10);
    expect((NASA_HORIZONTAL_FOV_RADIANS * 180) / Math.PI).toBeCloseTo(60, 6);
  });

  it('derives a narrower vertical FOV for a wide viewport', () => {
    // The live reference reports 0.636503881827892 rad at aspect 1.7524644.
    const v = verticalFovForHorizontal(1.0471975512, 1.7524644030668126);
    expect(v).toBeCloseTo(0.636503881827892, 9);
    // A wide screen must give a *smaller* vertical angle than 60 degrees.
    expect(v).toBeLessThan(NASA_HORIZONTAL_FOV_RADIANS);
  });

  it('gives a square viewport the same angle in both axes', () => {
    expect(verticalFovForHorizontal(NASA_HORIZONTAL_FOV_RADIANS, 1))
      .toBeCloseTo(NASA_HORIZONTAL_FOV_RADIANS, 10);
  });

  it('gives a tall viewport a larger vertical angle', () => {
    const v = verticalFovForHorizontal(NASA_HORIZONTAL_FOV_RADIANS, 0.5);
    expect(v).toBeGreaterThan(NASA_HORIZONTAL_FOV_RADIANS);
  });

  it('is not the 42 degrees the scene previously assumed', () => {
    const v = verticalFovForHorizontal(NASA_HORIZONTAL_FOV_RADIANS, 16 / 9);
    expect((v * 180) / Math.PI).not.toBeCloseTo(42, 0);
  });

  it('falls back safely on a degenerate aspect', () => {
    expect(verticalFovForHorizontal(NASA_HORIZONTAL_FOV_RADIANS, 0))
      .toBe(NASA_HORIZONTAL_FOV_RADIANS);
  });
});

describe('subsystem visibility (SceneManager._isEntityVisibleWithinParent)', () => {
  it('keeps NASA´s 20-pixel threshold', () => {
    expect(SUBSYSTEM_PIXEL_THRESHOLD).toBe(20);
    expect(subsystemVisible(20)).toBe(true);
    expect(subsystemVisible(19.9)).toBe(false);
  });

  it('treats a body with no systemRadius as 25 radii across', () => {
    // Earth's Moon: no systemRadius, radius 1737.4, inside Earth (extents 6378).
    // At 25 radii the child extent is 43435 km, ~6.8x Earth's radius.
    const childExtent = 25 * 1737.4;
    expect(childExtent / 6378).toBeCloseTo(6.81, 1);
    // So the Moon appears once Earth subtends ~3 px of extent, not ~20.
    expect(subsystemVisibleWithinParent(null, 1737.4, null, 6378, 3)).toBe(true);
    expect(subsystemVisibleWithinParent(null, 1737.4, null, 6378, 2)).toBe(false);
  });

  it('prefers systemRadius when present', () => {
    // A large systemRadius makes the child appear sooner.
    expect(subsystemVisibleWithinParent(2.99e13, 695500, null, 6378, 0.01)).toBe(true);
  });

  it('is scale-invariant: only the ratio to the parent matters', () => {
    // Doubling both the parent extent and the parent's pixel size leaves it
    // unchanged, which is the point of dividing by the parent's extent.
    const a = subsystemVisibleWithinParent(null, 1000, null, 10000, 40);
    const b = subsystemVisibleWithinParent(null, 1000, null, 20000, 80);
    expect(a).toBe(b);
  });

  it('returns false for a degenerate parent', () => {
    expect(subsystemVisibleWithinParent(1000, null, null, 0, 100)).toBe(false);
    expect(subsystemVisibleWithinParent(0, 0, null, 100, 100)).toBe(false);
  });
});
