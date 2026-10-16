/**
 * The solar-system scene.
 *
 * Architecture follows NASA Eyes rather than a naive single-level scene:
 *
 * - **True distances.** Bodies sit at real kilometre offsets. There is no
 *   logarithmic squashing; the camera manages scale by flying between frames.
 * - **Parent chains.** Every body's `.dyn` describes motion relative to whatever
 *   it is currently attached to (`moon/earth/orb`, `sc_juno/jupiter/orb`). World
 *   position is the sum of local positions up the chain, recomputed each frame
 *   from the time-segmented parenting table.
 * - **Screen-space sizing.** A body is never drawn smaller than a few pixels, so
 *   distant planets and moons remain visible and clickable instead of thinning
 *   to nothing. NASA solves the same problem with exaggerated `extentsRadius`.
 */

import * as THREE from 'three';

import type { CatalogEntity } from '../lib/nasa/catalog';
import { SPRITES, pickSize, textureUrl } from '../lib/nasa/assets';
import type { OrbPoint } from '../lib/dynamo/parse';
import { orbPositionAt } from '../lib/dynamo/orbit';
import { ALWAYS, buildTree, parentAtTime, type TreeNode } from '../lib/scene/parenting';
import { pixelSpaceRadius } from '../lib/scene/projection';
import { buildStarfield, parseStarfield } from '../lib/scene/starfield';
import { buildSurface } from '../lib/scene/surface';
import {
  ATMOSPHERES,
  buildAtmosphereGeometry,
  buildAtmosphereMaterial,
} from '../lib/scene/atmosphere';
import { RING_SPECS, buildRings } from '../lib/scene/rings';
import { ORBIT_SEGMENTS, hasOrbitLine, orbitColor } from '../lib/scene/orbit-colors';
import {
  loadMilkyWayTexture,
  milkyWayVisible,
  projectSunOntoBackdrop,
} from '../lib/scene/milky-way';
import { GALAXIES_URL, starfieldUrl } from '../lib/nasa/assets';
import { LABEL, bodyIconName, labelWeight } from '../lib/theme/nasa-tokens';

/** One loaded ephemeris: the points plus the parent they are relative to. */
export interface LoadedOrbit {
  points: OrbPoint[];
  /** Parent body id the points are relative to ('' / null = root frame). */
  relTo: string | null;
}

export interface SceneBody {
  entity: CatalogEntity;
  orbit: LoadedOrbit | null;
  mesh: THREE.Mesh;
  orbitLine: THREE.Line | null;
  label: HTMLDivElement;
  /** Local position relative to the current parent, in km. */
  local: THREE.Vector3;
}

export interface LayerVisibility {
  orbits?: boolean;
  labels?: boolean;
  stars?: boolean;
}

export interface SolarSceneHandle {
  setTime(time: number): void;
  getTime(): number;
  resize(width: number, height: number): void;
  dispose(): void;
  bodies: Map<string, SceneBody>;
  focus(id: string | null): void;
  setTimeScale(daysPerSecond: number): void;
  getTimeScale(): number;
  /** Number of bodies currently rendered, for the UI readout. */
  visibleCount(): number;
  /** Invoked when the user clicks a body (or empty space, with null). */
  onPick(callback: (id: string | null) => void): void;
  /** Toggle scene layers (orbit lines, labels, starfield). */
  setLayers(visibility: LayerVisibility): void;
}

export interface SceneOptions {
  container: HTMLElement;
  entities: CatalogEntity[];
  /** Loaded ephemerides keyed by entity id. */
  orbits: Map<string, LoadedOrbit>;
  startTime?: number;
  bodyColorFn?: (entity: CatalogEntity) => string;
}

/**
 * Minimum on-screen radius, in pixels. Without this, a true-to-scale Earth is
 * ~0.01px from across the solar system and the scene looks empty. NASA hits the
 * same wall and answers it by exaggerating a body's `extentsRadius`.
 */
const MIN_VISIBLE_PIXEL_RADIUS = 4;

export function createSolarScene(options: SceneOptions): SolarSceneHandle {
  const { container, entities, orbits, startTime = 0, bodyColorFn } = options;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    // NASA spans 1e-5 km (a lander) to 5e23 km (the observable universe) with a
    // logarithmic depth buffer. It is also what keeps the 1.2e18 km Milky Way
    // quad representable: at that magnitude a plain float32 view transform
    // quantises its vertices to ~1e18-km steps and the quad vanishes entirely.
    logarithmicDepthBuffer: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    42,
    container.clientWidth / container.clientHeight,
    1e-4,
    // NASA uses a logarithmic depth buffer rather than near/far planes, which
    // is how it spans 1e-5 km to 5e23 km. The far plane is sized to admit the
    // Milky Way sprite at its framing distance without losing precision for the
    // planets, which sit 9 orders of magnitude closer.
    2e19,
  );
  camera.position.set(0, 8e8, 1.6e9);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.16));
  const sunLight = new THREE.PointLight(0xfff4e0, 3.2, 0, 0);
  scene.add(sunLight);

  // Starfield: NASA attaches **seven** layers to the Sun entity — the galaxies
  // layer first, then six stellar magnitude layers (`stars.0` … `stars.5`).
  // Verified live against the reference app:
  //   sun :: … StarfieldComponent ×7 …
  //   galaxies.0.bin, stars.0.bin, stars.1.bin, …, stars.5.bin
  // Missing the galaxies layer leaves the sky without its distant galaxies.
  const STAR_LAYERS: { url: string; renderOrder: number }[] = [
    { url: GALAXIES_URL, renderOrder: -4 },
    ...Array.from({ length: 6 }, (_, i) => ({
      url: starfieldUrl(i),
      renderOrder: -2,
    })),
  ];
  const starLayers: THREE.Points[] = [];
  void Promise.all(
    STAR_LAYERS.map(async (layer) => {
      try {
        const res = await fetch(layer.url);
        if (!res.ok) return;
        const points = buildStarfield([parseStarfield(await res.arrayBuffer())]);
        points.renderOrder = layer.renderOrder;
        starLayers.push(points);
        scene.add(points);
      } catch {
        /* a missing layer is cosmetic only */
      }
    }),
  );

  const loader = new THREE.TextureLoader();
  const labelLayer = document.createElement('div');
  labelLayer.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden';
  container.appendChild(labelLayer);

  // Milky Way: the same texture NASA uses, attached as the renderer background
  // rather than as a 1.2e18 km quad, which float32 cannot represent far from
  // the origin. It fades in at galactic distances only.
  const milkyWayTexture = loadMilkyWayTexture({ textureUrl: SPRITES.milkyWay, loader });
  const milkyWayBackground = new THREE.Color(0x000000);
  scene.background = milkyWayBackground;

  // The solar system's position in the Galaxy.
  //
  // NASA marks this with the `sun` entity's ordinary body label, anchored
  // left-at-position (`alignment = (0, 0.5)`), uppercased by CSS. There is no
  // dedicated marker object. We reproduce it here, placed at the solar system's
  // position on the Milky Way sprite, which is where the international charts
  // mark it — 7.98 kpc from the centre, not at it.
  const galacticSunLabel = makeGalacticSunLabel(labelLayer);

  const bodies = new Map<string, SceneBody>();
  const entityById = new Map(entities.map((e) => [e.id, e]));

  // --- Register bodies -------------------------------------------------------
  // Every body shares one Sun-direction vector, used by the night-lights
  // uniforms.
  const sunDirection = new THREE.Vector3(0, 0, 1);

  // Layer visibility, driven by the layer panel.
  const layers: Required<LayerVisibility> = { orbits: true, labels: true, stars: true };

  // Orbit lines keyed by body id; only the planets and the Moon have one.
  const orbitLines = new Map<string, THREE.Line>();

  /** The Sun's glow sprite, which is pixel-sized and follows the Sun. */
  let sunGlow: THREE.Sprite | null = null;

  /**
   * Atmosphere shells keyed by body id. These are separate scene objects (not
   * children of the body mesh) because their vertex shader expands the sphere
   * by `scaleHeight * 20` and pins `gl_Position.w`, so they need their own
   * position and orientation each frame.
   */
  const atmosphereShells = new Map<string, THREE.Mesh>();

  for (const entity of entities) {
    const isSun = entity.id === 'sun';
    const rKm = entity.radius ?? entity.extentsRadius ?? 1000;
    const isCore = entity.systemRadius !== null;

    // Core bodies get their full texture stack (normal/specular/night plus a
    // cloud shell); everything else gets a single colour map, because fetching
    // multi-megabyte cubemaps for 140 moons at once exhausts the connection
    // pool.
    let surfaceMaterial: THREE.Material;
    let shellMaterial: THREE.Material | undefined;

    if (isSun) {
      surfaceMaterial = new THREE.MeshBasicMaterial({ color: 0xffd9a0 });
    } else if (isCore) {
      // NASA ships up to 4096 for the planets' colour, normal, specular, night
      // and cloud maps (sizes: [16, 512, 4096]). Preferring 1024 left the
      // surface visibly soft next to the reference, so ask for the top size and
      // let `pickSize` fall back when a body does not have it.
      const built = buildSurface(entity, loader, 4096, sunDirection);
      surfaceMaterial = built.surface;
      shellMaterial = built.shell;
    } else {
      surfaceMaterial = new THREE.MeshStandardMaterial({ roughness: 0.9, metalness: 0 });
      const colorDesc = entity.textures.color;
      if (colorDesc) {
        const size = pickSize(colorDesc.sizes, 1024);
        (surfaceMaterial as THREE.MeshStandardMaterial).map = loader.load(
          textureUrl(colorDesc, size, 0),
          (t) => {
            t.colorSpace = THREE.SRGBColorSpace;
          },
        );
      } else {
        (surfaceMaterial as THREE.MeshStandardMaterial).color = new THREE.Color(
          bodyColorFn ? bodyColorFn(entity) : '#ffffff',
        );
      }
    }

    const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 48), surfaceMaterial);
    mesh.scale.setScalar(rKm);
    mesh.userData.entityId = entity.id;
    mesh.frustumCulled = false;
    scene.add(mesh);

    // Cloud/atmosphere shells.
    //
    // NASA attaches these separately and a body can have both:
    //   - an AtmosphereComponent (exactly eight bodies — Sun, Venus, Earth,
    //     Mars, Jupiter, Saturn, Uranus, Neptune), drawn with its scattering
    //     shader at renderOrder -1; and
    //   - a `decal` cloud texture, which Earth alone carries, drawn as its own
    //     translucent shell.
    // Dropping the cloud shell whenever an atmosphere exists would lose Earth's
    // clouds, so the two are independent.
    const atmosphere = ATMOSPHERES[entity.id];
    if (atmosphere) {
      const eq = entity.spheroid?.equatorialRadius ?? rKm;
      const pol = entity.spheroid?.polarRadius ?? rKm;
      const shell = new THREE.Mesh(
        buildAtmosphereGeometry(),
        buildAtmosphereMaterial(atmosphere, eq, pol),
      );
      shell.name = 'atmosphere';
      // NASA renders it at renderOrder -1, i.e. before the body itself.
      shell.renderOrder = -1;
      shell.frustumCulled = false;
      shell.userData.baseRadius = rKm;
      scene.add(shell);
      atmosphereShells.set(entity.id, shell);
    }
    if (shellMaterial) {
      const cloudShell = new THREE.Mesh(new THREE.SphereGeometry(1.012, 64, 48), shellMaterial);
      cloudShell.frustumCulled = false;
      mesh.add(cloudShell);
    }

    // Ring system, if this body has one. The rings are authored in kilometres
    // like the body, but they are parented to a mesh that is already scaled to
    // the body's radius, so the ring group is scaled back to compensate.
    const ringSpec = RING_SPECS[entity.id];
    if (ringSpec) {
      const rings = buildRings(ringSpec, loader);
      rings.scale.setScalar(1 / rKm);
      mesh.add(rings);
    }

    if (isSun) {
      // NASA's glow is a `SpriteComponent` on `sprites/sun_glow.png` with
      //   _sizeUnits: "pixels", _transparent: true, _blending: "normal",
      //   _billboard: true, _renderOrder: -2
      // — note **normal** blending, not additive: the sprite already carries its
      // own falloff. Verified live against the reference app.
      sunGlow = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: loader.load(SPRITES.sunGlow),
          transparent: true,
          depthWrite: false,
          blending: THREE.NormalBlending,
        }),
      );
      // Pixel-sized in NASA's units, so it is scaled in the frame loop from the
      // current pixel-space radius rather than in kilometres.
      sunGlow.renderOrder = -2;
      sunGlow.frustumCulled = false;
      scene.add(sunGlow);
    }

    // Orbit lines exist only for the eight planets and the Moon, with NASA's
    // own per-body colours (see `orbit-colors.ts`). Moons and spacecraft get
    // none, which is what keeps the view readable as bodies are added.
    const entityOrbit = orbits.get(entity.id) ?? null;
    if (
      hasOrbitLine(entity.id) &&
      entityOrbit &&
      entityOrbit.points.length > 0
    ) {
      const { rgb, alpha } = orbitColor(entity.id);
      const orbitLine = new THREE.Line(
        buildOrbitGeometry(entityOrbit.points[0]),
        new THREE.LineBasicMaterial({
          color: new THREE.Color(rgb[0], rgb[1], rgb[2]),
          transparent: true,
          opacity: alpha,
        }),
      );
      orbitLine.userData.epoch = entityOrbit.points[0].time;
      orbitLine.userData.owner = entity.id;
      orbitLine.visible = layers.orbits;
      scene.add(orbitLine);
      orbitLines.set(entity.id, orbitLine);
    }

    const label = makeLabel(labelLayer, entity);
    bodies.set(entity.id, {
      entity,
      orbit: entityOrbit,
      mesh,
      orbitLine: null,
      label,
      local: new THREE.Vector3(),
    });
  }

  // --- Per-frame state -------------------------------------------------------
  const tree: Map<string, TreeNode> = new Map();
  const worldById = new Map<string, THREE.Vector3>();

  let simTime = startTime;
  let daysPerSecond = 1;
  /** Whether the Milky Way background is currently attached. */
  let milkyWayShown = false;

  /** Rebuild the parenting tree only when a segment boundary is crossed. */
  let treeEpoch = Number.NaN;

  function rebuildTreeIfNeeded(): void {
    let changed = false;
    for (const b of bodies.values()) {
      for (const seg of b.entity.parents) {
        if (seg[0] > treeEpoch && seg[0] <= simTime) changed = true;
      }
      if (Number.isNaN(treeEpoch)) changed = true;
    }
    if (!changed) return;
    tree.clear();
    for (const node of buildTree(bodies.keys(), (id) => bodies.get(id)!.entity.parents, simTime)) {
      tree.set(node[0], node[1]);
    }
    treeEpoch = simTime;
  }

  /** Local position of a body at the current time, relative to its parent. */
  function computeLocal(body: SceneBody): THREE.Vector3 {
    const orbit = body.orbit;
    if (!orbit || orbit.points.length === 0) {
      // No ephemeris: the Sun (and static bodies) sit at the local origin.
      return body.local.set(0, 0, 0);
    }
    const p = nearestSample(orbit.points, simTime);
    const km = orbPositionAt(p, simTime);
    return body.local.set(km.x, km.y, km.z);
  }

  function updatePositions(): void {
    rebuildTreeIfNeeded();

    // Depth-first from the roots so parents move before their children.
    const ordered = [...bodies.values()].sort(
      (a, b) => depth(a) - depth(b),
    );

    const sunWorld = worldById.get('sun');

    for (const body of ordered) {
      const local = computeLocal(body);
      const parentId = tree.get(body.entity.id)?.parentId ?? null;
      const parentWorld = parentId ? worldById.get(parentId) : undefined;

      // Allocate a fresh vector per body per frame. Reusing `body.local` here
      // would alias the entry stored in `worldById`, so the next frame would
      // accumulate on top of the previous frame's already-summed value.
      const world = parentWorld
        ? new THREE.Vector3(local.x + parentWorld.x, local.y + parentWorld.y, local.z + parentWorld.z)
        : new THREE.Vector3(local.x, local.y, local.z);

      worldById.set(body.entity.id, world);
      body.mesh.position.copy(world);

      // Keep the Sun direction uniform in sync so night lights land on the
      // correct hemisphere.
      if (sunWorld && body.entity.id !== 'sun') {
        sunDirection.subVectors(sunWorld, world).normalize();
      }

      // Draw size: keep true kilometres, but never let a body fall below a few
      // pixels. Only the rendered radius changes — position stays exact, so
      // orbits and parenting are unaffected.
      const rKm = body.entity.radius ?? body.entity.extentsRadius ?? 0;
      if (rKm > 0) {
        const dist = world.distanceTo(camera.position);
        const maxDim = Math.max(container.clientWidth, container.clientHeight);
        const px = pixelSpaceRadius(rKm, dist, maxDim);
        if (px > 0 && px < MIN_VISIBLE_PIXEL_RADIUS) {
          const scale = MIN_VISIBLE_PIXEL_RADIUS / px;
          body.mesh.scale.setScalar(rKm * scale);
        } else {
          body.mesh.scale.setScalar(rKm);
        }

        // Rings are authored in km but live under a scaled mesh, so cancel the
        // mesh scale out every frame (the mesh scale changes as the minimum-size
        // rule kicks in).
        const rings = body.mesh.children.find((c) => c.name === 'rings');
        if (rings) rings.scale.setScalar(1 / body.mesh.scale.x);
      }
    }

    // Keep the Sun's glow on the Sun and at NASA's pixel size. The sprite is a
    // separate scene object (it is not parented to the mesh), so both its
    // position and its scale have to be set here.
    if (sunGlow) {
      const sunWorld = worldById.get('sun');
      if (sunWorld) {
        sunGlow.position.copy(sunWorld);
        const maxDim = Math.max(container.clientWidth, container.clientHeight);
        const sunRadius = bodies.get('sun')?.entity.radius ?? 695500;
        const px = pixelSpaceRadius(sunRadius, sunWorld.distanceTo(camera.position), maxDim);
        // NASA sizes this in pixels; scale so the sprite spans a few sun radii
        // on screen while never collapsing to nothing at distance.
        sunGlow.scale.setScalar(Math.max(24, px * 8));
      }
    }

    // Drive each atmosphere shell: position it on its body, hand it the Sun as
    // light 0, and give it the camera and orientation it needs to integrate.
    for (const [id, shell] of atmosphereShells) {
      const world = worldById.get(id);
      const body = bodies.get(id);
      if (!world || !body) continue;
      const material = shell.material as THREE.RawShaderMaterial;
      const u = material.uniforms;

      shell.position.copy(world);
      const scale = body.mesh.scale.x;
      shell.scale.setScalar(scale);

      // The shader works in the body's local frame, so the Sun and the camera
      // are expressed relative to the body and rotated into that frame.
      const sunWorld = worldById.get('sun') ?? new THREE.Vector3();
      const toSun = new THREE.Vector3().subVectors(sunWorld, world);
      const toCamera = new THREE.Vector3().subVectors(camera.position, world);
      const invOrientation = body.mesh.quaternion.clone().invert();
      toSun.applyQuaternion(invOrientation);
      toCamera.applyQuaternion(invOrientation);

      (u.lightPositions.value as THREE.Vector3[])[0].copy(toSun);
      (u.lightColors.value as THREE.Vector3[])[0].set(1, 1, 1);
      u.numLights.value = 1;
      u.cameraPosition.value.copy(toCamera);
      u.entityOrientation.value.set(
        entityOrientation().x,
        entityOrientation().y,
        entityOrientation().z,
        entityOrientation().w,
      );
    }
  }

  function depth(body: SceneBody): number {
    let d = 0;
    let cursor: string | null = body.entity.id;
    for (let i = 0; i < 64; i++) {
      cursor = tree.get(cursor)?.parentId ?? null;
      if (!cursor) break;
      d++;
    }
    return d;
  }

  // --- Camera ---------------------------------------------------------------
  let camTheta = Math.PI * 0.35;
  let camPhi = Math.PI * 0.34;
  let camRadius = 1.9e9;
  let focusedId: string | null = null;
  const focusTarget = new THREE.Vector3();
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let pointerMoved = 0;
  let pickCallback: ((id: string | null) => void) | null = null;

  function applyCamera(): void {
    const sinPhi = Math.sin(camPhi);
    camera.position.set(
      focusTarget.x + camRadius * sinPhi * Math.sin(camTheta),
      focusTarget.y + camRadius * Math.cos(camPhi),
      focusTarget.z + camRadius * sinPhi * Math.cos(camTheta),
    );
    camera.lookAt(focusTarget);

    // NASA derives near/mid planes from the camera's distance to the parent
    // body (0.1x, floored at 1e-5 km) rather than using a fixed pair. Without
    // this, a near/far ratio spanning 23 orders of magnitude destroys depth
    // precision and the Milky Way quad disappears behind the far plane.
    const near = Math.max(1e-5, camRadius * 0.05);
    const far = camRadius * 100;
    if (camera.near !== near || camera.far !== far) {
      camera.near = near;
      camera.far = far;
      camera.updateProjectionMatrix();
    }

    // `lookAt` only sets the quaternion; the world matrix everyone else
    // projects against is stale until this runs. The renderer refreshes it
    // later, but label projection and diagnostics happen before then.
    camera.updateMatrixWorld();
  }

  const el = renderer.domElement;
  const onDown = (e: PointerEvent) => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    pointerMoved = 0;
    el.setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent) => {
    if (!dragging) return;
    pointerMoved += Math.abs(e.clientX - lastX) + Math.abs(e.clientY - lastY);
    camTheta -= (e.clientX - lastX) * 0.005;
    camPhi = clamp(camPhi - (e.clientY - lastY) * 0.005, 0.06, Math.PI - 0.06);
    lastX = e.clientX;
    lastY = e.clientY;
  };
  const onUp = (e: PointerEvent) => {
    dragging = false;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    // Treat a press that barely moved as a click, matching how NASA's labels
    // behave: dragging orbits, tapping selects.
    if (pointerMoved < 6) pickAt(e.clientX, e.clientY);
  };
  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    // Upper bound is NASA's `_defaultMaxDistance` (2e18 km), which is what lets
    // the camera pull out far enough to reach the Milky Way backdrop.
    camRadius = clamp(camRadius * (1 + Math.sign(e.deltaY) * 0.12), 1e2, 2e18);
  };

  /**
   * Pick the nearest body to a screen point. Screen-space picking (rather than
   * raycasting) matches NASA's label quadtree and keeps tiny bodies selectable.
   */
  function pickAt(clientX: number, clientY: number): void {
    const rect = el.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    const maxDim = Math.max(rect.width, rect.height);

    let best: string | null = null;
    let bestScore = Number.POSITIVE_INFINITY;

    for (const body of bodies.values()) {
      const world = worldById.get(body.entity.id);
      if (!world) continue;
      const v = world.clone().project(camera);
      if (v.z >= 1) continue;
      const sx = (v.x * 0.5 + 0.5) * rect.width;
      const sy = (-v.y * 0.5 + 0.5) * rect.height;
      const drawnKm = body.mesh.scale.x;
      const dist = world.distanceTo(camera.position);
      const screenR = Math.max(8, pixelSpaceRadius(drawnKm, dist, maxDim));
      const d = Math.hypot(sx - px, sy - py);
      if (d <= screenR + 8 && d < bestScore) {
        bestScore = d;
        best = body.entity.id;
      }
    }
    pickCallback?.(best);
  }

  el.addEventListener('pointerdown', onDown);
  el.addEventListener('pointermove', onMove);
  el.addEventListener('pointerup', onUp);
  el.addEventListener('wheel', onWheel, { passive: false });

  // Fallback for environments that emit only mouse events (some automation
  // drivers and older browsers do not synthesise Pointer Events).
  const onMouseDown = (e: MouseEvent) => { if (!dragging) onDown(e as unknown as PointerEvent); };
  const onMouseUp = (e: MouseEvent) => {
    if (dragging) {
      dragging = false;
      if (pointerMoved < 6) pickAt(e.clientX, e.clientY);
    }
  };
  const onMouseMove = (e: MouseEvent) => { if (dragging) onMove(e as unknown as PointerEvent); };
  if (typeof window !== 'undefined' && typeof window.PointerEvent === 'undefined') {
    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mousemove', onMouseMove);
  }

  function projectLabels(suppress: HTMLDivElement | null, suppressOn: boolean): void {
    const rect = container.getBoundingClientRect();
    const placed: { x: number; y: number }[] = [];
    // NASA resolves label overlaps by a fixed per-category weight
    // (`LabelManager._weightMap`), highest first: stars and galaxies survive,
    // barycentres are always sacrificed. Radius alone is not the rule.
    const order = [...bodies.values()].sort(
      (a, b) =>
        labelWeight(b.entity.id, b.entity.category ?? '', b.entity.subcategory ?? '') -
        labelWeight(a.entity.id, a.entity.category ?? '', a.entity.subcategory ?? ''),
    );

    for (const body of order) {
      const world = worldById.get(body.entity.id);
      if (!world) continue;
      const v = world.clone();
      v.project(camera);
      const inFrame = v.z < 1 && v.x > -0.98 && v.x < 0.98 && v.y > -0.98 && v.y < 0.98;
      const x = (v.x * 0.5 + 0.5) * rect.width;
      const y = (-v.y * 0.5 + 0.5) * rect.height;
      const collides = placed.some((p) => Math.abs(p.x - x) < 70 && Math.abs(p.y - y) < 15);
      // The galactic view swaps the Sun's own label for the marker showing the
      // solar system's position on the Milky Way sprite.
      const swappedOut = suppressOn && body.label === suppress;
      const show = layers.labels && inFrame && !collides && !swappedOut;
      if (show) placed.push({ x, y });
      const s = body.label.style;
      // The label's left edge sits at the body's projected position; the icon
      // then hangs 28px further left and the text begins 18px to the right,
      // matching `.pioneer-label-div { left: 18px }` with its icon translate.
      s.transform = `translate(0, -50%) translate(${x}px, ${y}px)`;
      s.opacity = show ? '1' : '0';
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

    updatePositions();

    const focus = focusedId ? worldById.get(focusedId) : null;
    if (focus) {
      // Track the body exactly. An exponential follow would lag by a fixed
      // offset while the body keeps moving, pushing it out of frame.
      focusTarget.copy(focus);
    } else {
      focusTarget.lerp(new THREE.Vector3(0, 0, 0), 0.08);
    }

    // Stars stay pinned to the camera so they never grow into blobs as the
    // camera crosses 15 orders of magnitude in scale. NASA does the same with a
    // shader that pins stars to infinity.
    for (const s of starLayers) s.position.copy(camera.position);

    // Swap in the Milky Way once the camera is far outside the solar system,
    // matching NASA's `z-distance` visible interval on the galactic quad.
    const galactic = milkyWayVisible(camRadius);
    if (galactic !== milkyWayShown) {
      milkyWayShown = galactic;
      scene.background = galactic ? milkyWayTexture : milkyWayBackground;
    }

    // At galactic scale the Sun's ordinary label is meaningless — the Sun is a
    // sub-pixel point — so it is replaced by a label marking the solar system's
    // position on the Milky Way sprite. This is the "SUN" the international
    // charts carry, and it is deliberately *not* at the centre: the solar system
    // is 7.98 kpc out along the galactic-centre line.
    const rect = container.getBoundingClientRect();
    const sunLabelVisible = galactic && layers.labels;
    const bodySunLabel = bodies.get('sun')?.label;
    updateGalacticSunLabel(
      galacticSunLabel,
      sunLabelVisible,
      sunLabelVisible ? projectSunOntoBackdrop(rect.width, rect.height) : null,
    );

    applyCamera();
    projectLabels(bodySunLabel ?? null, sunLabelVisible);
    renderer.render(scene, camera);
  }

  updatePositions();
  animate();

  // Debug hook used by `tools/body-sizes.cjs` to audit on-screen sizes.
  if (typeof window !== 'undefined') {
    (window as unknown as Record<string, unknown>).__solarDebug = {
      /** Programmatic pick in canvas-relative coordinates (for automation). */
      pick(x: number, y: number) {
        const rect = el.getBoundingClientRect();
        pickAt(rect.left + x, rect.top + y);
      },
      /** Inspect the Milky Way backdrop (for automation). */
      milkyWay() {
        return {
          shown: milkyWayShown,
          backgroundIsTexture: scene.background === milkyWayTexture,
          hasImage: Boolean(milkyWayTexture.image),
          image: milkyWayTexture.image
            ? `${(milkyWayTexture.image as { width?: number }).width}x${(milkyWayTexture.image as { height?: number }).height}`
            : null,
          cameraRadius: camRadius,
          cameraNear: camera.near,
          cameraFar: camera.far,
          /** The solar system's marked position, as NASA's charts show it. */
          sunLabel: {
            text: galacticSunLabel.textContent,
            opacity: galacticSunLabel.style.opacity,
            transform: galacticSunLabel.style.transform,
            screen: (() => {
              const r = container.getBoundingClientRect();
              const p = projectSunOntoBackdrop(r.width, r.height);
              return { x: Math.round(p.x), y: Math.round(p.y), u: p.u, v: p.v };
            })(),
          },
          render: {
            calls: renderer.info.render.calls,
            triangles: renderer.info.render.triangles,
          },
        };
      },
      /** Toggle the starfield, to isolate the backdrop (for automation). */
      toggleStars(on: boolean) {
        for (const s of starLayers) s.visible = on;
      },
      /** Jump to the galactic scale, for automation. */
      setGalaxyZoom() {
        focusedId = null;
        focusTarget.set(0, 0, 0);
        camRadius = 1.8e18;
      },
      /** Focus a body by id without going through the DOM (for automation). */
      focus(id: string | null) {
        focusedId = id;
        if (!id) {
          camRadius = 1.9e9;
          return;
        }
        const entity = entityById.get(id);
        const rKm = entity?.radius ?? entity?.extentsRadius ?? 5000;
        // Ring systems extend well beyond the body, so frame generously.
        const ring = RING_SPECS[id];
        const frameKm = ring ? ring.outerRadius * 1.4 : rKm * 6;
        camRadius = Math.max(frameKm, 2e3);
      },
      /** Snapshot of camera and a body's world position (for automation). */
      camera() {
        const w = focusedId ? worldById.get(focusedId) : null;
        return {
          focusedId,
          camRadius,
          milkyWayVisible: milkyWayShown,
          camera: [camera.position.x, camera.position.y, camera.position.z],
          focusTarget: [focusTarget.x, focusTarget.y, focusTarget.z],
          bodyWorld: w ? [w.x, w.y, w.z] : null,
        };
      },
      /**
       * Jump the camera to a named scale, for automation.
       *   inner   NASA's `goToSystem("inner_solar_system")` distance, 7e8 km
       *   outer   NASA's `goToSystem("outer_solar_system")` distance, 1e10 km
       *   galaxy  1.8e18 km, which frames the whole 1.2e18 km sprite
       */
      setZoom(preset: string) {
        focusedId = null;
        focusTarget.set(0, 0, 0);
        if (preset === 'inner') camRadius = 7e8;
        else if (preset === 'outer') camRadius = 1e10;
        else if (preset === 'galaxy') camRadius = 1.8e18;
      },
      /** Inspect a body's mesh hierarchy (for automation). */
      inspect(id: string) {
        const body = bodies.get(id);
        if (!body) return { error: 'no body' };
        const rings = body.mesh.children.find((c) => c.name === 'rings');
        return {
          id,
          meshScale: body.mesh.scale.toArray(),
          children: body.mesh.children.map((c) => ({
            name: c.name || c.type,
            type: c.type,
            visible: c.visible,
            scale: c.scale.toArray(),
          })),
          rings: rings
            ? {
                scale: rings.scale.toArray(),
                children: rings.children.map((m) => ({
                  type: m.type,
                  visible: m.visible,
                  count: (m as THREE.Mesh).geometry?.attributes?.position?.count ?? 0,
                })),
              }
            : null,
        };
      },
      screenPositions() {
        const rect = container.getBoundingClientRect();
        return [...bodies.values()].map((body) => {
          const world = worldById.get(body.entity.id) ?? new THREE.Vector3();
          const v = world.clone().project(camera);
          return {
            id: body.entity.id,
            x: (v.x * 0.5 + 0.5) * rect.width,
            y: (-v.y * 0.5 + 0.5) * rect.height,
          };
        });
      },
      report() {
        const maxDim = Math.max(container.clientWidth, container.clientHeight);
        const rows = [...bodies.values()]
          .map((body) => {
            const world = worldById.get(body.entity.id);
            const dist = world ? world.distanceTo(camera.position) : NaN;
            const rKm = body.entity.radius ?? body.entity.extentsRadius ?? 0;
            const drawnKm = rKm > 0 ? body.mesh.scale.x : 0;
            return {
              id: body.entity.id,
              rKm,
              drawnKm,
              px: drawnKm > 0 && Number.isFinite(dist) ? pixelSpaceRadius(drawnKm, dist, maxDim) : 0,
              parent: tree.get(body.entity.id)?.parentId ?? null,
            };
          })
          .sort((a, b) => b.px - a.px);
        return { count: rows.length, camRadius, rows };
      },
    };
  }

  return {
    bodies,
    setTime(t) {
      simTime = t;
      treeEpoch = Number.NaN;
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
        camRadius = 1.9e9;
        return;
      }
      const entity = entityById.get(id);
      const rKm = entity?.radius ?? entity?.extentsRadius ?? 5000;
      // Ring systems extend far beyond the body, so frame generously.
      const ring = RING_SPECS[id];
      const frameKm = ring ? ring.outerRadius * 1.4 : rKm * 6;
      camRadius = Math.max(frameKm, 2e3);
    },
    onPick(callback) {
      pickCallback = callback;
    },
    setLayers(visibility) {
      Object.assign(layers, visibility);
      for (const line of orbitLines.values()) line.visible = layers.orbits;
      for (const body of bodies.values()) {
        if (!layers.labels) body.label.style.opacity = '0';
      }
      for (const s of starLayers) s.visible = layers.stars;
    },
    setTimeScale(days) {
      daysPerSecond = days;
    },
    getTimeScale() {
      return daysPerSecond;
    },
    visibleCount() {
      const maxDim = Math.max(container.clientWidth, container.clientHeight);
      let n = 0;
      for (const body of bodies.values()) {
        const world = worldById.get(body.entity.id);
        if (!world) continue;
        const dist = world.distanceTo(camera.position);
        const rKm = body.entity.radius ?? body.entity.extentsRadius ?? 0;
        if (rKm <= 0) continue;
        if (pixelSpaceRadius(rKm, dist, maxDim) >= 0.5) n++;
      }
      return n;
    },
    dispose() {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mousemove', onMouseMove);
      labelLayer.remove();
      for (const body of bodies.values()) {
        body.mesh.geometry.dispose();
        (body.mesh.material as THREE.Material).dispose();
      }
      for (const line of orbitLines.values()) {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      }
      for (const s of starLayers) {
        s.geometry.dispose();
        (s.material as THREE.Material).dispose();
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

/** Sample one full period of an osculating orbit, relative to its parent. */
function buildOrbitGeometry(point: OrbPoint): THREE.BufferGeometry {
  const SEGMENTS = ORBIT_SEGMENTS;
  const positions = new Float32Array((SEGMENTS + 1) * 3);
  const period = (2 * Math.PI) / Math.abs(point.meanAngularMotion || 1e-12);
  for (let i = 0; i <= SEGMENTS; i++) {
    const t = point.time + (i / SEGMENTS) * period;
    const km = orbPositionAt(point, t);
    positions[i * 3] = km.x;
    positions[i * 3 + 1] = km.y;
    positions[i * 3 + 2] = km.z;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return geometry;
}

function makeLabel(layer: HTMLElement, entity: CatalogEntity): HTMLDivElement {
  // Structure and metrics match NASA's `.pioneer-label-div` exactly: a
  // `<span class="icon">` carrying the `icon-circle-<body>` sprite sits to the
  // LEFT of a `<span class="text">`. The text is always pure white at 0.75
  // opacity; only the icon carries the body's colour.
  const isSun = entity.id === 'sun';
  const isSpacecraft = entity.groups.includes('spacecraft');

  const el = document.createElement('div');
  el.style.cssText = [
    'position:absolute',
    'left:0',
    'top:0',
    'pointer-events:none',
    'display:flex',
    'align-items:center',
    'white-space:nowrap',
    'transition:opacity 250ms ease-out',
  ].join(';');

  const iconSize = isSpacecraft ? LABEL.iconSizeSpacecraft : LABEL.iconSize;
  const iconOffsetX = isSpacecraft ? LABEL.iconOffsetXSpacecraft : LABEL.iconOffsetX;

  const icon = document.createElement('img');
  icon.src = `/icons/icon-${bodyIconName(entity.id, entity.category ?? '')}.svg`;
  icon.alt = '';
  icon.draggable = false;
  icon.style.cssText = [
    `width:${iconSize}px`,
    `height:${iconSize}px`,
    // NASA positions the icon at translate(-50% - 18px, -50% + 6px) from the
    // label origin; we place it in flow and pull it back by the same amount.
    `margin-left:${iconOffsetX}px`,
    `margin-top:${LABEL.iconOffsetY}px`,
    'flex:0 0 auto',
    'display:block',
  ].join(';');

  const text = document.createElement('span');
  text.textContent = entity.label;
  text.style.cssText = [
    'font-family:var(--nasa-font, Metropolis, sans-serif)',
    `font-size:${isSun ? LABEL.fontSizeSun : LABEL.fontSize}px`,
    `font-weight:${LABEL.weight}`,
    `letter-spacing:${isSun ? LABEL.letterSpacingSun : LABEL.letterSpacing}`,
    'text-transform:uppercase',
    `color:${LABEL.color}`,
    `opacity:${LABEL.opacity}`,
    // NASA sets no text-shadow on these labels.
    'white-space:nowrap',
  ].join(';');

  el.appendChild(icon);
  el.appendChild(text);
  layer.appendChild(el);
  return el;
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

/**
 * The body's spin orientation at the current time, for the atmosphere shader.
 *
 * NASA feeds `entity.getOrientation()` into `entityOrientation`. We have no
 * orientation controller wired up yet, so the identity is returned — which is
 * the honest answer and simply means the atmosphere is integrated in the
 * unrotated body frame. When `.ori` controllers land, this becomes a lookup.
 */
function entityOrientation(): THREE.Quaternion {
  return IDENTITY_QUATERNION;
}

const IDENTITY_QUATERNION = new THREE.Quaternion();

/**
 * The solar system's position in the Galaxy, as NASA's charts present it.
 *
 * NASA draws no dedicated marker: the visible "SUN" is the `sun` entity's own
 * `.pioneer-label-div`, uppercased by CSS. It carries the Sun's font metrics
 * (18px / 600 / 5.4px tracking / white at 0.75) and nothing else — no icon, no
 * glow, no dot. We build the same label here, then place it at the solar
 * system's position on the Milky Way sprite (see `projectSunOntoBackdrop`),
 * which is what makes it readable at galactic scale.
 */
function makeGalacticSunLabel(layer: HTMLElement): HTMLDivElement {
  const el = document.createElement('div');
  el.style.cssText = [
    'position:absolute',
    'left:0',
    'top:0',
    'pointer-events:none',
    'white-space:nowrap',
    'opacity:0',
    'transition:opacity 250ms ease-out',
  ].join(';');

  const text = document.createElement('span');
  text.textContent = 'SUN';
  text.style.cssText = [
    'font-family:var(--nasa-font, Metropolis, sans-serif)',
    `font-size:${LABEL.fontSizeSun}px`,
    `font-weight:${LABEL.weight}`,
    `letter-spacing:${LABEL.letterSpacingSun}`,
    'text-transform:uppercase',
    `color:${LABEL.color}`,
    `opacity:${LABEL.opacity}`,
    'white-space:nowrap',
  ].join(';');
  el.appendChild(text);
  layer.appendChild(el);
  return el;
}

/**
 * Place the galactic Sun label.
 *
 * NASA's `DivComponent` uses `alignment = (0, 0.5)`: the text's **left edge**
 * sits at the body's projected screen position, vertically centred, so the text
 * extends to the right. The position is the solar system's place on the Milky
 * Way sprite — 7.98 kpc out along the galactic-centre line, on the sprite's
 * −X axis, i.e. ~29.5% across the texture.
 */
function updateGalacticSunLabel(
  label: HTMLDivElement,
  visible: boolean,
  projected: { x: number; y: number } | null = null,
): void {
  if (!visible || !projected) {
    label.style.opacity = '0';
    return;
  }
  label.style.transform = `translate(${Math.round(projected.x)}px, ${Math.round(projected.y)}px) translateY(-50%)`;
  label.style.opacity = '1';
}

export { ALWAYS, parentAtTime };
