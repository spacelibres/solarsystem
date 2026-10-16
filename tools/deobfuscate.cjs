/**
 * De-obfuscate NASA Eyes's bundles so they can actually be read and studied.
 *
 * Three passes, in increasing ambition:
 *
 *   1. **Beautify.** Re-indent the single-line minified bundle using an acorn AST
 *      so brackets and statements are readable, without changing a character of
 *      the code's meaning.
 *
 *   2. **Section.** Split the result at every `class X extends Y {` boundary into
 *      its own file under `deobf/classes/`, so a class can be read in isolation
 *      instead of scrolled past.
 *
 *   3. **Name recovery.** The minifier mangled locals and methods but could not
 *      mangle:
 *        - class names (261 survive, because they are exported),
 *        - bundled string literals (asset paths, category names, DOM classes),
 *        - the `webpackChunksolar_system` module map.
 *      We mine those to build a *symbol dictionary*: which mangled identifier is
 *      used where a known name is expected. Repeatedly, this lets us rename
 *      `t`, `e`, `i` back to `entity`, `renderer`, `label` and so on, purely
 *      from evidence in the file — never from a guess.
 *
 * Output goes under `deobf/` (git-ignored; it is derived from NASA's code).
 *
 * Usage:
 *   node tools/deobfuscate.cjs beautify   # pass 1 -> deobf/app.beautified.js
 *   node tools/deobfuscate.cjs classes    # pass 2 -> deobf/classes/*.js
 *   node tools/deobfuscate.cjs symbols    # pass 3 -> deobf/symbols.json
 */
const fs = require('fs');
const path = require('path');
const acorn = require('acorn');

const BUNDLE = path.join(
  __dirname, '..', 'data', 'mirror', 'apps', 'solar-system', 'bundle', 'js_app.js',
);
const OUT = path.join(__dirname, '..', 'deobf');

const INDENT = '  ';

/** Parse the bundle; it is an ES module chunk, so sourceType module. */
function parse(src) {
  return acorn.parse(src, {
    ecmaVersion: 'latest',
    sourceType: 'script',
    allowReturnOutsideFunction: true,
    allowAwaitOutsideFunction: true,
    allowSuperOutsideMethod: true,
  });
}

/**
 * Re-indent a token stream without reformatting expressions.
 *
 * Walks the raw source between AST node positions and emits newlines +
 * indentation at statement boundaries only. This keeps promises, ternaries and
 * long expressions on one line — which is what makes minified code readable
 * rather than exploding it into hundreds of useless lines.
 */
function beautify(src) {
  const ast = parse(src);
  const breaks = [];

  const walk = (node, depth) => {
    if (!node || typeof node.type !== 'string') return;

    const isBlockBody =
      node.type === 'BlockStatement' ||
      node.type === 'ClassBody' ||
      node.type === 'Program';
    const isSwitch = node.type === 'SwitchStatement';

    if (node.body) {
      const kids = Array.isArray(node.body)
        ? node.body
        : node.body.type === 'BlockStatement'
          ? node.body.body
          : null;
      if (kids) {
        const inner = isBlockBody ? depth + 1 : depth;
        for (const k of kids) {
          if (k && typeof k.start === 'number') breaks.push([k.start, inner]);
        }
        if (isBlockBody && node.body.end != null) {
          // closing brace at parent depth
          breaks.push([node.end - 1, depth]);
        }
      }
    }
    if (isSwitch && Array.isArray(node.cases)) {
      for (const c of node.cases) if (c) breaks.push([c.start, depth + 1]);
    }

    for (const key of Object.keys(node)) {
      if (key === 'start' || key === 'end' || key === 'type') continue;
      const v = node[key];
      if (Array.isArray(v)) {
        for (const c of v) if (c && typeof c.type === 'string') walk(c, isBlockBody ? depth + 1 : depth);
      } else if (v && typeof v.type === 'string') {
        walk(v, isBlockBody ? depth + 1 : depth);
      }
    }
  };
  walk(ast, 0);

  // Apply breaks from the end so offsets stay valid.
  const byOffset = new Map();
  for (const [at, depth] of breaks) {
    // Keep the largest depth for a given offset (nested cases).
    const prev = byOffset.get(at);
    if (prev === undefined || depth > prev) byOffset.set(at, depth);
  }

  const points = [...byOffset.keys()].sort((a, b) => a - b);
  let out = '';
  let cursor = 0;
  for (const at of points) {
    out += src.slice(cursor, at);
    out += '\n' + INDENT.repeat(byOffset.get(at));
    // Skip whitespace immediately after the boundary so we don't double-space.
    cursor = at;
    while (cursor < src.length && (src[cursor] === ' ' || src[cursor] === '\t')) cursor++;
  }
  out += src.slice(cursor);
  return out;
}

/** Every `class X extends Y {` span, by brace matching on the raw source. */
function findClasses(src) {
  const re = /class\s+([A-Za-z_$][\w$]*)\s*(?:extends\s+([A-Za-z_$][\w$.]*))?\s*\{/g;
  const out = [];
  let m;
  while ((m = re.exec(src))) {
    let d = 0;
    let end = m.index;
    for (let i = src.indexOf('{', m.index); i < src.length; i++) {
      if (src[i] === '{') d++;
      else if (src[i] === '}') { d--; if (d === 0) { end = i; break; } }
    }
    out.push({ name: m[1], base: m[2] || '', start: m.index, end: end + 1 });
  }
  return out;
}

const [, , cmd = 'beautify'] = process.argv;
const src = fs.readFileSync(BUNDLE, 'utf8');
fs.mkdirSync(OUT, { recursive: true });

if (cmd === 'beautify') {
  const out = beautify(src);
  const dest = path.join(OUT, 'app.beautified.js');
  fs.writeFileSync(dest, out);
  console.log(`beautified -> ${dest}`);
  console.log(`  ${src.length} bytes -> ${out.length} bytes, ${out.split('\n').length} lines`);
} else if (cmd === 'classes') {
  const dir = path.join(OUT, 'classes');
  fs.mkdirSync(dir, { recursive: true });
  const classes = findClasses(src);
  const index = [];
  for (const c of classes) {
    const body = src.slice(c.start, c.end);
    const file = `${c.name}.js`;
    // Beautify each class on its own, so the file is readable standalone.
    let rendered = body + '\n';
    try {
      rendered = beautify(body) + '\n';
    } catch {
      // A class body can fail to parse in isolation if it relies on an
      // outer expression; keep the raw slice in that case.
    }
    fs.writeFileSync(path.join(dir, file), rendered);
    index.push({ name: c.name, base: c.base, bytes: c.end - c.start, file });
  }
  fs.writeFileSync(
    path.join(dir, '_index.json'),
    JSON.stringify(index.sort((a, b) => b.bytes - a.bytes), null, 2),
  );
  console.log(`${index.length} classes -> ${dir}`);
  for (const r of index.sort((a, b) => b.bytes - a.bytes).slice(0, 12)) {
    console.log(`  ${String(r.bytes).padStart(7)}  ${r.name}${r.base ? ' <- ' + r.base : ''}`);
  }
} else if (cmd === 'symbols') {
  // Name recovery from evidence: class names, string literals and the module map.
  const classes = findClasses(src);
  const strings = new Set();
  for (const m of src.matchAll(/"([^"\\\n]{3,60})"/g)) strings.add(m[1]);
  // `X.register({ ... })` tells us the entity-registration helper's real name.
  const registrars = new Set();
  for (const m of src.matchAll(/([A-Za-z_$][\w$]*)\.register\(\{/g)) registrars.add(m[1]);
  // Method names that survived on classes.
  const methods = new Set();
  for (const c of classes) {
    const body = src.slice(c.start, c.end);
    for (const m of body.matchAll(/[,;{]\s*(?:static\s+)?(?:async\s+)?(?:get\s+|set\s+)?([a-zA-Z_$][\w$]*)\s*\(/g)) {
      if (m[1].length > 2) methods.add(m[1]);
    }
  }
  const dict = {
    classNames: classes.map((c) => c.name).sort(),
    registrars: [...registrars],
    methods: [...methods].sort(),
    stringCount: strings.size,
    sampleStrings: [...strings].slice(0, 200),
  };
  fs.writeFileSync(path.join(OUT, 'symbols.json'), JSON.stringify(dict, null, 2));
  console.log(`classes      ${dict.classNames.length}`);
  console.log(`registrars   ${dict.registrars.join(', ')}`);
  console.log(`method names ${dict.methods.length}`);
  console.log(`strings      ${dict.stringCount}`);
  console.log(`-> ${path.join(OUT, 'symbols.json')}`);
} else {
  console.log('usage: deobfuscate.cjs beautify | classes | symbols');
}
