'use client';

import { useEffect, useState } from 'react';

import { formatSimTime } from '../lib/nasa/groups';
import type { SolarSceneHandle } from './solar-scene';

interface Props {
  scene: SolarSceneHandle | null;
}

/** Speed presets in simulated days per real second. */
const SPEEDS = [
  { label: '1 h/s', days: 1 / 24 },
  { label: '1 d/s', days: 1 },
  { label: '1 w/s', days: 7 },
  { label: '1 mo/s', days: 30 },
  { label: '1 y/s', days: 365 },
] as const;

/**
 * Time controller.
 *
 * Matches the NASA Eyes bottom bar: a play/pause toggle, speed presets, and the
 * current simulated date. The scene owns the clock; this component only reads
 * and drives it, so the values can never drift apart.
 */
export default function TimeBar({ scene }: Props) {
  const [playing, setPlaying] = useState(true);
  const [speedIndex, setSpeedIndex] = useState(1);
  const [label, setLabel] = useState(() => formatSimTime(0));

  useEffect(() => {
    if (!scene) return;
    scene.setTimeScale(playing ? SPEEDS[speedIndex].days : 0);
  }, [scene, playing, speedIndex]);

  // Poll the scene clock for the readout. Cheap, and avoids threading a
  // callback through the render loop.
  useEffect(() => {
    if (!scene) return;
    let raf = 0;
    const tick = () => {
      setLabel(formatSimTime(scene.getTime()));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [scene]);

  const step = (dir: 1 | -1) => {
    if (!scene) return;
    scene.setTime(scene.getTime() + dir * 86400);
  };

  return (
    <div className="sl-timebar" role="group" aria-label="Time controls">
      <button
        type="button"
        className="sl-timebar__btn sl-timebar__btn--step"
        onClick={() => step(-1)}
        aria-label="Back one day"
      >
        ‹
      </button>
      <button
        type="button"
        className="sl-timebar__btn sl-timebar__btn--play"
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? 'Pause' : 'Play'}
      >
        {playing ? '❚❚' : '▶'}
      </button>
      <button
        type="button"
        className="sl-timebar__btn sl-timebar__btn--step"
        onClick={() => step(1)}
        aria-label="Forward one day"
      >
        ›
      </button>

      <span className="sl-timebar__date">{label}</span>

      <div className="sl-timebar__speeds" role="group" aria-label="Time speed">
        {SPEEDS.map((s, i) => (
          <button
            key={s.label}
            type="button"
            className={`sl-timebar__speed${i === speedIndex ? ' is-active' : ''}`}
            onClick={() => setSpeedIndex(i)}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
