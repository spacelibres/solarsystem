import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
export interface ModelDescriptor {
    url: string;
    rotate?: readonly ({
        x: number;
    } | {
        y: number;
    } | {
        z: number;
    })[];
    scale?: number | readonly [
        number,
        number,
        number
    ];
    translate?: {
        x: number;
        y: number;
        z: number;
    };
}
export interface ModelLoaderPort {
    /** Each invocation must return an independently owned scene and resources. */
    load(url: string): Promise<THREE.Group>;
    dispose(): void;
}
export interface ModelLease {
    ready: Promise<THREE.Group>;
    release(): void;
}
// Pinned independently; the regression test checks the publishing manifest revision.
export function modelDecoderPaths() {
    const root = '/eyes/decoders/1225db209857fe97/';
    return { draco: root + 'draco/', ktx2: root + 'ktx2/' };
}
/** GLTFLoader stores clips beside the scene, so retaining only .scene loses articulation. */
export function retainModelAnimations(gltf: { scene: THREE.Group; animations: THREE.AnimationClip[] }): THREE.Group {
    gltf.scene.animations = gltf.animations;
    return gltf.scene;
}
function officialLoader(renderer: THREE.WebGLRenderer): ModelLoaderPort {
    const paths = modelDecoderPaths();
    const draco = new DRACOLoader().setDecoderPath(paths.draco).setWorkerLimit(2);
    const ktx = new KTX2Loader().setTranscoderPath(paths.ktx2).setWorkerLimit(2).detectSupport(renderer);
    const loader = new GLTFLoader().setDRACOLoader(draco).setKTX2Loader(ktx).setMeshoptDecoder(MeshoptDecoder);
    return { load: async (url) => retainModelAnimations(await loader.loadAsync(url)), dispose: () => { draco.dispose(); ktx.dispose(); } };
}
function destroy(group: THREE.Group) {
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    const textures = new Set<THREE.Texture>();
    const images = new Set<{
        close(): void;
    }>();
    const skeletons = new Set<THREE.Skeleton>();
    group.removeFromParent();
    group.traverse(object => {
        if (!(object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Line))
            return;
        geometries.add(object.geometry);
        for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
            materials.add(material);
            for (const value of Object.values(material))
                if (value instanceof THREE.Texture)
                    textures.add(value);
        }
        if (object instanceof THREE.SkinnedMesh)
            skeletons.add(object.skeleton);
    });
    for (const texture of textures) {
        const sources: unknown[] = Array.isArray(texture.image) ? texture.image : [texture.image];
        for (const source of sources)
            if (source && typeof source === 'object' && 'close' in source && typeof source.close === 'function')
                images.add(source as {
                    close(): void;
                });
        texture.dispose();
    }
    for (const image of images)
        image.close();
    for (const skeleton of skeletons)
        skeleton.dispose();
    for (const geometry of geometries)
        geometry.dispose();
    for (const material of materials)
        material.dispose();
    group.clear();
}
function transform(scene: THREE.Group, descriptor: ModelDescriptor) {
    // NASA's model transform overwrites the glTF root, preserving descendant transforms.
    scene.quaternion.identity();
    for (const rotation of descriptor.rotate ?? []) {
        const axis = 'x' in rotation ? new THREE.Vector3(1, 0, 0) : 'y' in rotation ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(0, 0, 1);
        const degrees = 'x' in rotation ? rotation.x : 'y' in rotation ? rotation.y : rotation.z;
        scene.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(axis, THREE.MathUtils.degToRad(degrees)));
    }
    const scale = descriptor.scale ?? 0.001;
    if (typeof scale === 'number')
        scene.scale.setScalar(scale);
    else
        scene.scale.fromArray(scale);
    scene.position.set(0, 0, 0);
    const group = new THREE.Group();
    if (descriptor.translate)
        group.position.copy(descriptor.translate);
    group.add(scene);
    group.animations = scene.animations;
    return group;
}
type Entry = {
    descriptor: ModelDescriptor;
    released: boolean;
    started: boolean;
    group?: THREE.Group;
    resolve(group: THREE.Group): void;
    reject(reason: unknown): void;
    detach(): void;
};
/** No scene cache: leases never share GPU objects or mutable scene state. */
export function createModelLibrary(renderer?: THREE.WebGLRenderer, injectedPort?: ModelLoaderPort) {
    if (!renderer && !injectedPort)
        throw new Error('A WebGL renderer is required for model decoders');
    const port = injectedPort ?? officialLoader(renderer!);
    const entries = new Set<Entry>();
    const queue: Entry[] = [];
    let pending = 0;
    let disposed = false;
    let decoderDisposed = false;
    const finish = () => {
        if (disposed && pending === 0 && !decoderDisposed) {
            decoderDisposed = true;
            port.dispose();
        }
    };
    const pump = () => {
        while (!disposed && pending < 2 && queue.length) {
            const entry = queue.shift()!;
            if (entry.released)
                continue;
            entry.started = true;
            pending++;
            Promise.resolve().then(() => port.load(entry.descriptor.url)).then(scene => {
                if (entry.released || disposed) {
                    destroy(scene);
                    return;
                }
                entry.group = transform(scene, entry.descriptor);
                entry.resolve(entry.group);
            }, error => {
                entry.reject(error);
                entry.detach();
                entries.delete(entry);
            }).finally(() => { pending--; pump(); finish(); });
        }
    };
    return {
        acquire(descriptor: ModelDescriptor, signal?: AbortSignal): ModelLease {
            let resolve!: Entry['resolve'];
            let reject!: Entry['reject'];
            const ready = new Promise<THREE.Group>((yes, no) => { resolve = yes; reject = no; });
            // Abandoned requests still reject for consumers, without unhandled rejection noise.
            void ready.catch(() => { });
            const release = () => {
                if (entry.released)
                    return;
                entry.released = true;
                entry.detach();
                entries.delete(entry);
                const index = queue.indexOf(entry);
                if (index !== -1)
                    queue.splice(index, 1);
                entry.reject(new DOMException('Model lease released', 'AbortError'));
                if (entry.group) {
                    destroy(entry.group);
                    entry.group = undefined;
                }
            };
            const entry: Entry = { descriptor, resolve, reject, released: false, started: false, detach: () => signal?.removeEventListener('abort', release) };
            entries.add(entry);
            signal?.addEventListener('abort', release, { once: true });
            if (disposed || signal?.aborted)
                release();
            else {
                queue.push(entry);
                pump();
            }
            return { ready, release };
        },
        snapshot: () => ({ active: [...entries].filter(entry => entry.group).length, pending, queued: queue.length, disposed }),
        dispose() {
            if (disposed)
                return;
            disposed = true;
            for (const entry of entries) {
                entry.released = true;
                entry.detach();
                entry.reject(new DOMException('Model library disposed', 'AbortError'));
                if (entry.group)
                    destroy(entry.group);
            }
            entries.clear();
            queue.length = 0;
            finish();
        },
    };
}
