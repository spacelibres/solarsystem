// Recovered from app.js:1551222-1557945.
import * as Eyes from "../../framework/eyes/index.js";
import * as Pioneer from "../../engine/pioneer/index.js";
import "../../styles/extracted/ComparisonStyles.js";
import ComparisonTemplate from "../templates/ComparisonTemplate.html";
var getComparisonTemplate = () => ComparisonTemplate;
class Comparison extends Eyes.BaseComponent {
  constructor(t, e) {
    super(t, e);
    this.list = [];
    this.name = null;
    this.compare = null;
    this.unitConverter = null;
    this._class.fontSize.xSmall = "x-small";
    this._class.fontSize.small = "small";
    this._class.fontSize.default = "";
    Object.assign(this._state, {
      unitSystem: "imperial",
      leftValueClass: "",
      rightValueClass: "",
      leftTitle: "",
      leftCategory: "",
      leftType: "",
      leftRadius: "",
      leftIdentifier: "",
      rightTitle: "",
      rightCategory: "",
      rightType: "",
      rightRadius: "",
      rightUnit: "",
      rightIdentifier: "",
      photoMode: "",
      unit: "",
      fontSizeClass: this._class.fontSize.default,
      altFontSizeClass: this._class.fontSize.small,
      leftGenericDisclaimerClass: "",
      rightGenericDisclaimerClass: ""
    });
    this.bindFunctions(["closeView", "nextCompare", "previousCompare", "unitchange", "clearLeftPanelText", "clearRightPanelText"]);
  }
  init() {
    super.init();
    const t = this._children.exit;
    t && (t.addEventListener("click", this.closeView, {
      passive: false
    }), t.addEventListener("mouseenter", () => {
      this._children.exitIcon.classList.add("hover");
    }, {
      passive: false
    }), t.addEventListener("mouseleave", () => {
      this._children.exitIcon.classList.remove("hover");
    }, {
      passive: false
    }));
    this._children.next && this._children.next.addEventListener("click", this.nextCompare, {
      passive: false
    });
    this._children.previous && this._children.previous.addEventListener("click", this.previousCompare, {
      passive: false
    });
  }
  _updateFontSize() {
    let t = this._class.fontSize.default;
    let e = this._class.fontSize.small;
    Eyes.AppUtils.isMobileMode() ? (t = this._class.fontSize.xSmall, e = this._class.fontSize.xSmall) : (Eyes.AppUtils.is2K() || Eyes.AppUtils.is4K()) && (t = this._class.fontSize.default, e = this._class.fontSize.small);
    this.setState({
      fontSizeClass: t,
      altFontSizeClass: e
    });
  }
  unitchange(t) {
    this.setState({
      unitSystem: t ? "metric" : "imperial"
    });
    this.generateValues();
  }
  nextCompare() {
    const t = this.list.indexOf(this.compare) || 0;
    this.compare = this.list[(t + 1) % this.list.length];
    this.clearRightPanelText(this.compare);
    this._app.getManager("router").navigate(`${this.name}/compare?id=${this.compare}`);
  }
  previousCompare() {
    const t = this.list.indexOf(this.compare) || 0;
    this.compare = this.list[t - 1 < 0 ? this.list.length - 1 : t - 1];
    this.clearRightPanelText(this.compare);
    this._app.getManager("router").navigate(`${this.name}/compare?id=${this.compare}`);
  }
  clearRightPanelText(t) {
    const e = this._app.getManager("content").getEntityInfo(t);
    const i = e?.displayName || e?.iauName;
    const s = e?.subcategory || e?.category;
    this.setState({
      rightTitle: i ?? "",
      rightType: s ?? "",
      rightRadius: "",
      rightUnit: "",
      rightIdentifier: "loading...",
      rightGenericDisclaimerClass: "hidden"
    });
  }
  clearLeftPanelText(t) {
    const e = this._app.getManager("content").getEntityInfo(t);
    const i = e?.displayName || e?.iauName;
    const s = e?.subcategory || e?.category;
    this.setState({
      leftTitle: i ?? "",
      leftType: s ?? "",
      leftRadius: "",
      leftUnit: "",
      leftIdentifier: "loading...",
      leftGenericDisclaimerClass: "hidden"
    });
  }
  async setup(t = {}) {
    if (t.cancelToken.isCanceled) return;
    this.list = t.list || this.list;
    this.name = t.name || this.name;
    this.compare = t.compare || this.compare;
    this.unitConverter = t.unitConverter || this.unitConverter;
    const e = Object.keys(this.list);
    for (let t = 0; t < e.length; t++) this.list[e[t]] === this.name && (this.list = this.list.slice(0, t).concat(this.list.slice(t + 1)));
    this.generateValues();
  }
  formatValue(t, e = 1) {
    if (t < 1) {
      let i = t.toFixed(2 * e);
      if (0 === Number.parseFloat(i)) for (let s = e; s < e + 5 && (i = t.toFixed(s), 0 === Number.parseFloat(i)); s += 1);
      return i;
    }
    if (t < 1e3) return t.toFixed(e);
    let i = Math.round(t);
    const s = Math.pow(10, i.toString().length - 5);
    i = Math.round(i / s) * s;
    return i.toFixed(e);
  }
  async generateValues() {
    this.leftDescription = (await this._app.getManager("content").getEntityDesc(this.name)) || {};
    const t = this._app.getManager("content").getEntityInfo(this.name);
    const e = this.leftDescription.data || this.leftDescription || {};
    e.type = t ? t.subcategory || t.category : "";
    this.rightDescription = (await this._app.getManager("content").getEntityDesc(this.compare)) || {};
    const i = this._app.getManager("content").getEntityInfo(this.compare);
    const s = this.rightDescription.data || this.rightDescription || {};
    s.type = i ? i.subcategory || i.category : "";
    const {
      unitSystem: unitSystem
    } = this._state;
    const r = this.leftDescription.title || t.displayName || t.iauName || this.name;
    const a = this.rightDescription.title || i.displayName || i.iauName || this.compare;
    const l = this._app.getManager("comparison").entityLeft;
    const c = l.getComponent(Pioneer.ModelComponent)?.getUrl().includes("generic");
    const h = this._app.getManager("comparison").entityRight;
    const d = h.getComponent(Pioneer.ModelComponent)?.getUrl().includes("generic");
    const u = {
      leftValueClass: "color " + this._app.getManager("content").getColorClass(this.name),
      rightValueClass: "color " + this._app.getManager("content").getColorClass(this.compare),
      leftTitle: r,
      rightTitle: a,
      leftCategory: t.category,
      leftType: e.type,
      leftRadius: "",
      leftIdentifier: "Radius",
      leftGenericDisclaimerClass: c ? "" : "hidden",
      rightCategory: i.category,
      rightType: s.type,
      rightRadius: "",
      rightUnit: r,
      rightIdentifier: "Radius",
      rightGenericDisclaimerClass: d ? "" : "hidden",
      unit: this.unitConverter[unitSystem].radius.unit
    };
    if (this.unitConverter[unitSystem].radius) {
      let n = e.radius;
      if (!n) {
        const t = this.entityCompareLookup(this.name, "left");
        n = t ? t.radius : null;
      }
      let r = s.radius;
      if (!r) {
        const t = this.entityCompareLookup(this.compare, "right");
        r = t ? t.radius : null;
      }
      if (!n || !r) return;
      const a = r / n;
      const l = ["Spacecraft", "Human", "Building", "Vehicle"];
      t && l.indexOf(t.category) >= 0 && (n *= 2, u.leftIdentifier = "Length");
      let c = this.unitConverter[unitSystem].radius.multiplier || 1;
      let h = n * c;
      if (h < 1 && (c = this.unitConverter[unitSystem].radius.small.multiplier, h = n * c, u.unit = this.unitConverter[unitSystem].radius.small.unit), n = h, u.leftRadius = this.formatValue(n), i && l.indexOf(i.category) >= 0) {
        r *= 2;
        u.rightIdentifier = "Length";
        let t = this.unitConverter[unitSystem].radius.multiplier || 1;
        let e = r * t;
        u.rightUnit = this.unitConverter[unitSystem].radius.unit;
        e < 1 && (t = this.unitConverter[unitSystem].radius.small.multiplier, e = r * t, u.rightUnit = this.unitConverter[unitSystem].radius.small.unit);
        r = e;
        u.rightRadius = this.formatValue(r);
      } else {
        u.rightRadius = this.formatValue(a);
        u.leftTitle && (u.rightUnit = "× " + u.leftTitle.toUpperCase());
      }
    }
    this.setState(u);
  }
  entityCompareLookup(t, e) {
    const i = this._app.getManager("content").getEntityInfo(t) || {};
    const s = "left" === e ? this._app.getManager("comparison").entityLeft : this._app.getManager("comparison").entityRight;
    if (!s) return null;
    let n = i.category || "NA";
    let o = (i.subcategory || i.category || "").toLowerCase().replace(/ /g, "-");
    void 0 !== i.subcategory && (n = i.subcategory, "Spacecraft" === i.category && (n += " " + i.category, o += " " + i.subcategory.toLowerCase().replace(/ /g, "-")));
    return {
      icon: o,
      category: n,
      type: i.category || "NA",
      className: this._app.getManager("content").getClassName(t),
      name: i.displayName || i.iauName || i.name || s.getName(),
      radius: "Spacecraft" === i.category ? s.getExtentsRadius() : s.getOcclusionRadius()
    };
  }
  closeView() {
    this._app.getManager("comparison").exit();
    this._app.getManager("router").navigate(`/${this.name}`);
  }
}
Comparison.html = getComparisonTemplate();
export { Comparison };
