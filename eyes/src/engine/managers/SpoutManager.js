// Recovered from app.js:1303647-1307038.
import * as Pioneer from "../pioneer/index.js";
import "../solar-system/public-api.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
class SpoutManager extends EyesPublicApi.BaseManager {
  constructor(t) {
    super(t);
    this._scene = this.app.pioneer.getScene("main");
    this._defaultTarget = this.getSpoutCameraTargetEntity(this.app.getManager("router").currentRoute.params);
    this._defaultTargetRadius = this._defaultTarget ? this._scene.getEntity(this._defaultTarget)?.getExtentsRadius() : this._scene.getEntity("earth").getExtentsRadius();
  }
  async enableSpout(t = false, e = 2048, i = 2 * this._defaultTargetRadius, n = this._defaultTarget, o = 25, r = 0, a = false) {
    const l = this.app.pioneer.getViewport("spoutViewport") || this.app.pioneer.addViewport("spoutViewport");
    l.getDiv().style.display = "none";
    l.getDiv().style.width = "100%";
    l.getDiv().style.height = "100%";
    const c = this._scene.getEntity(n) || this._scene.getEntity("earth");
    const h = this.setUpSpoutCamera(t, c, a, r);
    const d = h.getComponent(Pioneer.SpoutComponent) ?? h.addComponent(Pioneer.SpoutComponent);
    l.setCamera(d);
    d.setRenderWidth(e);
    this._scene.setAmbientLightColor(new Pioneer.Color(1, 1, 1));
    true === t && (d.setForGlobe(true, i || 2 * c.getExtentsRadius()), d.setNearDistance(.5 * c.getExtentsRadius()), c.getComponent(Pioneer.AtmosphereComponent)?.setExcludedFromCamera(d, true));
    await this.setUpSpoutLabels(o, c);
  }
  setUpSpoutCamera(t, e = this._defaultTarget, i = false, n = 0) {
    let o;
    if (true === t) {
      o = this._scene.getEntity("spoutCamera") || this._scene.addEntity("spoutCamera");
      o.clearControllers();
      o.setParent(e);
      o.setPosition(Pioneer.Vector3.Zero);
      o.setOrientation(Pioneer.Quaternion.Identity);
      const t = o.addController(Pioneer.AlignController);
      t.setPrimaryAlignType("align");
      t.setPrimaryAxis(Pioneer.Vector3.ZAxis);
      t.setPrimaryTargetAxis(Pioneer.Vector3.ZAxis);
      i ? t.setPrimaryTargetEntity(e.getName()) : t.setPrimaryTargetEntity("camera");
      const vector3 = new Pioneer.Vector3();
      Pioneer.Geometry.getXYZFromLLAOnSphere(vector3, new Pioneer.LatLonAlt(0, Pioneer.MathUtils.degToRad(180 + n), 1), 1);
      t.setSecondaryAlignType("align");
      t.setSecondaryAxis(Pioneer.Vector3.XAxis);
      t.setSecondaryTargetEntity("camera");
      t.setSecondaryTargetAxis(vector3);
    } else o = this._scene.getEntity("camera");
    return o;
  }
  async setUpSpoutLabels(t = 25, e = null) {
    let i = e;
    e || (i = (await this.getSpoutCameraTargetEntity(this.app.getManager("router").currentRoute.params)) || "sun");
    for (let e = 0; e < this._scene.getNumEntities(); e++) {
      const i = this._scene.getEntityAt(e);
      const n = i.getComponent(Pioneer.DivComponent);
      if (n instanceof Pioneer.DivComponent) {
        const e = i.getComponent(Pioneer.LabelComponent) ?? i.addComponent(Pioneer.LabelComponent);
        e.setText(n.getDiv().querySelector(".text")?.innerHTML || n.getDiv()?.textContent || "");
        e.setColor(new Pioneer.Color(1, 1, 1, 1));
        e.setFontSize(t);
        e.setAlignment(new Pioneer.Vector2(0, .5));
        e.setPixelOffset(new Pioneer.Vector2(-t / 4, -1));
        e.setExcludedFromCamera(this._scene.getEntity("camera").getComponent(Pioneer.CameraComponent), true);
      }
    }
  }
  async getSpoutCameraTargetEntity(t) {
    let e = null;
    const contentManager = this.app.getManager("content");
    if (t) {
      const s = "feature" in t && "moons" === t.feature ? t.child : t.spaceObject;
      const o = this.pioneer.getScene("main").getEntity(s) ?? this.pioneer.getScene("main").getEntity("earth");
      const r = contentManager.getEntityInfo(s) || {};
      const a = await contentManager.getEntityDesc(s);
      const l = s && this.pioneer.getScene("main").getEntity(s)?.getParent()?.getName();
      switch (r.category) {
        case "Spacecraft":
          e = EyesPublicApi.AppUtils.isFutureMission(a?.dates?.start) ? "earth" : o?.getParent()?.getName();
          r.keywords.includes("lander") && o.getParent().getName().includes("landing_site") && (e = this.pioneer.getScene("main").getEntity(s)?.getParent()?.getParent()?.getName());
          break;
        case "Landing site":
          e = l;
          break;
        default:
          e = s;
      }
    }
    return e;
  }
}
export { SpoutManager };
