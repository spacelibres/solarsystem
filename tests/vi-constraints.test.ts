import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { PRESETS, isDarkSurface } from '../src/lib/theme/palette';
import {
  CANVAS,
  MIN_DISPLAY_WIDTH,
  clearSpace,
  isMonochromeInk,
  logoInkFor,
  logoPath,
  type LogoInk,
  type LogoOrientation,
} from '../src/lib/theme/logo';

/**
 * These tests make the constraints in `docs/visual-identity.md` binding rather
 * than aspirational. The logo is outlined geometry supplied as masters, so the
 * things worth asserting are: the masters are present and named canonically,
 * their canvas and planet geometry are intact, and the monochrome / full-colour
 * split is preserved — a monochrome master that gains role colours, or a
 * full-colour master with a fixed planet, is a defect the standard names
 * explicitly.
 */

const BRAND_DIR = join(process.cwd(), 'public', 'brand');
const ORIENTATIONS: LogoOrientation[] = ['horizontal', 'stacked', 'icon'];
const INKS: LogoInk[] = ['primary', 'reverse', 'navy', 'white', 'black'];

function master(orientation: LogoOrientation, ink: LogoInk): string {
  return readFileSync(join(BRAND_DIR, `${orientation}-${ink}.svg`), 'utf8');
}

describe('logo masters are present and canonically named', () => {
  it('ships all five inks for each orientation', () => {
    const files = readdirSync(BRAND_DIR).filter((f) => f.endsWith('.svg'));
    for (const orientation of ORIENTATIONS) {
      for (const ink of INKS) {
        expect(files, `${orientation}-${ink}.svg is missing`).toContain(`${orientation}-${ink}.svg`);
      }
    }
  });

  it('has no ad-hoc renamed copies alongside the masters', () => {
    // `horizontal-white.svg` is canonical; `horizontal-light.svg` or similar
    // would be a parallel copy that can drift from the approved geometry.
    for (const orientation of ORIENTATIONS) {
      for (const ink of ['light', 'dark', 'mono'] as const) {
        const stray = `${orientation}-${ink}.svg`;
        expect(readdirSync(BRAND_DIR), `${stray} is not an approved master name`).not.toContain(
          stray,
        );
      }
    }
  });
});

describe('master canvas geometry', () => {
  it.each(ORIENTATIONS)('%s uses the approved canvas size', (orientation) => {
    const svg = master(orientation, 'white');
    const { width, height } = CANVAS[orientation];
    expect(svg).toContain(`viewBox="0 0 ${width} ${height}"`);
    expect(svg).toContain(`width="${width}"`);
    expect(svg).toContain(`height="${height}"`);
  });

  it.each(ORIENTATIONS)('%s keeps the approved planet circle', (orientation) => {
    // One circle at (775,405), r171, stroke30 — outer 186 / inner 156.
    const svg = master(orientation, 'white');
    expect(svg).toContain('cx="775"');
    expect(svg).toContain('cy="405"');
    expect(svg).toContain('r="171"');
    expect(svg).toContain('stroke-width="30"');
  });

  it.each(ORIENTATIONS)('%s keeps the orbital mask that makes the crossing', (orientation) => {
    const svg = master(orientation, 'white');
    expect(svg).toContain('mask id="occlusion"');
    expect(svg).toContain('mask-type:luminance');
  });

  it.each(ORIENTATIONS)('%s draws the orbit as one closed path, not separate arcs', (orientation) => {
    // The standard forbids drawing the upper and lower arcs independently, which
    // is what reconstructing the mark tends to produce. The canonical master has
    // exactly one orbit geometry — a single `M` start, closed with `Z` — reused
    // by the occlusion mask, so two `<path>` elements sharing one `d` is correct
    // and two *different* outs is not.
    const svg = master(orientation, 'white');
    const orbitPaths = [...svg.matchAll(/d="(M581\.927[^"]*)"/g)].map((m) => m[1]);
    expect(orbitPaths.length).toBeGreaterThan(0);

    const distinct = new Set(orbitPaths);
    expect(distinct.size, `${orientation} draws the orbit more than once`).toBe(1);

    const orbit = [...distinct][0];
    expect(orbit.startsWith('M'), 'orbit must start with a single move').toBe(true);
    expect(orbit.endsWith('Z'), 'orbit must be a closed path').toBe(true);
    // A second `M` would mean a detached second arc.
    expect([...orbit.matchAll(/M/g)].length, 'orbit has a detached arc').toBe(1);
  });
});

describe('monochrome takes precedence', () => {
  it('marks black, navy and white masters as monochrome', () => {
    for (const orientation of ORIENTATIONS) {
      for (const ink of ['black', 'navy', 'white'] as const) {
        expect(master(orientation, ink)).toContain('data-color-mode="monochrome"');
      }
    }
  });

  it('keeps exactly one ink on the artistic elements', () => {
    // A monochrome master must not acquire an auxiliary colour. The mask uses
    // literal `black`/`white` as structural values — the standard forbids
    // theming those — so they are excluded; everything else must be the ink.
    // `black` is the master's structural mask value in every file, so for the
    // black master the two coincide and the set is still a single entry.
    const inks: Record<string, string> = { black: '#000000', navy: '#002044', white: '#ffffff' };
    for (const orientation of ORIENTATIONS) {
      for (const [ink, hex] of Object.entries(inks)) {
        const svg = master(orientation, ink as LogoInk);
        const outsideMask = svg.slice(svg.indexOf('</defs>'));
        const used = new Set(
          [...outsideMask.matchAll(/(?:fill|stroke)="(#[0-9a-fA-F]{6})"/g)].map((m) =>
            m[1].toLowerCase(),
          ),
        );
        expect(
          [...used].sort(),
          `${orientation}-${ink} should paint with only ${hex}`,
        ).toEqual([hex]);
      }
    }
  });

  it('treats primary and reverse as non-monochrome', () => {
    for (const ink of ['black', 'navy', 'white'] as const) {
      expect(isMonochromeInk(ink)).toBe(true);
    }
    expect(isMonochromeInk('primary')).toBe(false);
    expect(isMonochromeInk('reverse')).toBe(false);
  });
});

describe('full-colour masters track the palette', () => {
  it.each(ORIENTATIONS)('%s-primary is not marked monochrome', (orientation) => {
    // Without this attribute the renderer recolours the mark, which is the point.
    expect(master(orientation, 'primary')).not.toContain('data-color-mode="monochrome"');
  });

  it.each(ORIENTATIONS)('%s-primary binds the planet to a role', (orientation) => {
    // The role attribute is what makes the planet recolour; the literal stroke is
    // only the fallback for a renderer that ignores roles, so its presence is
    // correct and asserted here rather than treated as a fixed colour.
    const svg = master(orientation, 'primary');
    expect(svg).toContain('data-stroke-role="planet"');

    const planet = [...svg.matchAll(/<circle[^>]*>/g)].map((m) => m[0]);
    expect(planet.some((c) => c.includes('data-stroke-role="planet"'))).toBe(true);
  });
});

describe('size rules', () => {
  it('reserves a quarter of the canvas height as clear space', () => {
    expect(clearSpace(100)).toBe(25);
    expect(clearSpace(180)).toBe(45);
  });

  it('gives each orientation a minimum display width', () => {
    expect(MIN_DISPLAY_WIDTH.horizontal).toBeGreaterThanOrEqual(240);
    expect(MIN_DISPLAY_WIDTH.stacked).toBeGreaterThanOrEqual(180);
    expect(MIN_DISPLAY_WIDTH.icon).toBeGreaterThanOrEqual(48);
  });

  it('defaults to REVERSE ink, which is the mark for a dark surface', () => {
    for (const orientation of ORIENTATIONS) {
      expect(logoInkFor(orientation)).toBe('reverse');
    }
  });

  it('builds the public path from orientation and ink', () => {
    expect(logoPath('icon', 'black')).toBe('/brand/icon-black.svg');
  });
});

describe('palette tokens match the VI source', () => {
  it('exposes all 16 roles for every preset', () => {
    const roles = [
      'primary', 'secondary', 'accent', 'deep', 'surface', 'ink', 'card', 'muted',
      'line', 'success', 'warning', 'danger', 'primaryOnLight', 'primaryOnDark',
      'planetOnLight', 'planetOnDark',
    ];
    for (const preset of PRESETS) {
      for (const role of roles) {
        expect(preset.colors, `${preset.name} is missing ${role}`).toHaveProperty(role);
        expect(preset.colors[role as keyof typeof preset.colors]).toMatch(/^#[0-9A-Fa-f]{6}$/);
      }
    }
  });

  it('keeps the six approved presets', () => {
    expect(PRESETS.map((p) => p.name)).toEqual([
      '01-electric-orbit',
      '02-aurora-jump',
      '03-nebula-spectrum',
      '04-solar-storm',
      '05-deep-space-oasis',
      '06-acid-future',
    ]);
  });

  it('reads deep surfaces as dark so the white mark is chosen', () => {
    for (const preset of PRESETS) {
      expect(isDarkSurface(preset.colors.deep)).toBe(true);
    }
  });

  it('reads a light surface as light so the black mark is chosen', () => {
    expect(isDarkSurface('#F1F5F9')).toBe(false);
    expect(isDarkSurface('#FFFFFF')).toBe(false);
  });
});

describe('the favicon cannot drift from the icon master', () => {
  it('is byte-identical to the approved icon master', () => {
    const appIcon = readFileSync(join(process.cwd(), 'src', 'app', 'icon.svg'), 'utf8');
    expect(appIcon).toBe(master('icon', 'white'));
  });

  it('carries the monochrome marker, so it stays a single ink', () => {
    const appIcon = readFileSync(join(process.cwd(), 'src', 'app', 'icon.svg'), 'utf8');
    expect(appIcon).toContain('data-color-mode="monochrome"');
  });
});
