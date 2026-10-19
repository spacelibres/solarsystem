#!/usr/bin/env node
/**
 * Convert Starlink epoch states into the same NASA Eyes dynamo (`pos` .dyn)
 * format the recovered app already loads. The three generation samples are
 * committed; `--all` can generate a deploy-time pack for every catalogue entry.
 *
 * Usage:
 *   node tools/starlink/build-dyn.mjs
 *   node tools/starlink/build-dyn.mjs --all --out public/eyes/dyn/starlink
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { TimeUtils } from '../../eyes/src/engine/core/TimeUtils.js';

const ROOT = path.resolve(import.meta.dirname, '../..');
const CATALOG = path.join(ROOT, 'src/data/starlink-orbits.json');
const OUT = path.join(ROOT, 'eyes/src/dyn/starlink');
const GM = 398600.4418;
const args = process.argv.slice(2);
const ALL = args.includes('--all');
const OUT_DIR = args.includes('--out') ? path.resolve(args[args.indexOf('--out') + 1]) : OUT;

const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = a => Math.hypot(a[0], a[1], a[2]);
const scale = (a, s) => [a[0] * s, a[1] * s, a[2] * s];

function elements(orbit) {
  const p = orbit.p;
  const v = orbit.v;
  const r = norm(p);
  const v2 = dot(v, v);
  const a = 1 / (2 / r - v2 / GM);
  const evec = scale(
    [ (v2 - GM / r) * p[0] - dot(p, v) * v[0], (v2 - GM / r) * p[1] - dot(p, v) * v[1], (v2 - GM / r) * p[2] - dot(p, v) * v[2] ],
    1 / GM,
  );
  const e = norm(evec);
  const h = cross(p, v);
  const P = scale(evec, 1 / Math.max(e, 1e-9));
  const Q = scale(cross(h, P), 1 / Math.max(norm(cross(h, P)), 1e-9));
  const trueAnomaly = Math.atan2(dot(p, Q), dot(p, P));
  const E = 2 * Math.atan(Math.sqrt((1 - e) / (1 + e)) * Math.tan(trueAnomaly / 2));
  const M = E - e * Math.sin(E);
  const n = Math.sqrt(GM / (a ** 3));
  return { epoch: orbit.e, a, e, M, n, P, Q };
}

function stateAt(el, timeEt) {
  const M = el.M + el.n * (timeEt - TimeUtils.unixToEt(el.epoch));
  let E = M;
  for (let i = 0; i < 8; i += 1) E -= (E - el.e * Math.sin(E) - M) / (1 - el.e * Math.cos(E));
  const nu = 2 * Math.atan2(Math.sqrt(1 + el.e) * Math.sin(E / 2), Math.sqrt(1 - el.e) * Math.cos(E / 2));
  const radius = el.a * (1 - el.e * Math.cos(E));
  const p = [
    radius * (Math.cos(nu) * el.P[0] + Math.sin(nu) * el.Q[0]),
    radius * (Math.cos(nu) * el.P[1] + Math.sin(nu) * el.Q[1]),
    radius * (Math.cos(nu) * el.P[2] + Math.sin(nu) * el.Q[2]),
  ];
  return { position: p, velocity: scale(p, 0) };
}

/** `pos` dynamo v2 with inline Hermite samples. */
function encodeDyn(samples) {
  const size = 2 + 4 + 1 + 1 + 4 + samples.length * 56;
  const buffer = Buffer.alloc(size);
  let offset = 0;
  buffer.writeInt16LE(2, offset); offset += 2;
  buffer.write('pos\0', offset, 'ascii'); offset += 4;
  buffer.writeUInt8(0, offset); offset += 1;
  buffer.writeUInt8(1, offset); offset += 1;
  buffer.writeInt32LE(samples.length, offset); offset += 4;
  for (const sample of samples) {
    buffer.writeDoubleLE(sample.time, offset); offset += 8;
    for (const value of sample.position) { buffer.writeDoubleLE(value, offset); offset += 8; }
    for (const value of sample.velocity) { buffer.writeDoubleLE(value, offset); offset += 8; }
  }
  return buffer;
}

async function writeSatellite(orbit, directory) {
  const el = elements(orbit);
  const start = TimeUtils.unixToEt(orbit.e);
  const samples = [];
  for (let step = 0; step <= 384; step += 1) {
    const time = start - 3600 + step * 1800;
    samples.push({ time, ...stateAt(el, time) });
  }
  for (let index = 0; index < samples.length; index += 1) {
    const previous = samples[Math.max(0, index - 1)];
    const next = samples[Math.min(samples.length - 1, index + 1)];
    const dt = next.time - previous.time;
    samples[index].velocity = [
      (next.position[0] - previous.position[0]) / dt,
      (next.position[1] - previous.position[1]) / dt,
      (next.position[2] - previous.position[2]) / dt,
    ];
  }
  await mkdir(directory, { recursive: true });
  const bytes = encodeDyn(samples);
  await writeFile(path.join(directory, 'def.dyn'), bytes);
  return bytes.length;
}

const catalogue = JSON.parse(await readFile(CATALOG, 'utf8'));
const selected = ALL
  ? catalogue.satellites
  : [1, 2, 3].map(generation => catalogue.satellites.find(satellite => (satellite.g ?? 1) === generation)).filter(Boolean);

let total = 0;
for (const satellite of selected) {
  if (!ALL) {
    const generation = satellite.g ?? 1;
    total += await writeSatellite(satellite, path.join(OUT_DIR, `starlink-gen${generation}`));
  } else {
    total += await writeSatellite(satellite, path.join(OUT_DIR, String(satellite.n)));
  }
}
console.log(`wrote ${selected.length} dynamo pos files (${total} bytes) under ${OUT_DIR}`);
