import * as THREE from 'three';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { parseStarfield } from '../../lib/scene/starfield';
import { pickSize, starfieldUrl, textureUrl, SPRITES, GALAXIES_URL, CONSTELLATIONS_URL } from '../../lib/nasa/assets';
import { eyesOrbitStyle, eyesOrbitFade } from '../config/eyes-display';
import { parseConstellations } from '../domain/sky';
import { createSkyStars } from './sky';
import type { ExplorerBodyDefinition } from '../config/default-scene';
import type { ExplorerRenderFrame } from '../runtime/explorer-runtime';
import type { Vec3 } from '../../lib/dynamo/math';
import { orbitGeometryNeedsUpdate } from './orbit-cache';
import { ResourcePool, type ResourceLease } from '../runtime/resource-pool';
import { EphemerisRepository } from '../runtime/ephemeris-repository';
import { activePhaseIndex } from '../domain/entities';
import { orbitalBodyFactor, orbitPolyline, osculatingPolyline, sampledPolyline } from '../domain/trajectories';
import type { OrbPoint } from '../../lib/dynamo/parse';
import { sampleTrailHistory } from '../domain/trails';
import { createTrailMaterial, setTrailProgress, setTrailHover } from './trail-material';
import { projectedSystemVisible, type SceneMode } from '../ui/navigation';
import { modelExtentRadius } from './model-bounds';
import { applyFrameTransform } from './frame';
import { placeScreenLabel } from './labels';
import { cameraFitDistance, modelIsResolvable } from './camera';
import { createSpheroidFace } from './spheroid';
import { createRingGeometry, PLANET_RINGS } from './rings';
import { createModelLibrary, type ModelLease } from './models';
export interface RenderWorldOptions {
    readonly textureSize?: number;
    readonly maxTextureBytes?: number;
    readonly pixelRatioLimit?: number;
    readonly onSelect: (id: string) => void;
}
export interface RenderDiagnostics {
    readonly orbitGeometryUpdates: number;
    readonly trailGaps: Readonly<Record<string,string>>;
    readonly drawCalls: number;
    readonly triangles: number;
    readonly geometries: number;
    readonly textures: number;
    readonly textureResources: ReturnType<ResourcePool<THREE.Texture>['snapshot']>;
    readonly models: ReturnType<ReturnType<typeof createModelLibrary>['snapshot']>;
    readonly errors: Readonly<Record<string, string>>;
}
export interface RenderWorld {
    update(snapshot: ExplorerRenderFrame): void;
    expandedSystems(snapshot: ExplorerRenderFrame): readonly string[];
    setVisible(ids: readonly string[]): void;
    setView(mode: SceneMode, visibleIds: readonly string[]): void;
    setLayers(layers: {
        labels?: boolean;
        orbits?: boolean;
        stars?: boolean;
        constellations?: boolean;
    }): void;
    resize(): void;
    resetCamera(): void;
    snapshot(): RenderDiagnostics;
    dispose(): void;
}
type BodyVisual = {
    group: THREE.Group;
    geometries: THREE.BufferGeometry[];
    materials: THREE.Material[];
    textures: ResourceLease<THREE.Texture>[];
    model?: ModelLease;
    modelRadius?: number;
    label: HTMLButtonElement;
    leader: HTMLSpanElement;
    marker: HTMLSpanElement;
};
type Trail = {
    line: Line2;
    parentId: string | null;
    phaseIndex: number;
    timeEt: number;
    mu?: number;
    geometryPosition?: Vec3;
    refreshSeconds: number;
    history: boolean;
};
/** Camera-relative rendering owns GPU resources; the simulation owns physical states. */
export function createRenderWorld(container: HTMLElement, definitions: readonly ExplorerBodyDefinition[], options: RenderWorldOptions): RenderWorld {
    if (!Number.isFinite(options.pixelRatioLimit ?? 2) || (options.pixelRatioLimit ?? 2) <= 0)
        throw new RangeError('pixelRatioLimit must be finite and positive');
    if (!Number.isFinite(options.maxTextureBytes ?? 1) || (options.maxTextureBytes ?? 1) < 0)
        throw new RangeError('maxTextureBytes must be finite and nonnegative');
    if (!Number.isSafeInteger(options.textureSize ?? 512) || (options.textureSize ?? 512) < 1)
        throw new RangeError('textureSize must be a positive integer');
    let viewportWidth=container.clientWidth, viewportHeight=container.clientHeight;
    const byId = new Map(definitions.map(body => [body.id, body]));
    let disposed = false;
    const cleanup: (() => void)[] = [];
    const dispose = () => { if (disposed)
        return; disposed = true; for (const release of cleanup.reverse()) {
        try {
            release();
        }
        catch { /* Release remaining owners even if a driver cleanup fails. */ }
    } };
    try {
        const renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
        cleanup.push(() => { renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove(); });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, options.pixelRatioLimit ?? 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.setClearColor(0x000000);
        renderer.domElement.setAttribute('aria-label', 'Interactive solar system');
        renderer.domElement.setAttribute('role', 'img');
        container.appendChild(renderer.domElement);
        const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(45, 1, .000001, 1e15);
        camera.up.set(0, 0, 1);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = .09;
        cleanup.push(() => controls.dispose());
        const sunlight = new THREE.DirectionalLight(0xffffff, 3.2), sunTarget = new THREE.Object3D();
        sunlight.target = sunTarget;
        scene.add(new THREE.AmbientLight(0xffffff, .3), new THREE.HemisphereLight(0xc5d9ff, 0x494958, .7), sunlight, sunTarget);
        const rootAbort = new AbortController();
        cleanup.push(() => rootAbort.abort());
        const errors: Record<string, string> = {}, trailGaps: Record<string,string> = {};
        const trailAttempts = new Map<string,{timeEt:number;phaseIndex:number;wallTime:number}>();
        const pool = new ResourcePool<THREE.Texture>({ maxConcurrent: 4, maxBytes: options.maxTextureBytes ?? 64 * 1048576, sizeOf: texture => { const image = texture.image as ImageBitmap; return image.width * image.height * 4 * 4 / 3; }, dispose: texture => { texture.dispose(); (texture.image as ImageBitmap).close(); } });
        const models = createModelLibrary(renderer), repository = new EphemerisRepository({ maxConcurrent: 3, maxBytes: 4 * 1048576 });
        cleanup.push(() => { pool.dispose(); models.dispose(); repository.dispose(); });
        const visuals = new Map<string, BodyVisual>(), trails = new Map<string, Trail>(), trailRequests = new Map<string, AbortController>();
        let orbitGeometryUpdates = 0;
        let mode: SceneMode = 'overview', visibleIds = new Set<string>(['sun', ...definitions.filter(body => body.groups?.includes('planets')).map(body => body.id)]);
        let labelsEnabled = true, orbitsEnabled = true, starsEnabled = true, constellationsEnabled = false, framedKey = '', selectedId = '', hoveredId = '', viewGeneration = 0;
        const overlay = document.createElement('div');
        overlay.className = 'solar-scene-labels';
        container.appendChild(overlay);
        cleanup.push(() => overlay.remove());
        // Labels are canvas siblings; relay wheel input without capturing their clicks.
        const onLabelWheel = (event: WheelEvent) => {
            event.preventDefault();
            renderer.domElement.dispatchEvent(new WheelEvent('wheel', {
                deltaX:event.deltaX,deltaY:event.deltaY,deltaZ:event.deltaZ,deltaMode:event.deltaMode,
                ctrlKey:event.ctrlKey,metaKey:event.metaKey,shiftKey:event.shiftKey,altKey:event.altKey,
                clientX:event.clientX,clientY:event.clientY,bubbles:true,cancelable:true,
            }));
        };
        overlay.addEventListener('wheel',onLabelWheel,{passive:false});
        cleanup.push(()=>overlay.removeEventListener('wheel',onLabelWheel));
        const loadTexture = async (url: string, signal: AbortSignal) => {
            const response = await fetch(url, { signal });
            if (!response.ok)
                throw new Error(`Texture HTTP ${response.status}: ${url}`);
            const image = await createImageBitmap(await response.blob(), { imageOrientation: 'none', premultiplyAlpha: 'none', colorSpaceConversion: 'none' });
            const texture = new THREE.Texture(image);
            texture.flipY = false;
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
            texture.needsUpdate = true;
            return texture;
        };
        const attachTexture = (visual: BodyVisual, url: string, assign: (texture: THREE.Texture) => void) => {
            const lease = pool.acquire(url, signal => loadTexture(url, signal), rootAbort.signal);
            visual.textures.push(lease);
            void lease.ready.then(texture => { if (!disposed && visuals.get(visual.group.name) === visual)
                assign(texture); }).catch(error => { if (!disposed && visuals.get(visual.group.name) === visual)
                errors[url] = String(error); });
        };
        const destroyVisual = (id: string) => {
            const visual = visuals.get(id);
            if (!visual)
                return;
            visuals.delete(id);
            if(hoveredId===id)hoveredId='';
            visual.model?.release();
            for (const lease of visual.textures)
                lease.release();
            for (const geometry of visual.geometries)
                geometry.dispose();
            for (const material of visual.materials)
                material.dispose();
            visual.group.removeFromParent();
            visual.label.remove();
            visual.leader.remove();
            visual.marker.remove();
        };
        const clearTrail = (id: string, cancel = true) => { const trail = trails.get(id); if (trail) {
            trail.line.geometry.dispose();
            (trail.line.material as THREE.Material).dispose();
            trail.line.removeFromParent();
            trails.delete(id);
        } if(cancel){trailRequests.get(id)?.abort(); trailRequests.delete(id);trailAttempts.delete(id);delete trailGaps[id];} };
        cleanup.push(() => { for (const id of [...visuals.keys()])
            destroyVisual(id); for (const id of new Set([...trails.keys(), ...trailRequests.keys()]))
            clearTrail(id); });
        const acquireModel = (visual: BodyVisual, definition: ExplorerBodyDefinition) => {
            if (!definition.model || visual.model)
                return;
            const lease = models.acquire(definition.model, rootAbort.signal);
            visual.model = lease;
            void lease.ready.then(model => { if (!disposed && visuals.get(definition.id) === visual) {
                model.traverse(object => { object.userData.entityId = definition.id; });
                visual.modelRadius = modelExtentRadius(model);
                visual.group.add(model);
                if (definition.id === selectedId && mode === 'body') framedKey = '';
            } }).catch(error => { if (!disposed && visuals.get(definition.id) === visual)
                errors[definition.model!.url] = String(error); });
        };
        const createVisual = (definition: ExplorerBodyDefinition): BodyVisual => {
            const group = new THREE.Group();
            group.name = definition.id;
            scene.add(group);
            const label = document.createElement('button');
            label.className = 'solar-scene-label';
            label.textContent = definition.label;
            label.title = definition.label;
            label.onclick = () => options.onSelect(definition.id);
            label.onpointerenter = () => {hoveredId=definition.id;};
            label.onpointerleave = () => {if(hoveredId===definition.id)hoveredId='';};
            overlay.appendChild(label);
            const leader = document.createElement('span');
            leader.className = 'solar-scene-leader';
            overlay.appendChild(leader);
            const marker=document.createElement('span');marker.className='solar-body-marker';marker.dataset.bodyId=definition.id;overlay.appendChild(marker);
            const visual: BodyVisual = { group, label, leader, marker, geometries: [], materials: [], textures: [] };
            visuals.set(definition.id, visual);
            if (definition.model) {
                // The mesh is acquired below only when focused or large enough to resolve.
            }
            else if (definition.kind === 'marker') {
                const geometry = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0], 3)), material = new THREE.PointsMaterial({ color: 0xbee1ff, size: 4, sizeAttenuation: false });
                const points = new THREE.Points(geometry, material);
                points.userData.entityId = definition.id;
                group.add(points);
                visual.geometries.push(geometry);
                visual.materials.push(material);
            }
            else {
                for (let face = 0; face < 6; face++) {
                    const geometry = createSpheroidFace(face, definition.radiusKm, definition.polarRadiusKm ?? definition.radiusKm, definition.planetographic ?? true);
                    const material = definition.kind === 'star' ? new THREE.MeshBasicMaterial({ color: 0xffffff }) : new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, metalness: 0 });
                    const mesh = new THREE.Mesh(geometry, material);
                    mesh.userData.entityId = definition.id;
                    group.add(mesh);
                    visual.geometries.push(geometry);
                    visual.materials.push(material);
                    if (definition.texture) {
                        const prefer = definition.id === selectedId && mode === 'body' ? options.textureSize ?? 512 : mode === 'overview' ? 256 : 16;
                        const url = textureUrl(definition.texture, pickSize(definition.texture.sizes, prefer), face);
                        attachTexture(visual, url, texture => { material.map = texture; material.needsUpdate = true; });
                    }
                }
            }
            const ring = PLANET_RINGS[definition.id as keyof typeof PLANET_RINGS];
            if (ring) {
                const geometry = createRingGeometry(ring.inner, ring.outer);
                visual.geometries.push(geometry);
                for (const [side, url] of [[THREE.FrontSide, ring.top], [THREE.BackSide, ring.bottom]] as const) {
                    const material = new THREE.MeshBasicMaterial({ side, transparent: true, depthWrite: false, opacity: .95 });
                    visual.materials.push(material);
                    group.add(new THREE.Mesh(geometry, material));
                    attachTexture(visual, url, texture => { material.map = texture; material.needsUpdate = true; });
                }
            }
            if (definition.id === 'sun') {
                const material = new THREE.SpriteMaterial({ color: 0xffdca0, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
                visual.materials.push(material);
                const glow = new THREE.Sprite(material);
                glow.name = 'sun-pixel-glow';
                glow.scale.setScalar(definition.radiusKm * 9);
                group.add(glow);
                attachTexture(visual, SPRITES.sunGlow, texture => { material.map = texture; material.needsUpdate = true; });
            }
            return visual;
        };
        const ensureTrail = (definition: ExplorerBodyDefinition, state: ExplorerRenderFrame) => {
            if (!orbitsEnabled || definition.id === 'sun' || trailRequests.has(definition.id))
                return;
            const frame = state.frames.get(definition.id);
            if (frame?.status !== 'ready')
                return;
            const old = trails.get(definition.id);
            if (old && old.phaseIndex === frame.phaseIndex && Math.abs(old.timeEt - state.clock.timeEt) < old.refreshSeconds)
                return;
            const attempt=trailAttempts.get(definition.id);
            if(attempt?.phaseIndex===frame.phaseIndex && (performance.now()-attempt.wallTime<1000 || !old&&Math.abs(attempt.timeEt-state.clock.timeEt)<30))return;
            const phase = definition.phases[activePhaseIndex(definition.phases, state.clock.timeEt)];
            if (!phase)
                return;
            const paths = phase.positionPaths ?? (phase.positionPath ? [phase.positionPath] : []);
            if (!paths.length)
                return;
            const controller = new AbortController(), generation = viewGeneration;
            trailRequests.set(definition.id, controller);
            trailAttempts.set(definition.id,{timeEt:state.clock.timeEt,phaseIndex:frame.phaseIndex,wallTime:performance.now()});
            void (async () => {
                for (const path of paths) {
                    try {
                        const window = await repository.load(path, state.clock.timeEt, controller.signal);
                        let positions;
                        let refreshSeconds = 86400;
                        const history = !(definition.groups?.includes('planets') || definition.id === 'moon');
                        if (history) {
                            const sampled = await sampleTrailHistory({ path, now: state.clock.timeEt, phaseStart: phase.startEt, parentId: frame.parentId, options: definition.trail, body: phase.body, signal: controller.signal, load: repository.load.bind(repository) });
                            positions = sampled.samples.map(sample => sample.position);
                            refreshSeconds = Math.max(.25, (sampled.end-sampled.requestedStart)/240);
                            if(disposed || controller.signal.aborted || generation!==viewGeneration)return;
                            if(sampled.gaps.length)trailGaps[definition.id]=sampled.gaps.map(gap=>gap.reason).join(', ');
                            else delete trailGaps[definition.id];
                        }
                        else if (window.header.pointType === 'orb') {
                            const points = window.points as readonly OrbPoint[];
                            const nearest = points.reduce((best, point) => Math.abs(point.time - state.clock.timeEt) < Math.abs(best.time - state.clock.timeEt) ? point : best);
                            positions = nearest.eccentricity < 1 ? orbitPolyline(nearest) : sampledPolyline(window, Math.max(phase.startEt, state.clock.timeEt - 31557600), state.clock.timeEt);
                            const factor = orbitalBodyFactor(window.header, phase.body);
                            positions = positions.map(point => ({ x: point.x * factor, y: point.y * factor, z: point.z * factor }));
                        }
                        else
                            positions = sampledPolyline(window, phase.startEt, state.clock.timeEt);
                        if (disposed || controller.signal.aborted || generation !== viewGeneration) return;
                        if (positions.length < 2) continue;
                        const style = eyesOrbitStyle(definition.id);
                        const geometry = new LineGeometry(); geometry.setPositions(positions.flatMap(point=>[point.x,point.y,point.z]));
                        const material = history ? createTrailMaterial() : new LineMaterial({ linewidth: style.width, transparent: true, opacity: style.rgba[3], depthWrite: false });
                        const color = history && definition.trail?.color ? definition.trail.color : style.rgba;
                        material.color.setRGB(color[0],color[1],color[2],THREE.SRGBColorSpace);
                        material.opacity=color[3];
                        if(history)setTrailProgress(geometry,positions.length);
                        material.resolution.set(viewportWidth,viewportHeight);
                        const line = new Line2(geometry, material);
                        line.frustumCulled = false;
                        clearTrail(definition.id,false);
                        scene.add(line);
                        trails.set(definition.id, { line, parentId: frame.parentId, phaseIndex: frame.phaseIndex, timeEt: state.clock.timeEt, refreshSeconds, history, mu: window.header.pointType === 'orb' && (definition.groups?.includes('planets') || definition.id === 'moon') ? (window.header.gravitationalParameter1 ?? 1) + (window.header.gravitationalParameter2 ?? 0) : undefined });
                        return;
                    }
                    catch {
                        if (controller.signal.aborted)
                            return;
                    }
                }
            })().finally(() => { if (trailRequests.get(definition.id) === controller)
                trailRequests.delete(definition.id); });
        };
        const sky = new THREE.Group(), constellationSky = new THREE.Group();
        scene.add(sky, constellationSky);
        const skyGeometry: THREE.BufferGeometry[] = [], skyMaterials: THREE.Material[] = [];
        const constellationLabels: {element:HTMLSpanElement;direction:THREE.Vector3}[] = [];
        const starMaterials: THREE.ShaderMaterial[] = [];
        cleanup.push(() => {
            for (const geometry of skyGeometry) geometry.dispose();
            for (const material of skyMaterials) material.dispose();
            for (const label of constellationLabels) label.element.remove();
        });
        // Eyes attaches all six stellar catalogs and the galaxy catalog to Sun.
        for (const url of [GALAXIES_URL, ...Array.from({length:6},(_,layer)=>starfieldUrl(layer))]) {
            void fetch(url, {signal:rootAbort.signal}).then(response=>{
                if (!response.ok) throw Error(`Starfield HTTP ${response.status}`);
                return response.arrayBuffer();
            }).then(buffer=>{
                if(disposed) return;
                if(buffer.byteLength<4) throw Error('Truncated star header');
                const count=new DataView(buffer).getInt32(0,true);
                if(count<0 || buffer.byteLength!==4+count*23) throw Error('Invalid star records');
                const points=createSkyStars(parseStarfield(buffer));
                sky.add(points);skyGeometry.push(points.geometry);skyMaterials.push(points.material);starMaterials.push(points.material);
            }).catch(error=>{if(!disposed)errors[url]=String(error);});
        }
        let constellationsRequested=false;
        const loadConstellations=()=>{
            if(constellationsRequested) return;
            constellationsRequested=true;
            void fetch(CONSTELLATIONS_URL,{signal:rootAbort.signal}).then(response=>{
                if(!response.ok)throw Error(`Constellations HTTP ${response.status}`);
                return response.arrayBuffer();
            }).then(buffer=>{
                if(disposed)return;
                const database=parseConstellations(buffer), positions:number[]=[];
                for(const constellation of database){
                    for(const index of constellation.segments){
                        const direction=new THREE.Vector3().copy(constellation.stars[index]).normalize();positions.push(direction.x,direction.y,direction.z);
                    }
                    const element=document.createElement('span');element.className='solar-constellation-label';element.textContent=constellation.name;overlay.appendChild(element);
                    constellationLabels.push({element,direction:new THREE.Vector3().copy(constellation.label).normalize()});
                }
                const geometry=new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
                const material=new THREE.ShaderMaterial({transparent:true,depthTest:true,depthWrite:false,
                    vertexShader:`void main(){vec3 direction=mat3(viewMatrix)*position;vec4 clip=projectionMatrix*vec4(direction,1.0);gl_Position=vec4(clip.xy,clip.w*.999998,clip.w);}`,
                    fragmentShader:`void main(){gl_FragColor=vec4(.35,.7,1.0,.5);}`});
                const lines=new THREE.LineSegments(geometry,material);lines.frustumCulled=false;lines.renderOrder=-1;constellationSky.add(lines);
                skyGeometry.push(geometry);skyMaterials.push(material);
            }).catch(error=>{if(!disposed){errors[CONSTELLATIONS_URL]=String(error);constellationsRequested=false;}});
        };
        const resize = () => { if (disposed)
            return; viewportWidth=container.clientWidth;viewportHeight=container.clientHeight;camera.aspect = Math.max(1, viewportWidth) / Math.max(1, viewportHeight); camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(Math.PI / 6) / Math.max(1, camera.aspect))); camera.updateProjectionMatrix(); renderer.setSize(Math.max(1, viewportWidth), Math.max(1, viewportHeight)); framedKey = ''; };
        const observer = new ResizeObserver(resize);
        cleanup.push(() => observer.disconnect());
        observer.observe(container);
        resize();
        const raycaster = new THREE.Raycaster(), pointer = new THREE.Vector2();
        let down: readonly [
            number,
            number
        ] | null = null;
        const onDown = (event: PointerEvent) => { down = [event.clientX, event.clientY]; };
        const onUp = (event: PointerEvent) => { const start = down; down = null; if (!start || Math.hypot(event.clientX - start[0], event.clientY - start[1]) > 4)
            return; const box = renderer.domElement.getBoundingClientRect(); pointer.set(2 * (event.clientX - box.left) / box.width - 1, 1 - 2 * (event.clientY - box.top) / box.height); raycaster.params.Points.threshold = camera.position.length() * .0001; raycaster.setFromCamera(pointer, camera); const hit = raycaster.intersectObjects([...visuals.values()].filter(visual => visual.group.visible).map(visual => visual.group), true)[0]; const id = hit?.object.userData.entityId; if (typeof id === 'string')
            options.onSelect(id); };
        renderer.domElement.addEventListener('pointerdown', onDown);
        renderer.domElement.addEventListener('pointerup', onUp);
        cleanup.push(() => { renderer.domElement.removeEventListener('pointerdown', onDown); renderer.domElement.removeEventListener('pointerup', onUp); });
        return {
            resize, dispose, resetCamera() { framedKey = ''; },
            expandedSystems(state) {
                const focus = state.frames.get(state.selectedId);
                if (focus?.status !== 'ready') return [];
                const expanded: string[] = [];
                for (const [id, frame] of state.frames) {
                    if (frame.status !== 'ready') continue;
                    const body = byId.get(id);
                    if (!body) continue;
                    const distance = Math.hypot(frame.position.x-focus.position.x-camera.position.x, frame.position.y-focus.position.y-camera.position.y, frame.position.z-focus.position.z-camera.position.z);
                    if (projectedSystemVisible(body.radiusKm, body.systemRadiusKm, distance, THREE.MathUtils.degToRad(camera.fov), viewportHeight)) expanded.push(id);
                }
                return expanded;
            },
            setVisible(ids) {
                visibleIds = new Set(ids);
                for (const id of visuals.keys()) if (!visibleIds.has(id)) destroyVisual(id);
                for (const id of new Set([...trails.keys(), ...trailRequests.keys()])) if (!visibleIds.has(id)) clearTrail(id);
            },
            setView(nextMode, ids) { mode = nextMode; visibleIds = new Set(ids); viewGeneration++; framedKey = ''; for (const id of [...visuals.keys()])
                destroyVisual(id); for (const id of new Set([...trails.keys(), ...trailRequests.keys()]))
                clearTrail(id); for (const key of Object.keys(errors))
                delete errors[key]; },
            setLayers(layers) {
                labelsEnabled=layers.labels??labelsEnabled;orbitsEnabled=layers.orbits??orbitsEnabled;
                starsEnabled=layers.stars??starsEnabled;constellationsEnabled=layers.constellations??constellationsEnabled;
                if(constellationsEnabled)loadConstellations();
            },
            update(state) {
                if (disposed)
                    return;
                selectedId = state.selectedId;
                const focus = state.frames.get(selectedId), ready = focus?.status === 'ready';
                const key = `${selectedId}:${mode}`;
                if (ready && framedKey !== key) {
                    const definition = byId.get(selectedId);
                    let radius = Math.max(definition?.radiusKm ?? 6378, visuals.get(selectedId)?.modelRadius ?? 0);
                    if (mode === 'overview')
                        radius = 6e9;
                    else if (mode === 'system')
                        radius = definition?.systemRadiusKm ?? radius * 20;
                    else {
                        const ring = PLANET_RINGS[selectedId as keyof typeof PLANET_RINGS];
                        if (ring)
                            radius = ring.outer;
                    }
                    controls.target.set(0, 0, 0);
                    const sun = state.frames.get('sun');
                    if (mode === 'body' && sun?.status === 'ready' && selectedId !== 'sun') {
                        camera.position.set(sun.position.x - focus.position.x, sun.position.y - focus.position.y, sun.position.z - focus.position.z).normalize();
                        camera.position.z += .3;
                    }
                    else
                        camera.position.set(.65, -1, .8);
                    camera.position.normalize().multiplyScalar(cameraFitDistance(Math.max(.00001, radius), THREE.MathUtils.degToRad(camera.fov), camera.aspect));
                    controls.minDistance = Math.max(.000001, (definition?.radiusKm ?? 1) * 1.03);
                    controls.maxDistance = 1e14;
                    camera.near = Math.max(.000001, Math.min(radius * .0005, 1000));
                    camera.updateProjectionMatrix();
                    framedKey = key;
                }
                for (const definition of definitions) {
                    const frame = state.frames.get(definition.id), show = ready && visibleIds.has(definition.id) && frame?.status === 'ready';
                    let visual = visuals.get(definition.id);
                    if (show && !visual)
                        visual = createVisual(definition);
                    if (!visual)
                        continue;
                    visual.group.visible = !!show;
                    visual.label.hidden = true;
                    visual.leader.hidden = true;
                    visual.marker.hidden = true;
                    if (show && ready && frame?.status === 'ready') {
                        applyFrameTransform(visual.group, frame.position, frame.orientation, focus.position);
                        if (definition.model && modelIsResolvable(definition.radiusKm, visual.group.position.distanceTo(camera.position), THREE.MathUtils.degToRad(camera.fov), viewportHeight, definition.id === selectedId && mode === 'body'))
                            acquireModel(visual, definition);
                        const glow=visual.group.getObjectByName('sun-pixel-glow');
                        if(glow)glow.scale.setScalar(100*visual.group.position.distanceTo(camera.position)*2*Math.tan(THREE.MathUtils.degToRad(camera.fov)/2)/viewportHeight);
                        ensureTrail(definition, state);
                    }
                }
                for (const [id, trail] of trails) {
                    const parent = trail.parentId ? state.frames.get(trail.parentId) : undefined;
                    const body = state.frames.get(id);
                    trail.line.visible = !!ready && orbitsEnabled && visibleIds.has(id) && body?.status === 'ready' && body.phaseIndex === trail.phaseIndex && (!trail.parentId || parent?.status === 'ready');
                    trail.line.material.resolution.set(viewportWidth,viewportHeight);
                    const definition=byId.get(id)!;
                    const center=body?.status==='ready'&&ready?new THREE.Vector3(body.position.x-focus.position.x,body.position.y-focus.position.y,body.position.z-focus.position.z):undefined;
                    const fade=trail.mu&&center?eyesOrbitFade(definition.radiusKm/center.distanceTo(camera.position)/Math.tan(THREE.MathUtils.degToRad(camera.fov)/2)):1;
                    if(trail.history) {
                        setTrailHover(trail.line.material,id===hoveredId,definition.trail?.color?.[3]??.35);
                        if(body?.status==='ready') {
                            const data=(trail.line.geometry.getAttribute('instanceStart') as THREE.InterleavedBufferAttribute).data;
                            const offset=data.array.length-3;
                            data.array[offset]=body.position.x-(parent?.status==='ready'?parent.position.x:0);
                            data.array[offset+1]=body.position.y-(parent?.status==='ready'?parent.position.y:0);
                            data.array[offset+2]=body.position.z-(parent?.status==='ready'?parent.position.z:0);
                            data.needsUpdate=true;
                        }
                    } else {trail.line.material.opacity=(id===hoveredId?1:eyesOrbitStyle(id).rgba[3])*fade;trail.line.material.linewidth=id===hoveredId?2:1.2;}
                    trail.line.visible=trail.line.visible&&fade>0;
                    if(trail.line.visible && trail.mu && body?.status==='ready') {
                        const parentPosition=parent?.status==='ready'?parent.position:{x:0,y:0,z:0};
                        const parentVelocity=parent?.status==='ready'?parent.velocity:{x:0,y:0,z:0};
                        const position={x:body.position.x-parentPosition.x,y:body.position.y-parentPosition.y,z:body.position.z-parentPosition.z};
                        const velocity={x:body.velocity.x-parentVelocity.x,y:body.velocity.y-parentVelocity.y,z:body.velocity.z-parentVelocity.z};
                        const kmPerPixel=2*(center?.distanceTo(camera.position)??0)*Math.tan(THREE.MathUtils.degToRad(camera.fov)/2)/viewportHeight;
                        const points=orbitGeometryNeedsUpdate(trail.geometryPosition,position,kmPerPixel)?osculatingPolyline(position,velocity,trail.mu):undefined;
                        if(points && points.length>1){
                            trail.geometryPosition=position; orbitGeometryUpdates++;
                            const attribute=trail.line.geometry.getAttribute('instanceStart') as THREE.InterleavedBufferAttribute;
                            if(attribute.count!==points.length-1)trail.line.geometry.setPositions(points.flatMap(point=>[point.x,point.y,point.z]));
                            else{
                                const data=attribute.data;
                                for(let index=0;index<points.length-1;index++){
                                    const offset=index*6, a=points[index], b=points[index+1];
                                    data.array[offset]=a.x;data.array[offset+1]=a.y;data.array[offset+2]=a.z;
                                    data.array[offset+3]=b.x;data.array[offset+4]=b.y;data.array[offset+5]=b.z;
                                }
                                data.needsUpdate=true;
                            }
                        }else if(points) trail.line.visible=false;
                    }
                    if (ready && trail.line.visible)
                        trail.line.position.set((parent?.status === 'ready' ? parent.position.x : 0) - focus.position.x, (parent?.status === 'ready' ? parent.position.y : 0) - focus.position.y, (parent?.status === 'ready' ? parent.position.z : 0) - focus.position.z);
                }
                if (ready) {
                    const sun = state.frames.get('sun');
                    if (sun?.status === 'ready') {
                        sunlight.position.set(sun.position.x - focus.position.x, sun.position.y - focus.position.y, sun.position.z - focus.position.z);
                        if (sunlight.position.lengthSq() === 0)
                            sunlight.position.set(0, -1e8, 1e8);
                    }
                }
                controls.update();
                camera.updateMatrixWorld();
                sky.visible=starsEnabled;constellationSky.visible=constellationsEnabled;
                const particleSize=Math.sqrt(Math.max(viewportWidth,viewportHeight)*renderer.getPixelRatio())/60;
                for(const material of starMaterials)material.uniforms.particleSize.value=particleSize;
                const inverseCamera=camera.quaternion.clone().invert();
                for(const label of constellationLabels){
                    const direction=label.direction.clone().applyQuaternion(inverseCamera);
                    label.element.hidden=!constellationsEnabled||!labelsEnabled||direction.z>=0;
                    if(label.element.hidden)continue;
                    const projected=direction.applyMatrix4(camera.projectionMatrix);
                    label.element.hidden=Math.abs(projected.x)>1||Math.abs(projected.y)>1;
                    for(const [id,visual] of visuals){
                        if(!visual.group.visible)continue;
                        const radius=visual.modelRadius??byId.get(id)!.radiusKm;
                        const center=visual.group.position.clone().sub(camera.position),along=center.dot(label.direction);
                        if(along>0&&center.lengthSq()-along*along<radius*radius){label.element.hidden=true;break;}
                    }
                    label.element.style.transform=`translate(${(projected.x+1)*viewportWidth/2}px,${(1-projected.y)*viewportHeight/2}px)`;
                }
                renderer.render(scene, camera);
                const occupied: {
                    x: number;
                    y: number;
                }[] = [];
                for (const [id, visual] of [...visuals].sort(([a], [b]) => a === selectedId ? -1 : b === selectedId ? 1 : 0)) {
                    if (!labelsEnabled || !visual.group.visible)
                        continue;
                    const projected = visual.group.position.clone().project(camera);
                    if (projected.z < -1 || projected.z > 1 || Math.abs(projected.x) > 1 || Math.abs(projected.y) > 1)
                        continue;
                    const x = (projected.x + 1) * viewportWidth / 2, y = (1 - projected.y) * viewportHeight / 2;
                    visual.marker.hidden = false;
                    visual.marker.style.transform=`translate(${x}px,${y}px)`;
                    const placed = placeScreenLabel(x, y, viewportWidth, viewportHeight, occupied);
                    if (!placed) continue;
                    visual.label.hidden = false;
                    visual.label.style.transform = `translate(${placed.x}px,${placed.y}px)`;
                    visual.label.dataset.selected = String(id === selectedId);
                    const dx = placed.x - x, dy = placed.y - y;
                    visual.leader.hidden = Math.hypot(dx, dy) < 2;
                    visual.leader.style.width = `${Math.hypot(dx, dy)}px`;
                    visual.leader.style.transform = `translate(${x}px,${y}px) rotate(${Math.atan2(dy, dx)}rad)`;
                    occupied.push(placed);
                }
            },
            snapshot() { return { orbitGeometryUpdates, trailGaps: {...trailGaps}, drawCalls: renderer.info.render.calls, triangles: renderer.info.render.triangles, geometries: renderer.info.memory.geometries, textures: renderer.info.memory.textures, textureResources: pool.snapshot(), models: models.snapshot(), errors: { ...errors } }; },
        };
    }
    catch (error) {
        dispose();
        throw error;
    }
}
