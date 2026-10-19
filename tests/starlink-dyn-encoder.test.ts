import { describe, expect, it } from 'vitest';

import { encodeStarlinkDyn } from '../src/lib/starlink/dyn';
import { parseDyn } from '../src/lib/dynamo/parse';
import type { StarlinkOrbit } from '../src/solar/domain/starlink';

const SAMPLE: StarlinkOrbit = {
  n: 1008,
  name: 'STARLINK-1008',
  g: 1,
  e: 1792367802,
  p: [-2171.179529461358, -4482.330738053688, 4536.72153],
  v: [4.2977429094719195, -5.450833777684634, -3.320847577],
};

describe('Starlink dynamo encoder', () => {
  it('emits a parseable v2 pos block', () => {
    const file = parseDyn(encodeStarlinkDyn(SAMPLE));
    expect(file.header.version).toBe(2);
    expect(file.header.pointType).toBe('pos');
    expect(file.points).toHaveLength(192);
    expect(file.interval!.max).toBeGreaterThan(file.interval!.min);
  });
});
