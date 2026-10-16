// 行星环由平面网格承载，shader 以局部径向距离裁切内外半径并采样上下表面；两张纹理由组件引用计数持有。椭球引用变化时解绑旧监听、绑定新监听，再更新遮影半径。
// Recovered from app.js:374449-387236.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class RingsComponent extends PioneerPublicApi.BaseComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
    this._topTextureUrl = "";
    this._bottomTextureUrl = "";
    this._innerRadius = 0;
    this._outerRadius = 0;
    this._shadowEntities = [];
    this._spheroidComponentRef = new PioneerPublicApi.ComponentRef(this.getEntity().getScene(), PioneerPublicApi.SpheroidComponent, this.getEntity().getName());
    this._spheroidComponentRef.setRefChangedCallback(this._spheroidRefChangedCallback.bind(this));
    this._spheroidChangedCallback = this._spheroidChangedCallback.bind(this);
    this.__setUsesEntityOrientation(true);
  }
  getTopTextureUrl() {
    return this._topTextureUrl;
  }
  setTopTextureUrl(topTextureUrl) {
    this._topTextureUrl = topTextureUrl;
    if ("loaded" === this.getLoadState().state) {
      this.getEngine().getResourceManager().acquire(this, this._topTextureUrl, "texture", -this.getEntity().getLeastCameraDepth()).then(texture => {
        const uniform = this.getThreeJsMaterials()[0].uniforms.topTexture;
        if (uniform.value) {
          this.getEngine().getResourceManager().release(this, uniform.value, "texture");
        }
        uniform.value = texture;
      });
    }
  }
  getBottomTextureUrl() {
    return this._bottomTextureUrl;
  }
  setBottomTextureUrl(bottomTextureUrl) {
    this._bottomTextureUrl = bottomTextureUrl;
    if ("loaded" === this.getLoadState().state) {
      this.getEngine().getResourceManager().acquire(this, this._bottomTextureUrl, "texture", -this.getEntity().getLeastCameraDepth()).then(texture => {
        const uniform = this.getThreeJsMaterials()[0].uniforms.bottomTexture;
        if (uniform.value) {
          this.getEngine().getResourceManager().release(this, uniform.value, "texture");
        }
        uniform.value = texture;
      });
    }
  }
  getInnerRadius() {
    return this._innerRadius;
  }
  setInnerRadius(innerRadius) {
    this._innerRadius = innerRadius;
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "innerRadius", this._innerRadius);
  }
  getOuterRadius() {
    return this._outerRadius;
  }
  setOuterRadius(outerRadius) {
    this._outerRadius = outerRadius;
    this.__setRadius(this._outerRadius);
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "outerRadius", this._outerRadius);
  }
  getTopTexture() {
    const material = this.getThreeJsMaterials()[0];
    if (void 0 !== material) {
      return material.uniforms.topTexture.value;
    }
    return null;
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
  __destroy() {
    const spheroid = this._spheroidComponentRef.get();
    if (null !== spheroid) {
      spheroid.removeChangedCallback(this._spheroidChangedCallback);
    }
    super.__destroy();
  }
  __update() {
    this._spheroidComponentRef.update();
  }
  __prepareForRender(camera) {
    const fadeMultiplier = this.getVisibleInterval().getFadeMultiplier(this.getEntity(), camera);
    this.setAlphaFadeMultiplier(fadeMultiplier);
    PioneerPublicApi.MaterialUtils.setLightSourceUniforms(this.getThreeJsMaterials(), this.getEntity(), camera);
    PioneerPublicApi.MaterialUtils.setUniforms(this.getThreeJsMaterials(), camera, this.getEntity(), this._shadowEntities, null, false);
    PioneerPublicApi.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects()[0], this.getEntity());
    PioneerPublicApi.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), camera);
  }
  async __loadResources() {
    const textures = await this.getEngine().getResourceManager().acquireMultiple(this, {
      top: {
        url: this._topTextureUrl,
        type: "texture"
      },
      bottom: {
        url: this._bottomTextureUrl,
        type: "texture"
      }
    }, -this.getEntity().getLeastCameraDepth());
    if (this.isDestroyed()) return void this.getEngine().getResourceManager().releaseAllForEntityItem(this);
    const shaderMaterial = new PioneerPublicApi.THREE.ShaderMaterial({
      uniforms: {
        ambientLightColor: new PioneerPublicApi.THREE.Uniform(new PioneerPublicApi.THREE.Color()),
        lightPositions: new PioneerPublicApi.THREE.Uniform([new PioneerPublicApi.THREE.Vector3(1, 0, 0), new PioneerPublicApi.THREE.Vector3(1, 0, 0), new PioneerPublicApi.THREE.Vector3(1, 0, 0), new PioneerPublicApi.THREE.Vector3(1, 0, 0), new PioneerPublicApi.THREE.Vector3(1, 0, 0)]),
        lightColors: new PioneerPublicApi.THREE.Uniform([new PioneerPublicApi.THREE.Vector3(0, 0, 0), new PioneerPublicApi.THREE.Vector3(0, 0, 0), new PioneerPublicApi.THREE.Vector3(0, 0, 0), new PioneerPublicApi.THREE.Vector3(0, 0, 0), new PioneerPublicApi.THREE.Vector3(0, 0, 0)]),
        lightRadii: new PioneerPublicApi.THREE.Uniform([0, 0, 0, 0, 0]),
        numLights: new PioneerPublicApi.THREE.Uniform(0),
        entityPos: new PioneerPublicApi.THREE.Uniform(new PioneerPublicApi.THREE.Vector3()),
        innerRadius: new PioneerPublicApi.THREE.Uniform(this._innerRadius),
        outerRadius: new PioneerPublicApi.THREE.Uniform(this._outerRadius),
        topTexture: new PioneerPublicApi.THREE.Uniform(textures.top),
        bottomTexture: new PioneerPublicApi.THREE.Uniform(textures.bottom),
        alphaMultiplier: new PioneerPublicApi.THREE.Uniform(1),
        spheroidEquatorialRadius: new PioneerPublicApi.THREE.Uniform(0),
        spheroidPolarRadius: new PioneerPublicApi.THREE.Uniform(0),
        numShadowEntities: new PioneerPublicApi.THREE.Uniform(0),
        shadowEntityPositions: new PioneerPublicApi.THREE.Uniform([new PioneerPublicApi.THREE.Vector3(), new PioneerPublicApi.THREE.Vector3(), new PioneerPublicApi.THREE.Vector3(), new PioneerPublicApi.THREE.Vector3(), new PioneerPublicApi.THREE.Vector3(), new PioneerPublicApi.THREE.Vector3(), new PioneerPublicApi.THREE.Vector3()]),
        shadowEntityRadii: new PioneerPublicApi.THREE.Uniform([0, 0, 0, 0, 0, 0, 0]),
        shadowEntitySunsetIntensity: new PioneerPublicApi.THREE.Uniform([0, 0, 0, 0, 0, 0, 0]),
        shadowEntitySunsetColors: new PioneerPublicApi.THREE.Uniform([new PioneerPublicApi.THREE.Vector3(), new PioneerPublicApi.THREE.Vector3(), new PioneerPublicApi.THREE.Vector3(), new PioneerPublicApi.THREE.Vector3(), new PioneerPublicApi.THREE.Vector3(), new PioneerPublicApi.THREE.Vector3(), new PioneerPublicApi.THREE.Vector3()]),
        ...PioneerPublicApi.ShaderChunkLogDepth.ThreeUniforms
      },
      vertexShader: RingsComponent.vertexShader,
      fragmentShader: RingsComponent.fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: PioneerPublicApi.THREE.NormalBlending,
      side: PioneerPublicApi.THREE.DoubleSide
    });
    PioneerPublicApi.ThreeJsHelper.setDefine(shaderMaterial, "shadowEntities", this._shadowEntities.length > 0);
    this.getThreeJsMaterials().push(shaderMaterial);
    const mesh = PioneerPublicApi.ThreeJsHelper.createMeshObject(this, shaderMaterial, [{
      name: "position",
      dimensions: 3
    }, {
      name: "normal",
      dimensions: 3
    }], false);
    const gridSize = 10;
    const positions = new Float32Array(300);
    const normals = new Float32Array(300);
    const indices = new Uint16Array(486);
    for (let rowIndex = 0; rowIndex < gridSize; rowIndex++) for (let columnIndex = 0; columnIndex < gridSize; columnIndex++) {
      const vertexIndex = columnIndex + rowIndex * gridSize;
      positions[3 * vertexIndex + 0] = columnIndex / 9 * 2 - 1;
      positions[3 * vertexIndex + 1] = rowIndex / 9 * 2 - 1;
      positions[3 * vertexIndex + 2] = 0;
      normals[3 * vertexIndex + 0] = 0;
      normals[3 * vertexIndex + 1] = 0;
      normals[3 * vertexIndex + 2] = 1;
      if (columnIndex + 1 < gridSize && rowIndex + 1 < gridSize) {
        indices[6 * (columnIndex + 9 * rowIndex) + 0] = columnIndex + 0 + (rowIndex + 0) * gridSize;
        indices[6 * (columnIndex + 9 * rowIndex) + 1] = columnIndex + 0 + (rowIndex + 1) * gridSize;
        indices[6 * (columnIndex + 9 * rowIndex) + 2] = columnIndex + 1 + (rowIndex + 0) * gridSize;
        indices[6 * (columnIndex + 9 * rowIndex) + 3] = columnIndex + 1 + (rowIndex + 0) * gridSize;
        indices[6 * (columnIndex + 9 * rowIndex) + 4] = columnIndex + 0 + (rowIndex + 1) * gridSize;
        indices[6 * (columnIndex + 9 * rowIndex) + 5] = columnIndex + 1 + (rowIndex + 1) * gridSize;
      }
    }
    PioneerPublicApi.ThreeJsHelper.setVertices(mesh.geometry, "position", positions);
    PioneerPublicApi.ThreeJsHelper.setVertices(mesh.geometry, "normal", normals);
    PioneerPublicApi.ThreeJsHelper.setIndices(mesh.geometry, indices);
    mesh.material = shaderMaterial;
    this.getThreeJsObjects().push(mesh);
    this._spheroidChangedCallback();
  }
  __unloadResources() {
    this.getEngine().getResourceManager().releaseAllForEntityItem(this);
    PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials(this, false);
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
    const material = this.getThreeJsMaterials()[0];
    if (material) {
      const spheroid = this._spheroidComponentRef.get();
      if (null !== spheroid) {
        PioneerPublicApi.ThreeJsHelper.setUniformNumber(material, "spheroidEquatorialRadius", spheroid.getEquatorialRadius());
        PioneerPublicApi.ThreeJsHelper.setUniformNumber(material, "spheroidPolarRadius", spheroid.getPolarRadius());
      } else {
        PioneerPublicApi.ThreeJsHelper.setUniformNumber(material, "spheroidEquatorialRadius", 0);
        PioneerPublicApi.ThreeJsHelper.setUniformNumber(material, "spheroidPolarRadius", 0);
      }
    }
  }
  _topTextureUrl;
  _bottomTextureUrl;
  _innerRadius;
  _outerRadius;
  _shadowEntities;
  _spheroidComponentRef;
  static vertexShader = `\n\t\tuniform float outerRadius;\n\n\t\tout vec3 localPosition;\n\t\tout vec3 cameraSpacePosition;\n\t\tout vec3 modelNormal;\n\n\t\t${PioneerPublicApi.ShaderChunkLogDepth.VertexHead}\n\n\t\tvoid main() {\n\t\t\tlocalPosition = position * outerRadius;\n\t\t\tcameraSpacePosition = (modelMatrix * vec4(localPosition, 1.)).xyz;\n\t\t\tmodelNormal = (modelMatrix * vec4(normal, 0.)).xyz;\n\t\t\tvec4 viewPosition = viewMatrix * vec4(cameraSpacePosition, 1.);\n\t\t\tgl_Position = projectionMatrix * viewPosition;\n\n\t\t\t${PioneerPublicApi.ShaderChunkLogDepth.Vertex}\n\t\t}`;
  static fragmentShader = `\n\t\tprecision highp float;\n\n\t\t#ifndef saturate\n\t\t\t#define saturate(a) clamp(a, 0.0, 1.0)\n\t\t#endif\n\n\t\t// Lights\n\t\tuniform vec3 ambientLightColor;\n\t\tuniform vec3 lightPositions[5];\n\t\tuniform vec3 lightColors[5];\n\t\tuniform float lightRadii[5];\n\t\tuniform int numLights;\n\n\t\tuniform float innerRadius;\n\t\tuniform float outerRadius;\n\t\tuniform sampler2D topTexture;\n\t\tuniform sampler2D bottomTexture;\n\t\tuniform float alphaMultiplier;\n\t\tuniform float spheroidEquatorialRadius;\n\t\tuniform float spheroidPolarRadius;\n\t\tuniform vec3 entityPos;\n\n\t\t// Shadow Entities.\n\t\t#ifdef shadowEntities\n\t\t\tuniform int numShadowEntities;\n\t\t\tuniform vec3 shadowEntityPositions[7];\n\t\t\tuniform float shadowEntityRadii[7];\n\t\t\tuniform float shadowEntitySunsetIntensity[7];\n\t\t\tuniform vec3 shadowEntitySunsetColors[7];\n\t\t#endif\n\n\t\t// The varying attributes.\n\t\tin vec3 localPosition;\n\t\tin vec3 cameraSpacePosition;\n\t\tin vec3 modelNormal;\n\n\t\t${PioneerPublicApi.ShaderChunkLogDepth.FragmentHead}\n\n\t\tfloat spheroidShadow(vec3 lightDir, float lightCosAngle, float spheroidScaling, vec3 normal, vec3 ringPos) {\n\t\t\tvec3 sunDirScaled = normalize(lightDir - (spheroidScaling - 1.0) * lightCosAngle * normal);\n\t\t\tfloat pDotLScaled = dot(ringPos, sunDirScaled);\n\t\t\tif(dot(ringPos, ringPos) - pDotLScaled * pDotLScaled < spheroidEquatorialRadius * spheroidEquatorialRadius && pDotLScaled > 0.0) {\n\t\t\t\treturn 0.0;\n\t\t\t}\n\t\t\telse {\n\t\t\t\treturn 1.0;\n\t\t\t}\n\t\t}\n\n\t\t#ifdef shadowEntities\n\t\t\tvec3 applyRayleighScattering(vec3 color, float amount) {\n\t\t\t\tfloat value = (color.r + color.g + color.b);\n\t\t\t\tif (value > 0.0) {\n\t\t\t\t\tfloat rFactor = 1.0; // 6.3^-4 / 6.3^-4\n\t\t\t\t\tfloat gFactor = 1.602; // 5.6^-4 / 6.3^-4\n\t\t\t\t\tfloat bFactor = 3.228; // 4.7^-4 / 6.3^-4\n\t\t\t\t\tcolor.r *= pow(rFactor, -amount);\n\t\t\t\t\tcolor.g *= pow(gFactor, -amount);\n\t\t\t\t\tcolor.b *= pow(bFactor, -amount);\n\t\t\t\t\tcolor = value * color / (color.r + color.g + color.b);\n\t\t\t\t}\n\t\t\t\treturn color;\n\t\t\t}\n\n\t\t\tvec3 getLightColorFromShadowEntities(vec3 lightColor, vec3 lightDir, vec3 lightPosition, float lightRadius, vec3 normal) {\n\t\t\t\tvec3 color = lightColor;\n\t\t\t\tfor (int i = 0; i < 7; i++) {\n\t\t\t\t\tif (i >= numShadowEntities) {\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\t\t\t\t\tvec3 origin = cameraSpacePosition - shadowEntityPositions[i];\n\t\t\t\t\tvec3 axis = normalize(shadowEntityPositions[i] - lightPosition);\n\t\t\t\t\tfloat sd = dot(origin, axis);\n\t\t\t\t\tif (sd > 0.0) {\n\t\t\t\t\t\tfloat e = length(origin - sd * axis);\n\t\t\t\t\t\tfloat ld = dot(cameraSpacePosition - lightPosition, axis);\n\t\t\t\t\t\tfloat lr = lightRadius;\n\t\t\t\t\t\tfloat sr = shadowEntityRadii[i];\n\t\t\t\t\t\tfloat e0 = (ld * sr - sd * lr) / (ld - sd);\n\t\t\t\t\t\tfloat e1 = (ld * sr + sd * lr) / (ld - sd);\n\t\t\t\t\t\tfloat lightLevel = 0.0;\n\t\t\t\t\t\tif (e1 < 0.0 || sd < 0.0) { // light in front of shadow entity\n\t\t\t\t\t\t\tlightLevel = 1.0;\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse if (e0 < e1) {\n\t\t\t\t\t\t\te0 /= max(1.0, shadowEntitySunsetIntensity[i] * 2.0);\n\t\t\t\t\t\t\tlightLevel = (e - e0) / (e1 - e0);\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse {\n\t\t\t\t\t\t\tlightLevel = e < e0 ? 0.0 : 1.0; // 0 radius light.\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcolor = saturate(lightLevel) * applyRayleighScattering(color, saturate(1.5 - lightLevel) * saturate(shadowEntitySunsetIntensity[i]));\n\t\t\t\t\t}\n\t}\n\t\t\t\treturn color;\n\t\t\t}\n\t\t#endif\n\n\t\tvoid main(void) {\n\t\t\tfloat spheroidScaling = spheroidEquatorialRadius / spheroidPolarRadius;\n\t\t\tvec3 positionDir = normalize(cameraSpacePosition);\n\t\t\tvec3 ringPos = cameraSpacePosition - entityPos;\n\t\t\tvec3 normal = normalize(modelNormal);\n\t\t\tfloat cameraCosAngle = -dot(positionDir, normal);\n\n\t\t\t// Calculate the UVs.\n\t\t\tvec2 uv;\n\t\t\tuv.x = (length(localPosition) - innerRadius) / (outerRadius - innerRadius);\n\t\t\tif (uv.x < 0.0 || uv.x > 1.0) {\n\t\t\t\tpc_fragColor = vec4(0, 0, 0, 0);\n\t\t\t\treturn;\n\t\t\t}\n\t\t\tuv.y = 0.0;\n\n\t\t\t// Get the pixels at those uvs.\n\t\t\tvec4 topPixel = texture(topTexture, uv);\n\t\t\tvec4 bottomPixel = texture(bottomTexture, uv);\n\n\t\t\t// Get the initial diffuse light.\n\t\t\tvec3 diffuseLight = ambientLightColor;\n\t\t\t\n\t\t\t// For each light,\n\t\t\tfor (int i = 0; i < 5; i++) {\n\t\t\t\tif (i >= numLights) {\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\n\t\t\t\tvec3 lightDir = normalize(cameraSpacePosition - lightPositions[i]);\n\t\t\t\tfloat lightCosAngle = -dot(lightDir, normal);\n\n\t\t\t\tvec3 incomingLight = lightColors[i];\n\n\t\t\t\t#ifdef shadowEntities\n\t\t\t\t\tincomingLight = getLightColorFromShadowEntities(incomingLight, lightDir, lightPositions[i], lightRadii[i], normal);\n\t\t\t\t#endif\n\n\t\t\t\tfloat cameraDirDotLight = dot(positionDir, lightDir);\n\t\t\t\tfloat bottomTopRatio = (1.0 + 0.2 * cameraDirDotLight) * sign(cameraCosAngle) * lightCosAngle;\n\t\t\t\tfloat shadow = spheroidShadow(lightDir, lightCosAngle, spheroidScaling, normal, ringPos);\n\t\t\t\tvec3 bottomColor = saturate(incomingLight * (1.0 - bottomTopRatio) * shadow);\n\t\t\t\tvec3 topColor = 2.0 * saturate(incomingLight * bottomTopRatio * shadow);\n\n\t\t\t\tvec3 color = mix(bottomPixel.rgb * bottomColor, topPixel.rgb * topColor, bottomTopRatio);\n\t\t\t\tpc_fragColor.rgb += color;\n\t\t\t}\n\n\t\t\tpc_fragColor.a = topPixel.a;\n\t\t\tpc_fragColor.a *= alphaMultiplier;\n\n\t\t\t${PioneerPublicApi.ShaderChunkLogDepth.Fragment}\n\t\t}`;
}
export { RingsComponent };
