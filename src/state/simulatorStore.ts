import { create } from 'zustand';
import type { ModuleMetadata } from '../types';
import { boards, defaultBoard } from '../data/boards';

export type WorkspaceView = 'schematic' | 'threeD' | 'split';

export interface PlacedModule extends ModuleMetadata {
  instanceId: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
}

interface SimulatorState {
  selectedBoardId: string;
  workspaceView: WorkspaceView;
  placedModules: PlacedModule[];
  wireConnections: Array<{
    id: string;
    from: string;
    to: string;
    color: string;
  }>;
  setBoard: (boardId: string) => void;
  addModule: (module: ModuleMetadata) => void;
  removeModule: (instanceId: string) => void;
  updateModuleTransform: (
    instanceId: string,
    transform: Partial<{
      position: { x: number; y: number; z: number };
      rotation: { x: number; y: number; z: number };
    }>
  ) => void;
  setWorkspaceView: (view: WorkspaceView) => void;
  splitRatio: number;
  setSplitRatio: (ratio: number) => void;
  reset: () => void;
}

export const useSimulatorStore = create<SimulatorState>((set) => ({
  selectedBoardId: defaultBoard.id,
  workspaceView: 'split',
  placedModules: [],
  wireConnections: [],
  splitRatio: 0.5,
  setBoard: (boardId) =>
    set((state) => ({
      selectedBoardId: boardId,
      placedModules: state.placedModules.filter((module) =>
        module.compatibleBoards.includes(boardId)
      )
    })),
  addModule: (module) =>
    set((state) => {
      const board = boards.find((item) => item.id === state.selectedBoardId) ?? defaultBoard;
      const width = board.dimensions.width;
      const height = board.dimensions.height;
      const randomX = Math.random() * width - width / 2;
      const randomY = Math.random() * height - height / 2;
      return {
        placedModules: [
          ...state.placedModules,
          {
            ...module,
            instanceId: `${module.id}-${Date.now()}`,
            position: { x: randomX, y: randomY, z: 0 },
            rotation: { x: 0, y: 0, z: 0 }
          }
        ]
      };
    }),
  removeModule: (instanceId) =>
    set((state) => ({
      placedModules: state.placedModules.filter((module) => module.instanceId !== instanceId)
    })),
  updateModuleTransform: (instanceId, transform) =>
    set((state) => ({
      placedModules: state.placedModules.map((module) =>
        module.instanceId !== instanceId
          ? module
          : {
              ...module,
              position: transform.position ? { ...module.position, ...transform.position } : module.position,
              rotation: transform.rotation ? { ...module.rotation, ...transform.rotation } : module.rotation
            }
      )
    })),
  setWorkspaceView: (view) => set({ workspaceView: view }),
  setSplitRatio: (ratio) =>
    set(() => ({ splitRatio: Math.min(0.8, Math.max(0.2, ratio)) })),
  reset: () =>
    set({
      selectedBoardId: defaultBoard.id,
      workspaceView: 'split',
      placedModules: [],
      wireConnections: [],
      splitRatio: 0.5
    })
}));
