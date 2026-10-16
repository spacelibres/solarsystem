/** Leave a 20% radial margin in the narrower camera dimension. Angles are radians. */
export function cameraFitDistance(radius: number, verticalFov: number, aspect: number): number {
    if (!Number.isFinite(radius) || radius <= 0 || !Number.isFinite(aspect) || aspect <= 0 || !Number.isFinite(verticalFov) || verticalFov <= 0 || verticalFov >= Math.PI)
        throw new RangeError('Invalid camera framing parameters');
    const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * aspect);
    return radius * 1.2 / Math.sin(Math.min(verticalFov, horizontalFov) / 2);
}
/** A label can mark a real sub-pixel position without fetching an invisible spacecraft mesh. */
export function modelIsResolvable(radiusKm: number, distanceKm: number, verticalFov: number, height: number, focused: boolean): boolean {
    return focused || radiusKm * height / (Math.max(distanceKm, Number.MIN_VALUE) * Math.tan(verticalFov / 2)) >= 2;
}
