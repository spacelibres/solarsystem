import { mkdir, realpath, rename, rm, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve } from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { MIRROR_ROOT } from './mirror';

const hosts = new Set(['trek.nasa.gov', 'gitc.earthdata.nasa.gov', 'gibs.earthdata.nasa.gov', 'epsg.io', 'www.jpl.nasa.gov', 'science.nasa.gov', 'images-assets.nasa.gov']);
export function upstreamAssetUrl(path: string): string | null {
  if (/[\\%:\0?#]/.test(path) || path.split('/').some(part => !part || part === '.' || part === '..')) return null;
  if (/^(static|dynamic)\//.test(path)) return 'https://eyes.nasa.gov/assets/' + path;
  if (path.startsWith('site/')) return 'https://eyes.nasa.gov/apps/solar-system/' + path.slice(5);
  const match = /^external\/([^/]+)\/(.+)$/.exec(path);
  return match && hosts.has(match[1]) ? `https://${match[1]}/${match[2]}` : null;
}

/** Server-side read-through provisioning; clients continue using same-origin URLs. */
export function createMirrorFill({ root, fetcher = fetch }: { root: string; fetcher?: typeof fetch }) {
  const pending = new Map<string, Promise<boolean>>();
  const failed = new Map<string, number>();
  const waiters: (() => void)[] = [];
  let active = 0;
  return function fill(path: string): Promise<boolean> {
    const existing = pending.get(path);
    if (existing) return existing;
    const url = upstreamAssetUrl(path);
    if (!url || pending.size >= 128 || (failed.get(path) ?? 0) > Date.now()) return Promise.resolve(false);
    const job = Promise.resolve().then(async () => {
      if (active >= 4) await new Promise<void>(resolve => waiters.push(resolve));
      else active++;
      let temporary: string | undefined;
      try {
        const response = await fetcher(url, { signal: AbortSignal.timeout(25000), redirect: 'error' });
        if (!response.ok || !response.body) throw new Error(`upstream HTTP ${response.status}`);
        const limit = 64 * 1024 * 1024;
        if (Number(response.headers.get('content-length')) > limit) throw new Error('asset exceeds 64 MiB');
        const reader = response.body.getReader();
        const chunks: Uint8Array[] = [];
        let length = 0;
        try {
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            length += value.length;
            if (length > limit) throw new Error('asset exceeds 64 MiB');
            chunks.push(value);
          }
        } finally { await reader.cancel().catch(() => {}); }
        const bytes = Buffer.concat(chunks);
        const prefix = bytes.subarray(0, 512).toString('utf8').trimStart();
        if (!length || /text\/html/i.test(response.headers.get('content-type') ?? '') || /^<!doctype\s+html|^<html[\s>]/i.test(prefix)) throw new Error('empty or HTML asset');
        if (/\.(json|gltf)$/.test(path)) JSON.parse(bytes.toString('utf8'));
        const target = resolve(root, path);
        await mkdir(root, { recursive: true });
        const canonicalRoot = await realpath(root);
        let parent = resolve(root);
        // Check each existing link before creating anything beneath it.
        for (const part of relative(resolve(root), dirname(target)).split(/[\\/]/).filter(Boolean)) {
          parent = resolve(parent, part);
          try { await mkdir(parent); } catch (error) { if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error; }
          const rel = relative(canonicalRoot, await realpath(parent));
          if (rel === '..' || rel.startsWith('../') || rel.startsWith('..\\') || isAbsolute(rel)) throw new Error('mirror parent escapes root');
        }
        temporary = target + '.' + randomUUID() + '.tmp';
        await writeFile(temporary, bytes, { flag: 'wx', mode: 0o644 });
        await rename(temporary, target);
        console.info('[mirror-fill]', JSON.stringify({ status: 'cached', path, source: url, bytes: length, sha256: createHash('sha256').update(bytes).digest('hex') }));
        return true;
      } catch (error) {
        if (failed.size >= 2048) failed.delete(failed.keys().next().value!);
        failed.set(path, Date.now() + 60000);
        console.warn('[mirror-fill]', path, error instanceof Error ? error.message : 'download failed');
        return false;
      } finally {
        if (temporary) await rm(temporary, { force: true }).catch(() => {});
        const next = waiters.shift();
        if (next) next(); else active--;
        pending.delete(path);
      }
    });
    pending.set(path, job);
    return job;
  };
}

export const fillMirrorAsset = createMirrorFill({ root: MIRROR_ROOT });
