/**
 * Catalog helpers for the UI: group bodies into recognisable buckets and format
 * simulation time. Parenting is time-segmented, so "which planet does this moon
 * belong to" is answered by the *first* segment's parent.
 */

import type { CatalogEntity } from './catalog';

export interface BodyGroup {
  id: string;
  label: string;
  ids: string[];
}

/** The eight planets plus the Sun, in orbital order. */
export const CORE_IDS = [
  'sun',
  'mercury',
  'venus',
  'earth',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
] as const;

/** The parent a body is attached to at the start of its table (its "home"). */
export function homeParent(entity: CatalogEntity): string | null {
  if (!entity.parents.length) return null;
  const name = entity.parents[0][1];
  return name === '' ? null : name;
}

/** Build sidebar groups: core bodies, then moons by planet, then dwarfs. */
export function buildGroups(catalog: Record<string, CatalogEntity>): BodyGroup[] {
  const groups: BodyGroup[] = [];

  groups.push({
    id: 'core',
    label: 'Sun & Planets',
    ids: CORE_IDS.filter((id) => catalog[id]),
  });

  const MOON_PARENTS = ['earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
  for (const parent of MOON_PARENTS) {
    const label = catalog[parent]?.label ?? parent;
    const ids = Object.values(catalog)
      .filter((e) => e.groups.includes('moons') && homeParent(e) === parent)
      .map((e) => e.id)
      .sort((a, b) => (catalog[a]?.label ?? a).localeCompare(catalog[b]?.label ?? b));
    if (ids.length) groups.push({ id: `moons-${parent}`, label: `${label} moons`, ids });
  }

  const dwarfs = Object.values(catalog)
    .filter((e) => e.groups.includes('dwarf planets'))
    .map((e) => e.id)
    .sort();
  if (dwarfs.length) groups.push({ id: 'dwarfs', label: 'Dwarf planets', ids: dwarfs });

  const spacecraft = Object.values(catalog)
    .filter((e) => e.groups.includes('spacecraft'))
    .map((e) => e.id)
    .sort();
  if (spacecraft.length) groups.push({ id: 'spacecraft', label: 'Spacecraft', ids: spacecraft });

  return groups;
}

/** Format a simulation time (seconds since J2000) as an ISO-like UTC date. */
export function formatSimTime(secondsSinceJ2000: number): string {
  const J2000_MS = Date.UTC(2000, 0, 1, 12, 0, 0);
  const d = new Date(J2000_MS + secondsSinceJ2000 * 1000);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  const hh = String(d.getUTCHours()).padStart(2, '0');
  const mm = String(d.getUTCMinutes()).padStart(2, '0');
  return `${y}-${m}-${day} ${hh}:${mm} UTC`;
}
