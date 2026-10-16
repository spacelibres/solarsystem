const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');
function recoverChunk(source, filename) {
 const ast=parser.parse(source,{sourceType:'unambiguous'});
 let payload;
 traverse(ast,{CallExpression(p){const n=p.node;if(t.isMemberExpression(n.callee)&&t.isIdentifier(n.callee.property,{name:'push'})&&t.isArrayExpression(n.arguments[0])&&t.isArrayExpression(n.arguments[0].elements[0])){if(payload)throw Error('Multiple chunks in '+filename);payload=n.arguments[0];}}});
 if(!payload)throw Error('No webpack chunk in '+filename);
 const table=payload.elements[1];
 const entries=t.isArrayExpression(table)?table.elements.map((node,id)=>({node,id})):table.properties.map(p=>({node:p.value,id:Number(p.key.value??p.key.name)}));
 const modules=[];
 for(const {node,id} of entries){
  if(!node)continue;
  if(!t.isFunctionExpression(node)&&!t.isArrowFunctionExpression(node))throw Error('Unsupported module '+id);
  const start=node.start,end=node.end;
  const file=t.file(t.program([t.expressionStatement(t.cloneNode(node,true))]));
  let dependencies=[],exports=[];
  traverse(file,{FunctionExpression(p){if(p.parentPath.isExpressionStatement()){
   const names=['module','moduleExports','requireModule'];
   p.node.params.forEach((param,index)=>{if(t.isIdentifier(param)&&names[index]){let name=names[index];if(p.scope.hasBinding(name)&&name!==param.name)name=p.scope.generateUidIdentifier(name).name;p.scope.rename(param.name,name);}});
   const requireName=p.node.params[2]?.name;
   p.traverse({CallExpression(q){const c=q.node;if(requireName&&t.isIdentifier(c.callee,{name:requireName})&&q.scope.getBinding(requireName)===p.scope.getBinding(requireName)&&t.isNumericLiteral(c.arguments[0]))dependencies.push(c.arguments[0].value);
    if(requireName&&t.isMemberExpression(c.callee)&&t.isIdentifier(c.callee.object,{name:requireName})&&t.isIdentifier(c.callee.property,{name:'d'})&&t.isObjectExpression(c.arguments[1]))exports.push(...c.arguments[1].properties.map(x=>x.key?.name??x.key?.value).filter(Boolean));
   }});
  }}});
  traverse(file,{StringLiteral(p){
   const value=p.node.value;
   if(value.includes('<'))p.node.value=value.replace(/((?:src|href)=['"])(?:\.\/)?(assets\/[^'"]+)(['"])/g,(_,prefix,url,suffix)=>prefix+new URL(url,'https://eyes.nasa.gov/apps/solar-system/').href+suffix);
   if(['descriptions/','events/','stories/'].includes(value))p.node.value=new URL(value,'https://eyes.nasa.gov/apps/solar-system/').href;
   else if(value==='autoplay.json')p.node.value='https://eyes.nasa.gov/apps/solar-system/autoplay.json';
   else if(/^(?:\.\/)?assets\//.test(value)&&!p.parentPath.isBinaryExpression())p.node.value=new URL(value,'https://eyes.nasa.gov/apps/solar-system/').href;
   else if(p.parentPath.isCallExpression()&&t.isMemberExpression(p.parent.callee)&&t.isIdentifier(p.parent.callee.object,{name:'JSON'})&&t.isIdentifier(p.parent.callee.property,{name:'parse'})){
    try{const data=JSON.parse(value);const visit=x=>{if(!x||typeof x!=='object')return;for(const key of Object.keys(x)){if(typeof x[key]==='string'&&/^(?:\.\/)?assets\//.test(x[key]))x[key]=new URL(x[key],'https://eyes.nasa.gov/apps/solar-system/').href;else visit(x[key]);}};visit(data);p.node.value=JSON.stringify(data);}catch{/* Not a literal JSON payload. */}
   }
  }});
  const code=generate(file.program.body[0].expression,{comments:true,compact:false}).code;
  modules.push({id,start,end,code,exports:[...new Set(exports)],dependencies:[...new Set(dependencies)]});
 }
 return {filename,ids:payload.elements[0].elements.map(n=>n.value),modules,runtime:payload.elements[2]?generate(payload.elements[2]).code:null};
}
function rewriteCss(css,url){return css.replace(/url\(\s*(['"]?)([^)'"\s]+)\1\s*\)/g,(match,quote,path)=>/^(data:|https?:|#|\/\/)/.test(path)?match:`url(${JSON.stringify(new URL(path,url).href)})`);}
module.exports={recoverChunk,rewriteCss};
