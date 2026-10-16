const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
function load(file, name, api = {}, globals = {}) {
  const source = fs.readFileSync(file, 'utf8').replace(/^import .*;\r?\n/gm, '').replace(/^export .*;\r?\n/gm, '');
  return vm.runInNewContext(`${source}\n${name}`, {
    PioneerPublicApi: api,
    ...globals
  });
}
async function main() {
  const BaseRef = load('eyes/src/engine/core/BaseRef.js', 'BaseRef');
  const ref = new BaseRef();
  const enabled = {
    isEnabled: () => true
  };
  const disabled = {
    isEnabled: () => false
  };
  const changes = [];
  ref.setRefChangedCallback((oldRef, newRef) => changes.push([oldRef, newRef]));
  ref._setRef(enabled);
  ref._setRef(enabled);
  ref._setRef(disabled);
  assert.equal(changes.length, 2);
  assert.equal(changes[0][0], null);
  assert.equal(changes[0][1], enabled);
  assert.equal(changes[1][1], null);
  let refreshed = 0;
  ref.update = () => {
    refreshed++;
  };
  ref.getRef();
  assert.equal(refreshed, 0);
  ref.get();
  assert.equal(refreshed, 1);
  class CanceledError extends Error {}
  const timers = new Map();
  let timerId = 0;
  const calls = [];
  const engine = {
    getDownloader: () => ({
      download: async url => {
        calls.push(['download', url]);
        return {
          content: {
            url
          }
        };
      },
      updatePriority: (...args) => calls.push(['priority', ...args]),
      cancel: url => calls.push(['cancel', url])
    })
  };
  const ResourceManager = load('eyes/src/engine/managers/ResourceManager.js', 'ResourceManager', {
    CanceledError
  }, {
    window: {
      setTimeout: (callback, delay) => {
        assert.equal(delay, 15000);
        timers.set(++timerId, callback);
        return timerId;
      },
      clearTimeout: id => timers.delete(id)
    }
  });
  const manager = new ResourceManager(engine);
  const owner = {};
  const first = await manager.acquire(owner, 'a', 'binary', 1);
  const shared = await manager.acquire(owner, 'a', 'binary', 2);
  assert.equal(first, shared);
  assert.equal(calls.filter(call => call[0] === 'download').length, 1);
  manager.release(owner, first, 'binary');
  assert.equal(timers.size, 0);
  manager.release(owner, first, 'binary');
  assert.equal(timers.size, 1);
  await manager.acquire(owner, 'a', 'binary', 3);
  assert.equal(timers.size, 0);
  manager.releaseAllForEntityItem(owner);
  assert.equal(timers.size, 1);
  [...timers.values()][0]();
  assert.equal(manager._typesToCaches.binary.urlsToEntries.size, 0);
  assert.throws(() => manager.releaseByUrl(owner, 'missing', 'binary'), /without a matching acquire/);
  let resolveTexture;
  const releases = [];
  const requests = [];
  const resources = {
    acquire: (...args) => {
      requests.push(args);
      return new Promise(resolve => {
        resolveTexture = resolve;
      });
    },
    release: (...args) => releases.push(args),
    releaseByUrl: (...args) => releases.push(args)
  };
  const lodEngine = {
    getConfig: () => ({
      getValue: () => 512
    }),
    getResourceManager: () => resources
  };
  const component = {
    getEngine: () => lodEngine,
    getEntity: () => ({
      getScene: () => ({
        getEngine: () => lodEngine
      }),
      getGreatestPixelSpaceExtentsRadius: () => 600,
      getLeastCameraDepth: () => 10
    }),
    getLoadState: () => ({
      state: 'loaded'
    })
  };
  const TextureLOD = load('eyes/src/engine/core/TextureLOD.js', 'TextureLOD', {
    CanceledError
  });
  const lod = new TextureLOD(component);
  const oldTexture = {};
  const uniform = {
    value: oldTexture
  };
  lod.setUniform(uniform);
  uniform.value = oldTexture;
  lod.setUrl('map-$SIZE');
  lod.setSizes([256, 512, 1024]);
  lod.update();
  assert.equal(requests[0][1], 'map-512');
  assert.equal(uniform.value, oldTexture);
  const newTexture = {};
  resolveTexture(newTexture);
  await Promise.resolve();
  await Promise.resolve();
  assert.equal(uniform.value, newTexture);
  assert.equal(releases.at(-1)[1], oldTexture);
  lod.setEnabled(false);
  assert.equal(uniform.value, null);
  assert.equal(releases.at(-1)[1], newTexture);
  class Texture {
    constructor(image) {
      this.image = image;
    }
    clone() {
      return new Texture(this.image);
    }
  }
  class Bitmap {}
  class Video {}
  const downloads = [];
  const textureEngine = {
    getDownloader: () => ({
      download: async (url, type, priority) => {
        downloads.push([url, type, priority]);
        return {
          content: type === 'video' ? new Video() : type === 'binary' ? new ArrayBuffer(8) : new Bitmap()
        };
      }
    })
  };
  const TextureLoader = load('eyes/src/engine/core/TextureLoader.js', 'TextureLoader', {
    Color: class {
      constructor(r, g, b, a) {
        Object.assign(this, {
          r,
          g,
          b,
          a
        });
      }
    },
    THREE: {
      CanvasTexture: Texture,
      VideoTexture: Texture,
      LinearFilter: 1,
      LinearMipMapLinearFilter: 2
    }
  }, {
    document: {
      createElement: () => ({
        getContext: () => ({
          fillRect() {}
        })
      })
    },
    HTMLVideoElement: Video,
    ImageBitmap: Bitmap,
    KTX2Loader: {}
  });
  const textureLoader = new TextureLoader(textureEngine);
  assert.notEqual(await textureLoader.loadTexture('black'), await textureLoader.loadTexture('black'));
  assert.equal(downloads.length, 0);
  const bitmapTexture = await textureLoader.loadTexture('mapped-image', 7, {
    extension: 'png',
    useMipMaps: false
  });
  assert.equal(downloads.at(-1)[1], 'imageBitmap');
  assert.equal(bitmapTexture.generateMipmaps, false);
  assert.equal(bitmapTexture.minFilter, 1);
  const videoTexture = await textureLoader.loadTexture('movie.webm', 3);
  assert.equal(downloads.at(-1)[1], 'video');
  assert.equal(videoTexture.flipY, false);
  let decoded;
  textureLoader.getKTX2Loader = () => ({
    _createTexture: async buffer => {
      decoded = buffer;
      return 'decoded-texture';
    }
  });
  assert.equal(await textureLoader.loadTexture('blob:compressed', 9, {
    extension: 'ktx2'
  }), 'decoded-texture');
  assert.equal(downloads.at(-1)[1], 'binary');
  assert.ok(decoded);
  const targetMaterial = {
    uniforms: {
      colorTexture: {},
      uvTransform: {
        value: {
          setUvTransform(...args) {
            this.args = args;
          }
        }
      },
      emissiveColor: {
        value: {
          copy() {},
          multiplyScalar() {}
        }
      },
      color: {},
      roughness: {},
      metalness: {},
      environmentIntensity: {},
      gammaCorrectionFactor: {}
    },
    defines: {}
  };
  const ModelComponent = load('eyes/src/engine/components/ModelComponent.js', 'ModelComponent', {
    BaseComponent: class {},
    THREE: {
      Loader: class {}
    },
    MaterialUtils: {
      getPBR: () => targetMaterial
    }
  }, {
    DRACOLoader: {
      DRACOLoader: class {}
    },
    KTX2Loader: {
      KTX2Loader: class {}
    }
  });
  const sourceMap = {
    offset: {
      x: 1,
      y: 2
    },
    repeat: {
      x: 3,
      y: 4
    },
    rotation: 5,
    center: {
      x: 6,
      y: 7
    }
  };
  const originalMaterial = {
    name: 'surface',
    transparent: false,
    alphaTest: 0,
    depthWrite: true,
    side: 0,
    map: sourceMap,
    roughnessMap: null,
    metalnessMap: null,
    normalMap: null,
    emissiveMap: null,
    emissive: {},
    emissiveIntensity: 2,
    color: {},
    roughness: .5,
    metalness: .2
  };
  const modelOwner = {
    _dynamicEnvironmentMapComponent: null,
    _environmentCubemap: null,
    _environmentIntensity: .8,
    _shadowEntities: [],
    getEntity: () => ({
      getScene: () => ({
        getEngine: () => ({
          getConfig: () => ({
            getValue: () => 2.2
          })
        })
      })
    })
  };
  const converted = ModelComponent.prototype._getNewPioneerMaterial.call(modelOwner, originalMaterial);
  assert.equal(converted.uniforms.colorTexture.value, sourceMap);
  assert.equal(originalMaterial.map, null);
  assert.equal(converted.defines.colorMap, true);
  assert.equal(converted.uniforms.environmentIntensity.value, .8);
  assert.equal(converted.needsUpdate, true);
  console.log('resource semantic checks passed: BaseRef identity, resource sharing/delayed disposal, LOD handoff');
}
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
