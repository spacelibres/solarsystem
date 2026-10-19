// Runtime text translation for the recovered Eyes interface.
//
// The catalogue keys are the English text emitted by templates, components and
// local catalogs. Translation therefore happens at the DOM boundary instead of
// changing executable modules: components keep writing English, this layer maps
// it to the active locale before the user sees it. Dynamic text (counts, entity
// names, measurements) uses the catalogue's patterns and unit map.

const ATTRIBUTE_NAMES = ['placeholder', 'aria-label', 'title', 'data-tippy-content', 'alt'];
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'CODE', 'PRE', 'TEXTAREA', 'CANVAS']);
const SKIP_ATTRIBUTE = 'data-i18n-ignore';
const HTML_ATTRIBUTE = 'data-i18n-html';
const APPLIED_ATTRIBUTE = 'data-i18n-applied';

let localeModule = null;
let englishModule = null;
let dictionary = null;
let enabled = false;

const textPatternCache = new Map();

function compilePattern(pattern) {
  if (!textPatternCache.has(pattern.re)) textPatternCache.set(pattern.re, new RegExp(pattern.re));
  return textPatternCache.get(pattern.re);
}

function addMessages(target, source) {
  if (!source) return;
  for (const [key, value] of Object.entries(source)) {
    if (typeof value === 'string' && value) target[key] = value;
  }
}

function buildDictionary(locale, english) {
  const messages = {};
  addMessages(messages, locale.messages);

  // Entity, category, subcategory and unit names also participate in normal
  // text replacement: labels, titles and split sentences contain them verbatim.
  // Categories are applied before entities so a translated entity name always
  // wins over a category with the same English spelling (for example "Moon").
  const categoryMessages = {};
  const subcategoryMessages = {};
  for (const [name, translated] of Object.entries(locale.categories || {})) {
    if (typeof translated === 'string' && translated && translated !== name) {
      messages[name] = translated;
      categoryMessages[name] = translated;
    }
  }
  for (const [name, translated] of Object.entries(locale.subcategories || {})) {
    if (typeof translated === 'string' && translated && translated !== name) {
      messages[name] = translated;
      subcategoryMessages[name] = translated;
    }
  }
  for (const [unit, translated] of Object.entries(locale.units || {})) {
    if (typeof translated === 'string' && translated && translated !== unit) messages[unit] = translated;
  }
  const entityNames = new Set();
  for (const [id, englishName] of Object.entries(english.entities || {})) {
    if (typeof englishName !== 'string' || !englishName) continue;
    const translated = locale.entities?.[id];
    const aliases = english.entityAliases?.[id]?.length ? english.entityAliases[id] : [englishName];
    for (const alias of aliases) {
      if (typeof alias !== 'string' || !alias) continue;
      entityNames.add(alias);
      if (typeof translated === 'string' && translated) messages[alias] = translated;
    }
  }

  const patterns = (locale.patterns || []).map(pattern => ({ ...pattern, regex: compilePattern(pattern) }));
  return { messages, patterns, units: locale.units || {}, entityNames, html: locale.html || {}, categoryMessages, subcategoryMessages };
}

export function configure(locale, english) {
  localeModule = locale;
  englishModule = english;
  enabled = Boolean(locale) && locale.code !== 'en';
  dictionary = enabled ? buildDictionary(locale, english) : null;
  textPatternCache.clear();
}

export function getLocaleModule() {
  return localeModule;
}

export function getEnglishModule() {
  return englishModule;
}

export function isEnabled() {
  return enabled;
}

/** Preserve surrounding whitespace so inline fragments keep their spacing. */
function splitWhitespace(text) {
  const match = /^(\s*)([\s\S]*?)(\s*)$/.exec(text);
  return match ? { prefix: match[1], core: match[2], suffix: match[3] } : { prefix: '', core: text, suffix: '' };
}

function translateCore(core, depth) {
  if (!core) return null;
  // Templates often keep source indentation inside a text node; collapse the
  // lookup form so "Show\n  More" still finds the catalogue entry.
  const lookup = core.replace(/\s+/g, ' ');
  const exact = dictionary.messages[core] ?? dictionary.messages[lookup];
  if (typeof exact === 'string' && exact !== core && exact !== lookup) return exact;

  // Generated captions wrap entity names ("the Moon", "celestial bodies.");
  // translate the stem and keep the wrapper so article-less languages can use
  // the localized name without leaking the English article.
  const article = /^(?:the|The) ([\s\S]+)$/.exec(lookup);
  if (article) {
    const translated = translateCore(article[1], depth + 1);
    if (translated !== null) return translated;
  }
  const trailingPunctuation = /^([\s\S]*?)([.!?,;:]+)$/.exec(lookup);
  if (trailingPunctuation && trailingPunctuation[1]) {
    const translated = translateCore(trailingPunctuation[1], depth + 1);
    if (translated !== null) return `${translated}${trailingPunctuation[2]}`;
  }

  // A few generated sentences embed the singular category ("Trail", "Label")
  // or a lowercase plural ("planets"); derive them from the catalogue's
  // capitalized/plural forms instead of duplicating every inflection as a key.
  if (!lookup.includes(' ') && /^[A-Za-z]+$/.test(lookup)) {
    const plural = dictionary.messages[`${lookup}s`];
    if (typeof plural === 'string' && plural !== `${lookup}s`) return plural;
    const capitalized = lookup[0].toUpperCase() + lookup.slice(1);
    const capital = dictionary.messages[capitalized];
    if (typeof capital === 'string' && capital !== capitalized) return capital;
  }

  for (const pattern of dictionary.patterns) {
    const match = pattern.regex.exec(lookup) || (lookup === core ? null : pattern.regex.exec(core));
    if (!match) continue;
    if (pattern.entityGroups) {
      const entityMatches = pattern.entityGroups.every(groupIndex => dictionary.entityNames.has(match[groupIndex]));
      if (!entityMatches) continue;
    }
    let result = pattern.to;
    result = result.replace(/\$(\d+)/g, (_, groupIndex) => {
      const group = match[Number(groupIndex)];
      if (group === undefined) return '';
      return translateCore(group, depth + 1) ?? group;
    });
    if (result !== core) return result;
  }

  const measurement = translateMeasurement(core) || translateMeasurement(lookup);
  if (measurement) return measurement;
  return null;
}

/** Numbers and units are formatted by the app, so only the unit vocabulary moves. */
function translateMeasurement(core) {
  const units = dictionary.units;
  const translateUnit = unit => units[unit] ?? unit;
  const number = '[\\d.,\\s\\u00a0\\u202f]+';
  let match = new RegExp(`^(~ )?(${number}) (thousand|million|billion) (km|mi|ft|m|AU|light years)$`).exec(core);
  if (match) return `${match[1] ?? ''}${match[2]} ${translateUnit(match[3])} ${translateUnit(match[4])}`;
  match = new RegExp(`^(~ )?(${number}) (thousand|million|billion)$`).exec(core);
  if (match) return `${match[1] ?? ''}${match[2]} ${translateUnit(match[3])}`;
  match = new RegExp(`^(~ )?(${number}) (km|mi|ft|m|AU|light years)$`).exec(core);
  if (match) return `${match[1] ?? ''}${match[2]} ${translateUnit(match[3])}`;
  match = new RegExp(`^(${number}) (km|mi)/(hr)$`).exec(core);
  if (match) return `${match[1]} ${translateUnit(match[2])}/${translateUnit(match[3])}`;
  match = new RegExp(`^(${number}) (hr|min|sec)(?: (${number}) (min|sec))?$`).exec(core);
  if (match) {
    let result = `${match[1]} ${translateUnit(match[2])}`;
    if (match[3] !== undefined) result += ` ${match[3]} ${translateUnit(match[4])}`;
    return result;
  }
  match = new RegExp(`^(${number}) (sec|ms) (${number}) (ms)$`).exec(core);
  if (match) return `${match[1]} ${translateUnit(match[2])} ${match[3]} ${translateUnit(match[4])}`;
  match = new RegExp(`^(${number}) (ms)$`).exec(core);
  if (match) return `${match[1]} ${translateUnit(match[2])}`;
  return null;
}

export function translateText(text, depth = 0) {
  if (!enabled || !dictionary || typeof text !== 'string' || depth > 4) return null;
  const { prefix, core, suffix } = splitWhitespace(text);
  if (!core) return null;
  const translated = translateCore(core, depth);
  return translated === null ? null : `${prefix}${translated}${suffix}`;
}

/** Document titles join a localized prefix, current title and brand. */
export function translateTitle(title) {
  if (!enabled || typeof title !== 'string' || !title) return title;
  const whole = translateText(title);
  if (whole !== null) return whole;

  // TitleManager joins "<prefix> - <current> - <suffix>"; the current title may
  // itself contain " - " (story slides) and needs one pattern pass as a whole
  // before falling back to per-segment translation.
  const firstSeparator = title.indexOf(' - ');
  const lastSeparator = title.lastIndexOf(' - ');
  if (firstSeparator !== -1 && lastSeparator > firstSeparator) {
    const prefix = title.slice(0, firstSeparator);
    const middle = title.slice(firstSeparator + 3, lastSeparator);
    const suffix = title.slice(lastSeparator + 3);
    const translatedMiddle = translateText(middle);
    if (translatedMiddle !== null) {
      return `${translateText(prefix) ?? prefix} - ${translatedMiddle} - ${translateText(suffix) ?? suffix}`;
    }
  }

  return title
    .split(' - ')
    .map(part => part.split(' · ').map(section => translateText(section) ?? section).join(' · '))
    .join(' - ');
}

export function translateHtml(htmlKey) {
  if (!enabled || !dictionary) return null;
  return dictionary.html[htmlKey] ?? null;
}

function refreshTippy(element, content) {
  const tippy = element._tippy;
  if (tippy && typeof tippy.setContent === 'function') {
    try { tippy.setContent(content); } catch { /* a detached tippy does not need refreshing */ }
  }
}

function translateStyleVariable(element, name) {
  if (!element.style) return;
  const raw = element.style.getPropertyValue(name);
  if (!raw) return;
  const quoted = /^"([\s\S]*)"$/.exec(raw);
  if (!quoted) return;
  const translated = translateText(quoted[1]);
  if (translated !== null) element.style.setProperty(name, `"${translated}"`);
}

export function localizeAttributes(element) {
  if (!enabled || !(element instanceof Element)) return;
  for (const name of ATTRIBUTE_NAMES) {
    const value = element.getAttribute(name);
    if (!value) continue;
    const translated = translateText(value);
    if (translated !== null && translated !== value) {
      element.setAttribute(name, translated);
      if (name === 'data-tippy-content') refreshTippy(element, translated);
    }
  }
  const ariaKey = element.getAttribute('data-i18n-aria-label');
  if (ariaKey) {
    const translated = translateText(ariaKey);
    if (translated) element.setAttribute('aria-label', translated);
  }
  // The clock writes its out-of-range sentence into a custom property consumed
  // by CSS `content`, which the text walker cannot see.
  translateStyleVariable(element, '--limit-message');
}

function localizeHtmlBlock(element) {
  const key = element.getAttribute(HTML_ATTRIBUTE);
  const translated = translateHtml(key);
  if (translated === null) return;
  element.innerHTML = translated;
  element.setAttribute(APPLIED_ATTRIBUTE, '');
}

function localizeCategorizedText(element) {
  const map = element.classList.contains('category')
    ? dictionary.categoryMessages
    : element.classList.contains('subcategory') ? dictionary.subcategoryMessages : null;
  if (!map) return;
  for (let child = element.firstChild; child; child = child.nextSibling) {
    if (child.nodeType !== Node.TEXT_NODE) continue;
    const { prefix, core, suffix } = splitWhitespace(child.nodeValue);
    const translated = map[core];
    if (typeof translated === 'string' && translated && translated !== core) child.nodeValue = `${prefix}${translated}${suffix}`;
  }
}

export function localizeElement(root) {
  if (!enabled || !root) return;
  if (root.nodeType === Node.TEXT_NODE) {
    const translated = translateText(root.nodeValue);
    if (translated !== null) root.nodeValue = translated;
    return;
  }
  if (!(root instanceof Element)) return;
  if (SKIP_TAGS.has(root.tagName) || root.hasAttribute(SKIP_ATTRIBUTE)) return;
  if (root.hasAttribute(HTML_ATTRIBUTE)) {
    localizeHtmlBlock(root);
    for (const child of root.children) localizeElement(child);
    return;
  }
  localizeAttributes(root);
  localizeCategorizedText(root);
  for (let child = root.firstChild; child; child = child.nextSibling) localizeElement(child);
}

export function localizeDocument(root = document.body) {
  if (!enabled || !root) return;
  if (root.nodeType === Node.TEXT_NODE) {
    const translated = translateText(root.nodeValue);
    if (translated !== null) root.nodeValue = translated;
    return;
  }
  if (!(root instanceof Element)) return;
  if (SKIP_TAGS.has(root.tagName)) return;
  localizeAttributes(root);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (SKIP_TAGS.has(node.tagName) || node.hasAttribute(SKIP_ATTRIBUTE)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  let node = walker.nextNode();
  while (node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const translated = translateText(node.nodeValue);
      if (translated !== null) node.nodeValue = translated;
    } else if (node instanceof Element && node.hasAttribute(HTML_ATTRIBUTE)) {
      localizeHtmlBlock(node);
    } else if (node instanceof Element) {
      localizeCategorizedText(node);
    }
    node = walker.nextNode();
  }
}

export function translateLocaleMetadata(locale) {
  if (!locale) return;
  document.documentElement.lang = locale.code;
  document.documentElement.dir = locale.dir || 'ltr';
  document.documentElement.dataset.dir = locale.dir || 'ltr';
  const description = locale.meta?.description;
  if (description) {
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]']) {
      const element = document.querySelector(selector);
      if (element) element.setAttribute('content', description);
    }
  }
  const css = document.documentElement.style;
  const previous = translateText('Previous');
  const next = translateText('Next');
  const reframing = translateText('Re-framing follow camera');
  if (previous) css.setProperty('--i18n-previous', `"${previous}"`);
  if (next) css.setProperty('--i18n-next', `"${next}"`);
  if (reframing) css.setProperty('--i18n-reframing', `"${reframing}"`);
}

export function currentMessages() {
  return dictionary?.messages ?? {};
}
