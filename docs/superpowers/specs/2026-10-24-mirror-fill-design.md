# Server-side mirror filling

The owner reported a real missing GRACE-FO live dynamo window. The upstream
returned HTTP 200 / 1013 bytes while the VPS file was absent. A static historical
manifest cannot cover every live requested window. On authorized GET/HEAD misses,
fetch approved original resource URLs in the server, write atomically, and retry
the same local response. Keep CSP/browser requests same-origin. Explicit service
setting NASA_MIRROR_FILL=1 enables provisioning; disk-only mode remains available.
Deduplicate paths, cap queue/concurrency/size, apply timeout and failure cooldown,
reject error pages, enforce mirror containment, and log source and content hashes.
Verify first-request delivery, concurrency, HTML rejection, path restrictions and
negative cache in tests, followed by full release checks and a VPS live miss.
