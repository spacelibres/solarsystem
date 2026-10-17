'use client';
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import SpacelibreLogo from '../../components/SpacelibreLogo';
import { DEFAULT_PRESET, applyPaletteToDocument } from '../../lib/theme/palette';
import { FULL_SCENE } from '../config/scene-catalog';
import { searchBodies, visibleSystemIds, type SceneMode, type CatalogFilter } from './navigation';
import { unixMillisecondsToEt } from '../domain/time';
import { relativeEphemeris } from '../domain/observations';
import { ExplorerRuntime, type ExplorerSnapshot } from '../runtime/explorer-runtime';
import { createRenderWorld, type RenderDiagnostics, type RenderWorld } from '../render/render-world';
import { etDateInput, formatEtUtc, utcInputToEt } from './format';
import styles from './Explorer.module.css';
export interface ExplorerDebugApi {
    snapshot(): {
        runtime: Omit<ExplorerSnapshot, 'frames'> & {
            frames: Record<string, unknown>;
        };
        render: RenderDiagnostics;
        manual: boolean;
    };
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
    interface Window {
        __SOLAR_EXPLORER__?: ExplorerDebugApi;
    }
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
    const layerState = useRef({ labels: true, orbits: true, stars: true, constellations: false, minorMoons: false });
    const navigationState = useRef<{
        id: string;
        mode: SceneMode;
    }>({ id: 'sun', mode: 'overview' });
    const navigateRef = useRef<((id: string, mode: SceneMode) => void) | null>(null);
    const [sceneMode, setSceneMode] = useState<SceneMode>('overview');
    const [filter, setFilter] = useState<CatalogFilter>('planets');
    const [query, setQuery] = useState('');
    const [resultLimit, setResultLimit] = useState(100);
    const [labelsVisible, setLabelsVisible] = useState(true);
    const [orbitsVisible, setOrbitsVisible] = useState(true);
    const [minorMoonsVisible, setMinorMoonsVisible] = useState(false);
    const [starsVisible, setStarsVisible] = useState(true);
    const [constellationsVisible, setConstellationsVisible] = useState(false);
    const mount = useRef<HTMLDivElement>(null);
    const runtimeRef = useRef<ExplorerRuntime | null>(null);
    const worldRef = useRef<RenderWorld | null>(null);
    const [snapshot, setSnapshot] = useState<ExplorerSnapshot | null>(null);
    const [renderStats, setRenderStats] = useState<RenderDiagnostics | null>(null);
    const [timing,setTiming]=useState({fps:0,cpuMs:0});
    const [fatal, setFatal] = useState<string | null>(null);
    const [notice, setNotice] = useState<string | null>(null);
    const [attempt, setAttempt] = useState(0);
    const [showDebug, setShowDebug] = useState(false);
    const [showCatalog, setShowCatalog] = useState(true);
    const [dateDraft, setDateDraft] = useState('');
    useEffect(() => {
        const container = mount.current;
        if (!container)
            return;
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
        let timingStart=previous, timingFrames=0, timingCpu=0;
        try {
            const initialTime=unixMillisecondsToEt(Date.now());
            runtime = new ExplorerRuntime({ entities: FULL_SCENE, activeIds: visibleSystemIds(FULL_SCENE, navigationState.current.id, navigationState.current.mode, initialTime, [], layerState.current.minorMoons), timeEt: initialTime });
            const current = runtime;
            runtime.select(navigationState.current.id);
            runtime.live(Date.now());
            world = createRenderWorld(container, FULL_SCENE, { onSelect: id => navigateRef.current?.(id, 'body') });
            const view = world;
            view.setLayers(layerState.current);
            view.setView(navigationState.current.mode, visibleSystemIds(FULL_SCENE, navigationState.current.id, navigationState.current.mode, initialTime, [], layerState.current.minorMoons));
            navigateRef.current = (id, mode) => { navigationState.current = { id, mode }; const visible = visibleSystemIds(FULL_SCENE, id, mode,current.renderFrame().clock.timeEt, [], layerState.current.minorMoons); current.setActive(visible); current.select(id); view.setView(mode, visible); setSceneMode(mode); setSnapshot(current.snapshot()); };
            runtimeRef.current = runtime;
            worldRef.current = world;
            const refresh = () => {
                if (disposed)
                    return;
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
                    select(id) { navigateRef.current?.(id, 'body'); refresh(); },
                    resetCamera() { view.resetCamera(); },
                    step(realSeconds, unixMilliseconds) { current.tick(realSeconds, unixMilliseconds); manual = true; view.update(current.snapshot()); refresh(); },
                    automatic() { manual = false; },
                };
                window.__SOLAR_EXPLORER__ = api;
            }
            const animate = (now: number) => {
                if (disposed)
                    return;
                try {
                    const cpuStart=performance.now();
                    const state = manual ? current.renderFrame() : current.tickForRender(Math.min(.1, Math.max(0, (now - previous) / 1000)), Date.now());
                    previous = now;
                    view.update(state);
                    timingFrames++;timingCpu+=performance.now()-cpuStart;
                    if(now-timingStart>=1000){setTiming({fps:1000*timingFrames/(now-timingStart),cpuMs:timingCpu/timingFrames});timingStart=now;timingFrames=0;timingCpu=0;}
                    if (now - previousUi >= 250) {
                        const nav=navigationState.current;
                        const visible=visibleSystemIds(FULL_SCENE,nav.id,nav.mode,state.clock.timeEt,view.expandedSystems(state),layerState.current.minorMoons);
                        current.setActive(visible); view.setVisible(visible);
                        setSnapshot(current.snapshot());
                        setRenderStats(view.snapshot());
                        if (!initializedDate) {
                            setDateDraft(etDateInput(state.clock.timeEt));
                            initializedDate = true;
                        }
                        previousUi = now;
                    }
                    frame = requestAnimationFrame(animate);
                }
                catch (error) {
                    setFatal(error instanceof Error ? error.message : String(error));
                }
            };
            frame = requestAnimationFrame(animate);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            queueMicrotask(() => { if (!disposed)
                setFatal(message); });
        }
        return () => {
            disposed = true;
            cancelAnimationFrame(frame);
            if (api && window.__SOLAR_EXPLORER__ === api)
                delete window.__SOLAR_EXPLORER__;
            runtime?.dispose();
            world?.dispose();
            navigateRef.current = null;
            runtimeRef.current = null;
            worldRef.current = null;
        };
    }, [attempt]);
    const perform = (action: (runtime: ExplorerRuntime) => void) => {
        const runtime = runtimeRef.current;
        if (!runtime)
            return;
        try {
            action(runtime);
            setNotice(null);
            setSnapshot(runtime.snapshot());
        }
        catch (error) {
            setNotice(error instanceof Error ? error.message : String(error));
        }
    };
    const submitDate = (event: FormEvent) => {
        event.preventDefault();
        perform(runtime => { const time = utcInputToEt(dateDraft); runtime.pause(); runtime.seek(time); });
    };
    const navigate = (id: string, mode: SceneMode) => { try {
        navigateRef.current?.(id, mode);
        setNotice(null);
    }
    catch (error) {
        setNotice(String(error));
    } };
    const results = useMemo(()=>searchBodies(FULL_SCENE, query, filter),[query,filter]);
    const selected = FULL_SCENE.find(body => body.id === snapshot?.selectedId);
    const selectedFrame = snapshot?.frames.get(snapshot.selectedId);
    const parentId=selectedFrame?.parentId;
    const parent=FULL_SCENE.find(body=>body.id===parentId);
    const ephemeris=relativeEphemeris(selectedFrame,parentId?snapshot?.frames.get(parentId):undefined);
    const running = !!snapshot && snapshot.clock.mode !== 'paused';
    const errorEntries = Object.entries(snapshot?.errors ?? {});
    const unavailablePaths=snapshot?.unavailablePaths??[];
    const actionableErrors=errorEntries.filter(([path])=>!unavailablePaths.includes(path));
    const textureFailures = Object.keys(renderStats?.errors ?? {}).length;
    const modeText = snapshot?.clock.mode === 'live' ? 'LIVE' : running ? 'PLAYBACK' : 'PAUSED';
    const activeRate = snapshot?.clock.rate ?? 1;
    return (<main className={styles.app}>
      <header className={styles.header}>
        <div className={styles.desktopBrand}><SpacelibreLogo width={240} ink="white"/></div>
        <div className={styles.mobileBrand}><SpacelibreLogo orientation="icon" width={48} ink="white"/></div>
        <div className={styles.title}><span>SOLAR SYSTEM</span><h1>{sceneMode === 'overview' ? 'Solar System' : selected?.label ?? 'Explore space'}</h1></div>
        <nav className={styles.headerActions} aria-label="视图控制">
          <button aria-expanded={showCatalog} onClick={() => setShowCatalog(value => !value)}>目录</button>
          <button onClick={() => navigate('sun', 'overview')} disabled={!snapshot}>太阳系总览</button>
          <button onClick={() => worldRef.current?.resetCamera()} disabled={!snapshot || !!fatal}>重置视角</button>
          <button aria-pressed={showDebug} onClick={() => setShowDebug(value => !value)}>诊断</button>
          <a href="/eyes/index.html" target="_blank" rel="noreferrer">参考应用 ↗</a>
        </nav>
      </header>

      <section className={styles.workspace} aria-label="太阳系视图">
        <div ref={mount} className={styles.viewport}/>
        <aside className={styles.sidebar} hidden={!showCatalog} aria-label="探索目录">
          <div className={styles.sectionLabel}>探索目录 <span>{FULL_SCENE.length} 个对象</span></div>
          <input className={styles.search} aria-label="搜索天体或航天器" placeholder="搜索行星、卫星、航天器…" value={query} onChange={event => { setQuery(event.target.value); setResultLimit(100); if (event.target.value.trim())
        setFilter('all'); }}/>
          <select className={styles.category} aria-label="对象分类" value={filter} onChange={event => { setFilter(event.target.value as CatalogFilter); setResultLimit(100); }}>
            <option value="planets">行星</option><option value="moons">天然卫星</option><option value="earth-satellites">地球人造卫星</option><option value="spacecraft">航天器 / 深空任务</option><option value="small-bodies">小天体</option><option value="all">全部对象</option>
          </select>
          <nav className={styles.targets} aria-label="选择天体">
            {results.slice(0, resultLimit).map(body => {
            const frame = snapshot?.frames.get(body.id);
            return (<button key={body.id} aria-pressed={snapshot?.selectedId === body.id} onClick={() => navigate(body.id, 'body')} disabled={!snapshot || !!fatal}>
                  <span className={`${styles.dot} ${frame?.status === 'ready' ? styles.ready : ''}`}/>
                  <span>{body.label}</span><small>{body.groups?.includes('spacecraft') ? '航天器' : body.groups?.includes('moons') ? '卫星' : body.groups?.includes('planets') ? '行星' : '天体'}</small>
                </button>);
        })}
          </nav>
          {results.length > resultLimit && <button className={styles.moreResults} onClick={() => setResultLimit(value => value + 100)}>显示更多（{resultLimit}/{results.length}）</button>}
          <p className={styles.resultCount}>{results.length} 项匹配 · 当前 {readyCount(snapshot)} 项数据就绪</p>
          {!!unavailablePaths.length&&<p className={styles.resultCount}>{unavailablePaths.length} 条数据不覆盖当前时刻；详情见诊断。</p>}
          <div className={styles.bodyInfo}>
            <span className={styles.sectionLabel}>{selected?.groups?.includes('spacecraft') ? '航天器位置' : '天体信息'}</span>
            <p>{selected?.groups?.includes('spacecraft') ? selected?.model ? 'NASA 原始三维模型 · 真实星历位置' : '当前位置对象未提供可用模型' : selected ? `赤道半径 ${selected.radiusKm.toLocaleString('en-US')} km` : '正在载入目录…'}</p>
            {selected?.model && selectedFrame?.status === 'ready' && !selectedFrame.orientation && <p className={styles.secondary}>模型可查看；当前姿态未解析。</p>}
            {selectedFrame?.status === 'ready' ? <p className={styles.secondary}>围绕天体：{parent?.label ?? '太阳系日心原点'}</p> : selectedFrame?.status === 'unavailable' ? <p className={styles.secondary}>该时刻不可用：{selectedFrame.reason}</p> : null}
            {ephemeris&&parent&&<>
              <p className={styles.secondary}>距 {parent.label}：{ephemeris.distanceKm.toLocaleString('en-US',{maximumFractionDigits:1})} km<br/>相对速度：{ephemeris.speedKmS.toFixed(3)} km/s</p>
              <button onClick={()=>navigate(parent.id,'system')}>查看 {parent.label} 系统</button>
              <details className={styles.ephemeris}><summary>星历数据 · J2000</summary>
                <p>{formatEtUtc(snapshot!.clock.timeEt)}</p>
                <p>参考体：{parent.label} · 单位：km、km/s</p>
                <pre>{JSON.stringify({position:ephemeris.positionKm,velocity:ephemeris.velocityKmS},null,2)}</pre>
              </details>
            </>}
          </div>
          <div className={styles.sceneActions}>
            <button disabled={!selected} onClick={() => selected && navigate(selected.id, 'body')}>近距离查看</button>
            <button disabled={!selected} onClick={() => selected && navigate(selected.id, 'system')}>查看卫星系统</button>
            <label><input type="checkbox" checked={labelsVisible} onChange={event => { setLabelsVisible(event.target.checked); layerState.current.labels = event.target.checked; worldRef.current?.setLayers({ labels: event.target.checked }); }}/>名称标签</label>
            <label><input type="checkbox" checked={orbitsVisible} onChange={event => { setOrbitsVisible(event.target.checked); layerState.current.orbits = event.target.checked; worldRef.current?.setLayers({ orbits: event.target.checked }); }}/>轨道与轨迹</label>
            <label><input type="checkbox" checked={minorMoonsVisible} onChange={event => { setMinorMoonsVisible(event.target.checked); layerState.current.minorMoons = event.target.checked; const nav = navigationState.current; const current = runtimeRef.current; const view = worldRef.current; if (current && view) { const state = current.renderFrame(); const visible = visibleSystemIds(FULL_SCENE, nav.id, nav.mode, state.clock.timeEt, view.expandedSystems(state), event.target.checked); current.setActive(visible); view.setVisible(visible); } }}/>小型天然卫星</label>
            <label><input type="checkbox" checked={starsVisible} onChange={event=>{setStarsVisible(event.target.checked);layerState.current.stars=event.target.checked;worldRef.current?.setLayers({stars:event.target.checked});}}/>恒星与星系</label>
            <label><input type="checkbox" checked={constellationsVisible} onChange={event=>{setConstellationsVisible(event.target.checked);layerState.current.constellations=event.target.checked;worldRef.current?.setLayers({constellations:event.target.checked});}}/>星座连线与名称</label>
          </div>
          <div className={styles.hint}>拖动旋转 · 滚轮缩放<br />右键拖动平移</div>
        </aside>

        {(!snapshot || snapshot.phase === 'loading') && !fatal && (<div className={styles.loading} role="status">正在读取星历 <span>{snapshot?.pending.length ?? '…'} 项</span></div>)}
        {(fatal || notice || actionableErrors.length > 0 || textureFailures > 0) && (<div className={styles.errorPanel} role="alert">
            <p>{fatal ?? notice ?? `${actionableErrors.length ? `${actionableErrors.length} 项星历` : ''}${actionableErrors.length && textureFailures ? '、' : ''}${textureFailures ? `${textureFailures} 项影像` : ''}暂时不可用`}</p>
            {fatal ? <button onClick={() => { setFatal(null); setSnapshot(null); setAttempt(value => value + 1); }}>重新加载视图</button> : <button onClick={() => { if (textureFailures) {
            setSnapshot(null);
            setAttempt(value => value + 1);
        }
        else
            perform(runtime => runtime.retry()); }}>重试</button>}
          </div>)}

        {showDebug && (<aside className={styles.debug} aria-label="运行诊断">
            <h2>运行诊断</h2>
            <dl>
              <dt>状态 / 代次</dt><dd>{snapshot?.phase ?? 'initializing'} / {snapshot?.generation ?? 0}</dd>
              <dt>ET 秒</dt><dd>{snapshot?.clock.timeEt.toFixed(3) ?? '—'}</dd>
              <dt>数据请求 / 排队</dt><dd>{snapshot?.resources.active ?? 0} / {snapshot?.resources.queued ?? 0}</dd>
              <dt>数据缓存</dt><dd>{((snapshot?.resources.bytes ?? 0) / 1048576).toFixed(2)} MiB</dd>
              <dt>绘制 / 三角形</dt><dd>{renderStats?.drawCalls ?? 0} / {renderStats?.triangles.toLocaleString('en-US') ?? 0}</dd>
              <dt>FPS / CPU ms</dt><dd>{timing.fps.toFixed(1)} / {timing.cpuMs.toFixed(2)}</dd>
              <dt>Orbit geometry updates</dt><dd>{renderStats?.orbitGeometryUpdates ?? 0}</dd>
              <dt>GPU 几何 / 纹理</dt><dd>{renderStats?.geometries ?? 0} / {renderStats?.textures ?? 0}</dd>
              <dt>模型已加载 / 下载 / 排队</dt><dd>{renderStats?.models.active ?? 0} / {renderStats?.models.pending ?? 0} / {renderStats?.models.queued ?? 0}</dd>
              <dt>影像缓存</dt><dd>{((renderStats?.textureResources.bytes ?? 0) / 1048576).toFixed(1)} MiB</dd>
            </dl>
            {selectedFrame?.status === 'ready' && <pre>{JSON.stringify({ parent: selectedFrame.parentId, positionKm: selectedFrame.position, orientation: selectedFrame.orientation }, null, 2)}</pre>}
            {renderStats?.modelAnimations[selected?.id ?? ''] && <pre>{JSON.stringify(renderStats.modelAnimations[selected!.id], null, 2)}</pre>}
            {errorEntries.map(([path, message]) => <p key={path} className={styles.debugError}>{path}: {message}</p>)}
            {Object.entries(renderStats?.trailGaps??{}).map(([id,gap])=><p key={id}>{id}: trail {gap}</p>)}
            {Object.entries(renderStats?.errors ?? {}).map(([url, message]) => <p key={url} className={styles.debugError}>{message}</p>)}
          </aside>)}
      </section>

      <footer className={styles.footer}>
        <div className={styles.clockLine}>
          <span className={`${styles.mode} ${snapshot?.clock.mode === 'live' ? styles.live : ''}`}>{modeText}</span>
          <time>{snapshot ? formatEtUtc(snapshot.clock.timeEt) : '正在初始化…'}</time>
          <span className={styles.rate}>{snapshot?.clock.mode === 'paused' ? '已暂停' : snapshot?.clock.mode === 'live' ? '跟随当前时间' : `${activeRate.toLocaleString('en-US')} 秒/秒`}</span>
        </div>
        <input className={styles.timeline} type="range" aria-label="仿真时间" min={MIN_ET} max={MAX_ET} step={60} value={snapshot?.clock.timeEt ?? MIN_ET} disabled={!snapshot || !!fatal} onChange={event => perform(runtime => { runtime.pause(); runtime.seek(Number(event.target.value)); })}/>
        <div className={styles.controls}>
          <button onClick={() => perform(runtime => running ? runtime.pause() : runtime.play(activeRate))} disabled={!snapshot || !!fatal}>{running ? '暂停' : '播放'}</button>
          <select aria-label="仿真速度" value={activeRate} onChange={event => perform(runtime => runtime.play(Number(event.target.value)))} disabled={!snapshot || !!fatal}>
            {SPEEDS.map(([rate, label]) => <option key={rate} value={rate}>{label}</option>)}
          </select>
          <button onClick={() => perform(runtime => runtime.live(Date.now()))} disabled={!snapshot || !!fatal}>实时</button>
          <form className={styles.dateForm} onSubmit={submitDate}>
            <label htmlFor="explorer-date">UTC</label>
            <input id="explorer-date" type="datetime-local" step={1} min={MIN_DATE} max={MAX_DATE} value={dateDraft} onChange={event => setDateDraft(event.target.value)} required disabled={!snapshot || !!fatal}/>
            <button type="submit" disabled={!snapshot || !!fatal}>转到</button>
          </form>
        </div>
      </footer>
    </main>);
}
