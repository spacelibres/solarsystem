/**
 * The solar-system scene.
 *
 * Renders bodies from NASA Eyes dynamo ephemerides on a compressed radial scale
 * (see `lib/scene/scale.ts`) so the whole system is legible at once while every
 * orbit keeps its true shape and inclination.
 *
 * Responsibilities are deliberately split:
 *   - this file owns Three.js objects, materials and the frame loop;
 *   - `lib/scene/scale.ts` owns the distance/radius compression;
 *   - `lib/dynamo/*` owns parsing and orbital mechanics.
 */

import * as THREE from 'three';

import type { CatalogEntity } from '../lib/nasa/catalog';
import { SPRITES, pickSize, textureUrl } from '../lib/nasa/assets';
import type { OrbPoint } from '../lib/dynamo/parse';
import { orbPositionAt } from '../lib/dynamo/orbit';
import { projectToScene, scaleRadius, PLANET_EXTENT } from '../lib/scene/scale';

export interface SceneBody {
  entity: CatalogEntity;
  points: OrbPoint[];
  mesh: THREE.Mesh;
  orbit: THREE.Line | null;
  label: HTMLDivElement;
  /** Radius in scene units, used for picking and camera framing. */
  displayRadius: number;
}

export interface SolarSceneHandle {
  setTime(time: number): void;
  getTime(): number;
  resize(width: number, height: number): void;
  dispose(): void;
  bodies: Map<string, SceneBody>;
  /** Frame a body by id, or the whole system when null. */
  focus(id: string | null): void;
  /** Real elapsed-time rate, in simulated days per real second. */
  setTimeScale(daysPerSecond: number): void;
  getTimeScale(): number;
}

export interface SceneOptions {
  container: HTMLElement;
  entities: CatalogEntity[];
  orbits: Map<string, OrbPoint[]>;
  primaryColor: THREE.ColorRepresentation;
  /** Simulation time to start at, seconds since J2000. */
  startTime?: number;
}

export function createSolarScene(options: SceneOptions): SolarSceneHandle {
  const { container, entities, orbits, primaryColor, startTime = 0 } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x05070d, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    42,
    container.clientWidth / container.clientHeight,
    0.01,
    20000,
  );

  scene.add(new THREE.AmbientLight(0xffffff, 0.14));
  const sunLight = new THREE.PointLight(0xfff4e0, 3.4, 0, 0.55);
  scene.add(sunLight);

  const loader = new THREE.TextureLoader();
  const bodies = new Map<string, SceneBody>();
  const labelLayer = document.createElement('div');
  labelLayer.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden';
  container.appendChild(labelLayer);

  const primary = new THREE.Color(primaryColor);

  // --- Sun -----------------------------------------------------------------
  {
    const sun = entities.find((e) => e.id === 'sun');
    if (sun) {
      const r = scaleRadius(sun.radius ?? 695500);
      const glow = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: loader.load(SPRITES.sunGlow),
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      );
      glow.scale.setScalar(r * 8);

      const disc = new THREE.Mesh(
        new THREE.SphereGeometry(r, 64, 48),
        new THREE.MeshBasicMaterial({ color: 0xffd9a0 }),
      );
      const colorDesc = sun.textures.color;
      if (colorDesc) {
        const t = loader.load(textureUrl(colorDesc, pickSize(colorDesc.sizes, 512), 0), (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
        });
        (disc.material as THREE.MeshBasicMaterial).map = t;
      }

      scene.add(glow);
      scene.add(disc);

      const label = makeLabel(labelLayer, sun.label);
      bodies.set('sun', {
        entity: sun,
        points: [],
        mesh: disc,
        orbit: null,
        label,
        displayRadius: r,
      });
    }
  }

  // --- Planets and everything with an orbit --------------------------------
  for (const entity of entities) {
    if (entity.id === 'sun') continue;
    const points = orbits.get(entity.id);
    if (!points || points.length === 0) continue;

    const r = scaleRadius(entity.radius ?? 1000);
    const material = new THREE.MeshStandardMaterial({ roughness: 0.9, metalness: 0 });
    const colorDesc = entity.textures.color;
    if (colorDesc) {
      const size = pickSize(colorDesc.sizes, 2048);
      material.map = loader.load(textureUrl(colorDesc, size, 0), (t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = renderer.capabilities.getMaxAnisotropy();
      });
    } else {
      material.color = primary;
    }

    const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 48), material);
    mesh.scale.setScalar(r);
    mesh.userData.entityId = entity.id;

    const orbit = new THREE.Line(
      buildOrbitGeometry(points[0]),
      new THREE.LineBasicMaterial({ color: primary, transparent: true, opacity: 0.28 }),
    );
    orbit.userData.epoch = points[0].time;

    scene.add(mesh);
    scene.add(orbit);

    bodies.set(entity.id, {
      entity,
      points,
      mesh,
      orbit,
      label: makeLabel(labelLayer, entity.label),
      displayRadius: r,
    });
  }

  let simTime = startTime;
  let daysPerSecond = 1;
  let focusedId: string | null = null;
  const focusTarget = new THREE.Vector3();

  function updatePositions(): void {
    for (const body of bodies.values()) {
      if (body.points.length === 0) continue;

      const p = nearestSample(body.points, simTime);
      const km = orbPositionAt(p, simTime);
      const pos = projectToScene(km);
      body.mesh.position.set(pos.x, pos.y, pos.z);

      if (body.orbit && body.orbit.userData.epoch !== p.time) {
        body.orbit.geometry.dispose();
        body.orbit.geometry = buildOrbitGeometry(p);
        body.orbit.userData.epoch = p.time;
      }
    }
  }

  // --- Camera controls: orbit, zoom, focus ---------------------------------
  let camTheta = Math.PI * 0.35;
  let camPhi = Math.PI * 0.33;
  // Frame the whole planetary system on load; the outermost orbit sets it.
  let camDist = PLANET_EXTENT * 1.9;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;

  function applyCamera(): void {
    const sinPhi = Math.sin(camPhi);
    camera.position.set(
      focusTarget.x + camDist * sinPhi * Math.sin(camTheta),
      focusTarget.y + camDist * Math.cos(camPhi),
      focusTarget.z + camDist * sinPhi * Math.cos(camTheta),
    );
    camera.lookAt(focusTarget);
  }

  const el = renderer.domElement;
  const onDown = (e: PointerEvent) => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    el.setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent) => {
    if (!dragging) return;
    camTheta -= (e.clientX - lastX) * 0.006;
    camPhi = clamp(camPhi - (e.clientY - lastY) * 0.006, Math.PI * 0.06, Math.PI * 0.94);
    lastX = e.clientX;
    lastY = e.clientY;
  };
  const onUp = (e: PointerEvent) => {
    dragging = false;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  };
  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    camDist = clamp(camDist * (1 + Math.sign(e.deltaY) * 0.09), 0.4, 4000);
  };

  el.addEventListener('pointerdown', onDown);
  el.addEventListener('pointermove', onMove);
  el.addEventListener('pointerup', onUp);
  el.addEventListener('wheel', onWheel, { passive: false });

  function projectLabels(): void {
    const rect = container.getBoundingClientRect();
    const placed: { x: number; y: number }[] = [];

    // Draw the most important bodies' labels first so they win the space, then
    // skip any label that would collide with one already placed.
    const order = [...bodies.values()].sort(
      (a, b) => (b.entity.radius ?? 0) - (a.entity.radius ?? 0),
    );

    for (const body of order) {
      const v = body.mesh.position.clone();
      v.y += body.displayRadius + 0.35;
      v.project(camera);

      const inFrame = v.z < 1 && v.x > -0.98 && v.x < 0.98 && v.y > -0.98 && v.y < 0.98;
      const x = (v.x * 0.5 + 0.5) * rect.width;
      const y = (-v.y * 0.5 + 0.5) * rect.height;

      const collides = placed.some((p) => Math.abs(p.x - x) < 64 && Math.abs(p.y - y) < 14);
      const show = inFrame && !collides;
      if (show) placed.push({ x, y });

      const s = body.label.style;
      s.transform = `translate(-50%, -100%) translate(${x}px, ${y}px)`;
      s.opacity = show ? '0.9' : '0';
    }
  }

  let frame = 0;
  let lastT = performance.now();

  function animate(): void {
    frame = requestAnimationFrame(animate);
    const now = performance.now();
    const dt = Math.min(0.1, (now - lastT) / 1000);
    lastT = now;

    simTime += dt * daysPerSecond * 86400;
    if (!dragging) camTheta += 0.0006;

    updatePositions();

    // Ease toward the focused body's position each frame.
    const focus = focusedId ? bodies.get(focusedId) : null;
    if (focus) focusTarget.lerp(focus.mesh.position, 0.12);

    applyCamera();
    projectLabels();
    renderer.render(scene, camera);
  }

  applyCamera();
  updatePositions();
  animate();

  return {
    bodies,
    setTime(t) {
      simTime = t;
      updatePositions();
    },
    getTime() {
      return simTime;
    },
    resize(w, h) {
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    },
    focus(id) {
      focusedId = id;
      if (!id) {
        focusTarget.set(0, 0, 0);
        camDist = PLANET_EXTENT * 1.9;
        return;
      }
      const body = bodies.get(id);
      if (!body) return;
      focusTarget.copy(body.mesh.position);
      camDist = Math.max(1.2, body.displayRadius * 9);
    },
    setTimeScale(days) {
      daysPerSecond = days;
    },
    getTimeScale() {
      return daysPerSecond;
    },
    dispose() {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('wheel', onWheel);
      labelLayer.remove();
      for (const body of bodies.values()) {
        body.mesh.geometry.dispose();
        (body.mesh.material as THREE.Material).dispose();
        body.orbit?.geometry.dispose();
        (body.orbit?.material as THREE.Material | undefined)?.dispose();
      }
      renderer.dispose();
      el.remove();
    },
  };
}

function nearestSample(points: OrbPoint[], time: number): OrbPoint {
  let lo = 0;
  let hi = points.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (points[mid].time <= time) lo = mid;
    else hi = mid;
  }
  return Math.abs(points[lo].time - time) <= Math.abs(points[hi].time - time)
    ? points[lo]
    : points[hi];
}

/** Sample one full period of an osculating orbit into a line geometry. */
function buildOrbitGeometry(point: OrbPoint): THREE.BufferGeometry {
  const SEGMENTS = 720;
  const positions = new Float32Array((SEGMENTS + 1) * 3);
  const period = (2 * Math.PI) / Math.abs(point.meanAngularMotion || 1e-12);
  for (let i = 0; i <= SEGMENTS; i++) {
    const t = point.time + (i / SEGMENTS) * period;
    const km = orbPositionAt(point, t);
    const p = projectToScene(km);
    positions[i * 3] = p.x;
    positions[i * 3 + 1] = p.y;
    positions[i * 3 + 2] = p.z;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return geometry;
}

function makeLabel(layer: HTMLElement, text: string): HTMLDivElement {
  const el = document.createElement('div');
  el.textContent = text;
  el.style.cssText = [
    'position:absolute',
    'left:0',
    'top:0',
    'pointer-events:none',
    'font:11px/1.1 var(--sl-font, Arial, sans-serif)',
    'letter-spacing:0.06em',
    'color:rgba(255,255,255,0.92)',
    'text-shadow:0 1px 6px rgba(0,0,0,0.95)',
    'white-space:nowrap',
    'transition:opacity 140ms linear',
  ].join(';');
  layer.appendChild(el);
  return el;
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}
