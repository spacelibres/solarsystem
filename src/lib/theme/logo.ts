/**
 * Logo and icon rendering for the spacelibre visual standard.
 *
 * Two kinds of asset, and they behave differently on purpose:
 *
 *   monochrome (`-black`, `-navy`, `-white`)
 *     One ink for planet, orbit and wordmark. Carries
 *     `data-color-mode="monochrome"`, which makes the standard's renderer skip
 *     recolouring entirely, so the mark keeps its exact ink through any theme
 *     change. This is the default for a dark UI.
 *
 *   full colour (`-primary`)
 *     The planet binds to `planetOnLight` / `planetOnDark` and the orbit to
 *     `primaryOnLight` / `primaryOnDark`, so the mark tracks the active palette.
 *     A fixed planet here would be a defect, not a choice.
 *
 * Masters are used as supplied and are never reconstructed — see
 * `docs/visual-identity.md` for the rules this module implements.
 */

export type LogoOrientation = 'horizontal' | 'stacked' | 'icon';
export type LogoInk = 'primary' | 'reverse' | 'navy' | 'white' | 'black';

/** Canvas sizes from the approved masters, in SVG user units. */
export const CANVAS: Record<LogoOrientation, { width: number; height: number }> = {
  horizontal: { width: 810, height: 180 },
  stacked: { width: 620, height: 430 },
  icon: { width: 256, height: 256 },
};

/** Recommended minimum display width, from the standard's size table. */
export const MIN_DISPLAY_WIDTH: Record<LogoOrientation, number> = {
  horizontal: 240,
  stacked: 180,
  icon: 48,
};

/** How the standard's REVERSE swatch maps onto an orientation. */
const REVERSE_INK: Record<LogoOrientation, LogoInk> = {
  horizontal: 'reverse',
  stacked: 'reverse',
  icon: 'reverse',
};

export function logoInkFor(orientation: LogoOrientation, ink?: LogoInk): LogoInk {
  return ink ?? REVERSE_INK[orientation];
}

/** Whether a master is monochrome and therefore keeps a single fixed ink. */
export function isMonochromeInk(ink: LogoInk): boolean {
  return ink === 'black' || ink === 'white' || ink === 'navy';
}

/** REVERSE is a pre-coloured dark-surface master; it is not a single ink. */
export function isPrecoloredInk(ink: LogoInk): boolean {
  return ink === 'reverse';
}

/** Public path of an approved master. */
export function logoPath(orientation: LogoOrientation, ink: LogoInk): string {
  return `/brand/${orientation}-${ink}.svg`;
}

/**
 * Clear space the standard requires around a mark: at least 0.25 of the master
 * canvas height on every side.
 */
export function clearSpace(height: number): number {
  return Math.ceil(height * 0.25);
}

/**
 * Whether a mark is below the size at which the standard still recommends it
 * for its orientation. Callers use this to switch to the icon.
 */
export function belowMinimumWidth(orientation: LogoOrientation, widthPx: number): boolean {
  return widthPx < MIN_DISPLAY_WIDTH[orientation];
}

/**
 * The HTML `sizes`/`type` pair for a favicon link built from the icon master.
 *
 * The favicon is generated from the same `icon` master as the app mark so the
 * geometry cannot drift, and it is explicitly tied to the palette rather than
 * left as an unversioned default.
 */
export const FAVICON_SIZES = [16, 24, 32, 48, 64, 180, 192, 512] as const;
