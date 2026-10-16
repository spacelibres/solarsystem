// Recovered from vendors.js:912013-958087.
import * as ThreeCore from "../three/core.js";
import * as computeMikkTSpaceTangents from "./computeMikkTSpaceTangents.js";
import * as clone from "./clone.js";
class GLTFLoader extends ThreeCore.Loader {
  constructor(e) {
    super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function (e) {
      return new GLTFMaterialsClearcoatExtension(e);
    }), this.register(function (e) {
      return new GLTFMaterialsDispersionExtension(e);
    }), this.register(function (e) {
      return new GLTFTextureBasisUExtension(e);
    }), this.register(function (e) {
      return new GLTFTextureWebPExtension(e);
    }), this.register(function (e) {
      return new GLTFTextureAVIFExtension(e);
    }), this.register(function (e) {
      return new GLTFMaterialsSheenExtension(e);
    }), this.register(function (e) {
      return new GLTFMaterialsTransmissionExtension(e);
    }), this.register(function (e) {
      return new GLTFMaterialsVolumeExtension(e);
    }), this.register(function (e) {
      return new GLTFMaterialsIorExtension(e);
    }), this.register(function (e) {
      return new GLTFMaterialsEmissiveStrengthExtension(e);
    }), this.register(function (e) {
      return new GLTFMaterialsSpecularExtension(e);
    }), this.register(function (e) {
      return new GLTFMaterialsIridescenceExtension(e);
    }), this.register(function (e) {
      return new GLTFMaterialsAnisotropyExtension(e);
    }), this.register(function (e) {
      return new GLTFMaterialsBumpExtension(e);
    }), this.register(function (e) {
      return new GLTFLightsExtension(e);
    }), this.register(function (e) {
      return new GLTFMeshoptCompression(e, c.EXT_MESHOPT_COMPRESSION);
    }), this.register(function (e) {
      return new GLTFMeshoptCompression(e, c.KHR_MESHOPT_COMPRESSION);
    }), this.register(function (e) {
      return new GLTFMeshGpuInstancing(e);
    });
  }
  load(e, t, n, i) {
    const a = this;
    let s;
    if ("" !== this.resourcePath) s = this.resourcePath;else if ("" !== this.path) {
      const t = ThreeCore.LoaderUtils.extractUrlBase(e);
      s = ThreeCore.LoaderUtils.resolveURL(t, this.path);
    } else s = ThreeCore.LoaderUtils.extractUrlBase(e);
    this.manager.itemStart(e);
    const o = function (t) {
        i ? i(t) : console.error(t), a.manager.itemError(e), a.manager.itemEnd(e);
      },
      fileLoader = new ThreeCore.FileLoader(this.manager);
    fileLoader.setPath(this.path), fileLoader.setResponseType("arraybuffer"), fileLoader.setRequestHeader(this.requestHeader), fileLoader.setWithCredentials(this.withCredentials), fileLoader.load(e, function (n) {
      try {
        a.parse(n, s, function (n) {
          t(n), a.manager.itemEnd(e);
        }, o);
      } catch (e) {
        o(e);
      }
    }, n, o);
  }
  setDRACOLoader(dracoLoader) {
    return this.dracoLoader = dracoLoader, this;
  }
  setKTX2Loader(ktx2Loader) {
    return this.ktx2Loader = ktx2Loader, this;
  }
  setMeshoptDecoder(meshoptDecoder) {
    return this.meshoptDecoder = meshoptDecoder, this;
  }
  register(e) {
    return -1 === this.pluginCallbacks.indexOf(e) && this.pluginCallbacks.push(e), this;
  }
  unregister(e) {
    return -1 !== this.pluginCallbacks.indexOf(e) && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1), this;
  }
  parse(e, t, n, r) {
    let i;
    const a = {},
      s = {},
      textDecoder = new TextDecoder();
    if ("string" == typeof e) i = JSON.parse(e);else if (e instanceof ArrayBuffer) {
      if (textDecoder.decode(new Uint8Array(e, 0, 4)) === l) {
        try {
          a[c.KHR_BINARY_GLTF] = new GLTFBinaryExtension(e);
        } catch (e) {
          return void (r && r(e));
        }
        i = JSON.parse(a[c.KHR_BINARY_GLTF].content);
      } else i = JSON.parse(textDecoder.decode(e));
    } else i = e;
    if (void 0 === i.asset || i.asset.version[0] < 2) return void (r && r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.")));
    const gLTFParser = new GLTFParser(i, {
      path: t || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    gLTFParser.fileLoader.setRequestHeader(this.requestHeader);
    for (let e = 0; e < this.pluginCallbacks.length; e++) {
      const t = this.pluginCallbacks[e](gLTFParser);
      t.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), s[t.name] = t, a[t.name] = !0;
    }
    if (i.extensionsUsed) for (let e = 0; e < i.extensionsUsed.length; ++e) {
      const t = i.extensionsUsed[e],
        n = i.extensionsRequired || [];
      switch (t) {
        case c.KHR_MATERIALS_UNLIT:
          a[t] = new GLTFMaterialsUnlitExtension();
          break;
        case c.KHR_DRACO_MESH_COMPRESSION:
          a[t] = new GLTFDracoMeshCompressionExtension(i, this.dracoLoader);
          break;
        case c.KHR_TEXTURE_TRANSFORM:
          a[t] = new GLTFTextureTransformExtension();
          break;
        case c.KHR_MESH_QUANTIZATION:
          a[t] = new GLTFMeshQuantizationExtension();
          break;
        default:
          n.indexOf(t) >= 0 && void 0 === s[t] && console.warn('THREE.GLTFLoader: Unknown extension "' + t + '".');
      }
    }
    gLTFParser.setExtensions(a), gLTFParser.setPlugins(s), gLTFParser.parse(n, r);
  }
  parseAsync(e, t) {
    const n = this;
    return new Promise(function (r, i) {
      n.parse(e, t, r, i);
    });
  }
}
function s() {
  let e = {};
  return {
    get: function (t) {
      return e[t];
    },
    add: function (t, n) {
      e[t] = n;
    },
    remove: function (t) {
      delete e[t];
    },
    removeAll: function () {
      e = {};
    }
  };
}
function o(e, t, n) {
  const r = e.json.materials[t];
  return r.extensions && r.extensions[n] ? r.extensions[n] : null;
}
const c = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_DISPERSION: "KHR_materials_dispersion",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
  KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
  EXT_MATERIALS_BUMP: "EXT_materials_bump",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_TEXTURE_AVIF: "EXT_texture_avif",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
  KHR_MESHOPT_COMPRESSION: "KHR_meshopt_compression",
  EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
};
class GLTFLightsExtension {
  constructor(parser) {
    this.parser = parser, this.name = c.KHR_LIGHTS_PUNCTUAL, this.cache = {
      refs: {},
      uses: {}
    };
  }
  _markDefs() {
    const parser = this.parser,
      t = this.parser.json.nodes || [];
    for (let n = 0, r = t.length; n < r; n++) {
      const r = t[n];
      r.extensions && r.extensions[this.name] && void 0 !== r.extensions[this.name].light && parser._addNodeRef(this.cache, r.extensions[this.name].light);
    }
  }
  _loadLight(e) {
    const parser = this.parser,
      n = "light:" + e;
    let i = parser.cache.get(n);
    if (i) return i;
    const a = parser.json,
      s = ((a.extensions && a.extensions[this.name] || {}).lights || [])[e];
    let o;
    const color = new ThreeCore.Color(16777215);
    void 0 !== s.color && color.setRGB(s.color[0], s.color[1], s.color[2], ThreeCore.LinearSRGBColorSpace);
    const l = void 0 !== s.range ? s.range : 0;
    switch (s.type) {
      case "directional":
        o = new ThreeCore.DirectionalLight(color), o.target.position.set(0, 0, -1), o.add(o.target);
        break;
      case "point":
        o = new ThreeCore.PointLight(color), o.distance = l;
        break;
      case "spot":
        o = new ThreeCore.SpotLight(color), o.distance = l, s.spot = s.spot || {}, s.spot.innerConeAngle = void 0 !== s.spot.innerConeAngle ? s.spot.innerConeAngle : 0, s.spot.outerConeAngle = void 0 !== s.spot.outerConeAngle ? s.spot.outerConeAngle : Math.PI / 4, o.angle = s.spot.outerConeAngle, o.penumbra = 1 - s.spot.innerConeAngle / s.spot.outerConeAngle, o.target.position.set(0, 0, -1), o.add(o.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + s.type);
    }
    return o.position.set(0, 0, 0), w(o, s), void 0 !== s.intensity && (o.intensity = s.intensity), o.name = parser.createUniqueName(s.name || "light_" + e), i = Promise.resolve(o), parser.cache.add(n, i), i;
  }
  getDependency(e, t) {
    if ("light" === e) return this._loadLight(t);
  }
  createNodeAttachment(e) {
    const t = this,
      parser = this.parser,
      r = parser.json.nodes[e],
      i = (r.extensions && r.extensions[this.name] || {}).light;
    return void 0 === i ? null : this._loadLight(i).then(function (e) {
      return parser._getNodeRef(t.cache, i, e);
    });
  }
}
class GLTFMaterialsUnlitExtension {
  constructor() {
    this.name = c.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return ThreeCore.MeshBasicMaterial;
  }
  extendParams(e, t, n) {
    const i = [];
    e.color = new ThreeCore.Color(1, 1, 1), e.opacity = 1;
    const a = t.pbrMetallicRoughness;
    if (a) {
      if (Array.isArray(a.baseColorFactor)) {
        const t = a.baseColorFactor;
        e.color.setRGB(t[0], t[1], t[2], ThreeCore.LinearSRGBColorSpace), e.opacity = t[3];
      }
      void 0 !== a.baseColorTexture && i.push(n.assignTexture(e, "map", a.baseColorTexture, ThreeCore.SRGBColorSpace));
    }
    return Promise.all(i);
  }
}
class GLTFMaterialsEmissiveStrengthExtension {
  constructor(parser) {
    this.parser = parser, this.name = c.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(e, t) {
    const n = o(this.parser, e, this.name);
    return null === n || void 0 !== n.emissiveStrength && (t.emissiveIntensity = n.emissiveStrength), Promise.resolve();
  }
}
class GLTFMaterialsClearcoatExtension {
  constructor(parser) {
    this.parser = parser, this.name = c.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(e) {
    return null !== o(this.parser, e, this.name) ? ThreeCore.MeshPhysicalMaterial : null;
  }
  extendMaterialParams(e, t) {
    const n = o(this.parser, e, this.name);
    if (null === n) return Promise.resolve();
    const i = [];
    if (void 0 !== n.clearcoatFactor && (t.clearcoat = n.clearcoatFactor), void 0 !== n.clearcoatTexture && i.push(this.parser.assignTexture(t, "clearcoatMap", n.clearcoatTexture)), void 0 !== n.clearcoatRoughnessFactor && (t.clearcoatRoughness = n.clearcoatRoughnessFactor), void 0 !== n.clearcoatRoughnessTexture && i.push(this.parser.assignTexture(t, "clearcoatRoughnessMap", n.clearcoatRoughnessTexture)), void 0 !== n.clearcoatNormalTexture && (i.push(this.parser.assignTexture(t, "clearcoatNormalMap", n.clearcoatNormalTexture)), void 0 !== n.clearcoatNormalTexture.scale)) {
      const e = n.clearcoatNormalTexture.scale;
      t.clearcoatNormalScale = new ThreeCore.Vector2(e, e);
    }
    return Promise.all(i);
  }
}
class GLTFMaterialsDispersionExtension {
  constructor(parser) {
    this.parser = parser, this.name = c.KHR_MATERIALS_DISPERSION;
  }
  getMaterialType(e) {
    return null !== o(this.parser, e, this.name) ? ThreeCore.MeshPhysicalMaterial : null;
  }
  extendMaterialParams(e, t) {
    const n = o(this.parser, e, this.name);
    return null === n || (t.dispersion = void 0 !== n.dispersion ? n.dispersion : 0), Promise.resolve();
  }
}
class GLTFMaterialsIridescenceExtension {
  constructor(parser) {
    this.parser = parser, this.name = c.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(e) {
    return null !== o(this.parser, e, this.name) ? ThreeCore.MeshPhysicalMaterial : null;
  }
  extendMaterialParams(e, t) {
    const n = o(this.parser, e, this.name);
    if (null === n) return Promise.resolve();
    const r = [];
    return void 0 !== n.iridescenceFactor && (t.iridescence = n.iridescenceFactor), void 0 !== n.iridescenceTexture && r.push(this.parser.assignTexture(t, "iridescenceMap", n.iridescenceTexture)), void 0 !== n.iridescenceIor && (t.iridescenceIOR = n.iridescenceIor), void 0 === t.iridescenceThicknessRange && (t.iridescenceThicknessRange = [100, 400]), void 0 !== n.iridescenceThicknessMinimum && (t.iridescenceThicknessRange[0] = n.iridescenceThicknessMinimum), void 0 !== n.iridescenceThicknessMaximum && (t.iridescenceThicknessRange[1] = n.iridescenceThicknessMaximum), void 0 !== n.iridescenceThicknessTexture && r.push(this.parser.assignTexture(t, "iridescenceThicknessMap", n.iridescenceThicknessTexture)), Promise.all(r);
  }
}
class GLTFMaterialsSheenExtension {
  constructor(parser) {
    this.parser = parser, this.name = c.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(e) {
    return null !== o(this.parser, e, this.name) ? ThreeCore.MeshPhysicalMaterial : null;
  }
  extendMaterialParams(e, t) {
    const n = o(this.parser, e, this.name);
    if (null === n) return Promise.resolve();
    const i = [];
    if (t.sheenColor = new ThreeCore.Color(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1, void 0 !== n.sheenColorFactor) {
      const e = n.sheenColorFactor;
      t.sheenColor.setRGB(e[0], e[1], e[2], ThreeCore.LinearSRGBColorSpace);
    }
    return void 0 !== n.sheenRoughnessFactor && (t.sheenRoughness = n.sheenRoughnessFactor), void 0 !== n.sheenColorTexture && i.push(this.parser.assignTexture(t, "sheenColorMap", n.sheenColorTexture, ThreeCore.SRGBColorSpace)), void 0 !== n.sheenRoughnessTexture && i.push(this.parser.assignTexture(t, "sheenRoughnessMap", n.sheenRoughnessTexture)), Promise.all(i);
  }
}
class GLTFMaterialsTransmissionExtension {
  constructor(parser) {
    this.parser = parser, this.name = c.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(e) {
    return null !== o(this.parser, e, this.name) ? ThreeCore.MeshPhysicalMaterial : null;
  }
  extendMaterialParams(e, t) {
    const n = o(this.parser, e, this.name);
    if (null === n) return Promise.resolve();
    const r = [];
    return void 0 !== n.transmissionFactor && (t.transmission = n.transmissionFactor), void 0 !== n.transmissionTexture && r.push(this.parser.assignTexture(t, "transmissionMap", n.transmissionTexture)), Promise.all(r);
  }
}
class GLTFMaterialsVolumeExtension {
  constructor(parser) {
    this.parser = parser, this.name = c.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(e) {
    return null !== o(this.parser, e, this.name) ? ThreeCore.MeshPhysicalMaterial : null;
  }
  extendMaterialParams(e, t) {
    const n = o(this.parser, e, this.name);
    if (null === n) return Promise.resolve();
    const i = [];
    t.thickness = void 0 !== n.thicknessFactor ? n.thicknessFactor : 0, void 0 !== n.thicknessTexture && i.push(this.parser.assignTexture(t, "thicknessMap", n.thicknessTexture)), t.attenuationDistance = n.attenuationDistance || 1 / 0;
    const a = n.attenuationColor || [1, 1, 1];
    return t.attenuationColor = new ThreeCore.Color().setRGB(a[0], a[1], a[2], ThreeCore.LinearSRGBColorSpace), Promise.all(i);
  }
}
class GLTFMaterialsIorExtension {
  constructor(parser) {
    this.parser = parser, this.name = c.KHR_MATERIALS_IOR;
  }
  getMaterialType(e) {
    return null !== o(this.parser, e, this.name) ? ThreeCore.MeshPhysicalMaterial : null;
  }
  extendMaterialParams(e, t) {
    const n = o(this.parser, e, this.name);
    return null === n || (t.ior = void 0 !== n.ior ? n.ior : 1.5, 0 === t.ior && (t.ior = 1e3)), Promise.resolve();
  }
}
class GLTFMaterialsSpecularExtension {
  constructor(parser) {
    this.parser = parser, this.name = c.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(e) {
    return null !== o(this.parser, e, this.name) ? ThreeCore.MeshPhysicalMaterial : null;
  }
  extendMaterialParams(e, t) {
    const n = o(this.parser, e, this.name);
    if (null === n) return Promise.resolve();
    const i = [];
    t.specularIntensity = void 0 !== n.specularFactor ? n.specularFactor : 1, void 0 !== n.specularTexture && i.push(this.parser.assignTexture(t, "specularIntensityMap", n.specularTexture));
    const a = n.specularColorFactor || [1, 1, 1];
    return t.specularColor = new ThreeCore.Color().setRGB(a[0], a[1], a[2], ThreeCore.LinearSRGBColorSpace), void 0 !== n.specularColorTexture && i.push(this.parser.assignTexture(t, "specularColorMap", n.specularColorTexture, ThreeCore.SRGBColorSpace)), Promise.all(i);
  }
}
class GLTFMaterialsBumpExtension {
  constructor(parser) {
    this.parser = parser, this.name = c.EXT_MATERIALS_BUMP;
  }
  getMaterialType(e) {
    return null !== o(this.parser, e, this.name) ? ThreeCore.MeshPhysicalMaterial : null;
  }
  extendMaterialParams(e, t) {
    const n = o(this.parser, e, this.name);
    if (null === n) return Promise.resolve();
    const r = [];
    return t.bumpScale = void 0 !== n.bumpFactor ? n.bumpFactor : 1, void 0 !== n.bumpTexture && r.push(this.parser.assignTexture(t, "bumpMap", n.bumpTexture)), Promise.all(r);
  }
}
class GLTFMaterialsAnisotropyExtension {
  constructor(parser) {
    this.parser = parser, this.name = c.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(e) {
    return null !== o(this.parser, e, this.name) ? ThreeCore.MeshPhysicalMaterial : null;
  }
  extendMaterialParams(e, t) {
    const n = o(this.parser, e, this.name);
    if (null === n) return Promise.resolve();
    const r = [];
    return void 0 !== n.anisotropyStrength && (t.anisotropy = n.anisotropyStrength), void 0 !== n.anisotropyRotation && (t.anisotropyRotation = n.anisotropyRotation), void 0 !== n.anisotropyTexture && r.push(this.parser.assignTexture(t, "anisotropyMap", n.anisotropyTexture)), Promise.all(r);
  }
}
class GLTFTextureBasisUExtension {
  constructor(parser) {
    this.parser = parser, this.name = c.KHR_TEXTURE_BASISU;
  }
  loadTexture(e) {
    const parser = this.parser,
      n = parser.json,
      r = n.textures[e];
    if (!r.extensions || !r.extensions[this.name]) return null;
    const i = r.extensions[this.name],
      a = parser.options.ktx2Loader;
    if (!a) {
      if (n.extensionsRequired && n.extensionsRequired.indexOf(this.name) >= 0) throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return parser.loadTextureImage(e, i.source, a);
  }
}
class GLTFTextureWebPExtension {
  constructor(parser) {
    this.parser = parser, this.name = c.EXT_TEXTURE_WEBP;
  }
  loadTexture(e) {
    const name = this.name,
      parser = this.parser,
      r = parser.json,
      i = r.textures[e];
    if (!i.extensions || !i.extensions[name]) return null;
    const a = i.extensions[name],
      s = r.images[a.source];
    let o = parser.textureLoader;
    if (s.uri) {
      const e = parser.options.manager.getHandler(s.uri);
      null !== e && (o = e);
    }
    return parser.loadTextureImage(e, a.source, o);
  }
}
class GLTFTextureAVIFExtension {
  constructor(parser) {
    this.parser = parser, this.name = c.EXT_TEXTURE_AVIF;
  }
  loadTexture(e) {
    const name = this.name,
      parser = this.parser,
      r = parser.json,
      i = r.textures[e];
    if (!i.extensions || !i.extensions[name]) return null;
    const a = i.extensions[name],
      s = r.images[a.source];
    let o = parser.textureLoader;
    if (s.uri) {
      const e = parser.options.manager.getHandler(s.uri);
      null !== e && (o = e);
    }
    return parser.loadTextureImage(e, a.source, o);
  }
}
class GLTFMeshoptCompression {
  constructor(parser, name) {
    this.name = name, this.parser = parser;
  }
  loadBufferView(e) {
    const t = this.parser.json,
      n = t.bufferViews[e];
    if (n.extensions && n.extensions[this.name]) {
      const e = n.extensions[this.name],
        r = this.parser.getDependency("buffer", e.buffer),
        i = this.parser.options.meshoptDecoder;
      if (!i || !i.supported) {
        if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0) throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return r.then(function (t) {
        const n = e.byteOffset || 0,
          r = e.byteLength || 0,
          a = e.count,
          s = e.byteStride,
          uint8Array = new Uint8Array(t, n, r);
        return i.decodeGltfBufferAsync ? i.decodeGltfBufferAsync(a, s, uint8Array, e.mode, e.filter).then(function (e) {
          return e.buffer;
        }) : i.ready.then(function () {
          const arrayBuffer = new ArrayBuffer(a * s);
          return i.decodeGltfBuffer(new Uint8Array(arrayBuffer), a, s, uint8Array, e.mode, e.filter), arrayBuffer;
        });
      });
    }
    return null;
  }
}
class GLTFMeshGpuInstancing {
  constructor(parser) {
    this.name = c.EXT_MESH_GPU_INSTANCING, this.parser = parser;
  }
  createNodeMesh(e) {
    const t = this.parser.json,
      n = t.nodes[e];
    if (!n.extensions || !n.extensions[this.name] || void 0 === n.mesh) return null;
    const i = t.meshes[n.mesh];
    for (const e of i.primitives) if (e.mode !== p.TRIANGLES && e.mode !== p.TRIANGLE_STRIP && e.mode !== p.TRIANGLE_FAN && void 0 !== e.mode) return null;
    const a = n.extensions[this.name].attributes,
      s = [],
      o = {};
    for (const e in a) s.push(this.parser.getDependency("accessor", a[e]).then(t => (o[e] = t, o[e])));
    return s.length < 1 ? null : (s.push(this.parser.createNodeMesh(e)), Promise.all(s).then(e => {
      const t = e.pop(),
        n = t.isGroup ? t.children : [t],
        i = e[0].count,
        a = [];
      for (const e of n) {
        const matrix4 = new ThreeCore.Matrix4(),
          vector3 = new ThreeCore.Vector3(),
          quaternion = new ThreeCore.Quaternion(),
          c = new ThreeCore.Vector3(1, 1, 1),
          instancedMesh = new ThreeCore.InstancedMesh(e.geometry, e.material, i);
        for (let e = 0; e < i; e++) o.TRANSLATION && vector3.fromBufferAttribute(o.TRANSLATION, e), o.ROTATION && quaternion.fromBufferAttribute(o.ROTATION, e), o.SCALE && c.fromBufferAttribute(o.SCALE, e), instancedMesh.setMatrixAt(e, matrix4.compose(vector3, quaternion, c));
        for (const t in o) if ("_COLOR_0" === t) {
          const e = o[t];
          instancedMesh.instanceColor = new ThreeCore.InstancedBufferAttribute(e.array, e.itemSize, e.normalized);
        } else "TRANSLATION" !== t && "ROTATION" !== t && "SCALE" !== t && e.geometry.setAttribute(t, o[t]);
        ThreeCore.Object3D.prototype.copy.call(instancedMesh, e), this.parser.assignFinalMaterial(instancedMesh), a.push(instancedMesh);
      }
      return t.isGroup ? (t.clear(), t.add(...a), t) : a[0];
    }));
  }
}
const l = "glTF",
  u = 1313821514,
  d = 5130562;
class GLTFBinaryExtension {
  constructor(e) {
    this.name = c.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const dataView = new DataView(e, 0, 12),
      textDecoder = new TextDecoder();
    if (this.header = {
      magic: textDecoder.decode(new Uint8Array(e.slice(0, 4))),
      version: dataView.getUint32(4, !0),
      length: dataView.getUint32(8, !0)
    }, this.header.magic !== l) throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2) throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const r = this.header.length - 12,
      i = new DataView(e, 12);
    let a = 0;
    for (; a < r;) {
      const t = i.getUint32(a, !0);
      a += 4;
      const r = i.getUint32(a, !0);
      if (a += 4, r === u) {
        const uint8Array = new Uint8Array(e, 12 + a, t);
        this.content = textDecoder.decode(uint8Array);
      } else if (r === d) {
        const n = 12 + a;
        this.body = e.slice(n, n + t);
      }
      a += t;
    }
    if (null === this.content) throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class GLTFDracoMeshCompressionExtension {
  constructor(json, dracoLoader) {
    if (!dracoLoader) throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = c.KHR_DRACO_MESH_COMPRESSION, this.json = json, this.dracoLoader = dracoLoader, this.dracoLoader.preload();
  }
  decodePrimitive(e, t) {
    const json = this.json,
      dracoLoader = this.dracoLoader,
      a = e.extensions[this.name].bufferView,
      s = e.extensions[this.name].attributes,
      o = {},
      c = {},
      l = {};
    for (const e in s) {
      const t = A[e] || e.toLowerCase();
      o[t] = s[e];
    }
    for (const t in e.attributes) {
      const r = A[t] || t.toLowerCase();
      if (void 0 !== s[t]) {
        const i = json.accessors[e.attributes[t]],
          a = f[i.componentType];
        l[r] = a.name, c[r] = !0 === i.normalized;
      }
    }
    return t.getDependency("bufferView", a).then(function (e) {
      return new Promise(function (t, n) {
        dracoLoader.decodeDracoFile(e, function (e) {
          for (const t in e.attributes) {
            const n = e.attributes[t],
              r = c[t];
            void 0 !== r && (n.normalized = r);
          }
          t(e);
        }, o, l, ThreeCore.LinearSRGBColorSpace, n);
      });
    });
  }
}
class GLTFTextureTransformExtension {
  constructor() {
    this.name = c.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(e, t) {
    return void 0 !== t.texCoord && t.texCoord !== e.channel || void 0 !== t.offset || void 0 !== t.rotation || void 0 !== t.scale ? (e = e.clone(), void 0 !== t.texCoord && (e.channel = t.texCoord), void 0 !== t.offset && e.offset.fromArray(t.offset), void 0 !== t.rotation && (e.rotation = t.rotation), void 0 !== t.scale && e.repeat.fromArray(t.scale), e.needsUpdate = !0, e) : e;
  }
}
class GLTFMeshQuantizationExtension {
  constructor() {
    this.name = c.KHR_MESH_QUANTIZATION;
  }
}
class GLTFCubicSplineInterpolant extends ThreeCore.Interpolant {
  constructor(e, t, n, r) {
    super(e, t, n, r);
  }
  copySampleValue_(e) {
    const resultBuffer = this.resultBuffer,
      sampleValues = this.sampleValues,
      valueSize = this.valueSize,
      i = e * valueSize * 3 + valueSize;
    for (let e = 0; e !== valueSize; e++) resultBuffer[e] = sampleValues[i + e];
    return resultBuffer;
  }
  interpolate_(e, t, n, r) {
    const resultBuffer = this.resultBuffer,
      sampleValues = this.sampleValues,
      valueSize = this.valueSize,
      o = 2 * valueSize,
      c = 3 * valueSize,
      l = r - t,
      u = (n - t) / l,
      d = u * u,
      h = d * u,
      p = e * c,
      f = p - c,
      m = -2 * h + 3 * d,
      M = h - d,
      _ = 1 - m,
      A = M - d + u;
    for (let e = 0; e !== valueSize; e++) {
      const t = sampleValues[f + e + valueSize],
        n = sampleValues[f + e + o] * l,
        r = sampleValues[p + e + valueSize],
        c = sampleValues[p + e] * l;
      resultBuffer[e] = _ * t + A * n + m * r + M * c;
    }
    return resultBuffer;
  }
}
const quaternion = new ThreeCore.Quaternion();
class GLTFCubicSplineQuaternionInterpolant extends GLTFCubicSplineInterpolant {
  interpolate_(e, t, n, r) {
    const i = super.interpolate_(e, t, n, r);
    return quaternion.fromArray(i).normalize().toArray(i), i;
  }
}
const p = {
    FLOAT: 5126,
    FLOAT_MAT3: 35675,
    FLOAT_MAT4: 35676,
    FLOAT_VEC2: 35664,
    FLOAT_VEC3: 35665,
    FLOAT_VEC4: 35666,
    LINEAR: 9729,
    REPEAT: 10497,
    SAMPLER_2D: 35678,
    POINTS: 0,
    LINES: 1,
    LINE_LOOP: 2,
    LINE_STRIP: 3,
    TRIANGLES: 4,
    TRIANGLE_STRIP: 5,
    TRIANGLE_FAN: 6,
    UNSIGNED_BYTE: 5121,
    UNSIGNED_SHORT: 5123
  },
  f = {
    5120: Int8Array,
    5121: Uint8Array,
    5122: Int16Array,
    5123: Uint16Array,
    5125: Uint32Array,
    5126: Float32Array
  },
  m = {
    9728: ThreeCore.NearestFilter,
    9729: ThreeCore.LinearFilter,
    9984: ThreeCore.NearestMipmapNearestFilter,
    9985: ThreeCore.LinearMipmapNearestFilter,
    9986: ThreeCore.NearestMipmapLinearFilter,
    9987: ThreeCore.LinearMipmapLinearFilter
  },
  M = {
    33071: ThreeCore.ClampToEdgeWrapping,
    33648: ThreeCore.MirroredRepeatWrapping,
    10497: ThreeCore.RepeatWrapping
  },
  _ = {
    SCALAR: 1,
    VEC2: 2,
    VEC3: 3,
    VEC4: 4,
    MAT2: 4,
    MAT3: 9,
    MAT4: 16
  },
  A = {
    POSITION: "position",
    NORMAL: "normal",
    TANGENT: "tangent",
    TEXCOORD_0: "uv",
    TEXCOORD_1: "uv1",
    TEXCOORD_2: "uv2",
    TEXCOORD_3: "uv3",
    COLOR_0: "color",
    WEIGHTS_0: "skinWeight",
    JOINTS_0: "skinIndex"
  },
  g = {
    scale: "scale",
    translation: "position",
    rotation: "quaternion",
    weights: "morphTargetInfluences"
  },
  b = {
    CUBICSPLINE: void 0,
    LINEAR: ThreeCore.InterpolateLinear,
    STEP: ThreeCore.InterpolateDiscrete
  },
  y = "OPAQUE",
  L = "MASK",
  v = "BLEND";
function T(e) {
  return void 0 === e.DefaultMaterial && (e.DefaultMaterial = new ThreeCore.MeshStandardMaterial({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: ThreeCore.FrontSide
  })), e.DefaultMaterial;
}
function S(e, t, n) {
  for (const r in n.extensions) void 0 === e[r] && (t.userData.gltfExtensions = t.userData.gltfExtensions || {}, t.userData.gltfExtensions[r] = n.extensions[r]);
}
function w(e, t) {
  void 0 !== t.extras && ("object" == typeof t.extras ? Object.assign(e.userData, t.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + t.extras));
}
function E(e, t) {
  if (e.updateMorphTargets(), void 0 !== t.weights) for (let n = 0, r = t.weights.length; n < r; n++) e.morphTargetInfluences[n] = t.weights[n];
  if (t.extras && Array.isArray(t.extras.targetNames)) {
    const n = t.extras.targetNames;
    if (e.morphTargetInfluences.length === n.length) {
      e.morphTargetDictionary = {};
      for (let t = 0, r = n.length; t < r; t++) e.morphTargetDictionary[n[t]] = t;
    } else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function x(e) {
  let t;
  const n = e.extensions && e.extensions[c.KHR_DRACO_MESH_COMPRESSION];
  if (t = n ? "draco:" + n.bufferView + ":" + n.indices + ":" + C(n.attributes) : e.indices + ":" + C(e.attributes) + ":" + e.mode, void 0 !== e.targets) for (let n = 0, r = e.targets.length; n < r; n++) t += ":" + C(e.targets[n]);
  return t;
}
function C(e) {
  let t = "";
  const n = Object.keys(e).sort();
  for (let r = 0, i = n.length; r < i; r++) t += n[r] + ":" + e[n[r]] + ";";
  return t;
}
function z(e) {
  switch (e) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
  }
}
const matrix4 = new ThreeCore.Matrix4();
class GLTFParser {
  constructor(json = {}, options = {}) {
    this.json = json, this.extensions = {}, this.plugins = {}, this.options = options, this.cache = new s(), this.associations = new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = {
      refs: {},
      uses: {}
    }, this.cameraCache = {
      refs: {},
      uses: {}
    }, this.lightCache = {
      refs: {},
      uses: {}
    }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let n = !1,
      i = -1,
      a = !1,
      o = -1;
    if ("undefined" != typeof navigator && void 0 !== navigator.userAgent) {
      const e = navigator.userAgent;
      n = !0 === /^((?!chrome|android).)*safari/i.test(e);
      const t = e.match(/Version\/(\d+)/);
      i = n && t ? parseInt(t[1], 10) : -1, a = e.indexOf("Firefox") > -1, o = a ? e.match(/Firefox\/([0-9]+)\./)[1] : -1;
    }
    "undefined" == typeof createImageBitmap || n && i < 17 || a && o < 98 ? this.textureLoader = new ThreeCore.TextureLoader(this.options.manager) : this.textureLoader = new ThreeCore.ImageBitmapLoader(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new ThreeCore.FileLoader(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), "use-credentials" === this.options.crossOrigin && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(extensions) {
    this.extensions = extensions;
  }
  setPlugins(plugins) {
    this.plugins = plugins;
  }
  parse(e, t) {
    const n = this,
      json = this.json,
      extensions = this.extensions;
    this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function (e) {
      return e._markDefs && e._markDefs();
    }), Promise.all(this._invokeAll(function (e) {
      return e.beforeRoot && e.beforeRoot();
    })).then(function () {
      return Promise.all([n.getDependencies("scene"), n.getDependencies("animation"), n.getDependencies("camera")]);
    }).then(function (t) {
      const a = {
        scene: t[0][json.scene || 0],
        scenes: t[0],
        animations: t[1],
        cameras: t[2],
        asset: json.asset,
        parser: n,
        userData: {}
      };
      return S(extensions, a, json), w(a, json), Promise.all(n._invokeAll(function (e) {
        return e.afterRoot && e.afterRoot(a);
      })).then(function () {
        for (const e of a.scenes) e.updateMatrixWorld();
        e(a);
      });
    }).catch(t);
  }
  _markDefs() {
    const e = this.json.nodes || [],
      t = this.json.skins || [],
      n = this.json.meshes || [];
    for (let n = 0, r = t.length; n < r; n++) {
      const r = t[n].joints;
      for (let t = 0, n = r.length; t < n; t++) e[r[t]].isBone = !0;
    }
    for (let t = 0, r = e.length; t < r; t++) {
      const r = e[t];
      void 0 !== r.mesh && (this._addNodeRef(this.meshCache, r.mesh), void 0 !== r.skin && (n[r.mesh].isSkinnedMesh = !0)), void 0 !== r.camera && this._addNodeRef(this.cameraCache, r.camera);
    }
  }
  _addNodeRef(e, t) {
    void 0 !== t && (void 0 === e.refs[t] && (e.refs[t] = e.uses[t] = 0), e.refs[t]++);
  }
  _getNodeRef(e, t, n) {
    if (e.refs[t] <= 1) return n;
    const r = n.clone(),
      i = (e, t) => {
        const n = this.associations.get(e);
        null != n && this.associations.set(t, n);
        for (const [n, r] of e.children.entries()) i(r, t.children[n]);
      };
    return i(n, r), r.name += "_instance_" + e.uses[t]++, r;
  }
  _invokeOne(e) {
    const t = Object.values(this.plugins);
    t.push(this);
    for (let n = 0; n < t.length; n++) {
      const r = e(t[n]);
      if (r) return r;
    }
    return null;
  }
  _invokeAll(e) {
    const t = Object.values(this.plugins);
    t.unshift(this);
    const n = [];
    for (let r = 0; r < t.length; r++) {
      const i = e(t[r]);
      i && n.push(i);
    }
    return n;
  }
  getDependency(e, t) {
    const n = e + ":" + t;
    let r = this.cache.get(n);
    if (!r) {
      switch (e) {
        case "scene":
          r = this.loadScene(t);
          break;
        case "node":
          r = this._invokeOne(function (e) {
            return e.loadNode && e.loadNode(t);
          });
          break;
        case "mesh":
          r = this._invokeOne(function (e) {
            return e.loadMesh && e.loadMesh(t);
          });
          break;
        case "accessor":
          r = this.loadAccessor(t);
          break;
        case "bufferView":
          r = this._invokeOne(function (e) {
            return e.loadBufferView && e.loadBufferView(t);
          });
          break;
        case "buffer":
          r = this.loadBuffer(t);
          break;
        case "material":
          r = this._invokeOne(function (e) {
            return e.loadMaterial && e.loadMaterial(t);
          });
          break;
        case "texture":
          r = this._invokeOne(function (e) {
            return e.loadTexture && e.loadTexture(t);
          });
          break;
        case "skin":
          r = this.loadSkin(t);
          break;
        case "animation":
          r = this._invokeOne(function (e) {
            return e.loadAnimation && e.loadAnimation(t);
          });
          break;
        case "camera":
          r = this.loadCamera(t);
          break;
        default:
          if (r = this._invokeOne(function (n) {
            return n != this && n.getDependency && n.getDependency(e, t);
          }), !r) throw new Error("Unknown type: " + e);
      }
      this.cache.add(n, r);
    }
    return r;
  }
  getDependencies(e) {
    let t = this.cache.get(e);
    if (!t) {
      const n = this,
        r = this.json[e + ("mesh" === e ? "es" : "s")] || [];
      t = Promise.all(r.map(function (t, r) {
        return n.getDependency(e, r);
      })), this.cache.add(e, t);
    }
    return t;
  }
  loadBuffer(e) {
    const t = this.json.buffers[e],
      fileLoader = this.fileLoader;
    if (t.type && "arraybuffer" !== t.type) throw new Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported.");
    if (void 0 === t.uri && 0 === e) return Promise.resolve(this.extensions[c.KHR_BINARY_GLTF].body);
    const options = this.options;
    return new Promise(function (e, a) {
      fileLoader.load(ThreeCore.LoaderUtils.resolveURL(t.uri, options.path), e, void 0, function () {
        a(new Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'));
      });
    });
  }
  loadBufferView(e) {
    const t = this.json.bufferViews[e];
    return this.getDependency("buffer", t.buffer).then(function (e) {
      const n = t.byteLength || 0,
        r = t.byteOffset || 0;
      return e.slice(r, r + n);
    });
  }
  loadAccessor(e) {
    const t = this,
      json = this.json,
      i = this.json.accessors[e];
    if (void 0 === i.bufferView && void 0 === i.sparse) {
      const e = _[i.type],
        t = f[i.componentType],
        n = !0 === i.normalized,
        a = new t(i.count * e);
      return Promise.resolve(new ThreeCore.BufferAttribute(a, e, n));
    }
    const a = [];
    return void 0 !== i.bufferView ? a.push(this.getDependency("bufferView", i.bufferView)) : a.push(null), void 0 !== i.sparse && (a.push(this.getDependency("bufferView", i.sparse.indices.bufferView)), a.push(this.getDependency("bufferView", i.sparse.values.bufferView))), Promise.all(a).then(function (e) {
      const a = e[0],
        s = _[i.type],
        o = f[i.componentType],
        c = o.BYTES_PER_ELEMENT,
        l = c * s,
        u = i.byteOffset || 0,
        d = void 0 !== i.bufferView ? json.bufferViews[i.bufferView].byteStride : void 0,
        h = !0 === i.normalized;
      let p, m;
      if (d && d !== l) {
        const e = Math.floor(u / d),
          n = "InterleavedBuffer:" + i.bufferView + ":" + i.componentType + ":" + e + ":" + i.count;
        let l = t.cache.get(n);
        l || (p = new o(a, e * d, i.count * d / c), l = new ThreeCore.InterleavedBuffer(p, d / c), t.cache.add(n, l)), m = new ThreeCore.InterleavedBufferAttribute(l, s, u % d / c, h);
      } else p = null === a ? new o(i.count * s) : new o(a, u, i.count * s), m = new ThreeCore.BufferAttribute(p, s, h);
      if (void 0 !== i.sparse) {
        const t = _.SCALAR,
          n = f[i.sparse.indices.componentType],
          c = i.sparse.indices.byteOffset || 0,
          l = i.sparse.values.byteOffset || 0,
          u = new n(e[1], c, i.sparse.count * t),
          d = new o(e[2], l, i.sparse.count * s);
        null !== a && (m = new ThreeCore.BufferAttribute(m.array.slice(), m.itemSize, m.normalized)), m.normalized = !1;
        for (let e = 0, t = u.length; e < t; e++) {
          const t = u[e];
          if (m.setX(t, d[e * s]), s >= 2 && m.setY(t, d[e * s + 1]), s >= 3 && m.setZ(t, d[e * s + 2]), s >= 4 && m.setW(t, d[e * s + 3]), s >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
        m.normalized = h;
      }
      return m;
    });
  }
  loadTexture(e) {
    const json = this.json,
      options = this.options,
      r = json.textures[e].source,
      i = json.images[r];
    let textureLoader = this.textureLoader;
    if (i.uri) {
      const e = options.manager.getHandler(i.uri);
      null !== e && (textureLoader = e);
    }
    return this.loadTextureImage(e, r, textureLoader);
  }
  loadTextureImage(e, t, n) {
    const i = this,
      json = this.json,
      s = json.textures[e],
      o = json.images[t],
      c = (o.uri || o.bufferView) + ":" + s.sampler;
    if (this.textureCache[c]) return this.textureCache[c];
    const l = this.loadImageSource(t, n).then(function (t) {
      t.flipY = !1, t.name = s.name || o.name || "", "" === t.name && "string" == typeof o.uri && !1 === o.uri.startsWith("data:image/") && (t.name = o.uri);
      const n = (json.samplers || {})[s.sampler] || {};
      return t.magFilter = m[n.magFilter] || ThreeCore.LinearFilter, t.minFilter = m[n.minFilter] || ThreeCore.LinearMipmapLinearFilter, t.wrapS = M[n.wrapS] || ThreeCore.RepeatWrapping, t.wrapT = M[n.wrapT] || ThreeCore.RepeatWrapping, t.generateMipmaps = !t.isCompressedTexture && t.minFilter !== ThreeCore.NearestFilter && t.minFilter !== ThreeCore.LinearFilter, i.associations.set(t, {
        textures: e
      }), t;
    }).catch(function () {
      return null;
    });
    return this.textureCache[c] = l, l;
  }
  loadImageSource(e, t) {
    const n = this,
      json = this.json,
      options = this.options;
    if (void 0 !== this.sourceCache[e]) return this.sourceCache[e].then(e => e.clone());
    const s = json.images[e],
      o = self.URL || self.webkitURL;
    let c = s.uri || "",
      l = !1;
    if (void 0 !== s.bufferView) c = n.getDependency("bufferView", s.bufferView).then(function (e) {
      l = !0;
      const blob = new Blob([e], {
        type: s.mimeType
      });
      return c = o.createObjectURL(blob), c;
    });else if (void 0 === s.uri) throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
    const u = Promise.resolve(c).then(function (e) {
      return new Promise(function (n, i) {
        let s = n;
        !0 === t.isImageBitmapLoader && (s = function (e) {
          const texture = new ThreeCore.Texture(e);
          texture.needsUpdate = !0, n(texture);
        }), t.load(ThreeCore.LoaderUtils.resolveURL(e, options.path), s, void 0, i);
      });
    }).then(function (e) {
      var t;
      return !0 === l && o.revokeObjectURL(c), w(e, s), e.userData.mimeType = s.mimeType || ((t = s.uri).search(/\.jpe?g($|\?)/i) > 0 || 0 === t.search(/^data\:image\/jpeg/) ? "image/jpeg" : t.search(/\.webp($|\?)/i) > 0 || 0 === t.search(/^data\:image\/webp/) ? "image/webp" : t.search(/\.ktx2($|\?)/i) > 0 || 0 === t.search(/^data\:image\/ktx2/) ? "image/ktx2" : "image/png"), e;
    }).catch(function (e) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", c), e;
    });
    return this.sourceCache[e] = u, u;
  }
  assignTexture(e, t, n, r) {
    const i = this;
    return this.getDependency("texture", n.index).then(function (a) {
      if (!a) return null;
      if (void 0 !== n.texCoord && n.texCoord > 0 && ((a = a.clone()).channel = n.texCoord), i.extensions[c.KHR_TEXTURE_TRANSFORM]) {
        const e = void 0 !== n.extensions ? n.extensions[c.KHR_TEXTURE_TRANSFORM] : void 0;
        if (e) {
          const t = i.associations.get(a);
          a = i.extensions[c.KHR_TEXTURE_TRANSFORM].extendTexture(a, e), i.associations.set(a, t);
        }
      }
      return void 0 !== r && (a.colorSpace = r), e[t] = a, a;
    });
  }
  assignFinalMaterial(e) {
    const t = e.geometry;
    let n = e.material;
    const i = void 0 === t.attributes.tangent,
      a = void 0 !== t.attributes.color,
      s = void 0 === t.attributes.normal;
    if (e.isPoints) {
      const e = "PointsMaterial:" + n.uuid;
      let t = this.cache.get(e);
      t || (t = new ThreeCore.PointsMaterial(), ThreeCore.Material.prototype.copy.call(t, n), t.color.copy(n.color), t.map = n.map, t.sizeAttenuation = !1, this.cache.add(e, t)), n = t;
    } else if (e.isLine) {
      const e = "LineBasicMaterial:" + n.uuid;
      let t = this.cache.get(e);
      t || (t = new ThreeCore.LineBasicMaterial(), ThreeCore.Material.prototype.copy.call(t, n), t.color.copy(n.color), t.map = n.map, this.cache.add(e, t)), n = t;
    }
    if (i || a || s) {
      let e = "ClonedMaterial:" + n.uuid + ":";
      i && (e += "derivative-tangents:"), a && (e += "vertex-colors:"), s && (e += "flat-shading:");
      let t = this.cache.get(e);
      t || (t = n.clone(), a && (t.vertexColors = !0), s && (t.flatShading = !0), i && (t.normalScale && (t.normalScale.y *= -1), t.clearcoatNormalScale && (t.clearcoatNormalScale.y *= -1)), this.cache.add(e, t), this.associations.set(t, this.associations.get(n))), n = t;
    }
    e.material = n;
  }
  getMaterialType() {
    return ThreeCore.MeshStandardMaterial;
  }
  loadMaterial(e) {
    const t = this,
      json = this.json,
      extensions = this.extensions,
      a = json.materials[e];
    let s;
    const o = {},
      l = [];
    if ((a.extensions || {})[c.KHR_MATERIALS_UNLIT]) {
      const e = extensions[c.KHR_MATERIALS_UNLIT];
      s = e.getMaterialType(), l.push(e.extendParams(o, a, t));
    } else {
      const n = a.pbrMetallicRoughness || {};
      if (o.color = new ThreeCore.Color(1, 1, 1), o.opacity = 1, Array.isArray(n.baseColorFactor)) {
        const e = n.baseColorFactor;
        o.color.setRGB(e[0], e[1], e[2], ThreeCore.LinearSRGBColorSpace), o.opacity = e[3];
      }
      void 0 !== n.baseColorTexture && l.push(t.assignTexture(o, "map", n.baseColorTexture, ThreeCore.SRGBColorSpace)), o.metalness = void 0 !== n.metallicFactor ? n.metallicFactor : 1, o.roughness = void 0 !== n.roughnessFactor ? n.roughnessFactor : 1, void 0 !== n.metallicRoughnessTexture && (l.push(t.assignTexture(o, "metalnessMap", n.metallicRoughnessTexture)), l.push(t.assignTexture(o, "roughnessMap", n.metallicRoughnessTexture))), s = this._invokeOne(function (t) {
        return t.getMaterialType && t.getMaterialType(e);
      }), l.push(Promise.all(this._invokeAll(function (t) {
        return t.extendMaterialParams && t.extendMaterialParams(e, o);
      })));
    }
    !0 === a.doubleSided && (o.side = ThreeCore.DoubleSide);
    const u = a.alphaMode || y;
    if (u === v ? (o.transparent = !0, o.depthWrite = !1) : (o.transparent = !1, u === L && (o.alphaTest = void 0 !== a.alphaCutoff ? a.alphaCutoff : .5)), void 0 !== a.normalTexture && s !== ThreeCore.MeshBasicMaterial && (l.push(t.assignTexture(o, "normalMap", a.normalTexture)), o.normalScale = new ThreeCore.Vector2(1, 1), void 0 !== a.normalTexture.scale)) {
      const e = a.normalTexture.scale;
      o.normalScale.set(e, e);
    }
    if (void 0 !== a.occlusionTexture && s !== ThreeCore.MeshBasicMaterial && (l.push(t.assignTexture(o, "aoMap", a.occlusionTexture)), void 0 !== a.occlusionTexture.strength && (o.aoMapIntensity = a.occlusionTexture.strength)), void 0 !== a.emissiveFactor && s !== ThreeCore.MeshBasicMaterial) {
      const e = a.emissiveFactor;
      o.emissive = new ThreeCore.Color().setRGB(e[0], e[1], e[2], ThreeCore.LinearSRGBColorSpace);
    }
    return void 0 !== a.emissiveTexture && s !== ThreeCore.MeshBasicMaterial && l.push(t.assignTexture(o, "emissiveMap", a.emissiveTexture, ThreeCore.SRGBColorSpace)), Promise.all(l).then(function () {
      const n = new s(o);
      return a.name && (n.name = a.name), w(n, a), t.associations.set(n, {
        materials: e
      }), a.extensions && S(extensions, n, a), n;
    });
  }
  createUniqueName(e) {
    const t = ThreeCore.PropertyBinding.sanitizeNodeName(e || "");
    return t in this.nodeNamesUsed ? t + "_" + ++this.nodeNamesUsed[t] : (this.nodeNamesUsed[t] = 0, t);
  }
  loadGeometries(e) {
    const t = this,
      extensions = this.extensions,
      primitiveCache = this.primitiveCache;
    function a(e) {
      return extensions[c.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e, t).then(function (n) {
        return B(n, e, t);
      });
    }
    const s = [];
    for (let n = 0, o = e.length; n < o; n++) {
      const o = e[n],
        l = x(o),
        u = primitiveCache[l];
      if (u) s.push(u.promise);else {
        let e;
        e = o.extensions && o.extensions[c.KHR_DRACO_MESH_COMPRESSION] ? a(o) : B(new ThreeCore.BufferGeometry(), o, t), primitiveCache[l] = {
          primitive: o,
          promise: e
        }, s.push(e);
      }
    }
    return Promise.all(s);
  }
  loadMesh(e) {
    const t = this,
      json = this.json,
      extensions = this.extensions,
      s = json.meshes[e],
      o = s.primitives,
      c = [];
    for (let e = 0, t = o.length; e < t; e++) {
      const t = void 0 === o[e].material ? T(this.cache) : this.getDependency("material", o[e].material);
      c.push(t);
    }
    return c.push(t.loadGeometries(o)), Promise.all(c).then(function (n) {
      const c = n.slice(0, n.length - 1),
        l = n[n.length - 1],
        u = [];
      for (let n = 0, d = l.length; n < d; n++) {
        const d = l[n],
          h = o[n];
        let f;
        const m = c[n];
        if (h.mode === p.TRIANGLES || h.mode === p.TRIANGLE_STRIP || h.mode === p.TRIANGLE_FAN || void 0 === h.mode) f = !0 === s.isSkinnedMesh ? new ThreeCore.SkinnedMesh(d, m) : new ThreeCore.Mesh(d, m), !0 === f.isSkinnedMesh && f.normalizeSkinWeights(), h.mode === p.TRIANGLE_STRIP ? f.geometry = (0, computeMikkTSpaceTangents.toTrianglesDrawMode)(f.geometry, ThreeCore.TriangleStripDrawMode) : h.mode === p.TRIANGLE_FAN && (f.geometry = (0, computeMikkTSpaceTangents.toTrianglesDrawMode)(f.geometry, ThreeCore.TriangleFanDrawMode));else if (h.mode === p.LINES) f = new ThreeCore.LineSegments(d, m);else if (h.mode === p.LINE_STRIP) f = new ThreeCore.Line(d, m);else if (h.mode === p.LINE_LOOP) f = new ThreeCore.LineLoop(d, m);else {
          if (h.mode !== p.POINTS) throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + h.mode);
          f = new ThreeCore.Points(d, m);
        }
        Object.keys(f.geometry.morphAttributes).length > 0 && E(f, s), f.name = t.createUniqueName(s.name || "mesh_" + e), w(f, s), h.extensions && S(extensions, f, h), t.assignFinalMaterial(f), u.push(f);
      }
      for (let n = 0, r = u.length; n < r; n++) t.associations.set(u[n], {
        meshes: e,
        primitives: n
      });
      if (1 === u.length) return s.extensions && S(extensions, u[0], s), u[0];
      const group = new ThreeCore.Group();
      s.extensions && S(extensions, group, s), t.associations.set(group, {
        meshes: e
      });
      for (let e = 0, t = u.length; e < t; e++) group.add(u[e]);
      return group;
    });
  }
  loadCamera(e) {
    let t;
    const n = this.json.cameras[e],
      i = n[n.type];
    if (i) return "perspective" === n.type ? t = new ThreeCore.PerspectiveCamera(ThreeCore.MathUtils.radToDeg(i.yfov), i.aspectRatio || 1, i.znear || 1, i.zfar || 2e6) : "orthographic" === n.type && (t = new ThreeCore.OrthographicCamera(-i.xmag, i.xmag, i.ymag, -i.ymag, i.znear, i.zfar)), n.name && (t.name = this.createUniqueName(n.name)), w(t, n), Promise.resolve(t);
    console.warn("THREE.GLTFLoader: Missing camera parameters.");
  }
  loadSkin(e) {
    const t = this.json.skins[e],
      n = [];
    for (let e = 0, r = t.joints.length; e < r; e++) n.push(this._loadNodeShallow(t.joints[e]));
    return void 0 !== t.inverseBindMatrices ? n.push(this.getDependency("accessor", t.inverseBindMatrices)) : n.push(null), Promise.all(n).then(function (e) {
      const n = e.pop(),
        i = e,
        a = [],
        s = [];
      for (let e = 0, o = i.length; e < o; e++) {
        const o = i[e];
        if (o) {
          a.push(o);
          const t = new ThreeCore.Matrix4();
          null !== n && t.fromArray(n.array, 16 * e), s.push(t);
        } else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[e]);
      }
      return new ThreeCore.Skeleton(a, s);
    });
  }
  loadAnimation(e) {
    const json = this.json,
      n = this,
      i = json.animations[e],
      a = i.name ? i.name : "animation_" + e,
      s = [],
      o = [],
      c = [],
      l = [],
      u = [];
    for (let e = 0, t = i.channels.length; e < t; e++) {
      const t = i.channels[e],
        n = i.samplers[t.sampler],
        r = t.target,
        a = r.node,
        d = void 0 !== i.parameters ? i.parameters[n.input] : n.input,
        h = void 0 !== i.parameters ? i.parameters[n.output] : n.output;
      void 0 !== r.node && (s.push(this.getDependency("node", a)), o.push(this.getDependency("accessor", d)), c.push(this.getDependency("accessor", h)), l.push(n), u.push(r));
    }
    return Promise.all([Promise.all(s), Promise.all(o), Promise.all(c), Promise.all(l), Promise.all(u)]).then(function (e) {
      const t = e[0],
        s = e[1],
        o = e[2],
        c = e[3],
        l = e[4],
        u = [];
      for (let e = 0, r = t.length; e < r; e++) {
        const r = t[e],
          i = s[e],
          a = o[e],
          d = c[e],
          h = l[e];
        if (void 0 === r) continue;
        r.updateMatrix && r.updateMatrix();
        const p = n._createAnimationTracks(r, i, a, d, h);
        if (p) for (let e = 0; e < p.length; e++) u.push(p[e]);
      }
      const animationClip = new ThreeCore.AnimationClip(a, void 0, u);
      return w(animationClip, i), animationClip;
    });
  }
  createNodeMesh(e) {
    const json = this.json,
      n = this,
      r = json.nodes[e];
    return void 0 === r.mesh ? null : n.getDependency("mesh", r.mesh).then(function (e) {
      const t = n._getNodeRef(n.meshCache, r.mesh, e);
      return void 0 !== r.weights && t.traverse(function (e) {
        if (e.isMesh) for (let t = 0, n = r.weights.length; t < n; t++) e.morphTargetInfluences[t] = r.weights[t];
      }), t;
    });
  }
  loadNode(e) {
    const t = this,
      n = this.json.nodes[e],
      i = t._loadNodeShallow(e),
      a = [],
      s = n.children || [];
    for (let e = 0, n = s.length; e < n; e++) a.push(t.getDependency("node", s[e]));
    const o = void 0 === n.skin ? Promise.resolve(null) : t.getDependency("skin", n.skin);
    return Promise.all([i, Promise.all(a), o]).then(function (e) {
      const t = e[0],
        n = e[1],
        i = e[2];
      null !== i && t.traverse(function (e) {
        e.isSkinnedMesh && e.bind(i, matrix4);
      });
      for (let e = 0, r = n.length; e < r; e++) t.add(n[e]);
      if (void 0 !== t.userData.pivot && n.length > 0) {
        const e = t.userData.pivot,
          i = n[0];
        t.pivot = new ThreeCore.Vector3().fromArray(e), t.position.x -= e[0], t.position.y -= e[1], t.position.z -= e[2], i.position.set(0, 0, 0), delete t.userData.pivot;
      }
      return t;
    });
  }
  _loadNodeShallow(e) {
    const json = this.json,
      extensions = this.extensions,
      i = this;
    if (void 0 !== this.nodeCache[e]) return this.nodeCache[e];
    const a = json.nodes[e],
      s = a.name ? i.createUniqueName(a.name) : "",
      o = [],
      c = i._invokeOne(function (t) {
        return t.createNodeMesh && t.createNodeMesh(e);
      });
    return c && o.push(c), void 0 !== a.camera && o.push(i.getDependency("camera", a.camera).then(function (e) {
      return i._getNodeRef(i.cameraCache, a.camera, e);
    })), i._invokeAll(function (t) {
      return t.createNodeAttachment && t.createNodeAttachment(e);
    }).forEach(function (e) {
      o.push(e);
    }), this.nodeCache[e] = Promise.all(o).then(function (t) {
      let o;
      if (o = !0 === a.isBone ? new ThreeCore.Bone() : t.length > 1 ? new ThreeCore.Group() : 1 === t.length ? t[0] : new ThreeCore.Object3D(), o !== t[0]) for (let e = 0, n = t.length; e < n; e++) o.add(t[e]);
      if (a.name && (o.userData.name = a.name, o.name = s), w(o, a), a.extensions && S(extensions, o, a), void 0 !== a.matrix) {
        const e = new ThreeCore.Matrix4();
        e.fromArray(a.matrix), o.applyMatrix4(e);
      } else void 0 !== a.translation && o.position.fromArray(a.translation), void 0 !== a.rotation && o.quaternion.fromArray(a.rotation), void 0 !== a.scale && o.scale.fromArray(a.scale);
      if (i.associations.has(o)) {
        if (void 0 !== a.mesh && i.meshCache.refs[a.mesh] > 1) {
          const e = i.associations.get(o);
          i.associations.set(o, {
            ...e
          });
        }
      } else i.associations.set(o, {});
      return i.associations.get(o).nodes = e, o;
    }), this.nodeCache[e];
  }
  loadScene(e) {
    const extensions = this.extensions,
      n = this.json.scenes[e],
      i = this,
      group = new ThreeCore.Group();
    n.name && (group.name = i.createUniqueName(n.name)), w(group, n), n.extensions && S(extensions, group, n);
    const o = n.nodes || [],
      c = [];
    for (let e = 0, t = o.length; e < t; e++) c.push(i.getDependency("node", o[e]));
    return Promise.all(c).then(function (e) {
      for (let t = 0, n = e.length; t < n; t++) {
        const n = e[t];
        null !== n.parent ? group.add((0, clone.clone)(n)) : group.add(n);
      }
      return i.associations = (e => {
        const map = new Map();
        for (const [e, n] of i.associations) (e instanceof ThreeCore.Material || e instanceof ThreeCore.Texture) && map.set(e, n);
        return e.traverse(e => {
          const n = i.associations.get(e);
          null != n && map.set(e, n);
        }), map;
      })(group), group;
    });
  }
  _createAnimationTracks(e, t, n, i, a) {
    const s = [],
      o = e.name ? e.name : e.uuid,
      c = [];
    function l(e) {
      e.morphTargetInfluences && c.push(e.name ? e.name : e.uuid);
    }
    let u;
    switch (g[a.path] === g.weights ? (l(e), e.isGroup && e.children.forEach(l)) : c.push(o), g[a.path]) {
      case g.weights:
        u = ThreeCore.NumberKeyframeTrack;
        break;
      case g.rotation:
        u = ThreeCore.QuaternionKeyframeTrack;
        break;
      case g.translation:
      case g.scale:
        u = ThreeCore.VectorKeyframeTrack;
        break;
      default:
        if (1 === n.itemSize) u = ThreeCore.NumberKeyframeTrack;else u = ThreeCore.VectorKeyframeTrack;
    }
    const d = void 0 !== i.interpolation ? b[i.interpolation] : ThreeCore.InterpolateLinear,
      h = this._getArrayFromAccessor(n);
    for (let e = 0, n = c.length; e < n; e++) {
      const n = new u(c[e] + "." + g[a.path], t.array, h, d);
      "CUBICSPLINE" === i.interpolation && this._createCubicSplineTrackInterpolant(n), s.push(n);
    }
    return s;
  }
  _getArrayFromAccessor(e) {
    let t = e.array;
    if (e.normalized) {
      const e = z(t.constructor),
        float32Array = new Float32Array(t.length);
      for (let r = 0, i = t.length; r < i; r++) float32Array[r] = t[r] * e;
      t = float32Array;
    }
    return t;
  }
  _createCubicSplineTrackInterpolant(e) {
    e.createInterpolant = function (e) {
      return new (this instanceof ThreeCore.QuaternionKeyframeTrack ? GLTFCubicSplineQuaternionInterpolant : GLTFCubicSplineInterpolant)(this.times, this.values, this.getValueSize() / 3, e);
    }, e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
}
function B(e, t, n) {
  const i = t.attributes,
    a = [];
  function s(t, r) {
    return n.getDependency("accessor", t).then(function (t) {
      e.setAttribute(r, t);
    });
  }
  for (const t in i) {
    const n = A[t] || t.toLowerCase();
    n in e.attributes || a.push(s(i[t], n));
  }
  if (void 0 !== t.indices && !e.index) {
    const r = n.getDependency("accessor", t.indices).then(function (t) {
      e.setIndex(t);
    });
    a.push(r);
  }
  return ThreeCore.ColorManagement.workingColorSpace !== ThreeCore.LinearSRGBColorSpace && "COLOR_0" in i && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ThreeCore.ColorManagement.workingColorSpace}" not supported.`), w(e, t), function (e, t, n) {
    const i = t.attributes,
      box3 = new ThreeCore.Box3();
    if (void 0 === i.POSITION) return;
    {
      const e = n.json.accessors[i.POSITION],
        t = e.min,
        s = e.max;
      if (void 0 === t || void 0 === s) return void console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      if (box3.set(new ThreeCore.Vector3(t[0], t[1], t[2]), new ThreeCore.Vector3(s[0], s[1], s[2])), e.normalized) {
        const t = z(f[e.componentType]);
        box3.min.multiplyScalar(t), box3.max.multiplyScalar(t);
      }
    }
    const s = t.targets;
    if (void 0 !== s) {
      const vector3 = new ThreeCore.Vector3(),
        t = new ThreeCore.Vector3();
      for (let r = 0, i = s.length; r < i; r++) {
        const i = s[r];
        if (void 0 !== i.POSITION) {
          const r = n.json.accessors[i.POSITION],
            a = r.min,
            s = r.max;
          if (void 0 !== a && void 0 !== s) {
            if (t.setX(Math.max(Math.abs(a[0]), Math.abs(s[0]))), t.setY(Math.max(Math.abs(a[1]), Math.abs(s[1]))), t.setZ(Math.max(Math.abs(a[2]), Math.abs(s[2]))), r.normalized) {
              const e = z(f[r.componentType]);
              t.multiplyScalar(e);
            }
            vector3.max(t);
          } else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
        }
      }
      box3.expandByVector(vector3);
    }
    e.boundingBox = box3;
    const sphere = new ThreeCore.Sphere();
    box3.getCenter(sphere.center), sphere.radius = box3.min.distanceTo(box3.max) / 2, e.boundingSphere = sphere;
  }(e, t, n), Promise.all(a).then(function () {
    return void 0 !== t.targets ? function (e, t, n) {
      let r = !1,
        i = !1,
        a = !1;
      for (let e = 0, n = t.length; e < n; e++) {
        const n = t[e];
        if (void 0 !== n.POSITION && (r = !0), void 0 !== n.NORMAL && (i = !0), void 0 !== n.COLOR_0 && (a = !0), r && i && a) break;
      }
      if (!r && !i && !a) return Promise.resolve(e);
      const s = [],
        o = [],
        c = [];
      for (let l = 0, u = t.length; l < u; l++) {
        const u = t[l];
        if (r) {
          const t = void 0 !== u.POSITION ? n.getDependency("accessor", u.POSITION) : e.attributes.position;
          s.push(t);
        }
        if (i) {
          const t = void 0 !== u.NORMAL ? n.getDependency("accessor", u.NORMAL) : e.attributes.normal;
          o.push(t);
        }
        if (a) {
          const t = void 0 !== u.COLOR_0 ? n.getDependency("accessor", u.COLOR_0) : e.attributes.color;
          c.push(t);
        }
      }
      return Promise.all([Promise.all(s), Promise.all(o), Promise.all(c)]).then(function (t) {
        const n = t[0],
          s = t[1],
          o = t[2];
        return r && (e.morphAttributes.position = n), i && (e.morphAttributes.normal = s), a && (e.morphAttributes.color = o), e.morphTargetsRelative = !0, e;
      });
    }(e, t.targets, n) : e;
  });
}
export { GLTFLoader };
