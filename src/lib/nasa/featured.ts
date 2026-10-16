/**
 * Featured stories shown in the left panel on the home view.
 *
 * NASA drives this panel from `stories` in its bundle; the titles, subtitles and
 * card artwork here are the ones the live home page displays, with the target
 * body resolved against our own catalog so clicking a card selects that body.
 *
 * Icons live in the local mirror under
 * `apps/solar-system/assets/images/cards/`.
 */

export interface FeaturedStory {
  id: string;
  title: string;
  /** Small uppercase line under the title. */
  subtitle: string;
  /** Card artwork, relative to the app assets root. */
  icon: string;
  /** Catalog entity to focus when the card is activated. */
  target?: string;
  /** Playback date to jump to, as an ISO string, when the story is time-bound. */
  date?: string;
}

const CARDS_BASE = '/cards';

export const FEATURED_STORIES: FeaturedStory[] = [
  {
    id: 'roman',
    title: 'Roman Space Telescope Launch',
    subtitle: 'Mission launch · August 30th, 2026',
    icon: `${CARDS_BASE}/roman_space_telescope.webp`,
    target: 'sc_roman_space_telescope',
    date: '2026-08-30T00:00:00Z',
  },
  {
    id: 'psyche',
    title: 'Psyche Mars Gravity Assist',
    subtitle: 'Mars flyby on May 15th, 2026',
    icon: `${CARDS_BASE}/psyche_outline.png`,
    target: 'sc_psyche',
    date: '2026-05-15T00:00:00Z',
  },
  {
    id: 'artemis2',
    title: 'Artemis II Launch',
    subtitle: 'Mission launch · April 1st, 2026',
    icon: `${CARDS_BASE}/artemis2_icon.png`,
    target: 'sc_artemis_2',
    date: '2026-04-01T00:00:00Z',
  },
  {
    id: 'voyager',
    title: "Voyager's Grand Tour",
    subtitle: '1977 – Today',
    icon: `${CARDS_BASE}/voyager_story_icon.png`,
    target: 'sc_voyager_1',
  },
  {
    id: 'enceladus',
    title: 'Plumes of Enceladus',
    subtitle: 'Saturn system',
    icon: `${CARDS_BASE}/enceladus.png`,
    target: 'enceladus',
  },
  {
    id: 'eclipse',
    title: 'Total Solar Eclipse',
    subtitle: 'Sun–Earth–Moon geometry',
    icon: `${CARDS_BASE}/total_eclipse.png`,
    target: 'moon',
  },
  {
    id: 'asteroid',
    title: 'Asteroid Close Approaches',
    subtitle: 'Small bodies',
    icon: `${CARDS_BASE}/asteroid.png`,
    target: '1_ceres',
  },
];
