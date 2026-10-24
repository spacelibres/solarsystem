import { afterEach, expect, it, vi } from 'vitest';
import { mkdtemp, readFile, rm, mkdir, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createMirrorFill, upstreamAssetUrl } from '../src/lib/nasa/mirror-fill';

const roots: string[] = [];
afterEach(async () => { await Promise.all(roots.splice(0).map(root => rm(root, { recursive: true, force: true }))); });
it('maps only approved resource paths', () => {
  expect(upstreamAssetUrl('dynamic/dynamo/sc_grace_fo1/101_024.dyn')).toBe('https://eyes.nasa.gov/assets/dynamic/dynamo/sc_grace_fo1/101_024.dyn');
  expect(upstreamAssetUrl('site/assets/default/fonts/a.woff')).toBe('https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/a.woff');
  for (const path of ['../secret', 'external/127.0.0.1/a', 'external/evil.com/a', 'dynamic/a%2fb', 'dynamic/a\\b']) expect(upstreamAssetUrl(path)).toBeNull();
});
it('coalesces misses and atomically persists one upstream response', async () => {
  const root = await mkdtemp(join(tmpdir(), 'fill-')); roots.push(root);
  const fetcher = vi.fn(async () => new Response('real dyn payload'));
  const fill = createMirrorFill({ root, fetcher });
  expect(await Promise.all([fill('dynamic/a.dyn'), fill('dynamic/a.dyn')])).toEqual([true, true]);
  expect(fetcher).toHaveBeenCalledTimes(1);
  expect(await readFile(join(root, 'dynamic/a.dyn'), 'utf8')).toBe('real dyn payload');
});
it('backs off upstream errors and refuses HTML pretending to be data', async () => {
  const root = await mkdtemp(join(tmpdir(), 'fill-')); roots.push(root);
  const fetcher = vi.fn(async () => new Response('<html>blocked</html>', { headers: { 'content-type': 'text/html' } }));
  const fill = createMirrorFill({ root, fetcher });
  expect(await fill('dynamic/a.dyn')).toBe(false);
  expect(await fill('dynamic/a.dyn')).toBe(false);
  expect(fetcher).toHaveBeenCalledTimes(1);
  await expect(readFile(join(root, 'dynamic/a.dyn'))).rejects.toThrow();
});
it('limits concurrent downloads and drains the queue', async () => {
  const root = await mkdtemp(join(tmpdir(), 'fill-')); roots.push(root);
  let active = 0, maximum = 0;
  const fetcher = vi.fn(async () => {
    maximum = Math.max(maximum, ++active);
    await new Promise(resolve => setTimeout(resolve, 5));
    active--;
    return new Response('payload');
  });
  const fill = createMirrorFill({ root, fetcher });
  expect(await Promise.all(Array.from({ length: 12 }, (_, i) => fill(`dynamic/${i}.dyn`)))).toEqual(Array(12).fill(true));
  expect(maximum).toBe(4);
});
it('never persists through an out-of-tree directory link', async () => {
  const root = await mkdtemp(join(tmpdir(), 'fill-')); roots.push(root);
  const outside = await mkdtemp(join(tmpdir(), 'fill-outside-')); roots.push(outside);
  await mkdir(join(root, 'dynamic'));
  await symlink(outside, join(root, 'dynamic/link'), process.platform === 'win32' ? 'junction' : 'dir');
  const fill = createMirrorFill({ root, fetcher: async () => new Response('payload') });
  expect(await fill('dynamic/link/nested/file.dyn')).toBe(false);
  await expect(readFile(join(outside, 'nested'))).rejects.toMatchObject({ code: 'ENOENT' });
  await expect(readFile(join(outside, 'file.dyn'))).rejects.toThrow();
});
