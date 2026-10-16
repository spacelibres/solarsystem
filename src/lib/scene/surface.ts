/**
 * Multi-layer body surfaces.
 *
 * NASA's `spheroidLOD` gives each body a set of *roles*, not a single map. Earth
 * is the richest example:
 *
 *   color     surface albedo
 *   normal    surface relief
 *   specular  ocean/land reflectance
 *   night     city lights, shown where the surface faces away from the Sun
 *   decal     cloud layer, drawn as a separate translucent shell
 *
 * The sphere is therefore composited from a lit surface pass plus a cloud shell,
 * rather than a single textured ball. Night lights are blended in based on the
 * angle to the Sun, which is what makes the terminator read correctly.
 */

import * as THREE from 'three';

import type { CatalogEntity, TextureDescriptor } from '../nasa/catalog';
import { pickSize, textureUrl } from '../nasa/assets';

/** Roles that make up a lit planet surface. */
const SURFACE_ROLES = ['color', 'normal', 'specular', 'night'] as const;

export interface SurfaceMaterials {
  /** The planet body itself. */
  surface: THREE.Material;
  /** Optional cloud/atmosphere shell, drawn slightly larger. */
  shell?: THREE.Material;
}

/**
 * Build the materials for a body from its texture roles.
 *
 * Bodies with only a `color` map get the simple lit material; bodies with a
 * `night` map or a `decal` shell get the composited version.
 */
export function buildSurface(
  entity: CatalogEntity,
  loader: THREE.TextureLoader,
  preferSize: number,
  sunDirection: THREE.Vector3,
): SurfaceMaterials {
  const roles: Partial<Record<(typeof SURFACE_ROLES)[number], THREE.Texture>> = {};

  for (const role of SURFACE_ROLES) {
    const desc = entity.textures[role];
    if (!desc) continue;
    const size = pickSize(desc.sizes, preferSize);
    roles[role] = loadSphereMap(loader, desc, size);
  }

  const hasNight = Boolean(roles.night);

  const surface = hasNight
    ? buildNightBlendedMaterial(roles, sunDirection)
    : new THREE.MeshStandardMaterial({
        map: roles.color ?? null,
        normalMap: roles.normal ?? null,
        roughnessMap: roles.specular ?? null,
        roughness: roles.normal ? 0.85 : 0.95,
        metalness: 0,
      });

  const shellDesc = entity.textures.decal;
  const shell = shellDesc
    ? buildCloudShell(loader, shellDesc, preferSize)
    : undefined;

  return { surface, shell };
}

/** Load a cubemap face and normalise it as a colour texture. */
function loadSphereMap(
  loader: THREE.TextureLoader,
  desc: TextureDescriptor,
  size: number,
): THREE.Texture {
  return loader.load(textureUrl(desc, size, 0), (t) => {
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
  });
}

/**
 * Surface material that blends day albedo with night lights across the
 * terminator. The shader mirrors what NASA's `colorMapEmissive` option does:
 * the night map is added where `dot(normal, sunDir) < 0`, scaled smoothly so
 * there is no hard seam.
 */
function buildNightBlendedMaterial(
  roles: Partial<Record<(typeof SURFACE_ROLES)[number], THREE.Texture>>,
  sunDirection: THREE.Vector3,
): THREE.Material {
  const material = new THREE.MeshStandardMaterial({
    map: roles.color ?? null,
    normalMap: roles.normal ?? null,
    roughnessMap: roles.specular ?? null,
    roughness: 0.85,
    metalness: 0,
    emissiveMap: roles.night ?? null,
    emissive: new THREE.Color(1, 1, 1),
    emissiveIntensity: 1,
  });

  material.onBeforeCompile = (shader: THREE.WebGLProgramParametersWithUniforms) => {
    shader.uniforms.sunDirection = { value: sunDirection };
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
         uniform vec3 sunDirection;`,
      )
      .replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
         // Fade the night map out on the sunlit hemisphere.
         float sunAlign = dot(normalize(vNormal), normalize(sunDirection));
         float nightAmount = smoothstep(0.15, -0.25, sunAlign);
         totalEmissiveRadiance *= nightAmount;`,
      );
  };

  return material;
}

/**
 * A translucent cloud shell, a hair larger than the surface so it never
 * z-fights.
 *
 * Earth's `decal` map is `earth/cloud_$SIZE_$FACE.png`, a white cloud field on
 * black. NASA removes it entirely when the content database's `clouds` flag is
 * false, so its presence is the feature switch.
 *
 * The shell is lit by the same Sun and takes the cloud map as both colour and
 * alpha, which is what makes the clouds read as bright white rather than as a
 * grey wash: on a `MeshStandardMaterial` with `map` alone the blacks would be
 * lit and become visible.
 */
function buildCloudShell(
  loader: THREE.TextureLoader,
  desc: TextureDescriptor,
  preferSize: number,
): THREE.Material {
  const size = pickSize(desc.sizes, preferSize);
  const map = loader.load(textureUrl(desc, size, 0), (t) => {
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
  });

  return new THREE.MeshStandardMaterial({
    map,
    transparent: true,
    // NASA's clouds are opaque where the map is white and invisible where it is
    // black, so full opacity with the map as the alpha channel is the match.
    opacity: 1,
    alphaMap: map,
    depthWrite: false,
    roughness: 1,
    metalness: 0,
  });
}
