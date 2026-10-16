# Eyes Object and Display Implementation Plan

> **For agentic workers:** Use subagent-driven-development. The user approved the overall independent architecture and explicitly requires the actual Eyes solar system, moons, Earth satellites and spacecraft. Continue execution without repeating the route approval.

**Goal:** Replace the six-object demonstration with source-derived searchable solar-system content, actual models, system overview, labels and trajectories in the independent application.

**Architecture:** Compile the recovered registration data as a reproducible, non-executable manifest. Keep source provenance and unsupported controller diagnostics. Resolve only the visible system/selected object and its dependencies, with real binary coverage determining active candidates. Render official Three geometry/GLTF and exact NASA runtime assets; never mirror NASA media.

**Tech Stack:** Existing Next, React, strict TypeScript, official Three and its shipped GLTF/Draco/KTX2 loaders.

## Constraints

- Keep eyes/ executable source as a reference; no recovered runtime imported by /explorer.
- Do not pair controller arrays with parents by numeric index or invent spacecraft attitude. Decode and use actual coverage, source controllers and transforms; explicitly report unsupported behavior.
- Solar-system overview, planet systems, artificial Earth satellites and deep-space missions must all be reachable, with named labels and correct physical scale.
- NASA-like scene/navigation behavior is the user's explicit visual target; retain attribution and approved brand masters without branding replacing scene capability.
- Small tested release increments, changelog, full checks and annotated local tags; no push without request.

## Tasks

1. [x] Compile entity registrations with Babel AST; preserve parents, controllers, spheroid maps, model transforms, groups, radii, trails and exact provenance. Tests against actual source Moon/ISS/Hubble/Voyager/Juno definitions; no execution of recovered module graph. Include diagnostics for non-static definitions.
2. [x] Expand independent definitions/runtime to resolve manifest controllers by real coverage and visible-system dependency closure. Preserve positional and orientation semantics, fail explicitly for unsupported controllers, suppress irrelevant candidate no-data as load errors only when no alternative exists. Regression tests for repeated-parent phases and selection loading.
3. [x] Add bounded, cancelable model ownership using official GLTF/Draco/KTX2/Meshopt, source meter-to-km scale and local transforms; load source real model URLs, reject stale results, release geometry/material/textures. Actual model evidence and meaningful ownership tests.
4. [x] Add solar overview/system focus, projected labels/picking, source-trajectory lines, planet rings and Sun texture/glow with exact asset evidence; no fake orbit circles or substitute craft geometry. Fit system extent independently of selected body radius.
5. [x] Add searchable category/system navigation and scene controls for planets, moons, Earth satellites and missions. Keep time controls/config/debug interface; add source and capability diagnostics.
6. [x] Browser-verify overview, all eight planets, Moon/Galilean moons, ISS/Hubble and Voyager/Juno models with historical-time availability handled. Save screenshots, review and document remaining parity gaps. Run npm ci/test/check/build, patch/changelog/commit/tag.

## Acceptance boundary

This plan closes object/display capability gaps; complete terrain LOD, atmospheric/postprocess parity, all special spacecraft mechanisms and every Eyes story/tool still require their own source-backed implementation. A list entry without loaded data/model is not accepted as a displayed spacecraft.


## Execution evidence

- Source AST compiler: 844 entries, exact provenance and byte regeneration; unsupported expressions remain explicit.
- Independent model review caught and verified revision-pinned decoder paths and Points/Line cleanup; 8 model tests pass.
- Controller review caught and verified covered fixed fallback, relativeToEntity and absent-reference spin semantics. Domain/source CPU comparisons cover noncommuting rotations and alignment; unknown attitude opt-in stays null.
- Renderer review caught barycentric line factors, retry layer persistence and hidden mobile system control; all fixed and re-reviewed. Added label cluster and camera-relative/unknown-attitude regressions.
- Real Venus duplicate and Mars original-order overlapping data were verified from assets. Mars selector-cell cache coverage regression initially failed backward seek/playback, then passed; independent re-review closed the P1.
- Browser ISS and Hubble original models displayed in development. Final production scene checks and release checks are recorded after completion; registration count is not a display acceptance count.

- Final checks: npm ci/test/check/build exit0; 377 Vitest + 229 Node checks pass. Production evidence and remaining gaps are recorded in docs/solar-system/verification.md. Time-scoped no-data and exact child-boundary caching were independently re-reviewed.
