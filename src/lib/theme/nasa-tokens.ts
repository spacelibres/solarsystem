/**
 * NASA Eyes design tokens, transcribed from the site's own stylesheet
 * (`apps/solar-system/app.css`) and its rendered DOM.
 *
 * These are the *actual* values NASA ships. The replica must match the original
 * closely, so this file is the single source of truth for chrome colours,
 * layout metrics and typography. Do not invent values here; when in doubt,
 * re-extract from the stylesheet (see `tools/dump-dom.cjs`).
 */

/** Neutral chrome greys. */
export const GRAYS = {
  black: '#000000',
  white: '#ffffff',
  gray: '#95959d',
  grayDark: '#252527',
  grayAlpha: 'rgba(37,37,39,0.6)',
  grayDarkAlpha: 'rgba(37,37,39,0.8)',
  panelBg: '#181818',
  borderGray: 'rgba(255,255,255,0.31)',
  tabBorderGray: '#606060',
  divider: '#25282b',
} as const;

/** The blue-grey family used across panels, buttons and dividers. */
export const GRAYBLUE = {
  background: '#151a1d',
  button: '#425571',
  divider: '#25282b',
  light: '#d2e1e8',
  med: '#a4bac1',
  text: '#83959b',
  white: '#f0f8fc',
} as const;

/** Semantic colours. */
export const SEMANTIC = {
  /** Playback is running. */
  live: '#47da84',
  /** Playback is paused. */
  paused: '#ff9a42',
  settings: '#0d67ff',
  nasaBlue: '#288bff',
  ctaBlue: '#3e63dd',
  error: '#d55033',
} as const;

/**
 * Per-body hues. NASA tints each body's label, orbit and swatch with these,
 * which is why the object list doubles as a colour key.
 */
export const BODY_COLORS: Record<string, string> = {
  sun: '#f7f4df',
  mercury: '#9768ac',
  venus: '#b07919',
  earth: '#0099cc',
  mars: '#9a4e19',
  jupiter: '#da8b72',
  saturn: '#d5c187',
  uranus: '#68ccda',
  neptune: '#708ce3',
  moon: '#b6acac',
  asteroid: '#806262',
  comet: '#7e86b0',
  spacecraft: '#cd9745',
  constellation: '#59b2ff',
};

/** Typography. NASA uses Metropolis for headings/UI and DMMono for numerals. */
export const FONTS = {
  sans: 'Metropolis, Inter, "Helvetica Neue", Arial, sans-serif',
  panel: 'Inter, Metropolis, sans-serif',
  mono: 'DMMono, Consolas, "SFMono-Regular", monospace',
} as const;

export const FONT_SIZES = {
  large: '18px',
  base: '16px',
  small: '14px',
  xsmall: '12px',
  tiny: '10px',
} as const;

/**
 * Layout metrics from the site's grid.
 *
 * `#dynamic-ui` is a 12-column grid with named areas; the time controls sit in
 * `foot`, the settings rail in `side`, and the info panel is a fixed column on
 * the left.
 */
export const LAYOUT = {
  headerHeight: 75,
  mobileHeaderHeight: 70,
  /** Grid row template for `#dynamic-ui`. */
  gridRows: 'minmax(70px, max-content) 1fr 1fr 1fr minmax(20px, max-content) minmax(min(13vh, 70px), auto)',
  /** Horizontal offset applied to centred UI when a body panel is open. */
  offsetRight: '12vw',
  /** Vertical offset of the bottom gradient. */
  offsetUp: '18vh',
  /** Controls column widths. */
  contentPanelWidth: '22rem',
  timeControlMaxWidth: 800,
  rateControlsMaxWidth: 160,
  sliderHeight: 50,
  knobSize: 36,
  headerPaddingTop: 20,
  headerMargin: 10,
} as const;

/** The easing NASA uses nearly everywhere. */
export const EASE_OUT = 'cubic-bezier(0.2, 0.2, 0, 1)';

/** Breakpoints that matter for the replica. */
export const BREAKPOINTS = {
  mobile: 320,
  tablet: 641,
  wide: 961,
  desktop: 1025,
  desktopMinHeight: 600,
  large: 1300,
} as const;

/**
 * Body label metrics, transcribed from the live page's computed styles.
 *
 * Measured from `.pioneer-label-div` on NASA's home view:
 *
 *   planet   font 16px, weight 600, letter-spacing 4.8px, text-transform
 *            uppercase, colour #fff at opacity .75, icon 20x20 offset
 *            (-28px, -4px) from the text origin
 *   sun      font 18px, letter-spacing 5.4px, icon 20x20
 *
 * The label text is always white; a body's own hue is carried only by its
 * circular icon (the `icon-circle-*` sprites).
 */
export const LABEL = {
  /** Base font size at `min-width: 1025px`. */
  fontSize: 16,
  /** Applies below that breakpoint. */
  fontSizeSmall: 14,
  /** The Sun is one step larger than the planets. */
  fontSizeSun: 18,
  /** Pixel tracking, not `em`: NASA sets 4.8px for planets, 5.4px for the Sun. */
  letterSpacing: '4.8px',
  letterSpacingSun: '5.4px',
  weight: 600,
  /** Colour and opacity of every label's text. */
  color: '#ffffff',
  opacity: 0.75,
  /** Icon box, in CSS pixels. */
  iconSize: 20,
  /** Icon offset from the text origin (NASA's `translate(-50% - 18px, -50% + 6px)`). */
  iconOffsetX: -28,
  iconOffsetY: -4,
  /** Spacecraft labels use a smaller icon sitting closer to the text. */
  iconSizeSpacecraft: 14,
  iconOffsetXSpacecraft: -24,
  /** Label origin offsets, per kind. */
  offsetPlanet: 18,
  offsetSun: 20,
  offsetSpacecraft: 14,
  offsetDefault: 12,
  topPlanet: -6,
  topSun: 8,
  topDefault: -4,
} as const;

/** Icon sprite name for a body, matching NASA's `icon-circle-<id>` set. */
export function bodyIconName(id: string, groups: string[] = []): string {
  const known = [
    'sun', 'mercury', 'venus', 'earth', 'mars',
    'jupiter', 'saturn', 'uranus', 'neptune',
  ];
  if (known.includes(id)) return `circle-${id}`;
  if (groups.includes('moons')) return 'circle-white-small';
  return 'circle-white-small';
}

/** Constellation labels: monospace, wide tracking, with a glow. */
export const CONSTELLATION_LABEL = {
  fontSize: 20,
  weight: 300,
  letterSpacing: '0.5em',
  color: BODY_COLORS.constellation,
} as const;

/** Resolve a body's accent colour, falling back by category. */
export function bodyColor(id: string, groups: string[] = []): string {
  if (BODY_COLORS[id]) return BODY_COLORS[id];
  if (groups.includes('spacecraft')) return BODY_COLORS.spacecraft;
  if (groups.includes('comets')) return BODY_COLORS.comet;
  if (groups.includes('asteroids') || groups.includes('dwarf planets')) {
    return BODY_COLORS.asteroid;
  }
  if (groups.includes('moons')) return BODY_COLORS.moon;
  return GRAYBLUE.med;
}
