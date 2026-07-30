'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

const MouseEnterContext = createContext<[boolean, (v: boolean) => void] | undefined>(undefined);

export function CardContainer({ children, className }: { children: ReactNode; className?: string }) {
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div className={cn('flex items-center justify-center', className)}>
        <div
          onMouseEnter={() => setIsMouseEntered(true)}
          onMouseLeave={() => setIsMouseEntered(false)}
          className="relative"
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('[transform-style:preserve-3d]', className)}>{children}</div>
  );
}

export function CardItem({
  children,
  className,
  translateZ = 0,
}: {
  children: ReactNode;
  className?: string;
  translateZ?: number;
}) {
  return (
    <div
      className={cn('[transform-style:preserve-3d]', className)}
      style={{ transform: `translateZ(${translateZ}px)` }}
    >
      {children}
    </div>
  );
}

export function useCardMouseEntered() {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error('useCardMouseEntered must be used within a CardContainer');
  }
  return context;
}
