# Spacecraft ephemeris failures

Verified against NASA runtime responses on 2026-10-17 at ET `845470301`.
Base URL: `https://eyes.nasa.gov/assets/dynamic/dynamo/`.
The six root responses are retained only as small parser test fixtures (11,977 bytes total); application requests still use the exact remote URLs.

| Exact relative URL | Bytes | Cause of previous whole-file rejection |
| --- | ---: | --- |
| `sc_biosentinel/sun/orb/def.dyn` | 748 | Ten orbital records; records 5–9 share terminal ET 883656069.1839341 with differing orbital elements. |
| `sc_europa_clipper/sun/def.dyn` | 1036 | Fourteen orbital records; records 11–13 share terminal ET 953991214 with conflicting fields. |
| `sc_juice/sun/def.dyn` | 3268 | Forty-five orbital records; records 22–44 share terminal ET 994471790 with conflicting fields. |
| `sc_osiris_rex/sun/4/orb/def.dyn` | 4268 | Despite its path, header is `pos`; records 72–75 share terminal ET 924136663 with slightly differing position/velocity fields. |
| `sc_stereo_ahead/sun/orb/def.dyn` | 1612 | Twenty-two orbital records; repeated ET 855698026.8081162 and conflicting interior records 18/19 at ET 914928062.138937. |
| `sc_lucy/quat/def.dyn` | 1045 | V2 index boundaries 11/12 both equal ET 699237092.6664922, creating a zero-duration child 011. |

Record numbers above are zero-based. The orbital sample stride remains 72 bytes, position 56 bytes, quaternion 40 bytes; no layout assumptions were changed.

## Resolution

NASA's recovered `PointSet.getPoints` selects a pair using the original record indices. Equal-time conflicting records represent separate sides of a discontinuity; averaging, sorting, or globally choosing the first/last duplicate changes valid neighboring intervals. The repository now retains raw source indices when conflicts occur, selects the same pair as a fresh source lookup for the requested ET, and validates that selected interval. Its cached window ends before the next distinct selector boundary, so seeks cannot reuse the wrong side. Identical-only duplicates retain the existing lossless coalescing behavior.

V2 index timestamps must be finite and nondecreasing. Repeated boundaries preserve their original child numbering; rightmost matching positive intervals win. V1 explicit interval validation remains strict. Lucy at the current ET correctly requests `sc_lucy/quat/125.dyn`; at the repeated boundary it requests `012.dyn` and does not request zero-duration `011.dyn`.

## Verification and limitations

All six paths now load and evaluate `ready` against live NASA responses at ET 845470301. Live TESS `sc_tess/earth/orb/def.dyn` child 201 and Juno `sc_juno/ori/def.dyn` child 215 also load successfully. Repository regression tests compare selected records directly with recovered NASA `PointSet.getPoints`, cover repeated seeks across the STEREO discontinuity, and prove Lucy child numbering. Targeted repository, domain evaluator and unordered-runtime suites pass (66 tests).

Structural failures, nonfinite fields, descending indices, and source-selected nonpositive sample intervals still fail explicitly. In particular, an exact terminal query at BioSentinel's repeated final ET still selects a zero-duration source pair and is reported as invalid data; a query beyond it reports no coverage. The change does not extrapolate beyond real sample coverage or conceal missing orientation/mission phase coverage.


Cross-check with rolling trails: the STEREO future duplicate boundary at ET
914928062.138937 retains a real approximately 78,191 km source position jump.
Selected windows never interpolate across the conflicting pair, but the current
trail ribbon can still join temporally adjacent windows across that source jump.
Segmented drawing across spatial discontinuities remains separate work; the six
current-time load fixes do not claim to eliminate future source discontinuities.
