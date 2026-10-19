/**
 * GPU-light Starlink constellation layer.
 *
 * All markers share one Points draw and all display orbits share one
 * LineSegments draw, so a ten-thousand-satellite layer stays cheap. The layer is
 * positioned at Earth each frame by the render world; coordinates remain
 * Earth-centred inertial kilometres from the catalogue generator.
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import type { Vec3 } from '../../lib/dynamo/math';
import {
  STARLINK_MODEL_URLS,
  elementsFromState,
  starlinkGeneration,
  starlinkOrbitRing,
  starlinkPosition,
  type StarlinkElements,
  type StarlinkOrbit,
} from '../domain/starlink';

export interface StarlinkLayer {
  readonly group: THREE.Group;
  readonly count: number;
  setVisible(visible: boolean): void;
  setSelected(number: number | null): void;
  update(timeEt: number, earthPosition: Vec3, focusPosition: Vec3): void;
  dispose(): void;
}

export function createStarlinkLayer(orbits: readonly StarlinkOrbit[]): StarlinkLayer {
  const group = new THREE.Group();
  group.name = 'starlink-constellation';
  const valid: { orbit: StarlinkOrbit; elements: StarlinkElements }[] = [];
  for (const orbit of orbits) {
    const elements = elementsFromState(orbit);
    if (elements) valid.push({ orbit, elements });
  }

  const pointPositions = new Float32Array(valid.length * 3);
  valid.forEach(({ orbit }, index) => {
    pointPositions[index * 3] = orbit.p[0];
    pointPositions[index * 3 + 1] = orbit.p[1];
    pointPositions[index * 3 + 2] = orbit.p[2];
  });

  const pointGeometry = new THREE.BufferGeometry();
  pointGeometry.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));
  const pointMaterial = new THREE.PointsMaterial({
    color: 0x9ccfff,
    size: 1.2,
    sizeAttenuation: false,
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
  });
  const points = new THREE.Points(pointGeometry, pointMaterial);
  points.frustumCulled = false;
  group.add(points);

  let lastPointTime = Number.NEGATIVE_INFINITY;
  let selectedLine: THREE.LineLoop | null = null;
  let selectedGeometry: THREE.BufferGeometry | null = null;
  let selectedMaterial: THREE.LineBasicMaterial | null = null;
  const byNumber = new Map(valid.map(entry => [entry.orbit.n, entry]));
  const modelLoader = new GLTFLoader();
  const modelCache = new Map<number, Promise<THREE.Group>>();
  let selectedNumber: number | null = null;
  let selectedModel: THREE.Group | null = null;
  let modelToken = 0;
  const modelForGeneration = (generation: 1 | 2 | 3) => {
    let pending = modelCache.get(generation);
    if (!pending) {
      pending = modelLoader.loadAsync(STARLINK_MODEL_URLS[generation]).then(gltf => gltf.scene);
      modelCache.set(generation, pending);
    }
    return pending;
  };

  const layer: StarlinkLayer = {
    group,
    count: valid.length,
    setVisible(visible: boolean) {
      group.visible = visible;
    },
    setSelected(number: number | null) {
      if (selectedLine) {
        group.remove(selectedLine);
        selectedGeometry?.dispose();
        selectedMaterial?.dispose();
        selectedLine = null;
        selectedGeometry = null;
        selectedMaterial = null;
      }
      selectedNumber = number;
      const token = ++modelToken;
      if (selectedModel) {
        selectedModel.removeFromParent();
        selectedModel = null;
      }
      if (number === null) return;
      const entry = byNumber.get(number);
      if (!entry) return;
      const generation = entry.orbit.g ?? starlinkGeneration(number);
      void modelForGeneration(generation).then(scene => {
        if (token !== modelToken || selectedNumber !== number) return;
        const model = scene.clone(true);
        // The generated model is authored in metres; show it as a compact
        // selected-satellite marker rather than pretending to be physical scale.
        model.scale.setScalar(35);
        model.name = `starlink-model-gen${generation}`;
        selectedModel = model;
        group.add(model);
      }).catch(error => console.warn('Starlink model unavailable:', error));
      const ring = starlinkOrbitRing(entry.elements, 128);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(ring, 3));
      const material = new THREE.LineBasicMaterial({ color: 0x7fe3ff, transparent: true, opacity: 0.95, depthWrite: false });
      selectedLine = new THREE.LineLoop(geometry, material);
      selectedLine.frustumCulled = false;
      selectedGeometry = geometry;
      selectedMaterial = material;
      group.add(selectedLine);
    },
    update(timeEt: number, earthPosition: Vec3, focusPosition: Vec3) {
      group.position.set(earthPosition.x - focusPosition.x, earthPosition.y - focusPosition.y, earthPosition.z - focusPosition.z);
      if (!group.visible) return;
      if (Math.abs(timeEt - lastPointTime) < 0.5) return;
      lastPointTime = timeEt;
      const attribute = pointGeometry.getAttribute('position') as THREE.BufferAttribute;
      const array = attribute.array as Float32Array;
      for (let index = 0; index < valid.length; index += 1) {
        const position = starlinkPosition(valid[index].elements, timeEt);
        array[index * 3] = position.x;
        array[index * 3 + 1] = position.y;
        array[index * 3 + 2] = position.z;
      }
      attribute.needsUpdate = true;
      if (selectedModel && selectedNumber !== null) {
        const entry = byNumber.get(selectedNumber);
        if (entry) {
          const satellite = starlinkPosition(entry.elements, timeEt);
          selectedModel.position.set(satellite.x, satellite.y, satellite.z);
        }
      }
    },
    dispose() {
      group.removeFromParent();
      pointGeometry.dispose();
      pointMaterial.dispose();
      selectedGeometry?.dispose();
      selectedMaterial?.dispose();
      selectedModel?.removeFromParent();
    },
  };
  layer.setVisible(false);
  return layer;
}
