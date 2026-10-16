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
  cancel(t) {
    this._engine.getDownloader().cancel(t);
  }
  updatePriority(t, e) {
    this._engine.getDownloader().updatePriority(t, e);
  }
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
  getKTX2Loader() {
    if (!TextureLoader._ktx2Loader && false !== this._engine.getConfig().getValue("ktx2")) {
      TextureLoader._ktx2Loader = new KTX2Loader.KTX2Loader();
      const t = this._engine.getConfig().getValue("ktx2Path");
      const e = this._engine.getDownloader().processUrl("string" == typeof t ? t : "$STATIC_ASSETS_URL/wasm/ktx2/");
      TextureLoader._ktx2Loader.setTranscoderPath(e);
      TextureLoader._ktx2Loader.detectSupport(this._engine.__getThreeJsRenderer());
    }
    return TextureLoader._ktx2Loader;
  }
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
