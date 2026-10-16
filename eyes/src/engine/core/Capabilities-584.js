// WMTS 能力解析器区分 Layer 与 TileMatrixSet，验证比例尺逐级减半并从左上角/矩阵尺寸构造 bounds；CRS 坐标先裁剪再投影成弧度 LLA，未知 EPSG 定义按原 URL 在线取得，不更改地图协议。
// Recovered from app.js:777992-786118.
import * as Pioneer from "../pioneer/index.js";
import * as Unidentified585 from "../../vendor/modules/Unidentified585.js";
class Capabilities {
  endPoint;
  layers;
  readyPromise;
  constructor(endPoint, engine, priority) {
    this.endPoint = endPoint;
    this.layers = new Map();
    this._capabilitiesXML = new Document();
    const capabilitiesUrl = `${this.endPoint}/1.0.0/WMTSCapabilities.xml`;
    this.readyPromise = engine.getDownloader().download(capabilitiesUrl, "text", priority).then(download => {
      this._capabilitiesXML = new DOMParser().parseFromString(download.content, "application/xml");
      const layerNodes = this._capabilitiesXML.querySelectorAll("Contents > Layer");
      for (const layerNode of layerNodes) {
        const titleNode = layerNode.querySelector("*|Title");
        const identifierNode = layerNode.querySelector("*|Identifier");
        if (!titleNode || !identifierNode) throw new Error(`Malformed WMTSCapabilities.xml at ${capabilitiesUrl}`);
        this.layers.set(titleNode.textContent, identifierNode.textContent);
      }
    });
  }
  getLayer(identifier) {
    let layer = null;
    const layerNodes = this._capabilitiesXML.querySelectorAll("Contents > Layer");
    for (const layerNode of layerNodes) {
      const identifierNode = layerNode.querySelector("*|Identifier");
      if (!identifierNode) continue;
      if (identifier === identifierNode.textContent) {
        layer = new Layer(layerNode, `${this.endPoint}/1.0.0`);
      }
    }
    return layer;
  }
  getTileMatrixSet(identifier) {
    let matrixSet = null;
    const matrixSetNodes = this._capabilitiesXML.querySelectorAll("Contents > TileMatrixSet");
    for (const matrixSetNode of matrixSetNodes) {
      const identifierNode = matrixSetNode.querySelector("*|Identifier");
      if (!identifierNode) continue;
      if (identifier === identifierNode.textContent) {
        matrixSet = new TileMatrixSet(matrixSetNode);
      }
    }
    return matrixSet;
  }
  _capabilitiesXML;
}
class Layer {
  title;
  identifier;
  defaultStyle;
  boundingBox;
  dimensions;
  tileMatrixSets;
  url;
  constructor(layerNode, baseUrl) {
    const titleNode = layerNode.querySelector("*|Title");
    if (!titleNode) throw new Error(`Malformed WMTSCapabilities.xml at ${baseUrl}`);
    const identifierNode = layerNode.querySelector("*|Identifier");
    if (!identifierNode) throw new Error(`Malformed WMTSCapabilities.xml at ${baseUrl}`);
    this.title = titleNode.textContent;
    this.identifier = identifierNode.textContent;
    this.defaultStyle = "";
    this.boundingBox = new Pioneer.Rect();
    this.dimensions = new Map();
    this.tileMatrixSets = new Set();
    this.url = "";
    this._baseUrl = baseUrl;
    const styleNodes = layerNode.querySelectorAll("Style");
    for (const styleNode of styleNodes) {
      const styleIdentifierNode = styleNode.querySelector("*|Identifier");
      if (!styleIdentifierNode) continue;
      const defaultStyle = styleIdentifierNode.textContent;
      if ("true" === styleNode.getAttribute("isDefault")) {
        this.defaultStyle = defaultStyle;
      }
    }
    let boundsNode = layerNode.querySelector("*|BoundingBox");
    boundsNode ??= layerNode.querySelector("*|WGS84BoundingBox");
    if (null === boundsNode) throw new Error(`Layer "${this.identifier}" missing a BoundingBox or a WGS84BoundingBox tag.`);
    const lowerCorner = boundsNode.querySelector("*|LowerCorner");
    const upperCorner = boundsNode.querySelector("*|UpperCorner");
    if (!lowerCorner || !upperCorner) throw new Error(`Layer "${this.identifier}" missing BoundingBox or WGS84BoundingBox corners.`);
    const lowerValues = lowerCorner.textContent.split(" ");
    const upperValues = upperCorner.textContent.split(" ");
    if (lowerValues.length < 2 || upperValues.length < 2) throw new Error(`Layer "${this.identifier}" has invalid BoundingBox or WGS84BoundingBox corners.`);
    this.boundingBox.origin.set(Number.parseFloat(lowerValues[0]), Number.parseFloat(lowerValues[1]));
    this.boundingBox.size.set(Number.parseFloat(upperValues[0]) - this.boundingBox.origin.x, Number.parseFloat(upperValues[1]) - this.boundingBox.origin.y);
    if (this.boundingBox.origin.isNaN() || this.boundingBox.size.isNaN()) throw new Error(`Layer "${this.identifier}" has invalid BoundingBox or WGS84BoundingBox corners.`);
    const dimensionNodes = layerNode.querySelectorAll("Dimension");
    for (const dimensionNode of dimensionNodes) {
      const identifierNode = dimensionNode.querySelector("*|Identifier");
      const defaultNode = dimensionNode.querySelector("Default");
      if (!identifierNode || !defaultNode) continue;
      const dimensionName = identifierNode.textContent;
      const defaultValue = defaultNode.textContent;
      this.dimensions.set(dimensionName, defaultValue);
    }
    const linkNodes = layerNode.querySelectorAll("TileMatrixSetLink");
    for (const linkNode of linkNodes) {
      const matrixSetNode = linkNode.querySelector("TileMatrixSet");
      if (!matrixSetNode) continue;
      const matrixSetName = matrixSetNode.textContent;
      this.tileMatrixSets.add(matrixSetName);
    }
    const resourceNode = layerNode.querySelector("ResourceURL");
    if (!resourceNode) throw new Error(`Layer "${this.identifier}" missing ResourceURL.`);
    const url = resourceNode.getAttribute("template");
    if (null === url) throw new Error(`Layer "${this.identifier}" missing ResourceURL template attribute.`);
    this.url = url;
    if (!/^(?:[a-z]+:)?\/\//iu.test(this.url)) {
      this.url = this._baseUrl + this.url;
    }
  }
  _baseUrl;
}
class TileMatrixSet {
  identifier;
  boundingBox;
  readyPromise;
  numLevels;
  maxPixelSize;
  constructor(matrixSetNode) {
    this.boundingBox = new Pioneer.Rect();
    this.readyPromise = Promise.resolve();
    this.numLevels = 0;
    this._numTiles = [];
    const identifierNode = matrixSetNode.querySelector("*|Identifier");
    if (!identifierNode) throw new Error("TileMatrixSet missing identifier.");
    this.identifier = identifierNode.textContent;
    const crsNode = matrixSetNode.querySelector("*|SupportedCRS");
    if (!crsNode) throw new Error(`TileMatrixSet ${this.identifier} missing SupportedCRS.`);
    let previousScale;
    this._crs = crsNode.textContent;
    let numLevels = 0;
    for (const matrixNode of matrixSetNode.querySelectorAll("TileMatrix")) {
      const scaleNode = matrixNode.querySelector("ScaleDenominator");
      if (!scaleNode) throw new Error(`ScaleDenominator tag not found for TileMatrix ${numLevels} of TileMatrixSet ${this.identifier}.`);
      const scale = parseFloat(scaleNode.innerHTML);
      if (void 0 !== previousScale && Math.abs(2 * scale - previousScale) / scale > .01) throw new Error(`ScaleDenominator for TileMatrix ${numLevels} of TileMatrixSet ${this.identifier} must be half of the next higher level, but is not.`);
      previousScale = scale;
      const widthNode = matrixNode.querySelector("MatrixWidth");
      const heightNode = matrixNode.querySelector("MatrixHeight");
      if (!widthNode || !heightNode) throw new Error(`MatrixWidth or MatrixHeight tag not found for TileMatrix ${numLevels} of TileMatrixSet ${this.identifier}.`);
      this._numTiles[numLevels] = new Pioneer.Vector2(parseFloat(widthNode.innerHTML), parseFloat(heightNode.innerHTML));
      numLevels += 1;
    }
    this.numLevels = numLevels;
    if (0 === this._numTiles.length) throw new Error(`There are no levels found for TileMatrixSet ${this.identifier}.`);
    const rootMatrixNode = matrixSetNode.querySelector("TileMatrix");
    if (!rootMatrixNode) throw new Error(`TileMatrix tag not found for TileMatrixSet ${this.identifier}.`);
    const rootScaleNode = rootMatrixNode.querySelector("ScaleDenominator");
    if (!rootScaleNode) throw new Error(`ScaleDenominator tag not found for TileMatrixSet ${this.identifier} level 0.`);
    const rootScale = Number.parseFloat(rootScaleNode.textContent);
    const tileWidthNode = rootMatrixNode.querySelector("TileWidth");
    if (!tileWidthNode) throw new Error(`TileWidth tag not found for TileMatrixSet ${this.identifier} level 0.`);
    const tileHeightNode = rootMatrixNode.querySelector("TileHeight");
    if (!tileHeightNode) throw new Error(`TileHeight tag not found for TileMatrixSet ${this.identifier} level 0.`);
    const vector2 = new Pioneer.Vector2(Number.parseFloat(tileWidthNode.textContent), Number.parseFloat(tileHeightNode.textContent));
    this.maxPixelSize = Math.max(vector2.x, vector2.y);
    const metersPerPixel = 28e-8 * rootScale;
    const tileSpan = new Pioneer.Vector2(metersPerPixel * vector2.x, metersPerPixel * vector2.y);
    const matrixSpan = new Pioneer.Vector2(tileSpan.x * this._numTiles[0].x, tileSpan.y * this._numTiles[0].y);
    const topLeftNode = rootMatrixNode.querySelector("TopLeftCorner");
    if (!topLeftNode) throw new Error(`TopLeftCorner tag not found for TileMatrix ${numLevels} of TileMatrixSet ${this.identifier}.`);
    const topLeftValues = topLeftNode.textContent.split(" ");
    if (topLeftValues.length < 2) throw new Error(`TopLeftCorner tag is invalid for TileMatrix ${numLevels} of TileMatrixSet ${this.identifier}.`);
    this.boundingBox.origin.set(Number.parseFloat(topLeftValues[0]), Number.parseFloat(topLeftValues[1]));
    if (this.boundingBox.origin.isNaN()) throw new Error(`TopLeftCorner tag is invalid for TileMatrix ${numLevels} of TileMatrixSet ${this.identifier}.`);
    this.readyPromise = TileMatrixSet.setCRS(this._crs).then(crs => {
      this._crs = crs;
      let unitsPerKilometer = 1e3;
      const crsDefinition = Unidentified585.default.defs(this._crs);
      if (void 0 !== crsDefinition.to_meter) {
        unitsPerKilometer = 1e3 / crsDefinition.to_meter;
      } else {
        if ("degrees" === crsDefinition.units) {
          unitsPerKilometer = .00898315284;
        } else {
          if (!("feet" !== crsDefinition.units && "us feet" !== crsDefinition.units)) {
            unitsPerKilometer = 3280.83333335;
          }
        }
      }
      this.boundingBox.size.x = Math.round(matrixSpan.x * unitsPerKilometer * 1e6) / 1e6;
      this.boundingBox.size.y = Math.round(matrixSpan.y * unitsPerKilometer * 1e6) / 1e6;
      this.boundingBox.origin.y -= this.boundingBox.size.y;
    });
  }
  getNumTiles(level) {
    return this._numTiles[level];
  }
  crsUnitsToLLA(output, position) {
    const clampedX = Pioneer.MathUtils.clamp(position.x, this.boundingBox.origin.x, this.boundingBox.origin.x + this.boundingBox.size.x);
    const clampedY = Pioneer.MathUtils.clamp(position.y, this.boundingBox.origin.y, this.boundingBox.origin.y + this.boundingBox.size.y);
    const longitudeLatitude = (0, Unidentified585.default)(this._crs, "WGS84", [clampedX, clampedY]);
    output.set(Pioneer.MathUtils.degToRad(Pioneer.MathUtils.clamp(longitudeLatitude[1], -90, 90)), Pioneer.MathUtils.wrapAngle(Pioneer.MathUtils.degToRad(longitudeLatitude[0])), 0);
  }
  // OGC URN 先去前缀；内置月球/火星/WGS84 定义优先，其他 EPSG 仍沿原 epsg.io 路径加载。
  static async setCRS(crs) {
    if (crs.startsWith("urn:ogc:def:crs:")) {
      crs = crs.substring(16);
    }
    let definition = TileMatrixSet.crsToWKT.get(crs);
    if (void 0 === definition) {
      const epsgMatch = crs.match(/EPSG:[0-9.]*:(\d+)/u);
      if (!epsgMatch) throw new Error("Only CRS starting with EPSG: supported.");
      {
        const definitionUrl = `https://epsg.io/${epsgMatch[1]}.proj4`;
        const response = await fetch(definitionUrl);
        definition = await response.text();
      }
    }
    Unidentified585.default.defs(crs, definition);
    return crs;
  }
  _crs;
  _numTiles;
  static crsToWKT = new Map([["EPSG::104903", 'GEOGCS["GCS_Moon_2000",DATUM["D_Moon_2000",SPHEROID["Moon_2000_IAU_IAG",1737400.0,0.0]],PRIMEM["Reference_Meridian",0.0],UNIT["Degree",0.0174532925199433]]'], ["EPSG::104905", 'GEOGCS["GCS_Mars_2000",DATUM["D_Mars_2000",SPHEROID["Mars_2000_IAU_IAG",3396190.0,169.8944472236118]],PRIMEM["Reference_Meridian",0.0],UNIT["Degree",0.0174532925199433]]'], ["EPSG::4326", "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs"], ["EPSG::3857", "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs"], ["OGC:1.3:84", Unidentified585.default.defs("WGS84")], ["OGC:1.3:CRS84", Unidentified585.default.defs("WGS84")], ["OGC:2:84", Unidentified585.default.defs("WGS84")]]);
}
export { Capabilities };
export { Layer };
export { TileMatrixSet };
