/**
 * Starfield rendering from NASA's own `stars.<n>.bin` layers.
 *
 * Binary layout, decoded from `StarfieldComponent._loadStars` in `app.js`:
 *
 *   i32    count
 *   count × {
 *     f32  apparent magnitude
 *     f32  absolute magnitude
 *     u8   color.r, color.g, color.b      (normalised by dividing by the max)
 *     f32  position.y  (NEGATED on read)
 *     f32  position.z
 *     f32  position.x
 *   }                                       = 23 bytes per star
 *
 * Positions are in the ecliptic-J2000 frame and must be rotated into J2000 with
 * the quaternion NASA hardcodes: (0.9791532214288992, 0.2031230389823101, 0, 0).
 */

import * as THREE from 'three';

/** NASA's ecliptic-J2000 → J2000 rotation. */
const ECLIP_J2000_TO_J2000 = new THREE.Quaternion(
  0.9791532214288992,
  0.2031230389823101,
  0,
  0,
);

export const STAR_BYTES = 23;

export interface Star {
  position: THREE.Vector3;
  color: THREE.Color;
  magnitude: number;
  absoluteMagnitude: number;
}

/** Parse one `stars.<n>.bin` layer. */
export function parseStarfield(buffer: ArrayBuffer): Star[] {
  const view = new DataView(buffer);
  const count = view.getInt32(0, true);
  const stars: Star[] = new Array(count);
  let o = 4;

  for (let i = 0; i < count; i++) {
    const magnitude = view.getFloat32(o, true);
    const absoluteMagnitude = view.getFloat32(o + 4, true);
    const r = view.getUint8(o + 8) / 255;
    const g = view.getUint8(o + 9) / 255;
    const b = view.getUint8(o + 10) / 255;
    // Position is written y, z, x with y negated.
    const y = -view.getFloat32(o + 11, true);
    const z = view.getFloat32(o + 15, true);
    const x = view.getFloat32(o + 19, true);
    o += STAR_BYTES;

    // NASA normalises the colour by its largest channel.
    const max = Math.max(r, g, b) || 1;
    const color = new THREE.Color(r / max, g / max, b / max);
    const position = new THREE.Vector3(x, y, z).applyQuaternion(ECLIP_J2000_TO_J2000);

    stars[i] = { position, color, magnitude, absoluteMagnitude };
  }
  return stars;
}

/**
 * Build a `THREE.Points` cloud from a set of star layers.
 *
 * NASA renders these as a backdrop that stays fixed relative to the camera: the
 * vertex shader uses `gl_Position.w = viewPosition.y`, which flattens the cloud
 * onto a sphere at infinity. Doing the same here keeps the stars from growing
 * into blobs when the camera pulls out to galactic scale, so they read as a sky
 * rather than as nearby dots.
 */
export function buildStarfield(layers: Star[][]): THREE.Points {
  const stars = layers.flat();
  const positions = new Float32Array(stars.length * 3);
  const colors = new Float32Array(stars.length * 3);

  for (let i = 0; i < stars.length; i++) {
    const s = stars[i];
    positions[i * 3] = s.position.x;
    positions[i * 3 + 1] = s.position.y;
    positions[i * 3 + 2] = s.position.z;

    // Map magnitude to brightness: brighter (lower magnitude) → closer to white.
    const brightness = Math.min(1, Math.max(0.25, 1 - (s.magnitude + 1.5) / 8));
    colors[i * 3] = s.color.r * brightness;
    colors[i * 3 + 1] = s.color.g * brightness;
    colors[i * 3 + 2] = s.color.b * brightness;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 1.6,
    sizeAttenuation: false,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  // Backdrop: no depth test, and drawn after the galaxy (renderOrder -4) but
  // before any body, so stars read as being in front of the galactic disc.
  points.renderOrder = -2;
  points.frustumCulled = false;
  material.depthTest = false;
  return points;
}
