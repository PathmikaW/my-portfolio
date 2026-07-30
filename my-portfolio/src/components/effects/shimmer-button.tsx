import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ShimmerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline';
}

export const ShimmerButton = forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  ({ className, variant = 'solid', children, ...props }, ref) => {
    if (variant === 'outline') {
      return (
        <button
          ref={ref}
          className={cn(
            'relative inline-flex items-center justify-center rounded-lg border border-accent-blue px-5 py-2.5 text-sm sm:text-base font-medium text-accent-blue transition-all duration-300 hover:bg-accent-blue/10 hover:scale-[1.03] active:scale-[0.97]',
            className
          )}
          {...props}
        >
          {children}
        </button>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(
          'group relative inline-flex items-center justify-center overflow-hidden rounded-lg px-5 py-2.5 text-sm sm:text-base font-medium text-white transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97]',
          'bg-gradient-to-r from-accent-blue to-accent-purple',
          className
        )}
        {...props}
      >
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />
        <span className="relative">{children}</span>
      </button>
    );
  }
);

ShimmerButton.displayName = 'ShimmerButton';
