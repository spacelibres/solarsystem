// Recovered from app.js:160398-165086.
import * as PioneerPublicApi from "../pioneer/public-api.js";
// 下载器按优先级排队，以替换后的 actualUrl 跟踪活动请求；记录拥有独立 Promise，完成、失败或取消后让出并发槽位。
class Downloader {
  constructor() {
    this._replacements = new Map();
    this._replacementTypes = new Map();
    this._currentDownloads = new Map();
    this._downloadQueue = [];
    this._maxCurrentDownloads = 20;
  }
  getReplacement(replacementName) {
    return this._replacements.get(replacementName);
  }
  setReplacement(replacementName, replacement) {
    this._replacements.set(replacementName, replacement);
  }
  getReplacementType(url) {
    return this._replacementTypes.get(url);
  }
  setReplacementType(url, type) {
    void 0 !== type ? this._replacementTypes.set(url, type) : this._replacementTypes.delete(url);
  }
  // XHR 活动请求可 abort；排队请求直接移除。图片和视频分支的取消能力保持原行为，未补造统一取消接口。
  cancel(url) {
    const actualUrl = this.processUrl(url);
    let download = this._currentDownloads.get(actualUrl);
    if (download?.request) {
      this._currentDownloads.delete(download.actualUrl);
      download.request.abort();
    } else {
      const queueIndex = this._downloadQueue.findIndex(queuedDownload => queuedDownload.actualUrl === actualUrl);
      if (-1 === queueIndex) throw new Error(`Couldn't cancel ${url}, not actively downloading or in queue.`);
      download = this._downloadQueue[queueIndex];
      this._downloadQueue.splice(queueIndex, 1);
    }
    download.isCanceled = true;
    download.reject(new PioneerPublicApi.CanceledError());
    this._checkDownloadQueue();
  }
  processUrl(url) {
    let actualUrl = url;
    for (const [replacementName, replacement] of this._replacements) actualUrl = actualUrl.replace(`$${replacementName}`, replacement);
    return actualUrl;
  }
  async download(url, type, priority, onProgress) {
    const actualUrl = this.processUrl(url);
    let resolveDownload;
    let rejectDownload;
    const promise = new Promise((resolve, reject) => {
      resolveDownload = resolve;
      rejectDownload = reject;
    });
    const download = {
      url: url,
      actualUrl: actualUrl,
      priority: priority,
      type: type,
      isCanceled: false,
      resolve: resolveDownload,
      reject: rejectDownload,
      progressCallbacks: onProgress ? [onProgress] : [],
      request: null,
      promise: promise
    };
    PioneerPublicApi.Sort.addObject(download, this._downloadQueue, (leftDownload, rightDownload) => leftDownload.priority > rightDownload.priority, (leftDownload, rightDownload) => leftDownload.priority === rightDownload.priority);
    this._checkDownloadQueue();
    return download.promise;
  }
  // 仅提升尚在队列的优先级，活动请求不重排；Math.max 保留已经取得的较高优先级。
  updatePriority(url, priority) {
    const queueIndex = this._downloadQueue.findIndex(queuedDownload => queuedDownload.url === url);
    if (-1 !== queueIndex) {
      const download = this._downloadQueue[queueIndex];
      download.priority = Math.max(download.priority, priority);
      this._downloadQueue.splice(queueIndex, 1);
      PioneerPublicApi.Sort.addObject(download, this._downloadQueue, (leftDownload, rightDownload) => leftDownload.priority > rightDownload.priority, (leftDownload, rightDownload) => leftDownload.priority === rightDownload.priority);
    }
  }
  // 文本/二进制使用 XHR，图片/视频使用 DOM 元素，位图先下载 Blob 再异步解码；位图解码完成前仍占活动槽位。
  _doRequest(download) {
    const type = this._replacementTypes.get(download.url) ?? download.type;
    if ("binary" === type || "text" === type) {
      const xMLHttpRequest = new XMLHttpRequest();
      xMLHttpRequest.onload = () => {
        200 <= xMLHttpRequest.status && xMLHttpRequest.status <= 299 ? this._completeDownload(download, xMLHttpRequest.response, xMLHttpRequest.getResponseHeader("Content-Type") ?? "application/octet-stream") : this._failDownload(download, `Failed to download "${download.actualUrl}" (${xMLHttpRequest.status} ${xMLHttpRequest.statusText}).`);
      };
      xMLHttpRequest.onprogress = event => {
        this._inProgressDownload(download, event);
      };
      xMLHttpRequest.onerror = () => {
        this._failDownload(download, `Failed to download "${download.actualUrl}".`);
      };
      xMLHttpRequest.responseType = "binary" === type ? "arraybuffer" : "text";
      download.request = xMLHttpRequest;
      xMLHttpRequest.open("GET", download.actualUrl);
      xMLHttpRequest.send();
    } else if ("image" === type) {
      const image = document.createElement("img");
      image.onload = () => {
        const extension = download.actualUrl.match(/\.([^.]+)$/u)?.[1] ?? "";
        this._completeDownload(download, image, Downloader._mimeTypes[extension] ?? "application/octet-stream");
      };
      image.onerror = () => {
        this._failDownload(download, `Failed to download "${download.actualUrl}".`);
      };
      image.crossOrigin = "anonymous";
      image.src = download.actualUrl;
    } else if ("video" === type) {
      const video = document.createElement("video");
      const onReady = () => {
        const extension = download.actualUrl.match(/\.([^.]+)$/u)?.[1] ?? "";
        this._completeDownload(download, video, Downloader._mimeTypes[extension] ?? "application/octet-stream");
      };
      video.onload = onReady;
      video.oncanplaythrough = onReady;
      video.onprogress = event => {
        this._inProgressDownload(download, event);
      };
      video.onerror = () => {
        this._failDownload(download, `Failed to download "${download.actualUrl}".`);
      };
      video.muted = true;
      video.playsInline = true;
      video.loop = false;
      video.crossOrigin = "anonymous";
      video.src = download.actualUrl;
      video.load();
    } else {
      const xMLHttpRequest = new XMLHttpRequest();
      xMLHttpRequest.onload = () => {
        if (200 <= xMLHttpRequest.status && xMLHttpRequest.status <= 299) {
          const mimeType = xMLHttpRequest.getResponseHeader("Content-Type") ?? "application/octet-stream";
          createImageBitmap(xMLHttpRequest.response, {
            premultiplyAlpha: "none",
            colorSpaceConversion: "none"
          }).then(bitmap => {
            download.isCanceled || this._completeDownload(download, bitmap, mimeType);
          }).catch(error => {
            this._failDownload(download, `Failed to download "${download.actualUrl}" (${error instanceof Error ? error.message : "Unknown error"}).`);
          });
        } else this._failDownload(download, `Failed to download "${download.actualUrl}" (${xMLHttpRequest.status} ${xMLHttpRequest.statusText}).`);
      };
      xMLHttpRequest.onprogress = event => {
        this._inProgressDownload(download, event);
      };
      xMLHttpRequest.onerror = () => {
        this._failDownload(download, `Failed to download "${download.actualUrl}".`);
      };
      download.request = xMLHttpRequest;
      xMLHttpRequest.responseType = "blob";
      xMLHttpRequest.open("GET", download.actualUrl);
      xMLHttpRequest.send();
    }
  }
  _inProgressDownload(download, event) {
    const progress = event.lengthComputable ? event.loaded / event.total : 0;
    const totalBytes = event.lengthComputable ? event.total : 0;
    for (const onProgress of download.progressCallbacks) onProgress(progress, totalBytes);
  }
  // 先移除活动记录并兑现调用者，再尝试启动一个排队请求；资源共享与引用计数属于上层 ResourceManager。
  _completeDownload(download, content, mimeType) {
    this._currentDownloads.delete(download.actualUrl);
    download.resolve({
      actualUrl: download.actualUrl,
      content: content,
      mimeType: mimeType
    });
    this._checkDownloadQueue();
  }
  _failDownload(download, message) {
    this._currentDownloads.delete(download.actualUrl);
    download.reject(new Error(message));
    this._checkDownloadQueue();
  }
  _checkDownloadQueue() {
    if (this._currentDownloads.size < this._maxCurrentDownloads) {
      const download = this._downloadQueue.shift();
      download && (this._currentDownloads.set(download.actualUrl, download), this._doRequest(download));
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
