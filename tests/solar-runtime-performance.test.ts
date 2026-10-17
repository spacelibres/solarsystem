import { describe, expect, it, vi } from 'vitest';
import type { ExplorerBodyDefinition } from '../src/solar/config/default-scene';
import type { EphemerisWindow } from '../src/solar/domain/ephemeris';
import { ExplorerRuntime, type EphemerisRepositoryPort } from '../src/solar/runtime/explorer-runtime';

const body = (id: string): ExplorerBodyDefinition => ({
  id, label: id, radiusKm: 1, kind: 'marker', source: 'test',
  phases: [{ startEt: 0, parentId: null }],
  staticPosition: { x: 1, y: 0, z: 0 }, staticOrientation: { x: 0, y: 0, z: 0, w: 1 },
});
const repository = (): EphemerisRepositoryPort => ({
  load: () => Promise.reject(new Error('Unexpected load')),
  snapshot: () => ({ active: 0, queued: 0, entries: 0, bytes: 0, references: 0 }),
  dispose: () => {},
});

describe('explorer render transactions', () => {
  it('does not reconcile unchanged clock samples, including paused public ticks', () => {
    const runtime = new ExplorerRuntime({ timeEt: 1, entities: [body('sun')], repository: repository() });
    const notify = vi.fn();
    runtime.subscribe(notify);
    runtime.tick(1 / 60);
    expect(notify).not.toHaveBeenCalled();
    runtime.play(0); notify.mockClear();
    runtime.tick(1 / 60);
    expect(notify).not.toHaveBeenCalled();
  });

  it('borrows the same deeply readonly render frames without cloning on unchanged samples', () => {
    const runtime = new ExplorerRuntime({ timeEt: 1, entities: [body('sun')], repository: repository() });
    expect(runtime).toHaveProperty('tickForRender', expect.any(Function));
    const clone = vi.spyOn(globalThis, 'structuredClone');
    try {
      const first = runtime.tickForRender(0);
      expect(runtime.renderFrame().frames).toBe(first.frames);
      expect(runtime.tickForRender(1 / 60).frames).toBe(first.frames);
      expect(clone).not.toHaveBeenCalled();
      const detached = runtime.snapshot();
      const sun = detached.frames.get('sun');
      if (sun?.status === 'ready') sun.position.x = 900;
      expect(first.frames.get('sun')).toMatchObject({ position: { x: 1 } });
      runtime.play(1);
      const next = runtime.tickForRender(1);
      expect(next.clock.timeEt).toBe(2);
      expect(next.frames).not.toBe(first.frames);
      expect(first.clock.timeEt).toBe(1);
      expect(clone).toHaveBeenCalledTimes(1);
    } finally { clone.mockRestore(); }
  });

  it('treats repeated active IDs as a set without invalidating the generation', () => {
    const runtime = new ExplorerRuntime({ timeEt: 1, entities: [body('sun'), body('earth')], activeIds: ['sun', 'earth'], repository: repository() });
    const before = runtime.snapshot();
    const notify = vi.fn(); runtime.subscribe(notify);
    runtime.setActive(['earth', 'sun', 'sun']);
    expect(runtime.snapshot().generation).toBe(before.generation);
    expect(notify).not.toHaveBeenCalled();
    runtime.setActive(['sun']);
    expect(runtime.snapshot().generation).toBe(before.generation + 1);
    expect(runtime.snapshot().frames.get('earth')).toMatchObject({ reason: 'inactive' });
  });

  it('publishes async loads and explicit seeks even while the render clock is paused', async () => {
    let resolve!: (window: EphemerisWindow) => void;
    const repo = repository();
    repo.load = () => new Promise(done => { resolve = done; });
    const earth = { ...body('earth'), staticPosition: undefined, phases: [{ startEt: 0, parentId: null, positionPath: 'earth' }] };
    const runtime = new ExplorerRuntime({ timeEt: 1, entities: [earth], repository: repo });
    expect(runtime).toHaveProperty('tickForRender', expect.any(Function));
    const pending = runtime.tickForRender(0);
    resolve({ header: { version: 2, name: 'lin', pointType: 'lin', numberOfDigits: 0 },
      interval: { min: 0, max: 10 }, source: { path: 'earth', segment: '0' },
      points: [0, 10].map(time => ({ kind: 'lin', time, position: { x: time, y: 0, z: 0 } })) });
    await Promise.resolve();
    expect(runtime.tickForRender(0).frames).not.toBe(pending.frames);
    expect(runtime.tickForRender(0).frames.get('earth')).toMatchObject({ status: 'ready', position: { x: 1 } });
    runtime.seek(4);
    expect(runtime.tickForRender(0).frames.get('earth')).toMatchObject({ position: { x: 4 } });
    expect(() => runtime.tickForRender(-1)).toThrow(/nonnegative/);
    runtime.dispose();
    expect(() => runtime.tickForRender(0)).toThrow(/disposed/);
  });

  it('keeps pending requests alive when an equivalent explicit active set replaces implicit all', () => {
    const signals: (AbortSignal | undefined)[] = [];
    const repo = repository();
    repo.load = (_path, _time, signal) => {
      signals.push(signal);
      return new Promise(() => {});
    };
    const earth = { ...body('earth'), phases: [{ startEt: 0, parentId: null, positionPath: 'earth' }] };
    const runtime = new ExplorerRuntime({ timeEt: 1, entities: [earth], repository: repo });
    runtime.setActive(['earth', 'earth']);
    expect(signals).toHaveLength(1);
    expect(signals[0]?.aborted).toBe(false);
    expect(runtime.snapshot().generation).toBe(0);
    runtime.dispose();
    expect(signals[0]?.aborted).toBe(true);
  });
});
