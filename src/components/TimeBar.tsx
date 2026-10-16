'use client';

import { useEffect, useRef, useState } from 'react';

import type { SolarSceneHandle } from './solar-scene';

interface Props {
  scene: SolarSceneHandle | null;
}

/** Speed presets in simulated days per real second. */
const SPEEDS = [
  { label: '1 hr/s', days: 1 / 24 },
  { label: '1 day/s', days: 1 },
  { label: '1 wk/s', days: 7 },
  { label: '1 mo/s', days: 30 },
  { label: '1 yr/s', days: 365 },
] as const;

/** Slider spans this many simulated years either side of the current epoch. */
const SPAN_YEARS = 100;
const YEAR_SECONDS = 365.25 * 86400;
const J2000_MS = Date.UTC(2000, 0, 1, 12, 0, 0);

/**
 * Time controls, laid out to match NASA Eyes' footer.
 *
 * Reading the live page's boxes gives the geometry: a 600px centred column with
 * the rate readout above the track, the date to the left and the clock time to
 * the right on the same line, a 36px knob riding the slider, and the
 * "Time Controls" toggle beneath the knob. The `LIVE` badge sits separately at
 * the bottom-left.
 */
export default function TimeBar({ scene }: Props) {
  const [playing, setPlaying] = useState(true);
  const [speedIndex, setSpeedIndex] = useState(1);
  const [time, setTime] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const dragRef = useRef(false);

  useEffect(() => {
    if (!scene) return;
    scene.setTimeScale(playing ? SPEEDS[speedIndex].days : 0);
  }, [scene, playing, speedIndex]);

  useEffect(() => {
    if (!scene) return;
    let raf = 0;
    const tick = () => {
      if (!dragRef.current) setTime(scene.getTime());
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [scene]);

  const epoch = scene?.getTime() ?? 0;
  const span = SPAN_YEARS * YEAR_SECONDS;
  const min = epoch - span;
  const max = epoch + span;
  const progress = ((time - min) / (max - min)) * 100;

  const { date, clock, meridiem } = formatParts(time);

  const onScrub = (value: number) => {
    setTime(value);
    scene?.setTime(value);
  };

  return (
    <>
      {/* LIVE badge, bottom-left of the footer. */}
      <nav className="ns-live" aria-label="Playback state">
        <span className={`ns-live__dot${playing ? '' : ' is-paused'}`} aria-hidden />
        <span className="ns-live__text">{playing ? 'Live' : 'Paused'}</span>
      </nav>

      {/* Centred time column. */}
      <nav className={`ns-time${playing ? ' is-live' : ' is-paused'}`} aria-label="Time controls">
        <div className="ns-time__row">
          <time className="ns-time__date">{date}</time>
          <h3 className="ns-time__rate">{playing ? 'Real Rate' : 'Paused'}</h3>
          <time className="ns-time__clock">
            {clock}
            <span className="ns-time__meridiem">{meridiem}</span>
          </time>
        </div>

        <div className="ns-time__track">
          <input
            type="range"
            className="ns-time__range"
            min={min}
            max={max}
            step={(max - min) / 100000}
            value={time}
            style={{ ['--progress' as string]: `${progress}%` }}
            onPointerDown={() => {
              dragRef.current = true;
            }}
            onPointerUp={() => {
              dragRef.current = false;
            }}
            onChange={(e) => onScrub(Number(e.target.value))}
            aria-label="Simulation time"
          />
        </div>

        <button
          type="button"
          className="ns-time__toggle"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          {expanded ? '⌄' : '⌃'} Time Controls
        </button>

        {expanded && (
          <div className="ns-time__speeds" role="group" aria-label="Time speed">
            <button
              type="button"
              className="ns-time__playbtn"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {playing ? '❚❚' : '▶'}
            </button>
            {SPEEDS.map((s, i) => (
              <button
                key={s.label}
                type="button"
                className={`ns-time__speed${i === speedIndex ? ' is-active' : ''}`}
                onClick={() => setSpeedIndex(i)}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}

/** Split a simulation time into NASA's `Oct 15, 2026` / `07:15:41` / `PM` parts. */
function formatParts(secondsSinceJ2000: number): {
  date: string;
  clock: string;
  meridiem: string;
} {
  const d = new Date(J2000_MS + secondsSinceJ2000 * 1000);
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const date = `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;

  let hours = d.getUTCHours();
  const meridiem = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const hh = String(hours).padStart(2, '0');
  const mm = String(d.getUTCMinutes()).padStart(2, '0');
  const ss = String(d.getUTCSeconds()).padStart(2, '0');
  return { date, clock: `${hh}:${mm}:${ss}`, meridiem };
}
