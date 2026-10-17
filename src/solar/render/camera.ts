import { rotateByQuat, type Vec3, type Quat } from '../../lib/dynamo/math';

/** CameraScripts.goToSpacecraft uses outward parent-relative position, not sunlight. */
export function spacecraftCameraBasis(relativePosition: Vec3, parentOrientation: Quat | null, bodyOrientation: Quat | null): { offset: Vec3; up: Vec3 } {
    const normalize = (v: Vec3): Vec3 => { const length = Math.hypot(v.x, v.y, v.z); return { x: v.x / length, y: v.y / length, z: v.z / length }; };
    const positionLength = Math.hypot(relativePosition.x, relativePosition.y, relativePosition.z);
    const offset = positionLength > 0 ? normalize(relativePosition) : bodyOrientation ? normalize(rotateByQuat({ x: 1, y: 0, z: 0 }, bodyOrientation)) : { x: 1, y: 0, z: 0 };
    const up = parentOrientation ? normalize(rotateByQuat({ x: 0, y: 0, z: 1 }, parentOrientation)) : { x: 0, y: 0, z: 1 };
    return { offset, up };
}

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
