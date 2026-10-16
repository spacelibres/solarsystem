// Recovered from app.js:29353-30707.
class DependencyGraph {
  constructor(updateItemCallback, compareItemCallback) {
    this._updateItemCallback = updateItemCallback;
    this._compareItemCallback = compareItemCallback;
    this._nodes = new Map();
    this._sortedNodes = [];
    this._needsSorting = false;
  }
  addItem(t) {
    const node = new Node(t);
    this._nodes.set(t, node);
    this._needsSorting = true;
  }
  removeItem(t) {
    this._nodes.delete(t) && (this._needsSorting = true);
  }
  needsSorting() {
    this._needsSorting = true;
  }
  update() {
    if (this._needsSorting) {
      for (const t of this._nodes.values()) {
        t.permanentMark = false;
        t.temporaryMark = false;
      }
      this._sortedNodes = [];
      const t = this._nodes.values();
      for (;;) {
        const e = t.next();
        if (true === e.done) break;
        if (!this._visit(e.value)) break;
      }
      this._needsSorting = false;
    }
    for (let t = 0, e = this._sortedNodes.length; t < e; t++) this._updateItemCallback(this._sortedNodes[t].item);
  }
  _visit(t) {
    if (t.permanentMark) return true;
    if (t.temporaryMark) throw new Error(`Dependency cycle in graph: ${t.item}`);
    t.temporaryMark = true;
    for (const e of this._nodes.values()) {
      if (this._compareItemCallback(t.item, e.item)) try {
        this._visit(e);
      } catch (e) {
        throw e instanceof Error && (e.message = `${e.message} ← ${t.item}`), e;
      }
    }
    t.temporaryMark = false;
    t.permanentMark = true;
    this._sortedNodes.push(t);
    return true;
  }
  _updateItemCallback;
  _compareItemCallback;
  _nodes;
  _sortedNodes;
  _needsSorting;
}
class Node {
  item;
  permanentMark;
  temporaryMark;
  constructor(item) {
    this.item = item;
    this.permanentMark = false;
    this.temporaryMark = false;
  }
}
export { DependencyGraph };
