#!/usr/bin/env node
/**
 * Move the NASA asset mirror out of the project tree, or back into it.
 *
 * Turbopack resolves `MIRROR_ROOT` at build time and globs whatever it points
 * at, so building with the mirror at `data/mirror` makes the build walk 200k+
 * files and get OOM-killed on a small host. `npm run build` refuses to start in
 * that state (see `scripts/assert-mirror-outside-tree.mjs`); this script is the
 * quickest way out of it during local development.
 *
 *   npm run mirror:park      # data/mirror       -> ../.solarsystem-mirror
 *   npm run mirror:restore   # ../.solarsystem-mirror -> data/mirror
 *
 * The parked path sits next to the project, never inside it, so a build started
 * after `mirror:park` stays clean. `deploy/update.sh` does the same thing on the
 * deployment host, where the mirror lives at `/srv/solarsystem-mirror`.
 */
import { existsSync, mkdirSync, renameSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const inTree = join(projectDir, 'data', 'mirror');
const parked = resolve(projectDir, '..', '.solarsystem-mirror');

const action = process.argv[2];

function log(message) {
  process.stdout.write(`[mirror] ${message}\n`);
}

function fail(message) {
  process.stderr.write(`[mirror] error: ${message}\n`);
  process.exit(1);
}

function move(from, to, label) {
  if (!existsSync(from)) fail(`${label}: nothing at ${from}`);
  mkdirSync(dirname(to), { recursive: true });
  if (existsSync(to)) fail(`${label}: ${to} already exists; move it away first`);
  renameSync(from, to);
}

switch (action) {
  case 'park':
    if (!existsSync(inTree)) {
      log(`no mirror at ${inTree}; nothing to park`);
      break;
    }
    move(inTree, parked, 'park');
    log(`parked -> ${parked}`);
    break;

  case 'restore':
    if (!existsSync(parked)) {
      log(`nothing parked at ${parked}`);
      break;
    }
    move(parked, inTree, 'restore');
    log(`restored -> ${inTree} (${statSync(inTree).size} entry metadata)`);
    break;

  default:
    fail('usage: park-mirror.mjs park|restore');
}
