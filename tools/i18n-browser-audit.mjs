#!/usr/bin/env node
/**
 * Browser-level i18n verification harness.
 *
 * Loads the rebuilt Eyes app in Chromium (Playwright) for every supported
 * display language, exercises the home / object / info / settings / menu /
 * layers / story / distance states, and reports:
 *
 *   a. visible text or display attributes (placeholder, aria-label, title,
 *      data-tippy-content, alt) that are byte-identical to an English
 *      catalogue key for a non-English locale;
 *   b. controls and panels whose scrollWidth/scrollHeight exceed their client
 *      box (clipped vs merely overflowing);
 *   c. console errors / page errors per locale, with known harmless remote
 *      asset 404s listed separately;
 *   d. the injected language picker: trigger placement in the settings
 *      cluster, panel contents (all ten languages) and one real switch.
 *
 * Outputs:
 *   artifacts/i18n-report.json         machine-readable evidence
 *   artifacts/i18n-report.md           human-readable report
 *   artifacts/i18n/<state>-<code>.png  screenshots (1440x900; mobile 390x844)
 *
 * Usage:
 *   node tools/i18n-browser-audit.mjs
 *   node tools/i18n-browser-audit.mjs --locales=en,zh-CN          # subset
 *   node tools/i18n-browser-audit.mjs --base=http://127.0.0.1:3002
 *   node tools/i18n-browser-audit.mjs --mobile=zh-CN,de,ru        # mobile set
 *   node tools/i18n-browser-audit.mjs --skip-picker
 *
 * This script is read-only with respect to eyes/src: it only writes artifacts.
 */

import { chromium } from 'file:///C:/Users/stone/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright/index.mjs';
import { execFile, spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const ROOT = path.resolve(import.meta.dirname, '..');
const LOCALES_DIR = path.join(ROOT, 'eyes/src/i18n/locales');

const ALL_CODES = ['en', 'zh-CN', 'zh-TW', 'ja', 'ko', 'fr', 'de', 'es', 'pt-BR', 'ru'];
const MOBILE_CODES = ['zh-CN', 'de', 'ru'];
const DESKTOP_VIEWPORT = { width: 1440, height: 900 };
const MOBILE_VIEWPORT = { width: 390, height: 844 };

const STATE_ORDER = ['home', 'info', 'settings', 'menu', 'layers', 'earth', 'story', 'distance'];

// Timing: the recovered scene needs ~10-14 s to settle; interactions are
// followed by a short animation/observer window before the DOM is sampled.
const TIMING = {
  homeSettle: 12000,
  routeSettle: 9000,
  storySettle: 11000,
  distanceSettle: 8000,
  infoWait: 2500,
  menuWait: 1800,
  layersWait: 1800,
  settingsWait: 900,
  closeWait: 700,
  mobileSettle: 13000
};

// ---------------------------------------------------------------------------
// CLI options
// ---------------------------------------------------------------------------
const argMap = new Map();
for (const raw of process.argv.slice(2)) {
  const match = /^--([^=]+)(?:=(.*))?$/.exec(raw);
  if (match) argMap.set(match[1], match[2] === undefined ? 'true' : match[2]);
}
const opt = (name, fallback = null) => (argMap.has(name) ? argMap.get(name) : fallback);

const requestedCodes = (opt('locales', '') || '')
  .split(',')
  .map(value => value.trim())
  .filter(Boolean);
const CODES = requestedCodes.length ? requestedCodes : ALL_CODES;
for (const code of CODES) {
  if (!ALL_CODES.includes(code)) {
    console.error(`Unknown locale code "${code}". Supported: ${ALL_CODES.join(', ')}`);
    process.exit(2);
  }
}
const MOBILE = (opt('mobile', MOBILE_CODES.join(',')) || '')
  .split(',')
  .map(value => value.trim())
  .filter(code => ALL_CODES.includes(code));
const SKIP_PICKER = opt('skip-picker') === 'true';
const BASE = String(opt('base', 'http://127.0.0.1:3002')).replace(/\/+$/, '');
const OUT_DIR = path.resolve(ROOT, opt('out', 'artifacts/i18n'));
const REPORT_MD = path.resolve(ROOT, opt('report', 'artifacts/i18n-report.md'));
const REPORT_JSON = path.resolve(ROOT, opt('json', 'artifacts/i18n-report.json'));
const GENERATED_AT = new Date().toISOString();

// `--fast` shortens the settle windows for a time-boxed verification run. The
// page is still allowed a few seconds to paint and update the clock/route wait.
const FAST = opt('fast') === 'true';
if (FAST) {
  Object.assign(TIMING, {
    homeSettle: 6000,
    routeSettle: 5500,
    storySettle: 6000,
    distanceSettle: 5500,
    infoWait: 1500,
    menuWait: 1200,
    layersWait: 1200,
    settingsWait: 500,
    closeWait: 400,
    mobileSettle: 6000
  });
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const shotRel = file => path.relative(path.dirname(REPORT_MD), file).split(path.sep).join('/');

// ---------------------------------------------------------------------------
// English source catalogue -> detection vocabulary
// ---------------------------------------------------------------------------
async function loadLocaleModule(code) {
  try {
    const module = await import(pathToFileURL(path.join(LOCALES_DIR, `${code}.js`)).href);
    return module.default || null;
  } catch {
    return null;
  }
}

const en = await loadLocaleModule('en');
if (!en) {
  console.error('Cannot import eyes/src/i18n/locales/en.js — the English source catalogue is required.');
  process.exit(2);
}

function normalizeText(value) {
  return String(value ?? '')
    .replace(/[\u00a0\u202f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
function normalizeHtml(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

const messageKeys = new Map();
for (const key of Object.keys(en.messages || {})) {
  const normalized = normalizeText(key);
  if (normalized && !messageKeys.has(normalized)) messageKeys.set(normalized, key);
}

const entityNames = new Set();
const addEntityName = name => {
  const normalized = normalizeText(name).toLowerCase();
  if (normalized) entityNames.add(normalized);
};
for (const name of Object.values(en.entities || {})) addEntityName(name);
for (const aliases of Object.values(en.entityAliases || {})) {
  if (Array.isArray(aliases)) for (const alias of aliases) addEntityName(alias);
}

const categoryValues = new Map();
for (const name of Object.keys(en.categories || {})) if (!categoryValues.has(normalizeText(name))) categoryValues.set(normalizeText(name), 'categories');
for (const name of Object.keys(en.subcategories || {})) if (!categoryValues.has(normalizeText(name))) categoryValues.set(normalizeText(name), 'subcategories');

const BRAND_VALUES = new Set(['nasa', 'spacelibre']);
const UPPER_TOKEN_RE = /^[A-Z0-9][A-Z0-9\s/+–—().:'"&_-]*$/;
const NUMBER_ONLY_RE = /^[\d\s.,:;+\-–—/()°%'"年月日时分秒]+$/;

function isDesignationOrKeyboard(text) {
  const value = normalizeText(text);
  if (!value || value.length > 24) return false;
  if (!/[a-z]/.test(value) && /[A-Z0-9]/.test(value) && UPPER_TOKEN_RE.test(value)) return true;
  if (NUMBER_ONLY_RE.test(value)) return true;
  if (/^(shift|space|esc|enter|tab|backspace|arrow\s?(left|right|up|down))$/i.test(value)) return true;
  return false;
}

function isExcludedEnglishText(text) {
  const value = normalizeText(text);
  const lower = value.toLowerCase();
  if (!value) return true;
  if (BRAND_VALUES.has(lower.replace(/[©®.,;:!?'"()\s-]+/g, ''))) return true;
  if (entityNames.has(lower)) return true;
  if (isDesignationOrKeyboard(value)) return true;
  return false;
}

// Native / English names for the language-picker check. Locale modules are the
// source of truth; these fallbacks keep the picker test meaningful even if a
// catalogue is momentarily mid-write by a translator.
const FALLBACK_NAMES = {
  en: { name: 'English', englishName: 'English' },
  'zh-CN': { name: '简体中文', englishName: 'Chinese (Simplified)' },
  'zh-TW': { name: '繁體中文', englishName: 'Chinese (Traditional)' },
  ja: { name: '日本語', englishName: 'Japanese' },
  ko: { name: '한국어', englishName: 'Korean' },
  fr: { name: 'Français', englishName: 'French' },
  de: { name: 'Deutsch', englishName: 'German' },
  es: { name: 'Español', englishName: 'Spanish' },
  'pt-BR': { name: 'Português (Brasil)', englishName: 'Portuguese (Brazil)' },
  ru: { name: 'Русский', englishName: 'Russian' }
};
const localeNames = {};
for (const code of ALL_CODES) {
  const module = await loadLocaleModule(code);
  localeNames[code] = module
    ? { name: module.name, englishName: module.englishName }
    : FALLBACK_NAMES[code];
}

// ---------------------------------------------------------------------------
// Dev-server preflight
// ---------------------------------------------------------------------------
async function isServerUp() {
  try {
    const response = await fetch(BASE, { signal: AbortSignal.timeout(3000) });
    return response.ok;
  } catch {
    return false;
  }
}

async function ensureServer() {
  if (await isServerUp()) return;
  console.log(`[setup] ${BASE} is not reachable — starting "cd eyes && npm run dev"...`);
  const child = spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'dev'], {
    cwd: path.join(ROOT, 'eyes'),
    detached: true,
    shell: true,
    stdio: 'ignore'
  });
  child.unref();
  for (let attempt = 0; attempt < 90; attempt++) {
    await sleep(1000);
    if (await isServerUp()) {
      console.log('[setup] dev server is up');
      return;
    }
  }
  throw new Error(`dev server at ${BASE} did not become ready`);
}

// ---------------------------------------------------------------------------
// In-page inspection (visibility, DOM paths, untranslated candidates, layout)
// ---------------------------------------------------------------------------
async function inspectPage(page) {
  return page.evaluate(() => {
    const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'CANVAS', 'SVG', 'IFRAME']);
    const ATTRIBUTES = ['placeholder', 'aria-label', 'title', 'data-tippy-content', 'alt'];

    const isVisible = element => {
      if (!element || element.nodeType !== 1) return false;
      const style = getComputedStyle(element);
      if (style.display === 'none' || style.visibility === 'hidden' || style.visibility === 'collapse') return false;
      if (Number(style.opacity) === 0) return false;
      const rect = element.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return false;
      if (rect.bottom <= 0 || rect.right <= 0 || rect.top >= window.innerHeight || rect.left >= window.innerWidth) return false;
      return true;
    };
    const className = element => (typeof element.className === 'string' ? element.className : '');
    const escapeSegment = value => (window.CSS && CSS.escape ? CSS.escape(value) : value);
    const domPath = element => {
      const parts = [];
      let current = element;
      let depth = 0;
      while (current && current.nodeType === 1 && current !== document.documentElement && depth < 8) {
        let segment = current.tagName.toLowerCase();
        if (current.id) {
          segment += `#${escapeSegment(current.id)}`;
        } else {
          const classes = [...current.classList]
            .filter(name => !/^(active|hidden|selected|open|clicked|visible|expanded|collapsed)$/.test(name))
            .slice(0, 2);
          if (classes.length) segment += `.${classes.map(escapeSegment).join('.')}`;
          const parent = current.parentElement;
          if (parent) {
            const sameTag = [...parent.children].filter(sibling => sibling.tagName === current.tagName);
            if (sameTag.length > 1) segment += `:nth-of-type(${sameTag.indexOf(current) + 1})`;
          }
        }
        parts.unshift(segment);
        current = current.parentElement;
        depth++;
      }
      return parts.join(' > ');
    };

    // -- (a) visible text / display attributes / localised HTML blocks ------
    const content = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (SKIP_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
        if (parent.closest('[data-i18n-ignore]')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let node;
    while ((node = walker.nextNode())) {
      const text = node.nodeValue.replace(/[\u00a0\u202f]/g, ' ').replace(/\s+/g, ' ').trim();
      if (!text) continue;
      const element = node.parentElement;
      if (!element || !isVisible(element)) continue;
      content.push({
        kind: 'text',
        text,
        path: domPath(element),
        tag: element.tagName.toLowerCase(),
        cls: className(element).slice(0, 100)
      });
    }

    for (const element of document.querySelectorAll('[placeholder],[aria-label],[title],[data-tippy-content],[alt]')) {
      if (element.closest('[data-i18n-ignore]')) continue;
      if (!isVisible(element)) continue;
      for (const attribute of ATTRIBUTES) {
        const value = element.getAttribute(attribute);
        const text = value ? value.replace(/[\u00a0\u202f]/g, ' ').replace(/\s+/g, ' ').trim() : '';
        if (!text) continue;
        content.push({
          kind: 'attribute',
          attr: attribute,
          text,
          path: domPath(element),
          tag: element.tagName.toLowerCase(),
          cls: className(element).slice(0, 100)
        });
      }
    }

    for (const element of document.querySelectorAll('[data-i18n-html]')) {
      if (!isVisible(element)) continue;
      content.push({
        kind: 'htmlBlock',
        key: element.getAttribute('data-i18n-html'),
        text: (element.textContent || '').replace(/[\u00a0\u202f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 240),
        html: element.innerHTML.slice(0, 4000),
        path: domPath(element),
        tag: element.tagName.toLowerCase(),
        cls: className(element).slice(0, 100)
      });
    }

    // -- (b) layout candidates ---------------------------------------------
    const scopes = [
      ['.settings', '.settings, .settings .container, .settings .content, .settings button, .settings label, .settings span.title, .settings .lighting-option'],
      ['top-nav', 'nav.container, nav.container *, .share-button, .menu-btn, .app-title, .spacelibre-logo'],
      ['menu', '.mega-menu .menu-container, .mega-menu .menu-container *, .mega-menu .menu-btn'],
      ['layers', '#layer-panel, #layer-panel *'],
      ['info', '.info-panel, .info-panel *'],
      ['story', '.story-view .title, .story-view .subtitle, .story-view .description, .story-view .navigation-button, .story-view .story-bottom-bar, .story-view [class*="panel"]'],
      ['distance', '.distance-view [class*="dp-"], .distance-view .panel, .distance-view .panel *, .distance-view .item-toggle-btn, .distance-view [class*="result"], .distance-view [class*="input"]'],
      ['time-controls', '.c-menu-container, .c-menu-container *'],
      ['language-picker', '.spacelibre-lang-trigger, .spacelibre-lang-panel, .spacelibre-lang-panel *'],
      ['featured', '.featured-stories-panel, .featured-stories-panel *'],
      ['toast', '.toast, .toast *']
    ];
    const candidates = new Map();
    for (const [scope, selector] of scopes) {
      for (const element of document.querySelectorAll(selector)) {
        if (!candidates.has(element)) candidates.set(element, scope);
      }
    }
    for (const element of document.querySelectorAll('button, a, label, [role=button], input, select')) {
      if (!candidates.has(element)) candidates.set(element, 'control');
    }

    const layout = [];
    for (const [element, scope] of candidates) {
      if (!isVisible(element)) continue;
      const text = (element.innerText || element.textContent || '').replace(/[\u00a0\u202f]/g, ' ').replace(/\s+/g, ' ').trim();
      if (!text) continue;
      const style = getComputedStyle(element);
      const scrollWidth = element.scrollWidth;
      const clientWidth = element.clientWidth;
      const scrollHeight = element.scrollHeight;
      const clientHeight = element.clientHeight;
      if (scrollWidth <= clientWidth + 2 && scrollHeight <= clientHeight + 2) continue;
      if (clientWidth === 0 && clientHeight === 0) continue;
      const rect = element.getBoundingClientRect();
      layout.push({
        scope,
        path: domPath(element),
        tag: element.tagName.toLowerCase(),
        cls: className(element).slice(0, 120),
        text: text.slice(0, 160),
        scrollWidth,
        clientWidth,
        scrollHeight,
        clientHeight,
        overflowX: style.overflowX,
        overflowY: style.overflowY,
        whiteSpace: style.whiteSpace,
        textOverflow: style.textOverflow,
        rect: [Math.round(rect.x), Math.round(rect.y), Math.round(rect.width), Math.round(rect.height)]
      });
      if (layout.length >= 300) break;
    }

    // -- meta --------------------------------------------------------------
    const settingsContent = document.querySelector('.settings .container .content');
    const langTrigger = document.querySelector('.settings .container .content > .spacelibre-lang-trigger');
    const infoPanel = document.querySelector('.info-panel');
    const layerPanel = document.querySelector('#layer-panel');
    const menuContainer = document.querySelector('.mega-menu .menu-container');
    const isTransparent = element => {
      if (!element) return false;
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
    };
    const clockMeridiem = document.querySelector('.time-controls .meridiem');
    const clockDate = document.querySelector('.time-controls .date');
    const clockTime = document.querySelector('.time-controls .time');
    const clockText = element => (element ? (element.textContent || '').replace(/\s+/g, ' ').trim() : null);

    return {
      content,
      layout,
      meta: {
        title: document.title,
        htmlLang: document.documentElement.lang,
        datasetLocale: document.documentElement.dataset.locale || null,
        bodyClass: document.body.className,
        url: location.href,
        viewport: { width: innerWidth, height: innerHeight },
        i18nLocale: window.spacelibreI18n ? window.spacelibreI18n.locale : null,
        i18nEnabled: window.spacelibreI18n ? window.spacelibreI18n.enabled : null,
        clock: {
          date: clockText(clockDate),
          time: clockText(clockTime),
          meridiem: clockText(clockMeridiem),
          meridiemVisible: isVisible(clockMeridiem)
        },
        settingsCluster: {
          settingsClass: document.querySelector('.settings') ? document.querySelector('.settings').className : null,
          containerClass: document.querySelector('.settings > .container') ? document.querySelector('.settings > .container').className : null,
          contentPresent: Boolean(settingsContent)
        },
        languageTrigger: langTrigger
          ? {
              present: true,
              visible: isVisible(langTrigger),
              firstChild: settingsContent ? settingsContent.firstElementChild === langTrigger : false,
              text: (langTrigger.innerText || '').trim(),
              parentClass: langTrigger.parentElement ? className(langTrigger.parentElement) : null,
              hasIgnoreAttribute: langTrigger.hasAttribute('data-i18n-ignore')
            }
          : { present: false, visible: false, firstChild: false },
        infoPanel: {
          present: Boolean(infoPanel),
          visible: isTransparent(infoPanel),
          className: infoPanel ? className(infoPanel) : null
        },
        layerPanel: {
          present: Boolean(layerPanel),
          visible: isTransparent(layerPanel),
          className: layerPanel ? className(layerPanel) : null
        },
        menu: {
          present: Boolean(menuContainer),
          visible: isTransparent(menuContainer),
          className: menuContainer ? className(menuContainer) : null
        }
      }
    };
  });
}

// ---------------------------------------------------------------------------
// Detection / classification (Node side)
// ---------------------------------------------------------------------------
function processContent(rawContent, code, state, screenshot, baselineTitle) {
  const untranslated = [];
  const htmlBlocks = [];
  const otherCatalogue = [];
  if (code === 'en') return { untranslated, htmlBlocks, otherCatalogue };

  for (const item of rawContent) {
    if (item.kind === 'htmlBlock') {
      const englishHtml = en.html ? en.html[item.key] : null;
      if (englishHtml && normalizeHtml(item.html) === normalizeHtml(englishHtml)) {
        htmlBlocks.push({
          state,
          key: item.key,
          path: item.path,
          text: item.text,
          screenshot
        });
      }
      continue;
    }
    const text = normalizeText(item.text);
    if (!text) continue;
    const englishKey = messageKeys.get(text);
    if (englishKey) {
      if (isExcludedEnglishText(text)) continue;
      untranslated.push({
        state,
        kind: item.kind,
        attr: item.attr || null,
        text,
        key: englishKey,
        path: item.path,
        tag: item.tag,
        cls: item.cls,
        screenshot
      });
      continue;
    }
    const catalogueKind = categoryValues.get(text);
    if (catalogueKind && !isExcludedEnglishText(text)) {
      otherCatalogue.push({ state, kind: item.kind, attr: item.attr || null, text, catalogueKind, path: item.path, screenshot });
    }
  }
  return { untranslated, htmlBlocks, otherCatalogue };
}

function detectTitle(title, code, baselineTitle, screenshot) {
  if (code === 'en' || !title) return null;
  const englishTitle = baselineTitle || 'Solar System';
  if (title === englishTitle || (en.meta && en.meta.titlePrefix && title.includes(en.meta.titlePrefix))) {
    return { state: 'home', kind: 'title', attr: null, text: title, key: englishTitle, path: 'document.title', screenshot };
  }
  return null;
}

const ISO_DATETIME_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;

/**
 * The locales set `dateFormats.*.meridiem` to "" so the AM/PM chip disappears.
 * The recovered Clock renders that format through moment, where `format('')`
 * returns the full ISO timestamp; the ISO string then overlaps the time slider
 * label. That is a real display defect, so it is detected separately from the
 * catalogue coverage checks.
 */
function detectFormatDefects(meta, code, state, screenshot) {
  const defects = [];
  if (code === 'en' || !meta || !meta.clock) return defects;
  const clock = meta.clock;
  if (clock.meridiem && ISO_DATETIME_RE.test(clock.meridiem)) {
    defects.push({
      state,
      defect: 'clock-meridiem-iso',
      selector: '.time-controls .meridiem',
      text: clock.meridiem,
      rendered: `${clock.date || ''} ${clock.time || ''} ${clock.meridiem}`.trim(),
      screenshot
    });
  }
  return defects;
}

// Time-slider internals, the expanded time-controls wrappers and icon-only
// buttons overflow by design (knob hit area, animated accordion, icon glyphs).
// They are not translation-induced text overflow and would drown the signal.
const INTENTIONAL_LAYOUT_NOISE = /(^|\s)(knob|slider-container|svg-parent|slider-input|realtime|rate-controls|c-menu-container|expanded-container|c-menu-item|time-controls|menu-header|close-button|os-host|os-viewport|os-scrollbar)(\s|$)/;

function processLayout(rawLayout, code, state, viewportKey, screenshot, baselinePaths) {
  const findings = [];
  for (const item of rawLayout) {
    if (INTENTIONAL_LAYOUT_NOISE.test(item.cls)) continue;
    const widthOver = item.scrollWidth > item.clientWidth + 2;
    const heightOver = item.scrollHeight > item.clientHeight + 2;
    const skipWidth = /(auto|scroll)/.test(item.overflowX);
    const skipHeight = /(auto|scroll)/.test(item.overflowY);
    if ((!widthOver || skipWidth) && (!heightOver || skipHeight)) continue;
    if (item.clientWidth === 0 || item.clientHeight === 0) continue;
    // Scrollbar hosts are intentional scroll containers, never layout defects.
    if (/os-host|os-viewport|os-scrollbar/.test(item.cls) && !widthOver) continue;
    const clipped = /(hidden|clip)/.test(item.overflowX) || /(hidden|clip)/.test(item.overflowY);
    const ellipsis = item.textOverflow === 'ellipsis';
    const axis = widthOver && !skipWidth && heightOver && !skipHeight ? 'both' : widthOver && !skipWidth ? 'width' : 'height';
    findings.push({
      state,
      viewport: viewportKey,
      scope: item.scope,
      path: item.path,
      tag: item.tag,
      cls: item.cls,
      text: item.text,
      axis,
      classification: clipped ? 'clipped' : ellipsis ? 'ellipsis-clipped' : 'overflow-visible',
      scrollWidth: item.scrollWidth,
      clientWidth: item.clientWidth,
      scrollHeight: item.scrollHeight,
      clientHeight: item.clientHeight,
      deltaWidth: item.scrollWidth - item.clientWidth,
      deltaHeight: item.scrollHeight - item.clientHeight,
      overflowX: item.overflowX,
      overflowY: item.overflowY,
      whiteSpace: item.whiteSpace,
      rect: item.rect,
      screenshot,
      alsoInEnglish: baselinePaths ? baselinePaths.has(item.path) : false
    });
  }
  return findings;
}

function classifyUrl(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return 'other';
  }
  if (/(^|\.)eyes\.nasa\.gov$/.test(parsed.hostname)) {
    if (/^\/assets\/(static|dynamic)\//.test(parsed.pathname)) return 'nasa-asset-404';
    return 'nasa-other';
  }
  if (/(^|\.)(youtube\.com|ytimg\.com|googlevideo\.com|youtu\.be)$/.test(parsed.hostname)) return 'youtube';
  return 'other';
}

function finalizeNetwork(raw) {
  const ignored = [];
  const real = [];
  const seen = new Set();
  for (const entry of raw) {
    const key = `${entry.kind}|${entry.url}|${entry.status || entry.error || ''}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const classification = classifyUrl(entry.url);
    if (classification !== 'other') ignored.push({ ...entry, classification });
    else real.push(entry);
  }
  return { ignored, real };
}

// ---------------------------------------------------------------------------
// Chromium page drivers
// ---------------------------------------------------------------------------
async function gotoState(page, url, settleMs, code) {
  let lastError = null;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      lastError = null;
      break;
    } catch (error) {
      lastError = error;
      await sleep(2500);
    }
  }
  if (lastError) throw lastError;
  await page.waitForSelector('#pioneer, #ui', { timeout: 15000 }).catch(() => {});
  // `document.readyState === 'complete'` can stall on the embedded YouTube frame
  // and long-lived remote NASA asset requests; domcontentloaded + the fixed
  // settle window is the reliable readiness signal for this app.
  await page.waitForFunction(() => document.readyState === 'complete', { timeout: 4000 }).catch(() => {});
  await sleep(settleMs);
}

async function capture(page, state, code, viewportKey, suffix = '') {
  const filename = `${state}-${code}${suffix}.png`;
  const file = path.join(OUT_DIR, filename);
  try {
    await page.screenshot({ path: file, timeout: 15000, animations: 'disabled' });
    return shotRel(file);
  } catch (error) {
    console.log(`\n  screenshot failed (${state} ${code}): ${String(error.message || error).split('\n')[0]}`);
    return null;
  }
}

async function waitUntilHidden(page, selector, timeout = 6000) {
  try {
    await page.waitForFunction(
      sel => {
        const element = document.querySelector(sel);
        if (!element) return true;
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return (
          style.display === 'none' ||
          style.visibility === 'hidden' ||
          Number(style.opacity) === 0 ||
          rect.width === 0 ||
          rect.height === 0
        );
      },
      selector,
      { timeout, polling: 100 }
    );
  } catch {
    /* a stuck overlay is reported by the next state instead of hanging the run */
  }
}

async function waitUntilVisible(page, selector, timeout = 8000) {
  try {
    await page.waitForFunction(
      sel => {
        const element = document.querySelector(sel);
        if (!element) return false;
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
      },
      selector,
      { timeout, polling: 100 }
    );
    return true;
  } catch {
    return false;
  }
}

/**
 * The recovered scene renders through software WebGL in headless Chromium and can
 * take 0.5-1.5 s per animation frame. Playwright's real-mouse actionability
 * checks wait on animation frames, which makes them slow and timeout-prone on
 * this page. The app's controls are plain `onclick` / addEventListener handlers,
 * so a synthetic element click exercises the same UI code path while keeping the
 * audit deterministic.
 */
async function jsClick(page, selector) {
  return page.evaluate(sel => {
    const element = document.querySelector(sel);
    if (!element) return { ok: false, reason: 'not found' };
    element.click();
    return { ok: true };
  }, selector);
}

async function jsClickOptionByText(page, optionSelector, needles) {
  return page.evaluate(
    ({ selector, needles: texts }) => {
      const options = [...document.querySelectorAll(selector)];
      for (const option of options) {
        const content = (option.textContent || '').replace(/\s+/g, ' ');
        if (texts.some(text => content.includes(text))) {
          option.click();
          return { ok: true, text: content.trim() };
        }
      }
      return { ok: false, options: options.map(option => (option.textContent || '').trim()) };
    },
    { selector: optionSelector, needles }
  );
}

async function closeInfoPanel(page) {
  await jsClick(page, '.overlay .close-button');
  await waitUntilHidden(page, '.overlay');
  await sleep(TIMING.closeWait);
}

async function closeMenu(page) {
  await jsClick(page, '.mega-menu .menu-container .close-button');
  await waitUntilHidden(page, '.mega-menu .overlay-bg');
  await waitUntilHidden(page, '.mega-menu .menu-container');
  await sleep(TIMING.closeWait);
}

async function closeLayers(page) {
  await jsClick(page, '#layer-panel .close');
  await waitUntilHidden(page, '#layer-panel');
  await sleep(TIMING.closeWait);
}

function makeNetworkCollector() {
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];
  const httpErrors = [];
  let currentState = 'init';
  return {
    setState(state) {
      currentState = state;
    },
    attach(page) {
      page.on('console', message => {
        if (message.type() !== 'error') return;
        const location = message.location();
        consoleErrors.push({ state: currentState, text: message.text().slice(0, 500), url: location ? location.url : '' });
      });
      page.on('pageerror', error => {
        pageErrors.push({ state: currentState, text: String(error && error.stack ? error.stack : error).slice(0, 800) });
      });
      page.on('requestfailed', request => {
        failedRequests.push({
          kind: 'requestfailed',
          state: currentState,
          url: request.url(),
          error: request.failure() ? request.failure().errorText : ''
        });
      });
      page.on('response', response => {
        if (response.status() < 400) return;
        httpErrors.push({ kind: 'http', state: currentState, url: response.url(), status: response.status() });
      });
    },
    collect() {
      const ignoredConsole = [];
      const realConsole = [];
      for (const entry of consoleErrors) {
        const classification = entry.url ? classifyUrl(entry.url) : 'other';
        if (classification === 'nasa-asset-404' || classification === 'youtube') {
          ignoredConsole.push({ ...entry, kind: 'console', classification });
        } else {
          realConsole.push(entry);
        }
      }
      const network = finalizeNetwork([
        ...failedRequests,
        ...httpErrors,
        ...ignoredConsole
      ]);
      return {
        consoleErrors: realConsole,
        pageErrors,
        ignoredNetwork: network.ignored,
        otherNetworkErrors: network.real
      };
    }
  };
}

// ---------------------------------------------------------------------------
// Per-locale desktop audit
// ---------------------------------------------------------------------------
async function auditLocaleDesktop(browser, code, shared) {
  const startedAt = Date.now();
  const context = await browser.newContext({ viewport: DESKTOP_VIEWPORT, locale: 'en-US' });
  const page = await context.newPage();
  page.setDefaultTimeout(20000);
  const network = makeNetworkCollector();
  network.attach(page);

  const result = {
    code,
    viewport: 'desktop-1440x900',
    applied: false,
    states: {},
    screenshots: [],
    untranslated: [],
    htmlBlocks: [],
    otherCatalogue: [],
    layout: [],
    titleFindings: [],
    formatDefects: [],
    network: null,
    stateErrors: [],
    meta: null,
    durationMs: 0
  };

  const runState = async (state, settleAction, { screenshot = true, suffix = '' } = {}) => {
    network.setState(state);
    process.stdout.write(`\n  [${code}] ${state} ...`);
    try {
      await settleAction();
      const shot = screenshot ? await capture(page, state, code, 'desktop', suffix) : null;
      if (shot) result.screenshots.push({ state, viewport: 'desktop-1440x900', file: shot });
      const inspected = await inspectPage(page);
      const processed = processContent(inspected.content, code, state, shot, shared.baselineTitle);
      result.untranslated.push(...processed.untranslated);
      result.htmlBlocks.push(...processed.htmlBlocks);
      result.otherCatalogue.push(...processed.otherCatalogue);
      const titleFinding = detectTitle(inspected.meta.title, code, shared.baselineTitle, shot);
      if (titleFinding) result.titleFindings.push(titleFinding);
      result.formatDefects.push(...detectFormatDefects(inspected.meta, code, state, shot));
      result.layout.push(...processLayout(inspected.layout, code, state, 'desktop-1440x900', shot, shared.baselineLayoutPaths));
      result.states[state] = {
        title: inspected.meta.title,
        htmlLang: inspected.meta.htmlLang,
        datasetLocale: inspected.meta.datasetLocale,
        bodyClass: inspected.meta.bodyClass,
        url: inspected.meta.url,
        languageTrigger: inspected.meta.languageTrigger,
        infoPanelVisible: inspected.meta.infoPanel.visible,
        layerPanelVisible: inspected.meta.layerPanel.visible,
        menuVisible: inspected.meta.menu.visible,
        untranslatedCount: processed.untranslated.length,
        layoutCount: 0
      };
      process.stdout.write(
        ` done (untranslated=${processed.untranslated.length} layout=${result.layout.length} console=${result.network ? result.network.consoleErrors?.length : '?'})`
      );
      return inspected.meta;
    } catch (error) {
      const message = String(error && error.message ? error.message : error).slice(0, 400);
      result.stateErrors.push({ state, error: message });
      process.stdout.write(` FAILED: ${message.split('\n')[0]}`);
      return null;
    }
  };

  try {
    const homeMeta = await runState('home', () => gotoState(page, `${BASE}/?lang=${code}`, TIMING.homeSettle, code));
    result.meta = homeMeta;
    if (homeMeta) {
      result.applied =
        homeMeta.htmlLang === code &&
        homeMeta.datasetLocale === code &&
        (homeMeta.i18nLocale === code || homeMeta.i18nLocale === null);
      if (code === 'en') shared.baselineTitle = homeMeta.title;
    }

    // Info panel (onboarding overlay in the shared .overlay).
    await runState('info', async () => {
      await jsClick(page, '.settings button:has(.icon-info)');
      await waitUntilVisible(page, '.info-panel', 8000);
      await page.waitForTimeout(TIMING.infoWait);
    });
    await closeInfoPanel(page);

    // Settings cluster: collapse -> expand (the cluster content is the panel).
    network.setState('settings');
    try {
      const toggleSelector = '.settings > button.toggle';
      if ((await page.locator(toggleSelector).count()) > 0) {
        let containerClass = await page.evaluate(() => {
          const element = document.querySelector('.settings > .container');
          return element ? element.className : '';
        });
        if (!/\bactive\b/.test(containerClass)) {
          await jsClick(page, toggleSelector);
          await page.waitForTimeout(TIMING.settingsWait);
        }
        const expandedInspected = await inspectPage(page);
        const expandedShot = await capture(page, 'settings', code, 'desktop');
        if (expandedShot) result.screenshots.push({ state: 'settings', viewport: 'desktop-1440x900', file: expandedShot });
        const expandedContent = processContent(expandedInspected.content, code, 'settings', expandedShot, shared.baselineTitle);
        result.untranslated.push(...expandedContent.untranslated);
        result.htmlBlocks.push(...expandedContent.htmlBlocks);
        result.otherCatalogue.push(...expandedContent.otherCatalogue);
        result.layout.push(...processLayout(expandedInspected.layout, code, 'settings', 'desktop-1440x900', expandedShot, shared.baselineLayoutPaths));
        result.formatDefects.push(...detectFormatDefects(expandedInspected.meta, code, 'settings', expandedShot));

        await jsClick(page, toggleSelector);
        await page.waitForTimeout(TIMING.settingsWait);
        const collapsedClass = await page.evaluate(() => {
          const element = document.querySelector('.settings > .container');
          return element ? element.className : '';
        });
        result.states.settings = {
          expandedClass: containerClass,
          collapsedClass,
          languagesTriggerPresent: Boolean(expandedInspected.meta.languageTrigger.present)
        };
        // Restore expanded state for the remaining interactions.
        if (/\bhidden\b/.test(collapsedClass)) {
          await jsClick(page, toggleSelector);
          await page.waitForTimeout(TIMING.settingsWait);
        }
      }
    } catch (error) {
      result.stateErrors.push({ state: 'settings', error: String(error.message || error).slice(0, 400) });
    }

    // Menu overlay.
    await runState('menu', async () => {
      await jsClick(page, '.menu-btn');
      await waitUntilVisible(page, '.mega-menu .menu-container', 8000);
      await page.waitForTimeout(TIMING.menuWait);
    });
    await closeMenu(page);

    // Layers panel.
    await runState('layers', async () => {
      await jsClick(page, '.settings button.icon-layers');
      await waitUntilVisible(page, '#layer-panel', 8000);
      await page.waitForTimeout(TIMING.layersWait);
    });
    await closeLayers(page);

    // Object view.
    await runState('earth', () => gotoState(page, `${BASE}/?lang=${code}#/earth`, TIMING.routeSettle, code));

    // Story view.
    await runState('story', () => gotoState(page, `${BASE}/?lang=${code}#/story/voyager_grand_tour`, TIMING.storySettle, code));

    // Distance view.
    await runState('distance', () => gotoState(page, `${BASE}/?lang=${code}#/earth/distance`, TIMING.distanceSettle, code));

    // English control becomes the layout baseline for the other locales.
    if (code === 'en') {
      shared.baselineLayoutPaths = new Set(
        result.layout.filter(entry => entry.viewport === 'desktop-1440x900').map(entry => entry.path)
      );
    }
  } catch (error) {
    result.fatalError = String(error && error.message ? error.message : error).slice(0, 800);
  } finally {
    result.network = network.collect();
    await context.close().catch(() => {});
    result.durationMs = Date.now() - startedAt;
    dedupeResult(result);
  }
  return result;
}

// ---------------------------------------------------------------------------
// Per-locale mobile audit (home only, 390x844)
// ---------------------------------------------------------------------------
async function auditLocaleMobile(browser, code) {
  const startedAt = Date.now();
  const context = await browser.newContext({
    viewport: MOBILE_VIEWPORT,
    locale: 'en-US',
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 1
  });
  const page = await context.newPage();
  page.setDefaultTimeout(20000);
  const network = makeNetworkCollector();
  network.attach(page);
  network.setState('home-mobile');

  const result = {
    code,
    viewport: 'mobile-390x844',
    applied: false,
    states: {},
    screenshots: [],
    untranslated: [],
    htmlBlocks: [],
    otherCatalogue: [],
    layout: [],
    titleFindings: [],
    formatDefects: [],
    network: null,
    stateErrors: [],
    meta: null,
    durationMs: 0
  };

  try {
    await gotoState(page, `${BASE}/?lang=${code}`, TIMING.mobileSettle, code);
    const shot = await capture(page, 'home', code, 'mobile', '-mobile');
    if (shot) result.screenshots.push({ state: 'home-mobile', viewport: 'mobile-390x844', file: shot });
    const inspected = await inspectPage(page);
    const processed = processContent(inspected.content, code, 'home-mobile', shot, null);
    result.untranslated.push(...processed.untranslated);
    result.htmlBlocks.push(...processed.htmlBlocks);
    result.otherCatalogue.push(...processed.otherCatalogue);
    result.layout.push(...processLayout(inspected.layout, code, 'home-mobile', 'mobile-390x844', shot, null));
    result.formatDefects.push(...detectFormatDefects(inspected.meta, code, 'home-mobile', shot));
    result.meta = inspected.meta;
    result.applied =
      inspected.meta.htmlLang === code &&
      inspected.meta.datasetLocale === code &&
      (inspected.meta.i18nLocale === code || inspected.meta.i18nLocale === null);
    result.states['home-mobile'] = {
      title: inspected.meta.title,
      htmlLang: inspected.meta.htmlLang,
      datasetLocale: inspected.meta.datasetLocale,
      bodyClass: inspected.meta.bodyClass,
      url: inspected.meta.url,
      languageTrigger: inspected.meta.languageTrigger,
      untranslatedCount: processed.untranslated.length
    };
  } catch (error) {
    result.stateErrors.push({ state: 'home-mobile', error: String(error.message || error).slice(0, 400) });
  } finally {
    result.network = network.collect();
    await context.close().catch(() => {});
    result.durationMs = Date.now() - startedAt;
    dedupeResult(result);
  }
  return result;
}

// ---------------------------------------------------------------------------
// Language picker verification (one real switch, en -> ja)
// ---------------------------------------------------------------------------
async function auditLanguagePicker(browser) {
  const startedAt = Date.now();
  const context = await browser.newContext({ viewport: DESKTOP_VIEWPORT, locale: 'en-US' });
  const page = await context.newPage();
  page.setDefaultTimeout(20000);
  const result = {
    passed: false,
    steps: {},
    options: [],
    switch: {},
    errors: [],
    durationMs: 0
  };
  try {
    await gotoState(page, `${BASE}/?lang=en`, TIMING.homeSettle, 'en');
    const initial = await inspectPage(page);
    const trigger = initial.meta.languageTrigger;
    result.steps.triggerInSettingsCluster = Boolean(trigger.present && trigger.firstChild && trigger.parentClass && trigger.parentClass.includes('content'));
    result.steps.triggerVisible = Boolean(trigger.visible);
    result.steps.triggerText = trigger.text || null;

    const triggerCount = await page.evaluate(() => document.querySelectorAll('.settings .container .content > .spacelibre-lang-trigger').length);
    result.steps.triggerCount = triggerCount;
    if (triggerCount !== 1) throw new Error(`expected exactly one language trigger, found ${triggerCount}`);
    await jsClick(page, '.settings .container .content > .spacelibre-lang-trigger');
    const panelOpened = await waitUntilVisible(page, '.spacelibre-lang-panel', 8000);
    await page.waitForTimeout(500);

    const panel = await page.evaluate(() => {
      const panelElement = document.querySelector('.spacelibre-lang-panel');
      const options = [...document.querySelectorAll('.spacelibre-lang-option')].map(option => ({
        text: (option.innerText || '').replace(/\s+/g, ' ').trim(),
        native: option.querySelector('.spacelibre-lang-native') ? option.querySelector('.spacelibre-lang-native').textContent : null,
        english: option.querySelector('.spacelibre-lang-english') ? option.querySelector('.spacelibre-lang-english').textContent : null,
        pressed: option.getAttribute('aria-pressed')
      }));
      const rect = panelElement ? panelElement.getBoundingClientRect() : null;
      return {
        present: Boolean(panelElement),
        visible: Boolean(panelElement && rect.width > 0 && rect.height > 0),
        title: document.querySelector('.spacelibre-lang-title') ? document.querySelector('.spacelibre-lang-title').textContent : null,
        optionCount: options.length,
        options,
        rect: rect ? [Math.round(rect.x), Math.round(rect.y), Math.round(rect.width), Math.round(rect.height)] : null
      };
    });
    result.steps.panelOpens = panelOpened && panel.present && panel.visible;
    result.steps.panelTitle = panel.title;
    result.options = panel.options;
    result.steps.optionCount = panel.optionCount;
    result.steps.allTenListed = panel.optionCount === ALL_CODES.length;
    result.steps.allExpectedNames = ALL_CODES.every(code => {
      const expected = localeNames[code];
      return panel.options.some(option => {
        const text = option.text;
        return text.includes(expected.name) || text.includes(expected.englishName);
      });
    });
    result.steps.panelRect = panel.rect;

    // One real switch: English -> Japanese.
    const japanese = localeNames.ja;
    const optionClick = await jsClickOptionByText(page, '.spacelibre-lang-option', [japanese.englishName, japanese.name]);
    result.steps.switchOptionText = optionClick.ok ? optionClick.text : null;
    if (!optionClick.ok) throw new Error(`could not find the Japanese language option: ${JSON.stringify(optionClick.options)}`);
    await page.waitForURL(/[?&]lang=ja(?:[&#]|$)/, { timeout: 30000 });
    await page.waitForLoadState('domcontentloaded').catch(() => {});
    await page.waitForTimeout(6000);
    const after = await inspectPage(page);
    result.switch = {
      url: after.meta.url,
      urlHasLangJa: /[?&]lang=ja(?:[&#]|$)/.test(after.meta.url),
      htmlLang: after.meta.htmlLang,
      datasetLocale: after.meta.datasetLocale,
      i18nLocale: after.meta.i18nLocale,
      triggerText: after.meta.languageTrigger ? after.meta.languageTrigger.text : null,
      title: after.meta.title
    };
    result.switch.passed =
      result.switch.urlHasLangJa &&
      result.switch.htmlLang === 'ja' &&
      result.switch.datasetLocale === 'ja' &&
      result.switch.i18nLocale === 'ja';
    result.passed =
      result.steps.triggerInSettingsCluster &&
      result.steps.triggerVisible &&
      result.steps.panelOpens &&
      result.steps.allTenListed &&
      result.steps.allExpectedNames &&
      result.switch.passed;
  } catch (error) {
    result.errors.push(String(error && error.message ? error.message : error).slice(0, 800));
  } finally {
    await context.close().catch(() => {});
    result.durationMs = Date.now() - startedAt;
  }
  return result;
}

// ---------------------------------------------------------------------------
// Dedupe / summary helpers
// ---------------------------------------------------------------------------
function dedupeResult(result) {
  const seenText = new Set();
  result.untranslated = result.untranslated.filter(entry => {
    const key = `${entry.kind}|${entry.attr || ''}|${entry.text}`;
    if (seenText.has(key)) return false;
    seenText.add(key);
    return true;
  });
  const seenHtml = new Set();
  result.htmlBlocks = result.htmlBlocks.filter(entry => {
    if (seenHtml.has(entry.key)) return false;
    seenHtml.add(entry.key);
    return true;
  });
  const seenLayout = new Set();
  result.layout = result.layout.filter(entry => {
    const key = `${entry.viewport}|${entry.state}|${entry.path}|${entry.axis}|${entry.text}`;
    if (seenLayout.has(key)) return false;
    seenLayout.add(key);
    return true;
  });
  const seenOther = new Set();
  result.otherCatalogue = result.otherCatalogue.filter(entry => {
    const key = `${entry.kind}|${entry.attr || ''}|${entry.text}`;
    if (seenOther.has(key)) return false;
    seenOther.add(key);
    return true;
  });
  const seenFormat = new Set();
  result.formatDefects = result.formatDefects.filter(entry => {
    const key = `${entry.defect}|${entry.selector}|${entry.text}`;
    if (seenFormat.has(key)) return false;
    seenFormat.add(key);
    return true;
  });
  result.untranslated = result.untranslated.slice(0, 500);
  result.layout = result.layout.slice(0, 150);
  result.otherCatalogue = result.otherCatalogue.slice(0, 100);
  result.formatDefects = result.formatDefects.slice(0, 20);
  if (result.network) {
    result.network.ignoredNetwork = result.network.ignoredNetwork.slice(0, 80);
    result.network.consoleErrors = result.network.consoleErrors.slice(0, 50);
    result.network.pageErrors = result.network.pageErrors.slice(0, 30);
    result.network.otherNetworkErrors = result.network.otherNetworkErrors.slice(0, 30);
  }
}

function sortUntranslated(entries) {
  const stateRank = state => {
    const index = STATE_ORDER.indexOf(state);
    return index === -1 ? STATE_ORDER.length : index;
  };
  return [...entries].sort((left, right) => {
    const leftKind = left.kind === 'attribute' ? 0 : left.kind === 'title' ? 1 : 2;
    const rightKind = right.kind === 'attribute' ? 0 : right.kind === 'title' ? 1 : 2;
    if (leftKind !== rightKind) return leftKind - rightKind;
    const leftState = stateRank(left.state);
    const rightState = stateRank(right.state);
    if (leftState !== rightState) return leftState - rightState;
    if (left.text.length !== right.text.length) return left.text.length - right.text.length;
    return left.text.localeCompare(right.text);
  });
}

function summarizeLocale(result) {
  const layoutClipped = result.layout.filter(entry => entry.classification !== 'overflow-visible').length;
  const layoutOverflow = result.layout.filter(entry => entry.classification === 'overflow-visible').length;
  const ignoredCounts = {};
  for (const entry of result.network ? result.network.ignoredNetwork : []) {
    ignoredCounts[entry.classification] = (ignoredCounts[entry.classification] || 0) + 1;
  }
  return {
    untranslatedUnique: result.untranslated.length,
    htmlBlocks: result.htmlBlocks.length,
    otherCatalogue: result.otherCatalogue.length,
    formatDefects: result.formatDefects.length,
    layoutClipped,
    layoutOverflow,
    layoutTotal: result.layout.length,
    consoleErrors: result.network ? result.network.consoleErrors.length : 0,
    pageErrors: result.network ? result.network.pageErrors.length : 0,
    otherNetworkErrors: result.network ? result.network.otherNetworkErrors.length : 0,
    ignoredNetwork: result.network ? result.network.ignoredNetwork.length : 0,
    ignoredCounts,
    applied: result.applied,
    stateErrors: result.stateErrors.length,
    fatalError: Boolean(result.fatalError)
  };
}

// ---------------------------------------------------------------------------
// Static catalogue audit (tools/i18n-audit.mjs) snapshot
// ---------------------------------------------------------------------------
async function runStaticAudit() {
  try {
    const { stdout, stderr } = await execFileAsync(process.execPath, [path.join(ROOT, 'tools/i18n-audit.mjs')], {
      cwd: ROOT,
      maxBuffer: 20 * 1024 * 1024
    });
    return { exitCode: 0, stdout, stderr };
  } catch (error) {
    return {
      exitCode: typeof error.code === 'number' ? error.code : 1,
      stdout: error.stdout || '',
      stderr: error.stderr || String(error.message || error)
    };
  }
}

function parseAuditTable(output) {
  const table = [];
  for (const line of String(output).split(/\r?\n/)) {
    const match = /^(\S+)\s+messages\s+(\d+)% \((\d+)\/(\d+)\)\s+entities\s+(\d+)% \((\d+)\/(\d+)\)\s+html\s+(\d+)%\s+patterns\s+(\d+)\/(\d+)/.exec(line.trim());
    if (!match) continue;
    table.push({
      code: match[1],
      messagesPercent: Number(match[2]),
      messagesTranslated: Number(match[3]),
      messagesTotal: Number(match[4]),
      entitiesPercent: Number(match[5]),
      entitiesTranslated: Number(match[6]),
      entitiesTotal: Number(match[7]),
      htmlPercent: Number(match[8]),
      patternsTranslated: Number(match[9]),
      patternsTotal: Number(match[10]),
      raw: line.trim()
    });
  }
  return table;
}

// ---------------------------------------------------------------------------
// Markdown report
// ---------------------------------------------------------------------------
const mdCell = value =>
  String(value ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/\|/g, '\\|')
    .replace(/\r?\n/g, ' ')
    .replace(/`/g, "'")
    .trim();
const mdCode = value => '`' + String(value ?? '').replace(/`/g, "'").replace(/\r?\n/g, ' ') + '`';
const mdLink = (label, href) => `[${mdCell(label)}](${href})`;

function buildMarkdown({ resultsDesktop, resultsMobile, picker, staticAudit, staticTable, baseline }) {
  const lines = [];
  const summaryByCode = new Map();
  for (const result of resultsDesktop) summaryByCode.set(result.code, summarizeLocale(result));

  const failing = [];
  for (const result of resultsDesktop) {
    const summary = summaryByCode.get(result.code);
    if (!summary) continue;
    if (!summary.applied || summary.stateErrors > 0 || summary.fatalError) failing.push(result.code);
    else if (result.code !== 'en' && (summary.untranslatedUnique > 0 || summary.htmlBlocks > 0)) failing.push(result.code);
    else if (result.code !== 'en' && summary.formatDefects > 0) failing.push(result.code);
    else if (summary.layoutTotal > 0 && result.code !== 'en') failing.push(result.code);
    else if (summary.consoleErrors > 0 || summary.pageErrors > 0) failing.push(result.code);
  }

  lines.push('# Browser i18n audit — recovered Eyes solar-system app');
  lines.push('');
  lines.push(`- Generated: ${GENERATED_AT}`);
  lines.push(`- Harness: ${mdCode('tools/i18n-browser-audit.mjs')}`);
  lines.push(`- Command: ${mdCode('node tools/i18n-browser-audit.mjs')}`);
  lines.push(`- Server: ${BASE}`);
  lines.push(`- Locales audited: ${CODES.map(code => mdCode(code)).join(', ')}`);
  lines.push(`- Desktop viewport: 1440×900; mobile viewport: 390×844 (${MOBILE.join(', ') || 'none'})`);
  lines.push(`- Machine-readable evidence: ${mdCode(path.relative(ROOT, REPORT_JSON).split(path.sep).join('/'))}`);
  lines.push('');
  lines.push('## Verdict');
  lines.push('');
  if (failing.length) {
    lines.push(`**Failing locales:** ${failing.map(code => mdCode(code)).join(', ')}.`);
  } else {
    lines.push('**No locale failed the browser checks.**');
  }
  lines.push('');
  lines.push(
    'Detection rules: a visible text node or `placeholder` / `aria-label` / `title` / `data-tippy-content` / `alt` value is reported when it is byte-identical (whitespace-normalised) to a key in `eyes/src/i18n/locales/en.js` for a non-English locale. Proper nouns and international designations, numbers/dates, keyboard keys, brand strings (`spacelibre`, `NASA`) and remote NASA content that is not in `en.js` are excluded. Layout findings are elements inside buttons, labels, panels, the top nav, settings cluster and language picker whose `scrollWidth`/`scrollHeight` exceeds the client box by more than 2 px; intentional scroll containers (`overflow: auto/scroll`) are skipped on the scrolling axis.'
  );
  lines.push('');
  lines.push('## 1. Catalogue parity / coverage — `node tools/i18n-audit.mjs`');
  lines.push('');
  if (staticTable.length) {
    lines.push('| Locale | messages | entities | html | patterns |');
    lines.push('| --- | --- | --- | --- | --- |');
    for (const row of staticTable) {
      lines.push(
        `| ${mdCode(row.code)} | ${row.messagesPercent}% (${row.messagesTranslated}/${row.messagesTotal}) | ${row.entitiesPercent}% (${row.entitiesTranslated}/${row.entitiesTotal}) | ${row.htmlPercent}% | ${row.patternsTranslated}/${row.patternsTotal} |`
      );
    }
  } else {
    lines.push('_The audit tool produced no parsable coverage table._');
  }
  lines.push('');
  lines.push(`Exit code: **${staticAudit.exitCode}**. Coverage is the static snapshot taken after the browser run; a locale below 100% still carries English catalogue values, so the untranslated findings for it are expected and quantify the gap.`);
  lines.push('');
  lines.push('<details><summary>Raw `node tools/i18n-audit.mjs` output</summary>');
  lines.push('');
  lines.push('```text');
  lines.push(String(staticAudit.stdout || '').trim());
  if (staticAudit.stderr && String(staticAudit.stderr).trim()) lines.push(String(staticAudit.stderr).trim());
  lines.push('```');
  lines.push('');
  lines.push('</details>');
  lines.push('');

  // Summary table.
  lines.push('## 2. Summary');
  lines.push('');
  lines.push('| Locale | Applied | Untranslated strings | HTML blocks | Clock format defect | Layout clipped | Layout overflow | Console errors | Page errors | Ignored asset/network | Screenshots |');
  lines.push('| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |');
  for (const result of resultsDesktop) {
    const summary = summaryByCode.get(result.code);
    lines.push(
      `| ${mdCode(result.code)} | ${summary.applied ? 'yes' : '**NO**'} | ${summary.untranslatedUnique} | ${summary.htmlBlocks} | ${summary.formatDefects} | ${summary.layoutClipped} | ${summary.layoutOverflow} | ${summary.consoleErrors} | ${summary.pageErrors} | ${summary.ignoredNetwork} | ${result.screenshots.length} |`
    );
  }
  for (const result of resultsMobile) {
    const summary = summarizeLocale(result);
    lines.push(
      `| ${mdCode(result.code)} (mobile) | ${summary.applied ? 'yes' : '**NO**'} | ${summary.untranslatedUnique} | ${summary.htmlBlocks} | ${summary.formatDefects} | ${summary.layoutClipped} | ${summary.layoutOverflow} | ${summary.consoleErrors} | ${summary.pageErrors} | ${summary.ignoredNetwork} | ${result.screenshots.length} |`
    );
  }
  lines.push('');

  // Locale activation + trigger.
  lines.push('## 3. Locale activation and language-picker trigger');
  lines.push('');
  lines.push('| Locale | `<html lang>` | `data-locale` | `window.spacelibreI18n.locale` | Trigger in settings cluster | Trigger visible |');
  lines.push('| --- | --- | --- | --- | --- | --- |');
  for (const result of resultsDesktop) {
    const home = result.states.home || {};
    const trigger = home.languageTrigger || {};
    lines.push(
      `| ${mdCode(result.code)} | ${mdCode(home.htmlLang ?? '—')} | ${mdCode(home.datasetLocale ?? '—')} | ${mdCode((result.meta && result.meta.i18nLocale) ?? '—')} | ${trigger.present ? (trigger.firstChild ? 'yes (first child)' : 'yes') : '**MISSING**'} | ${trigger.visible ? 'yes' : 'no'} |`
    );
  }
  lines.push('');
  lines.push('### Language picker interaction test');
  lines.push('');
  if (!picker) {
    lines.push('_Skipped with `--skip-picker`._');
  } else {
    lines.push(`- Trigger found exactly once in ${mdCode('.settings .container .content')}: **${picker.steps.triggerCount === 1 ? 'pass' : 'FAIL'}**`);
    lines.push(`- Trigger is first child of the settings cluster content: **${picker.steps.triggerInSettingsCluster ? 'pass' : 'FAIL'}**`);
    lines.push(`- Panel opens: **${picker.steps.panelOpens ? 'pass' : 'FAIL'}** (title: ${mdCode(picker.steps.panelTitle ?? '—')})`);
    lines.push(`- Lists all ${ALL_CODES.length} languages: **${picker.steps.allTenListed ? 'pass' : 'FAIL'}** (${picker.steps.optionCount} options)`);
    lines.push(`- Each expected language name present: **${picker.steps.allExpectedNames ? 'pass' : 'FAIL'}**`);
    lines.push(`- Selecting 日本語 reloads with ${mdCode('?lang=ja')} and applies locale: **${picker.switch.passed ? 'pass' : 'FAIL'}**`);
    if (picker.switch.url) {
      lines.push(
        `  - URL after switch: ${mdCode(picker.switch.url)}; \`<html lang>\`=${mdCode(picker.switch.htmlLang ?? '—')}; data-locale=${mdCode(picker.switch.datasetLocale ?? '—')}; trigger=${mdCode(picker.switch.triggerText ?? '—')}; title=${mdCode(picker.switch.title ?? '—')}`
      );
    }
    if (picker.errors.length) {
      lines.push('');
      lines.push('Errors:');
      for (const error of picker.errors) lines.push(`- ${mdCell(error)}`);
    }
    lines.push('');
    lines.push('| # | Option text (native / English) |');
    lines.push('| --- | --- |');
    picker.options.forEach((option, index) => {
      lines.push(`| ${index + 1} | ${mdCell(option.text)} |`);
    });
    lines.push('');
    lines.push(`Overall picker result: **${picker.passed ? 'pass' : 'FAIL'}**.`);
  }
  lines.push('');

  // Untranslated UI.
  lines.push('## 4. Untranslated UI (top offenders per locale)');
  lines.push('');
  lines.push('The English catalogue has ' + messageKeys.size + ' unique message keys. The tables below show the highest-priority still-English strings per non-English locale. English is the source control and is not flagged.');
  lines.push('');
  for (const result of resultsDesktop) {
    const code = result.code;
    if (code === 'en') {
      lines.push(`### ${mdCode(code)} — English control`);
      lines.push('');
      lines.push('Source language; no untranslated detection is expected or reported.');
      lines.push('');
      continue;
    }
    const sorted = sortUntranslated(result.untranslated).slice(0, 12);
    const titleFindings = result.titleFindings;
    lines.push(`### ${mdCode(code)} — ${result.untranslated.length} unique untranslated string(s)`);
    lines.push('');
    if (titleFindings.length) {
      lines.push(`- Document title still English: ${mdCode(titleFindings[0].text)} (${mdLink('screenshot', titleFindings[0].screenshot)})`);
      lines.push('');
    }
    if (!sorted.length) {
      lines.push('_No untranslated visible strings detected in the exercised states._');
      lines.push('');
      continue;
    }
    lines.push('| # | Text | Kind | State | DOM path | Screenshot |');
    lines.push('| --- | --- | --- | --- | --- | --- |');
    sorted.forEach((entry, index) => {
      lines.push(
        `| ${index + 1} | ${mdCell(entry.text)} | ${entry.kind}${entry.attr ? ` (${entry.attr})` : ''} | ${entry.state} | ${mdCode(entry.path)} | ${mdLink('view', entry.screenshot)} |`
      );
    });
    const remaining = result.untranslated.length - sorted.length;
    if (remaining > 0) {
      lines.push('');
      lines.push(`_${remaining} more unique untranslated string(s) are in the JSON report._`);
    }
    lines.push('');
  }

  // HTML blocks.
  lines.push('## 5. Onboarding HTML blocks still English');
  lines.push('');
  lines.push('The info panel ships local HTML blocks translated as whole blocks (`data-i18n-html`). Byte-identical block content is reported here even though individual words are not catalogue keys.');
  lines.push('');
  const htmlLocales = resultsDesktop.filter(result => result.code !== 'en' && result.htmlBlocks.length);
  if (!htmlLocales.length) {
    lines.push('_No untranslated HTML blocks detected._');
    lines.push('');
  } else {
    lines.push('| Locale | Block key | State | DOM path | Screenshot |');
    lines.push('| --- | --- | --- | --- | --- |');
    for (const result of htmlLocales) {
      for (const entry of result.htmlBlocks) {
        lines.push(`| ${mdCode(result.code)} | ${mdCode(entry.key)} | ${entry.state} | ${mdCode(entry.path)} | ${mdLink('view', entry.screenshot)} |`);
      }
    }
    lines.push('');
  }

  // Layout.
  lines.push('## 6. Layout overflow / clipping');
  lines.push('');
  lines.push('Only elements inside buttons, labels, panels, the top nav, settings cluster and language picker are sampled. `overflow: auto/scroll` containers are skipped on their scrolling axis. **Clipped** means an ancestor/element uses `overflow: hidden/clip`; **overflow-visible** means the content spills; **ellipsis-clipped** means CSS `text-overflow: ellipsis` is active.');
  lines.push('');
  const layoutLocales = resultsDesktop.filter(result => result.layout.length);
  if (!layoutLocales.length) {
    lines.push('_No layout overflow or clipping detected in the sampled controls._');
    lines.push('');
  } else {
    for (const result of layoutLocales) {
      const layoutSorted = [...result.layout].sort((left, right) => {
        const leftScore = (left.classification === 'clipped' ? 0 : left.classification === 'ellipsis-clipped' ? 1 : 2) * 100000 + left.deltaWidth + left.deltaHeight;
        const rightScore = (right.classification === 'clipped' ? 0 : right.classification === 'ellipsis-clipped' ? 1 : 2) * 100000 + right.deltaWidth + right.deltaHeight;
        return rightScore - leftScore;
      });
      const shown = layoutSorted.slice(0, 12);
      lines.push(`### ${mdCode(result.code)} — ${result.layout.length} layout finding(s)`);
      lines.push('');
      lines.push('| # | State | Viewport | Selector | Text | Overflow | Axis | Classification | Δw / Δh | Screenshot |');
      lines.push('| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |');
      shown.forEach((entry, index) => {
        lines.push(
          `| ${index + 1} | ${entry.state} | ${entry.viewport} | ${mdCode(entry.path)} | ${mdCell(entry.text)} | ${entry.overflowX}/${entry.overflowY} | ${entry.axis} | ${entry.classification} | ${entry.deltaWidth} / ${entry.deltaHeight} | ${mdLink('view', entry.screenshot)} |`
        );
      });
      if (result.layout.length > shown.length) lines.push('');
      if (result.layout.length > shown.length) lines.push(`_${result.layout.length - shown.length} more layout finding(s) are in the JSON report._`);
      lines.push('');
    }
  }

  // Clock meridiem formatting defect.
  lines.push('## 6b. Clock meridiem format defect');
  lines.push('');
  lines.push('Every non-English catalogue sets `dateFormats.*.meridiem` to `""` so the AM/PM chip disappears. The recovered Clock renders that format with moment, where `format(\'\')` returns the full ISO timestamp. The ISO string is painted into `.time-controls .meridiem` and overlaps the time-slider label. This is a display defect separate from catalogue coverage; the English baseline renders `PM` correctly.');
  lines.push('');
  const formatLocales = resultsDesktop.filter(result => result.formatDefects.length);
  if (!formatLocales.length) {
    lines.push('_No clock formatting defects detected._');
    lines.push('');
  } else {
    lines.push('| Locale | State | Selector | Rendered text | Screenshot |');
    lines.push('| --- | --- | --- | --- | --- |');
    for (const result of formatLocales) {
      for (const entry of result.formatDefects.slice(0, 3)) {
        lines.push(`| ${mdCode(result.code)} | ${entry.state} | ${mdCode(entry.selector)} | ${mdCell(entry.rendered)} | ${mdLink('view', entry.screenshot)} |`);
      }
    }
    lines.push('');
  }

  // Console errors.
  lines.push('## 7. Console and page errors');
  lines.push('');
  const errorLocales = resultsDesktop.filter(
    result => result.network && (result.network.consoleErrors.length || result.network.pageErrors.length || result.network.otherNetworkErrors.length)
  );
  if (!errorLocales.length) {
    lines.push('_No console errors or page errors detected._');
    lines.push('');
  } else {
    for (const result of errorLocales) {
      lines.push(`### ${mdCode(result.code)}`);
      lines.push('');
      for (const entry of result.network.consoleErrors) lines.push(`- **console error** (${entry.state}): ${mdCell(entry.text)}${entry.url ? ` — ${mdCell(entry.url)}` : ''}`);
      for (const entry of result.network.pageErrors) lines.push(`- **page error** (${entry.state}): ${mdCell(entry.text)}`);
      for (const entry of result.network.otherNetworkErrors) lines.push(`- **network** (${entry.state}): ${mdCell(entry.url)} ${entry.status || entry.error || ''}`);
      lines.push('');
    }
  }
  lines.push('### Known harmless asset / third-party failures (ignored, listed)');
  lines.push('');
  lines.push('| Locale | Classification | Count | Example |');
  lines.push('| --- | --- | --- | --- |');
  let anyIgnored = false;
  for (const result of resultsDesktop) {
    if (!result.network) continue;
    const grouped = new Map();
    for (const entry of result.network.ignoredNetwork) {
      const key = `${entry.classification}`;
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key).push(entry);
    }
    for (const [classification, entries] of grouped) {
      anyIgnored = true;
      const example = entries[0].url.replace(/^https?:\/\//, '').slice(0, 110);
      lines.push(`| ${mdCode(result.code)} | ${classification} | ${entries.length} | ${mdCode(example)} |`);
    }
  }
  if (!anyIgnored) lines.push('| — | — | 0 | — |');
  lines.push('');
  lines.push('These are remote NASA runtime assets (tiled surface maps, dynamic ephemeris `.dyn` files) and third-party YouTube telemetry/log requests. They are expected 404/aborted responses in a browser environment and are not UI defects; the complete list is in the JSON report.');
  lines.push('');

  // Screenshots.
  lines.push('## 8. Screenshots');
  lines.push('');
  lines.push('Desktop screenshots are 1440×900; mobile screenshots are 390×844. Required evidence: home, earth, info, story per locale plus mobile home for ' + (MOBILE.join(', ') || 'none') + '.');
  lines.push('');
  lines.push('| Locale | Home | Earth | Info | Story | Settings | Menu | Layers | Distance | Mobile home |');
  lines.push('| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |');
  const screenshotLookup = result => {
    const map = {};
    for (const shot of result.screenshots) {
      map[shot.state] = shot.file;
    }
    return map;
  };
  const mobileByCode = new Map(resultsMobile.map(result => [result.code, screenshotLookup(result)]));
  for (const result of resultsDesktop) {
    const map = screenshotLookup(result);
    const mobile = mobileByCode.get(result.code) || {};
    lines.push(
      `| ${mdCode(result.code)} | ${map.home ? mdLink('home', map.home) : '—'} | ${map.earth ? mdLink('earth', map.earth) : '—'} | ${map.info ? mdLink('info', map.info) : '—'} | ${map.story ? mdLink('story', map.story) : '—'} | ${map.settings ? mdLink('settings', map.settings) : '—'} | ${map.menu ? mdLink('menu', map.menu) : '—'} | ${map.layers ? mdLink('layers', map.layers) : '—'} | ${map.distance ? mdLink('distance', map.distance) : '—'} | ${mobile['home-mobile'] ? mdLink('mobile', mobile['home-mobile']) : '—'} |`
    );
  }
  lines.push('');

  // Representative images.
  const representative = [];
  for (const code of ['en', 'zh-CN', 'de', 'ru']) {
    const result = resultsDesktop.find(entry => entry.code === code);
    if (!result) continue;
    const map = screenshotLookup(result);
    if (map.home) representative.push({ code, file: map.home });
    const mobile = mobileByCode.get(code);
    if (mobile && mobile['home-mobile']) representative.push({ code: `${code} (mobile)`, file: mobile['home-mobile'] });
  }
  if (representative.length) {
    lines.push('### Representative frames');
    lines.push('');
    for (const entry of representative) lines.push(`![${mdCell(entry.code)} home](${entry.file})`);
    lines.push('');
  }

  lines.push('## 9. Method, exclusions and limitations');
  lines.push('');
  lines.push('- Headless Chromium via Playwright; each locale gets a fresh browser context (fresh `localStorage`), loads `?lang=<code>`, waits 12 s for the scene to settle, then exercises home → info → settings (collapse/expand) → menu → layers → `#/earth` → `#/story/voyager_grand_tour` → `#/earth/distance`, sampling the DOM after each state.');
  lines.push('- Untranslated matching is exact after whitespace normalisation against the 395 `messages` keys of `en.js` (the keys are the rendered English text). Excluded: entity names/aliases from `en.js` (proper nouns), international designations and keyboard keys (for example `3I/ATLAS`, `L1`, `SHIFT`, `W/A/S/D`), numeric/date-only strings, and the brand strings `spacelibre` / `NASA`. Remote NASA descriptions that are not in `en.js` are therefore not reported.');
  lines.push('- The language picker itself carries `data-i18n-ignore` and is excluded from untranslated detection by design (language names stay in their own language).');
  lines.push('- Layout detection samples buttons, labels, panels, the top nav, settings cluster and language picker; it reports `scrollWidth > clientWidth + 2` / `scrollHeight > clientHeight + 2` and skips the scrolling axis of `overflow: auto/scroll` containers. Findings marked as also present in the English baseline are general layout issues, not translation regressions.');
  lines.push('- Console error capture includes `console.error`, uncaught page errors and non-2xx/3xx responses. Remote `eyes.nasa.gov/assets/*` and YouTube requests are listed separately as known harmless network failures.');
  lines.push('- Translators were still applying catalogues while this harness was built; the coverage snapshot in section 1 states exactly which locales were complete when the run finished. A partial translation is reported as untranslated UI, not as a harness failure.');
  lines.push('- The dev server watches `eyes/src`, so a rebuild triggered by a concurrent locale write can land mid-run; runs retry page loads and report any state error explicitly.');
  lines.push('');
  lines.push(`Layout findings also present in the English baseline: ${baseline ? baseline.size : 0} selector path(s).`);
  lines.push('');
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  await ensureServer();
  await mkdir(OUT_DIR, { recursive: true });
  console.log(`[setup] base=${BASE} locales=${CODES.join(',')} mobile=${MOBILE.join(',') || 'none'}`);

  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-dev-shm-usage', '--no-first-run']
  });

  const shared = { baselineTitle: null, baselineLayoutPaths: null };
  const resultsDesktop = [];
  const resultsMobile = [];
  const CONCURRENCY = Math.max(1, Number(opt('concurrency', '3')) || 3);

  const runPool = async (items, limit, worker) => {
    const queue = [...items.keys()];
    const results = new Array(items.length);
    const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (queue.length) {
        const index = queue.shift();
        if (index === undefined) return;
        results[index] = await worker(items[index], index);
      }
    });
    await Promise.all(workers);
    return results;
  };

  let picker = null;
  try {
    // English first so its title and layout paths are available as a baseline.
    const ordered = [...CODES].sort((left, right) => {
      if (left === 'en') return -1;
      if (right === 'en') return 1;
      return ALL_CODES.indexOf(left) - ALL_CODES.indexOf(right);
    });
    const logDesktopResult = result => {
      const summary = summarizeLocale(result);
      console.log(
        `[desktop ${result.code}] applied=${summary.applied ? 'yes' : 'NO'} untranslated=${summary.untranslatedUnique} html=${summary.htmlBlocks} clock=${summary.formatDefects} layout=${summary.layoutClipped}c/${summary.layoutOverflow}o console=${summary.consoleErrors} page=${summary.pageErrors} ignored=${summary.ignoredNetwork} states=${Object.keys(result.states).length} errors=${summary.stateErrors} ${Math.round(result.durationMs / 1000)}s`
      );
      if (result.fatalError) console.log(`  fatal: ${result.fatalError}`);
      for (const stateError of result.stateErrors) console.log(`  state error [${result.code}/${stateError.state}]: ${stateError.error.split('\n')[0]}`);
    };

    const english = await auditLocaleDesktop(browser, ordered[0], shared);
    resultsDesktop.push(english);
    logDesktopResult(english);
    const rest = ordered.slice(1);
    const restResults = await runPool(rest, CONCURRENCY, async code => {
      const result = await auditLocaleDesktop(browser, code, shared);
      logDesktopResult(result);
      return result;
    });
    resultsDesktop.push(...restResults);

    const mobileResults = await runPool(MOBILE, Math.min(2, CONCURRENCY), async code => {
      const result = await auditLocaleMobile(browser, code);
      const summary = summarizeLocale(result);
      console.log(`[mobile ${code}] applied=${summary.applied ? 'yes' : 'NO'} untranslated=${summary.untranslatedUnique} layout=${summary.layoutTotal} console=${summary.consoleErrors} ${Math.round(result.durationMs / 1000)}s`);
      return result;
    });
    resultsMobile.push(...mobileResults);

    if (!SKIP_PICKER) {
      process.stdout.write('[picker] ');
      picker = await auditLanguagePicker(browser);
      console.log(`passed=${picker.passed ? 'yes' : 'NO'} options=${picker.steps.optionCount} switch=${picker.switch.passed ? 'yes' : 'NO'} ${Math.round(picker.durationMs / 1000)}s`);
      for (const error of picker.errors) console.log(`  picker error: ${error}`);
    }
  } finally {
    await browser.close().catch(() => {});
  }

  const staticAudit = await runStaticAudit();
  const staticTable = parseAuditTable(staticAudit.stdout);

  const report = {
    generatedAt: GENERATED_AT,
    baseUrl: BASE,
    harness: 'tools/i18n-browser-audit.mjs',
    command: 'node tools/i18n-browser-audit.mjs',
    playwrightImport: 'file:///C:/Users/stone/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright/index.mjs',
    viewports: { desktop: DESKTOP_VIEWPORT, mobile: MOBILE_VIEWPORT },
    locales: CODES,
    mobileLocales: MOBILE,
    englishCatalogue: {
      messages: messageKeys.size,
      entities: Object.keys(en.entities || {}).length,
      htmlBlocks: Object.keys(en.html || {}).length
    },
    baseline: {
      title: shared.baselineTitle,
      layoutPaths: shared.baselineLayoutPaths ? [...shared.baselineLayoutPaths] : []
    },
    staticAudit: {
      command: 'node tools/i18n-audit.mjs',
      exitCode: staticAudit.exitCode,
      stdout: staticAudit.stdout,
      stderr: staticAudit.stderr,
      table: staticTable
    },
    desktop: resultsDesktop,
    mobile: resultsMobile,
    picker,
    summary: {
      locales: Object.fromEntries(resultsDesktop.map(result => [result.code, summarizeLocale(result)])),
      mobile: Object.fromEntries(resultsMobile.map(result => [result.code, summarizeLocale(result)])),
      pickerPassed: picker ? picker.passed : null
    }
  };

  await writeFile(REPORT_JSON, JSON.stringify(report, null, 2), 'utf8');
  const markdown = buildMarkdown({
    resultsDesktop,
    resultsMobile,
    picker,
    staticAudit,
    staticTable,
    baseline: shared.baselineLayoutPaths
  });
  await writeFile(REPORT_MD, markdown, 'utf8');

  const screenshotCount = resultsDesktop.reduce((total, result) => total + result.screenshots.length, 0) + resultsMobile.reduce((total, result) => total + result.screenshots.length, 0);
  console.log('');
  console.log('=== i18n browser audit summary ===');
  for (const result of [...resultsDesktop, ...resultsMobile]) {
    const summary = summarizeLocale(result);
    console.log(
      `${result.code.padEnd(6)} ${result.viewport.padEnd(16)} applied=${summary.applied ? 'yes' : 'NO '} untranslated=${String(summary.untranslatedUnique).padStart(3)} html=${summary.htmlBlocks} clipped=${summary.layoutClipped} overflow=${summary.layoutOverflow} console=${summary.consoleErrors} page=${summary.pageErrors} ignored=${summary.ignoredNetwork}`
    );
  }
  if (picker) console.log(`picker  ${picker.passed ? 'PASS' : 'FAIL'} (10 options=${picker.steps.optionCount}, en->ja=${picker.switch.passed ? 'PASS' : 'FAIL'})`);
  console.log(`static audit: exit=${staticAudit.exitCode} (coverage table embedded in report)`);
  console.log(`report: ${path.relative(ROOT, REPORT_MD)}`);
  console.log(`json:   ${path.relative(ROOT, REPORT_JSON)}`);
  console.log(`screenshots: ${screenshotCount} files in ${path.relative(ROOT, OUT_DIR)}`);

  const strict = opt('strict') === 'true';
  if (strict) {
    const problems = [];
    for (const result of resultsDesktop) {
      const summary = summarizeLocale(result);
      if (!summary.applied) problems.push(`${result.code}: locale not applied`);
      if (result.code !== 'en' && (summary.untranslatedUnique || summary.htmlBlocks)) problems.push(`${result.code}: untranslated UI`);
      if (summary.layoutClipped) problems.push(`${result.code}: clipped layout`);
      if (summary.consoleErrors || summary.pageErrors) problems.push(`${result.code}: console errors`);
    }
    if (picker && !picker.passed) problems.push('language picker failed');
    if (problems.length) {
      console.error(`\nstrict: ${problems.length} problem(s)`);
      process.exitCode = 1;
    }
  }
}

main().catch(error => {
  console.error(`i18n browser audit failed: ${error && error.stack ? error.stack : error}`);
  process.exit(1);
});
