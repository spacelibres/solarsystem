/**
 * Fail the build early if the NASA asset mirror is inside the project tree.
 *
 * Turbopack resolves `MIRROR_ROOT` at build time and globs whatever it points
 * at. With the mirror inside the project that matched 214,419 files, made the
 * build walk the entire tree, and pushed it past the 2 GB of RAM on the
 * deployment host — where the kernel OOM-killed it partway through. The failure
 * looked like a mysterious mid-build "Killed", so this check turns it into an
 * explicit, actionable error instead.
 *
 * Local builds can keep the mirror in `data/mirror` and simply move it aside
 * (`npm run mirror:park`); the deployed host does this automatically in
 * `deploy/update.sh`.
 */
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Return the in-tree mirror directory when it exists and has contents, else
 * null. An empty or absent directory is harmless, so it does not count.
 *
 * @param {string} [projectDir]
 * @returns {string | null}
 */
export function findInTreeMirror(projectDir = process.cwd()) {
  const candidate = join(projectDir, 'data', 'mirror');
  if (!existsSync(candidate)) return null;
  try {
    return readdirSync(candidate).length > 0 ? candidate : null;
  } catch {
    return null;
  }
}

/**
 * Throw a message naming the fix when the mirror would be globbed by the build.
 *
 * Moving the directory is the only thing that actually helps: Turbopack
 * statically resolves the fallback path even when `MIRROR_ROOT` is set, so the
 * escape hatch there does not stop it globbing `data/mirror` (verified — the
 * warning still lists 214,419 files). The environment variable only decides
 * where the app *reads* assets at runtime. Hence the check ignores it.
 *
 * @param {string} [projectDir]
 */
export function assertMirrorOutsideTree(projectDir = process.cwd()) {
  const inTree = findInTreeMirror(projectDir);
  if (!inTree) return;

  throw new Error(
    [
      '',
      `The NASA asset mirror is inside the project tree: ${inTree}`,
      '',
      'Turbopack resolves this path at build time and globs whatever it points',
      'at, so the build walks every mirror file (214,419 of them, ~1.6 GB) and is',
      'killed for memory on a small host. Setting MIRROR_ROOT is not enough — the',
      'fallback path is still globbed — so the directory itself must move:',
      '',
      '    npm run mirror:park && npm run build',
      '',
      'and afterwards: `npm run mirror:restore`. The deployment host does this',
      'automatically; see deploy/update.sh.',
      '',
    ].join('\n'),
  );
}
