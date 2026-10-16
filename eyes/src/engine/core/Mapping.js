// Recovered from app.js:727902-731289.
import * as Pioneer from "../pioneer/index.js";
class Mapping {
  static getOptions() {
    return mappingOptions;
  }
  static async set(t, e, i, o) {
    const r = [];
    if (!(e in mappingOptions)) throw new Error(`Invalid entity name "${e}".`);
    for (const o of Pioneer.ObjectUtils.keys(mappingOptions[e])) o !== i && r.push(Mapping.setEnabled(t, e, o, false, {}));
    r.push(Mapping.setEnabled(t, e, i, true, o));
    await Promise.allSettled(r);
  }
  static async setEnabled(t, e, i, s, n) {
    if ("basic" === i) await Mapping.setBasic(t, e, s);else {
      if (!i.startsWith("cmts")) throw new Error(`Invalid type ${i}.`);
      await Mapping.setCMTS(t, e, s, n);
    }
  }
  static async setBasic(t, e, i) {
    const n = t.getEntity(e);
    if (null === n) throw new Error(`No entity named '${e}' exists.`);
    const o = n.getComponent(Pioneer.SpheroidLODComponent, "basic");
    if (null === o) throw new Error(`The entity '${e}' does not have a spheroidLOD named 'basic'.`);
    o.setEnabled(i);
    i && (o.setRenderingEnabled(false), await o.getLoadedPromise(), o.setRenderingEnabled(true));
  }
  static async setCMTS(t, e, i, n) {
    const o = t.getEntity(e);
    if (null === o) throw new Error(`No entity named '${e}' exists.`);
    let r = o.getComponent(Pioneer.CMTSComponent, "cmts");
    if (i && !r) {
      if (r = o.addComponent(Pioneer.CMTSComponent, "cmts"), "1_ceres" === e) {
        r.setBaseUrl("color", `$DYNAMIC_ASSETS_URL/cmts/${e}/color`);
        "iPhone" !== Pioneer.Devices.getPlatform() && r.setBaseUrl("normal", `$DYNAMIC_ASSETS_URL/cmts/${e}/normal`);
        r.setBaseUrl("height", `$DYNAMIC_ASSETS_URL/cmts/${e}/height`);
      } else if ("earth" === e) {
        if (r.setBaseUrl("color", `$DYNAMIC_ASSETS_URL/cmts/${e}/color`), "iPhone" !== Pioneer.Devices.getPlatform() && r.setBaseUrl("normal", `$DYNAMIC_ASSETS_URL/cmts/${e}/normal`), r.setBaseUrl("height", `$DYNAMIC_ASSETS_URL/cmts/${e}/height`), r.setBaseUrl("specular", `$DYNAMIC_ASSETS_URL/cmts/${e}/specular`), n && false === n.night || r.setBaseUrl("night", `$DYNAMIC_ASSETS_URL/cmts/${e}/night`), n) if (true === n.clouds) r.setBaseUrl("decal", `$DYNAMIC_ASSETS_URL/cmts/${e}/cloud`);else if (true === n.floatingClouds) {
          const t = o.addComponent(Pioneer.CMTSComponent, "floatingClouds");
          t.setBaseUrl("color", `$DYNAMIC_ASSETS_URL/cmts/${e}/cloud`);
          t.setTransparent(true);
          t.setShadowEntities(["moon"]);
          t.setHeightOffset(15);
          t.setIsGroundComponent(false);
        }
        r.setShadowEntities(["moon"]);
      } else "mars" === e ? (r.setBaseUrl("color", `$DYNAMIC_ASSETS_URL/cmts/${e}/color`), "iPhone" !== Pioneer.Devices.getPlatform() && r.setBaseUrl("normal", `$DYNAMIC_ASSETS_URL/cmts/${e}/normal`), r.setBaseUrl("height", `$DYNAMIC_ASSETS_URL/cmts/${e}/height`), r.setShadowEntities(["phobos", "deimos"])) : "mercury" === e ? (r.setBaseUrl("color", `$DYNAMIC_ASSETS_URL/cmts/${e}/color`), "iPhone" !== Pioneer.Devices.getPlatform() && r.setBaseUrl("normal", `$DYNAMIC_ASSETS_URL/cmts/${e}/normal`), r.setBaseUrl("height", `$DYNAMIC_ASSETS_URL/cmts/${e}/height`)) : "moon" === e && (r.setBaseUrl("color", `$DYNAMIC_ASSETS_URL/cmts/${e}/color`), "iPhone" !== Pioneer.Devices.getPlatform() && r.setBaseUrl("normal", `$DYNAMIC_ASSETS_URL/cmts/${e}/normal`), r.setBaseUrl("height", `$DYNAMIC_ASSETS_URL/cmts/${e}/height`), r.setShadowEntities(["earth"]));
      r.setRenderingEnabled(false);
      await r.getLoadedPromise();
      await r.getTilesLoadedPromise();
      r.setRenderingEnabled(true);
    } else if (!i && r && (o.removeComponent(r), "earth" === e)) {
      const t = o.getComponent(Pioneer.CMTSComponent, "floatingClouds");
      t && o.removeComponent(t);
    }
  }
}
const mappingOptions = {
  "1_ceres": {
    basic: void 0,
    cmts: void 0
  },
  earth: {
    basic: void 0,
    cmts: ["night", "clouds", "floatingClouds"]
  },
  mars: {
    basic: void 0,
    cmts: void 0
  },
  mercury: {
    basic: void 0,
    cmts: void 0
  },
  moon: {
    basic: void 0,
    cmts: void 0
  }
};
export { Mapping };
export { mappingOptions };
