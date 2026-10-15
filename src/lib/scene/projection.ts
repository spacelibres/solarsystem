/**
 * Camera projection helpers, following NASA Eyes.
 *
 * Investigated conclusion (from `app.js`): NASA does **not** compress distance
 * logarithmically. Bodies sit at true kilometre offsets and the camera manages
 * scale by moving between frames — the same trick that lets a flight sim show
 * both a runway and a mountain range.
 *
 * What NASA does compute is a body's on-screen size, and it uses that for every
 * visibility and LOD decision:
 *
 *   normalSpaceRadius = radius / |cameraToBody| / tan(fov/2)
 *   pixelSpaceRadius  = normalSpaceRadius * max(viewportWidth, viewportHeight)
 *
 * This module exposes those two, plus the auto near/mid planes NASA derives from
 * the parent body's radius.
 */

const FOV_RADIANS = (42 * Math.PI) / 180; // matches the scene camera

/** Fraction of the viewport a body of `radiusKm` subtends at `distanceKm`. */
export function normalSpaceRadius(radiusKm: number, distanceKm: number): number {
  const d = Math.abs(distanceKm);
  if (d === 0) return Number.POSITIVE_INFINITY;
  return radiusKm / d / Math.tan(FOV_RADIANS / 2);
}

/** On-screen radius in pixels, given the viewport's larger dimension. */
export function pixelSpaceRadius(
  radiusKm: number,
  distanceKm: number,
  viewportMaxDimension: number,
): number {
  return normalSpaceRadius(radiusKm, distanceKm) * viewportMaxDimension;
}

/**
 * NASA auto-derives the near plane from the camera-to-parent distance minus the
 * parent's radius, clamped to a floor:
 *
 *   near = max(1e-5, 0.1 * (|cameraToParent| - parentRadius))
 */
export function autoNearDistance(distanceToParentKm: number, parentRadiusKm: number): number {
  return Math.max(1e-5, 0.1 * (Math.abs(distanceToParentKm) - parentRadiusKm));
}

/**
 * The mid plane caps depth precision: at most 1e4 × near, or the camera-to-parent
 * distance plus ten parent radii, whichever is smaller.
 */
export function autoMidDistance(
  distanceToParentKm: number,
  parentRadiusKm: number,
  nearDistance: number,
): number {
  return Math.min(
    1e4 * nearDistance,
    Math.abs(distanceToParentKm) + 10 * parentRadiusKm,
  );
}

/**
 * A subsystem is only instantiated once its parent is large enough on screen —
 * NASA's test is a 20-pixel threshold. This is why Earth's satellites do not
 * exist until you zoom toward Earth.
 */
export const SUBSYSTEM_PIXEL_THRESHOLD = 20;

export function subsystemVisible(parentPixelRadius: number): boolean {
  return parentPixelRadius >= SUBSYSTEM_PIXEL_THRESHOLD;
}
