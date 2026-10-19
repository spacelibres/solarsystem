// Boots the locale layer before the recovered application graph is evaluated.
//
// Integration points are intentionally narrow: AppUtils' HTML helpers, the title
// and time managers, number/date formatting, the entity catalog used by search,
// and one MutationObserver. NASA component modules keep their original source.

import * as Eyes from '../framework/eyes/index.js';
import FollowName from '../vendor/modules/FollowName.cjs';
import MomentSecondary from '../vendor/modules/MomentSecondary.cjs';
import EntityCatalog from '../data/EntityCatalog.json';
import { ENGLISH, LOCALES, detectLocale, getLocale } from './index.js';
import {
  configure,
  currentMessages,
  isEnabled,
  localizeAttributes,
  localizeDocument,
  localizeElement,
  translateLocaleMetadata,
  translateText,
  translateTitle
} from './core.js';
import { mountLanguageSwitcher } from './switcher.js';

const STORAGE_KEY = 'spacelibre.locale';
const OBSERVED_ATTRIBUTES = ['placeholder', 'aria-label', 'title', 'data-tippy-content', 'alt', 'data-i18n-html'];

const localeCode = detectLocale(STORAGE_KEY);
const locale = getLocale(localeCode) || ENGLISH;
configure(locale, ENGLISH);

function applyMomentLocale() {
  if (!isEnabled()) return;
  const momentCode = locale.moment;
  if (!momentCode) return;
  for (const moment of [FollowName, MomentSecondary]) {
    try { moment.locale(momentCode); } catch { /* keep the source locale if a pack is missing */ }
  }
}

function appendLocalizedSearchKeywords() {
  if (!isEnabled()) return;
  for (const [entityId, localizedName] of Object.entries(locale.entities || {})) {
    const entity = EntityCatalog[entityId];
    if (!entity || !localizedName) continue;
    const keywords = Array.isArray(entity.keywords) ? entity.keywords : [];
    if (!keywords.includes(localizedName)) keywords.push(localizedName);
    entity.keywords = keywords;
  }
}

function localizeHtmlResult(result) {
  if (!isEnabled() || !result) return result;
  const elements = Array.isArray(result) ? result : [result];
  for (const element of elements) {
    if (element && typeof element === 'object' && element.nodeType === Node.ELEMENT_NODE) localizeElement(element);
  }
  return result;
}

function patchHtmlHelpers() {
  const helpers = Eyes.AppUtils;
  for (const name of ['htmlToElement', 'htmlToElements', 'htmlWithParamsToElement']) {
    const original = helpers[name];
    if (typeof original !== 'function') continue;
    helpers[name] = function patchedHtmlHelper(...args) {
      return localizeHtmlResult(original.apply(this, args));
    };
  }
}

function patchDocumentTitle() {
  const TitleManager = Eyes.TitleManager;
  if (!TitleManager) return;
  const original = TitleManager.prototype.updateTitle;
  TitleManager.prototype.updateTitle = function patchedUpdateTitle(routeInfo) {
    original.call(this, routeInfo);
    if (!isEnabled()) return;
    this._fullTitle = translateTitle(this._fullTitle);
    document.title = this._fullTitle;
  };
}

function patchTimeFormats() {
  const TimeManager = Eyes.TimeManager;
  const formats = locale.dateFormats;
  if (!TimeManager || !formats) return;
  const original = TimeManager.prototype.getDateFormat;
  TimeManager.prototype.getDateFormat = function patchedGetDateFormat(formatName, formatGroup) {
    const group = formatGroup || (this.isUTC?.() ? 'utc' : 'local');
    const localizedFormat = formats[group]?.[formatName];
    // `moment.format('')` falls back to ISO output; an empty literal keeps the
    // meridiem slot empty for 24-hour locales.
    if (localizedFormat === '') return '[]';
    return localizedFormat === undefined ? original.call(this, formatName, formatGroup) : localizedFormat;
  };
}

function patchLocaleFormatting() {
  if (!isEnabled()) return;
  const intl = locale.intl;
  const numberToLocaleString = Number.prototype.toLocaleString;
  Number.prototype.toLocaleString = function patchedNumberToLocale(selectedLocales, options) {
    return numberToLocaleString.call(this, selectedLocales === undefined ? intl : selectedLocales, options);
  };
  const dateToLocaleString = Date.prototype.toLocaleString;
  Date.prototype.toLocaleString = function patchedDateToLocale(selectedLocales, options) {
    return dateToLocaleString.call(this, selectedLocales === undefined ? intl : selectedLocales, options);
  };
  const dateToLocaleDateString = Date.prototype.toLocaleDateString;
  Date.prototype.toLocaleDateString = function patchedDateOnlyToLocale(selectedLocales, options) {
    return dateToLocaleDateString.call(this, selectedLocales === undefined ? intl : selectedLocales, options);
  };
}

function patchClockLimitMessage() {
  const Clock = Eyes.Clock;
  if (!Clock) return;
  const original = Clock.prototype.setLimitMessage;
  Clock.prototype.setLimitMessage = function patchedSetLimitMessage(limitDirection, customMessage) {
    original.call(this, limitDirection, customMessage === undefined || customMessage === null ? customMessage : translateText(customMessage) ?? customMessage);
    if (!isEnabled()) return;
    // The message reaches CSS through a quoted custom property; translate the
    // inner sentence there because the observer does not watch style mutations.
    const container = this._children?.displayContainer;
    const property = container?.style?.getPropertyValue('--limit-message');
    const quoted = property && /^"([\s\S]*)"$/.exec(property);
    if (!quoted) return;
    const translated = translateText(quoted[1]);
    if (translated !== null) container.style.setProperty('--limit-message', `"${translated}"`);
  };
}

function translateDocumentTitle() {
  if (!isEnabled()) return;
  document.title = translateTitle(document.title);
}

function installObserver() {
  if (!isEnabled()) return;
  const observer = new MutationObserver(records => {
    for (const record of records) {
      if (record.type === 'characterData') localizeElement(record.target);
      else if (record.type === 'attributes') localizeAttributes(record.target);
      else {
        for (const node of record.addedNodes) {
          if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE) localizeElement(node);
          else if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            for (const child of node.childNodes) localizeElement(child);
          }
        }
      }
    }
  });
  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: OBSERVED_ATTRIBUTES
  });
}

function changeLocale(nextCode) {
  if (nextCode === locale.code) return;
  try { window.localStorage.setItem(STORAGE_KEY, nextCode); } catch { /* storage is optional */ }
  const url = new URL(window.location.href);
  url.searchParams.set('lang', nextCode);
  window.location.assign(url.toString());
}

function exposeDebugApi() {
  window.spacelibreI18n = {
    get locale() { return locale.code; },
    get enabled() { return isEnabled(); },
    supported: LOCALES.map(entry => ({ code: entry.code, name: entry.name, englishName: entry.englishName })),
    setLocale: changeLocale,
    translate: translateText,
    messages: currentMessages
  };
}

applyMomentLocale();
appendLocalizedSearchKeywords();
patchHtmlHelpers();
patchDocumentTitle();
patchTimeFormats();
patchClockLimitMessage();
patchLocaleFormatting();
translateLocaleMetadata(locale);
translateDocumentTitle();
document.documentElement.dataset.locale = locale.code;
localizeDocument(document.body);
installObserver();

mountLanguageSwitcher({
  locales: LOCALES,
  activeLocale: locale,
  onSelect: changeLocale
});

exposeDebugApi();
