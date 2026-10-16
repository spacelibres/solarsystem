/** @eyes-analysis
 * 文件职责：以资源类型+URL 共享 Promise/对象和引用计数，跟踪组件持有者，零引用后延时释放或取消未完成请求。
 * 依据：import ../pioneer/public-api.js；ResourceManager @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:220973-225925.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：以资源类型+URL 共享 Promise/对象和引用计数，跟踪组件持有者，零引用后延时释放或取消未完成请求。
 * 继承：无显式父类；导出：ResourceManager。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class ResourceManager {
  /** @eyes-analysis
   * 【结构证据】写入 `_engine`。
   * 状态写入：_engine。
   */
  constructor(engine) {
    this._engine = engine;
  }
  /** @eyes-analysis
   * 按 type+url 查共享条目，命中时增加 count、取消待卸载定时器并提升排队优先级；首次调用建立共享 Promise，成功建立资源反向索引并记录持有 EntityItem。
   * 状态写入：_typesToCaches[i]。
   * 调用线索：a.resourcesToUrls.set、a.urlsToEntries.delete、a.urlsToEntries.get、a.urlsToEntries.set、n[i].load等。
   */
  async acquire(t, e, i, o, r) {
    let a = this._typesToCaches[i];
    a || (a = {
      urlsToEntries: new Map(),
      resourcesToUrls: new Map()
    }, this._typesToCaches[i] = a);
    const l = a.urlsToEntries.get(e);
    if (l) {
      void 0 !== l.unloadTimeout && (window.clearTimeout(l.unloadTimeout), l.unloadTimeout = void 0);
      n[i].updatePriority(e, o, this._engine);
      l.count += 1;
      t && this._addEntityItemReference(t, e, i);
      return l.promise;
    }
    const c = {
      promise: n[i].load(t, e, o, this._engine, r).then(t => (c.resource = t, a.resourcesToUrls.set(t, e), t)).catch(n => {
        throw n instanceof PioneerPublicApi.CanceledError || (t && this._removeEntityItemReference(t, e, i), a.urlsToEntries.delete(e)), n;
      }),
      resource: void 0,
      count: 1,
      unloadTimeout: void 0
    };
    a.urlsToEntries.set(e, c);
    t && this._addEntityItemReference(t, e, i);
    return c.promise;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `new Error`、`s.resourcesToUrls.get`、`this.releaseByUrl`；含显式错误分支。
   * 调用线索：new Error、s.resourcesToUrls.get、this.releaseByUrl。
   */
  release(t, e, i) {
    const s = this._typesToCaches[i];
    if (!s) throw new Error(`ResourceManager.release() has been called without a matching acquire() for type "${i}".`);
    const n = s.resourcesToUrls.get(e);
    if (void 0 === n) throw new Error(`ResourceManager.release() has been called without a matching acquire() for type "${i}".`);
    this.releaseByUrl(t, n, i);
  }
  /** @eyes-analysis
   * 检查 acquire/release 配对并减计数；零引用时已加载资源延迟 15000ms 销毁，未完成请求立即删除/取消。
   * 调用线索：new Error、s.urlsToEntries.get、this._deleteEntry、this._removeEntityItemReference、window.setTimeout。
   */
  releaseByUrl(t, e, i) {
    const s = this._typesToCaches[i];
    if (!s) throw new Error(`ResourceManager.release() has been called without a matching acquire() for type "${i}" at url "${e}".`);
    const n = s.urlsToEntries.get(e);
    if (!n) throw new Error(`ResourceManager.release() has been called without a matching acquire() for type "${i}" at url "${e}".`);
    if (0 === n.count) throw new Error(`ResourceManager.release() has been called without a matching acquire() for type "${i}" at url "${e}".`);
    t && this._removeEntityItemReference(t, e, i);
    n.count -= 1;
    0 === n.count && (void 0 !== n.resource ? n.unloadTimeout = window.setTimeout(() => {
      this._deleteEntry(t, e, i, s, n);
    }, 15e3) : this._deleteEntry(t, e, i, s, n));
  }
  /** @eyes-analysis
   * 并行获取命名资源，allSettled 检查结果；任一真实失败时释放已成功部分并汇总错误，取消以 CanceledError 向上传播。
   * 调用线索：Object.entries、Promise.allSettled、l.push、n.push、new Error等。
   */
  async acquireMultiple(t, e, i) {
    const n = [];
    const o = [];
    for (const [s, {
      type: type,
      url: url
    }] of Object.entries(e)) {
      const e = this.acquire(t, url, type, i).then(t => ({
        name: s,
        type: type,
        resource: t
      }));
      n.push([s, url]);
      o.push(e);
    }
    const r = await Promise.allSettled(o);
    let a = "fulfilled";
    const l = [];
    let c = "";
    for (let e = 0; e < r.length; e++) {
      const i = r[e];
      if ("fulfilled" === i.status) l.push(i.value);else {
        if ("fulfilled" === a) for (const e of r) "fulfilled" === e.status && this.release(t, e.value.resource, e.value.type);
        if (i.reason instanceof PioneerPublicApi.CanceledError) throw new PioneerPublicApi.CanceledError();
        i.reason instanceof Error && (c += `Error loading ${n[e][0]} (${n[e][1]}): ${i.reason.message}}\n`, a = "rejected");
      }
    }
    if ("rejected" === a) throw new Error(c);
    const h = {};
    for (const t of l) h[t.name] = t.resource;
    return h;
  }
  /** @eyes-analysis
   * 遍历该组件/控制器的 URL+类型持有记录逐项释放，然后移除其所有权记录。
   * 调用线索：this._entityItemsToResources.delete、this._entityItemsToResources.get、this.releaseByUrl。
   */
  releaseAllForEntityItem(t) {
    const e = this._entityItemsToResources.get(t);
    if (e) {
      for (const t of e) this.releaseByUrl(void 0, t[0], t[1]);
      this._entityItemsToResources.delete(t);
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `s.push`、`this._entityItemsToResources.get`、`this._entityItemsToResources.set`。
   * 调用线索：s.push、this._entityItemsToResources.get、this._entityItemsToResources.set。
   */
  _addEntityItemReference(t, e, i) {
    let s = this._entityItemsToResources.get(t);
    s || (s = [], this._entityItemsToResources.set(t, s));
    s.push([e, i]);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `new Error`、`s.findIndex`、`s.splice`、`this._entityItemsToResources.delete`、`this._entityItemsToResources.get`；含显式错误分支。
   * 调用线索：new Error、s.findIndex、s.splice、this._entityItemsToResources.delete、this._entityItemsToResources.get。
   */
  _removeEntityItemReference(t, e, i) {
    const s = this._entityItemsToResources.get(t);
    if (!s) throw new Error(`ResourceManager.release() has been called without a matching acquire() for type "${i}" at url "${e} for the entity item ${t}".`);
    const n = s.findIndex(t => t[0] === e);
    if (-1 === n) throw new Error(`ResourceManager.release() has been called without a matching acquire() for type "${i}" at url "${e} for the entity item ${t}".`);
    s.splice(n, 1);
    0 === s.length && this._entityItemsToResources.delete(t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `n[i].cancel`、`n[i].unload`、`s.resourcesToUrls.delete`、`s.urlsToEntries.delete`、`window.clearTimeout`。
   * 调用线索：n[i].cancel、n[i].unload、s.resourcesToUrls.delete、s.urlsToEntries.delete、window.clearTimeout。
   */
  _deleteEntry(t, e, i, s, o) {
    void 0 !== o.resource ? (n[i].unload(t, o.resource, this._engine), s.resourcesToUrls.delete(o.resource)) : n[i].cancel(t, e, this._engine);
    window.clearTimeout(o.unloadTimeout);
    s.urlsToEntries.delete(e);
  }
  _engine;
  _typesToCaches = {};
  _entityItemsToResources = new Map();
}
const n = {
  texture: {
    load: async (t, e, i, s, n) => s.getTextureLoader().loadTexture(e, i, n),
    updatePriority: (t, e, i) => {
      i.getTextureLoader().updatePriority(t, e);
    },
    cancel: (t, e, i) => {
      i.getTextureLoader().cancel(e);
    },
    unload: (t, e) => {
      PioneerPublicApi.ThreeJsHelper.destroyTexture(e);
    }
  },
  imageData: {
    load: async (t, e, i, s, n) => {
      const o = await s.getResourceManager().acquire(t, e, "texture", i, n);
      const r = document.createElement("canvas");
      const a = o.image;
      r.width = a.width;
      r.height = a.height;
      const l = r.getContext("2d", {
        desynchronized: true,
        alpha: false
      });
      if (!l) throw s.getResourceManager().release(t, o, "texture"), new Error(`Could not acquire a 2D context for texture "${e}".`);
      l.drawImage(a, 0, 0);
      s.getResourceManager().release(t, o, "texture");
      return l.getImageData(0, 0, r.width, r.height);
    },
    updatePriority: (t, e, i) => {
      i.getTextureLoader().updatePriority(t, e);
    },
    cancel: (t, e, i) => {
      i.getResourceManager().releaseByUrl(t, e, "texture");
    },
    unload: () => {}
  },
  binary: {
    load: async (t, e, i, s) => s.getDownloader().download(e, "binary", i).then(t => t.content),
    updatePriority: (t, e, i) => {
      i.getDownloader().updatePriority(t, e);
    },
    cancel: (t, e, i) => {
      i.getDownloader().cancel(e);
    },
    unload: () => {}
  },
  text: {
    load: async (t, e, i, s) => s.getDownloader().download(e, "text", i).then(t => t.content),
    updatePriority: (t, e, i) => {
      i.getDownloader().updatePriority(t, e);
    },
    cancel: (t, e, i) => {
      i.getDownloader().cancel(e);
    },
    unload: () => {}
  }
};
export { ResourceManager };
