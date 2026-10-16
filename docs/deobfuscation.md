# De-obfuscation status

How far the NASA Eyes bundle has been recovered, what is usable today, and what
still blocks turning it into a runnable project.

Derived from `data/mirror/apps/solar-system/bundle/js_app.js` (1,740,373 bytes),
which is git-ignored — it is NASA's code, not ours.

## Where it stands

| | |
|---|---|
| classes in the bundle | **260** |
| classes extracted to `deobf/classes/` | **260** (all of them) |
| every extracted file parses | **yes** |
| bundle bytes recovered as class code | 1,112,601 (63.9%) |
| unresolved external symbols | **6** |

```bash
node tools/deobfuscate.cjs beautify   # re-indent   -> deobf/app.beautified.js
node tools/deobfuscate.cjs classes    # split       -> deobf/classes/*.js
node tools/deobfuscate.cjs symbols    # name mining -> deobf/symbols.json
node tools/audit-deobf.cjs            # verify the split is complete
```

The remaining 36% of the bundle is the webpack module runtime, the bundled copy
of THREE.js, and the top-level UI wiring — none of which are class declarations.

## Two bugs found and fixed in the splitter

Both produced code that **looked fine and was silently wrong**. Parsing is not
evidence of completeness, which is why `tools/audit-deobf.cjs` compares spans
against the AST instead.

**1. Brace matching inside template literals.** The splitter located a class's end
by counting braces in the raw text. This bundle contains template literals such as

```js
`Error loading ${name} (${url}): ${err.message}\n`
```

whose body holds a literal `}` that has nothing to do with block structure. The
depth counter stopped there, so `ResourceManager` was written out at 2,490 bytes
instead of 4,933 — cut in half, and the only file in the set that would not parse.
Fixed by taking exact spans from acorn, which was already a dependency.

**2. Colliding class names.** Names are **not unique** in this bundle: NASA
defines a base class and a subclass that share a name. Writing both to
`<Name>.js` meant the second silently overwrote the first, losing **9 classes**
outright — including `Settings` (13,760 bytes), `LabelManager` (7,421),
`TimeManager` (5,528), `Search` (11,800), `SelectionManager` (1,477) and
`Capabilities` (1,093). Collisions are now suffixed `[base]` / `[subN]` by size.

| name | base class | subclass |
|---|---|---|
| `Entity` | 19,610 | 8,132 |
| `Settings` | 13,760 | 445 |
| `Search` | 11,800 | 426 |
| `LabelManager` | 7,421 | 140 |
| `BaseComponent` | 7,741 | 6,694 |
| `TimeManager` | 5,528 | 417 |
| `DescriptionBlock` | 1,843 | 773 |
| `SelectionManager` | 1,477 | 148 |
| `Capabilities` | 1,093 | 307 |
| `Point` | 151 | 118 |

## What is still needed to run it as a project

The extraction is complete and readable, but the files are **not yet a module
graph**. Three gaps, in order of size:

1. **No imports or exports anywhere.** Every file is a bare `class X extends
   s.Y { … }`. The minifier's namespace letters (`s`, `o`, `n`, `r`) survive as
   free variables, and they differ per module, so `s.Vector3` in one file and
   `o.Vector3` in another are the same class. Resolving them needs the webpack
   module map, which is recoverable — `tools/recover-names.cjs` already mines it
   and `deobf/recovered-names.md` holds the evidence per letter.
2. **Six unresolved symbols**: `s.THREE` (474 uses — this is the bundled
   THREE.js, so it should map to a real `import * as THREE`), plus `Version`,
   `Loaded`, `Loading`, `Unloaded` and `Uniform`, which are small enums.
3. **Locals and parameters are still mangled.** `t`, `e`, `i` are everywhere.
   Method and property names survived in the object literals, so the recovered
   names in `deobf/recovered-names.md` can drive a rename pass, but it has not
   been applied — `Entity.base.js` still reads `constructor(t,e)`.

Until 1 and 3 are done this is excellent **reference material** — readable,
verifiable, and far better than the minified source for answering "what does NASA
actually do here" — but it is not yet a buildable codebase.

## Why this matters for our app

The reference clone at `:8099` answers behavioural questions, and this answers
implementation ones. Both were used to correct a real error: our notes claimed
NASA's `gl_Position.w = viewPosition.y` "clips half the sky", so we dropped it and
scaled a real sphere on the CPU instead. The extracted shader shows the line is
present in **both** the starfield and atmosphere shaders, and the arithmetic shows
why it works — dividing by the view-space vertical component makes the projection
depend on direction alone, so nothing is clipped by the near or far plane.
