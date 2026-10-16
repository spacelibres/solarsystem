import { describe, expect, it } from 'vitest';
import { PLANET_IDS } from '../src/lib/nasa/catalog';
import { requireCoreEphemerides } from '../src/lib/nasa/readiness';

describe('viewer readiness', () => {
  it('rejects a Sun-only scene instead of reporting a loaded solar system', () => {
    expect(() => requireCoreEphemerides(new Set())).toThrow(/mercury.*venus.*earth/i);
  });
  it('names a missing core planet', () => {
    expect(() => requireCoreEphemerides(new Set(PLANET_IDS.filter((id) => id !== 'earth')))).toThrow(/earth/i);
  });
  it('accepts all eight planets without requiring optional missions or moons', () => {
    expect(() => requireCoreEphemerides(new Set(PLANET_IDS))).not.toThrow();
  });
});
