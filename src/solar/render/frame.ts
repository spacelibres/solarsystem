import type { Object3D } from 'three';
import type { Quat, Vec3 } from '../../lib/dynamo/math';

/** Absolute kilometre states become small camera-relative GPU coordinates. */
export function applyFrameTransform(object: Object3D, position: Vec3, orientation: Quat | null, focus: Vec3): void {
  object.position.set(position.x - focus.x, position.y - focus.y, position.z - focus.z);
  if (orientation) object.quaternion.set(orientation.x, orientation.y, orientation.z, orientation.w);
  else object.quaternion.identity(); // Neutral model inspection must not retain an earlier measured attitude.
}
