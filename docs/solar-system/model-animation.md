# Model articulation

The independent renderer keeps spacecraft body attitude and named model joints separate. `ExplorerBodyDefinition.jointControllers` contains the source declarative joint align controllers; `modelAnimations` contains literal post-creation spin setup recovered by the static catalog compiler. The compiler reads the AST and never executes callback code.

`createModelAnimator(modelRoot, plans, initialTimeEt)` binds named Three.js objects once per model lease. Call `update({timeEt, deltaSeconds, orientation})` after body/joint alignment. `orientation` is the spacecraft source-frame quaternion; `deltaSeconds` is elapsed real seconds. Dispose when releasing the model. A replacement model requires a fresh animator. Copy the glTF loader's clips into `modelRoot.animations`.

## Source semantics

- `eyes/src/engine/controllers/SpinController.js`: absent a reference epoch, rotation uses the signed difference between current and previous simulation ET. `setClampedToRealTime(true)` limits that difference to plus/minus the real frame delta. Pausing ET therefore freezes these joints; fast playback stays visually bounded and reverse playback reverses them. `setUsingRealTime(true)` instead uses real delta regardless of ET. A joint rotation left-multiplies its current local quaternion; optional rotating-position applies the same rotation to its local position. Frame-space axes are transformed by inverse spacecraft attitude before applying to the joint.
- GPM antenna: negative Y, 192 degrees/second, clamped real-time. SMAP arm: positive Y, 87.6 degrees/second. ISS RapidScat: positive Z, 108 degrees/second, ending at ET 524890952; COWVR top: positive Y, 180 degrees/second. CYGNSS radiometers use their literal source rates. These are source configurations, not an invented universal spacecraft spin.
- A reference epoch, if explicitly supplied, follows the recovered controller's absolute elapsed calculation followed by joint premultiplication. No extracted callback currently uses it.
- `ModelAnimateController.js`: a named clip and named joint use simulation ET clamped to the supplied interval. Clip time is `duration * fraction * (firstTrack.times.length - 1) / firstTrack.times.length`. Three.js `AnimationMixer.setTime` supports reverse seeking and paused ET. No catalog registration currently configures this controller, so embedded clips never autoplay merely because they exist.

Diagnostics expose each plan's joint, type, status (`active`, `outside-coverage`, `missing-joint`, `missing-clip`), accumulated spin angle, and clip time. Missing targets never rotate the model root as a fallback.

The extractor intentionally recognizes only direct literal `entity.addController(Pioneer.SpinController)` declarations and direct setup calls in post-create callbacks. Other callback behavior remains preserved as source diagnostics: visibility intervals, nested runtime changes, and custom procedural controllers are not silently executed or claimed as implemented. No NASA assets are mirrored or embedded.

Validation: `npx vitest run tests/solar-model-animation.test.ts tests/solar-scene-catalog.test.ts`; `node tools/compile-solar-catalog.cjs --check`.


## Renderer integration

The model lease wrapper retains `gltf.animations`; a per-lease animator is disposed
before the model resources are released. `updateModelJoints` composes spacecraft
attitude with model-root rotation and joint ancestors, solves source alignment in
world space, then converts the result back to the joint local quaternion. ISS
solar arrays therefore track the actual Sun direction without rotating the whole
spacecraft as a substitute. Joint alignment dependencies are included in runtime
activation. Diagnostics report applied joints, missing names and unavailable targets.
Unit tests cover target changes through rotated ancestors and missing-target behavior.
