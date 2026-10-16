/**
 * Expand the mirror manifest with dynamo index segments.
 *
 * Many `.dyn` controllers are *index* files listing hundreds of windows, each
 * stored as a separate `<kind>/<NNN>.dyn`. NASA downloads them lazily; we mirror
 * them so the app never reaches the network. This walks every index file already
 * in `data/mirror/`, parses its segment count, and appends the segment URLs.
 *
 * Usage: node tools/expand-segments.cjs [--mirror data/mirror] [--manifest tools/out/manifest.json]
 */
const fs = require('fs');
const path = require('path');
const { readIndexInfo, segmentUrls } = require('./lib/segments.cjs');

const args = parseArgs(process.argv.slice(2));
const mirror = args.mirror || 'data/mirror';
const manifestPath = args.manifest || 'tools/out/manifest.json';

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const added = [];

/**
 * Walk the mirrored `dynamic/dynamo` tree looking for index files.
 *
 * Only `def.dyn` is ever an index. Numbered siblings (`000.dyn`, `001.dyn`, …)
 * are the windows themselves, and a complete mirror holds ~105k of them, so
 * reading every `.dyn` file here both wasted work and exhausted the heap on the
 * deployment host. NASA names the index `def.dyn` in every controller seen.
 */
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (entry.name !== 'def.dyn') continue;

    let info;
    try {
      info = readIndexInfo(fs.readFileSync(full));
    } catch {
      continue;
    }
    if (info.hasPoints !== 0) continue; // inline file, no segments

    // Mirror-relative controller path without the trailing `/def.dyn`.
    const rel = path.relative(mirror, full).split(path.sep).join('/');
    const controller = rel.replace(/^dynamic\/dynamo\//, '').replace(/\/def\.dyn$/, '');

    // See `tools/lib/segments.cjs` for why the count is exclusive-of-last.
    added.push(...segmentUrls(controller, info.count, info.digits));
  }
}

walk(path.join(mirror, 'dynamic', 'dynamo'));

// Merge into the manifest's dynamic list, de-duplicated.
const set = new Set(manifest.dynamic);
let fresh = 0;
for (const url of added) if (!set.has(url)) { set.add(url); fresh++; }
manifest.dynamic = [...set].sort();

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`index files scanned, segments found: ${added.length}`);
console.log(`new dynamic URLs: ${fresh}`);
console.log(`dynamic total: ${manifest.dynamic.length}`);
console.log('wrote', manifestPath);

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) { out[key] = next; i++; } else out[key] = true;
    }
  }
  return out;
}
