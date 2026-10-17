# Eyes branding

The owner requested spacelibre branding for the recovered application in v0.2.49.
The loading screen, breadcrumb and menu use approved white SVG masters. Narrow
viewports use the white icon master. Monochrome artwork is never recoloured.

Browser, Apple touch and install icons are the official published VI assets,
copied without modification into `eyes/shell/brand/`. `sources.json` records
their upstream URLs and SHA-256 digests from https://github.com/spacelibres/vi.
The shell owns its web manifest, preload and social metadata; the regular build
copies them into both standalone and Next-hosted output.

Application prefix, suffix, breadcrumb title and menu branding text are the only
four runtime string changes. The original semantic baselines remain unchanged:
`tools/lib/branding-contract.cjs` restores exactly those approved object literals
in test inputs and rejects missing or duplicate matches before hashing. It does
not run in the application. Navigation, camera, data and control glyphs retain
their existing behavior. NASA data attribution and third-party notices remain.

`tests/eyes-branding.test.ts` verifies local icon references, official monochrome
masters, packaged output and loading/navigation/menu markup. Browser inspection
also checks the actual rendered header and menu; this is branding verification,
not a claim of full NASA runtime equivalence.
