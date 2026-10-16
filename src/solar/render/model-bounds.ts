import { Box3, Sphere, type Object3D } from 'three';

/** Fit around the entity origin, including off-centre antennas and booms. Call before parenting. */
export function modelExtentRadius(model: Object3D): number {
  const box = new Box3().setFromObject(model);
  if (box.isEmpty()) return 0;
  const sphere = box.getBoundingSphere(new Sphere());
  return sphere.radius + sphere.center.length();
}
