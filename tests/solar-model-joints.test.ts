import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { updateModelJoints } from '../src/solar/render/model-joints';
import type { EntityFrame } from '../src/solar/domain/entities';
const frame = (id: string, x: number, y: number): Extract<EntityFrame, {
    status: 'ready';
}> => ({ status: 'ready', id, parentId: null, phaseIndex: 0, position: { x, y, z: 0 }, velocity: { x: 0, y: 0, z: 0 }, orientation: { x: 0, y: 0, z: 0, w: 1 } });
describe('source joint alignment', () => {
    it('tracks a target in world space through rotated model ancestors without rotating the whole craft', () => {
        const root = new THREE.Group(), parent = new THREE.Group(), joint = new THREE.Group();
        parent.rotation.z = Math.PI / 3;
        joint.name = 'panel';
        root.add(parent);
        parent.add(joint);
        const plans = [{ joint: 'panel', controller: { type: 'align' as const, primary: { type: 'point' as const, axis: { x: 1, y: 0, z: 0 }, targetId: 'sun' } } }];
        const craft = frame('craft', 0, 0), targets = new Map([['sun', frame('sun', 0, 10)]]);
        expect(updateModelJoints(root, plans, craft, targets, 1).applied).toBe(1);
        root.updateMatrixWorld(true);
        const direction = new THREE.Vector3(1, 0, 0).applyQuaternion(joint.getWorldQuaternion(new THREE.Quaternion()));
        expect(direction.x).toBeCloseTo(0);
        expect(direction.y).toBeCloseTo(1);
        expect(root.quaternion.w).toBe(1);
        targets.set('sun', frame('sun', 10, 0));
        updateModelJoints(root, plans, craft, targets, 2);
        root.updateMatrixWorld(true);
        expect(new THREE.Vector3(1, 0, 0).applyQuaternion(joint.getWorldQuaternion(new THREE.Quaternion())).x).toBeCloseTo(1);
    });
    it('reports missing joints and unavailable targets instead of inventing motion', () => {
        const root = new THREE.Group(), joint = new THREE.Group();
        joint.name = 'panel';
        root.add(joint);
        const controller = { type: 'align' as const, primary: { type: 'point' as const, axis: { x: 1, y: 0, z: 0 }, targetId: 'sun' } };
        expect(updateModelJoints(root, [{ joint: 'missing', controller }, { joint: 'panel', controller }], frame('craft', 0, 0), new Map(), 1)).toEqual({ applied: 0, missing: ['missing'], unavailable: ['panel'] });
        expect(joint.quaternion.w).toBe(1);
    });
});
it('preserves a none primary axis under floating point ancestor rotation while tracking the secondary', () => {
    const root = new THREE.Group(), parent = new THREE.Group(), joint = new THREE.Group();
    parent.rotation.set(.2, .2, .3);
    joint.name = 'panel';
    root.add(parent);
    parent.add(joint);
    const controller = { type: 'align' as const, primary: { type: 'none' as const, axis: { x: 1, y: 0, z: 0 } }, secondary: { type: 'point' as const, axis: { x: 0, y: 0, z: 1 }, targetId: 'sun' } };
    const state = updateModelJoints(root, [{ joint: 'panel', controller }], frame('craft', 0, 0), new Map([['sun', frame('sun', 10, 10)]]), 1);
    expect(state).toEqual({ applied: 1, missing: [], unavailable: [] });
    expect(joint.quaternion.toArray().every(Number.isFinite)).toBe(true);
});
