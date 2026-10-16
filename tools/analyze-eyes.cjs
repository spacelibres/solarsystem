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
const progressFile=path.join(out,'semantic-progress.json');
const semanticProgress=fs.existsSync(progressFile)?JSON.parse(fs.readFileSync(progressFile,'utf8')):{files:{}};
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
const md=v=>one(v).replace(/\|/g,'\\|').replace(/`/g,'ˋ');
const code=v=>'`'+md(v)+'`';
const join=(a,limit=Infinity)=>a?.length?a.slice(0,limit).map(code).join('、')+(a.length>limit?`（另 ${a.length-limit} 项，见索引）`:''):'—';
const anchor=f=>'file-'+f.replace(/[^a-zA-Z0-9_-]/g,'-');
const link=(f,line)=>`[源码${line?':'+line:''}](../../${f}${line?'#L'+line:''})`;
function methodNote(cls,note,m,reviewed=false){
 if(m.documentation)return m.documentation;
 if(reviewed)return null;
 const exact=note?.methods?.[(m.static?'static:':'instance:')+m.kind+':'+m.name] ||
  (cls.methods.filter(x=>x.name===m.name&&x.kind===m.kind).length===1?note?.methods?.[m.kind+':'+m.name]:null);
 const value=exact||(cls.methods.filter(x=>x.name===m.name).length===1?note?.methods?.[m.name]:null);
 const description=typeof value==='string'?value:value?.purpose;
 return description?.replace(/\s*源码 eyes\/[^\s]+:\d+；参数[\s\S]*$/,'');
}
function inventory(){
 const files=tracked.map(file=>{
  const source=read(file); const record={file,bytes:Buffer.byteLength(source),sha256:sha(source),purpose:notes[file]?.purpose||support[file]||'待补充职责',confidence:notes[file]?.confidence||'observed',origin:origins.get(file)||null,semanticReview:semanticProgress.files[file]||{status:'not-semantically-accepted'}};
  if(record.semanticReview.sourceSha256&&record.semanticReview.sourceSha256!==record.sha256)throw Error('Semantic evidence is stale: '+file+'; review source and update semantic-progress.json');
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
function render(index){
 const {counts}=index;const lines=[
 '# Eyes 全工程源码分析与维护参考',
 '',
 '> 依据：当前检入的可运行工程、AST 逐声明清点和分领域源码复核。本文覆盖每个受版本控制的 Eyes 文件与显式 class 声明；不能据此声称恢复 NASA 未发布的原始仓库、所有局部名称或逐分支正确性证明。',
 '',
 `覆盖：**${counts.files} 个文件、${counts.javascript} 个 JavaScript 文件、${counts.classes} 个显式类、${counts.methods} 个方法/访问器/可调用字段及静态块、${counts.shortBindings} 个短名称绑定**。短名称包含正常数学参数、循环变量、导入别名和压缩遗留，不能全部视为混淆。`,
 '',
 '## 实际源码整理进度',
 '',
 '[验收与维护说明](semantic-review-guide.md) 解释实际修改范围、证明边界和后续维护流程。',
 '',
 `结构覆盖与语义验收是两回事。当前有 **${index.files.filter(file=>file.semanticReview.status.startsWith('verified-')).length} 个文件**有实际源码整理/契约验证记录，其余不得据结构索引宣称已经完成语义反混淆。逐文件状态和证据见 [语义验收清单](semantic-progress.json)。`,
 '',
 '- [启动模块实际修改与星层修复](preload-semantic-changes.md)',
 '- [应用、视图、组件与管理器实际修改](application-semantic-changes.md)',
 '- [动力学、地形、数学实际修改](dynamo-semantic-changes.md)',
 '- [资源、实体、渲染组件与核心工具实际修改](resource-semantic-changes.md)',
 '- [五个故事的实际命名与生命周期整理](stories-semantic-changes.md)',
 '- [自定义 shader 的逐项契约](shader-semantic-changes.md)',
 '- [Three 官方源码命名匹配与未匹配范围](three-semantic-changes.md)',
 '- [Three core 深入对照及剩余 AST 差异](three-core-next.md)',
  '- [Three core 未匹配方法与辅助函数的逐项语义](three-core-remaining-semantics.md)',
 '- [Three 渲染器与扩展逐项对照](three-renderer-next.md)',
 '- [Eyes 与 Three 的实际接缝、全部组件映射及资源修复](eyes-three-integration.md)',
 '',
 '## 阅读入口与证据等级',
 '',
 '- [应用架构](application-architecture.md) 与 [当前逐文件应用参考](application-review.md)：启动、路由、视图、组件、模板和故事。',
 '- [引擎架构](engine-architecture.md) 与 [当前逐文件引擎参考](engine-review.md)：帧循环、实体、时间、坐标、Dynamo、资源及相机。',
 '- [第三方边界](vendor-architecture.md) 与 [当前逐文件厂商参考](vendor-review.md)：已证实版本、加载器、工具及未知命名。',
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
 '原始源码图、许可证和 provenance 必须保留。provenance 的 start/end 为 bundle 的 UTF-16 字符偏移，不是字节或当前源码行。已确认的语义名称实际写入源码，五个故事模块的路径也已更名，initialRecoveredFile 保留初始路径。无法唯一恢复的原始拼写与当前可解释的职责名称必须区分；同名类不能随意合并，循环导入不能随意改成求值期解构。',
 '',
 '## 已观察风险与维护约束',
 '',
 'PreloadManager 两次写入 stars1 的缺陷已复现并修复，故不能把所有改动称为 AST 完全不变。其他语义整理用词法/控制流归一化证明和运行回归分别验证。BaseComponent resize 回调身份、共享 Draco 所有权等原有疑点仍单独记录。厂商内部实现以本地快照为准：Three REVISION 185 不能直接推定精确 patch，更不能替换成宿主 npm 0.186.1。',
 '',
 '## 如何更新与校验',
 '',
 '`npm run eyes:analyze` 从当前源重新生成本完整文档和机器索引；`npm run eyes:analyze:check` 比对源摘要、文件/类/方法覆盖与输出是否过期。语义人工笔记分别保存为 application/engine/vendor-notes.json；它们是分析依据，不能只靠自动摘要宣称全量人工审计。',
 '',
 '批量模板注释模式已停用；分析命令只读取源码并更新文档，不能再用模板说明覆盖人工语义整理。方法说明优先取当前源码的人工注释，已验收文件不回填旧短变量的机械摘要。初始 notes.json 保留为研究依据，不代表当前参数命名；当前签名和行号以本索引为准。HTML/JSON 字段维持原协议，不为消除短名破坏外部数据键。',
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
  lines.push('实际源码验收状态：'+code(f.semanticReview.status)+(f.semanticReview.evidence?'；'+f.semanticReview.evidence.map(md).join('；'):'；仅有结构清点，不能当作语义整理完成。'),'');
  if(f.origin)lines.push(`来源模块 ${f.origin.id}：${code(f.origin.source)} 的 UTF-16 区间 [${f.origin.start}, ${f.origin.end})；原导出 ${join((f.origin.exports||[]).map(e=>typeof e==='string'?e:JSON.stringify(e)))}。`,'');
  if(n?.evidence?.length)lines.push('语义依据：'+n.evidence.map(md).join('；')+'。','');
  if(n?.notes?.length)lines.push('约束/疑点：'+n.notes.map(md).join('；')+'。','');
  if(n?.suggestedName)lines.push('有证据的模块语义名建议：'+code(n.suggestedName)+'；不代表上游原始文件路径。','');
  if(f.dependencies.length)lines.push('直接依赖：'+f.dependencies.map(d=>`[${md(d)}](#${anchor(d)})`).join('、')+'。','');
  if(f.dependents.length)lines.push('直接引用者：'+f.dependents.map(d=>`[${md(d)}](#${anchor(d)})`).join('、')+'。','');
  if(f.exports?.length)lines.push('当前导出：'+f.exports.map(e=>code(e.exported)+' ← '+code(e.local)+(e.source?' from '+code(e.source):'')).join('；')+'。','');
  if(f.template)lines.push('模板组件：'+join(f.template.components)+'；事件目标：'+join(f.template.events)+'；状态/分节绑定：'+join(f.template.bindings)+'。这些是静态模板提取，不执行表达式。','');
  if(f.data)lines.push(`数据类型 ${code(f.data.kind)}；顶层条目 ${f.data.entries}；字段 ${join(f.data.keys)}。原始数据保留，不手工猜测字段单位。`,'');
  if(f.functions?.length)lines.push('非 class 函数（包括模块内回调）：'+f.functions.map(fn=>code(fn.name+'('+fn.params.join(', ')+')')+` @${fn.line}`+(fn.documentation?'：'+md(fn.documentation):'')).join('；')+'。','');
  if(f.topLevelEffects?.length)lines.push('模块求值副作用（源码表达式）：'+join(f.topLevelEffects)+'。','');
  for(const c of f.classes||[]){
   const cn=n?.classes?.[c.name];
   lines.push(`#### 类 ${code(c.name)}（声明 ${c.ordinal}）`,'',`${c.documentation||cn?.purpose||'本模块中的类声明；详见下列结构证据，业务角色未进一步确认'}。${link(f.file,c.line)}；父类 ${code(c.extends||'无')}；${c.nested?'嵌套声明':'顶层声明'}；导出 ${join(c.exportedAs)}。`,'');
   if(c.parentResolved)lines.push('父类解析：'+code(c.parentResolved.className)+' → '+link(c.parentResolved.file,c.parentResolved.line)+'（跟随当前具名导入/再导出；动态 mixin 不作静态断言）。','');
   if(c.fields.length)lines.push('显式类字段：'+c.fields.map(p=>code((p.static?'static ':'')+p.name+' = '+p.value)).join('；')+'。constructor 中赋值的实例字段见方法写入列。','');
   lines.push('| 方法 / 签名 | 职责与可观察行为 | 状态写入 / 返回 | 调用证据 |','| --- | --- | --- | --- |');
   for(const m of c.methods){
    const desc=methodNote(c,cn,m,f.semanticReview.status.startsWith('verified-')||f.semanticReview.status==='partially-matched-upstream');
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
function renderDomain(index,domain){
 const matches=file=>domain==='vendor'?file.startsWith('eyes/src/vendor/'):domain==='engine'?file.startsWith('eyes/src/engine/'):file.startsWith('eyes/src/')&&!file.startsWith('eyes/src/vendor/')&&!file.startsWith('eyes/src/engine/');
 const files=index.files.filter(file=>matches(file.file));
 const title={application:'应用',engine:'引擎',vendor:'第三方'}[domain];
 const lines=[`# ${title}当前源码逐文件参考`,'',`当前 ${files.length} 个文件。所有签名、行号、读写证据来自当前源码；[架构研究基线](${domain}-architecture.md) 与 [实际语义进度](semantic-progress.json) 分开记录。完整短名、调用和反向依赖见 [总文档](README.md)。`,''];
 for(const file of files){
  const note=notes[file.file];
  lines.push(`## ${code(file.file)}`,'',file.purpose+'。'+link(file.file)+'。语义状态：'+code(file.semanticReview.status)+'。','',`[总文档中的完整条目](README.md#${anchor(file.file)})`,'');
  for(const cls of file.classes||[]){
   const classNote=note?.classes?.[cls.name];
   lines.push(`### ${code(cls.name)}`,'',md(cls.documentation||classNote?.purpose||'精确业务语义尚未确认，以下提供声明与操作证据。')+'。父类 '+code(cls.extends||'无')+'。','');
   for(const method of cls.methods){
    const purpose=methodNote(cls,classNote,method,file.semanticReview.status.startsWith('verified-')||file.semanticReview.status==='partially-matched-upstream');
    const effects=purpose||`当前操作：写入 ${method.writes.join('、')||'无直接字段写入'}；返回 ${method.returns.join('、')||'无显式返回'}。`;
    lines.push('- '+code((method.static?'static ':'')+(method.kind==='get'||method.kind==='set'?method.kind+' ':'')+method.name+'('+method.params.join(', ')+')')+' '+link(file.file,method.line)+'：'+md(effects));
   }
   lines.push('');
  }
 }
 return lines.join('\n').trimEnd()+'\n';
}
const mode=process.argv[2]||'build';
if(!['build','check'].includes(mode))throw Error('Bulk source annotation is retired. Edit semantic names and comments in the source; analysis only writes documentation.');
let index=inventory();
const json=JSON.stringify(index,null,2)+'\n';const markdown=render(index);
const outputs=[['index.json',json],['README.md',markdown],...['application','engine','vendor'].map(domain=>[domain+'-review.md',renderDomain(index,domain)])];
if(mode==='check'){
 for(const [name,content]of outputs)if(!fs.existsSync(path.join(out,name))||fs.readFileSync(path.join(out,name),'utf8').replace(/\r\n/g,'\n')!==content)throw Error('Outdated analysis: '+name+'; run npm run eyes:analyze');
 console.log('Eyes analysis coverage current: '+JSON.stringify(index.counts));
}else{
 fs.mkdirSync(out,{recursive:true});for(const [name,content]of outputs)fs.writeFileSync(path.join(out,name),content);console.log('Eyes analysis generated: '+JSON.stringify(index.counts));
}
