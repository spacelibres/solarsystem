import type { Vec3 } from '../../lib/dynamo/math';

export interface ScreenPoint {
  readonly x: number;
  readonly y: number;
}

export interface OccluderSphere {
  readonly id: string;
  readonly center: Vec3;
  readonly radiusKm: number;
}

/** Keep text close to its physical anchor; hide crowded names instead of moving bodies. */
export function placeScreenLabel(x: number, y: number, width: number, height: number, occupied: readonly ScreenPoint[]): ScreenPoint | undefined {
  const offsets = [[8, -8], [8, -30], [8, 14]];
  for (const [dx, dy] of offsets) {
    const position = { x: Math.max(4, Math.min(width - 90, x + dx)), y: Math.max(4, Math.min(height - 24, y + dy)) };
    if (!occupied.some(point => Math.abs(point.x - position.x) < 85 && Math.abs(point.y - position.y) < 22)) return position;
  }
  return undefined;
}

/**
 * A name label is in front of a sphere when the camera-to-label segment passes
 * through that sphere before reaching the label. Labels live in the DOM, so they
 * need this depth rule explicitly rather than relying on the WebGL depth buffer.
 */
export function labelOccludedBySphere(anchor: Vec3, camera: Vec3, occluders: readonly OccluderSphere[], excludeId?: string): boolean {
  const toAnchor = { x: anchor.x - camera.x, y: anchor.y - camera.y, z: anchor.z - camera.z };
  const anchorLengthSquared = toAnchor.x ** 2 + toAnchor.y ** 2 + toAnchor.z ** 2;
  if (anchorLengthSquared === 0) return false;
  for (const occluder of occluders) {
    if (occluder.id === excludeId || !(occluder.radiusKm > 0)) continue;
    const toCenter = { x: occluder.center.x - camera.x, y: occluder.center.y - camera.y, z: occluder.center.z - camera.z };
    const along = (toCenter.x * toAnchor.x + toCenter.y * toAnchor.y + toCenter.z * toAnchor.z) / anchorLengthSquared;
    if (along <= 0 || along >= 1) continue;
    const closest = { x: toAnchor.x * along, y: toAnchor.y * along, z: toAnchor.z * along };
    const dx = closest.x - toCenter.x;
    const dy = closest.y - toCenter.y;
    const dz = closest.z - toCenter.z;
    if (dx * dx + dy * dy + dz * dz < occluder.radiusKm ** 2) return true;
  }
  return false;
}
