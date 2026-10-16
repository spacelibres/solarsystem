// 线段端点必须成对，每端复制左右两个顶点；15 分量交错布局保存当前/前/后点、RGBA、带正负号线宽与累计虚线距离。几何按 65536 顶点分块以保持 Uint16 索引，所有块共享组件材质。
// Recovered from app.js:75336-82494.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class LineMesh {
  constructor(component) {
    this._component = component;
    this._position = new PioneerPublicApi.Vector3();
    this._orientation = new PioneerPublicApi.Quaternion();
    this._scale = 1;
    this._dashGapLength = 0;
    this._dashLength = 1;
    this._glowWidth = 0;
    this._threeJsObjects = [];
    this._threeJsMaterial = component.getEntity().getScene().getEngine().getMaterialManager().getPreloaded("line");
    component.getThreeJsMaterials().push(this._threeJsMaterial);
    this._threeJsMaterial.uniforms.dashLength.value = this._dashLength;
    this._threeJsMaterial.uniforms.dashGapLength.value = this._dashGapLength;
    this._threeJsMaterial.uniforms.glowWidth.value = this._glowWidth;
  }
  // 相邻线段端点相等时沿前后段连接，否则虚线累计长度从零开始；GPU 通过前后点扩展线宽。
  setPositions(positions) {
    if (positions.length % 2 != 0) throw new Error("Number of positions in the LineMesh must be even.");
    this._adjustVerticesInGeometries(2 * positions.length);
    const previousPosition = PioneerPublicApi.Vector3.pool.get();
    const nextPosition = PioneerPublicApi.Vector3.pool.get();
    const unusedPosition = PioneerPublicApi.Vector3.pool.get();
    const unusedDirection = PioneerPublicApi.Vector3.pool.get();
    const segmentDelta = PioneerPublicApi.Vector3.pool.get();
    let dashOffset = 0;
    for (let objectIndex = 0; objectIndex < this._threeJsObjects.length; objectIndex++) {
      const positionAttribute = this._threeJsObjects[objectIndex].geometry.getAttribute("position");
      const vertexData = positionAttribute.array;
      for (let localPointIndex = 0; localPointIndex < vertexData.length / (2 * LineMesh._floatsPerVertex); localPointIndex++) {
        const pointIndex = localPointIndex + objectIndex * (LineMesh._maxVerticesPerGeometry / 2);
        const position = positions[pointIndex];
        vertexData[2 * localPointIndex * LineMesh._floatsPerVertex + 0] = position.x;
        vertexData[2 * localPointIndex * LineMesh._floatsPerVertex + 1] = position.y;
        vertexData[2 * localPointIndex * LineMesh._floatsPerVertex + 2] = position.z;
        vertexData[(2 * localPointIndex + 1) * LineMesh._floatsPerVertex + 0] = position.x;
        vertexData[(2 * localPointIndex + 1) * LineMesh._floatsPerVertex + 1] = position.y;
        vertexData[(2 * localPointIndex + 1) * LineMesh._floatsPerVertex + 2] = position.z;
        if (pointIndex % 2 == 0) {
          if (position.equals(positions[PioneerPublicApi.MathUtils.wrap(pointIndex - 1, 0, positions.length)])) {
            previousPosition.copy(positions[PioneerPublicApi.MathUtils.wrap(pointIndex - 2, 0, positions.length)]);
            nextPosition.copy(positions[pointIndex + 1]);
          } else {
            previousPosition.copy(position);
            nextPosition.copy(positions[pointIndex + 1]);
            dashOffset = 0;
          }
        } else {
          if (pointIndex % 2 == 1) {
            if (position.equals(positions[PioneerPublicApi.MathUtils.wrap(pointIndex + 1, 0, positions.length)])) {
              previousPosition.copy(positions[pointIndex - 1]);
              nextPosition.copy(positions[PioneerPublicApi.MathUtils.wrap(pointIndex + 2, 0, positions.length)]);
            } else {
              previousPosition.copy(positions[pointIndex - 1]);
              nextPosition.copy(position);
            }
            segmentDelta.sub(position, positions[pointIndex - 1]);
            dashOffset += segmentDelta.magnitude();
          }
        }
        vertexData[2 * localPointIndex * LineMesh._floatsPerVertex + 3] = previousPosition.x;
        vertexData[2 * localPointIndex * LineMesh._floatsPerVertex + 4] = previousPosition.y;
        vertexData[2 * localPointIndex * LineMesh._floatsPerVertex + 5] = previousPosition.z;
        vertexData[(2 * localPointIndex + 1) * LineMesh._floatsPerVertex + 3] = previousPosition.x;
        vertexData[(2 * localPointIndex + 1) * LineMesh._floatsPerVertex + 4] = previousPosition.y;
        vertexData[(2 * localPointIndex + 1) * LineMesh._floatsPerVertex + 5] = previousPosition.z;
        vertexData[2 * localPointIndex * LineMesh._floatsPerVertex + 6] = nextPosition.x;
        vertexData[2 * localPointIndex * LineMesh._floatsPerVertex + 7] = nextPosition.y;
        vertexData[2 * localPointIndex * LineMesh._floatsPerVertex + 8] = nextPosition.z;
        vertexData[(2 * localPointIndex + 1) * LineMesh._floatsPerVertex + 6] = nextPosition.x;
        vertexData[(2 * localPointIndex + 1) * LineMesh._floatsPerVertex + 7] = nextPosition.y;
        vertexData[(2 * localPointIndex + 1) * LineMesh._floatsPerVertex + 8] = nextPosition.z;
        vertexData[2 * localPointIndex * LineMesh._floatsPerVertex + 14] = dashOffset;
        vertexData[(2 * localPointIndex + 1) * LineMesh._floatsPerVertex + 14] = dashOffset;
      }
      positionAttribute.data.needsUpdate = true;
    }
    PioneerPublicApi.Vector3.pool.release(unusedPosition);
    PioneerPublicApi.Vector3.pool.release(unusedDirection);
    PioneerPublicApi.Vector3.pool.release(previousPosition);
    PioneerPublicApi.Vector3.pool.release(nextPosition);
    PioneerPublicApi.Vector3.pool.release(segmentDelta);
  }
  setColors(colors) {
    if (colors.length % 2 != 0) throw new Error("Number of colors in the LineMesh must be even.");
    this._adjustVerticesInGeometries(2 * colors.length);
    for (let objectIndex = 0; objectIndex < this._threeJsObjects.length; objectIndex++) {
      const colorAttribute = this._threeJsObjects[objectIndex].geometry.getAttribute("color");
      const vertexData = colorAttribute.array;
      for (let localPointIndex = 0; localPointIndex < vertexData.length / (2 * LineMesh._floatsPerVertex); localPointIndex++) {
        const color = colors[localPointIndex + objectIndex * (LineMesh._maxVerticesPerGeometry / 2)];
        vertexData[2 * localPointIndex * LineMesh._floatsPerVertex + 9] = color.r;
        vertexData[2 * localPointIndex * LineMesh._floatsPerVertex + 10] = color.g;
        vertexData[2 * localPointIndex * LineMesh._floatsPerVertex + 11] = color.b;
        vertexData[2 * localPointIndex * LineMesh._floatsPerVertex + 12] = color.a;
        vertexData[(2 * localPointIndex + 1) * LineMesh._floatsPerVertex + 9] = color.r;
        vertexData[(2 * localPointIndex + 1) * LineMesh._floatsPerVertex + 10] = color.g;
        vertexData[(2 * localPointIndex + 1) * LineMesh._floatsPerVertex + 11] = color.b;
        vertexData[(2 * localPointIndex + 1) * LineMesh._floatsPerVertex + 12] = color.a;
      }
      colorAttribute.data.needsUpdate = true;
    }
  }
  setWidths(widths) {
    if ("number" == typeof widths) for (let objectIndex = 0; objectIndex < this._threeJsObjects.length; objectIndex++) {
      const widthAttribute = this._threeJsObjects[objectIndex].geometry.getAttribute("width");
      const vertexData = widthAttribute.array;
      for (let localPointIndex = 0; localPointIndex < vertexData.length / (2 * LineMesh._floatsPerVertex); localPointIndex++) {
        vertexData[2 * localPointIndex * LineMesh._floatsPerVertex + 13] = widths;
        vertexData[(2 * localPointIndex + 1) * LineMesh._floatsPerVertex + 13] = -widths;
      }
      widthAttribute.data.needsUpdate = true;
    } else {
      if (widths.length % 2 != 0) throw new Error("Number of widths in the LineMesh must be even.");
      this._adjustVerticesInGeometries(2 * widths.length);
      for (let objectIndex = 0; objectIndex < this._threeJsObjects.length; objectIndex++) {
        const widthAttribute = this._threeJsObjects[objectIndex].geometry.getAttribute("width");
        const vertexData = widthAttribute.array;
        for (let localPointIndex = 0; localPointIndex < vertexData.length / (2 * LineMesh._floatsPerVertex); localPointIndex++) {
          const width = widths[localPointIndex + objectIndex * (LineMesh._maxVerticesPerGeometry / 2)];
          vertexData[2 * localPointIndex * LineMesh._floatsPerVertex + 13] = width;
          vertexData[(2 * localPointIndex + 1) * LineMesh._floatsPerVertex + 13] = -width;
        }
        widthAttribute.data.needsUpdate = true;
      }
    }
  }
  setDashLength(dashLength, dashGapLength) {
    this._dashLength = dashLength;
    this._dashGapLength = dashGapLength;
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this._threeJsMaterial, "dashLength", this._dashLength);
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this._threeJsMaterial, "dashGapLength", this._dashGapLength);
  }
  setGlowWidth(glowWidth) {
    this._glowWidth = glowWidth;
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this._threeJsMaterial, "glowWidth", this._glowWidth);
  }
  setScale(scale) {
    this._scale = scale;
    PioneerPublicApi.ThreeJsHelper.setScale(this._threeJsObjects, scale);
  }
  prepareForRender(camera) {
    const viewportSize = PioneerPublicApi.Vector2.pool.get();
    if (camera instanceof PioneerPublicApi.SpoutComponent) viewportSize.set(.1 * camera.getRenderWidth(), .5 * camera.getRenderWidth() * .1);else {
      const viewport = camera.getViewport();
      if (viewport) {
        viewportSize.copy(viewport.getBounds().size);
      }
    }
    PioneerPublicApi.ThreeJsHelper.setUniformVector2(this._threeJsMaterial, "viewportSize", viewportSize);
    PioneerPublicApi.Vector2.pool.release(viewportSize);
    const fadeMultiplier = this._component.getVisibleInterval().getFadeMultiplier(this._component.getEntity(), camera);
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this._threeJsMaterial, "alphaMultiplier", fadeMultiplier);
  }
  _adjustVerticesInGeometries(vertexCount) {
    const geometryCount = Math.ceil(vertexCount / LineMesh._maxVerticesPerGeometry);
    for (; this._threeJsObjects.length > geometryCount;) {
      const object = this._threeJsObjects[this._threeJsObjects.length - 1];
      PioneerPublicApi.ThreeJsHelper.destroyObject(object);
      this._threeJsObjects.splice(this._threeJsObjects.length - 1, 1);
      for (let componentObjectIndex = 0, componentObjectCount = this._component.getThreeJsObjects().length; componentObjectIndex < componentObjectCount; componentObjectIndex++) if (this._component.getThreeJsObjects()[componentObjectIndex] === object) {
        this._component.getThreeJsObjects().splice(componentObjectIndex, 1);
        break;
      }
    }
    if (this._threeJsObjects.length < geometryCount) {
      if (this._threeJsObjects.length > 0) {
        this._setupThreeJsGeometry(this._threeJsObjects[this._threeJsObjects.length - 1].geometry, LineMesh._maxVerticesPerGeometry);
      }
      for (let geometryIndex = this._threeJsObjects.length; geometryIndex < geometryCount; geometryIndex++) {
        const object = PioneerPublicApi.ThreeJsHelper.createMeshObject(this._component, this._threeJsMaterial, [], false);
        this._threeJsObjects.push(object);
        this._component.getThreeJsObjects().push(object);
        const geometryVertexCount = Math.min(vertexCount - geometryIndex * LineMesh._maxVerticesPerGeometry, LineMesh._maxVerticesPerGeometry);
        this._setupThreeJsGeometry(object.geometry, geometryVertexCount);
        PioneerPublicApi.ThreeJsHelper.setPosition(object, this._position);
        PioneerPublicApi.ThreeJsHelper.setOrientation(object, this._orientation);
        PioneerPublicApi.ThreeJsHelper.setScale(object, this._scale);
        object.frustumCulled = false;
      }
    } else if (geometryCount > 0) {
      const geometry = this._threeJsObjects[geometryCount - 1].geometry;
      const lastVertexCount = vertexCount - (geometryCount - 1) * LineMesh._maxVerticesPerGeometry;
      if (geometry.getAttribute("position").array.length !== lastVertexCount * LineMesh._floatsPerVertex) {
        this._setupThreeJsGeometry(geometry, lastVertexCount);
      }
    }
  }
  // 每线段四顶点、六索引；正负 width 区分同一端点的左右侧，dashOffset 使用空间累计距离。
  _setupThreeJsGeometry(geometry, vertexCount) {
    const float32Array = new Float32Array(vertexCount * LineMesh._floatsPerVertex);
    const interleavedBuffer = new PioneerPublicApi.THREE.InterleavedBuffer(float32Array, LineMesh._floatsPerVertex);
    geometry.setAttribute("position", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 3, 0, false));
    geometry.setAttribute("positionPrev", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 3, 3, false));
    geometry.setAttribute("positionNext", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 3, 6, false));
    geometry.setAttribute("color", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 4, 9, false));
    geometry.setAttribute("width", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 1, 13, false));
    geometry.setAttribute("dashOffset", new PioneerPublicApi.THREE.InterleavedBufferAttribute(interleavedBuffer, 1, 14, false));
    const uint16Array = new Uint16Array(6 * vertexCount / 4);
    for (let segmentIndex = 0; segmentIndex < vertexCount / 4; segmentIndex++) {
      uint16Array[6 * segmentIndex + 0] = 4 * segmentIndex;
      uint16Array[6 * segmentIndex + 1] = 4 * segmentIndex + 2;
      uint16Array[6 * segmentIndex + 2] = 4 * segmentIndex + 3;
      uint16Array[6 * segmentIndex + 3] = 4 * segmentIndex;
      uint16Array[6 * segmentIndex + 4] = 4 * segmentIndex + 3;
      uint16Array[6 * segmentIndex + 5] = 4 * segmentIndex + 1;
    }
    geometry.setIndex(new PioneerPublicApi.THREE.BufferAttribute(uint16Array, 1));
  }
  static _floatsPerVertex = 15;
  static _maxVerticesPerGeometry = 65536;
  _component;
  _position;
  _orientation;
  _scale;
  _dashGapLength;
  _dashLength;
  _glowWidth;
  _threeJsObjects;
  _threeJsMaterial;
}
export { LineMesh };
