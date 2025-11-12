import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { BsDiagram3, BsLayersHalf, BsUiChecksGrid } from 'react-icons/bs';
import clsx from 'clsx';
import { boards } from '../data/boards';
import { useSimulatorStore } from '../state/simulatorStore';
import SchematicCanvas from './workspace/SchematicCanvas';
import ThreeDScene from './workspace/ThreeDScene';

interface WorkspaceProps {
  mode?: 'embedded' | 'fullscreen';
}

const Workspace = ({ mode = 'embedded' }: WorkspaceProps) => {
  const selectedBoardId = useSimulatorStore((state) => state.selectedBoardId);
  const workspaceView = useSimulatorStore((state) => state.workspaceView);
  const setWorkspaceView = useSimulatorStore((state) => state.setWorkspaceView);
  const splitRatio = useSimulatorStore((state) => state.splitRatio);
  const setSplitRatio = useSimulatorStore((state) => state.setSplitRatio);
  const selectedBoard = boards.find((board) => board.id === selectedBoardId) ?? boards[0];

  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setDragging] = useState(false);

  useEffect(() => {
    if (!isDragging) return undefined;
    const handlePointerMove = (event: PointerEvent) => {
      const bounds = containerRef.current?.getBoundingClientRect();
      if (!bounds) return;
      const ratio = (event.clientX - bounds.left) / bounds.width;
      setSplitRatio(ratio);
    };
    const handlePointerUp = () => setDragging(false);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, setSplitRatio]);

  const renderSchematic = (
    <div className="relative flex min-h-[320px] flex-1 rounded-3xl border border-slate-800/70 bg-slate-950/80 p-4">
      <div className="absolute inset-x-0 top-0 flex items-center justify-between rounded-t-3xl border-b border-slate-800/70 bg-slate-900/70 px-4 py-3 text-xs text-slate-300">
        <span>Schematic Layout · {selectedBoard.name}</span>
        <span>Drag modules to reposition wires and interfaces.</span>
      </div>
      <div className="h-full w-full pt-12">
        <SchematicCanvas board={selectedBoard} />
      </div>
    </div>
  );

  const renderThreeD = (
    <div className="relative flex min-h-[320px] flex-1 rounded-3xl border border-slate-800/70 bg-slate-950/80">
      <div className="absolute inset-x-0 top-0 flex items-center justify-between rounded-t-3xl border-b border-slate-800/70 bg-slate-900/70 px-4 py-3 text-xs text-slate-300">
        <span>Interactive 3D Preview</span>
        <span>Use orbit controls to inspect module fit.</span>
      </div>
      <div className="h-full w-full pt-12">
        <Canvas shadows className="h-full w-full">
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 120, 180]} />
            <ambientLight intensity={0.6} />
            <directionalLight position={[80, 120, 80]} intensity={1.2} castShadow />
            <color attach="background" args={[0.05, 0.08, 0.14]} />
            <ThreeDScene board={selectedBoard} />
            <OrbitControls enablePan enableRotate enableZoom minDistance={selectedBoard.dimensions.width} maxDistance={selectedBoard.dimensions.width * 3} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );

  const isFullscreen = mode === 'fullscreen';

  return (
    <div
      className={clsx('flex flex-1 flex-col gap-4', isFullscreen ? 'h-full' : '')}
      style={isFullscreen ? { minHeight: 0 } : {}}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Unified Workspace</h2>
          <p className="text-sm text-slate-300">
            Schematic wiring, 3D spatial layout and connection console stay in sync for rapid iteration.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWorkspaceView('schematic')}
            className={clsx(
              'flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition',
              workspaceView === 'schematic'
                ? 'border-brand-400 bg-brand-500/30 text-white'
                : 'border-slate-700 bg-slate-900/70 text-slate-300 hover:text-white'
            )}
          >
            <BsDiagram3 /> Schematic
          </button>
          <button
            onClick={() => setWorkspaceView('threeD')}
            className={clsx(
              'flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition',
              workspaceView === 'threeD'
                ? 'border-brand-400 bg-brand-500/30 text-white'
                : 'border-slate-700 bg-slate-900/70 text-slate-300 hover:text-white'
            )}
          >
            <BsLayersHalf /> 3D Studio
          </button>
          <button
            onClick={() => setWorkspaceView('split')}
            className={clsx(
              'flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition',
              workspaceView === 'split'
                ? 'border-brand-400 bg-brand-500/30 text-white'
                : 'border-slate-700 bg-slate-900/70 text-slate-300 hover:text-white'
            )}
          >
            <BsUiChecksGrid /> Split View
          </button>
        </div>
      </div>
      <div
        ref={containerRef}
        className={clsx(
          'flex-1 rounded-3xl',
          workspaceView === 'split' ? 'flex flex-col gap-4 lg:flex-row' : 'grid grid-cols-1'
        )}
        style={isFullscreen ? { minHeight: 0 } : { minHeight: '560px' }}
      >
        {(workspaceView === 'schematic' || workspaceView === 'split') && (
          <div
            className={clsx('flex flex-col', workspaceView === 'split' ? 'lg:flex-[0_0_auto]' : 'lg:flex-1')}
            style={workspaceView === 'split' ? { flexBasis: `${splitRatio * 100}%` } : undefined}
          >
            {renderSchematic}
          </div>
        )}
        {workspaceView === 'split' && (
          <button
            type="button"
            className="hidden h-full w-3 shrink-0 items-center justify-center rounded-full border border-dashed border-slate-800/60 bg-slate-900/60 text-slate-400 transition hover:border-brand-400/60 hover:text-brand-200 lg:flex"
            aria-label="Resize workspace panels"
            onPointerDown={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
          >
            ||
          </button>
        )}
        {(workspaceView === 'threeD' || workspaceView === 'split') && (
          <div
            className={clsx('flex flex-col', workspaceView === 'split' ? 'lg:flex-[0_0_auto]' : 'lg:flex-1')}
            style={workspaceView === 'split' ? { flexBasis: `${(1 - splitRatio) * 100}%` } : undefined}
          >
            {renderThreeD}
          </div>
        )}
      </div>
      <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-4 text-sm text-slate-300">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-base font-semibold text-white">{selectedBoard.name} Specs Overview</h3>
          <a
            href={selectedBoard.image}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-brand-400/40 bg-brand-500/20 px-3 py-1 text-xs font-semibold text-brand-100"
          >
            View Reference Footprint
          </a>
        </div>
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-800/70 bg-slate-950/70 px-3 py-2">
            <dt className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Board Dimensions</dt>
            <dd className="text-sm text-slate-200">
              {selectedBoard.dimensions.width.toFixed(1)} × {selectedBoard.dimensions.height.toFixed(1)} ×{' '}
              {selectedBoard.dimensions.thickness.toFixed(1)} mm
            </dd>
          </div>
          <div className="rounded-xl border border-slate-800/70 bg-slate-950/70 px-3 py-2">
            <dt className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Power Envelope</dt>
            <dd className="text-sm text-slate-200">
              {selectedBoard.power.supply} · Max {selectedBoard.power.maxCurrentMa} mA
            </dd>
          </div>
          <div className="rounded-xl border border-slate-800/70 bg-slate-950/70 px-3 py-2">
            <dt className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Digital / Analog IO</dt>
            <dd className="text-sm text-slate-200">
              {selectedBoard.ioSummary.digitalPins} digital · {selectedBoard.ioSummary.analogInputs} analog
            </dd>
          </div>
          <div className="rounded-xl border border-slate-800/70 bg-slate-950/70 px-3 py-2">
            <dt className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Primary Interfaces</dt>
            <dd className="text-sm text-slate-200">{selectedBoard.ioSummary.communication.join(', ')}</dd>
          </div>
          {Object.entries(selectedBoard.specs).map(([key, value]) => (
            <div key={key} className="rounded-xl border border-slate-800/70 bg-slate-950/70 px-3 py-2">
              <dt className="text-xs font-semibold text-slate-300 uppercase tracking-wide">{key}</dt>
              <dd className="text-sm text-slate-200">{String(value)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default Workspace;
