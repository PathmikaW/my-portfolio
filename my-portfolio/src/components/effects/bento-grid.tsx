import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function BentoGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(120px,auto)]', className)}>
      {children}
    </div>
  );
}

export function BentoGridItem({
  children,
  className,
  colSpan = 1,
}: {
  children: ReactNode;
  className?: string;
  colSpan?: 1 | 2;
}) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl border border-accent-blue/20 bg-white/90 dark:bg-black/70 backdrop-blur-lg p-5 shadow-md shadow-accent-blue/5 transition-all duration-300 hover:shadow-accent-blue/20 hover:border-accent-blue/40',
        colSpan === 2 && 'sm:col-span-2',
        className
      )}
    >
      {children}
    </div>
  );
}
