import { useMemo } from 'react';
import { BsCheckCircle, BsCpu, BsLightning, BsRecordCircle } from 'react-icons/bs';
import { useSimulatorStore } from '../state/simulatorStore';
import { boards } from '../data/boards';

const SimulationConsole = () => {
  const modules = useSimulatorStore((state) => state.placedModules);
  const selectedBoardId = useSimulatorStore((state) => state.selectedBoardId);
  const selectedBoard = useMemo(
    () => boards.find((board) => board.id === selectedBoardId) ?? boards[0],
    [selectedBoardId]
  );

  const powerEstimate = useMemo(() => modules.length * 0.12 + 0.5, [modules.length]);
  const ioUsage = useMemo(() => Math.min(98, modules.length * 12), [modules.length]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Simulation Console</h2>
        <div className="flex items-center gap-2 text-xs text-emerald-300">
          <BsCheckCircle />
          Ready to simulate
        </div>
      </div>
      <div className="grid gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/70 p-3">
          <div className="flex items-center gap-2 text-slate-300">
            <BsCpu /> Active Board
          </div>
          <p className="mt-1 text-base font-semibold text-white">{selectedBoard.name}</p>
          <p className="text-xs text-slate-400">{selectedBoard.description}</p>
        </div>
        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/70 p-3">
          <div className="flex items-center gap-2 text-slate-300">
            <BsLightning /> Power Budget
          </div>
          <p className="mt-1 text-base font-semibold text-white">{powerEstimate.toFixed(2)} W</p>
          <p className="text-xs text-slate-400">Estimated dynamic load based on module count.</p>
        </div>
        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/70 p-3">
          <div className="flex items-center gap-2 text-slate-300">
            <BsRecordCircle /> IO Utilization
          </div>
          <p className="mt-1 text-base font-semibold text-white">{ioUsage}%</p>
          <p className="text-xs text-slate-400">Routed pin usage of primary header groups.</p>
        </div>
        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/70 p-3">
          <div className="flex items-center gap-2 text-slate-300">
            <BsCpu /> Modules Imported
          </div>
          <p className="mt-1 text-base font-semibold text-white">{modules.length}</p>
          <p className="text-xs text-slate-400">Live updates across schematic and 3D workspace.</p>
        </div>
      </div>
    </div>
  );
};

export default SimulationConsole;
