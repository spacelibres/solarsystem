import * as Pioneer from '../../engine/pioneer/index.js';
import { createArtworkPatch } from './registration.js';
import { loadArtworkBatch } from './loading.js';
import { createArtworkVectorGeometry } from './vector-geometry.js';

const THREE = Pioneer.THREE;
const rootUrl = new URL('constellation-art/', document.baseURI);

async function loadTexture(url, signal) {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`Artwork HTTP ${response.status}`);
  const objectUrl = URL.createObjectURL(await response.blob());
  const image = new Image();
  try {
    await new Promise((resolve, reject) => {
      const cleanup = () => { signal.removeEventListener('abort', abort); image.onload = image.onerror = null; };
      const abort = () => { cleanup(); image.src = ''; reject(new DOMException('Artwork loading canceled', 'AbortError')); };
      image.onload = () => { cleanup(); resolve(); };
      image.onerror = () => { cleanup(); reject(new Error(`Cannot decode ${url}`)); };
      if (signal.aborted) return abort();
      signal.addEventListener('abort', abort, { once: true });
      image.src = objectUrl;
    });
    if (signal.aborted) throw new DOMException('Artwork loading canceled', 'AbortError');
    const scale = Math.min(1, 512 / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Artwork canvas unavailable');
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  } finally { URL.revokeObjectURL(objectUrl); }
}

/** Independent extension: the recovered constellation parser is untouched. */
export class ConstellationArtComponent extends Pioneer.BaseComponent {
  constructor(name, entity) {
    super(name, entity);
    this.__setRadius(Infinity);
    this._artVisible = false;
    this._controller = null;
    this._meshes = [];
    this._fade = 0;
    this._lastTime = performance.now();
    this.onStatus = () => {};
    this.setRenderingEnabled(false);
  }

  setArtworkVisible(visible) {
    this._artVisible = visible;
    this.setRenderingEnabled(visible || this._fade > 0);
    if (!visible) { this._controller?.abort(); return; }
    this._lastTime = performance.now();
    if (!this._meshes.length && !this._controller) void this._loadArt();
  }

  async _loadArt() {
    const controller = new AbortController();
    this._controller = controller;
    this.onStatus('loading');
    try {
      const response = await fetch(new URL('index.json', rootUrl), { signal: controller.signal });
      if (!response.ok) throw new Error(`Artwork catalogue HTTP ${response.status}`);
      const catalogue = await response.json();
      if (catalogue.schemaVersion !== 1 || catalogue.frame !== 'ICRS/J2000' || !Array.isArray(catalogue.artworks)) throw new Error('Unsupported artwork catalogue');
      const meshes = await loadArtworkBatch(catalogue.artworks, async artwork => {
        const vector = artwork.renderMode === 'vector';
        const url = new URL(artwork.file, rootUrl);
        let texture;
        let patch;
        if (vector) {
          const response = await fetch(url, { signal: controller.signal });
          if (!response.ok) throw new Error(`Artwork HTTP ${response.status}`);
          const svg = await response.text();
          controller.signal.throwIfAborted();
          // Let camera input and cancellation run between SVG triangulations.
          await new Promise(resolve => setTimeout(resolve, 0));
          controller.signal.throwIfAborted();
          patch = createArtworkVectorGeometry(svg, artwork);
        } else {
          patch = createArtworkPatch(artwork);
          texture = await loadTexture(url, controller.signal);
        }
        let geometry;
        let material;
        try {
          geometry = new THREE.BufferGeometry();
          geometry.setAttribute('position', new THREE.BufferAttribute(patch.positions, 3));
          if (vector) geometry.setAttribute('artColor', new THREE.BufferAttribute(patch.colors, 4));
          else {
            geometry.setAttribute('uv', new THREE.BufferAttribute(patch.uvs, 2));
            geometry.setIndex(new THREE.BufferAttribute(patch.indices, 1));
          }
          material = new THREE.ShaderMaterial({
            transparent: true, depthTest: true, depthWrite: false, side: THREE.DoubleSide,
            uniforms: {
              ...(texture ? { map: { value: texture } } : {}), opacity: { value: 0 },
              invertDepth: { value: 0 }, nearDistance: { value: 0 }, midDistance: { value: 0 }
            },
            vertexShader: `${vector ? 'attribute vec4 artColor;varying vec4 artPixel;' : 'varying vec2 artUv;'}
              ${Pioneer.ShaderChunkLogDepth.VertexHead}
              void main(){${vector ? 'artPixel=artColor;' : 'artUv=uv;'}vec4 viewPosition=vec4(mat3(viewMatrix)*position*1.0e23,1.0);
              gl_Position=projectionMatrix*viewPosition;gl_Position.w=viewPosition.y;gl_Position.z=0.0;
              ${Pioneer.ShaderChunkLogDepth.Vertex}}`,
            fragmentShader: `uniform float opacity;${vector ? 'varying vec4 artPixel;' : 'uniform sampler2D map;varying vec2 artUv;'}
              ${Pioneer.ShaderChunkLogDepth.FragmentHead}
              void main(){vec4 texel=${vector ? 'artPixel' : 'texture2D(map,artUv)'};gl_FragColor=vec4(texel.rgb,texel.a*opacity);
              if(gl_FragColor.a<0.002)discard;
              ${Pioneer.ShaderChunkLogDepth.Fragment}}`
          });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.name = `constellation_art_${artwork.id}`;
          mesh.renderOrder = -10;
          mesh.raycast = () => {};
          return mesh;
        } catch (error) { geometry?.dispose(); material?.dispose(); texture?.dispose(); throw error; }
      }, mesh => this._disposeMesh(mesh), controller.signal);
      if (controller.signal.aborted || this.isDestroyed()) { meshes.forEach(mesh => this._disposeMesh(mesh)); return; }
      this._meshes = meshes;
      for (const mesh of meshes) {
        Pioneer.ThreeJsHelper.setupObject(this, mesh);
        this.getThreeJsObjects().push(mesh);
        this.getThreeJsMaterials().push(mesh.material);
      }
      this.onStatus('ready');
    } catch (error) {
      if (!controller.signal.aborted) { this.onStatus('error'); console.warn('Constellation artwork unavailable:', error); }
    } finally {
      if (this._controller === controller) this._controller = null;
      // A rapid off/on can request a new generation while cancellation settles.
      if (controller.signal.aborted && this._artVisible && !this.isDestroyed()) void this._loadArt();
    }
  }

  __prepareForRender() {
    const now = performance.now();
    const target = this._artVisible ? 1 : 0;
    this._fade += (target - this._fade) * Math.min(1, Math.max(0, (now - this._lastTime) / 1000) * 5);
    this._lastTime = now;
    for (const mesh of this._meshes) mesh.material.uniforms.opacity.value = 0.22 * this._fade;
    if (!this._artVisible && this._fade < 0.001) { this._fade = 0; this.setRenderingEnabled(false); }
  }

  _disposeMesh(mesh) {
    mesh.removeFromParent();
    mesh.geometry.dispose();
    mesh.material.uniforms.map?.value.dispose();
    mesh.material.dispose();
  }

  __unloadResources() {
    this._controller?.abort();
    for (const mesh of this._meshes) this._disposeMesh(mesh);
    this._meshes = [];
  }

  __destroy() {
    this._artVisible = false;
    this._controller?.abort();
    this.onStatus = () => {};
    super.__destroy();
  }
}
