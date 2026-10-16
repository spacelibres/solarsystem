// Recovered from vendors.js:976080-983485.
// Upstream correspondence: Three.js r185 examples/jsm/loaders/DRACOLoader.js; see docs/eyes-analysis/three-renderer-next.md.
import * as ThreeCore from "../three/core.js";
import Unidentified112 from "./Unidentified112.cjs";
import Unidentified113 from "./Unidentified113.cjs";
import Unidentified114 from "./Unidentified114.cjs";
import Unidentified115 from "./Unidentified115.cjs";
import Unidentified116 from "./Unidentified116.cjs";
const weakMap = new WeakMap(),
  a = new URL(Unidentified112, document.baseURI).toString(),
  s = new URL(Unidentified113, document.baseURI).toString(),
  o = new URL(Unidentified114, document.baseURI).toString(),
  DRACO_GLTF_CONFIG = {
    js: new URL(Unidentified115, document.baseURI).toString(),
    wasm: new URL(Unidentified116, document.baseURI).toString()
  };
class DRACOLoader extends ThreeCore.Loader {
  constructor(manager) {
    super(manager), this.decoderPaths = {
      js: s,
      wasm: a,
      dep_js: o
    }, this.decoderConfig = {}, this.decoderBinary = null, this.decoderPending = null, this.workerLimit = 4, this.workerPool = [], this.workerNextTaskID = 1, this.workerSourceURL = "", this.defaultAttributeIDs = {
      position: "POSITION",
      normal: "NORMAL",
      color: "COLOR",
      uv: "TEX_COORD"
    }, this.defaultAttributeTypes = {
      position: "Float32Array",
      normal: "Float32Array",
      color: "Float32Array",
      uv: "Float32Array"
    };
  }
  setDecoderPath(path) {
    const {
      decoderPaths: decoderPaths
    } = this;
    return "object" == typeof path ? (decoderPaths.js = path.js, decoderPaths.wasm = path.wasm, decoderPaths.dep_js = null) : (decoderPaths.js = ThreeCore.LoaderUtils.resolveURL("draco_wasm_wrapper.js", path), decoderPaths.wasm = ThreeCore.LoaderUtils.resolveURL("draco_decoder.wasm", path), decoderPaths.dep_js = ThreeCore.LoaderUtils.resolveURL("draco_decoder.js", path)), this;
  }
  setDecoderConfig(config) {
    return console.warn("THREE.DRACOLoader: setDecoderConfig to has been deprecated and will be removed in r194."), this.decoderConfig = config, this;
  }
  setWorkerLimit(workerLimit) {
    return this.workerLimit = workerLimit, this;
  }
  load(url, onLoad, onProgress, onError) {
    const fileLoader = new ThreeCore.FileLoader(this.manager);
    fileLoader.setPath(this.path), fileLoader.setResponseType("arraybuffer"), fileLoader.setRequestHeader(this.requestHeader), fileLoader.setWithCredentials(this.withCredentials), fileLoader.load(url, e => {
      this.parse(e, onLoad, onError);
    }, onProgress, onError);
  }
  parse(buffer, onLoad, n = () => {}) {
    this.decodeDracoFile(buffer, onLoad, null, null, ThreeCore.SRGBColorSpace, n).catch(n);
  }
  decodeDracoFile(buffer, callback, attributeIDs, attributeTypes, a = ThreeCore.LinearSRGBColorSpace, s = () => {}) {
    const o = {
      attributeIDs: attributeIDs || this.defaultAttributeIDs,
      attributeTypes: attributeTypes || this.defaultAttributeTypes,
      useUniqueIDs: !!attributeIDs,
      vertexColorSpace: a
    };
    return this.decodeGeometry(buffer, o).then(callback).catch(s);
  }
  decodeGeometry(buffer, taskConfig) {
    const n = JSON.stringify(taskConfig);
    if (weakMap.has(buffer)) {
      const t = weakMap.get(buffer);
      if (t.key === n) return t.promise;
      if (0 === buffer.byteLength) throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.");
    }
    let r;
    const a = this.workerNextTaskID++,
      s = buffer.byteLength,
      o = this._getWorker(a, s).then(n => (r = n, new Promise((n, i) => {
        r._callbacks[a] = {
          resolve: n,
          reject: i
        }, r.postMessage({
          type: "decode",
          id: a,
          taskConfig: taskConfig,
          buffer: buffer
        }, [buffer]);
      }))).then(e => this._createGeometry(e.geometry));
    return o.catch(() => !0).then(() => {
      r && a && this._releaseTask(r, a);
    }), weakMap.set(buffer, {
      key: n,
      promise: o
    }), o;
  }
  _createGeometry(geometryData) {
    const bufferGeometry = new ThreeCore.BufferGeometry();
    geometryData.index && bufferGeometry.setIndex(new ThreeCore.BufferAttribute(geometryData.index.array, 1));
    for (let n = 0; n < geometryData.attributes.length; n++) {
      const {
        name: name,
        array: array,
        itemSize: itemSize,
        stride: stride,
        vertexColorSpace: vertexColorSpace
      } = geometryData.attributes[n];
      let l;
      if (itemSize === stride) l = new ThreeCore.BufferAttribute(array, itemSize);else {
        const interleavedBuffer = new ThreeCore.InterleavedBuffer(array, stride);
        l = new ThreeCore.InterleavedBufferAttribute(interleavedBuffer, itemSize, 0);
      }
      "color" === name && (this._assignVertexColorSpace(l, vertexColorSpace), l.normalized = array instanceof Float32Array == !1), bufferGeometry.setAttribute(name, l);
    }
    return bufferGeometry;
  }
  _assignVertexColorSpace(attribute, inputColorSpace) {
    if (inputColorSpace !== ThreeCore.SRGBColorSpace) return;
    const color = new ThreeCore.Color();
    for (let t = 0, i = attribute.count; t < i; t++) color.fromBufferAttribute(attribute, t), ThreeCore.ColorManagement.colorSpaceToWorking(color, ThreeCore.SRGBColorSpace), attribute.setXYZ(t, color.r, color.g, color.b);
  }
  _loadLibrary(url, responseType) {
    const fileLoader = new ThreeCore.FileLoader(this.manager);
    return fileLoader.setResponseType(responseType), fileLoader.setWithCredentials(this.withCredentials), new Promise((t, r) => {
      fileLoader.load(url, t, void 0, r);
    });
  }
  preload() {
    return this._initDecoder(), this;
  }
  _initDecoder() {
    if (this.decoderPending) return this.decoderPending;
    const e = "object" != typeof WebAssembly || "js" === this.decoderConfig.type,
      t = [],
      {
        decoderPaths: decoderPaths
      } = this;
    if (e) {
      if (null === decoderPaths.dep_js) throw new Error("THREE.DRACOLoader: WebAssembly is required when using a custom decoder paths.");
      t.push(this._loadLibrary(decoderPaths.dep_js, "text"));
    } else t.push(this._loadLibrary(decoderPaths.js, "text")), t.push(this._loadLibrary(decoderPaths.wasm, "arraybuffer"));
    return this.decoderPending = Promise.all(t).then(t => {
      const n = t[0];
      e || (this.decoderConfig.wasmBinary = t[1]);
      const r = DRACOWorker.toString(),
        i = ["/* draco decoder */", n, "", "/* worker */", r.substring(r.indexOf("{") + 1, r.lastIndexOf("}"))].join("\n");
      this.workerSourceURL = URL.createObjectURL(new Blob([i]));
    }), this.decoderPending;
  }
  _getWorker(taskID, taskCost) {
    return this._initDecoder().then(() => {
      if (this.workerPool.length < this.workerLimit) {
        const worker = new Worker(this.workerSourceURL);
        worker._callbacks = {}, worker._taskCosts = {}, worker._taskLoad = 0, worker.postMessage({
          type: "init",
          decoderConfig: this.decoderConfig
        }), worker.onmessage = function (t) {
          const n = t.data;
          switch (n.type) {
            case "decode":
              worker._callbacks[n.id].resolve(n);
              break;
            case "error":
              worker._callbacks[n.id].reject(n);
              break;
            default:
              console.error('THREE.DRACOLoader: Unexpected message, "' + n.type + '"');
          }
        }, this.workerPool.push(worker);
      } else this.workerPool.sort(function (e, t) {
        return e._taskLoad > t._taskLoad ? -1 : 1;
      });
      const n = this.workerPool[this.workerPool.length - 1];
      return n._taskCosts[taskID] = taskCost, n._taskLoad += taskCost, n;
    });
  }
  _releaseTask(worker, taskID) {
    worker._taskLoad -= worker._taskCosts[taskID], delete worker._callbacks[taskID], delete worker._taskCosts[taskID];
  }
  debug() {
    console.log("Task load: ", this.workerPool.map(e => e._taskLoad));
  }
  dispose() {
    for (let e = 0; e < this.workerPool.length; ++e) this.workerPool[e].terminate();
    return this.workerPool.length = 0, "" !== this.workerSourceURL && URL.revokeObjectURL(this.workerSourceURL), this;
  }
}
function DRACOWorker() {
  let e, t;
  function n(e, t, n, r, i, a) {
    const s = n.num_points(),
      o = a.num_components(),
      c = function (e, t) {
        switch (t) {
          case Float32Array:
            return e.DT_FLOAT32;
          case Int8Array:
            return e.DT_INT8;
          case Int16Array:
            return e.DT_INT16;
          case Int32Array:
            return e.DT_INT32;
          case Uint8Array:
            return e.DT_UINT8;
          case Uint16Array:
            return e.DT_UINT16;
          case Uint32Array:
            return e.DT_UINT32;
        }
      }(e, i),
      l = o * i.BYTES_PER_ELEMENT,
      u = 4 * Math.ceil(l / 4),
      d = u / i.BYTES_PER_ELEMENT,
      h = s * l,
      p = s * u,
      f = e._malloc(h);
    t.GetAttributeDataArrayForAllPoints(n, a, c, h, f);
    const m = new i(e.HEAPF32.buffer, f, h / i.BYTES_PER_ELEMENT);
    let M;
    if (l === u) M = m.slice();else {
      M = new i(p / i.BYTES_PER_ELEMENT);
      let e = 0;
      for (let t = 0, n = m.length; t < n; t++) {
        for (let n = 0; n < o; n++) M[e + n] = m[t * o + n];
        e += d;
      }
    }
    return e._free(f), {
      name: r,
      count: s,
      itemSize: o,
      array: M,
      stride: d
    };
  }
  onmessage = function (r) {
    const i = r.data;
    switch (i.type) {
      case "init":
        e = i.decoderConfig, t = new Promise(function (t) {
          e.onModuleLoaded = function (e) {
            t({
              draco: e
            });
          }, DracoDecoderModule(e);
        });
        break;
      case "decode":
        const r = i.buffer,
          a = i.taskConfig;
        t.then(e => {
          const t = e.draco,
            decoder = new t.Decoder();
          try {
            const e = function (e, t, r, i) {
                const a = i.attributeIDs,
                  s = i.attributeTypes;
                let o, c;
                const l = t.GetEncodedGeometryType(r);
                if (l === e.TRIANGULAR_MESH) o = new e.Mesh(), c = t.DecodeArrayToMesh(r, r.byteLength, o);else {
                  if (l !== e.POINT_CLOUD) throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
                  o = new e.PointCloud(), c = t.DecodeArrayToPointCloud(r, r.byteLength, o);
                }
                if (!c.ok() || 0 === o.ptr) throw new Error("THREE.DRACOLoader: Decoding failed: " + c.error_msg());
                const u = {
                  index: null,
                  attributes: []
                };
                for (const r in a) {
                  const c = self[s[r]];
                  let l, d;
                  if (i.useUniqueIDs) d = a[r], l = t.GetAttributeByUniqueId(o, d);else {
                    if (d = t.GetAttributeId(o, e[a[r]]), -1 === d) continue;
                    l = t.GetAttribute(o, d);
                  }
                  const h = n(e, t, o, r, c, l);
                  "color" === r && (h.vertexColorSpace = i.vertexColorSpace), u.attributes.push(h);
                }
                l === e.TRIANGULAR_MESH && (u.index = function (e, t, n) {
                  const r = n.num_faces(),
                    i = 3 * r,
                    a = 4 * i,
                    s = e._malloc(a);
                  t.GetTrianglesUInt32Array(n, a, s);
                  const o = new Uint32Array(e.HEAPF32.buffer, s, i).slice();
                  return e._free(s), {
                    array: o,
                    itemSize: 1
                  };
                }(e, t, o));
                return e.destroy(o), u;
              }(t, decoder, new Int8Array(r), a),
              o = e.attributes.map(e => e.array.buffer);
            e.index && o.push(e.index.array.buffer), self.postMessage({
              type: "decode",
              id: i.id,
              geometry: e
            }, o);
          } catch (e) {
            console.error(e), self.postMessage({
              type: "error",
              id: i.id,
              error: e.message
            });
          } finally {
            t.destroy(decoder);
          }
        });
    }
  };
}
export { DRACOLoader };
export { DRACO_GLTF_CONFIG };
