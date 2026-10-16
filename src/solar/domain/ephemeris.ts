import { rotateByQuat, type Quat, type Vec3 } from '../../lib/dynamo/math';
import type { DynHeader, DynPoint, OrbPoint, OriPoint } from '../../lib/dynamo/parse';

export type { Quat, Vec3 } from '../../lib/dynamo/math';

export interface EphemerisWindow {
  readonly header: DynHeader;
  readonly points: readonly DynPoint[];
  readonly interval: { readonly min: number; readonly max: number };
  readonly source: { readonly path: string; readonly segment: string | null };
}

export type EphemerisState =
  | { readonly status: 'ready'; readonly kind: 'position'; readonly position: Vec3; readonly velocity: Vec3 }
  | { readonly status: 'ready'; readonly kind: 'orientation'; readonly orientation: Quat; readonly angularVelocity: Vec3 }
  | { readonly status: 'unavailable'; readonly reason: 'out-of-range' | 'invalid-samples' | 'unsupported-orbit' };

const zero = (): Vec3 => ({ x: 0, y: 0, z: 0 });
const finiteVector = (value: Vec3): boolean => Number.isFinite(value.x) && Number.isFinite(value.y) && Number.isFinite(value.z);
const quaternionMagnitude = (value: Quat): number => Math.hypot(value.w, value.x, value.y, value.z);
const quaternionScale = (value: Quat): number => Math.max(Math.abs(value.w), Math.abs(value.x), Math.abs(value.y), Math.abs(value.z));
const scale = (value: Vec3, factor: number): Vec3 => ({ x: value.x * factor, y: value.y * factor, z: value.z * factor });
const mix = (start: Vec3, end: Vec3, fraction: number): Vec3 => ({ x: (1 - fraction) * start.x + fraction * end.x, y: (1 - fraction) * start.y + fraction * end.y, z: (1 - fraction) * start.z + fraction * end.z });
const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));
const unavailable = (reason: Extract<EphemerisState, { status: 'unavailable' }>['reason']): EphemerisState => ({ status: 'unavailable', reason });

function normalize(value: Quat): Quat {
  // Divide before measuring length: both subnormal rounding and overflowing norms
  // otherwise change the rotation represented by finite nonzero components.
  const maximum = quaternionScale(value);
  const scaled = { w: value.w / maximum, x: value.x / maximum, y: value.y / maximum, z: value.z / maximum };
  const length = quaternionMagnitude(scaled);
  return { w: scaled.w / length, x: scaled.x / length, y: scaled.y / length, z: scaled.z / length };
}

function direction(value: Vec3): Vec3 {
  const maximum = Math.max(Math.abs(value.x), Math.abs(value.y), Math.abs(value.z));
  const scaled = { x: value.x / maximum, y: value.y / maximum, z: value.z / maximum };
  const length = Math.hypot(scaled.x, scaled.y, scaled.z);
  return { x: scaled.x / length, y: scaled.y / length, z: scaled.z / length };
}

function slerp(start: Quat, end: Quat, fraction: number): Quat {
  const first = normalize(start), last = normalize(end);
  const dot = first.w * last.w + first.x * last.x + first.y * last.y + first.z * last.z;
  const sign = dot < 0 ? -1 : 1;
  const angle = Math.acos(clamp(Math.abs(dot), 0, 1));
  const spherical = Math.abs(dot) <= 0.9995;
  const startWeight = sign * (spherical ? Math.sin((1 - fraction) * angle) / Math.sin(angle) : 1 - fraction);
  const endWeight = spherical ? Math.sin(fraction * angle) / Math.sin(angle) : fraction;
  return normalize({ w: startWeight * first.w + endWeight * last.w, x: startWeight * first.x + endWeight * last.x, y: startWeight * first.y + endWeight * last.y, z: startWeight * first.z + endWeight * last.z });
}

function projectOrientation(point: OriPoint, time: number): Quat {
  const first = normalize(point.orientation);
  const magnitude = Math.hypot(point.angularVelocity.x, point.angularVelocity.y, point.angularVelocity.z);
  if (magnitude === 0) return first;
  const halfAngle = magnitude * (time - point.time) / 2;
  const vector = scale(direction(point.angularVelocity), -Math.sin(halfAngle));
  const scalar = Math.cos(halfAngle);
  // Source multInverseR is q * conjugate(delta), with angular velocity in q's local frame.
  return normalize({
    w: first.w * scalar - first.x * vector.x - first.y * vector.y - first.z * vector.z,
    x: first.w * vector.x + first.x * scalar + first.y * vector.z - first.z * vector.y,
    y: first.w * vector.y - first.x * vector.z + first.y * scalar + first.z * vector.x,
    z: first.w * vector.z + first.x * vector.y - first.y * vector.x + first.z * scalar,
  });
}

function slerpVector(start: Vec3, end: Vec3, fraction: number): Vec3 {
  const firstLength = Math.hypot(start.x, start.y, start.z), lastLength = Math.hypot(end.x, end.y, end.z);
  if (firstLength === 0 || lastLength === 0) return mix(start, end, fraction);
  const first = direction(start), last = direction(end);
  const cosine = clamp(first.x * last.x + first.y * last.y + first.z * last.z, -1, 1);
  const angle = Math.acos(cosine);
  // Exactly opposite directions have no unique great circle; use the finite linear limit.
  if (angle <= 0.01745327777 || cosine < -1 + 1e-12) return mix(start, end, fraction);
  const weightStart = Math.sin((1 - fraction) * angle) / Math.sin(angle);
  const weightEnd = Math.sin(fraction * angle) / Math.sin(angle);
  const length = (1 - fraction) * firstLength + fraction * lastLength;
  return { x: (first.x * weightStart + last.x * weightEnd) * length, y: (first.y * weightStart + last.y * weightEnd) * length, z: (first.z * weightStart + last.z * weightEnd) * length };
}

function validSample(point: DynPoint): boolean {
  if (!Number.isFinite(point.time)) return false;
  if ('position' in point && !finiteVector(point.position)) return false;
  if ('velocity' in point && !finiteVector(point.velocity)) return false;
  if ('angularVelocity' in point && !finiteVector(point.angularVelocity)) return false;
  if ('orientation' in point) {
    const maximum = quaternionScale(point.orientation);
    if (!Number.isFinite(maximum) || maximum === 0) return false;
  }
  return point.kind !== 'orb' || [point.semiMajorAxis, point.eccentricity, point.meanAngularMotion, point.meanAnomalyAtEpoch].every(Number.isFinite);
}

function projectOrbit(point: OrbPoint, time: number): { position: Vec3; velocity: Vec3 } | null {
  const { eccentricity, semiMajorAxis, meanAngularMotion } = point;
  if (semiMajorAxis <= 0 || eccentricity < 0 || eccentricity === 1) return null;
  const ellipse = eccentricity < 1;
  let mean = point.meanAnomalyAtEpoch + meanAngularMotion * (time - point.time);
  if (ellipse) {
    mean = (mean + Math.PI) % (2 * Math.PI) - Math.PI;
    if (mean < -Math.PI) mean += 2 * Math.PI;
  }
  let anomaly = ellipse ? (eccentricity >= 0.8 ? Math.sign(mean) * Math.PI : mean) : Math.log(2 * Math.abs(mean) / Math.E + 1.8) * (mean < 0 ? -1 : 1);
  let converged = false;
  // Retain the recovered solver's threshold for source differential compatibility.
  for (let iteration = 0; iteration < 20; iteration++) {
    const correction = ellipse
      ? (anomaly - eccentricity * Math.sin(anomaly) - mean) / (eccentricity * Math.cos(anomaly) - 1)
      : (anomaly - eccentricity * Math.sinh(anomaly) + mean) / (eccentricity * Math.cosh(anomaly) - 1);
    anomaly += correction;
    if (!Number.isFinite(anomaly)) return null;
    if (Math.abs(correction) < 0.00174532925) { converged = true; break; }
  }
  if (!converged) return null;
  const cosine = ellipse ? Math.cos(anomaly) : Math.cosh(anomaly);
  const sine = ellipse ? Math.sin(anomaly) : Math.sinh(anomaly);
  const minorRatio = Math.sqrt(ellipse ? 1 - eccentricity * eccentricity : eccentricity * eccentricity - 1);
  // The recovered hyperbolic convention stores a positive semi-major-axis magnitude.
  const radius = (ellipse ? 1 : -1) * semiMajorAxis * (1 - eccentricity * cosine);
  const velocityScale = meanAngularMotion * semiMajorAxis * semiMajorAxis / radius;
  const orientation = normalize(point.orientation);
  const position = rotateByQuat({ x: semiMajorAxis * (ellipse ? cosine - eccentricity : eccentricity - cosine), y: semiMajorAxis * minorRatio * sine, z: 0 }, orientation);
  const velocity = rotateByQuat({ x: -velocityScale * sine, y: velocityScale * minorRatio * cosine, z: 0 }, orientation);
  return finiteVector(position) && finiteVector(velocity) ? { position, velocity } : null;
}

export function evaluateEphemeris(window: EphemerisWindow, timeEt: number, options?: { readonly body?: 1 | 2 }): EphemerisState {
  const { points, interval, header } = window;
  if (!Number.isFinite(timeEt) || !Number.isFinite(interval.min) || !Number.isFinite(interval.max) || interval.min > interval.max || points.length < 2) return unavailable('invalid-samples');
  for (let index = 0; index < points.length; index++) {
    const point = points[index];
    if (point.kind !== header.pointType || !validSample(point) || (index > 0 && point.time <= points[index - 1].time)) return unavailable('invalid-samples');
  }
  if (timeEt < interval.min || timeEt > interval.max || timeEt < points[0].time || timeEt > points[points.length - 1].time) return unavailable('out-of-range');
  let lower = 0, upper = points.length - 2;
  while (lower < upper) {
    const middle = Math.ceil((lower + upper) / 2);
    if (points[middle].time <= timeEt) lower = middle;
    else upper = middle - 1;
  }
  const start = points[lower], end = points[lower + 1];
  const duration = end.time - start.time;
  if (!Number.isFinite(duration)) return unavailable('invalid-samples');
  const fraction = clamp((timeEt - start.time) / duration, 0, 1);
  let result: EphemerisState;
  if (start.kind === 'pos' && end.kind === 'pos') {
    const remaining = 1 - fraction, square = fraction * fraction;
    const position = zero(), velocity = zero();
    for (const axis of ['x', 'y', 'z'] as const) {
      position[axis] = (1 + 2 * fraction) * remaining * remaining * start.position[axis] + duration * fraction * remaining * remaining * start.velocity[axis] + square * (3 - 2 * fraction) * end.position[axis] - duration * square * remaining * end.velocity[axis];
      velocity[axis] = 6 * (square - fraction) / duration * start.position[axis] + (3 * square - 4 * fraction + 1) * start.velocity[axis] - 6 * (square - fraction) / duration * end.position[axis] + (3 * square - 2 * fraction) * end.velocity[axis];
    }
    result = { status: 'ready', kind: 'position', position, velocity };
  } else if (start.kind === 'lin' && end.kind === 'lin') {
    const velocity = { x: (end.position.x - start.position.x) / duration, y: (end.position.y - start.position.y) / duration, z: (end.position.z - start.position.z) / duration };
    result = { status: 'ready', kind: 'position', position: mix(start.position, end.position, fraction), velocity };
  } else if (start.kind === 'quat' && end.kind === 'quat') {
    result = { status: 'ready', kind: 'orientation', orientation: slerp(start.orientation, end.orientation, fraction), angularVelocity: zero() };
  } else if (start.kind === 'ori' && end.kind === 'ori') {
    const orientation = slerp(projectOrientation(start, timeEt), projectOrientation(end, timeEt), fraction);
    const angularVelocity = rotateByQuat(scale(slerpVector(start.angularVelocity, end.angularVelocity, fraction), -1), orientation);
    result = { status: 'ready', kind: 'orientation', orientation, angularVelocity };
  } else if (start.kind === 'orb' && end.kind === 'orb') {
    const first = projectOrbit(start, timeEt), last = projectOrbit(end, timeEt);
    if (!first || !last) return unavailable('unsupported-orbit');
    let factor = 1;
    if (options?.body) {
      const firstMass = header.gravitationalParameter1 ?? (options.body === 1 ? 0 : 1);
      const lastMass = header.gravitationalParameter2 ?? (options.body === 1 ? 1 : 0);
      if (!Number.isFinite(firstMass) || !Number.isFinite(lastMass) || firstMass < 0 || lastMass < 0 || !Number.isFinite(firstMass + lastMass) || firstMass + lastMass === 0) return unavailable('invalid-samples');
      factor = options.body === 1 ? lastMass / (firstMass + lastMass) : -firstMass / (firstMass + lastMass);
    }
    result = { status: 'ready', kind: 'position', position: scale(mix(first.position, last.position, fraction), factor), velocity: scale(mix(first.velocity, last.velocity, fraction), factor) };
  } else return unavailable('invalid-samples');
  const finite = result.kind === 'position' ? finiteVector(result.position) && finiteVector(result.velocity) : Number.isFinite(quaternionMagnitude(result.orientation)) && finiteVector(result.angularVelocity);
  return finite ? result : unavailable('invalid-samples');
}
