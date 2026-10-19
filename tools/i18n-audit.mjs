#!/usr/bin/env node
/**
 * Validate every locale against the English source catalogue.
 *
 *   node tools/i18n-audit.mjs            # report parity and translation coverage
 *   node tools/i18n-audit.mjs --strict   # exit non-zero when parity breaks or coverage is low
 *
 * "Untranslated" counts values that are still byte-identical to the English
 * source. Proper nouns and keyboard keys are expected to stay identical in some
 * languages, so the report is evidence for review, not a hard semantic verdict.
 */

import { readdirSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = path.resolve(import.meta.dirname, '..');
const LOCALES = path.join(ROOT, 'eyes/src/i18n/locales');

const en = (await import(pathToFileURL(path.join(LOCALES, 'en.js')).href)).default;
const requested = process.argv.slice(2).filter(argument => !argument.startsWith('-'));
const files = readdirSync(LOCALES).filter(file => file.endsWith('.js') && file !== 'en.js' && (!requested.length || requested.includes(file.replace(/\.js$/, '')))).sort();

const strict = process.argv.includes('--strict');
let failures = 0;

const identityAllowed = new Set([
  'spacelibre', 'L1', 'L2', 'L3', 'L4', 'L5', 'A/D', 'Q/E', 'Z/C', 'SHIFT', 'W/S', 'K', 'W/A/S/D'
]);

function compareKeys(label, englishObject, localeObject, localeCode) {
  const englishKeys = Object.keys(englishObject).sort();
  const localeKeys = Object.keys(localeObject || {}).sort();
  const missing = englishKeys.filter(key => !(key in (localeObject || {})));
  const unknown = localeKeys.filter(key => !(key in englishObject));
  if (missing.length || unknown.length) {
    failures++;
    console.error(`${localeCode} ${label}: missing ${missing.length}, unknown ${unknown.length}`);
    if (missing.length) console.error('  missing:', missing.slice(0, 8).join(' | '));
    if (unknown.length) console.error('  unknown:', unknown.slice(0, 8).join(' | '));
  }
}

function coverage(section, englishValues, localeValues) {
  const keys = Object.keys(englishValues);
  const identical = keys.filter(key => localeValues?.[key] === englishValues[key] && !identityAllowed.has(englishValues[key]));
  return { total: keys.length, translated: keys.length - identical.length, samples: identical.slice(0, 4) };
}

function htmlSignature(html) {
  return [...html.matchAll(/<\/?([a-z0-9-]+)/gi)].map(match => match[1].toLowerCase()).sort().join(',');
}

const KEYBOARD_TOKENS = ['A/D', 'Q/E', 'Z/C', 'W/S', 'W/A/S/D', 'K', 'SHIFT'];

function checkHtmlMarkup(code, locale) {
  for (const [key, englishHtml] of Object.entries(en.html)) {
    const localizedHtml = locale.html[key];
    if (typeof localizedHtml !== 'string') continue;
    if (htmlSignature(englishHtml) !== htmlSignature(localizedHtml)) {
      failures++;
      console.error(`${code} html ${key}: markup differs from the English block`);
    }
    for (const token of KEYBOARD_TOKENS) {
      const tokenPattern = new RegExp(`(^|[^A-Za-z0-9/])${token.replace(/[/]/g, '\\/')}([^A-Za-z0-9/]|$)`);
      if (tokenPattern.test(englishHtml) && !tokenPattern.test(localizedHtml)) {
        failures++;
        console.error(`${code} html ${key}: keyboard token ${token} was translated`);
      }
    }
    if (englishHtml.includes('Eyes on the Solar System') && !localizedHtml.includes('Eyes on the Solar System')) {
      failures++;
      console.error(`${code} html ${key}: product name was translated`);
    }
  }
}

for (const file of files) {
  const code = file.replace(/\.js$/, '');
  let locale;
  try {
    locale = (await import(pathToFileURL(path.join(LOCALES, file)).href)).default;
  } catch (error) {
    failures++;
    console.error(`${code}: cannot import (${error.message})`);
    continue;
  }

  compareKeys('messages', en.messages, locale.messages, code);
  compareKeys('entities', en.entities, locale.entities, code);
  compareKeys('entityAliases', en.entityAliases, locale.entityAliases, code);
  compareKeys('categories', en.categories, locale.categories, code);
  compareKeys('subcategories', en.subcategories, locale.subcategories, code);
  compareKeys('units', en.units, locale.units, code);
  compareKeys('html', en.html, locale.html, code);
  compareKeys('meta', en.meta, locale.meta, code);
  checkHtmlMarkup(code, locale);

  if (!Array.isArray(locale.patterns) || locale.patterns.length !== en.patterns.length) {
    failures++;
    console.error(`${code} patterns: expected ${en.patterns.length}, got ${locale.patterns?.length}`);
  } else {
    en.patterns.forEach((pattern, index) => {
      const localized = locale.patterns[index];
      if (localized.id !== pattern.id || localized.re !== pattern.re) {
        failures++;
        console.error(`${code} patterns[${index}] id/re mismatch`);
      }
      try { new RegExp(pattern.re); } catch { failures++; console.error(`${code} patterns[${index}] invalid regex`); }
    });
  }

  const messageCoverage = coverage('messages', en.messages, locale.messages);
  const entityCoverage = coverage('entities', en.entities, locale.entities);
  const htmlCoverage = coverage('html', en.html, locale.html);
  const patternCoverage = en.patterns.filter((pattern, index) => locale.patterns?.[index]?.to !== pattern.to).length;

  const messagePercent = Math.round(100 * messageCoverage.translated / messageCoverage.total);
  const entityPercent = Math.round(100 * entityCoverage.translated / entityCoverage.total);
  const htmlPercent = Math.round(100 * htmlCoverage.translated / htmlCoverage.total);
  const line = `${code.padEnd(6)} messages ${String(messagePercent).padStart(3)}% (${messageCoverage.translated}/${messageCoverage.total})  entities ${String(entityPercent).padStart(3)}% (${entityCoverage.translated}/${entityCoverage.total})  html ${String(htmlPercent).padStart(3)}%  patterns ${patternCoverage}/${en.patterns.length}`;
  console.log(line);
  if (messageCoverage.samples.length) console.log(`  untouched examples: ${messageCoverage.samples.map(value => JSON.stringify(value)).join(' | ')}`);

  if (strict && (
    messagePercent < 90
    || htmlPercent < 100
    || patternCoverage !== en.patterns.length
    || entityCoverage.translated < 24
  )) {
    failures++;
    console.error(`${code}: translation coverage below the release threshold (messages >=90%, html 100%, all patterns, >=24 entity names)`);
  }
}

if (failures) {
  console.error(`\ni18n audit: ${failures} problem(s)`);
  process.exit(1);
}
console.log('\ni18n audit: parity OK');
