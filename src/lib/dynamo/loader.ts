/**
 * Browser-side loader for dynamo `.dyn` ephemerides.
 *
 * Fetches from NASA's dynamic-assets bucket, parses with the shared parser, and
 * caches by URL. Continuation segments (index files) are resolved transparently
 * so callers always receive a flat, time-sorted point array.
 */

import { parseDyn, type DynFile, type DynPoint } from './parse';
import { dynamoUrl } from '../nasa/assets';

export interface LoadedDynamo {
  file: DynFile;
  points: DynPoint[];
}

const cache = new Map<string, Promise<LoadedDynamo>>();

async function fetchBuffer(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`dynamo fetch failed (${res.status}) for ${url}`);
  return res.arrayBuffer();
}

/**
 * Load and parse a `.dyn` controller path such as `earth/sun/orb/def.dyn`.
 * Results are cached for the lifetime of the page.
 */
export function loadDynamo(path: string): Promise<LoadedDynamo> {
  const url = dynamoUrl(path);
  const cached = cache.get(url);
  if (cached) return cached;

  const promise = (async (): Promise<LoadedDynamo> => {
    const file = parseDyn(await fetchBuffer(url));

    if (file.segments.length === 0) {
      return { file, points: file.points };
    }

    // Index file: fetch each `name_NNN.dyn` continuation in parallel and merge.
    const base = path.slice(0, path.lastIndexOf('/'));
    const parts = await Promise.all(
      file.segments.map(async (segment) => {
        const name = String(segment.index).padStart(file.header.numberOfDigits, '0');
        const segPath = `${base}_${name}.dyn`;
        const seg = parseDyn(await fetchBuffer(dynamoUrl(segPath)));
        return seg.points;
      }),
    );
    const points = parts.flat().sort((a, b) => a.time - b.time);
    return { file, points };
  })();

  cache.set(url, promise);
  return promise;
}

/** Clear the in-memory cache (used by tests and hard refreshes). */
export function clearDynamoCache(): void {
  cache.clear();
}
