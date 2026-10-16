# Changelog

All notable changes to this project are recorded here. Every released version
has an entry; the version matches `VERSION` and its annotated tag.

## 0.2.6 - 2026-10-15

Ring systems and multi-layer planet surfaces.

### Added

- **Planetary ring systems** (`src/lib/scene/rings.ts`), using the radii and
  sprites from each body's `postCreateFunction`: Saturn 74270.58–140478.92 km
  with distinct top/bottom maps, Uranus 26840–103000 km, Neptune 40900–62964 km.
  Rings are annuli in the equatorial plane, parented to the body and scaled back
  out of the body's exaggerated draw scale.
- **Multi-layer surfaces** (`src/lib/scene/surface.ts`): the surface composes
  `color`, `normal`, `specular` and `night` roles, with `decal` drawn as a
  separate translucent cloud shell 1.2% larger than the body.
- **Night-lights blend**: a shader patch fades the `night` emissive map in
  across the terminator (`smoothstep` on `dot(normal, sunDirection)`), so city
  lights appear only on the dark hemisphere.
- Debug hooks `focus`, `camera` and `inspect` for automation, plus
  `tools/focus-shot.cjs` to frame a body and capture it.

### Fixed

- **Ring strips are 2048x1.** The sprite's horizontal axis runs inner→outer, so
  the annulus must map U to radius and hold V constant; the original mapping put
  the strip around the circumference and the rings never appeared. Mipmapping a
  one-pixel-tall texture also erased them at distance, so mipmaps are off.
- **Camera never converged on a moving body.** `focusTarget.lerp(0.15)` lags by a
  fixed offset while the target keeps moving, so the body drifted out of frame.
  The target is now tracked exactly.
- Focusing a ringed planet frames its ring system, not just the body.

### Verified

- `npm test` (27/27), `npm run check` and `npm run build` clean.
- Close-range captures: Saturn renders its full ring system with the Cassini
  division; Earth renders surface, clouds and night lights across a natural
  terminator. No exceptions, no failed requests, **0 requests to nasa.gov**.

## 0.2.5 - 2026-10-15

Top navigation and the footer time readout, matched to the live page's boxes.

### Added

- **Top-right navigation** (`TopNav`), mirroring `.top-right-nav`: a search
  magnifier that filters the catalog (12 results, Enter selects the first), a
  Share button, and a Menu button opening an overlay panel.
- Search results show each body's colour swatch and its group.

### Changed

- **Footer rebuilt to the measured geometry.** Reading the live page's element
  boxes gives a 600px centred column: the date at the left, `REAL RATE` at 29px
  in the middle, and the clock time at the right, all on one line above the
  track; the 36px knob rides the slider; `⌄ TIME CONTROLS` sits beneath it; and
  the `LIVE` badge is a separate bottom-left chip.
- Date and time now read as NASA shows them: `Jan 12, 2026` and `05:38:24 AM`.
- Footer gradient scrim spans the viewport width regardless of column width.
- The build/version chip moved out of the header to a corner readout.

### Verified

- `npm test` (27/27), `npm run check` and `npm run build` clean.
- Headless render: top nav, `REAL RATE`, date/clock split, LIVE badge and speed
  row all present; no exceptions, no failed requests, **0 requests to
  nasa.gov**.

## 0.2.4 - 2026-10-15

Featured stories panel, NASA's real interface icons, layers and lighting.

### Added

- **Featured stories panel** (left), transcribed from `.featured-stories-panel`
  and `.story-container` (372px column, `rgba(37,37,39,0.6)` cards, 3px radius,
  20/25px padding, two-column text|icon grid, 29px/300 titles, 0.6em-tracked
  uppercase subtitles). Cards focus their target body and jump to the story's
  date; the header collapses.
- **NASA's own interface icons.** `tools/split-sprite.cjs` splits the site's
  IcoMoon sprite (58 KB, 87 icons) into individual SVGs served from `/icons`, so
  the chrome uses the real artwork rather than substitutes.
- **Settings rail** with layers, lighting (natural/flood/shadow), return-to-view
  and fullscreen, plus a layer panel styled after `.layer-panel`.
- **Layer visibility** wired into the scene: orbit paths, labels and the
  starfield can be toggled independently.
- **Live indicator** in the time bar: a green `LIVE` dot while running, orange
  `PAUSED` when stopped, matching NASA's `--live` / `--paused` states.
- `tools/mirror-controllers.cjs` seeds specific controllers and their windows
  when the app starts loading new bodies.

### Changed

- Starfield layers are tracked so they can be hidden and disposed.
- Card artwork mirrored from the site's `images/cards/` set (188 KB).

### Verified

- `npm test` (27/27), `npm run check` and `npm run build` clean.
- Headless render: 45 bodies, featured cards and settings rail present, LIVE
  readout, no exceptions, no failed requests, **0 requests to nasa.gov**.

## 0.2.3 - 2026-10-15

Make every body visible and selectable, and fix the parenting tree.

### Added

- **Click-to-focus.** Bodies are picked in screen space (matching NASA's label
  quadtree rather than a raycast), so distant moons stay selectable. Selecting
  opens the info panel, sets the breadcrumb, and flies the camera in.
- **Minimum on-screen size** (`MIN_VISIBLE_PIXEL_RADIUS`): a true-to-scale Earth
  is ~0.01px from across the system, so a body is drawn at least 4px wide.
  Only the drawn radius grows — positions stay exact, so orbits are unaffected.
  This is the same trade-off NASA makes with exaggerated `extentsRadius`.
- `describeParents` renders the parenting table for the UI, collapsing the
  "always" sentinel and describing multi-phase trajectories.
- Info panel now shows system radius and the model file.
- Mouse-event fallback for drivers that do not synthesise Pointer Events.

### Fixed

- **Parenting tree was never built.** `buildTree` walked its `ids` argument
  twice, but that argument is a one-shot iterator (`Map.keys()`), so the second
  pass saw nothing and no body was ever linked. All 42 bodies reported
  `parent: null`. Materialising the list fixes it; a test now passes a
  `Map.keys()` iterator to stop the regression recurring.
- **World positions compounded every frame.** `updatePositions` added the parent
  position into the same `Vector3` that was stored in `worldById`, so each frame
  summed on top of the previous frame's total. Now a fresh vector is allocated,
  keeping position exact.

### Verified

- `npm test` — 27/27 (adds the one-shot iterator case).
- `npm run check` and `npm run build` clean.
- Headless run: 42 bodies, hierarchy confirmed (`earth → sun`,
  `callisto → jupiter`, `umbriel → uranus`), every body ≥ 4px, click on Jupiter
  opens the panel titled "Jupiter", no exceptions, no failed requests, and
  **0 requests to nasa.gov**.

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
