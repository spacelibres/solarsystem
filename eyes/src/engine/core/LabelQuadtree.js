/** @eyes-analysis
 * 文件职责：为空间标签布局维护四叉树并查询重叠区域。
 * 依据：import ../pioneer/index.js；import ./Quadtree.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:719509-724180.
import * as Pioneer from "../pioneer/index.js";
import * as Quadtree from "./Quadtree.js";
/** @eyes-analysis
 * 类职责：为空间标签布局维护四叉树并查询重叠区域。
 * 继承：无显式父类；导出：LabelQuadtree。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class LabelQuadtree {
  /** @eyes-analysis
   * 【结构证据】写入 `_divBoundsAdjustmentFunction`、`_doOcclusions`、`_intersections`、`_isLessWeights`、`_isLessWeightsAndZ`、`_labelInfos`、`_labelNames`、`_labelNamesIndex`；调用 `new Quadtree.Quadtree`、`this._isLessWeights.bind`、`this._isLessWeightsAndZ.bind`。
   * 状态写入：_divBoundsAdjustmentFunction、_doOcclusions、_intersections、_isLessWeights、_isLessWeightsAndZ、_labelInfos、_labelNames、_labelNamesIndex等；完整记录见索引。
   * 调用线索：new Quadtree.Quadtree、this._isLessWeights.bind、this._isLessWeightsAndZ.bind。
   */
  constructor(viewport) {
    this._viewport = viewport;
    this._labelInfos = {};
    this._labelNames = [];
    this._quadtree = new Quadtree.Quadtree(viewport);
    this._labelNamesIndex = 0;
    this._doOcclusions = true;
    this._intersections = {};
    this._divBoundsAdjustmentFunction = void 0;
    this._isLessWeights = this._isLessWeights.bind(this);
    this._isLessWeightsAndZ = this._isLessWeightsAndZ.bind(this);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_labelInfos`、`_labelNames`；调用 `this._setLabelOcclusion`。
   * 状态写入：_labelInfos、_labelNames。
   * 调用线索：this._setLabelOcclusion。
   */
  destroy() {
    for (let t = 0, e = this._labelNames.length; t < e; t++) {
      const e = this._labelNames[t];
      this._setLabelOcclusion(this._labelInfos[e].divComponent, false);
    }
    this._labelInfos = {};
    this._labelNames = [];
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._doOcclusions`。
   */
  getDoOcclusions() {
    return this._doOcclusions;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_doOcclusions`；调用 `this._setLabelOcclusion`。
   * 状态写入：_doOcclusions。
   * 调用线索：this._setLabelOcclusion。
   */
  setDoOcclusions(doOcclusions) {
    if (this._doOcclusions = doOcclusions, !this._doOcclusions) for (let t = 0, e = this._labelNames.length; t < e; t++) {
      const e = this._labelNames[t];
      this._setLabelOcclusion(this._labelInfos[e].divComponent, false);
    }
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_intersections[`${i}-div`]`、`_intersections[i]`、`_labelInfos[i]`；返回 `void`；调用 `Pioneer.Sort.sortObject`、`new Error`、`new Pioneer.FastSet`、`t.getComponent`、`t.getName`、`this._labelNames.push`；含显式错误分支。
   * 状态写入：_intersections[`${i}-div`]、_intersections[i]、_labelInfos[i]。
   * 调用线索：Pioneer.Sort.sortObject、new Error、new Pioneer.FastSet、t.getComponent、t.getName等。
   */
  addEntity(t, e) {
    const i = t.getName();
    if (void 0 !== this._labelInfos[i]) return;
    const n = t.getComponent(Pioneer.DivComponent);
    if (null === n) throw new Error(`Entity ${t.getName()} added with no div component.`);
    const o = {
      weight: e,
      z: Number.POSITIVE_INFINITY,
      divComponent: n
    };
    this._labelInfos[i] = o;
    this._labelNames.push(i);
    Pioneer.Sort.sortObject(this._labelNames, this._isLessWeights);
    this._intersections[i] = new Pioneer.FastSet();
    this._intersections[`${i}-div`] = new Pioneer.FastSet();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._labelNames.findIndex`、`this._labelNames.splice`、`this._quadtree.removeBounds`。
   * 调用线索：this._labelNames.findIndex、this._labelNames.splice、this._quadtree.removeBounds。
   */
  removeEntity(t) {
    void 0 !== this._labelInfos[t] && (delete this._labelInfos[t], delete this._intersections[t], delete this._intersections[`${t}-div`], this._labelNames.splice(this._labelNames.findIndex(e => e === t), 1), this._quadtree.removeBounds(`${t}-div`), this._quadtree.removeBounds(t));
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._quadtree.getBounds`。
   * 调用线索：this._quadtree.getBounds。
   */
  getBounds(t, e) {
    this._quadtree.getBounds(t, e);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_intersections[t]`；调用 `new Error`、`new Pioneer.FastSet`、`t.endsWith`、`this._labelNames.includes`、`this._quadtree.setBounds`；含显式错误分支。
   * 状态写入：_intersections[t]。
   * 调用线索：new Error、new Pioneer.FastSet、t.endsWith、this._labelNames.includes、this._quadtree.setBounds。
   */
  setBounds(t, e) {
    if (t.endsWith("-div")) throw new Error("Cannot make a bounds name end with `-div`, as it is reserved for entities.");
    if (this._labelNames.includes(t)) throw new Error(`There is an entity named ${t}. Use addEntity() instead.`);
    this._intersections[t] = new Pioneer.FastSet();
    this._quadtree.setBounds(t, e);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `new Error`、`this._quadtree.removeBounds`；含显式错误分支。
   * 调用线索：new Error、this._quadtree.removeBounds。
   */
  removeRect(t) {
    if (t in this._labelInfos) throw new Error(`There is an entity named ${t}. Use removeEntity() instead.`);
    delete this._intersections[t];
    this._quadtree.removeBounds(t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Pioneer.Sort.sortObject`、`new Error`；含显式错误分支。
   * 调用线索：Pioneer.Sort.sortObject、new Error。
   */
  setWeight(t, e) {
    const i = this._labelInfos[t];
    if (void 0 === i) throw new Error(`Weight set for entity ${t} not in the label quadtree.`);
    i.weight = e;
    Pioneer.Sort.sortObject(this._labelNames, this._isLessWeights);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._quadtree.getIntersections`。
   * 调用线索：this._quadtree.getIntersections。
   */
  getIntersections(t, e) {
    this._quadtree.getIntersections(t, e);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_divBoundsAdjustmentFunction`。
   * 状态写入：_divBoundsAdjustmentFunction。
   */
  setDivBoundsAdjustFunction(divBoundsAdjustmentFunction) {
    this._divBoundsAdjustmentFunction = divBoundsAdjustmentFunction;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_labelNamesIndex`；返回 `void`；调用 `Math.min`、`Pioneer.Rect.pool.get`、`Pioneer.Rect.pool.release`、`c.origin.copy`、`c.size.set`、`e.endsWith`。
   * 状态写入：_labelNamesIndex。
   * 调用线索：Math.min、Pioneer.Rect.pool.get、Pioneer.Rect.pool.release、c.origin.copy、c.size.set等。
   */
  update() {
    const t = this._viewport.getCamera();
    if (null === t) return;
    const e = t.getEntity().getScene();
    if (0 === this._labelNames.length) return;
    const i = this._labelNamesIndex % this._labelNames.length;
    const n = Math.min(this._labelNames.length, 20);
    const o = Pioneer.Rect.pool.get();
    for (let r = 0; r < n; r++) {
      const n = this._labelNames[(i + r) % this._labelNames.length];
      const a = this._labelInfos[n];
      const l = e.getEntity(n);
      if (null === l) {
        this.removeEntity(n);
        r--;
        continue;
      }
      const c = Pioneer.Rect.pool.get();
      c.origin.copy(l.getPixelSpacePosition(t));
      c.size.set(0, 0);
      this._quadtree.setBounds(n, c);
      Pioneer.Rect.pool.release(c);
      const h = l.getComponent(Pioneer.DivComponent);
      h ? (o.copy(h.getBounds()), this._divBoundsAdjustmentFunction && this._divBoundsAdjustmentFunction(o), this._quadtree.setBounds(`${n}-div`, o)) : this._quadtree.removeBounds(`${n}-div`);
      a.z = l.getCameraSpacePosition(t).magnitude();
    }
    if (Pioneer.Rect.pool.release(o), this._doOcclusions) for (let t = 0; t < n; t++) {
      const e = this._labelNames[(i + t) % this._labelNames.length];
      const s = this._labelInfos[e];
      const n = this._intersections[e];
      if (this._isLabelOccludedInDiv(s.divComponent)) {
        this._setLabelOcclusion(s.divComponent, false);
        continue;
      }
      this._quadtree.getIntersections(`${e}-div`, n);
      let o = false;
      for (let t = 0, e = n.getSize(); t < e; t++) {
        let e = n.getAt(t);
        if (!e.endsWith("-div")) continue;
        e = e.substring(0, e.length - 4);
        const i = this._labelInfos[e];
        if (void 0 !== i && !this._isLabelOccluded(i.divComponent) && this._isLessWeightsAndZ(s, i)) {
          o = true;
          break;
        }
      }
      this._setLabelOcclusion(s.divComponent, o);
    }
    this._labelNamesIndex = (i + n) % this._labelNames.length;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t.getDiv().classList.contains(t.getHiddenClass())`；调用 `t.getDiv`、`t.getDiv().classList.contains`、`t.getHiddenClass`。
   * 调用线索：t.getDiv、t.getDiv().classList.contains、t.getHiddenClass。
   */
  _isLabelOccludedInDiv(t) {
    return t.getDiv().classList.contains(t.getHiddenClass());
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t.getDiv().classList.contains(`${t.getHiddenClass()}ByLabelQuadtree`)||t.getDiv().classList.contains(t.getHiddenClass())`；调用 `t.getDiv`、`t.getDiv().classList.contains`、`t.getHiddenClass`。
   * 调用线索：t.getDiv、t.getDiv().classList.contains、t.getHiddenClass。
   */
  _isLabelOccluded(t) {
    return t.getDiv().classList.contains(`${t.getHiddenClass()}ByLabelQuadtree`) || t.getDiv().classList.contains(t.getHiddenClass());
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.getDiv`、`t.getDiv().classList.toggle`、`t.getHiddenClass`。
   * 调用线索：t.getDiv、t.getDiv().classList.toggle、t.getHiddenClass。
   */
  _setLabelOcclusion(t, e) {
    t.getDiv().classList.toggle(`${t.getHiddenClass()}ByLabelQuadtree`, e);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `i.weight<s.weight`。
   */
  _isLessWeights(t, e) {
    const i = this._labelInfos[t];
    const s = this._labelInfos[e];
    return i.weight < s.weight;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t.weight<e.weight` 或 `t.z>e.z`；调用 `e.divComponent.getEntity`、`e.divComponent.getEntity().getName`、`i.localeCompare`、`t.divComponent.getEntity`、`t.divComponent.getEntity().getName`。
   * 调用线索：e.divComponent.getEntity、e.divComponent.getEntity().getName、i.localeCompare、t.divComponent.getEntity、t.divComponent.getEntity().getName。
   */
  _isLessWeightsAndZ(t, e) {
    if (t.weight !== e.weight) return t.weight < e.weight;
    if (t.z !== e.z) return t.z > e.z;
    const i = t.divComponent.getEntity().getName();
    const s = e.divComponent.getEntity().getName();
    return i.localeCompare(s) < 0;
  }
  _viewport;
  _labelInfos;
  _labelNames;
  _quadtree;
  _labelNamesIndex;
  _doOcclusions;
  _intersections;
  _divBoundsAdjustmentFunction;
}
export { LabelQuadtree };
