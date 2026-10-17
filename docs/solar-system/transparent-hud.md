# Transparent explorer HUD — v0.2.45

The owner explicitly requested a full-window canvas with transparent floating
controls and removal of the on-screen NASA attribution sentence. This overrides
the earlier project requirement to retain that sentence in the footer; README
provenance and third-party notices remain.

The explorer root now positions the rendering workspace across its full extent.
Navigation and time controls are absolute overlays instead of grid rows. The
catalog and diagnostics retain their existing controls but have no panel fill,
blur, or opaque frame. Text shadows help legibility over planetary surfaces.
Approved monochrome logo geometry and theme color tokens remain unchanged.

The catalog has a header toggle so the user can free its entire region. Empty
header, sidebar and timeline container space passes pointer gestures through to
the canvas. Inputs, buttons, lists and expandable ephemeris remain interactive.
The catalog is narrower and its list height is capped; scrolling still reaches
all results and detail controls. Small screens keep the compact horizontal list
and wrapped time controls without reducing canvas dimensions.

Verification: full repository test/check/build pipeline plus a production-browser
check of canvas bounds, transparent overlay styles, catalog toggle, time controls,
and visible scene interaction. Screenshot is saved with the verification record.
