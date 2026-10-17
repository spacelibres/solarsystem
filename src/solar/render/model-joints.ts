import * as THREE from 'three';
import { applySourceControllers, type SourceAlignAxis, type SourceControllerPlan } from '../domain/controllers';
import type { EntityFrame } from '../domain/entities';
import type { Quat, Vec3 } from '../../lib/dynamo/math';
export interface ModelJointPlan {
    readonly joint: string;
    readonly controller: SourceControllerPlan;
}
const identity: Quat = { x: 0, y: 0, z: 0, w: 1 };
const dot = (a: Vec3, b: Vec3) => a.x * b.x + a.y * b.y + a.z * b.z;
const cross = (a: Vec3, b: Vec3): Vec3 => ({ x: a.y * b.z - a.z * b.y, y: a.z * b.x - a.x * b.z, z: a.x * b.y - a.y * b.x });
const unit = (v: Vec3): Vec3 => { const n = Math.sqrt(dot(v, v)); return n > 0 ? { x: v.x / n, y: v.y / n, z: v.z / n } : { ...v }; };
const mult = (a: Quat, b: Quat): Quat => ({ w: a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z, x: a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y, y: a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x, z: a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w });
const inverse = (q: Quat): Quat => ({ x: -q.x, y: -q.y, z: -q.z, w: q.w });
const nan = (q: Vec3 | Quat) => Object.values(q).some(Number.isNaN);
function rotate(q: Quat, v: Vec3): Vec3 {
    const x = q.w * v.x + q.y * v.z - q.z * v.y, y = q.w * v.y + q.z * v.x - q.x * v.z, z = q.w * v.z + q.x * v.y - q.y * v.x, w = -q.x * v.x - q.y * v.y - q.z * v.z;
    return { x: x * q.w - w * q.x - y * q.z + z * q.y, y: y * q.w - w * q.y - z * q.x + x * q.z, z: z * q.w - w * q.z - x * q.y + y * q.x };
}
function axisAngle(axis: Vec3, angle: number): Quat { const s = Math.sin(angle / 2); return { x: s * axis.x, y: s * axis.y, z: s * axis.z, w: Math.cos(angle / 2) }; }
function alignJoint(plan: Extract<SourceControllerPlan, { type: 'align' }>, basis: Quat, frame: Extract<EntityFrame, { status: 'ready' }>, frames: ReadonlyMap<string, EntityFrame>): Quat | undefined {
    const parent = nan(basis) ? identity : basis;
    const primary = rotate(parent, plan.primary.axis);
    const target = (axis: SourceAlignAxis): Vec3 | undefined => {
        if (axis.type === 'none') return primary;
        const entity = axis.targetId ? frames.get(axis.targetId) : undefined;
        if (entity?.status !== 'ready') return undefined;
        if (axis.type === 'align') return entity.orientation ? rotate(entity.orientation, axis.targetAxis ?? { x: 1, y: 0, z: 0 }) : undefined;
        if (axis.type === 'velocity') return unit(entity.velocity);
        if (axis.type === 'position') return unit(entity.position);
        return unit({ x: entity.position.x - frame.position.x, y: entity.position.y - frame.position.y, z: entity.position.z - frame.position.z });
    };
    const primaryTarget = target(plan.primary);
    if (!primaryTarget || nan(primaryTarget)) return undefined;
    const d = dot(primary, primaryTarget);
    // Preserve Eyes' zero-cross-product and antiparallel branches, including
    // their behavior for an unconstrained primary and roundoff below one.
    const correction = d >= 1 ? identity : d <= -1 ? { x: 1, y: 0, z: 0, w: 0 } : axisAngle(unit(cross(primary, primaryTarget)), Math.acos(d));
    let orientation = mult(correction, parent);
    if (nan(orientation)) orientation = identity;
    if (plan.secondary && plan.secondary.type !== 'none') {
        const secondaryTarget = target(plan.secondary);
        if (!secondaryTarget || nan(secondaryTarget)) return undefined;
        const axis = rotate(orientation, plan.primary.axis), secondary = rotate(orientation, plan.secondary.axis);
        const project = (v: Vec3): Vec3 => { const d = -dot(v, axis); return { x: v.x + axis.x * d, y: v.y + axis.y * d, z: v.z + axis.z * d }; };
        const a = project(secondary), b = project(secondaryTarget), magnitude = Math.sqrt(dot(a, a)) * Math.sqrt(dot(b, b));
        let angle = magnitude > 0 ? Math.acos(Math.max(-1, Math.min(1, dot(a, b) / magnitude))) : NaN;
        if (dot(cross(a, b), axis) < 0) angle *= -1;
        orientation = mult(axisAngle(axis, angle), orientation);
    }
    const n = Math.sqrt(orientation.w * orientation.w + orientation.x * orientation.x + orientation.y * orientation.y + orientation.z * orientation.z);
    if (n > 0) orientation = { x: orientation.x / n, y: orientation.y / n, z: orientation.z / n, w: orientation.w / n };
    return mult(inverse(parent), orientation);
}
/** Eyes AlignController solves from the joint's parent basis, then converts back to local. */
export function updateModelJoints(root: THREE.Object3D, plans: readonly ModelJointPlan[], frame: Extract<EntityFrame, { status: 'ready' }>, frames: ReadonlyMap<string, EntityFrame>, timeEt: number) {
    const result = { applied: 0, missing: [] as string[], unavailable: [] as string[] };
    for (const plan of plans) {
        const joint = root.getObjectByName(plan.joint);
        if (!joint) { result.missing.push(plan.joint); continue; }
        if (!frame.orientation) { result.unavailable.push(plan.joint); continue; }
        if (plan.controller.coverage && (timeEt < plan.controller.coverage[0] || timeEt >= plan.controller.coverage[1])) continue;
        const ancestor = new THREE.Quaternion();
        let modelRoot = joint;
        while (modelRoot.parent && modelRoot.parent !== root) { modelRoot = modelRoot.parent; if (modelRoot.parent !== root) ancestor.premultiply(modelRoot.quaternion); }
        const basis = mult(frame.orientation, mult(modelRoot === joint ? identity : modelRoot.quaternion, ancestor));
        const q = plan.controller.type === 'align' ? alignJoint(plan.controller, basis, frame, frames) : (() => {
            const state = applySourceControllers([plan.controller], { position: frame.position, velocity: frame.velocity, orientation: basis }, frame.position, null, timeEt, id => frames.get(id));
            return state.orientation ? mult(inverse(basis), state.orientation) : undefined;
        })();
        if (!q || ![q.x, q.y, q.z, q.w].every(Number.isFinite)) { result.unavailable.push(plan.joint); continue; }
        joint.quaternion.set(q.x, q.y, q.z, q.w);
        result.applied++;
    }
    return result;
}
