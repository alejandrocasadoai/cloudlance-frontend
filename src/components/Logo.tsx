import { cn } from '@/lib/utils';

export function Logo({
  size = 'md',
  withText = true,
  className,
}: {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
  className?: string;
}) {
  const logoSizes = {
    sm: withText ? 'w-32' : 'w-7',
    md: withText ? 'w-40' : 'w-8',
    lg: withText ? 'w-52' : 'w-11',
  };

  return (
    <img
      src={withText ? '/logos/full_logo.png' : '/logos/cloud.png'}
      alt="Cloudlance"
      className={cn('h-auto object-contain', logoSizes[size], className)}
    />
  );
}
