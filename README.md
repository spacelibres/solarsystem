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
- **Runtime NASA assets**: exact catalog URLs are resolved against
  `https://eyes.nasa.gov/assets/`. No local asset mirror is required.
- **Window-aware ephemeris loading**: controller indexes and segment payloads
  have separate bounded caches; failed requests can be retried and dates outside
  sample coverage are reported as unavailable.
- **A catalog of 844 NASA bodies** (`src/data/catalog.json`), extracted directly
  from NASA's own bundle by `tools/extract-catalog.cjs` — radii, parents,
  dynamo controllers and texture maps.
- **A hierarchical scene** that composes positions relative to their parent
  bodies and renders orbital geometry from real elements.
- **A live 3D scene** of the Sun and eight planets on real heliocentric orbits
  with real NASA map textures.
- **An initial interaction layer** with catalog search, object facts, camera
  focus, layer controls and time playback. Full reference parity is in progress;
  see [`docs/nasa-eyes-parity.md`](docs/nasa-eyes-parity.md) for current limits.

## Getting the assets

Run the app with an internet connection. The browser requests planetary imagery,
star data and ephemerides directly from NASA using the exact paths in the catalog.
The verified NASA endpoints permit cross-origin requests. Availability depends
on NASA's public servers; this project does not provide offline asset storage.

Only the small attributed `.dyn` fixtures under `tests/fixtures/` are committed.
Historical bulk-download tools are not part of the supported setup workflow.

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
| `orb` | time, a, e, n, M₀, qw, qx, qy, qz                                       | 72 B   |
| `pos` | time, px, py, pz, vx, vy, vz                                            | 56 B   |
| `lin` | time, px, py, pz                                                        | 32 B   |
| `ori` | time, qw, qx, qy, qz, wx, wy, wz                                        | 64 B   |
| `quat`| time, qw, qx, qy, qz                                                    | 40 B   |

The `orb` and `ori` strides are verified against real NASA assets in
`tests/dynamo.test.ts`; the parser also checks that the remaining byte count is
an exact multiple of the stride before trusting a file.

## Data endpoints

The app resolves paths against `https://eyes.nasa.gov/assets`:

```
ephemeris   /assets/dynamic/dynamo/<entity>/<ref>/<kind>/def.dyn
textures    /assets/static/maps/<body>/<map>_<size>_<face>.png   (size 4..4096, face 0..5)
starfield   /assets/static/stars/stars.<0..5>.bin
sprites     /assets/static/sprites/<name>.png
```

Segment indexes select the actual segment URL for the requested time. Resource
paths and binary layout must be verified against real NASA responses before edits.

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
