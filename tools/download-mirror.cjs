/**
 * Download every NASA Eyes asset in the manifest into a local mirror.
 *
 * The mirror lets the app run fully offline: no runtime requests to NASA.
 * Files are written under `data/mirror/` preserving their URL path, so
 *   https://eyes.nasa.gov/assets/static/maps/earth/color_512_0.png
 * becomes
 *   data/mirror/static/maps/earth/color_512_0.png
 *
 * Usage:
 *   node tools/download-mirror.cjs [--manifest tools/out/manifest.json]
 *                                  [--out data/mirror] [--concurrency 12]
 *                                  [--retry 3] [--force]
 *
 * Resumable: files already present with the expected size are skipped.
 */
const fs = require('fs');
const path = require('path');

const args = parseArgs(process.argv.slice(2));
const manifestPath = args.manifest || 'tools/out/manifest.json';
const outRoot = args.out || 'data/mirror';
const concurrency = Number(args.concurrency || 12);
const maxRetry = Number(args.retry || 3);
const force = Boolean(args.force);

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

/** Build the {url, dest} work list from static + dynamic groups. */
function buildWorkList() {
  const work = [];
  const push = (url, kind) => {
    if (!url || /[$]\{/.test(url)) return;
    const u = new URL(url);
    // Strip the /assets/ prefix; keep the rest as the on-disk path.
    const rel = u.pathname.replace(/^\/assets\//, '');
    work.push({ url, kind, dest: path.join(outRoot, rel) });
  };
  for (const u of manifest.static) push(u, 'static');
  for (const u of manifest.dynamic) push(u, 'dynamic');
  return work;
}

async function downloadOne(item, attempt = 0) {
  if (!force) {
    try {
      const st = fs.statSync(item.dest);
      if (st.size > 0) return { ...item, status: 'skip', size: st.size };
    } catch {
      /* not present */
    }
  }
  try {
    const res = await fetch(item.url);
    if (!res.ok) {
      if (attempt < maxRetry) {
        await sleep(300 * (attempt + 1));
        return downloadOne(item, attempt + 1);
      }
      return { ...item, status: `http ${res.status}`, size: 0 };
    }
    const buf = Buffer.from(await res.arrayBuffer());
    fs.mkdirSync(path.dirname(item.dest), { recursive: true });
    fs.writeFileSync(item.dest, buf);
    return { ...item, status: 'ok', size: buf.length };
  } catch (err) {
    if (attempt < maxRetry) {
      await sleep(300 * (attempt + 1));
      return downloadOne(item, attempt + 1);
    }
    return { ...item, status: `err ${err.message}`, size: 0 };
  }
}

(async () => {
  const work = buildWorkList();
  console.log(`files to fetch: ${work.length}`);
  console.log(`mirror root  : ${path.resolve(outRoot)}`);

  let i = 0;
  let ok = 0;
  let skipped = 0;
  let bytes = 0;
  const failures = [];

  async function worker(id) {
    while (i < work.length) {
      const item = work[i++];
      const r = await downloadOne(item);
      if (r.status === 'ok') {
        ok++;
        bytes += r.size;
      } else if (r.status === 'skip') {
        skipped++;
        bytes += r.size;
      } else {
        failures.push(`${r.status}  ${r.url}`);
      }
      const total = ok + skipped + failures.length;
      if (total % 50 === 0 || total === work.length) {
        process.stderr.write(
          `[w${id}] ${total}/${work.length}  ok:${ok} skip:${skipped} fail:${failures.length}  ${(bytes / 1048576).toFixed(1)} MB\r`,
        );
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, (_, k) => worker(k)));

  process.stderr.write('\n');
  console.log(`\ndownloaded: ${ok}`);
  console.log(`skipped   : ${skipped}`);
  console.log(`failed    : ${failures.length}`);
  console.log(`total size: ${(bytes / 1048576).toFixed(1)} MB`);

  if (failures.length) {
    const logPath = path.join(path.dirname(manifestPath), 'download-failures.txt');
    fs.writeFileSync(logPath, failures.join('\n') + '\n');
    console.log(`failures written to ${logPath}`);
  }
})();

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        out[key] = next;
        i++;
      } else {
        out[key] = true;
      }
    }
  }
  return out;
}
