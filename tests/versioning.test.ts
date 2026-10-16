import { execFileSync, spawnSync } from 'node:child_process';
import { copyFileSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

let root: string;

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), 'solar-version-test-'));
  mkdirSync(join(root, 'scripts'));
  mkdirSync(join(root, 'src/lib'), { recursive: true });
  copyFileSync(join(__dirname, '../scripts/set-version.mjs'), join(root, 'scripts/set-version.mjs'));
  writeFileSync(join(root, 'VERSION'), '0.0.1\n');
  writeFileSync(join(root, 'package.json'), JSON.stringify({ name: 'solar-version-test', version: '0.0.1', private: true }));
  writeFileSync(join(root, 'package-lock.json'), JSON.stringify({
    name: 'solar-version-test', version: '0.0.1', lockfileVersion: 3,
    packages: { '': { name: 'solar-version-test', version: '0.0.1' } },
  }));
});

afterEach(() => rmSync(root, { recursive: true, force: true }));

describe('release version script', () => {
  it('updates package, lockfile, VERSION and UI version when launched directly by Node', () => {
    execFileSync(process.execPath, [join(root, 'scripts/set-version.mjs'), '0.0.2'], {
      cwd: root, stdio: 'pipe',
    });
    expect(JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version).toBe('0.0.2');
    const lock = JSON.parse(readFileSync(join(root, 'package-lock.json'), 'utf8'));
    expect(lock.version).toBe('0.0.2');
    expect(lock.packages[''].version).toBe('0.0.2');
    expect(readFileSync(join(root, 'VERSION'), 'utf8')).toBe('0.0.2\n');
    expect(readFileSync(join(root, 'src/lib/version.ts'), 'utf8')).toContain("VERSION = '0.0.2'");
  });

  it('rejects a non-increasing version without changing package metadata', () => {
    const result = spawnSync(process.execPath, [join(root, 'scripts/set-version.mjs'), '0.0.1'], { cwd: root });
    expect(result.status).toBe(1);
    expect(JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version).toBe('0.0.1');
  });
});

it('keeps the standalone recovered project package versions in sync when present', () => {
  mkdirSync(join(root, 'eyes'));
  writeFileSync(join(root, 'eyes/package.json'), JSON.stringify({ name: 'recovered-eyes', version: '0.0.1' }));
  writeFileSync(join(root, 'eyes/package-lock.json'), JSON.stringify({ version: '0.0.1', packages: { '': { version: '0.0.1' } } }));
  execFileSync(process.execPath, [join(root, 'scripts/set-version.mjs'), '0.0.2'], { cwd: root, stdio: 'pipe' });
  expect(JSON.parse(readFileSync(join(root, 'eyes/package.json'), 'utf8')).version).toBe('0.0.2');
  const lock = JSON.parse(readFileSync(join(root, 'eyes/package-lock.json'), 'utf8'));
  expect(lock.version).toBe('0.0.2');
  expect(lock.packages[''].version).toBe('0.0.2');
});
