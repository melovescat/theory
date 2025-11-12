import { BsArrowsFullscreen, BsQuestionCircle, BsRocket } from 'react-icons/bs';

interface HeaderProps {
  onGuideToggle: () => void;
  onLaunchWorkspace: () => void;
}

const Header = ({ onGuideToggle, onLaunchWorkspace }: HeaderProps) => (
  <header className="border-b border-slate-800/60 bg-gradient-to-r from-slate-950/95 via-slate-900/70 to-slate-950/95">
    <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-4 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-2xl font-bold text-slate-950">
          <BsRocket />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Simulation Theory</h1>
          <p className="text-sm text-slate-300">
            Immersive multi-domain simulator for boards, sensors and hardware workflows.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onGuideToggle}
          className="group flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-900/60 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-brand-400 hover:text-white"
        >
          <BsQuestionCircle className="text-lg text-brand-300 transition group-hover:text-brand-200" />
          Guided Tour
        </button>
        <button
          onClick={onLaunchWorkspace}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 via-sky-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-brand-500/20 transition hover:from-brand-400 hover:via-sky-400 hover:to-cyan-300"
        >
          <BsArrowsFullscreen className="text-lg" />
          Launch Workspace
        </button>
      </div>
    </div>
  </header>
);

export default Header;
