// Recovered from app.js:1705346-1714327.
/** 日全食故事：地球材质、半影/本影、城市和等食分标注的临时场景所有权。 */
import * as Pioneer from "../pioneer/index.js";
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
let totalSolarEclipseStory;
const savedStoryState = {
  layers: []
};
const eclipseStartTime = "2024-04-08T15:40:00Z";
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
let earthTextureLOD;
let earthSpheroid;
const cityPlacemarkDefinitions = {
  Mazatlan: {
    text: "Mazatlan",
    latLng: [23.24923710314604, -106.40993819539558]
  },
  Durango: {
    text: "Durango",
    latLng: [24.02441384699334, -104.66984097026072]
  },
  "San Antonio": {
    text: "San Antonio",
    latLng: [29.420047396623932, -98.57519484659794]
  },
  Austin: {
    text: "Austin",
    latLng: [30.263780185402428, -97.75987715008797]
  },
  Dallas: {
    text: "Dallas",
    latLng: [32.77380380404552, -96.79954491353796]
  },
  "Little Rock": {
    text: "Little Rock",
    latLng: [34.74290714935434, -92.29046361128361]
  },
  Indianapolis: {
    text: "Indianapolis",
    latLng: [39.76489045302965, -86.17327537195442]
  },
  Buffalo: {
    text: "Buffalo",
    latLng: [42.88564478789335, -78.88023833127143]
  },
  Montreal: {
    text: "Montreal",
    latLng: [45.50519157056544, -73.56425672504801]
  }
};
const contourPlacemarkDefinitions = {
  top_left_50: {
    text: "50%",
    latLng: [6.4, -162]
  },
  top_left_75: {
    text: "75%",
    latLng: [-.4, -159.7]
  },
  top_left_95: {
    text: "95%",
    latLng: [-5.3, -157.8]
  },
  left_100: {
    text: "100%",
    latLng: [-7.5, -157.4]
  },
  bottom_left_95: {
    text: "95%",
    latLng: [-9.5, -157]
  },
  bottom_left_75: {
    text: "75%",
    latLng: [-14.6, -155.4]
  },
  bottom_left_50: {
    text: "50%",
    latLng: [-20.5, -153.9]
  },
  top_right_50: {
    text: "50%",
    latLng: [62.2, -13.2]
  },
  top_right_75: {
    text: "75%",
    latLng: [55.1, -17.9]
  },
  top_right_95: {
    text: "95%",
    latLng: [50, -20.3]
  },
  right_100: {
    text: "100%",
    latLng: [47.7, -20.9]
  },
  bottom_right_95: {
    text: "95%",
    latLng: [45.7, -21.9]
  },
  bottom_right_75: {
    text: "75%",
    latLng: [40.8, -23.6]
  },
  bottom_right_50: {
    text: "50%",
    latLng: [34.7, -24.9]
  }
};
totalSolarEclipseStory = {
  type: "nonsequential",
  entities: ["earth", "moon"],
  onEnter: async app => {
    const layerManager = app.getManager("layer");
    const layerPanelComponent = app.getComponent("layerPanel");
    app.getManager("time").resetLimits();
    const earthEntity = app.scene.getEntity("earth");
    ["asteroids", "comets", "dwarfPlanets", "minorMoons", "spacecraft", "planets"].forEach(layerId => {
      if (layerManager.getLayer(layerId).visible) {
        savedStoryState.layers.push(layerId);
        layerPanelComponent.toggleLayer(layerId);
      }
    });
    earthTextureLOD = earthEntity.getComponent(Pioneer.SpheroidLODComponent);
    earthSpheroid = earthEntity.getComponent(Pioneer.SpheroidComponent);
    if (earthEntity.getComponent(SolarSystemSceneExports.WMTSComponent)) {
      const wmtsComponent = earthEntity.getComponent(SolarSystemSceneExports.WMTSComponent);
      earthEntity.removeComponent(wmtsComponent);
      earthTextureLOD.setEnabled(true);
    }
    originalDecalTextureUrl = earthTextureLOD.getTextureUrl("decal");
    originalDecalTextureSizes = earthTextureLOD.getTextureSizes("decal");
    originalColorTextureUrl = earthTextureLOD.getTextureUrl("color");
    originalColorTextureSizes = earthTextureLOD.getTextureSizes("color");
    originalNightTextureUrl = earthTextureLOD.getTextureUrl("night");
    originalNightTextureSizes = earthTextureLOD.getTextureSizes("night");
    originalSpecularTextureUrl = earthTextureLOD.getTextureUrl("specular");
    originalSpecularTextureSizes = earthTextureLOD.getTextureSizes("specular");
    originalAtmosphereDensity = earthEntity.getComponent(Pioneer.AtmosphereComponent).getDensity();
    originalAmbientColor = new Pioneer.Color();
    originalAmbientColor.copy(app.scene.getAmbientLightColor());
    earthTextureLOD.setTexture("night", "", "");
    earthTextureLOD.setTexture("specular", "", [1024]);
    earthTextureLOD.setTexture("decal", "https://eyes.nasa.gov/apps/solar-system/assets/images/2024_eclipse_contour/eclipse_contour_$SIZE_$FACE.png", [1024]);
    earthTextureLOD.setTexture("color", "https://eyes.nasa.gov/apps/solar-system/assets/images/stories/annular_solar_eclipse/earth_color_$FACE.png", [1024]);
    earthEntity.getComponent(Pioneer.AtmosphereComponent).setDensity(1e-4);
    app.scene.setAmbientLightColor(new Pioneer.Color(.125, .125, .125));
    createPlacemarkGroup(app, "contour_map_group", contourPlacemarkDefinitions, false);
    createPlacemarkGroup(app, "city_placemarks_group", cityPlacemarkDefinitions, true);
    enableShadowCones(app);
  },
  onLeave: app => {
    const {
      layers: layers
    } = savedStoryState;
    const layerPanelComponent = app.getComponent("layerPanel");
    app.getManager("time").resetLimits();
    for (let layerIndex = 0; layerIndex < layers.length; layerIndex++) layerPanelComponent.toggleLayer(layers[layerIndex]);
    savedStoryState.layers = [];
    const moonEntity = app.scene.getEntity("moon");
    moonEntity.removeComponent(moonEntity.getComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConeUmbra"));
    moonEntity.removeComponent(moonEntity.getComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConePenumbra"));
    setPlacemarkGroupEnabled(app, "contour_map_group", false);
    removeEarthEcliptic(app);
    earthTextureLOD.setTexture("decal", originalDecalTextureUrl, originalDecalTextureSizes);
    earthTextureLOD.setTexture("color", originalColorTextureUrl, originalColorTextureSizes);
    earthTextureLOD.setTexture("night", originalNightTextureUrl, originalNightTextureSizes);
    earthTextureLOD.setTexture("specular", originalSpecularTextureUrl, originalSpecularTextureSizes);
    app.scene.getEntity("earth").getComponent(Pioneer.AtmosphereComponent).setDensity(originalAtmosphereDensity);
    app.scene.setAmbientLightColor(originalAmbientColor);
    app.scene.removeEntity("contour_map_group");
    app.scene.removeEntity("city_placemarks_group");
  },
  slides: [{
    id: "slide_1",
    type: "panel",
    content: [{
      type: "description",
      title: "Total Solar Eclipse",
      description: "On April 8, 2024, a total solar eclipse crossed North and Central America and created a path of totality.",
      more: "During a total solar eclipse, the Moon completely blocks the Sun while it passes between the Sun and Earth. The sky darkens as if it were dawn or dusk and those standing in the path of totality may see the Sun's outer atmosphere (the corona) if weather permits."
    }, {
      type: "buttons",
      blockTitle: "Select your view",
      buttonContent: [{
        id: "earth",
        label: "Earth",
        iconSrc: "https://eyes.nasa.gov/apps/solar-system/assets/images/cards/eclipse_view_earth_icon.png",
        onClick: async app => {
          setPlacemarkGroupEnabled(app, "contour_map_group");
          setPlacemarkGroupEnabled(app, "city_placemarks_group");
          removeEarthEcliptic(app);
          enableShadowCones(app);
          earthTextureLOD.setTexture("decal", "https://eyes.nasa.gov/apps/solar-system/assets/images/2024_eclipse_contour/eclipse_contour_$SIZE_$FACE.png", [1024]);
          app.getComponent("story").getStoryBlock("checkboxes").setChecked("shadow_cones", true);
          await app.cameraScripts.alignObjects("earth", "sun", {
            distance: 28e3,
            horizontalOffset: 155,
            verticalOffset: 30
          });
        }
      }, {
        id: "behind-moon",
        label: "Behind Moon",
        iconSrc: "https://eyes.nasa.gov/apps/solar-system/assets/images/cards/eclipse_view_behind_moon_icon.png",
        onClick: async app => {
          setPlacemarkGroupEnabled(app, "contour_map_group", false);
          setPlacemarkGroupEnabled(app, "city_placemarks_group", false);
          removeEarthEcliptic(app);
          await app.cameraScripts.alignObjects("moon", "earth", {
            distance: 1e4,
            horizontalOffset: -15,
            verticalOffset: 10
          });
        }
      }, {
        id: "earth-moon",
        label: "Earth-Moon",
        iconSrc: "https://eyes.nasa.gov/apps/solar-system/assets/images/cards/eclipse_view_earth_moon_icon.png",
        onClick: async app => {
          const earthEntity = app.scene.getEntity("earth");
          setPlacemarkGroupEnabled(app, "contour_map_group", false);
          setPlacemarkGroupEnabled(app, "city_placemarks_group", false);
          await app.cameraScripts.alignObjects("earth", "moon", {
            distance: 12e5,
            horizontalOffset: -90,
            verticalOffset: 10
          });
          if (!app.scene.getEntity("earthEcliptic")) {
            const eclipticEntity = app.scene.addEntity("earthEcliptic");
            eclipticEntity.setParent(earthEntity);
            eclipticEntity.setPosition(Pioneer.Vector3.Zero);
            const quaternion = new Pioneer.Quaternion();
            earthEntity.getController(Pioneer.DynamoController).getOrbitOrientation(quaternion, app.pioneer.getTime());
            eclipticEntity.setOrientation(quaternion);
            const eclipticAnnulus = eclipticEntity.addComponent(SolarSystemSceneExports.AnnulusComponent, "annulus");
            eclipticAnnulus.setInnerRadius(0);
            eclipticAnnulus.setOuterRadius(42e4);
            eclipticAnnulus.setVisibleInterval(new Pioneer.VisibleInterval(0, 3e6, "z-distance"));
            eclipticAnnulus.setColor(new Pioneer.Color(110, 110, 110, .1));
          }
        }
      }, {
        id: "sun-earth-moon",
        label: "Sun-Earth-Moon",
        iconSrc: "https://eyes.nasa.gov/apps/solar-system/assets/images/cards/eclipse_view_sun_earth_moon_icon.png",
        onClick: app => {
          setPlacemarkGroupEnabled(app, "contour_map_group", false);
          setPlacemarkGroupEnabled(app, "city_placemarks_group", false);
          removeEarthEcliptic(app);
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
        id: "city_placemarks",
        label: "Display Cities",
        onChange: (changeEvent, app) => {
          setPlacemarkGroupEnabled(app, "city_placemarks_group", changeEvent.target.checked);
        }
      }, {
        id: "shadow_cones",
        label: "Enable Shadow Cones",
        onChange: (changeEvent, app) => {
          if (changeEvent.target.checked) enableShadowCones(app);else {
            const moonEntity = app.scene.getEntity("moon");
            moonEntity.getComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConeUmbra").setEnabled(false);
            moonEntity.getComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConePenumbra").setEnabled(false);
          }
        }
      }, {
        id: "contour_map",
        label: "Enable Contour Map",
        onChange: (changeEvent, app) => {
          const contourTextureUrl = changeEvent.target.checked ? "https://eyes.nasa.gov/apps/solar-system/assets/images/2024_eclipse_contour/eclipse_contour_$SIZE_$FACE.png" : "";
          earthTextureLOD.setTexture("decal", contourTextureUrl, [1024]);
          setPlacemarkGroupEnabled(app, "contour_map_group", changeEvent.target.checked);
        }
      }]
    }],
    time: eclipseStartTime,
    timeLimits: {
      min: eclipseStartTime,
      max: "2024-04-08T20:50:00Z"
    },
    // StoryView 传入绑定的 isStoryExit 查询函数；每个异步阶段后检查，防止退出后继续设置阴影/速率。
    camera: [async (app, hasStoryExited) => {
      await app.cameraScripts.goToSystem("inner_solar_system");
      if (!hasStoryExited()) {
        await app.scene.waitTillEntitiesInPlace(["sun", "earth"]);
        await app.cameraScripts.alignObjects("earth", "sun", {
          distance: 28e3,
          horizontalOffset: 155,
          verticalOffset: 30
        });
        if (!hasStoryExited()) {
          await app.scene.waitTillEntitiesInPlace(["moon"]);
          enableShadowCones(app);
          app.getManager("time").setTimeRate(300);
        }
      }
    }]
  }]
};
/** 两锥已存在时仅恢复启用状态；首次创建时设置太阳→地球的投射关系。 */
const enableShadowCones = app => {
  const moonEntity = app.scene.getEntity("moon");
  let umbraCone = moonEntity.getComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConeUmbra");
  let penumbraCone = moonEntity.getComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConePenumbra");
  if (umbraCone && penumbraCone) {
    umbraCone.setEnabled(true);
    penumbraCone.setEnabled(true);
  } else {
    umbraCone = moonEntity.addComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConeUmbra");
    penumbraCone = moonEntity.addComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConePenumbra");
    umbraCone.setSourceEntity("sun");
    umbraCone.setTargetEntity("earth");
    umbraCone.setColor(new Pioneer.Color(.437, .18, .593, .25));
    penumbraCone.setSourceEntity("sun");
    penumbraCone.setTargetEntity("earth");
    penumbraCone.setShadowType("penumbra");
    penumbraCone.setColor(new Pioneer.Color(.218, .093, .3, .3));
  }
};
/** 标注组跟随地球姿态，文本和可选城市针脚分为两个实体；分组启停统一控制子标注。 */
const createPlacemarkGroup = (app, groupEntityId, placemarkDefinitions, includeCityPins = false) => {
  const earthEntity = app.scene.getEntity("earth");
  const groupEntity = app.scene.getEntity(groupEntityId) || app.scene.addEntity(groupEntityId);
  groupEntity.setParent(earthEntity);
  groupEntity.setCanOcclude(false);
  groupEntity.setOcclusionRadius(earthEntity.getOcclusionRadius());
  const fixedController = groupEntity.addController(Pioneer.FixedController);
  fixedController.setPosition(Pioneer.Vector3.Zero);
  fixedController.setOrientation(Pioneer.Quaternion.Identity);
  groupEntity.addController(Pioneer.RotateByEntityOrientationController);
  for (const placemarkId in placemarkDefinitions) {
    const placemarkInfo = placemarkDefinitions[placemarkId];
    const labelAltitude = 10;
    const labelEntity = app.scene.getEntity(placemarkId) || SolarSystemSceneExports.Placemarks.addPlacemark(placemarkId, placemarkInfo.text, earthEntity, placemarkInfo.latLng[0], placemarkInfo.latLng[1], labelAltitude);
    labelEntity.setEnabled(true);
    labelEntity.setParent(groupEntity);
    const labelElement = labelEntity.getComponent(Pioneer.DivComponent).getDiv();
    labelElement.id = placemarkId;
    labelElement.classList.add("placemark");
    labelEntity.getComponent(Pioneer.DivComponent).setAlignment(new Pioneer.Vector2(-.25, .6));
    labelElement.classList.remove("pioneer-label-div");
    if (includeCityPins) {
      const pinEntity = app.scene.getEntity(`${placemarkId}_placemark_icon`) || SolarSystemSceneExports.Placemarks.addPlacemark(`${placemarkId}_placemark_icon`, "", earthEntity, placemarkInfo.latLng[0], placemarkInfo.latLng[1], 0);
      pinEntity.setEnabled(true);
      pinEntity.setParent(groupEntity);
      const pinElement = pinEntity.getComponent(Pioneer.DivComponent).getDiv();
      pinElement.classList.add("placemark");
      pinElement.classList.remove("pioneer-label-div");
      pinElement.innerHTML = "<div class=\"pin\"><img class=\"no-drag\" style=\"width: 10px\" src=\"https://eyes.nasa.gov/apps/solar-system/assets/images/map_marker.svg\"></div><div class=\"content\"></div>";
    }
  }
  groupEntity.setEnabled(true);
};
/** group 后缀对应 checkbox ID；保留原逐项同步调用，未在重命名中改变其次数。 */
const setPlacemarkGroupEnabled = (app, groupEntityId, isEnabled = true) => {
  app.scene.getEntity(groupEntityId)?.setEnabled(isEnabled);
  const checkboxId = groupEntityId.split("_group")[0];
  if (checkboxId) {
    const {
      checkboxContent: checkboxContent
    } = app.getComponent("story").getStoryBlock("checkboxes").options.config.info;
    Object.values(checkboxContent)?.forEach(checkboxInfo => {
      app.getComponent("story").getStoryBlock("checkboxes")?.setChecked(checkboxId, isEnabled);
    });
  }
};
const removeEarthEcliptic = app => {
  if (app.scene.getEntity("earthEcliptic")) {
    app.scene.removeEntity("earthEcliptic");
  }
};
export { totalSolarEclipseStory as default };
