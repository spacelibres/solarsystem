/** @eyes-analysis
 * 文件职责：太阳系实体配置工厂：注册声明式实体，创建组件/控制器/父级时间表，按组创建，并在失败时回滚实体。
 * 依据：import ../pioneer/index.js；Entity @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:707355-715578.
import * as Pioneer from "../pioneer/index.js";
/** @eyes-analysis
 * 类职责：太阳系实体配置工厂：注册声明式实体，创建组件/控制器/父级时间表，按组创建，并在失败时回滚实体。
 * 继承：无显式父类；导出：Entity。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Entity {
  /** @eyes-analysis
   * 【结构证据】调用 `Object.entries`、`this._entities.set`。
   * 调用线索：Object.entries、this._entities.set。
   */
  static register(t) {
    for (const [e, i] of Object.entries(t)) this._entities.set(e, i);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this.createFromOptions(t,s,e,i)`；调用 `Entity._entities.get`、`new Error`、`this.createFromOptions`；含显式错误分支。
   * 调用线索：Entity._entities.get、new Error、this.createFromOptions。
   */
  static create(t, e, i) {
    const s = Entity._entities.get(t);
    if (void 0 === s) throw new Error(`Could not find the options for the entity with name ${t}`);
    return this.createFromOptions(t, s, e, i);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `r`；调用 `Array.isArray`、`Object.keys`、`Pioneer.MathUtils.degToRad`、`a.addOrbitalElements`、`a.setAxis`、`a.setBaseUrl`；含显式错误分支。
   * 调用线索：Array.isArray、Object.keys、Pioneer.MathUtils.degToRad、a.addOrbitalElements、a.setAxis等。
   */
  static createFromOptions(t, e, i, n) {
    let o = t;
    n && (void 0 !== n.namePrefix && (o = n.namePrefix + o), void 0 !== n.nameSuffix && (o += n.nameSuffix));
    let r = i.getEntity(o);
    if (null !== r) return r;
    r = i.addEntity(o);
    try {
      void 0 !== e.radius && (r.setOcclusionRadius(e.radius), r.setExtentsRadius(e.radius));
      void 0 !== e.occlusionRadius && r.setOcclusionRadius(e.occlusionRadius);
      void 0 !== e.extentsRadius && r.setExtentsRadius(e.extentsRadius);
      for (const [t, i] of e.parents) r.addParentingTableEntry(t, i);
      if (void 0 !== e.label) {
        const t = r.addComponent(Pioneer.DivComponent).getDiv();
        t.innerHTML = e.label;
        t.className = "pioneer-label-div";
      }
      if (e.trail) {
        const t = r.addComponent(Pioneer.TrailComponent, e.trail.name);
        if (t.setStartTime(e.trail.length), e.trail.color ? t.setColor(new Pioneer.Color(e.trail.color[0], e.trail.color[1], e.trail.color[2], e.trail.color[3])) : t.setColor(new Pioneer.Color(1, 1, 1, .5)), void 0 !== e.trail.relativeTo ? t.setRelativeToEntity(e.trail.relativeTo) : void 0 !== e.trail.relativeToOrientation && t.setRelativeToEntityOrientation(e.trail.relativeToOrientation), void 0 !== e.trail.updatePointPositions && t.setUpdatePointPositions(true), e.trail.lengthCoverages) {
          const t = e.trail.length;
          for (let i = 0, n = e.trail.lengthCoverages.length; i < n; i++) {
            const n = e.trail.lengthCoverages[i];
            const o = r.addController(Pioneer.CoverageController, `trail_length_coverage.${i}`, r.getControllerAt(0) ?? void 0);
            o.setCoverage(new Pioneer.Interval(n[1], n[2]));
            o.setEnterFunction(t => {
              const e = t.getComponent(Pioneer.TrailComponent);
              null !== e && e.setStartTime(n[0]);
            });
            o.setExitFunction(e => {
              const i = e.getComponent(Pioneer.TrailComponent);
              null !== i && i.setStartTime(t);
            });
          }
        }
      }
      if (e.spheroid) {
        const t = r.addComponent(Pioneer.SpheroidComponent, e.spheroid.name);
        t.setEquatorialRadius(e.spheroid.equatorialRadius);
        t.setPolarRadius(e.spheroid.polarRadius);
        t.setPlanetographic(e.spheroid.planetographic);
      }
      if (e.spheroidLOD) {
        const t = r.addComponent(Pioneer.SpheroidLODComponent, e.spheroidLOD.name ?? "basic");
        if (e.spheroidLOD.materialOptions) for (let i = 0, s = e.spheroidLOD.materialOptions.length; i < s; i++) t.setMaterialOption(e.spheroidLOD.materialOptions[i], true);
        if (e.spheroidLOD.textures) {
          t.setMapping("cube");
          for (const i of Object.keys(e.spheroidLOD.textures)) {
            const s = e.spheroidLOD.textures[i];
            t.setTexture(i, `$STATIC_ASSETS_URL/maps/${s.url}`, s.sizes);
          }
        }
        e.spheroidLOD.shadowEntities && t.setShadowEntities(e.spheroidLOD.shadowEntities);
      }
      if (e.cmts) {
        const t = r.addComponent(Pioneer.CMTSComponent, e.cmts.name);
        for (const i of Object.keys(e.cmts.textures)) {
          const s = e.cmts.textures[i];
          t.setBaseUrl(i, s);
        }
        t.setMaxLevel(e.cmts.maxLevel ?? 0);
        e.cmts.shadowEntities && t.setShadowEntities(e.cmts.shadowEntities);
      }
      if (e.model) {
        const t = r.addComponent(Pioneer.ModelComponent, e.model.name);
        if (t.setUrl(e.model.url), e.model.rotate) {
          const quaternion = new Pioneer.Quaternion();
          quaternion.set(1, 0, 0, 0);
          for (let t = 0, n = e.model.rotate.length; t < n; t++) {
            let n;
            let o;
            const r = e.model.rotate[t];
            "x" in r ? (n = new Pioneer.Vector3(1, 0, 0), o = r.x) : "y" in r ? (n = new Pioneer.Vector3(0, 1, 0), o = r.y) : (n = new Pioneer.Vector3(0, 0, 1), o = r.z);
            o = Pioneer.MathUtils.degToRad(o);
            const a = new Pioneer.Quaternion();
            a.setFromAxisAngle(n, o);
            quaternion.mult(a, quaternion);
          }
          t.setRotation(quaternion);
        }
        if (void 0 !== e.model.scale) {
          const i = e.model.scale;
          Array.isArray(i) ? t.setScale(new Pioneer.Vector3(i[0], i[1], i[2])) : t.setScale(i);
        }
        e.model.translate && t.setTranslation(e.model.translate);
        e.model.shadowEntities && t.setShadowEntities(e.model.shadowEntities);
        e.model.environmentMap && ("cubemap" in e.model.environmentMap ? (t.setEnvironmentCubemapUrl(e.model.environmentMap.cubemap), t.setEnvironmentCylindricalUrl("")) : (t.setEnvironmentCylindricalUrl(e.model.environmentMap.cylindrical), t.setEnvironmentCubemapUrl("")));
      }
      if (e.comet) {
        const t = r.addComponent(Pioneer.CometTailComponent, e.comet.name);
        void 0 !== e.comet.timeLength && t.setTimeLength(e.comet.timeLength);
        t.setLightSource("sun");
        const i = r.addComponent(Pioneer.CometTailComponent);
        i.setTimeLength(.5 * t.getTimeLength());
        i.setColor(new Pioneer.Color(.214, .235, .371, .5));
        i.setStarAccelerationMultiplier(10);
        i.setLightSource("sun");
        const n = r.addComponent(Pioneer.CometTailComponent);
        n.setStarAccelerationMultiplier(0);
        n.setColor(new Pioneer.Color(1, 1, 1, 10));
        n.setNumberOfParticles(1);
        n.setLightSource("sun");
      }
      if (e.controllers) for (let t = 0, n = e.controllers.length; t < n; t++) {
        const n = e.controllers[t];
        const o = n.type;
        let a;
        if ("fixed" === o) {
          if (a = r.addController(Pioneer.FixedController, n.name), "position" in n || "orientation" in n) {
            if (n.position && a.setPosition(n.position), n.orientation && a.setOrientation(n.orientation), void 0 !== n.relativeToEntity) {
              const t = r.addController(Pioneer.RotateByEntityOrientationController);
              t.setEntityForOrientation(n.relativeToEntity);
              n.coverage && t.setCoverage(new Pioneer.Interval(n.coverage[0], n.coverage[1]));
            }
          } else if ("llaOnSpheroid" in n) {
            const t = n.llaOnSpheroidEntity ?? e.parents[0]?.[1];
            if (void 0 === t) throw new Error("There is no valid entity for llaOnSpheroid.");
            const o = i.getEntity(t);
            if (null === o) throw new Error("The parent for llaOnSpheroid does not exist.");
            const l = o.getComponent(Pioneer.SpheroidComponent);
            if (null === l) throw new Error("Missing spheroid component.");
            n.coverage && a.setCoverage(new Pioneer.Interval(n.coverage[0], n.coverage[1]));
            const vector3 = new Pioneer.Vector3();
            l.xyzFromLLA(vector3, n.llaOnSpheroid);
            a.setPosition(vector3);
            const quaternion = new Pioneer.Quaternion();
            l.orientationFromLLA(quaternion, n.llaOnSpheroid);
            a.setOrientation(quaternion);
            const d = r.addController(Pioneer.RotateByEntityOrientationController);
            if (n.coverage && d.setCoverage(new Pioneer.Interval(n.coverage[0], n.coverage[1])), n.clampToGround) {
              const e = r.addController(Pioneer.GroundClampController);
              e.setGroundEntityRef(t);
              n.coverage && e.setCoverage(new Pioneer.Interval(n.coverage[0], n.coverage[1]));
            }
          }
        } else if ("dynamo" === o) {
          a = r.addController(Pioneer.DynamoController, n.name);
          true !== n.customUrl ? a.setBaseUrl(`$DYNAMIC_ASSETS_URL/dynamo/${n.url}`) : a.setBaseUrl(n.url);
          void 0 !== n.parentIsBarycenter && a.setHeaderValue("body", 1);
        } else if ("align" === o) {
          a = r.addController(Pioneer.AlignController, n.name);
          void 0 !== n.joint && a.setJoint(n.joint);
          a.setPrimaryAlignType(n.primary.type);
          a.setPrimaryTargetEntity(n.primary.target ?? "");
          a.setPrimaryAxis(n.primary.axis);
          n.primary.targetAxis && a.setPrimaryTargetAxis(n.primary.targetAxis);
          n.secondary && (a.setSecondaryAlignType(n.secondary.type), a.setSecondaryTargetEntity(n.secondary.target ?? ""), a.setSecondaryAxis(n.secondary.axis), n.secondary.targetAxis && a.setSecondaryTargetAxis(n.secondary.targetAxis));
        } else if ("spin" === o) {
          a = r.addController(Pioneer.SpinController, n.name);
          a.setAxis(n.axis, n.axisInFrameSpace ?? true);
          a.setRate(Pioneer.MathUtils.TwoPi / (3600 * n.periodInHours));
          void 0 !== n.relativeToTime && a.setReferenceTime(n.relativeToTime);
        } else if ("rotateByEntityOrientation" === o) {
          a = r.addController(Pioneer.RotateByEntityOrientationController, n.name);
          void 0 !== n.entityForOrientation && a.setEntityForOrientation(n.entityForOrientation);
          void 0 !== n.rotatingOrientation && a.setRotatingOrientation(n.rotatingOrientation);
          void 0 !== n.rotatingPosition && a.setRotatingPosition(n.rotatingPosition);
        } else if ("orbitalElements" === o) {
          a = r.addController(Pioneer.OrbitalElementsController, n.name);
          const orbitalElements = new Pioneer.OrbitalElements(n);
          a.addOrbitalElements(n.epoch, orbitalElements);
        } else "coverage" === o ? (a = r.addController(Pioneer.CoverageController, n.name), a.setEnterFunction(n.enter), a.setExitFunction(n.exit), a.setUpdateFunction(n.update), void 0 !== n.updateInterval && a.setUpdateInterval(n.updateInterval)) : a = n.func(r);
        n.coverage && a.setCoverage(new Pioneer.Interval(n.coverage[0], n.coverage[1]));
      }
      e.postCreateFunction && e.postCreateFunction(r, n);
    } catch (t) {
      throw i.removeEntity(r), t instanceof Error && (t.message = `While creating "${o}": ${t.message}`), t;
    }
    return r;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `Entity._entities.get(t)`；调用 `Entity._entities.get`。
   * 调用线索：Entity._entities.get。
   */
  static getEntityOptions(t) {
    return Entity._entities.get(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `set`；调用 `Entity._entities.keys`、`n.includes`、`new Set`、`set.add`、`t.split`、`t.split(",").map`。
   * 调用线索：Entity._entities.keys、n.includes、new Set、set.add、t.split等。
   */
  static getEntityNamesInGroup(t) {
    const set = new Set();
    if ("" !== t) {
      const i = t.split(",").map(t => t.trim());
      for (const [t, s] of Entity._entities) {
        const n = s.groups;
        if (!n) continue;
        let o = true;
        for (const t of i) n.includes(t) || (o = false);
        o && set.add(t);
      }
    } else for (const t of Entity._entities.keys()) set.add(t);
    return set;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `set`；调用 `new Set`、`set.add`、`this._entities.values`。
   * 调用线索：new Set、set.add、this._entities.values。
   */
  static getGroups() {
    const set = new Set();
    for (const e of this._entities.values()) {
      const i = e.groups;
      if (void 0 !== i) for (let e = 0; e < i.length; e++) set.add(i[e]);
    }
    return set;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.create`、`this.getEntityNamesInGroup`。
   * 调用线索：this.create、this.getEntityNamesInGroup。
   */
  static createGroup(t, e, i) {
    const s = this.getEntityNamesInGroup(t);
    for (const t of s) this.create(t, e, i);
  }
  static _entities = new Map();
}
export { Entity };
