"""Rebuild original SVG figures and catalogue using local source only.

Run: python tools/constellation-art/build.py
No downloads, raster tools, optional libraries or hidden artifacts are needed.
"""
import hashlib
import json
import math
import pathlib
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
HERE = pathlib.Path(__file__).resolve().parent
OUT = ROOT / 'eyes/shell/constellation-art'
for batch in ('a', 'b', 'c'):
    subprocess.run([sys.executable, str(HERE / f'original-batch-{batch}.py')], cwd=ROOT, check=True)
source = json.loads((HERE / 'registration-source.json').read_text(encoding='utf-8-sig'))
catalogue = source['catalogue']
assets = []
def dot(a, b):
    return sum(x * y for x, y in zip(a, b))


def cross(a, b):
    return [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]]


def unit(vector):
    length = math.sqrt(dot(vector, vector))
    if length < 1e-10:
        raise ValueError('Degenerate celestial drawing frame')
    return [value / length for value in vector]


for artwork in catalogue['artworks']:
    # New drawings have their own equatorial-north-up composition. Reusing old
    # illustration pixel anchors can turn a narrow instrument into a sky-wide
    # panel. Derive a well-conditioned frame from the actual stellar directions.
    directions = [anchor['direction'] for anchor in artwork['anchors']]
    center = unit([sum(d[i] for d in directions) for i in range(3)])
    east = unit(cross([0, 0, 1], center))
    north = cross(center, east)
    coordinates = []
    for direction in directions:
        denominator = dot(direction, center)
        if denominator <= 0:
            raise ValueError(f"Stellar anchors cross projection horizon: {artwork['id']}")
        coordinates.append([dot(direction, east) / denominator, -dot(direction, north) / denominator])
    half_span = max(math.tan(math.radians(4)), max(abs(v) for point in coordinates for v in point) * 1.25)
    for anchor, coordinate in zip(artwork['anchors'], coordinates):
        anchor['pixel'] = [256 + 256 * value / half_span for value in coordinate]
    artwork.update(width=512, height=512, renderMode='vector')
    svg = (OUT / artwork['file']).read_bytes()
    if b'data-origin="spacelibre-original"' not in svg:
        raise ValueError(f"Unreplaced legacy artwork: {artwork['file']}")
    assets.append({'id': artwork['id'], 'file': artwork['file'], 'svgSha256': hashlib.sha256(svg).hexdigest()})
provenance = {
    'illustrations': {
        'author': 'spacelibre', 'license': 'MIT', 'method': 'original-svg-paths',
        'source': 'tools/constellation-art/original-batch-{a,b,c}.py',
        'note': 'Original AI-assisted vector drawings; no third-party image tracing. Artistic figures are not official IAU artwork.'
    },
    'placement': {'method': 'J2000 stellar tangent frame', 'orientation': 'equatorial north up', 'margin': 1.25, 'minimumHalfAngleDeg': 4},
    'metadata': source['metadata'], 'anchorStars': source['anchorStars'], 'assets': assets
}
for filename, data in [('index.json', catalogue), ('provenance.json', provenance)]:
    (OUT / filename).write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f"Rebuilt {len(assets)} original SVGs, {len({c for a in catalogue['artworks'] for c in a['covers']})} constellation names.")
