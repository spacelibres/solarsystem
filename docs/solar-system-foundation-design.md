# Solar System foundation and parity design

Date: 2026-10-16
Status: Approved by owner on 2026-10-16

## Product decision

Complete Eyes on the Solar System first. Earth, Exoplanets, Asteroids and
communication-network applications follow after the Solar System foundation
passes its acceptance criteria. Retain Next.js, TypeScript, Three.js and the
existing dependency-free dynamo parser where verified against source assets.

Functional behavior, navigation and scene presentation follow the NASA reference.
Retain the approved spacelibre SVG identity and NASA attribution. Do not imply
NASA authorship or endorsement. Do not mirror NASA's asset library.

## Reference and scope

Reference application: https://eyes.nasa.gov/apps/solar-system/
Product directory: https://science.nasa.gov/eyes/

Before implementing each feature, record the reference URL, observation date,
interaction steps, observed outcome and available data evidence in a parity
matrix. Track entries as observed, designed, implemented or verified. This design
is an architecture proposal, not a claim that the reference has been fully audited.
Reference behavior takes precedence over assumptions about available features.

Deliver an explorable solar system with planets, moons, small bodies and spacecraft
where source data exists; object search and selection; time travel and playback;
camera framing and following; functioning layers and lighting; factual object
panels; supported mission stories; restorable shared state; responsive controls.
Exact dataset coverage and supported dates must come from inspected source data.
Unavailable data must be visible to the user rather than fabricated.

## Architecture and contracts

### Asset access

Centralize verified remote endpoints and URL resolution in the NASA adapter.
Use exact source URLs at runtime. Validate representative textures, models,
star data and dynamo segments before changing path construction. Test browser
CORS behavior. If direct access fails, assess a restricted streaming route for
verified NASA paths; it must not download a library, expose an arbitrary proxy
or require a local mirror. Preserve existing local files while migrating code.
Remove mirror instructions from the supported runtime workflow.

### Ephemeris and simulation

Separate binary parsing, controller selection, sample evaluation, reference-frame
composition and rendering. Select controllers using the current mission phase
and time-dependent parent. Verify pos, lin, ori and quat interpretation with real
small assets before adding interpolation; parser support alone is insufficient.
Audit orbital evaluation at sample boundaries against reference behavior.

Cache indexes separately from actual segment windows. Identify windows by their
source segment, not a coarse calendar bucket. Deduplicate requests, limit
concurrency, allow retry after transient failure and bound cache memory.
Expose ready, loading, unavailable and error states per object and time.
Reject stale results after a newer time or selection request. Load required
parent chains before composing positions. Never extrapolate outside verified
coverage while presenting the result as valid source data.

Define the simulation time convention explicitly and verify the relationship
between dynamo time and displayed UTC, including TT/UTC handling. UI controls,
stories and rendering use a single clock with time, playback mode and signed
rate. Live means following current time at real rate; accelerated playback is
labeled with its actual rate. Timeline bounds remain stable while dragging.

### Object lifecycle and renderer

Keep the full searchable catalog separate from resident GPU objects. Load the
initial solar-system anchors first, then selected bodies and required parents.
Selection completes loading before camera framing; unsupported objects explain
their availability. Remove the fixed extra-object cap as the mechanism for
determining which search results work.

Expose add/update/remove body and camera operations through a scene interface.
Keep scientific positions independent of display transforms. Use camera-relative
rendering or another measured precision strategy for distant and close views.
Add model loading and progressive texture resolution with explicit disposal.
Audit orientation, surface layers, rings, lighting, picking and label occlusion.
Only expose layers with implemented scene effects.

### Application state and interaction

Keep selected object, clock, camera mode, layer state and lighting in a coherent
application state. React owns controls; the renderer consumes scene snapshots.
Camera motion must not be tied to React rendering frequency. Split the large
scene module along these responsibilities as the relevant work is implemented.

Serialize a versioned, validated share state containing object, time, playback,
camera and visible layers. Reject malformed values and fall back predictably.
Support browser navigation and restoration. Object details prioritize sourced
facts and actions; parser paths and texture filenames belong in diagnostics.
Stories are implemented as verified event sequences rather than unsupported
promises of full mission playback.

## Delivery order and acceptance

1. Baseline and reference inventory: install locked dependencies, run existing
   checks, capture current local and reference behavior, and establish a parity
   matrix. Record failures separately from feature gaps.
2. Asset and ephemeris foundation: work from a checkout without a local mirror;
   representative assets load, segment boundaries and parent transitions are
   tested, transient errors retry, stale responses cannot replace current state,
   and unsupported dates report unavailable status.
3. Clock and object lifecycle: live time and signed playback agree with labels;
   date jumps refresh ephemerides; searchable supported objects load on demand;
   missing data does not yield a misleading camera focus or fabricated position.
4. Scene fidelity: compare representative planet, moon, ringed planet and
   spacecraft views at fixed dates and camera states; verify scale, orientation,
   model placement, lighting, layers and GPU resource disposal.
5. Interaction and content: verify search, selection, camera follow, details,
   reference-confirmed stories, sharing and history through end-to-end flows.
6. Completion audit: close the reference parity matrix, document remaining data
   limits, and verify desktop and touch layouts at 1440x900, 768x1024 and 390x844.

Each stage produces a functioning reviewable increment. Measure initial load,
frame time, network requests and memory against the same baseline scene and
record the browser and hardware; set performance budgets from that baseline.
Do not declare Solar System complete based only on a passing build.

## Verification and release

Use minimal real NASA fixtures for binary and controller tests, deterministic
unit tests for time and state handling, mocked network tests for request races
and failures, and browser flows for actual controls and share restoration.
Compare rendered output with the reference under reproducible conditions.

Before implementation commits, follow docs/versioning.md: patch bump using
scripts/set-version.mjs, changelog entry and npm ci, npm test, npm run check,
npm run build. Release commits and annotated tags must agree on version.
Temporary captures and downloaded source libraries remain untracked.

## Deferred applications

Keep asset access, time, camera and lifecycle boundaries reusable, but introduce
no speculative universal application framework. Other Eyes products receive
their own data adapters, reference inventory and acceptance design after Solar
System is complete.
