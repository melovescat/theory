import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { BsBoxArrowInDown, BsFilter, BsLink45Deg, BsPlug } from 'react-icons/bs';
import type { ModuleMetadata } from '../types';
import { moduleCategories } from '../data/modules';
import { boards } from '../data/boards';
import { useSimulatorStore } from '../state/simulatorStore';
import { useModuleImport } from '../hooks/useModuleImport';
import ModuleIcon from './ModuleIcon';
import CollapsiblePanel from './CollapsiblePanel';

interface ModuleSearchPanelProps {
  modules: ModuleMetadata[];
}

const ModuleSearchPanel = ({ modules }: ModuleSearchPanelProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [query, setQuery] = useState('');
  const selectedBoardId = useSimulatorStore((state) => state.selectedBoardId);
  const addModule = useSimulatorStore((state) => state.addModule);
  const { importState, importFromUrl } = useModuleImport();

  const selectedBoard = useMemo(
    () => boards.find((board) => board.id === selectedBoardId) ?? boards[0],
    [selectedBoardId]
  );

  const filteredModules = useMemo(() => {
    const list = activeCategory === 'all' ? modules : modules.filter((module) => module.category === activeCategory);
    if (!query) return list;
    const lowerQuery = query.toLowerCase();
    return list.filter((module) =>
      [module.name, module.description, module.sourceUrl].some((field) => field.toLowerCase().includes(lowerQuery))
    );
  }, [modules, query, activeCategory]);

  return (
    <CollapsiblePanel
      id="module-search"
      title="Module & Sensor Explorer"
      description="Import components with compatibility guidance and AI-assisted datasheet parsing."
      headerActions={
        <div className="rounded-full border border-slate-800/70 bg-slate-900/70 px-3 py-1 text-xs text-slate-300">
          Active board:
          <span className="ml-2 rounded-full bg-brand-500/20 px-2 py-0.5 text-brand-200">{selectedBoard.name}</span>
        </div>
      }
    >
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 pb-4">
        <BsFilter />
        <span>Categories:</span>
        <button
          onClick={() => setActiveCategory('all')}
          className={clsx(
            'rounded-full border px-3 py-1 transition',
            activeCategory === 'all'
              ? 'border-brand-400/80 bg-brand-500/30 text-white'
              : 'border-slate-700/70 bg-slate-900/70 text-slate-300 hover:text-white'
          )}
        >
          All
        </button>
        {moduleCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={clsx(
              'rounded-full border px-3 py-1 transition',
              activeCategory === category.id
                ? 'border-brand-400/80 bg-brand-500/30 text-white'
                : 'border-slate-700/70 bg-slate-900/70 text-slate-300 hover:text-white'
            )}
          >
            {category.label}
          </button>
        ))}
      </div>
      <div className="relative pb-4">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search modules, sensors, datasheets, manufacturers..."
          className="w-full rounded-2xl border border-slate-800/70 bg-slate-900/70 px-4 py-3 text-sm text-slate-200 shadow-inner shadow-slate-900/70 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/40"
        />
      </div>
      <div className="flex max-h-[480px] flex-col gap-3 overflow-y-auto pr-1 fade-scroll-mask scrollbar-thin">
        {filteredModules.map((module) => {
          const isCompatible = module.compatibleBoards.includes(selectedBoardId);
          return (
            <div
              key={module.id}
              className={clsx(
                'group flex flex-col gap-3 rounded-2xl border border-slate-800/70 bg-slate-900/70 p-4 transition',
                isCompatible ? 'hover:border-brand-400/60 hover:bg-brand-500/10' : 'opacity-60'
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/30 to-cyan-400/20 text-brand-200">
                    <ModuleIcon icon={module.icon} className="text-xl" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base font-semibold text-white">{module.name}</h3>
                    <p className="text-xs text-slate-300 line-clamp-2">{module.description}</p>
                    <div className="text-[11px] text-slate-400">
                      {module.electrical.supplyVoltage} · {module.electrical.typicalCurrentMa.toFixed(1)} mA ·{' '}
                      {module.electrical.interfaces.join(', ')}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 text-xs">
                  <span
                    className={clsx(
                      'rounded-full px-2 py-1 font-medium uppercase tracking-wide',
                      isCompatible
                        ? 'bg-emerald-500/20 text-emerald-200'
                        : module.status === 'partial'
                          ? 'bg-amber-500/20 text-amber-200'
                          : 'bg-rose-500/20 text-rose-200'
                    )}
                  >
                    {isCompatible ? 'Compatible' : module.status === 'partial' ? 'Partial' : 'Unsupported'}
                  </span>
                  <a
                    href={module.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-brand-200 hover:text-brand-100"
                  >
                    <BsLink45Deg /> Datasheet
                  </a>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
                <div className="flex flex-wrap gap-2">
                  {module.compatibleBoards.slice(0, 6).map((boardId) => {
                    const board = boards.find((item) => item.id === boardId);
                    if (!board) return null;
                    return (
                      <span key={boardId} className="rounded-full border border-slate-700/70 bg-slate-900/70 px-2 py-1">
                        {board.name}
                      </span>
                    );
                  })}
                  {module.compatibleBoards.length > 6 && (
                    <span className="rounded-full border border-slate-700/70 bg-slate-900/70 px-2 py-1">
                      +{module.compatibleBoards.length - 6} more
                    </span>
                  )}
                </div>
                <button
                  disabled={!isCompatible}
                  onClick={() => addModule(module)}
                  className={clsx(
                    'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition',
                    isCompatible
                      ? 'bg-gradient-to-r from-brand-500 via-sky-500 to-cyan-400 text-slate-950 shadow-md shadow-brand-500/30 hover:shadow-lg hover:shadow-brand-500/40'
                      : 'cursor-not-allowed bg-slate-800/60 text-slate-400'
                  )}
                >
                  <BsBoxArrowInDown />
                  Import
                </button>
              </div>
            </div>
          );
        })}
        {filteredModules.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-700/70 bg-slate-900/70 p-6 text-center text-sm text-slate-400">
            No modules match this filter. Try a different category or search term.
          </div>
        )}
      </div>
      <div className="mt-4 rounded-2xl border border-dashed border-brand-400/40 bg-slate-900/40 p-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-brand-200">
          <BsPlug /> Import from URL
        </h3>
        <p className="mb-3 text-xs text-slate-300">
          Paste a module or sensor page URL and Simulation Theory will fetch the content, analyze the datasheet using on-device
          heuristics or your configured transformer, and generate schematic and 3D placeholders automatically.
        </p>
        <form
          className="flex flex-col gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const url = String(formData.get('source') ?? '');
            if (url) {
              importFromUrl(url, selectedBoardId, addModule);
              event.currentTarget.reset();
            }
          }}
        >
          <input
            name="source"
            type="url"
            placeholder="https://example.com/sensor-module"
            className="w-full rounded-xl border border-slate-800/70 bg-slate-900/70 px-3 py-2 text-sm text-slate-200 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/40"
            required
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-full bg-brand-500/80 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-brand-500"
          >
            {importState.isLoading ? 'Analyzing…' : 'Import via Datasheet AI'}
          </button>
        </form>
        {importState.message && <p className="mt-3 text-xs text-emerald-300">{importState.message}</p>}
        {importState.error && <p className="mt-3 text-xs text-rose-300">{importState.error}</p>}
      </div>
    </CollapsiblePanel>
  );
};

export default ModuleSearchPanel;
