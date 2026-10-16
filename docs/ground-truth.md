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
   layers and missing the galaxy layer entirely. Now loaded, with NASA's render
   orders (`galaxies` at -4, stars at -2).
2. **Sun glow.** Was additive and kilometre-scaled; NASA uses **normal**
   blending, pixel units, `renderOrder -2`, and it must follow the Sun (ours was
   added to the scene and never repositioned, so it sat at the origin).
3. **Atmospheres.** Now a direct port of `AtmosphereComponent`'s real GLSL —
   see `src/lib/scene/atmosphere.ts` and `deobf/atmosphere.frag.glsl`. The shell
   is drawn at `radius + scaleHeight * 20` on NASA's 64 × 129 lat/lon grid with
   `gl_Position.w = viewPosition.y`, and the eight bodies' parameters are the
   measured ones below. Mercury correctly has none.
4. **Cloud shell.** Earth's `decal` map (`earth/cloud_$SIZE_$FACE.png`) was being
   dropped whenever a body also had an atmosphere, which is every planet with
   clouds. The two are independent in NASA and are now independent here.
5. **Surface resolution.** The preferred texture size was 1024; NASA ships
   `[16, 512, 4096]` and the reference is visibly sharper at 4096.

### Still open

6. **Trails.** Spacecraft and small bodies get a `TrailComponent`, not an orbit
   line. We have no trail system.
7. **Comet tails.** Three `CometTailComponent`s per comet.
8. **Mars' second spheroid** (the atmosphere shell is a separate spheroid).
9. **The `camera` entity** and its `DynamicEnvironmentMapComponent`.
10. **Body orientation.** `entityOrientation` in the scene currently returns the
    identity because no `.ori` controller is loaded; the atmosphere shader is
    therefore integrated in the unrotated frame.

## Comparison method

`tools/capture-ref.cjs` screenshots the reference for side-by-side comparison:

```bash
node tools/capture-ref.cjs "#/earth" /tmp/ref-earth.png
```

It hides only the UI chrome (`#ui`, `#dynamic-ui`, the loading screen) and keeps
`#pioneer`, which is the WebGL canvas. Hiding `#pioneer` produces a blank image —
that mistake cost a round here.
