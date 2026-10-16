// 每帧按屏幕半径选取纹理尺寸。新请求成功之前保留旧 uniform，交接时才释放旧资源；失去 uniform 或禁用后到达的结果立即释放。
// Recovered from app.js:147998-151411.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class TextureLOD {
  constructor(component) {
    this._engine = component.getEntity().getScene().getEngine();
    this._component = component;
    this._uniform = null;
    this._url = "";
    this._sizes = [];
    this._currentSize = NaN;
    this._forcedSize = void 0;
    this._loadState = {
      state: "unloaded"
    };
    this._enabled = true;
  }
  setEnabled(enabled) {
    if (this._enabled && !enabled && this._uniform?.value) {
      this._component.getEngine().getResourceManager().release(this._component, this._uniform.value, "texture");
      this._uniform.value = null;
    }
    this._enabled = enabled;
  }
  getUrl() {
    return this._url;
  }
  setUrl(url) {
    if (this._url !== url) {
      this._url = url;
      this._loadState = {
        state: "unloaded"
      };
      this._currentSize = NaN;
    }
  }
  getUniform() {
    return this._uniform;
  }
  setUniform(uniform) {
    if (this._uniform !== uniform) {
      if (this._uniform?.value) {
        this._component.getEngine().getResourceManager().release(this._component, this._uniform.value, "texture");
        this._uniform.value = null;
      }
      this._uniform = uniform;
      this._loadState = {
        state: "unloaded"
      };
      this._currentSize = NaN;
    }
  }
  getSizes() {
    return this._sizes.slice();
  }
  setSizes(sizes) {
    if (this._sizes.length !== sizes.length || this._sizes.map((size, sizeIndex) => size !== sizes[sizeIndex]).reduce((hasDifference, isDifferent) => hasDifference || isDifferent, false)) {
      this._sizes = [...sizes];
      this._loadState = {
        state: "unloaded"
      };
      this._currentSize = NaN;
    }
  }
  getCurrentSize() {
    return this._currentSize;
  }
  getForcedSize() {
    return this._forcedSize;
  }
  setForcedSize(forcedSize) {
    this._forcedSize = forcedSize;
  }
  async getLoadedPromise(timeout = Number.POSITIVE_INFINITY) {
    await (0, PioneerPublicApi.waitUntil)(() => {
      if ("loaded" === this._loadState.state) return true;
      if ("failed" === this._loadState.state) throw new Error(this._loadState.error);
      return false;
    }, .25, timeout);
  }
  update() {
    if (!this._enabled || null === this._uniform) return;
    if ("" === this._url || 0 === this._sizes.length || "unloaded" === this._component.getLoadState().state && void 0 === this._forcedSize) {
      if (this._uniform.value) {
        this._component.getEngine().getResourceManager().release(this._component, this._uniform.value, "texture");
        this._uniform.value = null;
        this._currentSize = NaN;
      }
      return;
    }
    let targetSize;
    targetSize = void 0 !== this._forcedSize ? this._forcedSize : this._component.getEntity().getGreatestPixelSpaceExtentsRadius();
    let selectedIndex = 0;
    for (let sizeIndex = 0, sizeCount = this._sizes.length; sizeIndex < sizeCount; sizeIndex++) {
      const size = this._sizes[sizeIndex];
      if (sizeIndex === sizeCount - 1) {
        selectedIndex = sizeIndex;
      }
      const maxTextureSize = this._engine.getConfig().getValue("maxTextureSize");
      if (size >= targetSize || "number" == typeof maxTextureSize && size >= maxTextureSize && void 0 === this._forcedSize) {
        selectedIndex = sizeIndex;
        break;
      }
    }
    if (this._currentSize !== this._sizes[selectedIndex]) {
      this._loadTexture(this._sizes[selectedIndex], this._currentSize);
      this._currentSize = this._sizes[selectedIndex];
    }
  }
  // 正在加载时先归还旧 URL 的请求引用；成功回调再完成纹理所有权交接。
  _loadTexture(size, previousSize) {
    if ("loading" === this._loadState.state && this._uniform) {
      const previousUrl = this._url.replace("$SIZE", previousSize.toString());
      this._component.getEngine().getResourceManager().releaseByUrl(this._component, previousUrl, "texture");
    }
    const url = this._url.replace("$SIZE", size.toString());
    this._loadState.state = "loading";
    const priority = -this._component.getEntity().getLeastCameraDepth();
    this._component.getEngine().getResourceManager().acquire(this._component, url, "texture", priority).then(texture => {
      if (!this._enabled || !this._uniform) {
        this._component.getEngine().getResourceManager().release(this._component, texture, "texture");
        this._loadState.state = "unloaded";
        return;
      }
      if (this._uniform.value) {
        this._component.getEngine().getResourceManager().release(this._component, this._uniform.value, "texture");
      }
      this._uniform.value = texture;
      this._loadState.state = "loaded";
    }).catch(error => {
      if (!(error instanceof PioneerPublicApi.CanceledError)) {
        if (error instanceof Error) {
          console.warn(`While updating ${this._component} texture LOD:`, error.message);
          this._loadState.state = "failed";
          this._loadState.error = error.message;
        }
      }
    });
  }
  _engine;
  _component;
  _uniform;
  _url;
  _sizes;
  _currentSize;
  _forcedSize;
  _loadState;
  _enabled;
}
export { TextureLOD };
