const fs = require('node:fs'),
  parser = require('@babel/parser'),
  traverse = require('@babel/traverse').default,
  g = require('@babel/generator').default,
  t = require('@babel/types'),
  crypto = require('node:crypto');
function renameTasks(tasks, prefix) {
  const unique = new Map();
  for (const [binding, name] of tasks) unique.set(binding, name);
  const list = [...unique];
  list.forEach(([binding], index) => binding.scope.rename(binding.identifier.name, prefix + index));
  list.forEach(([binding, name], index) => binding.scope.rename(prefix + index, name));
  return list.length;
}

// Canonicalization is for evidence only. Production statements are not rewritten.
function normalize(tree) {
  traverse(tree, {
    BlockStatement: {
      exit(p) {
        const body = p.node.body;
        for (let i = body.length - 2; i >= 0; i--) {
          const guard = body[i],
            tail = body[i + 1];
          if (i !== body.length - 2 || !t.isIfStatement(guard) || guard.alternate || !t.isReturnStatement(tail)) continue;
          const arm = t.isBlockStatement(guard.consequent) ? guard.consequent.body : [guard.consequent];
          if (arm.length !== 1 || !t.isReturnStatement(arm[0]) || !t.isBooleanLiteral(arm[0].argument)) continue;
          const positive = arm[0].argument.value;
          let expression;
          if (t.isBooleanLiteral(tail.argument, {
            value: !positive
          })) expression = positive ? t.unaryExpression('!', t.unaryExpression('!', guard.test)) : t.unaryExpression('!', guard.test);else expression = t.logicalExpression(positive ? '||' : '&&', positive ? t.unaryExpression('!', t.unaryExpression('!', guard.test)) : t.unaryExpression('!', guard.test), tail.argument || t.unaryExpression('void',t.numericLiteral(0)));
          body.splice(i, 2, t.returnStatement(expression));
        }
      }
    },
    LogicalExpression: {
      exit(p) {
        const n = p.node;
        if (!['&&', '||'].includes(n.operator)) return;
        const terms = [];
        function gather(x) {
          if (t.isLogicalExpression(x, {
            operator: n.operator
          })) {
            gather(x.left);
            gather(x.right);
          } else terms.push(x);
        }
        gather(n);
        if (terms.length > 2) {
          const result = terms.reduce((a, b) => t.logicalExpression(n.operator, a, b));
          if (!t.isNodesEquivalent(result, n)) p.replaceWith(result);
        }
      }
    }
  });
  traverse(tree, {
    BlockStatement: {
      exit(p) {
        const body = p.node.body;
        for (let i = 0; i < body.length - 1; i++) {
          const guard = body[i];
          if (!t.isIfStatement(guard) || guard.alternate) continue;
          const arm = t.isBlockStatement(guard.consequent) ? guard.consequent.body : [guard.consequent];
          if (arm.length !== 1) continue;
          const exit = arm[0],
            last = body.at(-1);
          const emptyReturn = t.isReturnStatement(exit) && (!exit.argument || t.isIdentifier(exit.argument, {
            name: 'undefined'
          }) && !p.scope.getBinding('undefined'));
          const sameReturn = t.isReturnStatement(exit) && t.isReturnStatement(last) && t.isNodesEquivalent(exit.argument, last.argument);
          const loopContinue = t.isContinueStatement(exit) && !exit.label && p.parentPath.isLoop();
          if (!(emptyReturn && p.parentPath.isFunction() || sameReturn || loopContinue)) continue;
          const tail = body.slice(i + 1, sameReturn ? -1 : undefined);
          if (!tail.length) continue;
          if(tail.some(statement=>t.isFunctionDeclaration(statement)||t.isClassDeclaration(statement)||t.isVariableDeclaration(statement)&&statement.kind!=='var'))continue;
          const replacement = t.ifStatement(t.unaryExpression('!', guard.test), t.blockStatement(tail));
          p.node.body = [...body.slice(0, i), replacement, ...(sameReturn ? [last] : [])];
          break;
        }
      }
    },
    UnaryExpression(p) {
      const n = p.node;
      if (n.operator === '!' && t.isBinaryExpression(n.argument) && ['===', '!==', '==', '!='].includes(n.argument.operator)) {
        const a = n.argument,
          op = {
            '===': '!==',
            '!==': '===',
            '==': '!=',
            '!=': '=='
          }[a.operator];
        p.replaceWith(t.binaryExpression(op, a.left, a.right));
      }
    }
  });
  const boolean = n => t.isBooleanLiteral(n) || t.isUnaryExpression(n, {
    operator: '!'
  }) || t.isBinaryExpression(n) && ['<', '>', '<=', '>=', '===', '!==', '==', '!=', 'in', 'instanceof'].includes(n.operator);
  traverse(tree, {
    ReturnStatement: {
      exit(p) {
        const a = p.node.argument;
        if (t.isUnaryExpression(a, {
          operator: 'void'
        })) {
          p.replaceWithMultiple([t.expressionStatement(a.argument), t.returnStatement()]);
          return;
        }
      }
    },
    BinaryExpression(p) {
      if (['==', '!='].includes(p.node.operator) && (boolean(p.node.left) && boolean(p.node.right) || t.isIdentifier(p.node.left) && p.scope.getBinding(p.node.left.name) && t.isNodesEquivalent(p.node.left, p.node.right))) p.node.operator = p.node.operator === '==' ? '===' : '!==';
    },
    BlockStatement: {
      exit(p) {
        const body = p.node.body;
        if (p.parentPath.isFunction() && body.length) {
          const last = body.at(-1);
          if (t.isReturnStatement(last) && (!last.argument || t.isIdentifier(last.argument, {
            name: 'undefined'
          }) && !p.scope.getBinding('undefined'))) body.pop();
        }
        const funcs = body.filter(n => t.isFunctionDeclaration(n));
        if (funcs.length) p.node.body = [...funcs, ...body.filter(n => !t.isFunctionDeclaration(n))];
      }
    },
    IfStatement: {
      exit(p) {
        const n = p.node;
        if (t.isBlockStatement(n.consequent) && ['ReturnStatement', 'ThrowStatement'].includes(n.consequent.body.at(-1)?.type) && t.isBlockStatement(n.alternate)) {
          if(n.alternate.body.some(statement=>t.isFunctionDeclaration(statement)||t.isClassDeclaration(statement)||t.isVariableDeclaration(statement)&&statement.kind!=='var'))return;
          const rest = n.alternate.body;
          n.alternate = null;
          p.replaceWithMultiple([n, ...rest]);
        }
      }
    }
  });
  traverse(tree, {
    VariableDeclaration: {
      exit(p) {
        if (p.node.kind !== 'const' || p.node.declarations.length !== 1 || !p.inList) return;
        const d = p.node.declarations[0];
        if (!t.isIdentifier(d.id) || !d.init || !['CallExpression', 'MemberExpression', 'BinaryExpression', 'UnaryExpression'].includes(d.init.type)) return;
        const binding = p.scope.getBinding(d.id.name);
        if (!binding || binding.referencePaths.length !== 1 || binding.constantViolations.length) return;
        const next = p.getSibling(Number(p.key) + 1);
        if (!next.node) return;
        const ref = binding.referencePaths[0];
        let first = next.isReturnStatement() ? next.get('argument') : next.isExpressionStatement() ? next.get('expression') : next.isVariableDeclaration() && next.node.declarations.length === 1 ? next.get('declarations.0.init') : null;
        if (!first?.node) return;
        if (first.isCallExpression() && first.get('callee').isMemberExpression()) first = first.get('callee.object');
        if (first.node !== ref.node) return;
        let forbidden = false;
        traverse(d.init, {
          noScope: true,
          CallExpression(q) {
            if (t.isIdentifier(q.node.callee, {
              name: 'eval'
            })) forbidden = true;
          },
          Function(q) {
            forbidden = true;
          }
        });
        if (forbidden) return;
        ref.replaceWith(t.cloneNode(d.init, true));
        p.remove();
      }
    }
  });
  const number = n => t.isNumericLiteral(n) ? n.value : t.isUnaryExpression(n) && ['+', '-'].includes(n.operator) && t.isNumericLiteral(n.argument) ? n.operator === '-' ? -n.argument.value : n.argument.value : null;
  const int32 = n => t.isBinaryExpression(n) && ['|', '&', '^', '<<', '>>'].includes(n.operator);
  traverse(tree, {
    BinaryExpression: {
      exit(p) {
        const n = p.node,
          a = number(n.left),
          b = number(n.right);
        if (a !== null && b !== null && ['+', '-', '*', '/', '%', '**', '|', '&', '^', '<<', '>>', '>>>'].includes(n.operator)) {
          const ops = {
            '+': () => a + b,
            '-': () => a - b,
            '*': () => a * b,
            '/': () => a / b,
            '%': () => a % b,
            '**': () => a ** b,
            '|': () => a | b,
            '&': () => a & b,
            '^': () => a ^ b,
            '<<': () => a << b,
            '>>': () => a >> b,
            '>>>': () => a >>> b
          };
          const v = ops[n.operator]();
          if (Number.isFinite(v)) {
            p.replaceWith(t.valueToNode(v));
            return;
          }
          if (!Number.isNaN(v) && !p.scope.getBinding('Infinity')) {
            p.replaceWith(v < 0 ? t.unaryExpression('-', t.identifier('Infinity')) : t.identifier('Infinity'));
            return;
          }
        }
        if (['*', '&', '|', '^'].includes(n.operator) && a !== null && b === null) {
          [n.left, n.right] = [n.right, n.left];
        }
        if (n.operator === '|' && number(n.right) === 0 && int32(n.left)) {
          p.replaceWith(n.left);
          return;
        }
        if (n.operator === '!==' && number(n.right) === 0 && int32(n.left)) p.replaceWith(t.unaryExpression('!', t.unaryExpression('!', n.left)));
      }
    },
    UnaryExpression(p) {
      if (p.node.operator === '+' && t.isIdentifier(p.node.argument, {
        name: 'Infinity'
      }) && !p.scope.getBinding('Infinity')) p.replaceWith(p.node.argument);
    }
  });
  traverse(tree, {
    ReturnStatement: {
      exit(p) {
        if (t.isConditionalExpression(p.node.argument)) {
          const n = p.node.argument;
          p.replaceWithMultiple([t.ifStatement(n.test, t.blockStatement([t.returnStatement(n.consequent)])), t.returnStatement(n.alternate)]);
        }
      }
    },
    ConditionalExpression(p) {
      let n = p.node;
      if (t.isBooleanLiteral(n.consequent, {
        value: true
      }) && t.isBooleanLiteral(n.alternate, {
        value: false
      })) p.replaceWith(t.unaryExpression('!', t.unaryExpression('!', n.test)));
    },
    enter(p) {
      delete p.node.extra;
    },
    UnaryExpression(p) {
      if (p.node.operator === 'void' && t.isNumericLiteral(p.node.argument, {
        value: 0
      }) && !p.scope.getBinding('undefined')) p.replaceWith(t.identifier('undefined'));
    },
    BinaryExpression(p) {
      let n = p.node;
      if (['===', '!==', '==', '!='].includes(n.operator) && (t.isLiteral(n.left) || t.isUnaryExpression(n.left) && t.isNumericLiteral(n.left.argument) || (t.isIdentifier(n.left,{name:'undefined'})&&!p.scope.getBinding('undefined'))) && !(t.isLiteral(n.right) || t.isUnaryExpression(n.right) && t.isNumericLiteral(n.right.argument) || (t.isIdentifier(n.right,{name:'undefined'})&&!p.scope.getBinding('undefined')))) {
        [n.left, n.right] = [n.right, n.left];
      }
      if (['==', '!='].includes(n.operator) && t.isUnaryExpression(n.left, {
        operator: 'typeof'
      }) && t.isStringLiteral(n.right)) n.operator = n.operator === '==' ? '===' : '!==';
    },
    'ForStatement|ForInStatement|ForOfStatement|WhileStatement|DoWhileStatement'(p) {
      if (!t.isBlockStatement(p.node.body)) p.node.body = t.blockStatement([p.node.body]);
    }
  });
  traverse(tree, {
    VariableDeclaration(p) {
      if (p.node.declarations.length > 1 && !p.parentPath.isForStatement()) p.replaceWithMultiple(p.node.declarations.map(decl => t.variableDeclaration(p.node.kind, [decl])));
    },
    UnaryExpression(p) {
      if (p.node.operator === '!' && t.isNumericLiteral(p.node.argument) && [0, 1].includes(p.node.argument.value)) p.replaceWith(t.booleanLiteral(p.node.argument.value === 0));
    },
    ExpressionStatement: {
      exit(p) {
        const e = p.node.expression;
        if (t.isSequenceExpression(e)) p.replaceWithMultiple(e.expressions.map(t.expressionStatement));else if (t.isConditionalExpression(e)) p.replaceWith(t.ifStatement(e.test, t.blockStatement([t.expressionStatement(e.consequent)]), t.blockStatement([t.expressionStatement(e.alternate)])));else if (t.isLogicalExpression(e) && ['&&', '||'].includes(e.operator)) p.replaceWith(t.ifStatement(e.operator === '&&' ? e.left : t.unaryExpression('!', e.left), t.blockStatement([t.expressionStatement(e.right)])));
      }
    },
    ReturnStatement: {
      exit(p) {
        if (t.isSequenceExpression(p.node.argument)) {
          const es = p.node.argument.expressions;
          p.replaceWithMultiple([...es.slice(0, -1).map(t.expressionStatement), t.returnStatement(es.at(-1))]);
        }
      }
    },
    IfStatement: {
      exit(p) {
        if (t.isSequenceExpression(p.node.test)) {
          const es = p.node.test.expressions;
          p.node.test = es.at(-1);
          p.replaceWithMultiple([...es.slice(0, -1).map(t.expressionStatement), p.node]);
          return;
        }
        if (!t.isBlockStatement(p.node.consequent)) p.node.consequent = t.blockStatement([p.node.consequent]);
        if (p.node.alternate && !t.isBlockStatement(p.node.alternate)) p.node.alternate = t.blockStatement([p.node.alternate]);
      }
    }
  });
  return tree;
}
function collect(tree) {
  const methods = new Map(),
    classes = new Map();
  traverse(tree, {
    'ClassDeclaration|ClassExpression'(p) {
      if(p.node.id)classes.set(p.node.id.name, p);
    },
    ClassMethod(p) {
      const owner = p.findParent(q => q.isClassDeclaration() || q.isClassExpression());
      if (!owner || !owner.node.id) return;
      const key = owner.node.id.name + '.' + (p.node.static ? 'static:' : '') + p.node.kind + ':' + g(p.node.key).code;
      methods.set(key, p);
    }
  });
  return {
    methods,
    classes
  };
}
function canonical(method, abstractModule = true) {
  const originalBindings = [],
    seen = new Set(),
    allScopes = [method.scope];
  method.traverse({
    Scope(p) {
      allScopes.push(p.scope);
    }
  });
  for (const scope of allScopes) for (const binding of Object.values(scope.bindings)) if (!seen.has(binding)) {
    seen.add(binding);
    originalBindings.push(binding);
  }
  const externalMap = new Map(),
    externalNames = [];
  method.traverse({
    Identifier(p) {
      if (!(p.isReferencedIdentifier() || p.isBindingIdentifier())) return;
      const binding = p.scope.getBinding(p.node.name);
      if (binding && !seen.has(binding)) {
        const target = binding.identifier.name;
        if (!externalMap.has(target)) {
          externalMap.set(target, externalMap.size);
          externalNames.push({
            name: target,
            binding
          });
        }
      }
    }
  });
  const clone = t.classDeclaration(t.identifier('CanonicalOwner'), t.identifier('CanonicalBase'), t.classBody([!method.isClassMethod() ? t.classMethod('method', t.identifier('helper'), method.node.params.map(n => t.cloneNode(n, true)), t.cloneNode(method.node.body, true), false, false, method.node.generator, method.node.async) : t.cloneNode(method.node, true)]));
  const tree = t.file(t.program([clone]));
  normalize(normalize(tree));
  traverse(tree, {
    Program(p) {
      p.scope.crawl();
    }
  });
  let copiedMethod;
  traverse(tree, {
    ClassMethod(p) {
      if (!copiedMethod) copiedMethod = p;
    }
  });
  const copiedBindings = [],
    copiedSeen = new Set(),
    scopes = [copiedMethod.scope];
  copiedMethod.traverse({
    Scope(p) {
      scopes.push(p.scope);
    }
  });
  for (const scope of scopes) for (const binding of Object.values(scope.bindings)) if (!copiedSeen.has(binding)) {
    copiedSeen.add(binding);
    copiedBindings.push(binding);
  }
  renameTasks(copiedBindings.map((binding, index) => [binding, 'localBinding' + index]), 'canonicalLocalTemporary');
  const normalizedExternalMap = new Map();
  if (abstractModule) copiedMethod.traverse({
    Identifier(p) {
      if (!(p.isReferencedIdentifier() || p.isBindingIdentifier())) return;
      if (!p.scope.getBinding(p.node.name) && externalMap.has(p.node.name)) {
        if (!normalizedExternalMap.has(p.node.name)) normalizedExternalMap.set(p.node.name, normalizedExternalMap.size);
        p.node.name = 'moduleReference' + normalizedExternalMap.get(p.node.name);
      }
    }
  });
  const code = g(normalize(normalize(tree)), {
    comments: false,
    compact: true
  }).code;
  return {
    hash: crypto.createHash('sha256').update(code).digest('hex'),
    bindings: copiedBindings.map(b => originalBindings.find(o => o.identifier.loc?.start.index === b.identifier.loc?.start.index)),
    externalNames,
    code
  };
}
module.exports = {
  normalize,
  collect,
  canonical,
  renameTasks
};

// Research entry point; never called by the application build or CPU guards.
if (require.main === module) {
  const {
    compareThreeAlpha
  } = require('./three-alpha-contract.cjs');
  const sourcePath = 'eyes/src/vendor/three/core.js',
    baselineRef = process.argv.find(a => a.startsWith('--baseline-ref='))?.split('=')[1],
    source = baselineRef ? require('node:child_process').execFileSync('git', ['show', baselineRef + ':' + sourcePath], {
      encoding: 'utf8'
    }) : fs.readFileSync(sourcePath, 'utf8');
  const paths = ['artifacts/upstream/r1850/package/build/three.core.js', 'artifacts/upstream/r1851/package/build/three.core.js'];
  const trees = [source, ...paths.map(p => fs.readFileSync(p, 'utf8'))].map(s => parser.parse(s, {
    sourceType: 'module'
  }));
  const sets = trees.map(collect),
    tasks = [],
    matched = [],
    unmatched = [],
    helpers = [],
    functionSets = [];
  const digest = s => crypto.createHash('sha256').update(s).digest('hex');
  const expectedUpstreams = ['78b2c4218834ca8670547ed2315bfc21a00ff4dc3403bbffc8c31493d31d14de', '3718df126d69c125362a03340913204470d8c50238605150e57f808840fb7759'];
  paths.forEach((p, i) => {
    if (digest(fs.readFileSync(p)) !== expectedUpstreams[i]) throw Error('Official reference digest mismatch: ' + p);
  });
  // A structural first difference is retained for every rejected comparison.
  function clean(n) {
    if (!n || typeof n !== 'object') return n;
    if (Array.isArray(n)) return n.map(clean);
    return Object.fromEntries(Object.entries(n).filter(([k]) => !['start', 'end', 'loc', 'extra', 'leadingComments', 'trailingComments', 'innerComments'].includes(k)).map(([k, v]) => [k, clean(v)]));
  }
  function difference(a, b, path = 'root') {
    if (JSON.stringify(a) === JSON.stringify(b)) return null;
    if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return {
      path,
      local: a,
      upstream: b
    };
    if (a.type !== b.type) return {
      path: path + '.type',
      local: a.type,
      upstream: b.type
    };
    if (Array.isArray(a) && a.length !== b.length) return {
      path: path + '.length',
      local: a.length,
      upstream: b.length
    };
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
      const d = difference(a[k], b[k], path + '.' + k);
      if (d) return d;
    }
  }
  function diff(a, b) {
    return difference(clean(parser.parse(a.code)), clean(parser.parse(b.code)));
  }
  function adopt(local, a, b, label) {
    const x = canonical(local),
      y = canonical(a),
      z = canonical(b);
    if (x.hash !== y.hash || y.hash !== z.hash) return {
      ok: false,
      difference: diff(x, y),
      patchDifference: y.hash !== z.hash ? diff(y, z) : null
    };
    const names = y.bindings.map(v => v.identifier.name);
    if (JSON.stringify(names) !== JSON.stringify(z.bindings.map(v => v.identifier.name)) || names.length !== x.bindings.length) return {
      ok: false,
      bindingCounts: [x.bindings.length, y.bindings.length, z.bindings.length]
    };
    const changes = [];
    x.bindings.forEach((binding, i) => {
      if (binding.identifier.name !== names[i]) {
        changes.push([binding.identifier.name, names[i]]);
        tasks.push([binding, names[i], label]);
      }
    });
    return {
      ok: true,
      key: label,
      changes,
      upstreamLines: [a.node.loc.start.line, b.node.loc.start.line]
    };
  }
  for (const [key, method] of sets[0].methods) {
    const a = sets[1].methods.get(key),
      b = sets[2].methods.get(key);
    if (!a || !b) {
      unmatched.push({
        key,
        reason: 'reference method absent'
      });
      continue;
    }
    const result = adopt(method, a, b, key);
    (result.ok ? matched : unmatched).push({
      ...result,
      key
    });
  }
  for (const tree of trees) {
    const map = new Map();
    traverse(tree, {
      FunctionDeclaration(p) {
        if (p.parentPath.isProgram()) map.set(p.node.id.name, p);
      }
    });
    functionSets.push(map);
  }
  const canonicalCache = new Map();
  function cached(p) {
    if (!canonicalCache.has(p)) canonicalCache.set(p, canonical(p));
    return canonicalCache.get(p);
  }
  const indexes = functionSets.slice(1).map(set => {
    const index = new Map();
    for (const [name, p] of set) {
      const h = cached(p).hash;
      index.set(h, [...(index.get(h) || []), {
        name,
        path: p
      }]);
    }
    return index;
  });
  let program;
  traverse(trees[0], {
    Program(p) {
      program = p;
    }
  });
  const moduleTasks = [];
  for (const [name, p] of functionSets[0]) {
    const local = cached(p),
      a = indexes[0].get(local.hash) || [],
      b = indexes[1].get(local.hash) || [];
    if (a.length === 1 && b.length === 1 && a[0].name === b[0].name) {
      const target = a[0].name,
        result = adopt(p, a[0].path, b[0].path, name);
      let moduleRename = false;
      if (result.ok && target !== name && !program.scope.hasOwnBinding(target)) {
        moduleTasks.push([program.scope.getBinding(name), target]);
        moduleRename = true;
      }
      helpers.push({
        ...result,
        key: name,
        target,
        moduleRename
      });
    } else {
      // Same name, when available, provides a bounded comparison; otherwise retain
      // the closest first-difference count without claiming an identity match.
      const same = functionSets[1].get(name);
      let nearest = null;
      helpers.push({
        key: name,
        ok: false,
        reason: a.length || b.length ? 'ambiguous or patch-disagreeing structural candidates' : 'no exact structural candidate',
        candidateCounts: [a.length, b.length],
        comparison: same ? {
          candidate: name,
          difference: diff(local, canonical(same))
        } : nearest
      });
    }
  }
  const expressionDetails=[],rootExpressions=trees.map(tree=>{const result=[];traverse(tree,{Function(p){if(p.isClassMethod()||p.findParent(q=>q.isFunction())||!t.isBlockStatement(p.node.body))return;const property=p.parentPath.isObjectProperty()?p.parentPath.node.key:p.isObjectMethod()?p.node.key:null;const role=p.node.id?.name||property?.name||property?.value;if(role)result.push({path:p,role,key:(p.findParent(q=>q.isVariableDeclarator())?.node.id.name||'module')+'.'+role});}});return result;});
  for(const local of rootExpressions[0].filter(x=>!x.path.isFunctionDeclaration())){const shape=cached(local.path),candidates=rootExpressions.slice(1).map(set=>set.filter(x=>x.role===local.role&&cached(x.path).hash===shape.hash));const label='expression:'+local.key;
    if(candidates.every(set=>set.length===1)){expressionDetails.push({...adopt(local.path,candidates[0][0].path,candidates[1][0].path,label),role:local.role});}
    else{const reference=rootExpressions[1].find(x=>x.role===local.role);expressionDetails.push({key:label,ok:false,role:local.role,candidateCounts:candidates.map(x=>x.length),difference:reference?diff(shape,cached(reference.path)):'no same property-role reference'});}
  }
  const manualEvidence={
  "warn": {
    "target": "warn",
    "note": "console.warn 分支及增强日志调用",
    "localHash": "ad2f674f982922528484f487a6c1dcd364f4c9874f21f7a40088139d2d507220",
    "upstreamHashes": [
      "91720f6c8657ed94c61687787abe8803d0b15cb98ee3d0b175c8d0a316563612",
      "91720f6c8657ed94c61687787abe8803d0b15cb98ee3d0b175c8d0a316563612"
    ]
  },
  "error": {
    "target": "error",
    "note": "console.error 分支及增强日志调用",
    "localHash": "37c7be2732a0f0ccf4c41477e347dae12f002368858d8b4dbe26af0ba4952905",
    "upstreamHashes": [
      "bcc0245171f21116f515b7839b52c62bc8d3c6d0137cc02b7ba8ce5a0cd171e6",
      "bcc0245171f21116f515b7839b52c62bc8d3c6d0137cc02b7ba8ce5a0cd171e6"
    ]
  },
  "yieldToMain": {
    "target": "yieldToMain",
    "note": "scheduler.yield 与延迟调度回退",
    "localHash": "f8ed22efd69fd00b12e4b9faec785e627e99cf8a6f2bd260fa6aaf3d352f5c23",
    "upstreamHashes": [
      "f040887dcca8492f7eab3371c6dd130c74d6a1fada5dafac5b6c048145d950ca",
      "f040887dcca8492f7eab3371c6dd130c74d6a1fada5dafac5b6c048145d950ca"
    ]
  },
  "probeAsync": {
    "target": "probeAsync",
    "note": "WebGL clientWaitSync 的轮询与 WAIT_FAILED/CONDITION_SATISFIED 分支",
    "localHash": "202d1f50166b27061c07d4cf882c75974ab70683905e0a7b8a750de15e6418fa",
    "upstreamHashes": [
      "2ab25ffde676b06981b345de08efd323f706ed66f94aaf5e41ddae441209ecb8",
      "2ab25ffde676b06981b345de08efd323f706ed66f94aaf5e41ddae441209ecb8"
    ]
  },
  "Dr": {
    "target": "createColorManagement",
    "note": "workingColorSpace/spaces/convert/getTransfer 色彩管理对象工厂",
    "localHash": "8a6548c549d4b5ba7ea4f124f589e5517e6ef48a2cb0778908c8a520dc2b46fe",
    "upstreamHashes": [
      "bc24e7b1681a1696f6b7eaa95314c4b72830e947fc03c2e71a3f8568f4a204bc",
      "bc24e7b1681a1696f6b7eaa95314c4b72830e947fc03c2e71a3f8568f4a204bc"
    ]
  },
  "ji": {
    "target": "_generateTables",
    "note": "512/2048/64项半精度指数尾数位表的构造和返回",
    "localHash": "4fa6f19b21553ea95704d3fd70e22fdc0257929341c8993e83a6a086c57fa439",
    "upstreamHashes": [
      "fa60b6e1faee53525aded3f9ab6b54c1a95765d3aa5553c9cc4c89f2d3a0919b",
      "fa60b6e1faee53525aded3f9ab6b54c1a95765d3aa5553c9cc4c89f2d3a0919b"
    ]
  },
  "Ga": {
    "target": "checkGeometryIntersection",
    "note": "取三顶点、射线三角形求交、uv/normal 插值及 face/barycoord 命中结果",
    "localHash": "4cb50760508db96e1a8565ec4c12e92d7512a0312a7b6d151bb1b7af066e86f7",
    "upstreamHashes": [
      "d579afbc802c446896a2988d51bd5c9214508e9c1e4ea45916ef20f032ab1270",
      "d579afbc802c446896a2988d51bd5c9214508e9c1e4ea45916ef20f032ab1270"
    ]
  },
  "Fs": {
    "target": "checkIntersection",
    "note": "线段端点与 distanceSqToSegment、near/far 和 index 命中结果",
    "localHash": "3094f5f8ae208fdd2e1036febfcf364a6cb69ed9d914af11212f47db7ed9a2ec",
    "upstreamHashes": [
      "ca7dc682d89073c1daa03285f8ba45aef126349893007034b6d0b1ac5a982761",
      "ca7dc682d89073c1daa03285f8ba45aef126349893007034b6d0b1ac5a982761"
    ]
  },
  "Zs": {
    "target": "CubicPoly",
    "note": "initCatmullRom/initNonuniformCatmullRom/calc 四系数多项式工厂",
    "localHash": "71db6f3717628615bf2428c892ca0155f87570fdaf08a6b29faaaa5e1e440da7",
    "upstreamHashes": [
      "1a45f50a40a3bd92aeb16f81fb27dfc9c232aa7e697ad479362a706637d6dcac",
      "1a45f50a40a3bd92aeb16f81fb27dfc9c232aa7e697ad479362a706637d6dcac"
    ]
  },
  "ao": {
    "target": "CatmullRom",
    "note": "四控制点 Catmull-Rom 的二次三次项公式及曲线调用",
    "localHash": "537dac0545055866b704efe17e2023dc96b97fc6c670f336bce61778a43319e0",
    "upstreamHashes": [
      "7a4152fcd9f5da8d6d1e3d381485bd6edff084396d8c44b18971b8c7030c7d06",
      "7a4152fcd9f5da8d6d1e3d381485bd6edff084396d8c44b18971b8c7030c7d06"
    ]
  },
  "so": {
    "target": "QuadraticBezier",
    "note": "(1-t)^2 p0 + 2(1-t)t p1 + t^2 p2 公式及曲线调用",
    "localHash": "4511baad6e7fd583eb1b0b606020883004f8a3a9059b4c4ab52874e6ecee36e0",
    "upstreamHashes": [
      "c4301c89bd14e8a2ec2bedc9b2a30422e5f22541d68f93ca385a7f9107cd366e",
      "c4301c89bd14e8a2ec2bedc9b2a30422e5f22541d68f93ca385a7f9107cd366e"
    ]
  },
  "oo": {
    "target": "CubicBezier",
    "note": "三次 Bernstein 四权重公式及曲线调用",
    "localHash": "4f49517abc920d7cb1752d656e389a73139875fa7681d7f61181824cec11e94a",
    "upstreamHashes": [
      "5fa6e4412a22c7dbcfddad16196e2113ab4c6bb3387dab0bb1266f223ac1f5e3",
      "5fa6e4412a22c7dbcfddad16196e2113ab4c6bb3387dab0bb1266f223ac1f5e3"
    ]
  },
  "lo": {
    "target": "earcut",
    "note": "维度参数、孔环消除、三角索引输出的 Earcut 入口",
    "localHash": "f83ea69d50d43f2e1f1572b4cab432b510f2962b809dad271f045452ae535675",
    "upstreamHashes": [
      "85130c3afa9538da65929b7c1bb27a1609cf22d5d997a75c7712fb5315dad8a7",
      "85130c3afa9538da65929b7c1bb27a1609cf22d5d997a75c7712fb5315dad8a7"
    ]
  },
  "uo": {
    "target": "linkedList",
    "note": "按面积方向构建环状顶点链并去重复端点",
    "localHash": "76459911cbdda50f6cc37218c0abf10f297dbb0b1fc8a5056e9850af0d394aea",
    "upstreamHashes": [
      "88f8abb27f80ecc3a01afbde282ae55edcb598cfd7443605e967ae0830337586",
      "88f8abb27f80ecc3a01afbde282ae55edcb598cfd7443605e967ae0830337586"
    ]
  },
  "ho": {
    "target": "filterPoints",
    "note": "删除相等或共线的非 Steiner 顶点",
    "localHash": "73cd632af8c98b4bf08364ffc1530d5e715e36a552ac662d253683177d631488",
    "upstreamHashes": [
      "86ec30e8a2313850dd2f639573d9a867aabc23e5ce69acb8105dd769ee754da5",
      "86ec30e8a2313850dd2f639573d9a867aabc23e5ce69acb8105dd769ee754da5"
    ]
  },
  "po": {
    "target": "earcutLinked",
    "note": "顺环剪耳、空间索引及多遍恢复调度",
    "localHash": "e4be83703846e743cf6de67a9bce13fa24635a71f13c112bacbb6f7522ca6859",
    "upstreamHashes": [
      "3cdff95c98244d52031ad17c5cb352bbea93c6f3448733d5016e235b6c9abfda",
      "3cdff95c98244d52031ad17c5cb352bbea93c6f3448733d5016e235b6c9abfda"
    ]
  },
  "fo": {
    "target": "isEar",
    "note": "凸性和其他顶点在候选耳内检测",
    "localHash": "53c2309d94c639bef9a2d8f1685bd0995d44b4edc5b9b2c2f32cd4e9e038bce4",
    "upstreamHashes": [
      "50f27b8c42c71e57547167639fab723f36549397c88854d39ceb90c223c67649",
      "50f27b8c42c71e57547167639fab723f36549397c88854d39ceb90c223c67649"
    ]
  },
  "mo": {
    "target": "isEarHashed",
    "note": "耳包围盒 z 序范围筛选和点内检测",
    "localHash": "38f2d40ce4975d8f7ed7eb544dd81389d957c35139415f40e8bd7e1fe3428c86",
    "upstreamHashes": [
      "11416d77ee455452dbf5b6366a700bbd8027d3b52a3ee7c94c2bce4fa3563ade",
      "11416d77ee455452dbf5b6366a700bbd8027d3b52a3ee7c94c2bce4fa3563ade"
    ]
  },
  "_o": {
    "target": "splitEarcut",
    "note": "搜索有效对角线、拆环并递归剪耳",
    "localHash": "0bb78453c26610c053c6951e5518fd6fc803de7a275523269e1ce206cc8b8b38",
    "upstreamHashes": [
      "32494adb9b6e8910c54445b0c89977d44668af17485e41ba999ece07a90c69fa",
      "32494adb9b6e8910c54445b0c89977d44668af17485e41ba999ece07a90c69fa"
    ]
  },
  "Ao": {
    "target": "compareXYSlope",
    "note": "孔队列的 x、y、出边斜率三级排序比较",
    "localHash": "141870edc2dbb8d544e37c542384e3b5a5a065be2a0430df0c63e23aee08e1f0",
    "upstreamHashes": [
      "7e05b99c8acffbc7fab32db17f48f8e21b8ea8c0d152d587f7f9e0336bd9543e",
      "7e05b99c8acffbc7fab32db17f48f8e21b8ea8c0d152d587f7f9e0336bd9543e"
    ]
  },
  "go": {
    "target": "eliminateHole",
    "note": "桥接孔和外环并过滤桥边；findHoleBridge 已内联",
    "localHash": "4bd25b6b2298926e34c462f510a0520268f24ce8274f8ac2742fa46a93a1e4c8",
    "upstreamHashes": [
      "afde4a4bcae6c84d3b3d6a066f6cfb852aef9b6d229da3b7cbe8cd8bcc26102a",
      "afde4a4bcae6c84d3b3d6a066f6cfb852aef9b6d229da3b7cbe8cd8bcc26102a"
    ]
  },
  "yo": {
    "target": "zOrder",
    "note": "0x55555555/0x33333333/0x0f0f0f0f 位交织 Morton 编码",
    "localHash": "1f82bab69f6097a6befd462fe4c7f4eb4b83bdf4d85bad40236c8265d340c79e",
    "upstreamHashes": [
      "0e0a13cb9e88b1fa438ffe1af94161fe0311badbd3a212cdd1ed5d6f41178f24",
      "0e0a13cb9e88b1fa438ffe1af94161fe0311badbd3a212cdd1ed5d6f41178f24"
    ]
  },
  "So": {
    "target": "isValidDiagonal",
    "note": "相邻索引排除、边交叉、局部可见与中点内测试（后两辅助被内联）",
    "localHash": "b36f4cdf32166d1076a1af236b4c0200be6031cca08a2cb43c880862a7277864",
    "upstreamHashes": [
      "5ae897e9a357dd29efd3e25916bc9ddc52bb8adcad187bcce29d2b54ba69b9d6",
      "5ae897e9a357dd29efd3e25916bc9ddc52bb8adcad187bcce29d2b54ba69b9d6"
    ]
  },
  "xo": {
    "target": "intersects",
    "note": "四个有向面积符号和共线 onSegment 分支",
    "localHash": "ee33d0ae9b6e89065b5f31be1016ab6b075afcd8a760326892f96e7e7085eaa3",
    "upstreamHashes": [
      "c4d2e6207848d1af87e2c31889a1813ccaca2de5620ffaaba372be41f81f372b",
      "c4d2e6207848d1af87e2c31889a1813ccaca2de5620ffaaba372be41f81f372b"
    ]
  },
  "Do": {
    "target": "insertNode",
    "note": "createNode 后接入双向环，空环自连",
    "localHash": "218f347a8de24455fb4db6e5830ff2125ac007936959996456935d85ffb7c59a",
    "upstreamHashes": [
      "2de0476764c0843433be0f309e49041010036a503104a445c8a9bf6dcf708d1b",
      "2de0476764c0843433be0f309e49041010036a503104a445c8a9bf6dcf708d1b"
    ]
  },
  "Yo": {
    "target": "isUniqueEdge",
    "note": "将三维端点序列化为正反向字符串键，查询并写入 Set 以排除重复边",
    "localHash": "96a603ebb5e27393bca042ec9dfa74b7b6a2cd3dd48a31808094a3829fb76090",
    "upstreamHashes": [
      "7141962859d274a1e2b484214b4f9e8dffd6f747ba38677c8e62ce8b498fbe26",
      "7141962859d274a1e2b484214b4f9e8dffd6f747ba38677c8e62ce8b498fbe26"
    ]
  },
  "Xo": {
    "target": "convertArray",
    "note": "构造器一致保留原数组，TypedArray BYTES_PER_ELEMENT 与普通数组转换",
    "localHash": "7b844706c06c4004545a7f0a3734efd1020c6e740442b91292cc2131ca212113",
    "upstreamHashes": [
      "d4423729ab405e7e01750ae60e117083ee7be78ce2d52eb246de399fa961d2d9",
      "d4423729ab405e7e01750ae60e117083ee7be78ce2d52eb246de399fa961d2d9"
    ]
  },
  "jo": {
    "target": "getKeyframeOrder",
    "note": "按 times 排序的原始索引数组",
    "localHash": "265ae3717a63d595d7fb87f156ccbfed4731fffd7b69d1522eb0636761baaffc",
    "upstreamHashes": [
      "757bf5a85558fc1829c5efe521b969064762e46d987170051ba88ba20ed03bb3",
      "757bf5a85558fc1829c5efe521b969064762e46d987170051ba88ba20ed03bb3"
    ]
  },
  "Qo": {
    "target": "flattenJSON",
    "note": "提取 time 与 valuePropertyName，处理数组/toArray/标量",
    "localHash": "6ab4316984c90e74a974a0b22e4166d9a35dd6ea0eb179f90a176e5f071c0ff7",
    "upstreamHashes": [
      "65936f7c356f516eb7285cae38e8cf2c44527da07a848e7d5b168f13e960181d",
      "65936f7c356f516eb7285cae38e8cf2c44527da07a848e7d5b168f13e960181d"
    ]
  },
  "Ko": {
    "target": "parseKeyframeTrack",
    "note": "由 JSON type/name/times/values/interpolation 构造对应关键帧轨道；类型分派已内联",
    "localHash": "2e053a5ff77679b2b8088b8c26c95f6006150dde9c40abf000242d5a8f263497",
    "upstreamHashes": [
      "76666a55abc5067d82f73e60c45fdd64d6313fffb15347211d37aa5a28ccd717",
      "76666a55abc5067d82f73e60c45fdd64d6313fffb15347211d37aa5a28ccd717"
    ]
  },
  "$o": {
    "target": "isBlobURL",
    "note": "blob: URL 前缀识别及 Cache 调用",
    "localHash": "0e0ba4b0c73e7f55985fa6fc43754b7226a42e476e31a866fc3eb98c72f146bc",
    "upstreamHashes": [
      "de09d992564ffe239336ca9f8ae8a453f6edc46dbccaba0bdc3e77964d1a3558",
      "de09d992564ffe239336ca9f8ae8a453f6edc46dbccaba0bdc3e77964d1a3558"
    ]
  },
  "qc": {
    "target": "intersect",
    "note": "layers 检查、object.raycast 和 recursive 子对象遍历",
    "localHash": "adfe4d7b5f12b34098423d719ffa8e37a30a49cb5722fb99e8cc0c867987a8d4",
    "upstreamHashes": [
      "9fdcc60e03eb5a2715f15f6c7ef8a35bd1ed1d9f62df9cef23977a7ce107c5f8",
      "9fdcc60e03eb5a2715f15f6c7ef8a35bd1ed1d9f62df9cef23977a7ce107c5f8"
    ]
  },
  "getByteLength": {
    "target": "getByteLength",
    "note": "纹理格式宽高块计数和字节数分派",
    "localHash": "f87a52a86d2fb0c758045eb8a15959967b9d9230d618527c3433a33f2ae73689",
    "upstreamHashes": [
      "2719f03d54595dd5ba852c80d74f612dc5951fffd996f04d76fc9ad5f15d13ff",
      "2719f03d54595dd5ba852c80d74f612dc5951fffd996f04d76fc9ad5f15d13ff"
    ]
  }
};
  for(const helper of helpers.filter(x=>!x.ok)){const evidence=manualEvidence[helper.key];if(!evidence)continue;const local=functionSets[0].get(helper.key),references=functionSets.slice(1).map(m=>m.get(evidence.target));const fingerprint=p=>digest(g(p.node,{comments:false,compact:true,shouldPrintComment:()=>false}).code);if(fingerprint(local)!==evidence.localHash||references.some((p,i)=>!p||fingerprint(p)!==evidence.upstreamHashes[i])){helper.manualIdentityRejected='frozen manual identity evidence differs';continue;}helper.manualIdentity={...evidence,upstreamLines:references.map(p=>p.node.loc.start.line)};if(evidence.target!==helper.key&&!program.scope.hasOwnBinding(evidence.target)){moduleTasks.push([program.scope.getBinding(helper.key),evidence.target]);helper.manualModuleRename=true;}local.addComment('leading',' 人工身份合同：'+evidence.note+'。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 ');}
  const planned = new Map([...tasks, ...moduleTasks].map(([b, n]) => [b, n])),
    captureRejected = [];
  let changed = true;
  while (changed) {
    changed = false;
    traverse(trees[0], {
      Identifier(p) {
        if (!(p.isReferencedIdentifier() || p.isBindingIdentifier())) return;
        const original = p.scope.getBinding(p.node.name);
        if (!original) return;
        const target = planned.get(original) || original.identifier.name;
        let resolved;
        for (let scope = p.scope; scope && !resolved; scope = scope.parent) resolved = Object.values(scope.bindings).find(b => (planned.get(b) || b.identifier.name) === target);
        if (resolved && resolved !== original) {
          const culprit = planned.has(resolved) ? resolved : original;
          if (planned.has(culprit)) {
            captureRejected.push({
              from: culprit.identifier.name,
              to: planned.get(culprit),
              reference: p.node.name
            });
            planned.delete(culprit);
            changed = true;
          }
        }
      }
    });
  }
  const acceptedLocal = tasks.filter(([b]) => planned.has(b)),
    acceptedModule = moduleTasks.filter(([b]) => planned.has(b));
  const renameMap=new Map([...acceptedLocal,...acceptedModule].map(([b,n],i)=>[b,{name:n,temporary:'threeNextBindingTemporary'+i}])),edits=new Map();
  for(const [binding,entry]of renameMap)edits.set(binding.identifier,entry);
  traverse(trees[0],{Identifier(p){if(edits.has(p.node))return;const parent=p.parentPath;if(parent.isExportSpecifier()&&p.key==='exported')return;if((parent.isObjectProperty()||parent.isObjectMethod()||parent.isClassMethod()||parent.isClassProperty())&&p.key==='key'&&!parent.node.computed)return;if((parent.isMemberExpression()||parent.isOptionalMemberExpression())&&p.key==='property'&&!parent.node.computed)return;if(!(p.isReferencedIdentifier()||p.isBindingIdentifier()))return;const entry=renameMap.get(p.scope.getBinding(p.node.name));if(entry)edits.set(p.node,entry);}});
  for(const [node,entry]of edits)node.name=entry.temporary;
  for(const [node,entry]of edits)node.name=entry.name;
  const localRenameCount=new Set(acceptedLocal.map(([b])=>b)).size,moduleRenameCount=new Set(acceptedModule.map(([b])=>b)).size;
  const contracts = {
    generateUUID: '通过原随机数与位掩码生成 UUID 字符串；不引入新的随机源或安全性保证。',
    normalize: '根据整型数组构造器，将归一化值缩放并舍入为存储整数。',
    SRGBToLinear: '按原分段传递函数将 sRGB 通道转换为线性通道，保留阈值与幂指数。',
    LinearToSRGB: '按原反向分段传递函数将线性通道转换为 sRGB 通道。',
    toHalfFloat: '通过位模式提取符号、指数和尾数，返回半精度浮点存储位。',
    fromHalfFloat: '通过预计算位表将半精度存储位解码成 JavaScript 数值。',
    copyAttributeData: '交错属性或异构造器逐分量读取写入；其他情况按元素偏移批量复制，并标记需要上传。',
    clamp: '将数值限制到闭区间，边界按原 Math.min/Math.max 顺序计算。',
    euclideanModulo: '以两次取模处理负被除数，保持原表达式的 JavaScript 数值语义。',
    lerp: '按权重计算两个端点的线性插值，保留原乘加顺序。',
    denormalize: '根据整型数组构造器，把存储整数转换到对应归一化范围。',
    satForAxes: '把三角形投影到分离轴并与包围盒半径比较，任一轴分离即返回 false。',
    transformVertex: '将精灵顶点按中心、缩放和可选旋转偏移，再通过相机矩阵转换。',
    testPoint: '检查点到局部射线的平方距离，再用世界距离和 near/far 筛选命中。',
    cloneUniforms: '复制 uniform 容器，并对受支持的 Three 对象调用 clone，避免共享可变数学对象。',
    mergeUniforms: '依次克隆再合并 uniform 集合，后面的同名条目覆盖前面。',
    getUnlitUniformColorSpace: '默认目标取输出色域，XR 目标取纹理色域，其他离屏目标取工作色域。',
    handleVisibilityChange: '页面重新可见时重置计时基准，避免把隐藏时段计入下一帧。',
    setPoint: '将相机规范空间坐标反投影，并更新映射到该点的所有几何顶点。',
    removeNode: '同时修复双向环链表及可选 z 序链表的相邻引用。',
    pointInTriangle: '以三条有向边的叉积符号判断点是否位于三角形内。',
    copyArrayContents: '按两数组较短长度复制；同构造器走 TypedArray.set，异构造器逐项赋值。'
  };
  for (const item of helpers.filter(h => h.ok)) {
    const p = functionSets[0].get(item.key);
    p.addComment('leading', ` 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：${item.target}。${contracts[item.target] || ''} `);
  }
  const output = g(trees[0], {
      comments: true
    }).code + '\n',
    proof = compareThreeAlpha(source, output);
  if (!proof.equal) {
    fs.writeFileSync('artifacts/semantic-dynamo/three-core-next-rejected.js', output);
    throw Error('Whole-file alpha proof rejected candidate');
  }
  if (JSON.stringify(proof.originalAnalysis.publicExportNames) !== JSON.stringify(proof.candidateAnalysis.publicExportNames)) throw Error('Public export set changed');
  for (const analysis of [proof.originalAnalysis, proof.candidateAnalysis]) for (const [key, value] of Object.entries({
    bindingCount: 7139,
    referenceCount: 23140,
    selectedIdentifiers: 31072,
    assignmentsAndUpdates: 1237,
    missedDeclarations: 0,
    missedReferences: 0,
    missedAssignmentTargets: 0
  })) if (analysis[key] !== value) throw Error('Coverage changed: ' + key);
  const report = {
    captureRejected,
    manualIdentities:helpers.filter(h=>h.manualIdentity).length,
    manualModuleRenames:helpers.filter(h=>h.manualModuleRename).length,
    classCount:sets[0].classes.size,
    expressionDetails,
    expressions:{total:expressionDetails.length,matched:expressionDetails.filter(x=>x.ok).length,changed:expressionDetails.filter(x=>acceptedLocal.some(task=>task[2]===x.key)).length},
    upstreams: paths.map(p => ({
      path: p,
      sha256: digest(fs.readFileSync(p))
    })),
    methods: {
      total: sets[0].methods.size,
      matched: matched.length,
      changed: matched.filter(m => acceptedLocal.some(task => task[2] === m.key)).length,
      unmatched: unmatched.length
    },
    helpers: {
      total: helpers.length,
      matched: helpers.filter(h => h.ok).length,
      changed: helpers.filter(h => h.ok && (acceptedLocal.some(task => task[2] === h.key) || acceptedModule.some(task => task[1] === h.target))).length
    },
    localRenameCount,
    moduleRenameCount,
    semanticHash: digest(g(parser.parse(output, {
      sourceType: 'module'
    }), {
      comments: false,
      compact: true,
      shouldPrintComment: () => false
    }).code),
    proof,
    matched,
    unmatched,
    helperDetails: helpers
  };
  fs.mkdirSync('artifacts/semantic-dynamo', {
    recursive: true
  });
  fs.writeFileSync('artifacts/semantic-dynamo/three-core-next-report.json', JSON.stringify(report, null, 2));
  const esc = v => JSON.stringify(v).replaceAll('|', '\\|').replaceAll('`', '');
  const rows = unmatched.map(m => `| ${m.key} | ${esc(m.difference || m.reason || m.bindingCounts)} | ${esc(m.patchDifference)} |`).join('\n');
  console.error('Core matching complete: methods '+matched.length+', expressions '+expressionDetails.length+', helpers '+helpers.length);
  const helperRows = helpers.map(h => `| ${h.key} | ${h.ok ? h.target + '; ' + h.changes.length + ' local edits; module rename ' + h.moduleRename : h.manualIdentity?'人工身份 '+h.manualIdentity.target+'; '+h.manualIdentity.note+'; 非整函数结构匹配':esc(h.comparison || h.reason)} |`).join('\n');
  const doc = `# Three core 第二轮交叉分析\n\n比较官方 0.185.0/0.185.1 的本地已验证发布物；未确定 bundled patch。研究入口：\`node tools/lib/three-core-match-next.cjs --baseline-ref=87c030f\`；加 \`--apply\` 才写源文件，普通测试不读取 artifacts。完整 JSON 证据输出 artifacts/semantic-dynamo/three-core-next-report.json。\n\n比较规范化新增：去除 literal raw 拼写；未遮蔽 undefined 与 void 0；常量侧等值比较（不移动可求值操作数）；typeof 字符串的松/严格相等；循环单语句括号；返回三元与 if-return；布尔三元与双否定。沿用原有语句逗号/短路展开、多声明拆分。所有规范化仅用于匹配证据，生产只改词法名称与注释。仅把无副作用的数值字面量移到乘法/交换性位运算右侧，绝不交换两个可求值操作数或加法操作数；折叠纯数值常量和已证实的 int32 冗余转换；单次引用 const 只内联到紧邻 return 或成员调用接收器，保留其求值位置；剩余绑定按原源位置对应；规范化空返回、逻辑布尔返回、同返回值提前退出和直接循环 continue，函数声明只在原块内按提升语义归前。不猜其余被内联消失的声明，不把首差异当作全部差异。\n\n本轮：${report.methods.total} 方法中 ${report.methods.matched} 匹配，${report.methods.changed} 方法实际改名，${report.methods.unmatched} 保留；${helpers.length} 顶层辅助函数中 ${report.helpers.matched} 唯一匹配，${report.helpers.changed} 实际改名。实际局部绑定改名 ${localRenameCount}，模块函数改名 ${moduleRenameCount}；零修改匹配不计改名进度。原文件全量 alpha ${proof.originalHash}，候选 ${proof.candidateHash}，一致 ${proof.equal}；导出 ${proof.candidateAnalysis.publicExportNames.length}。冻结最终语义 AST ${report.semanticHash}。\n\n外部模块引用按绑定的首次使用角色抽象，属于结构推断，不单凭角色推断给外部绑定改名。辅助函数要求两版分别唯一完整结构匹配及局部名一致；未知的最近前缀比较只是排查线索，不是身份判定。函数反射 name / toString 随命名或打印变化，alpha 证明不声称反射字节一致。\n\n## 未匹配方法：规范化 AST 的第一处实际差异\n\n列出每项的字段路径、双方实际值；数组长度表示声明/语句/参数结构差异，type 表示控制流/表达式种类差异，operator 表示运算顺序或运算形式差异，name 表示未证实的外部标识；均保留原实现。patch 列非空表示两份参考自身不同。\n\n| 方法 | 本地与 0.185.0 首差异 | 两参考首差异 |\n| --- | --- | --- |\n${rows}\n\n## 顶层辅助函数逐项覆盖\n\n| 本地名称 | 已验证角色或未匹配的实际首差异线索 |\n| --- | --- |\n${helperRows}\n`;
  const differenceCategories={};for(const item of unmatched){const category=item.reason||item.difference?.path.split('.').at(-1)||'binding-count';differenceCategories[category]=(differenceCategories[category]||0)+1;}
 const appendix='\n## 验证与边界\n\n本轮起点是 git 87c030f (v0.2.32)。跨越本轮已修改源文件重跑时使用上述 baseline-ref，才能复现本轮改名计数。参考来源为官方 npm [0.185.0](https://registry.npmjs.org/three/-/three-0.185.0.tgz)、[0.185.1](https://registry.npmjs.org/three/-/three-0.185.1.tgz)；工具锁定两份发布物 SHA-256（见同目录 three-semantic-changes.md），拒绝参考漂移。\n\n首差异分类：'+JSON.stringify(differenceCategories)+'。这是每项第一处差异，并非列出该项所有变换。剩余项包含函数表达式被内联、被消去的多次使用临时量、改变了声明位置和顺序的分支、复杂早退/循环变换。例如 BufferGeometry.setIndex 内联了选择索引宽度的辅助函数；Object3D 构造器把官方具名回调内联为匿名回调；这类结构身份尚未得到完整证明，不给不确定局部绑定冒领原名。\n\n最终作用域检查拒绝 m → frustum，因为该局部名会遮蔽现有模块 frustum 引用。先模拟所有目标名解析，再用临时命名空间两阶段改名，最后全文件 alpha 再检。旧 alpha 973e... 来自旧验证器把同名内层函数声明错误标成外层绑定；修正声明节点身份之后，旧原件、本轮前后文件均为上文 0bb15...。这是证明器修正，不是执行体变化。覆盖为 7139 绑定、23140 引用、31072 选中标识、1237 写入/更新，声明/引用/写入遗漏均为零；444 导出名集合逐项相等。\n\nCPU 验证：node tools/semantic-three-core-next.node-check.cjs 冻结完整最终语义 AST；正反规范化测试锁定常量折叠、字面量侧乘法、邻接 const 返回和布尔短路，同时拒绝两可求值操作数互换、加法换序和越过副作用内联。实际 API 执行包括 MathUtils/typed-array、Layers 第31位、半精度转换、UUID 格式、矩阵列索引、派发中删除监听器、带孔轮廓面积、盒/三角形 SAT、uniform 克隆隔离、点云射线 near/far。测试不读取 artifacts、不联网、不构造 WebGL。\n';
 if (process.argv.includes('--apply')) {
    fs.writeFileSync(sourcePath, output);
    fs.writeFileSync('docs/eyes-analysis/three-core-next.md', doc+appendix+'\n## 根级函数表达式\n\n类范围：218声明 + 1具名表达式 Composite，共1629方法。另22根函数表达式：'+JSON.stringify(report.expressions)+'。\n\n| 属性角色 | 结果 |\n| --- | --- |\n'+expressionDetails.map(x=>'| '+x.key+' | '+(x.ok?'完整结构匹配; '+x.changes.length+' local edits':esc(x.difference))+' |').join('\n')+'\n\n人工辅助函数身份 '+report.manualIdentities+'项，其中模块名实际改动'+report.manualModuleRenames+'项；这与53项完整结构匹配分开。详见 [逐项语义合同](three-core-remaining-semantics.md)。\n');
  }
  console.log(JSON.stringify({
    methods: report.methods,
    expressions:report.expressions,
    helpers: report.helpers,
    localRenameCount,
    moduleRenameCount,
    semanticHash: report.semanticHash,
    alpha: proof.candidateHash
  }));
}
