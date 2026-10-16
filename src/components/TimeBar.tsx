'use client';

import { useEffect, useRef, useState } from 'react';

import { formatSimTime } from '../lib/nasa/groups';
import type { SolarSceneHandle } from './solar-scene';

interface Props {
  scene: SolarSceneHandle | null;
}

/**
 * Speed presets, expressed in simulated days per real second.
 * The labels mirror NASA Eyes' rate readout.
 */
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

/**
 * Time controller, matching NASA Eyes' footer.
 *
 * Layout follows the original: a rate readout over a draggable slider whose
 * knob is tinted `live` green while running and `paused` orange when stopped.
 * The scene owns the clock; this component reads and drives it so the two can
 * never disagree.
 */
export default function TimeBar({ scene }: Props) {
  const [playing, setPlaying] = useState(true);
  const [speedIndex, setSpeedIndex] = useState(1);
  const [time, setTime] = useState(0);
  const dragRef = useRef(false);

  // Drive the scene's clock rate.
  useEffect(() => {
    if (!scene) return;
    scene.setTimeScale(playing ? SPEEDS[speedIndex].days : 0);
  }, [scene, playing, speedIndex]);

  // Poll the scene clock for the readout while it is running.
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

  const onScrub = (value: number) => {
    setTime(value);
    scene?.setTime(value);
  };

  const step = (days: number) => {
    if (!scene) return;
    const next = scene.getTime() + days * 86400;
    setTime(next);
    scene.setTime(next);
  };

  return (
    <div className="ns-time">
      <h3 className={`ns-time__rate${playing ? '' : ' is-paused'}`}>
        {playing ? SPEEDS[speedIndex].label : 'paused'}
      </h3>

      <div className="ns-time__controls">
        <button
          type="button"
          className="ns-time__btn"
          onClick={() => step(-1)}
          aria-label="Back one day"
        >
          ‹
        </button>
        <button
          type="button"
          className="ns-time__btn"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? '❚❚' : '▶'}
        </button>
        <button
          type="button"
          className="ns-time__btn"
          onClick={() => step(1)}
          aria-label="Forward one day"
        >
          ›
        </button>
      </div>

      <div className="ns-time__track">
        <input
          type="range"
          className={`ns-time__range${playing ? '' : ' is-paused'}`}
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

      <div className="ns-time__readout">
        <span className="ns-time__live">
          <span className={`ns-time__dot${playing ? '' : ' is-paused'}`} aria-hidden />
          {playing ? 'Live' : 'Paused'}
        </span>
        <span className="ns-time__date">{formatSimTime(time)}</span>
        <div className="ns-time__speeds" role="group" aria-label="Time speed">
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
      </div>
    </div>
  );
}
