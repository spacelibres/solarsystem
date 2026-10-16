/** @eyes-analysis
 * 文件职责：DRACOLoader 对应资源的请求、解析与缓存协作
 * 依据：// Recovered from vendors.js:976080-983485.；exports: DRACOLoader, DRACO_GLTF_CONFIG
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:976080-983485.
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
/** @eyes-analysis
 * 类职责：DRACOLoader 对应资源的请求、解析与缓存协作
 * 继承：ThreeCore.Loader；导出：DRACOLoader。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class DRACOLoader extends ThreeCore.Loader {
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 状态写入：decoderBinary、decoderConfig、decoderPaths、decoderPending、defaultAttributeIDs、defaultAttributeTypes、workerLimit、workerNextTaskID等；完整记录见索引。
   * 调用线索：super。
   */
  constructor(e) {
    super(e), this.decoderPaths = {
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
  /** @eyes-analysis
   * 源码方法 setDecoderPath；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：ThreeCore.LoaderUtils.resolveURL。
   */
  setDecoderPath(e) {
    const {
      decoderPaths: decoderPaths
    } = this;
    return "object" == typeof e ? (decoderPaths.js = e.js, decoderPaths.wasm = e.wasm, decoderPaths.dep_js = null) : (decoderPaths.js = ThreeCore.LoaderUtils.resolveURL("draco_wasm_wrapper.js", e), decoderPaths.wasm = ThreeCore.LoaderUtils.resolveURL("draco_decoder.wasm", e), decoderPaths.dep_js = ThreeCore.LoaderUtils.resolveURL("draco_decoder.js", e)), this;
  }
  /** @eyes-analysis
   * 源码方法 setDecoderConfig；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 状态写入：decoderConfig。
   * 调用线索：console.warn。
   */
  setDecoderConfig(decoderConfig) {
    return console.warn("THREE.DRACOLoader: setDecoderConfig to has been deprecated and will be removed in r194."), this.decoderConfig = decoderConfig, this;
  }
  /** @eyes-analysis
   * 源码方法 setWorkerLimit；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 状态写入：workerLimit。
   */
  setWorkerLimit(workerLimit) {
    return this.workerLimit = workerLimit, this;
  }
  /** @eyes-analysis
   * 发起异步资源获取并交给解析路径；管理加载器回调和错误传播
   * 调用线索：fileLoader.load、fileLoader.setPath、fileLoader.setRequestHeader、fileLoader.setResponseType、fileLoader.setWithCredentials等。
   */
  load(e, t, n, i) {
    const fileLoader = new ThreeCore.FileLoader(this.manager);
    fileLoader.setPath(this.path), fileLoader.setResponseType("arraybuffer"), fileLoader.setRequestHeader(this.requestHeader), fileLoader.setWithCredentials(this.withCredentials), fileLoader.load(e, e => {
      this.parse(e, t, i);
    }, n, i);
  }
  /** @eyes-analysis
   * 把资源字节/JSON转为运行时对象；依赖解析、缓存和错误回调
   * 调用线索：this.decodeDracoFile、this.decodeDracoFile(e,t,null,null,ThreeCore.SRGBColorSpace,n).catch。
   */
  parse(e, t, n = () => {}) {
    this.decodeDracoFile(e, t, null, null, ThreeCore.SRGBColorSpace, n).catch(n);
  }
  /** @eyes-analysis
   * 源码方法 decodeDracoFile；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：this.decodeGeometry、this.decodeGeometry(e,o).then、this.decodeGeometry(e,o).then(t).catch。
   */
  decodeDracoFile(e, t, n, i, a = ThreeCore.LinearSRGBColorSpace, s = () => {}) {
    const o = {
      attributeIDs: n || this.defaultAttributeIDs,
      attributeTypes: i || this.defaultAttributeTypes,
      useUniqueIDs: !!n,
      vertexColorSpace: a
    };
    return this.decodeGeometry(e, o).then(t).catch(s);
  }
  /** @eyes-analysis
   * 源码方法 decodeGeometry；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 状态写入：workerNextTaskID。
   * 调用线索：JSON.stringify、new Error、new Promise、o.catch、o.catch(()=>!0).then等。
   */
  decodeGeometry(e, t) {
    const n = JSON.stringify(t);
    if (weakMap.has(e)) {
      const t = weakMap.get(e);
      if (t.key === n) return t.promise;
      if (0 === e.byteLength) throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.");
    }
    let r;
    const a = this.workerNextTaskID++,
      s = e.byteLength,
      o = this._getWorker(a, s).then(n => (r = n, new Promise((n, i) => {
        r._callbacks[a] = {
          resolve: n,
          reject: i
        }, r.postMessage({
          type: "decode",
          id: a,
          taskConfig: t,
          buffer: e
        }, [e]);
      }))).then(e => this._createGeometry(e.geometry));
    return o.catch(() => !0).then(() => {
      r && a && this._releaseTask(r, a);
    }), weakMap.set(e, {
      key: n,
      promise: o
    }), o;
  }
  /** @eyes-analysis
   * 源码方法 _createGeometry；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：bufferGeometry.setAttribute、bufferGeometry.setIndex、new ThreeCore.BufferAttribute、new ThreeCore.BufferGeometry、new ThreeCore.InterleavedBuffer等。
   */
  _createGeometry(e) {
    const bufferGeometry = new ThreeCore.BufferGeometry();
    e.index && bufferGeometry.setIndex(new ThreeCore.BufferAttribute(e.index.array, 1));
    for (let n = 0; n < e.attributes.length; n++) {
      const {
        name: name,
        array: array,
        itemSize: itemSize,
        stride: stride,
        vertexColorSpace: vertexColorSpace
      } = e.attributes[n];
      let l;
      if (itemSize === stride) l = new ThreeCore.BufferAttribute(array, itemSize);else {
        const interleavedBuffer = new ThreeCore.InterleavedBuffer(array, stride);
        l = new ThreeCore.InterleavedBufferAttribute(interleavedBuffer, itemSize, 0);
      }
      "color" === name && (this._assignVertexColorSpace(l, vertexColorSpace), l.normalized = array instanceof Float32Array == !1), bufferGeometry.setAttribute(name, l);
    }
    return bufferGeometry;
  }
  /** @eyes-analysis
   * 源码方法 _assignVertexColorSpace；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：ThreeCore.ColorManagement.colorSpaceToWorking、color.fromBufferAttribute、e.setXYZ、new ThreeCore.Color。
   */
  _assignVertexColorSpace(e, t) {
    if (t !== ThreeCore.SRGBColorSpace) return;
    const color = new ThreeCore.Color();
    for (let t = 0, i = e.count; t < i; t++) color.fromBufferAttribute(e, t), ThreeCore.ColorManagement.colorSpaceToWorking(color, ThreeCore.SRGBColorSpace), e.setXYZ(t, color.r, color.g, color.b);
  }
  /** @eyes-analysis
   * 源码方法 _loadLibrary；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：fileLoader.load、fileLoader.setResponseType、fileLoader.setWithCredentials、new Promise、new ThreeCore.FileLoader。
   */
  _loadLibrary(e, t) {
    const fileLoader = new ThreeCore.FileLoader(this.manager);
    return fileLoader.setResponseType(t), fileLoader.setWithCredentials(this.withCredentials), new Promise((t, r) => {
      fileLoader.load(e, t, void 0, r);
    });
  }
  /** @eyes-analysis
   * 源码方法 preload；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：this._initDecoder。
   */
  preload() {
    return this._initDecoder(), this;
  }
  /** @eyes-analysis
   * 源码方法 _initDecoder；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 状态写入：decoderConfig.wasmBinary、decoderPending、workerSourceURL。
   * 调用线索：Promise.all、Promise.all(t).then、URL.createObjectURL、["/* draco decoder * /",n,"","/* worker * /",r.substring(r.indexOf("{")+1,r.lastIndexOf("}"))].join、l.toString等。
   */
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
      const r = l.toString(),
        i = ["/* draco decoder */", n, "", "/* worker */", r.substring(r.indexOf("{") + 1, r.lastIndexOf("}"))].join("\n");
      this.workerSourceURL = URL.createObjectURL(new Blob([i]));
    }), this.decoderPending;
  }
  /** @eyes-analysis
   * 源码方法 _getWorker；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：console.error、new Worker、this._initDecoder、this._initDecoder().then、this.workerPool.push等。
   */
  _getWorker(e, t) {
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
      return n._taskCosts[e] = t, n._taskLoad += t, n;
    });
  }
  /** @eyes-analysis
   * 源码方法 _releaseTask；作用以类职责与源码实现为准，未猜测压缩参数含义
   */
  _releaseTask(e, t) {
    e._taskLoad -= e._taskCosts[t], delete e._callbacks[t], delete e._taskCosts[t];
  }
  /** @eyes-analysis
   * 源码方法 debug；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：console.log、this.workerPool.map。
   */
  debug() {
    console.log("Task load: ", this.workerPool.map(e => e._taskLoad));
  }
  /** @eyes-analysis
   * 发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用
   * 状态写入：workerPool.length。
   * 调用线索：URL.revokeObjectURL、this.workerPool[e].terminate。
   */
  dispose() {
    for (let e = 0; e < this.workerPool.length; ++e) this.workerPool[e].terminate();
    return this.workerPool.length = 0, "" !== this.workerSourceURL && URL.revokeObjectURL(this.workerSourceURL), this;
  }
}
function l() {
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
