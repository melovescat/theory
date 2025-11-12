import { ReactNode, useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import clsx from 'clsx';

interface CollapsiblePanelProps {
  id?: string;
  title: string;
  description?: string;
  defaultOpen?: boolean;
  children: ReactNode;
  headerActions?: ReactNode;
}

const CollapsiblePanel = ({
  id,
  title,
  description,
  defaultOpen = false,
  children,
  headerActions
}: CollapsiblePanelProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section
      id={id}
      className="glass-panel gradient-border rounded-3xl border border-slate-800/60 bg-slate-950/70 text-slate-100"
    >
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 rounded-3xl px-6 py-5 text-left"
      >
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-white sm:text-lg">{title}</span>
            <BsChevronDown
              className={clsx('transition-transform duration-300', isOpen ? 'rotate-180 text-brand-200' : 'text-slate-500')}
            />
          </div>
          {description && <p className="text-sm text-slate-300">{description}</p>}
        </div>
        {headerActions && <div className="shrink-0 text-xs sm:text-sm">{headerActions}</div>}
      </button>
      <div
        className={clsx(
          'grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden px-6 pb-6 pt-0 sm:pt-2">{children}</div>
      </div>
    </section>
  );
};

export default CollapsiblePanel;
