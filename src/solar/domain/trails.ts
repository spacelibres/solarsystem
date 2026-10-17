import { evaluateEphemeris, type EphemerisWindow, type Vec3 } from './ephemeris';

export interface SourceTrailOptions {
    readonly length?: number;
    readonly color?: readonly [number, number, number, number];
    readonly relativeTo?: string;
    readonly relativeToOrientation?: boolean;
    readonly lengthCoverages?: readonly (readonly [number, number, number])[];
}
/** Source duration overrides use half-open ephemeris intervals. */
export function configuredTrailLength(options: SourceTrailOptions | undefined, time: number): number | undefined {
    return options?.lengthCoverages?.find(([, start, end]) => start <= time && time < end)?.[0] ?? options?.length;
}
export interface TrailSample { readonly time: number; readonly position: Vec3; readonly velocity: Vec3; }
export interface TrailHistory {
    readonly windows?: readonly EphemerisWindow[];
    readonly body?: 1 | 2;
    readonly samples: readonly TrailSample[];
    readonly requestedStart: number;
    readonly end: number;
    readonly gaps: readonly { readonly min: number; readonly max: number; readonly reason: 'coverage' | 'parent-change' | 'reference-frame' | 'budget' }[];
}
export interface TrailHistoryRequest {
    readonly path: string;
    readonly now: number;
    readonly phaseStart: number;
    readonly parentId: string | null;
    readonly options?: SourceTrailOptions;
    readonly body?: 1 | 2;
    readonly maxSamples?: number;
    readonly adaptive?: boolean;
    readonly maxLeafLoads?: number;
    readonly signal?: AbortSignal;
    readonly load: (path: string, time: number, signal?: AbortSignal) => Promise<EphemerisWindow>;
}
/** TrailComponent._getAutoLength uses angular momentum and orbital energy, not a guessed radius. */
export function sourceTrailDuration(window: EphemerisWindow, time: number, body?: 1 | 2): number {
    const state = evaluateEphemeris(window, time, { body });
    if (state.status !== 'ready' || state.kind !== 'position') return NaN;
    const r = state.position, v = state.velocity;
    const h2 = (r.y*v.z-r.z*v.y)**2 + (r.z*v.x-r.x*v.z)**2 + (r.x*v.y-r.y*v.x)**2;
    const speed2 = v.x*v.x+v.y*v.y+v.z*v.z;
    if (!(h2 > 0) || !(speed2 > 0)) return NaN;
    if (window.header.pointType !== 'orb') return 2*Math.PI*Math.sqrt(h2)/speed2;
    const points = window.points;
    let index = 0;
    while (index < points.length-2 && points[index+1].time <= time) index++;
    const first = points[index], last = points[index+1];
    if (first.kind !== 'orb' || last.kind !== 'orb') return NaN;
    const fraction = (time-first.time)/(last.time-first.time);
    const e = first.eccentricity+(last.eccentricity-first.eccentricity)*fraction;
    const mu = (window.header.gravitationalParameter1 ?? 1)+(window.header.gravitationalParameter2 ?? 0);
    const energy = -.5*mu*mu/h2*(1-e*e);
    return 2*Math.PI*mu/Math.sqrt(8*Math.abs(Math.min(1,energy**3)));
}
/** Fetch each sample's real leaf; contiguous loaded leaves are reused without joining across missing coverage. */
export async function sampleTrailHistory(request: TrailHistoryRequest): Promise<TrailHistory> {
    const { now, path, signal, options, body } = request;
    const budget = request.maxSamples ?? 1025;
    const leafBudget = request.maxLeafLoads ?? 2048;
    if (!Number.isFinite(now) || !Number.isSafeInteger(budget) || budget < 4 || budget > 2048) throw new RangeError('Invalid trail sampling request');
    if (!Number.isSafeInteger(leafBudget) || leafBudget < 1 || leafBudget > 16384) throw new RangeError('Invalid trail leaf budget');
    signal?.throwIfAborted();
    const current = await request.load(path, now, signal);
    const duration = configuredTrailLength(options, now) ?? sourceTrailDuration(current, now, body);
    const requestedStart = now-duration;
    const gaps: TrailHistory['gaps'][number][] = [];
    if (!Number.isFinite(duration) || duration <= 0) return { samples: [], requestedStart, end: now, gaps: [{min: now,max: now,reason:'coverage'}] };
    if ((options?.relativeTo !== undefined && options.relativeTo !== request.parentId) || options?.relativeToOrientation) return { samples: [], requestedStart, end: now, gaps: [{min:requestedStart,max:now,reason:'reference-frame'}] };
    const start = Math.max(requestedStart, request.phaseStart);
    if (start > requestedStart) gaps.push({min:requestedStart,max:start,reason:'parent-change'});
    const samples: TrailSample[] = [];
    const windows = [current];
    const initialCount = Math.min(budget,121);
    let window = current;
    let leafLoads = 1;
    // Descending order keeps the current head exact and retains only its connected covered history.
    sampling: for (let index = 0; index < initialCount; index++) {
        signal?.throwIfAborted();
        const time = index === initialCount-1 ? start : now-(now-start)*index/(initialCount-1);
        try {
            while (time < window.interval.min || time > window.interval.max) {
                signal?.throwIfAborted();
                if (leafLoads >= leafBudget) { gaps.push({min:start,max:window.interval.min,reason:'budget'}); break sampling; }
                const previous = window;
                // Visit every intervening leaf: a coarse sample may skip several
                // perfectly contiguous intervals. Request one ULP before its edge.
                const bytes=new DataView(new ArrayBuffer(8));
                bytes.setFloat64(0,previous.interval.min);
                const bits=bytes.getBigUint64(0);
                bytes.setBigUint64(0,previous.interval.min===0 ? 0x8000000000000001n : previous.interval.min>0 ? bits-1n : bits+1n);
                const boundary=bytes.getFloat64(0);
                window = await request.load(path,Math.max(time,boundary),signal);
                leafLoads++;
                windows.push(window);
                // Repository encodes a shared half-open boundary with nextDown;
                // tolerate that single ULP, but never bridge a real coverage hole.
                const tolerance = Math.max(1,Math.abs(previous.interval.min))*Number.EPSILON;
                if (window.interval.max < previous.interval.min-tolerance) {
                    gaps.push({min:window.interval.max,max:previous.interval.min,reason:'coverage'});
                    break sampling;
                }
                if (window.interval.min >= previous.interval.min) { gaps.push({min:start,max:previous.interval.min,reason:'coverage'}); break sampling; }
            }
            const state = evaluateEphemeris(window,time,{body});
            if (state.status !== 'ready' || state.kind !== 'position') throw new Error('Missing position coverage');
            samples.push({time,position:state.position,velocity:state.velocity});
        } catch (error) {
            signal?.throwIfAborted();
            if (error instanceof Error && error.name === 'AbortError') throw error;
            gaps.push({min:start,max:time,reason:'coverage'});
            break;
        }
    }
    samples.reverse();
    if (request.adaptive !== false) {
        // Source starts at duration/120 and refines where velocity turns more
        // than three degrees. A hard global budget bounds pathological curves.
        const angle = (a: Vec3,b: Vec3): number => {
            const denominator = Math.hypot(a.x,a.y,a.z)*Math.hypot(b.x,b.y,b.z);
            return denominator > 0 ? Math.acos(Math.max(-1,Math.min(1,(a.x*b.x+a.y*b.y+a.z*b.z)/denominator))) : 0;
        };
        let index = 0, attempts = 0;
        while (index < samples.length-1 && samples.length < budget) {
            signal?.throwIfAborted();
            const first=samples[index],last=samples[index+1];
            if (angle(first.velocity,last.velocity) <= Math.PI/60 || attempts >= 20 || last.time-first.time <= 1) { index++; attempts=0; continue; }
            const time=(first.time+last.time)/2;
            // Initial sampling established connected coverage for this interval.
            let midpointWindow=windows.find(candidate=>candidate.interval.min<=time && candidate.interval.max>=time);
            if (!midpointWindow) { midpointWindow=await request.load(path,time,signal); windows.push(midpointWindow); }
            const state=evaluateEphemeris(midpointWindow,time,{body});
            if (state.status!=='ready' || state.kind!=='position') break;
            samples.splice(index+1,0,{time,position:state.position,velocity:state.velocity});
            attempts++;
        }
    }
    return {samples,requestedStart,end:now,gaps,windows,body};
}
