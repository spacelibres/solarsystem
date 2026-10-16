/** @eyes-analysis
 * 文件职责：按实体屏幕半径或强制尺寸选择 $SIZE 纹理，以引用计数替换 shader uniform。
 * 依据：import ../pioneer/public-api.js；TextureLOD @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:147998-151411.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：按实体屏幕半径或强制尺寸选择 $SIZE 纹理，以引用计数替换 shader uniform。
 * 继承：无显式父类；导出：TextureLOD。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class TextureLOD {
  /** @eyes-analysis
   * 【结构证据】写入 `_component`、`_currentSize`、`_enabled`、`_engine`、`_forcedSize`、`_loadState`、`_sizes`、`_uniform`；调用 `component.getEntity`、`component.getEntity().getScene`、`component.getEntity().getScene().getEngine`。
   * 状态写入：_component、_currentSize、_enabled、_engine、_forcedSize、_loadState、_sizes、_uniform等；完整记录见索引。
   * 调用线索：component.getEntity、component.getEntity().getScene、component.getEntity().getScene().getEngine。
   */
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
  /** @eyes-analysis
   * 【结构证据】写入 `_enabled`、`_uniform.value`；调用 `this._component.getEngine`、`this._component.getEngine().getResourceManager`、`this._component.getEngine().getResourceManager().release`。
   * 状态写入：_enabled、_uniform.value。
   * 调用线索：this._component.getEngine、this._component.getEngine().getResourceManager、this._component.getEngine().getResourceManager().release。
   */
  setEnabled(enabled) {
    this._enabled && !enabled && this._uniform?.value && (this._component.getEngine().getResourceManager().release(this._component, this._uniform.value, "texture"), this._uniform.value = null);
    this._enabled = enabled;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._url`。
   */
  getUrl() {
    return this._url;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_currentSize`、`_loadState`、`_url`。
   * 状态写入：_currentSize、_loadState、_url。
   */
  setUrl(url) {
    this._url !== url && (this._url = url, this._loadState = {
      state: "unloaded"
    }, this._currentSize = NaN);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._uniform`。
   */
  getUniform() {
    return this._uniform;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_currentSize`、`_loadState`、`_uniform`、`_uniform.value`；调用 `this._component.getEngine`、`this._component.getEngine().getResourceManager`、`this._component.getEngine().getResourceManager().release`。
   * 状态写入：_currentSize、_loadState、_uniform、_uniform.value。
   * 调用线索：this._component.getEngine、this._component.getEngine().getResourceManager、this._component.getEngine().getResourceManager().release。
   */
  setUniform(uniform) {
    this._uniform !== uniform && (this._uniform?.value && (this._component.getEngine().getResourceManager().release(this._component, this._uniform.value, "texture"), this._uniform.value = null), this._uniform = uniform, this._loadState = {
      state: "unloaded"
    }, this._currentSize = NaN);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._sizes.slice()`；调用 `this._sizes.slice`。
   * 调用线索：this._sizes.slice。
   */
  getSizes() {
    return this._sizes.slice();
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_currentSize`、`_loadState`、`_sizes`；调用 `this._sizes.map`。
   * 状态写入：_currentSize、_loadState、_sizes。
   * 调用线索：this._sizes.map、this._sizes.map((e,i)=>e!==t[i]).reduce。
   */
  setSizes(t) {
    (this._sizes.length !== t.length || this._sizes.map((e, i) => e !== t[i]).reduce((t, e) => t || e, false)) && (this._sizes = [...t], this._loadState = {
      state: "unloaded"
    }, this._currentSize = NaN);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._currentSize`。
   */
  getCurrentSize() {
    return this._currentSize;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._forcedSize`。
   */
  getForcedSize() {
    return this._forcedSize;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_forcedSize`。
   * 状态写入：_forcedSize。
   */
  setForcedSize(forcedSize) {
    this._forcedSize = forcedSize;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `0,PioneerPublicApi.waitUntil`、`new Error`；含显式错误分支。
   * 调用线索：0,PioneerPublicApi.waitUntil、new Error。
   */
  async getLoadedPromise(t = Number.POSITIVE_INFINITY) {
    await (0, PioneerPublicApi.waitUntil)(() => {
      if ("loaded" === this._loadState.state) return true;
      if ("failed" === this._loadState.state) throw new Error(this._loadState.error);
      return false;
    }, .25, t);
  }
  /** @eyes-analysis
   * 从 sizes 选择首个不小于实体最大屏幕半径的尺寸，受 maxTextureSize 影响；forcedSize 跳过默认装载条件及尺寸上限。currentSize 变化才触发加载。
   * 状态写入：_currentSize、_uniform.value。
   * 调用线索：this._component.getEngine、this._component.getEngine().getResourceManager、this._component.getEngine().getResourceManager().release、this._component.getEntity、this._component.getEntity().getGreatestPixelSpaceExtentsRadius等。
   */
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
  /** @eyes-analysis
   * 替换 $SIZE 并按负相机深度提交 acquire；旧纹理保留到新纹理成功，然后 release 旧 uniform；若期间禁用/无 uniform 则释放新资源。
   * 状态写入：_loadState.error、_loadState.state、_uniform.value。
   * 调用线索：console.warn、e.toString、t.toString、this._component.getEngine、this._component.getEngine().getResourceManager等。
   */
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
