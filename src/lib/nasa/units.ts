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
 * Format a distance the way NASA's readout does: light years above one ly,
 * then billion/million/thousand kilometres, then metres below 1 km.
 */
export function formatDistance(km: number): string {
  const abs = Math.abs(km);
  if (abs >= LIGHT_YEAR_KM) return `${(km / LIGHT_YEAR_KM).toFixed(2)} light years`;
  if (abs >= 1e9) return `${(km / 1e9).toFixed(2)} billion km`;
  if (abs >= 1e6) return `${(km / 1e6).toFixed(2)} million km`;
  if (abs >= 1e3) return `${(km / 1e3).toFixed(2)} thousand km`;
  if (abs < 1) return `${(km * CONVERSIONS.kmToM).toFixed(1)} m`;
  return `${km.toFixed(1)} km`;
}
