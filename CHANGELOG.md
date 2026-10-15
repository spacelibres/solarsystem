# Changelog

All notable changes to this project are recorded here. Every released version
has an entry; the version matches `VERSION` and its annotated tag.

## 0.2.2 - 2026-10-15

Real scene graph: true distances, time-segmented parenting, and the starfield.

### Added

- **Time-segmented parenting** (`src/lib/scene/parenting.ts`). Research into
  `app.js` showed `parents` is a `[[startTime, parentName], ...]` table, not a
  flat list — it is how a spacecraft flies Earth launch → heliocentric cruise →
  Jupiter capture → moon flybys. World position is now the sum of local
  positions up the parent chain, recomputed each frame, with cycle breaking.
- **Projection helpers** (`src/lib/scene/projection.ts`) using NASA's real
  formulas: `normalSpaceRadius = radius / distance / tan(fov/2)` and
  `pixelSpaceRadius`, plus the auto near/mid planes and the 20-pixel rule that
  gates subsystem loading.
- **Starfield** (`src/lib/scene/starfield.ts`) rendering NASA's own
  `stars.<0..5>.bin` layers. The 23-byte record layout and the ecliptic-J2000 →
  J2000 quaternion were decoded from `StarfieldComponent._loadStars`.
- **Segment window loading**: index `.dyn` files list 160+ windows across
  centuries; only the window covering the current epoch is fetched, matching
  NASA's lazy load/unload.
- Body labels now render as a coloured dot plus wide-tracked uppercase name,
  transcribed from `.pioneer-label-div`.

### Changed

- **Removed the logarithmic distance model.** NASA does not compress distance:
  bodies sit at true kilometre offsets and the camera moves between frames. The
  old `scene/scale.ts` was deleted along with its tests.
- Catalog regenerated to preserve `parents` timestamps, `systemRadius`,
  `extentsRadius`, `occlusionRadius`, `spheroid` and `modelUrl` (844 entities,
  129 multi-phase, 738 with models).
- `.dyn` segments are header-less; added `parseDynSegment` after confirming the
  layout byte-for-byte against a real segment.

### Fixed

- **Request flood.** Loading 140 bodies pulled every segment of every index
  file — 8,054 requests, exhausting the browser (ERR_INSUFFICIENT_RESOURCES).
  Window loading plus a 6-way throttle brings a cold load to **~150 requests**.
- Missing windows degrade gracefully instead of failing the whole scene.

### Verified

- `npm test` — 26/26 across dynamo, scene and segment parsing (parenting across
  the full Juno timeline, chain summation, cycle breaking, projection formulas,
  segment framing).
- `npm run check` and `npm run build` clean.
- Headless render: 41 bodies positioned, no exceptions, no failed requests,
  **0 requests to nasa.gov**.

## 0.2.1 - 2026-10-15

Adopt NASA Eyes' own design tokens and layout, transcribed from its stylesheet.

### Added

- `src/lib/theme/nasa-tokens.ts` — the site's real colour, typography and
  layout values, extracted from `apps/solar-system/app.css`: the grey and
  blue-grey families, semantic state colours (`live` #47da84, `paused` #ff9a42),
  typography (Metropolis / Inter / DMMono), the `#dynamic-ui` grid rows, and the
  **per-body hues** NASA uses as a colour key (#9768ac mercury, #b07919 venus,
  #0099cc earth, #9a4e19 mars, #da8b72 jupiter, #d5c187 saturn, #68ccda uranus,
  #708ce3 neptune, #f7f4df sun, #b6acac moon, #cd9745 spacecraft).
- `src/app/nasa-ui.css` — the interface rebuilt on those tokens: header scrim,
  breadcrumb, draggable time slider with a 36px radial knob tinted by state,
  settings rail, and the responsive breakpoints NASA actually uses
  (320 / 641 / 1025).
- `src/components/InfoPanel.tsx` — the left information column, mirroring
  `.content-panel-container` (22rem, Inter, `z-index: 40`).
- `tools/dump-dom.cjs` — dumps the live site's rendered DOM, computed styles and
  shell HTML, so layout decisions come from the original rather than guesses.

### Changed

- Scene colours every orbit and label with its body's NASA hue.
- Time controls show a live/paused rate readout and a real scrubber; the readout
  polls the scene clock so the two cannot drift.
- Header now carries the spacelibre wordmark, a breadcrumb, and a state chip.

### Removed

- `src/app/home.css` and `src/components/BodyTree.tsx`, replaced by the
  token-driven layout above.

### Verified

- `npm test` (21/21), `npm run check` and `npm run build` all pass.
- Headless render: no exceptions, no failed requests, **0 requests to
  nasa.gov**.

## 0.2.0 - 2026-10-15

Full local mirror, a real scale model, and the NASA Eyes interaction layer.

### Added

- **Local asset mirror.** `tools/download-mirror.cjs` fetches every referenced
  NASA asset (1,914 files, ~1.08 GB: textures, `.gltf` models, `.dyn`
  ephemerides, starfields) into a git-ignored `data/mirror/`, and
  `/nasa/[...path]` serves it from disk. The app makes **zero runtime requests
  to NASA**; verified over CDP, all 29 requests on load went to localhost.
- **`tools/build-manifest.cjs`** and **`tools/probe-sizes.cjs`** derive the
  asset inventory and its size from NASA's bundle before downloading it.
- **Scale model** (`src/lib/scene/scale.ts`): a piecewise log-ish radial map so
  the whole system is legible at once while every orbit keeps its true shape
  and inclination. Monotonic, invertible, and slope-continuous at the joins so
  orbits show no kink. Exaggerated display radii keep every body visible.
- **NASA Eyes interaction layer**: object sidebar (`BodyTree`) grouping the Sun,
  planets and moons by system, and a time bar (`TimeBar`) with play/pause,
  day stepping, date readout and five speed presets from 1 h/s to 1 y/s.
- Scene now renders the real Sun texture, camera framing of the full planetary
  system, focus-on-body with eased motion, and label collision avoidance.

### Changed

- `src/lib/nasa/assets.ts` now builds URLs against the local mirror instead of
  `eyes.nasa.gov`.
- Scene rebuilt on the shared scale model; removed the previous ad-hoc radius
  and per-frame orbit rebuild.

### Verified

- `npm test` — 21/21 across `dynamo` and `scale` suites (monotonicity,
  invertibility, join continuity, direction preservation, Sun/orbit ratio).
- `npm run check` and `npm run build` clean.
- Headless render: no console exceptions, no failed requests, **0 requests to
  nasa.gov**.

## 0.1.1 - 2026-10-15

Fix the release workflow so tagged releases publish their notes.

### Fixed

- `release.yml` matched the CHANGELOG heading exactly (`## <version>`), but
  entries carry a date (`## <version> - <date>`), so note extraction failed and
  the job exited. The `awk` matcher now matches the version as a heading prefix,
  and the job fails clearly if no entry is found.

### Verified

- `npm test`, `npm run check` and `npm run build` all pass.
- `verify` workflow on the repository is green; this release re-runs both
  workflows and publishes the GitHub Release for `v0.1.1`.

## 0.1.0 - 2026-10-15

Initial proof of concept: a solar system explorer on real NASA Eyes data.

### Added

- **`dynamo` `.dyn` parser** (`src/lib/dynamo/`) reverse-engineered from NASA
  Eyes and validated against live assets:
  - little-endian `Reader` mirroring NASA's own class;
  - `orb`, `pos`, `lin`, `ori`, `quat` point types with per-type record strides;
  - `orb` gravitational-parameter header (primary/central μ);
  - multi-segment index files resolved transparently by `loader.ts`;
  - Keplerian propagation (`solveEccentricAnomaly`, `orbPositionAt`) that turns
    osculating elements into Cartesian positions.
- **Body catalog** (`src/data/catalog.json`): 844 entities with radii, parents,
  dynamo controllers and texture maps, extracted from NASA's own bundle by
  `tools/extract-catalog.cjs`.
- **Next.js + Three.js app**: a live scene of the Sun and eight planets on real
  heliocentric orbits with NASA map textures, interactive orbit camera, and the
  spacelibre wordmark and palette (`src/lib/theme/palette.ts`).
- **Repository tooling**: `set-version.mjs`, release policy
  (`docs/versioning.md`), CDP capture/screenshot helpers under `tools/`.

### Verified

- `npm test` — 11/11 tests pass, covering header parsing, all point-block
  invariants (unit quaternions, eccentricity range, monotonic time), exact
  file-length accounting on four real NASA fixtures, and two-body geometry.
- `npm run check` — typecheck and lint clean.
- `npm run build` — production build succeeds.
- Rendered in headless Chrome with no console errors and no failed requests;
  Earth, Venus and Saturn appear on their orbit lines with NASA textures.

### Notes

- Only minimal `.dyn` fixtures are committed, for tests. The app fetches all
  other NASA assets at runtime and does not mirror the library.
