const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const { recoverChunk, rewriteCss } = require('./lib/eyes-recovery.cjs');
const { convertFactory, factoryAst } = require('./lib/native-eyes.cjs');
const ORIGIN = 'https://eyes.nasa.gov/apps/solar-system/';
const source = path.resolve(process.argv[2] || 'artifacts/nasa-reference');
const output = path.resolve('eyes');
const read = name => fs.readFileSync(path.join(source, name), 'utf8');
const chunks = ['preload.js', 'vendors.js', 'app.js'].map(name => recoverChunk(read(name), name));
const modules = new Map(chunks.flatMap(chunk => chunk.modules.map(m => [m.id, { ...m, source: chunk.filename }])));
const known = new Map([[0,'PreloadManager'],[1,'StoryCatalog'],[2,'EntityCatalog'],[3,'PreloadStyles'],[4,'VendorStyles'],[6,'Eyes'],[7,'EyesPublicApi'],[10,'Pioneer'],[11,'PioneerPublicApi'],[12,'Three'],[13,'ThreeCore'],[755,'AppStyles'],[767,'ComponentInfo'],[768,'SettingsOptions'],[772,'ViewClasses'],[920,'SolarSystemPublicApi'],[921,'SolarSystemVersion'],[244,'MomentPrimary'],[779,'MomentSecondary'],[564,'SolarSystemSceneExports']]);
const sourcePaths=new Map([[6,'framework/eyes/index.js'],[7,'framework/eyes/public-api.js'],[10,'engine/pioneer/index.js'],[11,'engine/pioneer/public-api.js'],[12,'vendor/three/index.js'],[13,'vendor/three/core.js'],[920,'app/public-api.js'],[921,'app/version.js'],[767,'app/config/components.js'],[768,'app/config/settings.js'],[772,'app/config/views.js'],[755,'styles/index.js'],[564,'engine/solar-system/public-api.js']]);
const slug = value => value.replace(/[^a-zA-Z0-9_$-]/g, '_');
for (const m of modules.values()) {
  const ast = factoryAst(m.code);
  m.esm = /requireModule\.r\(moduleExports\)/.test(m.code);
  const declaration = ast.program.body.find(n => t.isClassDeclaration(n));
  m.className = declaration?.id?.name;
  m.label = known.get(m.id) || (m.exports.length===1&&m.exports[0]!=='default'?m.exports[0]:null) || m.className || m.exports.find(n => n !== 'default');
  m.emptyStyle = /requireModule\.r\(moduleExports\);?\s*}$/.test(m.code.trim()) && ast.program.body.length===1;
  if (ast.program.body.length === 1 && t.isExpressionStatement(ast.program.body[0])) {
    const expression = ast.program.body[0].expression;
    if (t.isAssignmentExpression(expression) && t.isMemberExpression(expression.left) && t.isIdentifier(expression.left.object,{name:'module'}) && t.isIdentifier(expression.left.property,{name:'exports'})) {
      if (t.isStringLiteral(expression.right) && /^\s*</.test(expression.right.value)) { m.format = 'html'; m.value = expression.right.value; }
      if (t.isCallExpression(expression.right) && t.isMemberExpression(expression.right.callee) && t.isIdentifier(expression.right.callee.object,{name:'JSON'}) && t.isStringLiteral(expression.right.arguments[0])) { m.format = 'json'; m.value = JSON.parse(expression.right.arguments[0].value); }
    }
  }
}
// Recover names from class/template ownership and real assignments to named fields.
for (const m of modules.values()) {
  const ast = factoryAst(m.code);
  const bindings = new Map();
  traverse(ast, { VariableDeclarator(p) { if(t.isIdentifier(p.node.id) && t.isCallExpression(p.node.init) && t.isIdentifier(p.node.init.callee,{name:'requireModule'}) && t.isNumericLiteral(p.node.init.arguments[0])) bindings.set(p.node.id.name,p.node.init.arguments[0].value); } });
  for (const id of m.dependencies) {
    const dep = modules.get(id);
    if (dep?.format === 'html' && m.className) dep.label ||= m.className + 'Template';
    if(dep?.emptyStyle&&m.className)dep.label ||= m.className+'Styles';
  }
  traverse(ast, { AssignmentExpression(p) {
    if(!t.isMemberExpression(p.node.left) || !t.isThisExpression(p.node.left.object) || !t.isIdentifier(p.node.right))return;
    const dep = modules.get(bindings.get(p.node.right.name));
    const name = p.node.left.property.name?.replace(/^_+/,'');
    if(dep && !dep.label && name && name !== 'default') dep.label = name[0].toUpperCase()+name.slice(1);
  } });
}
// These context tables identify two distinct bundled Moment locale trees.
for (const id of [245,780]) {
  const context = modules.get(id);
  const ast = factoryAst(context.code);
  const table = ast.program.body.find(s=>t.isVariableDeclaration(s)&&s.declarations.some(d=>t.isObjectExpression(d.init)))?.declarations.find(d=>t.isObjectExpression(d.init))?.init;
  context.label = 'MomentLocales' + (id===245?'Primary':'Secondary');
  for (const property of table.properties) {
    const locale = property.key.value.replace(/^\.\//,'').replace(/\.js$/,'');
    modules.get(property.value.value).locale = { tree: id===245?'primary':'secondary', name: locale };
  }
}
for (const m of modules.values()) {
  if (!m.label && m.esm && m.dependencies.length) {
    const owner = modules.get(m.dependencies[0]);
    if(owner?.className) m.label=owner.className+'Entry';
  }
  m.label ||= m.locale ? m.locale.name : `Unidentified${m.id}`;
  let folder = m.source === 'vendors.js' ? 'vendor/modules' : 'engine/core';
  if (m.locale) folder = `vendor/moment/${m.locale.tree}/locale`;
  else if (m.format === 'html') folder = 'ui/templates';
  else if (m.format === 'json') folder = 'data';
  else if (m.id === 0 || m.id === 5) folder = 'app';
  else if (/Manager$/.test(m.label)) folder = 'engine/managers';
  else if (/Controller$/.test(m.label)) folder = 'engine/controllers';
  else if (/View$/.test(m.label)) folder = 'ui/views';
  else if(m.emptyStyle)folder='styles/extracted';
  else if (/\.html\s*=/.test(m.code)) folder = 'ui/components';
  else if (/Component$/.test(m.label))folder='engine/components';
  const extension = m.format || (m.esm ? 'js' : 'cjs');
  m.file = sourcePaths.get(m.id) || `${folder}/${slug(m.label)}.${extension}`;
}
const paths = new Map();
for (const m of modules.values()) {
  if(paths.has(m.file.toLowerCase())) { const other=paths.get(m.file.toLowerCase()); if(!other.file.includes(`-${other.id}.`)) other.file=other.file.replace(/(\.[^.]+)$/,`-${other.id}$1`); m.file=m.file.replace(/(\.[^.]+)$/,`-${m.id}$1`); }
  else paths.set(m.file.toLowerCase(),m);
}
const rendered = [];
for (const m of modules.values()) {
  let contents;
  if(m.format==='html')contents=m.value;
  else if(m.format==='json')contents=JSON.stringify(m.value,null,2)+'\n';
  else contents=`// Recovered from ${m.source}:${m.start}-${m.end}.\n`+convertFactory(m.code,m,modules);
  rendered.push([m.file,contents]);
}
if(fs.existsSync(path.join(output,'src'))&&!process.argv.includes('--overwrite'))throw Error('eyes/src exists. Normal builds preserve edits; explicit recovery requires --overwrite.');
for(const [name,contents] of rendered) { const target=path.join(output,'src',name);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,contents); }
fs.mkdirSync(path.join(output,'src/runtime'),{recursive:true});
fs.writeFileSync(path.join(output,'src/runtime/interop.cjs'),`exports.getDefaultExport = value => value && (value.__esModule || value[Symbol.toStringTag] === 'Module') ? () => value.default : () => value;\nexports.nodeModule = module => { module.paths = []; module.children ||= []; return module; };\n`);
fs.writeFileSync(path.join(output,'src/main.js'),`// The loading screen must initialize before the application graph.\nimport './${modules.get(0).file}';\nimport './${modules.get(3).file}';\nimport './${modules.get(4).file}';\nimport './${modules.get(5).file}';\n`);
const shell=path.join(output,'shell');fs.mkdirSync(shell,{recursive:true});
for(const name of ['preload.css','vendors.css','app.css'])fs.writeFileSync(path.join(shell,name),require('esbuild').transformSync(rewriteCss(read(name),new URL(name,ORIGIN)),{loader:'css',minify:false,legalComments:'inline'}).code);
let html=read('index.html').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'');
html=html.replace(/((?:href|src)=['"])(\.\/)?([^'"#]+)(['"])/g,(match,prefix,dot,url,suffix)=> /^(?:https?:|data:|\/)/.test(url)||/^(?:preload|vendors|app)\.css$/.test(url)?match:prefix+new URL(url,ORIGIN).href+suffix);
html=html.replace('</body>',`<script>${read('config.js')}</script><script src="application.js"></script></body>`);
fs.writeFileSync(path.join(shell,'index.html'),html);
const sourceNames=['index.html','config.js','preload.js','vendors.js','app.js','preload.css','vendors.css','app.css'];
const manifest={origin:ORIGIN,offsetEncoding:'UTF-16 code units (Babel AST start/end)',recoveredAt:new Date().toISOString(),sources:sourceNames.map(name=>({name,sha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(source,name))).digest('hex')})),modules:[...modules.values()].map(({id,source,start,end,label,file,esm,format,exports,dependencies})=>({id,source,start,end,label,file,esm,format,exports,dependencies}))};
fs.writeFileSync(path.join(output,'provenance.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(`Native source recovered: ${modules.size} modules, ${[...modules.values()].filter(m=>m.esm).length} ESM, ${[...modules.values()].filter(m=>m.format==='html').length} templates. No webpack runtime emitted.`);
