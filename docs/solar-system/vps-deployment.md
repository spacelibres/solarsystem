# VPS deployment verification — 2026-10-17

Target: https://solarsystem.spacelibre.cn, A record 176.122.171.38.
Environment: Ubuntu 26.04 LTS, Node 22.22.1, existing Caddy 2.6.2, 2 GiB RAM.
No login credential or GitHub access token is stored in the source tree.

## Reproduced problems

- The old service listened on `*:4310`, despite an environment variable claiming
  loopback. A real diagnostic rejected that state. The explicit Next start
  hostname argument changes the listening address to 127.0.0.1.
- The first installer run stopped at the build guard because the legacy mirror
  was inside `/srv/solarsystem/data/mirror`. It was retained and moved outside
  the checkout; no asset library was downloaded.
- Review found that the updater would restore a parked mirror in-tree. Its
  lifecycle now matches the installer and leaves the external mirror in place.

## Verified on the existing VPS

The revised installer was staged independently of the tracked server checkout
and run against its existing v0.2.47 application. Full tests (499 Vitest and
229 Node), checks and production build completed on the VPS. Local v0.2.48
passed npm ci, npm test, npm run check and npm run build. Shell syntax and
systemd units were validated separately. Later mirror/Caddy error-path changes
were reviewed; the updater installed on the server matches the revised source.

After installation, `/usr/local/bin/solarsystem-check` passed:

- Local application availability; public HTTPS `/`, `/explorer`, `/eyes/index.html`.
- Caddy configuration validation and systemd service availability.
- Missing webhook signature: 401. Correctly signed ping: 200 with `pong`.
- Exact loopback listeners on 4310 and 9100.
- Webhook environment directory mode 0700 and secret file mode 0600.
- Existing Caddy main configuration unchanged compared with its backup.
- Revision-pinned Draco WASM served over HTTPS as application/wasm, HTTP 200.
- Earth orbital definition served through the proxy, 30,916 bytes.

The GitHub hook is retained with its existing signing secret. The v0.2.48 push
serves as the real automatic-update acceptance event; its delivery, service
version and build completion must be checked after publication.

## Reproducibility and limits

Instructions are in deploy/README.md. `deploy/install.sh` bootstraps the checked-in
installer; `deploy/check.sh` can be rerun without triggering a rebuild.

This verification exercised an existing Ubuntu VPS with Caddy installed. The
missing-package installation branches were reviewed, not tested on a second
fresh VM. It does not establish that every spacecraft view is visually identical
to NASA Eyes. The installer rebuilds a single checkout and is not an atomic
zero-downtime release system.
