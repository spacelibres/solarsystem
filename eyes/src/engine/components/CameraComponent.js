// 相机约定 Y 为前向、Z 为上向；投影矩阵与逆矩阵必须配对，normal/camera 空间转换共享同一系数。射线命中按面去重，颜色采样沿 shader texture uniform 读取；相机拥有后处理链，实体与视口仅通过现有接口连接。
// Recovered from app.js:260849-270127.
import * as PioneerPublicApi from "../pioneer/public-api.js";
import * as EffectComposer from "../../vendor/modules/EffectComposer.js";
import * as OutlinePass from "../../vendor/modules/OutlinePass.js";
import * as RenderPass from "../../vendor/modules/RenderPass.js";
import * as UnrealBloomPass from "../../vendor/modules/UnrealBloomPass.js";
class CameraComponent extends PioneerPublicApi.BaseComponent {
  /* PerspectiveCamera 只作为 Three 相机载体，后续以 +Y 前向自定义矩阵覆盖默认投影。后处理顺序为 RenderPass → OutlinePass → UnrealBloomPass，后两项默认禁用。 */
  constructor(componentName, entity) {
    super(componentName, entity);
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
    this._threeJsScene = entity.getScene().getThreeJsScene();
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
  /* _fieldOfView 是较长屏幕轴的角度，单位为弧度；横屏直接作为水平角，竖屏按宽高比缩小水平角。 */
  getHorizontalFieldOfView() {
    return this._aspectRatio >= 1 ? this._fieldOfView : 2 * Math.atan(Math.tan(this._fieldOfView / 2) * this._aspectRatio);
  }
  /* 横屏按宽高比缩小垂直角，竖屏直接使用 _fieldOfView。不要把它当 Three.PerspectiveCamera 的固定垂直 degree fov。 */
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
  /* 输入只去掉相机平移、仍沿世界轴；先乘实体朝向的逆得到 +Y 前向坐标，再按投影矩阵的列主序 elements[0/9/6/14] 求 NDC。 */
  getNormalSpacePositionFromCameraSpacePosition(output, cameraPosition) {
    const framePosition = PioneerPublicApi.Vector3.pool.get();
    framePosition.rotateInverse(this.getEntity().getOrientation(), cameraPosition);
    output.x = this._threeJsCamera.projectionMatrix.elements[0] * framePosition.x / framePosition.y;
    output.y = this._threeJsCamera.projectionMatrix.elements[9] * framePosition.z / framePosition.y;
    output.z = this._threeJsCamera.projectionMatrix.elements[6] + this._threeJsCamera.projectionMatrix.elements[14] / framePosition.y;
    PioneerPublicApi.Vector3.pool.release(framePosition);
  }
  getNormalSpaceRadiusFromRadius(radius, distance) {
    return radius / Math.abs(distance) / Math.tan(this._fieldOfView / 2);
  }
  /* 与正向公式共用同一深度系数，恢复 +Y 前向坐标后再乘相机实体朝向。池向量在 copy 完成后归还，允许 output 与输入别名。 */
  getCameraSpacePositionFromNormalSpacePosition(output, normalPosition) {
    const framePosition = PioneerPublicApi.Vector3.pool.get();
    framePosition.y = this._threeJsCamera.projectionMatrix.elements[14] / (normalPosition.z - this._threeJsCamera.projectionMatrix.elements[6]);
    framePosition.x = normalPosition.x * framePosition.y / this._threeJsCamera.projectionMatrix.elements[0];
    framePosition.z = normalPosition.y * framePosition.y / this._threeJsCamera.projectionMatrix.elements[9];
    output.rotate(this.getEntity().getOrientation(), framePosition);
    PioneerPublicApi.Vector3.pool.release(framePosition);
  }
  getRadiusFromNormalSpaceRadius(normalRadius, distance) {
    return normalRadius * Math.abs(distance) * Math.tan(this._fieldOfView / 2);
  }
  /* 先让目标实体把本相机的显示状态/矩阵写到 Three 对象；Three.Raycaster 返回的是相机平移原点下的坐标，再还原为命中实体局部帧。只去重同对象、同面顶点索引的连续命中。 */
  getRaycast(rayOrigin, rayDirection, entity) {
    const raycaster = new PioneerPublicApi.THREE.Raycaster();
    const threeOrigin = new PioneerPublicApi.THREE.Vector3(rayOrigin.x, rayOrigin.y, rayOrigin.z);
    const threeDirection = new PioneerPublicApi.THREE.Vector3(rayDirection.x, rayDirection.y, rayDirection.z);
    raycaster.set(threeOrigin, threeDirection);
    entity.__prepareForRender(this);
    const hits = [];
    for (let componentIndex = 0, componentCount = entity.getNumComponents(); componentIndex < componentCount; componentIndex++) {
      const component = entity.getComponentAt(componentIndex);
      if (!component.isRendering(this)) continue;
      const objects = component.getThreeJsObjects();
      for (let objectIndex = 0; objectIndex < objects.length; objectIndex++) objects[objectIndex].updateMatrixWorld();
      const intersections = raycaster.intersectObjects(component.getThreeJsObjects());
      for (let intersectionIndex = 0, intersectionCount = intersections.length; intersectionIndex < intersectionCount; intersectionIndex++) {
        const intersection = intersections[intersectionIndex];
        if (!intersection.face) continue;
        if (intersectionIndex > 0) {
          const previousIntersection = intersections[intersectionIndex - 1];
          if (previousIntersection.face && intersection.object === previousIntersection.object && intersection.face.a === previousIntersection.face.a && intersection.face.b === previousIntersection.face.b && intersection.face.c === previousIntersection.face.c) continue;
        }
        const object = intersection.object;
        const framePosition = new PioneerPublicApi.Vector3();
        framePosition.copyFromThreeJs(intersection.point);
        this.getEntity().getPositionRelativeToEntity(framePosition, framePosition, component.getEntity());
        framePosition.rotateInverse(component.getEntity().getOrientation(), framePosition);
        hits.push({
          component: component,
          object: object,
          frameSpacePosition: framePosition
        });
      }
    }
    return hits;
  }
  // 对同面连续命中去重后逐个纹理 uniform 采样；保留原来的像素跨距和 UV 取整规则。
  /* canvas.getImageData 总是 RGBA 字节；原实现却按 texture.format 选择 3/4 跨距，且没有按 texture.transformUv 处理。这里保留原采样算法，准确取样仍待专门修复与验证。 */
  getRaycastColor(rayOrigin, rayDirection, entity) {
    const raycaster = new PioneerPublicApi.THREE.Raycaster();
    const threeOrigin = new PioneerPublicApi.THREE.Vector3(rayOrigin.x, rayOrigin.y, rayOrigin.z);
    const threeDirection = new PioneerPublicApi.THREE.Vector3(rayDirection.x, rayDirection.y, rayDirection.z);
    raycaster.set(threeOrigin, threeDirection);
    entity.__prepareForRender(this);
    const hits = [];
    for (let componentIndex = 0, componentCount = entity.getNumComponents(); componentIndex < componentCount; componentIndex++) {
      const component = entity.getComponentAt(componentIndex);
      if (!component.isRendering(this)) continue;
      const objects = component.getThreeJsObjects();
      for (let objectIndex = 0; objectIndex < objects.length; objectIndex++) objects[objectIndex].updateMatrixWorld();
      const intersections = raycaster.intersectObjects(component.getThreeJsObjects());
      for (let intersectionIndex = 0; intersectionIndex < intersections.length; intersectionIndex++) {
        const intersection = intersections[intersectionIndex];
        if (!intersection.face) continue;
        if (intersectionIndex > 0) {
          const previousIntersection = intersections[intersectionIndex - 1];
          if (previousIntersection.face && intersection.object === previousIntersection.object && intersection.face.a === previousIntersection.face.a && intersection.face.b === previousIntersection.face.b && intersection.face.c === previousIntersection.face.c) continue;
        }
        const object = intersection.object;
        if (!(object instanceof PioneerPublicApi.THREE.Mesh)) continue;
        let material = object.material;
        if (Array.isArray(material)) {
          material = material[intersection.face.materialIndex];
        }
        if (material instanceof PioneerPublicApi.THREE.ShaderMaterial) for (const [uniformName, uniform] of Object.entries(material.uniforms)) {
          const texture = uniform.value;
          if (!(texture instanceof PioneerPublicApi.THREE.Texture)) continue;
          const image = texture.image;
          const textureName = uniformName;
          const canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          const context = canvas.getContext("2d");
          if (!context) continue;
          try {
            context.drawImage(image, 0, 0);
          } catch {
            continue;
          }
          const imageData = context.getImageData(0, 0, image.width, image.height);
          const textureCoordinates = intersection.uv;
          if (!textureCoordinates) continue;
          const channels = texture.format === PioneerPublicApi.THREE.RGBAFormat ? 4 : 3;
          const pixelOffset = (Math.floor(textureCoordinates.y * imageData.height) * imageData.width + Math.floor(textureCoordinates.x * imageData.width)) * channels;
          const color = new PioneerPublicApi.Color();
          color.set(imageData.data[pixelOffset + 0], imageData.data[pixelOffset + 1], imageData.data[pixelOffset + 2], 4 === channels ? imageData.data[pixelOffset + 3] : 1);
          hits.push({
            component: component,
            object: object,
            textureName: textureName,
            color: color
          });
        }
      }
    }
    return hits;
  }
  isPositionOccluded(cameraPosition) {
    for (let occluderIndex = 0; occluderIndex < this._occludingEntities.length; occluderIndex++) if (this._occludingEntities[occluderIndex].isOccludingPosition(this, cameraPosition)) return true;
    return false;
  }
  getNearestIntersectingEntity(rayDirection) {
    let nearestDistance = Number.POSITIVE_INFINITY;
    let nearestEntity = null;
    const intersection = PioneerPublicApi.Interval.pool.get();
    for (let entityIndex = 0; entityIndex < this._occludingEntities.length; entityIndex++) {
      const entity = this._occludingEntities[entityIndex];
      const entityPosition = entity.getCameraSpacePosition(this);
      PioneerPublicApi.Geometry.getLineSphereIntersectionWithLineStartAtOrigin(intersection, rayDirection, entityPosition, entity.getOcclusionRadius());
      if (!Number.isNaN(intersection.min) && intersection.min >= 0) {
        const distance = intersection.min * entityPosition.magnitude();
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestEntity = entity;
        }
      }
    }
    PioneerPublicApi.Interval.pool.release(intersection);
    return nearestEntity;
  }
  setBloom(strength) {
    this._threeJsUnrealBloomPass.enabled = strength > 0;
    this._threeJsUnrealBloomPass.strength = strength;
  }
  /* 只收直接挂在当前 THREE.Scene 的根对象，或按名称精确选择一个子对象；可见边颜色用原色，遮挡边为四分之一强度。 */
  setOutline(color, component, objectName) {
    this._outlinePass.enabled = null !== component;
    if (null !== component) {
      if (void 0 !== objectName) {
        const selectedObject = component.getThreeJsObjectByName(objectName);
        if (null === selectedObject) throw new Error(`Could not set outline on component ${component} sub-object ${objectName}.`);
        this._outlinePass.selectedObjects = [selectedObject];
      } else {
        const objects = component.getThreeJsObjects();
        this._outlinePass.selectedObjects = [];
        for (let objectIndex = 0, objectCount = objects.length; objectIndex < objectCount; objectIndex++) {
          const object = objects[objectIndex];
          if (object.parent === this._threeJsScene) {
            this._outlinePass.selectedObjects.push(object);
          }
        }
      }
      this._outlinePass.visibleEdgeColor.setRGB(color.r, color.g, color.b);
      this._outlinePass.hiddenEdgeColor.setRGB(color.r / 4, color.g / 4, color.b / 4);
    }
  }
  __addToOccludingEntities(entity) {
    for (let entityIndex = 0; entityIndex < this._occludingEntities.length; entityIndex++) if (this._occludingEntities[entityIndex] === entity) return;
    this._occludingEntities.push(entity);
  }
  /* 本方法只解除视口/实体相机缓存，没有调用 composer.dispose；不能据此认为 render targets 与 passes 已全部释放。 */
  __destroy() {
    super.__destroy();
    this.getEntity().getScene().__removeCameraDependents(this);
    if (null !== this._viewport) {
      this._viewport.setCamera(null);
    }
  }
  /* DOM 尺寸决定 composer 尺寸与投影宽高比；自动 near/mid 结合父实体外接半径和地表距离收紧。mid/invertDepth 后续交给自定义 shader，不能替换成标准 far plane。 */
  __updateCameraVariablesForConnectedScene() {
    if (this._viewport) {
      const viewportSize = this._viewport.getBounds().size;
      if (!viewportSize.equals(this._renderSize)) {
        this._renderSize.copy(viewportSize);
        const aspectRatio = viewportSize.x / viewportSize.y;
        if (this._aspectRatio !== aspectRatio) {
          this._aspectRatio = aspectRatio;
        }
        this._threeJsComposer.setSize(viewportSize.x, viewportSize.y);
      }
    }
    const parentEntity = this.getEntity().getParent();
    if (parentEntity) {
      if (void 0 === this._nearDistance) {
        this._autoNearDistance = Math.max(1e-5, .1 * (this.getEntity().getPosition().magnitude() - parentEntity.getExtentsRadius()));
      } else {
        this._autoNearDistance = this._nearDistance;
      }
      if (void 0 === this._midDistance) {
        this._autoMidDistance = Math.min(1e4 * this._autoNearDistance, this.getEntity().getPosition().magnitude() + 10 * parentEntity.getExtentsRadius());
      } else {
        this._autoMidDistance = this._midDistance;
      }
      if (void 0 === this._nearDistance || void 0 === this._midDistance) {
        let groundAncestor = parentEntity;
        for (; groundAncestor && !groundAncestor.getGroundComponent();) groundAncestor = groundAncestor.getParent();
        if (groundAncestor) {
          const groundDistance = Math.max(1e-5, this.getEntity().getDistanceTo(groundAncestor, true));
          if (.1 * groundDistance < this._autoNearDistance) {
            this._autoNearDistance = .1 * groundDistance;
          }
          if (10 * groundDistance < this._autoMidDistance) {
            this._autoMidDistance = 10 * groundDistance;
          }
        }
      }
      this._updateProjectionMatrix();
      this.getEntity().__updateCameraVariables(this, null, false, 0);
      for (let occluderIndex = 0; occluderIndex < this._occludingEntities.length; occluderIndex++) {
        const occluder = this._occludingEntities[occluderIndex];
        if (occluder.getPixelSpaceOcclusionRadius(this) < 1 || !occluder.isEnabled() || !occluder.canOcclude() || null === this.getEntity().getScene().getEntity(occluder.getName())) {
          this._occludingEntities.splice(occluderIndex, 1);
          occluderIndex--;
        }
      }
    }
  }
  /* 多个视口复用同一批 Three 对象，所以每个相机绘制前都重新准备可见状态与 camera-relative 位姿，随后按需更新动态环境贴图。 */
  __prepareForRender() {
    const scene = this.getEntity().getScene();
    for (let entityIndex = 0; entityIndex < scene.getNumEntities(); entityIndex++) {
      const entity = scene.getEntityAt(entityIndex);
      if (entity.isEnabled()) {
        entity.__prepareForRender(this);
      }
    }
    const environmentMap = this.getEntity().getComponent(PioneerPublicApi.DynamicEnvironmentMapComponent);
    if (null !== environmentMap) {
      environmentMap.__render();
    }
  }
  /* 渲染相机只设置朝向；实体对象已经相对相机平移，不应再给 Three 相机写同一大尺度世界位置。Composer 运行 Render/Outline/Bloom 通道。 */
  __render() {
    const entityOrientation = this.getEntity().getOrientation();
    const orientation = PioneerPublicApi.Quaternion.threeJsPool.get();
    orientation.set(entityOrientation.x, entityOrientation.y, entityOrientation.z, entityOrientation.w);
    this._threeJsCamera.setRotationFromQuaternion(orientation);
    PioneerPublicApi.Quaternion.threeJsPool.release(orientation);
    this._threeJsComposer.render();
  }
  __setViewport(viewport) {
    this._viewport = viewport;
  }
  // 这里采用 Y 前向的投影排列，转换函数读取 elements[0/9/6/14]；逆矩阵必须同步更新。
  /* 采用 +Y 前向、+Z 上向和远端趋于 1 的投影，Three.Matrix4.set 按行传参、elements 按列读取。显式写投影及其逆，不能调用标准 updateProjectionMatrix 覆盖。fov 上限 180 的旧判断仍保留，尽管三角函数用弧度。 */
  _updateProjectionMatrix() {
    if (0 < this._fieldOfView && this._fieldOfView < 180 && this._aspectRatio > 0) {
      const halfFovTangent = Math.tan(this._fieldOfView / 2);
      let horizontalScale;
      let verticalScale;
      if (this._aspectRatio >= 1) {
        horizontalScale = 1 / halfFovTangent;
        verticalScale = this._aspectRatio / halfFovTangent;
      } else {
        horizontalScale = 1 / (halfFovTangent * this._aspectRatio);
        verticalScale = 1 / halfFovTangent;
      }
      const depthScale = 1 - Number.EPSILON;
      const depthOffset = this._autoNearDistance * (Number.EPSILON - 2);
      const matrix4 = new PioneerPublicApi.THREE.Matrix4();
      matrix4.set(horizontalScale, 0, 0, 0, 0, 0, verticalScale, 0, 0, depthScale, 0, depthOffset, 0, 1, 0, 0);
      this._threeJsCamera.projectionMatrix = matrix4;
      const inverseProjection = new PioneerPublicApi.THREE.Matrix4();
      inverseProjection.set(1 / horizontalScale, 0, 0, 0, 0, 0, 0, 1, 0, 1 / verticalScale, 0, 0, 0, 0, 1 / depthOffset, -depthScale / depthOffset);
      this._threeJsCamera.projectionMatrixInverse = inverseProjection;
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
