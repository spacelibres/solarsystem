/**
 * Browser-side loader for dynamo `.dyn` ephemerides.
 *
 * A `.dyn` controller path such as `moon/earth/orb/def.dyn` describes motion
 * **relative to the parent named in the path**, which is exactly what the scene
 * needs for its parent-chain accumulation. The loader returns the points plus
 * the parent they are relative to, so callers never have to re-derive it.
 */

import { parseDyn, parseDynSegment, type DynFile, type DynPoint } from './parse';
import { dynamoUrl } from '../nasa/assets';

export interface LoadedDynamo {
  file: DynFile;
  points: DynPoint[];
  /** Parent body id the points are relative to, or null for the root frame. */
  relTo: string | null;
  /** Controller path as given, e.g. `moon/earth/orb/def.dyn`. */
  path: string;
}

const cache = new Map<string, Promise<LoadedDynamo>>();

async function fetchBuffer(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`dynamo fetch failed (${res.status}) for ${url}`);
  return res.arrayBuffer();
}

/**
 * Load a controller, degrading gracefully when a window is unavailable.
 *
 * Some controllers have no data for the requested epoch (a spacecraft before
 * launch, or an orbit window outside its span). NASA leaves those bodies
 * unpositioned rather than failing the scene, so we return an empty point set.
 */
async function tryLoadDynamo(path: string, atTime: number): Promise<LoadedDynamo | null> {
  try {
    return await loadDynamo(path, atTime);
  } catch {
    return null;
  }
}

/**
 * Derive the reference frame from a controller path.
 *
 * Patterns seen in NASA's bundle:
 *   `moon/earth/orb`          → earth
 *   `sc_juno/jupiter`         → jupiter
 *   `earth/ori`               → null (orientation only, no translation frame)
 *   `sc_juice/quat`           → null
 *   `sc_pioneer_10/sun/1/orb` → sun
 */
export function referenceBodyOf(path: string): string | null {
  const parts = path.split('/');
  // Drop a leading entity name and a trailing `def.dyn`.
  const segments = parts.slice(1).filter((p) => p !== 'def.dyn');
  if (!segments.length) return null;
  // Orientation/quaternion-only controllers carry no translation frame.
  if (/^(ori|quat)$/.test(segments[0])) return null;
  // The first segment is the reference body when it looks like an id.
  const first = segments[0];
  if (/^[a-z][a-z0-9_]*$/.test(first) && !/^\d+$/.test(first)) {
    return first;
  }
  return null;
}

/**
 * Load a `.dyn` controller path.
 *
 * Index files are common: a moon's `orb` file can hold 160+ segments covering
 * centuries, each a separate download. NASA loads only the segment covering the
 * requested time and unloads it again, so we do the same — fetching every
 * segment would mean thousands of requests on load.
 */
export function loadDynamo(path: string, atTime = 0): Promise<LoadedDynamo> {
  const url = dynamoUrl(path);
  const cached = cache.get(url);
  if (cached) {
    // Already resolved or in flight: reuse, but if it was segmented we may need
    // a different window for a very different time.
    return cached.then((res) =>
      res.file.segments.length > 0 && !windowCovers(res, atTime)
        ? loadSegmentWindow(path, url, atTime)
        : res,
    );
  }

  const promise = schedule(() => loadUncached(path, url, atTime));
  cache.set(url, promise);
  return promise;
}

function windowCovers(res: LoadedDynamo, atTime: number): boolean {
  if (!res.points.length) return false;
  const min = res.points[0].time;
  const max = res.points[res.points.length - 1].time;
  return atTime >= min && atTime <= max;
}

/** Fetch only the segment whose window contains `atTime`. */
async function loadSegmentWindow(
  path: string,
  url: string,
  atTime: number,
): Promise<LoadedDynamo> {
  void url;
  const cacheKey = `${path}@${bucketOf(atTime)}`;
  const hit = segmentCache.get(cacheKey);
  if (hit) return hit;
  const p = schedule(() => fetchIndexWindow(path, atTime));
  segmentCache.set(cacheKey, p);
  return p;
}

const segmentCache = new Map<string, Promise<LoadedDynamo>>();

/** Coarse time bucket so small clock moves reuse the same segment. */
function bucketOf(time: number): number {
  return Math.floor(time / (90 * 86400)); // ~quarter year
}

async function fetchIndexWindow(path: string, atTime: number): Promise<LoadedDynamo> {
  const file = parseDyn(await fetchBuffer(dynamoUrl(path)));
  const relTo = referenceBodyOf(path);

  // Pick the segment covering `atTime`, else the nearest one available.
  let chosen = file.segments[0];
  for (const seg of file.segments) {
    if (seg.startTime <= atTime) chosen = seg;
    else break;
  }

  const points = parseDynSegment(
    await fetchBuffer(dynamoUrl(segmentPath(path, file, chosen.index))),
    file.header.pointType,
  );
  return { file, points, relTo, path };
}

/**
 * Resolve a segment's URL. NASA stores segments as `<kind>/<NNN>.dyn` beside the
 * index file, e.g. an index at `ganymede/jupiter/orb/def.dyn` has segments at
 * `ganymede/jupiter/orb/122.dyn`.
 *
 * `path` is the controller path including `/def.dyn`, so the directory is its
 * parent and the segment sits directly inside it.
 */
export function segmentPath(path: string, file: DynFile, index: number): string {
  const name = String(index).padStart(file.header.numberOfDigits, '0');
  const dir = path.slice(0, path.lastIndexOf('/'));
  return `${dir}/${name}.dyn`;
}

const MAX_CONCURRENT = 6;
let active = 0;
const queue: Array<() => void> = [];

function schedule<T>(task: () => Promise<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const run = () => {
      active++;
      task()
        .then(resolve, reject)
        .finally(() => {
          active--;
          const next = queue.shift();
          if (next) next();
        });
    };
    if (active < MAX_CONCURRENT) run();
    else queue.push(run);
  });
}

async function loadUncached(path: string, url: string, atTime: number): Promise<LoadedDynamo> {
  const file = parseDyn(await fetchBuffer(url));
  const relTo = referenceBodyOf(path);

  if (file.segments.length === 0) {
    return { file, points: file.points, relTo, path };
  }

  // Index file: NASA loads only the window covering the current time. Loading
  // every segment would mean hundreds of requests per body.
  let chosen = file.segments[0];
  for (const seg of file.segments) {
    if (seg.startTime <= atTime) chosen = seg;
    else break;
  }
  const points = parseDynSegment(
    await fetchBuffer(dynamoUrl(segmentPath(path, file, chosen.index))),
    file.header.pointType,
  );
  return { file, points, relTo, path };
}

/** Clear the in-memory cache (used by tests and hard refreshes). */
export function clearDynamoCache(): void {
  cache.clear();
  segmentCache.clear();
}

export { tryLoadDynamo };
