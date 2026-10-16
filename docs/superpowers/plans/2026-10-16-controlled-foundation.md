# Controlled Solar System Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans. Execute all tasks without another permission checkpoint; the user approved this route and execution.

**Goal:** Build the independent `/explorer` foundation with our own time, five-type ephemeris evaluation, abortable bounded resources and Three scene, retaining `/eyes` only as a reference.

**Architecture:** Pure `src/solar/domain` modules exchange named vectors/quaternions and ET seconds. `src/solar/runtime` resolves actual data windows and owns leases. The client viewer consumes these services through a small runtime and a standard Three renderer, never importing recovered Eyes or the old monolithic solar-scene.

**Tech Stack:** Existing Next 16.4.1, React 19.3.1, TypeScript strict, Three 0.186.1, Vitest. No dependency upgrade or NASA media mirror.

## Global constraints and scope

- Approved design: `docs/superpowers/specs/2026-10-16-controlled-solar-system-design.md`; analysis baseline v0.2.34 (`02b7cdb`). Work in the existing user-requested checkout and feature branch.
- First implementation subproject covers foundation and a real independent view. Full Solar System functional parity remains the following explicit subprojects; a working view is not the completion of the overall system.
- All new production TypeScript is strict without `any`. No import of `eyes/src`, old `SolarViewer` or `solar-scene`; no iframe, global Pioneer, recovery invocation or copied application bundle.
- Keep default home route unchanged until full acceptance. `/explorer` must be directly accessible and compile independently.
- NASA data uses verified runtime URLs. Reuse the existing pure binary reader/parser only where its operation is proven; correct segment interpretation in the new repository. Do not bulk download assets.
- Domain coordinates: km, km/s, radians, source-compatible ET seconds. New camera uses standard Three -Z; world axes stay unchanged. Disk quaternion w/x/y/z is adapted by named components.
- Write meaningful failing tests before each domain/service behavior. Record exact failures and subsequent passes. After task review, complete release checks, patch version/changelog/commit/tag as one verified foundation milestone.

## File boundaries

| Files | Owner and responsibility |
| --- | --- |
| `src/solar/domain/time.ts`, `tests/solar-time.test.ts` | Task 1: ET/UTC conversion and explicit simulation clock |
| `src/solar/domain/ephemeris.ts`, optional focused `quaternion.ts`/`kepler.ts`, `tests/solar-ephemeris.test.ts` | Task 2: pure five-type evaluation, named vectors and typed availability |
| `src/solar/runtime/resource-pool.ts`, `ephemeris-repository.ts`, `tests/solar-resources.test.ts`, `solar-repository.test.ts` | Task 3: leases, cancellation, bounded cache, true segment windows |
| `src/solar/domain/entities.ts`, `tests/solar-entities.test.ts` | Task 4: phase/parent dependency evaluation and explicit missing states |
| `src/solar/runtime/explorer-runtime.ts` | Task 5: frame/seek transactions and typed public commands/snapshots |
| `src/solar/render/*`, `tests/solar-render.test.ts` | Task 5: six-face spheroid mapping, camera-relative scene and lifecycle |
| `src/app/explorer/page.tsx`, client UI under `src/solar/ui/` | Task 5: independent client boundary, controls and optional diagnostics |
| `docs/solar-system/` | Task 6: user/source/API guide, capability matrix, known remaining subprojects |

## Task 1: Own time model

**Consumes:** Source contract `eyes/src/engine/core/TimeUtils.js` as evidence only; no runtime import.

**Produces:**

```ts
export type ClockMode = 'paused' | 'playback' | 'live';
export interface ClockSnapshot { readonly timeEt: number; readonly rate: number; readonly mode: ClockMode; }
export function unixMillisecondsToEt(milliseconds: number): number;
export function etToUnixMilliseconds(timeEt: number): number;
export class SimulationClock {
  constructor(timeEt: number);
  snapshot(): ClockSnapshot;
  seek(timeEt: number): void;
  play(rate?: number): void;
  pause(): void;
  live(unixMilliseconds: number): void;
  advance(realSeconds: number, unixMilliseconds?: number): ClockSnapshot;
}
```

- [x] Write tests: `2026-01-01T00:00:00Z` maps to `820497669.184` ET within floating tolerance; round-trip ordinary timestamps before/after known leap boundaries; snapshot mutations cannot change clock; pause, negative rate, seek and live have explicit behavior; invalid finite inputs reject without corrupting state.
- [x] Run `npx vitest run tests/solar-time.test.ts`; missing module/API must fail before implementation.
- [x] Implement source-compatible time conversion with an explicit leap table and comments defining the Unix leap ambiguity. `advance` takes elapsed real seconds, uses no implicit wall clock, and uses supplied Unix milliseconds in live mode. Reject negative elapsed time; negative rate is supported. Seeking exits live; pause preserves time; play defaults to 1 simulation second per real second.
- [x] Run tests and inspect output. Independently review source contracts and timezone boundary arithmetic.

Example acceptance:

```ts
const clock = new SimulationClock(100);
clock.play(-2);
expect(clock.advance(3).timeEt).toBe(94);
clock.pause();
expect(clock.advance(5).timeEt).toBe(94);
```

## Task 2: Own ephemeris evaluator

**Consumes:** Existing parser's `DynPoint`, `DynHeader`, named `Vec3`/`Quat`; real fixtures. Source contracts: DynamoController Pos/Lin/Ori/Quat/Orb classes and OrbitalElements, Quaternion/Vector3 operations. Do not use the old nearest-only sampler as the whole evaluator.

**Produces:**

```ts
export interface EphemerisWindow {
  readonly header: DynHeader;
  readonly points: readonly DynPoint[];
  readonly interval: { readonly min: number; readonly max: number };
  readonly source: { readonly path: string; readonly segment: string | null };
}
export type EphemerisState =
  | { readonly status: 'ready'; readonly kind: 'position'; readonly position: Vec3; readonly velocity: Vec3 }
  | { readonly status: 'ready'; readonly kind: 'orientation'; readonly orientation: Quat; readonly angularVelocity: Vec3 }
  | { readonly status: 'unavailable'; readonly reason: 'out-of-range' | 'invalid-samples' | 'unsupported-orbit' };
export function evaluateEphemeris(window: EphemerisWindow, timeEt: number, options?: { readonly body?: 1 | 2 }): EphemerisState;
```

- [x] Write failing tests for Hermite position and its velocity derivative; clamped linear position/secant velocity; shortest-path quaternion interpolation and finite normalization; ori endpoint angular propagation/multiplication direction; orb two-endpoint projection then linear mixing, velocity and barycentric factors; ellipse and hyperbola; invalid/duplicate/nonfinite samples and time outside actual interval.
- [x] Execute `npx vitest run tests/solar-ephemeris.test.ts` before production implementation.
- [x] Implement small pure functions with no DOM/Three/global imports. Use explicit nonconvergence/degenerate policies rather than infinite loops or silently returning origin. Parent/differential tests must compare actual recovered pure classes in a VM with minimal named math dependencies, or numerical source-derived fixtures, without importing the recovered browser module graph into production.
- [x] Exercise Earth/Mercury/Jupiter orb and Earth ori real fixtures; add CPU differential validation where feasible. Preserve source-derived formulas but document deliberate stricter invalid-data behavior.
- [x] Run all targeted tests and independently review rotation sign and quaternion ordering.

## Task 3: Own resource and ephemeris services

**Consumes:** `EphemerisWindow` above, current dependency-free reader/parser; injected binary fetch. Coordinate parser/API needs with Task 2; do not edit its files.

**Produces:**

```ts
export interface ResourceLease<T> { readonly ready: Promise<T>; release(): void; }
export class ResourcePool<T> {
  constructor(options: { maxConcurrent: number; maxBytes: number; sizeOf: (value: T) => number; dispose?: (value: T) => void });
  acquire(key: string, load: (signal: AbortSignal) => Promise<T>, signal?: AbortSignal): ResourceLease<T>;
  snapshot(): Readonly<{ active: number; queued: number; entries: number; bytes: number; references: number }>;
  clearUnused(): void;
  dispose(): void;
}
export class EphemerisRepository {
  constructor(options?: { fetchBuffer?: (url: string, signal: AbortSignal) => Promise<ArrayBuffer>; maxBytes?: number; maxConcurrent?: number });
  load(path: string, timeEt: number, signal?: AbortSignal): Promise<EphemerisWindow>;
  snapshot(): ReturnType<ResourcePool<ArrayBuffer>['snapshot']>;
  dispose(): void;
}
```

- [x] Write resource tests first: max concurrency, FIFO, shared fetch and independent consumer abort, last reference abort, rejected task retry, LRU byte budget excluding held entries, clearUnused not invalidating active owners, idempotent release/dispose, all pending leases settle on dispose, late result is disposed and not cached. A canceled subscriber must not cancel other owners.
- [x] Run targeted tests red. Implement owned leases, entries and queues; every consumer Promise has a defined terminal result. Preserve physical concurrency accounting if a handler ignores abort; do not oversubscribe merely by dropping the count.
- [x] Write repository tests with synthetic byte fixtures derived from actual PointSet source plus real fixture parse: root header versus child blocks; v2 final sentinel is not a download; v1 explicit intervals/names; exact boundaries; nested index naming from `PointSet.load`; multiple different windows in one old 90-day bucket; backward seeks; failures/cancel/retry and no-data typed errors.
- [x] Run red, then implement actual segment identity keys and source version-aware block decoding; never use `floor(time/quarter)` cache identity. Bound nested index recursion and reject malformed/truncated/nonmonotonic data, unsafe paths and invalid times explicitly. Use exact source naming (`def` → padded index, nested name → `name_index`) without guessing asset paths. Fetch defaults to known `dynamoUrl`, response errors preserve URL/status, abort is propagated.
- [x] Run both tests green and independently review races/settlement/disposal and index terminal boundaries.

Example regression that must pass:

```ts
const a = await repository.load(path, 0);
const b = await repository.load(path, 15);
const c = await repository.load(path, 25);
expect([a.points[0].time, b.points[0].time, c.points[0].time]).toEqual([0, 10, 20]);
```

## Task 4: Own entity frame evaluation

**Produces:** immutable serializable entity definitions/phases, local ready/unavailable states, resolved world position and orientation snapshots. Selection of phase is last start <= time; missing coverage, missing parent and cycles remain explicit diagnostics. Local translational parent chain follows source entity semantics; do not rotate all parent offsets unless the actual source contract requires it.

- [x] Write `tests/solar-entities.test.ts` for Sun→Earth→Moon sum, forward/backward phase changes, missing parent/position, cycle, no input mutation, deterministic repeated snapshots and nonfinite values.
- [x] Run red; implement `src/solar/domain/entities.ts` as pure graph evaluation with stable ID records, no Three instances. Keep definitions and current state distinct; expose enough frame provenance for debug.
- [x] Run green and review the source entity coordinate contract before integration.

## Task 5: Independent runtime, render and UI

- [x] Build small configured initial catalog from exact existing source entries, recording its limited scope. Load Earth and Moon translation/orientation and at least one spacecraft only through declared phase/controller descriptors; do not silently pair arbitrary allDynamo entries by array index. The initial slice can have fewer entities, but unsupported catalog coverage is visible in docs, not counted as full parity.
- [x] `explorer-runtime.ts` owns clock/repository, command validation, seek generation and async coverage state. A previous generation may not overwrite a later seek. While a matching window is absent expose loading/unavailable and never render stale position as if current. One tick supplies a single ET to all domain stages. `dispose` cancels subscriptions/loads and is idempotent.
- [x] Write state/command tests before runtime implementation. Public operations include `seek`, `play`, `pause`, `live`, `select`/`focus`, `snapshot`, `subscribe`, `dispose`; publish precise types, no `window.app` or arbitrary eval.
- [x] For new rendering, first test six-face axis/UV orientation against CubeMap.defaultCubeMapFaceFrames and ellipsoid surface rules; prove winding/normals, camera-relative offsets and dispose with actual installed Three CPU objects. Implement six independent textured patches, never stretch face 0 across a sphere. Read actual Spheroid mapping before choosing geodetic versus radial conversion. Standard lit materials and proper color/data texture roles initially; keep advanced atmosphere/terrain parity pending by name.
- [x] Own `createRenderWorld(container, callbacks)` with `update(snapshot)`, `resize`, `focus`, `dispose`. Create WebGL only on client effect; own event listeners/resize observer, textures, material/geometry, animation loop and late image results. Use standard Three camera and camera-relative transforms; no old recovered shader protocol mixed into standard depth.
- [x] Create Next server `src/app/explorer/page.tsx` importing a client `Explorer` boundary. Read installed Next docs for page/client behavior. Use approved spacelibre logo and roles for our own surface, preserve NASA attribution and explicit NASA comparison; functional controls only, no decorative disabled feature grid. Show actual ET→UTC time, actual rate/live/paused status, selection, data failures/retry, and opt-in typed debug snapshot.
- [ ] Browser-test fresh `/explorer`, pause/resume/rate/seek/select/back, real network data and image load, resize/mobile, navigate away/back, and console errors. Keep `/eyes` functional and default route unchanged. Save and embed a current screenshot.

## Task 6: Review, document and release

- [x] Fresh reviewer checks spec compliance, numerical/race/resource correctness and independence of the actual diff; fix important findings and rerun affected checks.
- [x] Write `docs/solar-system/README.md` with module/API/data source/command contracts, exact implemented capability matrix and remaining Solar System stages. Update approved design progress without marking whole-system parity complete.
- [x] Verify new entry dependency graph excludes `eyes/src` and old SolarViewer/solar-scene. Check current source-ledger hashes; changing the package version requires refreshing only its declared metadata hashes, never making new behavioral claims.
- [x] Patch bump through `scripts/set-version.mjs`, prepend changelog, sequential `npm ci`, `npm test`, `npm run check`, `npm run build`, browser smoke. No new runtime edit after final verification without affected rechecks.
- [x] Commit with `(v<version>)`, create local annotated tag, verify clean status. Do not push unless requested.

## Following implementation subprojects

After this plan: full catalog compilation/provenance and dynamic entity factories; complete model/terrain/LOD/depth and shader components; all search/navigation/measure/compare/event/story controls; cache/decoder persistence and capability matrix; fixed-scene visual and performance acceptance; user evaluation then default-route switch. These require their own detailed plans against the already approved overall architecture, not another broad route approval.


## 执行证据

- Task1：缺失模块 RED → 19项 GREEN；独立时间/实体审查通过，包括闰秒边界和随机父图。
- Task2：缺失模块/新边界 RED → 17项 GREEN；80个真实样本对照；复审通过缩放四元数和极小角速度修复。
- Task3：租约、索引和缓存 RED → GREEN；独立审查含取消压力和无未处理拒绝检查。浏览器新增发现的旅行者真实尾部重复记录有单独回归。
- Task4：缺失模块与动态路径静态回退 RED → 6项 GREEN；实体图独立审查通过。
- Task5：运行时回调重入 RED → 12项 GREEN；六面几何/格式化 RED → GREEN；宽屏相机裁切 RED → 按较窄视场角取景，5项渲染测试 GREEN并复审通过。
- 实际浏览器已验证直接入口、地球/月球切换、暂停、速率、UTC历史跳转、旅行者木星阶段与返回实时。桌面1280×720已观察；移动触控、真实设备窄屏和context loss仍需后续设备验收，不能由CPU测试替代。

发布检查：npm ci、558项测试、check与build均通过；792个身份哈希匹配。生产版浏览器六目标ready且无错误/警告。移动/context-loss等未验收项保留，不预填完成。详细记录见 `../../solar-system/verification.md`。
