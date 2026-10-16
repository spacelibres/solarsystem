import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
const require = createRequire(import.meta.url);
const { compileCatalog } = require('../tools/compile-solar-catalog.cjs');
describe('source-derived independent catalog', () => {
  it('reproduces the checked-in manifest without executing recovered modules', () => {
    expect(JSON.stringify(compileCatalog(), null, 2) + '\n').toBe(readFileSync('src/solar/config/catalog.generated.json', 'utf8'));
  });
  it('preserves actual Moon, ISS, Hubble, Voyager and Juno definitions', () => {
    const { entries } = compileCatalog();
    const get = (id: string) => entries.find((entry: { id: string }) => entry.id === id);
    expect(entries.length).toBe(844);
    expect(get('moon').parents[0]).toEqual(['-Infinity', 'earth']);
    expect(get('moon').spheroid.equatorialRadius).toBeGreaterThan(1700);
    for (const id of ['sc_iss', 'sc_hubble_space_telescope', 'sc_voyager_1', 'sc_juno']) {
      expect(get(id).model.url).toContain('.gltf');
      expect(get(id).controllers.some((c: { type: string }) => c.type === 'dynamo')).toBe(true);
      expect(get(id).provenance.file).toMatch(/^eyes\/src\/engine\/core\//);
      expect(get(id).provenance.line).toBeGreaterThan(1);
    }
    expect(get('sc_juno').parents.length).toBeGreaterThan(10);
    expect(get('sc_juno').raw.model.rotate).toEqual([{ x: 90 }]);
    expect(get('sc_juno').diagnostics.length).toBeGreaterThan(0);
    expect(get('moon').spheroid.equatorialRadius).toBe(1737.4);
    expect(get('sc_iss').model.url).toBe('$STATIC_ASSETS_URL/models/sc_iss/ISS_stationary.gltf');
    expect(get('sc_hubble_space_telescope').controllers[0].url).toBe('sc_hubble_space_telescope/earth/orb');
    expect(get('sc_voyager_1').model.rotate).toEqual([{ x: -90 }, { z: 180 }]);
    expect(get('sc_juno').controllers.find((c: { type: string }) => c.type === 'fixed').orientation).toEqual([1, 0, 0, 0]);
    const juno = get('sc_juno');
    const lines = readFileSync(juno.provenance.file, 'utf8').split('\n');
    expect(lines[juno.provenance.line - 1].trim()).toBe('sc_juno: {');
    const callback = juno.controllers.find((c: { type: string }) => c.type === 'coverage').update;
    expect(callback.$unsupported).toBe('ArrowFunctionExpression');
    expect(callback.expression).toContain('engine_cover');
  });
});
