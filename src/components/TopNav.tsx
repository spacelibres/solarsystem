'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import NasaIcon from './NasaIcon';
import type { CatalogEntity } from '../lib/nasa/catalog';
import { bodyColor } from '../lib/theme/nasa-tokens';

interface Props {
  catalog: Record<string, CatalogEntity>;
  onSelect: (id: string) => void;
}

/**
 * Top-right navigation, mirroring NASA's `.top-right-nav`.
 *
 * The live page shows three controls in a 1rem-gapped flex row: a search
 * magnifier, a Share button, and a Menu button. Search filters the catalog and
 * selecting a result focuses that body.
 */
export default function TopNav({ catalog, onSelect }: Props) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const all = Object.values(catalog);
    if (!q) return all.slice(0, 12);
    return all
      .filter((e) => e.label.toLowerCase().includes(q) || e.id.includes(q))
      .sort((a, b) => {
        // Prefer names that start with the query.
        const as = a.label.toLowerCase().startsWith(q) ? 0 : 1;
        const bs = b.label.toLowerCase().startsWith(q) ? 0 : 1;
        return as - bs || a.label.localeCompare(b.label);
      })
      .slice(0, 12);
  }, [catalog, query]);

  return (
    <div className="ns-topnav">
      {searchOpen ? (
        <div className="ns-search">
          <NasaIcon name="search" size={18} />
          <input
            ref={inputRef}
            type="search"
            className="ns-search__input"
            placeholder="Search the solar system"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setSearchOpen(false);
                setQuery('');
              }
              if (e.key === 'Enter' && results[0]) {
                onSelect(results[0].id);
                setSearchOpen(false);
                setQuery('');
              }
            }}
            aria-label="Search bodies"
          />
          <button
            type="button"
            className="ns-search__close"
            onClick={() => {
              setSearchOpen(false);
              setQuery('');
            }}
            aria-label="Close search"
          >
            <NasaIcon name="close" size={16} />
          </button>

          {results.length > 0 && (
            <ul className="ns-search__results">
              {results.map((e) => (
                <li key={e.id}>
                  <button
                    type="button"
                    className="ns-search__result"
                    onClick={() => {
                      onSelect(e.id);
                      setSearchOpen(false);
                      setQuery('');
                    }}
                  >
                    <span
                      className="ns-search__swatch"
                      style={{ borderColor: bodyColor(e.id, e.groups) }}
                      aria-hidden
                    />
                    <span className="ns-search__label">{e.label}</span>
                    <span className="ns-search__kind">{e.groups[0] ?? ''}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <button
          type="button"
          className="ns-topnav__btn ns-topnav__btn--icon"
          onClick={() => setSearchOpen(true)}
          aria-label="Search"
          title="Search"
        >
          <NasaIcon name="search" size={30} />
        </button>
      )}

      <button type="button" className="ns-topnav__btn" title="Share">
        <NasaIcon name="external" size={18} />
        <span>Share</span>
      </button>

      <div className="ns-topnav__menu">
        <button
          type="button"
          className="ns-topnav__btn ns-topnav__btn--menu"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-haspopup="true"
        >
          <NasaIcon name="menu" size={24} />
          <span>Menu</span>
        </button>

        {menuOpen && (
          <>
            <button
              type="button"
              className="ns-menu__scrim"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              tabIndex={-1}
            />
            <div className="ns-menu" role="menu">
              <div className="ns-menu__head">
                <span className="ns-menu__title">Eyes on the Solar System</span>
                <button
                  type="button"
                  className="ns-menu__close"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <NasaIcon name="close" size={16} />
                </button>
              </div>
              <ul className="ns-menu__list">
                <li>
                  <a className="ns-menu__link" href="https://eyes.nasa.gov/apps/solar-system/" target="_blank" rel="noreferrer">
                    Original NASA Eyes
                  </a>
                </li>
                <li>
                  <a className="ns-menu__link" href="https://science.nasa.gov/solar-system/" target="_blank" rel="noreferrer">
                    NASA Solar System
                  </a>
                </li>
                <li>
                  <a className="ns-menu__link" href="https://github.com/spacelibres/solarsystem" target="_blank" rel="noreferrer">
                    Source
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
