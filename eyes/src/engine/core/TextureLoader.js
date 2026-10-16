/** @eyes-analysis
 * 文件职责：将图像位图、视频与 KTX2 二进制转成 Three.js 纹理，提供纯色占位纹理、立方图和环境预滤波。
 * 依据：import ../../runtime/decoder-paths.js；import ../pioneer/public-api.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
import { localDecoderUrl } from '../../runtime/decoder-paths.js';
// Recovered from app.js:231271-234398.
import * as PioneerPublicApi from "../pioneer/public-api.js";
import * as KTX2Loader from "../../vendor/modules/KTX2Loader.js";
/** @eyes-analysis
 * 类职责：将图像位图、视频与 KTX2 二进制转成 Three.js 纹理，提供纯色占位纹理、立方图和环境预滤波。
 * 继承：无显式父类；导出：TextureLoader。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class TextureLoader {
  /** @eyes-analysis
   * 【结构证据】写入 `_black`、`_clear`、`_engine`、`_gray`、`_pink`、`_white`；调用 `TextureLoader._newTexture`、`new PioneerPublicApi.Color`。
   * 状态写入：_black、_clear、_engine、_gray、_pink、_white。
   * 调用线索：TextureLoader._newTexture、new PioneerPublicApi.Color。
   */
  constructor(engine) {
    this._engine = engine;
    this._white = TextureLoader._newTexture(new PioneerPublicApi.Color(1, 1, 1, 1));
    this._black = TextureLoader._newTexture(new PioneerPublicApi.Color(0, 0, 0, 1));
    this._clear = TextureLoader._newTexture(new PioneerPublicApi.Color(0, 0, 0, 0));
    this._pink = TextureLoader._newTexture(new PioneerPublicApi.Color(1, 0, 192 / 255, 1));
    this._gray = TextureLoader._newTexture(new PioneerPublicApi.Color(.4, .4, .4, 1));
  }
  /** @eyes-analysis
   * 【结构证据】返回 `cubeTexture`；调用 `Promise.all`、`new PioneerPublicApi.THREE.CubeTexture`、`r.push`、`t.dispose`、`t.replace`、`this.loadTexture`。
   * 调用线索：Promise.all、new PioneerPublicApi.THREE.CubeTexture、r.push、t.dispose、t.replace等。
   */
  async loadCubeTexture(t, e, i) {
    const cubeTexture = new PioneerPublicApi.THREE.CubeTexture();
    const o = cubeTexture.images;
    const r = [];
    for (let s = 0; s < 6; s++) {
      const n = t.replace("$FACE", TextureLoader._cubeFaceNames[s]);
      r.push(this.loadTexture(n, e, i).then(t => {
        o[s] = t.image;
        t.dispose();
      }));
    }
    await Promise.all(r);
    cubeTexture.needsUpdate = true;
    return cubeTexture;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `pMREMGenerator.fromEquirectangular(e).texture`；调用 `new PioneerPublicApi.THREE.PMREMGenerator`、`new PioneerPublicApi.THREE.WebGLCubeRenderTarget`、`new PioneerPublicApi.THREE.WebGLCubeRenderTarget(512,i).fromEquirectangularTexture`、`pMREMGenerator.compileEquirectangularShader`、`pMREMGenerator.fromEquirectangular`、`this._engine.__getThreeJsRenderer`。
   * 调用线索：new PioneerPublicApi.THREE.PMREMGenerator、new PioneerPublicApi.THREE.WebGLCubeRenderTarget、new PioneerPublicApi.THREE.WebGLCubeRenderTarget(512,i).fromEquirectangularTexture、pMREMGenerator.compileEquirectangularShader、pMREMGenerator.fromEquirectangular等。
   */
  generateEnvMap(t) {
    let e = t;
    if (!(t instanceof PioneerPublicApi.THREE.CubeTexture)) {
      const i = {
        depthBuffer: false,
        stencilBuffer: false,
        generateMipmaps: true,
        minFilter: PioneerPublicApi.THREE.LinearMipMapLinearFilter,
        magFilter: PioneerPublicApi.THREE.LinearFilter
      };
      e = new PioneerPublicApi.THREE.WebGLCubeRenderTarget(512, i).fromEquirectangularTexture(this._engine.__getThreeJsRenderer(), t).texture;
    }
    const pMREMGenerator = new PioneerPublicApi.THREE.PMREMGenerator(this._engine.__getThreeJsRenderer());
    pMREMGenerator.compileEquirectangularShader();
    return pMREMGenerator.fromEquirectangular(e).texture;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._engine.getDownloader`、`this._engine.getDownloader().cancel`。
   * 调用线索：this._engine.getDownloader、this._engine.getDownloader().cancel。
   */
  cancel(t) {
    this._engine.getDownloader().cancel(t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._engine.getDownloader`、`this._engine.getDownloader().updatePriority`。
   * 调用线索：this._engine.getDownloader、this._engine.getDownloader().updatePriority。
   */
  updatePriority(t, e) {
    this._engine.getDownloader().updatePriority(t, e);
  }
  /** @eyes-analysis
   * 纯色关键字返回占位纹理 clone；mp4/webm 下载 video，ktx2 下载 binary，其他下载 imageBitmap；依内容建立 VideoTexture、CanvasTexture 或 KTX2 _createTexture。
   * 调用线索：e._createTexture、new Error、new PioneerPublicApi.THREE.CanvasTexture、new PioneerPublicApi.THREE.VideoTexture、t.lastIndexOf等。
   */
  async loadTexture(t, e, i) {
    if ("white" === t) return this._white.clone();
    if ("black" === t) return this._black.clone();
    if ("clear" === t) return this._clear.clone();
    if ("pink" === t) return this._pink.clone();
    if ("gray" === t) return this._gray.clone();
    let n;
    if (void 0 === i?.extension || "string" != typeof i.extension) {
      const e = t.lastIndexOf(".");
      n = -1 !== e ? t.substring(e + 1) : "";
    } else n = i.extension;
    let o = "imageBitmap";
    "mp4" === n || "webm" === n ? o = "video" : "ktx2" === n && (o = "binary");
    const r = await this._engine.getDownloader().download(t, o, e);
    let a;
    if (r.content instanceof HTMLVideoElement) {
      a = new PioneerPublicApi.THREE.VideoTexture(r.content);
      a.flipY = false;
    } else if (r.content instanceof ImageBitmap) {
      a = new PioneerPublicApi.THREE.CanvasTexture(r.content);
      const t = false !== i?.useMipMaps;
      a.minFilter = t ? PioneerPublicApi.THREE.LinearMipMapLinearFilter : PioneerPublicApi.THREE.LinearFilter;
      a.generateMipmaps = t;
    } else {
      const e = this.getKTX2Loader();
      if (!e) throw new Error(`While loading ${t}, the KTX2 loader is not loaded.`);
      a = await e._createTexture(r.content);
    }
    return a;
  }
  /** @eyes-analysis
   * 按需创建静态共享 KTX2Loader，使用配置路径或 localDecoderUrl(ktx2/)，经 processUrl 处理并以当前渲染器 detectSupport。
   * 调用线索：TextureLoader._ktx2Loader.detectSupport、TextureLoader._ktx2Loader.setTranscoderPath、localDecoderUrl、new KTX2Loader.KTX2Loader、this._engine.__getThreeJsRenderer等。
   */
  getKTX2Loader() {
    if (!TextureLoader._ktx2Loader && false !== this._engine.getConfig().getValue("ktx2")) {
      TextureLoader._ktx2Loader = new KTX2Loader.KTX2Loader();
      const t = this._engine.getConfig().getValue("ktx2Path");
      const e = this._engine.getDownloader().processUrl("string" == typeof t ? t : localDecoderUrl("ktx2/"));
      TextureLoader._ktx2Loader.setTranscoderPath(e);
      TextureLoader._ktx2Loader.detectSupport(this._engine.__getThreeJsRenderer());
    }
    return TextureLoader._ktx2Loader;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `new PioneerPublicApi.THREE.CanvasTexture(e)`；调用 `document.createElement`、`e.getContext`、`i.fillRect`、`new Error`、`new PioneerPublicApi.THREE.CanvasTexture`；含显式错误分支。
   * 调用线索：document.createElement、e.getContext、i.fillRect、new Error、new PioneerPublicApi.THREE.CanvasTexture。
   */
  static _newTexture(t) {
    const e = document.createElement("canvas");
    e.width = 1;
    e.height = 1;
    const i = e.getContext("2d");
    if (!i) throw new Error("Could not get 2D context.");
    i.fillStyle = `rgba(${255 * t.r},${255 * t.g},${255 * t.b},${255 * t.a})`;
    i.fillRect(0, 0, 1, 1);
    return new PioneerPublicApi.THREE.CanvasTexture(e);
  }
  _engine;
  _white;
  _black;
  _clear;
  _pink;
  _gray;
  static _ktx2Loader;
  static _cubeFaceNames = ["posx", "negx", "posy", "negy", "posz", "negz"];
}
export { TextureLoader };
