# Changelog

All notable changes to this project are recorded here. Every released version
has an entry; the version matches `VERSION` and its annotated tag.

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
