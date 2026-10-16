/** @eyes-analysis
 * 文件职责：按依赖比较器深度优先排序节点，检测环并按排序结果更新控制器。
 * 依据：DependencyGraph @2；Node @60
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:29353-30707.
/** @eyes-analysis
 * 类职责：按依赖比较器深度优先排序节点，检测环并按排序结果更新控制器。
 * 继承：无显式父类；导出：DependencyGraph。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class DependencyGraph {
  /** @eyes-analysis
   * 【结构证据】写入 `_compareItemCallback`、`_needsSorting`、`_nodes`、`_sortedNodes`、`_updateItemCallback`；调用 `new Map`。
   * 状态写入：_compareItemCallback、_needsSorting、_nodes、_sortedNodes、_updateItemCallback。
   * 调用线索：new Map。
   */
  constructor(updateItemCallback, compareItemCallback) {
    this._updateItemCallback = updateItemCallback;
    this._compareItemCallback = compareItemCallback;
    this._nodes = new Map();
    this._sortedNodes = [];
    this._needsSorting = false;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_needsSorting`；调用 `new Node`、`this._nodes.set`。
   * 状态写入：_needsSorting。
   * 调用线索：new Node、this._nodes.set。
   */
  addItem(t) {
    const node = new Node(t);
    this._nodes.set(t, node);
    this._needsSorting = true;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_needsSorting`；调用 `this._nodes.delete`。
   * 状态写入：_needsSorting。
   * 调用线索：this._nodes.delete。
   */
  removeItem(t) {
    this._nodes.delete(t) && (this._needsSorting = true);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_needsSorting`。
   * 状态写入：_needsSorting。
   */
  needsSorting() {
    this._needsSorting = true;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_needsSorting`、`_sortedNodes`；调用 `t.next`、`this._nodes.values`、`this._updateItemCallback`、`this._visit`。
   * 状态写入：_needsSorting、_sortedNodes。
   * 调用线索：t.next、this._nodes.values、this._updateItemCallback、this._visit。
   */
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
  /** @eyes-analysis
   * DFS temporaryMark 检测依赖环并抛包含 item 路径的错误；永久标记避免重复，依赖先入 sortedNodes。
   * 调用线索：new Error、this._compareItemCallback、this._nodes.values、this._sortedNodes.push、this._visit。
   */
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
/** @eyes-analysis
 * 类职责：依赖图节点，保存 item 与 DFS 临时/永久标记。
 * 继承：无显式父类；导出：模块内部声明。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Node {
  item;
  permanentMark;
  temporaryMark;
  /** @eyes-analysis
   * 【结构证据】写入 `item`、`permanentMark`、`temporaryMark`。
   * 状态写入：item、permanentMark、temporaryMark。
   */
  constructor(item) {
    this.item = item;
    this.permanentMark = false;
    this.temporaryMark = false;
  }
}
export { DependencyGraph };
