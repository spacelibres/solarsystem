/**
 * Shape of `src/data/catalog.json`, produced by `tools/extract-catalog.cjs` from
 * NASA Eyes's own bundle. Regenerate with `npm run catalog` when NASA ships new
 * bodies; do not hand-edit.
 */

import type { ParentSegment } from '../scene/parenting';

export interface TextureDescriptor {
  /** Path template relative to `maps/`, containing `$SIZE` and `$FACE`. */
  url: string;
  /** Available face resolutions, ascending. */
  sizes: number[];
}

export interface Spheroid {
  equatorialRadius: number;
  polarRadius: number;
  /** True for planetographic latitude, false for geocentric/triaxial. */
  planetographic: boolean;
}

export interface CatalogEntity {
  id: string;
  label: string;
  groups: string[];
  /** Nominal body radius in km (null for spacecraft). */
  radius: number | null;
  /** Visual radius of this body's whole sub-system, in km. */
  systemRadius: number | null;
  /** Picking/framing radius override (spacecraft use tiny values). */
  extentsRadius: number | null;
  /** Occlusion radius override. */
  occlusionRadius: number | null;
  spheroid: Spheroid | null;
  /**
   * Time-segmented parenting table: `[startTime, parentName]`, sorted ascending.
   * `ALWAYS` marks a segment that applies from the beginning of time.
   */
  parents: ParentSegment[];
  /** Primary dynamo controller path, e.g. `earth/sun/orb/def.dyn`. */
  dynamo: string | null;
  /** Every dynamo controller, paired in order with `parents` phases. */
  allDynamo: string[];
  /** `.gltf` model path (relative to the static base) when present. */
  modelUrl: string | null;
  textures: Record<string, TextureDescriptor>;
}

export type Catalog = Record<string, CatalogEntity>;

/** Bodies shown in the default "planets" view, in orbital order from the Sun. */
export const PLANET_IDS = [
  'mercury',
  'venus',
  'earth',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
] as const;

export type PlanetId = (typeof PLANET_IDS)[number];

/** Solar-system hierarchy roots used by the scene. */
export const ROOT_IDS = ['sun'] as const;
