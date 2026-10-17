import * as THREE from 'three';
import { applySourceControllers, type SourceControllerPlan } from '../domain/controllers';
import type { EntityFrame } from '../domain/entities';
export interface ModelJointPlan {
    readonly joint: string;
    readonly controller: SourceControllerPlan;
}
/** Eyes AlignController solves from the joint's parent basis, then converts back to local. */
export function updateModelJoints(root: THREE.Object3D, plans: readonly ModelJointPlan[], frame: Extract<EntityFrame, {
    status: 'ready';
}>, frames: ReadonlyMap<string, EntityFrame>, timeEt: number) {
    const result = { applied: 0, missing: [] as string[], unavailable: [] as string[] };
    const parentBasis = new THREE.Quaternion(), desired = new THREE.Quaternion();
    for (const plan of plans) {
        const joint = root.getObjectByName(plan.joint);
        if (!joint) {
            result.missing.push(plan.joint);
            continue;
        }
        if (!frame.orientation) {
            result.unavailable.push(plan.joint);
            continue;
        }
        parentBasis.identity();
        for (let ancestor = joint.parent; ancestor && ancestor !== root; ancestor = ancestor.parent)
            parentBasis.premultiply(ancestor.quaternion);
        desired.set(frame.orientation.x, frame.orientation.y, frame.orientation.z, frame.orientation.w);
        parentBasis.premultiply(desired);
        const state = applySourceControllers([plan.controller], { position: frame.position, velocity: frame.velocity, orientation: parentBasis }, frame.position, null, timeEt, id => frames.get(id));
        const q = state.orientation;
        if (!q || ![q.x, q.y, q.z, q.w].every(Number.isFinite)) {
            result.unavailable.push(plan.joint);
            continue;
        }
        desired.set(q.x, q.y, q.z, q.w);
        joint.quaternion.copy(parentBasis.invert().multiply(desired));
        result.applied++;
    }
    return result;
}
