/**
 * Resolve a logo master's colour roles against the active palette.
 *
 * The approved masters carry role attributes — `data-stroke-role="planet"` on the
 * planet, and fill/stroke roles on other elements — rather than final colours.
 * That is deliberate: it lets one file serve every palette. But a master used as
 * a plain `<img src>` renders its *literal* fallback, and the full-colour masters
 * fall back to navy `#002044`. On a dark surface that makes the planet and much
 * of the wordmark disappear into the background — the exact failure the standard
 * calls a defect.
 *
 * So the SVG text is rewritten with palette values and handed to the browser as a
 * blob. Monochrome masters are returned untouched: they are one ink on purpose
 * and must not be recoloured.
 *
 * Two rules matter most, and both are easy to get wrong:
 *   - `data-color-mode="monochrome"` short-circuits everything;
 *   - elements inside `mask` / `clipPath` are structural, so their black and
 *     white must never be themed.
 *
 * The rewrite is a scan over tags rather than a DOM or a nested regex. The former
 * needs a DOMParser (unavailable on the server) and the latter silently mangles
 * nested structure, so a small explicit scanner is both the simplest and the
 * safest thing here.
 */

import { isMonochromeInk, isPrecoloredInk, logoPath, type LogoInk, type LogoOrientation } from './logo';
import type { PaletteRoles } from './palette';

/** Paint attributes that may carry a role, and the data attribute naming it. */
const ROLE_ATTRS: ReadonlyArray<readonly [paint: string, dataAttr: string]> = [
  ['fill', 'data-color-role'],
  ['stroke', 'data-stroke-role'],
  ['stop-color', 'data-stop-role'],
];

/**
 * Contextual role names used by the masters, resolved against the palette.
 *
 * A master names the *element* (`planet`), not the palette role, because which
 * role applies depends on the surface it is drawn on. `planetOnLight` and
 * `planetOnDark` exist precisely so the mark stays legible on either, and the
 * standard's engine picks between them by background. So `planet` is not looked
 * up directly — it is resolved with `planetOnLight` / `planetOnDark` below.
 *
 * `orbit` is the other contextual name, mapping to the primary role pair.
 */
const CONTEXTUAL: Readonly<Record<string, { light: keyof PaletteRoles; dark: keyof PaletteRoles }>> =
  {
    planet: { light: 'planetOnLight', dark: 'planetOnDark' },
    orbit: { light: 'primaryOnLight', dark: 'primaryOnDark' },
  };

/** Elements whose contents are structural and must keep their literal colours. */
const STRUCTURAL = new Set(['mask', 'clippath']);

/** Whether the palette's `deep` role reads as a dark surface, for contextual roles. */
function paletteIsDark(palette: PaletteRoles): boolean {
  const hex = palette.deep?.replace('#', '');
  if (!hex || hex.length < 6) return true;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lin = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  const luminance = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return luminance < 0.5;
}

function isPaletteRole(value: string, palette: PaletteRoles): value is keyof PaletteRoles {
  return Object.prototype.hasOwnProperty.call(palette, value);
}

/**
 * Resolve a role name from a master to a palette value.
 *
 * Contextual names resolve by surface: on the viewer's dark chrome `planet` must
 * become `planetOnDark`, not the navy literal the master falls back to.
 */
function resolveRole(role: string, palette: PaletteRoles, dark: boolean): string | null {
  const contextual = CONTEXTUAL[role];
  if (contextual) {
    const key = dark ? contextual.dark : contextual.light;
    return palette[key] ?? null;
  }
  return isPaletteRole(role, palette) ? palette[role] : null;
}

/** Read an attribute value from a tag's source text. */
function attr(tag: string, name: string): string | null {
  const match = tag.match(new RegExp(`\\s${name}="([^"]*)"`));
  return match ? match[1] : null;
}

/** Replace an attribute's value, adding it when absent. */
function setAttr(tag: string, name: string, value: string): string {
  const pattern = new RegExp(`(\\s${name}=")[^"]*(")`);
  if (pattern.test(tag)) return tag.replace(pattern, `$1${value}$2`);
  return tag.replace(/\s*\/?>$/, (end) => ` ${name}="${value}"${end}`);
}

export function resolveLogoRoles(svg: string, palette: PaletteRoles): string {
  if (svg.includes('data-color-mode="monochrome"')) return svg;

  const dark = paletteIsDark(palette);
  const parts = svg.split(/(<[^>]+>)/);
  const out: string[] = [];
  // Track whether the cursor is inside a structural element. A stack rather than
  // an integer, because a `mask` may legitimately contain a `clipPath`.
  const structural: string[] = [];

  for (const part of parts) {
    if (!part.startsWith('<')) {
      out.push(part);
      continue;
    }

    const isClosing = part.startsWith('</');
    const isSpecial = part.startsWith('<!') || part.startsWith('<?');
    const nameMatch = part.match(/^<\/?\s*([A-Za-z][\w:-]*)/);
    const name = nameMatch ? nameMatch[1].toLowerCase() : '';
    const selfClosing = /\/>\s*$/.test(part);

    if (isSpecial) {
      out.push(part);
      continue;
    }

    if (isClosing) {
      for (let i = structural.length - 1; i >= 0; i--) {
        if (structural[i] === name) {
          structural.splice(i, 1);
          break;
        }
      }
      out.push(part);
      continue;
    }

    // An opening tag inside a structural element is still structural, so the role
    // substitution is skipped for it; the tag itself is preserved verbatim.
    if (structural.length > 0) {
      if (!selfClosing && STRUCTURAL.has(name)) structural.push(name);
      out.push(part);
      continue;
    }

    let tag = part;
    for (const [paint, dataAttr] of ROLE_ATTRS) {
      const role = attr(tag, dataAttr);
      if (!role) continue;
      const value = resolveRole(role, palette, dark);
      if (!value) continue;
      tag = setAttr(tag, paint, value);
    }
    out.push(tag);

    if (!selfClosing && STRUCTURAL.has(name)) structural.push(name);
  }

  return out.join('');
}

/**
 * REVERSE is a two-ink dark-surface master: `#2997ff` is the primary orbit and
 * `#edf4ff` is the light wordmark/planet. Rebind both so a palette change reaches
 * the mark instead of leaving a fixed blue logo on every theme.
 */
function resolvePrecoloredInk(svg: string, palette: PaletteRoles): string {
  return svg
    .replace(/#2997ff/gi, palette.primaryOnDark)
    .replace(/#edf4ff/gi, palette.surface);
}

/**
 * Fetch a master and return a URL the browser can render with roles resolved.
 *
 * Monochrome ink returns the master path directly, so the common case costs no
 * fetch and no blob URL to revoke.
 */
export async function resolveLogoUrl(
  orientation: LogoOrientation,
  ink: LogoInk,
  palette: PaletteRoles,
): Promise<string> {
  const path = logoPath(orientation, ink);
  // Monochrome masters are final inks; PRIMARY and REVERSE are recoloured.
  if (isMonochromeInk(ink)) return path;

  const response = await fetch(path);
  if (!response.ok) return path;

  const source = await response.text();
  const resolved = isPrecoloredInk(ink) ? resolvePrecoloredInk(source, palette) : resolveLogoRoles(source, palette);
  return URL.createObjectURL(new Blob([resolved], { type: 'image/svg+xml' }));
}

/** Whether a master carries any role binding, i.e. is a full-colour asset. */
export function hasRoleBinding(svg: string): boolean {
  return /data-(?:color|stroke|stop)-role="[A-Za-z]+"/.test(svg);
}
