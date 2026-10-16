# Source catalog

`node tools/compile-solar-catalog.cjs` regenerates
`src/solar/config/catalog.generated.json`; add `--check` to check reproducibility.
The compiler parses recovered `eyes/src/engine/core/*.js` with Babel and visits
the exact `Entity.Entity.register` calls. It never imports or executes recovered
modules and never downloads media. The current source registers 844 entities.

The manifest has `schemaVersion`, `entries` and registration-level `diagnostics`.
Each entry has its source ID, all original registration fields, `raw` containing
the complete structured registration, exact file/line/column `provenance`, and
per-entry `diagnostics`. The public TypeScript schema is `catalog-types.ts`.
The old `src/data/catalog.json` is not an input or authority.

Parent tables retain every time boundary and repeated parent. Controller arrays
retain their source order, coverage, URL and parameters; the compiler assigns
neither phase nor parent by controller array index. Binary coverage must be read
by the runtime. Groups, radii, spheroid maps/LOD options, trails, model rotations,
translations, scale, shadows and other source fields are preserved.

JSON encodes source infinities as `"-Infinity"` and `"Infinity"`; source undefined
is `{ "$undefined": true }`. Pioneer Vector3 constants/constructors become
`[x,y,z]`, and Pioneer Quaternion constants/constructors become `[w,x,y,z]`.
The compiler resolves literal arithmetic, whitelisted Math constants/functions,
and local static variable references with cycle protection. Unsupported
expressions and callbacks remain `{ "$unsupported", "expression", "reason" }`
plus a diagnostic. They must not be treated as supported runtime behavior.
No callback is executed, including model mechanisms and mission scripts.

Concrete source checks include Moon (1737.4 km spheroid), ISS stationary model,
Hubble, Voyager 1 model rotations, Juno repeated-parent phases, identity attitude,
and explicitly unsupported engine-cover callbacks. Source paths and line numbers
are tested against current source. `npx vitest run tests/solar-catalog.test.ts`
also checks byte-for-byte regeneration and the total registration count.

Asset URL placeholders stay exactly as registered. For example Juno's model is
`$STATIC_ASSETS_URL/models/sc_juno/Juno.gltf`; Moon's texture paths remain relative
to the source map base. Consumers must apply the verified NASA runtime bases.
Rotation arrays are degrees in source order (see `Entity-567.js`); translating
source options to a different engine must preserve its multiplication order.
Presence in this manifest proves source registration, not binary data coverage
or support for all recovered rendering/controller features.
