/** Disk-only asset mirror shared by server loaders and the /nasa route. */
import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve, relative, isAbsolute } from 'node:path';

// Keep the default outside source so bundlers cannot enumerate the asset library.
export const MIRROR_ROOT: string = process.env.MIRROR_ROOT || resolve(process.cwd(), '..', '.solarsystem-mirror');
export const MIRROR_URL_PREFIX = '/nasa';

export function mirrorPath(rel: string): string {
  const clean = rel.replace(/^\/+/, '');
  if (/[\\:\0%]/.test(clean) || clean.split('/').some(part => part === '..' || part === '.')) throw new Error('bad mirror path');
  const abs = resolve(MIRROR_ROOT, clean);
  const fromRoot = relative(resolve(MIRROR_ROOT), abs);
  if (fromRoot === '..' || fromRoot.startsWith('../') || fromRoot.startsWith('..\\') || isAbsolute(fromRoot)) throw new Error('bad mirror path');
  return abs;
}

export function mirrorExists(rel: string): boolean {
  try { return statSync(mirrorPath(rel)).isFile(); } catch { return false; }
}

export function readMirrorFile(rel: string): Buffer {
  const abs = mirrorPath(rel);
  if (!existsSync(abs)) throw new Error(`mirror asset missing: ${rel}\nrun: node tools/download-mirror.cjs --manifest tools/out/manifest.json`);
  return readFileSync(abs);
}
