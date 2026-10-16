// Recovered from app.js:1698304-1705345.
/** 日环食故事：进入时暂存可见图层；相机阶段替换地球材质/光照，离开时按原引用恢复。 */
import * as Pioneer from "../pioneer/index.js";
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
let annularSolarEclipseStory;
// 模块状态由故事钩子共享；对应的备份仅在 camera 准备完成后有效。
const savedLayerState = {
  layers: []
};
let originalDecalTextureUrl;
let originalDecalTextureSizes;
let originalColorTextureUrl;
let originalColorTextureSizes;
let originalNightTextureUrl;
let originalNightTextureSizes;
let originalSpecularTextureUrl;
let originalSpecularTextureSizes;
let originalAtmosphereDensity;
let originalAmbientColor;
let earthEntity;
let moonEntity;
let earthTextureLOD;
let earthSpheroid;
let isBehindMoonView = false;
let isContourMapEnabled = true;
const contourLabelElements = [];
/** 阴影锥挂在月球上，几何投射由太阳指向地球；本影/半影使用不同的色彩和类型。 */
function ensureShadowCones() {
  let umbraCone = moonEntity.getComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConeUmbra");
  let penumbraCone = moonEntity.getComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConePenumbra");
  umbraCone && penumbraCone || (umbraCone = moonEntity.addComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConeUmbra"), penumbraCone = moonEntity.addComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConePenumbra"));
  umbraCone.setSourceEntity("sun");
  umbraCone.setTargetEntity("earth");
  umbraCone.setColor(new Pioneer.Color(.437, .18, .593, .25));
  penumbraCone.setSourceEntity("sun");
  penumbraCone.setTargetEntity("earth");
  penumbraCone.setShadowType("penumbra");
  penumbraCone.setColor(new Pioneer.Color(.218, .093, .3, .3));
}
function hideContourLabels() {
  for (const labelElement of contourLabelElements) labelElement.style.display = "none";
}
/** 背月视角与用户开关共同决定标注可见性；此函数仅处理用户开关，调用者处理视角。 */
function showContourLabels() {
  if (isContourMapEnabled) for (const labelElement of contourLabelElements) labelElement.style.display = "block";
}
annularSolarEclipseStory = {
  type: "nonsequential",
  entities: ["moon"],
  onEnter: async app => {
    const layerManager = app.getManager("layer");
    const layerPanelComponent = app.getComponent("layerPanel");
    app.getManager("time").resetLimits();
    ["asteroids", "comets", "dwarfPlanets", "minorMoons", "spacecraft", "planets", "majorMoons"].forEach(layerId => {
      layerManager.getLayer(layerId).visible && (savedLayerState.layers.push(layerId), layerPanelComponent.toggleLayer(layerId));
    });
    app.pioneer.getScene("main").getEntity("earth").isEnabled(true);
  },
  // 只恢复本故事进入时实际关闭的图层，不强制打开原本隐藏的图层。
  onLeave: app => {
    const {
      layers: layers
    } = savedLayerState;
    const layerPanelComponent = app.getComponent("layerPanel");
    app.getManager("time").resetLimits();
    for (let layerIndex = 0; layerIndex < layers.length; layerIndex++) layerPanelComponent.toggleLayer(layers[layerIndex]);
    savedLayerState.layers = [];
  },
  slides: [{
    id: "slide_1",
    type: "panel",
    content: [{
      type: "description",
      title: "Annular Solar Eclipse",
      description: "On October 14, 2023, an annular solar eclipse crossed North, Central, and South America creating a path of annularity.",
      more: 'An annular solar eclipse occurs when the Moon passes between the Sun and Earth while at its farthest point from Earth. Because the Moon is farther away from Earth, it does not completely block the Sun. This creates a "ring of fire" effect in the sky for those standing in the path of annularity. During an annular eclipse, it is never safe to look directly at the Sun without specialized eye protection designed for solar viewing.'
    }, {
      type: "buttons",
      blockTitle: "Select your view",
      buttonContent: [{
        id: "earth",
        label: "Earth",
        iconSrc: "https://eyes.nasa.gov/apps/solar-system/assets/images/cards/eclipse_view_earth_icon.png",
        onClick: () => {
          showContourLabels();
          isBehindMoonView = false;
          app.cameraScripts.alignObjects("earth", "sun", {
            distance: 28e3,
            horizontalOffset: 150
          });
        }
      }, {
        id: "behind-moon",
        label: "Behind Moon",
        iconSrc: "https://eyes.nasa.gov/apps/solar-system/assets/images/cards/eclipse_view_behind_moon_icon.png",
        onClick: async () => {
          hideContourLabels();
          isBehindMoonView = true;
          app.cameraScripts.alignObjects("moon", "earth", {
            distance: 1e4,
            horizontalOffset: -15,
            verticalOffset: 10
          });
        }
      }, {
        id: "earth-moon",
        label: "Earth-Moon",
        iconSrc: "https://eyes.nasa.gov/apps/solar-system/assets/images/cards/eclipse_view_earth_moon_icon.png",
        onClick: () => {
          showContourLabels();
          isBehindMoonView = false;
          app.cameraScripts.alignObjects("earth", "moon", {
            distance: 12e5,
            horizontalOffset: -90,
            verticalOffset: 10
          });
        }
      }, {
        id: "sun-earth-moon",
        label: "Sun-Earth-Moon",
        iconSrc: "https://eyes.nasa.gov/apps/solar-system/assets/images/cards/eclipse_view_sun_earth_moon_icon.png",
        onClick: () => {
          showContourLabels();
          isBehindMoonView = false;
          app.cameraScripts.alignObjects("earth", "sun", {
            distance: 1e6,
            horizontalOffset: -5,
            verticalOffset: 10
          });
        }
      }],
      clickable: true
    }, {
      type: "checkboxes",
      checkboxBlockTitle: "More Options",
      checkboxContent: [{
        label: "Enable Shadow Cones",
        onChange: changeEvent => {
          changeEvent.target.checked ? ensureShadowCones() : (moonEntity.removeComponent(moonEntity.getComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConeUmbra")), moonEntity.removeComponent(moonEntity.getComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConePenumbra")));
        }
      }, {
        label: "Enable Contour Map",
        onChange: changeEvent => {
          changeEvent.target.checked ? (isContourMapEnabled = true, earthTextureLOD.setTexture("decal", "https://eyes.nasa.gov/apps/solar-system/assets/images/stories/annular_solar_eclipse/eclipse_$SIZE_$FACE.png", [1024]), isBehindMoonView || showContourLabels()) : (isContourMapEnabled = false, earthTextureLOD.setTexture("decal", "", [1024]), hideContourLabels());
        }
      }]
    }],
    time: "2023-10-14T14:50:00Z",
    timeLimits: {
      min: "2023-10-14T14:50:00Z",
      max: "2023-10-14T23:00:00Z"
    },
    // 纹理 URL 与尺寸列表成对恢复；大气、环境光及临时标注也属于本 slide 的所有权。
    onLeave: app => {
      moonEntity.removeComponent(moonEntity.getComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConeUmbra"));
      moonEntity.removeComponent(moonEntity.getComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConePenumbra"));
      hideContourLabels();
      earthTextureLOD.setTexture("decal", originalDecalTextureUrl, originalDecalTextureSizes);
      earthTextureLOD.setTexture("color", originalColorTextureUrl, originalColorTextureSizes);
      earthTextureLOD.setTexture("night", originalNightTextureUrl, originalNightTextureSizes);
      earthTextureLOD.setTexture("specular", originalSpecularTextureUrl, originalSpecularTextureSizes);
      earthEntity.getComponent(Pioneer.AtmosphereComponent).setDensity(originalAtmosphereDensity);
      app.scene.setAmbientLightColor(originalAmbientColor);
      app.scene.removeEntity("top_left_35");
      app.scene.removeEntity("top_left_60");
      app.scene.removeEntity("top_left_85");
      app.scene.removeEntity("bottom_left_85");
      app.scene.removeEntity("bottom_left_60");
      app.scene.removeEntity("bottom_left_35");
      app.scene.removeEntity("top_right_35");
      app.scene.removeEntity("top_right_60");
      app.scene.removeEntity("top_right_85");
      app.scene.removeEntity("bottom_right_85");
      app.scene.removeEntity("bottom_right_60");
      app.scene.removeEntity("bottom_right_35");
      contourLabelElements.length = 0;
    },
    // 先取得目标实体与材质组件，再保存快照；保留原异步时序和未等待的就位回调。
    camera: [async app => {
      if (await app.cameraScripts.goToSystem("inner_solar_system"), earthEntity = app.scene.getEntity("earth"), moonEntity = app.scene.getEntity("moon"), earthTextureLOD = earthEntity.getComponent(Pioneer.SpheroidLODComponent), earthSpheroid = earthEntity.getComponent(Pioneer.SpheroidComponent), earthEntity.getComponent(SolarSystemSceneExports.WMTSComponent)) {
        const wmtsComponent = earthEntity.getComponent(SolarSystemSceneExports.WMTSComponent);
        earthEntity.removeComponent(wmtsComponent);
        earthTextureLOD.setEnabled(true);
      }
      if (originalDecalTextureUrl = earthTextureLOD.getTextureUrl("decal"), originalDecalTextureSizes = earthTextureLOD.getTextureSizes("decal"), originalColorTextureUrl = earthTextureLOD.getTextureUrl("color"), originalColorTextureSizes = earthTextureLOD.getTextureSizes("color"), originalNightTextureUrl = earthTextureLOD.getTextureUrl("night"), originalNightTextureSizes = earthTextureLOD.getTextureSizes("night"), originalSpecularTextureUrl = earthTextureLOD.getTextureUrl("specular"), originalSpecularTextureSizes = earthTextureLOD.getTextureSizes("specular"), originalAtmosphereDensity = earthEntity.getComponent(Pioneer.AtmosphereComponent).getDensity(), originalAmbientColor = new Pioneer.Color(), originalAmbientColor.copy(app.scene.getAmbientLightColor()), ensureShadowCones(), 0 === contourLabelElements.length) {
        contourLabelElements.push(SolarSystemSceneExports.Placemarks.addPlacemark("top_left_35", "35%", earthEntity, 68.4, -140, 0, false).getComponent(Pioneer.DivComponent).getDiv());
        contourLabelElements.push(SolarSystemSceneExports.Placemarks.addPlacemark("top_left_60", "60%", earthEntity, 59.3, -141.9, 0, false).getComponent(Pioneer.DivComponent).getDiv());
        contourLabelElements.push(SolarSystemSceneExports.Placemarks.addPlacemark("top_left_85", "85%", earthEntity, 51.5, -143.5, 0, false).getComponent(Pioneer.DivComponent).getDiv());
        contourLabelElements.push(SolarSystemSceneExports.Placemarks.addPlacemark("bottom_left_85", "85%", earthEntity, 46.7, -144, 0, false).getComponent(Pioneer.DivComponent).getDiv());
        contourLabelElements.push(SolarSystemSceneExports.Placemarks.addPlacemark("bottom_left_60", "60%", earthEntity, 39.4, -145.3, 0, false).getComponent(Pioneer.DivComponent).getDiv());
        contourLabelElements.push(SolarSystemSceneExports.Placemarks.addPlacemark("bottom_left_35", "35%", earthEntity, 32, -146.7, 0, false).getComponent(Pioneer.DivComponent).getDiv());
        contourLabelElements.push(SolarSystemSceneExports.Placemarks.addPlacemark("top_right_35", "35%", earthEntity, 13.4, -33.7, 0, false).getComponent(Pioneer.DivComponent).getDiv());
        contourLabelElements.push(SolarSystemSceneExports.Placemarks.addPlacemark("top_right_60", "60%", earthEntity, 4.3, -33.2, 0, false).getComponent(Pioneer.DivComponent).getDiv());
        contourLabelElements.push(SolarSystemSceneExports.Placemarks.addPlacemark("top_right_85", "85%", earthEntity, -3.6, -32.6, 0, false).getComponent(Pioneer.DivComponent).getDiv());
        contourLabelElements.push(SolarSystemSceneExports.Placemarks.addPlacemark("bottom_right_85", "85%", earthEntity, -8.2, -32.3, 0, false).getComponent(Pioneer.DivComponent).getDiv());
        contourLabelElements.push(SolarSystemSceneExports.Placemarks.addPlacemark("bottom_right_60", "60%", earthEntity, -15.7, -32, 0, false).getComponent(Pioneer.DivComponent).getDiv());
        contourLabelElements.push(SolarSystemSceneExports.Placemarks.addPlacemark("bottom_right_35", "35%", earthEntity, -23.2, -31.4, 0, false).getComponent(Pioneer.DivComponent).getDiv());
        for (const labelElement of contourLabelElements) labelElement.style.fontSize = ".75em";
      } else showContourLabels();
      earthTextureLOD.setTexture("decal", "https://eyes.nasa.gov/apps/solar-system/assets/images/stories/annular_solar_eclipse/eclipse_$SIZE_$FACE.png", [1024]);
      earthTextureLOD.setTexture("color", "https://eyes.nasa.gov/apps/solar-system/assets/images/stories/annular_solar_eclipse/earth_color_$FACE.png", [1024]);
      earthTextureLOD.setTexture("night", "", "");
      earthTextureLOD.setTexture("specular", "", [1024]);
      earthEntity.getComponent(Pioneer.AtmosphereComponent).setDensity(1e-4);
      app.scene.setAmbientLightColor(new Pioneer.Color(.125, .125, .125));
      await app.cameraScripts.alignObjects("earth", "sun", {
        distance: 28e3,
        horizontalOffset: 150
      });
      app.pioneer.getScene("main").waitTillEntitiesInPlace(["earth", "moon"], app.pioneer.getTime(), 10).then(() => (app.getManager("time").setTimeRate(300), true)).catch(loadError => {
        console.warn(loadError);
      });
    }]
  }]
};
export { annularSolarEclipseStory as default };
