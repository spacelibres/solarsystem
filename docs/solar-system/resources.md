# Resource and ephemeris ownership

`src/solar/runtime/resource-pool.ts` provides `ResourcePool<T>` with configurable
`maxConcurrent`, `maxBytes`, `sizeOf(value)` and optional `dispose(value)`.
`acquire(key, load, consumerSignal?)` returns `{ ready, release }`. Each consumer
owns an independent lease; it must release after using the value. Releasing or
aborting a pending lease rejects that lease with `AbortError`. A shared request
continues while another owner remains. The last pending release aborts its
underlying request. Failed requests are evicted so a later acquisition can retry.

Active means physical operations that have not settled. An operation ignoring
abort still occupies its slot, so cancellation cannot exceed the concurrency
limit. FIFO scheduling starts queued work when physical slots become available.
A canceled operation's late value is disposed and never cached. `dispose()`
settles all pending consumers and destroys cached values, including held values;
callers must stop using resources when their owning pool shuts down. Releases
and pool disposal are idempotent. Exceptions from resource cleanup callbacks
are contained so they cannot strand the scheduler or other owners.

The byte limit is a soft budget while resources are held: only unheld values can
be evicted, in least-recently-acquired order. Releasing a value reapplies the
budget. `clearUnused()` removes unheld values without affecting active owners.
Snapshots report physical active operations, queued operations, cached/pending
entries, cached bytes and lease references. Bytes count the caller's `sizeOf`
result, not JavaScript object overhead.

`src/solar/runtime/ephemeris-repository.ts` provides
`EphemerisRepository({ fetchBuffer?, maxBytes?, maxConcurrent? })`. Its
`load(path, timeEt, signal?)` resolves `EphemerisWindow` with the parsed header,
points, the intersection of leaf and ancestor coverage, and
`source: { path, segment }`. `segment` is the exact PointSet name without `.dyn`,
or `null` for inline root data. Raw buffers are pooled by exact runtime URL;
decoded windows are owned by callers and are not retained in a second cache.
The repository releases its buffer leases before returning decoded data.
Defaults are six physical requests and 16 MiB of unheld raw buffers.

The format authority is `eyes/src/engine/controllers/DynamoController.js`,
especially `PointSet.load`, `PointSet.loadFromUrl` and root header reading.
The repository uses the existing pure point reader for all five point types and
does not import recovered runtime code. Root definitions supply metadata;
children inherit it. Version 2's final index boundary is a sentinel, so N
boundaries describe N−1 downloadable files. Version 1 supplies explicit
intervals, computes padding as `ceil(log10(count))`, and omits the control byte
in non-`def` leaves. `def` children use padded indices; deeper children use
`parent_index`, always beside the root definition, not in nested directories.

Selection deliberately uses the interval on the right at a contiguous shared
boundary. The final coverage endpoint is closed. Version 1 gaps remain missing
data. This makes boundary selection deterministic, unlike source hint-dependent
closed-interval searches. Sample coverage can narrow an index interval; no
nearest-window fallback or quarter-year cache key is used.

The live `sc_voyager_1/sun/3/def.dyn` response checked on 2026-10-16 contains seven
`pos` samples, the last two byte-identical at ET 3155716800. Source PointSet
selection uses earlier nonzero intervals for ordinary dates, so rejecting the
whole controller would discard valid coverage. The repository removes only
byte-identical terminal repeats while retaining at least two records, then
applies strict increasing-time validation. This preserves all nonzero source
intervals and makes its closed final endpoint evaluable. Interior duplicates,
conflicting terminal records and insufficient distinct samples remain invalid.
The exact 404-byte Voyager response is embedded in the repository regression
test; it requires no network request during tests.

Malformed/truncated buffers, other duplicate or descending times, nonfinite fields,
overlapping v1 intervals, unsafe paths and nonfinite request times are rejected.
Traversal allows at most 16 nested child levels. Empty or insufficient samples
and requests outside coverage return a typed `no-data` error; they never create
a position at the origin. Other error codes are `invalid-request`,
`invalid-data` and `fetch-failed`; decode/network failures retain their cause
and the exact URL. Default HTTP failures include their status in the cause.
Cancellation propagates as `AbortError`. Malformed cached buffers are cleared
when unheld, allowing corrected responses to be retried.

`tests/solar-resources.test.ts` and `tests/solar-repository.test.ts` cover physical
concurrency, independent cancellations, ignoring handlers, late disposal,
out-of-order windows, byte eviction, nested names, both versions, five point
types, real small checked-in fixtures and explicit errors. The regression runs
the old actual loader at ET 0, 15 and 25, demonstrating its 0, 10, 10 sample
starts, and confirms the repository returns 0, 10 and 20 without fetching the
sentinel. Tests inject small buffers and never download or mirror NASA media.
