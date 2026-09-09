import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type Size = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variants: Record<Variant, string> = {
  primary: 'bg-orange text-white hover:bg-orange-dark shadow-soft',
  secondary: 'bg-ink text-white hover:bg-black shadow-soft',
  ghost: 'text-ink hover:bg-surface',
  danger: 'bg-error text-white hover:brightness-95 shadow-soft',
  outline: 'border border-line bg-white text-ink hover:bg-surface',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm rounded-lg gap-1.5',
  md: 'h-10 px-4 text-sm rounded-xl gap-2',
  lg: 'h-12 px-6 text-base rounded-xl gap-2',
  icon: 'h-10 w-10 rounded-xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none',
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {loading && (
          <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';
