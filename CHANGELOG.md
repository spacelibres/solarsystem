# Changelog

All notable changes to this project are recorded here. Every released version
has an entry; the version matches `VERSION` and its annotated tag.

## 0.2.43 - 2026-10-17

Restore whole-craft rotation for THEMIS and other source spin controllers that
omit an optional reference epoch. Preserve all129 declared spin configurations,
anchor epochless phase to runtime creation, and verify playback, pause and reverse.
Include whole-craft spins in the spacecraft animation inventory.

## 0.2.42 - 2026-10-17

Match recovered joint alignment arithmetic and operation order, verified by
executing original CPU controller methods over every catalog joint plan.
Restore all declared keyed model rotations and model visibility schedules,
including OSIRIS-REx sampling arm/gimbals and Stardust collection mechanisms.
Generate a complete spacecraft articulation inventory without executing callbacks.

## 0.2.41 - 2026-10-17

Load valid spacecraft ephemeris intervals around conflicting equal-time records,
and preserve Lucy's repeated index boundaries and original child numbering.
Retain glTF clips, apply source model joint alignment, and extract literal
post-creation spin controllers without executing recovered callbacks. Drive
articulation from signed simulation time with source real-time clamps, expose
joint diagnostics, and keep unavailable data explicit.

## 0.2.40 - 2026-10-17

Prevent the Sun glow from flashing as a bright yellow square on refresh.
Keep the additive sprite hidden until its alpha texture is ready; failed loads
leave it hidden. Add loading/ready lifecycle regressions.

## 0.2.39 - 2026-10-17

Correct dotted, polygonal and periodically jumping satellite trails.

- Replace overlapping segment caps with shared continuous ribbon joins, including
  closed planetary/Moon orbits; preserve nominal width with pixel coverage AA.
- Keep absolute-time history knots, evaluate exact moving endpoints and refine
  visible curves from real ephemeris to a quarter-pixel target instead of
  periodically replacing the entire historical path.
- Rebase positions in float64 before GPU upload; reuse bounded buffers and
  upload only their active range to stabilize spacecraft close-ups.
- Restore the application's white/.35 ordinary trail override, its close-camera
  fade, unbounded duration coverages and half-open interval boundaries.
- Restore the source default minor-moon layer visibility, with an explicit
  toggle and source-classified metadata while retaining every catalog target.
- Document source evidence, regression coverage and remaining limitations.

## 0.2.38 - 2026-10-17

Restore scale-dependent satellite systems and source-backed tapered trails.

- Activate current-parent moons and spacecraft as their system reaches Eyes' 20px
  projection threshold; preserve the camera and existing resources during zoom.
- Sample real contiguous dynamo history with source durations, adaptive 3-degree
  velocity refinement, bounded traversal, tapered width/alpha and hover styling.
- Keep closed osculating lines for planets/Moon; reuse subpixel-stable geometry,
  borrow readonly render frames and skip paused evaluation instead of cloning
  the full catalog each animation frame.
- Cache viewport dimensions to avoid label layout thrashing; allow wheel zoom
  over labels while preserving label clicks.
- Add FPS/CPU and geometry diagnostics, real Earth/Jupiter satellite checks,
  trajectory/shader regression tests and implementation documentation.

## 0.2.37 - 2026-10-17

Correct the explorer's orbital context, Eyes application colors and celestial sky.

- Keep Sun, planets, Moon and parent context visible across focus changes; anchor
  physical markers independently of bounded, collision-aware text labels.
- Reconstruct planetary/Moon orbits from current parent-relative position/velocity;
  use Eyes TrailManager RGB, opacity and 1.2px width with its near-body fade.
- Correct Pioneer-to-Three star quaternion ordering, load all seven stellar/galaxy
  catalogs, restore flux sizing, and add the 88-constellation layer with labels.
- Depth-test the sky behind physical bodies; show parent-relative J2000 ephemeris
  readouts and distinguish date coverage notices from retryable failures.
- Record live two-date hierarchy checks and source-backed display regressions.

## 0.2.36 - 2026-10-17

Expand the independent explorer from six targets to source-derived planetary
systems, satellite navigation and real NASA spacecraft models.

- Compile 844 original registrations with exact provenance and unsupported
  expression diagnostics; expose the heliocentric 842-object catalog, categories
  and search without executing recovered application code.
- Add overview/system/body views, collision-aware projected labels, true-data
  osculating orbits/trails, source solar texture/glow and three planetary rings.
- Load actual GLTF models with official Draco/KTX2/Meshopt support, revision-pinned
  decoder paths, source transforms and independent cancelable resource ownership.
- Resolve visible-system dependencies, repeated-parent candidate coverage and
  supported fixed/alignment/rotation/spin controllers; preserve unknown attitude.
- Handle real Venus duplicate samples and Mars overlapping historical spans using
  original source pair selection with selector-valid cache coverage, including
  reverse playback and backward-seek regressions.
- Keep unsupported mechanisms, special controllers, advanced rendering and full
  Eyes tool/story parity explicit in the documentation.

## 0.2.35 - 2026-10-16

Add the independent controllable Solar System foundation at `/explorer`.

- Own TypeScript clock, all five ephemeris evaluators, phase/parent frame graph,
  generation-safe runtime, abortable shared leases and bounded segment cache.
- Render six-face NASA planetary textures through official Three.js, with a
  camera-relative world, field-of-view framing, picking and explicit cleanup.
- Add six source-mapped targets, UTC/time controls, live/playback/pause, visible
  failures/retry, diagnostics and an opt-in typed debug interface.
- Accept only byte-identical terminal dyn padding found in the real Voyager 1
  controller; preserve rejection of conflicting/interior duplicates.
- Document source/config/API contracts and remaining parity work. Voyager is a
  position marker; models, advanced surfaces, full catalog and Eyes tools follow.
- Permit the local loopback dev hostname required by the installed Next version.

## 0.2.34 - 2026-10-16

Document the remaining source contracts and approved independent Next/Three rebuild.

- Map all 792 pending source/support entries across vendor, templates, data,
  styles and boot/runtime boundaries without treating inventory as behavioral proof.
- Record loader cache collisions, time-scale mismatches, decoder/worker failure
  behavior and the existing React viewer gaps as rebuild acceptance conditions.
- Correct the recovered deep-merge dependency's previously incorrect equality label.
- Define the approved independent /explorer architecture, typed domains, resource
  ownership, configuration and debug interfaces; retain Eyes as a reference.

## 0.2.33 - 2026-10-16

Deepen recovery against the bundled Three revision and explain the application
bridge with source correspondence and actual CPU integration checks.

- Extend core method/helper matching and record concrete remaining AST differences.
- Restore renderer helpers/variables and addon roles; independently verify
  renderer correspondence and all 142 embedded ShaderChunk strings against both
  official r185 package references without replacing the bundled implementation.
- Document all 34 rendering components, simulation/render separation, Y-forward
  camera projection, manual matrices, viewport/scissor and texture ownership.
- Release Points/Line geometry and forward component GL context through recursive
  and batch cleanup, including external buffers that were never rendered.
- Correct lexical proof declaration identity under same-name nested functions;
  add adversarial checks and actual Three geometry/matrix/resource regressions.

## 0.2.32 - 2026-10-16

Replace compressed local names in the application and engine with scoped,
evidence-based names, and separate actual source review from structural coverage.

- Correct the preload star layers: eight primary and 24 secondary shadows now
  reach their respective elements instead of overwriting the primary layer.
- Explain lifecycle, resource ownership, units, frame conventions and numerical
  boundaries in source; rename five story modules while retaining provenance.
- Present nine custom shaders as readable multiline GLSL with unchanged runtime
  shader bytes and material settings.
- Add lexical equivalence and runtime regression checks for application routes,
  managers, dynamics, terrain, math, resources, stories and shaders.
- Restore 1,793 Three core binding names using cross-matched official references;
  verify the complete candidate and all 444 public exports. Record 631 unmatched
  methods explicitly instead of claiming full vendor recovery.
- Remove bulk generated source annotations. Generate current signatures and
  source comments in the reference, pin reviewed files to source hashes, and
  identify unfinished vendor analysis explicitly. The preceding structural
  inventory is not evidence of full semantic recovery.

## 0.2.31 - 2026-10-16

Document and annotate the editable Eyes source without changing its executable AST.

- Inventory all 1,105 tracked Eyes files, 552 classes and 5,513 class callables,
  with imports, callers, state effects, provenance and scoped short-name evidence.
- Add Chinese application, engine and vendor reviews, including Dynamo sampling,
  component lifecycle, resource ownership, verified library versions and risks.
- Annotate JavaScript files, classes and methods; distinguish semantic inference
  from structural evidence and retain unresolved original identifiers explicitly.
- Add reproducible analysis generation and stale-index checks, with regressions
  for nested classes, scopes, accessors, update expressions and export aliases.

## 0.2.30 - 2026-10-16

Cache original decoding dependencies locally instead of fetching them from NASA
while rendering models and compressed textures.

- Pin 12 Draco/Basis JavaScript and WASM resources (3.18 MiB) by original URL,
  SHA-256 and size; validate WASM and reuse verified on-disk cache offline.
- Publish the cache under a versioned local decoder directory. Both normal
  loader defaults and bundled fallback URLs use local files; ZSTD remains inline.
- Download only missing/corrupt entries, write atomically, and reject mismatches.
  Preserve original NASA media URLs and avoid mirroring the asset library.
- Add cache reuse, integrity rejection, repair and directory-URL regressions.

## 0.2.29 - 2026-10-16

Replace the factory-wrapper reconstruction with an editable native source project.

- Check in the recovered application, framework, Pioneer engine, UI and vendor
  sources under eyes/. Account for 1,087 modules, including 733 native ESM
  modules and 55 separate HTML templates, plus JSON and ordinary CommonJS.
- Remove webpack's chunk runtime, numeric dependency API and factory registry.
  Use explicit relative source imports and live native exports/reexports.
- Recover names from original exports/classes, template ownership, named fields
  and destructuring. Expand application comma statements and boolean literals.
  Preserve unresolved names honestly and keep captured third-party versions.
- Build and watch editable source without regenerating it. Provide independent
  install/build/dev scripts and preserve original media URLs and vendor notices.
- Audit source syntax, import resolution, path case and recovery provenance;
  test circular imports, mutable exports, locale contexts and rename capture.
- Keep standalone package versions synchronized by the release-version script.

## 0.2.28 - 2026-10-16

Restore the original NASA Eyes Solar System application as a locally rebuilt
module project, replacing the custom viewer at the default entry.

- Recover all 1,087 module factories with scoped parameter names, export labels,
  source ranges, dependency audit and source hashes; retain original runtime
  semantics and emit readable ESM files plus a standalone build project.
- Rebuild original UI, styles, content database and rendering engine locally.
  Keep NASA imagery, models and ephemerides at their exact remote URLs.
- Correct relative application/CSS assets and autoplay configuration paths;
  remove the original page analytics script from the reconstructed shell.
- Add recovery transform tests and automatic dev/build preparation.

## 0.2.27 - 2026-10-16

Restore the viewer on checkouts without a local NASA asset library.

### Fixed

- Resolve ephemerides, maps, sprites and sky data against NASA's verified public
  runtime origin instead of the absent local `/nasa` mirror. No asset library
  download is required for normal startup.
- Require all eight planetary ephemerides before reporting the scene as ready.
  Failed startup now shows an actionable error and a retry control that clears
  failed loader cache entries. Bound individual ephemeris fetches to 20 seconds.
- Do not render an image for NASA's `no-icon` sentinel, which previously produced
  a broken image next to the Sun label.
- Launch npm's JavaScript entry directly when versioning on Windows; make the
  build-guard test compare native paths instead of assuming forward slashes.

### Verification

- Regression coverage for direct asset URLs, required planetary data, no-icon
  labels, native build paths and synchronized release metadata.
- The in-app browser loaded 48 orbital controllers from the public origin,
  displayed orbit paths and constellations, and rendered Earth's texture after
  search selection. Pause and story-panel collapse were exercised visibly.
- `npm ci`, all 225 tests, typecheck, lint and production build passed. Independent
  code review reported no actionable findings.

## 0.2.26 - 2026-10-16

Make the de-obfuscated NASA source complete and trustworthy, and correct a
wrong conclusion about the starfield.

### Fixed

- **Two silent bugs in the class splitter, one of which lost whole classes.**
  Both produced output that looked correct, so parsing was not evidence of
  completeness:
  - *Brace matching inside template literals.* A class's end was found by
    counting braces in the raw text, but the bundle contains literals such as
    `` `Error loading ${name} (${url}): ${err.message}\n` `` whose body holds a
    literal `}`. `ResourceManager` was written at 2,490 bytes instead of 4,933 —
    cut in half, and the only file that would not parse. Spans now come from
    acorn.
  - *Colliding class names.* NASA defines a base class and a subclass sharing a
    name, and writing both to `<Name>.js` meant the second silently overwrote the
    first. **Nine classes were lost outright**, including `Settings` (13,760
    bytes), `Search` (11,800), `LabelManager` (7,421) and `TimeManager` (5,528).
    Collisions are now suffixed by size.
  - Result: **251 → 260 classes, all parseable**, verified by a new
    `tools/audit-deobf.cjs` that compares spans against the AST rather than
    trusting that a file parses.
- **The starfield no longer loses the sky at close range.** Our notes claimed
  NASA's `gl_Position.w = viewPosition.y` "clips half the sky", so we dropped it
  and scaled a real sphere on the CPU instead. That sphere is centred on the
  camera, so its rear half always sits behind the near plane and a hard-edged
  dark disc appeared whenever the focused body gave a narrow far plane. Reading
  the extracted shader shows the line is present and works: dividing by the
  view-space vertical component makes the projection depend on direction alone,
  so no clip plane can reach it. The line is restored, verified against the live
  reference, and pinned by a test that fails if it is removed again.

### Added

- `tools/ref-dump.cjs`, `tools/ref-health.cjs`, `tools/compare-layers.cjs` and
  `tools/audit-deobf.cjs`, plus `docs/deobfuscation.md` recording the extraction
  state: 260/260 classes, 63.9% of the bundle as class code, and the three gaps
  (no module wiring, six unresolved symbols, mangled locals) that still stand
  between it and a buildable project.
- `docs/ground-truth.md` now records that NASA populates `extentsRadius` on all
  45 entities — equal to `radius` for solid bodies — where our catalog holds
  `null` on 28 of them, since that value feeds the camera's near/far maths.

### Verified

`npm ci && npm test && npm run check && npm run build` all pass — 216 tests
across seventeen files. All 18 layers match the live reference exactly on ids,
categories, groups and visibility defaults. The class split is deterministic
across runs, and the audit fails if a class is truncated or dropped.

## 0.2.25 - 2026-10-16

Bind the logo, icons and colours to the spacelibre VI standard, and make the
constraints enforceable.

### Added

- **`docs/visual-identity.md`** — the binding rules for every logo, icon and
  colour decision, written as constraints rather than suggestions: the approved
  master set, canvas sizes and minimum display widths, the 0.25-canvas-height
  clear space rule, monochrome precedence, the full-colour planet/orbit role
  bindings, the 16 palette roles, and the rule that a theme change must reach the
  logo and favicon and not just an accent.
- **The complete approved master set** in `public/brand/` — `horizontal`,
  `stacked` and `icon` each in four inks (`primary`, `navy`, `white`, `black`),
  twelve masters in total. Previously only two ad-hoc files existed
  (`horizontal-white.svg`, `icon-white.svg`), so the stacked and full-colour
  variants simply were not available; the two present are byte-identical to the
  approved originals and have been renamed canonically.
- **`tests/vi-constraints.test.ts`** (33 tests) and `tests/logo-roles.test.ts`
  (12 tests). They fail if a master is missing, renamed, reshaped, given a second
  ink, or if the favicon drifts from the icon master. Verified by deliberately
  breaking each case and watching the suite catch it.
- `src/lib/theme/logo.ts`, `logo-roles.ts` and `usePalette.ts`, plus
  `tools/logo-shot.cjs` for checking the mark at its real display sizes.

### Fixed

- **The favicon was missing entirely.** No icon was declared in the metadata and
  `/favicon.ico` returned 404, so the browser fell back to its own default. The
  icon now comes from the approved `icon` master (copied verbatim, so it cannot
  drift), and `useFavicon` re-inks it when the palette changes the surface.
- **The full-colour mark rendered its navy fallback and disappeared.** The
  masters carry `data-stroke-role="planet"` instead of a final colour, which is
  deliberate — one file serves every palette. Served as a plain `<img>` the role
  is never resolved, so the planet stayed `#002044` and vanished against dark
  chrome. Roles are now resolved against the palette before display, and
  `planet` resolves contextually to `planetOnDark` on a dark surface rather than
  the literal. The monochrome masters are left untouched, and the mask's
  structural black/white is never themed. Measured: only the planet changes —
  the wordmark's five navy paths keep their colour.
- `themeColor` was a hardcoded `#000000`; it now follows the palette's `deep`
  role, so the browser chrome agrees with the theme.

### Verified

`npm ci && npm test && npm run check && npm run build` all pass — 215 tests
across seventeen files, from 170 across fifteen. The mark was checked at 240 px,
120 px, 64 px, 32 px, 24 px and 16 px on both light and dark surfaces: the orbit
tips survive down to 16 px, and the monochrome mark — the correct choice for the
viewer's dark chrome — stays legible throughout.

## 0.2.24 - 2026-10-16

Stop exposing the webhook's port to the internet.

### Changed

- **The webhook now binds `127.0.0.1` instead of `0.0.0.0`.** Port 9100 was
  listening on every interface and answered a request from outside the host, so
  the deploy endpoint was reachable at `http://176.122.171.38:9100/hooks/deploy`
  over plain HTTP — no TLS, and the updater runs with `sudo`. It is now
  loopback-only, and Caddy proxies `https://solarsystem.spacelibre.cn/hooks/deploy`
  to it, so the endpoint is HTTPS and the port is closed to the network. The
  listener also warns at startup if it is pointed at a non-loopback address.
- The Caddy site block routes `/hooks/deploy` to the listener ahead of the
  catch-all app proxy; `deploy/deploy.sh` writes it and `deploy/solarsystem.caddy`
  records the live file.
- `tools/probe-webhook.cjs` sends a signed delivery through a URL so the hook can
  be tested without involving GitHub.

### Fixed

- Documentation and the deploy script's closing instructions pointed at the old
  `http://<ip>:9100` endpoint; they now name the HTTPS URL, and note that
  `ss -lntp | grep 9100` must show `127.0.0.1:9100` rather than `0.0.0.0:9100`.

### Verified

`npm ci && npm test && npm run check && npm run build` all pass — 170 tests
across fifteen files. On the host: `ss -lntp` shows `127.0.0.1:9100`; a connection
to `176.122.171.38:9100` from outside now fails; a signed delivery to
`https://solarsystem.spacelibre.cn/hooks/deploy` is accepted (`204`), an unsigned
one is rejected (`401`), and GitHub's own ping returns `200 OK`.

## 0.2.23 - 2026-10-16

Document the dynamo index count rule, with the measurements behind it.

### Changed

- `docs/ground-truth.md` now records that a controller index's `count` field is
  two more than the highest window index (valid windows are `0 … count-2`), with
  a table of the two controllers measured against NASA — `moon/earth/orb` and
  `amalthea/jupiter/orb` — and the note that a directory URL is a 403 rather
  than a listing. The off-by-one fixed in 0.2.22 was found by measurement, and
  the evidence belongs next to the rule so it is not re-derived or re-broken.

### Verified

`npm ci && npm test && npm run check && npm run build` all pass — 170 tests
across fifteen files.

## 0.2.22 - 2026-10-16

An off-by-one in the segment expander was asking NASA for files that do not
exist.

### Fixed

- **`expand-segments.cjs` generated one phantom URL per controller.** The dynamo
  index header's count is two more than the highest segment index, so the valid
  windows are `0 … count-2`; the tool emitted `0 … count-1`. NASA answers the
  extra index with **403**, so a full mirror reported 676 failures — 674 of them
  these phantoms — none of which could ever succeed. Measured, not assumed:
  `moon/earth/orb` has count 386 and files `000–384`, while `385.dyn` is 403;
  `amalthea/jupiter/orb` has count 220 and files `000–218`, while `219.dyn` is
  403. The manifest's 674 phantom entries were removed.
- **The expander no longer reads every file in the mirror.** It treated any
  `.dyn` as a possible index, so on a complete mirror it read 105k files at once
  and exhausted the heap. Only `def.dyn` is an index; skipping the numbered
  siblings makes it finish in seconds.
- **Directory URLs no longer count as failures.** The manifest builder dropped
  `*/maps/` but not `static/wasm/draco/` or `static/wasm/ktx2/`; NASA 403s a
  directory listing, so those two were permanent entries in every failure list.
- Shared the index parsing and URL generation in `tools/lib/segments.cjs` so the
  count rule is stated once, with its evidence, and is covered by tests.

### Verified

`npm ci && npm test && npm run check && npm run build` all pass — 170 tests
across fifteen files. On the host, a full download run went from **676 failures
to 2**, then to **0** after the directory URLs were filtered and the manifest
cleaned; `new dynamic URLs: 0` confirms the fixed expander introduces no phantom
entries.

## 0.2.21 - 2026-10-16

Make the auto-deploy resilient to its own interruption.

### Fixed

- **An interrupted deploy can no longer destroy the asset mirror.** If a run
  died between parking the mirror and restoring it, the next run deleted the
  parked copy (`rm -rf` on the park path) before moving anything there —
  throwing away 105k files that took hours to download. The updater now detects
  a parked mirror left by an earlier run, restores it first, then parks it
  again; and it refuses to overwrite a non-empty park path rather than deleting
  it. Verified by simulating a crashed run: the mirror was recovered intact.
- The exit trap now preserves the script's exit status instead of masking a
  failure with its own return code.

### Verified

`npm ci && npm test && npm run check && npm run build` all pass — 163 tests
across fourteen files. On the host: an interrupted-run simulation recovered the
mirror (105,120 files) and completed the deploy, and 25 deliberately aborted
asset requests produced **zero** uncaught exceptions, where the same check
previously logged `Controller is already closed` six times.

## 0.2.20 - 2026-10-16

Auto-deploy confirmed working end to end, and a production crash in the asset
route fixed.

### Fixed

- **The mirror route no longer crashes the server on an aborted request.** A
  browser that navigates away or seeks while a texture is still streaming made
  the Node read stream error, and because nothing consumed that error on the
  web stream it surfaced as an `uncaughtException` — visible in the logs as
  `TypeError: Invalid state: Controller is already closed`, six times per
  handful of aborted requests. The route now attaches an error handler to the
  stream it hands to `Readable.toWeb`, so an aborted transfer is a non-event.

### Notes

- The deployment ran itself for the first time on this release: pushing `main`
  triggered the webhook, which parked the asset mirror, built, restarted the
  service and restored the mirror without intervention. The matching tag push
  was ignored, so only one build ran.

### Verified

`npm ci && npm test && npm run check && npm run build` all pass — 163 tests
across fourteen files. On the live host: the auto-deploy advanced 0.2.18 →
0.2.19 → 0.2.20, `https://solarsystem.spacelibre.cn` serves the new version,
and NASA assets (Earth's surface map, the Moon's and a spacecraft's `.dyn`
controllers) all return 200 through the mirror.

## 0.2.19 - 2026-10-16

Auto-deploy actually works. Pushing to `main` now builds and ships on the host
instead of being killed partway through.

### Fixed

- **The build was being OOM-killed on the deployment host.** The 1.6 GB NASA
  asset mirror sat at `data/mirror` inside the checkout, and Turbopack resolves
  the mirror path at build time and globs whatever it points at — so the build
  walked 214,419 files, grew past the host's 2 GB and was killed mid-build with
  nothing but `Killed` to show for it. The mirror now lives outside the tree at
  `/srv/solarsystem-mirror` and the app reads it via `MIRROR_ROOT`; the build
drops from over 1.5 GB of memory to a few hundred, and completes in seconds.
- **The webhook is no longer a 403-shaped hole in the deploy story**, and a
  single push can no longer start two builds. `git push --follow-tags` fires the
  hook once for the branch and once for the tag; both used to deploy, racing on
  `git fetch` and running two `next build` processes at once. Tag pushes and
  pushes to non-deploy branches now return `204` and are ignored, and `update.sh`
  takes a `flock` as a second line of defence.
- **Updater output goes to `/var/log/solarsystem-update.log` as documented.**
  The header always claimed that path, but the webhook spawns the updater with
  its stdio inherited, so output only ever reached the journal.

### Added

- `npm run build` refuses to start while a populated `data/mirror` exists, and
  names the fix instead of failing later with a bare `Killed`.
  `scripts/check-build-prereqs.mjs` runs as npm's `prebuild` hook.
- `npm run mirror:park` and `npm run mirror:restore` move the mirror out of the
  project and back, for local builds.
- `deploy/update.sh` parks the mirror around the build automatically, and
  restores it before restarting the service.
- `tests/mirror.test.ts` and `tests/build-guard.test.ts` cover the mirror root
  resolution and the build gate.

### Verified

`npm ci && npm test && npm run check && npm run build` all pass — 160 tests
across thirteen files, from 147 across eleven. On the live host, the update ran
end to end from a clean checkout at 0.2.17: build succeeded, the service
restarted, `https://solarsystem.spacelibre.cn` serves **0.2.19**, and the mirror
was restored intact at 93,218 files with real assets returning 200.

## 0.2.18 - 2026-10-16

The viewer is live, and pushes to `main` deploy themselves.

### Added

- **Live deployment at <https://solarsystem.spacelibre.cn>.**
  - host 176.122.171.38, Ubuntu 26.04, 3 vCPU, 2 GB RAM plus a 1 GB swapfile;
  - the app binds `127.0.0.1:4310` and is reached only through Caddy;
  - a Let's Encrypt certificate was issued automatically, and HTTP redirects to
    HTTPS with a 308.
- **A GitHub webhook** at `http://176.122.171.38:9100/hooks/deploy`, wired via the
  API with `push` events and a shared secret. Verified end to end: GitHub's test
  delivery returns **200 OK** and the listener logs `ping received`.
- `docs/deploy.md` now records the live details, so the runbook and reality match.

### Notes

- The host already served another Next.js app on port 3000 for
  `tile2.spacexway.com`. That site was left untouched: this one uses a different
  port, and the shared Caddy configuration was **added to** — a new file under
  `/etc/caddy/sites/` plus one `import` line, with the existing `Caddyfile`
  backed up first and `caddy validate` run before any reload.
- NASA's asset mirror is 1.6 GB and git-ignored, so the host fetched it once
  (1,916 base assets plus 105,939 ephemeris segments). Re-deploys skip it.

### Verified

`npm ci && npm test && npm run check && npm run build` all pass — 147 tests across
eleven files. On the live host: `solarsystem`, `solarsystem-webhook` and `caddy`
are all active and enabled; the site returns 200 over HTTPS; `/nasa/` serves
NASA's textures and ephemerides through the proxy; and the security headers and
immutable cache policy are applied.

## 0.2.17 - 2026-10-16

One-command deployment and automatic redeploys from GitHub.

### Added

- **`deploy/deploy.sh`** — a single idempotent installer for a Debian/Ubuntu VPS
  running Caddy. It installs Node if needed, creates a no-login service user,
  clones or fast-forwards the repository, builds, mirrors NASA's assets when they
  are absent, and installs three systemd units plus a Caddy site block. Re-running
  it updates and reloads.
- **`deploy/update.sh`** — fetch, then `npm ci`, `npm test`, `npm run check` and
  `npm run build`, restarting only if every gate passes. A failing push therefore
  cannot take the site down; the previous build keeps serving and the failure lands
  in `/var/log/solarsystem-update.log`.
- **`deploy/webhook.cjs`** — a dependency-free GitHub webhook listener that
  verifies GitHub's HMAC-SHA256 signature in constant time and triggers the
  updater. Written in plain Node with no imports from the app, because it is what
  repairs the app and must survive the app being broken. Replies `pong` to GitHub's
  `ping` so the hook can be verified immediately.
- **`deploy/vps.py`** — a small Paramiko helper for driving the host without
  `sshpass`, reading credentials from the environment so they never reach a shell
  history or a committed file.
- **`docs/deploy.md`** — the runbook, including why the app binds `127.0.0.1`,
  why Caddy is added to rather than rewritten, and how the update gates work.

### Notes

- The host already runs another Next.js app on port 3000, so this one defaults to
  **4310** and is reachable only through Caddy.
- Caddy configuration is **added to, never replaced**: a new file under
  `/etc/caddy/sites/` plus a single `import sites/*.caddy` line, with the existing
  `Caddyfile` backed up and `caddy validate` run before any reload.

## 0.2.16 - 2026-10-16

The camera and sky now follow NASA's real scale relationships.

### Fixed

- **The field of view was wrong, and it is the largest scale error we had.** NASA
  ships `CameraComponent._fieldOfView = 1.0471975512` rad — **60°, applied
  horizontally** — and derives the vertical angle from the aspect ratio. At the
  reference's 1.7525 aspect that is 36.5°, not 60°. We used a flat **42° vertical**,
  which narrows the view and throws off every framing decision: how much of a
  system fits on screen, when a subsystem crosses its 20-pixel threshold, and how
  large a body appears at a given distance. three.js takes a vertical angle, so
  `verticalFovForHorizontal` now converts, and is recomputed on resize. A test
  reproduces the reference's exact value, 0.636503881827892 rad.
- **The near and mid planes were invented.** We used `0.05×` and `100×` the orbit
  radius. NASA's are
  `max(1e-5, 0.1 × (|cameraPos| − parentExtentsRadius))` and
  `min(1e4 × near, |cameraPos| + 10 × parentExtentsRadius)` — so our near plane sat
  about twenty times too far out, wrecking depth precision on close approach.
- **The sky did not stay in sync with the solar system.** The starfield and
  constellations were unit spheres baked to a fixed 1e12 km radius, so once the
  camera passed that distance the stars slid inward and vanished, and the two
  scaled independently. Both are now scaled every frame to a fixed fraction of the
  orbit radius (0.5) and follow the camera, which keeps the sky at a constant
  apparent depth at every zoom. Brightness is unaffected because the true parallax
  distance rides in its own attribute rather than being read back from the
  transformed position.

### Added

- `NASA_HORIZONTAL_FOV_RADIANS`, `verticalFovForHorizontal` and
  `STAR_SHELL_CAMERA_FRACTION`, with tests covering the conversion at square,
  wide, tall and degenerate aspect ratios.
- `docs/ground-truth.md` now records NASA's full camera model in one place: the
  FOV, the auto near/mid rules, `CameraScripts._customSystemDistances` (the
  per-body framing **floors**: mercury 425648, venus 862136, earth 1040264,
  mars 8e4, jupiter 7157638, saturn 4869142, uranus 1886367, neptune 2407045,
  plus the dwarf planets), the system presets (`inner_solar_system` is
  `distance 7e8, angle 25, planeId earth`), and the exponential zoom behaviour.

### Verified

`npm ci && npm test && npm run check && npm run build` all pass — 147 tests across
eleven files. The inner-solar-system view was compared side by side against the
reference at the same preset: orbit colours, star density and scale, trail
colours, body sizes and labels now align.

## 0.2.15 - 2026-10-16

Comet tails: NASA's three-component construction, from the de-obfuscated source.

### Added

- **`src/lib/scene/comet-tail.ts`**, transcribing `CometTailComponent` and the
  three components `Entity.register` adds whenever an entity carries a `comet`
  flag:
  - **dust** — white `(1,1,1,1)`, `starAccelerationMultiplier` 1, 200 particles,
    600,000 s;
  - **ion** — blue-grey `(.214,.235,.371,.5)`, acceleration ×10, length exactly
    half the dust tail's;
  - **coma** — a single particle at `(1,1,1,10)`, acceleration 0, alpha 10 on
    purpose.
- **The real tail shader**, including the inverse-square push away from the star
  (`acceleration = starAccel · mult · normalize(originPosition) · 5e7 ·
  2.51188643151^(20 − absMag) / dot(originPosition, originPosition)`), the
  `deltaTime^1.5` integration that makes a tail lengthen as the comet approaches,
  the view-space quad stretch, the `sqrt(1 − sqrt(deltaTime / timeLength))` fade,
  and the 40,000 km near-field cull with its 400,000 km fade-in.
- Comets joined the boot set (`c_2025_n1`, `1p_halley`,
  `67p_churyumov_gerasimenko`), matching NASA's own boot scene which contains
  3I/ATLAS. Without one loaded the tail system has nothing to draw.

### Fixed

- **A temporal-dead-zone crash.** Seeding a comet's particles reads the
  simulation clock, which was declared *after* the body-registration loop. Reading
  it there threw and aborted scene construction — the canvas appeared but
  `__solarDebug` never registered, so the whole scene was dead. `simTime` is now
  declared before the loop.
- **`originPosition` was left at zero**, making the shader's
  `normalize(originPosition)` a 0/0 and the tail invisible. It is now stamped with
  the comet's heliocentric position both at seed time and every frame.

### Known limitation

- The tail **geometry, uniforms and program are verified correct** — nine tails
  exist across three comets with the right instance counts, the shader links with
  all four attributes active, and the computed model position is ~1.9e6 km — but
  the tails still do not render. NASA's `gl_Position.w = viewPosition.y` assigns a
  signed component to `w`, which clips half the quad; the same line had to be
  dropped for the starfield. Replacing it with a normal perspective projection is
  the next step, and is recorded in `docs/ground-truth.md`.

### Verified

`npm ci && npm test && npm run check && npm run build` all pass — 141 tests across
eleven files. The three-component construction, seeding, material uniforms and
cull distances are covered by tests.

## 0.2.14 - 2026-10-16

NASA's de-obfuscated scene rules applied, and the constellation layer built.

### Added

- **The constellation layer**, decoding all **88** IAU constellations from
  `stars/constellations.bin` (`src/lib/scene/constellations.ts`). Drawn as
  `LineSegments` on the same sky shell the starfield uses, so the two register
  with each other, at NASA's `(.35, .7, 1, .5)`. Off by default, matching
  `addLayer`. The decoder consumes all 10,952 bytes exactly, which is the check
  that the record layout is right.
- **`subsystemVisibleWithinParent`**, NASA's real child-visibility test, from
  `SceneManager._isEntityVisibleWithinParent`:
  `(systemRadius ‖ 25·radius ‖ 25·extentsRadius) / parentExtentsRadius ×
  parentPixelExtents >= 20`. The **25× radius** fallback is the subtle part — it is
  what lets a moon system appear while its planet subtends only a few pixels.
- **`CONSTELLATION` tokens** — line colour, label colour, highlight width and the
  `constellation_label_` id prefix, from `SceneManager.toggleConstellations`.
- **`tools/audit-scene-rules.cjs`**, which extracts these rules from the bundle so
  they can be re-checked after a NASA update.

### Fixed

- **The scene ambient light was 32× too bright.** NASA sets
  `Color(.005, .005, .005)` — essentially black — and relies almost entirely on the
  Sun's light source. At our `0.16` the night sides were lit enough that the
  terminator was invisible and every body looked flat. Phases now read sharply.
- **Per-component visibility.** NASA dispatches by component, not entity: the
  `trails` layer gates `TrailComponent`, `labels` gates `DivComponent`. The **Sun
  is exempt** entirely (`"sun" !== s.getName()`), so its starfields and glow no
  longer respond to a layer toggle.

### Verified

`npm ci && npm test && npm run check && npm run build` all pass — 129 tests across
ten files. The constellation layer was confirmed by screenshot, and Mars' phase
was compared to confirm the ambient-light correction.

## 0.2.13 - 2026-10-16

All nine binary assets decoded to readable text.

### Added

- **`tools/decode-bins.cjs`**, which decodes every `.bin` in the mirror into a
  readable text file under `deobf/bin/`:
  - the six `stars.<n>.bin` layers and `galaxies.0.bin` become a 43,878-row table
    of magnitude, absolute magnitude, hex colour and J2000 position;
  - `constellations.bin` becomes all 88 IAU constellations with their star
    positions and line segments;
  - `voyager_heliosphere.bin` becomes a buffer-view summary with statistics.

### Notes

- These files are **data, not compiled code**. None carries a container or code
  signature — no zip/gzip, no JVM `CAFEBABE`, Mach-O, ELF or WASM magic — so the
  work is decoding rather than decompilation, and no decompiler applies. The
  formats were already documented by the readers in `src/lib/scene/starfield.ts`
  and the scene; this tool applies them and writes the result out.
- `morluto/rea` targets native binaries, JVM bytecode, .NET assemblies, Android
  APKs and Electron apps. None of those is present here, so it has nothing to act
  on. The obfuscated JavaScript was handled separately by `tools/deobfuscate.cjs`,
  which is a beautify-and-rename problem solved with an AST walk.
- The constellation decoder consumes all 10,952 bytes exactly and yields the 88
  expected names, which is the check that the record layout is correct.

### Verified

`npm ci && npm test && npm run check && npm run build` all pass — 116 tests across
nine files. Every decoded file was spot-checked, and the star byte counts match
`4 + count × 23` exactly for all seven layers.

## 0.2.12 - 2026-10-16

Trails, and a starfield that finally renders.

### Added

- **The trail system.** Almost everything in NASA Eyes — 833 entities — carries a
  trail rather than an orbit line: the path swept *backwards in time*, which is
  what gives a spacecraft its sense of motion. Only the eight planets and the Moon
  get orbit lines, matching `TrailManager._orbitLineEntityNames`. Implemented in
  `src/lib/scene/trails.ts` and `src/lib/scene/trail-geometry.ts`, as a
  screen-space-width ribbon sampled from each body's own ephemeris.
- **NASA's separate trail colour table.** Trail colours are *not* the orbit-line
  colours, and several bodies differ sharply: Mercury's trail is grey while its
  orbit line is purple; Uranus' trail is pale cyan while its orbit line is violet.
  A test asserts the two tables stay distinct. The Galilean moons and Triton
  inherit their planet's tint.
- **Trail lengths from the entity table**, including Voyager 1's 946,080,000 s
  (30 years); bodies without a declared length fall back to one orbital period,
  clamped.
- **A `Trails` switch** in the layer panel.
- `tools/study-trails.cjs` to extract every `trail` block, `tools/probe-ours.cjs`
  to interrogate our own running app the way `probe-app.cjs` does the reference,
  and `tools/view-shot.cjs` to screenshot a named view.

### Fixed

- **The starfield never rendered.** Two independent faults, both diagnosed by
  reading live WebGL state rather than by guessing:
  - The ported star shader used GLSL3 syntax (`in`/`out`) while `ShaderMaterial`
    defaults to GLSL1. The program still **linked cleanly** and the draw call was
    issued, so nothing reported an error — but no pixels appeared.
  - Star positions are real parallax coordinates, 4.16e13 to 3.09e20 km. Uploaded
    raw as float32, `normalize()` loses the direction to rounding and the field
    projects to NaN. This is the same precision wall the 1.2e18 km Milky Way quad
    hit. Positions are now normalised on the CPU in float64 onto a fixed shell,
    with the true distance carried in a separate attribute so the flux term keeps
    near stars brighter than far ones.
- **Star brightness and size now follow NASA's flux model** — `luminosity =
  3.0128e28 · 10^(absMag/-2.5)`, `brightness = 2·log(1 + flux·1e4)`, point size
  clamped to 5–50 px — with the absolute magnitude uploaded in the colour
  attribute's alpha channel. Without it every star rendered flat and the sky
  looked sparse.
- **NaN-poisoned trail geometry.** Sampling an ephemeris outside its window can
  extrapolate to NaN, and a single NaN vertex spoils the bounding sphere. Trails
  now drop non-finite samples.
- Removed a `computeBoundingSphere` NaN warning from the starfield by giving the
  sky-pinned cloud an explicit empty sphere, and stopped pinning the star object
  to the camera position, which cancelled the direction the shader needs.

### Verified

`npm ci && npm test && npm run check && npm run build` all pass — 116 tests across
nine files. The starfield and trails were confirmed by screenshot at the outer
solar-system view and compared against the reference clone at the same view.

## 0.2.11 - 2026-10-16

A running offline clone of NASA Eyes, and the fixes it revealed.

### Added

- **The app runs offline as a reference oracle.** `tools/capture-site.cjs`
  records every response body through the DevTools Protocol, so the whole
  deployed viewer — `index.html`, `app.js`, `vendors.js`, `preload.js`,
  `commons.js`, `config.js`, the three stylesheets and the fonts — is mirrored
  under `data/mirror/site/`. Pointing `config.js` at the mirror and serving it on
  port 8099 gives a fully working copy with **zero application errors**, which we
  can now interrogate instead of guessing. See `docs/offline-mirror.md`.
- **`tools/probe-app.cjs`**, which reads live state from that clone: scene
  entities and their components, the live `LayerManager`, label DOM and computed
  styles, and arbitrary expressions.
- **`tools/capture-ref.cjs`**, to screenshot the reference for side-by-side
  comparison.
- **NASA's atmosphere shader, ported exactly** (`src/lib/scene/atmosphere.ts`).
  The fragment program is a transcription of `AtmosphereComponent`'s GLSL: the
  five-sample ray/sphere integration, exponential density falloff, day/night
  `easeInOut` shaping, both sun-glare terms, the sunset blend and
  `adjustOverbrightness`. The shell is drawn at `radius + scaleHeight * 20` on
  NASA's 64 × 129 lat/lon grid with `gl_Position.w` pinned, and the eight bodies'
  parameters are the ones measured from the running clone.
- **`docs/ground-truth.md`**, recording what the clone reports: the boot scene is
  45 entities (not 844 — bodies are added contextually), the exact component
  table per entity, and every atmosphere parameter.
- `tools/study-atmosphere-shader.cjs` and `tools/study-postcreate.cjs` to pull
  shaders and `postCreateFunction` blocks out of the bundle verbatim.

### Fixed

- **The seventh starfield layer was missing.** `sun` carries seven
  `StarfieldComponent`s — `galaxies.0.bin` plus `stars.0–5` — and we loaded only
  the six stellar layers, leaving the sky without its galaxies. Both are now
  loaded with NASA's render orders (galaxies at −4, stars at −2).
- **Earth's clouds had disappeared.** The cloud shell was dropped whenever a body
  also had an atmosphere, which is every planet with clouds; the two are
  independent in NASA and now here. The shell also now takes the cloud map as its
  alpha channel at full opacity, so the clouds read as white rather than grey.
- **The Sun's glow was wrong, and stranded at the origin.** NASA uses *normal*
  blending (not additive), pixel units and `renderOrder −2`, and the sprite must
  follow the Sun; ours was added to the scene once and never repositioned.
- **Mercury had an atmosphere it should not have.** NASA gives an atmosphere to
  exactly eight bodies: Sun, Venus, Earth, Mars, Jupiter, Saturn, Uranus,
  Neptune.
- **Planetary surfaces were soft.** The preferred texture size was 1024; NASA
  ships `[16, 512, 4096]` and the reference is visibly sharper at 4096.
- **A vertex-indexing bug in the atmosphere sphere** left the last ~4,000 of
  8,256 vertices at the origin, because the row stride used the row count instead
  of the column count. Caught by the new geometry test.
- `tools/verify-offline.cjs` now reuses a server that is already listening on the
  port, instead of failing when one is kept running for inspection.

### Verified

`npm ci && npm test && npm run check && npm run build` all pass — 96 tests across
seven files. The reference clone boots with no application exceptions and no
requests leaving the machine beyond two inert analytics hosts. Earth's render was
compared directly against the reference at the same view.

## 0.2.10 - 2026-10-16

The solar system's position in the Milky Way, and a way to read NASA's own code.

### Added

- **A unified astronomy framework** (`src/lib/nasa/astronomy.ts`), the single
  place where "where are we" is defined. It holds the IAU 1958 galactic reference
  directions (pole lon 192.85948120833°, lat 27.12825119444°; centre lon
  266.40499625°, lat -28.93617241667°), the Jupiter-centric constants NASA ships,
  the unit definitions, and `equatorialToGalactic` built from those two vectors. A
  test asserts the derived frame agrees with the sprite orientation NASA builds.
- **The Sun's marked position in the galaxy.** The solar system is 7.98 kpc
  (26,027 ly) from the galactic centre at l = 0°, b = 0°, which lands on
  **column 302, row 512** of NASA's 1024×1024 `milky_way.png` — 210 px left of
  centre. The galactic view now carries NASA's own `SUN` label (18px, weight 600,
  5.4px tracking, white at 0.75, left-anchored) at that position, replacing the
  Sun's ordinary body label, which is meaningless at galactic scale. Verified by
  screenshot: the marker is stable across camera poses and sits left of the
  galactic centre, as the international charts show.
- **NASA's galaxy spin** (`galaxySpinAngle`), from the `milky_way` entity's
  `SpinController`: axis `(-0.8676661356982597, -0.19807638974470915,
  0.45598379452940485)` — the north-galactic-pole row of the IAU matrix — at
  rate `-2192686e-23`.
- **NASA's authoritative layer taxonomy**, transcribed from all 18 `addLayer`
  calls in `LayerManager`: names, groups, sublayers and default visibility. This
  replaces an earlier approximation that was missing `trails`, `icons`, `ui` and
  `satelliteGroup`, and had the Spacecraft sublayer structure wrong.
- **`layerForEntity`**, reproducing `LayerManager.getEntityLayer`: subcategory is
  resolved **before** category, so Juno (Spacecraft/Orbiter) belongs to the
  orbiters layer and a Major Moon to majorMoons.
- **NASA's label icon and collision-weight tables**, from `LabelManager._iconMap`
  and `_weightMap`. Label overlap is now resolved by NASA's real priority
  (Star/Galaxy 100, Planet 50, Spacecraft 30, Moon 25, Asteroid/Comet 15,
  Constellations 10, Landing site 5, Barycenter 0) instead of by body radius,
  which was not the rule.
- **`getDistanceParams`**, a field-for-field reproduction of NASA's
  `DistanceManager._getDistanceParams` including its imperial branch, its `"~ "`
  prefix below one kilometre, and its `dps` derived from `toPrecision(4)`.
- **The content database.** NASA keeps two tables, not one: the entity table
  (`Entity.register`, physical data) and the content database
  (`PreloadManager._entityInfo`, own `category`/`subcategory`/`displayName`/
  `iauName`/`keywords`). Only the second carries categories. Extracted, merged
  into the catalog, and now typed on `CatalogEntity`.
- **Study tooling** so this work is repeatable: `tools/study-bundle.cjs` (index
  and read any of the 261 classes), `tools/study-layers.cjs`,
  `tools/study-distance-units.cjs`, `tools/study-content-db.cjs`,
  `tools/capture-site.cjs` (mirror the whole app), `tools/verify-offline.cjs`
  (prove it runs with no external requests), `tools/deobfuscate.cjs` and
  `tools/recover-names.cjs`.
- `docs/nasa-eyes-architecture.md` and `docs/offline-mirror.md`, recording what
  was learned and how to reproduce it.

### Fixed

- **`SUN_POSITION.galactocentricKpc` returned parsecs.** The field divided by the
  parsec but was named in kiloparsecs, so it read 7980 instead of 7.98. Caught by
  the new tests, and a `galactocentricParsec` field added alongside it.
- **The Milky Way marker was placed at the galactic centre.** It is now placed at
  the solar system's actual position, 7.98 kpc out along the galactic-centre line.

### Notes

- The catalog now carries `category`, `subcategory`, `displayName`, `iauName` and
  `keywords` for 719 of its 844 entities; the remainder are frame entities and
  spacecraft sub-parts that have no content entry, which is NASA's own split.
- NASA models the Sun as lying exactly in the galactic plane (b = 0). That is the
  plane international charts draw; physically the Sun sits ~10–25 pc above the
  mid-plane, so its true latitude is about b ≈ +0.1°. The code notes this rather
  than claiming a precision it does not have.
- The widely repeated claim that the IAU recommends R₀ = 8.2 kpc is not accurate:
  the IAU has never adopted R₀ by resolution. 8.2 kpc is the conventional round
  number; the measured value is 8.178 ± 0.013 ± 0.022 kpc (GRAVITY 2019). NASA
  uses 7.98 kpc and we follow NASA.

### Verified

`npm ci && npm test && npm run check && npm run build` all pass — 86 tests across
six files. The galactic view was additionally confirmed by screenshot, and the
captured NASA app was confirmed to boot offline with no requests leaving the
machine except the two inert analytics hosts.

## 0.2.9 - 2026-10-15

The Milky Way backdrop, and the Sun's galactic orbit.

### Added

- **Milky Way rendering** (`src/lib/scene/milky-way.ts`), using NASA's own
  `sprites/milky_way.png`. The backdrop fades in only beyond NASA's
  `z-distance` visible interval of 1.2e16 km, so the solar system view is
  unchanged and the galaxy appears only when the camera pulls far out.
- **Galactic orientation** derived exactly as NASA does it, from two reference
  vectors — the north galactic pole at lon 192.85948120833°, lat 27.12825119444°
  and the galactic centre at lon 266.40499625°, lat -28.93617241667°. Verified
  against NASA's own orientation literal: the derived quaternion matches
  component-for-component.
- **The Sun's galactic orbit** (`src/lib/scene/galactic-orbit.ts`), from the
  `sun` entity's `orbitalElements` controller: semi-major axis 246,237,071e9 km,
  eccentricity 0, mean angular motion -2,192,686e-23 rad/s, and the same
  orientation quaternion. The radius works out to **26,027 light years**, which
  matches the accepted distance from the Sun to the galactic centre.
- `tools/galaxy-shot.cjs` and `tools/sample-png.cjs` to capture the galactic
  view and verify by sampling rendered pixels.

### Fixed

- **The Milky Way quad never rendered.** A 1.2e18 km quad cannot be placed in
  world space: its vertices quantise to ~1e18-km steps in the float32 view
  transform and it vanishes silently, with `visible: true`, the texture loaded
  and the draw call issued. NASA's logarithmic depth pipeline exists for exactly
  this reason. The backdrop is now attached as the renderer background, which
  bypasses the depth test entirely and reproduces the same image, and
  `logarithmicDepthBuffer` is enabled as NASA has it.
- **Camera near/far are now derived per frame** (0.05× and 100× the orbit
  radius) instead of being fixed. A 23-order-of-magnitude near/far ratio
  destroys depth precision across the scale range.
- The Sun's galactic orientation literal is `(w, x, y, z)`, matching the `.dyn`
  convention; it had been passed to Three.js in the wrong component order.

### Verified

- `npm test` — 41/41 (dynamo 14, scene 14, units 7, milky way 6), including the
  three galactic-orientation assertions (X→galactic centre, Z→north galactic
  pole, right-handed basis) and the 26,027-light-year radius.
- `npm run check` and `npm run build` clean.
- Pixel sampling of a rendered capture at 1.8e18 km: 71% of the frame is lit and
  the galactic core, arms and dust lanes are visible.

## 0.2.8 - 2026-10-15

Fix the orientation quaternion order: every planet sat on the wrong orbit plane.

### Fixed

**`.dyn` quaternions are written `(w, x, y, z)`, and we were reading them as
`(x, y, z, w)`.** NASA unpacks them with `Quaternion.set(w, x, y, z)` in
`OrbPoint.load` / `OriPoint` / `QuatPoint`. Because the wrong order is still a
unit quaternion, magnitudes stayed correct — so every existing test passed —
while each orbit was rotated about the wrong axis:

| body | latitude before | true orbital inclination |
|---|---|---|
| Earth | −19.5° | 0.0° |
| Mercury | 77.8° | 7.005° |
| Jupiter | −12.3° | 1.303° |
| Mars | 1.3° | 1.850° |

The planets now trace correct, near-coplanar ellipses. `readQuatWxyz` reads the
NASA order explicitly for the `orb`, `ori` and `quat` point types.

### Added

- A **direction assertion** in the parser tests, which the old suite lacked: it
  rotates each orbit into the ecliptic frame (via the inverse of NASA's
  `eclipJ2000ToJ2000Rotation`) and checks the latitude against the body's real
  orbital inclination. A length-only check cannot catch an axis error.
- **`src/lib/nasa/units.ts`**: NASA's own astronomical constants, transcribed
  from `AppUtils` — `auToKm: 149597871` (the integer NASA ships, not the IAU
  2012 149597870.7), `ldToKm: 384398`, the Julian light year
  `9460730472580.8`, `speedOfLight: 299792.458`, the ±8e15 s time bounds, and
  the `eclipJ2000ToJ2000Rotation` quaternion (23.4393° obliquity). Includes
  NASA's distance formatter, and 7 tests covering the values and thresholds.
- The info panel now reports mean, equatorial and polar radii through that
  formatter, so units read as NASA displays them.

### Verified

- `npm test` — 35/35 (dynamo 14, scene 14, units 7), including the new latitude
  assertions for Earth, Mercury and Jupiter.
- `npm run check` and `npm run build` clean.
- Headless render: the inner planets now share a single orbital plane. No
  exceptions, no failed requests, **0 requests to nasa.gov**.

## 0.2.7 - 2026-10-15

Body labels and orbit lines rebuilt from measured values, not approximations.

### Fixed

`tools/dump-labels.cjs` now reads the live page's computed styles for every
visible `.pioneer-label-div`. That exposed several places where our labels had
drifted from the original:

- **Text colour.** NASA labels are pure white at 0.75 opacity. We were tinting
  the text with each body's hue; the hue belongs to the *icon* only.
- **Type.** 16px for planets and 18px for the Sun, weight 600, with pixel
  tracking of 4.8px (5.4px for the Sun) — not `0.3em`.
- **Icons.** NASA renders the `icon-circle-<body>` sprite at 20x20, offset
  (-28px, -4px) from the text origin. We were drawing a 7px dot inline.
- **No text-shadow**: NASA sets none on these labels.

### Changed

- **Orbit lines now match `TrailManager` exactly.** Only the eight planets and
  the Moon have an orbit line (moons and spacecraft have none), with NASA's own
  colours and alpha 0.75 (white at 0.35 for anything without an entry), sampled
  at 720 segments. The values live in `src/lib/scene/orbit-colors.ts`.
- `bodyIconName` maps a body to its `icon-circle-*` sprite.

### Verified

- `npm test` (27/27), `npm run check` and `npm run build` clean.
- Headless render: labels carry the real circular icons with white
  wide-tracked text, and orbit lines take their per-planet colours. No
  exceptions, no failed requests, **0 requests to nasa.gov**.

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
