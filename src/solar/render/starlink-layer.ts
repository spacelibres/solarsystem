/**
 * GPU-light Starlink constellation layer.
 *
 * All satellites share one Points draw. A selection merges every chosen orbit
 * ring into one LineSegments draw; the first dozen selections additionally load
 * their generation-specific GLB model. The layer is positioned at Earth each
 * frame; coordinates remain Earth-centred inertial kilometres.
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
  setSelection(numbers: readonly number[]): void;
  setSelected(number: number | null): void;
  update(timeEt: number, earthPosition: Vec3, focusPosition: Vec3): void;
  dispose(): void;
}

const MAX_SELECTED_MODELS = 12;
const SELECTED_ORBIT_SEGMENTS = 64;

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
  const panelNormal = new THREE.Vector3(0, 0, 1);
  const sunDirection = new THREE.Vector3();
  const byNumber = new Map(valid.map(entry => [entry.orbit.n, entry]));
  const modelLoader = new GLTFLoader();
  const modelCache = new Map<number, Promise<THREE.Group>>();
  let selectedNumbers: readonly number[] = [];
  let selectedOrbitLine: THREE.LineSegments | null = null;
  const selectedModels = new Map<number, THREE.Group>();
  let selectionToken = 0;

  const modelForGeneration = (generation: 1 | 2 | 3) => {
    let pending = modelCache.get(generation);
    if (!pending) {
      pending = modelLoader.loadAsync(STARLINK_MODEL_URLS[generation]).then(gltf => gltf.scene);
      modelCache.set(generation, pending);
    }
    return pending;
  };

  const clearSelection = () => {
    if (selectedOrbitLine) {
      selectedOrbitLine.removeFromParent();
      selectedOrbitLine.geometry.dispose();
      (selectedOrbitLine.material as THREE.Material).dispose();
      selectedOrbitLine = null;
    }
    for (const model of selectedModels.values()) model.removeFromParent();
    selectedModels.clear();
  };

  const layer: StarlinkLayer = {
    group,
    count: valid.length,
    setVisible(visible: boolean) {
      group.visible = visible;
    },
    setSelection(numbers: readonly number[]) {
      const unique = [...new Set(numbers)].filter(number => byNumber.has(number));
      selectionToken += 1;
      const token = selectionToken;
      clearSelection();
      selectedNumbers = unique;
      if (unique.length > 0) {
        const positions = new Float32Array(unique.length * SELECTED_ORBIT_SEGMENTS * 2 * 3);
        let offset = 0;
        for (const number of unique) {
          const entry = byNumber.get(number);
          if (!entry) continue;
          const ring = starlinkOrbitRing(entry.elements, SELECTED_ORBIT_SEGMENTS);
          for (let segment = 0; segment < SELECTED_ORBIT_SEGMENTS; segment += 1) {
            const next = (segment + 1) % SELECTED_ORBIT_SEGMENTS;
            for (const vertex of [segment, next]) {
              positions[offset++] = ring[vertex * 3];
              positions[offset++] = ring[vertex * 3 + 1];
              positions[offset++] = ring[vertex * 3 + 2];
            }
          }
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions.subarray(0, offset), 3));
        const material = new THREE.LineBasicMaterial({ color: 0xffd166, transparent: true, opacity: 0.65, depthWrite: false });
        selectedOrbitLine = new THREE.LineSegments(geometry, material);
        selectedOrbitLine.frustumCulled = false;
        group.add(selectedOrbitLine);
      }
      unique.slice(0, MAX_SELECTED_MODELS).forEach(number => {
        const entry = byNumber.get(number);
        if (!entry) return;
        const generation = entry.orbit.g ?? starlinkGeneration(number);
        void modelForGeneration(generation).then(scene => {
          if (token !== selectionToken || !selectedNumbers.includes(number)) return;
          const model = scene.clone(true);
          model.scale.setScalar(35);
          model.name = `starlink-model-gen${generation}-${number}`;
          selectedModels.set(number, model);
          group.add(model);
        }).catch(error => console.warn('Starlink model unavailable:', error));
      });
    },
    setSelected(number: number | null) {
      layer.setSelection(number === null ? [] : [number]);
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
      for (const [number, model] of selectedModels) {
        const entry = byNumber.get(number);
        if (!entry) continue;
        const satellite = starlinkPosition(entry.elements, timeEt);
        model.position.set(satellite.x, satellite.y, satellite.z);
        // Solar wings are the XY planes of the generated model; point their
        // +Z normal at the Sun so the panels track the light source.
        sunDirection.set(-(earthPosition.x + satellite.x), -(earthPosition.y + satellite.y), -(earthPosition.z + satellite.z)).normalize();
        if (sunDirection.lengthSq() > 0) model.quaternion.setFromUnitVectors(panelNormal, sunDirection);
      }
    },
    dispose() {
      selectionToken += 1;
      clearSelection();
      group.removeFromParent();
      pointGeometry.dispose();
      pointMaterial.dispose();
    },
  };
  layer.setVisible(false);
  return layer;
}
