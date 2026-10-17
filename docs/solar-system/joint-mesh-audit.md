# NASA joint hierarchy audit

Audited 2026-10-17 against exact NASA glTF URLs from the checked-in catalog. No NASA binary buffers or texture library were downloaded or committed.

## Scope and evidence limits

The v0.2.41 hierarchy harness fetched each JSON document into memory and passed its scenes, nodes, names, TRS and mesh primitive counts through the installed official GLTFLoader. Geometry primitives were replaced with empty attributes and texture/buffer dependencies removed. Consequently the numerical results prove controller propagation into real NASA mesh-node world matrices, **not decoded vertex deformation, rendered pixels, visibility at an actual ephemeris date, or camera composition**. Source target frames were synthetic and deliberately different at ET 0 and 0.125; spin elapsed real time was 0.125 seconds.

The harness invokes production updateModelJoints and createModelAnimator, then compares descendant mesh matrixWorld elements after updateMatrixWorld(true). It does not infer motion from diagnostic angles. Original source data and output remain in ignored artifacts/joint-audit/.

## Binding result

All 35 formerly compiled bindings (25 align, 10 spin) across 15 craft resolve. Every bound object has at least one descendant mesh (including itself where appropriate), and every such mesh matrix changes between the two harness frames. None of these 15 NASA JSON documents declares a skin or duplicate raw node name. No missing names, meshless pivots, or frozen matrixAutoUpdate flags explain the current gap.

| Craft | Binding mesh counts (changed/total) | Largest world matrix element delta |
| --- | --- | --- |
| sc_danuri | array_01: 2/2; array_02: 2/2 | 1.366359 |
| sc_galileo | spinning_section: 7/7 | 0.03925982 |
| sc_gpm | GPM_antenna: 5/5 | 0.4037567 |
| sc_iss | 20_P4_Truss: 25/25; 23_S4_Truss: 25/25; 20_P4_Truss_01: 3/3; 20_P4_Truss_02: 3/3; 32_S6_Truss_01: 3/3; 32_S6_Truss_02: 3/3; 23_S4_Truss_01: 3/3; 23_S4_Truss_02: 3/3; 08_P6_Truss_01: 3/3; 08_P6_Truss_02: 3/3; RapidScat_dish: 1/1; COWVR_top_spin: 7/7 | 2.942796 |
| sc_noaa_20 | Part__Panel_011001: 6/6 | 1.366359 |
| sc_noaa_21 | Panels_Lo_Res002_Cylinder001: 2/2 | 1.366359 |
| sc_psyche | ArrayGimbleLeft: 5/5; ArrayGimbleRight: 5/5 | 1.698081 |
| sc_rosetta | panels_01: 3/3; panels_02: 3/3 | 1.366359 |
| sc_smap | arm_etc: 12/12 | 0.2304266 |
| sc_trace_gas_orbiter | right_array_1: 9/9; left_array_1: 9/9 | 1.366359 |
| sc_tropics_01 | solar_rotate: 12/12; microwave_radiometer: 7/7 | 1.430955 |
| sc_tropics_03 | solar_rotate: 12/12; microwave_radiometer: 7/7 | 1.430955 |
| sc_tropics_05 | solar_rotate: 12/12; microwave_radiometer: 7/7 | 1.430955 |
| sc_tropics_06 | solar_rotate: 12/12; microwave_radiometer: 7/7 | 1.430955 |
| sc_tropics_07 | solar_rotate: 12/12; microwave_radiometer: 7/7 | 1.430955 |

## Name lookup semantics

Recovered BaseComponent.getThreeJsObjectByName scans the flattened scene tree in preorder for exact object.name. Three Object3D.getObjectByName recurses in the same preorder. Both the recovered GLTFLoader and official loader call PropertyBinding.sanitizeNodeName and createUniqueName, and retain the original name in userData.name. Thus a raw JSON name mismatch is not evidence of a runtime missing joint. For example ISS raw "20 P4 Truss" becomes "20_P4_Truss"; NOAA-20 raw "Part__Panel_011.001" becomes "Part__Panel_011001". The configured names correctly address the loaded names. All audited controlled objects have matrixAutoUpdate=true in the current official loader. Recovered ModelComponent deliberately sets false and recovered controller utilities update matrices explicitly; this flag must be interpreted with its controller path.

## Custom animation bindings omitted by the old compiler

These exact source bindings also resolve in official GLTFLoader. They were not part of the old 35 compiled plans and require the custom keyed rotation/visibility pipeline. These rows are static binding evidence only.

| Craft | Binding | Mesh descendants |
| --- | --- | --- |
| sc_osiris_rex | Tagsam_rod_bottom | 3 |
| sc_osiris_rex | Tagsam_rod_top | 2 |
| sc_osiris_rex | tagsam_head | 1 |
| sc_osiris_rex | Gimbal_Base_Right | 6 |
| sc_osiris_rex | Gimbal_Base_Left | 6 |
| sc_osiris_rex | Gimbal_Pivot_Right | 5 |
| sc_osiris_rex | Gimbal_Pivot_Left | 5 |
| sc_osiris_rex | Tagsam_housing_cover | 1 |
| sc_osiris_rex | heatshield | 1 |
| sc_stardust | Stardust_capsule | 2 |
| sc_stardust | Stardust_Sample_Collection1 | 2 |
| sc_stardust | Stardust_Sample_Collection2 | 1 |
| sc_stardust | Stardust_tex_01_c | 1 |
| sc_stardust | Stardust_tex_02_c | 1 |
| sc_stardust | Stardust_tex_03_c | 1 |
| sc_stardust | Stardust_tex_02_c2 | 1 |

## Catalog coverage

The catalog has 221 spacecraft entries. 17 have one of the audited source articulation patterns; 204 have none of these patterns. This is an inventory of explicit recovered controller/custom-helper declarations, not a claim that every other craft is physically rigid. Whole-craft attitude, dynamo orientation, mission-specific behavior and embedded clips are separate mechanisms.

## Exact JSON source URLs

- https://eyes.nasa.gov/assets/static/models/sc_danuri/danuri.gltf
- https://eyes.nasa.gov/assets/static/models/sc_galileo/galileo.gltf
- https://eyes.nasa.gov/assets/static/models/sc_gpm/GPM.gltf
- https://eyes.nasa.gov/assets/static/models/sc_iss/ISS_stationary.gltf
- https://eyes.nasa.gov/assets/static/models/sc_noaa_20/noaa20.gltf
- https://eyes.nasa.gov/assets/static/models/sc_noaa_21/noaa21.gltf
- https://eyes.nasa.gov/assets/static/models/sc_psyche/psyche.gltf
- https://eyes.nasa.gov/assets/static/models/sc_rosetta/rosettaPhilae.gltf
- https://eyes.nasa.gov/assets/static/models/sc_smap/SMAP.gltf
- https://eyes.nasa.gov/assets/static/models/sc_trace_gas_orbiter/TGO.gltf
- https://eyes.nasa.gov/assets/static/models/sc_tropics/tropics.gltf
- https://eyes.nasa.gov/assets/static/models/sc_osiris_rex_v2/osiris_rex_articulated_panels.gltf
- https://eyes.nasa.gov/assets/static/models/sc_stardust/stardust_articulated.gltf

## v0.2.42 CPU comparison

The source-exact joint solver now has differential tests executing the recovered
AlignController and SpinController methods. All catalog align plans are exercised
under nine craft/model/ancestor rotations, including primary-none secondary-axis
cases that differed in the previous solver. Hierarchy matrix deltas above record
the earlier v0.2.41 audit; they are not new GPU pixel measurements. See the complete
[221-spacecraft configuration inventory](articulation-inventory.md).
