'use strict';
// Restricted WMTS extraction: no DTD/entities, and only advertised matrices.
const decode = s => s.replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
const blocks = (xml, tag) => [...xml.matchAll(new RegExp('<(?:[\\w.-]+:)?'+tag+'\\b[^>]*>([\\s\\S]*?)<\\/(?:[\\w.-]+:)?'+tag+'\\s*>','g'))].map(m=>m[1]);
const text = (xml,tag) => decode((blocks(xml,tag)[0]??'').trim());
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:.-]+)\s*=\s*(["'])(.*?)\2/g)].map(m=>[m[1],decode(m[3])]));
function parseCapabilities(xml) {
 if (/<!DOCTYPE|<!ENTITY/i.test(xml)) throw new Error('DTD/DOCTYPE is unsupported');
 xml=xml.replace(/<!--[\s\S]*?-->/g,'');
 const contents=blocks(xml,'Contents')[0]; if(!contents)throw new Error('Missing WMTS Contents');
 const layers=blocks(contents,'Layer').map(l=>{
  const resource=[...l.matchAll(/<(?:[\w.-]+:)?ResourceURL\b[^>]*\/?\s*>/g)].map(m=>attrs(m[0])).find(a=>a.resourceType==='tile');
  if(!resource?.template)throw new Error('Missing tile ResourceURL');
  return {id:text(l,'Identifier'),template:resource.template,format:resource.format,style:text(blocks(l,'Style')[0]??'','Identifier'),matrixSetIds:blocks(l,'TileMatrixSetLink').map(b=>text(b,'TileMatrixSet')),dimensions:Object.fromEntries(blocks(l,'Dimension').map(d=>[text(d,'Identifier'),text(d,'Default')]))};
 });
 // A linked TileMatrixSet contains text only; definitions contain matrices.
 const matrixSets=blocks(contents,'TileMatrixSet').filter(s=>blocks(s,'TileMatrix').length).map(s=>({id:text(s,'Identifier'),crs:text(s,'SupportedCRS'),matrices:blocks(s,'TileMatrix').map((m,index)=>{
  const result={id:text(m,'Identifier'),width:Number(text(m,'MatrixWidth')),height:Number(text(m,'MatrixHeight')),tileWidth:Number(text(m,'TileWidth')),tileHeight:Number(text(m,'TileHeight')),index};
  for(const key of ['width','height','tileWidth','tileHeight'])if(!Number.isSafeInteger(result[key])||result[key]<1)throw new Error('Invalid matrix '+key);
  return result;
 })}));
 if(!layers.length||!matrixSets.length)throw new Error('Missing WMTS layers/matrices');
 return {layers,matrixSets};
}
function latestEarthDate(manifest){
 const missing=new Set(manifest.missingDates??[]);
 const date=Object.keys(manifest.availableDates??{}).filter(d=>/^\d{4}-\d{2}-\d{2}$/.test(d)&&!missing.has(d)&&manifest.availableDates[d]?.layerId).sort().at(-1);
 if(!date)throw new Error('No available Earth date');return {date,layerId:manifest.availableDates[date].layerId};
}
function* tileEntries(capabilities,{layerId,matrixSetId,date,maxLevel=Infinity,baseUrl}={}){
 const layer=capabilities.layers.find(l=>l.id===layerId);if(!layer)throw new Error('Unknown WMTS layer '+layerId);
 const matrixId=matrixSetId??(layer.matrixSetIds.length===1?layer.matrixSetIds[0]:null);
 if(!layer.matrixSetIds.includes(matrixId))throw new Error('Unlinked WMTS matrix set');
 const matrixSet=capabilities.matrixSets.find(s=>s.id===matrixId);if(!matrixSet)throw new Error('Missing matrix set');
 for(const m of matrixSet.matrices){if(m.index>maxLevel)continue;
  // Eyes requests level indices, so reject an incompatible advertised ID.
  if(m.id!==String(m.index))throw new Error('Eyes requires numeric contiguous matrix IDs');
  const values={...layer.dimensions,Time:date??layer.dimensions.Time,Style:layer.style,TileMatrixSet:matrixSet.id,TileMatrix:m.id};
  const template=layer.template.replace(/\{([^}]+)\}/g,(whole,key)=>key==='TileRow'||key==='TileCol'?whole:(values[key]??whole));
  if(/\{(?!TileRow\}|TileCol\})/.test(template))throw new Error('Unresolved WMTS template '+template);
  for(let row=0;row<m.height;row++)for(let col=0;col<m.width;col++){
   const value=template.replaceAll('{TileRow}',String(row)).replaceAll('{TileCol}',String(col));
   const url=new URL(value,baseUrl).href;
   if(!/^https?:/.test(url))throw new Error('Unsupported tile URL');
   yield {url,layerId:layer.id,matrixSetId:matrixSet.id,matrixId:m.id,row,col,date:date??null};
  }
 }
}
const escape = s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
function rewriteCapabilities(xml,{date,mapUrl}){
 parseCapabilities(xml);
 let out=xml.replace(/(<(?:[\w.-]+:)?ResourceURL\b[^>]*\btemplate\s*=\s*)(["'])(.*?)\2/g,(all,prefix,quote,url)=>prefix+'"'+escape(mapUrl(decode(url)).replace(/%7B/gi,'{').replace(/%7D/gi,'}'))+'"');
 if(date){if(!/^\d{4}-\d{2}-\d{2}$/.test(date))throw new Error('Invalid snapshot date');
  out=out.replace(/(<(?:[\w.-]+:)?Dimension\b[^>]*>)([\s\S]*?)(<\/(?:[\w.-]+:)?Dimension\s*>)/g,(all,start,body,end)=>{
   if(text(body,'Identifier')!=='Time')return all;
   return start+body.replace(/(<(?:[\w.-]+:)?(?:Default|Value)\b[^>]*>)[\s\S]*?(<\/(?:[\w.-]+:)?(?:Default|Value)\s*>)/g,(_,a,b)=>a+date+b).replace(/(<(?:[\w.-]+:)?Current\b[^>]*>)[\s\S]*?(<\/(?:[\w.-]+:)?Current\s*>)/g,'$1false$2')+end;
  });
 }
 return out;
}
module.exports={parseCapabilities,latestEarthDate,tileEntries,rewriteCapabilities};
