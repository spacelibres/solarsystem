// Recovered from app.js:740174-744710.
import * as Pioneer from "../pioneer/index.js";
import * as SceneHelpers from "../core/SceneHelpers.js";
class ConstellationsComponent extends Pioneer.BaseComponent {
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
  setColor(t) {
    this._color.copy(t);
    for (let t = 0; t < this._meshes.length; t++) {
      const e = this._meshes[t];
      const i = [];
      for (let t = 0; t < e.numVertices; t++) i.push(this._color);
      e.lineMesh.setColors(i);
    }
  }
  setLineWidth(lineWidth) {
    this._lineWidth = lineWidth;
    for (let e = 0; e < this._meshes.length; e++) this._meshes[e].lineMesh.setWidths(lineWidth);
  }
  setGlowWidth(glowWidth) {
    this._glowWidth = glowWidth;
    for (let t = 0, e = this._meshes.length; t < e; t++) this._meshes[t].lineMesh.setGlowWidth(this._glowWidth);
  }
  setUrl(url) {
    this._url = url;
    this.resetResources();
  }
  getNames() {
    const t = [];
    for (let e = 0, i = this._database.length; e < i; e++) t.push(this._database[e].name);
    return t;
  }
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
  getNearestConstellationIndex(t, e) {
    let i;
    let s = Number.POSITIVE_INFINITY;
    for (let n = 0, o = this._labelEntities.length; n < o; n++) {
      const o = t.distance(this._labelEntities[n].getPixelSpacePosition(e));
      o < s && (s = o, i = n);
    }
    return i;
  }
  __prepareForRender(t) {
    Pioneer.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects(), this.getEntity(), t);
    for (let e = 0; e < this._meshes.length; e++) this._meshes[e].lineMesh.prepareForRender(t);
  }
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
