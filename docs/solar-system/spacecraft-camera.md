# Spacecraft initial view and body attitude

## v0.2.44: IXPE initial view

The recovered source `eyes/src/engine/core/CameraScripts.js`,
`goToSpacecraft`, normalizes the spacecraft's parent-relative position and
uses that direction as the camera destination offset. The camera therefore
looks inward toward the parent, through the spacecraft. For IXPE this makes
Earth the background. The former explorer instead placed every camera toward
the Sun, with an added global Z offset; it could consequently face empty space.

`src/solar/render/camera.ts` now implements the radial offset and the parent's
orientation Z axis for up. `render-world.ts` applies this rule to the source
spacecraft group in body view and uses the active parent frame when selecting
or resetting the view. Seeking across a mission parent change preserves the
current camera until the user resets it. OrbitControls is recreated when framing because Three
caches the up-axis quaternion at construction; old damping is also discarded.

The recovered IXPE entry in `Unidentified708.js` explicitly applies dynamo
position followed by fixed identity orientation. This is retained. Camera
composition must not be implemented by rotating the satellite mesh toward Earth.

## Boundaries

This change aligns default radial viewing direction and non-solar parent north.
It does not reproduce Eyes' cinematic transition, custom content view offsets,
custom distances, UI-dependent framing, or depth of field. For Sun-parented
missions the explorer still uses global Z up; Eyes uses Earth's dynamo orbital
normal. Those small roll differences remain. Unknown parent orientation falls
back to global Z. Body controllers and joint animations are separate systems;
this correction does not establish that all spacecraft attitudes are identical.

Regression coverage checks Earth-facing offset, parent north, zero-position
body-axis fallback, and IXPE's source fixed identity attitude.

Production browser verification: IXPE opens with the Earth label behind the
model and the Earth surface covering the background rather than the old star
field. At 2026-10-17 02:00:21 UTC the background is a flat dark blue in this
renderer; Earth shading and Eyes' blurred background are not visually matched.
The visible diagnostic reports parent `earth` and quaternion `(0,0,0,1)`.
Screenshot: `artifacts/ixpe-earth-view-v44.png`. Browser warning/error logs empty.
