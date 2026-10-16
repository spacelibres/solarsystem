/**
 * Constellations, from NASA's `constellations.bin`.
 *
 * ## Format
 *
 * Transcribed from `ConstellationsComponent._load` and verified by decoding the
 * real file: it round-trips exactly, consuming all 10,952 bytes and yielding the
 * **88** IAU constellations.
 *
 *   repeat until end of file:
 *     u8    nameLength
 *     bytes name                  ASCII
 *     u8    r, g, b, a            line colour (every constellation: 50,50,170,180)
 *     u8    starCount
 *     starCount × (3 × f32)       vertex positions, J2000 ecliptic frame
 *     u8    segmentCount          (the file stores 2 × this many bytes)
 *     segmentCount × (2 × u8)     index pairs into this constellation's stars
 *
 * ## Frame
 *
 * The positions are in the J2000 **ecliptic** frame and need the same
 * transformation the starfield uses: an axis swap `(x, y, z) -> (z, -x, y)`
 * followed by the ecliptic-to-equatorial rotation. Skipping the swap puts the
 * whole sky at the wrong orientation while still looking plausible.
 *
 * ## Styling
 *
 * `SceneManager.toggleConstellations` sets the line colour to
 * `Color(.35, .7, 1, .5)` — overriding the per-constellation colour in the file,
 * which is uniformly the same anyway — and the labels to `(.35, .7, 1, 1)`.
 * The constellation layer defaults to **off**, matching `addLayer`.
 */

import * as THREE from 'three';

/** NASA's ecliptic-J2000 → J2000 rotation. */
const ECLIP_J2000_TO_J2000 = new THREE.Quaternion(
  0.9791532214288992,
  0.2031230389823101,
  0,
  0,
);

export interface Constellation {
  /** IAU name, e.g. `Orion`. */
  name: string;
  /** Line colour as stored, RGBA 0–255. */
  color: [number, number, number, number];
  /** Vertex positions in J2000 equatorial coordinates. */
  stars: THREE.Vector3[];
  /** Index pairs into `stars`, each pair being one line segment. */
  segments: [number, number][];
}

/**
 * Decode `constellations.bin`.
 *
 * The reader is strict: it walks the file to the very last byte and throws if a
 * record would run past the end, so a format mismatch is a loud failure rather
 * than a silently truncated sky.
 */
export function parseConstellations(buffer: ArrayBuffer): Constellation[] {
  const view = new DataView(buffer);
  const out: Constellation[] = [];
  let o = 0;

  while (o < buffer.byteLength) {
    const nameLength = view.getUint8(o);
    o += 1;
    let name = '';
    for (let i = 0; i < nameLength; i++) name += String.fromCharCode(view.getUint8(o + i));
    o += nameLength;

    const color: [number, number, number, number] = [
      view.getUint8(o), view.getUint8(o + 1), view.getUint8(o + 2), view.getUint8(o + 3),
    ];
    o += 4;

    const starCount = view.getUint8(o);
    o += 1;
    const stars: THREE.Vector3[] = [];
    for (let i = 0; i < starCount; i++) {
      const x = view.getFloat32(o, true);
      const y = view.getFloat32(o + 4, true);
      const z = view.getFloat32(o + 8, true);
      o += 12;
      // Axis swap, then rotate into J2000 equatorial.
      stars.push(new THREE.Vector3(z, -x, y).applyQuaternion(ECLIP_J2000_TO_J2000));
    }

    const segmentCount = view.getUint8(o);
    o += 1;
    const segments: [number, number][] = [];
    for (let i = 0; i < segmentCount; i++) {
      segments.push([view.getUint8(o), view.getUint8(o + 1)]);
      o += 2;
    }

    out.push({ name, color, stars, segments });
  }

  return out;
}

/**
 * Build one `THREE.LineSegments` object for every constellation.
 *
 * NASA draws them as a single component under the `sun` entity, scaled to the
 * sky. We place them on the same fixed shell the starfield uses, so the two stay
 * registered with each other.
 */
export function buildConstellations(
  constellations: Constellation[],
  shellKm: number,
): THREE.LineSegments {
  const positions: number[] = [];

  for (const c of constellations) {
    // Normalise each constellation's vertices onto a unit sphere: the file
    // stores absolute distances, which vary by constellation, and the lines must
    // sit at the same radius as the stars to line up.
    const unit = c.stars.map((s) => s.clone().normalize());
    for (const [a, b] of c.segments) {
      const pa = unit[a];
      const pb = unit[b];
      if (!pa || !pb) continue;
      positions.push(
        pa.x * shellKm, pa.y * shellKm, pa.z * shellKm,
        pb.x * shellKm, pb.y * shellKm, pb.z * shellKm,
      );
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 0);

  const material = new THREE.LineBasicMaterial({
    color: new THREE.Color(0.35, 0.7, 1),
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    depthTest: false,
  });

  const lines = new THREE.LineSegments(geometry, material);
  lines.name = 'constellations';
  // Behind the stars (which draw at -2).
  lines.renderOrder = -3;
  lines.frustumCulled = false;
  return lines;
}
