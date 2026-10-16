import * as THREE from 'three';
import { starBrightness } from '../domain/sky';
interface SkyStar { readonly position:{x:number;y:number;z:number}; readonly color:{r:number;g:number;b:number};readonly magnitude:number;readonly absoluteMagnitude:number; }
/** Same flux, point size and radial falloff as Eyes; adapt +Y Pioneer camera
 * projection to Three's standard -Z camera instead of copying gl_Position.w.
 */
export function createSkyStars(stars:readonly SkyStar[]):THREE.Points<THREE.BufferGeometry,THREE.ShaderMaterial>{
  const positions=new Float32Array(stars.length*3),colors=new Float32Array(stars.length*3),brightness=new Float32Array(stars.length);
  stars.forEach((star,index)=>{
    const length=Math.hypot(star.position.x,star.position.y,star.position.z);
    positions.set([star.position.x/length,star.position.y/length,star.position.z/length],3*index);
    colors.set([star.color.r,star.color.g,star.color.b],3*index);
    brightness[index]=starBrightness(star.absoluteMagnitude,length);
  });
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
  geometry.setAttribute('starColor',new THREE.BufferAttribute(colors,3));
  geometry.setAttribute('brightness',new THREE.BufferAttribute(brightness,1));
  const material=new THREE.ShaderMaterial({transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,depthTest:true,
    uniforms:{particleSize:{value:1}},
    vertexShader:`attribute vec3 starColor;
      attribute float brightness;
      uniform float particleSize;
      varying vec4 lightColor;
      void main(){
        vec3 direction=mat3(viewMatrix)*position;
        vec4 clip=projectionMatrix*vec4(direction,1.0);
        gl_Position=vec4(clip.xy,clip.w*.999999,clip.w);
        lightColor=vec4(starColor,clamp(brightness*particleSize,.05,1.0));
        gl_PointSize=clamp(brightness*4.0*particleSize,5.0,50.0);
      }`,
    fragmentShader:`varying vec4 lightColor;
      void main(){
        float edge=clamp(1.0-2.0*length(gl_PointCoord-vec2(.5)),0.0,1.0);
        gl_FragColor=vec4(lightColor.rgb,lightColor.a*pow(edge,5.0));
      }`,
  });
  const points=new THREE.Points(geometry,material);points.frustumCulled=false;points.renderOrder=-2;
  return points;
}
