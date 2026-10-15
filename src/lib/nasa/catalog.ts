/**
 * Shape of `src/data/catalog.json`, produced by `tools/extract-catalog.cjs` from
 * NASA Eyes's own bundle. Regenerate it with `npm run catalog` when NASA ships
 * new bodies; do not hand-edit.
 */

export interface TextureDescriptor {
  /** Path template relative to `maps/`, containing `$SIZE` and `$FACE`. */
  url: string;
  /** Available face resolutions, ascending. */
  sizes: number[];
}

export interface CatalogEntity {
  id: string;
  label: string;
  groups: string[];
  /** Nominal display radius in km. */
  radius: number | null;
  /** Immediate parents in the scene graph (e.g. `["sun"]`, `["earth"]`). */
  parents: string[];
  /** Primary dynamo controller path, e.g. `earth/sun/orb/def.dyn`. */
  dynamo: string | null;
  allDynamo: string[];
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
