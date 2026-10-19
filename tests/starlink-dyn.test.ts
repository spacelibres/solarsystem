import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

import { parseDyn } from '../src/lib/dynamo/parse';

describe('Starlink dynamo samples', () => {
  for (const generation of [1, 2, 3]) {
    it(`loads Gen${generation} as an inline pos dynamo`, () => {
      const buffer = readFileSync(`eyes/src/dyn/starlink/starlink-gen${generation}/def.dyn`);
      const file = parseDyn(buffer);
      expect(file.header.version).toBe(2);
      expect(file.header.pointType).toBe('pos');
      expect(file.points.length).toBe(385);
      expect(file.interval!.max).toBeGreaterThan(file.interval!.min);
      for (const point of file.points) {
        expect(Number.isFinite(point.time)).toBe(true);
        if (point.kind === 'pos') {
          expect([...Object.values(point.position), ...Object.values(point.velocity)].every(Number.isFinite)).toBe(true);
        }
      }
    });
  }
});
