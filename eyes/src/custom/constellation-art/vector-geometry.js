import { ShapeGeometry } from 'three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { createRegistration } from './registration.js';
const clamp=value=>Math.max(0,Math.min(1,Number.isFinite(value)?value:1));
/** SVGLoader bakes nested SVG transforms into its paths and scales stroke widths.
 * Only numeric buffers cross the boundary between the two Three runtimes. */
export function createArtworkVectorGeometry(svgText,artwork,{curveSegments=32}={}) {
    if(typeof svgText!=='string'||!svgText.trim())throw new TypeError('SVG artwork required');
    if(!Number.isInteger(curveSegments)||curveSegments<32||curveSegments>128)throw new RangeError('SVG curve sampling must be between 32 and 128');
    if(!Number.isFinite(artwork.width)||artwork.width<=0||!Number.isFinite(artwork.height)||artwork.height<=0)throw new RangeError('Invalid artwork dimensions');
    const registration=createRegistration(artwork.anchors),parsed=new SVGLoader().parse(svgText),positions=[],colors=[];
    const maximumEdge=Math.max(artwork.width,artwork.height)/32;
    const appendTriangle=(a,b,c,alpha,depth=0)=>{
        const ab=Math.hypot(a[0]-b[0],a[1]-b[1]),bc=Math.hypot(b[0]-c[0],b[1]-c[1]),ca=Math.hypot(c[0]-a[0],c[1]-a[1]);
        // Subdivision keeps long fill triangles on the same curved celestial patch
        // as the fine outlines, instead of cutting chords across the figure.
        if(depth<12&&Math.max(ab,bc,ca)>maximumEdge){
            if(ab>=bc&&ab>=ca){const mid=[(a[0]+b[0])/2,(a[1]+b[1])/2];appendTriangle(a,mid,c,alpha,depth+1);appendTriangle(mid,b,c,alpha,depth+1);}
            else if(bc>=ca){const mid=[(b[0]+c[0])/2,(b[1]+c[1])/2];appendTriangle(a,b,mid,alpha,depth+1);appendTriangle(a,mid,c,alpha,depth+1);}
            else {const mid=[(c[0]+a[0])/2,(c[1]+a[1])/2];appendTriangle(a,b,mid,alpha,depth+1);appendTriangle(mid,b,c,alpha,depth+1);}
            return;
        }
        for(const point of [a,b,c]){positions.push(...registration(point[0],point[1]));colors.push(1,1,1,alpha);}
    };
    const appendGeometry=(geometry,alpha)=>{
        if(!geometry)return;
        let flat;
        try{
            flat=geometry.index?geometry.toNonIndexed():geometry;
            const attribute=flat.getAttribute('position');
            for(let i=0;i<attribute.count;i+=3){
                const points=[0,1,2].map(offset=>[attribute.getX(i+offset),attribute.getY(i+offset)]);
                appendTriangle(points[0],points[1],points[2],alpha);
            }
        }finally{if(flat&&flat!==geometry)flat.dispose();geometry.dispose();}
    };
    for(const path of parsed.paths){
        const style=path.userData.style;
        if(style.visibility==='hidden'||style.visibility==='collapse')continue;
        let node=path.userData.node,explicitOpacity=1,hasOpacity=false,hidden=false;
        while(node&&node.nodeType!==9){
            const display=node.style?.display||node.getAttribute?.('display');
            if(display==='none')hidden=true;
            const value=node.style?.opacity||node.getAttribute?.('opacity');
            if(value!==undefined&&value!==null&&value!==''){explicitOpacity*=clamp(Number(value));hasOpacity=true;}
            node=node.parentNode;
        }
        const opacity=hasOpacity?explicitOpacity:clamp(style.opacity??1);if(hidden||opacity===0)continue;
        const fillAlpha=opacity*clamp(style.fillOpacity??1),strokeAlpha=opacity*clamp(style.strokeOpacity??1);
        let background=false;
        if(path.userData.node?.nodeName==='rect'&&fillAlpha>.95){
            const points=path.subPaths.flatMap(subpath=>subpath.getPoints(curveSegments));
            const minX=Math.min(...points.map(point=>point.x)),maxX=Math.max(...points.map(point=>point.x)),minY=Math.min(...points.map(point=>point.y)),maxY=Math.max(...points.map(point=>point.y));
            background=minX<=artwork.width*.02&&minY<=artwork.height*.02&&maxX>=artwork.width*.98&&maxY>=artwork.height*.98;
        }
        if(background)continue;
        if(style.fill&&style.fill!=='none'&&fillAlpha>0){
            // SVGLoader.createShapes delegates to toShapes in the installed Three;
            // use its replacement to avoid the r185 deprecation warning.
            for(const shape of path.toShapes())appendGeometry(new ShapeGeometry(shape,curveSegments),fillAlpha);
        }
        if(style.stroke&&style.stroke!=='none'&&style.strokeWidth>0&&strokeAlpha>0){
            for(const subpath of path.subPaths)appendGeometry(SVGLoader.pointsToStroke(subpath.getPoints(curveSegments),style,8),strokeAlpha);
        }
    }
    return {positions:new Float32Array(positions),colors:new Float32Array(colors)};
}
