/** @eyes-analysis
 * 文件职责：载入星座连线/边界数据，在相机相关坐标中绘制星座辅助线。
 * 依据：import ../pioneer/index.js；import ../core/SceneHelpers.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:740174-744710.
import * as Pioneer from "../pioneer/index.js";
import * as SceneHelpers from "../core/SceneHelpers.js";
/** @eyes-analysis
 * 类职责：载入星座连线/边界数据，在相机相关坐标中绘制星座辅助线。
 * 继承：Pioneer.BaseComponent；导出：ConstellationsComponent。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class ConstellationsComponent extends Pioneer.BaseComponent {
  /** @eyes-analysis
   * 【结构证据】写入 `_color`、`_database`、`_glowWidth`、`_highlightColor`、`_highlightWidth`、`_highlightedIndex`、`_labelEntities`、`_lineWidth`；调用 `new Pioneer.Color`、`super`、`this.__setRadius`。
   * 状态写入：_color、_database、_glowWidth、_highlightColor、_highlightWidth、_highlightedIndex、_labelEntities、_lineWidth等；完整记录见索引。
   * 调用线索：new Pioneer.Color、super、this.__setRadius。
   */
  constructor(t, e) {
    super(t, e);
    this._url = "";
    this._database = [];
    this._labelEntities = [];
    this._color = new Pioneer.Color();
    this._lineWidth = 2;
    this._glowWidth = 0;
    this._highlightedIndex = void 0;
    this._highlightColor = new Pioneer.Color();
    this._highlightWidth = 0;
    this._meshes = [];
    this.__setRadius(Number.POSITIVE_INFINITY);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `e.lineMesh.setColors`、`i.push`、`this._color.copy`。
   * 调用线索：e.lineMesh.setColors、i.push、this._color.copy。
   */
  setColor(t) {
    this._color.copy(t);
    for (let t = 0; t < this._meshes.length; t++) {
      const e = this._meshes[t];
      const i = [];
      for (let t = 0; t < e.numVertices; t++) i.push(this._color);
      e.lineMesh.setColors(i);
    }
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_lineWidth`；调用 `this._meshes[e].lineMesh.setWidths`。
   * 状态写入：_lineWidth。
   * 调用线索：this._meshes[e].lineMesh.setWidths。
   */
  setLineWidth(lineWidth) {
    this._lineWidth = lineWidth;
    for (let e = 0; e < this._meshes.length; e++) this._meshes[e].lineMesh.setWidths(lineWidth);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_glowWidth`；调用 `this._meshes[t].lineMesh.setGlowWidth`。
   * 状态写入：_glowWidth。
   * 调用线索：this._meshes[t].lineMesh.setGlowWidth。
   */
  setGlowWidth(glowWidth) {
    this._glowWidth = glowWidth;
    for (let t = 0, e = this._meshes.length; t < e; t++) this._meshes[t].lineMesh.setGlowWidth(this._glowWidth);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_url`；调用 `this.resetResources`。
   * 状态写入：_url。
   * 调用线索：this.resetResources。
   */
  setUrl(url) {
    this._url = url;
    this.resetResources();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t`；调用 `t.push`。
   * 调用线索：t.push。
   */
  getNames() {
    const t = [];
    for (let e = 0, i = this._database.length; e < i; e++) t.push(this._database[e].name);
    return t;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_highlightWidth`、`_highlightedIndex`；调用 `s.lineMesh.setColors`、`s.lineMesh.setWidths`、`t.push`、`this._highlightColor.copy`。
   * 状态写入：_highlightWidth、_highlightedIndex。
   * 调用线索：s.lineMesh.setColors、s.lineMesh.setWidths、t.push、this._highlightColor.copy。
   */
  setHighlight(highlightedIndex, e, highlightWidth) {
    let s = void 0 !== this._highlightedIndex ? this._meshes[this._highlightedIndex] : void 0;
    if (s) {
      const t = [];
      for (let e = 0, i = s.numVertices; e < i; e++) t.push(this._color);
      s.lineMesh.setColors(t);
      s.lineMesh.setWidths(this._lineWidth);
    }
    if (this._highlightedIndex = highlightedIndex, this._highlightColor.copy(e), this._highlightWidth = highlightWidth, s = void 0 !== this._highlightedIndex ? this._meshes[this._highlightedIndex] : void 0, s) {
      const t = [];
      for (let e = 0, i = s.numVertices; e < i; e++) t.push(this._highlightColor);
      s.lineMesh.setColors(t);
      s.lineMesh.setWidths(this._highlightWidth);
    }
  }
  /** @eyes-analysis
   * 【结构证据】返回 `i`；调用 `t.distance`、`this._labelEntities[n].getPixelSpacePosition`。
   * 调用线索：t.distance、this._labelEntities[n].getPixelSpacePosition。
   */
  getNearestConstellationIndex(t, e) {
    let i;
    let s = Number.POSITIVE_INFINITY;
    for (let n = 0, o = this._labelEntities.length; n < o; n++) {
      const o = t.distance(this._labelEntities[n].getPixelSpacePosition(e));
      o < s && (s = o, i = n);
    }
    return i;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Pioneer.ThreeJsHelper.setPositionToEntity`、`this._meshes[e].lineMesh.prepareForRender`、`this.getEntity`、`this.getThreeJsObjects`。
   * 调用线索：Pioneer.ThreeJsHelper.setPositionToEntity、this._meshes[e].lineMesh.prepareForRender、this.getEntity、this.getThreeJsObjects。
   */
  __prepareForRender(t) {
    Pioneer.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects(), this.getEntity(), t);
    for (let e = 0; e < this._meshes.length; e++) this._meshes[e].lineMesh.prepareForRender(t);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_labelEntities`、`_meshes`；调用 `Math.sqrt`、`Pioneer.ThreeJsHelper.setOrientation`、`SceneHelpers.SceneHelpers.getEclipJ2000ToJ2000Rotation`、`a.push`、`c.add`、`c.mult`。
   * 状态写入：_labelEntities、_meshes。
   * 调用线索：Math.sqrt、Pioneer.ThreeJsHelper.setOrientation、SceneHelpers.SceneHelpers.getEclipJ2000ToJ2000Rotation、a.push、c.add等。
   */
  async __loadResources() {
    this._labelEntities = [];
    this._meshes = [];
    const t = await this.getEntity().getScene().getEngine().getDownloader().download(this._url, "binary", -this.getEntity().getLeastCameraDepth());
    const reader = new Pioneer.Reader(t.content);
    for (; !reader.isAtEnd();) {
      const t = {
        name: "",
        stars: [],
        segments: [],
        color: []
      };
      t.name = reader.readString(reader.readByte());
      t.color = [reader.readByte(), reader.readByte(), reader.readByte(), reader.readByte()];
      const i = reader.readByte();
      for (let s = 0; s < i; s++) t.stars.push([reader.readFloat32(), reader.readFloat32(), reader.readFloat32()]);
      const s = 2 * reader.readByte();
      for (let i = 0; i < s; i++) t.segments.push(reader.readByte());
      this._database.push(t);
    }
    for (let t = 0; t < this._database.length; t++) {
      const e = this._database[t];
      const i = e.stars;
      const n = e.segments;
      const o = [];
      const r = [];
      const a = [];
      for (let e = 0; e < n.length; e++) {
        const l = i[n[e]];
        void 0 !== l && (o.push(new Pioneer.Vector3(l[2], -l[0], l[1])), r.push(t === this._highlightedIndex ? this._highlightColor : this._color), a.push(t === this._highlightedIndex ? this._highlightWidth : this._lineWidth));
      }
      const lineMesh = new Pioneer.LineMesh(this);
      lineMesh.setPositions(o);
      lineMesh.setColors(r);
      lineMesh.setWidths(a);
      lineMesh.setGlowWidth(this._glowWidth);
      this._meshes.push({
        numVertices: n.length,
        lineMesh: lineMesh
      });
    }
    Pioneer.ThreeJsHelper.setOrientation(this.getThreeJsObjects(), SceneHelpers.SceneHelpers.getEclipJ2000ToJ2000Rotation());
    for (let t = 0; t < this._database.length; t++) {
      const e = this._database[t];
      const i = e.stars;
      if (0 === i.length) continue;
      const o = i[0];
      const vector3 = new Pioneer.Vector3(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
      const a = new Pioneer.Vector3(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
      const l = Math.sqrt(o[0] * o[0] + o[1] * o[1] + o[2] * o[2]);
      for (let t = 0; t < i.length; t++) {
        const e = i[t];
        const o = new Pioneer.Vector3();
        o.set(e[2], -e[0], e[1]);
        o.rotate(SceneHelpers.SceneHelpers.getEclipJ2000ToJ2000Rotation(), o);
        o.normalize(o);
        o.mult(o, l);
        vector3.x > o.x && (vector3.x = o.x);
        a.x < o.x && (a.x = o.x);
        vector3.y > o.y && (vector3.y = o.y);
        a.y < o.y && (a.y = o.y);
        vector3.z > o.z && (vector3.z = o.z);
        a.z < o.z && (a.z = o.z);
      }
      const c = new Pioneer.Vector3();
      c.add(vector3, a);
      c.mult(c, .5);
      const h = this.getEntity().getScene().addEntity(`constellation_label_${e.name}`);
      h.setParent(this.getEntity());
      h.setOrientation(Pioneer.Quaternion.Identity);
      h.setPosition(c);
      const d = h.addComponent(Pioneer.DivComponent);
      d.setAlignment(new Pioneer.Vector2(.5, .5));
      const u = d.getDiv();
      u.classList.add("pioneer-constellation-label");
      u.innerHTML = e.name;
      this._labelEntities.push(h);
    }
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_database`、`_meshes`；调用 `Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials`、`this.getEntity`、`this.getEntity().getScene`、`this.getEntity().getScene().removeEntity`。
   * 状态写入：_database、_meshes。
   * 调用线索：Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials、this.getEntity、this.getEntity().getScene、this.getEntity().getScene().removeEntity。
   */
  __unloadResources() {
    for (let t = 0; t < this._labelEntities.length; t++) this.getEntity().getScene().removeEntity(this._labelEntities[t]);
    Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
    this._meshes = [];
    this._database = [];
  }
  _url;
  _database;
  _labelEntities;
  _color;
  _lineWidth;
  _glowWidth;
  _highlightedIndex;
  _highlightColor;
  _highlightWidth;
  _meshes;
}
export { ConstellationsComponent };
