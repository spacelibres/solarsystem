# Original constellation SVG artwork

## Approved direction, 2026-10-20
The user explicitly instructed: stop collecting internet art; generate SVG directly.
This supersedes the external-native-SVG sourcing decision. Retain the approved
fine figurative outlines, transparent sky background, camera-relative celestial
registration, independent Eyes and Explorer switches, and standard IAU names.

## Implementation
Author original editable SVG paths locally, no raster tracing, external images,
network downloads, SVG filters or embedded fonts. Use restrained white contour
and finer interior anatomical/object detail. Figures must depict the named
hunter, lion, flying swan and the other constellation subjects, not just stars.
Keep the 85-image / 88-region grouping already documented (Argo and Ophiuchus).
Existing licensed HIP/J2000 registration metadata remains distinct from the newly
authored artwork. Scientific coordinates are unchanged; artwork has artistic
freedom and must not be called IAU-standard illustrations.

Both adapters consume real SVG-derived triangle geometry. No 512px image
conversion for these vectors. Preserve cancellation, bounded loading, fade and
resource disposal. Document originality and continued metadata attribution.

## Verification
Inspect contact sheets and actual Eyes/Explorer WebGL output. Verify transparent
backgrounds, path-only geometry, catalogue coverage, anchors, retry/disposal,
typecheck, lint, test and production build. Commit only after verification;
release uses the existing webhook, no deployment reconfiguration.
