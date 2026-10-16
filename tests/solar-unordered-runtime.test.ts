import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { describe, expect, it, vi } from 'vitest';
import { parseDyn, type DynPoint } from '../src/lib/dynamo/parse';
import { evaluateEphemeris, type EphemerisWindow } from '../src/solar/domain/ephemeris';
import { EphemerisRepository } from '../src/solar/runtime/ephemeris-repository';
import { ExplorerRuntime } from '../src/solar/runtime/explorer-runtime';

// Exact timestamp sequence from live mars/sun/orb/def.dyn, checked 2026-10-16.
// Distinct linear values isolate pair-selection errors from orbit arithmetic.
const marsTimes = [-3155716758.816,-2813992703.8175755,-2621557644.7237186,-2396145026.614604,-2024384525.971887,-1690308923.2988899,-1354237618.9642744,-1123009265.3955674,-931890518.0692738,-702196563.591141,-509614451.11638725,-208434961.17802674,-78799646,-742490410,-738461957,-416546278.7013104,-265179805.10695326,-72717692,-7689600,-2507347,57128464,125539264,128262836,195285665,225623375,225657862,265008306,288169447,288210177,397477501,464590867,464758867,530107268,596376069.183,666932224,794086294,794230007,831828698,832302380,873258326,873517951,1134311346.692306,1221857105.6951253,1517983182.9451685,1798115113.8113098,2100663711.1683388,2401172848.6898375,2697881485.8795795,3038512048.168521,3155716869.184];
const path = 'mars/source-shape/def.dyn';
function fixture(times = marsTimes): ArrayBuffer {
  const bytes = new Uint8Array(12 + times.length * 32);
  const view = new DataView(bytes.buffer);
  view.setInt16(0, 2, true);
  bytes.set([108, 105, 110, 0, 3, 1], 2);
  view.setInt32(8, times.length, true);
  times.forEach((time, i) => {
    view.setFloat64(12 + i * 32, time, true);
    view.setFloat64(20 + i * 32, i * i, true);
  });
  return bytes.buffer;
}
const source = readFileSync('eyes/src/engine/controllers/DynamoController.js', 'utf8');
const PointSet = runInNewContext(`${source.slice(source.indexOf('class PointSet {'), source.indexOf('class DynamoController extends'))}\nPointSet`) as {
  prototype: { getPoints(output: DynPoint[], time: number): void };
};
function sourceWindow(bytes: ArrayBuffer, time: number): EphemerisWindow {
  const parsed = parseDyn(bytes);
  const instance = Object.assign(Object.create(PointSet.prototype), { _points: parsed.points, _hintIndex: 0 }) as { getPoints(output: DynPoint[], time: number): void };
  const points: DynPoint[] = [];
  instance.getPoints(points, time);
  return { header: parsed.header, points, interval: { min: points[0].time, max: points[1].time }, source: { path, segment: null } };
}
async function settle() { for (let i = 0; i < 24; i++) await Promise.resolve(); }
function setup() {
  const bytes = fixture();
  const fetchBuffer = vi.fn(async () => bytes);
  const repository = new EphemerisRepository({ fetchBuffer });
  const load = vi.spyOn(repository, 'load');
  const runtime = new ExplorerRuntime({ timeEt: -78000000, repository, entities: [{
    id: 'mars', label: 'Mars', radiusKm: 1, kind: 'marker', source: 'source timestamp fixture',
    staticOrientation: { w: 1, x: 0, y: 0, z: 0 },
    phases: [{ startEt: marsTimes[0], parentId: null, positionPath: path }],
  }] });
  return { runtime, load, fetchBuffer, bytes };
}
function expectSourcePosition(runtime: ExplorerRuntime, bytes: ArrayBuffer, time: number) {
  const expected = evaluateEphemeris(sourceWindow(bytes, time), time);
  expect(expected.status).toBe('ready');
  if (expected.status !== 'ready' || expected.kind !== 'position') throw new Error('Invalid reference');
  expect(runtime.snapshot().frames.get('mars')).toMatchObject({ status: 'ready', position: expected.position, velocity: expected.velocity });
}

describe('unordered source windows in runtime cache', () => {
  it('reloads after a backward seek inside the old pair but outside its selector region', async () => {
    const { runtime, load, fetchBuffer, bytes } = setup();
    await settle();
    expectSourcePosition(runtime, bytes, -78000000);
    runtime.seek(-100000000);
    expect(runtime.snapshot().phase).toBe('loading');
    await settle();
    expectSourcePosition(runtime, bytes, -100000000);
    expect(load).toHaveBeenCalledTimes(2);
    expect(fetchBuffer).toHaveBeenCalledTimes(1);
    runtime.dispose();
  });

  it('reloads on backward playback but reuses coverage during ordinary live advancement', async () => {
    const { runtime, load, bytes } = setup();
    runtime.play(1);
    runtime.tick(0.5);
    await settle();
    expect(runtime.snapshot().phase).toBe('ready');
    runtime.tick(0.5);
    expectSourcePosition(runtime, bytes, -77999999);
    expect(load).toHaveBeenCalledTimes(1);
    runtime.play(-22000001);
    runtime.tick(1);
    await settle();
    expectSourcePosition(runtime, bytes, -100000000);
    expect(load).toHaveBeenCalledTimes(2);
    runtime.dispose();
  });

  it('never claims an exact selector boundary for the preceding pair and keeps final coverage closed', async () => {
    const bytes = fixture();
    const repository = new EphemerisRepository({ fetchBuffer: async () => bytes });
    const before = await repository.load(path, -78799647);
    const at = await repository.load(path, -78799646);
    expect(before.interval.max).toBeLessThan(-78799646);
    expect(at.interval.min).toBe(-78799646);
    expect(at.points.map(point => point.time)).toEqual([-265179805.10695326, -72717692]);
    expect(at.interval.max).toBeLessThan(-72717692);
    expect(at.interval.min).toBeGreaterThan(-100000000);
    const last = await repository.load(path, marsTimes[marsTimes.length - 1]);
    expect(last.interval.max).toBe(marsTimes[marsTimes.length - 1]);
    for (const window of [before, at, last]) for (const time of [window.interval.min, window.interval.max]) {
      expect(sourceWindow(bytes, time).points).toEqual(window.points);
    }
    repository.dispose();
  });

  it('represents exclusive boundaries correctly around negative numbers, zero and subnormals', async () => {
    const repository = new EphemerisRepository({ fetchBuffer: async () => fixture([-20, -5, -10, 0, Number.MIN_VALUE, 10, 20]) });
    const negative = await repository.load(path, -6);
    expect(negative.interval.max).toBeLessThan(-5);
    expect(negative.interval.max).toBeGreaterThan(-5 - 1e-12);
    expect((await repository.load(path, -1)).interval.max).toBe(-Number.MIN_VALUE);
    expect((await repository.load(path, 0)).interval).toEqual({ min: 0, max: 0 });
    expect((await repository.load(path, 1)).interval.max).toBeLessThan(10);
    repository.dispose();
  });
});
