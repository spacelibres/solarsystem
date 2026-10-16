/** @eyes-analysis
 * 文件职责：解析 WMTS Capabilities XML，提取 Layer 与 TileMatrixSet 的图层、维度、坐标矩阵和资源模板。
 * 依据：import ../pioneer/index.js；import ../../vendor/modules/Unidentified585.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:777992-786118.
import * as Pioneer from "../pioneer/index.js";
import * as Unidentified585 from "../../vendor/modules/Unidentified585.js";
/** @eyes-analysis
 * 类职责：解析 WMTS Capabilities XML，提取 Layer 与 TileMatrixSet 的图层、维度、坐标矩阵和资源模板。
 * 继承：无显式父类；导出：Capabilities。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Capabilities {
  endPoint;
  layers;
  readyPromise;
  /** @eyes-analysis
   * 【结构证据】写入 `_capabilitiesXML`、`endPoint`、`layers`、`readyPromise`；调用 `e.getDownloader`、`e.getDownloader().download`、`e.getDownloader().download(s,"text",i).then`、`new DOMParser`、`new DOMParser().parseFromString`、`new Document`；含显式错误分支。
   * 状态写入：_capabilitiesXML、endPoint、layers、readyPromise。
   * 调用线索：e.getDownloader、e.getDownloader().download、e.getDownloader().download(s,"text",i).then、new DOMParser、new DOMParser().parseFromString等。
   */
  constructor(endPoint, e, i) {
    this.endPoint = endPoint;
    this.layers = new Map();
    this._capabilitiesXML = new Document();
    const s = `${this.endPoint}/1.0.0/WMTSCapabilities.xml`;
    this.readyPromise = e.getDownloader().download(s, "text", i).then(t => {
      this._capabilitiesXML = new DOMParser().parseFromString(t.content, "application/xml");
      const e = this._capabilitiesXML.querySelectorAll("Contents > Layer");
      for (const t of e) {
        const e = t.querySelector("*|Title");
        const i = t.querySelector("*|Identifier");
        if (!e || !i) throw new Error(`Malformed WMTSCapabilities.xml at ${s}`);
        this.layers.set(e.textContent, i.textContent);
      }
    });
  }
  /** @eyes-analysis
   * 【结构证据】返回 `e`；调用 `new Layer`、`s.querySelector`、`this._capabilitiesXML.querySelectorAll`。
   * 调用线索：new Layer、s.querySelector、this._capabilitiesXML.querySelectorAll。
   */
  getLayer(t) {
    let e = null;
    const i = this._capabilitiesXML.querySelectorAll("Contents > Layer");
    for (const s of i) {
      const i = s.querySelector("*|Identifier");
      if (!i) continue;
      t === i.textContent && (e = new Layer(s, `${this.endPoint}/1.0.0`));
    }
    return e;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `e`；调用 `new TileMatrixSet`、`s.querySelector`、`this._capabilitiesXML.querySelectorAll`。
   * 调用线索：new TileMatrixSet、s.querySelector、this._capabilitiesXML.querySelectorAll。
   */
  getTileMatrixSet(t) {
    let e = null;
    const i = this._capabilitiesXML.querySelectorAll("Contents > TileMatrixSet");
    for (const s of i) {
      const i = s.querySelector("*|Identifier");
      if (!i) continue;
      t === i.textContent && (e = new TileMatrixSet(s));
    }
    return e;
  }
  _capabilitiesXML;
}
/** @eyes-analysis
 * 类职责：WMTS XML 图层：标识、格式、维度和资源模板。
 * 继承：无显式父类；导出：Layer。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Layer {
  title;
  identifier;
  defaultStyle;
  boundingBox;
  dimensions;
  tileMatrixSets;
  url;
  /** @eyes-analysis
   * 【结构证据】写入 `_baseUrl`、`boundingBox`、`defaultStyle`、`dimensions`、`identifier`、`tileMatrixSets`、`title`、`url`；调用 `/^(?:[a-z]+:)?\/\//iu.test`、`Number.parseFloat`、`a.textContent.split`、`l.textContent.split`、`new Error`、`new Map`；含显式错误分支。
   * 状态写入：_baseUrl、boundingBox、defaultStyle、dimensions、identifier、tileMatrixSets、title、url。
   * 调用线索：/^(?:[a-z]+:)?\/\//iu.test、Number.parseFloat、a.textContent.split、l.textContent.split、new Error等。
   */
  constructor(t, baseUrl) {
    const i = t.querySelector("*|Title");
    if (!i) throw new Error(`Malformed WMTSCapabilities.xml at ${baseUrl}`);
    const n = t.querySelector("*|Identifier");
    if (!n) throw new Error(`Malformed WMTSCapabilities.xml at ${baseUrl}`);
    this.title = i.textContent;
    this.identifier = n.textContent;
    this.defaultStyle = "";
    this.boundingBox = new Pioneer.Rect();
    this.dimensions = new Map();
    this.tileMatrixSets = new Set();
    this.url = "";
    this._baseUrl = baseUrl;
    const o = t.querySelectorAll("Style");
    for (const t of o) {
      const e = t.querySelector("*|Identifier");
      if (!e) continue;
      const defaultStyle = e.textContent;
      "true" === t.getAttribute("isDefault") && (this.defaultStyle = defaultStyle);
    }
    let r = t.querySelector("*|BoundingBox");
    if (r ??= t.querySelector("*|WGS84BoundingBox"), null === r) throw new Error(`Layer "${this.identifier}" missing a BoundingBox or a WGS84BoundingBox tag.`);
    const a = r.querySelector("*|LowerCorner");
    const l = r.querySelector("*|UpperCorner");
    if (!a || !l) throw new Error(`Layer "${this.identifier}" missing BoundingBox or WGS84BoundingBox corners.`);
    const c = a.textContent.split(" ");
    const h = l.textContent.split(" ");
    if (c.length < 2 || h.length < 2) throw new Error(`Layer "${this.identifier}" has invalid BoundingBox or WGS84BoundingBox corners.`);
    if (this.boundingBox.origin.set(Number.parseFloat(c[0]), Number.parseFloat(c[1])), this.boundingBox.size.set(Number.parseFloat(h[0]) - this.boundingBox.origin.x, Number.parseFloat(h[1]) - this.boundingBox.origin.y), this.boundingBox.origin.isNaN() || this.boundingBox.size.isNaN()) throw new Error(`Layer "${this.identifier}" has invalid BoundingBox or WGS84BoundingBox corners.`);
    const d = t.querySelectorAll("Dimension");
    for (const t of d) {
      const e = t.querySelector("*|Identifier");
      const i = t.querySelector("Default");
      if (!e || !i) continue;
      const s = e.textContent;
      const n = i.textContent;
      this.dimensions.set(s, n);
    }
    const u = t.querySelectorAll("TileMatrixSetLink");
    for (const t of u) {
      const e = t.querySelector("TileMatrixSet");
      if (!e) continue;
      const i = e.textContent;
      this.tileMatrixSets.add(i);
    }
    const p = t.querySelector("ResourceURL");
    if (!p) throw new Error(`Layer "${this.identifier}" missing ResourceURL.`);
    const url = p.getAttribute("template");
    if (null === url) throw new Error(`Layer "${this.identifier}" missing ResourceURL template attribute.`);
    this.url = url;
    /^(?:[a-z]+:)?\/\//iu.test(this.url) || (this.url = this._baseUrl + this.url);
  }
  _baseUrl;
}
/** @eyes-analysis
 * 类职责：WMTS 坐标矩阵集合及每级矩阵尺寸。
 * 继承：无显式父类；导出：TileMatrixSet。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class TileMatrixSet {
  identifier;
  boundingBox;
  readyPromise;
  numLevels;
  maxPixelSize;
  /** @eyes-analysis
   * 【结构证据】写入 `_crs`、`_numTiles`、`_numTiles[numLevels]`、`boundingBox`、`boundingBox.origin.y`、`boundingBox.size.x`、`boundingBox.size.y`、`identifier`；调用 `Math.abs`、`Math.max`、`Math.round`、`Number.parseFloat`、`Promise.resolve`、`TileMatrixSet.setCRS`；含显式错误分支。
   * 状态写入：_crs、_numTiles、_numTiles[numLevels]、boundingBox、boundingBox.origin.y、boundingBox.size.x、boundingBox.size.y、identifier等；完整记录见索引。
   * 调用线索：Math.abs、Math.max、Math.round、Number.parseFloat、Promise.resolve等。
   */
  constructor(t) {
    this.boundingBox = new Pioneer.Rect();
    this.readyPromise = Promise.resolve();
    this.numLevels = 0;
    this._numTiles = [];
    const e = t.querySelector("*|Identifier");
    if (!e) throw new Error("TileMatrixSet missing identifier.");
    this.identifier = e.textContent;
    const i = t.querySelector("*|SupportedCRS");
    if (!i) throw new Error(`TileMatrixSet ${this.identifier} missing SupportedCRS.`);
    let o;
    this._crs = i.textContent;
    let numLevels = 0;
    for (const e of t.querySelectorAll("TileMatrix")) {
      const t = e.querySelector("ScaleDenominator");
      if (!t) throw new Error(`ScaleDenominator tag not found for TileMatrix ${numLevels} of TileMatrixSet ${this.identifier}.`);
      const i = parseFloat(t.innerHTML);
      if (void 0 !== o && Math.abs(2 * i - o) / i > .01) throw new Error(`ScaleDenominator for TileMatrix ${numLevels} of TileMatrixSet ${this.identifier} must be half of the next higher level, but is not.`);
      o = i;
      const n = e.querySelector("MatrixWidth");
      const a = e.querySelector("MatrixHeight");
      if (!n || !a) throw new Error(`MatrixWidth or MatrixHeight tag not found for TileMatrix ${numLevels} of TileMatrixSet ${this.identifier}.`);
      this._numTiles[numLevels] = new Pioneer.Vector2(parseFloat(n.innerHTML), parseFloat(a.innerHTML));
      numLevels += 1;
    }
    if (this.numLevels = numLevels, 0 === this._numTiles.length) throw new Error(`There are no levels found for TileMatrixSet ${this.identifier}.`);
    const a = t.querySelector("TileMatrix");
    if (!a) throw new Error(`TileMatrix tag not found for TileMatrixSet ${this.identifier}.`);
    const l = a.querySelector("ScaleDenominator");
    if (!l) throw new Error(`ScaleDenominator tag not found for TileMatrixSet ${this.identifier} level 0.`);
    const c = Number.parseFloat(l.textContent);
    const h = a.querySelector("TileWidth");
    if (!h) throw new Error(`TileWidth tag not found for TileMatrixSet ${this.identifier} level 0.`);
    const d = a.querySelector("TileHeight");
    if (!d) throw new Error(`TileHeight tag not found for TileMatrixSet ${this.identifier} level 0.`);
    const vector2 = new Pioneer.Vector2(Number.parseFloat(h.textContent), Number.parseFloat(d.textContent));
    this.maxPixelSize = Math.max(vector2.x, vector2.y);
    const p = 28e-8 * c;
    const _ = new Pioneer.Vector2(p * vector2.x, p * vector2.y);
    const m = new Pioneer.Vector2(_.x * this._numTiles[0].x, _.y * this._numTiles[0].y);
    const g = a.querySelector("TopLeftCorner");
    if (!g) throw new Error(`TopLeftCorner tag not found for TileMatrix ${numLevels} of TileMatrixSet ${this.identifier}.`);
    const y = g.textContent.split(" ");
    if (y.length < 2) throw new Error(`TopLeftCorner tag is invalid for TileMatrix ${numLevels} of TileMatrixSet ${this.identifier}.`);
    if (this.boundingBox.origin.set(Number.parseFloat(y[0]), Number.parseFloat(y[1])), this.boundingBox.origin.isNaN()) throw new Error(`TopLeftCorner tag is invalid for TileMatrix ${numLevels} of TileMatrixSet ${this.identifier}.`);
    this.readyPromise = TileMatrixSet.setCRS(this._crs).then(crs => {
      this._crs = crs;
      let e = 1e3;
      const i = Unidentified585.default.defs(this._crs);
      void 0 !== i.to_meter ? e = 1e3 / i.to_meter : "degrees" === i.units ? e = .00898315284 : "feet" !== i.units && "us feet" !== i.units || (e = 3280.83333335);
      this.boundingBox.size.x = Math.round(m.x * e * 1e6) / 1e6;
      this.boundingBox.size.y = Math.round(m.y * e * 1e6) / 1e6;
      this.boundingBox.origin.y -= this.boundingBox.size.y;
    });
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._numTiles[t]`。
   */
  getNumTiles(t) {
    return this._numTiles[t];
  }
  /** @eyes-analysis
   * 【结构证据】调用 `0,Unidentified585.default`、`Pioneer.MathUtils.clamp`、`Pioneer.MathUtils.degToRad`、`Pioneer.MathUtils.wrapAngle`、`t.set`。
   * 调用线索：0,Unidentified585.default、Pioneer.MathUtils.clamp、Pioneer.MathUtils.degToRad、Pioneer.MathUtils.wrapAngle、t.set。
   */
  crsUnitsToLLA(t, e) {
    const i = Pioneer.MathUtils.clamp(e.x, this.boundingBox.origin.x, this.boundingBox.origin.x + this.boundingBox.size.x);
    const o = Pioneer.MathUtils.clamp(e.y, this.boundingBox.origin.y, this.boundingBox.origin.y + this.boundingBox.size.y);
    const r = (0, Unidentified585.default)(this._crs, "WGS84", [i, o]);
    t.set(Pioneer.MathUtils.degToRad(Pioneer.MathUtils.clamp(r[1], -90, 90)), Pioneer.MathUtils.wrapAngle(Pioneer.MathUtils.degToRad(r[0])), 0);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t`；调用 `TileMatrixSet.crsToWKT.get`、`Unidentified585.default.defs`、`fetch`、`new Error`、`s.text`、`t.match`；含显式错误分支。
   * 调用线索：TileMatrixSet.crsToWKT.get、Unidentified585.default.defs、fetch、new Error、s.text等。
   */
  static async setCRS(t) {
    t.startsWith("urn:ogc:def:crs:") && (t = t.substring(16));
    let e = TileMatrixSet.crsToWKT.get(t);
    if (void 0 === e) {
      const i = t.match(/EPSG:[0-9.]*:(\d+)/u);
      if (!i) throw new Error("Only CRS starting with EPSG: supported.");
      {
        const t = `https://epsg.io/${i[1]}.proj4`;
        const s = await fetch(t);
        e = await s.text();
      }
    }
    Unidentified585.default.defs(t, e);
    return t;
  }
  _crs;
  _numTiles;
  static crsToWKT = new Map([["EPSG::104903", 'GEOGCS["GCS_Moon_2000",DATUM["D_Moon_2000",SPHEROID["Moon_2000_IAU_IAG",1737400.0,0.0]],PRIMEM["Reference_Meridian",0.0],UNIT["Degree",0.0174532925199433]]'], ["EPSG::104905", 'GEOGCS["GCS_Mars_2000",DATUM["D_Mars_2000",SPHEROID["Mars_2000_IAU_IAG",3396190.0,169.8944472236118]],PRIMEM["Reference_Meridian",0.0],UNIT["Degree",0.0174532925199433]]'], ["EPSG::4326", "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs"], ["EPSG::3857", "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs"], ["OGC:1.3:84", Unidentified585.default.defs("WGS84")], ["OGC:1.3:CRS84", Unidentified585.default.defs("WGS84")], ["OGC:2:84", Unidentified585.default.defs("WGS84")]]);
}
export { Capabilities };
export { Layer };
export { TileMatrixSet };
