/**
 * Probe a manifest with HEAD requests and report total download size per group.
 *
 * Concurrency-limited so we do not hammer NASA's bucket. Prints a summary table
 * and writes the per-URL sizes back into a `sizes` map alongside the manifest.
 *
 * Usage: node tools/probe-sizes.cjs <manifest.json> [concurrency]
 */
const fs = require('fs');
const path = require('path');

const [, , manifestPath = 'tools/out/manifest.json', concurrencyArg = '12'] = process.argv;
const concurrency = Number(concurrencyArg);
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const all = [...manifest.static, ...manifest.dynamic];

async function head(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    if (!res.ok) return { url, status: res.status, size: 0 };
    const len = Number(res.headers.get('content-length') || 0);
    return { url, status: res.status, size: len, type: res.headers.get('content-type') };
  } catch (err) {
    return { url, status: -1, size: 0, error: err.message };
  }
}

(async () => {
  const results = [];
  let i = 0;
  let done = 0;

  async function worker() {
    while (i < all.length) {
      const url = all[i++];
      results.push(await head(url));
      done++;
      if (done % 100 === 0) process.stderr.write(`probed ${done}/${all.length}\n`);
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker));

  const byGroup = {};
  let total = 0;
  let missing = 0;
  for (const r of results) {
    const group = groupOf(r.url);
    byGroup[group] = byGroup[group] || { count: 0, bytes: 0, missing: 0 };
    byGroup[group].count++;
    byGroup[group].bytes += r.size;
    if (r.status !== 200) {
      byGroup[group].missing++;
      missing++;
    }
    total += r.size;
  }

  const mb = (b) => (b / 1024 / 1024).toFixed(1);
  console.log('\ngroup            count   missing      size');
  for (const [g, v] of Object.entries(byGroup).sort((a, b) => b[1].bytes - a[1].bytes)) {
    console.log(`${g.padEnd(16)} ${String(v.count).padStart(5)}   ${String(v.missing).padStart(5)}   ${mb(v.bytes).padStart(8)} MB`);
  }
  console.log(`\nTOTAL ${all.length} files, ${missing} unavailable, ${mb(total)} MB`);

  const out = path.join(path.dirname(manifestPath), 'sizes.json');
  fs.writeFileSync(out, JSON.stringify(results, null, 1) + '\n');
  console.log(`wrote ${out}`);
})();

function groupOf(url) {
  if (url.includes('/dynamo/')) return 'dynamo .dyn';
  if (url.includes('/maps/')) return 'maps (textures)';
  if (url.includes('/models/')) return 'models .gltf';
  if (url.includes('/stars/')) return 'stars';
  if (url.includes('/sprites/')) return 'sprites';
  if (url.includes('/env_maps/')) return 'env_maps';
  if (url.includes('/images/')) return 'images';
  return 'other';
}
