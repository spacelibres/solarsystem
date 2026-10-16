/** @eyes-analysis
 * 文件职责：替换资源 URL 变量，按优先级调度最多 20 个网络请求并提供取消/进度与内容类型解码。
 * 依据：import ../pioneer/public-api.js；Downloader @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:160398-165086.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：替换资源 URL 变量，按优先级调度最多 20 个网络请求并提供取消/进度与内容类型解码。
 * 继承：无显式父类；导出：Downloader。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Downloader {
  /** @eyes-analysis
   * 【结构证据】写入 `_currentDownloads`、`_downloadQueue`、`_maxCurrentDownloads`、`_replacementTypes`、`_replacements`；调用 `new Map`。
   * 状态写入：_currentDownloads、_downloadQueue、_maxCurrentDownloads、_replacementTypes、_replacements。
   * 调用线索：new Map。
   */
  constructor() {
    this._replacements = new Map();
    this._replacementTypes = new Map();
    this._currentDownloads = new Map();
    this._downloadQueue = [];
    this._maxCurrentDownloads = 20;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._replacements.get(t)`；调用 `this._replacements.get`。
   * 调用线索：this._replacements.get。
   */
  getReplacement(t) {
    return this._replacements.get(t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._replacements.set`。
   * 调用线索：this._replacements.set。
   */
  setReplacement(t, e) {
    this._replacements.set(t, e);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._replacementTypes.get(t)`；调用 `this._replacementTypes.get`。
   * 调用线索：this._replacementTypes.get。
   */
  getReplacementType(t) {
    return this._replacementTypes.get(t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._replacementTypes.delete`、`this._replacementTypes.set`。
   * 调用线索：this._replacementTypes.delete、this._replacementTypes.set。
   */
  setReplacementType(t, e) {
    void 0 !== e ? this._replacementTypes.set(t, e) : this._replacementTypes.delete(t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `i.reject`、`i.request.abort`、`new Error`、`new PioneerPublicApi.CanceledError`、`this._checkDownloadQueue`、`this._currentDownloads.delete`；含显式错误分支。
   * 调用线索：i.reject、i.request.abort、new Error、new PioneerPublicApi.CanceledError、this._checkDownloadQueue等。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `e`；调用 `e.replace`。
   * 调用线索：e.replace。
   */
  processUrl(t) {
    let e = t;
    for (const [t, i] of this._replacements) e = e.replace(`$${t}`, i);
    return e;
  }
  /** @eyes-analysis
   * 创建独立 Promise 和下载记录，按 priority 降序插入队列并尝试启动；URL 替换后是 actualUrl。此层本身不合并重复 URL 请求。
   * 调用线索：PioneerPublicApi.Sort.addObject、new Promise、this._checkDownloadQueue、this.processUrl。
   */
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
  /** @eyes-analysis
   * 仅调整仍在队列的请求，Math.max 保证优先级只提高；活动下载不重排。
   * 调用线索：Math.max、PioneerPublicApi.Sort.addObject、this._downloadQueue.findIndex、this._downloadQueue.splice。
   */
  updatePriority(t, e) {
    const i = this._downloadQueue.findIndex(e => e.url === t);
    if (-1 !== i) {
      const t = this._downloadQueue[i];
      t.priority = Math.max(t.priority, e);
      this._downloadQueue.splice(i, 1);
      PioneerPublicApi.Sort.addObject(t, this._downloadQueue, (t, e) => t.priority > e.priority, (t, e) => t.priority === e.priority);
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `createImageBitmap`、`createImageBitmap(xMLHttpRequest.response,{premultiplyAlpha:"none",colorSpaceConversion:"none"}).then`、`document.createElement`、`e.load`、`new XMLHttpRequest`、`t.actualUrl.match`。
   * 调用线索：createImageBitmap、createImageBitmap(xMLHttpRequest.response,{premultiplyAlpha:"none",colorSpaceConversion:"none"}).then、createImageBitmap(xMLHttpRequest.response,{premultiplyAlpha:"none",colorSpaceConversion:"none"}).then(e=>{t.isCanceled||this._completeDownload(t,e,i);}).catch、document.createElement、e.load等。
   */
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
  /** @eyes-analysis
   * 【结构证据】调用 `e`。
   * 调用线索：e。
   */
  _inProgressDownload(t, e) {
    const i = e.lengthComputable ? e.loaded / e.total : 0;
    const s = e.lengthComputable ? e.total : 0;
    for (const e of t.progressCallbacks) e(i, s);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.resolve`、`this._checkDownloadQueue`、`this._currentDownloads.delete`。
   * 调用线索：t.resolve、this._checkDownloadQueue、this._currentDownloads.delete。
   */
  _completeDownload(t, e, i) {
    this._currentDownloads.delete(t.actualUrl);
    t.resolve({
      actualUrl: t.actualUrl,
      content: e,
      mimeType: i
    });
    this._checkDownloadQueue();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `new Error`、`t.reject`、`this._checkDownloadQueue`、`this._currentDownloads.delete`。
   * 调用线索：new Error、t.reject、this._checkDownloadQueue、this._currentDownloads.delete。
   */
  _failDownload(t, e) {
    this._currentDownloads.delete(t.actualUrl);
    t.reject(new Error(e));
    this._checkDownloadQueue();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._currentDownloads.set`、`this._doRequest`、`this._downloadQueue.shift`。
   * 调用线索：this._currentDownloads.set、this._doRequest、this._downloadQueue.shift。
   */
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
