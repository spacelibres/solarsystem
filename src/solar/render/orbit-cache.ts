import type { Vec3 } from '../../lib/dynamo/math';
/** Camera motion reuses the physical orbit; refresh once its head moves 1/4 CSS pixel. */
export function orbitGeometryNeedsUpdate(previous: Vec3 | undefined, current: Vec3, kmPerPixel: number): boolean {
 return !previous || Math.hypot(current.x-previous.x,current.y-previous.y,current.z-previous.z)>Math.max(0,kmPerPixel)*.25;
}
