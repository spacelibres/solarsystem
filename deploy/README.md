# VPS installation and verification

Ubuntu/Debian, root access, and a domain A record pointing at the VPS are required.
Allow inbound TCP 80/443 for Caddy certificate issuance and serving. SSH uses the
host's existing configuration. Other sites and services are retained.

For a fresh machine, download and run the bootstrap:

```bash
curl -fsSL https://raw.githubusercontent.com/spacelibres/solarsystem/main/deploy/install.sh -o /tmp/solarsystem-install.sh
sudo bash /tmp/solarsystem-install.sh --domain solarsystem.spacelibre.cn
```

From an existing clone:

```bash
sudo bash deploy/deploy.sh --domain solarsystem.spacelibre.cn
```

The installer installs missing Caddy, Node 22, Git and service dependencies;
creates the service account; fetches the requested branch; runs tests, checks
and the production build; installs systemd services and validates/reloads Caddy.
Application port 4310 and webhook port 9100 bind to loopback. Only Caddy serves
the public site. The existing Caddy main configuration gets an import; its other
site blocks are preserved. Managed Caddy files are backed up beneath
`/var/backups/solarsystem/` before replacement and restored if validation fails.

NASA images, models and ephemerides stay on runtime URLs. No asset library is
mirrored. Only the revision-pinned decoder dependencies are cached by the build.
The old `--skip-mirror` option remains accepted for compatibility and is a no-op.
An existing `data/mirror` is moved outside the checkout to MIRROR_DIR; an in-tree
symlink is removed while its target is retained. Conflicting destinations stop
installation instead of overwriting data. The mirror is not moved back in-tree.

On reruns the installer reuses `/etc/solarsystem/webhook.env` or migrates the
secret from the existing unit, without printing it. The environment file is
root-only (0600, parent 0700). On first install it generates a random secret;
configure the GitHub push webhook at `https://DOMAIN/hooks/deploy` using that
same secret, JSON content type, and SSL verification. An existing GitHub hook
needs no change when its existing secret is reused. Do not place GitHub access
tokens or VPS passwords in this repository or the service units.
Secrets use letters, digits, underscore and hyphen. If a legacy secret uses
other characters, installation stops without replacing it; migrate its encoding
deliberately instead of silently changing the working GitHub signature contract.

The installer and updater share a nonblocking deployment lock. A second install
or update exits instead of running concurrent builds. Local tracked changes in
the server checkout stop installation rather than being overwritten.

Verify after installation as root:

```bash
sudo /usr/local/bin/solarsystem-check
systemctl status solarsystem caddy solarsystem-webhook
journalctl -u solarsystem-webhook -n 30
```

`deploy/check.sh` checks local application availability, public HTTPS routes,
certificate validation, unsigned webhook rejection, a signed ping, and exact
loopback listeners. The ping does not trigger a rebuild. For custom domain or
ports, pass the same APP_DOMAIN / APP_PORT / WEBHOOK_PORT / WEBHOOK_PATH overrides.
GitHub branch pushes run the updater; tag and unrelated branch pushes are ignored.

Installation rebuilds the same checkout used by the service; it is not an atomic
release-directory deployment. Schedule reinstalls appropriately when preserving
uninterrupted requests during a build is required.
