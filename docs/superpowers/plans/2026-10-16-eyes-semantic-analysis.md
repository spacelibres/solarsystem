# Eyes semantic analysis and reference implementation plan

**Goal:** provide an auditable Chinese reference covering every tracked file and
class in eyes/, improve evidence-backed code comments and explain remaining
minified symbols without inventing original source names.

**Architecture:** one reproducible Babel AST inventory of all tracked files;
independent semantic reviews of engine, application/UI and vendors; merge their
code-derived notes into a complete Markdown reference and machine-readable index.
Keep static observations, semantic inferences and unresolved names distinct.

**Constraints:** preserve NASA runtime behavior and current local decoder cache;
normal build never regenerates application source; no NASA media mirror; no
unsolicited brand changes; never claim erased identifiers are original names.

- [ ] Inventory every tracked eyes file, JS class, method, field, export/import,
  caller, manager/component reference, short binding and source provenance.
- [ ] Review engine/dynamo/resource lifecycle, application/view/UI lifecycle and
  vendor package/helper boundaries independently with explicit evidence notes.
- [ ] Test inventory correctness on nested classes, shadowed short bindings,
  getters/setters, aliases, cycles, templates and non-code files.
- [ ] Add concise, substantive file/class comments from verified notes; use the
  complete reference for exhaustive details. Verify comments preserve code AST.
- [ ] Generate docs/eyes-analysis/README.md as the complete searchable Markdown
  reference, plus per-domain narratives and a provenance/unknown-name ledger.
- [ ] Assert every tracked file/class/method is represented and links resolve.
  Run full checks/build and independent review, then patch version and commit.

The reference must distinguish complete structural coverage from confidence in
minifier-erased semantics; unresolved names remain visible rather than silently
counted as recovered. No speculative bulk renaming.

## Verified outcome

- 1,105 tracked Eyes files; 552 explicit classes; 5,513 methods, accessors, callable fields and static blocks.
- 1,032 JavaScript files annotated with identical executable ASTs relative to the pre-change Git revision.
- Complete Chinese reference, application/engine/vendor reviews, scoped naming evidence and deterministic stale-index checks delivered.
- Structural coverage is exhaustive; semantic confidence and unknown original identifiers are explicitly distinguished.
