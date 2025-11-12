import { useState } from 'react';
import type { ModuleMetadata } from '../types';
import { boards } from '../data/boards';

declare global {
  interface Window {
    simulationTheory?: {
      transformImportedModule?: (
        context: {
          url: string;
          boardId: string;
          content: string;
          defaultModule: ModuleMetadata;
        }
      ) => Promise<Partial<ModuleMetadata> | void> | Partial<ModuleMetadata> | void;
    };
  }
}

interface ImportState {
  isLoading: boolean;
  error?: string;
  message?: string;
}

const summarizeContent = (content: string) => {
  const sentences = content
    .replace(/\s+/g, ' ')
    .split('.')
    .map((sentence) => sentence.trim())
    .filter(Boolean);
  return sentences.slice(0, 3).join('. ') + (sentences.length > 3 ? '…' : '.');
};

const fallbackModule = (url: string, boardId: string): ModuleMetadata => {
  const board = boards.find((item) => item.id === boardId) ?? boards[0];
  const domain = (() => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch (error) {
      return 'custom-source';
    }
  })();
  const baseName = domain
    .split('.')
    .filter((part) => part.length > 1)
    .slice(0, 2)
    .join(' ');
  return {
    id: `custom-${Date.now()}`,
    name: `${baseName || 'Custom'} Module`,
    description: 'Imported from external source. Review specs and adjust dimensions as needed.',
    sourceUrl: url,
    category: 'sensor',
    compatibleBoards: [board.id],
    status: 'partial',
    dimensions: { width: 30, height: 30, depth: 10 }
  };
};

const buildModuleFromContent = (url: string, content: string, boardId: string): ModuleMetadata => {
  const lines = content.split('\n').map((line) => line.trim());
  const titleLine = lines.find((line) => line.length > 6) ?? 'Custom Module';
  const dimsMatch = content.match(/(\d+\.?\d*)\s*(mm|millimeter)/i);
  const width = dimsMatch ? Math.min(80, Math.max(18, parseFloat(dimsMatch[1]))) : 30;
  return {
    id: `imported-${Date.now()}`,
    name: titleLine.substring(0, 48),
    description: summarizeContent(content).substring(0, 260),
    sourceUrl: url,
    category: 'sensor',
    compatibleBoards: [boardId],
    status: 'partial',
    dimensions: { width, height: width * 0.7, depth: 12 }
  };
};

interface TransformerResult {
  module?: Partial<ModuleMetadata>;
  message?: string;
}

const getTransformerEndpoint = () =>
  (typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: Record<string, string> }).env
    ? (import.meta as unknown as { env: Record<string, string> }).env.VITE_IMPORT_TRANSFORM_ENDPOINT
    : undefined);

const getTransformerToken = () =>
  (typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: Record<string, string> }).env
    ? (import.meta as unknown as { env: Record<string, string> }).env.VITE_IMPORT_TRANSFORM_TOKEN
    : undefined);

const callExternalTransformer = async (
  payload: { url: string; boardId: string; content: string; module: ModuleMetadata }
): Promise<TransformerResult | null> => {
  const endpoint = getTransformerEndpoint();
  if (!endpoint) return null;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(getTransformerToken() ? { Authorization: `Bearer ${getTransformerToken()}` } : {})
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Transformer request failed with status ${response.status}`);
    }

    const data: unknown = await response.json();
    if (data && typeof data === 'object') {
      const candidate = (data as TransformerResult).module ?? (data as Partial<ModuleMetadata>);
      const message = (data as TransformerResult).message;
      if (candidate && typeof candidate === 'object') {
        return {
          module: candidate,
          message
        };
      }
      return { message };
    }
  } catch (error) {
    console.warn('External importer transformation failed:', error);
  }

  return null;
};

export const useModuleImport = () => {
  const [importState, setImportState] = useState<ImportState>({ isLoading: false });

  const importFromUrl = async (
    url: string,
    boardId: string,
    addModule: (module: ModuleMetadata) => void
  ) => {
    setImportState({ isLoading: true });
    try {
      const proxiedUrl = url.startsWith('https://r.jina.ai') ? url : `https://r.jina.ai/${url}`;
      const response = await fetch(proxiedUrl);
      if (!response.ok) {
        throw new Error(`Unable to fetch content: ${response.status}`);
      }
      const text = await response.text();
      let module = text.length > 200 ? buildModuleFromContent(url, text, boardId) : fallbackModule(url, boardId);
      const notes: string[] = [];

      const externalResult = await callExternalTransformer({ url, boardId, content: text, module });
      if (externalResult?.module) {
        module = {
          ...module,
          ...externalResult.module,
          dimensions: {
            ...module.dimensions,
            ...externalResult.module.dimensions
          }
        };
      }
      if (externalResult?.message) {
        notes.push(externalResult.message);
      }

      if (window.simulationTheory?.transformImportedModule) {
        try {
          const customModule = await window.simulationTheory.transformImportedModule({
            url,
            boardId,
            content: text,
            defaultModule: module
          });
          if (customModule && typeof customModule === 'object') {
            module = {
              ...module,
              ...customModule,
              dimensions: {
                ...module.dimensions,
                ...customModule.dimensions
              }
            };
          }
        } catch (customError) {
          console.warn('Custom importer transformation failed:', customError);
          notes.push('Custom transformer threw an error and was ignored.');
        }
      }

      addModule(module);
      setImportState({
        isLoading: false,
        message:
          notes.join(' ')
            || 'Module imported with AI-assisted placeholder geometry. Review dimensions before fabrication.'
      });
    } catch (error) {
      console.error(error);
      const module = fallbackModule(url, boardId);
      addModule(module);
      setImportState({
        isLoading: false,
        error: 'Automatic import failed due to CORS or network restrictions. Added placeholder module instead.'
      });
    }
  };

  return { importState, importFromUrl };
};
