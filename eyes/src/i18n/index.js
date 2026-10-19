// Supported locale registry and locale negotiation.

import en from './locales/en.js';
import zhCN from './locales/zh-CN.js';
import zhTW from './locales/zh-TW.js';
import ja from './locales/ja.js';
import ko from './locales/ko.js';
import fr from './locales/fr.js';
import de from './locales/de.js';
import es from './locales/es.js';
import ptBR from './locales/pt-BR.js';
import ru from './locales/ru.js';

export const ENGLISH = en;
export const LOCALES = [en, zhCN, zhTW, ja, ko, fr, de, es, ptBR, ru];

const byCode = new Map(LOCALES.map(locale => [locale.code, locale]));
const byLowerCaseCode = new Map(LOCALES.map(locale => [locale.code.toLowerCase(), locale]));

// Language tags arrive from the URL, storage or the browser; map the common
// regional variants onto the catalogue we actually ship.
const ALIASES = new Map([
  ['zh', 'zh-CN'], ['zh-hans', 'zh-CN'], ['zh-hans-cn', 'zh-CN'], ['zh-sg', 'zh-CN'],
  ['zh-hant', 'zh-TW'], ['zh-hant-tw', 'zh-TW'], ['zh-hk', 'zh-TW'], ['zh-mo', 'zh-TW'],
  ['ja-jp', 'ja'], ['ko-kr', 'ko'], ['fr-fr', 'fr'], ['fr-ca', 'fr'], ['fr-be', 'fr'],
  ['de-de', 'de'], ['de-at', 'de'], ['de-ch', 'de'], ['es-es', 'es'], ['es-mx', 'es'], ['es-419', 'es'],
  ['pt', 'pt-BR'], ['pt-br', 'pt-BR'], ['pt-pt', 'pt-BR'], ['ru-ru', 'ru'], ['en-us', 'en'], ['en-gb', 'en']
]);

export function normalizeLocaleCode(value) {
  if (!value || typeof value !== 'string') return null;
  const trimmed = value.trim().replace(/_/g, '-').toLowerCase();
  if (!trimmed) return null;
  const exact = byCode.get(trimmed) || byLowerCaseCode.get(trimmed);
  if (exact) return exact.code;
  const alias = ALIASES.get(trimmed);
  if (alias) return alias;
  const base = trimmed.split('-')[0];
  const baseAlias = ALIASES.get(base);
  return baseAlias || null;
}

export function getLocale(code) {
  const normalized = normalizeLocaleCode(code);
  return normalized ? byCode.get(normalized) : null;
}

export function supportedLocaleCodes() {
  return LOCALES.map(locale => locale.code);
}

function localeFromQuery(search) {
  if (!search) return null;
  const params = new URLSearchParams(search);
  return normalizeLocaleCode(params.get('lang'));
}

/** URL (both real search and the hash query) wins, then storage, then browser. */
export function detectLocale(storageKey = 'spacelibre.locale') {
  const hash = window.location.hash || '';
  const hashQuery = hash.includes('?') ? hash.slice(hash.indexOf('?')) : '';
  const fromUrl = localeFromQuery(window.location.search) || localeFromQuery(hashQuery);
  if (fromUrl) return fromUrl;

  try {
    const stored = normalizeLocaleCode(window.localStorage.getItem(storageKey));
    if (stored) return stored;
  } catch { /* private browsing can reject storage; fall through to the browser */ }

  const languages = Array.isArray(navigator.languages) && navigator.languages.length ? navigator.languages : [navigator.language];
  for (const language of languages) {
    const normalized = normalizeLocaleCode(language);
    if (normalized) return normalized;
  }
  return 'en';
}
