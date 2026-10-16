// 材质 uniform 更新最多收集五个场景光源，排除实体自身光源；阴影实体、环影与大气参数按现有 shader 协议写入，RawShaderMaterial 仅更新时间路径，不重命名任何 GLSL 接口。
// Recovered from app.js:142045-145349.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class MaterialUtils {
  static setLightSourceUniforms(materials, entity, camera) {
    const scene = entity.getScene();
    const color = PioneerPublicApi.Color.pool.get();
    let lightCount = 0;
    for (let sourceIndex = 0, sourceCount = scene.getNumLightSources(); sourceIndex < Math.min(sourceCount, 5); sourceIndex++) {
      const light = scene.getLightSourceAt(sourceIndex);
      if (null !== light && light !== entity.getComponent(PioneerPublicApi.LightSourceComponent)) {
        const lightPosition = light.getEntity().getCameraSpacePosition(camera);
        const intensity = 1;
        color.mult(light.getColor(), intensity);
        const lightRadius = null === light.getEntity().getComponent(PioneerPublicApi.CameraComponent) ? light.getEntity().getOcclusionRadius() : -1;
        for (let materialIndex = 0, materialCount = materials.length; materialIndex < materialCount; materialIndex++) {
          const material = materials[materialIndex];
          if (void 0 !== material.uniforms.lightPositions) {
            const positions = material.uniforms.lightPositions.value;
            const colors = material.uniforms.lightColors.value;
            const radii = material.uniforms.lightRadii.value;
            positions[lightCount].set(lightPosition.x, lightPosition.y, lightPosition.z);
            colors[lightCount].set(color.r, color.g, color.b);
            radii[lightCount] = lightRadius;
          }
        }
        lightCount += 1;
      }
    }
    for (let materialIndex = 0, materialCount = materials.length; materialIndex < materialCount; materialIndex++) {
      const material = materials[materialIndex];
      if (void 0 !== material.uniforms.numLights) {
        material.uniforms.numLights.value = lightCount;
      }
    }
    PioneerPublicApi.Color.pool.release(color);
  }
  // 只对实际存在的大气/环组件开启对应 define；shader 改变时才标 needsUpdate，uniform 更新保留相机空间约定。
  static setUniforms(materials, camera, entity, shadowRefs, atmosphere, groundIsSpheroid) {
    const time = entity.getScene().getEngine().getTime();
    const ambientColor = entity.getScene().getAmbientLightColor();
    MaterialUtils.setLightSourceUniforms(materials, entity, camera);
    for (let materialIndex = 0, materialCount = materials.length; materialIndex < materialCount; materialIndex++) {
      const material = materials[materialIndex];
      const uniforms = material.uniforms;
      if (material instanceof PioneerPublicApi.THREE.RawShaderMaterial) {
        if (void 0 !== uniforms.time) {
          uniforms.time.value = PioneerPublicApi.MathUtils.wrap(time, 0, 3600);
        }
      } else {
        const entityPosition = entity.getCameraSpacePosition(camera);
        uniforms.entityPos.value.set(entityPosition.x, entityPosition.y, entityPosition.z);
        uniforms.ambientLightColor.value.setRGB(ambientColor.r, ambientColor.g, ambientColor.b);
        if (shadowRefs.length > 0) {
          let shadowCount = 0;
          for (let shadowIndex = 0; shadowIndex < shadowRefs.length; shadowIndex++) {
            const shadowEntity = shadowRefs[shadowIndex].get();
            const radii = uniforms.shadowEntityRadii.value;
            const sunsetIntensities = uniforms.shadowEntitySunsetIntensity.value;
            if (null !== shadowEntity) {
              const shadowPosition = shadowEntity.getCameraSpacePosition(camera);
              uniforms.shadowEntityPositions.value[shadowCount].set(shadowPosition.x, shadowPosition.y, shadowPosition.z);
              radii[shadowCount] = shadowEntity.getOcclusionRadius();
              const shadowAtmosphere = shadowEntity.getComponent(PioneerPublicApi.AtmosphereComponent);
              if (null !== shadowAtmosphere) {
                const sunsetColor = shadowAtmosphere.getSunsetColor();
                uniforms.shadowEntitySunsetColors.value[shadowCount].set(sunsetColor.r, sunsetColor.g, sunsetColor.b);
                sunsetIntensities[shadowCount] = shadowAtmosphere.getSunsetIntensity();
              } else sunsetIntensities[shadowCount] = 0;
              shadowCount += 1;
            } else {
              radii[shadowCount] = 0;
              sunsetIntensities[shadowCount] = 0;
            }
          }
          uniforms.numShadowEntities.value = shadowCount;
        }
        if (true === material.defines.shadowRings) {
          const rings = entity.getComponent(PioneerPublicApi.RingsComponent);
          if (rings && rings.isRendering(camera)) {
            const ringNormal = PioneerPublicApi.Vector3.pool.get();
            entity.getOrientation().getAxis(ringNormal, 2);
            uniforms.shadowRingsInnerRadius.value = rings.getInnerRadius();
            uniforms.shadowRingsOuterRadius.value = rings.getOuterRadius();
            uniforms.shadowRingsTexture.value = rings.getTopTexture();
            uniforms.shadowRingsNormal.value.set(ringNormal.x, ringNormal.y, ringNormal.z);
            PioneerPublicApi.Vector3.pool.release(ringNormal);
          } else uniforms.shadowRingsTexture.value = null;
        }
      }
      if (null !== atmosphere && atmosphere.isRendering(camera) && void 0 !== uniforms.atmospherePosition) {
        const spheroid = atmosphere.getSpheroid();
        const atmospherePosition = atmosphere.getEntity().getCameraSpacePosition(camera);
        const atmosphereOrientation = atmosphere.getEntity().getOrientation();
        const atmosphereColor = atmosphere.getColor();
        const sunsetColor = atmosphere.getSunsetColor();
        const positionUniform = uniforms.atmospherePosition.value;
        const orientationUniform = uniforms.atmosphereOrientation.value;
        positionUniform.set(atmospherePosition.x, atmospherePosition.y, atmospherePosition.z);
        orientationUniform.set(atmosphereOrientation.x, atmosphereOrientation.y, atmosphereOrientation.z, atmosphereOrientation.w);
        if (null !== spheroid) {
          uniforms.atmosphereEquatorialRadius.value = spheroid.getEquatorialRadius();
          uniforms.atmospherePolarRadius.value = spheroid.getPolarRadius();
        } else {
          uniforms.atmosphereEquatorialRadius.value = 0;
          uniforms.atmospherePolarRadius.value = 0;
        }
        uniforms.atmosphereDensity.value = atmosphere.getDensity();
        uniforms.atmosphereScaleHeight.value = atmosphere.getScaleHeight();
        uniforms.atmosphereEmissivity.value = atmosphere.getEmissivity();
        const colorUniform = uniforms.atmosphereColor.value;
        const sunsetColorUniform = uniforms.atmosphereSunsetColor.value;
        colorUniform.set(atmosphereColor.r, atmosphereColor.g, atmosphereColor.b);
        sunsetColorUniform.set(sunsetColor.r, sunsetColor.g, sunsetColor.b);
        uniforms.atmosphereSunsetIntensity.value = atmosphere.getSunsetIntensity();
        uniforms.atmosphereGroundIsSpheroid.value = groundIsSpheroid ? 1 : 0;
        if (void 0 === material.defines.atmosphere) {
          material.defines.atmosphere = true;
          material.needsUpdate = true;
        }
      } else if (true === material.defines.atmosphere) {
        delete material.defines.atmosphere;
        material.needsUpdate = true;
      }
    }
  }
  static get = PioneerPublicApi.MaterialUtilsPhong.get;
  static getPBR = PioneerPublicApi.MaterialUtilsStandard.get;
}
export { MaterialUtils };
