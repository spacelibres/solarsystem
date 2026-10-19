#!/usr/bin/env node
/**
 * Build the three clean-room Starlink display models used by Eyes and the
 * Explorer. They are generated from primitive geometry so the repository owns
 * the assets and can license them with the project (MIT); no third-party mesh
 * or texture is copied. Public references used for proportions:
 * - Starlink v1.0/v1.5: compact bus, one deployable solar wing.
 * - Starlink v2 Mini: larger bus, two solar wings, denser phased array.
 * - Starlink V3: Starship-class envelope, two very large wings.
 *
 * The models are intentionally low-poly: the constellation renders 11k points
 * and only selected/sample satellites display a mesh.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import * as THREE from 'three';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

globalThis.FileReader = class {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then(buffer => {
      this.result = buffer;
      this.onloadend?.();
    });
  }
  readAsDataURL(blob) {
    blob.arrayBuffer().then(buffer => {
      this.result = 'data:application/octet-stream;base64,' + Buffer.from(buffer).toString('base64');
      this.onloadend?.();
    });
  }
};

const OUT = path.resolve(import.meta.dirname, '../../eyes/src/models/starlink');

const white = () => new THREE.MeshStandardMaterial({ color: 0xf2f4f7, roughness: 0.55, metalness: 0.35 });
const dark = () => new THREE.MeshStandardMaterial({ color: 0x171d2b, roughness: 0.35, metalness: 0.5 });
const solar = () => new THREE.MeshStandardMaterial({ color: 0x14294d, roughness: 0.3, metalness: 0.7 });
const silver = () => new THREE.MeshStandardMaterial({ color: 0xb8c2d0, roughness: 0.35, metalness: 0.8 });

function box(group, size, position, material, name) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), material);
  mesh.position.set(position[0], position[1], position[2]);
  mesh.name = name;
  group.add(mesh);
  return mesh;
}

function cylinder(group, radius, length, position, rotation, material, name) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, length, 8), material);
  mesh.position.set(position[0], position[1], position[2]);
  mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
  mesh.name = name;
  group.add(mesh);
  return mesh;
}

function wing(group, side, width, height, thickness, busWidth, name) {
  const direction = side < 0 ? -1 : 1;
  const x = direction * (busWidth / 2 + width / 2 + 0.18);
  box(group, [width, height, thickness], [x, 0, 0], solar(), `${name}-panel`);
  box(group, [Math.max(0.22, width * 0.05), height * 1.02, thickness * 1.4], [x, 0, 0], silver(), `${name}-frame`);
  box(group, [0.5, height * 0.9, thickness * 1.1], [direction * (busWidth / 2 + 0.09), 0, 0], silver(), `${name}-hinge`);
}

function bus(group, width, height, depth, material = white()) {
  box(group, [width, height, depth], [0, 0, 0], material, 'bus');
  box(group, [width * 0.9, height * 0.08, depth * 0.7], [0, height * 0.54, 0], silver(), 'bus-rail-top');
  box(group, [width * 0.9, height * 0.08, depth * 0.7], [0, -height * 0.54, 0], silver(), 'bus-rail-bottom');
}

function phasedArray(group, width, height, depth) {
  const rows = 4;
  const columns = 3;
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const x = (column - (columns - 1) / 2) * (width / columns) * 0.9;
      const y = (row - (rows - 1) / 2) * (height / rows) * 0.9;
      box(group, [width / columns * 0.78, height / rows * 0.78, depth], [x, y, -0.3], dark(), `array-${row}-${column}`);
    }
  }
}

function thrusters(group, width, height) {
  for (const side of [-1, 1]) {
    cylinder(group, 0.12, 0.35, [side * width * 0.3, -height * 0.6, 0], [Math.PI / 2, 0, 0], silver(), 'thruster');
  }
}

function gen1() {
  const group = new THREE.Group();
  group.name = 'starlink-gen1';
  bus(group, 2.8, 1.4, 0.24);
  wing(group, -1, 3.4, 1.5, 0.08, 2.8, 'wing-port');
  phasedArray(group, 2.3, 1.15, 0.08);
  box(group, [1.1, 0.5, 0.35], [0.7, -0.82, 0.1], silver(), 'antenna');
  thrusters(group, 2.8, 1.4);
  group.userData = { generation: 1, label: 'Starlink Gen1', license: 'MIT / spacelibre clean-room' };
  return group;
}

function gen2() {
  const group = new THREE.Group();
  group.name = 'starlink-gen2';
  bus(group, 4.2, 2.1, 0.32);
  wing(group, -1, 5.0, 2.2, 0.1, 4.2, 'wing-port');
  wing(group, 1, 5.0, 2.2, 0.1, 4.2, 'wing-starboard');
  phasedArray(group, 3.7, 1.8, 0.1);
  box(group, [1.7, 0.55, 0.42], [0, -1.25, 0.16], silver(), 'antenna-bay');
  box(group, [1.1, 0.3, 0.25], [0, 1.25, 0.1], silver(), 'laser-terminal');
  thrusters(group, 4.2, 2.1);
  group.userData = { generation: 2, label: 'Starlink Gen2 / v2 Mini', license: 'MIT / spacelibre clean-room' };
  return group;
}

function gen3() {
  const group = new THREE.Group();
  group.name = 'starlink-gen3';
  bus(group, 6.4, 3.2, 0.5);
  wing(group, -1, 8.4, 3.7, 0.14, 6.4, 'wing-port');
  wing(group, 1, 8.4, 3.7, 0.14, 6.4, 'wing-starboard');
  phasedArray(group, 5.8, 2.9, 0.14);
  box(group, [2.6, 0.8, 0.55], [0, -1.95, 0.2], silver(), 'antenna-bay');
  box(group, [1.5, 0.4, 0.3], [0, 1.95, 0.1], silver(), 'laser-terminal');
  box(group, [0.9, 0.5, 0.4], [2.3, 0.9, 0.1], silver(), 'avionics');
  thrusters(group, 6.4, 3.2);
  group.userData = { generation: 3, label: 'Starlink Gen3 / V3', license: 'MIT / spacelibre clean-room' };
  return group;
}

async function exportModel(group, name) {
  const scene = new THREE.Scene();
  scene.add(group);
  const exporter = new GLTFExporter();
  const buffer = await new Promise((resolve, reject) => {
    exporter.parse(scene, result => resolve(result), error => reject(error), { binary: true });
  });
  await writeFile(path.join(OUT, name), Buffer.from(buffer));
  console.log(name, Buffer.from(buffer).byteLength, 'bytes');
}

await mkdir(OUT, { recursive: true });
await exportModel(gen1(), 'starlink-gen1.glb');
await exportModel(gen2(), 'starlink-gen2.glb');
await exportModel(gen3(), 'starlink-gen3.glb');
