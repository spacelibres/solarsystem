# Deploying

One script installs everything on a Debian/Ubuntu VPS that already runs Caddy:

```bash
sudo ./deploy/deploy.sh --secret <webhook-secret>
```

It is idempotent — re-run it to update, rebuild and reload.

## What it sets up

| piece | where |
|---|---|
| service user | `solarsystem` (system account, no login shell) |
| checkout | `/srv/solarsystem` |
| app service | `solarsystem.service`, listening on `127.0.0.1:4310` |
| webhook listener | `solarsystem-webhook.service`, on `0.0.0.0:9100` |
| updater | `/usr/local/bin/solarsystem-update` |
| Caddy site | `/etc/caddy/sites/solarsystem.caddy` |

Defaults are overridable by environment: `APP_DOMAIN`, `APP_USER`, `APP_DIR`,
`APP_PORT`, `REPO_URL`.

## Why these choices

**Port 4310, not 3000.** The host already runs another Next.js app on 3000
(`tile2.spacexway.com`), and the viewer binds `127.0.0.1` so it is only reachable
through Caddy.

**Caddy is added to, never rewritten.** The script writes a new file under
`/etc/caddy/sites/` and appends a single `import sites/*.caddy` line to the
existing `Caddyfile`, backing it up first. It validates with `caddy validate`
before reloading, so a bad block cannot take the other site down.

**The NASA mirror is 1.6 GB across 214k files, and lives outside the project.**
It is git-ignored (it is NASA's data), so a fresh host has to fetch it once from
`tools/download-mirror.cjs`. That is the slow step; re-runs resume and skip it
when the target already exists. Use `--skip-mirror` to update code without
touching assets.

The default location is `/srv/solarsystem-mirror`, *not* `data/mirror` inside the
checkout. Turbopack resolves the mirror path at build time and globs whatever it
points at, so an in-tree mirror makes the build walk all 214,419 files, exceed
this host's 2 GB and get OOM-killed partway through — reported only as `Killed`.
The service reads assets from `MIRROR_ROOT` instead, and `npm run build` refuses
to start while a populated `data/mirror` exists (see
`scripts/check-build-prereqs.mjs`). For local work, `npm run mirror:park` moves it
aside and `npm run mirror:restore` puts it back.

**The updater gates on tests.** `update.sh` runs `npm ci`, `npm test`,
`npm run check` and only then `npm run build`. If any step fails it leaves the
currently-running build in place, so a broken push cannot take the site down —
the webhook returns 202 and the failure lands in
`/var/log/solarsystem-update.log`.

**Only one update runs at a time.** `update.sh` takes a `flock`, and the listener
ignores tag pushes. Both matter: `git push --follow-tags` fires the hook twice
(once for the branch, once for the tag), and two concurrent builds on a 2 GB box
trip the OOM killer. The branch push is what deploys.

## Automatic deploys from GitHub

1. Note the secret you passed to `--secret`.
2. GitHub → repository → **Settings → Webhooks → Add webhook**:
   - **Payload URL** `http://176.122.171.38:9100/hooks/deploy`
   - **Content type** `application/json`
   - **Secret** the same value
   - **Events** *Just the push event*
3. The first delivery is a `ping`; the listener replies `pong` and logs it.

Every push to `main` then redeploys. Pushes to any other branch, and tag pushes
(the same commit as the branch push), are acknowledged with `204` and ignored so a
single push cannot start two builds. The listener verifies GitHub's HMAC-SHA256
signature in constant time and rejects anything unsigned, so the open port is not
a way in.

Verify a delivery arrived:

```bash
journalctl -u solarsystem-webhook -f     # the listener
tail -f /var/log/solarsystem-update.log # the build
```

## Operating it

```bash
systemctl status solarsystem            # the app
journalctl -u solarsystem -f            # its logs
systemctl status solarsystem-webhook    # the listener
sudo /usr/local/bin/solarsystem-update  # force an update by hand
caddy validate --config /etc/caddy/Caddyfile
```

## Troubleshooting

**The build is killed for memory (`Killed` mid-build).** Almost always an asset
mirror inside the project tree, which makes Turbopack walk 214k files. Confirm
with `ls /srv/solarsystem/data/mirror` — if that exists, move it to
`/srv/solarsystem-mirror` and point the service's `MIRROR_ROOT` there. That is
the layout `deploy/update.sh` maintains; the host only has 2 GB, so keep swap
enabled regardless.

**Caddy serves the other site but not this one.** Check
`grep -n 'import sites' /etc/caddy/Caddyfile` — the import must be present, and
`caddy validate` must pass before the reload happens.

**Textures 404.** The mirror is incomplete. Re-run
`node tools/download-mirror.cjs --out /srv/solarsystem-mirror` as the
`solarsystem` user; it resumes where it left off.

**DNS.** `solarsystem.spacelibre.cn` must resolve to the host before Caddy can
issue a certificate. Caddy retries automatically once it does.

## Live deployment

| | |
|---|---|
| URL | https://solarsystem.spacelibre.cn |
| host | 176.122.171.38, Ubuntu 26.04, 3 vCPU, 2 GB RAM + 1 GB swap |
| app port | `127.0.0.1:4310` (Caddy fronts it) |
| webhook | `http://176.122.171.38:9100/hooks/deploy` |
| certificate | Let's Encrypt, issued automatically by Caddy |

The host was already serving another Next.js app on port 3000 for
`tile2.spacexway.com`; that site was left untouched. The Caddy configuration is
shared: this site lives in `/etc/caddy/sites/solarsystem.caddy` and is pulled in
by an `import sites/*.caddy` line.
