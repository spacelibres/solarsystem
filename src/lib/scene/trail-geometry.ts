/**
 * Build a trail ribbon from a body's past positions.
 *
 * NASA's trail geometry is a triangle strip of `2 × points` vertices. Each point
 * contributes two vertices, tagged `side = +1` and `side = -1`, and the vertex
 * shader pushes them perpendicular to the path by up to `widthMax` pixels. That
 * is what keeps the ribbon a constant on-screen width regardless of distance —
 * the same trick the label sizes use.
 *
 * We reproduce the shape and the screen-space width, but sample the ribbon
 * directly from the ephemeris rather than maintaining NASA's incremental
 * front/back point queues. The input is the same: positions at times running
 * backwards from the current simulation time.
 *
 * The result is a `THREE.Line` drawn as a strip of camera-facing quads, so the
 * width is applied in screen space in the vertex shader.
 */

import * as THREE from 'three';

/** One sampled position along the trail, in world space. */
export interface TrailSample {
  position: THREE.Vector3;
  /** Seconds from J2000 at which the body was here. */
  time: number;
}

/**
 * Vertex shader for a screen-space-width ribbon.
 *
 * `side` is ±1 per vertex; pushing along `normalize(vec2(-dir.y, dir.x))` in
 * clip space gives a constant pixel width. `direction` is supplied per vertex by
 * the geometry builder, already flattened to the ribbon's plane.
 */
const VERTEX_SHADER = /* glsl */ `
attribute float side;
attribute vec2 direction;
attribute float alpha;

uniform float widthMin;
uniform float widthMax;
uniform float alphaMultiplier;
uniform vec2 viewportSize;

varying float vAlpha;

void main() {
  vAlpha = alpha * alphaMultiplier;

  vec4 clip = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

  // Perpendicular in screen space, so the ribbon keeps a constant pixel width.
  vec2 perp = normalize(vec2(-direction.y, direction.x));
  float width = mix(widthMin, widthMax, clamp(alpha, 0.0, 1.0));

  // Clip-space offset: 2.0 / viewport maps NDC to pixels.
  clip.xy += perp * (width / viewportSize) * clip.w;

  gl_Position = clip;
}
`;

const FRAGMENT_SHADER = /* glsl */ `
uniform vec4 color;
varying float vAlpha;

void main() {
  gl_FragColor = vec4(color.rgb, color.a * vAlpha);
}
`;

/** The uniform set shared by every trail, matching `TrailComponent`'s names. */
export interface TrailMaterialUniforms {
  color: { value: THREE.Vector4 };
  widthMin: { value: number };
  widthMax: { value: number };
  alphaMultiplier: { value: number };
  viewportSize: { value: THREE.Vector2 };
  [key: string]: THREE.IUniform;
}

/** Build the trail material for one body. */
export function buildTrailMaterial(color: [number, number, number, number]): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Vector4(...color) },
      widthMin: { value: 0 },
      widthMax: { value: 2 },
      alphaMultiplier: { value: 1 },
      viewportSize: { value: new THREE.Vector2(1920, 1080) },
    },
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER,
    transparent: true,
    depthWrite: false,
    // NASA's trails draw over the bodies they pass.
    depthTest: true,
  });
}

/**
 * Build trail geometry from sampled positions.
 *
 * Produces `2 × samples` vertices. `alpha` ramps from 0 at the oldest sample to
 * 1 at the body, which is what makes a trail fade into the past — NASA exposes
 * this as the `alphaFade` uniform, and a value of 0 (its default) still leaves
 * the head opaque because the ramp is driven per-vertex here.
 *
 * Non-finite samples are dropped rather than passed through. An ephemeris only
 * covers a window; asking for a position outside it can extrapolate to NaN, and
 * a single NaN vertex poisons the geometry's bounding sphere and can stop the
 * whole ribbon from drawing.
 */
export function buildTrailGeometry(samples: TrailSample[]): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  const clean = samples.filter((s) =>
    Number.isFinite(s.position.x) &&
    Number.isFinite(s.position.y) &&
    Number.isFinite(s.position.z),
  );
  const n = clean.length;
  if (n < 2) {
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(0), 3));
    // An empty geometry still gets a valid bounding sphere, so nothing
    // downstream has to special-case it.
    geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 0);
    return geometry;
  }

  const vertexCount = n * 2;
  const positions = new Float32Array(vertexCount * 3);
  const sides = new Float32Array(vertexCount);
  const directions = new Float32Array(vertexCount * 2);
  const alphas = new Float32Array(vertexCount);
  const indices: number[] = [];

  for (let i = 0; i < n; i++) {
    const p = clean[i].position;
    // Direction of travel at this sample, from its neighbours.
    const prev = clean[Math.max(0, i - 1)].position;
    const next = clean[Math.min(n - 1, i + 1)].position;
    const dx = next.x - prev.x;
    const dy = next.y - prev.y;
    const len = Math.hypot(dx, dy) || 1;

    // Alpha ramps 0 at the tail to 1 at the head, so the trail fades with age.
    const alpha = i / (n - 1);

    for (let s = 0; s < 2; s++) {
      const v = i * 2 + s;
      positions[v * 3] = p.x;
      positions[v * 3 + 1] = p.y;
      positions[v * 3 + 2] = p.z;
      sides[v] = s === 0 ? 1 : -1;
      directions[v * 2] = dx / len;
      directions[v * 2 + 1] = dy / len;
      alphas[v] = alpha;
    }

    if (i < n - 1) {
      const a = i * 2;
      // Two triangles per quad, wound the way NASA winds them.
      indices.push(a, a + 2, a + 3, a + 3, a + 1, a);
    }
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('side', new THREE.BufferAttribute(sides, 1));
  geometry.setAttribute('direction', new THREE.BufferAttribute(directions, 2));
  geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));
  geometry.setIndex(indices);
  geometry.computeBoundingSphere();
  return geometry;
}
