/* Static data compiler: recovered application code is parsed, never imported. */
const fs = require('node:fs');
const path = require('node:path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const ROOT = path.resolve(__dirname, '..');
function member(node) {
  if (node?.type === 'Identifier') return node.name;
  if (node?.type === 'MemberExpression' && !node.computed) return `${member(node.object)}.${member(node.property)}`;
  return '';
}
function compileCatalog(root = ROOT) {
  const entries = [], diagnostics = [];
  const metadataPath = path.join(root, 'eyes/src/data/EntityCatalog.json');
  const metadata = fs.existsSync(metadataPath) ? JSON.parse(fs.readFileSync(metadataPath, 'utf8')) : {};
  const directory = path.join(root, 'eyes/src/engine/core');
  for (const filename of fs.readdirSync(directory).filter(name => name.endsWith('.js')).sort()) {
    const source = fs.readFileSync(path.join(directory, filename), 'utf8');
    if (!source.includes('Entity.Entity.register(')) continue;
    const file = `eyes/src/engine/core/${filename}`;
    const ast = parser.parse(source, { sourceType: 'module' });
    const bindings = new Map();
    traverse(ast, { VariableDeclarator(p) {
      // Only module-scope immutable bindings are safe outside their execution scope.
      if (p.node.id.type === 'Identifier' && p.parentPath.node.kind === 'const' && p.parentPath.parentPath.isProgram()) {
        const binding = p.scope.getBinding(p.node.id.name);
        if (binding?.constant) bindings.set(p.node.id.name, p.node.init);
      }
    } });
    let localDiagnostics = [];
    const active = new Set();
    function unsupported(node, reason = 'non-static expression') {
      const result = { $unsupported: node.type, expression: source.slice(node.start, node.end), reason };
      localDiagnostics.push({ file, line: node.loc.start.line, column: node.loc.start.column + 1, reason, expression: result.expression });
      return result;
    }
    let parameters = new Map();
    function evaluate(node) {
      if (!node) return { $undefined: true };
      if (['StringLiteral', 'NumericLiteral', 'BooleanLiteral'].includes(node.type)) return node.value;
      if (node.type === 'NullLiteral') return null;
      if (node.type === 'ArrayExpression') return node.elements.map(evaluate);
      if (node.type === 'ObjectExpression') {
        const result = {};
        for (const prop of node.properties) {
          if (prop.type !== 'ObjectProperty' || prop.computed) { result[`$unsupported_${prop.start}`] = unsupported(prop); continue; }
          result[prop.key.name ?? prop.key.value] = evaluate(prop.value);
        }
        return result;
      }
      const name = member(node);
      const constants = { 'Number.NEGATIVE_INFINITY': '-Infinity', 'Number.POSITIVE_INFINITY': 'Infinity', 'Math.PI': Math.PI, 'Pioneer.MathUtils.TwoPi': 2 * Math.PI, 'Pioneer.Vector3.Zero': [0,0,0], 'Pioneer.Vector3.One': [1,1,1], 'Pioneer.Vector3.XAxis': [1,0,0], 'Pioneer.Vector3.YAxis': [0,1,0], 'Pioneer.Vector3.ZAxis': [0,0,1], 'Pioneer.Vector3.XAxisNeg': [-1,0,0], 'Pioneer.Vector3.YAxisNeg': [0,-1,0], 'Pioneer.Vector3.ZAxisNeg': [0,0,-1], 'Pioneer.Quaternion.Identity': [1,0,0,0] };
      if (Object.hasOwn(constants, name)) return constants[name];
      if (node.type === 'Identifier') {
        if (parameters.has(name)) return parameters.get(name);
        if (name === 'undefined') return { $undefined: true };
        if (bindings.has(name) && !active.has(name)) { active.add(name); const result = evaluate(bindings.get(name)); active.delete(name); return result; }
      }
      if (node.type === 'UnaryExpression') {
        if (node.operator === 'void') return { $undefined: true };
        const value = evaluate(node.argument);
        if (typeof value === 'number' && ['+', '-'].includes(node.operator)) return node.operator === '-' ? -value : value;
      }
      if (node.type === 'BinaryExpression') {
        const left = evaluate(node.left), right = evaluate(node.right);
        if (typeof left === 'number' && typeof right === 'number') {
          const operations = { '+': () => left + right, '-': () => left - right, '*': () => left * right, '/': () => left / right, '**': () => left ** right, '%': () => left % right };
          if (operations[node.operator]) return operations[node.operator]();
        }
        if (node.operator === '+' && typeof left === 'string' && typeof right === 'string') return left + right;
      }
      if (node.type === 'CallExpression' && node.callee.type === 'Identifier') {
        // Whitelist the recovered pure return-array helper; interpret its AST, never execute JS.
        const helper = ast.program.body.find(item => item.type === 'FunctionDeclaration' && item.id.name === node.callee.name);
        if (helper?.id.name === 'createCollectionKeyframes' && helper.body.body.length === 1 && helper.body.body[0].type === 'ReturnStatement' && helper.body.body[0].argument.type === 'ArrayExpression') {
          const args = node.arguments.map(evaluate), previous = parameters;
          parameters = new Map(helper.params.map((param, index) => [param.name, args[index]]));
          const value = evaluate(helper.body.body[0].argument); parameters = previous; return value;
        }
      }
      if (node.type === 'CallExpression' && member(node.callee) === 'Pioneer.MathUtils.degToRad') { const value = evaluate(node.arguments[0]); if (typeof value === 'number') return value * Math.PI / 180; }
      if (node.type === 'CallExpression' && ['Math.sqrt', 'Math.sin', 'Math.cos', 'Math.abs', 'Math.pow'].includes(member(node.callee))) {
        const args = node.arguments.map(evaluate);
        if (args.every(value => typeof value === 'number')) return Math[member(node.callee).slice(5)](...args);
      }
      if (node.type === 'NewExpression' && ['Pioneer.Vector3', 'Pioneer.Quaternion'].includes(member(node.callee))) {
        const args = node.arguments.map(evaluate);
        if (args.every(value => typeof value === 'number')) return args.length ? args : member(node.callee).endsWith('Vector3') ? [0,0,0] : [1,0,0,0];
      }
      return unsupported(node, /Function|Method/.test(node.type) ? 'executable callback preserved; never executed' : 'non-static expression');
    }
    traverse(ast, { CallExpression(p) {
      if (member(p.node.callee) !== 'Entity.Entity.register') return;
      const object = p.node.arguments[0];
      if (object?.type !== 'ObjectExpression') { localDiagnostics = diagnostics; unsupported(object ?? p.node); return; }
      for (const prop of object.properties) {
        localDiagnostics = [];
        if (prop.type !== 'ObjectProperty') { diagnostics.push({ file, line: prop.loc.start.line, reason: 'non-static registration member' }); continue; }
        const id = prop.key.name ?? prop.key.value;
        const raw = evaluate(prop.value);
        // Recognize only direct, literal SpinController setup calls; never execute callbacks.
        const animations = [];
        const callback = prop.value.properties?.find(item => item.key?.name === 'postCreateFunction')?.value;
        const spins = new Map();
        for (const statement of callback?.body?.body ?? []) {
          if (statement.type === 'VariableDeclaration') for (const declaration of statement.declarations) {
            const init = declaration.init;
            if (declaration.id.type === 'Identifier' && init?.type === 'CallExpression' && init.callee?.property?.name === 'addController' && member(init.arguments[0]) === 'Pioneer.SpinController') spins.set(declaration.id.name, { type: 'spin', axis: [0,0,1], rate: 0 });
          }
          const call = statement.expression;
          if (call?.type !== 'CallExpression' || call.callee?.type !== 'MemberExpression') continue;
          const spin = spins.get(call.callee.object?.name);
          if (!spin) continue;
          const fields = { setJoint:'joint', setRate:'rate', setReferenceTime:'referenceTime', setReferenceAngle:'referenceAngle', setClampedToRealTime:'clampedToRealTime', setUsingRealTime:'usingRealTime', setRotatingPosition:'rotatingPosition' };
          const method = call.callee.property.name;
          if (fields[method]) spin[fields[method]] = evaluate(call.arguments[0]);
          if (method === 'setAxis') { spin.axis = evaluate(call.arguments[0]); spin.axisRelativeToEntity = evaluate(call.arguments[1]); }
          if (method === 'setCoverage' && call.arguments[0]?.type === 'NewExpression' && member(call.arguments[0].callee) === 'Pioneer.Interval') spin.coverage = call.arguments[0].arguments.map(evaluate);
        }
        for (const spin of spins.values()) if (typeof spin.joint === 'string' && typeof spin.rate === 'number' && Array.isArray(spin.axis)) animations.push(spin);
        function walk(node, visit) {
          if (!node || typeof node !== 'object') return;
          if (node.type) visit(node);
          for (const [key, value] of Object.entries(node)) if (!['loc','start','end'].includes(key)) {
            if (Array.isArray(value)) for (const item of value) walk(item, visit);
            else if (value && typeof value === 'object') walk(value, visit);
          }
        }
        const controllerNodes = prop.value.properties?.find(item => item.key?.name === 'controllers')?.value?.elements ?? [];
        walk(prop.value, node => {
          if (node.type !== 'CallExpression') return;
          const method = member(node.callee);
          if (method === 'Animation.Animation.makeJointRotationAnimation' || method === 'Animation.Animation.makeSubobjectVisibleAnimation') {
            const joint = evaluate(node.arguments[1]), third = evaluate(node.arguments[2]), keyframes = evaluate(node.arguments[3]);
            if (typeof joint === 'string' && Array.isArray(keyframes) && keyframes.length && keyframes.every(key => Array.isArray(key) && typeof key[0] === 'number' && typeof key[1] === (method.endsWith('RotationAnimation') ? 'number' : 'boolean'))) {
              animations.push(method.endsWith('RotationAnimation') ? {type:'rotation', joint, axis:third, keyframes} : {type:'visibility', joint, initialVisible:third, keyframes});
              const controllerIndex = controllerNodes.findIndex(controller => node.start >= controller.start && node.end <= controller.end);
              if (controllerIndex >= 0) raw.controllers[controllerIndex].modelAnimation = true;
            }
          }
          if (method === 'EntityUtils.EntityUtils.showSubObjectDuringInterval') animations.push({type:'visibility-interval', joint:evaluate(node.arguments[1]), interval:node.arguments.slice(2,4).map(evaluate), visibleInside:true});
        });
        for (let index = 0; index < controllerNodes.length; index++) {
          const controller = controllerNodes[index], data = raw.controllers[index];
          if (data.type !== 'coverage' || !Array.isArray(data.coverage)) continue;
          const enter = controller.properties.find(item => item.key?.name === 'enter')?.value;
          const exit = controller.properties.find(item => item.key?.name === 'exit')?.value;
          const collect = callback => {
            const result = new Map();
            walk(callback, node => {
              if (node.type !== 'CallExpression' || node.callee?.property?.name !== 'setHiddenObject') return;
              let names;
              if (node.arguments[0].type === 'StringLiteral') names = [evaluate(node.arguments[0])];
              else { const loops=[]; walk(callback, candidate => {if(candidate.type === 'ForOfStatement' && node.start >= candidate.body.start && node.end <= candidate.body.end) loops.push(candidate);}); names = loops.length ? evaluate(loops[0].right) : []; }
              const hidden = evaluate(node.arguments[1]);
              if (Array.isArray(names) && typeof hidden === 'boolean') for (const name of names) if (typeof name === 'string') result.set(name, hidden);
            }); return result;
          };
          const exits = collect(exit);
          for (const [joint, hidden] of collect(enter)) if (exits.get(joint) === !hidden) animations.push({type:'visibility-interval', joint, interval:data.coverage, visibleInside:!hidden});
        }
        const classification = metadata[id];
        entries.push({ id, ...raw, ...(animations.length ? { modelAnimations: animations } : {}), ...(typeof classification?.category === 'string' ? { sourceCategory: classification.category } : {}), ...(typeof classification?.subcategory === 'string' ? { sourceSubcategory: classification.subcategory } : {}), groups: raw.groups ?? [], parents: raw.parents ?? [], controllers: raw.controllers ?? [], raw, provenance: { file, line: prop.loc.start.line, column: prop.loc.start.column + 1 }, diagnostics: localDiagnostics });
      }
    } });
  }
  entries.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
  const seen = new Set();
  for (const entry of entries) { if (seen.has(entry.id)) throw new Error(`Duplicate entity ${entry.id}`); seen.add(entry.id); }
  return { schemaVersion: 1, entries, diagnostics };
}
module.exports = { compileCatalog };
if (require.main === module) {
  const output = path.join(ROOT, 'src/solar/config/catalog.generated.json');
  const compiled = JSON.stringify(compileCatalog(), null, 2) + '\n';
  if (process.argv.includes('--check')) { if (fs.readFileSync(output, 'utf8') !== compiled) throw new Error('Catalog is stale; run node tools/compile-solar-catalog.cjs'); }
  else fs.writeFileSync(output, compiled);
}
