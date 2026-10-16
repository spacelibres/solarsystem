import { rotateByQuat, type Vec3 } from '../../lib/dynamo/math';

export const ECLIPTIC_TO_J2000 = { w:.9791532214288992, x:.2031230389823101, y:0, z:0 };
export interface Constellation {
  readonly name: string;
  readonly stars: readonly Vec3[];
  readonly segments: readonly number[];
  readonly label: Vec3;
}
/** ConstellationsComponent's byte/string/RGBA/count/float32/index sequence. */
export function parseConstellations(buffer: ArrayBuffer): readonly Constellation[] {
  const view=new DataView(buffer); let offset=0;
  const requireBytes=(count:number)=>{if(offset+count>view.byteLength)throw new Error('Truncated constellation record');};
  const byte=()=>{requireBytes(1);return view.getUint8(offset++);};
  const float=()=>{requireBytes(4);const value=view.getFloat32(offset,true);offset+=4;if(!Number.isFinite(value))throw new Error('Invalid constellation position');return value;};
  const result:Constellation[]=[];
  while(offset<view.byteLength){
    const length=byte();requireBytes(length);
    const name=new TextDecoder().decode(new Uint8Array(buffer,offset,length));offset+=length;
    for(let channel=0;channel<4;channel++)byte();
    const count=byte(),stars:Vec3[]=[];
    for(let index=0;index<count;index++){
      const first=float(),second=float(),third=float();
      stars.push(rotateByQuat({x:third,y:-first,z:second},ECLIPTIC_TO_J2000));
    }
    const indices=2*byte(),segments:number[]=[];
    for(let index=0;index<indices;index++){const value=byte();if(value>=count)throw new Error('Invalid constellation segment index');segments.push(value);}
    const radius=stars[0]?Math.hypot(stars[0].x,stars[0].y,stars[0].z):0;
    const min={x:Infinity,y:Infinity,z:Infinity},max={x:-Infinity,y:-Infinity,z:-Infinity};
    for(const star of stars){
      const distance=Math.hypot(star.x,star.y,star.z);if(distance===0)throw new Error('Invalid zero constellation position');
      for(const axis of ['x','y','z'] as const){const value=star[axis]*radius/distance;min[axis]=Math.min(min[axis],value);max[axis]=Math.max(max[axis],value);}
    }
    result.push({name,stars,segments,label:count?{x:(min.x+max.x)/2,y:(min.y+max.y)/2,z:(min.z+max.z)/2}:{x:0,y:0,z:0}});
  }
  return result;
}
/** Float64 avoids GPU overflow of the most distant stars' distance squared. */
export function starBrightness(absoluteMagnitude:number,distanceKm:number):number{
  if(!Number.isFinite(absoluteMagnitude)||!Number.isFinite(distanceKm)||distanceKm<=0)throw new Error('Invalid star luminosity input');
  const flux=3.0128e28*10**(-absoluteMagnitude/2.5)/(4*Math.PI*distanceKm*distanceKm);
  return 2*Math.log1p(flux*1e4);
}
