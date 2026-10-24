#!/usr/bin/env node
'use strict';
// Inventory the editable source, never a stale recovered/minified bundle.
const fs = require('node:fs');
const path = require('node:path');
const parser = require('@babel/parser');
const { STATIC, DYNAMIC, SITE, assetPath, args, atomicJson, dependencies, validate, sha256, isDirectoryUrl } = require('./lib.cjs');
const project = path.resolve(__dirname, '../..');
function inventory({ source = path.join(project, 'eyes'), mirror } = {}) {
  const records = new Map();
  const unresolved = new Map();
  const origins = new Map();
  function add(raw, origin) {
    const url = raw.replaceAll('$STATIC_ASSETS_URL', STATIC).replaceAll('$DYNAMIC_ASSETS_URL', DYNAMIC).replaceAll('&amp;', '&');
    if (!/^https?:\/\//.test(url)) return;
    if (url.startsWith('https://solarsystem.spacelibre.cn/eyes/') && fs.existsSync(path.join(source, 'shell', new URL(url).pathname.slice(6)))) return;
    if (/\$|\{|\}/.test(url)) { unresolved.set(url, origin); return; }
    if (isDirectoryUrl(url)) return;
    if (/^https:\/\/eyes\.nasa\.gov\/apps\/solar-system\/assets\/wmts_xml(?:_noaa_2[01])?$/.test(url)) {
      add(url+'/1.0.0/WMTSCapabilities.xml',origin+' + Capabilities.constructor');return;
    }
    const canonical = new URL(url); canonical.hash = '';
    const key = canonical.href;
    const relative = assetPath(key);
    const previous = origins.get(relative);
    if (previous && previous !== key) {
      // Cache-busting versions identify the same physical font/image. Other
      // query variants cannot silently overwrite a tile or API response.
      const a = new URL(previous), b = new URL(key);
      a.searchParams.delete('v'); b.searchParams.delete('v');
      if (a.href !== b.href) throw new Error(`Query collision at ${relative}: ${previous} / ${key}`);
      return;
    }
    origins.set(relative, key);
    if (!records.has(key)) records.set(key, { url: key, path: relative, source: origin });
  }
  function expand(template, sizes, origin) {
    let url = template;
    if (!/^(?:https?:|\$STATIC|\$DYNAMIC)/.test(url)) url = STATIC + '/maps/' + url;
    for (const size of sizes) for (let face = 0; face < (url.includes('$FACE') ? 6 : 1); face++) add(url.replaceAll('$SIZE', size).replaceAll('$FACE', face), origin);
  }
  function walkNode(node, origin) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'ObjectExpression') {
      const properties = new Map(node.properties.filter(p => p.type === 'ObjectProperty').map(p => [p.key.name || p.key.value, p.value]));
      const url = properties.get('url');
      const sizes = properties.get('sizes');
      if (url?.type === 'StringLiteral' && sizes?.type === 'ArrayExpression') expand(url.value, sizes.elements.filter(n => n?.type === 'NumericLiteral').map(n => n.value), origin);
      if (properties.get('type')?.value === 'dynamo' && url?.type === 'StringLiteral') {
        if (properties.get('customUrl')?.value === true) add(url.value + '/def.dyn', origin);
        else add(DYNAMIC + '/dynamo/' + url.value + '/def.dyn', origin);
      }
    }
    if (node.type === 'CallExpression' && node.callee?.property?.name === 'setTexture' && node.arguments[1]?.type === 'StringLiteral') {
      const sizes = node.arguments[2];
      if (sizes?.type === 'ArrayExpression') expand(node.arguments[1].value, sizes.elements.filter(n => n?.type === 'NumericLiteral').map(n => n.value), origin);
    }
    for (const value of Object.values(node)) if (Array.isArray(value)) value.forEach(n => walkNode(n, origin)); else if (value && typeof value === 'object') walkNode(value, origin);
  }
  function walkJson(value, origin) {
    if (!value || typeof value !== 'object') return;
    if (typeof value.url === 'string' && Array.isArray(value.sizes)) expand(value.url, value.sizes, origin);
    if (value.type === 'dynamo' && typeof value.url === 'string') add(DYNAMIC + '/dynamo/' + value.url + '/def.dyn', origin);
    Object.values(value).forEach(v => walkJson(v, origin));
  }
  const files = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a,b) => a.name.localeCompare(b.name))) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(?:js|cjs|mjs|json|css|html)$/.test(entry.name) && !(entry.name === 'sources.json' && path.basename(dir) === 'brand')) files.push(full);
    }
  }
  walk(path.join(source, 'src')); walk(path.join(source, 'shell'));
  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8');
    const origin = path.relative(project, file).replaceAll('\\', '/');
    if (/\.[cm]?js$/.test(file)) walkNode(parser.parse(text, { sourceType: 'unambiguous', errorRecovery: true }), origin);
    else if (file.endsWith('.json')) walkJson(JSON.parse(text), origin);
    // Scan all raw strings as well as structural descriptors. Restrict absolute
    // links to media extensions or the Eyes asset namespaces; prose links and
    // analytics endpoints are not runtime media.
    for (const match of (file.endsWith('.css') ? [] : text.matchAll(/(?:https?:\/\/|\$(?:STATIC|DYNAMIC)_ASSETS_URL\/)[^\s"'`<>\\]+/g))) {
      const raw = match[0].replace(/[,;]+$/, '');
      if (/\$(?:STATIC|DYNAMIC)_ASSETS_URL|eyes\.nasa\.gov\/(?:assets\/|apps\/solar-system\/assets\/)|\.(?:png|jpe?g|webp|svg|gif|gltf|glb|bin|dyn|woff2?|ttf|otf|mp4|webm|mp3|ogg|css|wasm)(?:\?|$)/i.test(raw)) add(raw, origin);
    }
    if (file.endsWith('.css')) for (const dependency of dependencies(Buffer.from(text), new URL(path.relative(path.join(source, 'shell'), file).replaceAll('\\', '/'), SITE).href)) {
      // Existing shell resources are already copied by the normal build.
      const rel = new URL(dependency).pathname.replace('/apps/solar-system/', '');
      if (!fs.existsSync(path.join(source, 'shell', rel))) add(dependency, origin);
    }
  }
  const decoderManifest = JSON.parse(fs.readFileSync(path.join(source, 'decoders/manifest.json'), 'utf8'));
  // These pins are copied to /eyes/decoders/<revision>/ by build.mjs. Model
  // and texture loaders plus vendor modules reference localDecoderUrl or that
  // local directory, so upstream decoder URLs are provenance, not /nasa assets.
  const localDecoders = { revision:decoderManifest.revision, resources:decoderManifest.resources.map(resource => ({ ...resource, cachePath:path.join(source,'.cache/decoders',resource.file), runtimePath:`/eyes/decoders/${decoderManifest.revision}/${resource.file}` })) };
  // ContentManager.getEntityDesc and ObjectView/EventView use these catalogue
  // IDs; AppUtils.loadJSON appends .json to all_events/event template names.
  const entities = JSON.parse(fs.readFileSync(path.join(source, 'src/data/EntityCatalog.json'), 'utf8'));
  for (const [id, entity] of Object.entries(entities)) if (!entity.disabled) {
    add(`${SITE}descriptions/${id}.json`, 'eyes/src/data/EntityCatalog.json + ContentManager.getEntityDesc');
    if (entity.hasEvents) add(`${SITE}events/${id}/all_events.json`, 'eyes/src/data/EntityCatalog.json + ObjectView._updateResources');
  }
  for (const [entity, features] of [['jupiter',['magnetosphere','auroras','radiationBelt']],['saturn',['magnetosphere']]]) for (const feature of features) add(`${SITE}descriptions/${entity}_${feature}.json`, 'eyes/src/engine/core/Unidentified753.js + FeatureView._updateResources');
  // These ranges/defaults come from Unidentified695 and Features, not guesses.
  for (let i = 0; i < 6; i++) add(`${STATIC}/stars/stars.${i}.bin`, 'eyes/src/engine/core/Unidentified695.js');
  for (const [directory, basename] of [['auroras','auroras'],['magnetosphere','magnetosphere'], ...Array.from({length:4}, (_,i) => [`radiation_belt_${i+1}`,`radbelt${i+1}`])]) add(`${STATIC}/models/jupiter/${directory}/jupiter_${basename}.gltf`, 'eyes/src/engine/core/Features.js');
  // Mapping's entity branches define these exact channels. Tile extents and
  // extensions must be read from their configuration, never guessed here.
  for (const entity of ['1_ceres', 'earth', 'mars', 'mercury', 'moon']) {
    const channels = entity === 'earth' ? ['color','normal','height','specular','night','cloud'] : ['color','normal','height'];
    for (const channel of channels) add(`${DYNAMIC}/cmts/${entity}/${channel}/configuration.json`, 'eyes/src/engine/core/Mapping.js + components/CMTSComponent.js');
  }
  const inspected = new Set();
  const invalidMetadata = [];
  if (mirror) for (const record of records.values()) {
    if (inspected.has(record.url)) continue;
    inspected.add(record.url);
    if (!/\.(?:gltf|glb|json|css)$|\/def\.dyn$/i.test(new URL(record.url).pathname)) continue;
    const file = path.join(mirror, record.path);
    if (!fs.existsSync(file)) continue;
    try { for (const dependency of dependencies(fs.readFileSync(file), record.url)) add(dependency, record.url); }
    catch (error) { invalidMetadata.push({url:record.url, error:error.message}); }
  }
  // Keep an explicit account of expressions that require a domain-specific
  // finite snapshot (CMTS/WMTS), instead of claiming invented URLs complete it.
  const resolvedFamilies = [/stars\/stars\.\$/, /models\/jupiter\/\$/, /\$(?:SIZE|FACE)/, /dynamo\/\$\{controllerInfo\.url\}/, /maps\/\$\{textureInfo\.url\}/];
  return { schemaVersion: 1, generatedFrom: 'eyes/src + eyes/shell', scientificSnapshot: '0.2.68', resources: [...records.values()].sort((a,b) => a.url.localeCompare(b.url)), localDecoders, unresolved: [...unresolved].filter(([url]) => !resolvedFamilies.some(re => re.test(url))).map(([template, source]) => ({template, source})).sort((a,b) => a.template.localeCompare(b.template)), invalidMetadata };
}
if (require.main === module) {
  const options = args(process.argv.slice(2));
  const mirror = path.resolve(options.mirror || path.join(project, '../.solarsystem-mirror'));
  const result = inventory({ mirror });
  if (options.audit) {
    result.audit = { verified: [], missing: [], invalid: [] };
    result.audit.localDecoders = result.localDecoders.resources.map(resource => {
      try { const bytes=fs.readFileSync(resource.cachePath); validate(bytes,resource.url); if(bytes.length!==resource.bytes || sha256(bytes)!==resource.sha256)throw new Error('Pinned decoder integrity mismatch'); return {runtimePath:resource.runtimePath,status:'verified',bytes:bytes.length,sha256:resource.sha256}; }
      catch(error) { return {runtimePath:resource.runtimePath,status:'invalid-or-missing',error:error.message}; }
    });
    for (const resource of result.resources) {
      const file = path.join(mirror, resource.path);
      try {
        const bytes = fs.readFileSync(file);
        validate(bytes, resource.url);
        result.audit.verified.push({ path: resource.path, bytes: bytes.length, sha256: sha256(bytes) });
      } catch (error) {
        if (error.code === 'ENOENT') result.audit.missing.push(resource);
        else result.audit.invalid.push({ ...resource, error: error.message });
      }
    }
  }
  const output = path.resolve(options.out || path.join(mirror, 'manifest.json'));
  atomicJson(output, result);
  console.log(JSON.stringify({ output, resources: result.resources.length, unresolved: result.unresolved.length, ...(result.audit ? {verified: result.audit.verified.length, missing: result.audit.missing.length, invalid: result.audit.invalid.length} : {}) }));
}
module.exports = { inventory };
