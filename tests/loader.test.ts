import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { clearDynamoCache, loadDynamo, tryLoadDynamo } from '../src/lib/dynamo/loader';
import { parseDyn } from '../src/lib/dynamo/parse';

const earthBytes = readFileSync(join(__dirname, 'fixtures/earth-sun-orb.dyn'));
const earth = parseDyn(earthBytes);
const stride = 72;
const headerSize = earthBytes.length - earth.points.length * stride - 5;
const path = 'test/sun/orb/def.dyn';

function index(starts = [0, 10, 20], version = 2): Buffer {
  const entrySize = version === 1 ? 16 : 8;
  const header = version === 1
    ? Buffer.concat([earthBytes.subarray(0, 6), earthBytes.subarray(7, headerSize)])
    : Buffer.from(earthBytes.subarray(0, headerSize));
  header.writeInt16LE(version);
  const data = Buffer.alloc(5 + starts.length * entrySize);
  data.writeInt32LE(starts.length, 1);
  starts.forEach((start, i) => {
    data.writeDoubleLE(start, 5 + i * entrySize);
    if (version === 1) data.writeDoubleLE(start + 5, 13 + i * entrySize);
  });
  return Buffer.concat([header, data]);
}

function segment(start: number, end: number): Buffer {
  const data = Buffer.alloc(5 + 2 * stride);
  data[0] = 1;
  data.writeInt32LE(2, 1);
  for (const [i, time] of [start, end].entries()) {
    earthBytes.copy(data, 5 + i * stride, headerSize + 5, headerSize + 5 + stride);
    data.writeDoubleLE(time, 5 + i * stride);
  }
  return data;
}

function binary(data: Buffer): Response {
  return new Response(new Uint8Array(data));
}

function serveSegments(starts = [0, 10, 20], version = 2) {
  return vi.fn(async (url: string) => {
    if (url.endsWith('/def.dyn')) return binary(index(starts, version));
    const number = Number(url.match(/\/(\d+)\.dyn$/)?.[1]);
    const start = starts[number];
    if (start === undefined) return new Response(null, { status: 404 });
    return binary(segment(start, start + 10));
  });
}

beforeEach(() => clearDynamoCache());
afterEach(() => {
  clearDynamoCache();
  vi.unstubAllGlobals();
});

describe('dynamo request lifecycle', () => {
  it('selects distinct segments within one calendar bucket and reuses the index', async () => {
    const fetcher = serveSegments();
    vi.stubGlobal('fetch', fetcher);
    expect((await loadDynamo(path, 5)).points[0].time).toBe(0);
    expect((await loadDynamo(path, 15)).points[0].time).toBe(10);
    expect((await loadDynamo(path, 25)).points[0].time).toBe(20);
    expect(fetcher.mock.calls.filter(([url]) => url.endsWith('/def.dyn'))).toHaveLength(1);
  });

  it('chooses the new segment at its exact start, even when the previous samples overlap', async () => {
    vi.stubGlobal('fetch', serveSegments());
    await loadDynamo(path, 5);
    expect((await loadDynamo(path, 10)).points[0].time).toBe(10);
  });

  it('deduplicates simultaneous requests for the same index and segment', async () => {
    const fetcher = serveSegments();
    vi.stubGlobal('fetch', fetcher);
    const results = await Promise.all([loadDynamo(path, 15), loadDynamo(path, 16)]);
    expect(results[0].points).toBe(results[1].points);
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it('allows retry after an index request fails', async () => {
    const fetcher = vi.fn().mockResolvedValueOnce(new Response(null, { status: 503 }))
      .mockImplementation(async () => binary(earthBytes));
    vi.stubGlobal('fetch', fetcher);
    await expect(loadDynamo(path, 0)).rejects.toThrow('503');
    await expect(loadDynamo(path, 0)).resolves.toMatchObject({ path });
  });

  it('retries a failed segment without refetching its index', async () => {
    const source = serveSegments();
    let failed = false;
    const fetcher = vi.fn(async (url: string) => {
      if (!url.endsWith('/def.dyn') && !failed) {
        failed = true;
        return new Response(null, { status: 503 });
      }
      return source(url);
    });
    vi.stubGlobal('fetch', fetcher);
    await expect(loadDynamo(path, 15)).rejects.toThrow('503');
    expect((await loadDynamo(path, 15)).points[0].time).toBe(10);
    expect(fetcher.mock.calls.filter(([url]) => url.endsWith('/def.dyn'))).toHaveLength(1);
  });

  it('does not return inline samples outside their actual time coverage', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => binary(earthBytes)));
    await loadDynamo(path, 0);
    await expect(loadDynamo(path, earth.interval!.max + 1)).rejects.toThrow(/coverage/i);
    await expect(loadDynamo(path, earth.interval!.min - 1)).rejects.toThrow(/coverage/i);
    await expect(loadDynamo(path, 0)).resolves.toMatchObject({ path });
  });

  it('does not fetch a segment before an index begins', async () => {
    const fetcher = serveSegments();
    vi.stubGlobal('fetch', fetcher);
    await expect(loadDynamo(path, -1)).rejects.toThrow(/coverage/i);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it('checks the final segment sample range even when the index end is unbounded', async () => {
    vi.stubGlobal('fetch', serveSegments());
    await expect(loadDynamo(path, 31)).rejects.toThrow(/coverage/i);
  });

  it('respects explicit v1 segment ends and gaps', async () => {
    const fetcher = serveSegments([0, 10], 1);
    vi.stubGlobal('fetch', fetcher);
    await expect(loadDynamo(path, 7)).rejects.toThrow(/coverage/i);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it('rejects non-finite dates without starting a request', async () => {
    const fetcher = serveSegments();
    vi.stubGlobal('fetch', fetcher);
    for (const time of [NaN, Infinity, -Infinity]) {
      await expect(loadDynamo(path, time)).rejects.toThrow(/finite/i);
    }
    expect(fetcher).not.toHaveBeenCalled();
  });

  it('handles an empty index as unavailable coverage', async () => {
    vi.stubGlobal('fetch', serveSegments([]));
    await expect(loadDynamo(path, 0)).rejects.toThrow(/coverage/i);
    await expect(tryLoadDynamo(path, 0)).resolves.toBeNull();
  });

  it('bounds settled controller cache entries', async () => {
    const fetcher = vi.fn(async () => binary(earthBytes));
    vi.stubGlobal('fetch', fetcher);
    for (let i = 0; i < 129; i++) await loadDynamo(`body_${i}/sun/orb/def.dyn`, 0);
    await loadDynamo('body_128/sun/orb/def.dyn', 0);
    expect(fetcher).toHaveBeenCalledTimes(129);
    await loadDynamo('body_0/sun/orb/def.dyn', 0);
    expect(fetcher).toHaveBeenCalledTimes(130);
  });

  it('bounds settled segment cache entries independently of the controller cache', async () => {
    const fetcher = serveSegments(Array.from({ length: 257 }, (_, i) => i * 10));
    vi.stubGlobal('fetch', fetcher);
    for (let i = 0; i < 257; i++) await loadDynamo(path, i * 10 + 5);
    await loadDynamo(path, 2565);
    expect(fetcher).toHaveBeenCalledTimes(258);
    await loadDynamo(path, 5);
    expect(fetcher).toHaveBeenCalledTimes(259);
    expect(fetcher.mock.calls.filter(([url]) => url.endsWith('/def.dyn'))).toHaveLength(1);
  });

  it('does not let a cleared failed request evict a newer cache entry', async () => {
    let rejectOld!: (reason: Error) => void;
    const fetcher = vi.fn().mockImplementationOnce(() => new Promise<Response>((_resolve, reject) => {
      rejectOld = reject;
    })).mockImplementation(async () => binary(earthBytes));
    vi.stubGlobal('fetch', fetcher);
    const old = expect(loadDynamo(path, 0)).rejects.toThrow('old request');
    await vi.waitFor(() => expect(fetcher).toHaveBeenCalledTimes(1));
    clearDynamoCache();
    await loadDynamo(path, 0);
    rejectOld(new Error('old request'));
    await old;
    await loadDynamo(path, 0);
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it('limits network concurrency and drains queued requests', async () => {
    let active = 0;
    let peak = 0;
    const fetcher = vi.fn(async () => {
      active++;
      peak = Math.max(peak, active);
      await new Promise((resolve) => setTimeout(resolve, 5));
      active--;
      return binary(earthBytes);
    });
    vi.stubGlobal('fetch', fetcher);
    await Promise.all(Array.from({ length: 18 }, (_, i) => loadDynamo(`parallel_${i}/sun/orb/def.dyn`, 0)));
    expect(peak).toBe(6);
    expect(active).toBe(0);
    expect(fetcher).toHaveBeenCalledTimes(18);
  });

  it('does not seed the new segment cache when an old index succeeds after a clear', async () => {
    let completeOld!: (response: Response) => void;
    const source = serveSegments();
    const fetcher = vi.fn().mockImplementationOnce(() => new Promise<Response>((resolve) => {
      completeOld = resolve;
    })).mockImplementation(source);
    vi.stubGlobal('fetch', fetcher);
    const old = loadDynamo(path, 5);
    await vi.waitFor(() => expect(fetcher).toHaveBeenCalledTimes(1));
    clearDynamoCache();
    completeOld(binary(index()));
    await old;
    await loadDynamo(path, 5);
    expect(fetcher).toHaveBeenCalledTimes(4);
  });
});
