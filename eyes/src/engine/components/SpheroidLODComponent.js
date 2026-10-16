// 椭球表面每个纹理通道、每个映射面各持有一个 TextureLOD；切换圆柱/立方映射先禁用旧 LOD 再重建。位置由 Spheroid 坐标转换生成，法线取地理 up；立方面基的叉积方向决定三角绕序，法线贴图存在时重算切线。
// Recovered from app.js:397115-407521.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class SpheroidLODComponent extends PioneerPublicApi.BaseComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
    this._textureInfos = new PioneerPublicApi.FastMap();
    this._mapping = "cylinder";
    this._longitudinalRotation = 0;
    this._numFaces = 1;
    this._lowerLeftBounds = new PioneerPublicApi.LatLonAlt(-PioneerPublicApi.MathUtils.HalfPi, -PioneerPublicApi.MathUtils.Pi, 0);
    this._upperRightBounds = new PioneerPublicApi.LatLonAlt(+PioneerPublicApi.MathUtils.HalfPi, PioneerPublicApi.MathUtils.Pi, 0);
    this._cubeMapFaceFrames = PioneerPublicApi.CubeMap.defaultCubeMapFaceFrames;
    this._shadowEntities = [];
    this._materialOptions = new Set();
    this._atmosphereComponentRef = new PioneerPublicApi.ComponentRef(this.getEntity().getScene(), PioneerPublicApi.AtmosphereComponent, this.getEntity().getName());
    this._spheroidComponentRef = new PioneerPublicApi.ComponentRef(this.getEntity().getScene(), PioneerPublicApi.SpheroidComponent, this.getEntity().getName());
    this._spheroidComponentRef.setRefChangedCallback(this._spheroidRefChangedCallback.bind(this));
    this._spheroidChangedCallback = this._spheroidChangedCallback.bind(this);
    this.__setUsesEntityOrientation(true);
  }
  getTextureNames() {
    const names = [];
    for (let textureIndex = 0; textureIndex < this._textureInfos.getSize(); textureIndex++) names.push(this._textureInfos.getAt(textureIndex).key);
    return names;
  }
  getTextureUrl(textureName) {
    return this._textureInfos.get(textureName)?.url;
  }
  getTextureSizes(textureName) {
    return this._textureInfos.get(textureName)?.sizes;
  }
  setTexture(textureName, url, sizes = [4, 512, 4096]) {
    const materials = this.getThreeJsMaterials();
    for (let materialIndex = 0, materialCount = materials.length; materialIndex < materialCount; materialIndex++) {
      const material = materials[materialIndex];
      material.defines[`${textureName}Map`] = true;
      material.needsUpdate = true;
    }
    let textureInfo = this._textureInfos.get(textureName);
    if (textureInfo) {
      textureInfo.url = url;
      textureInfo.sizes = [...sizes];
    } else {
      textureInfo = {
        url: url,
        sizes: [...sizes],
        lods: []
      };
      for (let faceIndex = 0, numFaces = this._numFaces; faceIndex < numFaces; faceIndex++) {
        const textureLOD = new PioneerPublicApi.TextureLOD(this);
        const uniform = materials[faceIndex]?.uniforms[`${textureName}Texture`];
        if (void 0 !== uniform) {
          textureLOD.setUniform(uniform);
        }
        textureInfo.lods.push(textureLOD);
      }
      this._textureInfos.set(textureName, textureInfo);
    }
    for (let faceIndex = 0, numFaces = this._numFaces; faceIndex < numFaces; faceIndex++) {
      const lod = textureInfo.lods[faceIndex];
      lod.setUrl(url.replace("$FACE", faceIndex.toString()));
      lod.setSizes(sizes);
    }
    if ("normal" === textureName) {
      this._updateMeshes();
    }
  }
  forceTextureSize(textureName, size) {
    const textureInfo = this._textureInfos.get(textureName);
    if (void 0 === textureInfo) throw new Error(`No texture named "${textureName}" has been defined.`);
    for (let faceIndex = 0; faceIndex < textureInfo.lods.length; faceIndex++) textureInfo.lods[faceIndex].setForcedSize(size);
  }
  unsetTexture(textureName) {
    const materials = this.getThreeJsMaterials();
    for (let materialIndex = 0, materialCount = materials.length; materialIndex < materialCount; materialIndex++) {
      const material = materials[materialIndex];
      delete material.defines[`${textureName}Map`];
      material.needsUpdate = true;
    }
    this._textureInfos.delete(textureName);
    for (let materialIndex = 0, materialCount = materials.length; materialIndex < materialCount; materialIndex++) {
      const uniform = materials[materialIndex].uniforms[`${textureName}Texture`];
      if (uniform?.value instanceof PioneerPublicApi.THREE.Texture) {
        this.getEngine().getResourceManager().release(this, uniform.value, "texture");
        uniform.value = null;
      }
    }
    if ("normal" === textureName) {
      this._updateMeshes();
    }
  }
  getTextureCurrentSize(textureName, faceIndex) {
    const textureInfo = this._textureInfos.get(textureName);
    if (void 0 !== textureInfo?.lods[faceIndex]) return textureInfo.lods[faceIndex].getCurrentSize();
  }
  isMaterialOptionEnabled(option) {
    return this._materialOptions.has(option);
  }
  setMaterialOption(option, enabled) {
    const materials = this.getThreeJsMaterials();
    if (enabled && !this._materialOptions.has(option)) {
      this._materialOptions.add(option);
      for (let materialIndex = 0, materialCount = materials.length; materialIndex < materialCount; materialIndex++) {
        const material = materials[materialIndex];
        material.defines[option] = true;
        material.needsUpdate = true;
      }
    } else if (!enabled && this._materialOptions.has(option)) {
      this._materialOptions.delete(option);
      for (let materialIndex = 0, materialCount = materials.length; materialIndex < materialCount; materialIndex++) {
        const material = materials[materialIndex];
        delete material.defines[option];
        material.needsUpdate = true;
      }
    }
  }
  getMapping() {
    return this._mapping;
  }
  // 先归还旧 LOD 的 uniform 引用，再按新面数重建，避免旧纹理仍挂在已替换材质上。
  setMapping(mapping) {
    if (this._mapping !== mapping) {
      this._numFaces = "cylinder" === mapping ? 1 : 6;
      for (let textureIndex = 0; textureIndex < this._textureInfos.getSize(); textureIndex++) {
        const textureInfo = this._textureInfos.getAt(textureIndex).value;
        for (let lodIndex = 0; lodIndex < textureInfo.lods.length; lodIndex++) textureInfo.lods[lodIndex].setEnabled(false);
        textureInfo.lods = [];
        for (let faceIndex = 0, numFaces = this._numFaces; faceIndex < numFaces; faceIndex++) {
          const textureLOD = new PioneerPublicApi.TextureLOD(this);
          textureLOD.setUrl(textureInfo.url.replace("$FACE", faceIndex.toString()));
          textureLOD.setSizes(textureInfo.sizes);
          textureInfo.lods.push(textureLOD);
        }
      }
      this.resetResources();
      this._mapping = mapping;
    }
  }
  setBounds(lowerLeft, upperRight) {
    this._lowerLeftBounds.copy(lowerLeft);
    this._upperRightBounds.copy(upperRight);
    this._updateMeshes();
  }
  setCubeMapLayout(layout) {
    this._cubeMapFaceFrames = PioneerPublicApi.Tuple.create6Tuple(faceIndex => PioneerPublicApi.Tuple.create3Tuple(axisIndex => {
      switch (layout[faceIndex][axisIndex]) {
        case "+x":
          return PioneerPublicApi.Vector3.XAxis;
        case "-x":
          return PioneerPublicApi.Vector3.XAxisNeg;
        case "+y":
          return PioneerPublicApi.Vector3.YAxis;
        case "-y":
          return PioneerPublicApi.Vector3.YAxisNeg;
        case "+z":
          return PioneerPublicApi.Vector3.ZAxis;
        case "-z":
          return PioneerPublicApi.Vector3.ZAxisNeg;
        default:
          throw new Error("Invalid cubemap layout component.");
      }
    }));
    this._updateMeshes();
  }
  getNumShadowEntities() {
    return this._shadowEntities.length;
  }
  getShadowEntity(shadowIndex) {
    return this._shadowEntities[shadowIndex]?.getName();
  }
  setShadowEntities(entityNames) {
    this._shadowEntities = [];
    for (const entityName of entityNames) this._shadowEntities.push(new PioneerPublicApi.EntityRef(this.getEntity().getScene(), entityName));
    const hasShadows = entityNames.length > 0;
    for (let materialIndex = 0, materialCount = this.getThreeJsMaterials().length; materialIndex < materialCount; materialIndex++) PioneerPublicApi.ThreeJsHelper.setDefine(this.getThreeJsMaterials()[materialIndex], "shadowEntities", hasShadows);
  }
  getLongitudeRotation() {
    return this._longitudinalRotation;
  }
  setLongitudeRotation(longitudinalRotation) {
    this._longitudinalRotation = longitudinalRotation;
  }
  async getLoadedPromise(forceLoaded = false, timeout = Number.POSITIVE_INFINITY) {
    await super.getLoadedPromise(forceLoaded, timeout);
    if ("loaded" === this.getLoadState().state) {
      await this.getTexturesLoadedPromise(timeout);
    }
  }
  async getTexturesLoadedPromise(timeout = Number.POSITIVE_INFINITY) {
    const requests = [];
    for (let textureIndex = 0; textureIndex < this._textureInfos.getSize(); textureIndex++) {
      const textureInfo = this._textureInfos.getAt(textureIndex).value;
      for (let lodIndex = 0, lodCount = textureInfo.lods.length; lodIndex < lodCount; lodIndex++) requests.push(textureInfo.lods[lodIndex].getLoadedPromise(timeout));
    }
    const results = await Promise.allSettled(requests);
    if (!results.every(result => "fulfilled" === result.status)) throw new Error(results.filter(result => "rejected" === result.status).map(result => result.reason instanceof Error ? result.reason.message : "").filter(message => "" !== message).reduce((errorMessages, message) => `${errorMessages}\n${message}`, ""));
  }
  setSpheroidReference(nameOrClassIndex) {
    this._spheroidComponentRef.set(this.getEntity().getName(), nameOrClassIndex);
  }
  __destroy() {
    const spheroid = this._spheroidComponentRef.get();
    if (null !== spheroid) {
      spheroid.removeChangedCallback(this._spheroidChangedCallback);
    }
    super.__destroy();
  }
  __update() {
    for (let textureIndex = 0; textureIndex < this._textureInfos.getSize(); textureIndex++) {
      const textureInfo = this._textureInfos.getAt(textureIndex).value;
      for (let lodIndex = 0, lodCount = textureInfo.lods.length; lodIndex < lodCount; lodIndex++) textureInfo.lods[lodIndex].update();
    }
    this._spheroidComponentRef.update();
  }
  __prepareForRender(camera) {
    const objects = this.getThreeJsObjects();
    const longitudeRotation = PioneerPublicApi.Quaternion.pool.get();
    longitudeRotation.setFromAxisAngle(PioneerPublicApi.Vector3.ZAxis, this._longitudinalRotation);
    for (let objectIndex = 0; objectIndex < objects.length; objectIndex++) {
      PioneerPublicApi.ThreeJsHelper.setOrientationToEntity(objects[objectIndex], this.getEntity(), longitudeRotation);
      PioneerPublicApi.ThreeJsHelper.setPositionToEntity(objects[objectIndex], this.getEntity(), camera);
    }
    PioneerPublicApi.Quaternion.pool.release(longitudeRotation);
    const atmosphere = this._atmosphereComponentRef.get();
    PioneerPublicApi.MaterialUtils.setUniforms(this.getThreeJsMaterials(), camera, this.getEntity(), this._shadowEntities, atmosphere, true);
  }
  async __loadResources() {
    for (let faceIndex = 0; faceIndex < this._numFaces; faceIndex++) {
      const material = PioneerPublicApi.MaterialUtils.get();
      this.getThreeJsMaterials().push(material);
      for (const option of this._materialOptions) {
        material.defines[option] = true;
        material.needsUpdate = true;
      }
      material.defines.shadowEntities = this.getNumShadowEntities() > 0;
      material.defines.nightMapEmissive = this._textureInfos.has("night");
      const mesh = PioneerPublicApi.ThreeJsHelper.createMeshObject(this, material, [{
        name: "position",
        dimensions: 3
      }, {
        name: "normal",
        dimensions: 3
      }, {
        name: "uv",
        dimensions: 2
      }], false);
      this.getThreeJsObjects().push(mesh);
      PioneerPublicApi.ThreeJsHelper.useInDynEnvMap(mesh, true);
      for (let textureIndex = 0; textureIndex < this._textureInfos.getSize(); textureIndex++) {
        const {
          key: key,
          value: value
        } = this._textureInfos.getAt(textureIndex);
        const uniform = material.uniforms[`${key}Texture`];
        if (void 0 !== uniform) {
          const lod = value.lods[faceIndex];
          lod.setEnabled(true);
          lod.setUniform(uniform);
        }
        material.defines[`${key}Map`] = true;
        material.needsUpdate = true;
      }
    }
    this._updateMeshes();
  }
  // LOD 负责归还纹理；销毁 mesh/material 时不再跟随销毁 uniform 中的共享纹理。
  __unloadResources() {
    for (let materialIndex = 0; materialIndex < this.getThreeJsMaterials().length; materialIndex++) {
      const material = this.getThreeJsMaterials()[materialIndex];
      if (material.uniforms.shadowRingsTexture && null !== material.uniforms.shadowRingsTexture.value) {
        material.uniforms.shadowRingsTexture.value = null;
      }
    }
    for (let textureIndex = 0; textureIndex < this._textureInfos.getSize(); textureIndex++) {
      const textureInfo = this._textureInfos.getAt(textureIndex).value;
      for (let lodIndex = 0; lodIndex < textureInfo.lods.length; lodIndex++) {
        const lod = textureInfo.lods[lodIndex];
        lod.setEnabled(false);
        lod.setUniform(null);
      }
    }
    PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials(this, false);
  }
  _updateMeshes() {
    if (0 === this.getThreeJsObjects().length) return;
    const spheroid = this._spheroidComponentRef.get();
    if (null !== spheroid) if ("cylinder" === this._mapping) {
      const latitudeSpan = this._upperRightBounds.lat - this._lowerLeftBounds.lat;
      const longitudeSpan = this._upperRightBounds.lon - this._lowerLeftBounds.lon;
      const latitudeCount = Math.max(Math.ceil(100 * latitudeSpan / PioneerPublicApi.MathUtils.Pi), 4);
      const longitudeCount = Math.max(Math.ceil(200 * longitudeSpan / PioneerPublicApi.MathUtils.TwoPi), 4);
      const latitudeStep = latitudeSpan / (latitudeCount - 1);
      const longitudeStep = longitudeSpan / (longitudeCount - 1);
      const vertexCount = longitudeCount * latitudeCount;
      const positions = new Float32Array(3 * vertexCount);
      const normals = new Float32Array(3 * vertexCount);
      const uvs = new Float32Array(2 * vertexCount);
      const indices = new Uint16Array((longitudeCount - 1) * (latitudeCount - 1) * 6);
      const position = PioneerPublicApi.Vector3.pool.get();
      const geodetic = PioneerPublicApi.LatLonAlt.pool.get();
      for (let latitudeIndex = 0; latitudeIndex < latitudeCount; latitudeIndex++) for (let longitudeIndex = 0; longitudeIndex < longitudeCount; longitudeIndex++) {
        geodetic.lat = this._lowerLeftBounds.lat + latitudeIndex * latitudeStep;
        geodetic.lon = this._lowerLeftBounds.lon + longitudeIndex * longitudeStep;
        geodetic.alt = 0;
        const vertexIndex = latitudeIndex * longitudeCount + longitudeIndex;
        spheroid.xyzFromLLA(position, geodetic);
        positions[3 * vertexIndex + 0] = position.x;
        positions[3 * vertexIndex + 1] = position.y;
        positions[3 * vertexIndex + 2] = position.z;
        spheroid.upFromLLA(position, geodetic);
        normals[3 * vertexIndex + 0] = position.x;
        normals[3 * vertexIndex + 1] = position.y;
        normals[3 * vertexIndex + 2] = position.z;
        uvs[2 * vertexIndex + 0] = longitudeIndex / (longitudeCount - 1);
        uvs[2 * vertexIndex + 1] = 1 - latitudeIndex / (latitudeCount - 1);
        if (latitudeIndex + 1 < latitudeCount && longitudeIndex + 1 < longitudeCount) {
          const cellIndex = latitudeIndex * (longitudeCount - 1) + longitudeIndex;
          indices[6 * cellIndex + 0] = longitudeCount * (latitudeIndex + 0) + (longitudeIndex + 0);
          indices[6 * cellIndex + 1] = longitudeCount * (latitudeIndex + 1) + (longitudeIndex + 1);
          indices[6 * cellIndex + 2] = longitudeCount * (latitudeIndex + 1) + (longitudeIndex + 0);
          indices[6 * cellIndex + 3] = longitudeCount * (latitudeIndex + 0) + (longitudeIndex + 0);
          indices[6 * cellIndex + 4] = longitudeCount * (latitudeIndex + 0) + (longitudeIndex + 1);
          indices[6 * cellIndex + 5] = longitudeCount * (latitudeIndex + 1) + (longitudeIndex + 1);
        }
      }
      PioneerPublicApi.LatLonAlt.pool.release(geodetic);
      PioneerPublicApi.Vector3.pool.release(position);
      const mesh = this.getThreeJsObjects()[0];
      PioneerPublicApi.ThreeJsHelper.setVertices(mesh.geometry, "position", positions);
      PioneerPublicApi.ThreeJsHelper.setVertices(mesh.geometry, "normal", normals);
      PioneerPublicApi.ThreeJsHelper.setVertices(mesh.geometry, "uv", uvs);
      PioneerPublicApi.ThreeJsHelper.setIndices(mesh.geometry, indices);
      if (this._textureInfos.has("normal")) {
        PioneerPublicApi.ThreeJsHelper.computeTangents(mesh.geometry);
      }
    } else {
      const gridSize = 50;
      const position = PioneerPublicApi.Vector3.pool.get();
      const geodetic = PioneerPublicApi.LatLonAlt.pool.get();
      for (let faceIndex = 0; faceIndex < 6; faceIndex++) {
        const faceFrame = this._cubeMapFaceFrames[faceIndex];
        const positions = new Float32Array(gridSize * gridSize * 3);
        const normals = new Float32Array(gridSize * gridSize * 3);
        const uvs = new Float32Array(gridSize * gridSize * 2);
        const indices = new Uint16Array((gridSize - 1) * (gridSize - 1) * 6);
        let reverseWinding = false;
        const crossAxis = PioneerPublicApi.Vector3.pool.get();
        crossAxis.cross(faceFrame[0], faceFrame[1]);
        if (!(crossAxis.x === faceFrame[2].x && crossAxis.y === faceFrame[2].y && crossAxis.z === faceFrame[2].z)) {
          reverseWinding = true;
        }
        PioneerPublicApi.Vector3.pool.release(crossAxis);
        let vertexIndex = 0;
        let cellIndex = 0;
        for (let rowIndex = 0; rowIndex < gridSize; rowIndex++) for (let columnIndex = 0; columnIndex < gridSize; columnIndex++) {
          position.mult(faceFrame[0], 2 * columnIndex / (gridSize - 1) - 1);
          position.addMult(position, faceFrame[1], 2 * rowIndex / (gridSize - 1) - 1);
          position.addMult(position, faceFrame[2], 1);
          position.normalize(position);
          PioneerPublicApi.Geometry.getLLAFromXYZOnSphere(geodetic, position, 0);
          geodetic.alt = 0;
          spheroid.xyzFromLLA(position, geodetic);
          positions[3 * vertexIndex + 0] = position.x;
          positions[3 * vertexIndex + 1] = position.y;
          positions[3 * vertexIndex + 2] = position.z;
          spheroid.upFromLLA(position, geodetic);
          normals[3 * vertexIndex + 0] = position.x;
          normals[3 * vertexIndex + 1] = position.y;
          normals[3 * vertexIndex + 2] = position.z;
          uvs[2 * vertexIndex + 0] = columnIndex / (gridSize - 1);
          uvs[2 * vertexIndex + 1] = 1 - rowIndex / (gridSize - 1);
          if (columnIndex < gridSize - 1 && rowIndex < gridSize - 1) {
            indices[6 * cellIndex + 0] = (rowIndex + 0) * gridSize + (columnIndex + 0);
            indices[6 * cellIndex + 3] = (rowIndex + 1) * gridSize + (columnIndex + 1);
            if (reverseWinding) {
              indices[6 * cellIndex + 1] = (rowIndex + 1) * gridSize + (columnIndex + 1);
              indices[6 * cellIndex + 2] = (rowIndex + 0) * gridSize + (columnIndex + 1);
              indices[6 * cellIndex + 4] = (rowIndex + 0) * gridSize + (columnIndex + 0);
              indices[6 * cellIndex + 5] = (rowIndex + 1) * gridSize + (columnIndex + 0);
            } else {
              indices[6 * cellIndex + 1] = (rowIndex + 0) * gridSize + (columnIndex + 1);
              indices[6 * cellIndex + 2] = (rowIndex + 1) * gridSize + (columnIndex + 1);
              indices[6 * cellIndex + 4] = (rowIndex + 1) * gridSize + (columnIndex + 0);
              indices[6 * cellIndex + 5] = (rowIndex + 0) * gridSize + (columnIndex + 0);
            }
            cellIndex += 1;
          }
          vertexIndex += 1;
        }
        const mesh = this.getThreeJsObjects()[faceIndex];
        PioneerPublicApi.ThreeJsHelper.setVertices(mesh.geometry, "position", positions);
        PioneerPublicApi.ThreeJsHelper.setVertices(mesh.geometry, "normal", normals);
        PioneerPublicApi.ThreeJsHelper.setVertices(mesh.geometry, "uv", uvs);
        PioneerPublicApi.ThreeJsHelper.setIndices(mesh.geometry, indices);
        if (this._textureInfos.has("normal")) {
          PioneerPublicApi.ThreeJsHelper.computeTangents(mesh.geometry);
        }
      }
      PioneerPublicApi.LatLonAlt.pool.release(geodetic);
      PioneerPublicApi.Vector3.pool.release(position);
    }
  }
  _spheroidRefChangedCallback(previousSpheroid, nextSpheroid) {
    if (null !== previousSpheroid) {
      previousSpheroid.removeChangedCallback(this._spheroidChangedCallback);
    }
    if (null !== nextSpheroid) {
      nextSpheroid.addChangedCallback(this._spheroidChangedCallback);
    }
    this._spheroidChangedCallback();
  }
  _spheroidChangedCallback() {
    const spheroid = this._spheroidComponentRef.get();
    if (null !== spheroid) {
      this.__setRadius(Math.max(spheroid.getEquatorialRadius(), spheroid.getPolarRadius()));
    } else {
      this.__setRadius(0);
    }
    this.resetResources();
  }
  _textureInfos;
  _mapping;
  _longitudinalRotation;
  _numFaces;
  _lowerLeftBounds;
  _upperRightBounds;
  _cubeMapFaceFrames;
  _shadowEntities;
  _materialOptions;
  _atmosphereComponentRef;
  _spheroidComponentRef;
}
export { SpheroidLODComponent };
