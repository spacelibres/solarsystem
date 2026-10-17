import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
import { Group, Object3D } from 'three';
import { FULL_SCENE } from '../src/solar/config/scene-catalog';
import { createModelAnimator } from '../src/solar/domain/model-animation';
const sourceClass = (name: string) => new Function(readFileSync(new URL(`../eyes/src/engine/core/${name}.js`, import.meta.url), 'utf8').replace(`export { ${name} };`, `return ${name};`))();
const api = { Sort: sourceClass('Sort'), MathUtils: sourceClass('MathUtils'), CoverageController: class {}, Interval: class {} };
const Animation = new Function('Pioneer', readFileSync(new URL('../eyes/src/engine/core/Animation.js', import.meta.url), 'utf8').replace(/^import .*;$/m, '').replace('export { Animation };', 'return Animation;'))(api);
const plans = FULL_SCENE.flatMap(body => (body.modelAnimations ?? []).filter(plan => plan.type === 'rotation' || plan.type === 'visibility').map(plan => ({ entity: body.id, plan })));
it.each(plans)('matches original Animation helper for $entity $plan.joint at every key boundary and midpoint', ({ plan }) => {
    if (plan.type !== 'rotation' && plan.type !== 'visibility') throw Error('Unexpected test plan');
    const root = new Group(), actual = new Object3D(), reference = new Object3D(); actual.name = plan.joint; root.add(actual);
    let timeEt = 0, update: () => void = () => { throw Error('Source callback not registered'); };
    const entity = { getScene: () => ({ getEngine: () => ({ getTime: () => timeEt }) }), addController: () => ({ setCoverage() {}, setUpdateFunction(fn: (value: unknown) => void) { update = () => fn(entity); } }) };
    const model = { getEntity: () => entity, getThreeJsObjectByName: () => reference, setHiddenObject(_name: string, hidden: boolean) { reference.visible = !hidden; } };
    const keys = plan.keyframes.map(key => [...key]);
    if (plan.type === 'rotation') Animation.makeJointRotationAnimation(model, plan.joint, plan.axis, keys);
    else Animation.makeSubobjectVisibleAnimation(model, plan.joint, plan.initialVisible, keys);
    const animator = createModelAnimator(root, [plan], 0);
    const times = plan.keyframes.flatMap((key, index, all) => [key[0] - .001, key[0], key[0] + .001, index + 1 < all.length ? (key[0] + all[index + 1][0]) / 2 : key[0] + 1000]);
    for (timeEt of [...times, ...[...times].reverse()]) {
        update(); animator.update({ timeEt, deltaSeconds: 0 });
        if (plan.type === 'rotation') expect(actual.rotation[plan.axis]).toBeCloseTo(reference.rotation[plan.axis], 12);
        else expect(actual.visible).toBe(reference.visible);
    }
    animator.dispose();
});
