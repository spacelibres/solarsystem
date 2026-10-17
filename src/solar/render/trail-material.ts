import { AdditiveBlending, InstancedBufferAttribute } from 'three';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import type { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';

/** Source TrailShader indexes points rather than elapsed time or arc length. */
export function setTrailProgress(geometry: LineGeometry, pointCount: number): void {
    const start = new Float32Array(Math.max(0,pointCount-1)), end = new Float32Array(start.length);
    for (let index=0;index<start.length;index++) { start[index]=index/(pointCount-1); end[index]=(index+1)/(pointCount-1); }
    geometry.setAttribute('trailStart',new InstancedBufferAttribute(start,1));
    geometry.setAttribute('trailEnd',new InstancedBufferAttribute(end,1));
}
export function createTrailMaterial(color: number = 0xffffff, opacity = .35): LineMaterial {
    const material = new LineMaterial({color,linewidth:2,opacity,transparent:true,depthWrite:false,blending:AdditiveBlending});
    material.uniforms.trailWidthMin = {value:0};
    material.uniforms.trailWidthMax = {value:2};
    material.onBeforeCompile = shader => {
        shader.uniforms.trailWidthMin=material.uniforms.trailWidthMin;
        shader.uniforms.trailWidthMax=material.uniforms.trailWidthMax;
        shader.vertexShader=shader.vertexShader.replace('void main() {',`attribute float trailStart;
attribute float trailEnd;
uniform float trailWidthMin;
uniform float trailWidthMax;
varying float trailU;
void main() {
trailU = position.y < 0.5 ? trailStart : trailEnd;`)
            .replace('offset *= linewidth;','offset *= mix(trailWidthMin,trailWidthMax,trailU) * max(1.0,min(resolution.x,resolution.y)/800.0);');
        shader.fragmentShader=shader.fragmentShader.replace('void main() {','varying float trailU;\nvoid main() {')
            .replace('gl_FragColor = vec4( diffuseColor.rgb, alpha );','gl_FragColor = vec4( diffuseColor.rgb, alpha * trailU );');
    };
    material.customProgramCacheKey=()=> 'eyes-tapered-trail-v1';
    return material;
}
export function setTrailHover(material: LineMaterial, hovered: boolean, opacity = .35): void {
    material.uniforms.trailWidthMin.value=hovered?2:0;
    material.uniforms.trailWidthMax.value=hovered?4:2;
    material.opacity=hovered?1:opacity;
}
