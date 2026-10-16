/**
 * Planetary ring systems.
 *
 * Each value below is transcribed from the owning entity's
 * `postCreateFunction` in NASA's bundle, which adds a `RingsComponent` with an
 * explicit inner/outer radius and a top/bottom sprite:
 *
 *   saturn   inner 74270.580913 km, outer 140478.924731 km,
 *            top `saturn_rings_top.png`, bottom `saturn_rings_bottom.png`
 *   uranus   inner 26840 km, outer 103000 km, both sides `uranus_rings.png`
 *   neptune  inner 40900 km, outer 62964 km, both sides `neptune_rings.png`
 *
 * Rings are flat annuli lying in the body's equatorial plane. Because our scene
 * keeps true kilometre scale, the geometry is built in km directly and parented
 * to the planet's mesh so it inherits every transform.
 */

import * as THREE from 'three';

import { SPRITES } from '../nasa/assets';

export interface RingSpec {
  /** Ring inner radius, km. */
  innerRadius: number;
  /** Ring outer radius, km. */
  outerRadius: number;
  /** Texture for the sunlit face. */
  top: string;
  /** Texture for the shadowed face (often the same file). */
  bottom: string;
}

/** Ring definitions, keyed by catalog entity id. */
export const RING_SPECS: Record<string, RingSpec> = {
  saturn: {
    innerRadius: 74270.580913,
    outerRadius: 140478.924731,
    top: SPRITES.saturnRingsTop,
    bottom: SPRITES.saturnRingsBottom,
  },
  uranus: {
    innerRadius: 26840,
    outerRadius: 103_000,
    top: SPRITES.uranusRings,
    bottom: SPRITES.uranusRings,
  },
  neptune: {
    innerRadius: 40900,
    outerRadius: 62964,
    top: SPRITES.neptuneRings,
    bottom: SPRITES.neptuneRings,
  },
};

/**
 * Build a ring system: two single-sided annuli back to back so each face can
 * carry its own texture, plus transparency and depth settings that let the
 * planet show through the gaps.
 */
export function buildRings(spec: RingSpec, textureLoader: THREE.TextureLoader): THREE.Group {
  const group = new THREE.Group();
  group.name = 'rings';

  const topTexture = textureLoader.load(spec.top, (t) => {
    t.colorSpace = THREE.SRGBColorSpace;
    // Ring sprites are 2048x1 strips; mipmapping a one-pixel-tall image makes
    // the whole ring fade to nothing at distance.
    t.minFilter = THREE.LinearFilter;
    t.generateMipmaps = false;
    t.wrapS = THREE.ClampToEdgeWrapping;
    t.wrapT = THREE.ClampToEdgeWrapping;
  });
  const bottomTexture = textureLoader.load(spec.bottom, (t) => {
    t.colorSpace = THREE.SRGBColorSpace;
    t.minFilter = THREE.LinearFilter;
    t.generateMipmaps = false;
    t.wrapS = THREE.ClampToEdgeWrapping;
    t.wrapT = THREE.ClampToEdgeWrapping;
  });

  const top = new THREE.Mesh(
    buildAnnulus(spec.innerRadius, spec.outerRadius),
    new THREE.MeshBasicMaterial({
      map: topTexture,
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
      opacity: 0.95,
    }),
  );
  // The annulus faces +Z; the "top" ring must face the camera when above the
  // planet, so it is rotated flat into the equatorial plane.
  top.rotation.x = -Math.PI / 2;
  top.renderOrder = 1;

  const bottom = new THREE.Mesh(
    buildAnnulus(spec.innerRadius, spec.outerRadius),
    new THREE.MeshBasicMaterial({
      map: bottomTexture,
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
      opacity: 0.95,
    }),
  );
  bottom.rotation.x = Math.PI / 2;
  bottom.renderOrder = 1;

  group.add(top);
  group.add(bottom);
  return group;
}

/**
 * A flat annulus in the XY plane, UV-mapped so the ring texture's horizontal
 * axis runs radially from the inner edge to the outer edge.
 */
function buildAnnulus(innerRadius: number, outerRadius: number): THREE.BufferGeometry {
  const SEGMENTS = 256;
  const positions = new Float32Array((SEGMENTS + 1) * 2 * 3);
  const uvs = new Float32Array((SEGMENTS + 1) * 2 * 2);
  const indices: number[] = [];

  for (let i = 0; i <= SEGMENTS; i++) {
    const theta = (i / SEGMENTS) * Math.PI * 2;
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);

    // The ring sprites are 2048x1 strips: their horizontal axis runs from the
    // inner edge to the outer edge, so U must follow the radius and V is free.
    // Inner vertex
    positions[i * 6] = cos * innerRadius;
    positions[i * 6 + 1] = sin * innerRadius;
    positions[i * 6 + 2] = 0;
    uvs[i * 4] = 0;
    uvs[i * 4 + 1] = 0.5;

    // Outer vertex
    positions[i * 6 + 3] = cos * outerRadius;
    positions[i * 6 + 4] = sin * outerRadius;
    positions[i * 6 + 5] = 0;
    uvs[i * 4 + 2] = 1;
    uvs[i * 4 + 3] = 0.5;

    if (i < SEGMENTS) {
      const a = i * 2;
      const b = i * 2 + 1;
      const c = (i + 1) * 2;
      const d = (i + 1) * 2 + 1;
      indices.push(a, c, b, b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}
