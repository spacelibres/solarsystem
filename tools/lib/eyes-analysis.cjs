const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');
const crypto = require('node:crypto');
function parse(source, file='source.js') {
  return parser.parse(source, { sourceType: file.endsWith('.cjs') ? 'script' : 'unambiguous', allowReturnOutsideFunction: true });
}
function text(node) { return node ? generate(node, {compact:true,comments:false}).code : ''; }
function key(node) { return t.isIdentifier(node) ? node.name : t.isStringLiteral(node) || t.isNumericLiteral(node) ? String(node.value) : text(node); }
function className(p,index) {
  if(p.node.id)return p.node.id.name;
  if(p.parentPath.isVariableDeclarator())return key(p.parent.id);
  if(p.parentPath.isAssignmentExpression())return text(p.parent.left);
  return `AnonymousClass${index}`;
}
function scopeName(scope) {
  const p=scope.path;let name='module';
  if(p.isClassMethod()||p.isClassPrivateMethod())name=key(p.node.key);
  else if(p.isFunction())name=p.node.id?.name || (p.parentPath.isVariableDeclarator()?key(p.parent.id):'callback');
  const cls=p.findParent(x=>x.isClass());
  return `${cls?.node.id?.name?cls.node.id.name+'.':''}${name}@${p.node.loc?.start.line||1}:${p.node.loc?.start.column||0}`;
}
function methodInfo(p) {
  const n=p.node;const reads=new Set(),writes=new Set(),calls=new Set(),returns=new Set(),throws=new Set(),managers=new Set(),components=new Set(),strings=new Set();
  let branches=0,loops=0,awaits=0;
  p.traverse({
    Class(q){q.skip();},
    'MemberExpression|OptionalMemberExpression'(q){
      const value=text(q.node);if(!value.startsWith('this.'))return;
      const parent=q.parentPath;const isWrite=parent.isAssignmentExpression()&&parent.node.left===q.node || parent.isUpdateExpression();
      if(isWrite)writes.add(value.slice(5));
      if(!isWrite || parent.isUpdateExpression() || parent.isAssignmentExpression()&&parent.node.operator!=='=')reads.add(value.slice(5));
    },
    'CallExpression|OptionalCallExpression'(q){
      const called=text(q.node.callee);calls.add(called);
      if((t.isMemberExpression(q.node.callee)||t.isOptionalMemberExpression(q.node.callee))&&t.isStringLiteral(q.node.arguments[0])) {
        if(q.node.callee.property.name==='getManager')managers.add(q.node.arguments[0].value);
        if(q.node.callee.property.name==='getComponent')components.add(q.node.arguments[0].value);
      }
    },
    NewExpression(q){calls.add('new '+text(q.node.callee));},
    ReturnStatement(q){if(q.getFunctionParent()===p)returns.add(text(q.node.argument).slice(0,220)||'void');},
    ThrowStatement(q){throws.add(text(q.node.argument).slice(0,160));},
    IfStatement(){branches++;},ConditionalExpression(){branches++;},SwitchCase(){branches++;},
    Loop(){loops++;},AwaitExpression(){awaits++;},
    StringLiteral(q){if(q.node.value.length>1&&q.node.value.length<90)strings.add(q.node.value);}
  });
  const parameters=n.params||[];
  return {name:key(n.key),kind:n.kind||'method',static:!!n.static,async:!!n.async,generator:!!n.generator,line:n.loc.start.line,endLine:n.loc.end.line,params:parameters.map(text),reads:[...reads].sort(),writes:[...writes].sort(),calls:[...calls].sort(),returns:[...returns],throws:[...throws],managers:[...managers],components:[...components],literals:[...strings],branches,loops,awaits};
}
function analyzeJavaScript(source,file='source.js') {
  const ast=parse(source,file);const result={imports:[],exports:[],aliases:{},classes:[],functions:[],shortBindings:[],topLevelEffects:[]};const seen=new Set();const aliases=new Map();
  function alias(p,left,right){
    if(p.getFunctionParent()||p.findParent(q=>q.isClass())||!t.isIdentifier(left))return;
    if(!aliases.has(left.name))aliases.set(left.name,new Set());
    aliases.get(left.name).add(t.isIdentifier(right)?right.name:null);
  }
  traverse(ast,{
    ImportDeclaration(p){result.imports.push({source:p.node.source.value,kind:'import',line:p.node.loc.start.line,bindings:p.node.specifiers.map(s=>({local:s.local.name,imported:t.isImportSpecifier(s)?key(s.imported):t.isImportNamespaceSpecifier(s)?'*':'default'}))});},
    ExportNamedDeclaration(p){
      const n=p.node;if(n.declaration){const d=n.declaration;if(d.id)result.exports.push({exported:d.id.name,local:d.id.name,line:n.loc.start.line});else for(const v of d.declarations||[])for(const id of Object.keys(t.getBindingIdentifiers(v.id)))result.exports.push({exported:id,local:id,line:n.loc.start.line});}
      for(const s of n.specifiers)result.exports.push({exported:key(s.exported),local:s.local?key(s.local):'*',source:n.source?.value,line:n.loc.start.line});
    },
    ExportDefaultDeclaration(p){result.exports.push({exported:'default',local:p.node.declaration.id?.name || text(p.node.declaration).slice(0,100),line:p.node.loc.start.line});},
    ExportAllDeclaration(p){result.exports.push({exported:'*',local:'*',source:p.node.source.value,line:p.node.loc.start.line});},
    CallExpression(p){if(t.isIdentifier(p.node.callee,{name:'require'})&&t.isStringLiteral(p.node.arguments[0]))result.imports.push({source:p.node.arguments[0].value,kind:'require',line:p.node.loc.start.line,bindings:p.parentPath.isVariableDeclarator()&&t.isIdentifier(p.parent.id)?[{local:p.parent.id.name,imported:'default'}]:[]});},
    VariableDeclarator(p){if(p.node.init)alias(p,p.node.id,p.node.init);},
    AssignmentExpression(p){alias(p,p.node.left,p.node.right);const left=text(p.node.left);if(left==='module.exports'||left.startsWith('exports.')||left.startsWith('module.exports.'))result.exports.push({exported:left==='module.exports'?'default':left.startsWith('module.exports.')?left.slice(15):left.slice(8),local:text(p.node.right).slice(0,120),kind:'commonjs',line:p.node.loc.start.line});},
    Class(p){
      const index=result.classes.length+1;const name=className(p,index);
      const binding=p.parentPath.isVariableDeclarator()?text(p.parent.id):p.parentPath.isAssignmentExpression()?text(p.parent.left):name;
      const record={name,binding,ordinal:index,line:p.node.loc.start.line,endLine:p.node.loc.end.line,extends:text(p.node.superClass)||null,methods:[],fields:[],nested:!!p.findParent(q=>q.isClass()),exportedAs:[]};
      for(const member of p.get('body.body')){
        if(member.isClassMethod()||member.isClassPrivateMethod())record.methods.push(methodInfo(member));
        else if(member.isClassProperty()||member.isClassPrivateProperty()){
          record.fields.push({name:key(member.node.key),static:!!member.node.static,value:text(member.node.value).slice(0,160),line:member.node.loc.start.line});
          if(t.isFunction(member.node.value))record.methods.push({...methodInfo(member.get('value')),name:key(member.node.key),kind:'field-function',static:!!member.node.static});
        }
        else if(member.isStaticBlock())record.methods.push({...methodInfo(member),name:'<static block>',kind:'static-block',static:true});
      }
      result.classes.push(record);
    },
    Function(p){
      if(p.isClassMethod()||p.isClassPrivateMethod()||p.isObjectMethod())return;
      if(p.findParent(q=>q.isClass()))return;
      const name=p.node.id?.name || (p.parentPath.isVariableDeclarator()?text(p.parent.id):p.parentPath.isObjectProperty()?key(p.parent.key):'anonymous');
      result.functions.push({name,line:p.node.loc.start.line,endLine:p.node.loc.end.line,async:!!p.node.async,params:p.node.params.map(text)});
    },
    Scopable(p){
      for(const binding of Object.values(p.scope.bindings)){
        if(seen.has(binding.identifier))continue;seen.add(binding.identifier);
        const name=binding.identifier.name;if(!/^[A-Za-z_$]{1,2}\d*$/.test(name)&&!/^_?[a-zA-Z]\d+$/.test(name))continue;
        const uses=[...new Set(binding.referencePaths.slice(0,8).map(ref=>text(ref.parentPath.node).slice(0,160)))];
        const candidates=new Set();
        for(const reference of binding.referencePaths){
          const parent=reference.parentPath;
          if(parent.isMemberExpression()&&parent.node.object===reference.node&&/^read(?:U?Int|Float|Byte|String|Line)/.test(parent.node.property.name||''))candidates.add('reader');
          if(parent.isAssignmentExpression()&&parent.node.right===reference.node&&t.isMemberExpression(parent.node.left)&&t.isThisExpression(parent.node.left.object)){const field=parent.node.left.property.name?.replace(/^_+/,'');if(field)candidates.add(field);}
        }
        result.shortBindings.push({name,kind:binding.kind,line:binding.identifier.loc?.start.line||1,scope:scopeName(binding.scope),references:binding.references,constant:binding.constant,uses,candidates:[...candidates]});
      }
    }
  });
  for(const [name,values]of aliases)if(values.size===1&&[...values][0])result.aliases[name]=[...values][0];
  function resolveAlias(name,seen=new Set()) {if(seen.has(name))return name;seen.add(name);return result.aliases[name]?resolveAlias(result.aliases[name],seen):name;}
  for(const cls of result.classes)cls.exportedAs=result.exports.filter(e=>(resolveAlias(e.local)===cls.name||resolveAlias(e.local)===cls.binding)&&!e.source).map(e=>e.exported);
  for(const statement of ast.program.body){if(t.isExpressionStatement(statement)&&!t.isStringLiteral(statement.expression))result.topLevelEffects.push(text(statement.expression).slice(0,220));}
  result.shortBindingCount=result.shortBindings.length;
  return result;
}
function analyzeTemplate(source){
  const components=new Set(),events=new Set(),bindings=new Set();
  for(const m of source.matchAll(/<([A-Z][\w.-]*)\b/g))components.add(m[1]);
  for(const m of source.matchAll(/\bon\w+\s*=\s*["']([^"']+)["']/g))events.add(m[1]);
  for(const m of source.matchAll(/\{\{\{?\s*[#^\/]?\s*([\w.]+)/g))bindings.add(m[1]);
  return {components:[...components].sort(),events:[...events].sort(),bindings:[...bindings].sort()};
}
function semanticHash(source,file='source.js'){
  const omitted=new Set(['start','end','loc','extra','leadingComments','innerComments','trailingComments','comments','tokens','errors']);
  return crypto.createHash('sha256').update(JSON.stringify(parse(source,file).program,(k,v)=>omitted.has(k)?undefined:v)).digest('hex');
}
module.exports={analyzeJavaScript,analyzeTemplate,semanticHash,text};
