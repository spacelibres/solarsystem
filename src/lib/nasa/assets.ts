/**
 * Asset URL builders.
 *
 * Every path points at the local mirror served by the `/nasa/[...path]` route,
 * not at NASA. The mirror is produced by `tools/download-mirror.cjs`; the app
 * never reaches the network at runtime.
 *
 * Mirror layout (mirrors NASA's URL structure):
 *   static   <prefix>/static/...    e.g. /nasa/static/maps/earth/color_512_0.png
 *   dynamic  <prefix>/dynamic/...   e.g. /nasa/dynamic/dynamo/earth/sun/orb/def.dyn
 */

export const MIRROR_URL_PREFIX = '/nasa';

export const STATIC_ASSETS_URL = `${MIRROR_URL_PREFIX}/static`;
export const DYNAMIC_ASSETS_URL = `${MIRROR_URL_PREFIX}/dynamic`;

/**
 * Build a texture URL from a catalog entry's `{url, sizes}` descriptor.
 *
 * `$SIZE` is the cubemap face resolution (4 / 16 / 512 / 1024 / 4096) and
 * `$FACE` is the face index 0–5, matching NASA's `maps/<body>/<map>_<size>_<face>`.
 */
export function textureUrl(descriptor: { url: string }, size: number, face = 0): string {
  const resolved = descriptor.url
    .replace('$SIZE', String(size))
    .replace('$FACE', String(face));
  return `${STATIC_ASSETS_URL}/maps/${resolved}`;
}

/** Largest available size ≤ `prefer`, falling back to the smallest offered. */
export function pickSize(sizes: number[], prefer: number): number {
  if (!sizes.length) return prefer;
  const sorted = [...sizes].sort((a, b) => a - b);
  let best = sorted[0];
  for (const s of sorted) if (s <= prefer) best = s;
  return best;
}

/** Full URL for a `.dyn` controller path such as `earth/sun/orb/def.dyn`. */
export function dynamoUrl(path: string): string {
  return `${DYNAMIC_ASSETS_URL}/dynamo/${path}`;
}

/** Sprite / starfield assets referenced directly by NASA's components. */
export const SPRITES = {
  sunGlow: `${STATIC_ASSETS_URL}/sprites/sun_glow.png`,
  milkyWay: `${STATIC_ASSETS_URL}/sprites/milky_way.png`,
  saturnRingsTop: `${STATIC_ASSETS_URL}/sprites/saturn_rings_top.png`,
  saturnRingsBottom: `${STATIC_ASSETS_URL}/sprites/saturn_rings_bottom.png`,
  uranusRings: `${STATIC_ASSETS_URL}/sprites/uranus_rings.png`,
  neptuneRings: `${STATIC_ASSETS_URL}/sprites/neptune_rings.png`,
} as const;

/** Starfield layers: six `stars.<0..5>.bin` layers plus a galaxy backdrop. */
export function starfieldUrl(layer: number): string {
  return `${STATIC_ASSETS_URL}/stars/stars.${layer}.bin`;
}

export const GALAXIES_URL = `${STATIC_ASSETS_URL}/stars/galaxies.0.bin`;
export const CONSTELLATIONS_URL = `${STATIC_ASSETS_URL}/stars/constellations.bin`;

/** A model URL from a catalog-relative path, e.g. `models/jupiter/0/jupiter_0.gltf`. */
export function modelUrl(path: string): string {
  return `${STATIC_ASSETS_URL}/${path}`;
}
