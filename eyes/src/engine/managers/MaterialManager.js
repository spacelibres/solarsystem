/** @eyes-analysis
 * 文件职责：预加载材质描述/着色器资源，创建可复用材质实例并维护 Resource 加载状态。
 * 依据：import ../pioneer/public-api.js；import ../core/BasicAlphaShader.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:198607-202549.
import * as PioneerPublicApi from "../pioneer/public-api.js";
import * as BasicAlphaShader from "../core/BasicAlphaShader.js";
import * as BasicShader from "../core/BasicShader.js";
import * as ConnectedSpriteShader from "../core/ConnectedSpriteShader.js";
import * as LineShader from "../core/LineShader.js";
import * as PlumesShader from "../core/PlumesShader.js";
import * as SpriteParticlesShader from "../core/SpriteParticlesShader.js";
import * as SpriteShader from "../core/SpriteShader.js";
import * as TrailShader from "../core/TrailShader.js";
import * as assertIsShader from "../core/assertIsShader.js";
/** @eyes-analysis
 * 类职责：MaterialManager 单项材质/着色器资源的状态记录。
 * 继承：无显式父类；导出：模块内部声明。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Resource {
  value;
  useCount;
  /** @eyes-analysis
   * 【结构证据】写入 `useCount`、`value`。
   * 状态写入：useCount、value。
   */
  constructor(value) {
    this.value = value;
    this.useCount = 0;
  }
}
/** @eyes-analysis
 * 类职责：预加载材质描述/着色器资源，创建可复用材质实例并维护 Resource 加载状态。
 * 继承：无显式父类；导出：MaterialManager。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class MaterialManager {
  /** @eyes-analysis
   * 【结构证据】写入 `_cache`、`_clonedMaterials`、`_downloader`、`_promises`；调用 `new Map`、`this._preload`。
   * 状态写入：_cache、_clonedMaterials、_downloader、_promises。
   * 调用线索：new Map、this._preload。
   */
  constructor(downloader) {
    this._downloader = downloader;
    this._cache = new Map();
    this._clonedMaterials = new Map();
    this._promises = new Map();
    this._preload();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `n`；调用 `0,assertIsShader.assertIsShader`、`JSON.parse`、`PioneerPublicApi.ThreeJsHelper.cloneMaterial`、`new Resource`、`this._cache.get`、`this._cache.set`。
   * 调用线索：0,assertIsShader.assertIsShader、JSON.parse、PioneerPublicApi.ThreeJsHelper.cloneMaterial、new Resource、this._cache.get等。
   */
  async get(t, e) {
    let i = this._cache.get(t);
    if (void 0 === i) {
      const e = this._promises.get(t);
      void 0 !== e && (i = await e);
    }
    if (void 0 === i) {
      const s = await this._downloader.download(t, "text", e);
      const n = JSON.parse(s.content);
      (0, assertIsShader.assertIsShader)(n);
      i = new Resource(this._load(t, n));
      this._cache.set(t, i);
    }
    i.useCount += 1;
    const n = PioneerPublicApi.ThreeJsHelper.cloneMaterial(i.value);
    this._clonedMaterials.set(n, t);
    return n;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `i`；调用 `PioneerPublicApi.ThreeJsHelper.cloneMaterial`、`new Error`、`this._cache.get`、`this._clonedMaterials.set`；含显式错误分支。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.cloneMaterial、new Error、this._cache.get、this._clonedMaterials.set。
   */
  getPreloaded(t) {
    const e = this._cache.get(t);
    if (void 0 === e) throw new Error(`Invalid pre-loaded material "${t}".`);
    e.useCount += 1;
    const i = PioneerPublicApi.ThreeJsHelper.cloneMaterial(e.value);
    this._clonedMaterials.set(i, t);
    return i;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `PioneerPublicApi.ThreeJsHelper.destroyMaterial`、`this._cache.delete`、`this._cache.get`、`this._clonedMaterials.delete`、`this._clonedMaterials.get`。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.destroyMaterial、this._cache.delete、this._cache.get、this._clonedMaterials.delete、this._clonedMaterials.get。
   */
  release(t) {
    const e = this._clonedMaterials.get(t);
    if (void 0 === e) return;
    this._clonedMaterials.delete(t);
    const i = this._cache.get(e);
    i && (i.useCount -= 1, 0 === i.useCount && (PioneerPublicApi.ThreeJsHelper.destroyMaterial(i.value, true), this._cache.delete(e)));
  }
  /** @eyes-analysis
   * 【结构证据】调用 `map.set`、`new Map`、`new Resource`、`this._cache.set`、`this._load`。
   * 调用线索：map.set、new Map、new Resource、this._cache.set、this._load。
   */
  _preload() {
    const map = new Map();
    map.set("basic", BasicShader.BasicShader);
    map.set("basic_alpha", BasicAlphaShader.BasicAlphaShader);
    map.set("connected_sprite", ConnectedSpriteShader.ConnectedSpriteShader);
    map.set("line", LineShader.LineShader);
    map.set("plumes", PlumesShader.PlumesShader);
    map.set("sprite", SpriteShader.SpriteShader);
    map.set("sprite_particles", SpriteParticlesShader.SpriteParticlesShader);
    map.set("trail", TrailShader.TrailShader);
    for (const [e, i] of map) {
      const t = this._load(e, i);
      const resource = new Resource(t);
      resource.useCount += 1;
      this._cache.set(e, resource);
    }
  }
  /** @eyes-analysis
   * 【结构证据】返回 `rawShaderMaterial`；调用 `Object.entries`、`PioneerPublicApi.Capabilities.hasGLExtension`、`["modelMatrix","modelViewMatrix","projectionMatrix","viewMatrix","normalMatrix","cameraPosition"].includes`、`new PioneerPublicApi.THREE.RawShaderMaterial`、`new PioneerPublicApi.THREE.Uniform`、`this._getUniformValueFromType`；含显式错误分支。
   * 调用线索：Object.entries、PioneerPublicApi.Capabilities.hasGLExtension、["modelMatrix","modelViewMatrix","projectionMatrix","viewMatrix","normalMatrix","cameraPosition"].includes、new PioneerPublicApi.THREE.RawShaderMaterial、new PioneerPublicApi.THREE.Uniform等。
   */
  _load(t, e) {
    try {
      const t = {};
      for (const [i, n] of Object.entries(e.uniforms)) ["modelMatrix", "modelViewMatrix", "projectionMatrix", "viewMatrix", "normalMatrix", "cameraPosition"].includes(i) || (t[i] = new PioneerPublicApi.THREE.Uniform(this._getUniformValueFromType(n)));
      let i = false;
      let n = true;
      let o = PioneerPublicApi.THREE.FrontSide;
      let r = PioneerPublicApi.THREE.NoBlending;
      if (e.properties) {
        switch (true === e.properties.transparent && (i = true), false === e.properties.depthWrite && (n = false), e.properties.side) {
          case "front":
            o = PioneerPublicApi.THREE.FrontSide;
            break;
          case "back":
            o = PioneerPublicApi.THREE.BackSide;
            break;
          case "double":
            o = PioneerPublicApi.THREE.DoubleSide;
        }
        switch (e.properties.blending) {
          case "normal":
            r = PioneerPublicApi.THREE.NormalBlending;
            break;
          case "additive":
            r = PioneerPublicApi.THREE.AdditiveBlending;
            break;
          case "subtractive":
            r = PioneerPublicApi.THREE.SubtractiveBlending;
            break;
          case "multiply":
            r = PioneerPublicApi.THREE.MultiplyBlending;
            break;
          case "custom":
            r = PioneerPublicApi.THREE.CustomBlending;
        }
      }
      if (e.vertex.extensions) {
        let t = "";
        for (const i of e.vertex.extensions) PioneerPublicApi.Capabilities.hasGLExtension(i) && (t += `#extension GL_${i}: enable\n`);
        for (const i of e.vertex.extensions) PioneerPublicApi.Capabilities.hasGLExtension(i) && (t += `#define L_${i} true\n`);
        e.vertex.code = t + e.vertex.code;
      }
      if (e.fragment.extensions) {
        let t = "";
        for (const i of e.fragment.extensions) PioneerPublicApi.Capabilities.hasGLExtension(i) && (t += `#extension GL_${i}: enable\n`);
        for (const i of e.fragment.extensions) PioneerPublicApi.Capabilities.hasGLExtension(i) && (t += `#define L_${i} true\n`);
        e.fragment.code = t + e.fragment.code;
      }
      const rawShaderMaterial = new PioneerPublicApi.THREE.RawShaderMaterial({
        uniforms: t,
        vertexShader: e.vertex.code,
        fragmentShader: e.fragment.code,
        glslVersion: PioneerPublicApi.THREE.GLSL3,
        depthWrite: n,
        transparent: i,
        side: o,
        blending: r
      });
      rawShaderMaterial.needsUpdate = true;
      return rawShaderMaterial;
    } catch (e) {
      throw e instanceof Error && (e.message = `While processing material "${t}": ${e.message}`), e;
    }
  }
  /** @eyes-analysis
   * 【结构证据】返回 `0` 或 `new PioneerPublicApi.THREE.Vector2(0,0)`；调用 `Number.parseInt`、`e.endsWith`、`e.indexOf`、`e.substring`、`new Error`、`new PioneerPublicApi.THREE.Matrix3`；含显式错误分支。
   * 调用线索：Number.parseInt、e.endsWith、e.indexOf、e.substring、new Error等。
   */
  _getUniformValueFromType(t) {
    const e = t.replace(/.* /u, "");
    switch (e) {
      case "int":
      case "float":
        return 0;
      case "ivec2":
      case "vec2":
        return new PioneerPublicApi.THREE.Vector2(0, 0);
      case "ivec3":
      case "vec3":
        return new PioneerPublicApi.THREE.Vector3(0, 0, 0);
      case "ivec4":
      case "vec4":
        return new PioneerPublicApi.THREE.Vector4(0, 0, 0, 0);
      case "mat3":
        return new PioneerPublicApi.THREE.Matrix3();
      case "mat4":
        return new PioneerPublicApi.THREE.Matrix4();
      case "sampler2D":
      case "samplerCube":
        return null;
    }
    if (e.endsWith("]")) {
      const t = e.indexOf("[");
      const i = e.indexOf("]");
      const s = e.substring(0, t);
      const n = Number.parseInt(e.substring(t + 1, i));
      const o = [];
      for (let t = 0; t < n; t++) o.push(this._getUniformValueFromType(s));
      return o;
    }
    throw new Error(`Unrecognized type: ${e}.`);
  }
  _downloader;
  _cache;
  _clonedMaterials;
  _promises;
}
export { MaterialManager };
