/** @eyes-analysis
 * 文件职责：获取 WMTS 配置，核验日期与后备图源，创建并配置 WMTSComponent。
 * 依据：import ../pioneer/index.js；import ../solar-system/public-api.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1241306-1244021.
import "../pioneer/index.js";
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
/** @eyes-analysis
 * 类职责：获取 WMTS 配置，核验日期与后备图源，创建并配置 WMTSComponent。
 * 继承：EyesPublicApi.BaseManager；导出：WMTSManager。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class WMTSManager extends EyesPublicApi.BaseManager {
  /** @eyes-analysis
   * 【结构证据】写入 `_wmtsComponentStates`；调用 `new Map`、`super`、`this.bindFunctions`。
   * 状态写入：_wmtsComponentStates。
   * 调用线索：new Map、super、this.bindFunctions。
   */
  constructor(t) {
    super(t);
    this._wmtsComponentStates = new Map();
    this.bindFunctions(["getWMTSComponentState", "initWMTS"]);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._wmtsComponentStates.get(t)`；调用 `this._wmtsComponentStates.get`。
   * 调用线索：this._wmtsComponentStates.get。
   */
  getWMTSComponentState(t) {
    return this._wmtsComponentStates.get(t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._wmtsComponentStates.set`。
   * 调用线索：this._wmtsComponentStates.set。
   */
  setWMTSComponentState(t, e) {
    this._wmtsComponentStates.set(t, e);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `null` 或 `date.getFullYear()+"-"+String(date.getMonth()+1).padStart(2,"0")+"-"+String(date.getDate()).padStart(2,"0")`；调用 `String`、`String(date.getDate()).padStart`、`String(date.getMonth()+1).padStart`、`console.warn`、`date.getDate`、`date.getFullYear`。
   * 调用线索：String、String(date.getDate()).padStart、String(date.getMonth()+1).padStart、console.warn、date.getDate等。
   */
  getImageDate(t) {
    const date = new Date();
    if ("yesterday" === t) date.setDate(date.getDate() - 1);else if ("now" !== t) {
      console.warn("Invalid time parameter");
      return null;
    }
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
  }
  /** @eyes-analysis
   * 【结构证据】返回 `await Promise.race([n,promise])` 或 `false`；调用 `Promise.race`、`a.startsWith`、`console.error`、`e`、`fetch`、`n.querySelector`；含显式错误分支。
   * 调用线索：Promise.race、a.startsWith、async()=>{const s=(await this.app.pioneer.getDownloader().download(t+"/1.0.0/WMTSCapabilities.xml","text",-1)).content;if("string"!=typeof s)throw new Error("XML is not a string");const n=new DOMParser().parseFromString(s,"application/xml");const o=n.querySelector("Contents > Layer ResourceURL")?.getAttribute("template").replace("{Time}",e).replace("{TileMatrixSet}",i).replace("{TileMatrix}","0").replace("{TileRow}","0").replace("{TileCol}","0");if(!o)throw new Error("Template URL not found");const r=await fetch(o,{method:"HEAD"});if(!r.ok)throw new Error("Image URL fetch failed: "+r.status);const a=r.headers.get("content-type");if(!a||!a.startsWith("image/"))t…
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `t` 或 `null`；调用 `JSON.parse`、`[t,...fallbacks].find`、`console.error`、`console.warn`、`t.content.toString`、`this.app.pioneer.getDownloader`。
   * 调用线索：JSON.parse、[t,...fallbacks].find、console.error、console.warn、t.content.toString等。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `null` 或 `n`；调用 `i.addComponent`、`i.getComponent`、`i.removeComponent`、`n.setDimensionValue`、`n.setEnabled`、`n.setEndPoint`。
   * 调用线索：i.addComponent、i.getComponent、i.removeComponent、n.setDimensionValue、n.setEnabled等。
   */
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
