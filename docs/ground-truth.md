# Ground truth from the running app

Values read **live** from the fully cloned NASA Eyes, running offline on
`http://localhost:8099` (see `docs/offline-mirror.md`). Everything here is
measured, not inferred — each section names the probe that produced it.

```bash
python3 -m http.server 8099 --directory data/mirror/site   # keep this running
node tools/probe-app.cjs entities      # scene entities and their components
node tools/probe-app.cjs layers        # live LayerManager state
node tools/probe-app.cjs labels        # label DOM and computed styles
node tools/probe-app.cjs errors        # JS exceptions with stacks
node tools/probe-app.cjs eval "<expr>" # anything else
```

The app boots with **zero application errors**. The only exception in the
console comes from NASA's own analytics script (`dap.digitalgov.gov`), which is
loaded by `index.html` and is unrelated to the viewer.

## Boot scene: 45 entities

`probe-app.cjs entities` — NASA loads **45 entities at boot**, not 844. This is
deliberate: bodies are added contextually as you navigate, and the rest live in
the content database. Our 45-body boot is therefore correct, not a shortfall.

The boot set is:

- `camera` — a real entity, with `CameraComponent`, `LightSourceComponent`,
  `DynamicEnvironmentMapComponent`.
- `observable_universe` (extents 5e23), `milky_way` (1e18), `sun` (695500).
- The eight planets, plus `moon`.
- Spacecraft with trails: `sc_europa_clipper`, `sc_juice`, `sc_pioneer_10/11`,
  `sc_voyager_1/2`, `sc_lucy`, `sc_new_horizons`, `sc_osiris_rex`,
  `sc_osiris_rex_src`, `sc_psyche`, `sc_biosentinel`,
  `sc_parker_solar_probe`, `sc_stereo_ahead`.
- Small bodies: the Lucy targets (`52246_donaldjohanson`, `3548_eurybates`,
  `15094_polymele`, `11351_leucus`, `21900_orus`, `617_patroclus_barycenter`,
  `152830_dinkinesh`), `134340_pluto` and its barycentre, `charon`,
  `486958_arrokoth`, `101955_bennu`, `99942_apophis`, `16_psyche`, `triton`.
- `c_2025_n1` — a comet, with three `CometTailComponent`s.
- `follow_sum_parent` — a component-less helper entity.

## Component assignment — the real table

`probe-app.cjs entities`, component names per entity:

| entity | components |
|---|---|
| `sun` | Div, Spheroid, SpheroidLOD, LightSource, Atmosphere, Sprite, **Starfield ×7**, Model |
| `mercury` | Div, Spheroid, SpheroidLOD, OrbitLine |
| `venus` `earth` | Div, Spheroid, SpheroidLOD, Atmosphere, OrbitLine |
| `mars` | Div, Spheroid, SpheroidLOD, Atmosphere, **Spheroid**, OrbitLine |
| `jupiter` | Div, Spheroid, SpheroidLOD, Atmosphere, OrbitLine |
| `saturn` `uranus` `neptune` | Div, Spheroid, SpheroidLOD, **Rings**, Atmosphere, OrbitLine |
| `moon` | Div, Spheroid, SpheroidLOD, OrbitLine |
| spacecraft | Div, **Trail**, Model |
| Pluto, Charon, Triton, Ganymede | Div, Trail, Spheroid, SpheroidLOD |
| comet | Div, Trail, Model, **CometTail ×3** |

Consequences for us:

1. **`OrbitLineComponent` exists on exactly the eight planets and the Moon.** We
   already match this.
2. **`AtmosphereComponent` exists on eight bodies only** — Sun, Venus, Earth,
   Mars, Jupiter, Saturn, Uranus, Neptune. **Mercury has none.**
3. **Mars carries two `SpheroidComponent`s** (surface + atmosphere shell).
4. **Spacecraft and small bodies get trails, not orbit lines.** We have no trail
   system yet.
5. Comets carry three tail components.

## Atmosphere parameters

`probe-app.cjs eval` over every `AtmosphereComponent`. Fields are
`_density`, `_scaleHeight`, `_emissivity`, `_color`, `_sunBrightness`,
`_sunsetColor`, `_sunsetIntensity`.

| body | density | scaleHeight | emissivity | color (r,g,b) | sunBrightness | sunsetColor | sunsetIntensity |
|---|---|---|---|---|---|---|---|
| sun | 8e-7 | 200000 | 1 | 1, 1, 0.251 | 1 | 1,1,1 | 0 |
| venus | 0.001 | 15 | 0 | 0.835, 0.627, 0.369 | 0.25 | 1,1,1 | 0 |
| earth | 0.0015 | 8 | 0 | 0.841, 1.047, 1.5 | 2 | 1, 0.5, 0 | 1.2 |
| mars | 0.001 | 10.8 | 0 | 0.882, 0.698, 0.439 | 0.8 | 0.039, 0.294, 0.549 | 1 |
| jupiter | 5e-5 | 200 | 0 | 0.918, 0.792, 0.667 | 0.25 | 1,1,1 | 0 |
| saturn | 5e-5 | 200 | 0 | 0.918, 0.792, 0.592 | 1 | 1,1,1 | 0 |
| uranus | 5e-5 | 200 | 0 | 0.576, 0.718, 0.788 | 1 | 0.643, 0.659, 0.4 | 1 |
| neptune | 5e-5 | 200 | 0 | 0.541, 0.627, 1.0 | 1 | 1,1,1 | 0 |

Note Earth's and Neptune's blue channels exceed 1 (1.5 and 1.0) — NASA tints the
shell beyond unity and lets it clip, which is why Earth's limb reads brighter
than a plain alpha shell.

## Sun components in detail

`probe-app.cjs eval` on `scene.getEntity('sun')`:

- **Seven starfields**, not six: `galaxies.0.bin` then `stars.0.bin` … `stars.5.bin`.
  We currently load only `stars.0–5` and therefore miss the galaxy layer.
- The glow is `SpriteComponent` on `$STATIC_ASSETS_URL/sprites/sun_glow.png` with
  `_sizeUnits: "pixels"`, `_transparent: true`, **`_blending: "normal"`** (not
  additive), `_billboard: true`, **`_renderOrder: -2`**.
- Surface is a `SpheroidLODComponent` with `_mapping: "cube"`, `_numFaces: 6` —
  a cubemap, not an equirectangular texture.
- The heliosphere is `ModelComponent` on
  `models/heliosphere/voyager_heliosphere.gltf`, `_enabled: false` at boot,
  `_modelRadius: 1455.12`, `_environmentIntensity: 0.5`.

## Where this leaves the replica

### Fixed against this document

1. **Seventh starfield layer.** `sun` carries **seven** `StarfieldComponent`s, not
   six: `galaxies.0.bin` plus `stars.0–5`. We were loading only the six stellar
   layers and missing the galaxy layer entirely. All seven now load, at NASA's
   `renderOrder -2`.
2. **Sun glow.** Was additive and kilometre-scaled; NASA uses **normal**
   blending, pixel units, `renderOrder -2`, and it must follow the Sun (ours was
   added to the scene and never repositioned, so it sat at the origin).
3. **Atmospheres.** Now a direct port of `AtmosphereComponent`'s real GLSL —
   see `src/lib/scene/atmosphere.ts` and `deobf/atmosphere.frag.glsl`. The shell
   is drawn at `radius + scaleHeight * 20` on NASA's 64 × 129 lat/lon grid, and
   the eight bodies' parameters are the measured ones below. Mercury has none.
4. **Cloud shell.** Earth's `decal` map was being dropped whenever a body also
   had an atmosphere, which is every planet with clouds. The two are independent.
5. **Surface resolution.** The preferred texture size was 1024; NASA ships
   `[16, 512, 4096]` and the reference is visibly sharper at 4096.
6. **Trails.** Implemented. Everything without an orbit line gets a trail; the
   colour table is separate from the orbit-line table and differs for several
   bodies; `trail.length` and `trail.color` come from the entity table.
7. **Starfield brightness and density.** See the dedicated section below — this
   was a float32 precision failure, not a styling choice.

### The starfield: a float32 wall, twice

Two separate bugs, both from the same cause.

**Wrong shader language.** The ported star shader used GLSL3 syntax (`in`/`out`)
while `ShaderMaterial` defaults to GLSL1, where `attribute`/`varying` are
required. The program still *linked* — three.js reported no error, no exception
was thrown, and the draw call was issued — but nothing appeared. Only reading
`gl.getProgramParameter(program, LINK_STATUS)` and checking the active attribute
count made it obvious.

**float32 cannot hold a star position.** The files store real parallax
coordinates, 4.16e13 to 3.09e20 km. Uploaded raw, `normalize()` in the shader
loses the direction entirely to rounding (7 significant digits against a 1e19
magnitude) and the projection produces NaN, so the whole field vanishes. This is
the same limit the 1.2e18 km Milky Way quad hit. The fix: normalise on the CPU in
float64, place the directions on a fixed shell at `STAR_SHELL_KM = 1e12`, and
carry the *true* distance in a separate attribute so the flux term stays physical
— which is what keeps near stars brighter than far ones.

`gl_Position.w = viewPosition.y` from NASA's shader is **not** used: it divides by
a signed component, which clips half the sky and, with a far plane derived from
the orbit radius, discards everything. The shell plus a normal perspective
projection reproduces the same pinned-to-the-sky look without that fragility.

### Scene-graph rules

*Status: transcribed from `SceneManager` and applied.*

`tools/audit-scene-rules.cjs` extracts these from the bundle so they can be
re-checked after a NASA update.

| rule | NASA | previously ours |
|---|---|---|
| scene ambient light | `Color(.005,.005,.005)` — essentially black | `0.16`, 32× too bright |
| subsystem visibility | `(systemRadius ‖ 25·radius ‖ 25·extentsRadius) / parentExtentsRadius × parentPixelExtents >= 20` | only a bare pixel check |
| child extent fallback | when there is no `systemRadius`, the visual system is **25 radii** across | used the radius itself |
| per-component visibility | the `trails` layer gates `TrailComponent`, `labels` gates `DivComponent`, everything else by type | per-entity only |
| Sun exemption | `"sun" !== s.getName()` — the Sun never responds to a layer toggle | none |
| starfield count | `for (let e = 0; e < 7; e++)` | we load 7 correctly |
| heliosphere owner | `sun.getComponent(ModelComponent)` | correct |
| constellation lines | `Color(.35, .7, 1, .5)`, labels `(.35, .7, 1, 1)`, highlight width `2.5` | colour right, alpha missing |
| HD breakpoints | `_hdBreakpointSize 512`, `_maxTextureSize 4096`, `_mobileTextureSize 1024` | 4096 used |
| HD categories | `Planet`, `Moon`, `Dwarf Planet`, `Star` | — |

The **25× radius** fallback is the subtle one: it is what lets a moon system appear
while its planet subtends only a few pixels, long before the planet fills the
screen. Using the radius directly would pop in every moon far too late.

The ambient light matters more than it looks: at `0.16`, night sides were lit
enough that the terminator was invisible and every body looked flat. NASA relies
almost entirely on the Sun's `LightSourceComponent`, which is why its phases read
sharply.

### Constellations

*Status: implemented.*

`src/lib/scene/constellations.ts` decodes all **88** IAU constellations from
`stars/constellations.bin` and draws them as `LineSegments` on the same sky shell
the starfield uses, so the two register with each other. The decoder round-trips
exactly — it consumes all 10,952 bytes — which is the check that the record layout
is right. The layer is **off** by default, matching `addLayer`.

### Camera — NASA's real model

*Status: the FOV and plane rules are transcribed and applied.*

From `CameraComponent.__update` and its defaults:

```js
_fieldOfView     = 1.0471975512              // 60 degrees, applied HORIZONTALLY
autoNearDistance = max(1e-5, 0.1 * (|cameraPos| - parentExtentsRadius))
autoMidDistance  = min(1e4 * autoNearDistance, |cameraPos| + 10 * parentExtentsRadius)
```

Three mistakes this corrected:

1. **The field of view was 42° vertical.** NASA ships 60° **horizontal**, and
   derives the vertical angle from the aspect ratio. At the reference's 1.7525
   aspect that is 0.6365 rad = 36.5°, not 60°. three.js takes a vertical angle, so
   the two cannot be equated — `verticalFovForHorizontal` does the conversion, and
   a test reproduces the reference's exact value.
2. **The near and mid planes were invented** as `0.05×` and `100×` the orbit
   radius. NASA's are `0.1 × (distance − parentExtentsRadius)` and
   `min(1e4 × near, distance + 10 × parentExtentsRadius)`. Our near plane was
   therefore about twenty times too far out.
3. **Framing used `radius × 6`.** NASA uses
   `max(minDistance, 1.2 × equatorialRadius)` or an auto-fit of the whole child
   system (`Cameras.getDistanceToFitEntities`), floored by
   `CameraScripts._customSystemDistances` — a per-body table
   (`mercury 425648, venus 862136, earth 1040264, mars 8e4, jupiter 7157638,
   saturn 4869142, uranus 1886367, neptune 2407045`, plus the dwarf planets)
   which is a **minimum**, not the framing distance.

The system presets are NASA's too: `inner_solar_system` is `distance 7e8,
angle 25, planeId earth`; `outer_solar_system` is `distance 1e10, angle 25`.
Zoom is exponential (`2^(delta · sensitivity)`, sensitivity 0.05, smoothed with
`lerp(…, 0.8)` clamped to `[0.8, 1.25]`) and measures distance **from the parent's
surface**, not its centre (`max(|offset| - groundRadius, 0)`).

### The starfield must move with the camera

The starfield and constellations are now **unit spheres scaled every frame** to a
fixed fraction of the orbit radius (`STAR_SHELL_CAMERA_FRACTION = 0.5`), with the
object following the camera position. That is what keeps the sky in sync with the
solar system at every zoom.

Baking a fixed radius into the geometry was the bug: once the camera passed it,
the stars slid inward and then vanished. NASA solves the same problem inside its
shader with `gl_Position.w = viewPosition.y`, which divides by a signed component
and clips half the sky — it is why we had to drop that line for the starfield, and
scaling on the CPU achieves the same result without the fragility.

Brightness is unaffected by the scaling because the true parallax distance rides
in its own `distance` attribute rather than being read back from the transformed
position.

### Still open

8. **Comet tails — geometry done, shader not yet drawing.**
   `src/lib/scene/comet-tail.ts` reproduces `CometTailComponent` faithfully:
   three instances per comet (white dust at `starAccelerationMultiplier` 1,
   blue-grey ion at 10, single-particle coma at 0), an instanced unit quad with
   `originTime` / `originPosition` / `accelerationMultiplier`, NASA's vertex and
   fragment GLSL including the `deltaTime^1.5` integration, the view-space stretch
   and the `sqrt(1 - sqrt(deltaTime / timeLength))` fade, and the 40,000 km
   near-field cull. Verified live: nine tails exist across three comets with the
   right instance counts, the shader program links with all four attributes
   active, `originPosition` carries the comet's heliocentric position, and the
   computed model position is ~1.9e6 km — a visible streak.

   **What is still wrong: nothing renders.** Since the program links and the
   uniforms are right, the remaining suspects are the `gl_Position.w = viewPosition.y`
   line NASA relies on (which we had to drop for the starfield, and which clips
   half the quad here since `w` is a signed component) and the fact that the mesh
   is placed at the world origin while `positionOfEntity` is only used for the
   stretch direction. Next step: replace the `w` assignment with a normal
   perspective projection and position the mesh at the comet, as was done for the
   starfield.
9. **The `camera` entity** and its `DynamicEnvironmentMapComponent`.
10. **Body orientation.** `entityOrientation` in the scene returns the identity
    because no `.ori` controller is loaded, so the atmosphere shader integrates in
    the unrotated frame.
11. **Mars' second spheroid** (the atmosphere shell is a separate spheroid).
12. **Constellation labels.** NASA adds a `constellation_label_<name>` entity per
    constellation with its own label weight and hover highlight; we draw the lines
    only.

## Comparison method

`tools/capture-ref.cjs` screenshots the reference for side-by-side comparison:

```bash
node tools/capture-ref.cjs "#/earth" /tmp/ref-earth.png
```

It hides only the UI chrome (`#ui`, `#dynamic-ui`, the loading screen) and keeps
`#pioneer`, which is the WebGL canvas. Hiding `#pioneer` produces a blank image —
that mistake cost a round here.
