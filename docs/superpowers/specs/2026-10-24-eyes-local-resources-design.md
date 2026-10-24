# Eyes complete local runtime resources

## Owner requirement
All files needed by Eyes must be served locally because users in China cannot
reliably reach NASA or Google. This explicit request supersedes the previous
repository rule forbidding a NASA asset mirror. Preserve attribution/provenance.
The cancelled figurative constellation feature must remain absent.

## Design
Store the complete provisioned resource library outside the source/build tree.
Serve it from same-origin /nasa paths with correct media types, byte ranges and
safe path resolution. Missing files return explicit errors without runtime
upstream fallback. Compile local URLs into Eyes output and localize shell CSS,
fonts, UI images/cursors, model dependencies, planet imagery, stars, dynamo
headers/segments and media. Keep local decoder WASM/JS with integrity checks.
Disable external analytics rather than downloading tracking scripts.

Author resumable bounded provisioning with a deterministic manifest, recursive
model/CSS dependency discovery, true dyn index expansion and integrity report.
Bulk downloads may use upstream access during provisioning, never viewer runtime.
Add a strict same-origin resource policy and external-dependency audit. Existing
external attribution/navigation hyperlinks are not auto-loaded resources.

Verify actual resource files, complete manifest coverage, server range/path
handling, production builds and browser runtime with external hosts unavailable.
Document commands, file/byte counts, completeness limitations and deployment.
