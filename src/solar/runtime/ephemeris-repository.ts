import { parseDynSegment, POINT_STRIDE, type DynHeader, type DynPoint, type PointType } from '../../lib/dynamo/parse';
import { Reader } from '../../lib/dynamo/reader';
import { dynamoUrl } from '../../lib/nasa/assets';
import type { EphemerisWindow } from '../domain/ephemeris';
import { ResourcePool } from './resource-pool';

export type EphemerisRepositoryErrorCode = 'invalid-request' | 'invalid-data' | 'no-data' | 'fetch-failed';

export class EphemerisRepositoryError extends Error {
  readonly unavailableInterval?: { readonly min: number; readonly max: number };
  constructor(
    readonly code: EphemerisRepositoryErrorCode,
    message: string,
    readonly url?: string,
    options?: ErrorOptions & { readonly unavailableInterval?: { readonly min: number; readonly max: number } },
  ) {
    super(message, options);
    this.name = 'EphemerisRepositoryError';
    this.unavailableInterval = options?.unavailableInterval;
  }
}

interface Interval { readonly min: number; readonly max: number; }
interface Child { readonly name: string; readonly interval: Interval; }
interface Block {
  readonly header: DynHeader;
  readonly points: readonly DynPoint[];
  readonly children: readonly Child[];
  readonly sourcePoints?: readonly DynPoint[];
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
    const rawPoints = parseDynSegment(block, header.pointType);
    const points: DynPoint[] = [];
    const stride = POINT_STRIDE[header.pointType];
    let hasBackstep = false;
    for (let i = 0; i < rawPoints.length; i++) {
      const point = rawPoints[i];
      if (!finiteTree(point)) invalid('Samples must contain only finite values');
      if (i > 0 && point.time === rawPoints[i - 1].time) {
        const offset = 5 + i * stride;
        const identical = block.subarray(offset, offset + stride)
          .every((byte, index) => byte === block[offset - stride + index]);
        if (!identical) invalid('Conflicting samples at the same time');
        // Verified Venus interior and Voyager terminal repeats carry no new interval.
        continue;
      }
      if (i > 0 && point.time < rawPoints[i - 1].time) hasBackstep = true;
      points.push(point);
    }
    if (rawPoints.length > 1 && (points.length < 2 || points[0].time >= points[points.length - 1].time)) {
      invalid('Samples do not define positive coverage');
    }
    // Mars contains overlapping historical spans. Keep its original indices for
    // source-compatible pair lookup; never sort or interpolate across the backstep.
    return { header, points, children: [], sourcePoints: hasBackstep ? rawPoints : undefined };
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

function selectSourcePair(points: readonly DynPoint[], time: number): readonly DynPoint[] {
  let index = 0;
  // PointSet.getPoints with a fresh hint, including its two fast paths.
  if (!(points[0].time <= time && time < points[1].time)) {
    if (points.length > 2 && points[1].time <= time && time < points[2].time) {
      index = 1;
    } else {
      let upper = points.length - 2;
      while (index !== upper) {
        const middle = Math.ceil((index + upper) / 2);
        if (time < points[middle].time) upper = middle - 1;
        else index = middle;
      }
    }
  }
  return points.slice(index, index + 2);
}

function nextDown(value: number): number {
  if (value === 0) return -Number.MIN_VALUE;
  const bits = new DataView(new ArrayBuffer(8));
  bits.setFloat64(0, value);
  let high = bits.getUint32(0);
  let low = bits.getUint32(4);
  if (value > 0) {
    if (low === 0) { high--; low = 0xffffffff; }
    else low--;
  } else {
    if (low === 0xffffffff) { high++; low = 0; }
    else low++;
  }
  bits.setUint32(0, high);
  bits.setUint32(4, low);
  return bits.getFloat64(0);
}

function sourceSelectorInterval(points: readonly DynPoint[], time: number): Interval {
  let min = -Infinity;
  let next = Infinity;
  // All source lookup branches compare ET to record timestamps. Between two
  // adjacent distinct timestamps their outcomes are stable, even with backsteps.
  for (const point of points) {
    if (point.time <= time) min = Math.max(min, point.time);
    else next = Math.min(next, point.time);
  }
  // EphemerisWindow uses inclusive bounds, so encode this half-open selector cell
  // with the preceding representable ET. The final coverage endpoint stays closed.
  return { min, max: Number.isFinite(next) ? nextDown(next) : Infinity };
}

/** The exact connected no-data cell containing ET, excluding valid endpoints. */
function unavailableCell(timeEt: number, available: readonly Interval[], domain: Interval = { min: -Infinity, max: Infinity }): Interval {
  let min = domain.min;
  let max = domain.max;
  for (const interval of available) {
    if (interval.max < timeEt) min = Math.max(min, -nextDown(-interval.max));
    if (interval.min > timeEt) max = Math.min(max, nextDown(interval.min));
  }
  return { min, max };
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
        const first = block.points[0].time;
        const last = block.points[block.points.length - 1].time;
        if (block.points.length < 2 || timeEt < first || timeEt > last) this.noData(path, timeEt, unavailableCell(timeEt, block.points.length < 2 ? [] : [{ min: first, max: last }], interval));
        const points = block.sourcePoints ? selectSourcePair(block.sourcePoints, timeEt) : block.points;
        if (points[points.length - 1].time <= points[0].time) {
          throw new EphemerisRepositoryError('invalid-data', 'Source selected a nonpositive sample interval', dynamoUrl(blockPath));
        }
        const selector = block.sourcePoints ? sourceSelectorInterval(block.sourcePoints, timeEt) : interval;
        const min = Math.max(interval.min, points[0].time, selector.min);
        const max = Math.min(interval.max, points[points.length - 1].time, selector.max);
        if (timeEt < min || timeEt > max) this.noData(path, timeEt, unavailableCell(timeEt, min <= max ? [{ min, max }] : [], { min: Math.max(interval.min, selector.min), max: Math.min(interval.max, selector.max) }));
        return { header, points, interval: { min, max }, source: { path, segment: name === 'def' ? null : name } };
      }
      // Shared endpoints choose the right interval; a terminal endpoint stays closed.
      let selected: Child | undefined;
      for (const child of block.children) {
        if (timeEt >= child.interval.min && timeEt <= child.interval.max) selected = child;
      }
      if (timeEt < interval.min || timeEt > interval.max) this.noData(path, timeEt, unavailableCell(timeEt, [interval]));
      if (!selected) this.noData(path, timeEt, unavailableCell(timeEt, block.children.map(child => child.interval), interval));
      const nextChild = block.children[block.children.indexOf(selected) + 1];
      // At a shared boundary the right child wins, so the left child's cached
      // availability (including negative results) must exclude that exact ET.
      const selectedMax = nextChild && nextChild.interval.min <= selected.interval.max
        ? nextDown(nextChild.interval.min) : selected.interval.max;
      interval = { min: Math.max(interval.min, selected.interval.min), max: Math.min(interval.max, selectedMax) };
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

  private noData(path: string, timeEt: number, unavailableInterval: Interval): never {
    throw new EphemerisRepositoryError('no-data', `No samples cover ET ${timeEt}`, dynamoUrl(path), { unavailableInterval });
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
