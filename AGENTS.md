# AGENTS.md — spacelibre solar system

Guidance for agents and contributors working in this repository.

## What this project is

A browser solar system explorer built with **Next.js + Three.js**, driven by
**NASA Eyes' public ephemeris data**. It parses NASA's binary `dynamo` (`.dyn`)
format directly and renders NASA's own planetary imagery, presented with the
**spacelibre visual standard**.

## Non-negotiables

1. **Research before building.** When touching the `.dyn` format or NASA asset
   paths, verify against real assets first (see `tools/capture-assets.cjs`).
   Never guess a stride, path or field order.
2. **Never mirror NASA's asset library.** Reference assets by exact URL at
   runtime. Keep only the small `.dyn` test fixtures under `tests/fixtures/`.
3. **Never imply NASA endorsement.** Keep the attribution in `README.md` and the
   footer intact.
4. **Follow the visual standard.** Palette roles come from
   `src/lib/theme/palette.ts`, derived from the spacelibre VI standard. The logo
   must be the approved SVG masters in `public/brand/`, never reconstructed.
   Monochrome masters keep one ink and are never recoloured. Read
   [`docs/visual-identity.md`](docs/visual-identity.md) before touching any logo,
   icon or colour — it is binding, and `tests/vi-constraints.test.ts` enforces
   the parts that can be checked mechanically.

## Release discipline

Every push to `main` is a release. See [`docs/versioning.md`](docs/versioning.md).
In short: patch bump with `node scripts/set-version.mjs`, prepend a CHANGELOG
entry, run `npm ci && npm test && npm run check && npm run build`, commit ending
in `(v<version>)`, then create and push an annotated tag `v<version>`.

## Layout

```
src/app/           Next.js app router pages
src/components/    scene + UI components
src/lib/dynamo/    the .dyn parser, loader and orbit geometry
src/lib/nasa/      asset endpoints and catalog types
src/lib/theme/     spacelibre palette roles
src/data/          generated catalog.json (do not hand-edit)
tools/             research and capture helpers (not shipped)
tests/             parser/geometry tests + real .dyn fixtures
```

## Commands

```bash
npm run dev             # dev server
npm test                # tests
npm run check           # typecheck + lint
npm run build           # production build
npm run mirror:park     # move data/mirror aside so a build can run
npm run mirror:restore  # put it back afterwards
```

## Build prerequisite: the asset mirror must be out of tree

`npm run build` **refuses to run** while `data/mirror` exists and is populated.
Turbopack resolves the mirror path at build time and globs whatever it points at,
so an in-tree mirror makes the build walk 214,419 files and exceed the deployment
host's 2 GB — it is killed mid-build, reported only as `Killed`. Park it with
`npm run mirror:park`, or point the app at an out-of-tree mirror with
`MIRROR_ROOT`.

Setting `MIRROR_ROOT` alone is *not* enough to avoid the scan (measured), which
is why the build refuses rather than warns. `deploy/update.sh` parks the mirror
around the build automatically.

## Style

- TypeScript, strict. No `any` in shipped code.
- Comments explain *why*, not *what*. Keep them scarce.
- Keep the parser dependency-free so it runs in workers and tests.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
