'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import SpacelibreLogo from '../../components/SpacelibreLogo';
import { DEFAULT_PRESET, applyPaletteToDocument } from '../../lib/theme/palette';
import { DEFAULT_SCENE } from '../config/default-scene';
import { unixMillisecondsToEt } from '../domain/time';
import { ExplorerRuntime, type ExplorerSnapshot } from '../runtime/explorer-runtime';
import { createRenderWorld, type RenderDiagnostics, type RenderWorld } from '../render/render-world';
import { etDateInput, formatEtUtc, utcInputToEt } from './format';
import styles from './Explorer.module.css';

export interface ExplorerDebugApi {
  snapshot(): { runtime: Omit<ExplorerSnapshot, 'frames'> & { frames: Record<string, unknown> }; render: RenderDiagnostics; manual: boolean };
  seek(timeEt: number): void;
  play(rate?: number): void;
  pause(): void;
  live(unixMilliseconds: number): void;
  select(id: string): void;
  resetCamera(): void;
  step(realSeconds: number, unixMilliseconds?: number): void;
  automatic(): void;
}

declare global {
  interface Window { __SOLAR_EXPLORER__?: ExplorerDebugApi; }
}

const MIN_DATE = '1949-12-31T00:00:00';
const MAX_DATE = '2049-12-31T00:00:00';
const MIN_ET = utcInputToEt(MIN_DATE);
const MAX_ET = utcInputToEt(MAX_DATE);
const SPEEDS = [
  [-86400, '倒放 · 1天/秒'], [-1, '倒放 · 实时速率'], [1, '1秒/秒'], [60, '1分钟/秒'],
  [3600, '1小时/秒'], [86400, '1天/秒'], [31557600, '1年/秒'],
] as const;

function readyCount(snapshot: ExplorerSnapshot | null): number {
  return snapshot ? [...snapshot.frames.values()].filter(frame => frame.status === 'ready').length : 0;
}

export default function Explorer() {
  const mount = useRef<HTMLDivElement>(null);
  const runtimeRef = useRef<ExplorerRuntime | null>(null);
  const worldRef = useRef<RenderWorld | null>(null);
  const [snapshot, setSnapshot] = useState<ExplorerSnapshot | null>(null);
  const [renderStats, setRenderStats] = useState<RenderDiagnostics | null>(null);
  const [fatal, setFatal] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [showDebug, setShowDebug] = useState(false);
  const [dateDraft, setDateDraft] = useState('');

  useEffect(() => {
    const container = mount.current;
    if (!container) return;
    applyPaletteToDocument(DEFAULT_PRESET);
    let runtime: ExplorerRuntime | null = null;
    let world: RenderWorld | null = null;
    let frame = 0;
    let disposed = false;
    let manual = false;
    let api: ExplorerDebugApi | undefined;
    let previous = performance.now();
    let previousUi = -Infinity;
    let initializedDate = false;
    try {
      runtime = new ExplorerRuntime({ timeEt: unixMillisecondsToEt(Date.now()) });
      const current = runtime;
      runtime.live(Date.now());
      world = createRenderWorld(container, DEFAULT_SCENE, { onSelect: id => current.select(id) });
      const view = world;
      runtimeRef.current = runtime;
      worldRef.current = world;
      const refresh = () => {
        if (disposed) return;
        const state = current.snapshot();
        setSnapshot(state);
        setRenderStats(view.snapshot());
      };
      if (process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_SOLAR_DEBUG === '1') {
        api = {
          snapshot: () => {
            const state = current.snapshot();
            return { runtime: { ...state, frames: Object.fromEntries(state.frames) }, render: view.snapshot(), manual };
          },
          seek(timeEt) { current.seek(timeEt); refresh(); },
          play(rate) { current.play(rate); refresh(); },
          pause() { current.pause(); refresh(); },
          live(unixMilliseconds) { current.live(unixMilliseconds); refresh(); },
          select(id) { current.select(id); refresh(); },
          resetCamera() { view.resetCamera(); },
          step(realSeconds, unixMilliseconds) { current.tick(realSeconds, unixMilliseconds); manual = true; view.update(current.snapshot()); refresh(); },
          automatic() { manual = false; },
        };
        window.__SOLAR_EXPLORER__ = api;
      }
      const animate = (now: number) => {
        if (disposed) return;
        try {
          const state = manual ? current.snapshot() : current.tick(Math.min(.1, Math.max(0, (now - previous) / 1000)), Date.now());
          previous = now;
          view.update(state);
          if (now - previousUi >= 250) {
            setSnapshot(state);
            setRenderStats(view.snapshot());
            if (!initializedDate) { setDateDraft(etDateInput(state.clock.timeEt)); initializedDate = true; }
            previousUi = now;
          }
          frame = requestAnimationFrame(animate);
        } catch (error) {
          setFatal(error instanceof Error ? error.message : String(error));
        }
      };
      frame = requestAnimationFrame(animate);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      queueMicrotask(() => { if (!disposed) setFatal(message); });
    }
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      if (api && window.__SOLAR_EXPLORER__ === api) delete window.__SOLAR_EXPLORER__;
      runtime?.dispose();
      world?.dispose();
      runtimeRef.current = null;
      worldRef.current = null;
    };
  }, [attempt]);

  const perform = (action: (runtime: ExplorerRuntime) => void) => {
    const runtime = runtimeRef.current;
    if (!runtime) return;
    try { action(runtime); setNotice(null); setSnapshot(runtime.snapshot()); }
    catch (error) { setNotice(error instanceof Error ? error.message : String(error)); }
  };
  const submitDate = (event: FormEvent) => {
    event.preventDefault();
    perform(runtime => { const time = utcInputToEt(dateDraft); runtime.pause(); runtime.seek(time); });
  };
  const selected = DEFAULT_SCENE.find(body => body.id === snapshot?.selectedId);
  const selectedFrame = snapshot?.frames.get(snapshot.selectedId);
  const running = !!snapshot && snapshot.clock.mode !== 'paused';
  const errorEntries = Object.entries(snapshot?.errors ?? {});
  const textureFailures = Object.keys(renderStats?.errors ?? {}).length;
  const modeText = snapshot?.clock.mode === 'live' ? 'LIVE' : running ? 'PLAYBACK' : 'PAUSED';
  const activeRate = snapshot?.clock.rate ?? 1;

  return (
    <main className={styles.app}>
      <header className={styles.header}>
        <div className={styles.desktopBrand}><SpacelibreLogo width={240} ink="white" /></div>
        <div className={styles.mobileBrand}><SpacelibreLogo orientation="icon" width={48} ink="white" /></div>
        <div className={styles.title}><span>SOLAR SYSTEM</span><h1>{selected?.label ?? 'Explore space'}</h1></div>
        <nav className={styles.headerActions} aria-label="视图控制">
          <button onClick={() => worldRef.current?.resetCamera()} disabled={!snapshot || !!fatal}>重置视角</button>
          <button aria-pressed={showDebug} onClick={() => setShowDebug(value => !value)}>诊断</button>
          <a href="/eyes/index.html" target="_blank" rel="noreferrer">参考应用 ↗</a>
        </nav>
      </header>

      <section className={styles.workspace} aria-label="太阳系视图">
        <div ref={mount} className={styles.viewport} />
        <aside className={styles.sidebar}>
          <div className={styles.sectionLabel}>探索目标 <span>{readyCount(snapshot)}/{DEFAULT_SCENE.length}</span></div>
          <nav className={styles.targets} aria-label="选择天体">
            {DEFAULT_SCENE.map(body => {
              const frame = snapshot?.frames.get(body.id);
              return (
                <button key={body.id} aria-pressed={snapshot?.selectedId === body.id} onClick={() => perform(runtime => runtime.select(body.id))} disabled={!snapshot || !!fatal}>
                  <span className={`${styles.dot} ${frame?.status === 'ready' ? styles.ready : ''}`} />
                  <span>{body.label}</span><small>{body.kind === 'marker' ? '航天器' : body.id === 'moon' ? '卫星' : body.id === 'sun' ? '恒星' : '行星'}</small>
                </button>
              );
            })}
          </nav>
          <div className={styles.bodyInfo}>
            <span className={styles.sectionLabel}>{selected?.kind === 'marker' ? '航天器位置' : '天体信息'}</span>
            <p>{selected?.kind === 'marker' ? 'Voyager 1 的真实位置标记。' : selected ? `赤道半径 ${selected.radiusKm.toLocaleString('en-US')} km` : '正在载入目录…'}</p>
            {selectedFrame?.status === 'ready' ? <p className={styles.secondary}>当前参考系：{selectedFrame.parentId ?? 'Sun-centered root'}</p> : selectedFrame?.status === 'unavailable' ? <p className={styles.secondary}>该时刻不可用：{selectedFrame.reason}</p> : null}
          </div>
          <div className={styles.hint}>拖动旋转 · 滚轮缩放<br />右键拖动平移</div>
        </aside>

        {(!snapshot || snapshot.phase === 'loading') && !fatal && (
          <div className={styles.loading} role="status">正在读取星历 <span>{snapshot?.pending.length ?? '…'} 项</span></div>
        )}
        {(fatal || notice || errorEntries.length > 0 || textureFailures > 0) && (
          <div className={styles.errorPanel} role="alert">
            <p>{fatal ?? notice ?? `${errorEntries.length ? `${errorEntries.length} 项星历` : ''}${errorEntries.length && textureFailures ? '、' : ''}${textureFailures ? `${textureFailures} 项影像` : ''}暂时不可用`}</p>
            {fatal ? <button onClick={() => { setFatal(null); setSnapshot(null); setAttempt(value => value + 1); }}>重新加载视图</button> : <button onClick={() => { if (textureFailures) { setSnapshot(null); setAttempt(value => value + 1); } else perform(runtime => runtime.retry()); }}>重试</button>}
          </div>
        )}

        {showDebug && (
          <aside className={styles.debug} aria-label="运行诊断">
            <h2>运行诊断</h2>
            <dl>
              <dt>状态 / 代次</dt><dd>{snapshot?.phase ?? 'initializing'} / {snapshot?.generation ?? 0}</dd>
              <dt>ET 秒</dt><dd>{snapshot?.clock.timeEt.toFixed(3) ?? '—'}</dd>
              <dt>数据请求 / 排队</dt><dd>{snapshot?.resources.active ?? 0} / {snapshot?.resources.queued ?? 0}</dd>
              <dt>数据缓存</dt><dd>{((snapshot?.resources.bytes ?? 0) / 1048576).toFixed(2)} MiB</dd>
              <dt>绘制 / 三角形</dt><dd>{renderStats?.drawCalls ?? 0} / {renderStats?.triangles.toLocaleString('en-US') ?? 0}</dd>
              <dt>GPU 几何 / 纹理</dt><dd>{renderStats?.geometries ?? 0} / {renderStats?.textures ?? 0}</dd>
              <dt>影像缓存</dt><dd>{((renderStats?.textureResources.bytes ?? 0) / 1048576).toFixed(1)} MiB</dd>
            </dl>
            {selectedFrame?.status === 'ready' && <pre>{JSON.stringify({ parent: selectedFrame.parentId, positionKm: selectedFrame.position, orientation: selectedFrame.orientation }, null, 2)}</pre>}
            {errorEntries.map(([path, message]) => <p key={path} className={styles.debugError}>{path}: {message}</p>)}
            {Object.entries(renderStats?.errors ?? {}).map(([url, message]) => <p key={url} className={styles.debugError}>{message}</p>)}
          </aside>
        )}
      </section>

      <footer className={styles.footer}>
        <div className={styles.clockLine}>
          <span className={`${styles.mode} ${snapshot?.clock.mode === 'live' ? styles.live : ''}`}>{modeText}</span>
          <time>{snapshot ? formatEtUtc(snapshot.clock.timeEt) : '正在初始化…'}</time>
          <span className={styles.rate}>{snapshot?.clock.mode === 'paused' ? '已暂停' : snapshot?.clock.mode === 'live' ? '跟随当前时间' : `${activeRate.toLocaleString('en-US')} 秒/秒`}</span>
        </div>
        <input className={styles.timeline} type="range" aria-label="仿真时间" min={MIN_ET} max={MAX_ET} step={60} value={snapshot?.clock.timeEt ?? MIN_ET} disabled={!snapshot || !!fatal} onChange={event => perform(runtime => { runtime.pause(); runtime.seek(Number(event.target.value)); })} />
        <div className={styles.controls}>
          <button onClick={() => perform(runtime => running ? runtime.pause() : runtime.play(activeRate))} disabled={!snapshot || !!fatal}>{running ? '暂停' : '播放'}</button>
          <select aria-label="仿真速度" value={activeRate} onChange={event => perform(runtime => runtime.play(Number(event.target.value)))} disabled={!snapshot || !!fatal}>
            {SPEEDS.map(([rate, label]) => <option key={rate} value={rate}>{label}</option>)}
          </select>
          <button onClick={() => perform(runtime => runtime.live(Date.now()))} disabled={!snapshot || !!fatal}>实时</button>
          <form className={styles.dateForm} onSubmit={submitDate}>
            <label htmlFor="explorer-date">UTC</label>
            <input id="explorer-date" type="datetime-local" step={1} min={MIN_DATE} max={MAX_DATE} value={dateDraft} onChange={event => setDateDraft(event.target.value)} required disabled={!snapshot || !!fatal} />
            <button type="submit" disabled={!snapshot || !!fatal}>转到</button>
          </form>
        </div>
        <p className={styles.attribution}>数据与影像：<a href="https://eyes.nasa.gov/apps/solar-system" target="_blank" rel="noreferrer">NASA / JPL-Caltech</a> · 独立实现，非 NASA 官方产品</p>
      </footer>
    </main>
  );
}
