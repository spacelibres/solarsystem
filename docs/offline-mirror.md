# Current local resource deployment (2026-10-24)

The active recovered source is `eyes/`; normal builds never recover or replace
it. Browser resource requests use `/nasa/` and never fall back upstream.
With `NASA_MIRROR_FILL=1`, the server fills missing files from approved upstream
hosts, then serves the current request from disk. This is online provisioning,
not a claim of a fully offline library. Downloads deduplicate by path, run at
most four at once, time out after 25 seconds and back off failures for 60 seconds.
The queue is capped at 128 paths; files are capped at 64 MiB and written atomically.
HTML/error responses are rejected. `[mirror-fill]` service logs record successful
source URLs, byte counts and SHA-256 hashes, plus failures. Disable the setting
for strict disk-only operation. External host URLs are allowlisted, not arbitrary
user-controlled proxy destinations.
Set `MIRROR_ROOT=/srv/solarsystem-mirror` on the VPS. The local default is the
sibling `.solarsystem-mirror` directory, outside the checkout and Git.

The existing VPS library was verified at 107,179 files / 1,380,016,998 bytes.
Reuse it rather than redownloading it. Generate an inventory with
`npm run assets:inventory -- --mirror /srv/solarsystem-mirror --out tools/out/local-assets.json`
and provision missing files with
`npm run assets:download -- --mirror /srv/solarsystem-mirror --manifest tools/out/local-assets.json`.
Reports record failures and hashes; a missing local file returns 404.
The Earth snapshot policy is `eyes/snapshots/earth.json` (2026-10-23).
This policy fixes request dates; it does not prove all image tiles are present.
CMTS/WMTS enumeration tools are optional research/provisioning tools, not a
mandatory full-library download or a storage requirement for this release.

The sections below document the older capture workflow and are historical;
in-tree mirrors must be moved outside the checkout before any build.

---

# Local mirror and de-obfuscation

How to get a **complete, runnable, offline copy** of NASA Eyes on the Solar
System, and how to turn its minified bundle back into something readable.

Nothing produced here is committed: it is NASA's code and NASA's data. The
mirror and the de-obfuscated output both live under ignored paths
(`data/mirror/`, `deobf/`). What *is* committed is the tooling and our own
notes, so the process is repeatable.

## 1. Capture the app shell

The deployed site is a plain script bundle, not a framework app: `index.html`
plus five JS files and three CSS files, all resolved through `config.js`.

```bash
node tools/capture-site.cjs --seconds 45
```

This drives headless Chrome, records every response body through the DevTools
Protocol, and writes them under `data/mirror/site/` preserving URL paths:

```
data/mirror/site/apps/solar-system/index.html
data/mirror/site/apps/solar-system/app.js       1.74 MB   the app
data/mirror/site/apps/solar-system/vendors.js   2.53 MB   three.js etc.
data/mirror/site/apps/solar-system/preload.js   133 KB    content database
data/mirror/site/apps/solar-system/commons.js
data/mirror/site/apps/solar-system/config.js
data/mirror/site/apps/solar-system/{app,vendors,preload}.css
```

## 2. Complete the asset mirror

The scene streams textures, models and ephemerides at runtime. Two manifests
drive that:

```bash
# texts/models/textures referenced by the bundle
node tools/build-manifest.cjs

# every numbered .dyn window segment (105,940 of them)
node tools/expand-segments.cjs

# fetch whatever is not present yet — resumable, safe to re-run
node tools/download-mirror.cjs --concurrency 32 --retry 3
```

**Keep the mirror outside the project tree when you build.** It is large, and
Turbopack globs the path the app resolves it from, so an in-tree mirror (214,419
files, ~1.6 GB) makes the build walk all of it and get OOM-killed on a small
host. `npm run build` refuses to start in that state; either pass
`--out /srv/solarsystem-mirror` and set `MIRROR_ROOT` accordingly, or move it
aside for the build with `npm run mirror:park` and back with
`npm run mirror:restore`.

Segment files are named by the index header's `digits` field (usually 3), so
`.../orb/def.dyn` enumerates `000.dyn … 385.dyn`. The app requests only the
window covering the current epoch, which is why a partial mirror appears to work
until you scrub the time slider.

## 3. Make it run offline

`config.js` is the only place the asset roots are defined:

```js
config = { staticAssetsUrl: '/assets/static', dynamicAssetsUrl: '/assets/dynamic' }
```

Point it at the mirror and expose the mirrored trees at those paths:

```bash
ln -s ../../static  data/mirror/site/assets/static
ln -s ../../dynamic data/mirror/site/assets/dynamic
```

Note the depth: the link lives in `data/mirror/site/assets/`, so `../../static`
resolves to `data/mirror/static`. Getting this wrong makes every texture 404.

Then verify:

```bash
node tools/verify-offline.cjs --seconds 30
```

It serves the mirror, boots the app, and reports (a) whether a canvas and
`window.app` appeared, and (b) **every request that left the machine**. The only
acceptable external hosts are analytics (`dap.digitalgov.gov`,
`www.googletagmanager.com`), which are inert.

## 4. Binary assets are data, not code

The mirror holds **nine** `.bin` files. None is compiled or obfuscated: they carry
no container or code signature (no zip/gzip, no JVM `CAFEBABE`, Mach-O, ELF or
WASM magic). They are raw data with the formats already documented in the
readers, so the task is *decoding*, not decompilation:

| file | format | leading bytes |
|---|---|---|
| `stars.0–5.bin` | `i32 count` + `count × 23`-byte star records | `cb13 0000` = 5067 |
| `galaxies.0.bin` | the same star-record layout | `bb04 0000` = 1211 |
| `constellations.bin` | `u8 len + name, u8 RGBA, u8 n, n×3 f32, u8 2·segs, segs` | `06 "Aquila"` |
| `voyager_heliosphere.bin` | headerless glTF buffer view, float32 triples | (no header) |

```bash
node tools/decode-bins.cjs          # -> deobf/bin/*.txt, one per input
node tools/decode-bins.cjs stars    # filter by path substring
```

This dumps all 43,878 stars and 1,211 galaxies as a table, all 88 constellations
with their star positions and line segments, and a summary of the heliosphere
buffer. The constellation decoder round-trips exactly — it consumes all 10,952
bytes and yields the 88 IAU names, which is the check that the record layout is
right.

**On decompilers.** `morluto/rea` is an MCP-based reverse-engineering toolkit for
native binaries (via Hopper/Ghidra/IDA), JVM bytecode, .NET assemblies, Android
APKs and Electron apps. None of those formats is present here, so it has nothing
to act on: there is no compiled artifact in this project to decompile. The
obfuscated JavaScript *was* handled — see the next section — and that was a
beautify-and-rename problem, solved with an AST walk rather than a decompiler.

## 5. De-obfuscate

```bash
node tools/deobfuscate.cjs beautify   # -> deobf/app.beautified.js
node tools/deobfuscate.cjs classes    # -> deobf/classes/<ClassName>.js
node tools/deobfuscate.cjs symbols    # -> deobf/symbols.json
node tools/recover-names.cjs          # -> deobf/recovered-names.{json,md}
```

`beautify` parses with acorn and re-indents **only at statement boundaries**,
so promises and long expressions stay on one line instead of exploding. The
output is verified to still parse, i.e. it is a formatting change and nothing
else. The single-line 1.74 MB bundle becomes ~19,000 readable lines.

### Recovering names

A minifier mangles *bindings* but cannot mangle:

- **property names** — resolved at runtime. 1,994 `this.*` names survive, of
  which the `_`-prefixed ones (`_timeInfo`, `_ignoreDistance`,
  `_distanceThreshold`, …) are NASA's own fields.
- **string literals** — asset paths, category names, DOM class names (6,001 of them).
- **exported class names** — 261 survive.

`recover-names.cjs` walks the AST and, for every mangled one- or two-character
identifier, records the *known* names it is used alongside:

```
t = new Vector3()          -> t is a Vector3
this._layerManager = t     -> t is the layer manager
t.getComponent(...)        -> t is an Entity
t instanceof TrailComponent -> t is a TrailComponent
t.radius                   -> t is a body-like object
```

Candidates are ranked by evidence count, weighted toward actual class names. The
result is an inference backed by citations, not a guess — each entry in
`recovered-names.md` lists how many times the evidence occurred.

### Two pitfalls hit while building this

- **Dangling `else` after a `for`.** Writing
  `if (Array.isArray(v)) for (const c of v) if (c…) walk(c); else if (…) walk(v);`
  binds the `else` to the inner `if` and the AST walk stops after two nodes —
  silently, with no error. Always brace these.
- **`acorn` is already present** as a transitive dependency, so no new
  dependency is needed for parsing. Use `require('acorn')` in a `.cjs` tool.

## Capture status

A complete mirror is ~1.2 GB and ~108,000 files, and the segment download runs
for a long time. It is resumable, so the loop is simply:

```bash
node tools/download-mirror.cjs --concurrency 32 --retry 3   # re-run until 0 fail
node tools/verify-offline.cjs --seconds 30                  # confirm no external deps
```

Expected steady state: **0 external requests** except the two analytics hosts,
and no `Failed to download` exceptions. Each unresolved `NNN.dyn` in the verify
output names a segment the downloader has not reached yet, not a broken link.

Known-benign failures in `tools/out/download-failures.txt`: the `wasm/draco/`
and `wasm/ktx2/` entries are *directories*, which the server answers with 403.
Their contents are listed individually in the manifest and download normally.
