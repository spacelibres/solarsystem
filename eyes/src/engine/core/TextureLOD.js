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
    this._enabled && !enabled && this._uniform?.value && (this._component.getEngine().getResourceManager().release(this._component, this._uniform.value, "texture"), this._uniform.value = null);
    this._enabled = enabled;
  }
  getUrl() {
    return this._url;
  }
  setUrl(url) {
    this._url !== url && (this._url = url, this._loadState = {
      state: "unloaded"
    }, this._currentSize = NaN);
  }
  getUniform() {
    return this._uniform;
  }
  setUniform(uniform) {
    this._uniform !== uniform && (this._uniform?.value && (this._component.getEngine().getResourceManager().release(this._component, this._uniform.value, "texture"), this._uniform.value = null), this._uniform = uniform, this._loadState = {
      state: "unloaded"
    }, this._currentSize = NaN);
  }
  getSizes() {
    return this._sizes.slice();
  }
  setSizes(t) {
    (this._sizes.length !== t.length || this._sizes.map((e, i) => e !== t[i]).reduce((t, e) => t || e, false)) && (this._sizes = [...t], this._loadState = {
      state: "unloaded"
    }, this._currentSize = NaN);
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
  async getLoadedPromise(t = Number.POSITIVE_INFINITY) {
    await (0, PioneerPublicApi.waitUntil)(() => {
      if ("loaded" === this._loadState.state) return true;
      if ("failed" === this._loadState.state) throw new Error(this._loadState.error);
      return false;
    }, .25, t);
  }
  update() {
    if (!this._enabled || null === this._uniform) return;
    if ("" === this._url || 0 === this._sizes.length || "unloaded" === this._component.getLoadState().state && void 0 === this._forcedSize) return void (this._uniform.value && (this._component.getEngine().getResourceManager().release(this._component, this._uniform.value, "texture"), this._uniform.value = null, this._currentSize = NaN));
    let t;
    t = void 0 !== this._forcedSize ? this._forcedSize : this._component.getEntity().getGreatestPixelSpaceExtentsRadius();
    let e = 0;
    for (let i = 0, s = this._sizes.length; i < s; i++) {
      const n = this._sizes[i];
      i === s - 1 && (e = i);
      const o = this._engine.getConfig().getValue("maxTextureSize");
      if (n >= t || "number" == typeof o && n >= o && void 0 === this._forcedSize) {
        e = i;
        break;
      }
    }
    this._currentSize !== this._sizes[e] && (this._loadTexture(this._sizes[e], this._currentSize), this._currentSize = this._sizes[e]);
  }
  _loadTexture(t, e) {
    if ("loading" === this._loadState.state && this._uniform) {
      const t = this._url.replace("$SIZE", e.toString());
      this._component.getEngine().getResourceManager().releaseByUrl(this._component, t, "texture");
    }
    const i = this._url.replace("$SIZE", t.toString());
    this._loadState.state = "loading";
    const n = -this._component.getEntity().getLeastCameraDepth();
    this._component.getEngine().getResourceManager().acquire(this._component, i, "texture", n).then(t => {
      if (!this._enabled || !this._uniform) {
        this._component.getEngine().getResourceManager().release(this._component, t, "texture");
        return void (this._loadState.state = "unloaded");
      }
      this._uniform.value && this._component.getEngine().getResourceManager().release(this._component, this._uniform.value, "texture");
      this._uniform.value = t;
      this._loadState.state = "loaded";
    }).catch(t => {
      t instanceof PioneerPublicApi.CanceledError || t instanceof Error && (console.warn(`While updating ${this._component} texture LOD:`, t.message), this._loadState.state = "failed", this._loadState.error = t.message);
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
