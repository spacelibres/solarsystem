'use client';

import { useState } from 'react';

import { FEATURED_STORIES, type FeaturedStory } from '../lib/nasa/featured';

interface Props {
  onSelect: (story: FeaturedStory) => void;
}

/**
 * Featured stories panel, mirroring NASA's left-hand column on the home view.
 *
 * Structure and metrics come from `.featured-stories-panel`, `.story-container`
 * and friends in the site stylesheet: a collapsible header, then cards laid out
 * as a two-column grid (text | icon) with 20/25px padding and 3px radius.
 */
export default function FeaturedStories({ onSelect }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <aside className={`ns-stories${open ? ' is-open' : ''}`} aria-label="Featured stories and events">
      <div className="ns-stories__header">
        <span className="ns-stories__title">Featured Stories and Events</span>
        <button
          type="button"
          className="ns-stories__toggle"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? 'Collapse stories' : 'Expand stories'}
        >
          {open ? '«' : '»'}
        </button>
      </div>

      {open && (
        <ul className="ns-stories__list">
          {FEATURED_STORIES.map((story) => (
            <li key={story.id} className="ns-story">
              <button type="button" className="ns-story__btn" onClick={() => onSelect(story)}>
                <span className="ns-story__title">{story.title}</span>
                <span className="ns-story__subtitle">{story.subtitle}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="ns-story__icon" src={story.icon} alt="" loading="lazy" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
