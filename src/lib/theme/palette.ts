/**
 * spacelibre visual identity tokens.
 *
 * Mirrors the approved palette from the spacelibre-vi standard so the explorer
 * carries the same brand. The default preset is `01-electric-orbit`; every role
 * is exposed as a CSS custom property so components never hardcode colours.
 *
 * Role semantics (per the VI standard):
 *   orbit  → contextual `primary`
 *   planet → contextual `planetOnLight` / `planetOnDark`
 *   wordmark → readable foreground, with the `libre` portion in `primary`
 */

export interface PaletteRoles {
  primary: string;
  secondary: string;
  accent: string;
  deep: string;
  surface: string;
  ink: string;
  card: string;
  muted: string;
  line: string;
  success: string;
  warning: string;
  danger: string;
  primaryOnLight: string;
  primaryOnDark: string;
  planetOnLight: string;
  planetOnDark: string;
}

export interface PalettePreset {
  name: string;
  mode: 'split' | 'triad' | 'analogous';
  colors: PaletteRoles;
}

/** The six approved starting presets. */
export const PRESETS: PalettePreset[] = [
  {
    name: '01-electric-orbit',
    mode: 'split',
    colors: {
      primary: '#007BFF', secondary: '#FF3733', accent: '#F4F764',
      deep: '#0D1721', surface: '#F1F5F9', ink: '#122A44', card: '#FCFDFE',
      muted: '#627180', line: '#C9D0D8', success: '#176E55', warning: '#845A0B',
      danger: '#C01C34', primaryOnLight: '#006CE0', primaryOnDark: '#007BFF',
      planetOnLight: '#E00400', planetOnDark: '#FF3733',
    },
  },
  {
    name: '02-aurora-jump',
    mode: 'triad',
    colors: {
      primary: '#12D6B0', secondary: '#CE43EF', accent: '#F7DA64',
      deep: '#0D211D', surface: '#F1F9F7', ink: '#12443B', card: '#FCFEFD',
      muted: '#597570', line: '#C9D8D5', success: '#18724E', warning: '#7B610A',
      danger: '#C01C2E', primaryOnLight: '#0B816A', primaryOnDark: '#12D6B0',
      planetOnLight: '#BA13E2', planetOnDark: '#CE43EF',
    },
  },
  {
    name: '03-nebula-spectrum',
    mode: 'analogous',
    colors: {
      primary: '#A15AFF', secondary: '#FF33FC', accent: '#647AF7',
      deep: '#160D21', surface: '#F4F1F9', ink: '#281244', card: '#FDFCFE',
      muted: '#776989', line: '#CFC9D8', success: '#176E56', warning: '#7B5C0A',
      danger: '#BC1D1B', primaryOnLight: '#8D36FF', primaryOnDark: '#A15AFF',
      planetOnLight: '#C200BF', planetOnDark: '#FF33FC',
    },
  },
  {
    name: '04-solar-storm',
    mode: 'split',
    colors: {
      primary: '#FF6A3D', secondary: '#33FFC8', accent: '#648BF7',
      deep: '#21120D', surface: '#F9F3F1', ink: '#441E12', card: '#FEFDFC',
      muted: '#806A62', line: '#D8CDC9', success: '#176E56', warning: '#7F5C0A',
      danger: '#BC251B', primaryOnLight: '#D13000', primaryOnDark: '#FF6A3D',
      planetOnLight: '#00805D', planetOnDark: '#33FFC8',
    },
  },
  {
    name: '05-deep-space-oasis',
    mode: 'split',
    colors: {
      primary: '#15BDAD', secondary: '#EB47A9', accent: '#F79F64',
      deep: '#0D211F', surface: '#F1F9F8', ink: '#124440', card: '#FCFEFE',
      muted: '#597573', line: '#C9D8D7', success: '#176E54', warning: '#7F5D0A',
      danger: '#C51C1E', primaryOnLight: '#0E7D72', primaryOnDark: '#15BDAD',
      planetOnLight: '#D41788', planetOnDark: '#EB47A9',
    },
  },
  {
    name: '06-acid-future',
    mode: 'triad',
    colors: {
      primary: '#CBEA35', secondary: '#46CFEC', accent: '#F764DE',
      deep: '#1E210D', surface: '#F7F9F1', ink: '#3C4412', card: '#FDFEFC',
      muted: '#717559', line: '#D5D8C9', success: '#176E5A', warning: '#895B0B',
      danger: '#C51C1C', primaryOnLight: '#67790D', primaryOnDark: '#CBEA35',
      planetOnLight: '#0F7D94', planetOnDark: '#46CFEC',
    },
  },
];

export const DEFAULT_PRESET = PRESETS[0];

/**
 * Apply a preset to a root element as CSS custom properties. Every UI surface
 * reads these, so switching presets restyles the whole app, not just accents.
 */
export function applyPalette(root: HTMLElement, preset: PalettePreset): void {
  for (const [role, value] of Object.entries(preset.colors)) {
    root.style.setProperty(`--sl-${camelToKebab(role)}`, value);
  }
  root.dataset.palette = preset.name;
}

/**
 * Apply a preset to the document root (for SSR-hydrated pages).
 */
export function applyPaletteToDocument(preset: PalettePreset): void {
  if (typeof document === 'undefined') return;
  applyPalette(document.documentElement, preset);
}

/**
 * Whether a `deep` role reads as a dark surface.
 *
 * Used to pick a monochrome ink for the logo and favicon: a single-ink mark has
 * to contrast with whatever the palette puts behind it, and "dark" is a property
 * of the generated colour rather than something to hardcode per preset. Uses the
 * same relative-luminance definition as the VI engine so thresholds agree.
 */
export function isDarkSurface(hex: string): boolean {
  const rgb = hex
    .replace('#', '')
    .match(/[a-f\d]{2}/gi)
    ?.map((pair) => parseInt(pair, 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  if (!rgb || rgb.length < 3) return true;
  const luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  return luminance < 0.5;
}

function camelToKebab(value: string): string {
  return value.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
}
