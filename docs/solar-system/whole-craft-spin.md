# Whole-craft spin: THEMIS regression

The v0.2.42 joint inventory did not cover whole-craft spin. Source
`Unidentified708.js` registers THEMIS A with align(primaryY toward Sun), then
spin(axisY,periodInHours0.0008333), without relativeToTime. Entity-567.js makes
SpinController for every spin registration and calls setReferenceTime only when
that optional property exists. SpinController initializes lastTime from engine
creation time. The previous converter incorrectly required relativeToTime,
turning 122 of129 declared spins into unsupported attitude controllers.

The converter now retains all129 spins. ExplorerRuntime anchors absent reference
epochs to its creation ET and preserves explicitly configured epochs. The absolute
frame solver composes the source axis rotation with the upstream attitude. This
supports continuous current-time rotation, paused frames, reverse time and seeking
without using a wall-clock-only decorative animation. THEMIS A/D/E period is
2.99988 simulation seconds. Reinitializing a runtime resets the phase origin,
as source scene creation does; an absolute orientation phase is not measured data.

Regression tests verify every numeric source spin registration survives compilation
and exercise THEMIS-derived controllers in the actual ExplorerRuntime. The scene
starts with zero spin phase, progresses at the declared angular rate, freezes on
pause and reverses to its starting pose. Explicit source epochs remain unchanged.

The spacecraft inventory includes20 whole-craft spins, alongside65 joint/model
operations. Thirty-seven of221 spacecraft registrations contain one of those
explicit operations. Dynamo orientation and other custom mission controllers are
separate; this correction does not claim identical arbitrary per-controller
cache/update schedules or absolute spin phase for every object/date.


Production verification at normal LIVE1second/second: THEMIS A body and antenna
orientation visibly change with an unchanged camera. DOM-displayed measured
attitudes separated by10.8600000143 ET seconds have shortest quaternion angle
2.38669892856 radians; the declared period predicts2.38670054514 radians.
The difference is about0.00000162 rad, including changing Sun alignment and UI
ET rounding. Two screenshots retain the visibly different mesh directions:
`artifacts/themis-spin-a-v43.png` and `artifacts/themis-spin-b-v43.png`.
Pausing preserved the full displayed position/attitude frame exactly across two
reads; LIVE playback resumed afterwards. Browser error/warn was empty.
