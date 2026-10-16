# Independent controller support

The independent runtime evaluates one clock ET per transaction. Ordinary positions are parent-relative translations along world axes. Parent orientation is not applied implicitly.

`EntityPhase.positionPaths` and `orientationPaths` are alternatives, including repeated visits to a parent. The runtime loads candidate definitions and uses their actual binary coverage and evaluable sample kind. Array index is never treated as a parent-phase index. A failed candidate does not surface as an error when an alternative successfully evaluates. The original singular fields remain supported.

`activeIds` and `setActive(ids)` load the requested subset plus each current parent and orientation-controller target dependency. Catalog entries outside that closure remain selectable and have explicit `inactive` frames. Changing the subset invalidates pending generations, so late completions cannot replace the new selection. Without a filter the original curated scene behavior is unchanged.

`SourceControllerPlan` preserves the supported recovered controller order:

- `fixed` overrides supplied position/orientation, resetting velocity for fixed position.
- `align` first left-multiplies the primary alignment, then left-multiplies the roll around the aligned primary axis. Supported target modes are `point`, `align`, `velocity`, `position`, and `none`. Self velocity alignment reads the provisional evaluated state.
- `rotateByEntityOrientation` rotates local position and velocity and left-multiplies target orientation before parent translation. An omitted target uses the current parent.
- `dynamoOrientation` overwrites orientation with the phase's sampled quaternion at the corresponding source-order location. Legacy definitions without this marker retain their original sampled orientation behavior.
- `spin` supports absolute simulation-time entity orientation, using source angle `rate * (ET - referenceTime) - referenceAngle`. Axis-relative spin right-multiplies; world-axis spin left-multiplies.

Controller coverage is optional and inclusive. Unknown spacecraft attitude stays `null`; no attitude is invented for unsupported source behavior. Supported source alignment may initialize its computation from identity, matching the recovered source, without asserting that identity is a measured spacecraft attitude.

Generic custom controllers, model joint animation, frame-history/real-time spin, ground clamp, position sum, nonzero Dynamo time offsets and incremental Dynamo behavior are outside this implementation. They require separate source-backed work. The independent explorer does not claim full NASA controller or attitude parity.

Evidence: `eyes/src/engine/controllers/{Align,RotateByEntityOrientation,Fixed,Spin,Dynamo}Controller.js` and `eyes/src/engine/core/{Quaternion,Vector3}.js`. CPU tests directly execute the recovered orientation-query method and quaternion multiplication to verify noncommuting rotational order.

A covered fixed-position controller may initialize an entity even when no Dynamo position is available. This initialization is evaluated inside its coverage on every query; its value is never copied into an unconditional catalog fallback. After a release boundary the entity requires its next supported position source. Point alignment uses the position after preceding fixed/rotation controllers.

`allowUnknownOrientation` is an explicit descriptor opt-in for models whose source attitude cannot be evaluated. It permits a ready position with `orientation: null`, including a missing orientation stream; it does not provide an identity attitude. Definitions without this opt-in still require configured Dynamo orientation streams, preserving the curated planetary behavior. The model UI must label unknown attitude.
