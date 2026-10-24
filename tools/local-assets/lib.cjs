'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { readIndexInfo, segmentUrls } = require('../lib/segments.cjs');
const STATIC = 'https://eyes.nasa.gov/assets/static';
const DYNAMIC = 'https://eyes.nasa.gov/assets/dynamic';
const SITE = 'https://eyes.nasa.gov/apps/solar-system/';
const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
function isDirectoryUrl(value) {
  const u = new URL(value);
  return u.pathname.endsWith('/') || (u.hostname === 'eyes.nasa.gov' && /^\/assets\/(?:(?:static|dynamic)|static\/wasm\/(?:draco|ktx2))$/.test(u.pathname));
}
function glbJson(bytes) {
  if (bytes.length < 20 || bytes.readUInt32LE(0) !== 0x46546c67 || bytes.readUInt32LE(4) !== 2 || bytes.readUInt32LE(8) !== bytes.length) throw new Error('Invalid GLB header');
  let offset = 12, json;
  while (offset < bytes.length) {
    if (offset + 8 > bytes.length) throw new Error('Truncated GLB chunk header');
    const length = bytes.readUInt32LE(offset), type = bytes.readUInt32LE(offset+4);
    if (length % 4 || offset + 8 + length > bytes.length) throw new Error('Invalid GLB chunk length');
    if (offset === 12 && type !== 0x4e4f534a) throw new Error('GLB first chunk must be JSON');
    if (type === 0x4e4f534a) {
      if (json) throw new Error('Duplicate GLB JSON chunk');
      json = JSON.parse(bytes.toString('utf8',offset+8,offset+8+length));
    }
    offset += 8 + length;
  }
  if (!json) throw new Error('Missing GLB JSON chunk');
  return json;
}
function assetPath(value) {
  const u = new URL(value);
  if (!['http:', 'https:'].includes(u.protocol)) throw new Error('Unsupported asset protocol');
  let relative;
  if (u.hostname === 'eyes.nasa.gov' && u.pathname.startsWith('/assets/')) relative = u.pathname.slice(8);
  else if (u.hostname === 'eyes.nasa.gov' && u.pathname.startsWith('/apps/solar-system/')) relative = 'site/' + u.pathname.slice(19);
  else relative = 'external/' + u.hostname + u.pathname;
  relative = decodeURIComponent(relative);
  if (relative.split('/').some(p => p === '..' || p === '.' || /[\\\0:]/.test(p))) throw new Error('Unsafe asset path');
  // Legacy mirrors are path based. The inventory rejects meaningful query
  // collisions; cache-busting ?v= variants may share the same physical file.
  return relative;
}
const urlToLocalPath = value => '/nasa/' + assetPath(value);
function args(argv) {
  const result = {};
  for (let i = 0; i < argv.length; i++) {
    if (!argv[i].startsWith('--')) throw new Error('Expected --option');
    result[argv[i].slice(2)] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
  }
  return result;
}
function atomicJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temporary = file + '.tmp';
  fs.writeFileSync(temporary, JSON.stringify(value, null, 2) + '\n');
  fs.renameSync(temporary, file);
}
function validate(bytes, url, contentType = '') {
  if (!bytes.length) throw new Error('Empty response');
  const start = bytes.subarray(0, 512).toString('utf8').trimStart();
  if (/text\/html/i.test(contentType) || /^<!doctype\s+html|^<html[\s>]/i.test(start)) throw new Error('HTML response masquerading as an asset');
  const ext = path.extname(new URL(url).pathname).toLowerCase();
  if (['.json', '.gltf'].includes(ext)) JSON.parse(bytes.toString('utf8'));
  if (ext === '.glb') glbJson(bytes);
  if (ext === '.wasm' && !WebAssembly.validate(bytes)) throw new Error('Invalid WASM');
  if (ext === '.png' && bytes.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') throw new Error('Invalid PNG');
  if (['.jpg', '.jpeg'].includes(ext) && bytes.readUInt16BE(0) !== 0xffd8) throw new Error('Invalid JPEG');
  if (ext === '.dyn' && /\/def\.dyn$/.test(new URL(url).pathname)) {
    const version = bytes.readInt16LE(0);
    if (![1, 2].includes(version)) throw new Error('Invalid dynamo version');
    const info = readIndexInfo(bytes);
    if (!['orb', 'ori', 'quat', 'pos', 'rot', 'lin'].includes(info.name) || info.count < 0 || info.count > 1000000 || ![0, 1].includes(info.hasPoints)) throw new Error('Invalid dynamo index');
  }
}
function dependencies(bytes, url) {
  const out = new Set();
  const add = value => { if (typeof value === 'string' && !/^(?:data:|blob:|#)/.test(value)) out.add(new URL(value, url).href); };
  const pathname = new URL(url).pathname;
  const media = (value, direct = false) => {
    if (typeof value !== 'string') return;
    for (const match of value.matchAll(/(?:src|poster)\s*=\s*["']([^"']+)["']|url\(\s*["']?([^\s"')]+)["']?\s*\)/g)) add(match[1] || match[2]);
    if (direct && /^(?:https?:\/\/|\.?\.?\/)?[^\s<>"']+\.(?:png|jpe?g|webp|svg|gif|gltf|glb|bin|woff2?|ttf|otf|mp4|webm|mp3|ogg|css|wasm|json)(?:\?[^\s<>"']*)?$/i.test(value)) add(value);
  };
  if (/\.(?:gltf|glb|json)$/i.test(pathname)) {
    const json = /\.glb$/i.test(pathname) ? glbJson(bytes) : JSON.parse(bytes.toString('utf8'));
    const model = /\.(?:gltf|glb)$/i.test(pathname);
    if(model) {
      // glTF names/material labels are arbitrary strings, even when they look
      // like filenames. Only buffer/image URI properties fetch external bytes.
      for(const item of [...(json.buffers || []),...(json.images || [])]) if(typeof item.uri==='string')add(item.uri);
      const extensions = value => {
        if(!value || typeof value!=='object')return;
        for(const [key,item] of Object.entries(value)) {
          if(key==='uri')add(item);
          else extensions(item);
        }
      };
      const visit = value => {
        if(!value || typeof value!=='object')return;
        for(const [key,item] of Object.entries(value))if(key==='extensions')extensions(item);else visit(item);
      };
      visit(json);
    }
    const walk = value => {
      if (!value || typeof value !== 'object') return;
      for (const [key, item] of Object.entries(value)) {
        if (key === 'uri') add(item);
        else { media(item, /^(?:url|src|poster|image|imageUrl|image_url|thumbnail|icon|file)$/i.test(key)); walk(item); }
      }
    };
    if(!model)walk(json);
    if (/\/events\/[^/]+\/all_events\.json$/.test(pathname)) {
      for (const [id, event] of Object.entries(json)) {
        const filename = event?.template || id;
        add(filename.endsWith('.json') ? filename : filename + '.json');
      }
    }
  }
  if (/\.html?$/i.test(pathname)) media(bytes.toString('utf8'));
  if (/\.css$/i.test(pathname)) {
    const text = bytes.toString('utf8');
    for (const match of text.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)|@import\s+["']([^"']+)["']/g)) add(match[1] || match[2]);
  }
  if (/\/dynamic\/dynamo\/.+\/def\.dyn$/.test(pathname)) {
    validate(bytes, url);
    const info = readIndexInfo(bytes);
    if (!info.hasPoints) {
      const controller = pathname.replace(/^\/assets\/dynamic\/dynamo\//, '').replace(/\/def\.dyn$/, '');
      for (const segment of segmentUrls(controller, info.count, info.digits)) out.add(segment);
    }
  }
  return [...out].sort();
}
module.exports = { STATIC, DYNAMIC, SITE, assetPath, urlToLocalPath, args, atomicJson, validate, dependencies, sha256, glbJson, isDirectoryUrl };
