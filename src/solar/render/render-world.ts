import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { parseStarfield } from '../../lib/scene/starfield';
import { pickSize, starfieldUrl, textureUrl } from '../../lib/nasa/assets';
import { DEFAULT_PRESET } from '../../lib/theme/palette';
import type { ExplorerBodyDefinition } from '../config/default-scene';
import type { ExplorerSnapshot } from '../runtime/explorer-runtime';
import { ResourcePool, type ResourceLease } from '../runtime/resource-pool';
import { cameraFitDistance } from './camera';
import { createSpheroidFace } from './spheroid';

export interface RenderWorldOptions {
  readonly textureSize?: number;
  readonly maxTextureBytes?: number;
  readonly pixelRatioLimit?: number;
  readonly onSelect: (id: string) => void;
}

export interface RenderDiagnostics {
  readonly drawCalls: number;
  readonly triangles: number;
  readonly geometries: number;
  readonly textures: number;
  readonly textureResources: ReturnType<ResourcePool<THREE.Texture>['snapshot']>;
  readonly errors: Readonly<Record<string, string>>;
}

export interface RenderWorld {
  update(snapshot: ExplorerSnapshot): void;
  resize(): void;
  resetCamera(): void;
  snapshot(): RenderDiagnostics;
  dispose(): void;
}

/** This owner is deliberately separate from the data runtime: neither starts the other's frame loop. */
export function createRenderWorld(container: HTMLElement, definitions: readonly ExplorerBodyDefinition[], options: RenderWorldOptions): RenderWorld {
  if (!Number.isFinite(options.pixelRatioLimit ?? 2) || (options.pixelRatioLimit ?? 2) <= 0) throw new RangeError('pixelRatioLimit must be finite and positive');
  if (!Number.isFinite(options.maxTextureBytes ?? 1) || (options.maxTextureBytes ?? 1) < 0) throw new RangeError('maxTextureBytes must be finite and nonnegative');
  if (!Number.isSafeInteger(options.textureSize ?? 512) || (options.textureSize ?? 512) < 1) throw new RangeError('textureSize must be a positive integer');
  let disposed = false;
  const cleanup: (() => void)[] = [];
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    for (const release of cleanup.reverse()) { try { release(); } catch { /* Finish releasing other owners after a failed driver cleanup. */ } }
  };
  try {
    const renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true, alpha: false });
    cleanup.push(() => { renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove(); });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, options.pixelRatioLimit ?? 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(DEFAULT_PRESET.colors.deep);
    renderer.domElement.setAttribute('aria-label', 'Interactive solar system');
    renderer.domElement.setAttribute('role', 'img');
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, .01, 1e15);
    camera.up.set(0, 0, 1);
    const controls = new OrbitControls(camera, renderer.domElement);
    cleanup.push(() => controls.dispose());
    controls.enableDamping = true;
    controls.dampingFactor = .09;
    const ambient = new THREE.AmbientLight(0xffffff, .12);
    const sunlight = new THREE.DirectionalLight(0xffffff, 2.7);
    const sunTarget = new THREE.Object3D();
    sunlight.target = sunTarget;
    scene.add(ambient, sunlight, sunTarget);
    const rootAbort = new AbortController();
    cleanup.push(() => rootAbort.abort());
    let selectedId = '';
    const errors: Record<string, string> = {};
    const leases: ResourceLease<THREE.Texture>[] = [];
    const objects = new Map<string, THREE.Group>();
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    cleanup.push(() => { for (const geometry of geometries) geometry.dispose(); for (const material of materials) material.dispose(); scene.clear(); });
    const pickable: THREE.Object3D[] = [];
    const pool = new ResourcePool<THREE.Texture>({
      maxConcurrent: 4,
      maxBytes: options.maxTextureBytes ?? 64 * 1024 * 1024,
      sizeOf(texture) {
        const image = texture.image as ImageBitmap;
        return image.width * image.height * 4 * 4 / 3;
      },
      dispose(texture) {
        texture.dispose();
        (texture.image as ImageBitmap).close();
      },
    });
    const rawPool = new ResourcePool<ArrayBuffer>({ maxConcurrent: 2, maxBytes: 4 * 1024 * 1024, sizeOf: value => value.byteLength });

    cleanup.push(() => { for (const lease of leases) lease.release(); pool.dispose(); rawPool.dispose(); });

    const loadTexture = async (url: string, signal: AbortSignal): Promise<THREE.Texture> => {
      const response = await fetch(url, { signal });
      if (!response.ok) throw new Error(`Texture HTTP ${response.status}: ${url}`);
      // The source downloader supplies an unflipped ImageBitmap and the face UV is already reversed.
      const image = await createImageBitmap(await response.blob(), { imageOrientation: 'none', premultiplyAlpha: 'none', colorSpaceConversion: 'none' });
      try {
        const texture = new THREE.Texture(image);
        texture.flipY = false;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
        texture.needsUpdate = true;
        return texture;
      } catch (error) {
        image.close();
        throw error;
      }
    };

    for (const definition of definitions) {
      const group = new THREE.Group();
      group.name = definition.id;
      group.visible = false;
      objects.set(definition.id, group);
      scene.add(group);
      if (definition.kind === 'marker') {
        const geometry = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0], 3));
        const material = new THREE.PointsMaterial({ color: DEFAULT_PRESET.colors.accent, size: 8, sizeAttenuation: false });
        const marker = new THREE.Points(geometry, material);
        marker.userData.entityId = definition.id;
        group.add(marker);
        geometries.add(geometry);
        materials.add(material);
        pickable.push(marker);
      } else if (definition.kind === 'star') {
        const geometry = new THREE.SphereGeometry(definition.radiusKm, 48, 24);
        const material = new THREE.MeshBasicMaterial({ color: 0xffedbf });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData.entityId = definition.id;
        group.add(mesh);
        geometries.add(geometry);
        materials.add(material);
        pickable.push(mesh);
      } else {
        for (let face = 0; face < 6; face++) {
          const geometry = createSpheroidFace(face, definition.radiusKm, definition.polarRadiusKm ?? definition.radiusKm, definition.planetographic ?? true);
          const material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, metalness: 0 });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.userData.entityId = definition.id;
          group.add(mesh);
          geometries.add(geometry);
          materials.add(material);
          pickable.push(mesh);
          if (definition.texture) {
            const url = textureUrl(definition.texture, pickSize(definition.texture.sizes, options.textureSize ?? 512), face);
            const lease = pool.acquire(url, signal => loadTexture(url, signal), rootAbort.signal);
            leases.push(lease);
            void lease.ready.then(texture => {
              if (!disposed) {
                material.map = texture;
                material.needsUpdate = true;
              }
            }).catch(error => {
              if (!disposed) errors[url] = error instanceof Error ? error.message : String(error);
            });
          }
        }
      }
    }

    const sky = new THREE.Group();
    scene.add(sky);
    for (const layer of [0, 1]) {
      const url = starfieldUrl(layer);
      const lease = rawPool.acquire(url, async signal => {
        const response = await fetch(url, { signal });
        if (!response.ok) throw new Error(`Starfield HTTP ${response.status}`);
        return response.arrayBuffer();
      }, rootAbort.signal);
      void lease.ready.then(buffer => {
        if (disposed) return;
        if (buffer.byteLength < 4) throw new Error('Truncated starfield header');
        const count = new DataView(buffer).getInt32(0, true);
        if (count < 0 || count > Math.floor((buffer.byteLength - 4) / 23)) throw new Error('Truncated starfield records');
        const stars = parseStarfield(buffer);
        const positions = new Float32Array(stars.length * 3);
        const colors = new Float32Array(positions.length);
        stars.forEach((star, index) => {
          const direction = star.position.clone().normalize().multiplyScalar(1e12);
          const intensity = Math.min(1, Math.max(.12, 10 ** (-.16 * star.magnitude)));
          positions.set(direction.toArray(), index * 3);
          colors.set([star.color.r * intensity, star.color.g * intensity, star.color.b * intensity], index * 3);
        });
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        const material = new THREE.PointsMaterial({ size: layer === 0 ? 2 : 1.3, sizeAttenuation: false, vertexColors: true, depthTest: false, depthWrite: false });
        const points = new THREE.Points(geometry, material);
        points.frustumCulled = false;
        points.renderOrder = -10;
        sky.add(points);
        geometries.add(geometry);
        materials.add(material);
      }).catch(error => {
        if (!disposed) errors[url] = error instanceof Error ? error.message : String(error);
      }).finally(() => lease.release());
    }

    const resize = () => {
      if (disposed) return;
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      const previousAspect = camera.aspect;
      camera.aspect = width / height;
      camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(Math.PI / 6) / Math.max(1, camera.aspect)));
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      if (previousAspect !== camera.aspect) selectedId = '';
    };
    const observer = new ResizeObserver(resize);
    cleanup.push(() => observer.disconnect());
    observer.observe(container);
    resize();
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let down: readonly [number, number] | null = null;
    const onDown = (event: PointerEvent) => { down = [event.clientX, event.clientY]; };
    const onUp = (event: PointerEvent) => {
      if (!down || Math.hypot(event.clientX - down[0], event.clientY - down[1]) > 4) return;
      down = null;
      const box = renderer.domElement.getBoundingClientRect();
      pointer.set(2 * (event.clientX - box.left) / box.width - 1, 1 - 2 * (event.clientY - box.top) / box.height);
      raycaster.params.Points.threshold = camera.position.length() * .001;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(pickable.filter(object => object.parent?.visible), false);
      const id = hits[0]?.object.userData.entityId;
      if (typeof id === 'string') options.onSelect(id);
    };
    cleanup.push(() => { renderer.domElement.removeEventListener('pointerdown', onDown); renderer.domElement.removeEventListener('pointerup', onUp); });
    renderer.domElement.addEventListener('pointerdown', onDown);
    renderer.domElement.addEventListener('pointerup', onUp);

    return {
      resize,
      resetCamera() { selectedId = ''; },
      update(snapshot) {
        if (disposed) return;
        const focus = snapshot.frames.get(snapshot.selectedId);
        const focusReady = focus?.status === 'ready';
        if (focusReady && snapshot.selectedId !== selectedId) {
          selectedId = snapshot.selectedId;
          const definition = definitions.find(body => body.id === selectedId);
          const radius = definition?.radiusKm ?? 6378;
          const distance = Math.max(1, cameraFitDistance(radius, THREE.MathUtils.degToRad(camera.fov), camera.aspect));
          controls.target.set(0, 0, 0);
          const sun = snapshot.frames.get('sun');
          if (focusReady && sun?.status === 'ready' && selectedId !== 'sun') {
            camera.position.set(sun.position.x - focus.position.x, sun.position.y - focus.position.y, sun.position.z - focus.position.z).normalize();
            camera.position.z += .35;
          } else camera.position.set(1.15, -1, .45);
          camera.position.normalize().multiplyScalar(distance);
          controls.minDistance = Math.max(.00001, radius * 1.03);
          controls.maxDistance = 1e14;
          camera.near = Math.max(.000001, radius * .0005);
          camera.updateProjectionMatrix();
        }
        for (const [id, group] of objects) {
          const frame = snapshot.frames.get(id);
          group.visible = focusReady && frame?.status === 'ready';
          if (group.visible && focusReady && frame?.status === 'ready') {
            group.position.set(frame.position.x - focus.position.x, frame.position.y - focus.position.y, frame.position.z - focus.position.z);
            if (frame.orientation) group.quaternion.set(frame.orientation.x, frame.orientation.y, frame.orientation.z, frame.orientation.w);
          }
        }
        if (focusReady) {
          const sun = snapshot.frames.get('sun');
          if (sun?.status === 'ready') {
            sunlight.position.set(sun.position.x - focus.position.x, sun.position.y - focus.position.y, sun.position.z - focus.position.z);
            sunTarget.position.set(0, 0, 0);
            if (sunlight.position.lengthSq() === 0) sunlight.position.set(0, -1e8, 1e8);
          }
        }
        controls.update();
        sky.position.copy(camera.position);
        renderer.render(scene, camera);
      },
      snapshot() {
        return {
          drawCalls: renderer.info.render.calls,
          triangles: renderer.info.render.triangles,
          geometries: renderer.info.memory.geometries,
          textures: renderer.info.memory.textures,
          textureResources: pool.snapshot(),
          errors: { ...errors },
        };
      },
      dispose,
    };
  } catch (error) {
    dispose();
    throw error;
  }
}
