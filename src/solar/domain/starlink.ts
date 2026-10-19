/**
 * Two-body display propagation for Starlink epoch states.
 *
 * The catalogue stores one state vector from each public Starlink OCM file
 * (already rotated from ITRF2000 into an inertial frame). Solving the orbit
 * from that state is enough to draw a stable orbit ring and move the marker;
 * it is a visualization approximation, not a conjunction-grade propagator.
 */

import type { Vec3 } from '../../lib/dynamo/math';
import { unixMillisecondsToEt } from './time';

export interface StarlinkOrbit {
  readonly n: number;
  readonly name: string;
  /** Epoch as Unix seconds. */
  readonly e: number;
  readonly p: readonly [number, number, number];
  readonly v: readonly [number, number, number];
}

export interface StarlinkElements {
  readonly epochEt: number;
  readonly semiMajorAxisKm: number;
  readonly eccentricity: number;
  readonly meanAnomaly: number;
  readonly meanMotion: number;
  readonly basisP: Vec3;
  readonly basisQ: Vec3;
  readonly periodSeconds: number;
}

export const EARTH_MU_KM3_S2 = 398600.4418;

const dot = (a: Vec3, b: Vec3) => a.x * b.x + a.y * b.y + a.z * b.z;
const add = (a: Vec3, b: Vec3, scale = 1): Vec3 => ({ x: a.x + b.x * scale, y: a.y + b.y * scale, z: a.z + b.z * scale });
const scale = (v: Vec3, s: number): Vec3 => ({ x: v.x * s, y: v.y * s, z: v.z * s });
const cross = (a: Vec3, b: Vec3): Vec3 => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x,
});
const length = (v: Vec3) => Math.hypot(v.x, v.y, v.z);

/** Derive classical elements plus a perifocal basis from an inertial state. */
export function elementsFromState(orbit: StarlinkOrbit): StarlinkElements | null {
  const p = { x: orbit.p[0], y: orbit.p[1], z: orbit.p[2] };
  const v = { x: orbit.v[0], y: orbit.v[1], z: orbit.v[2] };
  const r = length(p);
  const speedSquared = dot(v, v);
  if (!Number.isFinite(r) || r <= 0 || !Number.isFinite(speedSquared)) return null;
  const semiMajorAxis = 1 / (2 / r - speedSquared / EARTH_MU_KM3_S2);
  if (!Number.isFinite(semiMajorAxis) || semiMajorAxis <= 0) return null;
  const eccentricityVector = scale(add(scale(p, speedSquared - EARTH_MU_KM3_S2 / r), v, -dot(p, v)), 1 / EARTH_MU_KM3_S2);
  const eccentricity = length(eccentricityVector);
  if (!Number.isFinite(eccentricity) || eccentricity >= 1) return null;
  const angularMomentum = cross(p, v);
  const basisP = scale(eccentricityVector, 1 / Math.max(eccentricity, 1e-9));
  const basisQ = scale(cross(angularMomentum, basisP), 1 / Math.max(length(angularMomentum), 1e-9));
  if (!Number.isFinite(basisP.x) || !Number.isFinite(basisQ.x)) return null;
  const trueAnomaly = Math.atan2(dot(p, basisQ), dot(p, basisP));
  const eccentricAnomaly = 2 * Math.atan(Math.sqrt((1 - eccentricity) / (1 + eccentricity)) * Math.tan(trueAnomaly / 2));
  const meanAnomaly = eccentricAnomaly - eccentricity * Math.sin(eccentricAnomaly);
  const meanMotion = Math.sqrt(EARTH_MU_KM3_S2 / (semiMajorAxis ** 3));
  return {
    epochEt: unixMillisecondsToEt(orbit.e * 1000),
    semiMajorAxisKm: semiMajorAxis,
    eccentricity,
    meanAnomaly,
    meanMotion,
    basisP,
    basisQ,
    periodSeconds: (2 * Math.PI) / meanMotion,
  };
}

function solveKepler(meanAnomaly: number, eccentricity: number): number {
  let eccentricAnomaly = eccentricity < 0.8 ? meanAnomaly : Math.PI;
  for (let iteration = 0; iteration < 8; iteration += 1) {
    const residual = eccentricAnomaly - eccentricity * Math.sin(eccentricAnomaly) - meanAnomaly;
    const derivative = 1 - eccentricity * Math.cos(eccentricAnomaly);
    eccentricAnomaly -= residual / derivative;
  }
  return eccentricAnomaly;
}

export function starlinkPosition(elements: StarlinkElements, timeEt: number): Vec3 {
  const elapsed = timeEt - elements.epochEt;
  const meanAnomaly = elements.meanAnomaly + elements.meanMotion * elapsed;
  const eccentricAnomaly = solveKepler(meanAnomaly, elements.eccentricity);
  const trueAnomaly = 2 * Math.atan2(
    Math.sqrt(1 + elements.eccentricity) * Math.sin(eccentricAnomaly / 2),
    Math.sqrt(1 - elements.eccentricity) * Math.cos(eccentricAnomaly / 2),
  );
  const radius = elements.semiMajorAxisKm * (1 - elements.eccentricity * Math.cos(eccentricAnomaly));
  return {
    x: radius * (Math.cos(trueAnomaly) * elements.basisP.x + Math.sin(trueAnomaly) * elements.basisQ.x),
    y: radius * (Math.cos(trueAnomaly) * elements.basisP.y + Math.sin(trueAnomaly) * elements.basisQ.y),
    z: radius * (Math.cos(trueAnomaly) * elements.basisP.z + Math.sin(trueAnomaly) * elements.basisQ.z),
  };
}

/** Closed orbit ring in Earth-centred inertial coordinates (km). */
export function starlinkOrbitRing(elements: StarlinkElements, segments = 48): Float32Array {
  const positions = new Float32Array(segments * 3);
  for (let index = 0; index < segments; index += 1) {
    const trueAnomaly = (index / segments) * 2 * Math.PI;
    const radius = elements.semiMajorAxisKm * (1 - elements.eccentricity ** 2) / (1 + elements.eccentricity * Math.cos(trueAnomaly));
    positions[index * 3] = radius * (Math.cos(trueAnomaly) * elements.basisP.x + Math.sin(trueAnomaly) * elements.basisQ.x);
    positions[index * 3 + 1] = radius * (Math.cos(trueAnomaly) * elements.basisP.y + Math.sin(trueAnomaly) * elements.basisQ.y);
    positions[index * 3 + 2] = radius * (Math.cos(trueAnomaly) * elements.basisP.z + Math.sin(trueAnomaly) * elements.basisQ.z);
  }
  return positions;
}

export function starlinkPeriodMinutes(elements: StarlinkElements): number {
  return elements.periodSeconds / 60;
}
