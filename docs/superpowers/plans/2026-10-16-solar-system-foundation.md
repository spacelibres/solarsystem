# Solar System Foundation Implementation Plan

> **For agentic workers:** Execute inline with executing-plans. Steps use checkbox syntax for tracking.

**Goal:** Make resource access independent of a local mirror and make dynamo loading correct across time windows and recoverable failures.

**Architecture:** Keep the dependency-free parser and public loadDynamo API. Separate cached controller indexes from cached segment payloads, select segments using real index intervals, and validate point coverage on every request. Use the verified NASA asset origin directly.

**Tech Stack:** Next.js, TypeScript, Three.js, Vitest, native fetch.

## Global constraints

- Implement Solar System first; other Eyes applications remain deferred.
- Never mirror NASA's asset library. Keep only minimal attributed test fixtures.
- Verify real assets before changing paths or interpreting binary fields.
- Preserve spacelibre masters and NASA attribution.
- Release checks: npm ci, npm test, npm run check, npm run build; patch bump via scripts/set-version.mjs, changelog and versioned commit.

## Task 1: Establish a reproducible baseline and asset evidence

Files: README.md, docs/nasa-eyes-parity.md, src/lib/nasa/assets.ts, tests/assets.test.ts; remove unused mirror reader and local mirror route after confirming no callers.

- [x] Install locked dependencies with `npm ci`; run the existing suite before edits.
- [x] Probe the exact existing Earth orbit, Earth texture and Sun sprite URLs against https://eyes.nasa.gov/assets with an Origin header; record status, type and CORS.
- [x] Add asset-builder tests: `expect(dynamoUrl('earth/sun/orb/def.dyn')).toBe('https://eyes.nasa.gov/assets/dynamic/dynamo/earth/sun/orb/def.dyn')`; similarly assert a texture face, sprite, star layer and model URL.
- [x] Run `npm test -- tests/assets.test.ts` and observe the local-prefix assertions fail.
- [x] Change the centralized origin to `export const NASA_ASSETS_URL = 'https://eyes.nasa.gov/assets'`; derive static and dynamic bases from it. Keep existing builder signatures. Remove the unused filesystem serving route and reader; do not delete existing user data.
- [x] Replace README mirror setup with runtime-network instructions and source URLs. Preserve attribution. Describe disabled/partial controls honestly in the parity matrix.
- [x] Re-run asset tests and verify direct browser fetch of a representative binary and texture when browser tooling is available.

## Task 2: Correct window selection and request recovery

Files: src/lib/dynamo/loader.ts, tests/loader.test.ts.

Consumes: parseDyn(ArrayBuffer), parseDynSegment(ArrayBuffer, PointType), dynamoUrl(string).
Produces: unchanged `loadDynamo(path: string, atTime?: number): Promise<LoadedDynamo>`, `clearDynamoCache(): void`, `tryLoadDynamo(path: string, atTime: number): Promise<LoadedDynamo | null>`.

- [x] Build minimal synthetic index/segment buffers in the test only; use existing real fixtures for inline coverage. No new assumptions about binary record layout are required.
- [x] Add failing regressions for two boundaries inside one 90-day bucket, exact-boundary selection, concurrent deduplication, retry after a failed index or segment, inline out-of-range requests, dates before an index, and dates after the last segment's actual samples.
- [x] Run `npm test -- tests/loader.test.ts`; confirm failures match those behaviors.
- [x] Cache controller promises by URL and segment promises by actual segment URL. Each rejected promise removes itself only if it is still the cached entry. Limit resident settled entries to 128 controllers and 256 segments without evicting in-flight work.
- [x] Select the last index entry with `startTime <= atTime`, then require `atTime < endTime`; for the unbounded final v2 window, sample coverage remains authoritative. Require finite requested times. Require first sample time <= requested time <= last sample time before returning data.
- [x] Bound concurrent fetches to six; clearing caches must isolate old in-flight results from new cache entries. Reuse parsed indexes across time jumps.
- [x] Run regression tests and full suite. Record what remains: renderer time jumps still need integration with refreshed ephemerides, and TT/UTC conversion requires separate evidence.

## Task 3: Verify and checkpoint the foundation

Files: scripts/set-version.mjs if Windows execution requires repair, CHANGELOG.md, package.json, package-lock.json, VERSION, src/lib/version.ts; plan and design docs.

- [x] Review the diff for mirror remnants, unsupported claims and API compatibility.
- [x] Run `node scripts/set-version.mjs 0.2.10`; if npm cannot be spawned on Windows, use process.execPath with npm_execpath or the sibling npm-cli.js through execFileSync, rather than shell command interpolation.
- [x] Prepend a changelog entry describing only implemented and verified behavior.
- [x] Run `npm ci`, `npm test`, `npm run check`, `npm run build` sequentially and inspect every result.
- [x] Commit verified changes with a message ending `(v0.2.10)` and create local annotated tag v0.2.10. No remote push is required for this checkpoint.

## Subsequent increments

This plan implements the asset and loader foundation only. Clock ownership,
TT/UTC validation, time-jump refresh, stale-result rejection in the viewer,
dynamic scene object lifecycle, model fidelity, complete interaction and content
remain explicit subsequent increments under docs/solar-system-foundation-design.md.
Their implementation plans must use the measured reference parity matrix.
