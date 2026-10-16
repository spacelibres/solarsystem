# Explorer runtime contract

`src/solar/runtime/explorer-runtime.ts` owns one simulation clock and one ephemeris repository. An injected repository is also owned and disposed exactly once. The runtime has no DOM, Three, animation frame or implicit wall-clock dependency. Its caller supplies elapsed real seconds, and Unix milliseconds when live mode is active.

`tick` samples ET once, evaluates each active controller through the independent five-type evaluator, then resolves the complete parent graph at that same ET. `seek` and `live` invalidate outstanding requests and advance the generation. Aborted requests cannot publish results, including repositories that ignore their abort signal. Only the phase active at the current ET contributes controller paths. No phase means no request.

Each active controller retains at most one actual data window. A window is reusable only while it covers the requested ET; an uncovered frame stays unavailable. If playback advances beyond an in-flight request, its eventual completion starts a load for the current ET. A returned window that does not even cover its original requested ET becomes an explicit failure. Neither rejection nor invalid returned coverage retries on each animation frame. `retry` explicitly retries failed loads and discards windows whose samples fail evaluation.

Public commands are `seek`, `play`, `pause`, `live`, `select`, `retry`, `tick` and `dispose`. Times, rates and elapsed durations follow `SimulationClock` validation; unknown selection IDs reject without changing selection. Seeking exits live mode, preserves ordinary playback mode and increments `generation`. Initial selection is Earth when present, otherwise the first configured body. Empty or invalid definition sets reject before repository ownership begins.

`snapshot()` returns a detached clock, frame map, error record, pending path list and resource statistics. Mutating a returned map or nested frame cannot affect the runtime. Each call creates a new snapshot, so React callers should store sampled snapshots rather than use this method directly as a stable external-store snapshot getter. Subscribers receive command and asynchronous completion notifications; their unsubscribe callback is idempotent. Subscribers should not throw. `dispose` aborts loads, clears listeners/windows/frames and disposes the repository. It is idempotent; all commands and new subscriptions after disposal throw. `snapshot()` remains available with `phase: 'disposed'` and no pending paths. Late results have no effect.

Phase values are `loading` while a required controller request is pending, `ready` when all configured frames resolve, `partial` when some resolve, and `error` when none resolve. Per-controller errors preserve failed load/evaluation reasons; per-entity frames preserve `no-phase`, missing parent, cycle and missing local/orientation states separately. The static heliocentric Sun can therefore retain a ready frame during a partial data failure. The renderer hides all bodies while the selected focus is unavailable; a ready Sun frame alone does not imply a visible fallback view.

## Curated initial scene

`src/solar/config/default-scene.ts` contains six explicitly mapped entities: Sun, Earth, Moon, Jupiter, Saturn and Voyager 1. This is an initial foundation slice, not the complete NASA catalog or functional parity.

- Planet and Moon translation/orientation paths and spheroid descriptors come from `eyes/src/engine/core/Unidentified695.js` and `EntityEntry-699.js`. Earth uses the source spheroid equatorial radius 6378.137 km rather than its rounded catalog selection radius 6378.1 km.
- The Sun is explicitly a static heliocentric root with identity orientation. Its source Galactic orbital translation is outside this viewer.
- Voyager 1 preserves all six source phase starts, parents and matching translation controllers from `eyes/src/engine/core/Unidentified712.js`. Its visible marker uses the source extents radius 0.0043 km. The source model also requires Earth alignment plus the orientation controller and model-local rotations. These are not represented as a fabricated attitude or claimed model parity.
- Color descriptors keep the original six-face NASA texture names and available resolutions. This module declares no advanced material, ring, atmosphere, terrain or model parity.

All fourteen declared dynamo root URLs and the five smallest-resolution face-zero texture URLs returned HTTP 200 in a focused HEAD verification on 2026-10-16. Source definitions are inspected as evidence only; runtime imports stay within our independent modules and existing pure asset/parser utilities. Media remain exact NASA runtime URLs, with no mirrored media library.
