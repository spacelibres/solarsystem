#!/usr/bin/env node
/**
 * Build a compact all-Starlink orbit catalogue from Starlink's public
 * ephemerides.
 *
 * Downloading every full file is about 56 GB. The public server supports HTTP
 * Range requests and each OCM file starts with its metadata and first state
 * vector, so this tool fetches only the header window (~8 KiB) for every
 * satellite in MANIFEST.txt. The resulting catalogue holds one epoch state per
 * satellite, which is enough to draw and propagate a two-body display orbit.
 *
 * Usage:
 *   node tools/starlink/build-catalog.mjs
 *   node tools/starlink/build-catalog.mjs --limit 20 --out .cache/starlink-test.json
 *   node tools/starlink/build-catalog.mjs --resume
 */

import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(import.meta.dirname, '../..');
const MANIFEST_URL = 'https://api.starlink.com/public-files/ephemerides/MANIFEST.txt';
const FILE_URL = number => `https://api.starlink.com/public-files/ephemerides/STARLINK-${number}.txt`;
const CACHE = path.join(ROOT, '.cache/starlink');
const OUT = path.join(ROOT, 'src/data/starlink-orbits.json');
const EYES_OUT = path.join(ROOT, 'eyes/src/data/starlink-orbits.json');
const PUBLIC_OUT = path.join(ROOT, 'public/eyes/data/starlink-orbits.json');

const args = process.argv.slice(2);
const option = (name, fallback = null) => {
  const index = args.indexOf(`--${name}`);
  if (index < 0) return fallback;
  const value = args[index + 1];
  return value && !value.startsWith('--') ? value : true;
};
const LIMIT = Number(option('limit', 0)) || 0;
const CONCURRENCY = Math.max(1, Number(option('concurrency', 24)) || 24);
const OUT_FILE = String(option('out', OUT));
const RESUME = Boolean(option('resume', false));
const WINDOW_BYTES = 8192;

const GMST = jd => {
  const T = (jd - 2451545.0) / 36525;
  const degrees = 280.46061837 + 360.98564736629 * (jd - 2451545.0)
    + 0.000387933 * T * T - (T * T * T) / 38710000;
  return ((degrees % 360) + 360) % 360 * Math.PI / 180;
};

function ecefToEci(epochSeconds, position, velocity) {
  const theta = GMST(epochSeconds / 86400 + 2440587.5);
  const c = Math.cos(-theta);
  const s = Math.sin(-theta);
  // The OCM velocity is the derivative in the rotating ITRF frame; add the
  // Earth-rotation term before rotating the state into the inertial frame.
  const omega = 7.2921150e-5;
  const inertialVelocity = [
    velocity[0] - omega * position[1],
    velocity[1] + omega * position[0],
    velocity[2],
  ];
  const rotate = vector => ({
    x: c * vector[0] - s * vector[1],
    y: s * vector[0] + c * vector[1],
    z: vector[2],
  });
  const p = rotate(position);
  const v = rotate(inertialVelocity);
  return [[p.x, p.y, p.z], [v.x, v.y, v.z]];
}

function parseOcm(text, fallbackNumber) {
  const epochMatch = /^EPOCH_TZERO\s*=\s*(\S+)/m.exec(text);
  const frameMatch = /^TRAJ_REF_FRAME\s*=\s*(\S+)/m.exec(text);
  const nameMatch = /^OBJECT_NAME\s*=\s*(\S+)/m.exec(text);
  const trajectoryStart = text.indexOf('TRAJ_START');
  const body = trajectoryStart >= 0 ? text.slice(trajectoryStart) : text;
  const lineMatch = /^(\d{4}-\d{2}-\d{2}T[\d:.]+Z)\s+([-\d.eE+]+)\s+([-\d.eE+]+)\s+([-\d.eE+]+)\s+([-\d.eE+]+)\s+([-\d.eE+]+)\s+([-\d.eE+]+)/m.exec(body);
  if (!epochMatch || !lineMatch) return null;
  const epoch = Date.parse(epochMatch[1]);
  if (!Number.isFinite(epoch)) return null;
  const values = lineMatch.slice(2, 8).map(Number);
  if (values.some(value => !Number.isFinite(value))) return null;
  const position = values.slice(0, 3);
  const velocity = values.slice(3, 6);
  const isEarthFixed = (frameMatch?.[1] || '').toUpperCase().includes('ITRF') || (frameMatch?.[1] || '').toUpperCase().includes('ECEF');
  const [p, v] = isEarthFixed ? ecefToEci(epoch / 1000, position, velocity) : [position, velocity];
  const number = Number(fallbackNumber);
  return {
    n: number,
    g: number >= 40000 ? 3 : number >= 30000 ? 2 : 1,
    name: nameMatch?.[1] || `STARLINK-${fallbackNumber}`,
    e: Math.round(epoch / 1000),
    p,
    v,
  };
}

async function fetchWindow(number) {
  const cacheFile = path.join(CACHE, `${number}.txt`);
  if (RESUME && existsSync(cacheFile)) return readFile(cacheFile, 'utf8');
  let lastError;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(FILE_URL(number), {
        headers: { Range: `bytes=0-${WINDOW_BYTES - 1}` },
        signal: AbortSignal.timeout(20000),
      });
      if (response.status !== 200 && response.status !== 206) throw new Error(`HTTP ${response.status}`);
      const text = await response.text();
      if (!text.includes('TRAJ_START')) throw new Error('no TRAJ_START in header window');
      await writeFile(cacheFile, text, 'utf8');
      return text;
    } catch (error) {
      lastError = error;
      await new Promise(resolve => setTimeout(resolve, 150 * (attempt + 1)));
    }
  }
  throw lastError;
}

async function main() {
  await mkdir(CACHE, { recursive: true });
  const manifest = await (await fetch(MANIFEST_URL, { signal: AbortSignal.timeout(60000) })).text();
  const numbers = [];
  const seen = new Set();
  for (const line of manifest.split(/\r?\n/)) {
    const match = /_STARLINK-(\d+)_/.exec(line);
    if (!match || seen.has(match[1])) continue;
    seen.add(match[1]);
    numbers.push(match[1]);
  }
  numbers.sort((a, b) => Number(a) - Number(b));
  const selected = LIMIT ? numbers.slice(0, LIMIT) : numbers;
  console.error(`manifest: ${numbers.length} satellites; fetching ${selected.length} header windows with concurrency ${CONCURRENCY}`);

  const satellites = [];
  let cursor = 0;
  let completed = 0;
  let failures = 0;
  const started = Date.now();
  async function worker() {
    while (cursor < selected.length) {
      const number = selected[cursor++];
      try {
        const text = await fetchWindow(number);
        const parsed = parseOcm(text, number);
        if (parsed) satellites.push(parsed);
        else failures += 1;
      } catch (error) {
        failures += 1;
        if (failures <= 10) console.error(`skip STARLINK-${number}: ${error.message}`);
      }
      completed += 1;
      if (completed % 250 === 0) {
        const rate = completed / ((Date.now() - started) / 1000);
        console.error(`${completed}/${selected.length} (${rate.toFixed(1)}/s, ${failures} failures)`);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  satellites.sort((a, b) => a.n - b.n);
  const payload = {
    generatedAt: new Date().toISOString(),
    source: 'https://api.starlink.com/public-files/ephemerides/',
    manifestSha256: createHash('sha256').update(manifest).digest('hex'),
    count: satellites.length,
    manifestCount: numbers.length,
    satellites,
  };
  await writeFile(OUT_FILE, JSON.stringify(payload) + '\n', 'utf8');
  // The recovered Eyes app fetches the same catalogue from public/; keep both
  // copies identical so a refresh updates Explorer and Eyes together.
  if (path.resolve(OUT_FILE) === path.resolve(OUT)) {
    await mkdir(path.dirname(EYES_OUT), { recursive: true });
    await copyFile(OUT_FILE, EYES_OUT);
    await mkdir(path.dirname(PUBLIC_OUT), { recursive: true });
    await copyFile(OUT_FILE, PUBLIC_OUT);
  }
  console.log(`wrote ${OUT_FILE}: ${satellites.length}/${selected.length} satellites, ${failures} failures, ${(Date.now() - started) / 1000 | 0}s`);
}

await main();
