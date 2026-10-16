/**
 * Starfield rendering from NASA's own `stars.<n>.bin` and `galaxies.0.bin`.
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
 *
 * ## How NASA draws them
 *
 * This is not a flat points cloud. NASA uploads a **4-component** colour
 * attribute — rgb plus the star's **absolute magnitude in the alpha channel** —
 * and the vertex shader converts that magnitude to a flux, which drives both the
 * point size and the brightness:
 *
 *   luminosity = 3.0128e28 * pow(10, absMag / -2.5)      watts
 *   flux       = luminosity / (4π · distance²)
 *   brightness = 2·log(1 + flux · 1e4)
 *   pointSize  = clamp(brightness · 4 · particleSize, 5, 50)   px
 *   alpha      = clamp(brightness · particleSize, 0.05, 1)
 *
 * `gl_Position.w = viewPosition.y` pins the field to the sky, and the fragment
 * shader turns each square point into a soft disc with `pow(1 - 2·|uv - 0.5|, 5)`.
 *
 * Dropping the magnitude channel is what leaves a starfield looking sparse and
 * flat: without it every star is the same size and none of the bright ones stand
 * out.
 */

import * as THREE from 'three';

/** NASA's ecliptic-J2000 → J2000 rotation. */
const ECLIP_J2000_TO_J2000 = new THREE.Quaternion(
  0.9791532214288992,
  0.2031230389823101,
  0,
  0,
);

/**
 * Radius the star directions are scaled to, as a fraction of the camera's orbit
 * radius.
 *
 * The starfield geometry holds **unit** directions; the object is scaled per frame
 * to this fraction of the camera distance. That radius is only a float32
 * convenience — the shader overwrites `gl_Position.w`, so the projected result
 * depends on direction alone and is identical at any scale. Keeping it
 * proportional to `camRadius` simply keeps the intermediate `modelViewMatrix`
 * multiply in a comfortable numeric range at every zoom.
 */
export const STAR_SHELL_CAMERA_FRACTION = 0.5;

/**
 * Radius for the sky shell.
 *
 * Only a float32 convenience now, not a clipping workaround. The shader replaces
 * `gl_Position.w` with the view-space vertical component, so the projection is
 * direction-only and no near or far plane can clip the cloud — measured against
 * the reference, which renders the whole sky this way.
 *
 * The earlier attempt to fix the dark disc by sizing this radius to fit between
 * `near` and `far` was treating a symptom. A real sphere centred on the camera
 * always has its rear half at negative view depth, so no radius makes it safe;
 * the projected direction-only form does.
 */
export function starShellRadius(cameraDistanceKm: number): number {
  return cameraDistanceKm * STAR_SHELL_CAMERA_FRACTION;
}

/** Kept for callers that want a nominal world radius. */
export const STAR_SHELL_KM = 1e12;

export const STAR_BYTES = 23;

/** The seven layers attached to the Sun entity, in load order. */
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
 * NASA's starfield vertex shader, transcribed from the live bundle.
 *
 * The important line is `gl_Position.w = viewPosition.y`. It is not a depth trick:
 * because the GPU divides clip space by `w`, overwriting `w` with the view-space
 * vertical component makes the projected position depend only on a star's
 * *direction*, not its distance. The cloud is therefore placed at infinity and is
 * completely immune to the camera's near and far planes.
 *
 * That matters because the camera sits inside the cloud. We previously scaled a
 * real sphere to a fraction of the camera distance and left this line out, on the
 * belief that it divided by a signed component and clipped half the sky. Measured
 * against the reference, the opposite is true: the whole sky renders, because a
 * point behind the camera gets `w < 0`, is divided through, and lands at its
 * mirrored screen position rather than being clipped.
 *
 * The arithmetic version of the same thing is what the sphere scaling got wrong:
 * a real sphere of radius R centred on the camera has rear vertices at negative
 * view depth, so a positive `near` plane removes them, and with `R = 0.5 x
 * camRadius` and `near = 0.1 x camRadius` everything beyond about 78 degrees from
 * the view axis vanished. That is the hard-edged dark disc that appeared at close
 * range.
 *
 * `distance` still carries the true parallax distance, so star flux stays
 * physically meaningful even though the projected position is direction-only.
 */
const STAR_VERTEX_SHADER = /* glsl */ `
#define PI 3.1415926538

// GLSL1 syntax: ShaderMaterial defaults to GLSL1, where attributes and varyings
// must use the attribute and varying qualifiers. Writing in/out here fails to
// link and the field silently disappears.
attribute vec4 color;
attribute float distance;
varying vec4 fColor;

uniform float particleSize;

// Watts per km^2 at the camera, from the star's absolute magnitude and its true
// parallax distance (passed in unnormalised by the CPU).
float absoluteMagnitudeToFlux(float absoluteMagnitude, float distanceKm) {
  float luminosityInWatts = 3.0128e28 * pow(10.0, absoluteMagnitude / -2.5);
  return luminosityInWatts / (4.0 * PI * distanceKm * distanceKm);
}

void main() {
  // Unit direction scaled on the CPU to whatever radius keeps the cloud
  // generation stable in float32; the shader discards the length below.
  vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);

  float flux = absoluteMagnitudeToFlux(color.a, distance);
  float brightness = 2.0 * log(1.0 + flux * 1e4);

  gl_Position = projectionMatrix * viewPosition;
  // NASA's flattening: dividing by the view-space y makes the projected point
  // depend only on direction, placing the cloud at infinity so no near or far
  // plane can ever clip it.
  gl_Position.w = viewPosition.y;
  fColor = color;

  fColor.a = clamp(brightness * particleSize, 0.05, 1.0);
  gl_PointSize = clamp(brightness * 4.0 * particleSize, 5.0, 50.0);
}
`;

/** A soft round point, via NASA's fifth-power radial falloff. */
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

/**
 * Build a `THREE.Points` cloud from a set of star layers, using NASA's shader.
 *
 * ## Why the positions are normalised on the CPU
 *
 * The files store real parallax coordinates, 4e13 to 3e20 km. Uploaded raw as
 * float32 — a 7-digit mantissa — the *direction* of a 1e19 km vector is lost to
 * rounding, and the shader's `normalize()` then produces garbage that projects
 * to NaN and draws nothing. This is the same float32 wall the 1.2e18 km Milky Way
 * quad hit.
 *
 * So the direction is computed in float64 here, normalised to a unit sphere, and
 * scaled by a fixed shell radius that sits safely inside the camera's far plane.
 * The true distance is preserved in the colour attribute's alpha channel, which
 * the shader uses for the flux — so near stars are still brighter.
 */
export function buildStarfield(layers: Star[][]): THREE.Points {
  const stars = layers.flat();
  const positions = new Float32Array(stars.length * 3);
  const colors = new Float32Array(stars.length * 4);
  const distances = new Float32Array(stars.length);

  for (let i = 0; i < stars.length; i++) {
    const s = stars[i];
    const len = s.position.length() || 1;
    // A **unit** direction; the scene scales the object to place it at whatever
    // radius the current camera can see. Baking in a fixed shell would desync the
    // sky from the solar system as soon as the camera passed that radius.
    positions[i * 3] = s.position.x / len;
    positions[i * 3 + 1] = s.position.y / len;
    positions[i * 3 + 2] = s.position.z / len;
    // The true parallax distance drives the flux, so near stars stay brighter.
    distances[i] = len;

    colors[i * 4] = s.color.r;
    colors[i * 4 + 1] = s.color.g;
    colors[i * 4 + 2] = s.color.b;
    // The magnitude channel; the shader turns it into flux.
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
  // NASA gives all seven layers renderOrder -2.
  points.renderOrder = -2;
  // The cloud is pinned to the sky by the shader, so it is never frustum
  // culled and needs no bounding sphere. Setting one explicitly avoids three.js
  // computing it from parallax distances spanning 4e13 to 3e20 km, which is
  // both pointless and a source of NaN warnings.
  points.frustumCulled = false;
  geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 0);
  return points;
}
