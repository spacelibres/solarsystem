# Three.js source crosswalk Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Continue semantic recovery against the actual bundled Three revision, explain Eyes-specific adaptations, and edit all source for which this investigation obtains reliable naming evidence.

**Architecture:** Treat recovered Three core, renderer/addons, and the Pioneer bridge as separate ownership domains. Match shipped operations to local official reference sources; never replace the library with the root project's different Three dependency. Keep original operations and export contracts, and record every unresolved comparison explicitly.

**Tech Stack:** Native recovered JavaScript modules, Three r185 reference builds, Babel lexical scopes, Node CPU integration tests, Next.js host.

## Global Constraints

- No NASA asset mirroring, no recovery command in normal dev/build, no source overwrites from the original bundle.
- Official reference agreement is evidence for naming, not proof of an exact bundled patch or unpublished original identifiers.
- Capture a real pre-edit snapshot, compare it to a distinct actual candidate, and verify lexical/reference and public export invariants before updating frozen guards.
- Every remaining unmatched method needs a concrete comparison reason; matching and editing counts remain separate.

## Task 1: Core comparison

- [x] Compare remaining core methods and helper functions against both official r185 references; diagnose concrete normalization and patch differences.
- [x] Apply capture-safe names and substantive contract comments only where evidence supports them.
- [x] Check the actual old-to-new whole file, add representative CPU regressions, document confirmed and unresolved coverage.

## Task 2: Renderer and addon comparison

- [x] Establish actual module ownership and reference identity from imports, exports and executable structure.
- [x] Match renderer helpers, classes and addon methods; preserve all shader bytes, URLs, constants and operations.
- [x] Check lexical/reference equivalence and meaningful state/resource behavior; record actual changed names separately from comparison coverage.

## Task 3: Pioneer-to-Three bridge

- [x] Trace all rendering components to the actual Three APIs and explain entity time/coordinates versus Three scene objects.
- [x] Clarify engine frame order, manual transforms, viewport/scissor conversion, Y-forward projection and explicit GPU resource ownership in the actual source.
- [x] Validate camera projection with numerical fixtures and bridge behavior with actual local Three objects; keep pre-edit normalized operation hashes.

## Task 4: Integrate and verify

- [x] Independently review real diffs and proof coverage, address findings, and refresh only justified frozen guards.
- [x] Update per-file semantic evidence, current source documentation and maintenance guide without marking unchanged files semantically complete.
- [x] Bump the patch version with the repository script and changelog; run npm ci, npm test, npm run check, npm run build sequentially and verify browser startup.
- [x] Commit the verified milestone, create its local annotated tag, and report exact progress and unresolved limits.
