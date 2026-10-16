// Recovered from app.js:719509-724180.
/* 标签四叉树同时登记实体投影点与 -div 后缀矩形，每次最多轮转更新二十个标签。遮挡按权重、相机距离和名称稳定决胜；destroy 或关闭遮挡时归还由此类添加的隐藏 class。 */
import * as Pioneer from "../pioneer/index.js";
import * as Quadtree from "./Quadtree.js";
class LabelQuadtree {
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
  destroy() {
    for (let labelIndex = 0, labelCount = this._labelNames.length; labelIndex < labelCount; labelIndex++) {
      const labelName = this._labelNames[labelIndex];
      this._setLabelOcclusion(this._labelInfos[labelName].divComponent, false);
    }
    this._labelInfos = {};
    this._labelNames = [];
  }
  getDoOcclusions() {
    return this._doOcclusions;
  }
  setDoOcclusions(doOcclusions) {
    if (this._doOcclusions = doOcclusions, !this._doOcclusions) for (let labelIndex = 0, labelCount = this._labelNames.length; labelIndex < labelCount; labelIndex++) {
      const labelName = this._labelNames[labelIndex];
      this._setLabelOcclusion(this._labelInfos[labelName].divComponent, false);
    }
  }
  addEntity(entity, weight) {
    const entityName = entity.getName();
    if (void 0 !== this._labelInfos[entityName]) return;
    const divComponent = entity.getComponent(Pioneer.DivComponent);
    if (null === divComponent) throw new Error(`Entity ${entity.getName()} added with no div component.`);
    const labelInfo = {
      weight: weight,
      z: Number.POSITIVE_INFINITY,
      divComponent: divComponent
    };
    this._labelInfos[entityName] = labelInfo;
    this._labelNames.push(entityName);
    Pioneer.Sort.sortObject(this._labelNames, this._isLessWeights);
    this._intersections[entityName] = new Pioneer.FastSet();
    this._intersections[`${entityName}-div`] = new Pioneer.FastSet();
  }
  removeEntity(entityName) {
    void 0 !== this._labelInfos[entityName] && (delete this._labelInfos[entityName], delete this._intersections[entityName], delete this._intersections[`${entityName}-div`], this._labelNames.splice(this._labelNames.findIndex(labelName => labelName === entityName), 1), this._quadtree.removeBounds(`${entityName}-div`), this._quadtree.removeBounds(entityName));
  }
  getBounds(boundsName, outputBounds) {
    this._quadtree.getBounds(boundsName, outputBounds);
  }
  setBounds(boundsName, bounds) {
    if (boundsName.endsWith("-div")) throw new Error("Cannot make a bounds name end with `-div`, as it is reserved for entities.");
    if (this._labelNames.includes(boundsName)) throw new Error(`There is an entity named ${boundsName}. Use addEntity() instead.`);
    this._intersections[boundsName] = new Pioneer.FastSet();
    this._quadtree.setBounds(boundsName, bounds);
  }
  removeRect(boundsName) {
    if (boundsName in this._labelInfos) throw new Error(`There is an entity named ${boundsName}. Use removeEntity() instead.`);
    delete this._intersections[boundsName];
    this._quadtree.removeBounds(boundsName);
  }
  setWeight(entityName, weight) {
    const labelInfo = this._labelInfos[entityName];
    if (void 0 === labelInfo) throw new Error(`Weight set for entity ${entityName} not in the label quadtree.`);
    labelInfo.weight = weight;
    Pioneer.Sort.sortObject(this._labelNames, this._isLessWeights);
  }
  getIntersections(boundsName, outputIntersections) {
    this._quadtree.getIntersections(boundsName, outputIntersections);
  }
  setDivBoundsAdjustFunction(divBoundsAdjustmentFunction) {
    this._divBoundsAdjustmentFunction = divBoundsAdjustmentFunction;
  }
  update() {
    const camera = this._viewport.getCamera();
    if (null === camera) return;
    const scene = camera.getEntity().getScene();
    if (0 === this._labelNames.length) return;
    const startIndex = this._labelNamesIndex % this._labelNames.length;
    const batchSize = Math.min(this._labelNames.length, 20);
    const divBounds = Pioneer.Rect.pool.get();
    for (let batchIndex = 0; batchIndex < batchSize; batchIndex++) {
      const entityName = this._labelNames[(startIndex + batchIndex) % this._labelNames.length];
      const labelInfo = this._labelInfos[entityName];
      const entity = scene.getEntity(entityName);
      if (null === entity) {
        this.removeEntity(entityName);
        batchIndex--;
        continue;
      }
      const pointBounds = Pioneer.Rect.pool.get();
      pointBounds.origin.copy(entity.getPixelSpacePosition(camera));
      pointBounds.size.set(0, 0);
      this._quadtree.setBounds(entityName, pointBounds);
      Pioneer.Rect.pool.release(pointBounds);
      const divComponent = entity.getComponent(Pioneer.DivComponent);
      divComponent ? (divBounds.copy(divComponent.getBounds()), this._divBoundsAdjustmentFunction && this._divBoundsAdjustmentFunction(divBounds), this._quadtree.setBounds(`${entityName}-div`, divBounds)) : this._quadtree.removeBounds(`${entityName}-div`);
      labelInfo.z = entity.getCameraSpacePosition(camera).magnitude();
    }
    if (Pioneer.Rect.pool.release(divBounds), this._doOcclusions) for (let batchIndex = 0; batchIndex < batchSize; batchIndex++) {
      const entityName = this._labelNames[(startIndex + batchIndex) % this._labelNames.length];
      const labelInfo = this._labelInfos[entityName];
      const intersections = this._intersections[entityName];
      if (this._isLabelOccludedInDiv(labelInfo.divComponent)) {
        this._setLabelOcclusion(labelInfo.divComponent, false);
        continue;
      }
      this._quadtree.getIntersections(`${entityName}-div`, intersections);
      let isOccluded = false;
      for (let intersectionIndex = 0, intersectionCount = intersections.getSize(); intersectionIndex < intersectionCount; intersectionIndex++) {
        let intersectingName = intersections.getAt(intersectionIndex);
        if (!intersectingName.endsWith("-div")) continue;
        intersectingName = intersectingName.substring(0, intersectingName.length - 4);
        const otherLabelInfo = this._labelInfos[intersectingName];
        if (void 0 !== otherLabelInfo && !this._isLabelOccluded(otherLabelInfo.divComponent) && this._isLessWeightsAndZ(labelInfo, otherLabelInfo)) {
          isOccluded = true;
          break;
        }
      }
      this._setLabelOcclusion(labelInfo.divComponent, isOccluded);
    }
    this._labelNamesIndex = (startIndex + batchSize) % this._labelNames.length;
  }
  _isLabelOccludedInDiv(divComponent) {
    return divComponent.getDiv().classList.contains(divComponent.getHiddenClass());
  }
  _isLabelOccluded(divComponent) {
    return divComponent.getDiv().classList.contains(`${divComponent.getHiddenClass()}ByLabelQuadtree`) || divComponent.getDiv().classList.contains(divComponent.getHiddenClass());
  }
  _setLabelOcclusion(divComponent, isOccluded) {
    divComponent.getDiv().classList.toggle(`${divComponent.getHiddenClass()}ByLabelQuadtree`, isOccluded);
  }
  _isLessWeights(leftName, rightName) {
    const leftInfo = this._labelInfos[leftName];
    const rightInfo = this._labelInfos[rightName];
    return leftInfo.weight < rightInfo.weight;
  }
  _isLessWeightsAndZ(leftInfo, rightInfo) {
    if (leftInfo.weight !== rightInfo.weight) return leftInfo.weight < rightInfo.weight;
    if (leftInfo.z !== rightInfo.z) return leftInfo.z > rightInfo.z;
    const leftName = leftInfo.divComponent.getEntity().getName();
    const rightName = rightInfo.divComponent.getEntity().getName();
    return leftName.localeCompare(rightName) < 0;
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
