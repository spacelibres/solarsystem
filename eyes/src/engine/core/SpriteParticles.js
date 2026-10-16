/** @eyes-analysis
 * 文件职责：将粒子状态批量组织为可渲染精灵几何。
 * 依据：import ../pioneer/public-api.js；SpriteParticles @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:145350-147997.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：将粒子状态批量组织为可渲染精灵几何。
 * 继承：无显式父类；导出：SpriteParticles。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class SpriteParticles {
  /** @eyes-analysis
   * 【结构证据】写入 `_colorArray`、`_component`、`_offsetArray`、`_relativeToEntityOrientation`、`_scaleArray`、`_threeJsGeometry`、`_threeJsMaterial`、`_threeJsObject`；调用 `PioneerPublicApi.ThreeJsHelper.createMeshObjectGivenGeometry`、`new Float32Array`、`new PioneerPublicApi.THREE.BufferAttribute`、`new PioneerPublicApi.THREE.InstancedBufferAttribute`、`new PioneerPublicApi.THREE.InstancedBufferGeometry`、`new Uint16Array`。
   * 状态写入：_colorArray、_component、_offsetArray、_relativeToEntityOrientation、_scaleArray、_threeJsGeometry、_threeJsMaterial、_threeJsObject。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.createMeshObjectGivenGeometry、new Float32Array、new PioneerPublicApi.THREE.BufferAttribute、new PioneerPublicApi.THREE.InstancedBufferAttribute、new PioneerPublicApi.THREE.InstancedBufferGeometry等。
   */
  constructor(component) {
    this._component = component;
    this._relativeToEntityOrientation = true;
    this._offsetArray = new Float32Array(0);
    this._colorArray = new Float32Array(0);
    this._scaleArray = new Float32Array(0);
    this._threeJsGeometry = new PioneerPublicApi.THREE.InstancedBufferGeometry();
    this._threeJsGeometry.setAttribute("position", new PioneerPublicApi.THREE.BufferAttribute(new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0]), 3));
    this._threeJsGeometry.setIndex(new PioneerPublicApi.THREE.BufferAttribute(new Uint16Array([0, 1, 2, 2, 3, 0]), 1));
    this._threeJsGeometry.setAttribute("offset", new PioneerPublicApi.THREE.InstancedBufferAttribute(this._offsetArray, 3));
    this._threeJsGeometry.setAttribute("color", new PioneerPublicApi.THREE.InstancedBufferAttribute(this._colorArray, 4));
    this._threeJsGeometry.setAttribute("scale", new PioneerPublicApi.THREE.InstancedBufferAttribute(this._scaleArray, 1));
    this._threeJsMaterial = this._component.getEntity().getScene().getEngine().getMaterialManager().getPreloaded("sprite_particles");
    this._threeJsObject = PioneerPublicApi.ThreeJsHelper.createMeshObjectGivenGeometry(component, this._threeJsMaterial, this._threeJsGeometry);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._threeJsObject`。
   */
  getThreeJsObject() {
    return this._threeJsObject;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._threeJsMaterial`。
   */
  getThreeJsMaterial() {
    return this._threeJsMaterial;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._setAttribute`。
   * 调用线索：this._setAttribute。
   */
  setParticleOffsets(t) {
    this._setAttribute("offset", t, 3);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._setAttribute`。
   * 调用线索：this._setAttribute。
   */
  setParticleColors(t) {
    this._setAttribute("color", t, 4);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._setAttribute`。
   * 调用线索：this._setAttribute。
   */
  setParticleScales(t) {
    this._setAttribute("scale", t, 1);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._relativeToEntityOrientation`。
   */
  getRelativeToEntityOrientation() {
    return this._relativeToEntityOrientation;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_relativeToEntityOrientation`。
   * 状态写入：_relativeToEntityOrientation。
   */
  setRelativeToEntityOrientation(relativeToEntityOrientation) {
    this._relativeToEntityOrientation = relativeToEntityOrientation;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setOrientationToEntity`、`PioneerPublicApi.ThreeJsHelper.setPositionToEntity`、`this._component.getEntity`。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setOrientationToEntity、PioneerPublicApi.ThreeJsHelper.setPositionToEntity、this._component.getEntity。
   */
  prepareForRender(t) {
    PioneerPublicApi.ThreeJsHelper.setPositionToEntity(this._threeJsObject, this._component.getEntity(), t);
    this._relativeToEntityOrientation && PioneerPublicApi.ThreeJsHelper.setOrientationToEntity(this._threeJsObject, this._component.getEntity());
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_colorArray`、`_offsetArray`、`_scaleArray`、`_threeJsGeometry.instanceCount`；调用 `n.copyArray`、`new Float32Array`、`new PioneerPublicApi.THREE.InstancedBufferAttribute`、`this._threeJsGeometry.getAttribute`、`this._threeJsGeometry.setAttribute`。
   * 状态写入：_colorArray、_offsetArray、_scaleArray、_threeJsGeometry.instanceCount。
   * 调用线索：n.copyArray、new Float32Array、new PioneerPublicApi.THREE.InstancedBufferAttribute、this._threeJsGeometry.getAttribute、this._threeJsGeometry.setAttribute。
   */
  _setAttribute(t, e, i) {
    let n = this._threeJsGeometry.getAttribute(t);
    n instanceof PioneerPublicApi.THREE.InstancedBufferAttribute && n.count !== e.length / i && (this._offsetArray = new Float32Array(e.length / i * 3), this._colorArray = new Float32Array(e.length / i * 4), this._scaleArray = new Float32Array(e.length / i * 1), this._threeJsGeometry.instanceCount = e.length / i, this._threeJsGeometry.setAttribute("offset", new PioneerPublicApi.THREE.InstancedBufferAttribute(this._offsetArray, 3)), this._threeJsGeometry.setAttribute("color", new PioneerPublicApi.THREE.InstancedBufferAttribute(this._colorArray, 4)), this._threeJsGeometry.setAttribute("scale", new PioneerPublicApi.THREE.InstancedBufferAttribute(this._scaleArray, 1)));
    n = this._threeJsGeometry.getAttribute(t);
    n instanceof PioneerPublicApi.THREE.InstancedBufferAttribute && (n.copyArray(e), n.needsUpdate = true);
  }
  _component;
  _relativeToEntityOrientation;
  _offsetArray;
  _colorArray;
  _scaleArray;
  _threeJsGeometry;
  _threeJsMaterial;
  _threeJsObject;
}
export { SpriteParticles };
