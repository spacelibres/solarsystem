'use client';

import { useMemo, useState } from 'react';

import type { CatalogEntity } from '../lib/nasa/catalog';
import { buildGroups } from '../lib/nasa/groups';

interface Props {
  catalog: Record<string, CatalogEntity>;
  selected: string | null;
  onSelect: (id: string) => void;
}

/**
 * Object list sidebar.
 *
 * Mirrors NASA Eyes: bodies grouped by system, collapsible, with the currently
 * focused body highlighted. Colours come from the spacelibre palette roles.
 */
export default function BodyTree({ catalog, selected, onSelect }: Props) {
  const groups = useMemo(() => buildGroups(catalog), [catalog]);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  return (
    <nav className="sl-tree" aria-label="Solar system objects">
      {groups.map((group) => {
        const isOpen = !collapsed[group.id];
        return (
          <section key={group.id} className="sl-tree__group">
            <button
              type="button"
              className="sl-tree__header"
              onClick={() => setCollapsed((c) => ({ ...c, [group.id]: isOpen }))}
              aria-expanded={isOpen}
            >
              <span className={`sl-tree__chevron${isOpen ? ' is-open' : ''}`} aria-hidden>
                ▸
              </span>
              {group.label}
              <span className="sl-tree__count">{group.ids.length}</span>
            </button>
            {isOpen && (
              <ul className="sl-tree__list">
                {group.ids.map((id) => (
                  <li key={id}>
                    <button
                      type="button"
                      className={`sl-tree__item${selected === id ? ' is-selected' : ''}`}
                      onClick={() => onSelect(id)}
                    >
                      {catalog[id]?.label ?? id}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </nav>
  );
}
