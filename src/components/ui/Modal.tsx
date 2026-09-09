import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

export function Modal({ open, onClose, title, description, children, footer, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm cl-animate-in"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative w-full bg-white rounded-t-3xl sm:rounded-2xl shadow-pop cl-animate-in max-h-[90vh] flex flex-col',
          sizes[size],
        )}
      >
        {(title || description) && (
          <div className="px-6 py-5 border-b border-line flex items-start justify-between gap-4">
            <div>
              {title && <h2 className="text-lg font-semibold text-ink">{title}</h2>}
              {description && <p className="text-sm text-muted mt-1">{description}</p>}
            </div>
            <button
              onClick={onClose}
              className="text-brown hover:text-ink p-1 -mt-1 -mr-1 rounded-lg hover:bg-surface transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        )}
        <div className="px-6 py-5 overflow-y-auto cl-scrollbar flex-1">{children}</div>
        {footer && (
          <div className="px-6 py-4 border-t border-line flex items-center justify-end gap-3 bg-cream/50 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
