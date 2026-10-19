#!/usr/bin/env node
/**
 * Merge translator-owned JSON into one generated locale module.
 *
 * Translation work is authored in `tools/i18n/translations/<locale>.json`
 * (disjoint per language; `.tmp-i18n/*.json` chunks are staged overrides) and
 * this command materialises `eyes/src/i18n/locales/<locale>.js`. Missing keys
 * keep the English source, so the app never renders `undefined` while a locale
 * is still being translated.
 *
 * Usage: node tools/i18n-apply.mjs <locale> [more locales...]
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = path.resolve(import.meta.dirname, '..');
const LOCALES = path.join(ROOT, 'eyes/src/i18n/locales');

const META = {
  'zh-CN': {
    name: '简体中文', englishName: 'Chinese (Simplified)', shortName: '中', intl: 'zh-CN', moment: 'zh-cn',
    dateFormats: {
      utc: { date: 'YYYY年M月D日', time: 'HH:mm:ss' },
      local: { date: 'YYYY年M月D日', time: 'HH:mm:ss', meridiem: '[]', parse: ['YYYY年M月D日 HH:mm:ss', 'YYYY年M月D日 HH:mm'] }
    }
  },
  'zh-TW': {
    name: '繁體中文', englishName: 'Chinese (Traditional)', shortName: '繁', intl: 'zh-TW', moment: 'zh-tw',
    dateFormats: {
      utc: { date: 'YYYY年M月D日', time: 'HH:mm:ss' },
      local: { date: 'YYYY年M月D日', time: 'HH:mm:ss', meridiem: '[]', parse: ['YYYY年M月D日 HH:mm:ss', 'YYYY年M月D日 HH:mm'] }
    }
  },
  ja: {
    name: '日本語', englishName: 'Japanese', shortName: '日', intl: 'ja-JP', moment: 'ja',
    dateFormats: {
      utc: { date: 'YYYY年M月D日', time: 'HH:mm:ss' },
      local: { date: 'YYYY年M月D日', time: 'HH:mm:ss', meridiem: '[]', parse: ['YYYY年M月D日 HH:mm:ss', 'YYYY年M月D日 HH:mm'] }
    }
  },
  ko: {
    name: '한국어', englishName: 'Korean', shortName: '한', intl: 'ko-KR', moment: 'ko',
    dateFormats: {
      utc: { date: 'YYYY년 M월 D일', time: 'HH:mm:ss' },
      local: { date: 'YYYY년 M월 D일', time: 'HH:mm:ss', meridiem: '[]', parse: ['YYYY년 M월 D일 HH:mm:ss', 'YYYY년 M월 D일 HH:mm'] }
    }
  },
  fr: {
    name: 'Français', englishName: 'French', shortName: 'FR', intl: 'fr-FR', moment: 'fr',
    dateFormats: {
      utc: { date: 'D MMMM YYYY', time: 'HH:mm:ss' },
      local: { date: 'D MMMM YYYY', time: 'HH:mm:ss', meridiem: '[]', parse: ['D MMMM YYYY HH:mm:ss', 'D MMMM YYYY HH:mm'] }
    }
  },
  de: {
    name: 'Deutsch', englishName: 'German', shortName: 'DE', intl: 'de-DE', moment: 'de',
    dateFormats: {
      utc: { date: 'D. MMMM YYYY', time: 'HH:mm:ss' },
      local: { date: 'D. MMMM YYYY', time: 'HH:mm:ss', meridiem: '[]', parse: ['D. MMMM YYYY HH:mm:ss', 'D. MMMM YYYY HH:mm'] }
    }
  },
  es: {
    name: 'Español', englishName: 'Spanish', shortName: 'ES', intl: 'es-ES', moment: 'es',
    dateFormats: {
      utc: { date: 'D [de] MMMM [de] YYYY', time: 'HH:mm:ss' },
      local: { date: 'D [de] MMMM [de] YYYY', time: 'HH:mm:ss', meridiem: '[]', parse: ['D [de] MMMM [de] YYYY HH:mm:ss', 'D [de] MMMM [de] YYYY HH:mm'] }
    }
  },
  'pt-BR': {
    name: 'Português (Brasil)', englishName: 'Portuguese (Brazil)', shortName: 'PT', intl: 'pt-BR', moment: 'pt-br',
    dateFormats: {
      utc: { date: 'D [de] MMMM [de] YYYY', time: 'HH:mm:ss' },
      local: { date: 'D [de] MMMM [de] YYYY', time: 'HH:mm:ss', meridiem: '[]', parse: ['D [de] MMMM [de] YYYY HH:mm:ss', 'D [de] MMMM [de] YYYY HH:mm'] }
    }
  },
  ru: {
    name: 'Русский', englishName: 'Russian', shortName: 'RU', intl: 'ru-RU', moment: 'ru',
    dateFormats: {
      utc: { date: 'D MMMM YYYY', time: 'HH:mm:ss' },
      local: { date: 'D MMMM YYYY', time: 'HH:mm:ss', meridiem: '[]', parse: ['D MMMM YYYY HH:mm:ss', 'D MMMM YYYY HH:mm'] }
    }
  },
  'it': {
    name: 'Italiano', englishName: 'Italian', shortName: 'IT', intl: 'it-IT', moment: 'it', dir: 'ltr',
    dateFormats: {
      utc: { date: 'D MMMM YYYY', time: 'HH:mm:ss' },
      local: { date: 'D MMMM YYYY', time: 'HH:mm:ss', meridiem: '[]', parse: ['D MMMM YYYY' + ' HH:mm:ss', 'D MMMM YYYY' + ' HH:mm'] }
    }
  },
  'nl': {
    name: 'Nederlands', englishName: 'Dutch', shortName: 'NL', intl: 'nl-NL', moment: 'nl', dir: 'ltr',
    dateFormats: {
      utc: { date: 'D MMMM YYYY', time: 'HH:mm:ss' },
      local: { date: 'D MMMM YYYY', time: 'HH:mm:ss', meridiem: '[]', parse: ['D MMMM YYYY' + ' HH:mm:ss', 'D MMMM YYYY' + ' HH:mm'] }
    }
  },
  'pl': {
    name: 'Polski', englishName: 'Polish', shortName: 'PL', intl: 'pl-PL', moment: 'pl', dir: 'ltr',
    dateFormats: {
      utc: { date: 'D MMMM YYYY', time: 'HH:mm:ss' },
      local: { date: 'D MMMM YYYY', time: 'HH:mm:ss', meridiem: '[]', parse: ['D MMMM YYYY' + ' HH:mm:ss', 'D MMMM YYYY' + ' HH:mm'] }
    }
  },
  'tr': {
    name: 'Türkçe', englishName: 'Turkish', shortName: 'TR', intl: 'tr-TR', moment: 'tr', dir: 'ltr',
    dateFormats: {
      utc: { date: 'D MMMM YYYY', time: 'HH:mm:ss' },
      local: { date: 'D MMMM YYYY', time: 'HH:mm:ss', meridiem: '[]', parse: ['D MMMM YYYY' + ' HH:mm:ss', 'D MMMM YYYY' + ' HH:mm'] }
    }
  },
  'vi': {
    name: 'Tiếng Việt', englishName: 'Vietnamese', shortName: 'VI', intl: 'vi-VN', moment: 'vi', dir: 'ltr',
    dateFormats: {
      utc: { date: 'D MMMM YYYY', time: 'HH:mm:ss' },
      local: { date: 'D MMMM YYYY', time: 'HH:mm:ss', meridiem: '[]', parse: ['D MMMM YYYY' + ' HH:mm:ss', 'D MMMM YYYY' + ' HH:mm'] }
    }
  },
  'id': {
    name: 'Bahasa Indonesia', englishName: 'Indonesian', shortName: 'ID', intl: 'id-ID', moment: 'id', dir: 'ltr',
    dateFormats: {
      utc: { date: 'D MMMM YYYY', time: 'HH:mm:ss' },
      local: { date: 'D MMMM YYYY', time: 'HH:mm:ss', meridiem: '[]', parse: ['D MMMM YYYY' + ' HH:mm:ss', 'D MMMM YYYY' + ' HH:mm'] }
    }
  },
  'uk': {
    name: 'Українська', englishName: 'Ukrainian', shortName: 'UK', intl: 'uk-UA', moment: 'uk', dir: 'ltr',
    dateFormats: {
      utc: { date: 'D MMMM YYYY', time: 'HH:mm:ss' },
      local: { date: 'D MMMM YYYY', time: 'HH:mm:ss', meridiem: '[]', parse: ['D MMMM YYYY' + ' HH:mm:ss', 'D MMMM YYYY' + ' HH:mm'] }
    }
  },
  'cs': {
    name: 'Čeština', englishName: 'Czech', shortName: 'CS', intl: 'cs-CZ', moment: 'cs', dir: 'ltr',
    dateFormats: {
      utc: { date: 'D. MMMM YYYY', time: 'HH:mm:ss' },
      local: { date: 'D. MMMM YYYY', time: 'HH:mm:ss', meridiem: '[]', parse: ['D. MMMM YYYY' + ' HH:mm:ss', 'D. MMMM YYYY' + ' HH:mm'] }
    }
  },
  'sv': {
    name: 'Svenska', englishName: 'Swedish', shortName: 'SV', intl: 'sv-SE', moment: 'sv', dir: 'ltr',
    dateFormats: {
      utc: { date: 'D MMMM YYYY', time: 'HH:mm:ss' },
      local: { date: 'D MMMM YYYY', time: 'HH:mm:ss', meridiem: '[]', parse: ['D MMMM YYYY' + ' HH:mm:ss', 'D MMMM YYYY' + ' HH:mm'] }
    }
  },
  'ro': {
    name: 'Română', englishName: 'Romanian', shortName: 'RO', intl: 'ro-RO', moment: 'ro', dir: 'ltr',
    dateFormats: {
      utc: { date: 'D MMMM YYYY', time: 'HH:mm:ss' },
      local: { date: 'D MMMM YYYY', time: 'HH:mm:ss', meridiem: '[]', parse: ['D MMMM YYYY' + ' HH:mm:ss', 'D MMMM YYYY' + ' HH:mm'] }
    }
  },
  'el': {
    name: 'Ελληνικά', englishName: 'Greek', shortName: 'EL', intl: 'el-GR', moment: 'el', dir: 'ltr',
    dateFormats: {
      utc: { date: 'D MMMM YYYY', time: 'HH:mm:ss' },
      local: { date: 'D MMMM YYYY', time: 'HH:mm:ss', meridiem: '[]', parse: ['D MMMM YYYY' + ' HH:mm:ss', 'D MMMM YYYY' + ' HH:mm'] }
    }
  },
  'hi': {
    name: 'हिन्दी', englishName: 'Hindi', shortName: 'HI', intl: 'hi-IN', moment: 'hi', dir: 'ltr',
    dateFormats: {
      utc: { date: 'D MMMM YYYY', time: 'HH:mm:ss' },
      local: { date: 'D MMMM YYYY', time: 'HH:mm:ss', meridiem: '[]', parse: ['D MMMM YYYY' + ' HH:mm:ss', 'D MMMM YYYY' + ' HH:mm'] }
    }
  },
  'ar': {
    name: 'العربية', englishName: 'Arabic', shortName: 'AR', intl: 'ar-SA', moment: 'ar', dir: 'rtl',
    dateFormats: {
      utc: { date: 'D MMMM YYYY', time: 'HH:mm:ss' },
      local: { date: 'D MMMM YYYY', time: 'HH:mm:ss', meridiem: '[]', parse: ['D MMMM YYYY' + ' HH:mm:ss', 'D MMMM YYYY' + ' HH:mm'] }
    }
  },
};

function mergeSection(target, overrides, label, errors) {
  if (!overrides) return;
  for (const [key, value] of Object.entries(overrides)) {
    if (!(key in target)) {
      errors.push(`${label}: unknown key ${JSON.stringify(key)}`);
      continue;
    }
    target[key] = value;
  }
}

async function applyLocale(code) {
  const meta = META[code];
  if (!meta) throw new Error(`Unsupported locale ${code}. Expected one of ${Object.keys(META).join(', ')}`);
  const en = (await import(pathToFileURL(path.join(LOCALES, 'en.js')).href)).default;
  const clone = structuredClone(en);
  clone.code = code;
  clone.name = meta.name;
  clone.englishName = meta.englishName;
  clone.shortName = meta.shortName;
  clone.intl = meta.intl;
  clone.moment = meta.moment;
  clone.dir = meta.dir || 'ltr';
  clone.dateFormats = meta.dateFormats;

  // The checked-in translation source is tools/i18n/translations/<code>.json.
  // Optional .tmp-i18n chunks stay supported for staging a work-in-progress pass;
  // later chunks win over the checked-in file.
  const data = {};
  const translationFile = path.join(ROOT, 'tools/i18n/translations', `${code}.json`);
  if (existsSync(translationFile)) {
    const parsed = JSON.parse(readFileSync(translationFile, 'utf8'));
    for (const section of ['messages', 'entities', 'categories', 'subcategories', 'units', 'html', 'meta', 'patterns']) {
      if (parsed[section]) data[section] = { ...(data[section] || {}), ...parsed[section] };
    }
  }
  const chunkDir = path.join(ROOT, '.tmp-i18n');
  const chunks = existsSync(chunkDir)
    ? readdirSync(chunkDir).filter(file => file === `${code}.json` || file.startsWith(`${code}.`)).sort()
    : [];
  for (const chunk of chunks) {
    const parsed = JSON.parse(readFileSync(path.join(chunkDir, chunk), 'utf8'));
    for (const section of ['messages', 'entities', 'categories', 'subcategories', 'units', 'html', 'meta', 'patterns']) {
      if (!parsed[section]) continue;
      data[section] = { ...(data[section] || {}), ...parsed[section] };
    }
  }
  const errors = [];

  // Persist the merged translator-owned source so the checked-in catalogues can
  // be regenerated without the temporary chunk files.
  if (Object.keys(data).length) {
    mkdirSync(path.join(ROOT, 'tools/i18n/translations'), { recursive: true });
    writeFileSync(translationFile, JSON.stringify(data, null, 2) + '\n');
  }

  mergeSection(clone.messages, data.messages, 'messages', errors);
  mergeSection(clone.entities, data.entities, 'entities', errors);
  mergeSection(clone.categories, data.categories, 'categories', errors);
  mergeSection(clone.subcategories, data.subcategories, 'subcategories', errors);
  mergeSection(clone.units, data.units, 'units', errors);
  mergeSection(clone.html, data.html, 'html', errors);
  mergeSection(clone.meta, data.meta, 'meta', errors);

  if (data.patterns) {
    for (const [key, value] of Object.entries(data.patterns)) {
      const pattern = clone.patterns.find(entry => entry.id === key);
      if (!pattern) { errors.push(`patterns: unknown id ${JSON.stringify(key)}`); continue; }
      if (value && typeof value === 'object') {
        if (typeof value.to === 'string') pattern.to = value.to;
        if (typeof value.re === 'string' && value.re !== pattern.re) pattern.re = value.re;
      } else if (typeof value === 'string') {
        pattern.to = value;
      }
    }
  }

  const header = `// ${meta.name} (${meta.englishName}) — generated from en.js + tools/i18n/translations/${code}.json\n// by tools/i18n-apply.mjs; edit the translation JSON and re-run rather than editing here.\n`;
  writeFileSync(path.join(LOCALES, `${code}.js`), header + 'export default ' + JSON.stringify(clone, null, 2) + ';\n');

  const missing = Object.keys(en.messages).filter(key => clone.messages[key] === en.messages[key]);
  const missingEntities = Object.keys(en.entities).filter(id => clone.entities[id] === en.entities[id]);
  const missingHtml = Object.keys(en.html).filter(key => clone.html[key] === en.html[key]);
  console.log(`${code}: wrote locale; untouched messages ${missing.length}/${Object.keys(en.messages).length}, entities ${missingEntities.length}/${Object.keys(en.entities).length}, html ${missingHtml.length}/${Object.keys(en.html).length}`);
  if (errors.length) {
    console.error(errors.slice(0, 20).join('\n'));
    if (errors.length > 20) console.error(`... ${errors.length - 20} more`);
  }
}

const codes = process.argv.slice(2);
if (!codes.length) {
  console.error('Usage: node tools/i18n-apply.mjs <locale> [more locales...]');
  process.exit(2);
}
for (const code of codes) await applyLocale(code);
