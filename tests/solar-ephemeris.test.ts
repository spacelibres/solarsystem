import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { describe, expect, it } from 'vitest';
import { parseDyn, type DynPoint, type OrbPoint, type PointType } from '../src/lib/dynamo/parse';
import type { Quat, Vec3 } from '../src/lib/dynamo/math';
import { evaluateEphemeris, type EphemerisWindow } from '../src/solar/domain/ephemeris';

const zero = { x: 0, y: 0, z: 0 };
const identity = { ...zero, w: 1 };
function windowOf(points: DynPoint[], interval = { min: points[0].time, max: points.at(-1)!.time }): EphemerisWindow {
  return { header: { version: 2, name: points[0].kind, pointType: points[0].kind, numberOfDigits: 0, gravitationalParameter1: 2, gravitationalParameter2: 6 }, points, interval, source: { path: 'synthetic', segment: null } };
}
function orbit(time: number, overrides: Partial<OrbPoint> = {}): OrbPoint {
  return { kind: 'orb', time, semiMajorAxis: 10, eccentricity: 0, meanAngularMotion: 0.1, meanAnomalyAtEpoch: time * 0.1, orientation: identity, ...overrides };
}
function closeVector(actual: Vec3, expected: Vec3, tolerance = 1e-10) {
  for (const key of ['x', 'y', 'z'] as const) expect(Math.abs(actual[key] - expected[key])).toBeLessThanOrEqual(tolerance * Math.max(1, Math.abs(expected[key])));
}
function closeQuaternion(actual: Quat, expected: Quat) {
  const dot = actual.w * expected.w + actual.x * expected.x + actual.y * expected.y + actual.z * expected.z;
  const sign = dot < 0 ? -1 : 1;
  for (const key of ['w', 'x', 'y', 'z'] as const) expect(actual[key]).toBeCloseTo(sign * expected[key], 10);
}

// Load the actual pure recovered bodies, never their browser module graph.
interface ReferencePoint {
  time: number; position: Vec3; velocity: Vec3; orientation: Quat; angularVelocity: Vec3;
  oe: Record<string, unknown>;
  calculate(points: ReferencePoint[], time: number, header: object, incremental: boolean): void;
}
const referenceApi: Record<string, unknown> = { THREE: { Quaternion: class {}, Vector3: class {} }, BaseController: class {} };
function loadReference(relative: string, names: string[]) {
  const body = readFileSync(`eyes/src/engine/${relative}.js`, 'utf8').replace(/^import .*;$/gm, '').replace(/^export .*;$/gm, '');
  return runInNewContext(`${body}\n({${names.join(',')}})`, { PioneerPublicApi: referenceApi }) as Record<string, unknown>;
}
for (const name of ['Pool', 'MathUtils', 'Vector3', 'Quaternion', 'OrbitalElements']) Object.assign(referenceApi, loadReference(`core/${name}`, [name]));
const pointNames = ['PosPoint', 'LinPoint', 'QuatPoint', 'OriPoint', 'OrbPoint'];
const referenceClasses = loadReference('controllers/DynamoController', pointNames) as Record<string, new () => ReferencePoint>;
const vectorConstructor = referenceApi.Vector3 as new (x: number, y: number, z: number) => Vec3;
const quaternionConstructor = referenceApi.Quaternion as new (w: number, x: number, y: number, z: number) => Quat;
function reference(window: EphemerisWindow, time: number, body?: 1 | 2) {
  const names: Record<PointType, string> = { pos: 'PosPoint', lin: 'LinPoint', quat: 'QuatPoint', ori: 'OriPoint', orb: 'OrbPoint' };
  const Constructor = referenceClasses[names[window.header.pointType]];
  let index = 0;
  while (index + 2 < window.points.length && window.points[index + 1].time <= time) index++;
  const samples = window.points.slice(index, index + 2).map(point => {
    const result = new Constructor();
    result.time = point.time;
    if ('position' in point) result.position = new vectorConstructor(point.position.x, point.position.y, point.position.z);
    if ('velocity' in point) result.velocity = new vectorConstructor(point.velocity.x, point.velocity.y, point.velocity.z);
    if ('angularVelocity' in point) result.angularVelocity = new vectorConstructor(point.angularVelocity.x, point.angularVelocity.y, point.angularVelocity.z);
    if ('orientation' in point) {
      const q = point.orientation;
      const orientation = new quaternionConstructor(q.w, q.x, q.y, q.z);
      if (point.kind === 'orb') Object.assign(result.oe, point, { epoch: point.time, orientation });
      else result.orientation = orientation;
    }
    return result;
  });
  const result = new Constructor();
  result.calculate(samples, time, { ...window.header, body }, false);
  return result;
}
function compareReference(window: EphemerisWindow, time: number, body?: 1 | 2) {
  const expected = reference(window, time, body);
  const actual = evaluateEphemeris(window, time, { body });
  expect(actual.status).toBe('ready');
  if (actual.status !== 'ready') throw new Error(actual.reason);
  if (actual.kind === 'position') { closeVector(actual.position, expected.position); closeVector(actual.velocity, expected.velocity); }
  else { closeQuaternion(actual.orientation, expected.orientation); closeVector(actual.angularVelocity, expected.angularVelocity); }
}

describe('independent ephemeris', () => {
  it('evaluates Hermite position and the time derivative, including endpoint velocities', () => {
    const window = windowOf([{ kind: 'pos', time: 0, position: zero, velocity: { x: 1, y: 2, z: -1 } }, { kind: 'pos', time: 10, position: { x: 30, y: -10, z: 50 }, velocity: { x: 5, y: 0, z: 2 } }]);
    expect(evaluateEphemeris(window, 5)).toMatchObject({ position: { x: 10 }, velocity: { x: 3 } });
    for (const time of [0, 1, 5, 10]) compareReference(window, time);
    const epsilon = 1e-4;
    const before = evaluateEphemeris(window, 5 - epsilon), after = evaluateEphemeris(window, 5 + epsilon), middle = evaluateEphemeris(window, 5);
    if (before.status === 'ready' && before.kind === 'position' && after.status === 'ready' && after.kind === 'position' && middle.status === 'ready' && middle.kind === 'position') closeVector({ x: (after.position.x - before.position.x) / (2 * epsilon), y: (after.position.y - before.position.y) / (2 * epsilon), z: (after.position.z - before.position.z) / (2 * epsilon) }, middle.velocity, 1e-8);
  });
  it('uses linear position and secant velocity at both boundaries and selects the next bracket', () => {
    const window = windowOf([0, 10, 20].map(time => ({ kind: 'lin', time, position: { x: time * time, y: 0, z: 0 } })));
    for (const time of [0, 5, 10, 20]) compareReference(window, time);
    expect(evaluateEphemeris(window, 10)).toMatchObject({ position: { x: 100 }, velocity: { x: 30 } });
  });
  it('SLERPs antipodal quaternions on the short path, normalizes and reports zero angular velocity', () => {
    const window = windowOf([{ kind: 'quat', time: 0, orientation: { ...zero, w: 2 } }, { kind: 'quat', time: 10, orientation: { ...zero, w: -3 } }]);
    const result = evaluateEphemeris(window, 5);
    expect(result).toMatchObject({ status: 'ready', kind: 'orientation', angularVelocity: zero });
    if (result.status === 'ready' && result.kind === 'orientation') expect(Math.abs(result.orientation.w)).toBe(1);
    const quarterTurn = windowOf([{ kind: 'quat', time: 0, orientation: identity }, { kind: 'quat', time: 10, orientation: { x: 0, y: 0, z: -Math.SQRT1_2, w: -Math.SQRT1_2 } }]);
    for (const time of [0, 3, 10]) compareReference(quarterTurn, time);
  });
  it('projects both ori endpoints using inverse right multiplication, then rotates negated vector SLERP', () => {
    const window = windowOf([{ kind: 'ori', time: 0, orientation: { x: Math.SQRT1_2, y: 0, z: 0, w: Math.SQRT1_2 }, angularVelocity: { x: 0, y: 0, z: 0.2 } }, { kind: 'ori', time: 10, orientation: { x: 0, y: Math.SQRT1_2, z: 0, w: Math.SQRT1_2 }, angularVelocity: { x: 0.3, y: 0.1, z: 0 } }]);
    for (const time of [0, 2, 5, 9, 10]) compareReference(window, time);
    const stationary = windowOf([{ kind: 'ori', time: 0, orientation: identity, angularVelocity: zero }, { kind: 'ori', time: 10, orientation: identity, angularVelocity: zero }]);
    compareReference(stationary, 5);
  });
  it('projects both distinct orbital states before mixing and scales both velocity and position by body mass', () => {
    const window = windowOf([orbit(0), orbit(10, { semiMajorAxis: 20, eccentricity: 0.3, meanAngularMotion: 0.2, orientation: { x: 0, y: 0, z: Math.SQRT1_2, w: Math.SQRT1_2 } })]);
    for (const body of [undefined, 1, 2] as const) for (const time of [0, 3, 5, 10]) compareReference(window, time, body);
    const circular = evaluateEphemeris(windowOf([orbit(0), orbit(10)]), 0, { body: 2 });
    expect(circular).toMatchObject({ position: { x: -2.5 }, velocity: { y: -0.25 } });
  });
  it('supports source positive-a hyperbolas and high eccentricity ellipses', () => {
    for (const eccentricity of [0.9, 0.999, 1.1, 1.4, 2]) {
      const window = windowOf([orbit(0, { eccentricity, meanAnomalyAtEpoch: -0.4 }), orbit(10, { eccentricity, meanAnomalyAtEpoch: 0.6 })]);
      for (const time of [0, 2, 4, 9, 10]) compareReference(window, time);
    }
  });
  it('rejects unsupported parabolas, negative axes and nonconvergent or overflowing orbits explicitly', () => {
    for (const overrides of [{ eccentricity: 1 }, { semiMajorAxis: -10 }, { meanAnomalyAtEpoch: 1e308, eccentricity: 2 }, { meanAnomalyAtEpoch: 1e20, eccentricity: 1e10 }]) expect(evaluateEphemeris(windowOf([orbit(0, overrides), orbit(10, overrides)]), 5)).toEqual({ status: 'unavailable', reason: 'unsupported-orbit' });
  });
  it('rejects missing, unordered, duplicate, mixed, nonfinite and zero-quaternion samples', () => {
    const good = windowOf([orbit(0), orbit(10)]);
    for (const points of [[], [orbit(0)], [orbit(10), orbit(0)], [orbit(0), orbit(0)], [orbit(0), orbit(10, { meanAngularMotion: NaN })], [orbit(0), { kind: 'lin', time: 10, position: zero }], [orbit(0), orbit(10, { orientation: { ...zero, w: 0 } })]] as DynPoint[][]) expect(evaluateEphemeris({ ...good, points }, 5)).toEqual({ status: 'unavailable', reason: 'invalid-samples' });
    expect(evaluateEphemeris(good, NaN)).toEqual({ status: 'unavailable', reason: 'invalid-samples' });
  });
  it('does not extrapolate beyond either actual coverage or sample bounds and does not mutate samples', () => {
    const window = windowOf([orbit(0), orbit(10)], { min: 2, max: 8 });
    const copy = structuredClone(window);
    for (const time of [1, 9, -1, 11]) expect(evaluateEphemeris(window, time)).toEqual({ status: 'unavailable', reason: 'out-of-range' });
    const expanded = { ...window, interval: { min: -10, max: 20 } };
    expect(evaluateEphemeris(expanded, -1)).toEqual({ status: 'unavailable', reason: 'out-of-range' });
    compareReference(window, 5);
    expect(window).toEqual(copy);
  });
  it('keeps opposite angular directions finite with the documented linear degeneracy policy', () => {
    const window = windowOf([{ kind: 'ori', time: 0, orientation: identity, angularVelocity: { x: 1, y: 0, z: 0 } }, { kind: 'ori', time: 10, orientation: identity, angularVelocity: { x: -1, y: 0, z: 0 } }]);
    expect(evaluateEphemeris(window, 5)).toMatchObject({ status: 'ready', angularVelocity: zero });
  });
  it('normalizes subnormal and huge finite quaternions without changing their rotation', () => {
    for (const component of [Number.MIN_VALUE, 1e308, Number.MAX_VALUE]) {
      const orientation = { w: component, x: 0, y: 0, z: component };
      const result = evaluateEphemeris(windowOf([orbit(0, { orientation }), orbit(10, { orientation })]), 0);
      expect(result.status).toBe('ready');
      if (result.status === 'ready' && result.kind === 'position') closeVector(result.position, { x: 0, y: 10, z: 0 });
      const rotation = evaluateEphemeris(windowOf([{ kind: 'quat', time: 0, orientation }, { kind: 'quat', time: 10, orientation }]), 5);
      expect(rotation.status).toBe('ready');
      if (rotation.status === 'ready' && rotation.kind === 'orientation') closeQuaternion(rotation.orientation, { w: Math.SQRT1_2, x: 0, y: 0, z: Math.SQRT1_2 });
    }
  });
  it('preserves finite subnormal angular velocity without reciprocal overflow', () => {
    const angularVelocity = { x: 1e-310, y: 0, z: 0 };
    const window = windowOf([{ kind: 'ori', time: 0, orientation: identity, angularVelocity }, { kind: 'ori', time: 10, orientation: identity, angularVelocity }]);
    const result = evaluateEphemeris(window, 5);
    expect(result.status).toBe('ready');
    if (result.status === 'ready' && result.kind === 'orientation') expect(Math.abs(result.angularVelocity.x + 1e-310)).toBeLessThanOrEqual(2 * Number.MIN_VALUE);
  });
  it('rejects invalid mass ratios and arithmetic overflow without emitting a ready NaN', () => {
    const window = windowOf([orbit(0), orbit(10)]);
    for (const gravitationalParameter1 of [-1, Infinity, NaN]) expect(evaluateEphemeris({ ...window, header: { ...window.header, gravitationalParameter1 } }, 5, { body: 1 })).toEqual({ status: 'unavailable', reason: 'invalid-samples' });
    expect(evaluateEphemeris({ ...window, header: { ...window.header, gravitationalParameter1: 0, gravitationalParameter2: 0 } }, 5, { body: 2 })).toEqual({ status: 'unavailable', reason: 'invalid-samples' });
    const overflow = windowOf([{ kind: 'lin', time: 0, position: { x: -1e308, y: 0, z: 0 } }, { kind: 'lin', time: 10, position: { x: 1e308, y: 0, z: 0 } }]);
    expect(evaluateEphemeris(overflow, 5)).toEqual({ status: 'unavailable', reason: 'invalid-samples' });
  });
  it.each(['earth-sun-orb.dyn', 'mercury-sun-orb.dyn', 'jupiter-sun-orb.dyn', 'earth-ori.dyn'])('matches the actual recovered evaluator on real %s samples, velocities and rotations', filename => {
    const file = parseDyn(readFileSync(`tests/fixtures/${filename}`));
    const window: EphemerisWindow = { header: file.header, points: file.points, interval: file.interval!, source: { path: filename, segment: null } };
    for (const index of [0, 1, Math.floor((file.points.length - 2) / 2), file.points.length - 2]) {
      const start = file.points[index].time, end = file.points[index + 1].time;
      for (const fraction of [0, 0.13, 0.5, 0.91, 1]) compareReference(window, start + fraction * (end - start), 1);
    }
  });
});
