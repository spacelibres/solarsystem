// 按类型和 URL 共享加载结果。组件持有的是引用计数；最后一次 release 后，已完成资源保留 15 秒供复用，未完成下载立即取消。
// Recovered from app.js:220973-225925.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class ResourceManager {
  constructor(engine) {
    this._engine = engine;
  }
  // 命中时连同未完成 Promise 一起复用；重新获得引用会撤销待卸载计时器。
  async acquire(owner, url, type, priority, options) {
    let cache = this._typesToCaches[type];
    if (!cache) {
      cache = {
        urlsToEntries: new Map(),
        resourcesToUrls: new Map()
      };
      this._typesToCaches[type] = cache;
    }
    const existingEntry = cache.urlsToEntries.get(url);
    if (existingEntry) {
      if (void 0 !== existingEntry.unloadTimeout) {
        window.clearTimeout(existingEntry.unloadTimeout);
        existingEntry.unloadTimeout = void 0;
      }
      resourceHandlers[type].updatePriority(url, priority, this._engine);
      existingEntry.count += 1;
      if (owner) {
        this._addEntityItemReference(owner, url, type);
      }
      return existingEntry.promise;
    }
    const entry = {
      promise: resourceHandlers[type].load(owner, url, priority, this._engine, options).then(resource => {
        entry.resource = resource;
        cache.resourcesToUrls.set(resource, url);
        return resource;
      }).catch(error => {
        if (!(error instanceof PioneerPublicApi.CanceledError)) {
          if (owner) {
            this._removeEntityItemReference(owner, url, type);
          }
          cache.urlsToEntries.delete(url);
        }
        throw error;
      }),
      resource: void 0,
      count: 1,
      unloadTimeout: void 0
    };
    cache.urlsToEntries.set(url, entry);
    if (owner) {
      this._addEntityItemReference(owner, url, type);
    }
    return entry.promise;
  }
  release(owner, resource, type) {
    const cache = this._typesToCaches[type];
    if (!cache) throw new Error(`ResourceManager.release() has been called without a matching acquire() for type "${type}".`);
    const url = cache.resourcesToUrls.get(resource);
    if (void 0 === url) throw new Error(`ResourceManager.release() has been called without a matching acquire() for type "${type}".`);
    this.releaseByUrl(owner, url, type);
  }
  releaseByUrl(owner, url, type) {
    const cache = this._typesToCaches[type];
    if (!cache) throw new Error(`ResourceManager.release() has been called without a matching acquire() for type "${type}" at url "${url}".`);
    const entry = cache.urlsToEntries.get(url);
    if (!entry) throw new Error(`ResourceManager.release() has been called without a matching acquire() for type "${type}" at url "${url}".`);
    if (0 === entry.count) throw new Error(`ResourceManager.release() has been called without a matching acquire() for type "${type}" at url "${url}".`);
    if (owner) {
      this._removeEntityItemReference(owner, url, type);
    }
    entry.count -= 1;
    if (0 === entry.count) {
      if (void 0 !== entry.resource) {
        entry.unloadTimeout = window.setTimeout(() => {
          this._deleteEntry(owner, url, type, cache, entry);
        }, 15e3);
      } else {
        this._deleteEntry(owner, url, type, cache, entry);
      }
    }
  }
  // allSettled 等齐所有结果后才回收成功项，避免部分成功的资源失去所有者。
  async acquireMultiple(owner, resourceDescriptions, priority) {
    const resourceNamesAndUrls = [];
    const requests = [];
    for (const [name, {
      type: type,
      url: url
    }] of Object.entries(resourceDescriptions)) {
      const request = this.acquire(owner, url, type, priority).then(resource => ({
        name: name,
        type: type,
        resource: resource
      }));
      resourceNamesAndUrls.push([name, url]);
      requests.push(request);
    }
    const results = await Promise.allSettled(requests);
    let aggregateStatus = "fulfilled";
    const loadedResources = [];
    let errorMessages = "";
    for (let resultIndex = 0; resultIndex < results.length; resultIndex++) {
      const result = results[resultIndex];
      if ("fulfilled" === result.status) loadedResources.push(result.value);else {
        if ("fulfilled" === aggregateStatus) for (const successfulResult of results) {
          if ("fulfilled" === successfulResult.status) {
            this.release(owner, successfulResult.value.resource, successfulResult.value.type);
          }
        }
        if (result.reason instanceof PioneerPublicApi.CanceledError) throw new PioneerPublicApi.CanceledError();
        if (result.reason instanceof Error) {
          errorMessages += `Error loading ${resourceNamesAndUrls[resultIndex][0]} (${resourceNamesAndUrls[resultIndex][1]}): ${result.reason.message}}\n`;
          aggregateStatus = "rejected";
        }
      }
    }
    if ("rejected" === aggregateStatus) throw new Error(errorMessages);
    const resourcesByName = {};
    for (const loadedResource of loadedResources) resourcesByName[loadedResource.name] = loadedResource.resource;
    return resourcesByName;
  }
  // 清理组件时逐条释放；传空 owner，避免遍历期间修改同一持有记录数组。
  releaseAllForEntityItem(owner) {
    const references = this._entityItemsToResources.get(owner);
    if (references) {
      for (const reference of references) this.releaseByUrl(void 0, reference[0], reference[1]);
      this._entityItemsToResources.delete(owner);
    }
  }
  _addEntityItemReference(owner, url, type) {
    let references = this._entityItemsToResources.get(owner);
    if (!references) {
      references = [];
      this._entityItemsToResources.set(owner, references);
    }
    references.push([url, type]);
  }
  _removeEntityItemReference(owner, url, type) {
    const references = this._entityItemsToResources.get(owner);
    if (!references) throw new Error(`ResourceManager.release() has been called without a matching acquire() for type "${type}" at url "${url} for the entity item ${owner}".`);
    const referenceIndex = references.findIndex(reference => reference[0] === url);
    if (-1 === referenceIndex) throw new Error(`ResourceManager.release() has been called without a matching acquire() for type "${type}" at url "${url} for the entity item ${owner}".`);
    references.splice(referenceIndex, 1);
    if (0 === references.length) {
      this._entityItemsToResources.delete(owner);
    }
  }
  _deleteEntry(owner, url, type, cache, entry) {
    if (void 0 !== entry.resource) {
      resourceHandlers[type].unload(owner, entry.resource, this._engine);
      cache.resourcesToUrls.delete(entry.resource);
    } else {
      resourceHandlers[type].cancel(owner, url, this._engine);
    }
    window.clearTimeout(entry.unloadTimeout);
    cache.urlsToEntries.delete(url);
  }
  _engine;
  _typesToCaches = {};
  _entityItemsToResources = new Map();
}
const resourceHandlers = {
  texture: {
    load: async (owner, url, priority, engine, options) => engine.getTextureLoader().loadTexture(url, priority, options),
    updatePriority: (url, priority, engine) => {
      engine.getTextureLoader().updatePriority(url, priority);
    },
    cancel: (owner, url, engine) => {
      engine.getTextureLoader().cancel(url);
    },
    unload: (owner, texture) => {
      PioneerPublicApi.ThreeJsHelper.destroyTexture(texture);
    }
  },
  // 像素读取临时借用 texture；画布复制完成后归还纹理，只保留 ImageData。
  imageData: {
    load: async (owner, url, priority, engine, options) => {
      const texture = await engine.getResourceManager().acquire(owner, url, "texture", priority, options);
      const canvas = document.createElement("canvas");
      const image = texture.image;
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d", {
        desynchronized: true,
        alpha: false
      });
      if (!context) {
        engine.getResourceManager().release(owner, texture, "texture");
        throw new Error(`Could not acquire a 2D context for texture "${url}".`);
      }
      context.drawImage(image, 0, 0);
      engine.getResourceManager().release(owner, texture, "texture");
      return context.getImageData(0, 0, canvas.width, canvas.height);
    },
    updatePriority: (url, priority, engine) => {
      engine.getTextureLoader().updatePriority(url, priority);
    },
    cancel: (owner, url, engine) => {
      engine.getResourceManager().releaseByUrl(owner, url, "texture");
    },
    unload: () => {}
  },
  binary: {
    load: async (owner, url, priority, engine) => engine.getDownloader().download(url, "binary", priority).then(download => download.content),
    updatePriority: (url, priority, engine) => {
      engine.getDownloader().updatePriority(url, priority);
    },
    cancel: (owner, url, engine) => {
      engine.getDownloader().cancel(url);
    },
    unload: () => {}
  },
  text: {
    load: async (owner, url, priority, engine) => engine.getDownloader().download(url, "text", priority).then(download => download.content),
    updatePriority: (url, priority, engine) => {
      engine.getDownloader().updatePriority(url, priority);
    },
    cancel: (owner, url, engine) => {
      engine.getDownloader().cancel(url);
    },
    unload: () => {}
  }
};
export { ResourceManager };
