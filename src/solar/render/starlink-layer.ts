/**
 * GPU-light Starlink constellation layer.
 *
 * All satellites share one Points draw. Selected satellites get NASA-style
 * fading TrailRibbon orbits; the first dozen also load a generation model.
 * Detailed selected tracks come from the dynamo API when available, falling back
 * to the compact catalogue. The layer is anchored to Earth each frame.
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import type { Vec3 } from '../../lib/dynamo/math';
import { parseDyn, type PosPoint } from '../../lib/dynamo/parse';
import { TrailRibbon } from './trail-ribbon';
import {
  STARLINK_MODEL_URLS,
  elementsFromState,
  starlinkGeneration,
  starlinkOrbitRing,
  starlinkPosition,
  type StarlinkElements,
  type StarlinkOrbit,
} from '../domain/starlink';

export interface StarlinkColors {
  readonly primary: string;
  readonly secondary: string;
  readonly accent: string;
}

export interface StarlinkLayer {
  readonly group: THREE.Group;
  readonly count: number;
  setVisible(visible: boolean): void;
  setSelection(numbers: readonly number[]): void;
  setSelected(number: number | null): void;
  setViewport(width: number, height: number): void;
  setColors(colors: StarlinkColors): void;
  update(timeEt: number, earthPosition: Vec3, focusPosition: Vec3): void;
  dispose(): void;
}

const MAX_SELECTED_MODELS = 12;
const MAX_DYN_TRACKS = 60;
const ORBIT_SEGMENTS = 128;

type Track = {
  ribbon: TrailRibbon;
  dyn: PosPoint[] | null;
  index: number;
};

function interpolate(points: readonly PosPoint[], time: number) {
  if (points.length === 0) return null;
  if (time <= points[0].time) return points[0].position;
  if (time >= points[points.length - 1].time) return points[points.length - 1].position;
  let low = 0;
  let high = points.length - 1;
  while (high - low > 1) {
    const middle = (low + high) >> 1;
    if (points[middle].time <= time) low = middle;
    else high = middle;
  }
  const before = points[low];
  const after = points[high];
  const f = (time - before.time) / (after.time - before.time);
  return {
    x: before.position.x + (after.position.x - before.position.x) * f,
    y: before.position.y + (after.position.y - before.position.y) * f,
    z: before.position.z + (after.position.z - before.position.z) * f,
  };
}

export function createStarlinkLayer(orbits: readonly StarlinkOrbit[], colors: StarlinkColors = {
  primary: '#007bff',
  secondary: '#ff3733',
  accent: '#f4f764',
}): StarlinkLayer {
  const primary = new THREE.Color(colors.primary);
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
    color: primary,
    size: 1.2,
    sizeAttenuation: false,
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
  });
  const points = new THREE.Points(pointGeometry, pointMaterial);
  points.frustumCulled = false;
  points.raycast = () => {};
  group.add(points);

  let lastPointTime = Number.NEGATIVE_INFINITY;
  const byNumber = new Map(valid.map(entry => [entry.orbit.n, entry]));
  const modelLoader = new GLTFLoader();
  const modelCache = new Map<number, Promise<THREE.Group>>();
  const tracks = new Map<number, Track>();
  const models = new Map<number, THREE.Group>();
  let selectedNumbers: readonly number[] = [];
  let selectionToken = 0;
  let viewport = { width: 1440, height: 900 };
  let currentColors = colors;

  const modelForGeneration = (generation: 1 | 2 | 3) => {
    let pending = modelCache.get(generation);
    if (!pending) {
      pending = modelLoader.loadAsync(STARLINK_MODEL_URLS[generation]).then(gltf => gltf.scene);
      modelCache.set(generation, pending);
    }
    return pending;
  };

  const clearSelection = () => {
    for (const track of tracks.values()) {
      track.ribbon.removeFromParent();
      track.ribbon.geometry.dispose();
      (track.ribbon.material as THREE.Material).dispose();
    }
    tracks.clear();
    for (const model of models.values()) model.removeFromParent();
    models.clear();
  };

  const makeTrack = (number: number, entry: { orbit: StarlinkOrbit; elements: StarlinkElements }, index: number, token: number) => {
    const ribbon = new TrailRibbon(256);
    ribbon.setResolution(viewport.width, viewport.height);
    ribbon.setOrbitStyle(index === 0 ? currentColors.primary : currentColors.accent, index === 0 ? 0.8 : 0.55, index === 0 ? 1.4 : 0.9);
    ribbon.raycast = () => {};
    const ring = starlinkOrbitRing(entry.elements, ORBIT_SEGMENTS).reduce<Vec3[]>((list, _, offset, array) => {
      if (offset % 3 === 0) list.push({ x: array[offset], y: array[offset + 1], z: array[offset + 2] });
      return list;
    }, []);
    ribbon.update(ring, true);
    group.add(ribbon);
    const track: Track = { ribbon, dyn: null, index };
    tracks.set(number, track);

    if (index < MAX_DYN_TRACKS) {
      void fetch(`/api/starlink-dyn?n=${number}`)
        .then(response => response.ok ? response.arrayBuffer() : Promise.reject(new Error(`HTTP ${response.status}`)))
        .then(buffer => {
          if (token !== selectionToken || !selectedNumbers.includes(number)) return;
          const parsed = parseDyn(buffer);
          const points = parsed.points.filter((point): point is PosPoint => point.kind === 'pos');
          if (points.length < 2) return;
          track.dyn = points;
          ribbon.update(points.map(point => point.position), true);
          ribbon.setOrbitStyle(index === 0 ? currentColors.primary : currentColors.accent, index === 0 ? 0.8 : 0.55, index === 0 ? 1.4 : 0.9);
        })
        .catch(error => console.warn(`Starlink ${number} dynamo trail unavailable:`, error));
    }
  };

  const layer: StarlinkLayer = {
    group,
    count: valid.length,
    setVisible(visible: boolean) {
      group.visible = visible;
    },
    setColors(next: StarlinkColors) {
      currentColors = next;
      pointMaterial.color.set(next.primary);
      for (const track of tracks.values()) {
        track.ribbon.setOrbitStyle(track.index === 0 ? next.primary : next.accent, track.index === 0 ? 0.8 : 0.55, track.index === 0 ? 1.4 : 0.9);
      }
    },
    setViewport(width: number, height: number) {
      viewport = { width: Math.max(1, width), height: Math.max(1, height) };
      for (const track of tracks.values()) track.ribbon.setResolution(viewport.width, viewport.height);
    },
    setSelection(numbers: readonly number[]) {
      const unique = [...new Set(numbers)].filter(number => byNumber.has(number));
      selectionToken += 1;
      const token = selectionToken;
      clearSelection();
      selectedNumbers = unique;
      unique.forEach((number, index) => {
        const entry = byNumber.get(number);
        if (!entry) return;
        makeTrack(number, entry, index, token);
        if (index >= MAX_SELECTED_MODELS) return;
        const generation = entry.orbit.g ?? starlinkGeneration(number);
        void modelForGeneration(generation).then(scene => {
          if (token !== selectionToken || !selectedNumbers.includes(number)) return;
          const model = scene.clone(true);
          model.scale.setScalar(35);
          model.name = `starlink-model-gen${generation}-${number}`;
          model.traverse(object => { object.raycast = () => {}; });
          models.set(number, model);
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
      for (const [number, model] of models) {
        const entry = byNumber.get(number);
        if (!entry) continue;
        const dynPosition = tracks.get(number)?.dyn ? interpolate(tracks.get(number)!.dyn!, timeEt) : null;
        const satellite = dynPosition ?? starlinkPosition(entry.elements, timeEt);
        model.position.set(satellite.x, satellite.y, satellite.z);
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
