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

/**
 * NASA's camera field of view.
 *
 * `CameraComponent` ships `_fieldOfView = 1.0471975512` rad, which is **60°**,
 * and it is applied **horizontally**: `getHorizontalFieldOfView()` returns
 * `_fieldOfView` unchanged, while the vertical FOV is derived from the aspect
 * ratio. The live reference confirms it — at a 1.7525 aspect the vertical FOV is
 * 0.6365 rad (36.47°), not 60°.
 *
 * three.js `PerspectiveCamera.fov` is the **vertical** angle, so the two must be
 * converted rather than equated. Using 60° as the vertical FOV (or 42°, as we
 * previously did) narrows the view and throws off every framing calculation:
 * how much of a system fits, when a subsystem crosses its 20-pixel threshold,
 * and how large a body appears at a given distance.
 */
export const NASA_HORIZONTAL_FOV_RADIANS = 1.0471975512;

/** NASA's horizontal FOV in degrees. */
export const NASA_HORIZONTAL_FOV_DEGREES = (NASA_HORIZONTAL_FOV_RADIANS * 180) / Math.PI;

/**
 * Convert NASA's horizontal FOV to the vertical FOV three.js expects.
 *
 *   tan(vFov / 2) = tan(hFov / 2) / aspect
 *
 * For a wide viewport this makes the vertical FOV *smaller* than the horizontal,
 * which is why equating the two is wrong.
 */
export function verticalFovForHorizontal(
  horizontalRadians: number,
  aspect: number,
): number {
  if (!(aspect > 0)) return horizontalRadians;
  const halfHorizontal = horizontalRadians / 2;
  return 2 * Math.atan(Math.tan(halfHorizontal) / aspect);
}

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

/**
 * Whether a child system is large enough, inside its parent, to be instantiated.
 *
 * Transcribed from `SceneManager._isEntityVisibleWithinParent`:
 *
 *   const parent = Parenting.getParentOfEntity(entity, time);
 *   if (!parent) return false;
 *   const opts = Entity.getEntityOptions(entity);
 *   return (opts.systemRadius || 25 * opts.radius || 25 * opts.extentsRadius)
 *          / parent.getExtentsRadius()
 *          * parent.getGreatestPixelSpaceExtentsRadius() >= 20;
 *
 * Two details matter and are easy to miss:
 *
 *  1. The child's extent is `systemRadius`, falling back to **25 × radius** — not
 *     the radius itself. A body's visual system is treated as 25 radii across
 *     when no explicit systemRadius is given, which is what lets a moon system
 *     appear well before the planet fills the screen.
 *  2. It is the ratio of the child's extent to the parent's extents radius, so the
 *     test is scale-invariant: it depends on how big the child is *relative to its
 *     parent*, multiplied by the parent's on-screen extent.
 *
 * @param childSystemRadiusKm   child's `systemRadius`, if it has one
 * @param childRadiusKm         child's `radius`
 * @param childExtentsRadiusKm  child's `extentsRadius`
 * @param parentExtentsRadiusKm parent's `extentsRadius`
 * @param parentPixelExtents    parent's on-screen extents radius, in pixels
 */
export function subsystemVisibleWithinParent(
  childSystemRadiusKm: number | null,
  childRadiusKm: number | null,
  childExtentsRadiusKm: number | null,
  parentExtentsRadiusKm: number,
  parentPixelExtents: number,
): boolean {
  const childExtent =
    childSystemRadiusKm || 25 * (childRadiusKm ?? 0) || 25 * (childExtentsRadiusKm ?? 0);
  if (!(childExtent > 0) || !(parentExtentsRadiusKm > 0)) return false;
  return (childExtent / parentExtentsRadiusKm) * parentPixelExtents >= SUBSYSTEM_PIXEL_THRESHOLD;
}
