#!/usr/bin/env node
/** Reproducible source ledger. Never runs recovery or rewrites executable ASTs. */
const fs=require('node:fs');
const path=require('node:path');
const cp=require('node:child_process');
const crypto=require('node:crypto');
const {analyzeJavaScript,analyzeTemplate,semanticHash}=require('./lib/eyes-analysis.cjs');
const root=path.resolve(__dirname,'..');
const out=path.join(root,'docs/eyes-analysis');
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const read=f=>fs.readFileSync(path.join(root,f),'utf8').replace(/\r\n/g,'\n');
const tracked=cp.execFileSync('git',['ls-files','eyes'],{cwd:root,encoding:'utf8'}).trim().split(/\r?\n/).filter(Boolean).sort();
const js=f=>/\.(?:[cm]?js)$/.test(f);
const provenance=JSON.parse(read('eyes/provenance.json'));
const origins=new Map(provenance.modules.map(m=>['eyes/src/'+m.file,m]));
const notes={};
for(const domain of ['application','engine','vendor']){
 const file=path.join(out,domain+'-notes.json');
 if(!fs.existsSync(file))throw Error('Missing semantic review: '+file);
 Object.assign(notes,JSON.parse(fs.readFileSync(file,'utf8')).files);
}
const support={
 'eyes/README.md':'独立工程入口、开发命令及恢复边界说明',
 'eyes/THIRD_PARTY_LICENSES.txt':'原始第三方许可告知；新增注释不得替代上游版权',
 'eyes/decoders/manifest.json':'12 个解码器资源的原始 URL、固定版本、字节数及 SHA-256 校验清单',
 'eyes/package.json':'独立 Eyes 工程脚本及构建期依赖声明',
 'eyes/package-lock.json':'独立工程构建依赖的精确解析锁定，不代表原始 bundle 的库版本',
 'eyes/provenance.json':'1087 个恢复模块的 bundle 来源、UTF-16 字符区间与依赖映射',
 'eyes/scripts/audit.mjs':'静态检查来源模块、导入路径大小写以及遗留 webpack/factory 调用；不证明全部运行时等价',
 'eyes/scripts/build.mjs':'从可编辑 src 编译 ESM/CJS/HTML，校验解码器并发布 dist/public；正常构建不运行恢复',
 'eyes/scripts/decoder-cache.mjs':'按清单验证本地解码器的大小、摘要和 WASM 头，缺失时下载并原子写入',
 'eyes/scripts/dev-next.mjs':'启动 Eyes 监听构建与 Next 开发子进程；信号退出时释放监听器',
 'eyes/scripts/serve.mjs':'提供独立工程 HTTP 开发服务器及 MIME/路径限制，伴随源码监听构建',
 'eyes/shell/index.html':'应用宿主 DOM、配置及启动脚本；保持 NASA 原界面容器',
 'eyes/shell/app.css':'从应用 bundle 提取的实际业务界面 CSS',
 'eyes/shell/preload.css':'从预加载 bundle 提取的加载/嵌入界面 CSS',
 'eyes/shell/vendors.css':'第三方组件的实际 CSS；不是 styles 中的空 JS 占位'
};
const one=v=>String(v??'').replace(/\s+/g,' ').replace(/\*\//g,'* /');
const clip=(v,n=700)=>one(v).length>n?one(v).slice(0,n).trimEnd()+'…':one(v).trimEnd();
const md=v=>one(v).replace(/\|/g,'\\|').replace(/`/g,'ˋ');
const code=v=>'`'+md(v)+'`';
const join=(a,limit=Infinity)=>a?.length?a.slice(0,limit).map(code).join('、')+(a.length>limit?`（另 ${a.length-limit} 项，见索引）`:''):'—';
const anchor=f=>'file-'+f.replace(/[^a-zA-Z0-9_-]/g,'-');
const link=(f,line)=>`[源码${line?':'+line:''}](../../${f}${line?'#L'+line:''})`;
function methodNote(cls,note,m){
 const exact=note?.methods?.[(m.static?'static:':'instance:')+m.kind+':'+m.name] ||
  (cls.methods.filter(x=>x.name===m.name&&x.kind===m.kind).length===1?note?.methods?.[m.kind+':'+m.name]:null);
 const value=exact||(cls.methods.filter(x=>x.name===m.name).length===1?note?.methods?.[m.name]:null);
 const description=typeof value==='string'?value:value?.purpose;
 return description?.replace(/\s*源码 eyes\/[^\s]+:\d+；参数[\s\S]*$/,'');
}
function inventory(){
 const files=tracked.map(file=>{
  const source=read(file); const record={file,bytes:Buffer.byteLength(source),sha256:sha(source),purpose:notes[file]?.purpose||support[file]||'待补充职责',confidence:notes[file]?.confidence||'observed',origin:origins.get(file)||null};
  if(js(file))Object.assign(record,analyzeJavaScript(source,file),{semanticHash:semanticHash(source,file)});
  else if(file.endsWith('.html'))record.template=analyzeTemplate(source);
  else if(file.endsWith('.json')){const value=JSON.parse(source);record.data={kind:Array.isArray(value)?'array':typeof value,entries:Array.isArray(value)?value.length:Object.keys(value).length,keys:Array.isArray(value)?[]:Object.keys(value)};}
  return record;
 });
 const map=new Map(files.map(f=>[f.file,f]));
 for(const f of files){f.dependencies=[];f.dependents=[];}
 for(const f of files)for(const i of [...(f.imports||[]),...(f.exports||[]).filter(e=>e.source)]){
  if(!i.source.startsWith('.'))continue;
  const resolved=path.posix.normalize(path.posix.join(path.posix.dirname(f.file),i.source));
  if(map.has(resolved)){if(!f.dependencies.includes(resolved))f.dependencies.push(resolved);if(!map.get(resolved).dependents.includes(f.file))map.get(resolved).dependents.push(f.file);}
 }
 const resolve=(file,relative)=>path.posix.normalize(path.posix.join(path.posix.dirname(file),relative));
 function exported(file,name,visited=new Set()){
  const id=file+'#'+name;if(visited.has(id))return null;visited.add(id);
  const f=map.get(file);if(!f)return null;
  for(const e of f.exports||[]){
   if(e.exported!==name&&e.exported!=='*')continue;
   if(e.source){const found=exported(resolve(file,e.source),e.exported==='*'?name:e.local,visited);if(found)return found;}
   else{
    let local=e.local;const aliases=new Set();while(f.aliases?.[local]&&!aliases.has(local)){aliases.add(local);local=f.aliases[local];}
    const c=f.classes?.find(c=>c.name===local||c.binding===local);
    if(c)return {file,className:c.name,line:c.line};
    for(const imp of f.imports||[])for(const b of imp.bindings)if(b.local===local){const found=exported(resolve(file,imp.source),b.imported,visited);if(found)return found;}
   }
  }return null;
 }
 for(const f of files)for(const c of f.classes||[]){
  c.parentResolved=null;if(!c.extends)continue;
  const parts=c.extends.split('.');
  const own=f.classes.find(p=>p.name===c.extends||p.binding===c.extends);
  if(own)c.parentResolved={file:f.file,className:own.name,line:own.line};
  else for(const imp of f.imports||[])for(const b of imp.bindings)if(b.local===parts[0])c.parentResolved=exported(resolve(f.file,imp.source),b.imported==='*'?parts[1]:b.imported);
 }
 // Strongly connected groups expose actual import entanglement, without flattening ESM evaluation.
 let sequence=0;const stack=[],active=new Set(),positions=new Map(),low=new Map(),cycles=[];
 function visit(file){
  positions.set(file,sequence);low.set(file,sequence++);stack.push(file);active.add(file);
  for(const next of map.get(file).dependencies){
   if(!positions.has(next)){visit(next);low.set(file,Math.min(low.get(file),low.get(next)));}
   else if(active.has(next))low.set(file,Math.min(low.get(file),positions.get(next)));
  }
  if(low.get(file)===positions.get(file)){
   const members=[];let next;do{next=stack.pop();active.delete(next);members.push(next);}while(next!==file);
   if(members.length>1||map.get(file).dependencies.includes(file))cycles.push(members.sort());
  }
 }
 for(const f of files)if(!positions.has(f.file))visit(f.file);
 cycles.sort((a,b)=>b.length-a.length||a[0].localeCompare(b[0],'en'));
 const counts={files:files.length,javascript:files.filter(f=>js(f.file)).length,classes:files.reduce((n,f)=>n+(f.classes?.length||0),0),methods:files.reduce((n,f)=>n+(f.classes||[]).reduce((a,c)=>a+c.methods.length,0),0),shortBindings:files.reduce((n,f)=>n+(f.shortBindings?.length||0),0),templates:files.filter(f=>f.template).length};
 const missing=files.filter(f=>f.purpose==='待补充职责');
 if(missing.length)throw Error('Missing semantic file review: '+missing.map(f=>f.file).join(', '));
 return {schema:1,scope:'git ls-files eyes; excludes generated output, node_modules and decoder binaries',counts,cycles,files};
}
function annotations(index){
 let annotated=0,classes=0;const before={};
 for(const f of index.files){
  if(!js(f.file))continue;
  const original=read(f.file);before[f.file]=f.semanticHash;
  // Only our delimited comments are replaceable. Preserve upstream notices and recovered origins.
  const source=original.replace(/\/\*\* @eyes-analysis[\s\S]*?\*\/\r?\n[ \t]*/g,'');
  const data=analyzeJavaScript(source,f.file);const manual=notes[f.file];const inserts=[];
  const block=(lines,indent='')=>`/** @eyes-analysis\n${lines.map(s=>indent+' * '+clip(s)).join('\n')}\n${indent} */\n${indent}`;
  inserts.push({offset:source.startsWith('#!')?source.indexOf('\n')+1:0,value:block([
   '文件职责：'+f.purpose,
   '依据：'+(manual?.evidence?.slice(0,2).map(one).join('；')||'当前源码声明、导入关系及工程调用链'),
   '语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。',
   '短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。'
  ])});
  // Babel offsets are UTF-16, as are JavaScript slice offsets.
  const parser=require('@babel/parser');const traverse=require('@babel/traverse').default;
  const ast=parser.parse(source,{sourceType:f.file.endsWith('.cjs')?'script':'unambiguous',allowReturnOutsideFunction:true});let ordinal=0;
  traverse(ast,{Class(p){
   const c=data.classes[ordinal++];const n=manual?.classes?.[c.name];
   const indent=' '.repeat(p.node.loc.start.column);
   const at=p.parentPath.isExportNamedDeclaration()||p.parentPath.isExportDefaultDeclaration()?p.parent.start:p.node.start;
   const lines=['类职责：'+(n?.purpose||f.purpose+'中的 '+c.name+' 实现（角色需结合调用者确认）'),
    '继承：'+(c.extends||'无显式父类')+'；导出：'+(c.exportedAs.join(', ')||'模块内部声明')+'。'];
   if(n?.notes?.length)lines.push('约束：'+n.notes.slice(0,2).join('；'));
   lines.push('字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。');
   inserts.push({offset:at,value:block(lines,indent)});classes++;
   const members=p.get('body.body').filter(m=>m.isClassMethod()||m.isClassPrivateMethod()||m.isStaticBlock()||((m.isClassProperty()||m.isClassPrivateProperty())&&['ArrowFunctionExpression','FunctionExpression'].includes(m.node.value?.type)));
   for(const member of members){
    const kind=member.isStaticBlock()?'static-block':member.isClassProperty()||member.isClassPrivateProperty()?'field-function':member.node.kind;
    const line=kind==='field-function'?member.node.value.loc.start.line:member.node.loc.start.line;
    const info=c.methods.find(m=>m.line===line&&m.kind===kind);
    if(!info)continue;
    const role=methodNote(c,n,info);
    const detail=[role||'方法语义尚未人工确认；以下是当前源码的句法证据。'];
    if(info.writes.length)detail.push('状态写入：'+info.writes.slice(0,8).join('、')+(info.writes.length>8?'等；完整记录见索引。':'。'));
    if(info.calls.length)detail.push('调用线索：'+info.calls.slice(0,5).join('、')+(info.calls.length>5?'等。':'。'));
    if(!role&&!info.writes.length&&!info.calls.length)detail.push('读取：'+info.reads.join('、')+'；返回：'+info.returns.join('、')+'。');
    inserts.push({offset:member.node.start,value:block(detail,' '.repeat(member.node.loc.start.column))});
   }
  }});
  let result=source;
  for(const insert of inserts.sort((a,b)=>b.offset-a.offset))result=result.slice(0,insert.offset)+insert.value+result.slice(insert.offset);
  if(semanticHash(result,f.file)!==f.semanticHash)throw Error('Executable AST changed: '+f.file);
  fs.writeFileSync(path.join(root,f.file),result);annotated++;
 }
 fs.mkdirSync(path.join(root,'artifacts'),{recursive:true});
 fs.writeFileSync(path.join(root,'artifacts/eyes-analysis-semantic-baseline.json'),JSON.stringify(before,null,2)+'\n');
 console.log(JSON.stringify({annotatedFiles:annotated,annotatedClasses:classes,executableAST:'unchanged'}));
}
function render(index){
 const {counts}=index;const lines=[
 '# Eyes 全工程源码分析与维护参考',
 '',
 '> 依据：当前检入的可运行工程、AST 逐声明清点和分领域源码复核。本文覆盖每个受版本控制的 Eyes 文件与显式 class 声明；不能据此声称恢复 NASA 未发布的原始仓库、所有局部名称或逐分支正确性证明。',
 '',
 `覆盖：**${counts.files} 个文件、${counts.javascript} 个 JavaScript 文件、${counts.classes} 个显式类、${counts.methods} 个方法/访问器/可调用字段及静态块、${counts.shortBindings} 个短名称绑定**。短名称包含正常数学参数、循环变量、导入别名和压缩遗留，不能全部视为混淆。`,
 '',
 '## 阅读入口与证据等级',
 '',
 '- [应用层深入分析](application-review.md)：启动、路由、视图、组件、模板和故事。',
 '- [引擎深入分析](engine-review.md)：帧循环、场景实体、时间、坐标、Dynamo、资源生命周期及相机。',
 '- [第三方模块分析](vendor-review.md)：库边界、已证实版本、加载器、工具、每个匿名模块的语义依据。',
 '- [完整机器索引](index.json)：全部声明、读写、调用、继承文本、导入/反向依赖、来源区间和短名称作用域。',
 '',
 'observed 表示直接源码证据；inferred 表示有调用/字段支持的语义推断；没有可靠依据的原始标识符为未确认。结构清点自动覆盖全量；核心链路经过人工语义复核，其余方法的操作摘要不能替代独立的算法/边界条件审计。',
 '',
 '## 启动、数据与模块协作',
 '',
 '`shell/index.html → src/main.js → PreloadManager → SolarSystemApp → framework BaseApp / managers → Engine / Scene / Entity / components`。模板由自定义 BaseComponent 绑定，原始界面不是 React 重写。Next.js 是宿主和资源转发层，Eyes 自身通过 esbuild 构建。',
 '',
 '帧更新、模拟时钟、Dynamo 采样、坐标参考系和 Three.js 渲染构成核心链。当前活动实现是 `eyes/src/engine/`，仓库另一套 `src/lib/dynamo/` 是独立解析器，不应把两者的类型定义、入口或状态缓存混用。文件夹不是严格职责边界：engine/core 也含故事、UI 和第三方衔接。',
 '',
 '资源模型：媒体、模型及 .dyn 使用准确 NASA 运行时 URL；解码器依 manifest 做本地校验缓存。`eyes/.cache`、`dist`、`node_modules`、`public/eyes` 为忽略目录，不属于恢复源文件。二进制 WASM 是上游解码资源，不是把恢复的 JavaScript 重新编译为 WASM。清单和缓存逻辑仍在下方逐文件收录。',
 '',
 '## 名称、压缩前缀和恢复边界',
 '',
 '`_field` / `__method` 多为框架内部访问约定；`a/t/e/n` 必须按绑定作用域区分，同一名字在不同方法没有共同含义。Three 等库保留的短参数可能就是上游惯例。`UnidentifiedNNN` 是恢复阶段的占位文件名，数字对应来源模块，不是已确认业务类型；章节中的建议名称以导出表、构造调用、读取字段和字符串为依据。',
 '',
 '原始源码图、许可证和 provenance 必须保留。provenance 的 start/end 为 bundle 的 UTF-16 字符偏移，不是字节或当前源码行。模块语义名可以确认，压缩器删除的原始局部名通常无法唯一恢复。本次先保留行为与路径，记录建议；不能仅因两个文件类名相同就合并，也不能把循环导入直接改为求值期解构。',
 '',
 '## 已观察风险与维护约束',
 '',
 'BaseComponent 存在 resize 监听添加闭包与移除方法身份不一致的现状；引擎深析另记录共享加载器、资源释放和时间/坐标约束。本次为分析及注释，不混入运行行为修复。厂商代码的内部算法以本地实际版本为准：Eyes 内含 Three REVISION 185，不能用宿主 npm 的 0.186.1 代替。其他版本和不能确证的版本见厂商章节。',
 '',
 '## 如何更新与校验',
 '',
 '`npm run eyes:analyze` 从当前源重新生成本完整文档和机器索引；`npm run eyes:analyze:check` 比对源摘要、文件/类/方法覆盖与输出是否过期。语义人工笔记分别保存为 application/engine/vendor-notes.json；它们是分析依据，不能只靠自动摘要宣称全量人工审计。',
 '',
 '注释工具仅允许修改 JavaScript 注释，逐文件比较去除位置与注释后的完整 AST 摘要；上游许可注释不删除。HTML 和 JSON 通过本文解释，避免插入 HTML 注释改变模板节点结构。源代码行链接以本索引生成时为准；人工深析中的行号是分析时证据，重新格式化后应以主索引为准。',
 '',
 '## 全量文件目录',
 ''
 ];
 lines.push(`当前依赖图包含 ${index.cycles.length} 个强连通组（存在循环导入）。以下记录组内全部模块；应结合初始化次序决定未来拆分边界。`,'');
 for(const [i,group]of index.cycles.entries()){
  lines.push(`<details><summary>循环组 ${i+1}（${group.length} 文件）</summary>`,'');
  for(const f of group)lines.push(`- [${md(f)}](#${anchor(f)})`);
  lines.push('','</details>','');
 }
 lines.push('');
 for(const f of index.files)lines.push(`- [${f.file}](#${anchor(f.file)}) — ${md(f.purpose)}`);
 lines.push('','## 逐文件、逐类、逐方法证据','');
 for(const f of index.files){
  const n=notes[f.file];
  lines.push(`<a id="${anchor(f.file)}"></a>`,`### ${code(f.file)}`,'',`${f.purpose}。${link(f.file)}。证据等级：${f.confidence}。`,'');
  if(f.origin)lines.push(`来源模块 ${f.origin.id}：${code(f.origin.source)} 的 UTF-16 区间 [${f.origin.start}, ${f.origin.end})；原导出 ${join((f.origin.exports||[]).map(e=>typeof e==='string'?e:JSON.stringify(e)))}。`,'');
  if(n?.evidence?.length)lines.push('语义依据：'+n.evidence.map(md).join('；')+'。','');
  if(n?.notes?.length)lines.push('约束/疑点：'+n.notes.map(md).join('；')+'。','');
  if(n?.suggestedName)lines.push('有证据的模块语义名建议：'+code(n.suggestedName)+'；不代表上游原始文件路径。','');
  if(f.dependencies.length)lines.push('直接依赖：'+f.dependencies.map(d=>`[${md(d)}](#${anchor(d)})`).join('、')+'。','');
  if(f.dependents.length)lines.push('直接引用者：'+f.dependents.map(d=>`[${md(d)}](#${anchor(d)})`).join('、')+'。','');
  if(f.exports?.length)lines.push('当前导出：'+f.exports.map(e=>code(e.exported)+' ← '+code(e.local)+(e.source?' from '+code(e.source):'')).join('；')+'。','');
  if(f.template)lines.push('模板组件：'+join(f.template.components)+'；事件目标：'+join(f.template.events)+'；状态/分节绑定：'+join(f.template.bindings)+'。这些是静态模板提取，不执行表达式。','');
  if(f.data)lines.push(`数据类型 ${code(f.data.kind)}；顶层条目 ${f.data.entries}；字段 ${join(f.data.keys)}。原始数据保留，不手工猜测字段单位。`,'');
  if(f.functions?.length)lines.push('非 class 函数（包括模块内回调，非逐函数人工审计）：'+f.functions.map(fn=>code(fn.name+'('+fn.params.join(', ')+')')+` @${fn.line}`).join('；')+'。','');
  if(f.topLevelEffects?.length)lines.push('模块求值副作用（源码表达式）：'+join(f.topLevelEffects)+'。','');
  for(const c of f.classes||[]){
   const cn=n?.classes?.[c.name];
   lines.push(`#### 类 ${code(c.name)}（声明 ${c.ordinal}）`,'',`${cn?.purpose||'本模块中的类声明；详见下列结构证据，业务角色未进一步确认'}。${link(f.file,c.line)}；父类 ${code(c.extends||'无')}；${c.nested?'嵌套声明':'顶层声明'}；导出 ${join(c.exportedAs)}。`,'');
   if(c.parentResolved)lines.push('父类解析：'+code(c.parentResolved.className)+' → '+link(c.parentResolved.file,c.parentResolved.line)+'（跟随当前具名导入/再导出；动态 mixin 不作静态断言）。','');
   if(c.fields.length)lines.push('显式类字段：'+c.fields.map(p=>code((p.static?'static ':'')+p.name+' = '+p.value)).join('；')+'。constructor 中赋值的实例字段见方法写入列。','');
   lines.push('| 方法 / 签名 | 职责与可观察行为 | 状态写入 / 返回 | 调用证据 |','| --- | --- | --- | --- |');
   for(const m of c.methods){
    const desc=methodNote(c,cn,m);
    lines.push(`| ${code((m.static?'static ':'')+(m.kind==='get'||m.kind==='set'?m.kind+' ':'')+m.name+'('+m.params.join(', ')+')')} ${link(f.file,m.line)} | ${md(desc||'依下列 AST 状态/调用证据阅读；精确业务语义待确认')}；分支 ${m.branches} / 循环 ${m.loops} / await ${m.awaits} | 写：${join(m.writes)}；返回：${join(m.returns)} | ${join(m.calls)} |`);
    if(m.managers.length||m.components.length)lines.push(`| ↳ 查询依赖 | managers: ${join(m.managers)}；components: ${join(m.components)} | 读：${join(m.reads)} | 抛出：${join(m.throws)} |`);
   }
   lines.push('','读写/调用为句法证据：包含嵌套回调，跳过嵌套类；返回列只计本方法函数边界。成员别名、动态键、调用者的跨模块副作用不在该静态结果中。','');
  }
  if(n?.renames?.length){lines.push('有依据的命名建议（未自动改名）：','');for(const r of n.renames)lines.push('- '+md(typeof r==='string'?r:JSON.stringify(r)));lines.push('');}
  if(f.shortBindings?.length){
   lines.push('<details><summary>短名称作用域与使用证据（'+f.shortBindings.length+' 项）</summary>','','| 绑定 / 作用域 | 类型 / 引用次数 | 使用样本及建议 |','| --- | --- | --- |');
   for(const b of f.shortBindings)lines.push(`| ${code(b.name)} / ${code(b.scope)} | ${b.kind} / ${b.references} | ${join(b.uses)}${b.candidates.length?'；候选 '+join(b.candidates)+'（由读取方法/赋值字段推断，原名未确认）':''} |`);
   lines.push('','</details>','');
  }
 }
 return lines.join('\n').trimEnd()+'\n';
}
const mode=process.argv[2]||'build';
let index=inventory();
if(mode==='annotate'){annotations(index);index=inventory();}
const json=JSON.stringify(index,null,2)+'\n';const markdown=render(index);
if(mode==='check'){
 for(const [name,content]of [['index.json',json],['README.md',markdown]])if(!fs.existsSync(path.join(out,name))||fs.readFileSync(path.join(out,name),'utf8').replace(/\r\n/g,'\n')!==content)throw Error('Outdated analysis: '+name+'; run npm run eyes:analyze');
 console.log('Eyes analysis coverage current: '+JSON.stringify(index.counts));
}else{
 fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'index.json'),json);fs.writeFileSync(path.join(out,'README.md'),markdown);console.log('Eyes analysis generated: '+JSON.stringify(index.counts));
}
