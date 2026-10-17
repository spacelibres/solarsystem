import { expect, it } from 'vitest';
import { Group, Object3D, AnimationClip, NumberKeyframeTrack } from 'three';
import { createModelAnimator } from '../src/solar/domain/model-animation';
import { FULL_SCENE } from '../src/solar/config/scene-catalog';
it('extracts GPM source callback joint spin and excludes joints from body attitude', () => {
    const gpm = FULL_SCENE.find(body => body.id === 'sc_gpm')!;
    expect(gpm.modelAnimations).toContainEqual(expect.objectContaining({ type: 'spin', joint: 'GPM_antenna', rate: 192 * Math.PI / 180, clampedToRealTime: true }));
});
it('uses signed simulation delta clamped to real seconds and freezes on pause', () => {
    const root = new Group(), joint = new Object3D();
    joint.name = 'dish';
    root.add(joint);
    const animator = createModelAnimator(root, [{ type: 'spin', joint: 'dish', axis: { x: 0, y: 1, z: 0 }, rate: Math.PI, clampedToRealTime: true }], 0);
    animator.update({ timeEt: 100, deltaSeconds: .5 });
    expect(joint.quaternion.y).toBeCloseTo(Math.SQRT1_2);
    animator.update({ timeEt: 100, deltaSeconds: .5 });
    expect(joint.quaternion.y).toBeCloseTo(Math.SQRT1_2);
    animator.update({ timeEt: -100, deltaSeconds: .5 });
    expect(joint.quaternion.y).toBeCloseTo(0);
    expect(animator.diagnostics()[0].status).toBe('active');
    animator.dispose();
});
it('maps ET to clip sample time with the recovered last-track-count correction', () => {
    const root = new Group(), joint = new Object3D();
    joint.name = 'dish';
    root.add(joint);
    root.animations = [new AnimationClip('deploy', 2, [new NumberKeyframeTrack('.position[x]', [0, 1, 2], [0, 5, 10])])];
    const animator = createModelAnimator(root, [{ type: 'clip', joint: 'dish', animation: 'deploy', interval: [10, 20] }], 10);
    animator.update({ timeEt: 20, deltaSeconds: 0 });
    expect(joint.position.x).toBeCloseTo(20 / 3);
    animator.update({ timeEt: 10, deltaSeconds: 0 });
    expect(joint.position.x).toBeCloseTo(0);
    animator.dispose();
});
it('reports missing joints and clips without rotating the craft root', () => {
    const root = new Group(), joint = new Object3D();
    joint.name = 'dish';
    root.add(joint);
    const animator = createModelAnimator(root, [{ type: 'spin', joint: 'absent', axis: { x: 0, y: 1, z: 0 }, rate: 1 }, { type: 'clip', joint: 'dish', animation: 'absent', interval: [0, 1] }], 0);
    animator.update({ timeEt: 1, deltaSeconds: 1 });
    expect(animator.diagnostics().map(item => item.status)).toEqual(['missing-joint', 'missing-clip']);
    expect(root.quaternion.w).toBe(1);
});
it('extracts explicit source coverages and never turns ISS array controllers into body controllers', () => {
    const iss = FULL_SCENE.find(body => body.id === 'sc_iss')!;
    expect(iss.modelAnimations).toContainEqual(expect.objectContaining({ joint: 'RapidScat_dish', coverage: [-1e18, 524890952] }));
    expect(iss.jointControllers?.some(item => item.joint === '20_P4_Truss')).toBe(true);
    expect(iss.controllers?.filter(item => item.type === 'align')).toHaveLength(1);
});
