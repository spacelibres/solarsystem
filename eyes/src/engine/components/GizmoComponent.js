// 关节坐标轴先累积模型局部变换，再应用模型缩放、旋转与平移；未绑定关节时使用实体或惯性朝向，三个轴共享统一尺寸。
// Recovered from app.js:333520-336278.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class GizmoComponent extends PioneerPublicApi.BaseComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
    this._size = void 0;
    this._relativeToEntity = true;
    this._joint = "";
    this._jointObject = null;
    this._model = null;
    this._lineMesh = null;
    this.__setRadius(2 * entity.getExtentsRadius());
    this.__setUsesEntityOrientation(this._relativeToEntity);
  }
  getSize() {
    return void 0 !== this._size ? this._size : Math.max(1e-4, 2 * this.getEntity().getExtentsRadius());
  }
  setSize(size) {
    this._size = size;
    this.__setRadius(this.getSize());
  }
  isRelativeToEntity() {
    return this._relativeToEntity;
  }
  setRelativeToEntity(relativeToEntity) {
    this._relativeToEntity = relativeToEntity;
    this.__setUsesEntityOrientation(this._relativeToEntity);
  }
  setJoint(joint, model) {
    this._joint = joint;
    if (model) this._model = model;else {
      const model = this.getEntity().getComponent(PioneerPublicApi.ModelComponent);
      if (null !== model) {
        this._model = model;
      }
    }
  }
  __prepareForRender(camera) {
    if (this._lineMesh) {
      if ("" !== this._joint) {
        if (!this._model) return;
        if (!(null !== this._jointObject && this._jointObject.name === this._joint)) {
          this._jointObject = this._model.getThreeJsObjectByName(this._joint);
        }
        if (!this._jointObject) return;
        const jointPosition = PioneerPublicApi.Vector3.pool.get();
        const jointOrientation = PioneerPublicApi.Quaternion.pool.get();
        this._model.getThreeJsPositionInObject(jointPosition, this._jointObject);
        this._model.getThreeJsOrientationInObject(jointOrientation, this._jointObject);
        jointPosition.scale(jointPosition, this._model.getScale());
        jointPosition.rotate(this._model.getRotation(), jointPosition);
        jointPosition.add(this._model.getTranslation(), jointPosition);
        jointOrientation.mult(this._model.getRotation(), jointOrientation);
        PioneerPublicApi.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), camera, jointPosition, true);
        PioneerPublicApi.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects()[0], this.getEntity(), jointOrientation);
        PioneerPublicApi.Vector3.pool.release(jointPosition);
        PioneerPublicApi.Quaternion.pool.release(jointOrientation);
      } else {
        if (this._relativeToEntity) {
          PioneerPublicApi.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects()[0], this.getEntity());
        } else {
          PioneerPublicApi.ThreeJsHelper.setOrientation(this.getThreeJsObjects()[0], PioneerPublicApi.Quaternion.Identity);
        }
        PioneerPublicApi.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), camera);
      }
      PioneerPublicApi.ThreeJsHelper.setScale(this.getThreeJsObjects()[0], this.getSize());
      this._lineMesh.prepareForRender(camera);
    }
  }
  async __loadResources() {
    this._lineMesh = new PioneerPublicApi.LineMesh(this);
    const positions = [];
    positions.push(new PioneerPublicApi.Vector3(0, 0, 0));
    positions.push(new PioneerPublicApi.Vector3(1, 0, 0));
    positions.push(new PioneerPublicApi.Vector3(0, 0, 0));
    positions.push(new PioneerPublicApi.Vector3(0, 1, 0));
    positions.push(new PioneerPublicApi.Vector3(0, 0, 0));
    positions.push(new PioneerPublicApi.Vector3(0, 0, 1));
    this._lineMesh.setPositions(positions);
    const colors = [];
    colors.push(new PioneerPublicApi.Color(1, 0, 0));
    colors.push(new PioneerPublicApi.Color(1, 0, 0));
    colors.push(new PioneerPublicApi.Color(0, 1, 0));
    colors.push(new PioneerPublicApi.Color(0, 1, 0));
    colors.push(new PioneerPublicApi.Color(0, 0, 1));
    colors.push(new PioneerPublicApi.Color(0, 0, 1));
    this._lineMesh.setColors(colors);
    const widths = [];
    widths.push(2);
    widths.push(2);
    widths.push(2);
    widths.push(2);
    widths.push(2);
    widths.push(2);
    this._lineMesh.setWidths(widths);
  }
  __unloadResources() {
    PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
    this._lineMesh = null;
  }
  _size;
  _relativeToEntity;
  _joint;
  _jointObject;
  _model;
  _lineMesh;
}
export { GizmoComponent };
