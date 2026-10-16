// Recovered from app.js:1241306-1244021.
import "../pioneer/index.js";
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
class WMTSManager extends EyesPublicApi.BaseManager {
  constructor(t) {
    super(t);
    this._wmtsComponentStates = new Map();
    this.bindFunctions(["getWMTSComponentState", "initWMTS"]);
  }
  getWMTSComponentState(t) {
    return this._wmtsComponentStates.get(t);
  }
  setWMTSComponentState(t, e) {
    this._wmtsComponentStates.set(t, e);
  }
  getImageDate(t) {
    const date = new Date();
    if ("yesterday" === t) date.setDate(date.getDate() - 1);else if ("now" !== t) {
      console.warn("Invalid time parameter");
      return null;
    }
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
  }
  async verifyImageURL(t, e, i) {
    try {
      const promise = new Promise((t, e) => {
        setTimeout(() => e(new Error("Image Server Timed Out")), 5e3);
      });
      const n = (async () => {
        const s = (await this.app.pioneer.getDownloader().download(t + "/1.0.0/WMTSCapabilities.xml", "text", -1)).content;
        if ("string" != typeof s) throw new Error("XML is not a string");
        const n = new DOMParser().parseFromString(s, "application/xml");
        const o = n.querySelector("Contents > Layer ResourceURL")?.getAttribute("template").replace("{Time}", e).replace("{TileMatrixSet}", i).replace("{TileMatrix}", "0").replace("{TileRow}", "0").replace("{TileCol}", "0");
        if (!o) throw new Error("Template URL not found");
        const r = await fetch(o, {
          method: "HEAD"
        });
        if (!r.ok) throw new Error("Image URL fetch failed: " + r.status);
        const a = r.headers.get("content-type");
        if (!a || !a.startsWith("image/")) throw new Error("Fetched resource is not an image.");
        return true;
      })();
      return await Promise.race([n, promise]);
    } catch (t) {
      console.error("Error verifying WMTS layer:", t);
      return false;
    }
  }
  async getValidWMTSData(t) {
    const {
      wmtsManifest: wmtsManifest,
      time: time,
      fallbacks: fallbacks
    } = t;
    if (!wmtsManifest) return t;
    let n;
    try {
      const t = await this.app.pioneer.getDownloader().download(wmtsManifest, "text", -1);
      n = JSON.parse(t.content.toString());
    } catch (t) {
      console.error("Error downloading or parsing wmtsManifest:", t);
      return null;
    }
    const o = this.getImageDate(time);
    const r = n.availableDates[o];
    if (!r) {
      console.warn(`No layer info found for date ${o}`);
      return null;
    }
    const a = [t, ...fallbacks].find(t => t.layer === r.layerId).endPoint;
    const l = r.layerId;
    return (await this.verifyImageURL(a, o, t.tile)) ? {
      ...t,
      layer: l,
      endPoint: a
    } : (console.warn(`Invalid layer for date ${o}`), null);
  }
  async initWMTS(t, e) {
    const i = this.app.pioneer.getScene("main").getEntity(t);
    let n = i.getComponent(SolarSystemSceneExports.WMTSComponent);
    null === n && (n = i.addComponent(SolarSystemSceneExports.WMTSComponent, e.id));
    n.setEnabled(false);
    const o = await this.getValidWMTSData(e);
    if (!o) {
      i.removeComponent(n);
      this.setWMTSComponentState(t, false);
      return null;
    }
    n.setEndPoint(o.endPoint);
    n.setLayer(o.layer);
    o.tile && n.setTileMatrixSet(o.tile);
    const r = this.getImageDate(o.time);
    n.setDimensionValue("Time", r);
    n.setMaxLevel(o.level || 1 / 0);
    n.setMinLevel(2);
    this.setWMTSComponentState(t, true);
    return n;
  }
}
export { WMTSManager };
