/** @eyes-analysis
 * 文件职责：管理透视投影、拾取、遮挡检测、多段深度渲染及后处理的渲染相机组件。
 * 依据：import ../pioneer/public-api.js；import ../../vendor/modules/EffectComposer.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:260849-270127.
import * as PioneerPublicApi from "../pioneer/public-api.js";
import * as EffectComposer from "../../vendor/modules/EffectComposer.js";
import * as OutlinePass from "../../vendor/modules/OutlinePass.js";
import * as RenderPass from "../../vendor/modules/RenderPass.js";
import * as UnrealBloomPass from "../../vendor/modules/UnrealBloomPass.js";
/** @eyes-analysis
 * 类职责：管理透视投影、拾取、遮挡检测、多段深度渲染及后处理的渲染相机组件。
 * 继承：PioneerPublicApi.BaseComponent；导出：CameraComponent。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class CameraComponent extends PioneerPublicApi.BaseComponent {
  /** @eyes-analysis
   * 【结构证据】写入 `_aspectRatio`、`_autoMidDistance`、`_autoNearDistance`、`_fieldOfView`、`_invertDepth`、`_midDistance`、`_nearDistance`、`_occludingEntities`；调用 `e.getScene`、`e.getScene().getThreeJsScene`、`new EffectComposer.EffectComposer`、`new OutlinePass.OutlinePass`、`new PioneerPublicApi.THREE.PerspectiveCamera`、`new PioneerPublicApi.THREE.Vector2`。
   * 状态写入：_aspectRatio、_autoMidDistance、_autoNearDistance、_fieldOfView、_invertDepth、_midDistance、_nearDistance、_occludingEntities等；完整记录见索引。
   * 调用线索：e.getScene、e.getScene().getThreeJsScene、new EffectComposer.EffectComposer、new OutlinePass.OutlinePass、new PioneerPublicApi.THREE.PerspectiveCamera等。
   */
  constructor(t, e) {
    super(t, e);
    this._viewport = null;
    this._fieldOfView = 1.0471975512;
    this._nearDistance = void 0;
    this._autoNearDistance = 0;
    this._midDistance = void 0;
    this._autoMidDistance = 0;
    this._invertDepth = 0;
    this._aspectRatio = 1;
    this._renderSize = new PioneerPublicApi.Vector2();
    this._occludingEntities = [];
    this._threeJsRenderer = this.getEntity().getScene().getEngine().__getThreeJsRenderer();
    this._threeJsScene = e.getScene().getThreeJsScene();
    this._threeJsCamera = new PioneerPublicApi.THREE.PerspectiveCamera(75, this._aspectRatio, .1, 1e3);
    const vector2 = new PioneerPublicApi.THREE.Vector2();
    this._threeJsRenderer.getSize(vector2);
    const webGLRenderTarget = new PioneerPublicApi.THREE.WebGLRenderTarget(vector2.x, vector2.y, {
      samples: 4
    });
    this._threeJsComposer = new EffectComposer.EffectComposer(this._threeJsRenderer, webGLRenderTarget);
    const renderPass = new RenderPass.RenderPass(this._threeJsScene, this._threeJsCamera);
    this._threeJsComposer.addPass(renderPass);
    this._outlinePass = new OutlinePass.OutlinePass(new PioneerPublicApi.THREE.Vector2(0, 0), this._threeJsScene, this._threeJsCamera, []);
    this._outlinePass.enabled = false;
    this._threeJsComposer.addPass(this._outlinePass);
    this._threeJsUnrealBloomPass = new UnrealBloomPass.UnrealBloomPass(new PioneerPublicApi.THREE.Vector2(0, 0), 0, 0, 0);
    this._threeJsUnrealBloomPass.enabled = false;
    this._threeJsComposer.addPass(this._threeJsUnrealBloomPass);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._viewport`。
   */
  getViewport() {
    return this._viewport;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._fieldOfView`。
   */
  getFieldOfView() {
    return this._fieldOfView;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._aspectRatio>=1?this._fieldOfView:2*Math.atan(Math.tan(this._fieldOfView/2)*this._aspectRatio)`；调用 `Math.atan`、`Math.tan`。
   * 调用线索：Math.atan、Math.tan。
   */
  getHorizontalFieldOfView() {
    return this._aspectRatio >= 1 ? this._fieldOfView : 2 * Math.atan(Math.tan(this._fieldOfView / 2) * this._aspectRatio);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._aspectRatio>1?2*Math.atan(Math.tan(this._fieldOfView/2)/this._aspectRatio):this._fieldOfView`；调用 `Math.atan`、`Math.tan`。
   * 调用线索：Math.atan、Math.tan。
   */
  getVerticalFieldOfView() {
    return this._aspectRatio > 1 ? 2 * Math.atan(Math.tan(this._fieldOfView / 2) / this._aspectRatio) : this._fieldOfView;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_fieldOfView`。
   * 状态写入：_fieldOfView。
   */
  setFieldOfView(fieldOfView) {
    this._fieldOfView = fieldOfView;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._invertDepth`。
   */
  getInvertDepth() {
    return this._invertDepth;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_invertDepth`。
   * 状态写入：_invertDepth。
   */
  setInvertDepth(invertDepth) {
    this._invertDepth = invertDepth;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._nearDistance`。
   */
  getNearDistance() {
    return this._nearDistance;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_nearDistance`。
   * 状态写入：_nearDistance。
   */
  setNearDistance(nearDistance) {
    this._nearDistance = nearDistance;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._autoNearDistance`。
   */
  getAutoNearDistance() {
    return this._autoNearDistance;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._midDistance`。
   */
  getMidDistance() {
    return this._midDistance;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_midDistance`。
   * 状态写入：_midDistance。
   */
  setMidDistance(midDistance) {
    this._midDistance = midDistance;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._autoMidDistance`。
   */
  getAutoMidDistance() {
    return this._autoMidDistance;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`i.rotateInverse`、`this.getEntity`、`this.getEntity().getOrientation`。
   * 调用线索：PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release、i.rotateInverse、this.getEntity、this.getEntity().getOrientation。
   */
  getNormalSpacePositionFromCameraSpacePosition(t, e) {
    const i = PioneerPublicApi.Vector3.pool.get();
    i.rotateInverse(this.getEntity().getOrientation(), e);
    t.x = this._threeJsCamera.projectionMatrix.elements[0] * i.x / i.y;
    t.y = this._threeJsCamera.projectionMatrix.elements[9] * i.z / i.y;
    t.z = this._threeJsCamera.projectionMatrix.elements[6] + this._threeJsCamera.projectionMatrix.elements[14] / i.y;
    PioneerPublicApi.Vector3.pool.release(i);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t/Math.abs(e)/Math.tan(this._fieldOfView/2)`；调用 `Math.abs`、`Math.tan`。
   * 调用线索：Math.abs、Math.tan。
   */
  getNormalSpaceRadiusFromRadius(t, e) {
    return t / Math.abs(e) / Math.tan(this._fieldOfView / 2);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`t.rotate`、`this.getEntity`、`this.getEntity().getOrientation`。
   * 调用线索：PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release、t.rotate、this.getEntity、this.getEntity().getOrientation。
   */
  getCameraSpacePositionFromNormalSpacePosition(t, e) {
    const i = PioneerPublicApi.Vector3.pool.get();
    i.y = this._threeJsCamera.projectionMatrix.elements[14] / (e.z - this._threeJsCamera.projectionMatrix.elements[6]);
    i.x = e.x * i.y / this._threeJsCamera.projectionMatrix.elements[0];
    i.z = e.y * i.y / this._threeJsCamera.projectionMatrix.elements[9];
    t.rotate(this.getEntity().getOrientation(), i);
    PioneerPublicApi.Vector3.pool.release(i);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t*Math.abs(e)*Math.tan(this._fieldOfView/2)`；调用 `Math.abs`、`Math.tan`。
   * 调用线索：Math.abs、Math.tan。
   */
  getRadiusFromNormalSpaceRadius(t, e) {
    return t * Math.abs(e) * Math.tan(this._fieldOfView / 2);
  }
  /** @eyes-analysis
   * 强制准备目标实体，逐个可渲染组件更新世界矩阵并 intersectObjects；跳过重复三角面命中，把命中点转回目标实体局部姿态坐标。
   * 调用线索：a.push、e.getEntity、e.getEntity().getOrientation、e.getThreeJsObjects、e.isRendering等。
   */
  getRaycast(t, e, i) {
    const raycaster = new PioneerPublicApi.THREE.Raycaster();
    const vector3 = new PioneerPublicApi.THREE.Vector3(t.x, t.y, t.z);
    const r = new PioneerPublicApi.THREE.Vector3(e.x, e.y, e.z);
    raycaster.set(vector3, r);
    i.__prepareForRender(this);
    const a = [];
    for (let t = 0, e = i.getNumComponents(); t < e; t++) {
      const e = i.getComponentAt(t);
      if (!e.isRendering(this)) continue;
      const o = e.getThreeJsObjects();
      for (let t = 0; t < o.length; t++) o[t].updateMatrixWorld();
      const r = raycaster.intersectObjects(e.getThreeJsObjects());
      for (let t = 0, i = r.length; t < i; t++) {
        const i = r[t];
        if (!i.face) continue;
        if (t > 0) {
          const e = r[t - 1];
          if (e.face && i.object === e.object && i.face.a === e.face.a && i.face.b === e.face.b && i.face.c === e.face.c) continue;
        }
        const n = i.object;
        const o = new PioneerPublicApi.Vector3();
        o.copyFromThreeJs(i.point);
        this.getEntity().getPositionRelativeToEntity(o, o, e.getEntity());
        o.rotateInverse(e.getEntity().getOrientation(), o);
        a.push({
          component: e,
          object: n,
          frameSpacePosition: o
        });
      }
    }
    return a;
  }
  /** @eyes-analysis
   * 在射线命中 UV 处逐个 shader texture uniform 画到临时 canvas 再采样像素；返回 textureName+color，并非最终光照后屏幕颜色。
   * 调用线索：Array.isArray、Math.floor、Object.entries、a.push、color.set等。
   */
  getRaycastColor(t, e, i) {
    const raycaster = new PioneerPublicApi.THREE.Raycaster();
    const vector3 = new PioneerPublicApi.THREE.Vector3(t.x, t.y, t.z);
    const r = new PioneerPublicApi.THREE.Vector3(e.x, e.y, e.z);
    raycaster.set(vector3, r);
    i.__prepareForRender(this);
    const a = [];
    for (let t = 0, e = i.getNumComponents(); t < e; t++) {
      const e = i.getComponentAt(t);
      if (!e.isRendering(this)) continue;
      const o = e.getThreeJsObjects();
      for (let t = 0; t < o.length; t++) o[t].updateMatrixWorld();
      const r = raycaster.intersectObjects(e.getThreeJsObjects());
      for (let t = 0; t < r.length; t++) {
        const i = r[t];
        if (!i.face) continue;
        if (t > 0) {
          const e = r[t - 1];
          if (e.face && i.object === e.object && i.face.a === e.face.a && i.face.b === e.face.b && i.face.c === e.face.c) continue;
        }
        const n = i.object;
        if (!(n instanceof PioneerPublicApi.THREE.Mesh)) continue;
        let o = n.material;
        if (Array.isArray(o) && (o = o[i.face.materialIndex]), o instanceof PioneerPublicApi.THREE.ShaderMaterial) for (const [t, r] of Object.entries(o.uniforms)) {
          const o = r.value;
          if (!(o instanceof PioneerPublicApi.THREE.Texture)) continue;
          const l = o.image;
          const c = t;
          const h = document.createElement("canvas");
          h.width = l.width;
          h.height = l.height;
          const d = h.getContext("2d");
          if (!d) continue;
          try {
            d.drawImage(l, 0, 0);
          } catch {
            continue;
          }
          const u = d.getImageData(0, 0, l.width, l.height);
          const p = i.uv;
          if (!p) continue;
          const _ = o.format === PioneerPublicApi.THREE.RGBAFormat ? 4 : 3;
          const m = (Math.floor(p.y * u.height) * u.width + Math.floor(p.x * u.width)) * _;
          const color = new PioneerPublicApi.Color();
          color.set(u.data[m + 0], u.data[m + 1], u.data[m + 2], 4 === _ ? u.data[m + 3] : 1);
          a.push({
            component: e,
            object: n,
            textureName: c,
            color: color
          });
        }
      }
    }
    return a;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `true` 或 `false`；调用 `this._occludingEntities[e].isOccludingPosition`。
   * 调用线索：this._occludingEntities[e].isOccludingPosition。
   */
  isPositionOccluded(t) {
    for (let e = 0; e < this._occludingEntities.length; e++) if (this._occludingEntities[e].isOccludingPosition(this, t)) return true;
    return false;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `i`；调用 `Number.isNaN`、`PioneerPublicApi.Geometry.getLineSphereIntersectionWithLineStartAtOrigin`、`PioneerPublicApi.Interval.pool.get`、`PioneerPublicApi.Interval.pool.release`、`a.magnitude`、`r.getCameraSpacePosition`。
   * 调用线索：Number.isNaN、PioneerPublicApi.Geometry.getLineSphereIntersectionWithLineStartAtOrigin、PioneerPublicApi.Interval.pool.get、PioneerPublicApi.Interval.pool.release、a.magnitude等。
   */
  getNearestIntersectingEntity(t) {
    let e = Number.POSITIVE_INFINITY;
    let i = null;
    const n = PioneerPublicApi.Interval.pool.get();
    for (let o = 0; o < this._occludingEntities.length; o++) {
      const r = this._occludingEntities[o];
      const a = r.getCameraSpacePosition(this);
      if (PioneerPublicApi.Geometry.getLineSphereIntersectionWithLineStartAtOrigin(n, t, a, r.getOcclusionRadius()), !Number.isNaN(n.min) && n.min >= 0) {
        const t = n.min * a.magnitude();
        t < e && (e = t, i = r);
      }
    }
    PioneerPublicApi.Interval.pool.release(n);
    return i;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_threeJsUnrealBloomPass.enabled`、`_threeJsUnrealBloomPass.strength`。
   * 状态写入：_threeJsUnrealBloomPass.enabled、_threeJsUnrealBloomPass.strength。
   */
  setBloom(t) {
    this._threeJsUnrealBloomPass.enabled = t > 0;
    this._threeJsUnrealBloomPass.strength = t;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_outlinePass.enabled`、`_outlinePass.selectedObjects`；调用 `e.getThreeJsObjectByName`、`e.getThreeJsObjects`、`new Error`、`this._outlinePass.hiddenEdgeColor.setRGB`、`this._outlinePass.selectedObjects.push`、`this._outlinePass.visibleEdgeColor.setRGB`；含显式错误分支。
   * 状态写入：_outlinePass.enabled、_outlinePass.selectedObjects。
   * 调用线索：e.getThreeJsObjectByName、e.getThreeJsObjects、new Error、this._outlinePass.hiddenEdgeColor.setRGB、this._outlinePass.selectedObjects.push等。
   */
  setOutline(t, e, i) {
    if (this._outlinePass.enabled = null !== e, null !== e) {
      if (void 0 !== i) {
        const t = e.getThreeJsObjectByName(i);
        if (null === t) throw new Error(`Could not set outline on component ${e} sub-object ${i}.`);
        this._outlinePass.selectedObjects = [t];
      } else {
        const t = e.getThreeJsObjects();
        this._outlinePass.selectedObjects = [];
        for (let e = 0, i = t.length; e < i; e++) {
          const i = t[e];
          i.parent === this._threeJsScene && this._outlinePass.selectedObjects.push(i);
        }
      }
      this._outlinePass.visibleEdgeColor.setRGB(t.r, t.g, t.b);
      this._outlinePass.hiddenEdgeColor.setRGB(t.r / 4, t.g / 4, t.b / 4);
    }
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `this._occludingEntities.push`。
   * 调用线索：this._occludingEntities.push。
   */
  __addToOccludingEntities(t) {
    for (let e = 0; e < this._occludingEntities.length; e++) if (this._occludingEntities[e] === t) return;
    this._occludingEntities.push(t);
  }
  /** @eyes-analysis
   * 调用组件销毁，再让 Scene 清除对该相机的缓存依赖，若绑定 viewport 则解绑。
   * 调用线索：super.__destroy、this._viewport.setCamera、this.getEntity、this.getEntity().getScene、this.getEntity().getScene().__removeCameraDependents。
   */
  __destroy() {
    super.__destroy();
    this.getEntity().getScene().__removeCameraDependents(this);
    null !== this._viewport && this._viewport.setCamera(null);
  }
  /** @eyes-analysis
   * 根据 viewport bounds 调整 composer 尺寸和 aspectRatio；以相机距父实体/地面的距离推导 near 与 mid，更新投影并递归刷新实体相机缓存；移除小于 1px、禁用或已删除遮挡体。
   * 状态写入：_aspectRatio、_autoMidDistance、_autoNearDistance。
   * 调用线索：Math.max、Math.min、e.canOcclude、e.getGroundComponent、e.getName等。
   */
  __updateCameraVariablesForConnectedScene() {
    if (this._viewport) {
      const t = this._viewport.getBounds().size;
      if (!t.equals(this._renderSize)) {
        this._renderSize.copy(t);
        const aspectRatio = t.x / t.y;
        this._aspectRatio !== aspectRatio && (this._aspectRatio = aspectRatio);
        this._threeJsComposer.setSize(t.x, t.y);
      }
    }
    const t = this.getEntity().getParent();
    if (t) {
      if (void 0 === this._nearDistance ? this._autoNearDistance = Math.max(1e-5, .1 * (this.getEntity().getPosition().magnitude() - t.getExtentsRadius())) : this._autoNearDistance = this._nearDistance, void 0 === this._midDistance ? this._autoMidDistance = Math.min(1e4 * this._autoNearDistance, this.getEntity().getPosition().magnitude() + 10 * t.getExtentsRadius()) : this._autoMidDistance = this._midDistance, void 0 === this._nearDistance || void 0 === this._midDistance) {
        let e = t;
        for (; e && !e.getGroundComponent();) e = e.getParent();
        if (e) {
          const t = Math.max(1e-5, this.getEntity().getDistanceTo(e, true));
          .1 * t < this._autoNearDistance && (this._autoNearDistance = .1 * t);
          10 * t < this._autoMidDistance && (this._autoMidDistance = 10 * t);
        }
      }
      this._updateProjectionMatrix();
      this.getEntity().__updateCameraVariables(this, null, false, 0);
      for (let t = 0; t < this._occludingEntities.length; t++) {
        const e = this._occludingEntities[t];
        (e.getPixelSpaceOcclusionRadius(this) < 1 || !e.isEnabled() || !e.canOcclude() || null === this.getEntity().getScene().getEntity(e.getName())) && (this._occludingEntities.splice(t, 1), t--);
      }
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `e.__render`、`i.__prepareForRender`、`i.isEnabled`、`t.getEntityAt`、`t.getNumEntities`、`this.getEntity`。
   * 调用线索：e.__render、i.__prepareForRender、i.isEnabled、t.getEntityAt、t.getNumEntities等。
   */
  __prepareForRender() {
    const t = this.getEntity().getScene();
    for (let e = 0; e < t.getNumEntities(); e++) {
      const i = t.getEntityAt(e);
      i.isEnabled() && i.__prepareForRender(this);
    }
    const e = this.getEntity().getComponent(PioneerPublicApi.DynamicEnvironmentMapComponent);
    null !== e && e.__render();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.Quaternion.threeJsPool.get`、`PioneerPublicApi.Quaternion.threeJsPool.release`、`e.set`、`this._threeJsCamera.setRotationFromQuaternion`、`this._threeJsComposer.render`、`this.getEntity`。
   * 调用线索：PioneerPublicApi.Quaternion.threeJsPool.get、PioneerPublicApi.Quaternion.threeJsPool.release、e.set、this._threeJsCamera.setRotationFromQuaternion、this._threeJsComposer.render等。
   */
  __render() {
    const t = this.getEntity().getOrientation();
    const e = PioneerPublicApi.Quaternion.threeJsPool.get();
    e.set(t.x, t.y, t.z, t.w);
    this._threeJsCamera.setRotationFromQuaternion(e);
    PioneerPublicApi.Quaternion.threeJsPool.release(e);
    this._threeJsComposer.render();
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_viewport`。
   * 状态写入：_viewport。
   */
  __setViewport(viewport) {
    this._viewport = viewport;
  }
  /** @eyes-analysis
   * 按 fieldOfView 与宽高比手工构建投影矩阵和逆矩阵；这里采用自定义轴布局，不能直接套 Three.js 常规 -Z 相机假设。
   * 状态写入：_threeJsCamera.projectionMatrix、_threeJsCamera.projectionMatrixInverse。
   * 调用线索：Math.tan、a.set、matrix4.set、new PioneerPublicApi.THREE.Matrix4。
   */
  _updateProjectionMatrix() {
    if (0 < this._fieldOfView && this._fieldOfView < 180 && this._aspectRatio > 0) {
      const t = Math.tan(this._fieldOfView / 2);
      let e;
      let i;
      this._aspectRatio >= 1 ? (e = 1 / t, i = this._aspectRatio / t) : (e = 1 / (t * this._aspectRatio), i = 1 / t);
      const n = 1 - Number.EPSILON;
      const o = this._autoNearDistance * (Number.EPSILON - 2);
      const matrix4 = new PioneerPublicApi.THREE.Matrix4();
      matrix4.set(e, 0, 0, 0, 0, 0, i, 0, 0, n, 0, o, 0, 1, 0, 0);
      this._threeJsCamera.projectionMatrix = matrix4;
      const a = new PioneerPublicApi.THREE.Matrix4();
      a.set(1 / e, 0, 0, 0, 0, 0, 0, 1, 0, 1 / i, 0, 0, 0, 0, 1 / o, -n / o);
      this._threeJsCamera.projectionMatrixInverse = a;
    }
  }
  _threeJsRenderer;
  _viewport;
  _threeJsScene;
  _fieldOfView;
  _nearDistance;
  _autoNearDistance;
  _midDistance;
  _autoMidDistance;
  _invertDepth;
  _aspectRatio;
  _renderSize;
  _occludingEntities;
  _threeJsCamera;
  _outlinePass;
  _threeJsUnrealBloomPass;
  _threeJsComposer;
}
export { CameraComponent };
