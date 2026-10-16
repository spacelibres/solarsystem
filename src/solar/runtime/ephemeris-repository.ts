import { parseDynSegment, POINT_STRIDE, type DynHeader, type DynPoint, type PointType } from '../../lib/dynamo/parse';
import { Reader } from '../../lib/dynamo/reader';
import { dynamoUrl } from '../../lib/nasa/assets';
import type { EphemerisWindow } from '../domain/ephemeris';
import { ResourcePool } from './resource-pool';

export type EphemerisRepositoryErrorCode = 'invalid-request' | 'invalid-data' | 'no-data' | 'fetch-failed';

export class EphemerisRepositoryError extends Error {
  constructor(
    readonly code: EphemerisRepositoryErrorCode,
    message: string,
    readonly url?: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = 'EphemerisRepositoryError';
  }
}

interface Interval { readonly min: number; readonly max: number; }
interface Child { readonly name: string; readonly interval: Interval; }
interface Block {
  readonly header: DynHeader;
  readonly points: readonly DynPoint[];
  readonly children: readonly Child[];
}
export interface EphemerisRepositoryOptions {
  readonly fetchBuffer?: (url: string, signal: AbortSignal) => Promise<ArrayBuffer>;
  readonly maxBytes?: number;
  readonly maxConcurrent?: number;
}
const pointTypes: readonly string[] = ['pos', 'lin', 'ori', 'quat', 'orb'];
const MAX_DEPTH = 16;

function invalid(message: string): never {
  throw new EphemerisRepositoryError('invalid-data', message);
}

function finiteTree(value: unknown): boolean {
  if (typeof value === 'number') return Number.isFinite(value);
  if (value && typeof value === 'object') return Object.values(value).every(finiteTree);
  return true;
}

/** PointSet.load's format, with strict structural validation before allocation. */
function decode(buffer: ArrayBuffer, inherited: DynHeader | undefined, name: string): Block {
  const reader = new Reader(buffer);
  let header: DynHeader;
  if (inherited) {
    header = { ...inherited };
  } else {
    const version = reader.readInt16();
    if (version !== 1 && version !== 2) invalid(`Unsupported dynamo version ${version}`);
    const pointType = reader.readString();
    if (!pointTypes.includes(pointType)) invalid(`Invalid point type ${pointType}`);
    header = { version, pointType: pointType as PointType, name: pointType, numberOfDigits: version === 2 ? reader.readByte() : 0 };
    if (pointType === 'orb') {
      header.gravitationalParameter1 = reader.readFloat64();
      header.gravitationalParameter2 = reader.readFloat64();
      if (!finiteTree(header)) invalid('Nonfinite dynamo header');
    }
  }
  let storesSamples = true;
  const blockStart = reader.position;
  const hasControl = header.version === 2 || name === 'def';
  if (hasControl) {
    const flag = reader.readByte();
    if (flag !== 0 && flag !== 1) invalid(`Invalid PointSet control byte ${flag}`);
    storesSamples = flag === 1;
  }
  if (storesSamples) {
    let block = new Uint8Array(buffer, blockStart);
    if (!hasControl) {
      // The existing verified point reader expects a control byte; v1 children omit it.
      const adapted = new Uint8Array(block.length + 1);
      adapted[0] = 1;
      adapted.set(block, 1);
      block = adapted;
    }
    const points = parseDynSegment(block, header.pointType);
    const stride = POINT_STRIDE[header.pointType];
    // Voyager 1's verified pos leaf repeats its final record exactly. Removing
    // only identical terminal records preserves every nonzero source interval.
    while (points.length > 2 && points[points.length - 1].time === points[points.length - 2].time) {
      const lastOffset = 5 + (points.length - 1) * stride;
      const previousOffset = lastOffset - stride;
      const identical = block.subarray(lastOffset, lastOffset + stride)
        .every((byte, index) => byte === block[previousOffset + index]);
      if (!identical) break;
      points.pop();
    }
    for (let i = 0; i < points.length; i++) {
      if (!finiteTree(points[i]) || (i > 0 && points[i].time <= points[i - 1].time)) {
        invalid('Samples must be finite with strictly increasing times');
      }
    }
    return { header, points, children: [] };
  }
  const count = reader.readInt32();
  const stride = header.version === 1 ? 16 : 8;
  if (count < 0 || reader.remaining !== count * stride) invalid('Index count does not match its byte length');
  if (header.version === 1) header.numberOfDigits = count > 0 ? Math.ceil(Math.log10(count)) : 0;
  const children: Child[] = [];
  let previousStart = -Infinity;
  let previousEnd = -Infinity;
  for (let i = 0; i < count; i++) {
    const min = reader.readFloat64();
    if (!Number.isFinite(min) || min <= previousStart) invalid('Index times must be finite and strictly increasing');
    const max = header.version === 1 ? reader.readFloat64() : min;
    if (!Number.isFinite(max) || max < min || (header.version === 1 && min < previousEnd)) invalid('Invalid or overlapping index intervals');
    const padded = String(i).padStart(header.numberOfDigits, '0');
    const childName = name === 'def' ? padded : `${name}_${padded}`;
    if (header.version === 2 && i > 0) {
      const previous = children[i - 1];
      children[i - 1] = { name: previous.name, interval: { min: previous.interval.min, max: min } };
    }
    children.push({ name: childName, interval: { min, max } });
    previousStart = min;
    previousEnd = max;
  }
  // The v2 terminal boundary closes its predecessor; it is never a downloadable child.
  if (header.version === 2) children.pop();
  return { header, points: [], children };
}

async function fetchBinary(url: string, signal: AbortSignal): Promise<ArrayBuffer> {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`Dynamo fetch failed (${response.status}) for ${url}`);
  return response.arrayBuffer();
}

/** Fetches only the true indexed window containing the requested ET. */
export class EphemerisRepository {
  private readonly pool: ResourcePool<ArrayBuffer>;
  private readonly fetchBuffer: (url: string, signal: AbortSignal) => Promise<ArrayBuffer>;
  private disposed = false;

  constructor(options: EphemerisRepositoryOptions = {}) {
    this.fetchBuffer = options.fetchBuffer ?? fetchBinary;
    this.pool = new ResourcePool({
      maxConcurrent: options.maxConcurrent ?? 6,
      maxBytes: options.maxBytes ?? 16 * 1024 * 1024,
      sizeOf: buffer => buffer.byteLength,
    });
  }

  async load(path: string, timeEt: number, signal?: AbortSignal): Promise<EphemerisWindow> {
    if (!Number.isFinite(timeEt) || path.length > 1024 || !/^[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*\.dyn$/.test(path)) {
      throw new EphemerisRepositoryError('invalid-request', 'Expected a safe relative .dyn path and finite ET');
    }
    this.assertActive(signal);
    const base = path.slice(0, path.lastIndexOf('/') + 1);
    let name = 'def';
    let blockPath = path;
    let header: DynHeader | undefined;
    let interval: Interval = { min: -Infinity, max: Infinity };
    for (let depth = 0; depth <= MAX_DEPTH; depth++) {
      const block = await this.readBlock(blockPath, header, name, signal);
      header = block.header;
      if (block.points.length > 0) {
        const min = Math.max(interval.min, block.points[0].time);
        const max = Math.min(interval.max, block.points[block.points.length - 1].time);
        if (block.points.length < 2 || timeEt < min || timeEt > max) this.noData(path, timeEt);
        return { header, points: block.points, interval: { min, max }, source: { path, segment: name === 'def' ? null : name } };
      }
      // Shared endpoints choose the right interval; a terminal endpoint stays closed.
      let selected: Child | undefined;
      for (const child of block.children) {
        if (timeEt >= child.interval.min && timeEt <= child.interval.max) selected = child;
      }
      if (!selected || timeEt < interval.min || timeEt > interval.max) this.noData(path, timeEt);
      interval = { min: Math.max(interval.min, selected.interval.min), max: Math.min(interval.max, selected.interval.max) };
      name = selected.name;
      blockPath = `${base}${name}.dyn`;
    }
    throw new EphemerisRepositoryError('invalid-data', `Dynamo index exceeds ${MAX_DEPTH} nested levels`, dynamoUrl(path));
  }

  snapshot(): ReturnType<ResourcePool<ArrayBuffer>['snapshot']> {
    return this.pool.snapshot();
  }

  dispose(): void {
    this.disposed = true;
    this.pool.dispose();
  }

  private assertActive(signal?: AbortSignal): void {
    if (this.disposed || signal?.aborted) throw new DOMException('Ephemeris load canceled', 'AbortError');
  }

  private noData(path: string, timeEt: number): never {
    throw new EphemerisRepositoryError('no-data', `No samples cover ET ${timeEt}`, dynamoUrl(path));
  }

  private async readBlock(path: string, header: DynHeader | undefined, name: string, signal?: AbortSignal): Promise<Block> {
    this.assertActive(signal);
    const url = dynamoUrl(path);
    const lease = this.pool.acquire(url, async fetchSignal => {
      try {
        return await this.fetchBuffer(url, fetchSignal);
      } catch (cause) {
        if (fetchSignal.aborted) throw new DOMException('Ephemeris fetch canceled', 'AbortError');
        throw new EphemerisRepositoryError('fetch-failed', `Failed to fetch ${url}`, url, { cause });
      }
    }, signal);
    let invalidBlock = false;
    try {
      const buffer = await lease.ready;
      this.assertActive(signal);
      try {
        return decode(buffer, header, name);
      } catch (cause) {
        invalidBlock = true;
        throw new EphemerisRepositoryError('invalid-data', `Invalid dynamo data at ${url}: ${cause instanceof Error ? cause.message : 'unknown decode error'}`, url, { cause });
      }
    } finally {
      lease.release();
      // A malformed response must be retryable after the source is repaired.
      if (invalidBlock) this.pool.clearUnused();
    }
  }
}
