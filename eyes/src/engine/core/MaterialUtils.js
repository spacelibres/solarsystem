/** @eyes-analysis
 * 文件职责：为组件创建材质并更新相机、光源、阴影及大气通用 uniforms。
 * 依据：import ../pioneer/public-api.js；MaterialUtils @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:142045-145349.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：为组件创建材质并更新相机、光源、阴影及大气通用 uniforms。
 * 继承：无显式父类；导出：MaterialUtils。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class MaterialUtils {
  /** @eyes-analysis
   * 【结构证据】调用 `Math.min`、`PioneerPublicApi.Color.pool.get`、`PioneerPublicApi.Color.pool.release`、`e.getComponent`、`e.getScene`、`i[r].set`。
   * 调用线索：Math.min、PioneerPublicApi.Color.pool.get、PioneerPublicApi.Color.pool.release、e.getComponent、e.getScene等。
   */
  static setLightSourceUniforms(t, e, i) {
    const n = e.getScene();
    const o = PioneerPublicApi.Color.pool.get();
    let r = 0;
    for (let a = 0, l = n.getNumLightSources(); a < Math.min(l, 5); a++) {
      const l = n.getLightSourceAt(a);
      if (null !== l && l !== e.getComponent(PioneerPublicApi.LightSourceComponent)) {
        const e = l.getEntity().getCameraSpacePosition(i);
        const n = 1;
        o.mult(l.getColor(), n);
        const a = null === l.getEntity().getComponent(PioneerPublicApi.CameraComponent) ? l.getEntity().getOcclusionRadius() : -1;
        for (let i = 0, s = t.length; i < s; i++) {
          const s = t[i];
          if (void 0 !== s.uniforms.lightPositions) {
            const t = s.uniforms.lightPositions.value;
            const i = s.uniforms.lightColors.value;
            const n = s.uniforms.lightRadii.value;
            t[r].set(e.x, e.y, e.z);
            i[r].set(o.r, o.g, o.b);
            n[r] = a;
          }
        }
        r += 1;
      }
    }
    for (let e = 0, i = t.length; e < i; e++) {
      const i = t[e];
      void 0 !== i.uniforms.numLights && (i.uniforms.numLights.value = r);
    }
    PioneerPublicApi.Color.pool.release(o);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `MaterialUtils.setLightSourceUniforms`、`PioneerPublicApi.MathUtils.wrap`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`c.set`、`d.ambientLightColor.value.setRGB`。
   * 调用线索：MaterialUtils.setLightSourceUniforms、PioneerPublicApi.MathUtils.wrap、PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release、c.set等。
   */
  static setUniforms(t, e, i, n, o, r) {
    const a = i.getScene().getEngine().getTime();
    const l = i.getScene().getAmbientLightColor();
    MaterialUtils.setLightSourceUniforms(t, i, e);
    for (let c = 0, h = t.length; c < h; c++) {
      const h = t[c];
      const d = h.uniforms;
      if (h instanceof PioneerPublicApi.THREE.RawShaderMaterial) void 0 !== d.time && (d.time.value = PioneerPublicApi.MathUtils.wrap(a, 0, 3600));else {
        const t = i.getCameraSpacePosition(e);
        d.entityPos.value.set(t.x, t.y, t.z);
        if (d.ambientLightColor.value.setRGB(l.r, l.g, l.b), n.length > 0) {
          let t = 0;
          for (let i = 0; i < n.length; i++) {
            const o = n[i].get();
            const r = d.shadowEntityRadii.value;
            const a = d.shadowEntitySunsetIntensity.value;
            if (null !== o) {
              const i = o.getCameraSpacePosition(e);
              d.shadowEntityPositions.value[t].set(i.x, i.y, i.z);
              r[t] = o.getOcclusionRadius();
              const n = o.getComponent(PioneerPublicApi.AtmosphereComponent);
              if (null !== n) {
                const e = n.getSunsetColor();
                d.shadowEntitySunsetColors.value[t].set(e.r, e.g, e.b);
                a[t] = n.getSunsetIntensity();
              } else a[t] = 0;
              t += 1;
            } else {
              r[t] = 0;
              a[t] = 0;
            }
          }
          d.numShadowEntities.value = t;
        }
        if (true === h.defines.shadowRings) {
          const t = i.getComponent(PioneerPublicApi.RingsComponent);
          if (t && t.isRendering(e)) {
            const e = PioneerPublicApi.Vector3.pool.get();
            i.getOrientation().getAxis(e, 2);
            d.shadowRingsInnerRadius.value = t.getInnerRadius();
            d.shadowRingsOuterRadius.value = t.getOuterRadius();
            d.shadowRingsTexture.value = t.getTopTexture();
            d.shadowRingsNormal.value.set(e.x, e.y, e.z);
            PioneerPublicApi.Vector3.pool.release(e);
          } else d.shadowRingsTexture.value = null;
        }
      }
      if (null !== o && o.isRendering(e) && void 0 !== d.atmospherePosition) {
        const t = o.getSpheroid();
        const i = o.getEntity().getCameraSpacePosition(e);
        const s = o.getEntity().getOrientation();
        const n = o.getColor();
        const a = o.getSunsetColor();
        const l = d.atmospherePosition.value;
        const c = d.atmosphereOrientation.value;
        l.set(i.x, i.y, i.z);
        c.set(s.x, s.y, s.z, s.w);
        null !== t ? (d.atmosphereEquatorialRadius.value = t.getEquatorialRadius(), d.atmospherePolarRadius.value = t.getPolarRadius()) : (d.atmosphereEquatorialRadius.value = 0, d.atmospherePolarRadius.value = 0);
        d.atmosphereDensity.value = o.getDensity();
        d.atmosphereScaleHeight.value = o.getScaleHeight();
        d.atmosphereEmissivity.value = o.getEmissivity();
        const u = d.atmosphereColor.value;
        const p = d.atmosphereSunsetColor.value;
        u.set(n.r, n.g, n.b);
        p.set(a.r, a.g, a.b);
        d.atmosphereSunsetIntensity.value = o.getSunsetIntensity();
        d.atmosphereGroundIsSpheroid.value = r ? 1 : 0;
        void 0 === h.defines.atmosphere && (h.defines.atmosphere = true, h.needsUpdate = true);
      } else true === h.defines.atmosphere && (delete h.defines.atmosphere, h.needsUpdate = true);
    }
  }
  static get = PioneerPublicApi.MaterialUtilsPhong.get;
  static getPBR = PioneerPublicApi.MaterialUtilsStandard.get;
}
export { MaterialUtils };
