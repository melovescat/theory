import { useMemo, useState } from 'react';
import clsx from 'clsx';
import type { Board } from '../types';
import { useSimulatorStore } from '../state/simulatorStore';
import CollapsiblePanel from './CollapsiblePanel';

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
    <CollapsiblePanel
      id="board-selector"
      title="Board Library"
      description="Select from production-ready development and evaluation platforms with verified specs."
      headerActions={
        <div className="flex items-center gap-2 rounded-full border border-slate-800/70 bg-slate-900/70 px-3 py-1.5 text-xs text-slate-300">
          <span className="rounded-full bg-brand-500/80 px-2 py-0.5 font-semibold text-slate-950">Live</span>
          Compatibility matrix synced to workspace
        </div>
      }
    >
      <div className="flex flex-wrap gap-3 pb-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={clsx(
              'rounded-full border px-4 py-2 text-sm font-medium transition',
              activeCategory === category.id
                ? 'border-brand-400/80 bg-gradient-to-r from-brand-500 via-sky-500 to-cyan-400 text-slate-950 shadow-lg shadow-brand-500/30'
                : 'border-slate-700/70 bg-slate-900/70 text-slate-300 hover:border-brand-400/70 hover:text-white'
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
        <div className="grid max-h-[420px] grid-cols-1 gap-3 overflow-y-auto pr-1 fade-scroll-mask scrollbar-thin sm:grid-cols-2 xl:grid-cols-3">
          {visibleBoards.map((board) => (
            <button
              key={board.id}
              onClick={() => setBoard(board.id)}
              className={clsx(
                'group flex flex-col gap-4 rounded-2xl border border-slate-800/60 bg-slate-900/60 p-4 text-left transition',
                selectedBoardId === board.id
                  ? 'border-brand-400/80 bg-brand-500/20 shadow-lg shadow-brand-500/20'
                  : 'hover:border-brand-400/50 hover:bg-slate-900/90'
              )}
            >
              <div className="flex items-start gap-3">
                <img
                  src={board.image}
                  alt={`${board.name} board photograph`}
                  loading="lazy"
                  className="h-16 w-24 rounded-lg object-cover"
                />
                <div className="flex flex-1 flex-col gap-1">
                  <h3 className="text-base font-semibold text-white">{board.name}</h3>
                  <p className="text-xs uppercase tracking-wide text-slate-400">{board.manufacturer}</p>
                  <p className="text-sm text-slate-300 line-clamp-2">{board.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                <div className="rounded-xl border border-slate-800/60 bg-slate-950/70 p-2">
                  <p className="font-semibold text-brand-200">Power</p>
                  <p className="text-slate-300">{board.power.supply}</p>
                  <p className="text-slate-500">Max {board.power.maxCurrentMa} mA</p>
                </div>
                <div className="rounded-xl border border-slate-800/60 bg-slate-950/70 p-2">
                  <p className="font-semibold text-brand-200">I/O</p>
                  <p className="text-slate-300">{board.ioSummary.digitalPins} digital · {board.ioSummary.analogInputs} analog</p>
                  <p className="text-slate-500 line-clamp-2">{board.ioSummary.communication.join(', ')}</p>
                </div>
              </div>
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
    </CollapsiblePanel>
  );
};

export default BoardSelector;
