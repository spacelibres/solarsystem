// Recovered from app.js:724181-727901.
import * as Pioneer from "../pioneer/index.js";
class Quadtree {
  constructor(viewport, maxValuesPerNode = 8) {
    this._viewport = viewport;
    this._maxValuesPerNode = maxValuesPerNode;
    this._nameArray = [];
    this._valueMap = {};
    this._root = {
      bounds: new Pioneer.Rect(0, 0, this._viewport.getBounds().size.x, this._viewport.getBounds().size.y),
      values: [],
      depth: 0,
      parent: null,
      children: null
    };
  }
  setBounds(t, e) {
    if (!this._root.bounds.size.equals(this._viewport.getBounds().size)) {
      this._root = {
        bounds: new Pioneer.Rect(0, 0, this._viewport.getBounds().size.x, this._viewport.getBounds().size.y),
        values: [],
        depth: 0,
        parent: null,
        children: null
      };
      for (const t of this._nameArray) this._insertValueInNode(this._valueMap[t], this._root);
    }
    let i = this._valueMap[t];
    if (void 0 === i && (i = {
      name: t,
      bounds: new Pioneer.Rect(),
      node: null,
      withinViewport: false,
      intersectionFlags: new Pioneer.FastMap()
    }, this._valueMap[t] = i, this._nameArray.push(t)), i.bounds.copy(e), i.withinViewport = this._root.bounds.intersects(i.bounds), i.withinViewport) {
      if (null === i.node) this._insertValueInNode(i, this._root);else if (i.node.bounds.surrounds(i.bounds)) {
        if (null !== i.node.children) for (let t = 0; t < 4; t++) {
          const e = i.node.children[t];
          if (e.bounds.surrounds(i.bounds)) {
            this._removeValueFromNode(i);
            this._insertValueInNode(i, e);
            break;
          }
        }
      } else {
        this._removeValueFromNode(i);
        this._insertValueInNode(i, this._root);
      }
    } else this._removeValueFromNode(i);
  }
  removeBounds(t) {
    const e = this._valueMap[t];
    void 0 !== e && (this._removeValueFromNode(e), this._nameArray.splice(this._nameArray.findIndex(e => e === t), 1), delete this._valueMap[t]);
  }
  getBounds(t, e) {
    const i = this._valueMap[e];
    void 0 !== i ? t.copy(i.bounds) : t.set(NaN, NaN, NaN, NaN);
  }
  getIntersections(t, e) {
    const i = this._valueMap[t];
    if (void 0 !== i && null !== i.node) {
      for (let t = 0, e = i.intersectionFlags.getSize(); t < e; t++) i.intersectionFlags.getAt(t).value = false;
      this._getNodeIntersections(i, i.node, false);
      for (let t = 0; t < i.intersectionFlags.getSize(); t++) {
        const s = i.intersectionFlags.getAt(t);
        s.value ? e.add(s.key) : (i.intersectionFlags.delete(s.key), e.delete(s.key), t--);
      }
    } else e.clear();
  }
  _getNodeIntersections(t, e, i) {
    for (let i = 0, s = e.values.length; i < s; i++) {
      const s = e.values[i];
      s.withinViewport && s.bounds.intersects(t.bounds) && s !== t && t.intersectionFlags.set(s.name, true);
    }
    if (i || null === e.children) null !== e.parent && this._getNodeIntersections(t, e.parent, true);else for (let s = 0; s < 4; s++) this._getNodeIntersections(t, e.children[s], i);
  }
  _insertValueInNode(t, e) {
    if (null === e.children && e.values.length < this._maxValuesPerNode || e.depth >= 8) {
      e.values.push(t);
      return void (t.node = e);
    }
    if (null === e.children) {
      const t = e.bounds;
      e.children = [{
        bounds: new Pioneer.Rect(t.origin.x, t.origin.y, t.size.x / 2, t.size.y / 2),
        values: [],
        depth: e.depth + 1,
        parent: e,
        children: null
      }, {
        bounds: new Pioneer.Rect(t.origin.x + t.size.x / 2, t.origin.y, t.size.x / 2, t.size.y / 2),
        values: [],
        depth: e.depth + 1,
        parent: e,
        children: null
      }, {
        bounds: new Pioneer.Rect(t.origin.x, t.origin.y + t.size.y / 2, t.size.x / 2, t.size.y / 2),
        values: [],
        depth: e.depth + 1,
        parent: e,
        children: null
      }, {
        bounds: new Pioneer.Rect(t.origin.x + t.size.x / 2, t.origin.y + t.size.y / 2, t.size.x / 2, t.size.y / 2),
        values: [],
        depth: e.depth + 1,
        parent: e,
        children: null
      }];
      const i = e.values;
      e.values = [];
      for (const t of i) {
        t.node = null;
        this._insertValueInNode(t, e);
      }
    }
    for (let i = 0; i < 4; i++) {
      const s = e.children[i];
      if (s.bounds.surrounds(t.bounds)) return void this._insertValueInNode(t, s);
    }
    e.values.push(t);
    t.node = e;
  }
  _removeValueFromNode(t) {
    const e = t.node;
    if (!e) return;
    if (e.values.splice(e.values.findIndex(e => e === t), 1), t.node = null, null === e.children) return;
    if (e.values.length >= this._maxValuesPerNode / 2) return;
    let i = e.values.length;
    for (let t = 0; t < 4; t++) {
      const s = e.children[t];
      if (null !== s.children) return;
      if (i += s.values.length, i >= this._maxValuesPerNode / 2) return;
    }
    for (let t = 0; t < 4; t++) {
      const i = e.children[t];
      for (const t of i.values) {
        e.values.push(t);
        t.node = e;
      }
    }
    e.children = null;
  }
  _viewport;
  _maxValuesPerNode;
  _root;
  _nameArray;
  _valueMap;
}
export { Quadtree };
