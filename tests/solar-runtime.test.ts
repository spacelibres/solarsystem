import { describe, expect, it } from 'vitest';
import { DEFAULT_SCENE, type ExplorerBodyDefinition } from '../src/solar/config/default-scene';
import type { EphemerisWindow } from '../src/solar/domain/ephemeris';
import { ExplorerRuntime, type EphemerisRepositoryPort } from '../src/solar/runtime/explorer-runtime';

const zero = { x: 0, y: 0, z: 0 };
const identity = { ...zero, w: 1 };
const body = (id: string, options: Partial<ExplorerBodyDefinition> = {}): ExplorerBodyDefinition => ({
  id, label: id, radiusKm: 1, kind: 'marker', source: 'test',
  phases: [{ startEt: -100, parentId: null, positionPath: `${id}/pos/def.dyn` }], ...options,
});
const root = body('sun', { phases: [{ startEt: -100, parentId: null }], staticPosition: zero, staticOrientation: identity });

function positionWindow(path: string, min: number, max: number, offset = 0): EphemerisWindow {
  return { header: { version: 2, name: 'lin', pointType: 'lin', numberOfDigits: 0 },
    points: [min, max].map(time => ({ kind: 'lin', time, position: { x: time + offset, y: 0, z: 0 } })),
    interval: { min, max }, source: { path, segment: String(min) } };
}
class Repository implements EphemerisRepositoryPort {
  requests: { path: string; timeEt: number; signal?: AbortSignal; resolve: (window: EphemerisWindow) => void; reject: (error: Error) => void }[] = [];
  disposed = 0;
  load(path: string, timeEt: number, signal?: AbortSignal): Promise<EphemerisWindow> {
    return new Promise((resolve, reject) => this.requests.push({ path, timeEt, signal, resolve, reject }));
  }
  snapshot() { return { active: 0, queued: 0, entries: 0, bytes: 0, references: 0 }; }
  dispose() { this.disposed++; }
  complete(index: number, min: number, max: number, offset = 0) {
    const request = this.requests[index];
    request.resolve(positionWindow(request.path, min, max, offset));
  }
}
async function settle() { for (let i = 0; i < 8; i++) await Promise.resolve(); }

describe('independent explorer runtime', () => {
  it('exposes initial pending state and evaluates every frame at the same clock ET', async () => {
    const repository = new Repository();
    const runtime = new ExplorerRuntime({ entities: [root, body('earth'), body('moon', { phases: [{ startEt: -100, parentId: 'earth', positionPath: 'moon/pos/def.dyn' }] })], repository, timeEt: 2 });
    expect(runtime.snapshot()).toMatchObject({ phase: 'loading', selectedId: 'earth', pending: ['earth/pos/def.dyn', 'moon/pos/def.dyn'] });
    expect(runtime.snapshot().frames.get('earth')).toMatchObject({ status: 'unavailable' });
    repository.complete(0, 0, 10); repository.complete(1, 0, 10, 1); await settle();
    runtime.play(2);
    const snapshot = runtime.tick(2);
    expect(snapshot.clock.timeEt).toBe(6);
    expect(snapshot.frames.get('earth')).toMatchObject({ position: { x: 6 } });
    expect(snapshot.frames.get('moon')).toMatchObject({ position: { x: 13 } });
    expect(snapshot.phase).toBe('ready');
    expect(repository.requests).toHaveLength(2);
  });

  it('invalidates generations on seek and ignores late responses even if abort is ignored', async () => {
    const repository = new Repository();
    const runtime = new ExplorerRuntime({ entities: [body('earth')], repository, timeEt: 2 });
    runtime.seek(22);
    expect(repository.requests[0].signal?.aborted).toBe(true);
    expect(runtime.snapshot().generation).toBe(1);
    repository.complete(1, 20, 30, 100); await settle();
    repository.complete(0, 0, 10); await settle();
    expect(runtime.snapshot().frames.get('earth')).toMatchObject({ position: { x: 122 } });
    runtime.seek(2);
    expect(runtime.snapshot().frames.get('earth')).toMatchObject({ status: 'unavailable' });
    expect(runtime.snapshot().phase).toBe('loading');
    repository.complete(2, 0, 10); await settle();
    runtime.seek(3);
    expect(repository.requests).toHaveLength(3);
    expect(runtime.snapshot().frames.get('earth')).toMatchObject({ position: { x: 3 } });
  });

  it('finishes expired pending windows by loading current ET without retaining stale frames', async () => {
    const repository = new Repository();
    const runtime = new ExplorerRuntime({ entities: [body('earth')], repository, timeEt: 2 });
    runtime.play(1); runtime.tick(20);
    expect(repository.requests).toHaveLength(1);
    repository.complete(0, 0, 10); await settle();
    expect(repository.requests[1].timeEt).toBe(22);
    expect(runtime.snapshot().frames.get('earth')).toMatchObject({ status: 'unavailable' });
    repository.complete(1, 20, 30); await settle();
    expect(runtime.snapshot().frames.get('earth')).toMatchObject({ position: { x: 22 } });
    expect(runtime.snapshot().phase).toBe('ready');
  });

  it('loads only active phases in both directions and diagnoses unavailable parents', async () => {
    const repository = new Repository();
    const probe = body('probe', { phases: [{ startEt: 0, parentId: 'missing', positionPath: 'probe/a/def.dyn' }, { startEt: 10, parentId: null, positionPath: 'probe/b/def.dyn' }] });
    const runtime = new ExplorerRuntime({ entities: [probe], repository, timeEt: -1 });
    expect(repository.requests).toHaveLength(0);
    expect(runtime.snapshot().frames.get('probe')).toMatchObject({ reason: 'no-phase' });
    runtime.seek(15); expect(repository.requests[0].path).toBe('probe/b/def.dyn');
    repository.complete(0, 10, 20); await settle();
    runtime.seek(5); expect(repository.requests[1].path).toBe('probe/a/def.dyn');
    repository.complete(1, 0, 10); await settle();
    expect(runtime.snapshot().frames.get('probe')).toMatchObject({ reason: 'missing-parent' });
    expect(runtime.snapshot().phase).toBe('error');
  });

  it('retains load failures for explicit retry and rejects invalid returned coverage without refetch loops', async () => {
    const repository = new Repository();
    const runtime = new ExplorerRuntime({ entities: [body('earth')], repository, timeEt: 2 });
    repository.requests[0].reject(new Error('offline')); await settle();
    expect(runtime.snapshot()).toMatchObject({ phase: 'error', errors: { 'earth/pos/def.dyn': 'offline' }, pending: [] });
    runtime.tick(1); expect(repository.requests).toHaveLength(1);
    runtime.retry(); expect(repository.requests).toHaveLength(2);
    repository.complete(1, 20, 30); await settle();
    expect(runtime.snapshot().phase).toBe('error');
    for (let frame = 0; frame < 20; frame++) runtime.tick(0.01);
    expect(repository.requests).toHaveLength(2);
    runtime.retry(); repository.complete(2, 0, 10); await settle();
    expect(runtime.snapshot().phase).toBe('ready');
  });

  it('requires orientation controllers and reports partial readiness', async () => {
    const repository = new Repository();
    const runtime = new ExplorerRuntime({ entities: [root, body('earth', { phases: [{ startEt: 0, parentId: 'sun', positionPath: 'earth/pos/def.dyn', orientationPath: 'earth/ori/def.dyn' }] })], repository, timeEt: 2 });
    repository.complete(0, 0, 10); await settle();
    expect(runtime.snapshot().frames.get('earth')).toMatchObject({ reason: 'missing-orientation' });
    repository.requests[1].reject(new Error('orientation unavailable')); await settle();
    expect(runtime.snapshot().phase).toBe('partial');
    runtime.retry();
    const window = positionWindow('earth/ori/def.dyn', 0, 10);
    repository.requests[2].resolve({ ...window, header: { ...window.header, pointType: 'quat' }, points: [0, 10].map(time => ({ kind: 'quat', time, orientation: identity })) }); await settle();
    expect(runtime.snapshot().frames.get('earth')).toMatchObject({ status: 'ready', orientation: identity });
  });

  it('can retry a loaded controller whose samples fail evaluation', async () => {
    const repository = new Repository();
    const runtime = new ExplorerRuntime({ entities: [body('earth')], repository, timeEt: 2 });
    const window = positionWindow('earth/pos/def.dyn', 0, 10);
    repository.requests[0].resolve({ ...window, points: [] }); await settle();
    expect(runtime.snapshot()).toMatchObject({ phase: 'error', errors: { 'earth/pos/def.dyn': 'invalid-samples' } });
    runtime.retry();
    expect(repository.requests).toHaveLength(2);
    repository.complete(1, 0, 10); await settle();
    expect(runtime.snapshot().phase).toBe('ready');
  });

  it('publishes detached snapshots, honors unsubscribe and owns repository disposal exactly once', async () => {
    const repository = new Repository();
    const runtime = new ExplorerRuntime({ entities: [root, body('earth')], repository, timeEt: 2 });
    let notifications = 0;
    const unsubscribe = runtime.subscribe(() => notifications++);
    runtime.select('sun'); runtime.pause();
    const snapshot = runtime.snapshot();
    const sun = snapshot.frames.get('sun');
    if (sun?.status === 'ready') sun.position.x = 999;
    (snapshot.frames as Map<string, unknown>).clear();
    expect(runtime.snapshot().frames.get('sun')).toMatchObject({ position: zero });
    unsubscribe(); const oldNotifications = notifications;
    runtime.play(-2); runtime.tick(1); expect(notifications).toBe(oldNotifications);
    runtime.dispose(); runtime.dispose();
    expect(repository.disposed).toBe(1);
    expect(repository.requests[0].signal?.aborted).toBe(true);
    expect(runtime.snapshot()).toMatchObject({ phase: 'disposed', pending: [] });
    repository.complete(0, 0, 10); await settle();
    expect(runtime.snapshot().phase).toBe('disposed');
    expect(notifications).toBe(oldNotifications);
    expect(() => runtime.seek(1)).toThrow(/disposed/i);
    expect(() => runtime.subscribe(() => {})).toThrow(/disposed/i);
  });

  it('stops notifying remaining listeners when a listener disposes the runtime', () => {
    const repository = new Repository();
    const runtime = new ExplorerRuntime({ entities: [root], repository, timeEt: 2 });
    let remainingCalls = 0;
    runtime.subscribe(() => runtime.dispose());
    runtime.subscribe(() => remainingCalls++);
    runtime.pause();
    expect(runtime.snapshot().phase).toBe('disposed');
    expect(repository.disposed).toBe(1);
    expect(remainingCalls).toBe(0);
  });

  it('honors an unsubscribe performed by an earlier listener in the same notification', () => {
    const runtime = new ExplorerRuntime({ entities: [root], repository: new Repository(), timeEt: 2 });
    let remainingCalls = 0;
    let unsubscribe = () => {};
    runtime.subscribe(() => unsubscribe());
    unsubscribe = runtime.subscribe(() => remainingCalls++);
    runtime.pause();
    expect(remainingCalls).toBe(0);
    runtime.play();
    expect(remainingCalls).toBe(0);
  });

  it('validates commands without corrupting state and supports explicit live time', () => {
    const runtime = new ExplorerRuntime({ entities: [root], repository: new Repository(), timeEt: 2 });
    expect(() => runtime.select('absent')).toThrow(/entity/i);
    expect(() => runtime.seek(NaN)).toThrow(/finite/i);
    expect(() => runtime.play(Infinity)).toThrow(/finite/i);
    expect(() => runtime.tick(-1)).toThrow(/nonnegative/i);
    expect(runtime.snapshot().clock.timeEt).toBe(2);
    runtime.live(Date.UTC(2026, 0, 1));
    expect(runtime.snapshot().clock).toMatchObject({ mode: 'live', timeEt: 820497669.184 });
    runtime.tick(1, Date.UTC(2026, 0, 1) + 1000);
    expect(runtime.snapshot().clock.timeEt).toBeCloseTo(820497670.184);
    runtime.pause(); expect(runtime.tick(2).clock.mode).toBe('paused');
  });
});

describe('verified curated scene', () => {
  it('uses explicit spheroid descriptors, controller phases and a spacecraft marker', () => {
    expect(DEFAULT_SCENE.map(entity => entity.id)).toEqual(['sun', 'earth', 'moon', 'jupiter', 'saturn', 'sc_voyager_1']);
    expect(DEFAULT_SCENE.find(entity => entity.id === 'earth')).toMatchObject({ radiusKm: 6378.137, polarRadiusKm: 6356.752, planetographic: true, texture: { url: 'earth/color_$SIZE_$FACE.png', sizes: [16, 512, 4096] } });
    const voyager = DEFAULT_SCENE.find(entity => entity.id === 'sc_voyager_1')!;
    expect(voyager.kind).toBe('marker');
    expect(voyager.phases.map(phase => [phase.startEt, phase.parentId, phase.positionPath, phase.orientationPath])).toEqual([
      [-704412035.617, 'earth', 'sc_voyager_1/earth/def.dyn', undefined],
      [-703530245, 'sun', 'sc_voyager_1/sun/1/def.dyn', undefined],
      [-660264745, 'jupiter', 'sc_voyager_1/jupiter/def.dyn', undefined],
      [-655057463, 'sun', 'sc_voyager_1/sun/2/def.dyn', undefined],
      [-606239665, 'saturn', 'sc_voyager_1/saturn/def.dyn', undefined],
      [-600733702, 'sun', 'sc_voyager_1/sun/3/def.dyn', undefined],
    ]);
    for (const entity of DEFAULT_SCENE.filter(entity => entity.kind === 'spheroid')) expect(entity.phases[0].orientationPath).toBe(`${entity.id}/ori/def.dyn`);
    expect(DEFAULT_SCENE[0]).toMatchObject({ staticPosition: zero, staticOrientation: identity, phases: [{ parentId: null }] });
  });
});

describe('catalog runtime loading', () => {
  it('resolves repeated-parent candidate controllers by real coverage', async () => {
    const repository = new Repository();
    const runtime = new ExplorerRuntime({ entities: [body('probe', { phases: [{ startEt: 0, parentId: null, positionPaths: ['probe/1/def.dyn', 'probe/2/def.dyn'] }] })], repository, timeEt: 22 });
    expect(repository.requests.map(request => request.path)).toEqual(['probe/1/def.dyn', 'probe/2/def.dyn']);
    repository.requests[0].reject(new Error('outside coverage')); repository.complete(1, 20, 30); await settle();
    expect(runtime.snapshot()).toMatchObject({ phase: 'ready', errors: {} });
    expect(runtime.snapshot().frames.get('probe')).toMatchObject({ position: { x: 22 } });
  });
  it('loads requested entities with current parent dependencies and ignores stale selection loads', async () => {
    const repository = new Repository();
    const runtime = new ExplorerRuntime({ entities: [root, body('earth'), body('moon', { phases: [{ startEt: 0, parentId: 'earth', positionPath: 'moon/pos/def.dyn' }] }), body('probe')], repository, timeEt: 2, activeIds: ['moon'] });
    expect(repository.requests.map(request => request.path)).toEqual(['earth/pos/def.dyn', 'moon/pos/def.dyn']);
    expect(runtime.snapshot().frames.get('probe')).toMatchObject({ reason: 'inactive' });
    runtime.setActive(['probe']);
    expect(repository.requests[0].signal?.aborted).toBe(true);
    repository.complete(0, 0, 10); repository.complete(1, 0, 10); repository.complete(2, 0, 10); await settle();
    expect(runtime.snapshot().frames.get('moon')).toMatchObject({ reason: 'inactive' });
    expect(runtime.snapshot().phase).toBe('ready');
    expect(() => runtime.setActive(['absent'])).toThrow(/entity/i);
  });
});

import { EphemerisRepositoryError } from '../src/solar/runtime/ephemeris-repository';
describe('time-scoped no-data caching', () => {
  const unavailable = (min: number, max: number) => new EphemerisRepositoryError('no-data', 'outside coverage', undefined, { unavailableInterval: { min, max } });
  it('distinguishes normal date coverage from retryable data failures without hiding diagnostics',async()=>{
    const repository=new Repository();const runtime=new ExplorerRuntime({entities:[body('probe')],repository,timeEt:2});
    repository.requests[0].reject(unavailable(-Infinity,10));await settle();
    expect(runtime.snapshot()).toMatchObject({unavailablePaths:['probe/pos/def.dyn'],errors:{'probe/pos/def.dyn':'outside coverage'}});
    runtime.retry();repository.requests[1].reject(new EphemerisRepositoryError('fetch-failed','offline'));await settle();
    expect(runtime.snapshot()).toMatchObject({unavailablePaths:[],errors:{'probe/pos/def.dyn':'offline'}});
  });
  it('retries another candidate when forward playback exits its known unavailable interval', async () => {
    const repository = new Repository();
    const runtime = new ExplorerRuntime({ entities: [body('probe', { phases: [{startEt:-100,parentId:null,positionPaths:['a/def.dyn','b/def.dyn']} ] })], repository, timeEt: 2 });
    repository.complete(0,0,10); repository.requests[1].reject(unavailable(-Infinity,9.999999999999998)); await settle();
    runtime.play(1); runtime.tick(7); await settle(); expect(repository.requests).toHaveLength(2);
    runtime.tick(2); expect(repository.requests.map(r=>[r.path,r.timeEt])).toContainEqual(['b/def.dyn',11]);
    const b=repository.requests.findIndex(r=>r.path==='b/def.dyn'&&r.timeEt===11);repository.complete(b,10,20);await settle();
    expect(runtime.snapshot().frames.get('probe')).toMatchObject({status:'ready',position:{x:11}});
  });
  it('retries after initial precoverage and reverse postcoverage no-data without per-frame loops', async () => {
    for (const [initial,min,max,rate] of [[-1,-Infinity,-Number.MIN_VALUE,1],[11,10.000000000000002,Infinity,-1]] as const) {
      const repository=new Repository();const runtime=new ExplorerRuntime({entities:[body('probe')],repository,timeEt:initial});
      repository.requests[0].reject(unavailable(min,max));await settle();
      runtime.play(rate);runtime.tick(0.1);runtime.tick(0.1);expect(repository.requests).toHaveLength(1);
      runtime.tick(2);expect(repository.requests).toHaveLength(2);repository.complete(1,0,10);await settle();
      expect(runtime.snapshot().frames.get('probe')?.status).toBe('ready');
    }
  });
  it('retains network failures for explicit retry even when time moves substantially', async () => {
    const repository=new Repository();const runtime=new ExplorerRuntime({entities:[body('probe')],repository,timeEt:2});
    repository.requests[0].reject(new EphemerisRepositoryError('fetch-failed','offline'));await settle();
    runtime.play(1);runtime.tick(100);runtime.tick(100);expect(repository.requests).toHaveLength(1);
    runtime.retry();expect(repository.requests).toHaveLength(2);
  });
});
