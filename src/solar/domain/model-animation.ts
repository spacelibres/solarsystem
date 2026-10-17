import { AnimationMixer, Quaternion, Vector3, type Object3D } from 'three';
import type { Quat, Vec3 } from '../../lib/dynamo/math';
type Coverage = {
    readonly coverage?: readonly [
        number,
        number
    ];
};
export type SourceModelAnimationPlan = Coverage & ({
    readonly type: 'spin';
    readonly joint: string;
    readonly axis: Vec3;
    readonly rate: number;
    readonly axisRelativeToEntity?: boolean;
    readonly clampedToRealTime?: boolean;
    readonly usingRealTime?: boolean;
    readonly referenceTime?: number;
    readonly referenceAngle?: number;
    readonly rotatingPosition?: boolean;
} | {
    readonly type: 'clip';
    readonly joint: string;
    readonly animation: string;
    readonly interval: readonly [
        number,
        number
    ];
});
export interface ModelAnimationDiagnostic {
    readonly joint: string;
    readonly type: 'spin' | 'clip';
    readonly status: 'active' | 'outside-coverage' | 'missing-joint' | 'missing-clip';
    readonly angle?: number;
    readonly clipTime?: number;
}
export interface ModelAnimationFrame {
    readonly timeEt: number;
    readonly deltaSeconds: number;
    readonly orientation?: Quat;
}
/** Source SpinController integrates signed ET deltas, optionally bounded by elapsed real seconds. */
export function createModelAnimator(root: Object3D, plans: readonly SourceModelAnimationPlan[], initialTimeEt: number) {
    const states = plans.map(plan => ({ plan, joint: root.getObjectByName(plan.joint), lastTime: initialTimeEt, angle: 0, mixer: undefined as AnimationMixer | undefined, clipTime: undefined as number | undefined, status: 'missing-joint' as ModelAnimationDiagnostic['status'] }));
    for (const state of states) {
        if (state.plan.type === 'clip' && state.joint) {
            const name = state.plan.animation;
            const clip = root.animations.find(clip => clip.name === name);
            if (clip?.tracks[0]?.times.length) {
                state.mixer = new AnimationMixer(state.joint);
                state.mixer.clipAction(clip).play();
            }
        }
    }
    return {
        update(frame: ModelAnimationFrame) {
            for (const state of states) {
                const { plan, joint } = state;
                if (!joint) {
                    state.status = 'missing-joint';
                    continue;
                }
                if (plan.coverage && (frame.timeEt < plan.coverage[0] || frame.timeEt > plan.coverage[1])) {
                    state.status = 'outside-coverage';
                    continue;
                }
                if (plan.type === 'clip') {
                    const clip = root.animations.find(clip => clip.name === plan.animation);
                    if (!state.mixer || !clip) {
                        state.status = 'missing-clip';
                        continue;
                    }
                    const n = clip.tracks[0].times.length;
                    state.clipTime = clip.duration * Math.max(0, Math.min(1, (frame.timeEt - plan.interval[0]) / (plan.interval[1] - plan.interval[0]))) * (n - 1) / n;
                    state.mixer.setTime(state.clipTime);
                    state.mixer.update(0);
                }
                else {
                    let elapsed = plan.usingRealTime ? frame.deltaSeconds : plan.referenceTime !== undefined ? frame.timeEt - plan.referenceTime - (plan.referenceAngle ?? 0) / plan.rate : frame.timeEt - state.lastTime;
                    if (plan.clampedToRealTime && !plan.usingRealTime && plan.referenceTime === undefined)
                        elapsed = Math.max(-frame.deltaSeconds, Math.min(frame.deltaSeconds, elapsed));
                    const angle = plan.rate * elapsed;
                    const q = new Quaternion().setFromAxisAngle(new Vector3(plan.axis.x, plan.axis.y, plan.axis.z), angle);
                    if (plan.axisRelativeToEntity === false && frame.orientation) {
                        const entity = new Quaternion(frame.orientation.x, frame.orientation.y, frame.orientation.z, frame.orientation.w);
                        q.premultiply(entity.clone().invert()).multiply(entity);
                    }
                    joint.quaternion.premultiply(q);
                    if (plan.rotatingPosition)
                        joint.position.applyQuaternion(q);
                    state.angle += angle;
                }
                state.lastTime = frame.timeEt;
                state.status = 'active';
            }
        },
        diagnostics(): readonly ModelAnimationDiagnostic[] { return states.map(state => ({ joint: state.plan.joint, type: state.plan.type, status: state.status, angle: state.angle, clipTime: state.clipTime })); },
        dispose() { for (const state of states) {
            state.mixer?.stopAllAction();
            if (state.joint)
                state.mixer?.uncacheRoot(state.joint);
        } }
    };
}
