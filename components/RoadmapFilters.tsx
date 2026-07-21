'use client';

export type SortKey = 'complexity' | 'durationHrs' | 'priority';

export type FilterState = {
  priority: string;
  status: string;
  maxComplexity: string;
  sortKey: SortKey;
  dir: 'asc' | 'desc';
};

const selectClass =
  'rounded-md border border-[var(--border)] bg-[var(--bg-raised)] px-2.5 py-1.5 text-sm text-[var(--fg)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]';

export default function RoadmapFilters({
  state,
  onChange,
}: {
  state: FilterState;
  onChange: (next: FilterState) => void;
}) {
  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    onChange({ ...state, [key]: value });

  const toggleSort = (key: SortKey) => {
    if (key === state.sortKey) set('dir', state.dir === 'asc' ? 'desc' : 'asc');
    else onChange({ ...state, sortKey: key, dir: 'asc' });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-[var(--border)] pb-4 text-sm">
      <select value={state.priority} onChange={(e) => set('priority', e.target.value)} className={selectClass}>
        <option value="">All priorities</option>
        {['P1', 'P2', 'P3', 'P4', 'P5'].map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <select value={state.status} onChange={(e) => set('status', e.target.value)} className={selectClass}>
        <option value="">All statuses</option>
        {['not-started', 'in-progress', 'done', 'parked'].map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <select
        value={state.maxComplexity}
        onChange={(e) => set('maxComplexity', e.target.value)}
        className={selectClass}
      >
        <option value="">Any complexity</option>
        {[1, 2, 3, 4, 5].map((c) => (
          <option key={c} value={c}>
            &le; {c}
          </option>
        ))}
      </select>
      <div className="ml-auto flex items-center gap-1 text-[var(--fg-muted)]">
        <span className="mr-1 text-xs uppercase tracking-wide">Sort</span>
        {(['priority', 'complexity', 'durationHrs'] as SortKey[]).map((key) => (
          <button
            key={key}
            onClick={() => toggleSort(key)}
            className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
              state.sortKey === key
                ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                : 'hover:bg-[var(--accent-soft)]'
            }`}
          >
            {key === 'durationHrs' ? 'Hours' : key === 'complexity' ? 'Complexity' : 'Priority'}
            {state.sortKey === key ? (state.dir === 'asc' ? ' ↑' : ' ↓') : ''}
          </button>
        ))}
      </div>
    </div>
  );
}
