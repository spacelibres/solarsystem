import * as Pioneer from '../engine/pioneer/index.js';

const EARTH_GM_KM3_S2 = 398600.4418;
const DATA_URL = 'data/starlink-orbits.json';

const makeUnpickable = object => {
  object.raycast = () => {};
  object.traverse?.(child => { child.raycast = () => {}; });
};

/**
 * Add the public Starlink constellation to the recovered Eyes Earth entity.
 *
 * OrbitalParticlesComponent projects each particle from a Pioneer
 * OrbitalElements record on every frame, so 11k satellites stay on one
 * instanced draw without creating 11k Eyes entities or labels.
 */
export async function attachStarlinkLayer(scene) {
  try {
    const response = await fetch(new URL(DATA_URL, document.baseURI), { cache: 'force-cache' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const catalogue = await response.json();
    const earth = scene.getEntity('earth');
    if (!earth || !Array.isArray(catalogue.satellites) || catalogue.satellites.length === 0) return null;
    const entity = scene.addEntity('starlink_constellation');
    entity.setParent(earth);
    entity.setPosition(new Pioneer.Vector3(0, 0, 0));
    entity.setOrientation(Pioneer.Quaternion.Identity);
    entity.setExtentsRadius(7000);
    entity.setOcclusionRadius(0);
    entity.setCanOcclude(false);
    const component = entity.addComponent(Pioneer.OrbitalParticlesComponent, 'starlink_particles');
    component.setScaleOfParticles(1);
    component.setLoadFunction(async () => {
      const orbitalElements = [];
      const colors = [];
      const scales = [];
      for (const satellite of catalogue.satellites) {
        const elements = new Pioneer.OrbitalElements();
        elements.setFromPositionAndVelocity(
          new Pioneer.Vector3(satellite.p[0], satellite.p[1], satellite.p[2]),
          new Pioneer.Vector3(satellite.v[0], satellite.v[1], satellite.v[2]),
          Pioneer.TimeUtils.unixToEt(satellite.e),
          EARTH_GM_KM3_S2,
        );
        orbitalElements.push(elements);
        colors.push(new Pioneer.Color(0.62, 0.82, 1, 0.9));
        scales.push(35);
      }
      return { orbitalElements, colors, scales };
    });
    component.setResourcesLoadedCallback(() => {
      for (const object of component.getThreeJsObjects()) makeUnpickable(object);
    });
    component.setForceLoaded(true);

    // One display model per generation, placed at the first satellite in that
    // numbering band. The full constellation stays a particle cloud; these
    // samples make the three model libraries visible at Earth close-up.
    for (const generation of [1, 2, 3]) {
      const sample = catalogue.satellites.find(satellite => (satellite.g ?? (satellite.n >= 40000 ? 3 : satellite.n >= 30000 ? 2 : 1)) === generation);
      if (!sample) continue;
      const modelEntity = scene.addEntity(`starlink_model_gen${generation}`);
      modelEntity.setParent(earth);
      modelEntity.setPosition(new Pioneer.Vector3(0, 0, 0));
      modelEntity.setOrientation(Pioneer.Quaternion.Identity);
      modelEntity.setOcclusionRadius(0);
      modelEntity.setCanOcclude(false);
      modelEntity.setExtentsRadius(0.1);
      const model = modelEntity.addComponent(Pioneer.ModelComponent, `starlink_model_${generation}`);
      model.setUrl(`models/starlink/starlink-gen${generation}.glb`);
      // Model geometry is authored in metres; 35 yields a ~100 km display
      // marker at Earth close-up, not a physical-scale satellite.
      model.setScale(35);
      model.setResourcesLoadedCallback(() => {
        for (const object of model.getThreeJsObjects()) makeUnpickable(object);
      });
      model.setForceLoaded(true);
      const controller = modelEntity.addController(Pioneer.DynamoController);
      controller.setBaseUrl(`dyn/starlink/starlink-gen${generation}`);
      // Add the orientation controller after the position controller so the
      // dependency graph resolves position first and then points +Z at the Sun.
      const align = modelEntity.addController(Pioneer.AlignController);
      align.setPrimaryAlignType("point");
      align.setPrimaryTargetEntity("sun");
      align.setPrimaryAxis(new Pioneer.Vector3(0, 0, 1));
    }
    return entity;
  } catch (error) {
    console.warn('Starlink layer unavailable:', error);
    return null;
  }
}

