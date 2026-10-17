import { describe, expect, it } from 'vitest';
import { RollingTrail } from '../src/solar/domain/rolling-trail';
import { sampleTrailHistory, type TrailSample } from '../src/solar/domain/trails';
import type { EphemerisWindow } from '../src/solar/domain/ephemeris';

const window: EphemerisWindow = { header:{version:2,pointType:'pos',name:'pos',numberOfDigits:0}, source:{path:'curve',segment:null}, interval:{min:0,max:1000}, points:[0,1000].map(time=>({kind:'pos',time,position:{x:time,y:time*time,z:0},velocity:{x:1,y:2*time,z:0}})) };
const head = (time:number):TrailSample=>({time,position:{x:time,y:time*time,z:0},velocity:{x:1,y:2*time,z:0}});
const history = ()=>sampleTrailHistory({path:'curve',now:200,phaseStart:0,parentId:null,options:{length:120},adaptive:false,load:async()=>window});
describe('rolling source trail',()=>{
  it('moves both exact endpoints while preserving absolute interior knots across old refresh ticks',async()=>{
    const trail=new RollingTrail(await history());
    for(const time of [200.49,200.51,220,190,500]) {
      const points=trail.sample(time,head(time))!;
      expect(points[0].x).toBeCloseTo(time-120,10);
      expect(points.at(-1)).toEqual(head(time).position);
      expect(points.some(point=>Math.abs(point.x-(Math.floor(time)-1))<1e-9)).toBe(true);
      expect(points.length).toBeLessThanOrEqual(4096);
    }
    expect(trail.sample(1001,head(1001))).toBeUndefined();
    expect(trail.needsRefresh(1001)).toBe(true);
  });
  it('refines the physical curve to a quarter screen pixel without loading',async()=>{
    const trail=new RollingTrail(await history());
    const points=trail.sample(201,head(201),position=>({x:position.x*10,y:position.y,visible:true}))!;
    expect(points.length).toBeGreaterThan(121);
    for(let i=1;i<points.length;i++){
      const a=points[i-1],b=points[i],x=(a.x+b.x)/2;
      const error=Math.abs(x*x-(a.y+b.y)/2);
      expect(error).toBeLessThanOrEqual(.25+1e-9);
    }
  });
  it('uses half-open source length override intervals',async()=>{
    const result=await sampleTrailHistory({path:'curve',now:200,phaseStart:0,parentId:null,options:{length:120,lengthCoverages:[[20,0,200],[40,200,300]]},load:async()=>window});
    expect(result.requestedStart).toBe(160);
    expect(result.windows).toEqual([window]);
  });
  it('does not join a disconnected loaded leaf or extend a phase backwards',async()=>{
    const original=await history();
    const past={...window,interval:{min:-200,max:-100}};
    const trail=new RollingTrail({...original,windows:[past,window],gaps:[{min:0,max:90,reason:'parent-change'}]});
    expect(trail.sample(89,head(89))).toBeUndefined();
    expect(trail.sample(-150,head(-150))).toBeUndefined();
    expect(trail.sample(201,head(201))?.[0].x).toBeCloseTo(90,10);
  });
  it('bounds refinement and skips curves whose tested points are off screen',async()=>{
    const trail=new RollingTrail(await history());
    expect(trail.sample(201,head(201),p=>({x:p.x*1e10,y:p.y*1e10,visible:true}))!.length).toBeLessThanOrEqual(4096);
    expect(trail.sample(201,head(201),p=>({x:p.x*1e10,y:p.y*1e10,visible:false}))!.length).toBeLessThan(200);
  });
  it('refreshes only when source coverage can actually be extended',async()=>{
    const original=await history();
    const trail=new RollingTrail(original);
    expect(trail.needsRefresh(120)).toBe(false);
    expect(trail.needsRefresh(1000)).toBe(false);
    expect(trail.needsRefresh(1001)).toBe(true);
    expect(trail.needsRefresh(-1)).toBe(true);
    expect(trail.needsRefresh(119)).toBe(true);
    const truncatedWindow={...window,interval:{min:90,max:1000}};
    for(const reason of ['parent-change','coverage','budget'] as const){
      const truncated=new RollingTrail({...original,windows:[truncatedWindow],gaps:[{min:0,max:90,reason}]});
      expect(truncated.needsRefresh(200)).toBe(false);
      expect(truncated.needsRefresh(89)).toBe(true);
    }
  });
});
