# Source model animation

`tools/compile-solar-catalog.cjs` parses the recovered entity registrations with Babel. It never imports or executes recovered modules. The generated catalog retains source callbacks as diagnostic text and separately extracts the supported model operations. Only recognized animation callbacks are excluded from whole-craft attitude controllers.

The manifest contains 40 model operations on 15 entities: 10 joint spins, 10 keyed Euler rotations, 3 keyed visibility schedules, and 17 interval visibility operations. The five microwave radiometer spins belong to TROPICS 01, 03, 05, 06 and 07.

Keyed rotations reproduce `eyes/src/engine/core/Animation.js`: stable ascending ET keys, linear interpolation of the named Euler component in radians, and first/last value clamping. They do not interpolate quaternions or add a generic spin. Equal-time keys retain source order: the first value wins at exact equality and the last wins immediately afterwards.

Keyed visibility uses the source strict-less insertion rule. A key at ET t takes effect only after t. Interval visibility instead follows `Interval.contains`, including its start and excluding its end. Reverse time seeks reevaluate the keyed schedules and visibility directly.

OSIRIS-REx supplies seven keyed rotations and three keyed visibility schedules. Stardust supplies three keyed rotations from `createCollectionKeyframes`; its single return-array AST is interpreted with literal numeric arguments rather than executing the helper. ISS supplies five `showSubObjectDuringInterval` calls. Coverage enter/exit pairs supply the remaining twelve interval visibility operations for Cassini, Mars 2020, Mars Science Laboratory, Rosetta and Stardust; the static Stardust part-name loop expands to six objects.

The runtime binds each operation to its exact named glTF object. Missing names and clips remain explicit diagnostics. Separate joint alignment controllers are described by `jointControllers`; they are never applied to the whole-craft attitude. Source meshes and textures remain NASA runtime URLs.

Verification: `npx vitest run tests/solar-model-animation.test.ts tests/solar-catalog.test.ts tests/solar-scene-catalog.test.ts`, `node tools/compile-solar-catalog.cjs --check`, and `npx tsc --noEmit`.


## Exact alignment and spin semantics

`model-joints.ts` now follows recovered `AlignController._getOrientation` and
`_getAxis`, including source quaternion multiplication order, q*v*conjugate(q)
vector rotation, projected acos secondary angles and final normalization. The
previous optimized unit-quaternion formulas were not equivalent during intermediate
primary-none calculations. Parent basis is craft attitude * model rotation * joint
ancestors; the solved world orientation is converted back into joint-local space.
The wrapper introduced by our loader has identity rotation; its glTF scene child
holds the source model rotation. Coverage excludes its ending ET.

`solar-joint-source.test.ts` executes the recovered CPU methods on every catalog
joint align plan under nine changing craft/model/ancestor configurations, rather
than comparing only against hand-written expected angles. Spin comparison covers
both axis reference frames, signed ET differences, real-time clamping and local
position rotation. Model release disposes its mixers before GPU resources.

Absent a reference epoch, SpinController integrates signed ET differences. Source
`clampedToRealTime` limits that delta to elapsed real seconds; paused simulation
therefore stops these scanners, while reverse playback reverses them. The separate
`usingRealTime` option continues with real seconds even if simulation time pauses.
Do not replace either with a universal automatic spacecraft spin.

Named glTF clip support retains GLTFLoader animations and uses the recovered
ModelAnimateController ET-to-clip mapping, including the first track sample-count
correction. The checked-in entity registrations do not call setAnimation; embedded
clips are therefore not automatically played just because a file contains them.

The [complete spacecraft inventory](articulation-inventory.md) is deterministic
and can be checked with `node tools/audit-solar-articulation.cjs --check`.


## Mission-frame aliases required for historical articulation

The mission phase parent is an entity ID, not necessarily its dynamo folder.
`scene-catalog.ts` maps eight verified source aliases only when matching already
registered controller URLs: 101955_bennu/bennu, 99942_apophis/apophis,
4_vesta/vesta, 1_ceres/ceres, 134340_pluto/pluto, 486958_arrokoth/mu69,
617_patroclus_barycenter/617_patroclus and sc_galileo/galileo. No asset URL is
invented and unrelated reference frames are not merged as a fallback.

Without this correction OSIRIS at ET656501483.184 was missing-local and invisible,
so model diagnostic state from an earlier visible date could not prove animation
at the requested time. The exact NASA `sc_osiris_rex/bennu/pos/def.dyn` response
loads segment153 with interval [656487034.2922817,666935167.3910428]; the phase
selection regression first failed and then passed with the corrected mapping.


`solar-keyed-source.test.ts` additionally executes the original Animation helper,
original Sort, and original MathUtils for all ten keyed rotations and three keyed
visibility schedules. It compares each real source key, both sides of the key,
all interval midpoints and reverse traversal against the production animator.

## Production picture validation

At UTC2020-10-20 21:30:14 (ET656501483.184) and 21:34:14
(ET656501723.184), OSIRIS-REx has valid measured body attitude and a Bennu-relative
position. With an unchanged camera, the actual decoded NASA model visibly changes
its solar-array gimbals. Base angles change from -1.219857156 to0 radians; right
and left pivot angles reach +0.663225116 and -0.663225116 radians respectively.
Captured pictures: `artifacts/osiris-gimbal-before-v42.png` and
`artifacts/osiris-gimbal-after-v42.png`. This validates those visible meshes;
the all-spacecraft declaration inventory and CPU differentials cover the wider
configuration surface, not every object/date/GPU image combination.
