import { expect, it } from 'vitest';
import catalog from '../src/solar/config/catalog.generated.json';
import { FULL_SCENE } from '../src/solar/config/scene-catalog';
import { ExplorerRuntime } from '../src/solar/runtime/explorer-runtime';
import type { ExplorerBodyDefinition } from '../src/solar/config/default-scene';
it('retains every declared numeric spin period even when no reference epoch is specified',()=>{
 for(const source of catalog.entries){
  const spins=source.controllers.filter(c=>c.type==='spin');
  if(!spins.length)continue;
  const body=FULL_SCENE.find(body=>body.id===source.id)!;
  expect(body.controllers?.filter(c=>c.type==='spin').length,source.id).toBe(spins.length);
 }
 const spin=FULL_SCENE.find(body=>body.id==='sc_themis_a')!.controllers!.find(c=>c.type==='spin');
 expect(spin).toMatchObject({type:'spin',rate:2*Math.PI/(.0008333*3600)});
});
it('starts epochless THEMIS spin at runtime creation and moves, pauses and reverses on the simulation clock',()=>{
 const source=FULL_SCENE.find(body=>body.id==='sc_themis_a')!;
 const sun:ExplorerBodyDefinition={id:'sun',label:'sun',radiusKm:1,kind:'marker',source:'test',phases:[{startEt:0,parentId:null}],staticPosition:{x:0,y:10,z:0},staticOrientation:{x:0,y:0,z:0,w:1}};
 const craft:ExplorerBodyDefinition={...source,id:'craft',phases:[{startEt:0,parentId:null}],staticPosition:{x:0,y:0,z:0}};
 const runtime=new ExplorerRuntime({entities:[sun,craft],timeEt:1000});
 const q=()=>{const frame=runtime.renderFrame().frames.get('craft');if(frame?.status!=='ready'||!frame.orientation)throw Error('Missing craft attitude');return frame.orientation;};
 expect(q()).toMatchObject({x:0,y:0,z:0,w:1});
 runtime.play(1);runtime.tick(.75);expect(q().y).toBeCloseTo(Math.sin((2*Math.PI/(.0008333*3600))*.75/2),9);
 runtime.pause();const paused=q();runtime.tick(1);expect(q()).toEqual(paused);
 runtime.play(-1);runtime.tick(.75);expect(q()).toMatchObject({x:0,y:0,z:0,w:1});runtime.dispose();
});
