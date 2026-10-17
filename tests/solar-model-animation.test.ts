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

it('extracts every keyed source rotation and visibility without body custom controllers', () => {
 const osiris = FULL_SCENE.find(body => body.id === 'sc_osiris_rex')!;
 expect(osiris.modelAnimations?.filter(p => p.type === 'rotation')).toHaveLength(7);
 expect(osiris.modelAnimations?.filter(p => p.type === 'visibility')).toHaveLength(3);
 expect(osiris.controllers?.some(p => p.type === 'unsupported' && p.sourceType === 'custom')).toBe(false);
 const stardust = FULL_SCENE.find(body => body.id === 'sc_stardust')!;
 expect(stardust.modelAnimations?.filter(p => p.type === 'rotation')).toHaveLength(3);
 expect(FULL_SCENE.find(body => body.id === 'sc_iss')?.modelAnimations?.filter(p => p.type === 'visibility-interval')).toHaveLength(5);
});
it('samples linear Euler components and source strict-less visibility boundaries', () => {
 const root = new Group(), joint = new Object3D(); joint.name = 'arm'; root.add(joint);
 const animator = createModelAnimator(root, [
 { type: 'rotation', joint: 'arm', axis: 'z', keyframes: [[20, 2], [10, 0]] },
 { type: 'visibility', joint: 'arm', initialVisible: true, keyframes: [[15, false]] },
 ], 0);
 animator.update({timeEt: 15, deltaSeconds: 0}); expect(joint.rotation.z).toBeCloseTo(1); expect(joint.visible).toBe(true); expect(animator.diagnostics()[0].angle).toBeCloseTo(1);
 animator.update({timeEt: 15.001, deltaSeconds: 0}); expect(joint.visible).toBe(false);
 animator.update({timeEt: 5, deltaSeconds: 0}); expect(joint.rotation.z).toBeCloseTo(0); expect(joint.visible).toBe(true);
 animator.dispose();
});
it('uses half-open source coverage for object presence at exact interval end', () => {
 const root = new Group(), joint = new Object3D(); joint.name='payload';root.add(joint);
 const animator=createModelAnimator(root,[{type:'visibility-interval',joint:'payload',interval:[10,20],visibleInside:true}],0);
 for(const [timeEt, visible] of [[9,false],[10,true],[19,true],[20,false],[10,true]] as const){ animator.update({timeEt,deltaSeconds:0});expect(joint.visible).toBe(visible); }
});
it('retains source duplicate key ordering at exact ET and after it', () => {
 const root = new Group(), joint = new Object3D();joint.name='arm';root.add(joint);
 const animator=createModelAnimator(root,[{type:'rotation',joint:'arm',axis:'x',keyframes:[[10,1],[10,2],[20,4]]}],0);
 animator.update({timeEt:10,deltaSeconds:0});expect(joint.rotation.x).toBe(1);
 animator.update({timeEt:15,deltaSeconds:0});expect(joint.rotation.x).toBe(3);
});
it('extracts Stardust collection schedule directly from helper parameters', () => {
 const rotations=FULL_SCENE.find(body=>body.id==='sc_stardust')!.modelAnimations!.filter(p=>p.type==='rotation');
 expect(rotations).toHaveLength(3);
 const capsule=rotations.find(p=>p.joint==='Stardust_capsule')!;
 expect(capsule.keyframes).toHaveLength(12);
 expect(capsule.keyframes.slice(0,4)).toEqual([[4449664,1.481785],[4450264,0],[10410664,0],[10411264,1.481785]]);
 const first=rotations.find(p=>p.joint==='Stardust_Sample_Collection1')!;
 expect(first.keyframes.slice(0,2)).toEqual([[4450274,-Math.PI],[4450574,0]]);
});
