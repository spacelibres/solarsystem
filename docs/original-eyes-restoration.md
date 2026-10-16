# Original NASA Eyes restoration

Owner direction, 2026-10-16: recover the shipped JavaScript as an engineered
project and reproduce the original application, rather than implement a separate
Three.js approximation. Use NASA's original resources at their runtime URLs.

## Implementation plan

- [x] Recover the complete preload, vendor and application module tables from
  the AST, retaining original numeric module identities and chunk startup order.
- [x] Emit one ESM source file per module factory, with unique identity-bearing
  paths, readable formatting, export-derived names and lexical binding recovery.
  Recover all classes inside their owning modules instead of detached class text.
- [x] Emit an explicit ESM module registry, the original webpack compatibility
  runtime and original entry functions. Preserve cycles, lazy factory execution,
  live exports, shader strings, Vue templates and third-party runtime versions.
- [x] Generate a self-contained project with package.json, index.html, build
  command, sourcemap, original styles, dependency/provenance manifest and audit.
  Keep source captures and generated NASA-derived code in ignored directories;
  commit the reconstruction tools and their regression tests.
- [x] Resolve runtime assets to the exact NASA origins. Retain original layout,
  logo and controls. Keep the independent-project attribution in README and its attribution section. No asset-library mirror or
  iframe of the remote website.
- [x] Make the generated application the local entry page only after its
  original scene and navigation work. Preserve the existing implementation in
  Git as a fallback, not as the reconstruction engine.
- [x] Verify original UI, object focus, time controls, layers, model/texture
  requests and reference comparisons in the browser. Run full repository checks,
  patch version and commit the verified milestone.

## Correctness criteria

Every extracted factory is accounted for exactly once. Every static module
dependency resolves to a captured factory or is explicitly classified as a
runtime helper. Output collisions are impossible because IDs are part of paths.
Scope-aware renaming must preserve shadowed bindings and string literals.
Unknown identifier meanings remain unknown; inferred names carry evidence.

The compatibility runtime is intentional: deleting it before accounting for
cycles and webpack export getters can change behavior. ESM files provide module
ownership and readable edit points while the compatibility layer preserves the
shipped initialization semantics. This is not a claim of recovering NASA's
unpublished original repository, original comments or minifier-erased names.

## Source

https://eyes.nasa.gov/apps/solar-system/

Capture only the page, config, runtime, preload, vendor and app scripts and the
three stylesheets needed to reconstruct the application shell. Planet textures,
models, ephemerides, fonts and images remain runtime requests to NASA.

## Verified milestone 0.2.28

Recovered 1,087 factories with no duplicate IDs or missing numeric dependencies.
Production entry serves the rebuilt shell. Browser checked original home, menu,
Earth focus and cloud textures, content panel, time controls and layers.
`npm ci`, 225 existing tests plus 5 recovery checks, typecheck, lint and production
build pass. Standalone build recreated HTML/CSS/JS after its output was moved away.
Independent review findings on embedded asset URLs and clean standalone builds
were fixed and reviewed again. Complete story-by-story parity remains an ongoing
acceptance task; this milestone does not claim exhaustive visual parity coverage.

## Native source follow-up (0.2.29)

The factory-based milestone above is superseded by the checked-in `eyes/` source
project. Its native imports/exports, templates, data and normal CommonJS packages
replace the chunk registry/runtime. Normal development compiles source and never
recovers it again. See `eyes/README.md` and the native-source implementation plan.
