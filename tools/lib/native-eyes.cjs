const path = require('node:path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');
const ORIGIN = 'https://eyes.nasa.gov/apps/solar-system/';
function relative(from, to) {
  const value = path.posix.relative(path.posix.dirname(from), to);
  return value.startsWith('.') ? value : './' + value;
}
function factoryAst(code) {
  const expression = parser.parseExpression(code);
  if (!t.isFunction(expression)) throw new Error('Expected a module factory');
  return t.file(t.program(expression.body.body, [], 'module'));
}
function targetOf(node) {
  if (t.isSequenceExpression(node)) return targetOf(node.expressions.at(-1));
  if (t.isCallExpression(node) && t.isIdentifier(node.callee, { name: 'requireModule' }) && t.isNumericLiteral(node.arguments[0])) return node.arguments[0].value;
}
function canRename(binding,name){
  if(!binding||!t.isValidIdentifier(name))return false;
  if(binding.scope.hasBinding(name)&&binding.identifier.name!==name)return false;
  for(const reference of [...binding.referencePaths,...binding.constantViolations]){
    const other=reference.scope.getBinding(name);
    if(other&&other!==binding)return false;
  }
  return true;
}
function convertFactory(code, moduleInfo, modules) {
  const ast = factoryAst(code);
  const dependencyBindings = new Map();
  const imports = new Map();
  const exportStatements = [];
  const exportedNames = new Set();
  let needsDefault = false;
  let needsCompat = false;
  const dependency = id => {
    const value = modules.get(id);
    if (!value) throw new Error(`Module ${moduleInfo.id}: missing dependency ${id}`);
    return value;
  };
  traverse(ast, {
    VariableDeclarator(p) {
      const id = targetOf(p.node.init);
      if (id === undefined || !t.isIdentifier(p.node.id)) return;
      const dep = dependency(id);
      const label = (dep.label || path.posix.basename(dep.file).replace(/\.[^.]+$/, '')).replace(/[^\w$]/g, '_');
      const desired = /^[a-zA-Z_$]/.test(label) ? label + 'Module' : 'dependency' + id;
      const binding = p.scope.getBinding(p.node.id.name);
      if (!binding) return;
      let name=desired;
      while(!canRename(binding,name))name+='Dependency';
      p.scope.rename(p.node.id.name, name);
      dependencyBindings.set(name, dep);
    }
  });
  const importDependency = id => {
    const dep = dependency(id);
    if (!moduleInfo.esm) return t.callExpression(t.identifier('require'), [t.stringLiteral(relative(moduleInfo.file, dep.file))]);
    if (!imports.has(id)) {
      const raw = (dep.label || path.posix.basename(dep.file).replace(/\.[^.]+$/, '')).replace(/[^\w$]/g, '_');
      let name = /^[a-zA-Z_$]/.test(raw) ? raw + 'Imports' : 'dependency' + id;
      const program = ast.program;
      const used = new Set();
      traverse(ast, { Identifier(p) { used.add(p.node.name); } });
      while (used.has(name) || [...imports.values()].some(x => x.name === name)) name += '_';
      imports.set(id, { name, dep });
    }
    return t.identifier(imports.get(id).name);
  };
  traverse(ast, {
    CallExpression(p) {
      const n = p.node;
      if (t.isIdentifier(n.callee, { name: 'requireModule' })) {
        if (t.isNumericLiteral(n.arguments[0])) { p.replaceWith(importDependency(n.arguments[0].value)); return; }
        // Webpack locale contexts are the only two dynamic require sites in this snapshot.
        if (moduleInfo.esm) throw new Error(`Module ${moduleInfo.id}: dynamic application import`);
        const table = ast.program.body.find(s => t.isVariableDeclaration(s) && s.declarations.some(d => t.isObjectExpression(d.init)));
        const object = table?.declarations.find(d => t.isObjectExpression(d.init))?.init;
        if (!object || !object.properties.every(x => t.isNumericLiteral(x.value))) throw new Error(`Module ${moduleInfo.id}: unsupported dynamic context`);
        const ids = [...new Set(object.properties.map(x => x.value.value))];
        const argument = t.identifier('resolvedId');
        const loader = t.arrowFunctionExpression([argument], t.blockStatement([
          t.switchStatement(argument, ids.map(id => t.switchCase(t.numericLiteral(id), [t.returnStatement(importDependency(id))]))),
          t.throwStatement(t.newExpression(t.identifier('Error'), [t.stringLiteral('Unknown locale module')]))
        ]));
        p.replaceWith(t.callExpression(loader, n.arguments)); return;
      }
      if (!t.isMemberExpression(n.callee) || !t.isIdentifier(n.callee.object, { name: 'requireModule' })) return;
      const helper = n.callee.property.name;
      if (helper === 'r') { p.replaceWith(t.unaryExpression('void', t.numericLiteral(0))); return; }
      if (helper === 'd') {
        if (!moduleInfo.esm || !t.isObjectExpression(n.arguments[1])) throw new Error(`Module ${moduleInfo.id}: unsupported export table`);
        for (const property of n.arguments[1].properties) {
          const name = property.key.name ?? property.key.value;
          if (exportedNames.has(name)) throw new Error(`Duplicate export ${name}`);
          exportedNames.add(name);
          const getter = property.value;
          const value = t.isBlockStatement(getter.body) ? getter.body.body.find(x => t.isReturnStatement(x))?.argument : getter.body;
          if(t.isIdentifier(value)&&dependencyBindings.has(value.name)) {
            const dep=dependencyBindings.get(value.name);
            if(dep.esm)exportStatements.push(t.exportNamedDeclaration(null,[t.exportNamespaceSpecifier(t.identifier(name))],t.stringLiteral(relative(moduleInfo.file,dep.file))));
            else exportStatements.push(t.exportNamedDeclaration(null,[t.exportSpecifier(t.identifier('default'),t.identifier(name))],t.stringLiteral(relative(moduleInfo.file,dep.file))));
          }
          else if (t.isIdentifier(value)) exportStatements.push(t.exportNamedDeclaration(null, [t.exportSpecifier(t.cloneNode(value), t.identifier(name))]));
          else if (t.isMemberExpression(value) && t.isIdentifier(value.object) && dependencyBindings.has(value.object.name)) {
            const dep = dependencyBindings.get(value.object.name);
            const imported = value.computed ? value.property.value : value.property.name;
            exportStatements.push(t.exportNamedDeclaration(null, [t.exportSpecifier(t.identifier(imported), t.identifier(name))], t.stringLiteral(relative(moduleInfo.file, dep.file))));
          } else throw new Error(`Module ${moduleInfo.id}: unsupported getter for ${name}`);
        }
        p.replaceWith(t.unaryExpression('void', t.numericLiteral(0))); return;
      }
      if (helper === 'n') {
        const arg = n.arguments[0];
        const dep = t.isIdentifier(arg) ? dependencyBindings.get(arg.name) : undefined;
        if (dep) p.replaceWith(t.arrowFunctionExpression([], dep.esm ? t.memberExpression(arg, t.identifier('default')) : arg));
        else { needsCompat = true; p.replaceWith(t.callExpression(t.memberExpression(t.identifier('moduleInterop'), t.identifier('getDefaultExport')), [arg])); }
        return;
      }
      if (helper === 'o') { p.replaceWith(t.callExpression(t.memberExpression(t.memberExpression(t.memberExpression(t.identifier('Object'), t.identifier('prototype')), t.identifier('hasOwnProperty')), t.identifier('call')), n.arguments)); return; }
      if (helper === 'nmd') { needsCompat = true; p.replaceWith(t.callExpression(t.memberExpression(t.identifier('moduleInterop'), t.identifier('nodeModule')), n.arguments)); return; }
      throw new Error(`Module ${moduleInfo.id}: unsupported helper ${helper}`);
    },
    MemberExpression(p) {
      if (t.isIdentifier(p.node.object, { name: 'requireModule' })) {
        const helper = p.node.property.name;
        if (['r','d','n','o','nmd'].includes(helper) && p.parentPath.isCallExpression()) return;
        if (helper === 'g') p.replaceWith(t.identifier('globalThis'));
        else if (helper === 'p') p.replaceWith(t.stringLiteral(ORIGIN));
        else if (helper === 'b') p.replaceWith(t.memberExpression(t.identifier('document'), t.identifier('baseURI')));
        else throw new Error(`Module ${moduleInfo.id}: unsupported runtime property ${helper}`);
      } else if (moduleInfo.esm && t.isIdentifier(p.node.object, { name: 'moduleExports' })) {
        const name = p.node.property.name;
        if (name !== 'default') throw new Error(`Module ${moduleInfo.id}: unsupported assignment export ${name}`);
        needsDefault = true;
        p.replaceWith(t.identifier('defaultExport'));
      }
    },
    SequenceExpression: { exit(p) {
      const expressions = p.node.expressions.filter(n => !(t.isUnaryExpression(n, { operator: 'void' }) && t.isNumericLiteral(n.argument, { value: 0 })));
      if (expressions.length === 1) p.replaceWith(expressions[0]);
      else if (expressions.length > 1) p.node.expressions = expressions; else p.replaceWith(t.unaryExpression('void',t.numericLiteral(0)));
    } },
    ExpressionStatement: { exit(p) { if (t.isUnaryExpression(p.node.expression, { operator: 'void' }) && t.isNumericLiteral(p.node.expression.argument, { value: 0 })) p.remove(); } }
  });
  // Import bindings already provide live module namespaces; discard factory-era aliases.
  const importNames=new Set([...imports.values()].map(x=>x.name));
  traverse(ast,{
    SequenceExpression:{exit(p){if(p.node.expressions.every(x=>t.isIdentifier(x)&&importNames.has(x.name)))p.replaceWith(p.node.expressions.at(-1));}},
    VariableDeclarator:{exit(p){if(t.isIdentifier(p.node.id)&&t.isIdentifier(p.node.init)&&importNames.has(p.node.init.name)){
      p.scope.rename(p.node.id.name,p.node.init.name);p.remove();
    }}},
    ExpressionStatement:{exit(p){if(t.isIdentifier(p.node.expression)&&importNames.has(p.node.expression.name))p.remove();}}
  });
  const headers = [];
  for (const { name, dep } of imports.values()) headers.push(t.importDeclaration([dep.esm ? t.importNamespaceSpecifier(t.identifier(name)) : t.importDefaultSpecifier(t.identifier(name))], t.stringLiteral(relative(moduleInfo.file, dep.file))));
  if (needsCompat) {
    const specifier = relative(moduleInfo.file, 'runtime/interop.cjs');
    headers.push(moduleInfo.esm ? t.importDeclaration([t.importDefaultSpecifier(t.identifier('moduleInterop'))], t.stringLiteral(specifier)) : t.variableDeclaration('const', [t.variableDeclarator(t.identifier('moduleInterop'), t.callExpression(t.identifier('require'), [t.stringLiteral(specifier)]))]));
  }
  if (needsDefault) {
    headers.push(t.variableDeclaration('let', [t.variableDeclarator(t.identifier('defaultExport'))]));
    exportStatements.push(t.exportNamedDeclaration(null, [t.exportSpecifier(t.identifier('defaultExport'), t.identifier('default'))]));
  }
  if (!moduleInfo.esm) {
    traverse(ast, { Identifier(p) { if (p.node.name === 'moduleExports' && p.isReferencedIdentifier()) p.node.name = 'exports'; else if(p.node.name === 'requireModule' && p.isReferencedIdentifier())p.node.name='require'; } });
  }
  ast.program.body = [...headers, ...ast.program.body, ...exportStatements];
  traverse(ast,{Program(p){
    p.scope.crawl();
    for(const statement of p.node.body){if(!t.isImportDeclaration(statement))continue;
      for(const specifier of [...statement.specifiers]){
        const binding=p.scope.getBinding(specifier.local.name);
        if(binding&&!binding.referencePaths.length){statement.specifiers=statement.specifiers.filter(x=>x!==specifier);continue;}
        const original=specifier.local.name;let desired=original.replace(/Imports_?$/,'');
        if(desired===original||!t.isValidIdentifier(desired))continue;
        if(p.scope.hasBinding(desired)||p.scope.hasGlobal(desired))desired+='Dependency';
        if(!p.scope.hasBinding(desired)&&!p.scope.hasGlobal(desired)&&canRename(binding,desired))p.scope.rename(original,desired);
      }
    }
  }});
  recoverLexicalNames(ast);
  if(!moduleInfo.file.startsWith('vendor/')){
    traverse(ast,{
      UnaryExpression:{exit(p){if(p.node.operator==='!'&&t.isNumericLiteral(p.node.argument)&&[0,1].includes(p.node.argument.value))p.replaceWith(t.booleanLiteral(!p.node.argument.value));}},
      ExpressionStatement:{exit(p){if(t.isSequenceExpression(p.node.expression))p.replaceWithMultiple(p.node.expression.expressions.map(value=>t.expressionStatement(value)));}},
      ReturnStatement:{exit(p){if(t.isSequenceExpression(p.node.argument)){
        const values=p.node.argument.expressions;
        const statements=[...values.slice(0,-1).map(value=>t.expressionStatement(value)),t.returnStatement(values.at(-1))];
        if(p.parentPath.isBlockStatement())p.replaceWithMultiple(statements);else p.replaceWith(t.blockStatement(statements));
      }}},
      VariableDeclaration:{exit(p){if(p.node.declarations.length>1&&(p.parentPath.isProgram()||p.parentPath.isBlockStatement()))p.replaceWithMultiple(p.node.declarations.map(declaration=>t.variableDeclaration(p.node.kind,[declaration])));}}
    });
  }
  const result = generate(ast, { comments: true, compact: false }).code;
  if (/\brequireModule\b|\bmoduleExports\b/.test(result.replace(/(['"])(?:(?!\1).)*\1/g, ''))) throw new Error(`Module ${moduleInfo.id}: unresolved factory bindings`);
  return result + '\n';
}
function recoverLexicalNames(ast){
  const suggestions=new Map();
  const suggest=(binding,name)=>{
    if(!binding||!name||!t.isValidIdentifier(name)||name.length<2||!/^[a-zA-Z_$][\w$]*$/.test(name)||binding.identifier.name.length>2)return;
    if(!suggestions.has(binding))suggestions.set(binding,new Set());suggestions.get(binding).add(name);
  };
  traverse(ast,{
    ExportSpecifier(p){if(t.isIdentifier(p.node.local)&&t.isIdentifier(p.node.exported))suggest(p.scope.getBinding(p.node.local.name),p.node.exported.name);},
    ObjectProperty(p){if(p.parentPath.isObjectPattern()&&t.isIdentifier(p.node.key)&&t.isIdentifier(p.node.value))suggest(p.scope.getBinding(p.node.value.name),p.node.key.name);},
    AssignmentExpression(p){if(t.isMemberExpression(p.node.left)&&t.isThisExpression(p.node.left.object)&&t.isIdentifier(p.node.right))suggest(p.scope.getBinding(p.node.right.name),p.node.left.property.name?.replace(/^_+/,''));},
    VariableDeclarator(p){
      if(!t.isIdentifier(p.node.id))return;const value=p.node.init;let name;
      if(t.isMemberExpression(value)&&t.isThisExpression(value.object))name=value.property.name?.replace(/^_+/,'');
      else if(t.isArrowFunctionExpression(value)&&t.isIdentifier(value.body)&&value.body.name.length>2)name='get'+value.body.name.replace(/Imports$/,'');
      else if(t.isNewExpression(value)){const ctor=t.isIdentifier(value.callee)?value.callee.name:value.callee.property?.name;if(ctor&&ctor.length>2)name=ctor[0].toLowerCase()+ctor.slice(1);}
      else if(t.isCallExpression(value)&&t.isMemberExpression(value.callee)&&t.isStringLiteral(value.arguments[0])){const method=value.callee.property.name;if(method==='getManager'||method==='getComponent')name=value.arguments[0].value+(method==='getManager'?'Manager':'Component');}
      suggest(p.scope.getBinding(p.node.id.name),name);
    }
  });
  for(const [binding,names] of suggestions){if(names.size!==1)continue;const name=[...names][0];if(!binding.scope.hasBinding(name)&&!binding.scope.hasGlobal(name)&&canRename(binding,name))binding.scope.rename(binding.identifier.name,name);}
}
module.exports = { convertFactory, factoryAst, relative, recoverLexicalNames };
