import { orbPositionAt } from '../../lib/dynamo/orbit';
import type { DynHeader, OrbPoint } from '../../lib/dynamo/parse';
import type { Vec3 } from '../../lib/dynamo/math';
import { evaluateEphemeris, type EphemerisWindow } from './ephemeris';
function validateSamples(samples: number): void {
    if (!Number.isSafeInteger(samples) || samples < 4 || samples > 2048)
        throw new RangeError('Trajectory samples must be in [4, 2048]');
}
/** A complete instantaneous osculating ellipse, using the actual dynamo elements. */
export function orbitPolyline(point: OrbPoint, samples = 192): readonly Vec3[] {
    validateSamples(samples);
    if (!(point.eccentricity >= 0 && point.eccentricity < 1) || !Number.isFinite(point.meanAngularMotion) || point.meanAngularMotion === 0 || !Number.isFinite(point.semiMajorAxis) || point.semiMajorAxis <= 0)
        throw new RangeError('A finite elliptical orbit is required');
    const period = 2 * Math.PI / Math.abs(point.meanAngularMotion);
    return Array.from({ length: samples + 1 }, (_, index) => orbPositionAt(point, point.time + period * index / samples));
}
/** A trajectory is clipped to the fetched interval; no fabricated positions outside coverage. */
export function sampledPolyline(window: EphemerisWindow, start: number, end: number, samples = 96): readonly Vec3[] {
    validateSamples(samples);
    const min = Math.max(start, window.interval.min), max = Math.min(end, window.interval.max);
    if (!Number.isFinite(min) || !Number.isFinite(max) || max <= min)
        return [];
    const positions: Vec3[] = [];
    for (let index = 0; index <= samples; index++) {
        const state = evaluateEphemeris(window, min + (max - min) * index / samples);
        if (state.status !== 'ready' || state.kind !== 'position')
            return [];
        positions.push(state.position);
    }
    return positions;
}
/** Match evaluateEphemeris: an absent body selector is the original relative orbit. */
export function orbitalBodyFactor(header: Pick<DynHeader, 'gravitationalParameter1' | 'gravitationalParameter2'>, body?: 1 | 2): number {
    if (body === undefined)
        return 1;
    const first = header.gravitationalParameter1 ?? (body === 1 ? 0 : 1);
    const second = header.gravitationalParameter2 ?? (body === 1 ? 1 : 0);
    if (!Number.isFinite(first + second) || first + second === 0)
        throw new RangeError('Invalid barycentric mass sum');
    return body === 1 ? second / (first + second) : -first / (first + second);
}
