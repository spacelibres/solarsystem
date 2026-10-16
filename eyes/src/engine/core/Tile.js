/** @eyes-analysis
 * 文件职责：异步四叉瓦片状态机：细分前保持父瓦片，子瓦片加载后切换；合并时先加载父瓦片再销毁后代。
 * 依据：Tile @7
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:40703-43267.
const s = {
  Unloaded: Symbol("unloaded"),
  Loading: Symbol("loading"),
  Loaded: Symbol("loaded")
};
/** @eyes-analysis
 * 类职责：异步四叉瓦片状态机：细分前保持父瓦片，子瓦片加载后切换；合并时先加载父瓦片再销毁后代。
 * 继承：无显式父类；导出：Tile。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Tile {
  /** @eyes-analysis
   * 【结构证据】写入 `_children`、`_destroyed`、`_parent`、`_splitFailed`、`_state`、`_transitioning`。
   * 状态写入：_children、_destroyed、_parent、_splitFailed、_state、_transitioning。
   */
  constructor(parent) {
    this._parent = parent;
    this._children = [];
    this._state = s.Unloaded;
    this._splitFailed = false;
    this._destroyed = false;
    this._transitioning = false;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._parent`。
   */
  getParent() {
    return this._parent;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_state`、`_transitioning`；调用 `this.load`、`this.setVisible`。
   * 状态写入：_state、_transitioning。
   * 调用线索：this.load、this.setVisible。
   */
  async forceLoad() {
    this._transitioning = true;
    this._state = s.Loading;
    await this.load();
    this._state = s.Loaded;
    this.setVisible(true);
    this._transitioning = false;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._transitioning`；调用 `this._join`、`this._split`、`this.checkJoin`、`this.checkSplit`。
   * 调用线索：this._join、this._split、this.checkJoin、this.checkSplit。
   */
  check() {
    this._destroyed || this._transitioning || (0 === this._children.length && !this._splitFailed && this.checkSplit() ? this._split() : this._children.length > 0 && this.checkJoin() && this._join());
    return this._transitioning;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._children`。
   */
  getChildren() {
    return this._children;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_destroyed`、`_state`；调用 `this._children[t].destroy`、`this.setVisible`、`this.unload`。
   * 状态写入：_destroyed、_state。
   * 调用线索：this._children[t].destroy、this.setVisible、this.unload。
   */
  destroy() {
    for (let t = 0; t < this._children.length; t++) this._children[t].destroy();
    this._state === s.Loaded && (this.setVisible(false), this._state = s.Unloaded, this.unload());
    this._destroyed = true;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._destroyed`。
   */
  isDestroyed() {
    return this._destroyed;
  }
  /** @eyes-analysis
   * 递归构造需要的四个象限后代，设置 transitioning 防重入；等待新叶资源后显示叶并卸载父。catch 后 finally 仍设 Loaded，Loaded 不代表子类全部成功。
   * 状态写入：_state、_transitioning。
   * 调用线索：Promise.allSettled、console.log、e[t].setVisible、i.push、n.load等。
   */
  async _split() {
    const t = [];
    const e = [];
    this._splitAndGetNeedingLoad(t, e);
    for (let e = 0; e < t.length; e++) t[e]._transitioning = true;
    this._transitioning = true;
    const i = [];
    for (let t = 0; t < e.length; t++) {
      const n = e[t];
      n._state = s.Loading;
      i.push(n.load().catch(async t => {
        t instanceof Error && console.log(t.message);
      }).finally(() => {
        n._state = s.Loaded;
      }));
    }
    await Promise.allSettled(i);
    for (let t = 0; t < e.length; t++) {
      e[t].setVisible(true);
    }
    this._state === s.Loaded && (this._state = s.Unloaded, this.setVisible(false), this.unload());
    for (let e = 0; e < t.length; e++) t[e]._transitioning = false;
    this._transitioning = false;
  }
  /** @eyes-analysis
   * 若任一后代 transitioning 则推迟；先加载当前父瓦片，再隐藏卸载后代并标记 destroyed，最后清空 children。
   * 状态写入：_children、_state、_transitioning。
   * 调用线索：console.log、e.push、i.setVisible、i.unload、this._getDescendentTiles等。
   */
  async _join() {
    const t = [];
    this._getDescendentTiles(t);
    for (let e = 0; e < t.length; e++) if (t[e]._transitioning) return;
    const e = [];
    for (let i = 0; i < t.length; i++) {
      const n = t[i];
      n._state === s.Loaded && e.push(n);
      n._transitioning = true;
    }
    this._transitioning = true;
    this._state = s.Loading;
    try {
      await this.load();
    } catch (t) {
      t instanceof Error && console.log(t.message);
    }
    this._state = s.Loaded;
    this.setVisible(true);
    for (let t = 0; t < e.length; t++) {
      const i = e[t];
      i._state === s.Loaded && (i.setVisible(false), i._state = s.Unloaded, i.unload());
    }
    for (let e = 0; e < t.length; e++) t[e]._destroyed = true;
    this._destroyed && this._state === s.Loaded && (this.setVisible(false), this._state = s.Unloaded, this.unload());
    this._children = [];
    this._transitioning = false;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `e.push`、`n._splitAndGetNeedingLoad`、`n.checkSplit`、`t.push`、`this._children.push`、`this.createNewTile`。
   * 调用线索：e.push、n._splitAndGetNeedingLoad、n.checkSplit、t.push、this._children.push等。
   */
  _splitAndGetNeedingLoad(t, e) {
    for (let i = 0; i < 2; i++) for (let s = 0; s < 2; s++) {
      const n = this.createNewTile(this, i, s);
      n && (this._children.push(n), n.checkSplit() ? n._splitAndGetNeedingLoad(t, e) : e.push(n), t.push(n));
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `i._getDescendentTiles`、`t.push`。
   * 调用线索：i._getDescendentTiles、t.push。
   */
  _getDescendentTiles(t) {
    for (let e = 0; e < this._children.length; e++) {
      const i = this._children[e];
      t.push(i);
      i._getDescendentTiles(t);
    }
  }
  _parent;
  _children;
  _state;
  _splitFailed;
  _destroyed;
  _transitioning;
}
export { Tile };
