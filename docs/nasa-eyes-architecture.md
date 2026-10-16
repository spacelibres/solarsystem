# NASA Eyes — architecture study

A working map of NASA's *Eyes on the Solar System* bundle, so that replication
work starts from NASA's own structure instead of guesswork. Everything here is
derived from the shipped webpack bundle, which is **not** committed (it is NASA's
code, fetched locally; see `AGENTS.md`).

## How to reproduce this

```bash
# 1. fetch the bundles (app.js is the main one; preload.js carries the content DB)
tools/fetch-bundle.sh                 # -> data/mirror/apps/solar-system/bundle/js_app.js
                                      # also save preload.js next to it

# 2. index the main bundle: every class, base class, byte size and member list
node tools/study-bundle.cjs list      # -> tools/out/bundle-classes.json

# 3. read one class in full
node tools/study-bundle.cjs find DistanceManager

# 4. raw regex search across the bundle
node tools/study-bundle.cjs grep "goToSystem"

# 5. targeted extractions documented below
node tools/study-layers.cjs           # the 18 addLayer calls
node tools/study-distance-units.cjs   # the unit formatter
node tools/study-content-db.cjs /tmp/preload.js   # categories + display names
```

`tools/study-bundle.cjs` brace-matches each `class X extends Y {…}` so the source
comes out with its original indentation and structure — it is *not* re-formatted
or beautified, because the goal is to read NASA's real code.

### Fully de-obfuscated reading

For longer study sessions, `docs/offline-mirror.md` describes capturing the whole
site, running it offline, and de-obfuscating the bundle into per-class files with
evidence-based identifier recovery. In short:

```bash
node tools/capture-site.cjs --seconds 45        # mirror the app shell
node tools/deobfuscate.cjs beautify             # 1 line -> ~19k readable lines
node tools/deobfuscate.cjs classes              # -> deobf/classes/<Class>.js
node tools/recover-names.cjs                    # -> deobf/recovered-names.md
```

## Why the bundle matters

NASA's app is not documented. Its behaviour — asset paths, controller maths, label
layout, colour tables — exists only in this bundle. Two prior misimplementations
(dynamo quaternion order, and the Milky Way scale) both came from inferring
behaviour instead of reading it. The rule is: **find the class, read the method,
transcribe the constant.**

---

## Top-level architecture

The app is a classic scene-graph engine, not a bespoke visualisation. The
hierarchy, from the `SolarSystemApp` entry point:

```
SolarSystemApp (BaseApp)
 ├─ RouteManager          URL routes: /object, /event, /feature, /story …
 ├─ TimeManager           simulation clock, real-time and scrub modes
 ├─ SceneManager          owns Three.js scene, renderer, cameras
 ├─ CameraManager         camera rigs, focus/animation
 ├─ DistanceManager       near/mid/far plane and scale bookkeeping
 ├─ LayerManager          the layer switches in the UI rail
 ├─ LabelManager          DOM label pool + quadtree, per-frame projection
 ├─ TrailManager          orbit line colours and visibility
 ├─ ContentManager        the entity/content database
 └─ ComparisonManager     side-by-side body comparison mode
```

### Entities and components

`Entity` (≈19.5 KB) is the central record. Entities are **not** a tree: each
carries a time-segmented `parents` table and the runtime resolves parenting per
frame. `EntityRef`/`EntityState` wrap references and mutable state.

Behaviour is attached with **components** (subclasses of `BaseComponent`), each
owning one visual concern:

| component | concern |
|---|---|
| `ModelComponent` | glTF models |
| `SpheroidComponent` / `SpheroidLODComponent` | spherical bodies + level of detail |
| `AtmosphereComponent` | atmosphere shells |
| `RingsComponent` | ring systems |
| `TrailComponent` | orbit trails |
| `OrbitLineComponent` | orbit lines |
| `LabelComponent` / `DivComponent` | DOM labels |
| `SpriteComponent` / `ConnectedSpriteComponent` | billboards |
| `StarfieldComponent` | background stars |
| `ConstellationsComponent` | constellation lines |
| `SkyboxComponent` | galaxy backdrop |
| `CometTailComponent` | comet tails |
| `ShadowConeComponent` | shadow cones |
| `GizmoComponent` | axis gizmos |

### Controllers

Motion is expressed as **controllers** (subclasses of `BaseController`), applied
per frame and often keyframed:

| controller | concern |
|---|---|
| `DynamoController` | drives a body from `.dyn` ephemeris data |
| `OrbitalElements` | analytic Keplerian orbits |
| `SpinController` | rotation about an axis |
| `OrbitController` | orbital camera motion |
| `LookController` / `AlignController` | camera aiming |
| `ZoomController` | camera distance |
| `FreeFlyController` / `RotateController` | free navigation |
| `KeyframeController` | scripted sequences |
| `GroundClampController` | keep a camera on the surface |
| `RotateByEntityOrientationController` | inherit a body's spin |
| `ScaleController` / `TransitionController` | scale and blends |

### Maths and helpers

`Vector3` (3813 B), `Quaternion` (4983 B), `Tuple`, `ScaleController` and
`ThreeJsHelper` are NASA's own maths layer rather than Three.js directly —
important because their `Quaternion` is **w-first** `(w, x, y, z)`, which is
what the `.dyn` format uses.

### The viewer

`ObjectView`, `DistanceView`, `EventView`, `FeatureView`, `StoryView`,
`CompareView` and `ExtendedBaseView` are the route-level views; `BaseView`
hosts them. `ContentPanel`, `Settings`, `Search`, `Menu`, `LayerPanel`,
`TimeControls`, `DistancePanel`, `ShareModal`, `Carousel` are the UI.

---

## Subsystems, studied

Each section records what NASA does, the constants involved, and where our
implementation lives (or should live).

### Galactic position of the solar system

*Status: implemented and verified.*

- `milky_way` entity: `radius 1e18`, `systemRadius 13e18`, sprite
  `sprites/milky_way.png` at `12e17 × 12e17` km, `VisibleInterval(12e15, ∞,
  "z-distance")`, orientation from `setFromAxes(a, undefined, n)`.
- Its `SpinController`: axis `(-0.8676661356982597, -0.19807638974470915,
  0.45598379452940485)` — the north-galactic-pole row of the IAU matrix — at rate
  `-2192686e-23`.
- `sun` entity: child of `milky_way`; `orbitalElements` with
  `semiMajorAxis 246237071e9` km (7.98 kpc, 26,027 ly), `e 0`, mean anomaly `π`.
- The visible "SUN" in the galaxy view is **the `sun` entity's own label**, not a
  marker object, uppercased by CSS.

Ours: `src/lib/nasa/astronomy.ts`, `src/lib/scene/milky-way.ts`,
`src/lib/scene/galactic-orbit.ts`, and the galactic label in
`src/components/solar-scene.ts`.

## The two databases

NASA keeps **two** separate tables, and confusing them causes bugs:

1. **The entity table** — `Entity.register({...})` in `app.js`. Physical data:
   `groups`, `radius`, `systemRadius`, `spheroid`, `parents`, `controllers`,
   `textures`, `model`. Our `src/data/catalog.json` (844 entries) is this table.
2. **The content database** — `PreloadManager._entityInfo`, i.e. webpack module 2
   of the `preload.js` chunk, which is `e.exports = JSON.parse('…')`. Presentation
   data: `category`, `subcategory`, `displayName`, `iauName`, `keywords`,
   `searchable`, `disabled`, and feature flags. **724 entries.**

The category data lives only in (2). Our catalog originally captured only (1), so
it had `groups` but no `category` — which is why labels could not pick NASA's
real icon or collision weight.

Extract both with:

```bash
node tools/study-content-db.cjs /tmp/preload.js
#   -> data/mirror/.../bundle/entity-info.json
#   -> data/mirror/.../bundle/entity-categories.json
```

### Content categories (authoritative counts, 724 entities)

| category | count | | subcategory | count |
|---|---|---|---|---|
| Moon | 451 | | Minor Moon | 421 |
| Spacecraft | 171 | | Orbiter | 149 |
| Asteroid | 53 | | Major Moon | 30 |
| Comet | 11 | | Flyby | 11 |
| Planet | 8 | | Lander | 5 |
| Dwarf Planet | 7 | | Rover | 4 |
| Landing site | 7 | | Terrestrial | 4 |
| Lagrange Point | 5 | | Jupiter-Family Comet | 3 |
| Instrument | 5 | | Short-Period Comet | 3 |
| Star | 1 | | Impactor | 2 |
| Galaxy | 1 | | Gas Giant | 2 |
| Universe | 1 | | Ice Giant | 2 |
| Human / Vehicle / Building | 1 each | | Barycenter | 2 |

### How a body resolves to a layer

`LayerManager.getEntityLayer(id)`:

```js
const { category, subcategory } = contentManager.getEntityInfo(id);
return this.getLayerFromCategory(subcategory) || this.getLayerFromCategory(category);
```

**Subcategory wins.** `Orbiter` → the `orbiters` layer, not `spacecraft`;
`Major Moon` → `majorMoons`; `Terrestrial`/`Gas Giant` are not layers, so those
fall through to `Planet` → `planets`.

Ours: `LAYERS` and `LAYER_CATEGORIES` in `src/lib/nasa/astronomy.ts`; the label
icon and weight tables in `src/lib/theme/nasa-tokens.ts`.

### Labels

*Status: studied and implemented.*

`LabelManager` fixes both the icon and the collision priority per category:

```js
_iconMap   = { Universe:'no-icon', Galaxy:'no-icon', Star:'no-icon',
               Barycenter:'icon-circle-white-small', 'Landing site':'icon-hexagon',
               Moon:'icon-circle-white-small', Asteroid:'icon-circle-white-small',
               'Dwarf Planet':'icon-circle-white-small', Comet:'icon-circle-white-small',
               Spacecraft:'icon-hexagon', Planet:'icon-circle-' (id appended),
               Default:'icon-circle-white-small' }

_weightMap = { Universe:100, Galaxy:100, Star:100, Planet:50, Spacecraft:30,
               'Dwarf Planet':28, Moon:25, Asteroid:15, Comet:15,
               Constellation:10, 'Landing site':5, Barycenter:0 }
```

Higher weight wins an overlap. A **5 % centre square** is the focus region
(`LabelManager._focusSize = 0.05`), tracked as the quadtree's `__focus` bounds.
Labels get a `<span class="icon …">` then a `<span class="text …">`; the text is
set from `displayName || iauName`. Constellation labels are special-cased by the
`constellation_` id prefix because they have no entity until loaded.

Metrics measured from the live page: 16px planets / 18px Sun, weight 600,
4.8px / 5.4px tracking, white at 0.75, no text-shadow, anchor `(0, 0.5)`.

Ours: `makeLabel` in `src/components/solar-scene.ts`, tokens in
`src/lib/theme/nasa-tokens.ts`.

### Distances and scale

#### The unit formatter — *studied and implemented*

`DistanceManager._getDistanceParams` is the single place NASA turns kilometres
into display text. Transcribed verbatim:

```js
const imperial = this._currentUnitSystem === Imperial;
const lightYear = 9460730472580.8;            // km
let c = imperial ? t * kmToMi : t;
c = Math.max(0, c);
let h = c, prefix = '', scale = '', unit = imperial ? 'mi' : 'km';
const actual = c;
if (t >= lightYear)      { h = t / lightYear; unit = 'light years'; }
else if (c >= 1e9)       { h = c / 1e9; scale = 'billion'; }
else if (c >= 1e6)       { h = c / 1e6; scale = 'million'; }
else if (c >= 1e3)       { h = c / 1e3; scale = 'thousand'; }
else if (c < 1)          { prefix = '~ '; h = imperial ? c * miToFt : c * kmToM;
                           unit = imperial ? 'ft' : 'm'; }
const parts = h.toPrecision(4).split('.');
const dps = parts.length > 1 && parts[1].length > 1 ? 2 : 1;
```

Three details that are easy to get wrong:

1. The light-year test uses the **raw** `t`; every other test uses the clamped
   `c`. A negative distance therefore clamps to 0 downstream but is still
   compared against the light year unchanged.
2. `dps` derives from splitting `toPrecision(4)`, so it is **2 when the fraction
   has more than one digit, else 1**. It is not a fixed 2.
3. In imperial the conversion happens **before** the thresholds, so the
   thousand/million/billion words apply to miles, not kilometres.

Ours: `getDistanceParams` and `formatDistance` in `src/lib/nasa/units.ts`.

#### Scale bookkeeping — *open*

`DistanceManager` also owns near/mid/far plane derivation and the thresholds at
which subsystems appear. Our `applyCamera` derives near/far from `camRadius`
(0.05× / 100×); this still needs checking against the real rule.

### Camera

*Status: partly studied.*

- `CameraManager`, `CameraFollowManager`, `CameraScripts`, `Cameras`,
  `CameraComponent`, `SpoutComponent`.
- Known fact: a focus target must be **copied**, never lerped, or the body drifts
  out of frame behind a constant offset.

---

## Open questions

Tracked here so study stays continuous rather than restarting each session.

1. `DistanceManager`: the exact near/mid/far and subsystem-visibility rules.
   (The unit formatter is done — see above. The plane/scale rules remain.)
2. `LabelManager`: the collision **algorithm** itself (`LabelQuadtree`) and the
   weight-based fade curve. (Icons and weights are done.)
3. `TrailManager`: the full orbit colour table for every body, not just planets.
4. `ConstellationsComponent`: line style and label styling.
5. `Entity`: the complete field list, to drive the unified database.
6. `LayerManager`: the definitive layer→category mapping. **Done.**
7. `AtmosphereComponent`: shell parameters per body.
8. `RingsComponent`: ring shading and the sprite strip convention.
9. `StarfieldComponent`: the six magnitude layers and their thresholds.
10. `ComparisonManager` and `CompareView`: the compare mode.
11. `AppUtils.constants`: `minDate`/`maxDate` and anything else project-wide.
12. Wiring the content database's categories into `catalog.json` so the label
    icon/weight tables and layer resolution actually use them.
