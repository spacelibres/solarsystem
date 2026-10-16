/**
 * Astronomical constants, transcribed from NASA Eyes' own conversion tables.
 *
 * Source: `AppUtils` in NASA's bundle —
 *
 *   static conversionTable = {
 *     kmToMi: 0.621371, kmToFt: 3280.84, miToFt: 5280,
 *     kmToM: 1e3, auToKm: 149597871, ldToKm: 384398,
 *   };
 *   static constants = { speedOfLight: 299792.458, minDate: -8e15, maxDate: 8e15 };
 *
 * and the distance formatter, which uses `9460730472580.8` km for a light year.
 *
 * Note that NASA uses the integer `149597871` for the astronomical unit rather
 * than the IAU 2012 value `149597870.700`. We follow NASA so that distances
 * displayed by the two viewers agree; `AU_KM_IAU` is provided for reference.
 */

/** NASA's astronomical unit, in kilometres (integer, as shipped). */
export const AU_KM = 149_597_871;

/** IAU 2012 astronomical unit, in kilometres, for reference. */
export const AU_KM_IAU = 149_597_870.7;

/** Mean Earth–Moon distance, used by NASA as a "light distance" unit. */
export const LD_KM = 384_398;

/** A Julian light year, `c × 365.25 d`, in kilometres. */
export const LIGHT_YEAR_KM = 9_460_730_472_580.8;

/** Speed of light in vacuum, km/s. */
export const SPEED_OF_LIGHT_KM_S = 299_792.458;

/** Time-slider bounds, in seconds from J2000 (±~2.5 × 10^8 years). */
export const TIME_MIN_SECONDS = -8e15;
export const TIME_MAX_SECONDS = 8e15;

/** Unit conversions from NASA's table. */
export const CONVERSIONS = {
  kmToMi: 0.621371,
  kmToFt: 3280.84,
  miToFt: 5280,
  kmToM: 1e3,
} as const;

/**
 * The rotation from the ecliptic-J2000 frame into J2000 equatorial, as NASA
 * hardcodes it (`SceneHelpers.getEclipJ2000ToJ2000Rotation`). The angle is
 * 23.439291°, the J2000 obliquity.
 */
export const ECLIP_J2000_TO_J2000 = {
  w: 0.9791532214288992,
  x: 0.2031230389823101,
  y: 0,
  z: 0,
} as const;

/** J2000 epoch as a Unix timestamp in milliseconds (2000-01-01 12:00 TT ≈ UTC). */
export const J2000_UNIX_MS = Date.UTC(2000, 0, 1, 12, 0, 0);

/**
 * Seconds between the Unix epoch and J2000 in NASA's Ephemeris Time scale.
 *
 * NASA converts with `et = unix - 946727957.816 + leapSeconds`, where the
 * constant is `946728000.0 - 42.184` and 42.184 s is `32.184 s (TT−TAI) + 10 s
 * (the 1972 TAI−UTC offset)`. Times in `.dyn` files are already ET seconds from
 * J2000, so the viewer never needs this conversion; it is recorded here for
 * completeness only, and deliberately not wrapped in a helper — NASA's own
 * leap-second accumulation double-counts the embedded 10 s, and reproducing
 * that behaviour without the site's live leap table would be guesswork.
 */
export const UNIX_TO_ET_OFFSET = 946_727_957.816;

/**
 * The unit systems NASA's readout can be in. Names are its own two sentinels.
 */
export type UnitSystem = 'metric' | 'imperial';

/**
 * The result of NASA's distance formatter, field for field.
 *
 * `DistanceManager._getDistanceParams` returns exactly this shape, and the
 * distance panel renders `prefix + value` with `scale` and `unit` as separate
 * spans. `dps` is the decimal places the panel should use.
 */
export interface DistanceParams {
  /** Leading marker, `"~ "` for sub-kilometre values, otherwise empty. */
  prefix: string;
  /** The scaled magnitude, already at 4 significant digits. */
  value: number;
  /** `"thousand" | "million" | "billion"`, empty when not applicable. */
  scale: string;
  /** `"light years" | "km" | "mi" | "m" | "ft"`. */
  unit: string;
  /** Decimal places the readout uses: 2 or 1. */
  dps: number;
  /** The original kilometre value. */
  actualDistanceValue: number;
}

/**
 * Format a distance exactly as NASA's `DistanceManager._getDistanceParams` does.
 *
 * Transcribed from the bundle:
 *
 *   const imperial = this._currentUnitSystem === Imperial;
 *   const lightYear = 9460730472580.8;
 *   let c = imperial ? t * kmToMi : t;
 *   c = Math.max(0, c);
 *   let h = c, prefix = '', scale = '', unit = imperial ? 'mi' : 'km';
 *   const actual = c;
 *   if (t >= lightYear)      { h = t / lightYear; unit = 'light years'; }
 *   else if (c >= 1e9)       { h = c / 1e9; scale = 'billion'; }
 *   else if (c >= 1e6)       { h = c / 1e6; scale = 'million'; }
 *   else if (c >= 1e3)       { h = c / 1e3; scale = 'thousand'; }
 *   else if (c < 1)          { prefix = '~ '; h = imperial ? c * miToFt : c * kmToM;
 *                              unit = imperial ? 'ft' : 'm'; }
 *   const parts = h.toPrecision(4).split('.');
 *   return { prefix, value: h, scale, unit,
 *            dps: parts.length > 1 && parts[1].length > 1 ? 2 : 1,
 *            actualDistanceValue: actual };
 *
 * Two details worth keeping: the light-year test uses the **raw** `t` while
 * every other test uses the clamped `c`, and `dps` comes from splitting
 * `toPrecision(4)` rather than from any fixed rounding.
 */
export function getDistanceParams(
  km: number,
  system: UnitSystem = 'metric',
): DistanceParams {
  const imperial = system === 'imperial';
  const t = km;
  let c = imperial ? t * CONVERSIONS.kmToMi : t;
  c = Math.max(0, c);

  let value = c;
  let prefix = '';
  let scale = '';
  let unit = imperial ? 'mi' : 'km';
  const actualDistanceValue = c;

  if (t >= LIGHT_YEAR_KM) {
    value = t / LIGHT_YEAR_KM;
    unit = 'light years';
  } else if (c >= 1e9) {
    value = c / 1e9;
    scale = 'billion';
  } else if (c >= 1e6) {
    value = c / 1e6;
    scale = 'million';
  } else if (c >= 1e3) {
    value = c / 1e3;
    scale = 'thousand';
  } else if (c < 1) {
    prefix = '~ ';
    value = imperial ? c * CONVERSIONS.miToFt : c * CONVERSIONS.kmToM;
    unit = imperial ? 'ft' : 'm';
  }

  const parts = value.toPrecision(4).split('.');
  return {
    prefix,
    value,
    scale,
    unit,
    dps: parts.length > 1 && parts[1].length > 1 ? 2 : 1,
    actualDistanceValue,
  };
}

/**
 * Format a distance the way NASA's readout does.
 *
 * Thin wrapper over {@link getDistanceParams} that joins the spans into one
 * string, e.g. `"1.50 million km"` or `"26.03 thousand km"`.
 */
export function formatDistance(km: number, system: UnitSystem = 'metric'): string {
  const p = getDistanceParams(km, system);
  const num = p.value.toFixed(p.dps);
  return `${p.prefix}${num}${p.scale ? ' ' + p.scale : ''} ${p.unit}`;
}
