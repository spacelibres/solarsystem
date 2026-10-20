import { afterEach,expect,it,vi } from 'vitest';
import { ShapePath,BufferGeometry } from 'three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { createArtworkVectorGeometry } from '../eyes/src/custom/constellation-art/vector-geometry.js';
const artwork={width:100,height:100,anchors:[{pixel:[0,0],direction:[1,0,0]},{pixel:[100,0],direction:[1,.1,0]},{pixel:[0,100],direction:[1,0,.1]}]};
function path(style:Record<string,unknown>){const value=new ShapePath();value.moveTo(10,10);value.lineTo(30,10);value.lineTo(10,30);value.lineTo(10,10);value.userData={style,node:{nodeName:'path',parentNode:null}};return value;}
function parsed(paths:ShapePath[]){vi.spyOn(SVGLoader.prototype,'parse').mockReturnValue({paths,xml:{} as XMLDocument} as ReturnType<SVGLoader['parse']>);}
afterEach(()=>vi.restoreAllMocks());
it('triangulates fill and stroke into independent sky coordinates with original alpha',()=>{
 parsed([path({fill:'#000000',fillOpacity:.5,stroke:'#000000',strokeWidth:1,strokeOpacity:.25,opacity:.8,strokeLineJoin:'round',strokeLineCap:'round',strokeMiterLimit:4})]);
 const dispose=vi.spyOn(BufferGeometry.prototype,'dispose');
 const mesh=createArtworkVectorGeometry('<svg/>',artwork);
 expect(mesh.positions.length).toBeGreaterThan(9);expect(mesh.colors.length).toBe(mesh.positions.length/3*4);
 for(let i=0;i<mesh.positions.length;i+=3)expect(Math.hypot(...mesh.positions.slice(i,i+3))).toBeCloseTo(1,6);
 const alphas=new Set(Array.from(mesh.colors).filter((_,index)=>index%4===3).map(value=>value.toFixed(2)));expect(alphas).toEqual(new Set(['0.40','0.20']));
 for(let i=0;i<mesh.colors.length;i+=4)expect([...mesh.colors.slice(i,i+3)]).toEqual([1,1,1]);
 expect(dispose).toHaveBeenCalled();
});
it('omits invisible and transparent paths and validates curve sampling',()=>{
 parsed([path({fill:'#000',fillOpacity:1,opacity:0}),path({fill:'#000',visibility:'hidden'})]);
 expect(createArtworkVectorGeometry('<svg/>',artwork).positions.length).toBe(0);
 expect(()=>createArtworkVectorGeometry('<svg/>',artwork,{curveSegments:8})).toThrow();
});

it('drops a full-canvas opaque rect frame and multiplies ancestor opacity',()=>{
 const background=new ShapePath();background.moveTo(.2,.2);background.lineTo(99.8,.2);background.lineTo(99.8,99.8);background.lineTo(.2,99.8);background.lineTo(.2,.2);background.userData={style:{fill:'#fff',opacity:1},node:{nodeName:'rect',parentNode:null}};
 const contour=path({fill:'#000',fillOpacity:1,opacity:.5});
 contour.userData.node={nodeName:'path',nodeType:1,getAttribute:(name:string)=>name==='opacity'?'.5':null,parentNode:{nodeType:1,getAttribute:(name:string)=>name==='opacity'?'.4':null,parentNode:null}};
 parsed([background,contour]);const geometry=createArtworkVectorGeometry('<svg/>',artwork);
 expect(geometry.positions.length).toBeGreaterThan(0);
 for(let i=3;i<geometry.colors.length;i+=4)expect(geometry.colors[i]).toBeCloseTo(.2,6);
});
