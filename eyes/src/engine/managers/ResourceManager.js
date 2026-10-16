// Recovered from app.js:220973-225925.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class ResourceManager {
  constructor(engine) {
    this._engine = engine;
  }
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
  release(t, e, i) {
    const s = this._typesToCaches[i];
    if (!s) throw new Error(`ResourceManager.release() has been called without a matching acquire() for type "${i}".`);
    const n = s.resourcesToUrls.get(e);
    if (void 0 === n) throw new Error(`ResourceManager.release() has been called without a matching acquire() for type "${i}".`);
    this.releaseByUrl(t, n, i);
  }
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
  releaseAllForEntityItem(t) {
    const e = this._entityItemsToResources.get(t);
    if (e) {
      for (const t of e) this.releaseByUrl(void 0, t[0], t[1]);
      this._entityItemsToResources.delete(t);
    }
  }
  _addEntityItemReference(t, e, i) {
    let s = this._entityItemsToResources.get(t);
    s || (s = [], this._entityItemsToResources.set(t, s));
    s.push([e, i]);
  }
  _removeEntityItemReference(t, e, i) {
    const s = this._entityItemsToResources.get(t);
    if (!s) throw new Error(`ResourceManager.release() has been called without a matching acquire() for type "${i}" at url "${e} for the entity item ${t}".`);
    const n = s.findIndex(t => t[0] === e);
    if (-1 === n) throw new Error(`ResourceManager.release() has been called without a matching acquire() for type "${i}" at url "${e} for the entity item ${t}".`);
    s.splice(n, 1);
    0 === s.length && this._entityItemsToResources.delete(t);
  }
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
