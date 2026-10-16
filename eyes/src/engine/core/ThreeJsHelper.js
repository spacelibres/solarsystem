// Three.js 桥接层负责手动矩阵对象创建与递归销毁、池向量转换、材质 uniform 更新和 GL 缓冲上传。destroyTextures 决定是否连同纹理释放；setUniformTexture 会销毁旧值，计数共享纹理必须由上层避免重复释放。
// Recovered from app.js:151412-159259.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class ThreeJsHelper {
  /* 这里只建立 attribute/index 槽位，不上传实际顶点；交错布局的 stride/offset 单位为元素数，后续设置顶点数据与 GL 缓冲上传是独立步骤。 */
  static createGeometry(attributes, interleaved) {
    const bufferGeometry = new PioneerPublicApi.THREE.BufferGeometry();
    if (interleaved) {
      let stride = 0;
      for (let attributeIndex = 0; attributeIndex < attributes.length; attributeIndex++) stride += attributes[attributeIndex].dimensions;
      const interleavedBuffer = new PioneerPublicApi.THREE.InterleavedBuffer(new Float32Array(0), stride);
      let offset = 0;
      for (let attributeIndex = 0; attributeIndex < attributes.length; attributeIndex++) {
        const descriptor = attributes[attributeIndex];
        bufferGeometry.setAttribute(descriptor.name, new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, descriptor.dimensions, offset));
        offset += descriptor.dimensions;
      }
    } else for (let attributeIndex = 0; attributeIndex < attributes.length; attributeIndex++) {
      const descriptor = attributes[attributeIndex];
      bufferGeometry.setAttribute(descriptor.name, new PioneerPublicApi.THREE.BufferAttribute(new Float32Array(0), descriptor.dimensions));
    }
    bufferGeometry.setIndex(new PioneerPublicApi.THREE.BufferAttribute(new Uint16Array(0), 1));
    return bufferGeometry;
  }
  /* 实体位姿由 Pioneer 每相机写入，禁用 matrixAutoUpdate 避免 Three 重算；frustumCulled=false 把可见性留给 Pioneer 组件，不使用 Three 几何包围体自动剔除。对象先隐藏，再由组件渲染准备阶段显式显示/更新矩阵。 */
  static setupObject(component, object) {
    object.name = `${component}.${Math.floor(1e4 * Math.random())}`;
    object.matrixAutoUpdate = false;
    object.frustumCulled = false;
    object.visible = false;
    component.getEntity().getScene().getThreeJsScene().add(object);
  }
  static createMeshObjectGivenGeometry(component, material, geometry) {
    const mesh = new PioneerPublicApi.THREE.Mesh(geometry, material);
    this.setupObject(component, mesh);
    return mesh;
  }
  static createMeshObject(component, material, attributes, interleaved) {
    const geometry = this.createGeometry(attributes, interleaved);
    return this.createMeshObjectGivenGeometry(component, material, geometry);
  }
  /* GLBufferAttribute 可以来自上层创建的原生缓冲；未被 renderer 注册过的几何也必须释放这些句柄。普通 BufferAttribute 的 GPU 缓存由 geometry.dispose 事件通知 Three 释放。 */
  static destroyGeometry(geometry, component) {
    const context = component?.getEntity().getScene().getEngine().__getThreeJsRenderer().getContext();
    for (const attribute of Object.values(geometry.attributes)) if (attribute instanceof PioneerPublicApi.THREE.GLBufferAttribute) {
      context?.deleteBuffer(attribute.buffer);
    }
    geometry.dispose();
  }
  static destroyObject(object, component) {
    // 将组件上下文传至叶子，未经过 renderer 注册的原生 GL 缓冲也能释放。
    for (; object.children.length > 0;) this.destroyObject(object.children[object.children.length - 1], component);
    if (null !== object.parent) {
      object.parent.remove(object);
    }
    // Three 的 Points/Line 同样拥有 BufferGeometry；只处理 Mesh 会漏掉星场点集。
    if ((object instanceof PioneerPublicApi.THREE.Mesh || object instanceof PioneerPublicApi.THREE.Points || object instanceof PioneerPublicApi.THREE.Line) && object.geometry instanceof PioneerPublicApi.THREE.BufferGeometry) {
      this.destroyGeometry(object.geometry, component);
    }
  }
  // 只有调用者授予纹理所有权时才遍历 uniform 销毁贴图；材质本身始终 dispose。
  static destroyMaterial(material, destroyTextures) {
    if (destroyTextures) {
      const uniforms = material.uniforms;
      for (const name in uniforms) if (Object.hasOwn(uniforms, name)) {
        const value = uniforms[name].value;
        if (value instanceof PioneerPublicApi.THREE.Texture) {
          ThreeJsHelper.destroyTexture(value);
        }
      }
    }
    material.dispose();
  }
  static destroyTexture(texture) {
    if (Array.isArray(texture.source.data)) for (let imageIndex = 0, imageCount = texture.source.data.length; imageIndex < imageCount; imageIndex++) {
      const image = texture.source.data[imageIndex];
      if (image instanceof ImageBitmap) {
        image.close();
      }
    } else if (texture.source.data instanceof ImageBitmap) {
      texture.source.data.close();
    }
    texture.dispose();
  }
  static destroyRenderTarget(renderTarget) {
    renderTarget.dispose();
  }
  static destroyAllObjectsAndMaterials(component, destroyTextures = true) {
    const objects = component.getThreeJsObjects();
    const materials = component.getThreeJsMaterials();
    for (let objectIndex = 0; objectIndex < objects.length; objectIndex++) this.destroyObject(objects[objectIndex], component);
    for (let materialIndex = 0; materialIndex < materials.length; materialIndex++) this.destroyMaterial(materials[materialIndex], destroyTextures);
  }
  static setPosition(objects, position) {
    if (objects) if (Array.isArray(objects)) for (let objectIndex = 0, objectCount = objects.length; objectIndex < objectCount; objectIndex++) objects[objectIndex].position.set(position.x, position.y, position.z);else objects.position.set(position.x, position.y, position.z);
  }
  /* Entity.cameraSpacePosition 已减去相机平移，但仍沿世界轴；不在这里再减一次相机位置。relativeToEntity 只决定额外 offset 是否先乘实体朝向。 */
  static setPositionToEntity(objects, entity, camera, offset, relativeToEntity) {
    if (!objects) return;
    const cameraPosition = entity.getCameraSpacePosition(camera);
    const threePosition = PioneerPublicApi.Vector3.threeJsPool.get();
    threePosition.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    if (offset) {
      const rotatedOffset = PioneerPublicApi.Vector3.pool.get();
      if (true === relativeToEntity) {
        rotatedOffset.rotate(entity.getOrientation(), offset);
      } else {
        rotatedOffset.copy(offset);
      }
      threePosition.x += rotatedOffset.x;
      threePosition.y += rotatedOffset.y;
      threePosition.z += rotatedOffset.z;
      PioneerPublicApi.Vector3.pool.release(rotatedOffset);
    }
    if (Array.isArray(objects)) for (let objectIndex = 0, objectCount = objects.length; objectIndex < objectCount; objectIndex++) objects[objectIndex].position.copy(threePosition);else objects.position.copy(threePosition);
    PioneerPublicApi.Vector3.threeJsPool.release(threePosition);
  }
  static setScale(objects, scale) {
    if (objects) if (Array.isArray(objects)) {
      for (let objectIndex = 0, objectCount = objects.length; objectIndex < objectCount; objectIndex++) if ("number" == typeof scale) {
        objects[objectIndex].scale.set(scale, scale, scale);
      } else {
        objects[objectIndex].scale.set(scale.x, scale.y, scale.z);
      }
    } else if ("number" == typeof scale) {
      objects.scale.set(scale, scale, scale);
    } else {
      objects.scale.set(scale.x, scale.y, scale.z);
    }
  }
  static setOrientation(objects, orientation) {
    if (!objects) return;
    const threeOrientation = PioneerPublicApi.Quaternion.threeJsPool.get();
    threeOrientation.set(orientation.x, orientation.y, orientation.z, orientation.w);
    if (Array.isArray(objects)) for (let objectIndex = 0, objectCount = objects.length; objectIndex < objectCount; objectIndex++) objects[objectIndex].setRotationFromQuaternion(threeOrientation);else objects.setRotationFromQuaternion(threeOrientation);
    PioneerPublicApi.Quaternion.threeJsPool.release(threeOrientation);
  }
  /* 由相机前向/右向构造 billboard 朝向；Pioneer 用 +Y 前向，Three 四元数通过 x/y/z/w 分量桥接，不能把轴索引当标准 -Z 相机方向。 */
  static setOrientationToBillboard(objects, camera) {
    if (!objects) return;
    const orientation = PioneerPublicApi.Quaternion.pool.get();
    const cameraForward = PioneerPublicApi.Vector3.pool.get();
    const cameraRight = PioneerPublicApi.Vector3.pool.get();
    camera.getEntity().getOrientation().getAxis(cameraForward, 1);
    camera.getEntity().getOrientation().getAxis(cameraRight, 0);
    cameraRight.setNormalTo(cameraForward, cameraRight);
    orientation.setFromAxes(cameraRight, void 0, cameraForward);
    const threeOrientation = PioneerPublicApi.Quaternion.threeJsPool.get();
    threeOrientation.set(orientation.x, orientation.y, orientation.z, orientation.w);
    if (Array.isArray(objects)) for (let objectIndex = 0, objectCount = objects.length; objectIndex < objectCount; objectIndex++) objects[objectIndex].setRotationFromQuaternion(threeOrientation);else objects.setRotationFromQuaternion(threeOrientation);
    PioneerPublicApi.Quaternion.threeJsPool.release(threeOrientation);
    PioneerPublicApi.Quaternion.pool.release(orientation);
    PioneerPublicApi.Vector3.pool.release(cameraForward);
    PioneerPublicApi.Vector3.pool.release(cameraRight);
  }
  /* 组合顺序为 qEntity * qOffset，offset 位于实体局部坐标。Pioneer 构造器是 w/x/y/z 次序，传给 Three.set 时必须按 x/y/z/w。 */
  static setOrientationToEntity(objects, entity, offset) {
    if (!objects) return;
    const entityOrientation = entity.getOrientation();
    const threeOrientation = PioneerPublicApi.Quaternion.threeJsPool.get();
    if (void 0 === offset) threeOrientation.set(entityOrientation.x, entityOrientation.y, entityOrientation.z, entityOrientation.w);else {
      const combinedOrientation = PioneerPublicApi.Quaternion.pool.get();
      combinedOrientation.mult(entityOrientation, offset);
      threeOrientation.set(combinedOrientation.x, combinedOrientation.y, combinedOrientation.z, combinedOrientation.w);
      PioneerPublicApi.Quaternion.pool.release(combinedOrientation);
    }
    if (Array.isArray(objects)) for (let objectIndex = 0, objectCount = objects.length; objectIndex < objectCount; objectIndex++) objects[objectIndex].setRotationFromQuaternion(threeOrientation);else objects.setRotationFromQuaternion(threeOrientation);
    PioneerPublicApi.Quaternion.threeJsPool.release(threeOrientation);
  }
  /* 第 1 层由动态环境贴图相机选择，开关只改 layer 位，不创建或释放环境贴图。 */
  static useInDynEnvMap(object, enabled) {
    if (enabled) {
      object.layers.enable(1);
    } else {
      object.layers.disable(1);
    }
  }
  // 分配 GPU 缓冲后保留 elementSize/count，后续上传以元素偏移换算字节；索引缓冲绑定按原条件恢复。
  /* bufferData 传入的是字节容量而不是 data 数组，所以此处仅分配，不上传内容；offset/count 上传由 updateGLBufferAttribute 完成。 */
  static createGLBufferAttribute(bufferKind, data, elementType, dimensions, component) {
    const context = component.getEntity().getScene().getEngine().__getThreeJsRenderer().getContext();
    const buffer = context.createBuffer();
    const target = "vertex" === bufferKind ? context.ARRAY_BUFFER : context.ELEMENT_ARRAY_BUFFER;
    let previousIndexBuffer;
    if (target === context.ELEMENT_ARRAY_BUFFER) {
      previousIndexBuffer = context.getParameter(context.ELEMENT_ARRAY_BUFFER_BINDING);
    }
    context.bindBuffer(target, buffer);
    let glType = context.FLOAT;
    let bytesPerElement = 4;
    if ("unsignedByte" === elementType) {
      glType = context.UNSIGNED_BYTE;
      bytesPerElement = 1;
    } else {
      if ("unsignedShort" === elementType) {
        glType = context.UNSIGNED_SHORT;
        bytesPerElement = 2;
      } else {
        if ("unsignedInt" === elementType) {
          glType = context.UNSIGNED_INT;
          bytesPerElement = 4;
        }
      }
    }
    context.bufferData(target, data.length * bytesPerElement, context.STATIC_DRAW);
    if (previousIndexBuffer) {
      context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, previousIndexBuffer);
    }
    return new PioneerPublicApi.THREE.GLBufferAttribute(buffer, glType, dimensions, bytesPerElement, data.length / dimensions);
  }
  /* 目标字节偏移=offset*elementSize，源数组偏移/count仍按元素计。仅在旧索引绑定为真值时恢复它；保留原有状态恢复规则。 */
  static updateGLBufferAttribute(attribute, bufferKind, data, offset, count, component) {
    const context = component.getEntity().getScene().getEngine().__getThreeJsRenderer().getContext();
    const target = "vertex" === bufferKind ? context.ARRAY_BUFFER : context.ELEMENT_ARRAY_BUFFER;
    let previousIndexBuffer;
    if (target === context.ELEMENT_ARRAY_BUFFER) {
      previousIndexBuffer = context.getParameter(context.ELEMENT_ARRAY_BUFFER_BINDING);
    }
    context.bindBuffer(target, attribute.buffer);
    context.bufferSubData(target, offset * attribute.elementSize, data, offset, count);
    if (previousIndexBuffer) {
      context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, previousIndexBuffer);
    }
  }
  /* 数组长度相同时保留 BufferAttribute 身份并增加 version；长度改变才替换 attribute。交错属性不经过此普通 BufferAttribute 分支。 */
  static setVertices(geometry, name, vertices) {
    const attribute = geometry.getAttribute(name);
    if (attribute instanceof PioneerPublicApi.THREE.BufferAttribute) {
      if (attribute.array.length === vertices.length) {
        attribute.copyArray(vertices);
        attribute.needsUpdate = true;
      } else {
        geometry.setAttribute(name, new PioneerPublicApi.THREE.BufferAttribute(vertices, geometry.getAttribute(name).itemSize));
      }
    }
  }
  /* 保留同长度索引 attribute；调用方负责 TypedArray 类型与顶点索引范围。这里不选择 Uint16/Uint32，也不自动重算包围体。 */
  static setIndices(geometry, indices) {
    const attribute = geometry.getIndex();
    if (attribute && attribute.array.length === indices.length) {
      attribute.copyArray(indices);
      attribute.needsUpdate = true;
    } else {
      geometry.setIndex(new PioneerPublicApi.THREE.BufferAttribute(indices, 1));
    }
  }
  static computeTangents(geometry) {
    geometry.computeTangents();
  }
  static setRenderOrder(object, renderOrder) {
    if (object) {
      object.renderOrder = renderOrder;
    }
  }
  // uniform 数字/null 直接复制，数组递归复制，其余对象调用 clone，避免实例共享可变向量。
  /* Three 的 ShaderMaterial.clone 对 uniform 值的复制不足以表达这里的递归数组策略；再按 _cloneUniformValue 复制，避免不同组件共享可变向量。 */
  static cloneMaterial(material) {
    const clone = material.clone();
    for (const [name, uniform] of Object.entries(material.uniforms)) {
      const value = uniform.value;
      clone.uniforms[name].value = this._cloneUniformValue(value);
    }
    clone.needsUpdate = true;
    return clone;
  }
  /* 支持 number/null、递归数组与提供 clone() 的对象；字符串/boolean/普通字典不在此函数支持范围，不能把它当通用深拷贝。 */
  static _cloneUniformValue(value) {
    if (null === value) return null;
    if ("number" == typeof value) return value;
    if (Array.isArray(value)) {
      const elements = [];
      for (let index = 0; index < value.length; index++) elements.push(this._cloneUniformValue(value[index]));
      return elements;
    }
    return value.clone();
  }
  /* 距离优先级取负的 cameraDepth；此便捷路径直达 TextureLoader，不代表取得 ResourceManager 的共享资源所有权。 */
  static async loadTexture(component, url, options) {
    return component.getEntity().getScene().getEngine().getTextureLoader().loadTexture(url, -component.getEntity().getLeastCameraDepth(), options);
  }
  /* CanvasTexture 用最近邻采样且 flipY=false，保持上层 canvas 像素方向；不要套用普通图片贴图的默认翻转。 */
  static loadTextureFromCanvas(canvas) {
    const canvasTexture = new PioneerPublicApi.THREE.CanvasTexture(canvas);
    canvasTexture.magFilter = PioneerPublicApi.THREE.NearestFilter;
    canvasTexture.minFilter = PioneerPublicApi.THREE.NearestFilter;
    canvasTexture.flipY = false;
    canvasTexture.needsUpdate = true;
    return canvasTexture;
  }
  static async loadTextureIntoUniform(component, uniform, url, options) {
    const texture = await this.loadTexture(component, url, options);
    if (uniform.value) {
      ThreeJsHelper.destroyTexture(uniform.value);
    }
    uniform.value = texture;
  }
  static setOverlay(material, overlay) {
    if (material) {
      material.depthFunc = overlay ? PioneerPublicApi.THREE.AlwaysDepth : PioneerPublicApi.THREE.LessEqualDepth;
    }
  }
  /* 透明时同时关闭 depthWrite；这与仅设置 material.opacity 不同。没有在此重新选择混合模式或排序。 */
  static setTransparent(material, transparent) {
    if (material) {
      material.transparent = transparent;
      material.depthWrite = !transparent;
    }
  }
  static setBlending(material, blending) {
    if (material) {
      switch (blending) {
        case "normal":
          material.blending = PioneerPublicApi.THREE.NormalBlending;
          break;
        case "additive":
          material.blending = PioneerPublicApi.THREE.AdditiveBlending;
          break;
        case "subtractive":
          material.blending = PioneerPublicApi.THREE.SubtractiveBlending;
          break;
        case "multiply":
          material.blending = PioneerPublicApi.THREE.MultiplyBlending;
          break;
        case "custom":
          material.blending = PioneerPublicApi.THREE.CustomBlending;
          break;
        case "none":
          material.blending = PioneerPublicApi.THREE.NoBlending;
      }
      material.needsUpdate = true;
    }
  }
  /* 仅定义开关发生变化时置 needsUpdate，通知 Three 重新编译 shader；已有非 false/undefined 值在启用时保留。 */
  static setDefine(material, name, enabled) {
    if (!enabled || false !== material.defines[name] && void 0 !== material.defines[name]) {
      if (!(enabled || true !== material.defines[name])) {
        delete material.defines[name];
        material.needsUpdate = true;
      }
    } else {
      material.defines[name] = true;
      material.needsUpdate = true;
    }
  }
  static setUniformNumber(material, name, value) {
    if (material) {
      material.uniforms[name].value = value;
    }
  }
  static setUniformVector2(material, name, vector) {
    if (!material) return;
    material.uniforms[name].value.set(vector.x, vector.y);
  }
  static setUniformVector3(material, name, vector) {
    if (!material) return;
    material.uniforms[name].value.set(vector.x, vector.y, vector.z);
  }
  static setUniformColorRGB(material, name, color) {
    if (!material) return;
    material.uniforms[name].value.set(color.r, color.g, color.b);
  }
  static setUniformColorRGBA(material, name, color, alphaMultiplier = 1) {
    if (!material) return;
    material.uniforms[name].value.set(color.r, color.g, color.b, color.a * alphaMultiplier);
  }
  static setUniformQuaternion(material, name, orientation) {
    if (!material) return;
    material.uniforms[name].value.set(orientation.x, orientation.y, orientation.z, orientation.w);
  }
  /* 替换前销毁旧贴图；这是拥有旧纹理的操作，不是只换引用。共享贴图调用方必须协调计数，不能将 ResourceManager.release 等同于直接 dispose。 */
  static setUniformTexture(material, name, texture) {
    if (!material) return;
    const previousTexture = material.uniforms[name].value;
    if (previousTexture) {
      ThreeJsHelper.destroyTexture(previousTexture);
    }
    material.uniforms[name].value = texture;
  }
}
export { ThreeJsHelper };
