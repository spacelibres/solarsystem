import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mkdtemp, writeFile, rm, mkdir, symlink, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

let root: string;
let route: typeof import('../src/app/nasa/[...path]/route');
const context = (path: string[]) => ({ params: Promise.resolve({ path }) });
const request = (range?: string, method = 'GET') => new Request('http://localhost/nasa/sample.bin', { method, headers: range ? { Range: range } : undefined });
beforeEach(async () => {
  root = await mkdtemp(join(tmpdir(), 'local-assets-'));
  await writeFile(join(root, 'sample.bin'), '0123456789');
  vi.stubEnv('MIRROR_ROOT', root);
  vi.resetModules();
  route = await import('../src/app/nasa/[...path]/route');
});
afterEach(async () => { vi.unstubAllEnvs(); await rm(root, { recursive: true, force: true }); });

describe('disk asset route', () => {
  it('serves exact file bytes and a bodyless HEAD', async () => {
    const response = await route.GET(request(), context(['sample.bin']));
    expect(await response.text()).toBe('0123456789');
    expect(response.headers.get('accept-ranges')).toBe('bytes');
    const head = await route.HEAD(request(undefined, 'HEAD'), context(['sample.bin']));
    expect(await head.text()).toBe('');
    expect(head.headers.get('content-length')).toBe('10');
  });
  it.each([['bytes=2-5', '2345', 'bytes 2-5/10'], ['bytes=7-', '789', 'bytes 7-9/10'], ['bytes=-3', '789', 'bytes 7-9/10'], ['bytes=8-99', '89', 'bytes 8-9/10']])('serves %s', async (range, body, contentRange) => {
    const response = await route.GET(request(range), context(['sample.bin']));
    expect(response.status).toBe(206);
    expect(await response.text()).toBe(body);
    expect(response.headers.get('content-range')).toBe(contentRange);
    expect(response.headers.get('content-length')).toBe(String(body.length));
  });
  it.each(['bytes=10-', 'bytes=4-2', 'bytes=-0', 'bytes=0-1,3-4', 'garbage', 'bytes=999999999999999999999-'])('rejects invalid range %s', async range => {
    const response = await route.GET(request(range), context(['sample.bin']));
    expect(response.status).toBe(416);
    expect(response.headers.get('content-range')).toBe('bytes */10');
  });
  it.each([['..', 'secret'], ['..\\secret'], ['%2e%2e%2fsecret'], ['%252e%252e%255csecret'], ['x\0.bin'], ['C:secret'], ['a/b'], ['a%2fb']])('rejects unsafe segments %s', async (...segments) => {
    expect((await route.GET(request(), context(segments))).status).toBe(400);
  });
  it('returns local 404 for missing files and directories', async () => {
    await mkdir(join(root, 'folder'));
    expect((await route.GET(request(), context(['missing.bin']))).status).toBe(404);
    expect((await route.GET(request(), context(['folder']))).status).toBe(404);
  });
  it.each([['a.css', 'text/css'], ['a.js', 'text/javascript'], ['a.wasm', 'application/wasm'], ['a.ktx2', 'image/ktx2'], ['a.ttf', 'font/ttf']])('serves the type of %s', async (name, type) => {
    await writeFile(join(root, name), 'data');
    const response = await route.GET(request(), context([name]));
    expect(response.headers.get('content-type')).toContain(type);
    await response.body?.cancel();
  });
  it('rejects a directory link pointing outside the mirror', async () => {
    const outside = await mkdtemp(join(tmpdir(), 'asset-outside-'));
    try {
      await writeFile(join(outside, 'secret.bin'), 'secret');
      await symlink(outside, join(root, 'escape'), process.platform === 'win32' ? 'junction' : 'dir');
      expect((await route.GET(request(), context(['escape', 'secret.bin']))).status).toBe(400);
    } finally { await rm(outside, { recursive: true, force: true }); }
  });
  it('stops streaming after the request is aborted', async () => {
    await writeFile(join(root, 'large.bin'), Buffer.alloc(4 * 1024 * 1024));
    const controller = new AbortController();
    const response = await route.GET(new Request('http://localhost/nasa/large.bin', { signal: controller.signal }), context(['large.bin']));
    const reader = response.body!.getReader();
    expect((await reader.read()).done).toBe(false);
    controller.abort();
    await expect((async () => { while (!(await reader.read()).done) { /* drain until abort */ } })()).rejects.toThrow();
  });
  it('allows consumer cancellation without an unhandled stream error', async () => {
    const response = await route.GET(request(), context(['sample.bin']));
    await response.body!.cancel();
  });
  it('serves empty files and rejects their ranges', async () => {
    await writeFile(join(root, 'empty.bin'), '');
    expect(await (await route.GET(request(), context(['empty.bin']))).text()).toBe('');
    expect((await route.GET(request('bytes=0-'), context(['empty.bin']))).status).toBe(416);
  });
  it.each([
    ['map.xml', '<Layer><ResourceURL template="https://trek.nasa.gov/tiles/{z}/{x}/{y}.png" /></Layer>', '<Layer><ResourceURL template="/nasa/external/trek.nasa.gov/tiles/{z}/{x}/{y}.png" /></Layer>'],
    ['model.gltf', '{"images":[{"uri":"https://eyes.nasa.gov/assets/static/map.png"}]}', '{"images":[{"uri":"/nasa/static/map.png"}]}'],
    ['model.json', '{"uri":"https://gitc.earthdata.nasa.gov/image.png"}', '{"uri":"/nasa/external/gitc.earthdata.nasa.gov/image.png"}'],
  ])('localizes nested references in %s without changing disk bytes', async (name, original, expected) => {
    await writeFile(join(root, name), original);
    const response = await route.GET(request(), context([name]));
    expect(await response.text()).toBe(expected);
    expect(response.headers.get('content-length')).toBe(String(Buffer.byteLength(expected)));
    expect(await readFile(join(root, name), 'utf8')).toBe(original);
  });
  it('uses transformed UTF-8 bytes for HEAD, ranges, and 416 lengths', async () => {
    const original = '{"name":"月","uri":"https://eyes.nasa.gov/assets/a.png"}';
    const expected = Buffer.from('{"name":"月","uri":"/nasa/a.png"}');
    await writeFile(join(root, 'model.gltf'), original);
    const head = await route.HEAD(request(undefined, 'HEAD'), context(['model.gltf']));
    expect(head.headers.get('content-length')).toBe(String(expected.length));
    expect(await head.text()).toBe('');
    const partial = await route.GET(request('bytes=7-15'), context(['model.gltf']));
    expect(partial.status).toBe(206);
    expect(Buffer.from(await partial.arrayBuffer())).toEqual(expected.subarray(7, 16));
    expect(partial.headers.get('content-range')).toBe(`bytes 7-15/${expected.length}`);
    const invalid = await route.GET(request(`bytes=${expected.length}-`), context(['model.gltf']));
    expect(invalid.status).toBe(416);
    expect(invalid.headers.get('content-range')).toBe(`bytes */${expected.length}`);
  });
  it('keeps binary models byte-for-byte unchanged', async () => {
    const binary = Buffer.from('https://eyes.nasa.gov/assets/a.png\0binary');
    await writeFile(join(root, 'model.glb'), binary);
    expect(Buffer.from(await (await route.GET(request(), context(['model.glb']))).arrayBuffer())).toEqual(binary);
  });
  it('uses an out-of-tree default mirror', async () => {
    vi.stubEnv('MIRROR_ROOT', undefined);
    vi.resetModules();
    expect((await import('../src/lib/nasa/mirror')).MIRROR_ROOT).toBe(resolve(process.cwd(), '..', '.solarsystem-mirror'));
  });
});
