// Language picker mounted as a spacelibre surface inside the recovered settings
// cluster. It is injected from the i18n layer so no NASA component is edited.
//
// Language names stay in their own language and carry `data-i18n-ignore`, so the
// translator never rewrites the picker itself.

import { translateText } from './core.js';
const PANEL_CLASS = 'spacelibre-lang-panel';
const TRIGGER_CLASS = 'spacelibre-lang-trigger';

function localizeLabel(key, fallback) {
  return translateText(key) ?? fallback;
}

function buildTrigger(activeLocale, onOpen) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `${TRIGGER_CLASS} clickable`;
  button.setAttribute('data-i18n-ignore', '');
  const label = localizeLabel('Change language', 'Change language');
  button.setAttribute('aria-label', label);
  button.setAttribute('title', label);
  button.setAttribute('aria-haspopup', 'dialog');
  button.setAttribute('aria-expanded', 'false');
  const code = document.createElement('span');
  code.className = 'spacelibre-lang-code';
  code.textContent = activeLocale.shortName || activeLocale.code.toUpperCase();
  button.appendChild(code);
  button.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    onOpen(button);
  });
  return button;
}

function buildPanel(locales, activeCode, onSelect, onClose) {
  const panel = document.createElement('div');
  panel.className = PANEL_CLASS;
  panel.setAttribute('data-i18n-ignore', '');
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');

  const title = document.createElement('h2');
  title.className = 'spacelibre-lang-title';
  title.textContent = localizeLabel('Language', 'Language');
  panel.appendChild(title);

  const list = document.createElement('div');
  list.className = 'spacelibre-lang-list';
  panel.appendChild(list);

  for (const locale of locales) {
    const option = document.createElement('button');
    option.type = 'button';
    option.className = 'spacelibre-lang-option clickable';
    option.setAttribute('aria-pressed', String(locale.code === activeCode));
    if (locale.code === activeCode) option.classList.add('active');
    const nativeName = document.createElement('span');
    nativeName.className = 'spacelibre-lang-native';
    nativeName.textContent = locale.name;
    const englishName = document.createElement('span');
    englishName.className = 'spacelibre-lang-english';
    englishName.textContent = locale.englishName;
    option.append(nativeName, englishName);
    option.addEventListener('click', () => onSelect(locale.code));
    list.appendChild(option);
  }

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'spacelibre-lang-close clickable icon icon-close';
  close.setAttribute('aria-label', localizeLabel('Close', 'Close'));
  close.addEventListener('click', onClose);
  panel.appendChild(close);

  panel.addEventListener('click', event => event.stopPropagation());
  return panel;
}

export function mountLanguageSwitcher({ locales, activeLocale, onSelect }) {
  let trigger = null;
  let panel = null;
  let previousFocus = null;

  const closePanel = () => {
    if (!panel) return;
    panel.remove();
    panel = null;
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    if (previousFocus && previousFocus.isConnected) previousFocus.focus();
  };

  const openPanel = button => {
    if (panel) { closePanel(); return; }
    previousFocus = document.activeElement;
    panel = buildPanel(locales, activeLocale.code, code => {
      closePanel();
      onSelect(code);
    }, closePanel);
    (document.getElementById('dynamic-ui') || document.body).appendChild(panel);
    button.setAttribute('aria-expanded', 'true');
    panel.querySelector('.spacelibre-lang-option.active')?.focus();
  };

  const attach = () => {
    if (trigger) return;
    const settingsContent = document.querySelector('.settings .container .content');
    if (!settingsContent) return;
    trigger = buildTrigger(activeLocale, openPanel);
    settingsContent.insertBefore(trigger, settingsContent.firstChild);
  };

  attach();
  const observer = new MutationObserver(() => {
    if (trigger && !trigger.isConnected) trigger = null;
    attach();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && panel) closePanel();
  });
  document.addEventListener('click', event => {
    if (panel && trigger && !panel.contains(event.target) && !trigger.contains(event.target)) closePanel();
  });
  window.addEventListener('resize', () => closePanel());

  return {
    close: closePanel,
    destroy() { observer.disconnect(); closePanel(); trigger?.remove(); }
  };
}
