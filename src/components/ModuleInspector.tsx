import { useMemo, useState } from 'react';
import { BsArrowsMove, BsPlug, BsTrash } from 'react-icons/bs';
import { useSimulatorStore } from '../state/simulatorStore';
import ModuleIcon from './ModuleIcon';
import CollapsiblePanel from './CollapsiblePanel';

const ModuleInspector = () => {
  const modules = useSimulatorStore((state) => state.placedModules);
  const updateModuleTransform = useSimulatorStore((state) => state.updateModuleTransform);
  const removeModule = useSimulatorStore((state) => state.removeModule);
  const [selectedInstance, setSelectedInstance] = useState<string | null>(null);

  const selectedModule = useMemo(
    () => modules.find((module) => module.instanceId === selectedInstance) ?? modules[0] ?? null,
    [modules, selectedInstance]
  );

  return (
    <CollapsiblePanel
      id="module-inspector"
      title="Module Inspector"
      description="Fine-tune placement, orientation and metadata for imported modules across schematic and 3D workspaces."
    >
      {modules.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700/70 bg-slate-900/70 p-6 text-center text-sm text-slate-400">
          Import a module to begin configuring its position and connections.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-thin">
            {modules.map((module) => (
              <button
                key={module.instanceId}
                onClick={() => setSelectedInstance(module.instanceId)}
                className={`flex min-w-[200px] flex-col gap-2 rounded-xl border px-3 py-3 text-left text-sm transition ${
                  selectedModule?.instanceId === module.instanceId
                    ? 'border-brand-400/70 bg-brand-500/20 text-white shadow-lg shadow-brand-500/20'
                    : 'border-slate-800/70 bg-slate-900/70 text-slate-300 hover:border-brand-400/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ModuleIcon icon={module.icon} className="text-lg text-brand-200" />
                  <span className="font-semibold text-white">{module.name}</span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">{module.description}</p>
                <div className="text-[11px] text-slate-400">
                  {module.electrical.supplyVoltage} · {module.electrical.typicalCurrentMa.toFixed(1)} mA ·
                  {' '}
                  {module.electrical.interfaces.join(', ')}
                </div>
              </button>
            ))}
          </div>
          {selectedModule && (
            <div className="rounded-2xl border border-slate-800/70 bg-slate-900/70 p-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-semibold text-white">{selectedModule.name}</h3>
                  <p className="text-xs text-slate-400">Instance ID: {selectedModule.instanceId}</p>
                  <div className="text-xs text-slate-400">
                    Dimensions: {selectedModule.dimensions.width.toFixed(1)} × {selectedModule.dimensions.height.toFixed(1)} ×{' '}
                    {selectedModule.dimensions.depth.toFixed(1)} mm
                  </div>
                  {selectedModule.mechanical?.weightGrams && (
                    <div className="text-xs text-slate-500">
                      Estimated weight: {selectedModule.mechanical.weightGrams.toFixed(1)} g
                    </div>
                  )}
                </div>
                <button
                  onClick={() => removeModule(selectedModule.instanceId)}
                  className="flex items-center gap-1 rounded-full border border-rose-500/40 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-200 hover:bg-rose-500/20"
                >
                  <BsTrash /> Remove
                </button>
              </div>
              <div className="mt-4 grid gap-3 text-xs md:grid-cols-2">
                <div className="rounded-xl border border-slate-800/70 bg-slate-950/70 p-3">
                  <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand-200">
                    <BsPlug /> Electrical profile
                  </h4>
                  <dl className="space-y-1 text-slate-300">
                    <div className="flex justify-between gap-3">
                      <dt>Supply</dt>
                      <dd>{selectedModule.electrical.supplyVoltage}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt>Typical current</dt>
                      <dd>{selectedModule.electrical.typicalCurrentMa.toFixed(1)} mA</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt>I/O pins</dt>
                      <dd>{selectedModule.electrical.ioPins}</dd>
                    </div>
                    <div>
                      <dt>Interfaces</dt>
                      <dd className="text-slate-400">{selectedModule.electrical.interfaces.join(', ')}</dd>
                    </div>
                  </dl>
                </div>
                <div className="rounded-xl border border-slate-800/70 bg-slate-950/70 p-3">
                  <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand-200">
                    <BsArrowsMove /> Placement controls
                  </h4>
                  <div className="grid gap-3 text-xs">
                    {(['x', 'y', 'z'] as const).map((axis) => (
                      <label key={axis} className="flex items-center justify-between gap-2">
                        <span className="text-slate-300">Position {axis.toUpperCase()} (mm)</span>
                        <input
                          type="number"
                          value={selectedModule.position[axis].toFixed(1)}
                          onChange={(event) =>
                            updateModuleTransform(selectedModule.instanceId, {
                              position: {
                                ...selectedModule.position,
                                [axis]: Number(event.target.value)
                              }
                            })
                          }
                          className="w-24 rounded-lg border border-slate-800/70 bg-slate-900/70 px-2 py-1 text-right text-slate-200 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400/40"
                        />
                      </label>
                    ))}
                    {(['x', 'y', 'z'] as const).map((axis) => (
                      <label key={`rot-${axis}`} className="flex items-center justify-between gap-2">
                        <span className="text-slate-300">Rotation {axis.toUpperCase()} (°)</span>
                        <input
                          type="number"
                          value={selectedModule.rotation[axis]}
                          onChange={(event) =>
                            updateModuleTransform(selectedModule.instanceId, {
                              rotation: {
                                ...selectedModule.rotation,
                                [axis]: Number(event.target.value)
                              }
                            })
                          }
                          className="w-24 rounded-lg border border-slate-800/70 bg-slate-900/70 px-2 py-1 text-right text-slate-200 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400/40"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </CollapsiblePanel>
  );
};

export default ModuleInspector;
