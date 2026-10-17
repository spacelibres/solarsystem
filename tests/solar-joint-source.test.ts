import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { updateModelJoints } from '../src/solar/render/model-joints';
import { createModelAnimator } from '../src/solar/domain/model-animation';
import type { EntityFrame } from '../src/solar/domain/entities';

class Pool {
    constructor(private readonly ctor: new () => object) {}
    get() { return new this.ctor(); }
    release() {}
}
const api = { Pool, THREE, MathUtils: { clamp: THREE.MathUtils.clamp }, Quaternion: undefined as unknown, Vector3: undefined as unknown };
function loadMath(name: string) {
    const source = readFileSync(new URL(`../eyes/src/engine/core/${name}.js`, import.meta.url), 'utf8');
    return new Function('PioneerPublicApi', source.replace(/^import .*;$/m, '').replace(`export { ${name} };`, `return ${name};`))(api);
}
const Q = loadMath('Quaternion'); api.Quaternion = Q;
const V = loadMath('Vector3'); api.Vector3 = V;
function method(name: string, start: string, end: string) {
    const source = readFileSync(new URL(`../eyes/src/engine/controllers/${name}.js`, import.meta.url), 'utf8');
    const body = source.slice(source.indexOf(start) + start.length, source.indexOf(end));
    return new Function('PioneerPublicApi', 'orientationOut', 'time', body.slice(0, body.lastIndexOf('\n  }')));
}
const align = method('AlignController', '  _getOrientation(orientationOut, time) {', '\n  _getAxis(');
const spin = method('SpinController', '  __update() {', '\n  _axis;');
const zero = { x: 0, y: 0, z: 0 };
function frame(q: THREE.Quaternion): Extract<EntityFrame, { status: 'ready' }> {
    return { status: 'ready', id: 'craft', parentId: null, phaseIndex: 0, position: zero, velocity: zero, orientation: q };
}
function expectRotation(actual: THREE.Quaternion, expected: { x: number; y: number; z: number; w: number }) {
    expect(Math.abs(actual.dot(new THREE.Quaternion(expected.x, expected.y, expected.z, expected.w)))).toBeCloseTo(1, 11);
}

describe('joint transforms compared with recovered NASA CPU controllers', () => {
    for (const primaryType of ['point', 'none'] as const) {
        it(`matches ${primaryType} alignment with model rotation and nested ancestors`, () => {
            const root = new THREE.Group(), model = new THREE.Group(), parent = new THREE.Group(), joint = new THREE.Group();
            joint.name = 'joint'; root.add(model); model.add(parent); parent.add(joint);
            model.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
            parent.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
            const entity = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);
            const out = new Q(entity.w, entity.x, entity.y, entity.z);
            const modelRotation = new Q(model.quaternion.w, model.quaternion.x, model.quaternion.y, model.quaternion.z);
            const controller = {
                _joint: 'joint', _jointObject: joint, _modelRootId: model.id,
                _model: { getThreeJsObjects: () => [model], getRotation: () => modelRotation },
                _primaryAxis: new V(0, 0, 1), _secondaryAxis: new V(0, 1, 0),
                _primaryAlignType: primaryType, _secondaryAlignType: 'align',
                _primaryTargetEntity: {}, _secondaryTargetEntity: {}, _primaryTargetAxis: new V(), _secondaryTargetAxis: new V(0, 1, 0),
                _getAxis: (target: { copy: (v: object) => void }, type: string, _ref: object, _axis: object, fallback: object) => target.copy(type === 'point' ? new V(1, 0, 0) : type === 'none' ? fallback : new V(0, 1, 0)),
            };
            align.call(controller, api, out, 2);
            const target = { ...frame(new THREE.Quaternion()), id: 'earth', position: { x: 10, y: 0, z: 0 } };
            updateModelJoints(root, [{ joint: 'joint', controller: { type: 'align', primary: { type: primaryType, axis: { x: 0, y: 0, z: 1 }, targetId: 'earth' }, secondary: { type: 'align', axis: { x: 0, y: 1, z: 0 }, targetId: 'earth', targetAxis: { x: 0, y: 1, z: 0 } } } }], frame(entity), new Map([['earth', target]]), 2);
            expectRotation(joint.quaternion, out);
        });
    }
    for (const relative of [true, false]) {
        it(`matches signed incremental spin with entity-relative axis ${relative}`, () => {
            const root = new THREE.Group(), joint = new THREE.Group(), referenceJoint = new THREE.Group();
            joint.name = referenceJoint.name = 'joint'; root.add(joint);
            joint.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), .4); referenceJoint.quaternion.copy(joint.quaternion);
            joint.position.set(1, 2, 3); referenceJoint.position.copy(joint.position);
            const entity = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), .7);
            let time = 0;
            const engine = { getTime: () => time, getDeltaTime: () => .25 };
            const controller = { _axis: new V(0, 0, 1), _axisRelativeToEntity: relative, _rate: .9, _referenceTime: undefined, _usingRealTime: false, _clampedToRealTime: true, _lastTime: 0, _rotatingPosition: true, _joint: 'joint', _jointObject: referenceJoint, _jointObjectIndex: 0, _model: { getThreeJsObjects: () => [referenceJoint] }, getEntity: () => ({ getOrientation: () => new Q(entity.w, entity.x, entity.y, entity.z), getScene: () => ({ getEngine: () => engine }) }) };
            const animator = createModelAnimator(root, [{ type: 'spin', joint: 'joint', axis: { x: 0, y: 0, z: 1 }, rate: .9, axisRelativeToEntity: relative, rotatingPosition: true, clampedToRealTime: true }], 0);
            for (time of [100, 101, -50]) {
                spin.call(controller, api);
                animator.update({ timeEt: time, deltaSeconds: .25, orientation: entity });
                expectRotation(joint.quaternion, referenceJoint.quaternion);
                expect(joint.position.distanceTo(referenceJoint.position)).toBeCloseTo(0, 12);
            }
        });
    }
});



import { FULL_SCENE } from '../src/solar/config/scene-catalog';
import type { SourceAlignAxis } from '../src/solar/domain/controllers';
const getAxis = (() => {
    const source = readFileSync(new URL('../eyes/src/engine/controllers/AlignController.js', import.meta.url), 'utf8');
    const start = '  _getAxis(axisOut, alignType, targetRef, targetAxis, fallbackAxis, time) {';
    const body = source.slice(source.indexOf(start) + start.length, source.indexOf('\n  _removeDependentStates('));
    return new Function('PioneerPublicApi', 'axisOut', 'alignType', 'targetRef', 'targetAxis', 'fallbackAxis', 'time', body.slice(0, body.lastIndexOf('\n  }')));
})();
const catalogJoints = FULL_SCENE.flatMap(entity => (entity.jointControllers ?? []).filter(plan => plan.controller.type === 'align').map(plan => ({ entity: entity.id, plan })));
it.each(catalogJoints)('matches recovered source for $entity $plan.joint over changing entity and ancestor rotations', ({ plan }) => {
    if (plan.controller.type !== 'align') return;
    const p = plan.controller;
    for (let i = 0; i < 9; i++) {
        const root = new THREE.Group(), model = new THREE.Group(), parent = new THREE.Group(), joint = new THREE.Group();
        joint.name = plan.joint; root.add(model); model.add(parent); parent.add(joint);
        model.quaternion.setFromEuler(new THREE.Euler(.3 + i * .1, -.7, .4));
        parent.quaternion.setFromEuler(new THREE.Euler(-.2, i * .17, .9));
        const entity = new THREE.Quaternion().setFromEuler(new THREE.Euler(i * .21, .8, -.5));
        const out = new Q(entity.w, entity.x, entity.y, entity.z);
        const targetOrientation = new THREE.Quaternion().setFromEuler(new THREE.Euler(.6, -.3, i * .31));
        const targetFrame = { ...frame(targetOrientation), position: { x: 7, y: 3, z: -2 }, velocity: { x: -.3, y: .8, z: .4 } };
        const targets = new Map<string, EntityFrame>();
        for (const axis of [p.primary, p.secondary]) if (axis?.targetId) targets.set(axis.targetId, targetFrame);
        const ref = { get: () => ({ getOrientationAtTime: (output: { copy: (v: object) => void }) => output.copy(targetOrientation), getVelocityAtTime: (output: { copy: (v: object) => void }) => output.copy(targetFrame.velocity), getPositionRelativeToEntity: (output: { copy: (v: object) => void }) => output.copy(targetFrame.position), getPosition: () => new V(7, 3, -2) }) };
        const v = (axis: SourceAlignAxis | undefined, target = false) => { const a = target ? axis?.targetAxis : axis?.axis; return new V(a?.x ?? 1, a?.y ?? 0, a?.z ?? 0); };
        const controller = {
            _joint: plan.joint, _jointObject: joint, _modelRootId: model.id,
            _model: { getThreeJsObjects: () => [model], getRotation: () => new Q(model.quaternion.w, model.quaternion.x, model.quaternion.y, model.quaternion.z) },
            _primaryAxis: v(p.primary), _secondaryAxis: v(p.secondary), _primaryAlignType: p.primary.type, _secondaryAlignType: p.secondary?.type ?? 'none', _primaryTargetEntity: ref, _secondaryTargetEntity: ref, _primaryTargetAxis: v(p.primary, true), _secondaryTargetAxis: v(p.secondary, true), getEntity: () => ({}),
            _getAxis: function (...args: unknown[]) { return getAxis.call(this, api, ...args); },
        };
        align.call(controller, api, out, 2);
        const result = updateModelJoints(root, [{ ...plan, controller: { ...p, coverage: undefined } }], frame(entity), targets, 2);
        if ([out.x, out.y, out.z, out.w].some(Number.isNaN)) expect(result.unavailable).toEqual([plan.joint]);
        else expectRotation(joint.quaternion, out);
    }
});

it('leaves the joint unchanged outside source controller coverage', () => {
    const root = new THREE.Group(), joint = new THREE.Group();
    joint.name = 'joint'; root.add(joint);
    joint.quaternion.setFromEuler(new THREE.Euler(.2, .3, .4));
    const before = joint.quaternion.clone();
    const result = updateModelJoints(root, [{ joint: 'joint', controller: { type: 'align', coverage: [0, 1], primary: { type: 'none', axis: { x: 0, y: 0, z: 1 } } } }], frame(new THREE.Quaternion()), new Map(), 2);
    expect(result).toEqual({ applied: 0, missing: [], unavailable: [] });
    expect(joint.quaternion.equals(before)).toBe(true);
});
