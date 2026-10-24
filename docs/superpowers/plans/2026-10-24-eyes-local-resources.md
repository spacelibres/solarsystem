# Eyes local resource execution plan

1. Audit source/runtime external resources and existing mirror/downloader coverage.
2. Build local URL mapping and disk-only asset serving with path/range tests.
3. Build deterministic resumable provisioning, discover recursive dependencies,
   expand real dyn windows and download all required files outside the repo.
4. Localize shell and compiled resources, remove external tracking, enforce and
   audit same-origin runtime policy. Never restore cancelled constellation art.
5. Validate inventory and actual browser interactions (initialization, planets,
   satellites, spacecraft, stories/time), then run full release verification.
6. Record verified file/byte counts, provision/deployment instructions, bump patch,
   commit/tag/push only after the intended result has been verified.

## Release 0.2.69 boundary

The owner clarified that the existing VPS download must be reused rather than
requiring a highest-resolution global tile library. This release delivers the
local serving/build/provisioning infrastructure and reuses that library. Unit,
integration, static and production build verification passed; full browser
interaction/offline coverage remains unverified because Computer Use could not
resolve the browser URL. The last provisioning run recorded 48 failures, including
inventory false positives and unavailable upstream resources; these are not
claimed as successfully provisioned. Fixed Earth request dates do not establish
complete tile availability. These remaining checks are follow-up work.
