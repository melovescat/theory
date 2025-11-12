import { useMemo, useState } from 'react';
import { boardCategories, boards, defaultBoard } from './data/boards';
import { moduleLibrary } from './data/modules';
import { useSimulatorStore } from './state/simulatorStore';
import Header from './components/Header';
import BoardSelector from './components/BoardSelector';
import ModuleSearchPanel from './components/ModuleSearchPanel';
import Workspace from './components/Workspace';
import ModuleInspector from './components/ModuleInspector';
import GettingStartedGuide from './components/GettingStartedGuide';
import SimulationConsole from './components/SimulationConsole';

const App = () => {
  const [isGuideVisible, setGuideVisible] = useState(true);
  const [isWorkspaceFullscreen, setWorkspaceFullscreen] = useState(false);
  const setBoard = useSimulatorStore((state) => state.setBoard);
  const splitRatio = useSimulatorStore((state) => state.splitRatio);
  const setSplitRatio = useSimulatorStore((state) => state.setSplitRatio);

  useMemo(() => {
    setBoard(defaultBoard.id);
  }, [setBoard]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header
        onGuideToggle={() => setGuideVisible(true)}
        onLaunchWorkspace={() => setWorkspaceFullscreen(true)}
      />
      <main className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 pb-10 pt-6 lg:px-8">
        <BoardSelector boards={boards} categories={boardCategories} />
        <section className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <div className="flex flex-col gap-6">
            <ModuleSearchPanel modules={moduleLibrary} />
            <ModuleInspector />
            <SimulationConsole />
          </div>
          <div className="glass-panel gradient-border rounded-3xl border border-slate-800/60 bg-slate-950/70 p-6">
            <Workspace mode="embedded" />
          </div>
        </section>
      </main>
      {isGuideVisible && <GettingStartedGuide onClose={() => setGuideVisible(false)} />}
      {isWorkspaceFullscreen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 px-6 py-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Workspace Sandbox</h2>
              <p className="text-sm text-slate-300">Focus mode with resizable schematic and 3D viewports.</p>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs text-slate-300">
                <span>Split ratio</span>
                <input
                  type="range"
                  min={20}
                  max={80}
                  value={Math.round(splitRatio * 100)}
                  onChange={(event) => setSplitRatio(Number(event.target.value) / 100)}
                  className="h-1 w-32 accent-brand-400"
                />
              </label>
              <button
                onClick={() => setWorkspaceFullscreen(false)}
                className="rounded-full border border-slate-700/70 bg-slate-900/70 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-brand-400 hover:text-white"
              >
                Exit Fullscreen
              </button>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4 overflow-hidden px-6 pb-6 pt-4">
            <Workspace mode="fullscreen" />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
