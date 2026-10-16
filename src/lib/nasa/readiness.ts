import { PLANET_IDS } from './catalog';

/** Optional bodies can fail independently; missing planets cannot be a success. */
export function requireCoreEphemerides(loadedIds: ReadonlySet<string>): void {
  const missing = PLANET_IDS.filter((id) => !loadedIds.has(id));
  if (missing.length) throw new Error(`NASA orbit data unavailable for: ${missing.join(', ')}. Check the connection and retry.`);
}
