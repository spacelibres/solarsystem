import { BufferAttribute, BufferGeometry } from 'three';
import type { Vec3 } from '../../lib/dynamo/math';

/** Source CubeMap.defaultCubeMapFaceFrames: right, up, outward normal. */
const FACE_FRAMES: readonly (readonly [Vec3, Vec3, Vec3])[] = [
  [{ x: 0, y: 1, z: 0 }, { x: 0, y: 0, z: 1 }, { x: 1, y: 0, z: 0 }],
  [{ x: -1, y: 0, z: 0 }, { x: 0, y: 0, z: 1 }, { x: 0, y: 1, z: 0 }],
  [{ x: 0, y: -1, z: 0 }, { x: 0, y: 0, z: 1 }, { x: -1, y: 0, z: 0 }],
  [{ x: 1, y: 0, z: 0 }, { x: 0, y: 0, z: 1 }, { x: 0, y: -1, z: 0 }],
  [{ x: 0, y: 1, z: 0 }, { x: -1, y: 0, z: 0 }, { x: 0, y: 0, z: 1 }],
  [{ x: 0, y: 1, z: 0 }, { x: 1, y: 0, z: 0 }, { x: 0, y: 0, z: -1 }],
];

function validate(face: number, a: number, b: number): void {
  if (!Number.isInteger(face) || face < 0 || face > 5) throw new Error('Invalid cube face');
  if (!Number.isFinite(a) || !Number.isFinite(b) || a <= 0 || b <= 0) throw new Error('Spheroid radii must be finite and positive');
}

/** 先按源面的经纬方向取点，再依地理/地心纬度解释投到椭球；纹理 V 沿源网格翻转。 */
export function spheroidFacePoint(face: number, u: number, v: number, a: number, b: number, planetographic: boolean) {
  validate(face, a, b);
  if (![u, v].every(value => Number.isFinite(value) && value >= 0 && value <= 1)) throw new Error('Face UV must be in [0, 1]');
  const [right, up, outward] = FACE_FRAMES[face];
  const x = outward.x + right.x * (2 * u - 1) + up.x * (2 * v - 1);
  const y = outward.y + right.y * (2 * u - 1) + up.y * (2 * v - 1);
  const z = outward.z + right.z * (2 * u - 1) + up.z * (2 * v - 1);
  const length = Math.hypot(x, y, z);
  const direction = { x: x / length, y: y / length, z: z / length };
  let position: Vec3;
  if (planetographic) {
    const eccentricitySquared = 1 - (b * b) / (a * a);
    const primeVerticalRadius = a / Math.sqrt(1 - eccentricitySquared * direction.z * direction.z);
    position = { x: primeVerticalRadius * direction.x, y: primeVerticalRadius * direction.y, z: primeVerticalRadius * (1 - eccentricitySquared) * direction.z };
  } else {
    const radius = 1 / Math.sqrt((direction.x * direction.x + direction.y * direction.y) / (a * a) + direction.z * direction.z / (b * b));
    position = { x: direction.x * radius, y: direction.y * radius, z: direction.z * radius };
  }
  const gradient = { x: position.x / (a * a), y: position.y / (a * a), z: position.z / (b * b) };
  const normalLength = Math.hypot(gradient.x, gradient.y, gradient.z);
  const normal = planetographic ? direction : { x: gradient.x / normalLength, y: gradient.y / normalLength, z: gradient.z / normalLength };
  return { position, normal, uv: { x: u, y: 1 - v } };
}

export function createSpheroidFace(face: number, a: number, b: number, planetographic: boolean, subdivisions = 32): BufferGeometry {
  validate(face, a, b);
  if (!Number.isInteger(subdivisions) || subdivisions < 1 || subdivisions > 128) throw new Error('Face subdivisions must be an integer in [1, 128]');
  const width = subdivisions + 1;
  const positions = new Float32Array(width * width * 3);
  const normals = new Float32Array(positions.length);
  const uvs = new Float32Array(width * width * 2);
  const indices = new Uint16Array(subdivisions * subdivisions * 6);
  let offset = 0;
  for (let row = 0; row < width; row++) for (let column = 0; column < width; column++) {
    const point = spheroidFacePoint(face, column / subdivisions, row / subdivisions, a, b, planetographic);
    const index = row * width + column;
    positions.set([point.position.x, point.position.y, point.position.z], index * 3);
    normals.set([point.normal.x, point.normal.y, point.normal.z], index * 3);
    uvs.set([point.uv.x, point.uv.y], index * 2);
    if (row < subdivisions && column < subdivisions) {
      indices.set([index, index + 1, index + width + 1, index + width + 1, index + width, index], offset);
      offset += 6;
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new BufferAttribute(uvs, 2));
  geometry.setIndex(new BufferAttribute(indices, 1));
  geometry.computeBoundingSphere();
  return geometry;
}
