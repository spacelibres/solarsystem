import { orbPositionAt } from '../../lib/dynamo/orbit';
import type { DynHeader, OrbPoint } from '../../lib/dynamo/parse';
import type { Vec3 } from '../../lib/dynamo/math';
import { evaluateEphemeris, type EphemerisWindow } from './ephemeris';
/** Eyes OrbitLineComponent reconstructs the ellipse from the current state,
 * not the nearest coarse data epoch. Coordinates remain parent-relative.
 */
export function osculatingPolyline(position: Vec3, velocity: Vec3, mu: number, samples = 360): readonly Vec3[] {
    validateSamples(samples);
    const cross = (a: Vec3,b: Vec3): Vec3 => ({x:a.y*b.z-a.z*b.y,y:a.z*b.x-a.x*b.z,z:a.x*b.y-a.y*b.x});
    const length = (v: Vec3) => Math.hypot(v.x,v.y,v.z);
    const scale = (v: Vec3,s: number): Vec3 => ({x:v.x*s,y:v.y*s,z:v.z*s});
    const radius=length(position), momentum=cross(position,velocity), h=length(momentum);
    if (!(mu>0) || !Number.isFinite(mu) || !(radius>0) || !(h>0)) return [];
    const e0=scale(cross(velocity,momentum),1/mu);
    const eVector={x:e0.x-position.x/radius,y:e0.y-position.y/radius,z:e0.z-position.z/radius};
    const eccentricity=length(eVector), semilatus=h*h/mu;
    if (!(eccentricity<1)) return [];
    const first=scale(eccentricity>1e-12?eVector:position,1/(eccentricity>1e-12?eccentricity:radius));
    const second=cross(scale(momentum,1/h),first);
    const anomaly=Math.atan2(position.x*second.x+position.y*second.y+position.z*second.z,position.x*first.x+position.y*first.y+position.z*first.z);
    const points=Array.from({length:samples},(_,i)=>{
        const angle=2*Math.PI*i/samples, distance=semilatus/(1+eccentricity*Math.cos(angle));
        return {x:distance*(first.x*Math.cos(angle)+second.x*Math.sin(angle)),y:distance*(first.y*Math.cos(angle)+second.y*Math.sin(angle)),z:distance*(first.z*Math.cos(angle)+second.z*Math.sin(angle))};
    });
    const index=Math.round((anomaly+2*Math.PI)%(2*Math.PI)*samples/(2*Math.PI))%samples;
    points[index]={...position};
    return [...points,{...points[0]}];
}
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
