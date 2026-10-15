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
- **A local asset mirror**: every referenced NASA asset (~1,914 files) is
  downloaded once by `tools/download-mirror.cjs` and served from `data/mirror/`
  by the `/nasa/[...path]` route. **No runtime requests to NASA.**
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

The bytes are **not** in this repository — only the scripts that fetch them.
After cloning:

```bash
node tools/build-manifest.cjs /path/to/nasa-app.js   # regenerate the inventory
node tools/download-mirror.cjs                       # fetch into data/mirror/
```

The mirror is git-ignored (see `.gitignore`); the library is not redistributed
here. If a request 404s at runtime, the missing path is printed — re-run the
downloader.

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

The app uses the mirror, laid out to match NASA's URL structure:

```
mirror    data/mirror/static/...        served at /nasa/static/...
mirror    data/mirror/dynamic/...       served at /nasa/dynamic/...

ephemeris   /nasa/dynamic/dynamo/<entity>/<ref>/<kind>/def.dyn
textures    /nasa/static/maps/<body>/<map>_<size>_<face>.png   (size 4..4096, face 0..5)
starfield   /nasa/static/stars/stars.<0..5>.bin
sprites     /nasa/static/sprites/<name>.png
```

These paths mirror `https://eyes.nasa.gov/assets/...`, so the same layout works
against either the mirror or the live site by changing one prefix.

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
