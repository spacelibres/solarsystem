#!/usr/bin/env node
/**
 * Extract per-satellite Starlink launch dates from Jonathan McDowell's GCAT
 * SATCAT (CC-BY, https://planet4589.org). The resulting compact JSON is merged
 * into starlink-orbits.json by build-catalog.mjs.
 *
 * Usage:
 *   node tools/starlink/build-launch-dates.mjs
 *   node tools/starlink/build-launch-dates.mjs --source .cache/gcat-satcat.tsv
 */

import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../..');
const SOURCE_URL = 'https://planet4589.org/space/gcat/tsv/cat/satcat.tsv';
const CACHE = path.join(ROOT, '.cache/gcat-satcat.tsv');
const OUT = path.join(ROOT, 'src/data/starlink-launch-dates.json');
const EYES_OUT = path.join(ROOT, 'eyes/src/data/starlink-launch-dates.json');

const argc = process.argv.slice(2);
const sourceArg = argc.includes('--source') ? argc[argc.indexOf('--source') + 1] : null;

const months = {
  Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
  Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12',
};

function parseDate(value) {
  const match = /^(\d{4})\s+([A-Z][a-z]{2})\s+(\d{1,2})(?:\s|$)/.exec(value.trim());
  if (!match || !months[match[2]]) return null;
  return `${match[1]}-${months[match[2]]}-${match[3].padStart(2, '0')}`;
}

async function main() {
  await mkdir(path.dirname(CACHE), { recursive: true });
  const source = sourceArg || CACHE;
  if (!existsSync(source)) {
    const response = await fetch(SOURCE_URL, { signal: AbortSignal.timeout(300000) });
    if (!response.ok) throw new Error(`GCAT download failed: HTTP ${response.status}`);
    const text = await response.text();
    await writeFile(CACHE, text, 'utf8');
  }
  const text = await readFile(source === CACHE ? CACHE : path.resolve(source), 'utf8');
  const byNumber = new Map();
  for (const line of text.split(/\r?\n/)) {
    if (!line || line.startsWith('#')) continue;
    const fields = line.split('\t');
    if (fields.length < 8) continue;
    const name = fields[5].trim();
    const match = /^Starlink\s+(\d+)$/i.exec(name);
    if (!match) continue;
    const date = parseDate(fields[7]);
    if (!date) continue;
    const n = Number(match[1]);
    if (!byNumber.has(n)) byNumber.set(n, { n, date, tag: fields[2]?.trim() || null });
  }
  const satellites = [...byNumber.values()].sort((a, b) => a.n - b.n);
  const payload = {
    generatedAt: new Date().toISOString(),
    source: SOURCE_URL,
    credit: 'Jonathan McDowell, GCAT, https://planet4589.org (CC-BY)',
    count: satellites.length,
    satellites,
  };
  await writeFile(OUT, JSON.stringify(payload) + '\n', 'utf8');
  await copyFile(OUT, EYES_OUT);
  console.log(`wrote ${OUT}: ${satellites.length} dated Starlink satellites`);
}

await main();
