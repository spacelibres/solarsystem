import * as THREE from 'three';
import { createArtworkPatch, type ArtworkCatalogue, type ArtworkDefinition } from '../../../eyes/src/custom/constellation-art/registration.js';
import { createArtworkVectorGeometry } from '../../../eyes/src/custom/constellation-art/vector-geometry.js';
const BASE='/eyes/constellation-art/';
interface Dependencies {
    loadCatalogue?: (signal: AbortSignal)=>Promise<ArtworkCatalogue>;
    loadTexture?: (artwork: ArtworkDefinition,signal: AbortSignal)=>Promise<THREE.Texture>;
    loadSvg?: (artwork:ArtworkDefinition,signal:AbortSignal)=>Promise<string>;
    onReady?: ()=>void;
    onError?: (message:string)=>void;
}
async function loadCatalogue(signal:AbortSignal):Promise<ArtworkCatalogue>{
    const response=await fetch(`${BASE}index.json`,{signal});
    if(!response.ok)throw Error(`Constellation artwork HTTP ${response.status}`);
    const catalogue=await response.json() as ArtworkCatalogue;
    if(catalogue.schemaVersion!==1||catalogue.frame!=='ICRS/J2000'||!Array.isArray(catalogue.artworks))throw Error('Invalid constellation artwork catalogue');
    return catalogue;
}
async function loadTexture(artwork:ArtworkDefinition,signal:AbortSignal):Promise<THREE.Texture>{
    if(!/^[a-z0-9_-]+\.svg$/i.test(artwork.file))throw Error('Invalid artwork file');
    const response=await fetch(`${BASE}${artwork.file}`,{signal});
    if(!response.ok)throw Error(`Artwork HTTP ${response.status}: ${artwork.id}`);
    const blob=await response.blob();signal.throwIfAborted();
    const url=URL.createObjectURL(blob),image=new Image();
    try{
        await new Promise<void>((resolve,reject)=>{
            const cleanup=()=>{image.onload=null;image.onerror=null;signal.removeEventListener('abort',abort);};
            const abort=()=>{cleanup();image.src='';reject(signal.reason);};
            image.onload=()=>{cleanup();resolve();};image.onerror=()=>{cleanup();reject(Error(`Artwork decode: ${artwork.id}`));};
            signal.addEventListener('abort',abort,{once:true});image.src=url;
        });
        signal.throwIfAborted();
        // Rasterize vector originals at a bounded GPU size; never upload the full source dimensions.
        const scale=Math.min(1,512/Math.max(artwork.width,artwork.height));
        const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(artwork.width*scale));canvas.height=Math.max(1,Math.round(artwork.height*scale));
        const context=canvas.getContext('2d');if(!context)throw Error('Artwork canvas unavailable');
        context.drawImage(image,0,0,canvas.width,canvas.height);
        const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
        return texture;
    }finally{URL.revokeObjectURL(url);}
}
async function loadSvg(artwork:ArtworkDefinition,signal:AbortSignal):Promise<string>{
    if(!/^[a-z0-9_-]+\.svg$/i.test(artwork.file))throw Error('Invalid artwork file');
    const response=await fetch(`${BASE}${artwork.file}`,{signal});
    if(!response.ok)throw Error(`Artwork HTTP ${response.status}: ${artwork.id}`);
    return response.text();
}
export function createConstellationArt(dependencies:Dependencies={}){
    const group=new THREE.Group();group.name='Western constellation art';group.visible=false;
    const meshes=new Map<string,THREE.Mesh<THREE.BufferGeometry,THREE.ShaderMaterial>>();
    let catalogue:ArtworkCatalogue|undefined,disposed=false,visible=false,running=false,controller:AbortController|undefined,opacity=0;
    const tint=new THREE.Color(1,1,1);
    const start=()=>{
        if(disposed||!visible||running)return;
        running=true;controller=new AbortController();const signal=controller.signal;
        void (async()=>{
            catalogue??=await (dependencies.loadCatalogue??loadCatalogue)(signal);
            if(disposed||signal.aborted)return;
            const queue=catalogue.artworks.filter(artwork=>!meshes.has(artwork.id));
            await Promise.all(Array.from({length:3},async()=>{
                while(queue.length&&!disposed&&!signal.aborted){
                    const artwork=queue.shift()!;
                    try{
                        if(artwork.renderMode==='vector'){
                            const text=await (dependencies.loadSvg??loadSvg)(artwork,signal);
                            if(disposed||signal.aborted)return;
                            const data=createArtworkVectorGeometry(text,artwork);
                            const geometry=new THREE.BufferGeometry();
                            geometry.setAttribute('position',new THREE.BufferAttribute(data.positions,3));geometry.setAttribute('artColor',new THREE.BufferAttribute(data.colors,4));
                            const material=new THREE.ShaderMaterial({transparent:true,depthWrite:false,depthTest:true,side:THREE.DoubleSide,
                                uniforms:{opacity:{value:opacity},tint:{value:tint}},
                                vertexShader:'attribute vec4 artColor;varying vec4 figureColor;void main(){figureColor=artColor;vec3 direction=mat3(viewMatrix)*position;vec4 clip=projectionMatrix*vec4(direction,1.0);gl_Position=vec4(clip.xy,clip.w*.999997,clip.w);}',
                                fragmentShader:'uniform float opacity;uniform vec3 tint;varying vec4 figureColor;void main(){gl_FragColor=vec4(figureColor.rgb*tint,figureColor.a*opacity);}' });
                            const mesh=new THREE.Mesh(geometry,material);mesh.frustumCulled=false;mesh.renderOrder=-3;mesh.raycast=()=>{};group.add(mesh);meshes.set(artwork.id,mesh);
                            await new Promise<void>(resolve=>setTimeout(resolve,0));
                            continue;
                        }
                        const texture=await (dependencies.loadTexture??loadTexture)(artwork,signal);
                        if(disposed||signal.aborted){texture.dispose();return;}
                        let geometry:THREE.BufferGeometry|undefined;
                        try{
                            const patch=createArtworkPatch(artwork);
                            geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(patch.positions,3));geometry.setAttribute('uv',new THREE.BufferAttribute(patch.uvs,2));geometry.setIndex(new THREE.BufferAttribute(patch.indices,1));
                            const material=new THREE.ShaderMaterial({transparent:true,depthWrite:false,depthTest:true,side:THREE.DoubleSide,
                                uniforms:{map:{value:texture},opacity:{value:opacity},tint:{value:tint}},
                                vertexShader:'varying vec2 artUv;void main(){artUv=uv;vec3 direction=mat3(viewMatrix)*position;vec4 clip=projectionMatrix*vec4(direction,1.0);gl_Position=vec4(clip.xy,clip.w*.999997,clip.w);}',
                                fragmentShader:'uniform sampler2D map;uniform float opacity;uniform vec3 tint;varying vec2 artUv;void main(){vec4 art=texture2D(map,artUv);gl_FragColor=vec4(art.rgb*tint,art.a*opacity);}' });
                            const mesh=new THREE.Mesh(geometry,material);mesh.frustumCulled=false;mesh.renderOrder=-3;mesh.raycast=()=>{};group.add(mesh);meshes.set(artwork.id,mesh);
                        }catch(error){geometry?.dispose();texture.dispose();throw error;}
                    }catch(error){if(!disposed&&!signal.aborted)dependencies.onError?.(String(error));}
                }
            }));
            if(!disposed&&!signal.aborted&&meshes.size===catalogue.artworks.length)dependencies.onReady?.();
        })().catch(error=>{if(!disposed&&!signal.aborted)dependencies.onError?.(String(error));}).finally(()=>{
            running=false;
            // Re-enabling during cancellation waits for the previous workers to finish.
            if(signal.aborted&&visible&&!disposed)start();
        });
    };
    return {group,
        setVisible(value:boolean){if(disposed)return;visible=value;if(value){group.visible=true;start();}else controller?.abort();},
        setColor(color:string){tint.set(color).lerp(new THREE.Color(1,1,1),.75);},
        update(delta:number){if(disposed)return;const target=visible ? .22 : 0;opacity+=(target-opacity)*Math.min(1,Math.max(0,delta)*5);for(const mesh of meshes.values())mesh.material.uniforms.opacity.value=opacity;group.visible=visible||opacity>.001;},
        dispose(){if(disposed)return;disposed=true;controller?.abort();for(const mesh of meshes.values()){mesh.geometry.dispose();(mesh.material.uniforms.map?.value as THREE.Texture|undefined)?.dispose();mesh.material.dispose();}meshes.clear();group.clear();group.removeFromParent();},
    };
}
