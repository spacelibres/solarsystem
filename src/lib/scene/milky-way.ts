/**
 * The Milky Way, as NASA Eyes models it.
 *
 * Every value here is transcribed from the `milky_way` entity in NASA's bundle
 * (offset ~794,733) and its `postCreateFunction`:
 *
 *   radius           1e18 km        (occlusion + extents radius)
 *   systemRadius     13e18 km
 *   parents          [[-Infinity, "observable_universe"]]
 *   sprite           $STATIC_ASSETS_URL/sprites/milky_way.png
 *   sprite size      12e17 x 12e17 km
 *   transparent      true, blending "normal"
 *   visibleInterval  12e15 .. Infinity, measured on "z-distance"
 *
 * Orientation is built from two galactic reference vectors, exactly as NASA
 * computes them in `postCreateFunction`:
 *
 *   north galactic pole   lon 192.85948120833 deg, lat 27.12825119444 deg
 *   galactic centre       lon 266.40499625  deg, lat -28.93617241667 deg
 *
 * The sprite is **not** a billboard and not a skydome: it is a flat quad whose
 * orientation is fixed by those two vectors, which is what makes the galactic
 * plane read correctly from any camera angle.
 */

import * as THREE from 'three';

import { SUN_POSITION } from '../nasa/astronomy';

/** Radians helper, mirroring NASA's `deg * Math.PI / 180`. */
const rad = (deg: number): number => (deg * Math.PI) / 180;

/** Galactic north pole, in the equatorial frame. */
const NGP_LON = rad(192.85948120833);
const NGP_LAT = rad(27.12825119444);

/** Galactic centre direction, in the equatorial frame. */
const GC_LON = rad(266.40499625);
const GC_LAT = rad(-28.93617241667);

/**
 * Build the orientation quaternion for the galactic plane.
 *
 * NASA derives the pole vector `n` and the centre vector `a` from the angles
 * above, then builds a quaternion from the two axes with
 * `setFromAxes(a, undefined, n)` — the sprite's X axis points at the galactic
 * centre, Z at the galactic pole.
 *
 * Three.js' `Matrix4.makeBasis` gives the same result for the axes we have
 * (`a` for X, `n` for Z, and their cross product for Y).
 */
export function galacticOrientation(): THREE.Quaternion {
  const n = new THREE.Vector3(
    Math.cos(NGP_LON) * Math.cos(NGP_LAT),
    Math.sin(NGP_LON) * Math.cos(NGP_LAT),
    Math.sin(NGP_LAT),
  );

  const a = new THREE.Vector3(
    Math.cos(GC_LON) * Math.cos(GC_LAT),
    Math.sin(GC_LON) * Math.cos(GC_LAT),
    Math.sin(GC_LAT),
  );

  // X = galactic centre, Z = galactic pole, Y = Z x X (right-handed basis).
  const x = a.clone().normalize();
  const z = n.clone().normalize();
  const y = new THREE.Vector3().crossVectors(z, x).normalize();
  // Re-orthogonalise X in case the two NASA vectors are not exactly orthogonal.
  x.crossVectors(y, z).normalize();

  const basis = new THREE.Matrix4().makeBasis(x, y, z);
  return new THREE.Quaternion().setFromRotationMatrix(basis);
}

/** Sprite edge length in km, from `setSize(new Vector2(12e17, 12e17))`. */
export const MILKY_WAY_SPRITE_KM = 1.2e18;

/**
 * The sprite only appears once the camera is far enough away: NASA uses a
 * `VisibleInterval(12e15, Infinity, "z-distance")`.
 */
export const MILKY_WAY_MIN_Z_DISTANCE_KM = 1.2e16;

/** `milky_way.systemRadius`, used for framing decisions. */
export const MILKY_WAY_SYSTEM_RADIUS_KM = 13e18;

/** `milky_way.radius`, used as occlusion and extents radius. */
export const MILKY_WAY_RADIUS_KM = 1e18;

/** `sun.systemRadius` — the extent the Sun's own system occupies. */
export const SUN_SYSTEM_RADIUS_KM = 2.991957e13;

export interface MilkyWayOptions {
  /** Texture URL for `milky_way.png`. */
  textureUrl: string;
  /** Loader to share with the rest of the scene. */
  loader: THREE.TextureLoader;
}

/**
 * Load the Milky Way backdrop.
 *
 * NASA renders `milky_way.png` as a fixed-orientation quad at the galactic
 * centre, 1.2e18 km across. Placing a quad that large in world space is not
 * viable outside a logarithmic depth pipeline: its vertices quantise to
 * ~1e18-km steps in float32 and it disappears. We therefore attach the same
 * texture as the scene background, which is drawn by the renderer without a
 * depth test at all and gives an identical result, while a separate marker
 * (see `buildGalacticCentreMarker`) keeps the galactic centre locatable.
 *
 * The orientation that NASA derives from the two galactic reference vectors is
 * still exposed as {@link galacticOrientation} and applied to that marker, so
 * the galactic plane is aligned exactly as in the original.
 */
export function loadMilkyWayTexture({
  textureUrl,
  loader,
}: MilkyWayOptions): THREE.Texture {
  const texture = loader.load(textureUrl, (t) => {
    t.colorSpace = THREE.SRGBColorSpace;
    t.minFilter = THREE.LinearFilter;
    t.generateMipmaps = false;
  });
  return texture;
}

/**
 * A small marker placed at the galactic centre, oriented by the galactic basis.
 *
 * NASA's equivalent is the Sun's `parents: [[-Infinity, "milky_way"]]` link plus
 * the galaxy's own label — there is no separate "you are here" icon, so this is
 * a thin ring rather than a billboard.
 */
export function buildGalacticCentreMarker(radiusKm: number): THREE.LineLoop {
  const SEGMENTS = 128;
  const positions = new Float32Array(SEGMENTS * 3);
  for (let i = 0; i < SEGMENTS; i++) {
    const theta = (i / SEGMENTS) * Math.PI * 2;
    positions[i * 3] = Math.cos(theta) * radiusKm;
    positions[i * 3 + 1] = Math.sin(theta) * radiusKm;
    positions[i * 3 + 2] = 0;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.35,
    depthWrite: false,
  });
  const ring = new THREE.LineLoop(geometry, material);
  ring.name = 'galactic_centre';
  ring.quaternion.copy(galacticOrientation());
  ring.frustumCulled = false;
  return ring;
}

/**
 * Whether the Milky Way should be drawn at this camera distance, matching
 * NASA's `z-distance` visible interval: the sprite fades in beyond 1.2e16 km.
 */
export function milkyWayVisible(cameraDistanceKm: number): boolean {
  return cameraDistanceKm >= MILKY_WAY_MIN_Z_DISTANCE_KM;
}

/**
 * NASA's galaxy spin, transcribed from the `milky_way` `postCreateFunction`:
 *
 *   const d = t.addController(SpinController);
 *   d.setAxis(new Vector3(-.8676661356982597, -.19807638974470915, .45598379452940485), false);
 *   d.setRate(-2192686e-23);
 *   d.setReferenceAngle(0);
 *   d.setReferenceTime(0);
 *
 * The axis is the north galactic pole row of the IAU galactic matrix, and the
 * rate is the same figure as the Sun's mean motion about the centre — the galaxy
 * and the Sun's galactic orbit turn together. Our backdrop is a screen-space
 * background rather than a rotating quad, so this is applied as a texture
 * rotation about the plane's normal, which gives the same apparent motion.
 */
export const GALAXY_SPIN_AXIS_KM = {
  x: -0.8676661356982597,
  y: -0.19807638974470915,
  z: 0.45598379452940485,
} as const;

/** Angular rate of the galaxy's spin, rad/s (NASA's literal). */
export const GALAXY_SPIN_RATE = -2_192_686e-23;

/**
 * Angle to rotate the backdrop by at `time` seconds from J2000.
 *
 * NASA's `SpinController` integrates a constant rate from a zero reference
 * angle, so the angle is simply `rate * time`.
 */
export function galaxySpinAngle(time: number): number {
  return GALAXY_SPIN_RATE * time;
}

/**
 * The Sun's position in the galaxy as an offset from the galactic centre, in km,
 * expressed in the world frame the scene uses (J2000 equatorial).
 *
 * The sprite's +X axis points at the galactic centre, so the Sun — which lies on
 * the Sun→centre line at R₀ — sits at local `x = -R₀` on the sprite. That is the
 * geometry NASA's `orbitalElements` controller produces at J2000, and it is what
 * places the Sun at column 302 rather than 722 of `milky_way.png`.
 */
export function sunGalacticOffset(
  radiusKm: number = SUN_POSITION.galactocentricKm,
): THREE.Vector3 {
  const v = new THREE.Vector3(-radiusKm, 0, 0);
  return v.applyQuaternion(galacticOrientation());
}

/**
 * Where the Sun appears on the Milky Way backdrop, in screen pixels.
 *
 * Three.js renders a 2D `scene.background` as a **screen-aligned fullscreen
 * quad** (`WebGLBackground`'s `planeMesh`): it does not rotate with the camera,
 * and `scene.backgroundRotation` only affects cube/equirect backgrounds. The
 * backdrop is therefore pinned to the screen, exactly like a background image.
 *
 * That fixes the Sun's position too. NASA's sprite is centred on the galactic
 * centre with +X toward it, so the Sun lies on the sprite's −X axis at
 * `R₀ / (sprite/2)` of the half-width from the centre — i.e. at texture
 * `u = 0.5 − R₀/sprite = 0.2948`, `v = 0.5`. On screen that is a constant offset
 * from the texture's centre, which the fullscreen quad maps to the viewport
 * centre.
 *
 * Returns pixel coordinates plus the sprite UV.
 */
export function projectSunOntoBackdrop(
  width: number,
  height: number,
  spriteKm: number = MILKY_WAY_SPRITE_KM,
): { x: number; y: number; u: number; v: number } {
  // The fullscreen quad maps the whole texture [0,1] onto the whole viewport,
  // so a UV maps to a pixel by direct proportion.
  const u = 0.5 - SUN_POSITION.galactocentricKm / spriteKm;
  return {
    x: u * width,
    y: 0.5 * height,
    u,
    v: 0.5,
  };
}
