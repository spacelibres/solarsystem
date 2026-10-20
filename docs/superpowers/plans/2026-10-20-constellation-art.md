# Original SVG implementation plan

1. Author original figurative SVGs in three independent batches, sharing a 512px
   frame and contour/detail conventions; no internet sourcing or bitmap tracing.
2. Replace rejected SVGs and provenance, preserve scientific metadata attribution,
   set renderMode=vector, and add independent source/integrity/coverage tests.
3. Run numeric registration/loading/vector tests, inspect rendered contact sheets
   and both actual applications, then resolve visual or performance defects.
4. Refresh source-analysis documents and implementation guide. Run repository
   release checks, commit verified v0.2.67 with annotated tag, push through the
   existing release mechanism if checks pass.

## Verification, 2026-10-20

- [x] 85 original path drawings, 88 IAU names, transparent backgrounds.
- [x] Retain HIP directions; derive independent north-up tangent drawing frames.
- [x] Inspect all three contact sheets and the Orion/Leo/Cygnus browser preview.
- [x] Actual Eyes/Explorer vector rendering, camera motion and no console errors.
- [x] Independent review: no P1/P2 findings.
- [x] npm ci; 550 Vitest tests plus 230 Node checks; npm run check; production build.
- [x] Production Eyes artwork switch loads all drawings without an error status.
Release commit and annotated tag follow these verified checks through the existing GitHub flow; Git history records delivery status.

Artistic silhouettes are project drawings, not official IAU figures or boundary
maps. They use stellar sky patches; anatomy is not asserted to match every star.
