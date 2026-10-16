# spacelibre · solar system

A browser-based solar system explorer built with **Next.js** and **Three.js**,
driven by **NASA Eyes' own public ephemeris data**. It reads NASA's binary
`dynamo` (`.dyn`) files directly and renders planetary imagery from NASA's asset
library, presented with the [spacelibre visual standard](../spacelibre-vi).

> Not affiliated with or endorsed by NASA. See **Attribution** below.

## What works today

- **A from-scratch `.dyn` parser** (`src/lib/dynamo/`) for NASA's binary
  ephemeris format, covering the `orb`, `pos`, `lin`, `ori` and `quat` point
  types, the little-endian header, the gravitational-parameter block, and
  multi-segment index files.
- **Runtime NASA assets**: ephemerides, planetary maps and sky data are requested
  directly from NASA's verified public asset URLs. No local mirror is required.
- **A catalog of 844 NASA bodies** (`src/data/catalog.json`), extracted directly
  from NASA's own bundle by `tools/extract-catalog.cjs` — radii, parents,
  dynamo controllers and texture maps.
- **A scale model** (`src/lib/scene/scale.ts`) that makes the whole system
  legible at once while keeping every orbit's true shape and inclination.
- **A live 3D scene** of the Sun and eight planets on real heliocentric orbits
  with real NASA map textures.
- **The NASA Eyes interaction layer**: an object sidebar grouping the Sun,
  planets and moons by system, and a time bar with play/pause, day stepping,
  date readout and speed presets from 1 h/s to 1 y/s.

## Getting the assets

Run with an internet connection. The browser loads exact catalog paths under
`https://eyes.nasa.gov/assets/`; verified endpoints permit cross-origin requests.
Only small attributed test fixtures are committed. Bulk-download tooling is not
part of normal setup. The existing `/nasa` route remains for legacy local setups,
but the viewer does not depend on it.

The viewer requires all eight planets before reporting success. A failed orbit
request shows a retry action instead of silently displaying a Sun-only scene.

## The `.dyn` format

All scalars are little-endian. A file is:

```
i16    version              (1 or 2)
string name                 NUL-terminated: orb | pos | lin | ori | quat
u8     numberOfDigits       (version 2 only)
<point-type header>         orb: f64 GM_primary, f64 GM_central
u8     hasPoints            (1 = inline points; 0 = multi-segment index)
i32    count
count × <point record>
```

Point records (all `f64`):

| type  | fields                                                                 | stride |
|-------|------------------------------------------------------------------------|--------|
| `orb` | time, a, e, n, M₀, qx, qy, qz, qw                                       | 72 B   |
| `pos` | time, px, py, pz, vx, vy, vz                                            | 56 B   |
| `lin` | time, px, py, pz                                                        | 32 B   |
| `ori` | time, qx, qy, qz, qw, wx, wy, wz                                        | 64 B   |
| `quat`| time, qx, qy, qz, qw                                                    | 40 B   |

The `orb` and `ori` strides are verified against real NASA assets in
`tests/dynamo.test.ts`; the parser also checks that the remaining byte count is
an exact multiple of the stride before trusting a file.

## Data endpoints

Paths resolve against `https://eyes.nasa.gov/assets`:

```
ephemeris   /assets/dynamic/dynamo/<entity>/<ref>/<kind>/def.dyn
textures    /assets/static/maps/<body>/<map>_<size>_<face>.png   (size 4..4096, face 0..5)
starfield   /assets/static/stars/stars.<0..5>.bin
sprites     /assets/static/sprites/<name>.png
```

Resource paths are source-derived; verify real NASA responses before changing
their construction.

## Development

```bash
npm ci
npm run dev        # http://localhost:3000
npm test           # parser + geometry tests against real fixtures
npm run check      # typecheck + lint
npm run build      # production build
```

Regenerate the body catalog from a fresh NASA bundle:

```bash
node tools/extract-catalog.cjs /path/to/app.js src/data/catalog.json
```

Research tooling lives in `tools/`: `capture-assets.cjs` and `probe-net.cjs`
record NASA's network traffic over CDP, and `screenshot.cjs` captures the local
app for visual checks.

## Releases

Every push to `main` is a release: patch bump, changelog entry, verified build,
commit, annotated tag. See [`docs/versioning.md`](docs/versioning.md).

## Attribution

- Ephemeris data and planetary imagery: **NASA**, via NASA Eyes on the Solar
  System. Data credit: NASA/JPL.
- Visual identity: the spacelibre VI standard
  (`github.com/spacelibres/vi`).

This project is an independent viewer. It is not produced, reviewed or endorsed
by NASA, and does not imply any NASA endorsement.
