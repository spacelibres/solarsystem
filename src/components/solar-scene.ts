/**
 * The solar-system scene.
 *
 * Design notes
 * ------------
 * - Distances are in kilometres and rendered with a *logarithmic* radial scale
 *   so Mercury and Neptune can share a viewport, mirroring how NASA Eyes keeps
 *   inner and outer planets legible at once.
 * - Positions come from dynamo `orb` ephemerides, evaluated at the current
 *   simulation time; planet meshes are real spheres so they are readable when
 *   zoomed, using NASA's own map textures.
 * - Orbits are drawn as ellipses sampled from the same osculating elements, and
 *   are tinted with the spacelibre `primary` role so the brand carries through.
 */

import * as THREE from 'three';
import type { CatalogEntity } from '../lib/nasa/catalog';
import { SPRITES, pickSize, textureUrl } from '../lib/nasa/assets';
import type { OrbPoint } from '../lib/dynamo/parse';
import { orbPositionAt } from '../lib/dynamo/orbit';

const AU_KM = 149_597_870.7;

/** Compress kilometres into scene units with a logarithmic radial mapping. */
function sceneRadius(km: number): number {
  // 1 AU → ~24 units; keeps inner planets separated without losing the outer ones.
  return 24 * Math.log10(1 + km / (0.05 * AU_KM));
}

export interface ScenePlanet {
  entity: CatalogEntity;
  points: OrbPoint[];
  mesh: THREE.Mesh;
  orbit: THREE.Line;
  label: HTMLDivElement;
}

export interface SolarSceneHandle {
  /** Set the simulation clock (seconds since J2000). */
  setTime(time: number): void;
  /** Current simulation clock. */
  getTime(): number;
  resize(width: number, height: number): void;
  dispose(): void;
  planets: Map<string, ScenePlanet>;
}

export interface SceneOptions {
  container: HTMLElement;
  entities: CatalogEntity[];
  /** Function returning the parsed orbit points for an entity id. */
  orbits: Map<string, OrbPoint[]>;
  primaryColor: THREE.ColorRepresentation;
}

export function createSolarScene(options: SceneOptions): SolarSceneHandle {
  const { container, entities, orbits, primaryColor } = options;

  const renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x0d1721, 1);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.01, 5000);
  camera.position.set(0, 26, 46);
  camera.lookAt(0, 0, 0);

  // Ambient + point light at the Sun so textures read on the night side too.
  scene.add(new THREE.AmbientLight(0xffffff, 0.18));
  const sunLight = new THREE.PointLight(0xffffff, 3.2, 0, 0.6);
  scene.add(sunLight);

  const textureLoader = new THREE.TextureLoader();
  textureLoader.setCrossOrigin('anonymous');

  const planets = new Map<string, ScenePlanet>();
  const labels: HTMLDivElement[] = [];

  // The Sun: a glowing billboard sprite plus a bright sphere.
  const sunEntity = entities.find((e) => e.id === 'sun');
  if (sunEntity) {
    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: textureLoader.load(SPRITES.sunGlow),
        color: 0xffffff,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    glow.scale.setScalar(14);
    scene.add(glow);
    labels.push(createLabel(container, sunEntity.label, 0xffffff));
  }

  const primary = new THREE.Color(primaryColor);

  for (const entity of entities) {
    if (entity.id === 'sun') continue;
    const points = orbits.get(entity.id);
    if (!points || points.length === 0) continue;

    const geometry = new THREE.SphereGeometry(1, 48, 32);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.92,
      metalness: 0.0,
    });

    const colorDesc = entity.textures.color;
    if (colorDesc) {
      const size = pickSize(colorDesc.sizes, 1024);
      const tex = textureLoader.load(textureUrl(colorDesc, size, 0), (t) => {
        t.colorSpace = THREE.SRGBColorSpace;
      });
      material.map = tex;
    } else {
      // No map available: tint with the brand planet role.
      material.color = primary;
    }

    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData.entityId = entity.id;

    // Orbit line, initialised from the first sample and refreshed as the
    // simulation clock moves between samples so the drawn ellipse stays
    // consistent with the planet's own osculating elements.
    const orbit = new THREE.Line(
      buildOrbitGeometry(points[0]),
      new THREE.LineBasicMaterial({ color: primary, transparent: true, opacity: 0.35 }),
    );

    scene.add(mesh);
    scene.add(orbit);

    const label = createLabel(container, entity.label, 0xffffff);
    labels.push(label);

    planets.set(entity.id, { entity, points, mesh, orbit, label });
  }

  let simTime = 0; // seconds since J2000, advanced for a lively default view

  function updatePositions(): void {
    for (const planet of planets.values()) {
      const p = nearestSample(planet.points, simTime);
      const posKm = orbPositionAt(p, simTime);
      const r = sceneRadius(Math.hypot(posKm.x, posKm.y, posKm.z));
      const dir = new THREE.Vector3(posKm.x, posKm.y, posKm.z).normalize();
      planet.mesh.position.copy(dir.multiplyScalar(r));

      // Refresh the orbit line only when we cross into a new sample epoch; doing
      // it every frame would rebuild 512 vertices needlessly.
      if (planet.orbit.userData.epoch !== p.time) {
        planet.orbit.geometry.dispose();
        planet.orbit.geometry = buildOrbitGeometry(p);
        planet.orbit.userData.epoch = p.time;
      }

      // Display radius: exaggerate tiny bodies so they are visible at AU scale,
      // but keep planets visually distinct without swallowing their orbits.
      const radiusKm = planet.entity.radius ?? 1000;
      const display = 0.22 + 0.9 * Math.log10(1 + radiusKm / 1500);
      planet.mesh.scale.setScalar(display);
    }
  }

  function projectLabels(): void {
    const rect = container.getBoundingClientRect();
    for (const planet of planets.values()) {
      const v = planet.mesh.position.clone();
      // Offset labels above each body.
      v.y += 0.6;
      v.project(camera);
      const x = (v.x * 0.5 + 0.5) * rect.width;
      const y = (-v.y * 0.5 + 0.5) * rect.height;
      const visible = v.z < 1;
      planet.label.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
      planet.label.style.opacity = visible ? '0.92' : '0';
    }
  }

  let frame = 0;

  // --- Camera orbit controls (drag to rotate, wheel to zoom) ---------------
  let camTheta = Math.PI * 0.32;
  let camPhi = Math.PI * 0.30;
  let camDist = 62;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;

  function applyCamera(): void {
    const sinPhi = Math.sin(camPhi);
    camera.position.set(
      camDist * sinPhi * Math.sin(camTheta),
      camDist * Math.cos(camPhi),
      camDist * sinPhi * Math.cos(camTheta),
    );
    camera.lookAt(0, 0, 0);
  }

  const onPointerDown = (e: PointerEvent) => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    renderer.domElement.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: PointerEvent) => {
    if (!dragging) return;
    camTheta -= (e.clientX - lastX) * 0.006;
    camPhi = Math.min(Math.PI * 0.92, Math.max(Math.PI * 0.08, camPhi - (e.clientY - lastY) * 0.006));
    lastX = e.clientX;
    lastY = e.clientY;
  };
  const onPointerUp = (e: PointerEvent) => {
    dragging = false;
    if (renderer.domElement.hasPointerCapture(e.pointerId)) {
      renderer.domElement.releasePointerCapture(e.pointerId);
    }
  };
  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    camDist = Math.min(400, Math.max(6, camDist * (1 + Math.sign(e.deltaY) * 0.08)));
  };

  renderer.domElement.addEventListener('pointerdown', onPointerDown);
  renderer.domElement.addEventListener('pointermove', onPointerMove);
  renderer.domElement.addEventListener('pointerup', onPointerUp);
  renderer.domElement.addEventListener('wheel', onWheel, { passive: false });

  function animate(): void {
    frame = requestAnimationFrame(animate);
    simTime += 60 * 60 * 6; // advance 6 hours per frame for visible motion
    if (!dragging) camTheta += 0.0009; // gentle idle rotation
    updatePositions();
    applyCamera();
    projectLabels();
    renderer.render(scene, camera);
  }

  applyCamera();
  updatePositions();
  animate();

  return {
    setTime(time: number) {
      simTime = time;
      updatePositions();
    },
    getTime() {
      return simTime;
    },
    resize(w: number, h: number) {
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    },
    dispose() {
      cancelAnimationFrame(frame);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('wheel', onWheel);
      for (const label of labels) label.remove();
      for (const planet of planets.values()) {
        planet.mesh.geometry.dispose();
        (planet.mesh.material as THREE.Material).dispose();
        planet.orbit.geometry.dispose();
        (planet.orbit.material as THREE.Material).dispose();
      }
      renderer.dispose();
      renderer.domElement.remove();
    },
    planets,
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

/** Sample a full ellipse from one osculating element set. */
function buildOrbitGeometry(point: OrbPoint): THREE.BufferGeometry {
  const SEGMENTS = 512;
  const positions = new Float32Array((SEGMENTS + 1) * 3);
  const period = (2 * Math.PI) / Math.abs(point.meanAngularMotion);
  for (let i = 0; i <= SEGMENTS; i++) {
    const t = point.time + (i / SEGMENTS) * period;
    const p = orbPositionAt(point, t);
    const r = sceneRadius(Math.hypot(p.x, p.y, p.z));
    const dir = new THREE.Vector3(p.x, p.y, p.z).normalize();
    positions[i * 3] = dir.x * r;
    positions[i * 3 + 1] = dir.y * r;
    positions[i * 3 + 2] = dir.z * r;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return geometry;
}

function createLabel(
  container: HTMLElement,
  text: string,
  color: number,
): HTMLDivElement {
  const el = document.createElement('div');
  el.textContent = text;
  el.style.position = 'absolute';
  el.style.left = '0';
  el.style.top = '0';
  el.style.pointerEvents = 'none';
  el.style.font = '12px/1 var(--sl-font, Arial, sans-serif)';
  el.style.letterSpacing = '0.04em';
  el.style.color = `#${color.toString(16).padStart(6, '0')}`;
  el.style.textShadow = '0 1px 4px rgba(0,0,0,0.9)';
  el.style.whiteSpace = 'nowrap';
  el.style.transition = 'opacity 120ms linear';
  container.appendChild(el);
  return el;
}
