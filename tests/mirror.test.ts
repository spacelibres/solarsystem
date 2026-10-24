import { afterEach, describe, expect, it, vi } from 'vitest';
import { join, resolve } from 'node:path';

/**
 * `MIRROR_ROOT` is read when the module is first evaluated, so each case needs a
 * fresh module instance rather than a shared binding.
 */
async function loadMirrorModule(env: Record<string, string | undefined>) {
  const saved = { ...process.env };
  for (const [key, value] of Object.entries(env)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  vi.resetModules();
  const mod = await import('../src/lib/nasa/mirror');
  for (const key of Object.keys(process.env)) delete process.env[key];
  Object.assign(process.env, saved);
  return mod;
}

afterEach(() => {
  vi.resetModules();
});

describe('mirror root', () => {
  it('defaults to a mirror outside the project when MIRROR_ROOT is unset', async () => {
    const mirror = await loadMirrorModule({ MIRROR_ROOT: undefined });
    expect(mirror.MIRROR_ROOT).toBe(join(process.cwd(), '..', '.solarsystem-mirror'));
  });

  it('honours MIRROR_ROOT so production can keep the mirror out of the build tree', async () => {
    // The deployed mirror holds 90k+ files. Leaving it inside the project makes
    // Next's build walk all of them, which OOM-killed the build on the 2 GB
    // deployment host; production points MIRROR_ROOT outside the tree instead.
    const mirror = await loadMirrorModule({ MIRROR_ROOT: '/srv/solarsystem-mirror' });
    expect(mirror.MIRROR_ROOT).toBe('/srv/solarsystem-mirror');
  });

  it('resolves mirror-relative paths under the configured root', async () => {
    const mirror = await loadMirrorModule({ MIRROR_ROOT: '/srv/solarsystem-mirror' });
    expect(mirror.mirrorPath('static/maps/earth/color_512_0.png')).toBe(
      resolve('/srv/solarsystem-mirror', 'static/maps/earth/color_512_0.png'),
    );
  });

  it('tolerates a leading slash on the relative path', async () => {
    const mirror = await loadMirrorModule({ MIRROR_ROOT: '/srv/solarsystem-mirror' });
    expect(mirror.mirrorPath('/dynamic/dynamo/moon/earth/orb/def.dyn')).toBe(
      resolve('/srv/solarsystem-mirror', 'dynamic/dynamo/moon/earth/orb/def.dyn'),
    );
  });

  it('reports an absent asset rather than throwing from mirrorExists', async () => {
    const mirror = await loadMirrorModule({
      MIRROR_ROOT: join(process.cwd(), 'tests', 'fixtures', 'no-such-mirror'),
    });
    expect(mirror.mirrorExists('static/maps/earth/color_512_0.png')).toBe(false);
  });

  it('names the fix in the error when a required asset is missing', async () => {
    const mirror = await loadMirrorModule({
      MIRROR_ROOT: join(process.cwd(), 'tests', 'fixtures', 'no-such-mirror'),
    });
    expect(() => mirror.readMirrorFile('static/maps/earth/color_512_0.png')).toThrow(
      /mirror asset missing: static\/maps\/earth\/color_512_0\.png/,
    );
  });
});
