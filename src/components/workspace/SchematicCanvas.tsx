import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import type { Board } from '../../types';
import { useSimulatorStore } from '../../state/simulatorStore';

interface SchematicCanvasProps {
  board: Board;
}

interface DragState {
  instanceId: string;
  offsetX: number;
  offsetY: number;
  baseZ: number;
}

const CANVAS_WIDTH = 760;
const CANVAS_HEIGHT = 460;

const SchematicCanvas = ({ board }: SchematicCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modules = useSimulatorStore((state) => state.placedModules);
  const updateModuleTransform = useSimulatorStore((state) => state.updateModuleTransform);
  const [dragState, setDragState] = useState<DragState | null>(null);

  useEffect(() => {
    const handlePointerUp = () => setDragState(null);
    window.addEventListener('pointerup', handlePointerUp);
    return () => window.removeEventListener('pointerup', handlePointerUp);
  }, []);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!dragState) return;
      const bounds = containerRef.current?.getBoundingClientRect();
      if (!bounds) return;
      const x = event.clientX - bounds.left - dragState.offsetX;
      const y = event.clientY - bounds.top - dragState.offsetY;
      updateModuleTransform(dragState.instanceId, {
        position: {
          x: Math.max(-CANVAS_WIDTH / 2, Math.min(CANVAS_WIDTH / 2, x - CANVAS_WIDTH / 2)),
          y: Math.max(-CANVAS_HEIGHT / 2, Math.min(CANVAS_HEIGHT / 2, y - CANVAS_HEIGHT / 2)),
          z: dragState.baseZ
        }
      });
    };
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [dragState, updateModuleTransform]);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/80"
      style={{ minHeight: CANVAS_HEIGHT }}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 500">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(148,163,184,0.18)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="800" height="500" fill="url(#grid)" />
        <foreignObject x="200" y="120" width="400" height="260">
          <div className="flex h-full items-center justify-center rounded-3xl border border-brand-500/30 bg-slate-900/80 p-4 text-center text-xs text-slate-300">
            <div>
              <p className="font-semibold text-slate-100">{board.name}</p>
              <p className="text-[11px] text-slate-400">Virtual footprint preview</p>
            </div>
          </div>
        </foreignObject>
      </svg>
      {modules.map((module) => {
        const left = CANVAS_WIDTH / 2 + module.position.x - module.dimensions.width / 2;
        const top = CANVAS_HEIGHT / 2 + module.position.y - module.dimensions.height / 2;
        const isDragging = dragState?.instanceId === module.instanceId;
        return (
          <div
            key={module.instanceId}
            className={clsx(
              'absolute flex cursor-grab flex-col gap-1 rounded-xl border border-brand-400/40 bg-brand-500/10 px-3 py-2 text-xs text-slate-200 shadow-lg transition',
              isDragging && 'cursor-grabbing border-brand-400 bg-brand-500/30'
            )}
            style={{ left, top, width: module.dimensions.width * 2.2, transform: `rotate(${module.rotation.z}deg)` }}
            onPointerDown={(event) => {
              const element = event.currentTarget as HTMLDivElement;
              const rect = element.getBoundingClientRect();
              setDragState({
                instanceId: module.instanceId,
                offsetX: event.clientX - rect.left,
                offsetY: event.clientY - rect.top,
                baseZ: module.position.z
              });
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
          >
            <div className="text-[11px] font-semibold uppercase text-brand-100">{module.name}</div>
            <div className="flex flex-wrap gap-1 text-[10px] text-brand-50/80">
              {module.compatibleBoards.slice(0, 3).map((boardId) => (
                <span key={boardId} className="rounded-full bg-slate-900/70 px-2 py-0.5">
                  {boardId.split('-')[0]}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SchematicCanvas;
