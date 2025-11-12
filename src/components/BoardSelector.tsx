import { useMemo, useState } from 'react';
import clsx from 'clsx';
import type { Board } from '../types';
import { useSimulatorStore } from '../state/simulatorStore';

interface BoardSelectorProps {
  boards: Board[];
  categories: ReadonlyArray<{ id: Board['category']; label: string; color: string }>;
}

const BoardSelector = ({ boards, categories }: BoardSelectorProps) => {
  const [activeCategory, setActiveCategory] = useState<Board['category']>('arduino');
  const [query, setQuery] = useState('');
  const selectedBoardId = useSimulatorStore((state) => state.selectedBoardId);
  const setBoard = useSimulatorStore((state) => state.setBoard);

  const visibleBoards = useMemo(() => {
    const filtered = boards.filter((board) => board.category === activeCategory);
    if (!query) return filtered;
    const lowerQuery = query.toLowerCase();
    return filtered.filter((board) =>
      [board.name, board.manufacturer, board.description].some((field) =>
        field.toLowerCase().includes(lowerQuery)
      )
    );
  }, [boards, activeCategory, query]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Board Library</h2>
          <p className="text-sm text-slate-300">Select from 300+ curated development and evaluation platforms.</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-slate-800/70 bg-slate-900/70 px-3 py-1.5 text-sm text-slate-300">
          <span className="rounded-full bg-brand-500/80 px-2 py-0.5 text-xs font-semibold text-slate-950">NEW</span>
          Instant compatibility matrix and footprints
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={clsx(
              'rounded-full border border-slate-700/70 px-4 py-2 text-sm font-medium transition',
              activeCategory === category.id
                ? 'bg-gradient-to-r from-brand-500 via-sky-500 to-cyan-400 text-slate-950 shadow-lg shadow-brand-500/30'
                : 'bg-slate-900/70 text-slate-300 hover:border-brand-400/70 hover:text-white'
            )}
          >
            {category.label}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <div className="relative">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, manufacturer or capability..."
            className="w-full rounded-2xl border border-slate-800/70 bg-slate-900/70 px-4 py-3 text-sm text-slate-200 shadow-inner shadow-slate-900/70 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/40"
          />
        </div>
        <div className="grid max-h-80 grid-cols-1 gap-3 overflow-y-auto pr-1 fade-scroll-mask scrollbar-thin sm:grid-cols-2 xl:grid-cols-3">
          {visibleBoards.map((board) => (
            <button
              key={board.id}
              onClick={() => setBoard(board.id)}
              className={clsx(
                'group flex flex-col gap-3 rounded-2xl border border-slate-800/60 bg-slate-900/60 p-4 text-left transition',
                selectedBoardId === board.id
                  ? 'border-brand-400/80 bg-brand-500/20 shadow-lg shadow-brand-500/20'
                  : 'hover:border-brand-400/50 hover:bg-slate-900/90'
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-white">{board.name}</h3>
                <span className="rounded-full bg-slate-800/70 px-3 py-1 text-xs text-slate-300">{board.manufacturer}</span>
              </div>
              <p className="text-sm text-slate-300 line-clamp-2">{board.description}</p>
              <dl className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                {Object.entries(board.specs).map(([key, value]) => (
                  <div key={key} className="rounded-lg bg-slate-900/80 px-3 py-2">
                    <dt className="font-medium text-slate-300">{key}</dt>
                    <dd className="truncate text-slate-400">{String(value)}</dd>
                  </div>
                ))}
              </dl>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardSelector;
