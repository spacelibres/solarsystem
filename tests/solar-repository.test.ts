import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { describe, expect, it, vi } from 'vitest';
import { EphemerisRepository, EphemerisRepositoryError } from '../src/solar/runtime/ephemeris-repository';
import { dynamoUrl } from '../src/lib/nasa/assets';
import { clearDynamoCache, loadDynamo } from '../src/lib/dynamo/loader';
import { parseDyn, type DynPoint, type PointType } from '../src/lib/dynamo/parse';
import { evaluateEphemeris } from '../src/solar/domain/ephemeris';

class Bytes {
  data: number[] = [];
  byte(n: number) { this.data.push(n); return this; }
  integer(n: number, size = 4) {
    const buffer = new ArrayBuffer(size); const view = new DataView(buffer);
    if (size === 2) view.setInt16(0, n, true); else view.setInt32(0, n, true);
    this.data.push(...new Uint8Array(buffer)); return this;
  }
  double(n: number) {
    const buffer = new ArrayBuffer(8); new DataView(buffer).setFloat64(0, n, true);
    this.data.push(...new Uint8Array(buffer)); return this;
  }
  buffer() { return Uint8Array.from(this.data).buffer; }
}
function root(block: ArrayBuffer, version = 2, type: PointType = 'lin', digits = 2) {
  const b = new Bytes().integer(version, 2);
  for (const c of type) b.byte(c.charCodeAt(0)); b.byte(0);
  if (version === 2) b.byte(digits);
  if (type === 'orb') b.double(1).double(100);
  b.data.push(...new Uint8Array(block)); return b.buffer();
}
function index(boundaries: number[], version = 2) {
  const b = new Bytes().byte(0).integer(version === 1 ? boundaries.length / 2 : boundaries.length);
  boundaries.forEach(n => b.double(n)); return b.buffer();
}
function leaf(times: number[], type: PointType = 'lin', version = 2) {
  const b = new Bytes(); if (version === 2) b.byte(1); b.integer(times.length);
  for (const time of times) {
    b.double(time);
    const fields = type === 'lin' ? [time, 2, 3] : type === 'pos' ? [time, 2, 3, 1, 0, 0] :
      type === 'quat' ? [1, 0, 0, 0] : type === 'ori' ? [1, 0, 0, 0, 0, 0, 1] : [10, 0.1, 1, 0, 1, 0, 0, 0];
    fields.forEach(n => b.double(n));
  }
  return b.buffer();
}
function orbitalRecords(records: readonly (readonly number[])[]) {
  const b = new Bytes().byte(1).integer(records.length);
  for (const record of records) record.forEach(value => b.double(value));
  return b.buffer();
}
function sourcePair(points: readonly DynPoint[], time: number): readonly DynPoint[] {
  const source = readFileSync('eyes/src/engine/controllers/DynamoController.js', 'utf8');
  const body = source.slice(source.indexOf('class PointSet {'), source.indexOf('class DynamoController extends'));
  const PointSet = runInNewContext(`${body}\nPointSet`) as { prototype: { getPoints: (output: DynPoint[], time: number) => void } };
  const instance = Object.assign(Object.create(PointSet.prototype), { _points: points, _hintIndex: 0 }) as { getPoints: (output: DynPoint[], time: number) => void };
  const result: DynPoint[] = [];
  instance.getPoints(result, time);
  return result;
}
const path = 'test/sun/lin/def.dyn';
const child = (name: string) => `test/sun/lin/${name}.dyn`;
function fixtureRepository(files: Record<string, ArrayBuffer>, maxBytes?: number) {
  const fetchBuffer = vi.fn(async (url: string) => {
    const key = url.slice(dynamoUrl('').length);
    if (!files[key]) throw new Error(`Missing fixture ${url}`);
    return files[key];
  });
  return { repository: new EphemerisRepository({ fetchBuffer, maxBytes }), fetchBuffer };
}

describe('source-derived dynamo repository', () => {
  it('canonicalizes the verified Voyager 1 identical terminal record without losing its endpoint', async () => {
    // Exact 404-byte response fetched 2026-10-16 from this public controller URL.
    const voyagerPath = 'sc_voyager_1/sun/3/def.dyn';
    const bytes = Uint8Array.from(Buffer.from('AgBwb3MAAgEHAAAAAAAAAzznwcEc36C5hXnVwbKapuHmG6DBFOdncDxlhUHhOMl9drcYwDSXjzVSGjTAs/i8ozXVEUDekpJnu3G+wS7eVC0GRdvBP87+ztD/28HaXR+E3Z25QdZrGT6T7AnAxABhSAyqMsDqbx75+nEQQLSVXiM1sLHBNtsvb73O4cEtcnlZDS71wUjLA6N95tJB4nynXb6vAsCZa77Gl0QxwJ+XJOzoXw5A3jDkd5ArvkEU4kmtEKbuwabJxWUvzhHCA/PfhSp370Ecwno6IaEAwJGCarVRfTDAUrIRkE/3DEC0yBZ2x0fJQQ1iZ7Lh9PHBwKlqVkQKF8KSk/zMlVf0QVySC3QvjgDAUpVgfx9mMMCh8hPS7NgMQAAAAFgNg+dBKbT1hc+6AcIt4SBELwMtwl1f1WhvlAlCDtUDPIooAMBgTGvt5zowwNnc5TrEjAxAAAAAWA2D50EptPWFz7oBwi3hIEQvAy3CXV/VaG+UCUIO1QM8iigAwGBMa+3nOjDA2dzlOsSMDEA=', 'base64')).buffer;
    const { repository } = fixtureRepository({ [voyagerPath]: bytes });
    const window = await repository.load(voyagerPath, 845436800);
    expect(window.points).toHaveLength(6);
    expect(window.interval).toEqual({ min: -600733702, max: 3155716800 });
    for (const time of [845436800, 3155716800]) {
      const state = evaluateEphemeris(window, time);
      expect(state).toMatchObject({ status: 'ready', kind: 'position' });
      if (state.status === 'ready' && state.kind === 'position') {
        expect([...Object.values(state.position), ...Object.values(state.velocity)].every(Number.isFinite)).toBe(true);
      }
    }
    repository.dispose();
  });

  it('still rejects conflicting interior and terminal duplicates', async () => {
    const conflicting = leaf([0, 10, 10], 'pos');
    new DataView(conflicting).setFloat64(5 + 2 * 56 + 8, 999, true);
    const interior = leaf([0, 10, 10, 20]);
    new DataView(interior).setFloat64(5 + 2 * 32 + 8, 999, true);
    for (const bytes of [root(interior), root(conflicting, 2, 'pos')]) {
      const { repository } = fixtureRepository({ [path]: bytes });
      await expect(repository.load(path, 5)).rejects.toMatchObject({ code: 'invalid-data' });
      repository.dispose();
    }
  });

  it('coalesces the verified byte-identical Venus interior record without changing either positive interval', async () => {
    // Exact four records around the duplicate in the live Venus orb response, 2026-10-16.
    const records = [
      [-53092736.814,108207899.89618126,0.006778274603491435,3.2364425043540703e-7,2.551319966004506,0.3977004184913597,0.11219201894602919,-0.17941308989140858,0.8927812000665272],
      [-16495135.816,108208699.95369588,0.006780353543698131,3.2364066107240593e-7,1.826668966879606,0.39647621805651995,0.11194637377044994,-0.17956769331974365,0.8933252831030094],
      [-16495135.816,108208699.95369588,0.006780353543698131,3.2364066107240593e-7,1.826668966879606,0.39647621805651995,0.11194637377044994,-0.17956769331974365,0.8933252831030094],
      [197902579,108208489.49183074,0.006766315768849428,3.236416052781324e-7,2.1018808488145626,0.3976914992933442,0.11219250183305249,-0.17942545351469066,0.8927826278290255],
    ];
    const bytes = root(orbitalRecords(records), 2, 'orb');
    const { repository } = fixtureRepository({ [path]: bytes });
    const window = await repository.load(path, 0);
    expect(window.points).toHaveLength(3);
    expect(window.points.map(point => point.time)).toEqual([records[0][0], records[1][0], records[3][0]]);
    for (const time of [-30000000, records[1][0], 0]) {
      expect(evaluateEphemeris(window, time)).toMatchObject({ status: 'ready' });
      const reference = sourcePair(parseDyn(bytes).points, time);
      const selected = window.points.filter(point => reference.some(other => other.time === point.time));
      expect(selected).toEqual(reference);
    }
    repository.dispose();
  });

  it('preserves Mars original-order source pair selection across its historical backstep and repeated seeks', async () => {
    // All 50 timestamps from the 3628-byte live Mars root, preserving the 12->13 backstep.
    const times = [-3155716758.816,-2813992703.8175755,-2621557644.7237186,-2396145026.614604,-2024384525.971887,-1690308923.2988899,-1354237618.9642744,-1123009265.3955674,-931890518.0692738,-702196563.591141,-509614451.11638725,-208434961.17802674,-78799646,-742490410,-738461957,-416546278.7013104,-265179805.10695326,-72717692,-7689600,-2507347,57128464,125539264,128262836,195285665,225623375,225657862,265008306,288169447,288210177,397477501,464590867,464758867,530107268,596376069.183,666932224,794086294,794230007,831828698,832302380,873258326,873517951,1134311346.692306,1221857105.6951253,1517983182.9451685,1798115113.8113098,2100663711.1683388,2401172848.6898375,2697881485.8795795,3038512048.168521,3155716869.184];
    const records = times.map(time => [time, 227930000, 0.0934, 1.05865e-7, 0, 1, 0, 0, 0]);
    // Exact source records bracketing present ET, including quaternion W-first fields.
    records[38] = [832302380,227929944.0679331,0.09343752982651743,1.0586534356174824e-7,0.4787676900379745,0.9562344596465,0.20624175026692718,0.05592537744649474,-0.1998808414752842];
    records[39] = [873258326,227930320.87561515,0.09349692708669932,1.0586508104166267e-7,-1.4715186927015405,0.9564834348445399,0.206313628857261,0.0556659524353164,-0.19868423982593103];
    const bytes = root(orbitalRecords(records), 2, 'orb');
    const { repository, fetchBuffer } = fixtureRepository({ [path]: bytes });
    for (const time of [845436800, -3000000000, -740000000, -500000000, -100000000, -78799646, -78000000, 0, 3155716869.184, 845436800]) {
      const expected = sourcePair(parseDyn(bytes).points, time);
      const window = await repository.load(path, time);
      expect(window.points).toEqual(expected);
      expect(window.interval.min).toBeGreaterThanOrEqual(expected[0].time);
      expect(window.interval.max).toBeLessThanOrEqual(expected[1].time);
      expect(window.interval.min).toBeLessThanOrEqual(time);
      expect(window.interval.max).toBeGreaterThanOrEqual(time);
      expect(evaluateEphemeris(window, time)).toMatchObject({ status: 'ready', kind: 'position' });
      if (time === 845436800) expect(window.points.map(point => point.time)).toEqual([832302380, 873258326]);
    }
    expect(fetchBuffer).toHaveBeenCalledTimes(1);
    repository.dispose();
  });

  it('does not sort, cross a descending edge or extrapolate an unordered leaf', async () => {
    const { repository } = fixtureRepository({ [path]: root(leaf([0, 20, 10, 30])) });
    const window = await repository.load(path, 15);
    expect(window.points.map(point => point.time)).toEqual([0, 20]);
    await expect(repository.load(path, -1)).rejects.toMatchObject({ code: 'no-data' });
    await expect(repository.load(path, 31)).rejects.toMatchObject({ code: 'no-data' });
    repository.dispose();
    const invalid = fixtureRepository({ [path]: root(leaf([10, 0])) }).repository;
    await expect(invalid.load(path, 5)).rejects.toMatchObject({ code: 'invalid-data' });
    invalid.dispose();
  });

  it('fixes the actual old quarter-bucket collision and never downloads v2 sentinel', async () => {
    const files = { [path]: root(index([0, 10, 20, 30])), [child('00')]: leaf([0, 10]), [child('01')]: leaf([10, 20]), [child('02')]: leaf([20, 30]) };
    const { repository, fetchBuffer } = fixtureRepository(files);
    vi.stubGlobal('fetch', async (url: string) => ({ ok: true, arrayBuffer: () => fetchBuffer(url) }));
    try {
      clearDynamoCache();
      const old = [];
      for (const time of [0, 15, 25]) old.push((await loadDynamo(path, time)).points[0].time);
      expect(old).toEqual([0, 10, 10]);
    } finally { vi.unstubAllGlobals(); clearDynamoCache(); }
    fetchBuffer.mockClear();
    const windows = [];
    for (const time of [0, 15, 25, 10, 30, 5]) windows.push(await repository.load(path, time));
    expect(windows.map(window => window.points[0].time)).toEqual([0, 10, 20, 10, 20, 0]);
    expect(windows[1].source).toEqual({ path, segment: '01' });
    expect(windows[1].interval.min).toBe(10);
    expect(windows[1].interval.max).toBeLessThan(20);
    expect(windows[1].interval.max).toBeGreaterThan(19.99999999999999);
    expect(fetchBuffer).toHaveBeenCalledTimes(4);
    await expect(repository.load(path, 30.001)).rejects.toMatchObject({ code: 'no-data' });
    expect(fetchBuffer).toHaveBeenCalledTimes(4);
    expect(repository.snapshot().references).toBe(0);
    repository.dispose();
  });

  it('resolves nested indices beside the root and intersects actual sample coverage', async () => {
    const { repository, fetchBuffer } = fixtureRepository({
      [path]: root(index([0, 20])), [child('00')]: index([0, 10, 20]),
      [child('00_01')]: leaf([8, 15, 25]),
    });
    const window = await repository.load(path, 12);
    expect(window.source.segment).toBe('00_01');
    expect(window.interval).toEqual({ min: 10, max: 20 });
    expect(fetchBuffer.mock.calls.map(call => call[0])).toEqual([dynamoUrl(path), dynamoUrl(child('00')), dynamoUrl(child('00_01'))]);
    repository.dispose();
  });

  it('uses v1 explicit intervals, computed digits and leaves without a control byte', async () => {
    const boundaries = Array.from({ length: 11 }, (_, i) => [i * 10, i * 10 + 8]).flat();
    const { repository, fetchBuffer } = fixtureRepository({
      [path]: root(index(boundaries, 1), 1), [child('00')]: leaf([0, 8], 'lin', 1), [child('10')]: leaf([100, 108], 'lin', 1),
    });
    expect((await repository.load(path, 0)).header.numberOfDigits).toBe(2);
    expect((await repository.load(path, 108)).points[0].time).toBe(100);
    await expect(repository.load(path, 9)).rejects.toMatchObject({ code: 'no-data' });
    expect(fetchBuffer).toHaveBeenCalledTimes(3);
    repository.dispose();
  });

  it.each<PointType>(['pos', 'lin', 'ori', 'quat', 'orb'])('inherits %s metadata and source field order in leaves', async type => {
    const { repository } = fixtureRepository({ [path]: root(index([0, 10]), 2, type), [child('00')]: leaf([0, 10], type) });
    const window = await repository.load(path, 5);
    expect(window.points[0].kind).toBe(type);
    if ('orientation' in window.points[0]) expect(window.points[0].orientation).toEqual({ w: 1, x: 0, y: 0, z: 0 });
    if (type === 'orb') expect(window.header).toMatchObject({ gravitationalParameter1: 1, gravitationalParameter2: 100 });
    repository.dispose();
  });

  it.each(['earth-ori.dyn', 'earth-sun-orb.dyn', 'mercury-sun-orb.dyn', 'jupiter-sun-orb.dyn'])('reads real %s fixture without downloading media', async name => {
    const bytes = readFileSync(new URL(`./fixtures/${name}`, import.meta.url));
    const { repository } = fixtureRepository({ [path]: Uint8Array.from(bytes).buffer });
    const { parseDyn } = await import('../src/lib/dynamo/parse');
    const parsed = parseDyn(bytes);
    const window = await repository.load(path, parsed.points[0].time);
    expect(window.points).toEqual(parsed.points);
    expect(window.source.segment).toBeNull();
    repository.dispose();
  });

  it.each([
    root(index([0, 0, 10])), root(index([10, 0])), root(new Bytes().byte(0).integer(-1).buffer()),
    root(new Bytes().byte(0).integer(20).double(1).buffer()), root(index([0, Infinity])),
    root(leaf([0, 0])), root(leaf([0, NaN])), root(leaf([0, 1])).slice(0, -1),
    root(index([0, 10, 5, 15], 1), 1), root(new Bytes().byte(2).integer(0).buffer()),
  ])('rejects malformed, duplicate, nonfinite or truncated blocks', async bytes => {
    const { repository } = fixtureRepository({ [path]: bytes });
    await expect(repository.load(path, 0)).rejects.toMatchObject({ name: 'EphemerisRepositoryError', code: 'invalid-data' });
    expect(repository.snapshot().references).toBe(0);
    repository.dispose();
  });

  it('rejects unsafe paths and invalid time before fetch', async () => {
    const { repository, fetchBuffer } = fixtureRepository({});
    for (const unsafe of ['../def.dyn', '/def.dyn', 'https://host/def.dyn', 'a//def.dyn', 'a/%2e/def.dyn', 'a\\def.dyn', 'a/def.dyn?x']) {
      await expect(repository.load(unsafe, 0)).rejects.toMatchObject({ code: 'invalid-request' });
    }
    await expect(repository.load(path, NaN)).rejects.toMatchObject({ code: 'invalid-request' });
    expect(fetchBuffer).not.toHaveBeenCalled();
    repository.dispose();
  });

  it('reports empty and uncovered samples explicitly, never a fabricated origin', async () => {
    for (const bytes of [root(leaf([])), root(index([])), root(index([0])), root(leaf([10, 20]))]) {
      const { repository } = fixtureRepository({ [path]: bytes });
      await expect(repository.load(path, 0)).rejects.toBeInstanceOf(EphemerisRepositoryError);
      await expect(repository.load(path, 0)).rejects.toMatchObject({ code: 'no-data' });
      repository.dispose();
    }
  });

  it('bounds nested index traversal', async () => {
    const fetchBuffer = vi.fn(async (url: string) => url.endsWith('/def.dyn') ? root(index([0, 10])) : index([0, 10]));
    const repository = new EphemerisRepository({ fetchBuffer });
    await expect(repository.load(path, 5)).rejects.toMatchObject({ code: 'invalid-data' });
    expect(fetchBuffer.mock.calls.length).toBeLessThanOrEqual(17);
    expect(repository.snapshot().references).toBe(0);
    repository.dispose();
  });

  it('retains fetch failures as causes and retries without cached rejection', async () => {
    const failure = new Error('network');
    const fetchBuffer = vi.fn().mockRejectedValueOnce(failure).mockResolvedValue(root(leaf([0, 10])));
    const repository = new EphemerisRepository({ fetchBuffer });
    await expect(repository.load(path, 0)).rejects.toMatchObject({ code: 'fetch-failed', cause: failure, url: dynamoUrl(path) });
    expect((await repository.load(path, 0)).points[0].time).toBe(0);
    expect(fetchBuffer).toHaveBeenCalledTimes(2);
    repository.dispose();
  });

  it('shares overlaps and settles canceled loads even when the fetch ignores abort', async () => {
    let finish!: (value: ArrayBuffer) => void;
    let underlying!: AbortSignal;
    const fetchBuffer = vi.fn((_url: string, signal: AbortSignal) => {
      underlying = signal;
      return new Promise<ArrayBuffer>(resolve => { finish = resolve; });
    });
    const repository = new EphemerisRepository({ fetchBuffer });
    const controller = new AbortController();
    const a = repository.load(path, 0, controller.signal);
    const b = repository.load(path, 5);
    const rejected = expect(a).rejects.toMatchObject({ name: 'AbortError' });
    await Promise.resolve(); await Promise.resolve(); controller.abort(); await rejected;
    expect(underlying.aborted).toBe(false);
    finish(root(leaf([0, 10])));
    expect((await b).points[0].time).toBe(0);
    expect(fetchBuffer).toHaveBeenCalledTimes(1);
    expect(repository.snapshot().references).toBe(0);
    repository.dispose();
    expect(repository.snapshot().bytes).toBe(0);
  });

  it('dispose aborts pending repository loads and does not resurrect late bytes', async () => {
    let finish!: (value: ArrayBuffer) => void;
    const repository = new EphemerisRepository({ fetchBuffer: () => new Promise(resolve => { finish = resolve; }) });
    const pending = repository.load(path, 0);
    const rejected = expect(pending).rejects.toMatchObject({ name: 'AbortError' });
    await Promise.resolve(); await Promise.resolve(); repository.dispose(); await rejected;
    finish(root(leaf([0, 10])));
    for (let i = 0; i < 8; i++) await Promise.resolve();
    expect(repository.snapshot()).toEqual({ active: 0, queued: 0, entries: 0, bytes: 0, references: 0 });
  });

  it('allows out-of-order windows while canceled stale requests cannot retain bytes', async () => {
    const pending = new Map<string, { finish: (value: ArrayBuffer) => void; signal: AbortSignal }>();
    const repository = new EphemerisRepository({ maxConcurrent: 2, maxBytes: 0, fetchBuffer: async (url, signal) => {
      if (url === dynamoUrl(path)) return root(index([0, 10, 20]));
      return new Promise<ArrayBuffer>(finish => { pending.set(url, { finish, signal }); });
    } });
    const controller = new AbortController();
    const earlier = repository.load(path, 5, controller.signal);
    const later = repository.load(path, 15);
    const rejected = expect(earlier).rejects.toMatchObject({ name: 'AbortError' });
    for (let i = 0; i < 16; i++) await Promise.resolve();
    expect(pending.size).toBe(2);
    controller.abort(); await rejected;
    expect(pending.get(dynamoUrl(child('00')))!.signal.aborted).toBe(true);
    pending.get(dynamoUrl(child('01')))!.finish(leaf([10, 20]));
    expect((await later).points[0].time).toBe(10);
    expect(repository.snapshot()).toMatchObject({ active: 1, bytes: 0, references: 0 });
    pending.get(dynamoUrl(child('00')))!.finish(leaf([0, 10]));
    for (let i = 0; i < 8; i++) await Promise.resolve();
    expect(repository.snapshot()).toEqual({ active: 0, queued: 0, entries: 0, bytes: 0, references: 0 });
    repository.dispose();
  });

  it('uses the verified remote URL and preserves HTTP status as the failure cause', async () => {
    const fetch = vi.fn<(url: string, options: RequestInit) => Promise<{ ok: boolean; status: number }>>(async () => ({ ok: false, status: 503 }));
    vi.stubGlobal('fetch', fetch);
    const repository = new EphemerisRepository();
    try {
      await expect(repository.load(path, 0)).rejects.toMatchObject({
        code: 'fetch-failed', url: dynamoUrl(path), cause: { message: `Dynamo fetch failed (503) for ${dynamoUrl(path)}` },
      });
      expect(fetch.mock.calls[0][0]).toBe('https://eyes.nasa.gov/assets/dynamic/dynamo/test/sun/lin/def.dyn');
    } finally { repository.dispose(); vi.unstubAllGlobals(); }
  });

  it('retries a malformed response after correction and evicts bytes to its budget', async () => {
    const fetchBuffer = vi.fn().mockResolvedValueOnce(root(leaf([0, 0]))).mockResolvedValue(root(leaf([0, 10])));
    const repository = new EphemerisRepository({ fetchBuffer, maxBytes: 0 });
    await expect(repository.load(path, 0)).rejects.toMatchObject({ code: 'invalid-data' });
    expect((await repository.load(path, 0)).points[0].time).toBe(0);
    expect(fetchBuffer).toHaveBeenCalledTimes(2);
    expect(repository.snapshot()).toEqual({ active: 0, queued: 0, entries: 0, bytes: 0, references: 0 });
    repository.dispose();
  });
});

it('reports exact unavailable query cells before/after leaf coverage and between v1 children', async () => {
  const {repository}=fixtureRepository({[path]:root(leaf([0,10]))});
  const before=await repository.load(path,-1).catch(error=>error) as EphemerisRepositoryError;
  const after=await repository.load(path,11).catch(error=>error) as EphemerisRepositoryError;
  expect(before.unavailableInterval?.min).toBe(-Infinity);expect(before.unavailableInterval?.max).toBeLessThan(0);
  expect(after.unavailableInterval?.min).toBeGreaterThan(10);expect(after.unavailableInterval?.max).toBe(Infinity);
  expect((await repository.load(path,0)).interval.min).toBe(0);expect((await repository.load(path,10)).interval.max).toBe(10);
  const gap=fixtureRepository({[path]:root(index([0,10,20,30],1),1)}).repository;
  const error=await gap.load(path,15).catch(error=>error) as EphemerisRepositoryError;
  expect(error.unavailableInterval?.min).toBeGreaterThan(10);expect(error.unavailableInterval?.max).toBeLessThan(20);
  expect(error.unavailableInterval?.min).toBeLessThan(15);expect(error.unavailableInterval?.max).toBeGreaterThan(15);
  repository.dispose();gap.dispose();
});

it('expires nested child no-data before a shared endpoint and loads the right child there', async () => {
  const {repository}=fixtureRepository({[path]:root(index([0,10,20])),[child('00')]:leaf([0,9]),[child('01')]:leaf([10,20])});
  const error=await repository.load(path,9.5).catch(error=>error) as EphemerisRepositoryError;
  expect(error.unavailableInterval?.max).toBeLessThan(10);
  const {ExplorerRuntime}=await import('../src/solar/runtime/explorer-runtime');
  const runtime=new ExplorerRuntime({entities:[{id:'probe',label:'probe',radiusKm:1,kind:'marker',source:'test',phases:[{startEt:0,parentId:null,positionPath:path}]}],repository,timeEt:9.5});
  for(let i=0;i<100;i++)await Promise.resolve();
  expect(runtime.snapshot().frames.get('probe')?.status).toBe('unavailable');
  runtime.play(1);runtime.tick(0.5);
  for(let i=0;i<100;i++)await Promise.resolve();
  expect(runtime.snapshot().frames.get('probe')).toMatchObject({status:'ready',position:{x:10}});
  expect((await repository.load(path,20)).interval.max).toBe(20);
  runtime.dispose();
});
