/**
 * Recover obfuscated identifier names in NASA Eyes's bundle.
 *
 * A minifier mangles *bindings* (locals, params, private methods) but cannot
 * mangle:
 *
 *   - property names, because they are resolved at runtime: `this._timeInfo`,
 *     `entity.getRadius`, `layer.visible` all survive verbatim;
 *   - string literals: asset paths, category names, DOM class names;
 *   - exported class names.
 *
 * So for every mangled short identifier (`t`, `e`, `i`, `n`, …) we can ask: what
 * *known* name is it used alongside? If `t` is assigned to `this._layerManager`
 * and then called as `t.getLayer(...)`, then `t` is a LayerManager. Collecting
 * that evidence across the whole bundle yields a ranked candidate name per
 * mangled identifier — inference from proof, not a guess.
 *
 * Writes `deobf/recovered-names.json` (identifier -> ranked candidates with the
 * evidence lines that support each), and a human-readable report.
 *
 * Usage: node tools/recover-names.cjs
 */
const fs = require('fs');
const path = require('path');
const acorn = require('acorn');

const BUNDLE = path.join(
  __dirname, '..', 'data', 'mirror', 'apps', 'solar-system', 'bundle', 'js_app.js',
);
const OUT = path.join(__dirname, '..', 'deobf');

const src = fs.readFileSync(BUNDLE, 'utf8');
const ast = acorn.parse(src, {
  ecmaVersion: 'latest',
  sourceType: 'script',
  allowReturnOutsideFunction: true,
  allowAwaitOutsideFunction: true,
  allowSuperOutsideMethod: true,
});

const SHORT = /^[a-zA-Z]$|^[a-zA-Z][0-9]$/; // t, e, i, t1, e2 …

/** methodName -> evidence for `recv.methodName(...)` where recv is mangled. */
const evidence = new Map(); // name -> Map<candidate, count>

function addCandidate(ident, candidate, why) {
  if (!SHORT.test(ident)) return;
  if (!candidate || candidate === ident) return;
  if (SHORT.test(candidate)) return;
  if (!evidence.has(ident)) evidence.set(ident, new Map());
  const m = evidence.get(ident);
  const entry = m.get(candidate) ?? { count: 0, why: new Set() };
  entry.count++;
  if (entry.why.size < 4) entry.why.add(why);
  m.set(candidate, entry);
}

/** Walk the AST collecting evidence. */
let VISITED = 0;
function walk(node, parent) {
  if (!node || typeof node.type !== 'string') return;
  VISITED++;

  // `t = new Foo(...)` or `const t = new Foo(...)` -> t is a Foo.
  if (node.type === 'VariableDeclarator' && node.id?.type === 'Identifier' && node.init?.type === 'NewExpression') {
    const cls = node.init.callee;
    const cname = cls?.type === 'Identifier' ? cls.name : cls?.property?.name;
    addCandidate(node.id.name, cname, 'newed as');
  }
  if (node.type === 'AssignmentExpression' && node.operator === '=' &&
      node.left?.type === 'Identifier' && node.right?.type === 'NewExpression') {
    const cls = node.right.callee;
    const cname = cls?.type === 'Identifier' ? cls.name : cls?.property?.name;
    addCandidate(node.left.name, cname, 'newed as');
  }

  // `this._foo = t` -> t is the thing called `_foo`.
  if (node.type === 'AssignmentExpression' && node.operator === '=' &&
      node.left?.type === 'MemberExpression' && node.left.object?.type === 'ThisExpression' &&
      node.right?.type === 'Identifier') {
    addCandidate(node.right.name, node.left.property.name, 'assigned to this.');
  }

  // `t.getManager("scene")` -> t has the manager API; `t.getLayer` etc.
  if (node.type === 'CallExpression' && node.callee?.type === 'MemberExpression') {
    const obj = node.callee.object;
    const prop = node.callee.property?.name;
    if (obj?.type === 'Identifier' && prop && prop.length > 3) {
      // The callee name itself is a strong signal of the receiver's type.
      addCandidate(obj.name, prop, 'calls');
    }
    // `t.getComponent(X)` / `t.addComponent(X)` -> t is an Entity.
    if (obj?.type === 'Identifier' && (prop === 'getComponent' || prop === 'addComponent')) {
      addCandidate(obj.name, 'Entity', 'component host');
    }
    // `t.getManager("label")` -> t is the app.
    if (obj?.type === 'Identifier' && prop === 'getManager') {
      addCandidate(obj.name, 'app', 'getManager caller');
    }
  }

  // `t instanceof Foo`
  if (node.type === 'BinaryExpression' && node.operator === 'instanceof' &&
      node.left?.type === 'Identifier') {
    const cname = node.right?.type === 'Identifier' ? node.right.name : node.right?.property?.name;
    addCandidate(node.left.name, cname, 'instanceof');
  }

  // `t.radius`, `t.mesh`, `t.orientation` -> NASA's own field names.
  if (node.type === 'MemberExpression' && node.object?.type === 'Identifier' &&
      node.property?.type === 'Identifier' && node.property.name.length > 3) {
    addCandidate(node.object.name, node.property.name, 'member access');
  }

  for (const key of Object.keys(node)) {
    if (key === 'start' || key === 'end' || key === 'type') continue;
    const v = node[key];
    // Note the braces: writing this as `if (…) for (…) …; else if (…)` makes the
    // `else` bind to the `for`'s inner `if` and the walk stops after two nodes.
    if (Array.isArray(v)) {
      for (const c of v) {
        if (c && typeof c.type === 'string') walk(c, node);
      }
    } else if (v && typeof v.type === 'string') {
      walk(v, node);
    }
  }
}
walk(ast, null);
console.log('visited', VISITED, 'nodes;', evidence.size, 'identifiers with evidence');

// Rank candidates: prefer names that look like NASA's exported classes or its
// underscore-prefixed own fields, then by evidence count.
const CLASS_NAMES = new Set();
for (const m of src.matchAll(/class\s+([A-Z][\w$]*)/g)) CLASS_NAMES.add(m[1]);

const result = {};
for (const [ident, cands] of evidence) {
  const ranked = [...cands.entries()]
    .map(([name, e]) => ({
      name,
      count: e.count,
      why: [...e.why],
      score: e.count * (CLASS_NAMES.has(name) ? 3 : name.startsWith('_') ? 2 : 1),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
  result[ident] = ranked;
}

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'recovered-names.json'), JSON.stringify(result, null, 2));

// Report: the worst offenders and what we could recover for them.
const lines = [];
lines.push('# Recovered identifier candidates\n');
lines.push('Derived from NASA Eyes\'s bundle by mining surviving property names,');
lines.push('class names and string literals. Each entry is evidence, not a guess.\n');
const byCount = Object.entries(result).sort((a, b) => {
  const sa = a[1][0]?.score ?? 0;
  const sb = b[1][0]?.score ?? 0;
  return sb - sa;
});
for (const [ident, cands] of byCount.slice(0, 60)) {
  if (!cands.length) continue;
  lines.push(`## \`${ident}\``);
  for (const c of cands) {
    lines.push(`- **${c.name}** — ${c.count}× (${c.why.join(', ')})`);
  }
  lines.push('');
}
fs.writeFileSync(path.join(OUT, 'recovered-names.md'), lines.join('\n'));

const withEvidence = Object.values(result).filter((c) => c.length).length;
console.log(`identifiers examined : ${Object.keys(result).length}`);
console.log(`with a candidate     : ${withEvidence}`);
console.log(`class names known    : ${CLASS_NAMES.size}`);
console.log(`-> ${path.join(OUT, 'recovered-names.json')}`);
console.log(`-> ${path.join(OUT, 'recovered-names.md')}`);
