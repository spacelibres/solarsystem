import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { retainModelAnimations, createModelLibrary } from '../src/solar/render/models';

describe('glTF animation ownership', () => {
    it('retains loader clips on the scene through the source transform wrapper', async () => {
        const scene = new THREE.Group(), clip = new THREE.AnimationClip('deploy', 2, []);
        const loaded = retainModelAnimations({ scene, animations: [clip] });
        const library = createModelLibrary(undefined, { load: async () => loaded, dispose() {} });
        const lease = library.acquire({url:'test'});
        const wrapper = await lease.ready;
        expect(wrapper.children[0].animations).toEqual([clip]);
        lease.release(); library.dispose();
    });
});
