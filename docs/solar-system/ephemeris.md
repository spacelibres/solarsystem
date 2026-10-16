# Independent ephemeris evaluator

`src/solar/domain/ephemeris.ts` evaluates an `EphemerisWindow` at one ET value without DOM, Three, network, caches or recovered runtime imports. Input vectors use km and km/s; angular velocity uses radians/s. The existing dependency-free binary parser adapts disk **w/x/y/z** into named quaternion fields. The evaluator never reinterprets their object property order.

`evaluateEphemeris(window, timeEt, { body })` returns either a ready position/velocity, a ready orientation/angular velocity, or an explicit unavailable reason. `body` is optional; absent means relative orbit, 1 multiplies by μ2/(μ1+μ2), and 2 multiplies by −μ1/(μ1+μ2). Default absent gravity values preserve the recovered source defaults. Invalid requested mass ratios are rejected.

The window includes its original header, readonly sample list, actual coverage interval and path/segment provenance. It requires at least two finite, strictly ordered, same-kind samples. Evaluation only occurs in the intersection of window coverage and sample coverage; neither stale fallback nor extrapolation is performed. Query endpoints are accepted. At an interior sample time, the following bracket is selected; at the final sample, the last bracket is selected. Inputs are never mutated.

| Type | Evaluation |
| --- | --- |
| `pos` | Cubic Hermite position and the same polynomial's derivative with respect to ET. |
| `lin` | Clamped linear position and segment secant velocity. |
| `quat` | Shortest-path quaternion SLERP, with the recovered 0.9995 linear threshold; zero angular velocity. |
| `ori` | Project both endpoint quaternions by `q * conjugate(axisAngle(ω, Δt))`, then SLERP. Direction-and-magnitude SLERP the angular velocities, negate, then rotate by the resulting orientation. |
| `orb` | Project both endpoint orbital elements to the query ET, linearly mix the resulting positions and velocities, and apply the selected barycentric scale. |

Orbital projection uses `M0 + n*(time−epoch)`, wrapping only elliptic mean anomaly to [−π, π). The recovered convention uses a **positive semi-major-axis magnitude for hyperbolas**. The Newton solver retains its source limit of 20 iterations and correction threshold of 0.00174532925 rad so existing results remain numerically comparable; this is a source-compatibility choice, not a new precision guarantee. Parabolas, negative eccentricity, nonpositive axes, nonconvergence and nonfinite projected states return `unsupported-orbit`.

Deliberate stricter behavior: zero or nonfinite quaternions are rejected, valid quaternions are normalized before calculations, duplicate/unordered/nonfinite samples are rejected, and arithmetic overflow cannot produce a ready result. Exactly opposite angular-velocity directions have no unique spherical interpolation path; vectors with normalized dot product below −1+1e−12 use componentwise linear interpolation. This avoids the original singular division by sin(π). Other source angular-vector thresholds are retained. Invalid numeric inputs return `invalid-samples`; finite times beyond available coverage return `out-of-range`.

The mathematical evidence is the checked-in `DynamoController` point classes and `OrbitalElements`, `Quaternion` and `Vector3` methods under `eyes/src/engine/`. `tests/solar-ephemeris.test.ts` executes those actual recovered pure class bodies in an isolated Node VM with their real core math and pool dependencies; browser imports are stripped only in this test reference. Synthetic tests cover all five types, Hermite derivatives, multiplication direction, both orbital endpoints, barycentric velocity, ellipse/hyperbola, boundary and invalid-data behavior. Earth/Mercury/Jupiter orb and Earth ori fixture tests compare 80 query cases, including interpolated velocities and angular velocities. No NASA media assets are copied.

Normalization divides by the largest absolute component before measuring length. This preserves the rotation of subnormal and huge finite quaternions even when their original Euclidean norm rounds or overflows. Angular-vector directions use the same scaling, avoiding reciprocal overflow for tiny finite angular velocities.

TDD record: the first targeted run failed because `src/solar/domain/ephemeris` did not exist. Review regressions subsequently demonstrated two failures: a subnormal quaternion changed the circular orbit's rotation, and `1e−310` angular velocity returned unavailable. The normalization fixes make all 17 targeted tests pass; focused strict TypeScript also passes. Final ESLint verification is part of the foundation's sequential release checks. These CPU checks do not establish full catalog coverage, incremental controller semantics, rendering parity or high-precision astronomical accuracy.
