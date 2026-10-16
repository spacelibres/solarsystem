/**
 * The astrophysical framework: the hierarchy NASA Eyes models, its classification
 * system, and the reference frames everything is expressed in.
 *
 * This file is the single place where "where are we" is defined. Every value is
 * transcribed from NASA's bundle or from IAU definitions, never invented.
 *
 * ## Hierarchy
 *
 * NASA does not use a tree; entities carry a time-segmented parenting table
 * (`parents: [[startTime, parentId], ...]`), and the runtime scene graph resolves
 * it per frame. The levels that concern us here are:
 *
 *   observable_universe
 *     └ milky_way              (Milky Way galaxy)
 *         └ sun                (the solar system, as NASA expresses it)
 *             └ j2000_ecliptic (the frame planetary orbits are drawn in)
 *             └ mercury … neptune, plus l1/l2/l4/l5
 *                 └ moons
 *                     └ spacecraft
 *
 * ## Classification
 *
 * `groups` (from the entity table) and `category` (from the content database)
 * are two different taxonomies. See {@link LAYERS} for the latter, which is what
 * drives the UI's layer switches.
 */

/** Reference frames used across the project. */
export const FRAMES = {
  /** J2000 mean equator and equinox. `.dyn` orientations map into this. */
  J2000_EQUATORIAL: 'J2000 equatorial',
  /** J2000 ecliptic; NASA's `j2000_ecliptic` entity. */
  J2000_ECLIPTIC: 'J2000 ecliptic',
  /** Galactic: l measured from the galactic centre, b from the plane. */
  GALACTIC: 'Galactic',
} as const;

/**
 * Galactic reference constants, from NASA's `milky_way` `postCreateFunction`.
 *
 * These two directions, expressed in J2000 equatorial coordinates, are what fix
 * the galaxy's orientation — and therefore what lets us convert any equatorial
 * vector into galactic coordinates.
 *
 * They are also the IAU 1958 definition of the galactic system, adopted at the
 * 1958 General Assembly (Blaauw et al. 1960, MNRAS 121, 123), which is why NASA
 * uses these exact literals: the galactic frame is an international standard,
 * not a per-project choice.
 *
 *   l = 0, b = 0   points at the galactic centre
 *   b = +90°       points at the north galactic pole
 *
 * The transformation to galactic coordinates is the inverse of the matrix whose
 * rows are these three axes; see {@link equatorialToGalactic}.
 */
export const GALACTIC_REFERENCE = {
  /** North galactic pole: longitude 192.85948120833°, latitude 27.12825119444°. */
  pole: { lonDeg: 192.85948120833, latDeg: 27.12825119444 },
  /** Galactic centre: longitude 266.40499625°, latitude -28.93617241667°. */
  centre: { lonDeg: 266.40499625, latDeg: -28.93617241667 },
} as const;

/**
 * The Sun's position in the Galaxy.
 *
 * NASA places it with an `orbitalElements` controller around the galactic
 * centre: a circular orbit of semi-major axis 246,237,071 × 10^9 km, epoch 0,
 * mean anomaly at epoch π, and the galactic basis as its orientation. Solving
 * that at J2000 gives:
 *
 *   galactocentric distance  26,027 light years  (7.98 kpc)
 *   galactic longitude l     0°
 *   galactic latitude  b     0°
 *
 * i.e. the Sun sits in the galactic plane along the Sun→centre line.
 *
 * ## On R₀
 *
 * 7.98 kpc is NASA's value and is inside the modern measured range. Beware the
 * widely repeated claim that "the IAU recommends R₀ = 8.2 kpc": the IAU has
 * never adopted R₀ by resolution — it is a *measured* quantity, and 8.2 kpc is
 * only the conventional round number (descended from the older 8.5 kpc). The
 * current precise measurement is R₀ = 8.178 ± 0.013 ± 0.022 kpc from the
 * GRAVITY Collaboration (Abuter et al. 2019, A&A 625, L10).
 *
 * ## On b = 0
 *
 * NASA models the Sun as lying exactly in the galactic plane (b = 0), because
 * its galactic orbit has e = 0 and the galactic basis as its orientation. That
 * is the geometry international charts use for the *schematic* position of the
 * solar system. Physically the Sun sits ~10–25 pc *above* the mid-plane, so its
 * true galactic latitude is about b ≈ +0.1°. We reproduce NASA's plane value,
 * which is what the annotated Milky Way charts show, and note the difference
 * here rather than silently claiming a physical precision we do not have.
 */
export const SUN_POSITION = {
  /** Distance to the galactic centre, km. */
  galactocentricKm: 246_237_071e9,
  /** Distance to the galactic centre in light years, derived. */
  galactocentricLightYears: 246_237_071e9 / 9_460_730_472_580.8,
  /** Distance in kiloparsecs, derived (1 pc = 3.0856775814913673e13 km). */
  galactocentricKpc: 246_237_071e9 / 3.0856775814913673e13 / 1000,
  /** Distance in parsecs, derived. */
  galactocentricParsec: 246_237_071e9 / 3.0856775814913673e13,
  /** Galactic longitude, degrees. */
  galacticLongitudeDeg: 0,
  /** Galactic latitude, degrees. */
  galacticLatitudeDeg: 0,
} as const;

/**
 * The layer taxonomy, transcribed verbatim from every `addLayer` call in NASA's
 * `LayerManager` (18 layers).
 *
 * `categories` may be a single string or a list. `group` ties a layer into a
 * UI cluster (moons / spacecraft). `sublayers` are switched along with their
 * parent, so toggling Spacecraft also toggles Orbiters, Landers and Satellite
 * Group. The four layers with no `defaultVisibility` are on by default, as
 * NASA's `addLayer` defaults it to `true`.
 */
export interface LayerDefinition {
  id: string;
  name: string;
  /** UI cluster this layer belongs to, if any. */
  group?: string;
  /** Content-database categories this layer owns. */
  categories: readonly string[];
  /** Layers toggled together with this one. */
  sublayers?: readonly string[];
  defaultVisible: boolean;
}

export const LAYERS: readonly LayerDefinition[] = [
  { id: 'ui', name: 'User Interface', categories: [], defaultVisible: true },
  { id: 'trails', name: 'Trails', categories: [], defaultVisible: true },
  { id: 'orbits', name: 'Orbits', categories: [], defaultVisible: true },
  { id: 'labels', name: 'Labels', categories: [], defaultVisible: true },
  { id: 'icons', name: 'Icons', categories: [], defaultVisible: true },
  { id: 'planets', name: 'Planets', categories: ['Planet'], defaultVisible: true },
  { id: 'asteroids', name: 'Asteroids', categories: ['Asteroid'], defaultVisible: false },
  { id: 'comets', name: 'Comets', categories: ['Comet'], defaultVisible: false },
  { id: 'dwarfPlanets', name: 'Dwarf Planets', categories: ['Dwarf Planet'], defaultVisible: false },
  {
    id: 'spacecraft',
    name: 'Spacecraft',
    categories: ['Spacecraft'],
    sublayers: ['orbiters', 'landers', 'satelliteGroup'],
    defaultVisible: true,
  },
  { id: 'majorMoons', name: 'Major Moons', categories: ['Major Moon'], group: 'moons', defaultVisible: true },
  { id: 'minorMoons', name: 'Minor Moons', categories: ['Minor Moon'], group: 'moons', defaultVisible: false },
  { id: 'orbiters', name: 'Orbiters', categories: ['Orbiter'], group: 'spacecraft', defaultVisible: true },
  {
    id: 'satelliteGroup',
    name: 'Satellite Group',
    categories: ['CYGNSS', 'TROPICS', 'STARLING', 'PREFIRE'],
    group: 'spacecraft',
    defaultVisible: true,
  },
  {
    id: 'landers',
    name: 'Landers',
    categories: ['Lander', 'Rover', 'Landing site'],
    group: 'spacecraft',
    defaultVisible: true,
  },
  { id: 'starfield', name: 'Star Field', categories: [], defaultVisible: false },
  { id: 'heliosphere', name: 'Heliosphere', categories: [], defaultVisible: false },
  {
    id: 'constellations',
    name: 'Constellations',
    categories: ['Constellations'],
    defaultVisible: false,
  },
] as const;

/**
 * Layer ids that are contextual: shown only for the body currently in focus.
 *
 * From `LayerManager._contextualLayersList`.
 */
export const CONTEXTUAL_LAYERS = [
  'majorMoons',
  'minorMoons',
  'landers',
  'orbiters',
  'satelliteGroup',
  'heliosphere',
] as const;

/**
 * LayerManager's own display categories, from `_categories` and
 * `_categoriesDisplay`: the layer id -> content category mapping it uses to
 * resolve which entities a layer owns.
 */
export const LAYER_CATEGORIES: Record<string, string> = {
  ui: 'User Interface',
  planets: 'Planet',
  asteroids: 'Asteroid',
  comets: 'Comet',
  dwarfPlanets: 'Dwarf Planet',
  spacecraft: 'Spacecraft',
  trails: 'Trail',
  labels: 'Label',
  icons: 'Icons',
  starfield: 'Star Field',
  constellations: 'Constellations',
};

/** Count of constellations in the IAU catalogue, which `constellations.bin` holds. */
export const CONSTELLATION_COUNT = 88;

/** Parsec in kilometres, IAU definition. */
export const PARSEC_KM = 3.0856775814913673e13;

/** Kiloparsec in kilometres. */
export const KILOPARSEC_KM = PARSEC_KM * 1000;

/** Light year in kilometres, from NASA's own constant. */
export const LIGHT_YEAR_KM = 9_460_730_472_580.8;

const rad = (deg: number): number => (deg * Math.PI) / 180;

/**
 * The three galactic axes as unit vectors in the J2000 equatorial frame.
 *
 * Row order is `[x, y, z]` = `[galactic-centre direction, l = 90°, NGP]`, which
 * is the standard IAU 1958 construction. Both reference directions are the exact
 * literals from NASA's bundle, so this matrix *is* the international standard
 * matrix to the precision NASA works at.
 */
export function galacticAxes(): {
  x: [number, number, number];
  y: [number, number, number];
  z: [number, number, number];
} {
  const { centre, pole } = GALACTIC_REFERENCE;
  const gc: [number, number, number] = [
    Math.cos(rad(centre.lonDeg)) * Math.cos(rad(centre.latDeg)),
    Math.sin(rad(centre.lonDeg)) * Math.cos(rad(centre.latDeg)),
    Math.sin(rad(centre.latDeg)),
  ];
  const ngp: [number, number, number] = [
    Math.cos(rad(pole.lonDeg)) * Math.cos(rad(pole.latDeg)),
    Math.sin(rad(pole.lonDeg)) * Math.cos(rad(pole.latDeg)),
    Math.sin(rad(pole.latDeg)),
  ];
  // l = 90° = NGP x galactic-centre, giving a right-handed (l, b) frame.
  const l90: [number, number, number] = [
    ngp[1] * gc[2] - ngp[2] * gc[1],
    ngp[2] * gc[0] - ngp[0] * gc[2],
    ngp[0] * gc[1] - ngp[1] * gc[0],
  ];
  return { x: gc, y: l90, z: ngp };
}

/**
 * Convert a J2000 equatorial unit vector to galactic coordinates.
 *
 * This is the IAU 1958 transformation, built from the same two reference
 * directions NASA uses. Returns degrees, with `l` normalised to [0, 360).
 */
export function equatorialToGalactic(v: [number, number, number]): {
  lDeg: number;
  bDeg: number;
} {
  const { x: gc, y: l90, z: ngp } = galacticAxes();
  const dot = (a: [number, number, number]): number => a[0] * v[0] + a[1] * v[1] + a[2] * v[2];
  const x = dot(gc);
  const y = dot(l90);
  const z = dot(ngp);
  const norm = Math.hypot(x, y, z) || 1;
  const lDeg = ((Math.atan2(y / norm, x / norm) * 180) / Math.PI + 360) % 360;
  const bDeg = (Math.asin(z / norm) * 180) / Math.PI;
  return { lDeg, bDeg };
}

/**
 * Where the Sun falls on NASA's `milky_way.png`, as a UV and pixel coordinate.
 *
 * NASA's sprite is a 2^S = 1.2e18 km square centred on the galactic centre with
 * its +X axis pointing **at** the centre (`setFromAxes(a, …, n)`). The Sun orbits
 * at R₀ = 246,237,071 × 10⁹ km on the opposite side, so it lands on the sprite's
 * −X side at
 *
 *   fraction of half-width = R₀ / S = 0.20520
 *
 * On the 1024-column texture that is 210.12 px from the centre: **column 302**,
 * with row 512 because b = 0. U follows the sprite's +X, so u < 0.5.
 *
 * NASA does not paint a marker into the texture; this is a derived coordinate,
 * used to place the Sun's own label where the planetary ephemeris puts it.
 */
export const SUN_SPRITE_POSITION = {
  /** Fraction of the sprite half-width between the centre and the Sun. */
  fraction: SUN_POSITION.galactocentricKm / 1.2e18,
  /** Texture coordinate, 0..1, with the sprite centred at (0.5, 0.5). */
  u: 0.5 - SUN_POSITION.galactocentricKm / 1.2e18,
  v: 0.5,
  /** Pixel column/row on the 1024×1024 source texture. */
  pixelX: 512 - (SUN_POSITION.galactocentricKm / 1.2e18) * 1024,
  pixelY: 512,
  /** Kilometres per texel at that texture resolution. */
  kmPerTexel: 1.2e18 / 1024,
} as const;
