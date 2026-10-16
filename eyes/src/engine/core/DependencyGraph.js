// 依赖图仅在脏标志置位后重新深搜排序；临时标记检测回路、永久标记避免重复访问，递归错误逐层附加 item 形成依赖链。
// Recovered from app.js:29353-30707.
class DependencyGraph {
  constructor(updateItemCallback, compareItemCallback) {
    this._updateItemCallback = updateItemCallback;
    this._compareItemCallback = compareItemCallback;
    this._nodes = new Map();
    this._sortedNodes = [];
    this._needsSorting = false;
  }
  addItem(item) {
    const node = new Node(item);
    this._nodes.set(item, node);
    this._needsSorting = true;
  }
  removeItem(item) {
    if (this._nodes.delete(item)) {
      this._needsSorting = true;
    }
  }
  needsSorting() {
    this._needsSorting = true;
  }
  update() {
    if (this._needsSorting) {
      for (const node of this._nodes.values()) {
        node.permanentMark = false;
        node.temporaryMark = false;
      }
      this._sortedNodes = [];
      const nodeIterator = this._nodes.values();
      for (;;) {
        const nextNode = nodeIterator.next();
        if (true === nextNode.done) break;
        if (!this._visit(nextNode.value)) break;
      }
      this._needsSorting = false;
    }
    for (let nodeIndex = 0, nodeCount = this._sortedNodes.length; nodeIndex < nodeCount; nodeIndex++) this._updateItemCallback(this._sortedNodes[nodeIndex].item);
  }
  _visit(node) {
    if (node.permanentMark) return true;
    if (node.temporaryMark) throw new Error(`Dependency cycle in graph: ${node.item}`);
    node.temporaryMark = true;
    for (const dependency of this._nodes.values()) {
      if (this._compareItemCallback(node.item, dependency.item)) try {
        this._visit(dependency);
      } catch (error) {
        throw error instanceof Error && (error.message = `${error.message} ← ${node.item}`), error;
      }
    }
    node.temporaryMark = false;
    node.permanentMark = true;
    this._sortedNodes.push(node);
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
