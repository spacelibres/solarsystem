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
  getDistanceParams,
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

describe('getDistanceParams (NASA´s formatter, field for field)', () => {
  it('returns the scale word as a separate field', () => {
    const p = getDistanceParams(2.5e6);
    expect(p.value).toBeCloseTo(2.5, 6);
    expect(p.scale).toBe('million');
    expect(p.unit).toBe('km');
    expect(p.prefix).toBe('');
  });

  it('marks sub-kilometre values with a ~ prefix and switches to metres', () => {
    const p = getDistanceParams(0.5);
    expect(p.prefix).toBe('~ ');
    expect(p.unit).toBe('m');
    expect(p.value).toBeCloseTo(500, 6);
    // 9460730472580.8 km is one light year; above it the unit becomes ly.
    expect(getDistanceParams(LIGHT_YEAR_KM).unit).toBe('light years');
  });

  it('uses the raw value for the light-year test, not the clamped one', () => {
    // A negative distance clamps to 0 for the km branches but the ly test still
    // sees the original value; this mirrors NASA's exact branch order.
    const p = getDistanceParams(-1);
    expect(p.actualDistanceValue).toBe(0);
    expect(p.unit).toBe('m');
  });

  it('derives dps from toPrecision(4), giving 1 or 2', () => {
    // 100 -> "100.0" -> dps 1 ; 12 -> "12.00" -> dps 2
    expect(getDistanceParams(100e3).dps).toBe(1);
    expect(getDistanceParams(1200).dps).toBe(2);
  });

  it('switches to imperial miles and feet', () => {
    // Note the order: NASA converts to miles (or feet) *first*, then applies the
    // thousand/million/billion thresholds to the converted value. So 1500 km is
    // 932 mi — below the thousand threshold — and carries no scale word.
    const mi = getDistanceParams(1500, 'imperial');
    expect(mi.unit).toBe('mi');
    expect(mi.value).toBeCloseTo(1500 * 0.621371, 6);
    expect(mi.scale).toBe('');
    // A million kilometres is ~621,371 mi, which is past the threshold.
    expect(getDistanceParams(1e6, 'imperial').scale).toBe('thousand');
    const ft = getDistanceParams(0.5, 'imperial');
    expect(ft.unit).toBe('ft');
    expect(ft.prefix).toBe('~ ');
  });

  it('keeps NASA´s conversion table', () => {
    // kmToMi .621371 and miToFt 5280, so a kilometre is 3280.84 ft.
    const p = getDistanceParams(1, 'imperial');
    expect(p.value).toBeCloseTo(3280.84, 2);
  });
});
