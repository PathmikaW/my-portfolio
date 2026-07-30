import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Timeline({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'relative pl-8 sm:pl-10 space-y-8',
        'before:absolute before:left-[11px] sm:before:left-[15px] before:top-2 before:bottom-2 before:w-px',
        'before:bg-gradient-to-b before:from-accent-blue before:via-accent-purple before:to-transparent',
        className
      )}
    >
      {children}
    </div>
  );
}

export function TimelineItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('relative', className)}>
      <span className="absolute -left-8 sm:-left-10 top-1.5 flex size-4 items-center justify-center rounded-full bg-gradient-to-r from-accent-blue to-accent-purple ring-4 ring-background shadow-md shadow-accent-blue/30" />
      <div className="rounded-xl border border-accent-blue/20 bg-white/90 dark:bg-black/70 backdrop-blur-lg p-5 shadow-md shadow-accent-blue/5 transition-all duration-300 hover:shadow-accent-blue/20 hover:border-accent-blue/40">
        {children}
      </div>
    </div>
  );
}
