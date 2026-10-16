// Recovered from app.js:1551222-1557945.
import * as Eyes from "../../framework/eyes/index.js";
import * as Pioneer from "../../engine/pioneer/index.js";
import "../../styles/extracted/ComparisonStyles.js";
import ComparisonTemplate from "../templates/ComparisonTemplate.html";
var getComparisonTemplate = () => ComparisonTemplate;
/* 两侧对象说明异步读取后转换成单份模板状态；航天器等按长度显示，天体右侧按半径比显示。小单位切换发生在数值格式化前，保持 NASA 原比较规则。 */
class Comparison extends Eyes.BaseComponent {
  constructor(app, element) {
    super(app, element);
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
    const exitButton = this._children.exit;
    exitButton && (exitButton.addEventListener("click", this.closeView, {
      passive: false
    }), exitButton.addEventListener("mouseenter", () => {
      this._children.exitIcon.classList.add("hover");
    }, {
      passive: false
    }), exitButton.addEventListener("mouseleave", () => {
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
    let primaryFontClass = this._class.fontSize.default;
    let secondaryFontClass = this._class.fontSize.small;
    Eyes.AppUtils.isMobileMode() ? (primaryFontClass = this._class.fontSize.xSmall, secondaryFontClass = this._class.fontSize.xSmall) : (Eyes.AppUtils.is2K() || Eyes.AppUtils.is4K()) && (primaryFontClass = this._class.fontSize.default, secondaryFontClass = this._class.fontSize.small);
    this.setState({
      fontSizeClass: primaryFontClass,
      altFontSizeClass: secondaryFontClass
    });
  }
  unitchange(isMetric) {
    this.setState({
      unitSystem: isMetric ? "metric" : "imperial"
    });
    this.generateValues();
  }
  nextCompare() {
    const compareIndex = this.list.indexOf(this.compare) || 0;
    this.compare = this.list[(compareIndex + 1) % this.list.length];
    this.clearRightPanelText(this.compare);
    this._app.getManager("router").navigate(`${this.name}/compare?id=${this.compare}`);
  }
  previousCompare() {
    const compareIndex = this.list.indexOf(this.compare) || 0;
    this.compare = this.list[compareIndex - 1 < 0 ? this.list.length - 1 : compareIndex - 1];
    this.clearRightPanelText(this.compare);
    this._app.getManager("router").navigate(`${this.name}/compare?id=${this.compare}`);
  }
  clearRightPanelText(entityId) {
    const entityInfo = this._app.getManager("content").getEntityInfo(entityId);
    const entityTitle = entityInfo?.displayName || entityInfo?.iauName;
    const entityType = entityInfo?.subcategory || entityInfo?.category;
    this.setState({
      rightTitle: entityTitle ?? "",
      rightType: entityType ?? "",
      rightRadius: "",
      rightUnit: "",
      rightIdentifier: "loading...",
      rightGenericDisclaimerClass: "hidden"
    });
  }
  clearLeftPanelText(entityId) {
    const entityInfo = this._app.getManager("content").getEntityInfo(entityId);
    const entityTitle = entityInfo?.displayName || entityInfo?.iauName;
    const entityType = entityInfo?.subcategory || entityInfo?.category;
    this.setState({
      leftTitle: entityTitle ?? "",
      leftType: entityType ?? "",
      leftRadius: "",
      leftUnit: "",
      leftIdentifier: "loading...",
      leftGenericDisclaimerClass: "hidden"
    });
  }
  async setup(comparisonOptions = {}) {
    if (comparisonOptions.cancelToken.isCanceled) return;
    this.list = comparisonOptions.list || this.list;
    this.name = comparisonOptions.name || this.name;
    this.compare = comparisonOptions.compare || this.compare;
    this.unitConverter = comparisonOptions.unitConverter || this.unitConverter;
    const candidateKeys = Object.keys(this.list);
    for (let candidateIndex = 0; candidateIndex < candidateKeys.length; candidateIndex++) this.list[candidateKeys[candidateIndex]] === this.name && (this.list = this.list.slice(0, candidateIndex).concat(this.list.slice(candidateIndex + 1)));
    this.generateValues();
  }
  formatValue(numericValue, fractionDigits = 1) {
    if (numericValue < 1) {
      let formattedValue = numericValue.toFixed(2 * fractionDigits);
      if (0 === Number.parseFloat(formattedValue)) for (let precision = fractionDigits; precision < fractionDigits + 5 && (formattedValue = numericValue.toFixed(precision), 0 === Number.parseFloat(formattedValue)); precision += 1);
      return formattedValue;
    }
    if (numericValue < 1e3) return numericValue.toFixed(fractionDigits);
    let roundedValue = Math.round(numericValue);
    const roundingScale = Math.pow(10, roundedValue.toString().length - 5);
    roundedValue = Math.round(roundedValue / roundingScale) * roundingScale;
    return roundedValue.toFixed(fractionDigits);
  }
  async generateValues() {
    this.leftDescription = (await this._app.getManager("content").getEntityDesc(this.name)) || {};
    const leftInfo = this._app.getManager("content").getEntityInfo(this.name);
    const leftData = this.leftDescription.data || this.leftDescription || {};
    leftData.type = leftInfo ? leftInfo.subcategory || leftInfo.category : "";
    this.rightDescription = (await this._app.getManager("content").getEntityDesc(this.compare)) || {};
    const rightInfo = this._app.getManager("content").getEntityInfo(this.compare);
    const rightData = this.rightDescription.data || this.rightDescription || {};
    rightData.type = rightInfo ? rightInfo.subcategory || rightInfo.category : "";
    const {
      unitSystem: unitSystem
    } = this._state;
    const leftTitle = this.leftDescription.title || leftInfo.displayName || leftInfo.iauName || this.name;
    const rightTitle = this.rightDescription.title || rightInfo.displayName || rightInfo.iauName || this.compare;
    const leftEntity = this._app.getManager("comparison").entityLeft;
    const isLeftGeneric = leftEntity.getComponent(Pioneer.ModelComponent)?.getUrl().includes("generic");
    const rightEntity = this._app.getManager("comparison").entityRight;
    const isRightGeneric = rightEntity.getComponent(Pioneer.ModelComponent)?.getUrl().includes("generic");
    const comparisonState = {
      leftValueClass: "color " + this._app.getManager("content").getColorClass(this.name),
      rightValueClass: "color " + this._app.getManager("content").getColorClass(this.compare),
      leftTitle: leftTitle,
      rightTitle: rightTitle,
      leftCategory: leftInfo.category,
      leftType: leftData.type,
      leftRadius: "",
      leftIdentifier: "Radius",
      leftGenericDisclaimerClass: isLeftGeneric ? "" : "hidden",
      rightCategory: rightInfo.category,
      rightType: rightData.type,
      rightRadius: "",
      rightUnit: leftTitle,
      rightIdentifier: "Radius",
      rightGenericDisclaimerClass: isRightGeneric ? "" : "hidden",
      unit: this.unitConverter[unitSystem].radius.unit
    };
    if (this.unitConverter[unitSystem].radius) {
      let leftRadius = leftData.radius;
      if (!leftRadius) {
        const leftFallbackInfo = this.entityCompareLookup(this.name, "left");
        leftRadius = leftFallbackInfo ? leftFallbackInfo.radius : null;
      }
      let rightRadius = rightData.radius;
      if (!rightRadius) {
        const rightFallbackInfo = this.entityCompareLookup(this.compare, "right");
        rightRadius = rightFallbackInfo ? rightFallbackInfo.radius : null;
      }
      if (!leftRadius || !rightRadius) return;
      const radiusRatio = rightRadius / leftRadius;
      const lengthCategories = ["Spacecraft", "Human", "Building", "Vehicle"];
      leftInfo && lengthCategories.indexOf(leftInfo.category) >= 0 && (leftRadius *= 2, comparisonState.leftIdentifier = "Length");
      let leftUnitMultiplier = this.unitConverter[unitSystem].radius.multiplier || 1;
      let convertedLeftRadius = leftRadius * leftUnitMultiplier;
      if (convertedLeftRadius < 1 && (leftUnitMultiplier = this.unitConverter[unitSystem].radius.small.multiplier, convertedLeftRadius = leftRadius * leftUnitMultiplier, comparisonState.unit = this.unitConverter[unitSystem].radius.small.unit), leftRadius = convertedLeftRadius, comparisonState.leftRadius = this.formatValue(leftRadius), rightInfo && lengthCategories.indexOf(rightInfo.category) >= 0) {
        rightRadius *= 2;
        comparisonState.rightIdentifier = "Length";
        let rightUnitMultiplier = this.unitConverter[unitSystem].radius.multiplier || 1;
        let convertedRightRadius = rightRadius * rightUnitMultiplier;
        comparisonState.rightUnit = this.unitConverter[unitSystem].radius.unit;
        convertedRightRadius < 1 && (rightUnitMultiplier = this.unitConverter[unitSystem].radius.small.multiplier, convertedRightRadius = rightRadius * rightUnitMultiplier, comparisonState.rightUnit = this.unitConverter[unitSystem].radius.small.unit);
        rightRadius = convertedRightRadius;
        comparisonState.rightRadius = this.formatValue(rightRadius);
      } else {
        comparisonState.rightRadius = this.formatValue(radiusRatio);
        comparisonState.leftTitle && (comparisonState.rightUnit = "× " + comparisonState.leftTitle.toUpperCase());
      }
    }
    this.setState(comparisonState);
  }
  entityCompareLookup(entityId, side) {
    const entityInfo = this._app.getManager("content").getEntityInfo(entityId) || {};
    const sceneEntity = "left" === side ? this._app.getManager("comparison").entityLeft : this._app.getManager("comparison").entityRight;
    if (!sceneEntity) return null;
    let categoryLabel = entityInfo.category || "NA";
    let iconClass = (entityInfo.subcategory || entityInfo.category || "").toLowerCase().replace(/ /g, "-");
    void 0 !== entityInfo.subcategory && (categoryLabel = entityInfo.subcategory, "Spacecraft" === entityInfo.category && (categoryLabel += " " + entityInfo.category, iconClass += " " + entityInfo.subcategory.toLowerCase().replace(/ /g, "-")));
    return {
      icon: iconClass,
      category: categoryLabel,
      type: entityInfo.category || "NA",
      className: this._app.getManager("content").getClassName(entityId),
      name: entityInfo.displayName || entityInfo.iauName || entityInfo.name || sceneEntity.getName(),
      radius: "Spacecraft" === entityInfo.category ? sceneEntity.getExtentsRadius() : sceneEntity.getOcclusionRadius()
    };
  }
  closeView() {
    this._app.getManager("comparison").exit();
    this._app.getManager("router").navigate(`/${this.name}`);
  }
}
Comparison.html = getComparisonTemplate();
export { Comparison };
