import { describe,it,expect } from 'vitest';
import { FULL_SCENE } from '../src/solar/config/scene-catalog';
describe('full source scene configuration',()=>{
 it('includes all eight planets, actual moons and real Earth/deep-space models',()=>{
  for(const id of ['sun','mercury','venus','earth','mars','jupiter','saturn','uranus','neptune','moon','io','europa','ganymede','callisto','titan','phobos','sc_iss','sc_hubble_space_telescope','sc_juno','sc_voyager_1'])expect(FULL_SCENE.find(body=>body.id===id),id).toBeDefined();
  expect(FULL_SCENE.find(body=>body.id==='sc_iss')?.model?.url).toContain('/sc_iss/ISS_stationary.gltf');
  expect(FULL_SCENE.find(body=>body.id==='phobos')?.model?.scale).toEqual([1,1,1]);
 });
 it('canonicalizes actual source sorted parenting insertion including Lucy duplicate starts',()=>{
  for(const entity of FULL_SCENE)for(let i=1;i<entity.phases.length;i++)expect(entity.phases[i].startEt,entity.id).toBeGreaterThan(entity.phases[i-1].startEt);
  expect(FULL_SCENE.find(body=>body.id==='sc_lucy')?.phases.find(phase=>phase.startEt===872642047)?.parentId).toBe('sun');
  expect(FULL_SCENE.find(body=>body.id==='sc_lucy')?.phases.find(phase=>phase.startEt>872642047)?.parentId).toBe('15094_polymele');
 });
 it('keeps unsupported history spin explicit and covered fixed positions out of static fallback',()=>{
  const impactor=FULL_SCENE.find(body=>body.id==='sc_deep_impact_impactor')!;
  expect(impactor.staticPosition).toBeUndefined();
  for(const body of FULL_SCENE)for(const controller of body.controllers??[])if(controller.type==='spin')expect(controller.referenceTime).not.toBeUndefined();
 });
 it('uses parent path candidates and source coverage instead of pairing arrays by index',()=>{
  const juno=FULL_SCENE.find(body=>body.id==='sc_juno')!;
  const phases=juno.phases.filter(phase=>phase.parentId==='jupiter');
  expect(phases.length).toBeGreaterThan(2);
  for(const phase of phases)expect(phase.positionPaths).toEqual(['sc_juno/jupiter/orb/def.dyn']);
  const earth=juno.phases.find(phase=>phase.parentId==='earth')!;
  expect(earth.positionPaths).toEqual(['sc_juno/earth/launch/orb/def.dyn','sc_juno/earth/flyby/orb/def.dyn']);
 });
});
it('matches verified source reference-body folder aliases without mixing frames', () => {
 const osiris=FULL_SCENE.find(body=>body.id==='sc_osiris_rex')!;
 const phase=osiris.phases.filter(phase=>phase.startEt<=656501483.184).at(-1)!;
 expect(phase.parentId).toBe('101955_bennu');
 expect(phase.positionPaths).toContain('sc_osiris_rex/bennu/pos/def.dyn');
 expect(phase.positionPaths?.every(path=>path.split('/')[1]==='bennu')).toBe(true);
});
