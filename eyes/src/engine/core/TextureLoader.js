// 下载器只负责取得内容；这里根据视频、位图或 KTX2 内容建立纹理。返回值的销毁由调用方或 ResourceManager 管理，纯色模板只返回 clone。
import { localDecoderUrl } from '../../runtime/decoder-paths.js';
// Recovered from app.js:231271-234398.
import * as PioneerPublicApi from "../pioneer/public-api.js";
import * as KTX2Loader from "../../vendor/modules/KTX2Loader.js";
class TextureLoader {
  constructor(engine) {
    this._engine = engine;
    this._white = TextureLoader._newTexture(new PioneerPublicApi.Color(1, 1, 1, 1));
    this._black = TextureLoader._newTexture(new PioneerPublicApi.Color(0, 0, 0, 1));
    this._clear = TextureLoader._newTexture(new PioneerPublicApi.Color(0, 0, 0, 0));
    this._pink = TextureLoader._newTexture(new PioneerPublicApi.Color(1, 0, 192 / 255, 1));
    this._gray = TextureLoader._newTexture(new PioneerPublicApi.Color(.4, .4, .4, 1));
  }
  // 立方图只接管各面 image；临时二维纹理包装在取出 image 后即可 dispose。
  async loadCubeTexture(urlTemplate, priority, options) {
    const cubeTexture = new PioneerPublicApi.THREE.CubeTexture();
    const faceImages = cubeTexture.images;
    const faceRequests = [];
    for (let faceIndex = 0; faceIndex < 6; faceIndex++) {
      const faceUrl = urlTemplate.replace("$FACE", TextureLoader._cubeFaceNames[faceIndex]);
      faceRequests.push(this.loadTexture(faceUrl, priority, options).then(faceTexture => {
        faceImages[faceIndex] = faceTexture.image;
        faceTexture.dispose();
      }));
    }
    await Promise.all(faceRequests);
    cubeTexture.needsUpdate = true;
    return cubeTexture;
  }
  generateEnvMap(sourceTexture) {
    let environmentTexture = sourceTexture;
    if (!(sourceTexture instanceof PioneerPublicApi.THREE.CubeTexture)) {
      const renderTargetOptions = {
        depthBuffer: false,
        stencilBuffer: false,
        generateMipmaps: true,
        minFilter: PioneerPublicApi.THREE.LinearMipMapLinearFilter,
        magFilter: PioneerPublicApi.THREE.LinearFilter
      };
      environmentTexture = new PioneerPublicApi.THREE.WebGLCubeRenderTarget(512, renderTargetOptions).fromEquirectangularTexture(this._engine.__getThreeJsRenderer(), sourceTexture).texture;
    }
    const pMREMGenerator = new PioneerPublicApi.THREE.PMREMGenerator(this._engine.__getThreeJsRenderer());
    pMREMGenerator.compileEquirectangularShader();
    return pMREMGenerator.fromEquirectangular(environmentTexture).texture;
  }
  cancel(url) {
    this._engine.getDownloader().cancel(url);
  }
  updatePriority(url, priority) {
    this._engine.getDownloader().updatePriority(url, priority);
  }
  // 扩展名提示用于映射到 blob 等无后缀 URL 的依赖；实际解码分支仍按返回内容类型判定。
  async loadTexture(url, priority, options) {
    if ("white" === url) return this._white.clone();
    if ("black" === url) return this._black.clone();
    if ("clear" === url) return this._clear.clone();
    if ("pink" === url) return this._pink.clone();
    if ("gray" === url) return this._gray.clone();
    let extension;
    if (void 0 === options?.extension || "string" != typeof options.extension) {
      const extensionIndex = url.lastIndexOf(".");
      extension = -1 !== extensionIndex ? url.substring(extensionIndex + 1) : "";
    } else extension = options.extension;
    let downloadType = "imageBitmap";
    if ("mp4" === extension || "webm" === extension) {
      downloadType = "video";
    } else {
      if ("ktx2" === extension) {
        downloadType = "binary";
      }
    }
    const download = await this._engine.getDownloader().download(url, downloadType, priority);
    let texture;
    if (download.content instanceof HTMLVideoElement) {
      texture = new PioneerPublicApi.THREE.VideoTexture(download.content);
      texture.flipY = false;
    } else if (download.content instanceof ImageBitmap) {
      texture = new PioneerPublicApi.THREE.CanvasTexture(download.content);
      const useMipMaps = false !== options?.useMipMaps;
      texture.minFilter = useMipMaps ? PioneerPublicApi.THREE.LinearMipMapLinearFilter : PioneerPublicApi.THREE.LinearFilter;
      texture.generateMipmaps = useMipMaps;
    } else {
      const ktx2Loader = this.getKTX2Loader();
      if (!ktx2Loader) throw new Error(`While loading ${url}, the KTX2 loader is not loaded.`);
      texture = await ktx2Loader._createTexture(download.content);
    }
    return texture;
  }
  // 解码器为静态共享实例，首次创建时固定路径和当前渲染器的压缩纹理支持能力。
  getKTX2Loader() {
    if (!TextureLoader._ktx2Loader && false !== this._engine.getConfig().getValue("ktx2")) {
      TextureLoader._ktx2Loader = new KTX2Loader.KTX2Loader();
      const configuredPath = this._engine.getConfig().getValue("ktx2Path");
      const transcoderPath = this._engine.getDownloader().processUrl("string" == typeof configuredPath ? configuredPath : localDecoderUrl("ktx2/"));
      TextureLoader._ktx2Loader.setTranscoderPath(transcoderPath);
      TextureLoader._ktx2Loader.detectSupport(this._engine.__getThreeJsRenderer());
    }
    return TextureLoader._ktx2Loader;
  }
  static _newTexture(color) {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not get 2D context.");
    context.fillStyle = `rgba(${255 * color.r},${255 * color.g},${255 * color.b},${255 * color.a})`;
    context.fillRect(0, 0, 1, 1);
    return new PioneerPublicApi.THREE.CanvasTexture(canvas);
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
