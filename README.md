# spacelibre · solar system

An independent source reconstruction of NASA Eyes on the Solar System, with
its original browser UI and engine, hosted locally with Next.js. The earlier
spacelibre Three.js implementation remains in the repository as reference.

> Not affiliated with or endorsed by NASA. See **Attribution** below.

## Editable NASA Eyes source project

The primary application now lives in [eyes/](eyes/README.md), as normal source
modules with explicit relative imports/exports. It no longer runs webpack module
factories or the captured chunk runtime. Start with `npm ci` and `npm run dev`.
Normal dev/build commands compile the checked-in sources and never regenerate
or overwrite edits. The original NASA UI, rendering engine and interactions are
retained; models, imagery, fonts and ephemerides load from NASA at runtime.

- [Application entry](eyes/src/app/SolarSystemApp.js)
- [Component layout](eyes/src/app/config/components.js), [views](eyes/src/app/config/views.js), [settings](eyes/src/app/config/settings.js)
- [HTML templates](eyes/src/ui/templates/), [engine](eyes/src/engine/), [shared Eyes framework](eyes/src/framework/eyes/)
- `npm run eyes:build`: compile and publish the editable source to the local host.
- `npm run eyes:check`: audit source syntax and import resolution.
- `cd eyes && npm ci && npm run dev`: independent source project on port 3002.
- [Chinese source reference](docs/eyes-analysis/README.md): current file/class/method
  inventory and dependencies. Inventory coverage does not mean semantic recovery.
- [Actual semantic progress](docs/eyes-analysis/semantic-progress.json) separates
  source changes backed by checks from files still awaiting semantic review.
- [Review and maintenance guide](docs/eyes-analysis/semantic-review-guide.md)
  explains the scope and limits of each check.
- [Loading-screen correction](docs/eyes-analysis/preload-semantic-changes.md),
  [application](docs/eyes-analysis/application-semantic-changes.md),
  [resources](docs/eyes-analysis/resource-semantic-changes.md),
  [dynamics and terrain](docs/eyes-analysis/dynamo-semantic-changes.md),
  [stories](docs/eyes-analysis/stories-semantic-changes.md), and
  [shaders](docs/eyes-analysis/shader-semantic-changes.md) explain concrete edits,
  naming evidence, preserved contracts and remaining questions.
- [Three matching report](docs/eyes-analysis/three-semantic-changes.md) records
  the actual upstream matches, whole-file checks and unmatched methods.
- [Deeper core comparison](docs/eyes-analysis/three-core-next.md),
  [renderer and addon comparison](docs/eyes-analysis/three-renderer-next.md), and
  [Eyes/Three integration](docs/eyes-analysis/eyes-three-integration.md) connect
  the official source to the actual application, including all rendering components,
  camera conventions, manual matrices and corrected GPU cleanup paths.
- [Remaining core semantics](docs/eyes-analysis/three-core-remaining-semantics.md) explains
  methods and helpers that lack a complete structural match, with explicit boundaries.
- `npm run eyes:analyze`: refresh the reference; `npm run eyes:analyze:check`:
  reject stale source coverage and evidence links.

The approved [independent rebuild design](docs/superpowers/specs/2026-10-16-controlled-solar-system-design.md)
and [current-system audit](docs/eyes-analysis/controlled-rebuild-audit.md) define
the new source-controlled system. Remaining contracts are documented for
[vendor dependencies](docs/eyes-analysis/remaining-vendor-contracts.md),
[UI/data/styles](docs/eyes-analysis/remaining-ui-data-contracts.md), and
[boot/runtime/build](docs/eyes-analysis/remaining-boot-runtime-contracts.md).
The independent [controllable foundation](docs/solar-system/README.md) is available at `/explorer`; the current default remains Eyes. The foundation is an initial six-target slice, not full Solar System parity.

The recovery accounts for 1,087 original modules, with 733 native ESM modules,
55 HTML template files, JSON data and ordinary third-party CommonJS modules.
`eyes/provenance.json` records original IDs, ranges and bundle hashes. The old
`deobf/` factory project remains ignored research output; it is not the active
source. Recovery is an explicit tooling command, not a development prerequisite.

This independent reconstruction is not NASA's unpublished original repository
and is not affiliated with or endorsed by NASA. Some minified local identifiers
remain unresolved. Original third-party snapshots and their license notices are
preserved rather than replaced with different dependency versions.

## Earlier custom viewer foundation

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
