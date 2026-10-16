import { describe, expect, it, vi } from 'vitest';
import { ResourcePool } from '../src/solar/runtime/resource-pool';

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}
const flush = async () => { for (let i = 0; i < 8; i++) await Promise.resolve(); };
const poolOf = (maxConcurrent = 1, maxBytes = 10, dispose?: (value: string) => void) =>
  new ResourcePool<string>({ maxConcurrent, maxBytes, sizeOf: value => value.length, dispose });

describe('owned resource leases', () => {
  it('limits physical concurrency, queues FIFO, and shares one operation', async () => {
    const pool = poolOf();
    const first = deferred<string>();
    const order: string[] = [];
    const a = pool.acquire('a', async () => { order.push('a'); return first.promise; });
    const shared = pool.acquire('a', async () => { throw new Error('duplicate'); });
    const b = pool.acquire('b', async () => { order.push('b'); return 'bb'; });
    const c = pool.acquire('c', async () => { order.push('c'); return 'ccc'; });
    await flush();
    expect(pool.snapshot()).toMatchObject({ active: 1, queued: 2, entries: 3, references: 4 });
    first.resolve('a');
    expect(await Promise.all([a.ready, shared.ready, b.ready, c.ready])).toEqual(['a', 'a', 'bb', 'ccc']);
    expect(order).toEqual(['a', 'b', 'c']);
    [a, shared, b, c].forEach(lease => lease.release());
    expect(pool.snapshot()).toMatchObject({ references: 0, bytes: 6 });
    pool.dispose();
  });

  it('settles only an aborted subscriber while another owner retains the fetch', async () => {
    const pool = poolOf();
    const task = deferred<string>();
    let underlying!: AbortSignal;
    const controller = new AbortController();
    const a = pool.acquire('a', async signal => { underlying = signal; return task.promise; }, controller.signal);
    const b = pool.acquire('a', async () => 'wrong');
    const rejection = expect(a.ready).rejects.toMatchObject({ name: 'AbortError' });
    await flush();
    controller.abort();
    await rejection;
    expect(underlying.aborted).toBe(false);
    task.resolve('right');
    expect(await b.ready).toBe('right');
    a.release(); b.release();
    expect(pool.snapshot().references).toBe(0);
    pool.dispose();
  });

  it('last release aborts but does not free the physical slot until an ignoring handler settles', async () => {
    const disposed: string[] = [];
    const pool = poolOf(1, 10, value => disposed.push(value));
    const task = deferred<string>();
    let underlying!: AbortSignal;
    const a = pool.acquire('a', async signal => { underlying = signal; return task.promise; });
    const rejected = expect(a.ready).rejects.toMatchObject({ name: 'AbortError' });
    await flush(); a.release(); await rejected;
    expect(underlying.aborted).toBe(true);
    const nextLoad = vi.fn(async () => 'new');
    const next = pool.acquire('a', nextLoad);
    await flush();
    expect(nextLoad).not.toHaveBeenCalled();
    expect(pool.snapshot()).toMatchObject({ active: 1, queued: 1, references: 1 });
    task.resolve('stale');
    expect(await next.ready).toBe('new');
    expect(disposed).toEqual(['stale']);
    next.release(); pool.dispose();
  });

  it('evicts rejection for retry and removes failed references', async () => {
    const pool = poolOf();
    const a = pool.acquire('a', async () => { throw new Error('offline'); });
    await expect(a.ready).rejects.toThrow('offline');
    expect(pool.snapshot()).toMatchObject({ entries: 0, references: 0 });
    const b = pool.acquire('a', async () => 'retry');
    expect(await b.ready).toBe('retry');
    b.release(); pool.dispose();
  });

  it('evicts least recently used unheld bytes, preserving held values', async () => {
    const disposed: string[] = [];
    const pool = poolOf(2, 4, value => disposed.push(value));
    const a = pool.acquire('a', async () => 'aa'); await a.ready; a.release();
    const b = pool.acquire('b', async () => 'bb'); await b.ready; b.release();
    const touch = pool.acquire('a', async () => 'wrong'); await touch.ready; touch.release();
    const c = pool.acquire('c', async () => 'ccc'); await c.ready;
    expect(disposed).toEqual(['bb', 'aa']);
    pool.clearUnused();
    expect(pool.snapshot()).toMatchObject({ entries: 1, references: 1, bytes: 3 });
    c.release(); c.release(); pool.clearUnused();
    expect(disposed).toEqual(['bb', 'aa', 'ccc']);
    expect(pool.snapshot()).toEqual({ active: 0, queued: 0, entries: 0, bytes: 0, references: 0 });
  });

  it('dispose settles queued/running leases and disposes ignored late results exactly once', async () => {
    const dispose = vi.fn();
    const pool = poolOf(1, 10, dispose);
    const task = deferred<string>();
    const a = pool.acquire('a', async () => task.promise);
    const queuedLoad = vi.fn(async () => 'queued');
    const b = pool.acquire('b', queuedLoad);
    const rejections = Promise.all([a.ready, b.ready].map(p => expect(p).rejects.toMatchObject({ name: 'AbortError' })));
    await flush(); pool.dispose(); pool.dispose(); await rejections;
    expect(pool.snapshot()).toEqual({ active: 1, queued: 0, entries: 0, bytes: 0, references: 0 });
    task.resolve('late'); await flush();
    expect(dispose).toHaveBeenCalledExactlyOnceWith('late');
    expect(queuedLoad).not.toHaveBeenCalled();
    expect(pool.snapshot().active).toBe(0);
    const after = pool.acquire('z', async () => 'z');
    await expect(after.ready).rejects.toMatchObject({ name: 'AbortError' });
  });

  it('pre-aborted consumers never start work; pending release always settles', async () => {
    const pool = poolOf();
    const load = vi.fn(async () => 'a');
    const pre = pool.acquire('pre', load, AbortSignal.abort());
    await expect(pre.ready).rejects.toMatchObject({ name: 'AbortError' });
    expect(load).not.toHaveBeenCalled();
    const task = deferred<string>();
    const a = pool.acquire('a', async () => task.promise);
    const b = pool.acquire('b', load);
    const rejected = expect(b.ready).rejects.toMatchObject({ name: 'AbortError' });
    b.release(); await rejected;
    task.resolve('a'); await a.ready; a.release(); pool.dispose();
    expect(load).not.toHaveBeenCalled();
  });

  it('rejects invalid limits and sizes without leaking entries', async () => {
    expect(() => poolOf(0)).toThrow();
    expect(() => poolOf(1, -1)).toThrow();
    const dispose = vi.fn();
    const pool = new ResourcePool<string>({ maxConcurrent: 1, maxBytes: 1, sizeOf: () => NaN, dispose });
    const a = pool.acquire('a', async () => 'bad');
    await expect(a.ready).rejects.toThrow();
    expect(dispose).toHaveBeenCalledExactlyOnceWith('bad');
    expect(pool.snapshot()).toMatchObject({ entries: 0, bytes: 0, references: 0 });
  });
});
