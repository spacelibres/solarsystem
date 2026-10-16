// Recovered from app.js:160398-165086.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class Downloader {
  constructor() {
    this._replacements = new Map();
    this._replacementTypes = new Map();
    this._currentDownloads = new Map();
    this._downloadQueue = [];
    this._maxCurrentDownloads = 20;
  }
  getReplacement(t) {
    return this._replacements.get(t);
  }
  setReplacement(t, e) {
    this._replacements.set(t, e);
  }
  getReplacementType(t) {
    return this._replacementTypes.get(t);
  }
  setReplacementType(t, e) {
    void 0 !== e ? this._replacementTypes.set(t, e) : this._replacementTypes.delete(t);
  }
  cancel(t) {
    const e = this.processUrl(t);
    let i = this._currentDownloads.get(e);
    if (i?.request) {
      this._currentDownloads.delete(i.actualUrl);
      i.request.abort();
    } else {
      const s = this._downloadQueue.findIndex(t => t.actualUrl === e);
      if (-1 === s) throw new Error(`Couldn't cancel ${t}, not actively downloading or in queue.`);
      i = this._downloadQueue[s];
      this._downloadQueue.splice(s, 1);
    }
    i.isCanceled = true;
    i.reject(new PioneerPublicApi.CanceledError());
    this._checkDownloadQueue();
  }
  processUrl(t) {
    let e = t;
    for (const [t, i] of this._replacements) e = e.replace(`$${t}`, i);
    return e;
  }
  async download(t, e, i, n) {
    const o = this.processUrl(t);
    let r;
    let a;
    const promise = new Promise((t, e) => {
      r = t;
      a = e;
    });
    const c = {
      url: t,
      actualUrl: o,
      priority: i,
      type: e,
      isCanceled: false,
      resolve: r,
      reject: a,
      progressCallbacks: n ? [n] : [],
      request: null,
      promise: promise
    };
    PioneerPublicApi.Sort.addObject(c, this._downloadQueue, (t, e) => t.priority > e.priority, (t, e) => t.priority === e.priority);
    this._checkDownloadQueue();
    return c.promise;
  }
  updatePriority(t, e) {
    const i = this._downloadQueue.findIndex(e => e.url === t);
    if (-1 !== i) {
      const t = this._downloadQueue[i];
      t.priority = Math.max(t.priority, e);
      this._downloadQueue.splice(i, 1);
      PioneerPublicApi.Sort.addObject(t, this._downloadQueue, (t, e) => t.priority > e.priority, (t, e) => t.priority === e.priority);
    }
  }
  _doRequest(t) {
    const e = this._replacementTypes.get(t.url) ?? t.type;
    if ("binary" === e || "text" === e) {
      const xMLHttpRequest = new XMLHttpRequest();
      xMLHttpRequest.onload = () => {
        200 <= xMLHttpRequest.status && xMLHttpRequest.status <= 299 ? this._completeDownload(t, xMLHttpRequest.response, xMLHttpRequest.getResponseHeader("Content-Type") ?? "application/octet-stream") : this._failDownload(t, `Failed to download "${t.actualUrl}" (${xMLHttpRequest.status} ${xMLHttpRequest.statusText}).`);
      };
      xMLHttpRequest.onprogress = e => {
        this._inProgressDownload(t, e);
      };
      xMLHttpRequest.onerror = () => {
        this._failDownload(t, `Failed to download "${t.actualUrl}".`);
      };
      xMLHttpRequest.responseType = "binary" === e ? "arraybuffer" : "text";
      t.request = xMLHttpRequest;
      xMLHttpRequest.open("GET", t.actualUrl);
      xMLHttpRequest.send();
    } else if ("image" === e) {
      const e = document.createElement("img");
      e.onload = () => {
        const i = t.actualUrl.match(/\.([^.]+)$/u)?.[1] ?? "";
        this._completeDownload(t, e, Downloader._mimeTypes[i] ?? "application/octet-stream");
      };
      e.onerror = () => {
        this._failDownload(t, `Failed to download "${t.actualUrl}".`);
      };
      e.crossOrigin = "anonymous";
      e.src = t.actualUrl;
    } else if ("video" === e) {
      const e = document.createElement("video");
      const i = () => {
        const i = t.actualUrl.match(/\.([^.]+)$/u)?.[1] ?? "";
        this._completeDownload(t, e, Downloader._mimeTypes[i] ?? "application/octet-stream");
      };
      e.onload = i;
      e.oncanplaythrough = i;
      e.onprogress = e => {
        this._inProgressDownload(t, e);
      };
      e.onerror = () => {
        this._failDownload(t, `Failed to download "${t.actualUrl}".`);
      };
      e.muted = true;
      e.playsInline = true;
      e.loop = false;
      e.crossOrigin = "anonymous";
      e.src = t.actualUrl;
      e.load();
    } else {
      const xMLHttpRequest = new XMLHttpRequest();
      xMLHttpRequest.onload = () => {
        if (200 <= xMLHttpRequest.status && xMLHttpRequest.status <= 299) {
          const i = xMLHttpRequest.getResponseHeader("Content-Type") ?? "application/octet-stream";
          createImageBitmap(xMLHttpRequest.response, {
            premultiplyAlpha: "none",
            colorSpaceConversion: "none"
          }).then(e => {
            t.isCanceled || this._completeDownload(t, e, i);
          }).catch(e => {
            this._failDownload(t, `Failed to download "${t.actualUrl}" (${e instanceof Error ? e.message : "Unknown error"}).`);
          });
        } else this._failDownload(t, `Failed to download "${t.actualUrl}" (${xMLHttpRequest.status} ${xMLHttpRequest.statusText}).`);
      };
      xMLHttpRequest.onprogress = e => {
        this._inProgressDownload(t, e);
      };
      xMLHttpRequest.onerror = () => {
        this._failDownload(t, `Failed to download "${t.actualUrl}".`);
      };
      t.request = xMLHttpRequest;
      xMLHttpRequest.responseType = "blob";
      xMLHttpRequest.open("GET", t.actualUrl);
      xMLHttpRequest.send();
    }
  }
  _inProgressDownload(t, e) {
    const i = e.lengthComputable ? e.loaded / e.total : 0;
    const s = e.lengthComputable ? e.total : 0;
    for (const e of t.progressCallbacks) e(i, s);
  }
  _completeDownload(t, e, i) {
    this._currentDownloads.delete(t.actualUrl);
    t.resolve({
      actualUrl: t.actualUrl,
      content: e,
      mimeType: i
    });
    this._checkDownloadQueue();
  }
  _failDownload(t, e) {
    this._currentDownloads.delete(t.actualUrl);
    t.reject(new Error(e));
    this._checkDownloadQueue();
  }
  _checkDownloadQueue() {
    if (this._currentDownloads.size < this._maxCurrentDownloads) {
      const t = this._downloadQueue.shift();
      t && (this._currentDownloads.set(t.actualUrl, t), this._doRequest(t));
    }
  }
  _replacements;
  _replacementTypes;
  _currentDownloads;
  _downloadQueue;
  _maxCurrentDownloads;
  static _mimeTypes = {
    aac: "audio/aac",
    flac: "audio/flac",
    gif: "image/gif",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    mid: "audio/mid",
    midi: "audio/midi",
    mp3: "audio/mpeg",
    mp4: "video/mp4",
    png: "image/png",
    svg: "image/svg+xml",
    weba: "audio/webm",
    webm: "video/webm",
    webp: "image/webp"
  };
}
export { Downloader };
