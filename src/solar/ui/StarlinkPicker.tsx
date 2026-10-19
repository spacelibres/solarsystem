'use client';

import { useMemo, useState } from 'react';
import type { StarlinkOrbit } from '../domain/starlink';
import { starlinkGeneration } from '../domain/starlink';
import styles from './Explorer.module.css';

interface StarlinkPickerProps {
  orbits: readonly StarlinkOrbit[];
  selected: readonly number[];
  onClose(): void;
  onApply(numbers: number[]): void;
}

const MONTHS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const GENERATIONS = [1, 2, 3] as const;

export default function StarlinkPicker({ orbits, selected, onClose, onApply }: StarlinkPickerProps) {
  const [draft, setDraft] = useState<Set<number>>(() => new Set(selected));
  const [query, setQuery] = useState('');
  const [generations, setGenerations] = useState<Set<number>>(() => new Set(GENERATIONS));
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [limit, setLimit] = useState(200);

  const years = useMemo(() => {
    const values = new Set<string>();
    for (const orbit of orbits) if (orbit.d) values.add(orbit.d.slice(0, 4));
    return [...values].sort().reverse();
  }, [orbits]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase().replace(/^starlink[-\s]*/i, '');
    return orbits.filter(orbit => {
      const generation = orbit.g ?? starlinkGeneration(orbit.n);
      if (generations.size > 0 && !generations.has(generation)) return false;
      if (needle && !String(orbit.n).includes(needle) && !orbit.name.toLowerCase().includes(needle)) return false;
      if (year || month || day) {
        if (!orbit.d) return false;
        if (year && orbit.d.slice(0, 4) !== year) return false;
        if (month && orbit.d.slice(5, 7) !== month) return false;
        if (day && orbit.d.slice(8, 10) !== day) return false;
      }
      return true;
    });
  }, [orbits, query, generations, year, month, day]);

  const toggleGeneration = (generation: number) => {
    setGenerations(current => {
      const next = new Set(current);
      if (next.has(generation)) next.delete(generation);
      else next.add(generation);
      return next;
    });
  };

  const toggle = (number: number) => {
    setDraft(current => {
      const next = new Set(current);
      if (next.has(number)) next.delete(number);
      else next.add(number);
      return next;
    });
  };

  const selectAllFiltered = () => {
    setDraft(current => {
      const next = new Set(current);
      for (const orbit of filtered) next.add(orbit.n);
      return next;
    });
  };

  const visible = filtered.slice(0, limit);
  const dateLabel = (orbit: StarlinkOrbit) => orbit.d ? `${orbit.d}${orbit.di ? '（推算）' : ''}` : '日期未知';

  return (
    <div className={styles.starlinkModal} role="dialog" aria-modal="true" aria-label="选择 Starlink 卫星">
      <div className={styles.starlinkDialog}>
        <header>
          <div>
            <strong>选择 Starlink 卫星</strong>
            <span>{orbits.length.toLocaleString('zh-CN')} 颗 · 可多选、按代级和发射日期筛选</span>
          </div>
          <button onClick={onClose} aria-label="关闭">×</button>
        </header>

        <div className={styles.starlinkFilters}>
          <input
            type="search"
            value={query}
            placeholder="搜索编号或名称，如 34567"
            onChange={event => { setQuery(event.target.value); setLimit(200); }}
          />
          <div className={styles.starlinkGenerationFilter}>
            <span>代级</span>
            {GENERATIONS.map(generation => (
              <label key={generation}>
                <input type="checkbox" checked={generations.has(generation)} onChange={() => toggleGeneration(generation)} />
                Gen{generation}
              </label>
            ))}
          </div>
          <div className={styles.starlinkDateFilter}>
            <span>发射日期</span>
            <select value={year} onChange={event => { setYear(event.target.value); setLimit(200); }} aria-label="发射年份">
              <option value="">年（不限）</option>
              {years.map(value => <option key={value} value={value}>{value} 年</option>)}
            </select>
            <select value={month} onChange={event => { setMonth(event.target.value); setLimit(200); }} aria-label="发射月份">
              <option value="">月（不限）</option>
              {MONTHS.map(value => <option key={value} value={value}>{Number(value)} 月</option>)}
            </select>
            <select value={day} onChange={event => { setDay(event.target.value); setLimit(200); }} aria-label="发射日">
              <option value="">日（不限）</option>
              {Array.from({ length: 31 }, (_, index) => String(index + 1).padStart(2, '0')).map(value => (
                <option key={value} value={value}>{Number(value)} 日</option>
              ))}
            </select>
            {(year || month || day) && <button onClick={() => { setYear(''); setMonth(''); setDay(''); }}>清除日期</button>}
          </div>
        </div>

        <div className={styles.starlinkSelectionBar}>
          <span>匹配 <b>{filtered.length.toLocaleString('zh-CN')}</b> 颗 · 已选 <b>{draft.size.toLocaleString('zh-CN')}</b> 颗</span>
          <div>
            <button aria-label="starlink-select-all" onClick={selectAllFiltered}>全选当前结果</button>
            <button aria-label="starlink-clear" onClick={() => setDraft(new Set())}>清空</button>
          </div>
        </div>

        <div className={styles.starlinkList}>
          {visible.map(orbit => (
            <label key={orbit.n} className={styles.starlinkRow}>
              <input type="checkbox" checked={draft.has(orbit.n)} onChange={() => toggle(orbit.n)} />
              <span className={styles.starlinkNumber}>{orbit.name}</span>
              <span className={styles.starlinkGeneration}>Gen{orbit.g ?? starlinkGeneration(orbit.n)}</span>
              <span className={styles.starlinkDate}>{dateLabel(orbit)}</span>
            </label>
          ))}
          {filtered.length === 0 && <p className={styles.starlinkEmpty}>没有符合筛选条件的卫星。</p>}
        </div>

        {filtered.length > visible.length && (
          <button className={styles.starlinkMore} onClick={() => setLimit(value => value + 300)}>
            显示更多（还有 {(filtered.length - visible.length).toLocaleString('zh-CN')} 颗）
          </button>
        )}

        <footer>
          <span>应用后会高亮选中卫星的显示轨道；前 12 颗同时加载对应代级 3D 模型。</span>
          <div>
            <button onClick={onClose}>取消</button>
            <button className={styles.starlinkApply} aria-label="starlink-apply" onClick={() => onApply([...draft])}>
              应用选中（{draft.size.toLocaleString('zh-CN')}）
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
