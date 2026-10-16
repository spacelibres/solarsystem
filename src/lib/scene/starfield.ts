/** NASA star records: i32 count, then magnitude/absolute magnitude (f32),
 * RGB bytes, and y/z/x (f32, y negated). Coordinates rotate from ecliptic
 * J2000 to equatorial J2000; Pioneer wxyz must become Three xyzw.
 *
 * parseStarfield is shared. buildStarfield below retains the old +Y camera
 * shader for the previous viewer; /explorer uses src/solar/render/sky.ts,
 * which implements standard Three -Z projection, flux and entity occlusion.
 */
import * as THREE from 'three';

const ECLIP_J2000_TO_J2000 = new THREE.Quaternion(
  0.2031230389823101,
  0,
  0,
  0.9791532214288992,
);

export const STAR_SHELL_CAMERA_FRACTION = 0.5;

export function starShellRadius(cameraDistanceKm: number): number {
  return cameraDistanceKm * STAR_SHELL_CAMERA_FRACTION;
}

export const STAR_SHELL_KM = 1e12;

export const STAR_BYTES = 23;

export const STARFIELD_LAYERS = [
  'galaxies.0',
  'stars.0',
  'stars.1',
  'stars.2',
  'stars.3',
  'stars.4',
  'stars.5',
] as const;

export interface Star {
  position: THREE.Vector3;
  color: THREE.Color;
  magnitude: number;
  absoluteMagnitude: number;
}

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
    const y = -view.getFloat32(o + 11, true);
    const z = view.getFloat32(o + 15, true);
    const x = view.getFloat32(o + 19, true);
    o += STAR_BYTES;
    const max = Math.max(r, g, b) || 1;
    const color = new THREE.Color(r / max, g / max, b / max);
    const position = new THREE.Vector3(x, y, z).applyQuaternion(ECLIP_J2000_TO_J2000);

    stars[i] = { position, color, magnitude, absoluteMagnitude };
  }
  return stars;
}

const STAR_VERTEX_SHADER = /* glsl */ `
#define PI 3.1415926538
attribute vec4 color;
attribute float distance;
varying vec4 fColor;

uniform float particleSize;
float absoluteMagnitudeToFlux(float absoluteMagnitude, float distanceKm) {
  float luminosityInWatts = 3.0128e28 * pow(10.0, absoluteMagnitude / -2.5);
  return luminosityInWatts / (4.0 * PI * distanceKm * distanceKm);
}

void main() {
  vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);

  float flux = absoluteMagnitudeToFlux(color.a, distance);
  float brightness = 2.0 * log(1.0 + flux * 1e4);

  gl_Position = projectionMatrix * viewPosition;
  gl_Position.w = viewPosition.y;
  fColor = color;

  fColor.a = clamp(brightness * particleSize, 0.05, 1.0);
  gl_PointSize = clamp(brightness * 4.0 * particleSize, 5.0, 50.0);
}
`;

const STAR_FRAGMENT_SHADER = /* glsl */ `
precision highp float;

varying vec4 fColor;

void main(void) {
  float distanceFromEdge = clamp(1.0 - 2.0 * length(gl_PointCoord - vec2(0.5, 0.5)), 0.0, 1.0);
  float a = pow(distanceFromEdge, 5.0);
  gl_FragColor.rgb = fColor.rgb;
  gl_FragColor.a = fColor.a * a;
}
`;

export function buildStarfield(layers: Star[][]): THREE.Points {
  const stars = layers.flat();
  const positions = new Float32Array(stars.length * 3);
  const colors = new Float32Array(stars.length * 4);
  const distances = new Float32Array(stars.length);

  for (let i = 0; i < stars.length; i++) {
    const s = stars[i];
    const len = s.position.length() || 1;
    positions[i * 3] = s.position.x / len;
    positions[i * 3 + 1] = s.position.y / len;
    positions[i * 3 + 2] = s.position.z / len;
    distances[i] = len;

    colors[i * 4] = s.color.r;
    colors[i * 4 + 1] = s.color.g;
    colors[i * 4 + 2] = s.color.b;
    colors[i * 4 + 3] = s.absoluteMagnitude;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 4));
  geometry.setAttribute('distance', new THREE.BufferAttribute(distances, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: { particleSize: { value: 1 } },
    vertexShader: STAR_VERTEX_SHADER,
    fragmentShader: STAR_FRAGMENT_SHADER,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: false,
  });

  const points = new THREE.Points(geometry, material);
  points.renderOrder = -2;
  points.frustumCulled = false;
  geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 0);
  return points;
}
