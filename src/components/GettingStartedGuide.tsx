import { useState } from 'react';
import { BsArrowRight, BsX } from 'react-icons/bs';
import type { GuideStep } from '../types';

interface GettingStartedGuideProps {
  onClose: () => void;
}

const steps: GuideStep[] = [
  {
    id: 'board-selector',
    title: 'Choose your base board',
    description:
      'Browse curated boards across Arduino, Raspberry Pi and FPGA ecosystems. Search specs and click to activate a platform.',
    targetSelector: '#board-selector'
  },
  {
    id: 'module-search',
    title: 'Discover compatible modules',
    description:
      'Use the Module Explorer to filter sensors, actuators and connectivity. Compatible devices stay highlighted with import actions.',
    targetSelector: '#module-search'
  },
  {
    id: 'workspace',
    title: 'Design in schematic + 3D',
    description:
      'Drag modules onto the board footprint, adjust positions, and preview the layout in 3D instantly. Split view keeps both synchronized.',
    targetSelector: '#workspace'
  },
  {
    id: 'module-inspector',
    title: 'Refine module placement',
    description:
      'Open the inspector to tweak millimeter offsets, rotations and remove modules. Values sync across both workspaces.',
    targetSelector: '#module-inspector'
  }
];

const GettingStartedGuide = ({ onClose }: GettingStartedGuideProps) => {
  const [index, setIndex] = useState(0);
  const step = steps[index];

  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center bg-slate-950/70 backdrop-blur">
      <div className="pointer-events-auto relative max-w-lg rounded-3xl border border-brand-500/40 bg-slate-950/95 p-6 text-slate-100 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-slate-700 bg-slate-900/70 p-2 text-slate-300 hover:text-white"
        >
          <BsX />
        </button>
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/20 px-3 py-1 text-xs font-semibold text-brand-100">
          Simulation Theory Tour
        </span>
        <h2 className="mt-3 text-2xl font-semibold text-white">{step.title}</h2>
        <p className="mt-2 text-sm text-slate-300">{step.description}</p>
        <div className="mt-6 flex items-center justify-between text-xs text-slate-300">
          <span>
            Step {index + 1} of {steps.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIndex(Math.max(0, index - 1))}
              disabled={index === 0}
              className="rounded-full border border-slate-800/70 bg-slate-900/70 px-3 py-1 font-semibold text-slate-300 transition enabled:hover:text-white disabled:opacity-40"
            >
              Previous
            </button>
            {index === steps.length - 1 ? (
              <button
                onClick={onClose}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 via-sky-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950"
              >
                Enter Workspace
                <BsArrowRight />
              </button>
            ) : (
              <button
                onClick={() => setIndex(Math.min(steps.length - 1, index + 1))}
                className="flex items-center gap-2 rounded-full bg-brand-500/80 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-brand-500"
              >
                Next
                <BsArrowRight />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GettingStartedGuide;
