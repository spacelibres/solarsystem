// Recovered from vendors.js:792719-811296.
// Upstream correspondence: Three.js r185 examples/jsm/loaders/KTX2Loader.js; see docs/eyes-analysis/three-renderer-next.md.
import * as ThreeCore from "../three/core.js";
import * as WorkerPool from "./WorkerPool.js";
import * as Ci from "./Ci.js";
import * as ZSTDDecoder from "./ZSTDDecoder.js";
import * as DisplayP3ColorSpace from "./DisplayP3ColorSpace.js";
import Unidentified78 from "./Unidentified78.cjs";
import Unidentified79 from "./Unidentified79.cjs";
const c = new URL(Unidentified78, document.baseURI).toString(),
  l = new URL(Unidentified79, document.baseURI).toString(),
  weakMap = new WeakMap();
let d,
  h = 0;
class KTX2Loader extends ThreeCore.Loader {
  constructor(manager) {
    super(manager), this.transcoderPath = "", this.transcoderBinary = null, this.transcoderPending = null, this.workerPool = new WorkerPool.WorkerPool(), this.workerSourceURL = "", this.workerConfig = null, "undefined" != typeof MSC_TRANSCODER && console.warn('THREE.KTX2Loader: Please update to latest "basis_transcoder". "msc_basis_transcoder" is no longer supported in three.js r125+.');
  }
  setTranscoderPath(path) {
    return this.transcoderPath = path, this;
  }
  setWorkerLimit(workerLimit) {
    return this.workerPool.setWorkerLimit(workerLimit), this;
  }
  async detectSupportAsync(renderer) {
    return console.warn('KTX2Loader: "detectSupportAsync()" has been deprecated. Use "detectSupport()" and "await renderer.init();" when creating the renderer.'), await renderer.init(), this.detectSupport(renderer);
  }
  detectSupport(renderer) {
    return !0 === renderer.isWebGPURenderer ? this.workerConfig = {
      astcSupported: renderer.hasFeature("texture-compression-astc"),
      astcHDRSupported: !1,
      etc1Supported: renderer.hasFeature("texture-compression-etc1"),
      etc2Supported: renderer.hasFeature("texture-compression-etc2"),
      dxtSupported: renderer.hasFeature("texture-compression-s3tc"),
      bptcSupported: renderer.hasFeature("texture-compression-bc"),
      pvrtcSupported: renderer.hasFeature("texture-compression-pvrtc")
    } : (this.workerConfig = {
      astcSupported: renderer.extensions.has("WEBGL_compressed_texture_astc"),
      astcHDRSupported: renderer.extensions.has("WEBGL_compressed_texture_astc") && renderer.extensions.get("WEBGL_compressed_texture_astc").getSupportedProfiles().includes("hdr"),
      etc1Supported: renderer.extensions.has("WEBGL_compressed_texture_etc1"),
      etc2Supported: renderer.extensions.has("WEBGL_compressed_texture_etc"),
      dxtSupported: renderer.extensions.has("WEBGL_compressed_texture_s3tc"),
      bptcSupported: renderer.extensions.has("EXT_texture_compression_bptc"),
      pvrtcSupported: renderer.extensions.has("WEBGL_compressed_texture_pvrtc") || renderer.extensions.has("WEBKIT_WEBGL_compressed_texture_pvrtc")
    }, "undefined" != typeof navigator && void 0 !== navigator.platform && void 0 !== navigator.userAgent && navigator.platform.indexOf("Linux") >= 0 && navigator.userAgent.indexOf("Android") < 0 && this.workerConfig.astcSupported && this.workerConfig.etc2Supported && this.workerConfig.bptcSupported && this.workerConfig.dxtSupported && (this.workerConfig.astcSupported = !1, this.workerConfig.etc1Supported = !1, this.workerConfig.etc2Supported = !1)), this;
  }
  init() {
    if (!this.transcoderPending) {
      const fileLoader = new ThreeCore.FileLoader(this.manager);
      fileLoader.setWithCredentials(this.withCredentials);
      const t = new ThreeCore.FileLoader(this.manager);
      let n, i;
      t.setWithCredentials(this.withCredentials), t.setResponseType("arraybuffer"), "" === this.transcoderPath ? (n = fileLoader.loadAsync(l), i = t.loadAsync(c)) : (fileLoader.setPath(this.transcoderPath), n = fileLoader.loadAsync("basis_transcoder.js"), t.setPath(this.transcoderPath), i = t.loadAsync("basis_transcoder.wasm")), this.transcoderPending = Promise.all([n, i]).then(([e, transcoderBinary]) => {
        const n = KTX2Loader.BasisWorker.toString(),
          r = ["/* constants */", "let _EngineFormat = " + JSON.stringify(KTX2Loader.EngineFormat), "let _EngineType = " + JSON.stringify(KTX2Loader.EngineType), "let _TranscoderFormat = " + JSON.stringify(KTX2Loader.TranscoderFormat), "let _BasisFormat = " + JSON.stringify(KTX2Loader.BasisFormat), "/* basis_transcoder.js */", e, "/* worker */", n.substring(n.indexOf("{") + 1, n.lastIndexOf("}"))].join("\n");
        this.workerSourceURL = URL.createObjectURL(new Blob([r])), this.transcoderBinary = transcoderBinary, this.workerPool.setWorkerCreator(() => {
          const worker = new Worker(this.workerSourceURL),
            t = this.transcoderBinary.slice(0);
          return worker.postMessage({
            type: "init",
            config: this.workerConfig,
            transcoderBinary: t
          }, [t]), worker;
        });
      }), h > 0 && console.warn("THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances."), h++;
    }
    return this.transcoderPending;
  }
  load(url, onLoad, onProgress, onError) {
    if (null === this.workerConfig) throw new Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");
    const fileLoader = new ThreeCore.FileLoader(this.manager);
    fileLoader.setPath(this.path), fileLoader.setCrossOrigin(this.crossOrigin), fileLoader.setWithCredentials(this.withCredentials), fileLoader.setRequestHeader(this.requestHeader), fileLoader.setResponseType("arraybuffer"), fileLoader.load(url, e => {
      this.parse(e, onLoad, onError);
    }, onProgress, onError);
  }
  parse(buffer, onLoad, onError) {
    if (null === this.workerConfig) throw new Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");
    if (weakMap.has(buffer)) {
      return weakMap.get(buffer).promise.then(onLoad).catch(onError);
    }
    this._createTexture(buffer).then(e => onLoad ? onLoad(e) : null).catch(onError);
  }
  _createTextureFrom(transcodeResult, container) {
    const {
      type: type,
      error: error,
      data: {
        faces: faces,
        width: width,
        height: height,
        format: format,
        type: u,
        dfdFlags: dfdFlags
      }
    } = transcodeResult;
    if ("error" === type) return Promise.reject(error);
    let h;
    if (6 === container.faceCount) h = new ThreeCore.CompressedCubeTexture(faces, format, u);else {
      const e = faces[0].mipmaps;
      h = container.layerCount > 1 ? new ThreeCore.CompressedArrayTexture(e, width, height, container.layerCount, format, u) : new ThreeCore.CompressedTexture(e, width, height, format, u);
    }
    return h.minFilter = 1 === faces[0].mipmaps.length ? ThreeCore.LinearFilter : ThreeCore.LinearMipmapLinearFilter, h.magFilter = ThreeCore.LinearFilter, h.generateMipmaps = !1, h.needsUpdate = !0, h.colorSpace = parseColorSpace(container), h.premultiplyAlpha = !!(dfdFlags & Ci.KHR_DF_FLAG_ALPHA_PREMULTIPLIED), h;
  }
  async _createTexture(buffer, t = {}) {
    const n = (0, Ci.read)(new Uint8Array(buffer)),
      i = n.vkFormat === Ci.VK_FORMAT_ASTC_4x4_SFLOAT_BLOCK_EXT && 167 === n.dataFormatDescriptor[0].colorModel;
    if (!(n.vkFormat === Ci.VK_FORMAT_UNDEFINED || i && !this.workerConfig.astcHDRSupported)) return async function (e) {
      const {
        vkFormat: vkFormat
      } = e;
      if (void 0 === m[vkFormat]) throw new Error("THREE.KTX2Loader: Unsupported vkFormat: " + vkFormat);
      void 0 === M[vkFormat] && console.warn('THREE.KTX2Loader: Missing ".type" for vkFormat: ' + vkFormat);
      let n;
      e.supercompressionScheme === Ci.KHR_SUPERCOMPRESSION_ZSTD && (d || (d = new Promise(async e => {
        const zSTDDecoder = new ZSTDDecoder.ZSTDDecoder();
        await zSTDDecoder.init(), e(zSTDDecoder);
      })), n = await d);
      const i = [];
      for (let s = 0; s < e.levels.length; s++) {
        const o = Math.max(1, e.pixelWidth >> s),
          c = Math.max(1, e.pixelHeight >> s),
          l = e.pixelDepth ? Math.max(1, e.pixelDepth >> s) : 0,
          u = e.levels[s];
        let d, h;
        if (e.supercompressionScheme === Ci.KHR_SUPERCOMPRESSION_NONE) d = u.levelData;else {
          if (e.supercompressionScheme !== Ci.KHR_SUPERCOMPRESSION_ZSTD) throw new Error("THREE.KTX2Loader: Unsupported supercompressionScheme.");
          d = n.decode(u.levelData, u.uncompressedByteLength);
        }
        h = M[vkFormat] === ThreeCore.FloatType ? new Float32Array(d.buffer, d.byteOffset, d.byteLength / Float32Array.BYTES_PER_ELEMENT) : M[vkFormat] === ThreeCore.HalfFloatType || M[vkFormat] === ThreeCore.UnsignedShortType ? new Uint16Array(d.buffer, d.byteOffset, d.byteLength / Uint16Array.BYTES_PER_ELEMENT) : M[vkFormat] === ThreeCore.UnsignedInt5999Type || M[vkFormat] === ThreeCore.UnsignedInt101111Type ? new Uint32Array(d.buffer, d.byteOffset, d.byteLength / Uint32Array.BYTES_PER_ELEMENT) : d, i.push({
          data: h,
          width: o,
          height: c,
          depth: l
        });
      }
      const o = 0 === e.levelCount || i.length > 1;
      let c;
      if (set.has(m[vkFormat])) c = 0 === e.pixelDepth ? new ThreeCore.DataTexture(i[0].data, e.pixelWidth, e.pixelHeight) : new ThreeCore.Data3DTexture(i[0].data, e.pixelWidth, e.pixelHeight, e.pixelDepth), c.minFilter = o ? ThreeCore.NearestMipmapNearestFilter : ThreeCore.NearestFilter, c.magFilter = ThreeCore.NearestFilter, c.generateMipmaps = 0 === e.levelCount, c.normalized = f.has(vkFormat);else {
        if (e.pixelDepth > 0) throw new Error("THREE.KTX2Loader: Unsupported pixelDepth.");
        c = new ThreeCore.CompressedTexture(i, e.pixelWidth, e.pixelHeight), c.minFilter = o ? ThreeCore.LinearMipmapLinearFilter : ThreeCore.LinearFilter, c.magFilter = ThreeCore.LinearFilter;
      }
      return c.mipmaps = i, c.type = M[vkFormat], c.format = m[vkFormat], c.colorSpace = parseColorSpace(e), c.needsUpdate = !0, Promise.resolve(c);
    }(n);
    const o = t,
      c = this.init().then(() => this.workerPool.postMessage({
        type: "transcode",
        buffer: buffer,
        taskConfig: o
      }, [buffer])).then(e => this._createTextureFrom(e.data, n));
    return weakMap.set(buffer, {
      promise: c
    }), c;
  }
  dispose() {
    this.workerPool.dispose(), this.workerSourceURL && URL.revokeObjectURL(this.workerSourceURL), h--;
  }
}
KTX2Loader.BasisFormat = {
  ETC1S: 0,
  UASTC: 1,
  UASTC_HDR: 2
}, KTX2Loader.TranscoderFormat = {
  ETC1: 0,
  ETC2: 1,
  BC1: 2,
  BC3: 3,
  BC4: 4,
  BC5: 5,
  BC7_M6_OPAQUE_ONLY: 6,
  BC7_M5: 7,
  PVRTC1_4_RGB: 8,
  PVRTC1_4_RGBA: 9,
  ASTC_4x4: 10,
  ATC_RGB: 11,
  ATC_RGBA_INTERPOLATED_ALPHA: 12,
  RGBA32: 13,
  RGB565: 14,
  BGR565: 15,
  RGBA4444: 16,
  BC6H: 22,
  RGB_HALF: 24,
  RGBA_HALF: 25
}, KTX2Loader.EngineFormat = {
  RGBAFormat: ThreeCore.RGBAFormat,
  RGBA_ASTC_4x4_Format: ThreeCore.RGBA_ASTC_4x4_Format,
  RGB_BPTC_UNSIGNED_Format: ThreeCore.RGB_BPTC_UNSIGNED_Format,
  RGBA_BPTC_Format: ThreeCore.RGBA_BPTC_Format,
  RGBA_ETC2_EAC_Format: ThreeCore.RGBA_ETC2_EAC_Format,
  RGBA_PVRTC_4BPPV1_Format: ThreeCore.RGBA_PVRTC_4BPPV1_Format,
  RGBA_S3TC_DXT5_Format: ThreeCore.RGBA_S3TC_DXT5_Format,
  RGB_ETC1_Format: ThreeCore.RGB_ETC1_Format,
  RGB_ETC2_Format: ThreeCore.RGB_ETC2_Format,
  RGB_PVRTC_4BPPV1_Format: ThreeCore.RGB_PVRTC_4BPPV1_Format,
  RGBA_S3TC_DXT1_Format: ThreeCore.RGBA_S3TC_DXT1_Format
}, KTX2Loader.EngineType = {
  UnsignedByteType: ThreeCore.UnsignedByteType,
  HalfFloatType: ThreeCore.HalfFloatType,
  FloatType: ThreeCore.FloatType
}, KTX2Loader.BasisWorker = function () {
  let e, t, n;
  const r = _EngineFormat,
    i = _EngineType,
    a = _TranscoderFormat,
    s = _BasisFormat;
  self.addEventListener("message", function (r) {
    const a = r.data;
    switch (a.type) {
      case "init":
        e = a.config, o = a.transcoderBinary, t = new Promise(e => {
          n = {
            wasmBinary: o,
            onRuntimeInitialized: e
          }, BASIS(n);
        }).then(() => {
          n.initializeBasis(), void 0 === n.KTX2File && console.warn("THREE.KTX2Loader: Please update Basis Universal transcoder.");
        });
        break;
      case "transcode":
        t.then(() => {
          try {
            const {
              faces: faces,
              buffers: buffers,
              width: width,
              height: height,
              hasAlpha: hasAlpha,
              format: format,
              type: type,
              dfdFlags: dfdFlags
            } = function (t) {
              const kTX2File = new n.KTX2File(new Uint8Array(t));
              function a() {
                kTX2File.close(), kTX2File.delete();
              }
              if (!kTX2File.isValid()) throw a(), new Error("THREE.KTX2Loader:\tInvalid or unsupported .ktx2 file");
              let o;
              if (kTX2File.isUASTC()) o = s.UASTC;else if (kTX2File.isETC1S()) o = s.ETC1S;else {
                if (!kTX2File.isHDR()) throw new Error("THREE.KTX2Loader: Unknown Basis encoding");
                o = s.UASTC_HDR;
              }
              const d = kTX2File.getWidth(),
                h = kTX2File.getHeight(),
                p = kTX2File.getLayers() || 1,
                f = kTX2File.getLevels(),
                m = kTX2File.getFaces(),
                M = kTX2File.getHasAlpha(),
                _ = kTX2File.getDFDFlags(),
                {
                  transcoderFormat: transcoderFormat,
                  engineFormat: engineFormat,
                  engineType: engineType
                } = function (t, n, r, i) {
                  const a = c[t];
                  for (let s = 0; s < a.length; s++) {
                    const o = a[s];
                    if (o.if && !e[o.if]) continue;
                    if (!o.basisFormat.includes(t)) continue;
                    if (i && o.transcoderFormat.length < 2) continue;
                    if (o.needsPowerOfTwo && (!l(n) || !l(r))) continue;
                    return {
                      transcoderFormat: o.transcoderFormat[i ? 1 : 0],
                      engineFormat: o.engineFormat[i ? 1 : 0],
                      engineType: o.engineType[0]
                    };
                  }
                  throw new Error("THREE.KTX2Loader: Failed to identify transcoding target.");
                }(o, d, h, M);
              if (!d || !h || !f) throw a(), new Error("THREE.KTX2Loader:\tInvalid texture");
              if (!kTX2File.startTranscoding()) throw a(), new Error("THREE.KTX2Loader: .startTranscoding failed");
              const y = [],
                L = [];
              for (let e = 0; e < m; e++) {
                const t = [];
                for (let n = 0; n < f; n++) {
                  const s = [];
                  let o, c;
                  for (let t = 0; t < p; t++) {
                    const l = kTX2File.getImageLevelInfo(n, t, e);
                    0 !== e || 0 !== n || 0 !== t || l.origWidth % 4 == 0 && l.origHeight % 4 == 0 || console.warn("THREE.KTX2Loader: ETC1S and UASTC textures should use multiple-of-four dimensions."), f > 1 ? (o = l.origWidth, c = l.origHeight) : (o = l.width, c = l.height);
                    let uint8Array = new Uint8Array(kTX2File.getImageTranscodedSizeInBytes(n, t, 0, transcoderFormat));
                    const d = kTX2File.transcodeImage(uint8Array, n, t, e, transcoderFormat, 0, -1, -1);
                    if (engineType === i.HalfFloatType && (uint8Array = new Uint16Array(uint8Array.buffer, uint8Array.byteOffset, uint8Array.byteLength / Uint16Array.BYTES_PER_ELEMENT)), !d) throw a(), new Error("THREE.KTX2Loader: .transcodeImage failed.");
                    s.push(uint8Array);
                  }
                  const l = u(s);
                  t.push({
                    data: l,
                    width: o,
                    height: c
                  }), L.push(l.buffer);
                }
                y.push({
                  mipmaps: t,
                  width: d,
                  height: h,
                  format: engineFormat,
                  type: engineType
                });
              }
              return a(), {
                faces: y,
                buffers: L,
                width: d,
                height: h,
                hasAlpha: M,
                dfdFlags: _,
                format: engineFormat,
                type: engineType
              };
            }(a.buffer);
            self.postMessage({
              type: "transcode",
              id: a.id,
              data: {
                faces: faces,
                width: width,
                height: height,
                hasAlpha: hasAlpha,
                format: format,
                type: type,
                dfdFlags: dfdFlags
              }
            }, buffers);
          } catch (e) {
            console.error(e), self.postMessage({
              type: "error",
              id: a.id,
              error: e.message
            });
          }
        });
    }
    var o;
  });
  const o = [{
      if: "astcSupported",
      basisFormat: [s.UASTC],
      transcoderFormat: [a.ASTC_4x4, a.ASTC_4x4],
      engineFormat: [r.RGBA_ASTC_4x4_Format, r.RGBA_ASTC_4x4_Format],
      engineType: [i.UnsignedByteType],
      priorityETC1S: 1 / 0,
      priorityUASTC: 1,
      needsPowerOfTwo: !1
    }, {
      if: "bptcSupported",
      basisFormat: [s.ETC1S, s.UASTC],
      transcoderFormat: [a.BC7_M5, a.BC7_M5],
      engineFormat: [r.RGBA_BPTC_Format, r.RGBA_BPTC_Format],
      engineType: [i.UnsignedByteType],
      priorityETC1S: 3,
      priorityUASTC: 2,
      needsPowerOfTwo: !1
    }, {
      if: "dxtSupported",
      basisFormat: [s.ETC1S, s.UASTC],
      transcoderFormat: [a.BC1, a.BC3],
      engineFormat: [r.RGBA_S3TC_DXT1_Format, r.RGBA_S3TC_DXT5_Format],
      engineType: [i.UnsignedByteType],
      priorityETC1S: 4,
      priorityUASTC: 5,
      needsPowerOfTwo: !1
    }, {
      if: "etc2Supported",
      basisFormat: [s.ETC1S, s.UASTC],
      transcoderFormat: [a.ETC1, a.ETC2],
      engineFormat: [r.RGB_ETC2_Format, r.RGBA_ETC2_EAC_Format],
      engineType: [i.UnsignedByteType],
      priorityETC1S: 1,
      priorityUASTC: 3,
      needsPowerOfTwo: !1
    }, {
      if: "etc1Supported",
      basisFormat: [s.ETC1S, s.UASTC],
      transcoderFormat: [a.ETC1],
      engineFormat: [r.RGB_ETC1_Format],
      engineType: [i.UnsignedByteType],
      priorityETC1S: 2,
      priorityUASTC: 4,
      needsPowerOfTwo: !1
    }, {
      if: "pvrtcSupported",
      basisFormat: [s.ETC1S, s.UASTC],
      transcoderFormat: [a.PVRTC1_4_RGB, a.PVRTC1_4_RGBA],
      engineFormat: [r.RGB_PVRTC_4BPPV1_Format, r.RGBA_PVRTC_4BPPV1_Format],
      engineType: [i.UnsignedByteType],
      priorityETC1S: 5,
      priorityUASTC: 6,
      needsPowerOfTwo: !0
    }, {
      if: "bptcSupported",
      basisFormat: [s.UASTC_HDR],
      transcoderFormat: [a.BC6H],
      engineFormat: [r.RGB_BPTC_UNSIGNED_Format],
      engineType: [i.HalfFloatType],
      priorityHDR: 1,
      needsPowerOfTwo: !1
    }, {
      basisFormat: [s.ETC1S, s.UASTC],
      transcoderFormat: [a.RGBA32, a.RGBA32],
      engineFormat: [r.RGBAFormat, r.RGBAFormat],
      engineType: [i.UnsignedByteType, i.UnsignedByteType],
      priorityETC1S: 100,
      priorityUASTC: 100,
      needsPowerOfTwo: !1
    }, {
      basisFormat: [s.UASTC_HDR],
      transcoderFormat: [a.RGBA_HALF],
      engineFormat: [r.RGBAFormat],
      engineType: [i.HalfFloatType],
      priorityHDR: 100,
      needsPowerOfTwo: !1
    }],
    c = {
      [s.ETC1S]: o.filter(e => e.basisFormat.includes(s.ETC1S)).sort((e, t) => e.priorityETC1S - t.priorityETC1S),
      [s.UASTC]: o.filter(e => e.basisFormat.includes(s.UASTC)).sort((e, t) => e.priorityUASTC - t.priorityUASTC),
      [s.UASTC_HDR]: o.filter(e => e.basisFormat.includes(s.UASTC_HDR)).sort((e, t) => e.priorityHDR - t.priorityHDR)
    };
  function l(e) {
    return e <= 2 || !(e & e - 1) && 0 !== e;
  }
  function u(e) {
    if (1 === e.length) return e[0];
    let t = 0;
    for (let n = 0; n < e.length; n++) {
      t += e[n].byteLength;
    }
    const uint8Array = new Uint8Array(t);
    let r = 0;
    for (let t = 0; t < e.length; t++) {
      const i = e[t];
      uint8Array.set(i, r), r += i.byteLength;
    }
    return uint8Array;
  }
};
const set = new Set([ThreeCore.RGBAFormat, ThreeCore.RGBFormat, ThreeCore.RGFormat, ThreeCore.RedFormat]),
  f = new Set([Ci.VK_FORMAT_R16G16B16A16_UNORM]),
  m = {
    [Ci.VK_FORMAT_R32G32B32A32_SFLOAT]: ThreeCore.RGBAFormat,
    [Ci.VK_FORMAT_R32G32_SFLOAT]: ThreeCore.RGFormat,
    [Ci.VK_FORMAT_R32_SFLOAT]: ThreeCore.RedFormat,
    [Ci.VK_FORMAT_R16G16B16A16_SFLOAT]: ThreeCore.RGBAFormat,
    [Ci.VK_FORMAT_R16G16_SFLOAT]: ThreeCore.RGFormat,
    [Ci.VK_FORMAT_R16_SFLOAT]: ThreeCore.RedFormat,
    [Ci.VK_FORMAT_R16G16B16A16_UNORM]: ThreeCore.RGBAFormat,
    [Ci.VK_FORMAT_R8G8B8A8_SRGB]: ThreeCore.RGBAFormat,
    [Ci.VK_FORMAT_R8G8B8A8_UNORM]: ThreeCore.RGBAFormat,
    [Ci.VK_FORMAT_R8G8_SRGB]: ThreeCore.RGFormat,
    [Ci.VK_FORMAT_R8G8_UNORM]: ThreeCore.RGFormat,
    [Ci.VK_FORMAT_R8_SRGB]: ThreeCore.RedFormat,
    [Ci.VK_FORMAT_R8_UNORM]: ThreeCore.RedFormat,
    [Ci.VK_FORMAT_E5B9G9R9_UFLOAT_PACK32]: ThreeCore.RGBFormat,
    [Ci.VK_FORMAT_B10G11R11_UFLOAT_PACK32]: ThreeCore.RGBFormat,
    [Ci.VK_FORMAT_ETC2_R8G8B8A8_SRGB_BLOCK]: ThreeCore.RGBA_ETC2_EAC_Format,
    [Ci.VK_FORMAT_ETC2_R8G8B8_SRGB_BLOCK]: ThreeCore.RGB_ETC2_Format,
    [Ci.VK_FORMAT_EAC_R11_UNORM_BLOCK]: ThreeCore.R11_EAC_Format,
    [Ci.VK_FORMAT_EAC_R11_SNORM_BLOCK]: ThreeCore.SIGNED_R11_EAC_Format,
    [Ci.VK_FORMAT_EAC_R11G11_UNORM_BLOCK]: ThreeCore.RG11_EAC_Format,
    [Ci.VK_FORMAT_EAC_R11G11_SNORM_BLOCK]: ThreeCore.SIGNED_RG11_EAC_Format,
    [Ci.VK_FORMAT_ASTC_4x4_SFLOAT_BLOCK_EXT]: ThreeCore.RGBA_ASTC_4x4_Format,
    [Ci.VK_FORMAT_ASTC_4x4_SRGB_BLOCK]: ThreeCore.RGBA_ASTC_4x4_Format,
    [Ci.VK_FORMAT_ASTC_4x4_UNORM_BLOCK]: ThreeCore.RGBA_ASTC_4x4_Format,
    [Ci.VK_FORMAT_ASTC_6x6_SFLOAT_BLOCK_EXT]: ThreeCore.RGBA_ASTC_6x6_Format,
    [Ci.VK_FORMAT_ASTC_6x6_SRGB_BLOCK]: ThreeCore.RGBA_ASTC_6x6_Format,
    [Ci.VK_FORMAT_ASTC_6x6_UNORM_BLOCK]: ThreeCore.RGBA_ASTC_6x6_Format,
    [Ci.VK_FORMAT_BC1_RGBA_SRGB_BLOCK]: ThreeCore.RGBA_S3TC_DXT1_Format,
    [Ci.VK_FORMAT_BC1_RGBA_UNORM_BLOCK]: ThreeCore.RGBA_S3TC_DXT1_Format,
    [Ci.VK_FORMAT_BC1_RGB_SRGB_BLOCK]: ThreeCore.RGB_S3TC_DXT1_Format,
    [Ci.VK_FORMAT_BC1_RGB_UNORM_BLOCK]: ThreeCore.RGB_S3TC_DXT1_Format,
    [Ci.VK_FORMAT_BC3_SRGB_BLOCK]: ThreeCore.RGBA_S3TC_DXT5_Format,
    [Ci.VK_FORMAT_BC3_UNORM_BLOCK]: ThreeCore.RGBA_S3TC_DXT5_Format,
    [Ci.VK_FORMAT_BC4_SNORM_BLOCK]: ThreeCore.SIGNED_RED_RGTC1_Format,
    [Ci.VK_FORMAT_BC4_UNORM_BLOCK]: ThreeCore.RED_RGTC1_Format,
    [Ci.VK_FORMAT_BC5_SNORM_BLOCK]: ThreeCore.SIGNED_RED_GREEN_RGTC2_Format,
    [Ci.VK_FORMAT_BC5_UNORM_BLOCK]: ThreeCore.RED_GREEN_RGTC2_Format,
    [Ci.VK_FORMAT_BC7_SRGB_BLOCK]: ThreeCore.RGBA_BPTC_Format,
    [Ci.VK_FORMAT_BC7_UNORM_BLOCK]: ThreeCore.RGBA_BPTC_Format,
    [Ci.VK_FORMAT_PVRTC1_4BPP_SRGB_BLOCK_IMG]: ThreeCore.RGBA_PVRTC_4BPPV1_Format,
    [Ci.VK_FORMAT_PVRTC1_4BPP_UNORM_BLOCK_IMG]: ThreeCore.RGBA_PVRTC_4BPPV1_Format,
    [Ci.VK_FORMAT_PVRTC1_2BPP_SRGB_BLOCK_IMG]: ThreeCore.RGBA_PVRTC_2BPPV1_Format,
    [Ci.VK_FORMAT_PVRTC1_2BPP_UNORM_BLOCK_IMG]: ThreeCore.RGBA_PVRTC_2BPPV1_Format
  },
  M = {
    [Ci.VK_FORMAT_R32G32B32A32_SFLOAT]: ThreeCore.FloatType,
    [Ci.VK_FORMAT_R32G32_SFLOAT]: ThreeCore.FloatType,
    [Ci.VK_FORMAT_R32_SFLOAT]: ThreeCore.FloatType,
    [Ci.VK_FORMAT_R16G16B16A16_SFLOAT]: ThreeCore.HalfFloatType,
    [Ci.VK_FORMAT_R16G16_SFLOAT]: ThreeCore.HalfFloatType,
    [Ci.VK_FORMAT_R16_SFLOAT]: ThreeCore.HalfFloatType,
    [Ci.VK_FORMAT_R16G16B16A16_UNORM]: ThreeCore.UnsignedShortType,
    [Ci.VK_FORMAT_R8G8B8A8_SRGB]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_R8G8B8A8_UNORM]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_R8G8_SRGB]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_R8G8_UNORM]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_R8_SRGB]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_R8_UNORM]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_E5B9G9R9_UFLOAT_PACK32]: ThreeCore.UnsignedInt5999Type,
    [Ci.VK_FORMAT_B10G11R11_UFLOAT_PACK32]: ThreeCore.UnsignedInt101111Type,
    [Ci.VK_FORMAT_ETC2_R8G8B8A8_SRGB_BLOCK]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_ETC2_R8G8B8_SRGB_BLOCK]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_EAC_R11_UNORM_BLOCK]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_EAC_R11_SNORM_BLOCK]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_EAC_R11G11_UNORM_BLOCK]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_EAC_R11G11_SNORM_BLOCK]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_ASTC_4x4_SFLOAT_BLOCK_EXT]: ThreeCore.HalfFloatType,
    [Ci.VK_FORMAT_ASTC_4x4_SRGB_BLOCK]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_ASTC_4x4_UNORM_BLOCK]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_ASTC_6x6_SFLOAT_BLOCK_EXT]: ThreeCore.HalfFloatType,
    [Ci.VK_FORMAT_ASTC_6x6_SRGB_BLOCK]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_ASTC_6x6_UNORM_BLOCK]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_BC1_RGBA_SRGB_BLOCK]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_BC1_RGBA_UNORM_BLOCK]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_BC1_RGB_SRGB_BLOCK]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_BC1_RGB_UNORM_BLOCK]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_BC3_SRGB_BLOCK]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_BC3_UNORM_BLOCK]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_BC4_SNORM_BLOCK]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_BC4_UNORM_BLOCK]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_BC5_SNORM_BLOCK]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_BC5_UNORM_BLOCK]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_BC7_SRGB_BLOCK]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_BC7_UNORM_BLOCK]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_PVRTC1_4BPP_SRGB_BLOCK_IMG]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_PVRTC1_4BPP_UNORM_BLOCK_IMG]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_PVRTC1_2BPP_SRGB_BLOCK_IMG]: ThreeCore.UnsignedByteType,
    [Ci.VK_FORMAT_PVRTC1_2BPP_UNORM_BLOCK_IMG]: ThreeCore.UnsignedByteType
  };
function parseColorSpace(container) {
  const t = container.dataFormatDescriptor[0];
  return t.colorPrimaries === Ci.KHR_DF_PRIMARIES_BT709 ? t.transferFunction === Ci.KHR_DF_TRANSFER_SRGB ? ThreeCore.SRGBColorSpace : ThreeCore.LinearSRGBColorSpace : t.colorPrimaries === Ci.KHR_DF_PRIMARIES_DISPLAYP3 ? t.transferFunction === Ci.KHR_DF_TRANSFER_SRGB ? DisplayP3ColorSpace.DisplayP3ColorSpace : DisplayP3ColorSpace.LinearDisplayP3ColorSpace : (t.colorPrimaries === Ci.KHR_DF_PRIMARIES_UNSPECIFIED || console.warn(`THREE.KTX2Loader: Unsupported color primaries, "${t.colorPrimaries}"`), ThreeCore.NoColorSpace);
}
export { KTX2Loader };
