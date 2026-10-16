/* Recover executable module boundaries, retaining webpack's live export semantics. */
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const {recoverChunk,rewriteCss}=require('./lib/eyes-recovery.cjs');
const {build}=require('esbuild');
const base='https://eyes.nasa.gov/apps/solar-system/';
const sourceDir=path.resolve(process.argv[2]||'artifacts/nasa-reference');
const output=path.resolve('deobf/project');
const shell=['index.html','config.js','commons.js','preload.js','vendors.js','app.js','preload.css','vendors.css','app.css'];
async function main(){
 fs.mkdirSync(sourceDir,{recursive:true});
 for(const name of shell)if(!fs.existsSync(path.join(sourceDir,name))){const res=await fetch(new URL(name,base));if(!res.ok)throw Error(`${name}: HTTP ${res.status}`);fs.writeFileSync(path.join(sourceDir,name),Buffer.from(await res.arrayBuffer()));}
 const read=name=>fs.readFileSync(path.join(sourceDir,name),'utf8');
 const chunks=['preload.js','vendors.js','app.js'].map(name=>recoverChunk(read(name),name));
 const all=chunks.flatMap(c=>c.modules);const ids=new Set();
 for(const m of all){if(ids.has(m.id))throw Error('Duplicate module '+m.id);ids.add(m.id);}
 for(const m of all)for(const dep of m.dependencies)if(!ids.has(dep))throw Error(`Missing dependency ${dep} of ${m.id}`);
 const src=path.join(output,'src');fs.mkdirSync(path.join(src,'modules'),{recursive:true});
 const manifest={origin:base,capturedAt:new Date().toISOString(),sources:shell.map(name=>({name,sha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(sourceDir,name))).digest('hex')})),modules:[]};
 for(const chunk of chunks){
  const imports=[],registry=[];
  for(const m of chunk.modules){const label=(m.exports[0]||'module').replace(/[^a-zA-Z0-9_-]/g,'_');const file=`modules/${String(m.id).padStart(4,'0')}-${label}.js`;fs.writeFileSync(path.join(src,file),`// Recovered from ${chunk.filename}:${m.start}-${m.end}; module ${m.id}.\nexport default ${m.code};\n`);imports.push(`import factory${m.id} from './${file}';`);registry.push(`${m.id}: factory${m.id}`);const {code,...metadata}=m;manifest.modules.push({...metadata,source:chunk.filename,file});}
  fs.writeFileSync(path.join(src,chunk.filename),`${imports.join('\n')}\n(self.webpackChunksolar_system=self.webpackChunksolar_system||[]).push([${JSON.stringify(chunk.ids)},{${registry.join(',')}},${chunk.runtime||'undefined'}]);\n`);
 }
 // Preserve the original compatibility runtime, while resolving its emitted asset URLs at NASA.
 const parser=require('@babel/parser'),generate=require('@babel/generator').default;
 const runtime=read('commons.js').replace('n.p=e','n.p='+JSON.stringify(base));
 fs.writeFileSync(path.join(src,'runtime.js'),generate(parser.parse(runtime),{compact:false}).code);
 fs.writeFileSync(path.join(src,'entry.js'),"import './runtime.js';\nimport './preload.js';\nimport './vendors.js';\nimport './app.js';\n");
 fs.writeFileSync(path.join(output,'manifest.json'),JSON.stringify(manifest,null,2));
 fs.writeFileSync(path.join(output,'package.json'),JSON.stringify({name:'recovered-nasa-eyes-solar-system',private:true,type:'module',scripts:{build:'node build.mjs'},devDependencies:{esbuild:'0.28.2'}},null,2));
 fs.writeFileSync(path.join(output,'build.mjs'),"import { build } from 'esbuild';\nimport { cpSync, mkdirSync } from 'node:fs';\nmkdirSync('dist',{recursive:true});\ncpSync('shell','dist',{recursive:true});\nawait build({entryPoints:['src/entry.js'],bundle:true,format:'iife',outfile:'dist/application.js',sourcemap:true,minify:false,keepNames:true,target:'es2020'});\n");
 const dist=path.join(output,'dist');fs.mkdirSync(dist,{recursive:true});
 await build({entryPoints:[path.join(src,'entry.js')],bundle:true,format:'iife',outfile:path.join(dist,'application.js'),sourcemap:true,minify:false,keepNames:true,target:'es2020'});
 for(const name of ['preload.css','vendors.css','app.css'])fs.writeFileSync(path.join(dist,name),rewriteCss(read(name),new URL(name,base)));
 let html=read('index.html').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'');
 html=html.replace(/((?:href|src)=['"])(\.\/?assets\/|assets\/)([^'"]+)(['"])/g,(_,a,b,c,d)=>a+base+'assets/'+c+d);
 html=html.replace(/((?:href|src)=['"])(\.\/)?(favicon[^'"]*|apple[^'"]*|android[^'"]*|(?:site\.webmanifest|manifest[^'"]*)|safari[^'"]*)(['"])/g,(_,a,b,c,d)=>a+base+c+d);
 html=html.replace(/<\/body>/i,`<script>${read('config.js')}</script><script src="application.js"></script></body>`);
 fs.writeFileSync(path.join(dist,'index.html'),html);
 const shellDir=path.join(output,'shell');fs.mkdirSync(shellDir,{recursive:true});for(const name of ['index.html','preload.css','vendors.css','app.css'])fs.copyFileSync(path.join(dist,name),path.join(shellDir,name));
 const publicDir=path.resolve('public/eyes');fs.mkdirSync(publicDir,{recursive:true});fs.cpSync(dist,publicDir,{recursive:true});
 console.log(`Recovered ${all.length} modules; all numeric dependencies resolved. Project: ${output}`);
}
main().catch(error=>{console.error(error);process.exitCode=1;});
