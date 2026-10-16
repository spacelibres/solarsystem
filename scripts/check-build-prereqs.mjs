#!/usr/bin/env node
/**
 * npm's `prebuild` hook: checks that the build can run on a small host.
 *
 * Right now this only guards the NASA asset mirror. Turbopack resolves the
 * mirror path at build time and globs whatever it points at, so building with
 * the mirror at `data/mirror` made the build walk 214,419 files and get killed
 * for memory on the 2 GB deployment host — in the middle of the build, with
 * nothing but "Killed" to explain it. Failing here instead names the fix.
 */
import { assertMirrorOutsideTree } from './assert-mirror-outside-tree.mjs';

try {
  assertMirrorOutsideTree();
} catch (error) {
  process.stderr.write(`\n${error instanceof Error ? error.message : error}\n`);
  process.exit(1);
}
