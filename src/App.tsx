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
  const setBoard = useSimulatorStore((state) => state.setBoard);

  useMemo(() => {
    setBoard(defaultBoard.id);
  }, [setBoard]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header onGuideToggle={() => setGuideVisible(true)} />
      <main className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 pb-10 pt-6 lg:px-8">
        <section id="board-selector" className="glass-panel gradient-border rounded-3xl p-6">
          <BoardSelector boards={boards} categories={boardCategories} />
        </section>
        <section className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <div className="flex flex-col gap-6">
            <div id="module-search" className="glass-panel gradient-border rounded-3xl p-6">
              <ModuleSearchPanel modules={moduleLibrary} />
            </div>
            <div id="module-inspector" className="glass-panel gradient-border rounded-3xl p-6">
              <ModuleInspector />
            </div>
            <div className="glass-panel gradient-border rounded-3xl p-6">
              <SimulationConsole />
            </div>
          </div>
          <div id="workspace" className="glass-panel gradient-border rounded-3xl p-6">
            <Workspace />
          </div>
        </section>
      </main>
      {isGuideVisible && <GettingStartedGuide onClose={() => setGuideVisible(false)} />}
    </div>
  );
};

export default App;
