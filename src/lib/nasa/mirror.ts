/**
 * Local NASA asset mirror.
 *
 * The app must not depend on NASA's servers at runtime, so every asset is
 * fetched once by `tools/download-mirror.cjs` into `data/mirror/` and served
 * from disk. This module owns the mapping between the two worlds:
 *
 *   remote   https://eyes.nasa.gov/assets/static/maps/earth/color_512_0.png
 *   local    data/mirror/static/maps/earth/color_512_0.png
 *   served   /nasa/static/maps/earth/color_512_0.png
 *
 * Nothing here talks to the network. If a file is missing the caller gets a
 * clear error naming the path, which points at re-running the downloader.
 */

import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Root of the downloaded mirror.
 *
 * Defaults to `data/mirror` inside the project, which is where
 * `tools/download-mirror.cjs` puts it for local work. Production sets
 * `MIRROR_ROOT` to a directory outside the project tree.
 *
 * This only decides where the app *reads* assets at runtime. It does not stop
 * Turbopack globbing `data/mirror` during a build — that path is resolved
 * statically — so a build with the mirror in-tree is refused outright by
 * `scripts/assert-mirror-outside-tree.mjs`. Setting MIRROR_ROOT alone was
 * measured not to prevent the 214,419-file scan.
 */
export const MIRROR_ROOT: string = process.env.MIRROR_ROOT
  ? process.env.MIRROR_ROOT
  : join(process.cwd(), 'data', 'mirror');

/** Public URL prefix the Next.js route serves the mirror under. */
export const MIRROR_URL_PREFIX = '/nasa';

/** Resolve a mirror-relative path (e.g. `static/maps/earth/color_512_0.png`). */
export function mirrorPath(rel: string): string {
  return join(MIRROR_ROOT, rel.replace(/^\/+/, ''));
}

export function mirrorExists(rel: string): boolean {
  try {
    return statSync(mirrorPath(rel)).isFile();
  } catch {
    return false;
  }
}

/** Read a mirror file, throwing a downloader hint when it is absent. */
export function readMirrorFile(rel: string): Buffer {
  const abs = mirrorPath(rel);
  if (!existsSync(abs)) {
    throw new Error(
      `mirror asset missing: ${rel}\n` +
        `run: node tools/download-mirror.cjs --manifest tools/out/manifest.json`,
    );
  }
  return readFileSync(abs);
}
