#!/bin/sh
# Fetch NASA Eyes's webpack bundle for local study.
#
# The bundle is NASA's own code and is never committed; it lands in the ignored
# mirror tree. See docs/nasa-eyes-architecture.md.
#
# Usage: tools/fetch-bundle.sh [url]
set -eu

DEST="$(dirname "$0")/../data/mirror/apps/solar-system/bundle/js_app.js"
mkdir -p "$(dirname "$DEST")"

# Default: the live app's main chunk, discovered from its HTML.
if [ "$#" -ge 1 ]; then
  URL="$1"
else
  BASE="https://eyes.nasa.gov/apps/solar-system/"
  CHUNK=$(curl -fsSL "$BASE" \
    | grep -oE '/apps/solar-system/_next/static/chunks/[^"]+\.js' \
    | head -n 1)
  if [ -z "$CHUNK" ]; then
    echo "Could not find a chunk URL in the app HTML." >&2
    echo "Pass one explicitly: tools/fetch-bundle.sh <url>" >&2
    exit 1
  fi
  URL="https://eyes.nasa.gov${CHUNK}"
fi

echo "Fetching $URL"
curl -fsSL "$URL" -o "$DEST"
echo "Wrote $DEST ($(wc -c < "$DEST") bytes)"
echo "Now run: node tools/study-bundle.cjs list"
