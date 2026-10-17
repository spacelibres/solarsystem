import { describe, expect, it } from 'vitest';
import { sampleTrailHistory, sourceTrailDuration } from '../src/solar/domain/trails';
import { FULL_SCENE } from '../src/solar/config/scene-catalog';
import type { EphemerisWindow } from '../src/solar/domain/ephemeris';
const window = (min:number,max:number):EphemerisWindow => ({header:{version:2,pointType:'lin',name:'lin',numberOfDigits:0},source:{path:'fixture',segment:null},interval:{min,max},points:[min,max].map(time=>({kind:'lin',time,position:{x:time,y:2,z:0}}))});
describe('NASA source trail histories',()=>{
    it('retains explicit craft lengths and automatic moon metadata',()=>{
        expect(FULL_SCENE.find(body=>body.id==='sc_iss')?.trail?.length).toBe(5573);
        expect(FULL_SCENE.find(body=>body.id==='sc_hubble_space_telescope')?.trail?.length).toBe(5748.5);
        expect(FULL_SCENE.find(body=>body.id==='phobos')?.trail).toBeDefined();
        expect(FULL_SCENE.find(body=>body.id==='phobos')?.trail?.length).toBeUndefined();
    });
    it('crosses leaf boundaries and pins the newest sample to now',async()=>{
        const calls:number[]=[];
        const history=await sampleTrailHistory({path:'fixture',now:9,phaseStart:0,parentId:'earth',options:{length:8},maxSamples:9,load:async(_,time)=>{calls.push(time);return time>=5?window(5,10):window(0,5);}});
        expect(calls).toHaveLength(2);
        expect(calls[0]).toBe(9);
        expect(calls[1]).toBeLessThan(5);
        expect(history.samples.map(sample=>sample.time)).toEqual([1,2,3,4,5,6,7,8,9]);
        expect(history.samples.at(-1)?.position.x).toBe(9);
        expect(history.gaps).toEqual([]);
    });
    it('never connects over unavailable coverage or a parent phase change',async()=>{
        const history=await sampleTrailHistory({path:'fixture',now:9,phaseStart:2,parentId:'earth',options:{length:9},maxSamples:8,load:async(_,time)=>{if(time<5)throw Error('no-data');return window(5,10);}});
        expect(history.samples[0].time).toBe(5);
        expect(history.gaps.map(gap=>gap.reason)).toEqual(['parent-change','coverage']);
    });
    it('derives automatic non-orb duration from actual position and velocity',()=>{
        expect(sourceTrailDuration(window(0,10),0)).toBeCloseTo(4*Math.PI);
    });
    it('detects a gap even when no sample lands inside it',async()=>{
        const history=await sampleTrailHistory({path:'fixture',now:9,phaseStart:0,parentId:'earth',options:{length:9},maxSamples:4,load:async(_,time)=>time>=5?window(5,10):window(0,4)});
        expect(history.samples.map(sample=>sample.time)).toEqual([6,9]);
        expect(history.gaps).toEqual([{min:4,max:5,reason:'coverage'}]);
    });
    it('walks intervening contiguous leaves when sample spacing skips several leaves',async()=>{
        const calls:number[]=[];
        const history=await sampleTrailHistory({path:'fixture',now:9,phaseStart:0,parentId:'earth',options:{length:9},maxSamples:4,load:async(_,time)=>{calls.push(time);const min=Math.floor(time);return window(min,min+1);}});
        expect(history.samples.map(sample=>sample.time)).toEqual([0,3,6,9]);
        expect(history.gaps).toEqual([]);
        expect(calls.length).toBeGreaterThan(4);
        expect(calls.length).toBeLessThan(15);
    });
    it('bounds leaf traversal and aborts promptly between intervening loads',async()=>{
        let loads=0;
        const request={path:'fixture',now:9,phaseStart:0,parentId:'earth',options:{length:9},maxSamples:4,load:async(_:string,time:number)=>{loads++;return window(Math.floor(time),Math.floor(time)+1);}};
        const history=await sampleTrailHistory({...request,maxLeafLoads:3});
        expect(loads).toBe(3);
        expect(history.gaps.at(-1)?.reason).toBe('budget');
        const controller=new AbortController();loads=0;
        await expect(sampleTrailHistory({...request,signal:controller.signal,load:async(_,time)=>{loads++;if(loads===2)controller.abort();return window(Math.floor(time),Math.floor(time)+1);}})).rejects.toMatchObject({name:'AbortError'});
        expect(loads).toBe(2);
    });
    it('fails explicitly for unsupported rotating reference frames',async()=>{
        const history=await sampleTrailHistory({path:'fixture',now:9,phaseStart:0,parentId:'earth',options:{length:5,relativeToOrientation:true},load:async()=>window(0,10)});
        expect(history.samples).toEqual([]);
        expect(history.gaps[0].reason).toBe('reference-frame');
    });
    it('refines an eccentric real orbital trajectory at the source three-degree threshold',async()=>{
        const period=10000,mu=100000,a=Math.cbrt(mu*(period/(2*Math.PI))**2);
        const point={kind:'orb' as const,semiMajorAxis:a,eccentricity:.85,meanAngularMotion:2*Math.PI/period,meanAnomalyAtEpoch:0,orientation:{w:1,x:0,y:0,z:0}};
        const orbit:EphemerisWindow={header:{version:2,pointType:'orb',name:'orb',numberOfDigits:0,gravitationalParameter1:mu,gravitationalParameter2:0},source:{path:'eccentric',segment:null},interval:{min:0,max:period},points:[{...point,time:0},{...point,time:period}]};
        const request={path:'eccentric',now:period,phaseStart:0,parentId:'earth',options:{length:period},load:async()=>orbit};
        const fixed=await sampleTrailHistory({...request,adaptive:false});
        const refined=await sampleTrailHistory(request);
        expect(fixed.samples).toHaveLength(121);
        expect(refined.samples.length).toBeGreaterThan(121);
        expect(refined.samples.length).toBeLessThanOrEqual(1025);
        expect(refined.samples[0].time).toBe(0);
        expect(refined.samples.at(-1)?.time).toBe(period);
        const maximumAngle=Math.max(...refined.samples.slice(1).map((sample,index)=>{
            const a=sample.velocity,b=refined.samples[index].velocity;
            return Math.acos(Math.max(-1,Math.min(1,(a.x*b.x+a.y*b.y+a.z*b.z)/(Math.hypot(a.x,a.y,a.z)*Math.hypot(b.x,b.y,b.z)))));
        }));
        expect(maximumAngle).toBeLessThanOrEqual(Math.PI/60+1e-12);
        expect(await sourceTrailDuration(orbit,period)).toBeCloseTo(period,5);
        const capped=await sampleTrailHistory({...request,maxSamples:128});
        expect(capped.samples).toHaveLength(128);
    });
});
