import { useMemo } from 'react';
import { BsCheckCircle, BsCpu, BsLightning, BsRecordCircle, BsSpeedometer } from 'react-icons/bs';
import { useSimulatorStore } from '../state/simulatorStore';
import { boards } from '../data/boards';
import CollapsiblePanel from './CollapsiblePanel';

const SimulationConsole = () => {
  const modules = useSimulatorStore((state) => state.placedModules);
  const selectedBoardId = useSimulatorStore((state) => state.selectedBoardId);
  const selectedBoard = useMemo(
    () => boards.find((board) => board.id === selectedBoardId) ?? boards[0],
    [selectedBoardId]
  );

  const totalCurrentMa = useMemo(
    () => modules.reduce((sum, module) => sum + module.electrical.typicalCurrentMa, 0),
    [modules]
  );
  const totalIoPins = useMemo(
    () => modules.reduce((sum, module) => sum + module.electrical.ioPins, 0),
    [modules]
  );

  const powerHeadroom = Math.max(selectedBoard.power.maxCurrentMa - totalCurrentMa, 0);
  const powerStatus = powerHeadroom > selectedBoard.power.maxCurrentMa * 0.2 ? 'healthy' : powerHeadroom > 0 ? 'warn' : 'over';
  const ioUtilization = Math.min(1, totalIoPins / Math.max(selectedBoard.ioSummary.digitalPins, 1));

  return (
    <CollapsiblePanel
      id="simulation-console"
      title="Simulation Console"
      description="Live system analysis across power, I/O and module inventory."
      headerActions={
        <div className="flex items-center gap-2 text-xs text-emerald-300">
          <BsCheckCircle />
          Workspace synced
        </div>
      }
    >
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
          <p className="mt-1 text-base font-semibold text-white">
            {totalCurrentMa.toFixed(1)} mA used / {selectedBoard.power.maxCurrentMa} mA
          </p>
          <p className={`text-xs ${powerStatus === 'healthy' ? 'text-emerald-300' : powerStatus === 'warn' ? 'text-amber-300' : 'text-rose-300'}`}>
            {powerStatus === 'healthy'
              ? `Plenty of headroom (${powerHeadroom.toFixed(1)} mA available).`
              : powerStatus === 'warn'
                ? `Close to limit: ${powerHeadroom.toFixed(1)} mA remaining.`
                : 'Over budget! Reduce consumption or upgrade your supply.'}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/70 p-3">
          <div className="flex items-center gap-2 text-slate-300">
            <BsRecordCircle /> IO Utilization
          </div>
          <p className="mt-1 text-base font-semibold text-white">
            {Math.round(ioUtilization * 100)}% of {selectedBoard.ioSummary.digitalPins} digital pins
          </p>
          <p className="text-xs text-slate-400">
            {totalIoPins} pins reserved by {modules.length} modules. Interfaces: {selectedBoard.ioSummary.communication.join(', ')}.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/70 p-3">
          <div className="flex items-center gap-2 text-slate-300">
            <BsSpeedometer /> Module Inventory
          </div>
          <p className="mt-1 text-base font-semibold text-white">{modules.length}</p>
          <p className="text-xs text-slate-400">Live updates across schematic and 3D workspace.</p>
        </div>
      </div>
    </CollapsiblePanel>
  );
};

export default SimulationConsole;
