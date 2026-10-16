// Recovered from app.js:724181-727901.
import * as Pioneer from "../pioneer/index.js";
/** viewport 像素矩形建四叉树；仅完全包含的对象下降子节点，跨象限对象留父节点，深度上限 8。交集标记按查询增删同步。 */
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
  setBounds(name, bounds) {
    if (!this._root.bounds.size.equals(this._viewport.getBounds().size)) {
      this._root = {
        bounds: new Pioneer.Rect(0, 0, this._viewport.getBounds().size.x, this._viewport.getBounds().size.y),
        values: [],
        depth: 0,
        parent: null,
        children: null
      };
      for (const existingName of this._nameArray) this._insertValueInNode(this._valueMap[existingName], this._root);
    }
    let entry = this._valueMap[name];
    if (void 0 === entry) {
      entry = {
        name: name,
        bounds: new Pioneer.Rect(),
        node: null,
        withinViewport: false,
        intersectionFlags: new Pioneer.FastMap()
      };
      this._valueMap[name] = entry;
      this._nameArray.push(name);
    }
    entry.bounds.copy(bounds);
    entry.withinViewport = this._root.bounds.intersects(entry.bounds);
    if (entry.withinViewport) {
      if (null === entry.node) this._insertValueInNode(entry, this._root);else if (entry.node.bounds.surrounds(entry.bounds)) {
        if (null !== entry.node.children) for (let childIndex = 0; childIndex < 4; childIndex++) {
          const childNode = entry.node.children[childIndex];
          if (childNode.bounds.surrounds(entry.bounds)) {
            this._removeValueFromNode(entry);
            this._insertValueInNode(entry, childNode);
            break;
          }
        }
      } else {
        this._removeValueFromNode(entry);
        this._insertValueInNode(entry, this._root);
      }
    } else this._removeValueFromNode(entry);
  }
  removeBounds(name) {
    const entry = this._valueMap[name];
    if (void 0 !== entry) {
      this._removeValueFromNode(entry);
      this._nameArray.splice(this._nameArray.findIndex(candidate => candidate === name), 1);
      delete this._valueMap[name];
    }
  }
  getBounds(boundsOut, name) {
    const entry = this._valueMap[name];
    if (void 0 !== entry) {
      boundsOut.copy(entry.bounds);
    } else {
      boundsOut.set(NaN, NaN, NaN, NaN);
    }
  }
  getIntersections(name, intersectionsOut) {
    const entry = this._valueMap[name];
    if (void 0 !== entry && null !== entry.node) {
      for (let flagIndex = 0, flagCount = entry.intersectionFlags.getSize(); flagIndex < flagCount; flagIndex++) entry.intersectionFlags.getAt(flagIndex).value = false;
      this._getNodeIntersections(entry, entry.node, false);
      for (let flagIndex = 0; flagIndex < entry.intersectionFlags.getSize(); flagIndex++) {
        const intersectionFlag = entry.intersectionFlags.getAt(flagIndex);
        if (intersectionFlag.value) {
          intersectionsOut.add(intersectionFlag.key);
        } else {
          entry.intersectionFlags.delete(intersectionFlag.key);
          intersectionsOut.delete(intersectionFlag.key);
          flagIndex--;
        }
      }
    } else intersectionsOut.clear();
  }
  _getNodeIntersections(entry, node, ascending) {
    for (let valueIndex = 0, valueCount = node.values.length; valueIndex < valueCount; valueIndex++) {
      const candidate = node.values[valueIndex];
      if (candidate.withinViewport && candidate.bounds.intersects(entry.bounds) && candidate !== entry) {
        entry.intersectionFlags.set(candidate.name, true);
      }
    }
    if (ascending || null === node.children) {
      if (null !== node.parent) {
        this._getNodeIntersections(entry, node.parent, true);
      }
    } else for (let childIndex = 0; childIndex < 4; childIndex++) this._getNodeIntersections(entry, node.children[childIndex], ascending);
  }
  _insertValueInNode(entry, node) {
    if (null === node.children && node.values.length < this._maxValuesPerNode || node.depth >= 8) {
      node.values.push(entry);
      return void (entry.node = node);
    }
    if (null === node.children) {
      const nodeBounds = node.bounds;
      node.children = [{
        bounds: new Pioneer.Rect(nodeBounds.origin.x, nodeBounds.origin.y, nodeBounds.size.x / 2, nodeBounds.size.y / 2),
        values: [],
        depth: node.depth + 1,
        parent: node,
        children: null
      }, {
        bounds: new Pioneer.Rect(nodeBounds.origin.x + nodeBounds.size.x / 2, nodeBounds.origin.y, nodeBounds.size.x / 2, nodeBounds.size.y / 2),
        values: [],
        depth: node.depth + 1,
        parent: node,
        children: null
      }, {
        bounds: new Pioneer.Rect(nodeBounds.origin.x, nodeBounds.origin.y + nodeBounds.size.y / 2, nodeBounds.size.x / 2, nodeBounds.size.y / 2),
        values: [],
        depth: node.depth + 1,
        parent: node,
        children: null
      }, {
        bounds: new Pioneer.Rect(nodeBounds.origin.x + nodeBounds.size.x / 2, nodeBounds.origin.y + nodeBounds.size.y / 2, nodeBounds.size.x / 2, nodeBounds.size.y / 2),
        values: [],
        depth: node.depth + 1,
        parent: node,
        children: null
      }];
      const previousValues = node.values;
      node.values = [];
      for (const previousEntry of previousValues) {
        previousEntry.node = null;
        this._insertValueInNode(previousEntry, node);
      }
    }
    for (let childIndex = 0; childIndex < 4; childIndex++) {
      const childNode = node.children[childIndex];
      if (childNode.bounds.surrounds(entry.bounds)) return void this._insertValueInNode(entry, childNode);
    }
    node.values.push(entry);
    entry.node = node;
  }
  _removeValueFromNode(entry) {
    const node = entry.node;
    if (!node) return;
    node.values.splice(node.values.findIndex(candidate => candidate === entry), 1);
    entry.node = null;
    if (null === node.children) return;
    if (node.values.length >= this._maxValuesPerNode / 2) return;
    let combinedCount = node.values.length;
    for (let childIndex = 0; childIndex < 4; childIndex++) {
      const childNode = node.children[childIndex];
      if (null !== childNode.children) return;
      combinedCount += childNode.values.length;
      if (combinedCount >= this._maxValuesPerNode / 2) return;
    }
    for (let childIndex = 0; childIndex < 4; childIndex++) {
      const childNode = node.children[childIndex];
      for (const childEntry of childNode.values) {
        node.values.push(childEntry);
        childEntry.node = node;
      }
    }
    node.children = null;
  }
  _viewport;
  _maxValuesPerNode;
  _root;
  _nameArray;
  _valueMap;
}
export { Quadtree };
