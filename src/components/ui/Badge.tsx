import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'orange';

const tones: Record<Tone, string> = {
  success: 'bg-success-bg text-success',
  warning: 'bg-warning-bg text-warning',
  error: 'bg-error-bg text-error',
  info: 'bg-info-bg text-info',
  neutral: 'bg-surface text-muted',
  orange: 'bg-orange/10 text-orange-dark',
};

export function Badge({
  tone = 'neutral',
  children,
  className,
  dot,
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
        tones[tone],
        className,
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
