import { useEffect, useMemo, useRef, useState } from 'react';
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

const mmToPx = 6;

const SchematicCanvas = ({ board }: SchematicCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modules = useSimulatorStore((state) => state.placedModules);
  const updateModuleTransform = useSimulatorStore((state) => state.updateModuleTransform);
  const [dragState, setDragState] = useState<DragState | null>(null);

  const canvasDimensions = useMemo(() => {
    const width = board.dimensions.width * mmToPx + 240;
    const height = board.dimensions.height * mmToPx + 240;
    return { width, height };
  }, [board.dimensions.height, board.dimensions.width]);

  const footprintMarkup = useMemo(() => {
    const sizeAttributes = `width="${board.dimensions.width * mmToPx}" height="${board.dimensions.height * mmToPx}" `;
    return board.svgFootprint.replace('<svg ', `<svg ${sizeAttributes}`);
  }, [board.dimensions.height, board.dimensions.width, board.svgFootprint]);

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
      const xPx = event.clientX - bounds.left - dragState.offsetX;
      const yPx = event.clientY - bounds.top - dragState.offsetY;
      const halfWidth = canvasDimensions.width / 2;
      const halfHeight = canvasDimensions.height / 2;
      const relativeX = Math.max(-halfWidth, Math.min(halfWidth, xPx - halfWidth));
      const relativeY = Math.max(-halfHeight, Math.min(halfHeight, yPx - halfHeight));
      const clampedX = Math.max(-board.dimensions.width / 2, Math.min(board.dimensions.width / 2, relativeX / mmToPx));
      const clampedY = Math.max(-board.dimensions.height / 2, Math.min(board.dimensions.height / 2, relativeY / mmToPx));
      updateModuleTransform(dragState.instanceId, {
        position: {
          x: clampedX,
          y: clampedY,
          z: dragState.baseZ
        }
      });
    };
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [board.dimensions.height, board.dimensions.width, canvasDimensions.height, canvasDimensions.width, dragState, updateModuleTransform]);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/80"
      style={{ minHeight: canvasDimensions.height }}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${canvasDimensions.width} ${canvasDimensions.height}`}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(148,163,184,0.18)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width={canvasDimensions.width} height={canvasDimensions.height} fill="url(#grid)" />
      </svg>
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2"
        style={{ width: board.dimensions.width * mmToPx, height: board.dimensions.height * mmToPx }}
        dangerouslySetInnerHTML={{ __html: footprintMarkup }}
      />
      {modules.map((module) => {
        const widthPx = module.dimensions.width * mmToPx;
        const heightPx = module.dimensions.height * mmToPx;
        const left = canvasDimensions.width / 2 + module.position.x * mmToPx - widthPx / 2;
        const top = canvasDimensions.height / 2 + module.position.y * mmToPx - heightPx / 2;
        const isDragging = dragState?.instanceId === module.instanceId;
        return (
          <div
            key={module.instanceId}
            className={clsx(
              'absolute flex cursor-grab flex-col gap-1 rounded-xl border border-brand-400/40 bg-brand-500/10 px-3 py-2 text-xs text-slate-200 shadow-lg transition',
              isDragging && 'cursor-grabbing border-brand-400 bg-brand-500/30'
            )}
            style={{ left, top, width: widthPx, transform: `rotate(${module.rotation.z}deg)` }}
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
