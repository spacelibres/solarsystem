import { rotateByQuat, type Quat, type Vec3 } from '../../lib/dynamo/math';
import type { EntityFrame, LocalEntityState } from './entities';
export interface SourceAlignAxis {
    readonly type: 'none' | 'point' | 'align' | 'velocity' | 'position';
    readonly axis: Vec3;
    readonly targetId?: string;
    readonly targetAxis?: Vec3;
}
type Coverage = {
    readonly coverage?: readonly [
        number,
        number
    ];
};
export type SourceControllerPlan = Coverage & ({
    readonly type: 'align';
    readonly primary: SourceAlignAxis;
    readonly secondary?: SourceAlignAxis;
} | {
    readonly type: 'rotateByEntityOrientation';
    readonly targetId?: string;
    readonly rotatingPosition?: boolean;
    readonly rotatingOrientation?: boolean;
} | {
    readonly type: 'dynamoOrientation';
} | {
    readonly type: 'fixed';
    readonly position?: Vec3;
    readonly orientation?: Quat;
} | {
    readonly type: 'spin';
    readonly axis: Vec3;
    readonly rate: number;
    readonly referenceTime?: number;
    readonly referenceAngle?: number;
    readonly axisRelativeToEntity?: boolean;
} | {
    readonly type: 'unsupported';
    readonly sourceType: string;
});
const identity: Quat = { x: 0, y: 0, z: 0, w: 1 };
const cross = (a: Vec3, b: Vec3): Vec3 => ({ x: a.y * b.z - a.z * b.y, y: a.z * b.x - a.x * b.z, z: a.x * b.y - a.y * b.x });
const dot = (a: Vec3, b: Vec3) => a.x * b.x + a.y * b.y + a.z * b.z;
const unit = (a: Vec3): Vec3 => { const n = Math.hypot(a.x, a.y, a.z); return { x: a.x / n, y: a.y / n, z: a.z / n }; };
export const multiplyOrientation = (a: Quat, b: Quat): Quat => ({ x: a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y, y: a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x, z: a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w, w: a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z });
const normalize = (q: Quat): Quat => { const n = Math.hypot(q.x, q.y, q.z, q.w); return { x: q.x / n, y: q.y / n, z: q.z / n, w: q.w / n }; };
const axisAngle = (axis: Vec3, angle: number): Quat => { const a = unit(axis), s = Math.sin(angle / 2); return { x: a.x * s, y: a.y * s, z: a.z * s, w: Math.cos(angle / 2) }; };
function fromTo(a: Vec3, b: Vec3): Quat { const d = dot(a, b); if (d >= 1)
    return { ...identity }; if (d <= -1)
    return { x: 1, y: 0, z: 0, w: 0 }; return axisAngle(cross(a, b), Math.acos(d)); }
export function controllerDependencies(plans: readonly SourceControllerPlan[] | undefined, parentId: string | null, timeEt: number): string[] {
    const ids = new Set<string>();
    for (const plan of plans ?? []) {
        if (plan.coverage && (timeEt < plan.coverage[0] || timeEt > plan.coverage[1]))
            continue;
        if (plan.type === 'align') {
            for (const axis of [plan.primary, plan.secondary])
                if (axis?.targetId && axis.type !== 'none')
                    ids.add(axis.targetId);
        }
        else if (plan.type === 'rotateByEntityOrientation') {
            const id = plan.targetId ?? parentId;
            if (id)
                ids.add(id);
        }
    }
    return [...ids];
}
/** The recovered controllers operate in source order; parent translation happens afterwards. */
export function applySourceControllers(plans: readonly SourceControllerPlan[] | undefined, local: LocalEntityState, worldPosition: Vec3, parentId: string | null, timeEt: number, resolve: (id: string) => EntityFrame | undefined): LocalEntityState {
    let state = { ...local };
    const parentPosition = { x: worldPosition.x - (local.position?.x ?? 0), y: worldPosition.y - (local.position?.y ?? 0), z: worldPosition.z - (local.position?.z ?? 0) };
    const sampledOrientation = local.orientation;
    if (plans?.some(plan => plan.type === 'dynamoOrientation'))
        state = { ...state, orientation: undefined };
    const axisTarget = (axis: SourceAlignAxis, fallback: Vec3): Vec3 | undefined => {
        if (axis.type === 'none')
            return fallback;
        const target = axis.targetId ? resolve(axis.targetId) : undefined;
        if (target?.status !== 'ready')
            return undefined;
        if (axis.type === 'align')
            return target.orientation ? rotateByQuat(axis.targetAxis ?? { x: 1, y: 0, z: 0 }, target.orientation) : undefined;
        if (axis.type === 'velocity')
            return unit(target.velocity);
        if (axis.type === 'position')
            return unit(target.position);
        if (!state.position)
            return undefined;
        return unit({ x: target.position.x - state.position.x - parentPosition.x, y: target.position.y - state.position.y - parentPosition.y, z: target.position.z - state.position.z - parentPosition.z });
    };
    for (const plan of plans ?? []) {
        if (plan.coverage && (timeEt < plan.coverage[0] || timeEt > plan.coverage[1]))
            continue;
        if (plan.type === 'dynamoOrientation') {
            state = { ...state, orientation: sampledOrientation };
            continue;
        }
        if (plan.type === 'unsupported') {
            state = { ...state, orientation: undefined };
            continue;
        }
        if (plan.type === 'fixed') {
            state = { ...state, ...(plan.position ? { position: plan.position, velocity: { x: 0, y: 0, z: 0 } } : {}), ...(plan.orientation ? { orientation: plan.orientation } : {}) };
            continue;
        }
        if (plan.type === 'rotateByEntityOrientation') {
            const id = plan.targetId ?? parentId;
            const target = id ? resolve(id) : undefined;
            const q = target?.status === 'ready' ? target.orientation : null;
            if (!q) {
                state = { ...state, ...(plan.rotatingPosition !== false ? { position: undefined } : {}), ...(plan.rotatingOrientation !== false ? { orientation: undefined } : {}) };
                continue;
            }
            state = { ...state, ...(plan.rotatingPosition !== false ? { position: state.position ? rotateByQuat(state.position, q) : undefined, velocity: state.velocity ? rotateByQuat(state.velocity, q) : undefined } : {}), ...(plan.rotatingOrientation !== false ? { orientation: state.orientation ? multiplyOrientation(q, state.orientation) : undefined } : {}) };
            continue;
        }
        if (plan.type === 'spin') {
            const q = axisAngle(plan.axis, plan.rate * (timeEt - (plan.referenceTime ?? 0)) - (plan.referenceAngle ?? 0));
            const initial = state.orientation ?? identity;
            state = { ...state, orientation: normalize(plan.axisRelativeToEntity !== false ? multiplyOrientation(initial, q) : multiplyOrientation(q, initial)) };
            continue;
        }
        const initial = state.orientation ?? identity;
        const primary = rotateByQuat(plan.primary.axis, initial);
        const target = axisTarget(plan.primary, primary);
        if (!target) {
            state = { ...state, orientation: undefined };
            continue;
        }
        // An unconstrained primary keeps its parent basis; cross(a,a) is zero even
        // when roundoff makes dot(a,a) slightly below one.
        let q = plan.primary.type === 'none' ? initial : multiplyOrientation(fromTo(primary, target), initial);
        if (plan.secondary && plan.secondary.type !== 'none') {
            const secondaryTarget = axisTarget(plan.secondary, primary);
            if (!secondaryTarget) {
                state = { ...state, orientation: undefined };
                continue;
            }
            const axis = unit(rotateByQuat(plan.primary.axis, q));
            const secondary = rotateByQuat(plan.secondary.axis, q);
            const project = (v: Vec3) => { const d = dot(v, axis); return unit({ x: v.x - axis.x * d, y: v.y - axis.y * d, z: v.z - axis.z * d }); };
            const a = project(secondary), b = project(secondaryTarget);
            q = multiplyOrientation(axisAngle(axis, Math.atan2(dot(axis, cross(a, b)), dot(a, b))), q);
        }
        state = { ...state, orientation: normalize(q) };
    }
    return state;
}
