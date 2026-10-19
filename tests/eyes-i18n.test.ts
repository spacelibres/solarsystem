import { describe, expect, it } from 'vitest';

import {
  ENGLISH,
  LOCALES,
  getLocale,
  normalizeLocaleCode,
  supportedLocaleCodes
} from '../eyes/src/i18n/index.js';
import { configure, translateTitle, translateText, translateHtml } from '../eyes/src/i18n/core.js';

type Catalogue = {
  code: string;
  name: string;
  englishName: string;
  intl: string;
  moment: string;
  dir?: 'ltr' | 'rtl';
  messages: Record<string, string>;
  patterns: { id: string; re: string; to: string; entityGroups?: number[]; measurement?: string }[];
  entities: Record<string, string>;
  entityAliases: Record<string, string[]>;
  categories: Record<string, string>;
  subcategories: Record<string, string>;
  units: Record<string, string>;
  html: Record<string, string>;
  meta: Record<string, string>;
  dateFormats: null | Record<string, Record<string, string | string[]>>;
};

const english = ENGLISH as Catalogue;
const locales = LOCALES as Catalogue[];

const sameKeys = (left: Record<string, unknown>, right: Record<string, unknown>) =>
  expect(Object.keys(right).sort()).toEqual(Object.keys(left).sort());

describe('locale catalogue', () => {
  it('ships the English source plus twenty-two translated catalogues', () => {
    expect(supportedLocaleCodes()).toEqual([
      'en', 'zh-CN', 'zh-TW', 'ja', 'ko', 'fr', 'de', 'es', 'pt-BR', 'ru',
      'it', 'nl', 'pl', 'tr', 'vi', 'id', 'uk', 'cs', 'sv', 'ro', 'el', 'hi', 'ar'
    ]);
    for (const locale of locales) {
      expect(locale.code).toBeTruthy();
      expect(locale.name).toBeTruthy();
      expect(locale.englishName).toBeTruthy();
      expect(locale.intl).toMatch(/^[a-z]{2,3}(-[A-Z]{2})?$/);
      expect(locale.moment).toBeTruthy();
      expect(['ltr', 'rtl']).toContain(locale.dir || 'ltr');
    }
    expect((getLocale('ar') as Catalogue | null)?.dir).toBe('rtl');
    const rightToLeft = locales.filter(locale => locale.dir === 'rtl').map(locale => locale.code);
    expect(rightToLeft).toEqual(['ar']);
  });

  it('keeps every locale structurally identical to the English catalogue', () => {
    for (const locale of locales.filter(entry => entry.code !== 'en')) {
      sameKeys(english.messages, locale.messages);
      sameKeys(english.entities, locale.entities);
      sameKeys(english.entityAliases, locale.entityAliases);
      sameKeys(english.categories, locale.categories);
      sameKeys(english.subcategories, locale.subcategories);
      sameKeys(english.units, locale.units);
      sameKeys(english.html, locale.html);
      sameKeys(english.meta, locale.meta);
      expect(locale.patterns.map(pattern => pattern.id)).toEqual(english.patterns.map(pattern => pattern.id));
      expect(locale.patterns.map(pattern => pattern.re)).toEqual(english.patterns.map(pattern => pattern.re));
    }
  });

  it('keeps every capture placeholder used by the English pattern template', () => {
    const placeholders = (template: string) => [...template.matchAll(/\$(\d+)/g)].map(match => match[1]).sort();
    for (const locale of locales.filter(entry => entry.code !== 'en')) {
      for (const [index, pattern] of english.patterns.entries()) {
        const localized = locale.patterns[index];
        for (const placeholder of placeholders(pattern.to)) {
          expect(placeholders(localized.to), `${locale.code} ${pattern.id} missing $${placeholder}`).toContain(placeholder);
        }
      }
    }
  });

  it('declares locale-specific date formats outside English', () => {
    for (const locale of locales.filter(entry => entry.code !== 'en')) {
      expect(locale.dateFormats, locale.code).toBeTruthy();
      expect(locale.dateFormats?.utc?.date, locale.code).toBeTruthy();
      expect(locale.dateFormats?.local?.parse, locale.code).toBeTruthy();
    }
  });

  it('translates the interface at release coverage levels', () => {
    for (const locale of locales.filter(entry => entry.code !== 'en')) {
      const untouchedMessages = Object.entries(english.messages)
        .filter(([key, value]) => locale.messages[key] === value)
        .map(([key]) => key);
      const messageCoverage = 1 - untouchedMessages.length / Object.keys(english.messages).length;
      expect(messageCoverage, `${locale.code} messages: ${untouchedMessages.slice(0, 6).join(' | ')}`).toBeGreaterThan(0.9);

      const untouchedHtml = Object.entries(english.html).filter(([key, value]) => locale.html[key] === value);
      expect(untouchedHtml.map(([key]) => key), locale.code).toEqual([]);

      const untouchedPatterns = english.patterns.filter((pattern, index) => locale.patterns[index].to === pattern.to);
      expect(untouchedPatterns.map(pattern => pattern.id), locale.code).toEqual([]);
    }
  });

  it('localizes the names that have a standard translation in each language', () => {
    // Entity names are mostly proper nouns and international designations; some
    // stay in Latin script by convention. The interface catalogues above are the
    // strict contract, entity names are best-effort and reviewed per language.
    for (const locale of locales.filter(entry => entry.code !== 'en')) {
      const translated = Object.keys(english.entities).filter(id => locale.entities[id] !== english.entities[id]);
      expect(translated.length, `${locale.code} needs at least the planets and major moons`).toBeGreaterThan(24);
    }
  });
});

describe('locale negotiation', () => {
  it('maps browser and stored tags onto the shipped catalogues', () => {
    expect(normalizeLocaleCode('zh')).toBe('zh-CN');
    expect(normalizeLocaleCode('zh-Hans')).toBe('zh-CN');
    expect(normalizeLocaleCode('zh-TW')).toBe('zh-TW');
    expect(normalizeLocaleCode('zh-tw')).toBe('zh-TW');
    expect(normalizeLocaleCode('zh_Hant_TW')).toBe('zh-TW');
    expect(normalizeLocaleCode('zh-HK')).toBe('zh-TW');
    expect(normalizeLocaleCode('pt')).toBe('pt-BR');
    expect(normalizeLocaleCode('pt-BR')).toBe('pt-BR');
    expect(normalizeLocaleCode('pt-PT')).toBe('pt-BR');
    expect(normalizeLocaleCode('en-GB')).toBe('en');
    expect(normalizeLocaleCode('fr-CA')).toBe('fr');
    expect(normalizeLocaleCode('de-AT')).toBe('de');
    expect(normalizeLocaleCode('ja-JP')).toBe('ja');
    expect(normalizeLocaleCode('it-IT')).toBe('it');
    expect(normalizeLocaleCode('nl-BE')).toBe('nl');
    expect(normalizeLocaleCode('pl-PL')).toBe('pl');
    expect(normalizeLocaleCode('tr-TR')).toBe('tr');
    expect(normalizeLocaleCode('vi-VN')).toBe('vi');
    expect(normalizeLocaleCode('id-ID')).toBe('id');
    expect(normalizeLocaleCode('uk-UA')).toBe('uk');
    expect(normalizeLocaleCode('cs-CZ')).toBe('cs');
    expect(normalizeLocaleCode('sv-SE')).toBe('sv');
    expect(normalizeLocaleCode('ro-RO')).toBe('ro');
    expect(normalizeLocaleCode('el-GR')).toBe('el');
    expect(normalizeLocaleCode('hi-IN')).toBe('hi');
    expect(normalizeLocaleCode('ar-SA')).toBe('ar');
    expect(normalizeLocaleCode('ar-EG')).toBe('ar');
    expect(normalizeLocaleCode('xx')).toBeNull();
    expect(normalizeLocaleCode('')).toBeNull();
  });

  it('returns catalogue metadata for a resolved code', () => {
    expect(getLocale('zh-cn')?.code).toBe('zh-CN');
    expect(getLocale('pt-br')?.name).toBe('Português (Brasil)');
    expect(getLocale('unknown')).toBeNull();
  });
});

describe('display translation engine', () => {
  const synthetic = (): Catalogue => {
    const fake = structuredClone(english) as Catalogue;
    fake.code = 'xx';
    fake.messages = {
      ...fake.messages,
      Menu: 'Menu-localized',
      Help: 'Help-localized',
      Slide: 'Slide-localized',
      Previous: 'Previous-localized',
      Next: 'Next-localized',
      'Re-framing follow camera': 'Reframing-localized',
      'Show Search': 'Search-localized',
      Planet: 'Planet-localized'
    };
    fake.patterns = fake.patterns.map(pattern => {
      if (pattern.id === 'comparedTo') return { ...pattern, to: '$1 versus $2' };
      if (pattern.id === 'moonsOf') return { ...pattern, to: 'Moons belong to $1' };
      if (pattern.id === 'helpPrefix') return { ...pattern, to: 'Help: $1' };
      if (pattern.id === 'storySlide') return { ...pattern, to: '$1 - slide $2' };
      return pattern;
    });
    fake.entities = { ...fake.entities, earth: 'Earth-localized', mars: 'Mars-localized' };
    fake.categories = { ...fake.categories, Planet: 'Planet-localized' };
    fake.units = { ...fake.units, thousand: 'kilo', km: 'kilometre', hr: 'hour', min: 'minute', sec: 'second', ms: 'millisecond' };
    fake.html = { ...fake.html, 'info.tips': 'Tips-localized' };
    return fake;
  };

  it('translates exact messages, entities and categories', () => {
    configure(synthetic(), english);
    expect(translateText('Menu')).toBe('Menu-localized');
    expect(translateText('Earth')).toBe('Earth-localized');
    expect(translateText('Planet')).toBe('Planet-localized');
    expect(translateText('Show Search')).toBe('Search-localized');
    expect(translateText('unchanged sentence')).toBeNull();
  });

  it('uses entity-gated patterns and recursively translates captures', () => {
    configure(synthetic(), english);
    expect(translateText('Earth compared to Mars')).toBe('Earth-localized versus Mars-localized');
    expect(translateText('Moons of Earth')).toBe('Moons belong to Earth-localized');
    expect(translateText('Voyager 1 - Slide 4')).toBe('Voyager 1 - slide 4');
    expect(translateText('Earth compared to an unknown body')).toBeNull();
  });

  it('localizes measurements and units without touching numbers', () => {
    configure(synthetic(), english);
    expect(translateText('1.5 thousand')).toBe('1.5 kilo');
    expect(translateText('12 km')).toBe('12 kilometre');
    expect(translateText('12 hr 34 min')).toBe('12 hour 34 minute');
    expect(translateText('3 sec 500 ms')).toBe('3 second 500 millisecond');
  });

  it('translates titles and HTML blocks', () => {
    configure(synthetic(), english);
    expect(translateTitle('Solar System - Earth - spacelibre')).toBe('Solar System - Earth-localized - spacelibre');
    expect(translateTitle('Solar System · spacelibre')).toBe('Solar System · spacelibre');
    expect(translateHtml('info.tips')).toBe('Tips-localized');
  });
});
