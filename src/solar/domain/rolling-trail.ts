import { evaluateEphemeris, type EphemerisWindow, type Vec3 } from './ephemeris';
import type { TrailHistory, TrailSample } from './trails';

type Project = (position: Vec3) => { x: number; y: number; visible: boolean };
const MAX_POINTS = 4096;

/** Absolute source-time knots survive clock movement; only the clipped ends move. */
export class RollingTrail {
  private readonly duration: number;
  private readonly step: number;
  private readonly anchor: number;
  private readonly windows: readonly EphemerisWindow[];
  private readonly cache = new Map<number, Vec3>();
  private readonly min: number;
  private readonly max: number;
  private readonly phaseMin: number;

  constructor(private readonly history: TrailHistory) {
    this.duration = history.end-history.requestedStart;
    this.step = this.duration/120;
    this.anchor = history.requestedStart;
    const candidates=[...(history.windows ?? [])].sort((a,b)=>a.interval.min-b.interval.min);
    const current=candidates.findIndex(window=>window.interval.min<=history.end&&history.end<=window.interval.max);
    let first=current,last=current;
    if(current>=0){
      while(first>0&&candidates[first-1].interval.max>=candidates[first].interval.min-Math.max(1,Math.abs(candidates[first].interval.min))*Number.EPSILON)first--;
      while(last<candidates.length-1&&candidates[last].interval.max>=candidates[last+1].interval.min-Math.max(1,Math.abs(candidates[last+1].interval.min))*Number.EPSILON)last++;
    }
    this.windows=current<0?[]:candidates.slice(first,last+1);
    this.min = Math.min(...this.windows.map(window=>Math.max(window.interval.min,window.points[0].time)));
    this.max = Math.max(...this.windows.map(window=>Math.min(window.interval.max,window.points.at(-1)!.time)));
    this.phaseMin = Math.max(-Infinity,...history.gaps.filter(gap=>gap.reason==='parent-change').map(gap=>gap.max));
    for (const sample of history.samples) this.cache.set(sample.time,sample.position);
  }

  needsRefresh(now: number): boolean {
    if(!Number.isFinite(now)||now<this.min||now>this.max)return true;
    const truncated=this.history.gaps.some(gap=>gap.reason==='coverage'||gap.reason==='parent-change'||gap.reason==='budget');
    return !truncated&&Math.max(this.phaseMin,now-this.duration)<this.min;
  }

  private position(time: number): Vec3 | undefined {
    const cached = this.cache.get(time);
    if (cached) return cached;
    const window = this.windows.find(candidate=>candidate.interval.min<=time && time<=candidate.interval.max && candidate.points[0].time<=time && time<=candidate.points.at(-1)!.time);
    if (!window) return;
    const points=window.points;
    let lower=0,upper=points.length-2;
    while(lower<upper){const middle=Math.ceil((lower+upper)/2);if(points[middle].time<=time)lower=middle;else upper=middle-1;}
    // Loaded windows have already been validated. Evaluate just the selected
    // physical record pair rather than validating a whole leaf every frame.
    const state=evaluateEphemeris({...window,points:[points[lower],points[lower+1]]},time,{body:this.history.body});
    if(state.status!=='ready'||state.kind!=='position')return;
    this.cache.set(time,state.position);
    return state.position;
  }

  sample(now: number, head: TrailSample, project?: Project): readonly Vec3[] | undefined {
    if(!Number.isFinite(now)||!(this.duration>0)||!Number.isFinite(this.duration)||now<this.phaseMin||now<this.min||now>this.max)return;
    const start=Math.max(now-this.duration,this.phaseMin,this.min);
    const tail=this.position(start);
    if(!tail)return;
    const knots: TrailSample[]=[{time:start,position:tail,velocity:head.velocity}];
    const times=new Set<number>();
    for(const sample of this.history.samples)if(sample.time>start&&sample.time<now)times.add(sample.time);
    const first=Math.floor((start-this.anchor)/this.step)+1;
    for(let index=first;this.anchor+index*this.step<now && times.size<MAX_POINTS-2;index++)times.add(this.anchor+index*this.step);
    for(const time of [...times].sort((a,b)=>a-b)){
      const position=this.position(time);
      if(!position)return;
      knots.push({time,position,velocity:head.velocity});
    }
    knots.push({...head,time:now});
    const output:Vec3[]=[tail];
    let remaining=MAX_POINTS-knots.length;
    const refine=(a:TrailSample,b:TrailSample,depth:number):void=>{
      if(project&&depth<20&&remaining>0){
        const time=(a.time+b.time)/2,position=this.position(time);
        if(position&&time>a.time&&time<b.time){
          const pa=project(a.position),pb=project(b.position),pm=project(position);
          const error=Math.hypot(pm.x-(pa.x+pb.x)/2,pm.y-(pa.y+pb.y)/2);
          if((pa.visible||pb.visible||pm.visible)&&error>.25){
            remaining--;
            const middle={time,position,velocity:head.velocity};
            refine(a,middle,depth+1);refine(middle,b,depth+1);return;
          }
        }
      }
      output.push(b.position);
    };
    for(let index=1;index<knots.length;index++)refine(knots[index-1],knots[index],0);
    // Refinement and date jumps must not grow retained state without bound.
    if(this.cache.size>MAX_POINTS*2){
      this.cache.clear();
      for(const knot of knots)this.cache.set(knot.time,knot.position);
    }
    return output;
  }
}
