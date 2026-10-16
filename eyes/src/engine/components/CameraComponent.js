// Recovered from app.js:260849-270127.
import * as PioneerPublicApi from "../pioneer/public-api.js";
import * as EffectComposer from "../../vendor/modules/EffectComposer.js";
import * as OutlinePass from "../../vendor/modules/OutlinePass.js";
import * as RenderPass from "../../vendor/modules/RenderPass.js";
import * as UnrealBloomPass from "../../vendor/modules/UnrealBloomPass.js";
class CameraComponent extends PioneerPublicApi.BaseComponent {
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
  getViewport() {
    return this._viewport;
  }
  getFieldOfView() {
    return this._fieldOfView;
  }
  getHorizontalFieldOfView() {
    return this._aspectRatio >= 1 ? this._fieldOfView : 2 * Math.atan(Math.tan(this._fieldOfView / 2) * this._aspectRatio);
  }
  getVerticalFieldOfView() {
    return this._aspectRatio > 1 ? 2 * Math.atan(Math.tan(this._fieldOfView / 2) / this._aspectRatio) : this._fieldOfView;
  }
  setFieldOfView(fieldOfView) {
    this._fieldOfView = fieldOfView;
  }
  getInvertDepth() {
    return this._invertDepth;
  }
  setInvertDepth(invertDepth) {
    this._invertDepth = invertDepth;
  }
  getNearDistance() {
    return this._nearDistance;
  }
  setNearDistance(nearDistance) {
    this._nearDistance = nearDistance;
  }
  getAutoNearDistance() {
    return this._autoNearDistance;
  }
  getMidDistance() {
    return this._midDistance;
  }
  setMidDistance(midDistance) {
    this._midDistance = midDistance;
  }
  getAutoMidDistance() {
    return this._autoMidDistance;
  }
  getNormalSpacePositionFromCameraSpacePosition(t, e) {
    const i = PioneerPublicApi.Vector3.pool.get();
    i.rotateInverse(this.getEntity().getOrientation(), e);
    t.x = this._threeJsCamera.projectionMatrix.elements[0] * i.x / i.y;
    t.y = this._threeJsCamera.projectionMatrix.elements[9] * i.z / i.y;
    t.z = this._threeJsCamera.projectionMatrix.elements[6] + this._threeJsCamera.projectionMatrix.elements[14] / i.y;
    PioneerPublicApi.Vector3.pool.release(i);
  }
  getNormalSpaceRadiusFromRadius(t, e) {
    return t / Math.abs(e) / Math.tan(this._fieldOfView / 2);
  }
  getCameraSpacePositionFromNormalSpacePosition(t, e) {
    const i = PioneerPublicApi.Vector3.pool.get();
    i.y = this._threeJsCamera.projectionMatrix.elements[14] / (e.z - this._threeJsCamera.projectionMatrix.elements[6]);
    i.x = e.x * i.y / this._threeJsCamera.projectionMatrix.elements[0];
    i.z = e.y * i.y / this._threeJsCamera.projectionMatrix.elements[9];
    t.rotate(this.getEntity().getOrientation(), i);
    PioneerPublicApi.Vector3.pool.release(i);
  }
  getRadiusFromNormalSpaceRadius(t, e) {
    return t * Math.abs(e) * Math.tan(this._fieldOfView / 2);
  }
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
  isPositionOccluded(t) {
    for (let e = 0; e < this._occludingEntities.length; e++) if (this._occludingEntities[e].isOccludingPosition(this, t)) return true;
    return false;
  }
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
  setBloom(t) {
    this._threeJsUnrealBloomPass.enabled = t > 0;
    this._threeJsUnrealBloomPass.strength = t;
  }
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
  __addToOccludingEntities(t) {
    for (let e = 0; e < this._occludingEntities.length; e++) if (this._occludingEntities[e] === t) return;
    this._occludingEntities.push(t);
  }
  __destroy() {
    super.__destroy();
    this.getEntity().getScene().__removeCameraDependents(this);
    null !== this._viewport && this._viewport.setCamera(null);
  }
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
  __prepareForRender() {
    const t = this.getEntity().getScene();
    for (let e = 0; e < t.getNumEntities(); e++) {
      const i = t.getEntityAt(e);
      i.isEnabled() && i.__prepareForRender(this);
    }
    const e = this.getEntity().getComponent(PioneerPublicApi.DynamicEnvironmentMapComponent);
    null !== e && e.__render();
  }
  __render() {
    const t = this.getEntity().getOrientation();
    const e = PioneerPublicApi.Quaternion.threeJsPool.get();
    e.set(t.x, t.y, t.z, t.w);
    this._threeJsCamera.setRotationFromQuaternion(e);
    PioneerPublicApi.Quaternion.threeJsPool.release(e);
    this._threeJsComposer.render();
  }
  __setViewport(viewport) {
    this._viewport = viewport;
  }
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
