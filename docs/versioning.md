# Versioning and release policy

This repository follows one rule above all others: **every commit pushed to
`main` is a release.** There are no untagged commits on `main`.

## What a release is

A release is a single commit that contains:

1. A **PATCH bump** applied with the repository script — never hand-edited:
1. Bump **PATCH by one** with the repository script — never hand-edit versions:

   ```bash
   node scripts/set-version.mjs <MAJOR.MINOR.PATCH>
   ```

   The PATCH component is the "smallest" number and is the one that advances,
   by exactly one, on every release: `0.2.0 → 0.2.1 → 0.2.2`. Do not jump
   MINOR or MAJOR for ordinary work, and never reuse or invent a number. The
   script keeps `package.json`, `package-lock.json`, `VERSION` and the UI
   version label in sync.

2. A new **CHANGELOG.md** section, prepended above the previous entry:

   ```markdown
   ## <version> - <YYYY-MM-DD>

   What changed, and what was verified.
   ```

   English, matching the existing style.

3. **Verification** that must all pass before committing:

   ```bash
   npm ci && npm test && npm run check && npm run build
   ```

4. A descriptive commit message ending in `(v<version>)`.

5. An **annotated** tag `v<version>` created on the release commit and pushed.

CI publishes the GitHub Release automatically from the tag.

`VERSION`, `package.json` and the tag must all agree. The tag equals
`v$(cat VERSION)`.

## What is not a release

Leave these local; do not commit or tag them:

- Purely local changes: environment and OS configuration, installed agent
  skills (`~/.agents/skills`), editor settings.
- Temporary or generated files: scratch scripts, `node_modules/`, `.next/`,
  `artifacts/`, captures, caches.
- Wording or formatting tweaks that do not change the deliverable.

Batch small edits instead of opening a release for each one.

## Never

- Never push to `main` without a version bump **and** a changelog entry.
- Never move, delete or reuse a published tag.
- Never force-push a published branch or rewrite published history.
- Never commit tokens, credentials, `.env` files or generated artifacts.
- Never commit reverse-engineered NASA binaries beyond the small, parseable
  test fixtures already in `tests/fixtures/`.

If the version, scope or changelog wording is ambiguous, ask the owner before
committing rather than guessing.

## Scope note: third-party data

The app consumes NASA Eyes assets over the network at runtime. It does not
mirror the asset library. Only minimal `.dyn` fixtures used by tests are
committed, and they carry NASA attribution (see `README.md`). The project is not
affiliated with or endorsed by NASA.
