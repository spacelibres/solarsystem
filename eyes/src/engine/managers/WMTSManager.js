// Recovered from app.js:1241306-1244021.
/* WMTS 元数据先验证日期图层与样例瓦片 HEAD，再创建/配置组件；验证失败移除半成品并记录失败状态。验证请求与五秒超时竞争，原计时器不额外取消，所有服务路径与替换规则保持原样。 */
import "../pioneer/index.js";
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
class WMTSManager extends EyesPublicApi.BaseManager {
  constructor(app) {
    super(app);
    this._wmtsComponentStates = new Map();
    this.bindFunctions(["getWMTSComponentState", "initWMTS"]);
  }
  getWMTSComponentState(entityId) {
    return this._wmtsComponentStates.get(entityId);
  }
  setWMTSComponentState(entityId, componentState) {
    this._wmtsComponentStates.set(entityId, componentState);
  }
  getImageDate(requestedTime) {
    const date = new Date();
    if ("yesterday" === requestedTime) date.setDate(date.getDate() - 1);else if ("now" !== requestedTime) {
      console.warn("Invalid time parameter");
      return null;
    }
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
  }
  async verifyImageURL(endpoint, imageDate, tileMatrixSet) {
    try {
      const promise = new Promise((resolveTimeout, rejectTimeout) => {
        setTimeout(() => rejectTimeout(new Error("Image Server Timed Out")), 5e3);
      });
      const verificationPromise = (async () => {
        const capabilitiesXml = (await this.app.pioneer.getDownloader().download(endpoint + "/1.0.0/WMTSCapabilities.xml", "text", -1)).content;
        if ("string" != typeof capabilitiesXml) throw new Error("XML is not a string");
        const capabilitiesDocument = new DOMParser().parseFromString(capabilitiesXml, "application/xml");
        const tileUrl = capabilitiesDocument.querySelector("Contents > Layer ResourceURL")?.getAttribute("template").replace("{Time}", imageDate).replace("{TileMatrixSet}", tileMatrixSet).replace("{TileMatrix}", "0").replace("{TileRow}", "0").replace("{TileCol}", "0");
        if (!tileUrl) throw new Error("Template URL not found");
        const response = await fetch(tileUrl, {
          method: "HEAD"
        });
        if (!response.ok) throw new Error("Image URL fetch failed: " + response.status);
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.startsWith("image/")) throw new Error("Fetched resource is not an image.");
        return true;
      })();
      return await Promise.race([verificationPromise, promise]);
    } catch (verificationError) {
      console.error("Error verifying WMTS layer:", verificationError);
      return false;
    }
  }
  async getValidWMTSData(wmtsOptions) {
    const {
      wmtsManifest: wmtsManifest,
      time: time,
      fallbacks: fallbacks
    } = wmtsOptions;
    if (!wmtsManifest) return wmtsOptions;
    let manifest;
    try {
      const downloadedManifest = await this.app.pioneer.getDownloader().download(wmtsManifest, "text", -1);
      manifest = JSON.parse(downloadedManifest.content.toString());
    } catch (manifestError) {
      console.error("Error downloading or parsing wmtsManifest:", manifestError);
      return null;
    }
    const imageDate = this.getImageDate(time);
    const dateLayerInfo = manifest.availableDates[imageDate];
    if (!dateLayerInfo) {
      console.warn(`No layer info found for date ${imageDate}`);
      return null;
    }
    const endpoint = [wmtsOptions, ...fallbacks].find(candidateOptions => candidateOptions.layer === dateLayerInfo.layerId).endPoint;
    const layerId = dateLayerInfo.layerId;
    return (await this.verifyImageURL(endpoint, imageDate, wmtsOptions.tile)) ? {
      ...wmtsOptions,
      layer: layerId,
      endPoint: endpoint
    } : (console.warn(`Invalid layer for date ${imageDate}`), null);
  }
  async initWMTS(entityId, wmtsOptions) {
    const entity = this.app.pioneer.getScene("main").getEntity(entityId);
    let wmtsComponent = entity.getComponent(SolarSystemSceneExports.WMTSComponent);
    null === wmtsComponent && (wmtsComponent = entity.addComponent(SolarSystemSceneExports.WMTSComponent, wmtsOptions.id));
    wmtsComponent.setEnabled(false);
    const validOptions = await this.getValidWMTSData(wmtsOptions);
    if (!validOptions) {
      entity.removeComponent(wmtsComponent);
      this.setWMTSComponentState(entityId, false);
      return null;
    }
    wmtsComponent.setEndPoint(validOptions.endPoint);
    wmtsComponent.setLayer(validOptions.layer);
    validOptions.tile && wmtsComponent.setTileMatrixSet(validOptions.tile);
    const imageDate = this.getImageDate(validOptions.time);
    wmtsComponent.setDimensionValue("Time", imageDate);
    wmtsComponent.setMaxLevel(validOptions.level || 1 / 0);
    wmtsComponent.setMinLevel(2);
    this.setWMTSComponentState(entityId, true);
    return wmtsComponent;
  }
}
export { WMTSManager };
