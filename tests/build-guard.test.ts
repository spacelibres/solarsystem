import { describe, expect, it } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  assertMirrorOutsideTree,
  findInTreeMirror,
} from '../scripts/assert-mirror-outside-tree.mjs';

/**
 * A populated mirror inside the project tree makes Turbopack walk 200k+ files
 * and the build is OOM-killed on a small host. The guard turns that silent
 * mid-build "Killed" into an explicit error, so it is worth testing directly.
 */
function makeProject(withMirror: 'absent' | 'empty' | 'populated'): string {
  const dir = mkdtempSync(join(tmpdir(), 'solar-guard-'));
  if (withMirror === 'absent') return dir;

  const mirror = join(dir, 'data', 'mirror');
  mkdirSync(mirror, { recursive: true });
  if (withMirror === 'populated') {
    writeFileSync(join(mirror, 'some-asset.bin'), 'x');
  }
  return dir;
}

describe('in-tree mirror guard', () => {
  it('finds a populated mirror', () => {
    const project = makeProject('populated');
    expect(findInTreeMirror(project)).toBe(join(project, 'data', 'mirror'));
  });

  it('ignores a missing mirror', () => {
    expect(findInTreeMirror(makeProject('absent'))).toBeNull();
  });

  it('ignores an empty mirror directory', () => {
    expect(findInTreeMirror(makeProject('empty'))).toBeNull();
  });

  it('rejects a build with a populated in-tree mirror', () => {
    expect(() => assertMirrorOutsideTree(makeProject('populated'))).toThrow(
      /mirror is inside the project tree/,
    );
  });

  it('names the park command as the fix', () => {
    expect(() => assertMirrorOutsideTree(makeProject('populated'))).toThrow(
      /npm run mirror:park/,
    );
  });

  it('allows a build when the mirror has been moved aside', () => {
    expect(() => assertMirrorOutsideTree(makeProject('absent'))).not.toThrow();
  });

  it('still rejects when MIRROR_ROOT is set, since the path is globbed anyway', () => {
    // Measured: setting MIRROR_ROOT leaves the 214,419-file scan in place,
    // because Turbopack resolves the fallback path statically.
    const previous = process.env.MIRROR_ROOT;
    process.env.MIRROR_ROOT = '/srv/solarsystem-mirror';
    try {
      expect(() => assertMirrorOutsideTree(makeProject('populated'))).toThrow();
    } finally {
      if (previous === undefined) delete process.env.MIRROR_ROOT;
      else process.env.MIRROR_ROOT = previous;
    }
  });
});
