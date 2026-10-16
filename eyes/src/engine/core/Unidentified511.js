/** @eyes-analysis
 * 文件职责：应用可配置设置项表，包含详情面板、NASA 标志、搜索、分享等开关。
 * 依据：顶层副作用 defaultExport=[{groupName:"User Interface",isAdvanced:false,items:[{name:"Show Detail Panel",description:"Displays the detail panel for an entity on the left side of the screen",query:"detailPanel",type:"checkbox",inputD；实际标题：Flood；Natural；Shadow
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:644547-647278.
let defaultExport;
defaultExport = [{
  groupName: "User Interface",
  isAdvanced: false,
  items: [{
    name: "Show Detail Panel",
    description: "Displays the detail panel for an entity on the left side of the screen",
    query: "detailPanel",
    type: "checkbox",
    inputDefault: true,
    appQueryDefault: true
  }, {
    name: "Show NASA logo",
    description: "Displays the NASA logo in the top left corner",
    query: "logo",
    type: "checkbox",
    inputDefault: true,
    appQueryDefault: true
  }, {
    name: "Show Search",
    description: "Determines whether the search bar is visible",
    query: "search",
    type: "checkbox",
    inputDefault: true,
    appQueryDefault: true
  }, {
    name: "Show Share Button",
    description: "Determines whether the share button is visible",
    query: "shareButton",
    type: "checkbox",
    inputDefault: true,
    appQueryDefault: true
  }, {
    name: "Show Main Menu",
    description: "Determines whether the main menu is visible in the top right",
    query: "menu",
    type: "checkbox",
    inputDefault: true,
    appQueryDefault: true
  }, {
    name: "Show Expanded Settings Bar",
    description: "Determines whether the settings bar is expanded upon first load",
    query: "collapseSettingsOptions",
    type: "checkbox",
    inputDefault: true,
    appQueryDefault: false,
    invert: true
  }, {
    name: "Show Fullscreen Button",
    description: "Include the fullscreen button in the settings bar",
    query: "hideFullScreenToggle",
    type: "checkbox",
    inputDefault: true,
    appQueryDefault: false,
    invert: true
  }, {
    name: "Collapse Time Controls",
    description: "Determines whether the time controls are collapsed by default",
    query: "collapseTimeControls",
    type: "checkbox",
    inputDefault: false,
    appQueryDefault: false,
    relatedCheckboxesToDisable: ["timeControls"]
  }, {
    name: "Disable Time Controls",
    description: "Determines whether the time controls are disabled",
    query: "timeControls",
    type: "checkbox",
    inputDefault: false,
    appQueryDefault: true,
    invert: true,
    relatedCheckboxesToDisable: ["collapseTimeControls"]
  }]
}, {
  groupName: "Navigation",
  isAdvanced: false,
  items: [{
    name: "Allow Navigation",
    description: "Allows the user to navigate to other entities",
    query: "locked",
    type: "checkbox",
    inputDefault: true,
    appQueryDefault: false,
    invert: true
  }, {
    name: "Allow External Links",
    description: "Allows all external links to navigate away from the app to outside resources",
    query: "hideExternalLinks",
    type: "checkbox",
    inputDefault: true,
    appQueryDefault: false,
    invert: true
  }]
}, {
  groupName: "3D",
  isAdvanced: false,
  items: [{
    name: "Lighting",
    query: "lighting",
    type: "radio",
    values: [{
      title: "Flood",
      value: "flood",
      description: "Flood lighting allows for even lighting across all 3D entities"
    }, {
      title: "Natural",
      value: "natural",
      description: "Natural lighting allows for realistic lighting based on the sun's position"
    }, {
      title: "Shadow",
      value: "shadow",
      description: "Shadow lighting allows for somewhat realistic lighting based on the sun's position, but highlights the shadows so they are not completely dark"
    }],
    inputDefault: "shadow",
    appQueryDefault: "shadow"
  }]
}];
export { defaultExport as default };
