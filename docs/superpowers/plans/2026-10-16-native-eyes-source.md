# Native NASA Eyes source recovery implementation plan

User approved direction: turn shipped JavaScript into a maintainable source project,
with semantic source paths, explicit imports/exports and an independent build.
The existing original UI and NASA runtime resource URLs remain authoritative.

1. Audit all module export shapes, runtime helpers and dynamic require contexts.
   Record semantic names from real export/class/component relationships, not guesses.
2. Add executable transformation regressions before implementing native extraction.
   Cover live named exports, reexports, CJS interop, circular vendor imports and
   locale contexts. Fail closed on unsupported runtime constructs.
3. Unwrap application ES modules into actual ESM. Replace numeric dependencies with
   source imports, restore dependency aliases, separate templates/configuration,
   and retain third-party CommonJS as ordinary relative source modules bundled by
   esbuild. Remove webpack's registry, chunk loader and numeric require API.
4. Put editable sources in eyes/, with package/build/dev configuration. Normal
   dev/build compiles these sources and never regenerates or overwrites edits.
   Recovery is an explicit command. Preserve original hashes and source mapping.
5. Build and verify original home, Earth, content, navigation, layers and clock
   in the browser. Run full tests/check/build and independent review. Patch bump,
   changelog and commit only after verification.

Unknown minified local names stay unresolved unless semantic evidence supports
renaming. Runtime/third-party compatibility code must be identified honestly.

## Verified result

Completed the native source project and checked-in editable sources. Root and
standalone npm ci succeeded; 226 repository tests and 16 recovery regressions
passed. Both project checks and production builds passed. Import audit resolves
3,149 references across 1,087 modules. A temporary HTML-template edit appeared in
the browser through the source watcher and was restored byte-for-byte; all 1,089
source hashes remained unchanged by production builds. Independent review found
a lexical capture affecting BaseRef; the converter guard, actual BaseRef test and
full regeneration fixed it, and the review pass found no remaining captures.
