import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
}

export function Input({ label, error, hint, leftIcon, className, id, ...props }: InputProps) {
  const inputId = id || props.name || label;
  return (
    <div className="w-full">
      {label && <label htmlFor={inputId} className="cl-label">{label}</label>}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brown">{leftIcon}</span>
        )}
        <input
          id={inputId}
          className={cn('cl-input', leftIcon ? 'pl-10' : '', error && 'border-error focus:border-error', className)}
          {...props}
        />
      </div>
      {error ? (
        <p className="text-xs text-error mt-1">{error}</p>
      ) : hint ? (
        <p className="text-xs text-muted mt-1">{hint}</p>
      ) : null}
    </div>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  const inputId = id || props.name || label;
  return (
    <div className="w-full">
      {label && <label htmlFor={inputId} className="cl-label">{label}</label>}
      <textarea
        id={inputId}
        className={cn('cl-input resize-none', className)}
        rows={4}
        {...props}
      />
      {error && <p className="text-xs text-error mt-1">{error}</p>}
    </div>
  );
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  children: ReactNode;
}

export function Select({ label, error, className, id, children, ...props }: SelectProps) {
  const inputId = id || props.name || label;
  return (
    <div className="w-full">
      {label && <label htmlFor={inputId} className="cl-label">{label}</label>}
      <select
        id={inputId}
        className={cn('cl-input appearance-none bg-white pr-9', className)}
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239d907e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.75rem center',
        }}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-error mt-1">{error}</p>}
    </div>
  );
}
