import { describe, expect, it } from 'vitest';

import {
  AU_KM,
  AU_KM_IAU,
  ECLIP_J2000_TO_J2000,
  LD_KM,
  LIGHT_YEAR_KM,
  SPEED_OF_LIGHT_KM_S,
  TIME_MAX_SECONDS,
  TIME_MIN_SECONDS,
  UNIX_TO_ET_OFFSET,
  formatDistance,
} from '../src/lib/nasa/units';

describe('astronomical constants', () => {
  it('uses NASA´s own values', () => {
    // NASA ships the integer AU, not the IAU 2012 149597870.700.
    expect(AU_KM).toBe(149_597_871);
    expect(AU_KM_IAU).toBe(149_597_870.7);
    // The two differ by under 0.3 km, so either is astronomically equivalent.
    expect(Math.abs(AU_KM - AU_KM_IAU)).toBeLessThan(0.5);
    expect(LD_KM).toBe(384_398);
    expect(SPEED_OF_LIGHT_KM_S).toBe(299_792.458);
  });

  it('derives the light year from c and a Julian year', () => {
    const derived = SPEED_OF_LIGHT_KM_S * 365.25 * 86400;
    expect(LIGHT_YEAR_KM).toBeCloseTo(derived, 0);
    // NASA hardcodes one decimal place more than the product.
    expect(Math.abs(LIGHT_YEAR_KM - derived)).toBeLessThan(1);
  });

  it('obliquity matches the ecliptic-to-equatorial rotation', () => {
    const { w } = ECLIP_J2000_TO_J2000;
    const degrees = (2 * Math.acos(w) * 180) / Math.PI;
    expect(degrees).toBeCloseTo(23.4393, 3);
  });
});

describe('time scale', () => {
  it('records NASA´s Unix-to-ET offset', () => {
    // 946728000 is 2000-01-01 12:00 UTC; the constant subtracts 42.184 s
    // (32.184 TT−TAI plus the 1972 TAI−UTC offset).
    expect(UNIX_TO_ET_OFFSET).toBeCloseTo(946_728_000 - 42.184, 3);
  });

  it('brackets the .dyn time range at ±100 Julian years', () => {
    const hundredYears = 100 * 365.25 * 86400;
    expect(TIME_MIN_SECONDS).toBeLessThan(-hundredYears * 2);
    expect(TIME_MAX_SECONDS).toBeGreaterThan(hundredYears * 2);
  });
});

describe('formatDistance', () => {
  it('switches units at NASA´s thresholds', () => {
    expect(formatDistance(500)).toBe('500.0 km');
    expect(formatDistance(1500)).toContain('thousand km');
    expect(formatDistance(2.5e6)).toContain('million km');
    expect(formatDistance(3.2e9)).toContain('billion km');
    expect(formatDistance(LIGHT_YEAR_KM * 2)).toContain('light years');
    expect(formatDistance(0.5)).toContain('m');
  });

  it('reports Earth´s mean radius above the thousand-kilometre threshold', () => {
    expect(formatDistance(6378.137)).toBe('6.38 thousand km');
  });
});
