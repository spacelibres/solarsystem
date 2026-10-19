# Starlink constellation layer

The Explorer's Earth view can display the whole public Starlink constellation as
a live point shell plus a highlighted display orbit for a selected satellite.


## Data source

Starlink publishes one CCSDS OCM ephemeris per satellite:

- `https://api.starlink.com/public-files/ephemerides/MANIFEST.txt` lists the
  current set (11,151 satellites at the 2026-10-19 generation).
- `https://api.starlink.com/public-files/ephemerides/STARLINK-<number>.txt`
  contains 72 hours of position/velocity states in ITRF2000.

Downloading every complete file would be roughly 56 GB. The public server
supports HTTP Range requests, and each OCM starts with its metadata and first
state vector, so [`tools/starlink/build-catalog.mjs`](../tools/starlink/build-catalog.mjs)
fetches only the first 8 KiB of every file. It converts the ITRF position and
the rotating-frame velocity into an inertial state, writes
[`src/data/starlink-orbits.json`](../src/data/starlink-orbits.json), and caches
the raw header windows under `.cache/starlink/` for `--resume` runs.

```bash
npm run starlink:build                 # refresh all 11k satellites (~7 min)
npm run starlink:build -- --limit 50   # smoke test
npm run starlink:build -- --resume     # reuse cached headers
```

The generated catalogue stores `{ n, name, e, p, v }` where `e` is the epoch in
Unix seconds and `p`/`v` are Earth-centred inertial km and km/s. `npm run
starlink:build -- --out ...` writes elsewhere for experiments.

## Runtime display

### Recovered Eyes app

The default Eyes app also loads the same catalogue. Its
[`eyes/src/app/StarlinkLayer.js`](../eyes/src/app/StarlinkLayer.js) creates one
`starlink_constellation` entity parented to Earth and adds Pioneer's
`OrbitalParticlesComponent`. All 11,151 satellites are projected from
`Pioneer.OrbitalElements` into a single instanced particle draw, so no per-satellite
Eyes entity or label is created. The layer appears in the Earth close-up view and
uses the public copy at `public/eyes/data/starlink-orbits.json`; the build tool
writes both that copy and `src/data/starlink-orbits.json`.

### Explorer

- Every valid epoch state is propagated with a two-body Kepler solver in
  [`src/solar/domain/starlink.ts`](../src/solar/domain/starlink.ts).
- [`src/solar/render/starlink-layer.ts`](../src/solar/render/starlink-layer.ts)
  draws all satellites in **one** Points draw call, updates their positions each
  animation frame, and draws a bright selected orbit. 11k translucent orbit
  rings were removed because they painted a blue haze over Earth.
- The layer is anchored to Earth's per-frame position and can be toggled with
  **星链卫星 (11,151)** in the Explorer sidebar.
- Type a public number such as `STARLINK-34567` and press **定位轨道** (or Enter)
  to frame Earth and highlight that satellite's display orbit. Every number in
  the manifest is available without another network request at runtime.

## Limitations

- The two-body propagation is a display approximation. It ignores drag, J2,
  station-keeping and covariances; it must not be used for conjunction
  assessment or operations.
- The catalogue is a generated snapshot. Re-run `npm run starlink:build` to
  refresh it against the current manifest.
- The complete OCM files remain at the source. This repository stores only the
  compact one-state-per-satellite catalogue, not a mirror of Starlink's data.
- Starlink and SpaceX are trademarks of their respective owners. The data is
  used here for public visualization with source attribution.

## Verification

- `tests/starlink.test.ts` checks frame conversion sanity, Kepler period,
  closed orbit rings, invalid-state rejection and that the committed catalogue
  covers the whole manifest with finite states.
- `npm run typecheck`, `npm test`, `npm run check` and `npm run build` cover the
  TypeScript and production paths.
