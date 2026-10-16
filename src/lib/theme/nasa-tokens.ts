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

/**
 * Icon sprite for a body, by `category`, from `LabelManager._iconMap`.
 *
 * Transcribed verbatim from NASA's `LabelManager` constructor:
 *
 *   Universe: "no-icon", Galaxy: "no-icon", Star: "no-icon",
 *   Barycenter: "icon-circle-white-small", "Landing site": "icon-hexagon",
 *   Moon: "icon-circle-white-small", Asteroid: "icon-circle-white-small",
 *   "Dwarf Planet": "icon-circle-white-small", Comet: "icon-circle-white-small",
 *   Spacecraft: "icon-hexagon", Planet: "icon-circle-" (the body id is appended),
 *   Default: "icon-circle-white-small"
 */
export const LABEL_ICON_MAP: Record<string, string> = {
  Universe: 'no-icon',
  Galaxy: 'no-icon',
  Star: 'no-icon',
  Barycenter: 'circle-white-small',
  'Landing site': 'hexagon',
  Moon: 'circle-white-small',
  Asteroid: 'circle-white-small',
  'Dwarf Planet': 'circle-white-small',
  Comet: 'circle-white-small',
  Spacecraft: 'hexagon',
  Planet: 'circle-',
  Default: 'circle-white-small',
};

/**
 * Label collision priority, from `LabelManager._weightMap`.
 *
 * Higher wins when two labels overlap. Read verbatim from NASA's constructor;
 * note that a barycentre (0) is always sacrificed and stars/galaxies (100)
 * always survive.
 */
export const LABEL_WEIGHT_MAP: Record<string, number> = {
  Universe: 100,
  Galaxy: 100,
  Star: 100,
  Barycenter: 0,
  'Landing site': 5,
  Constellation: 10,
  Asteroid: 15,
  Comet: 15,
  Moon: 25,
  'Dwarf Planet': 28,
  Spacecraft: 30,
  Planet: 50,
};

/** Every label outside the 5% centre square competes; inside it, priority wins. */
export const LABEL_FOCUS_SIZE = 0.05;

/**
 * Icon sprite name for a body, resolving `LabelManager._iconMap`.
 *
 * `Planet` icons are `icon-circle-<id>`; everything else is a fixed sprite. The
 * category is the content database's, falling back to `Default`.
 */
export function bodyIconName(id: string, category: string = ''): string {
  const mapped = LABEL_ICON_MAP[category] ?? LABEL_ICON_MAP.Default;
  if (mapped === 'circle-') return `circle-${id}`;
  return mapped;
}

/**
 * Label collision weight for a body.
 *
 * Constellation labels are special-cased by id prefix in NASA's
 * `getDefaultWeight`, because they have no entity of their own until loaded.
 */
export function labelWeight(id: string, category: string = '', subcategory: string = ''): number {
  if (id.startsWith('constellation_')) return LABEL_WEIGHT_MAP.Constellation;
  // A major moon has no weight of its own; NASA keys it on the Moon category.
  return LABEL_WEIGHT_MAP[subcategory] ?? LABEL_WEIGHT_MAP[category] ?? 0;
}

/**
 * Which layer a body belongs to, following `LayerManager.getEntityLayer`.
 *
 * Subcategory is consulted first, then category: an `Orbiter` lands in the
 * `orbiters` layer rather than `spacecraft`, and a `Major Moon` in `majorMoons`
 * rather than anywhere category-level.
 */
export function layerForEntity(
  category: string | null,
  subcategory: string | null,
  layers: readonly { id: string; categories: readonly string[] }[],
): string | null {
  const find = (needle: string | null): string | null => {
    if (!needle) return null;
    const hit = layers.find((l) => l.categories.includes(needle));
    return hit ? hit.id : null;
  };
  return find(subcategory) ?? find(category);
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
