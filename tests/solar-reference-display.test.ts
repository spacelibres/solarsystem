import { expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { FULL_SCENE } from '../src/solar/config/scene-catalog';
import { visibleSystemIds } from '../src/solar/ui/navigation';
import { eyesOrbitStyle, eyesOrbitFade } from '../src/solar/config/eyes-display';
import { osculatingPolyline } from '../src/solar/domain/trajectories';

it('uses the actual application manager palette rather than factory defaults', () => {
  const source = readFileSync('eyes/src/engine/managers/TrailManager.js', 'utf8')
    .replace(/^import .*;$/gm, '').replace(/export \{ TrailManager \};/, 'globalThis.Manager = TrailManager;');
  class Color { constructor(public r=1, public g=1, public b=1, public a=1) {} }
  class BaseManager { bindFunctions() {} }
  const context = { Pioneer: { Color, VisibleInterval: {DefaultVisibleFar: {}} }, EyesPublicApi: { BaseManager }, SolarSystemSceneExports: { Entity: { getEntityNamesInGroup: () => new Set() } } };
  const Manager = runInNewContext(source + '\nManager;', context) as new (...args: unknown[]) => { _colors: Record<string, Color> };
  const reference = new Manager({}, {});
  for (const id of ['mercury','venus','earth','mars','jupiter','saturn','uranus','neptune','moon']) {
    const color = reference._colors[id] ?? reference._colors.default;
    expect(eyesOrbitStyle(id).rgba).toEqual([color.r,color.g,color.b,color.a]);
    expect(eyesOrbitStyle(id).width).toBe(1.2);
  }
});

it('keeps the parent and surrounding solar system when focusing the Moon', () => {
  const ids = visibleSystemIds(FULL_SCENE, 'moon', 'body');
  expect(ids).toEqual(expect.arrayContaining(['sun','earth','moon','jupiter']));
  expect(visibleSystemIds(FULL_SCENE,'sun','overview')).toContain('moon');
  expect(FULL_SCENE.filter(body=>body.groups?.includes('planets')).every(body=>body.phases.every(phase=>phase.parentId==='sun'))).toBe(true);
  expect(FULL_SCENE.find(body=>body.id==='moon')?.phases.every(phase=>phase.parentId==='earth')).toBe(true);
});
it('fades an orbit near the body using the actual DefaultVisibleFar interval',()=>{
 const source=readFileSync('eyes/src/engine/core/VisibleInterval.js','utf8').replace(/^import .*;$/gm,'').replace(/export \{ VisibleInterval \};/,'globalThis.Interval=VisibleInterval;');
 const Interval=runInNewContext(source+'\nInterval;',{PioneerPublicApi:{Pool:class{},MathUtils:{clamp01:(v:number)=>Math.max(0,Math.min(1,v))}}}) as {DefaultVisibleFar:{getFadeMultiplier(entity:unknown,camera:unknown):number}};
 for(const radius of [0,.01,.02,.025,.03,.1])expect(eyesOrbitFade(radius)).toBeCloseTo(Interval.DefaultVisibleFar.getFadeMultiplier({getNormalSpaceExtentsRadius:()=>radius},{}),12);
});

it('derives the line from the current parent-relative state and passes through the body', () => {
  const position = {x:3,y:4,z:0}, velocity={x:-.4,y:.3,z:0};
  const points=osculatingPolyline(position,velocity,1.25);
  expect(points.length).toBeGreaterThan(350);
  expect(points.some(point=>Math.hypot(point.x-3,point.y-4,point.z)<1e-12)).toBe(true);
  for(const point of points) expect(Math.hypot(point.x,point.y,point.z)).toBeCloseTo(5,10);
});
