import { describe, expect, it } from 'vitest';
import { resolveEntityFrames } from '../src/solar/domain/entities';
const zero = {x:0,y:0,z:0};
const identity = {...zero,w:1};
describe('source orientation controllers', () => {
  it('points the primary spacecraft axis at Earth then aligns its secondary axis', () => {
    const frames = resolveEntityFrames([
      {id:'earth',phases:[{startEt:0,parentId:null}],staticPosition:{x:10,y:0,z:0},staticOrientation:identity},
      {id:'craft',phases:[{startEt:0,parentId:null}],staticPosition:zero,controllers:[{type:'align',primary:{type:'point',axis:{x:0,y:0,z:1},targetId:'earth'},secondary:{type:'align',axis:{x:0,y:1,z:0},targetId:'earth',targetAxis:{x:0,y:1,z:0}}}]},
    ],new Map(),2);
    const frame = frames.get('craft');
    expect(frame?.status).toBe('ready');
    if(frame?.status==='ready'){expect(frame.orientation?.y).toBeCloseTo(Math.SQRT1_2);expect(frame.orientation?.w).toBeCloseTo(Math.SQRT1_2);}
  });
  it('rotates position and left multiplies orientation before parent translation', () => {
    const q={x:0,y:0,z:Math.SQRT1_2,w:Math.SQRT1_2};
    const frames=resolveEntityFrames([
      {id:'parent',phases:[{startEt:0,parentId:null}],staticPosition:{x:10,y:0,z:0},staticOrientation:q},
      {id:'child',phases:[{startEt:0,parentId:'parent'}],staticPosition:{x:1,y:0,z:0},staticOrientation:identity,controllers:[{type:'rotateByEntityOrientation'}]},
    ],new Map(),2);
    const frame=frames.get('child');
    expect(frame?.status).toBe('ready');
    if(frame?.status==='ready'){expect(frame.position.x).toBeCloseTo(10);expect(frame.position.y).toBeCloseTo(1);expect(frame.orientation).toEqual(q);}
  });
});
import { applySourceControllers } from '../src/solar/domain/controllers';
it('preserves Dynamo orientation overwrite at its source controller order', () => {
  const sampled = {x:0,y:0,z:Math.SQRT1_2,w:Math.SQRT1_2};
  const result=applySourceControllers([{type:'fixed',orientation:identity},{type:'dynamoOrientation'}],{position:zero,orientation:sampled},zero,null,2,()=>undefined);
  expect(result.orientation).toEqual(sampled);
});
it('allows source alignment to its own already evaluated velocity', () => {
 const frames=resolveEntityFrames([{id:'iss',phases:[{startEt:0,parentId:null}],controllers:[{type:'align',primary:{type:'velocity',axis:{x:1,y:0,z:0},targetId:'iss'}}]}],new Map([['iss',{position:zero,velocity:{x:0,y:1,z:0}}]]),2);
 expect(frames.get('iss')?.status).toBe('ready');
});
import { readFileSync } from 'node:fs';
it('matches recovered CPU RotateByEntityOrientation orientation query multiplication', () => {
  const source=readFileSync(new URL('../eyes/src/engine/controllers/RotateByEntityOrientationController.js',import.meta.url),'utf8');
  const method=source.match(/__updateOrientationAtTime\(orientationOut, time\) \{([\s\S]*?)\n  \}\n  __update\(/)![1];
  const q={x:0,y:0,z:Math.SQRT1_2,w:Math.SQRT1_2};
  const initial={x:Math.SQRT1_2,y:0,z:0,w:Math.SQRT1_2};
  const actual=applySourceControllers([{type:'rotateByEntityOrientation',targetId:'earth',rotatingPosition:false}],{orientation:initial},zero,null,2,()=>({status:'ready',id:'earth',parentId:null,phaseIndex:0,position:zero,velocity:zero,orientation:q}));
  const quatSource=readFileSync(new URL('../eyes/src/engine/core/Quaternion.js',import.meta.url),'utf8');
  class Pool {constructor(private readonly ctor:new()=>object){}get(){return new this.ctor();}release(){}}
  const api={Pool,THREE:{Quaternion:class{}},Quaternion:undefined as unknown};
  const Q= new Function('PioneerPublicApi',quatSource.replace(/^import .*;$/m,'').replace('export { Quaternion };','return Quaternion;'))(api);
  api.Quaternion=Q;
  const out=new Q(initial.w,initial.x,initial.y,initial.z);
  const reference={getOrientationAtTime:(output: {copy:(input:object)=>void})=>output.copy(q)};
  const controller={_rotatingOrientation:true,_entityRef:{getName:()=> 'earth',get:()=>reference}};
  new Function('PioneerPublicApi','orientationOut','time',method).call(controller,api,out,2);
  expect(actual.orientation).toEqual({x:out.x,y:out.y,z:out.z,w:out.w});
});
it('matches recovered CPU primary and secondary alignment', () => {
 class Pool {constructor(private readonly ctor:new()=>object){}get(){return new this.ctor();}release(){}}
 const api={Pool,THREE:{Quaternion:class{},Vector3:class{}},MathUtils:{clamp:(v:number,min:number,max:number)=>Math.max(min,Math.min(max,v))},Quaternion:undefined as unknown,Vector3:undefined as unknown};
 const load=(name:string)=>new Function('PioneerPublicApi',readFileSync(new URL(`../eyes/src/engine/core/${name}.js`,import.meta.url),'utf8').replace(/^import .*;$/m,'').replace(`export { ${name} };`,`return ${name};`))(api);
 const Q=load('Quaternion');api.Quaternion=Q;const V=load('Vector3');api.Vector3=V;
 const source=readFileSync(new URL('../eyes/src/engine/controllers/AlignController.js',import.meta.url),'utf8');
 const method=source.slice(source.indexOf('  _getOrientation(orientationOut, time) {')+'  _getOrientation(orientationOut, time) {'.length,source.indexOf('\n  _getAxis('));
 const body=method.slice(0,method.lastIndexOf('\n  }'));
 const controller={_joint:'',_jointObject:null,_model:null,_primaryAxis:new V(0,0,1),_secondaryAxis:new V(0,1,0),_primaryAlignType:'point',_secondaryAlignType:'align',_primaryTargetEntity:{},_secondaryTargetEntity:{},_primaryTargetAxis:new V(),_secondaryTargetAxis:new V(0,1,0),_getAxis:(out:{copy:(v:object)=>void},type:string)=>out.copy(type==='point'?new V(1,0,0):new V(0,1,0))};
 const out=new Q();new Function('PioneerPublicApi','orientationOut','time',body).call(controller,api,out,2);
 const actual=applySourceControllers([{type:'align',primary:{type:'point',axis:{x:0,y:0,z:1},targetId:'earth'},secondary:{type:'align',axis:{x:0,y:1,z:0},targetId:'earth',targetAxis:{x:0,y:1,z:0}}}],{position:zero},zero,null,2,()=>({status:'ready',id:'earth',parentId:null,phaseIndex:0,position:{x:10,y:0,z:0},velocity:zero,orientation:identity}));
 for(const key of ['x','y','z','w'] as const)expect(actual.orientation?.[key]).toBeCloseTo(out[key],12);
});
it('initializes a covered fixed position and rotates it without leaking after release', () => {
 const definitions = [
  {id:'parent',phases:[{startEt:0,parentId:null}],staticPosition:{x:10,y:0,z:0},staticOrientation:{x:0,y:0,z:Math.SQRT1_2,w:Math.SQRT1_2}},
  {id:'impactor',phases:[{startEt:0,parentId:'parent'}],controllers:[{type:'fixed' as const,position:{x:1,y:0,z:0},coverage:[0,10] as const},{type:'rotateByEntityOrientation' as const,rotatingOrientation:false,coverage:[0,10] as const}]},
 ];
 const before=resolveEntityFrames(definitions,new Map(),5).get('impactor');
 expect(before?.status).toBe('ready');
 if(before?.status==='ready'){expect(before.position.x).toBeCloseTo(10);expect(before.position.y).toBeCloseTo(1);}
 expect(resolveEntityFrames(definitions,new Map(),11).get('impactor')).toMatchObject({status:'unavailable',reason:'missing-local'});
});
it('allows explicit unknown model attitude while retaining strict dynamic orientation by default', () => {
 const definition={id:'model',phases:[{startEt:0,parentId:null,orientationPath:'model/ori/def.dyn'}],staticPosition:zero};
 expect(resolveEntityFrames([definition],new Map(),2).get('model')).toMatchObject({status:'unavailable',reason:'missing-orientation'});
 expect(resolveEntityFrames([{...definition,allowUnknownOrientation:true}],new Map(),2).get('model')).toMatchObject({status:'ready',orientation:null});
});
it('points using the position after preceding fixed and rotate controllers', () => {
 const q={x:0,y:0,z:Math.SQRT1_2,w:Math.SQRT1_2};
 const frame=resolveEntityFrames([
  {id:'earth',phases:[{startEt:0,parentId:null}],staticPosition:{x:0,y:2,z:0},staticOrientation:q},
  {id:'craft',phases:[{startEt:0,parentId:null}],staticPosition:{x:1,y:0,z:0},controllers:[{type:'rotateByEntityOrientation',targetId:'earth',rotatingOrientation:false},{type:'align',primary:{type:'point',axis:{x:0,y:0,z:1},targetId:'earth'}}]},
 ],new Map(),2).get('craft');
 expect(frame?.status).toBe('ready');
 if(frame?.status==='ready'){expect(frame.orientation?.x).toBeCloseTo(-Math.SQRT1_2);expect(frame.orientation?.y).toBeCloseTo(0);}
});
