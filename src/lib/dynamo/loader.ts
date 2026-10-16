/** Browser-side dynamo loading with separate controller and segment caches. */
import { parseDyn, parseDynSegment, type DynFile, type DynPoint } from './parse';
import { dynamoUrl } from '../nasa/assets';

export interface LoadedDynamo {
  file: DynFile;
  points: DynPoint[];
  relTo: string | null;
  path: string;
}

interface CacheEntry<T> {
  promise: Promise<T>;
  settled: boolean;
}

const controllers = new Map<string, CacheEntry<DynFile>>();
const segments = new Map<string, CacheEntry<DynPoint[]>>();
const MAX_CONTROLLERS = 128;
const MAX_SEGMENTS = 256;
let cacheGeneration = 0;

function cached<T>(
  cache: Map<string, CacheEntry<T>>,
  key: string,
  limit: number,
  load: () => Promise<T>,
): Promise<T> {
  const hit = cache.get(key);
  if (hit) {
    cache.delete(key);
    cache.set(key, hit);
    return hit.promise;
  }

  const entry: CacheEntry<T> = {
    settled: false,
    promise: Promise.resolve().then(load).then(
      (value) => {
        entry.settled = true;
        // A cache reset must also isolate completion of earlier requests.
        if (cache.get(key) === entry) {
          for (const [oldKey, oldEntry] of cache) {
            if (cache.size <= limit) break;
            if (oldEntry.settled) cache.delete(oldKey);
          }
        }
        return value;
      },
      (error: unknown) => {
        if (cache.get(key) === entry) cache.delete(key);
        throw error;
      },
    ),
  };
  cache.set(key, entry);
  return entry.promise;
}

const MAX_CONCURRENT = 6;
let active = 0;
const queue: Array<() => void> = [];

function fetchBuffer(url: string): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const run = () => {
      active++;
      (async () => {
        const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
        if (!response.ok) throw new Error(`dynamo fetch failed (${response.status}) for ${url}`);
        return response.arrayBuffer();
      })().then(resolve, reject).finally(() => {
        active--;
        queue.shift()?.();
      });
    };
    if (active < MAX_CONCURRENT) run();
    else queue.push(run);
  });
}

export function referenceBodyOf(path: string): string | null {
  const segments = path.split('/').slice(1).filter((part) => part !== 'def.dyn');
  const first = segments[0];
  if (!first || /^(ori|quat)$/.test(first)) return null;
  return /^[a-z][a-z0-9_]*$/.test(first) ? first : null;
}

export function segmentPath(path: string, file: DynFile, index: number): string {
  const name = String(index).padStart(file.header.numberOfDigits, '0');
  return `${path.slice(0, path.lastIndexOf('/'))}/${name}.dyn`;
}

export class DynamoCoverageError extends Error {
  constructor(path: string, time: number) {
    super(`dynamo coverage unavailable at ${time} for ${path}`);
    this.name = 'DynamoCoverageError';
  }
}

function requireCoverage(points: DynPoint[], path: string, time: number): void {
  if (!points.length || time < points[0].time || time > points[points.length - 1].time) {
    throw new DynamoCoverageError(path, time);
  }
}

export async function loadDynamo(path: string, atTime = 0): Promise<LoadedDynamo> {
  if (!Number.isFinite(atTime)) throw new RangeError('dynamo time must be finite');
  const generation = cacheGeneration;
  const url = dynamoUrl(path);
  const file = await cached(controllers, url, MAX_CONTROLLERS, async () =>
    parseDyn(await fetchBuffer(url)),
  );

  let points = file.points;
  if (file.segments.length) {
    // Index windows decide ownership even when adjacent sample ranges overlap.
    let chosen = file.segments[0];
    for (const segment of file.segments) {
      if (segment.startTime > atTime) break;
      chosen = segment;
    }
    if (atTime < chosen.startTime || atTime >= chosen.endTime) {
      throw new DynamoCoverageError(path, atTime);
    }
    const segmentUrl = dynamoUrl(segmentPath(path, file, chosen.index));
    const load = async () => parseDynSegment(await fetchBuffer(segmentUrl), file.header.pointType);
    points = generation === cacheGeneration
      ? await cached(segments, segmentUrl, MAX_SEGMENTS, load)
      : await load();
  }

  requireCoverage(points, path, atTime);
  return { file, points, relTo: referenceBodyOf(path), path };
}

/** Absence is explicit to callers that can omit an unavailable body. */
export async function tryLoadDynamo(path: string, atTime: number): Promise<LoadedDynamo | null> {
  try {
    return await loadDynamo(path, atTime);
  } catch {
    return null;
  }
}

/** In-flight consumers may finish, but their results cannot repopulate caches. */
export function clearDynamoCache(): void {
  cacheGeneration++;
  controllers.clear();
  segments.clear();
}
