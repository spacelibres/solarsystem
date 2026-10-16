import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { PRESETS } from '../src/lib/theme/palette';
import { hasRoleBinding, resolveLogoRoles } from '../src/lib/theme/logo-roles';
import { type LogoOrientation } from '../src/lib/theme/logo';

const PALETTE = PRESETS[0].colors;
const ORIENTATIONS: LogoOrientation[] = ['horizontal', 'stacked', 'icon'];

function master(orientation: LogoOrientation, ink: string): string {
  return readFileSync(join(process.cwd(), 'public', 'brand', `${orientation}-${ink}.svg`), 'utf8');
}

/**
 * The full-colour masters fall back to navy `#002044`. On a dark surface that
 * makes the planet and the wordmark disappear, which the standard names as a
 * defect, so the role attributes have to actually resolve. These tests cover the
 * two rules that are easy to get wrong: monochrome is never touched, and the
 * mask's structural black/white is never themed.
 */
describe('logo role resolution', () => {
  it.each(ORIENTATIONS)('%s-primary has its planet bound to the palette', (orientation) => {
    const resolved = resolveLogoRoles(master(orientation, 'primary'), PALETTE);
    // The master names the element (`planet`), which resolves against the surface:
    // this palette is dark, so the planet takes `planetOnDark`.
    expect(resolved).toContain(`stroke="${PALETTE.planetOnDark}"`);
    expect(resolved).not.toMatch(/<circle[^>]*stroke="#002044"/);
  });

  it.each(ORIENTATIONS)('%s-primary keeps the literal as a fallback in the file', (orientation) => {
    // The unmodified master still carries #002044, so a renderer that cannot
    // resolve roles still shows the approved mark rather than nothing.
    expect(master(orientation, 'primary')).toContain('#002044');
  });

  it('leaves the role attributes in place so resolution is repeatable', () => {
    const resolved = resolveLogoRoles(master('icon', 'primary'), PALETTE);
    expect(resolved).toContain('data-stroke-role="planet"');
  });

  it('leaves the wordmark paths alone, changing only the planet', () => {
    // The wordmark legitimately keeps the navy literal: it is a readable
    // foreground and takes no planet role. Only the bound element changes, which
    // is measurable as a drop of exactly one navy occurrence.
    for (const orientation of ['horizontal', 'stacked'] as const) {
      const source = master(orientation, 'primary');
      const before = (source.match(/#002044/gi) ?? []).length;
      const after = (
        resolveLogoRoles(source, PALETTE).match(/#002044/gi) ?? []
      ).length;
      expect(after, `${orientation} should lose only the planet's navy`).toBe(before - 1);
    }
  });

  it('never recolours a monochrome master', () => {
    for (const orientation of ORIENTATIONS) {
      for (const ink of ['black', 'navy', 'white'] as const) {
        const source = master(orientation, ink);
        expect(resolveLogoRoles(source, PALETTE)).toBe(source);
      }
    }
  });

  it('does not theme the structural values inside the mask', () => {
    const resolved = resolveLogoRoles(master('icon', 'primary'), PALETTE);
    const mask = resolved.slice(resolved.indexOf('<mask'), resolved.indexOf('</defs>'));
    // The mask rect must still be white and the cut-out path still black,
    // otherwise the intentional orbit crossing changes shape.
    expect(mask).toContain('fill="white"');
    expect(mask).toContain('fill="black"');
  });

  it('produces identical output for a palette with the same values', () => {
    // Guards against the tag-depth tracking being order dependent.
    const source = master('horizontal', 'primary');
    expect(resolveLogoRoles(source, PALETTE)).toBe(resolveLogoRoles(source, PALETTE));
  });

  it('recognises which masters carry role bindings', () => {
    expect(hasRoleBinding(master('icon', 'primary'))).toBe(true);
  });
});
