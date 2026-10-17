#!/usr/bin/env bash
# Bootstrap the checked-in installer, even on a machine without Git or Node.
set -euo pipefail
[ "$(id -u)" -eq 0 ] || { echo "Run as root or with sudo" >&2; exit 1; }
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq git ca-certificates >/dev/null
workdir="$(mktemp -d /tmp/solarsystem-install.XXXXXX)"
trap 'rm -rf -- "$workdir"' EXIT
git clone --depth 1 --branch "${INSTALL_BRANCH:-main}" \
  "${REPO_URL:-https://github.com/spacelibres/solarsystem.git}" "$workdir/source"
bash "$workdir/source/deploy/deploy.sh" "$@"
