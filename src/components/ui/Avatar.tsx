import { cn, initials as getInitials } from '@/lib/utils';

const palette = [
  'bg-orange/15 text-orange-dark',
  'bg-info/15 text-info',
  'bg-success/15 text-success',
  'bg-warning/15 text-warning',
  'bg-error/15 text-error',
  'bg-ink/10 text-ink',
];

export function Avatar({
  name,
  size = 'md',
  className,
}: {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const hash = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const color = palette[hash % palette.length];
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-lg',
  };
  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-semibold shrink-0',
        color,
        sizes[size],
        className,
      )}
    >
      {getInitials(name)}
    </div>
  );
}
